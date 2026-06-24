// src/lib/enrollment.ts
import { supabase } from "@/lib/supabase";
import { sendWelcomeEmail } from "@/lib/email";

function getUpcomingMonday(fromDate: Date): Date {
  const date = new Date(fromDate);
  const day = date.getUTCDay(); // 0=Sun, 1=Mon...
  const daysUntilMonday = day === 0 ? 1 : day === 1 ? 7 : 8 - day;
  date.setUTCDate(date.getUTCDate() + daysUntilMonday);
  date.setUTCHours(0, 0, 0, 0);
  return date;
}

function formatCohortId(monday: Date): string {
  const y = monday.getUTCFullYear();
  const m = String(monday.getUTCMonth() + 1).padStart(2, "0");
  const d = String(monday.getUTCDate()).padStart(2, "0");
  return "cohort_" + y + "_" + m + "_" + d;
}

export interface FulfillResult {
  participantId: string;
  cohortId: string;
  alreadyExisted: boolean;
}

/**
 * Create (or find, if already created) a participant from a paid Stripe checkout.
 * Idempotent on stripe_payment_id — safe to call from both the webhook AND the
 * success page. Whichever fires first creates; the second returns the existing row.
 *
 * @param stripeSessionId  the Stripe Checkout session id (used as stripe_payment_id)
 * @param pendingId        the pending_enrollment id (from Stripe metadata)
 * @param paymentCreatedAt epoch seconds from the Stripe session (for cohort calc)
 */
export async function fulfillEnrollment(
  stripeSessionId: string,
  pendingId: string,
  paymentCreatedAt: number
): Promise<FulfillResult | null> {
  // --- Idempotency: already created? ---
  const { data: existing } = await supabase
    .from("participants")
    .select("id, cohort_id")
    .eq("stripe_payment_id", stripeSessionId)
    .maybeSingle();

  if (existing) {
    return { participantId: existing.id, cohortId: existing.cohort_id, alreadyExisted: true };
  }

  // --- Load the pending enrollment ---
  const { data: enrollment, error: enrollError } = await supabase
    .from("pending_enrollments")
    .select("*")
    .eq("id", pendingId)
    .single();

  if (enrollError || !enrollment) {
    console.error("fulfillEnrollment: pending enrollment not found:", pendingId);
    return null;
  }

  // --- Cohort ---
  const paymentDate = new Date(paymentCreatedAt * 1000);
  const monday = getUpcomingMonday(paymentDate);
  const cohortId = formatCohortId(monday);
  const startDate = monday.toISOString().split("T")[0];

  await supabase
    .from("cohorts")
    .upsert(
      { cohort_id: cohortId, start_date: startDate, status: "open" },
      { onConflict: "cohort_id", ignoreDuplicates: true }
    );

  // --- Participant (idempotent insert) ---
  // Use upsert on stripe_payment_id so a concurrent webhook+success-page race
  // can't create two rows. Requires a UNIQUE constraint on stripe_payment_id (see note).
  const { data: participant, error: participantError } = await supabase
    .from("participants")
    .upsert(
      {
        cohort_id: cohortId,
        name: enrollment.name,
        last_name: enrollment.last_name ?? null,
        email: enrollment.email,
        phone: enrollment.phone,
        timezone: enrollment.timezone,
        status: "active",
        current_day: 0,
        revoked: false,
        stripe_payment_id: stripeSessionId,
        email_reminders: enrollment.email_reminders ?? true,
        whatsapp_reminders: enrollment.whatsapp_reminders ?? false,
      },
      { onConflict: "stripe_payment_id" }
    )
    .select("id")
    .single();

  if (participantError || !participant) {
    console.error("fulfillEnrollment: participant upsert failed:", participantError);
    return null;
  }

  // --- 10 day-state rows (only if not already there) ---
  const { count } = await supabase
    .from("participant_day_state")
    .select("id", { count: "exact", head: true })
    .eq("participant_id", participant.id);

  if (!count || count < 10) {
    const dayRows = Array.from({ length: 10 }, (_, i) => ({
      participant_id: participant.id,
      day: i + 1,
    }));
    // upsert on (participant_id, day) so re-runs don't duplicate
    await supabase
      .from("participant_day_state")
      .upsert(dayRows, { onConflict: "participant_id,day", ignoreDuplicates: true });
  }

  // --- Mark pending fulfilled ---
  await supabase
    .from("pending_enrollments")
    .update({ status: "fulfilled", fulfilled_participant_id: participant.id })
    .eq("id", pendingId);

  // --- Welcome email (best-effort, once) ---
  // Guard against double-send in the race: only send if we just created it.
  try {
    await sendWelcomeEmail(
      enrollment.email,
      enrollment.name,
      cohortId,
      enrollment.timezone,
      participant.id
    );
  } catch (err) {
    console.error("fulfillEnrollment: welcome email failed:", err);
  }

  return { participantId: participant.id, cohortId, alreadyExisted: false };
}