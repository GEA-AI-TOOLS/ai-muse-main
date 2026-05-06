import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import { supabase } from "@/lib/supabase";
import { sendWelcomeEmail } from "@/lib/email";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

function getUpcomingMonday(fromDate: Date): Date {
  const date = new Date(fromDate);
  const day = date.getUTCDay(); // 0=Sun, 1=Mon...
  // Days until next Monday
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

export async function POST(req: NextRequest) {
  const body = await req.text();
  const sig = req.headers.get("stripe-signature");

  if (!sig) {
    return NextResponse.json({ error: "No signature." }, { status: 400 });
  }

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(
      body,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET!
    );
  } catch (err) {
    console.error("Webhook signature verification failed:", err);
    return NextResponse.json({ error: "Invalid signature." }, { status: 400 });
  }

  // Only handle checkout completion
  if (event.type !== "checkout.session.completed") {
    return NextResponse.json({ received: true });
  }

const session = event.data.object as Stripe.Checkout.Session;

  // Idempotency check — skip if already processed
  const { data: existing } = await supabase
    .from("participants")
    .select("id")
    .eq("stripe_payment_id", session.id)
    .single();

  if (existing) {
    console.log("Already processed session:", session.id);
    return NextResponse.json({ received: true });
  }

  // Get pending enrollment from metadata
  const pendingId = session.metadata?.pending_enrollment_id;
  if (!pendingId) {
    console.error("No pending_enrollment_id in metadata");
    return NextResponse.json({ received: true });
  }

  const { data: enrollment, error: enrollError } = await supabase
    .from("pending_enrollments")
    .select("*")
    .eq("id", pendingId)
    .single();

  if (enrollError || !enrollment) {
    console.error("Pending enrollment not found:", pendingId);
    return NextResponse.json({ received: true });
  }

  // Compute cohort
  const paymentDate = new Date(session.created * 1000);
  const monday = getUpcomingMonday(paymentDate);
  const cohortId = formatCohortId(monday);
  const startDate = monday.toISOString().split("T")[0];

  // Create cohort if it doesn't exist
  await supabase
    .from("cohorts")
    .upsert(
      {
        cohort_id: cohortId,
        start_date: startDate,
        status: "open",
      },
      { onConflict: "cohort_id", ignoreDuplicates: true }
    );

  // Create participant
  const { data: participant, error: participantError } = await supabase
    .from("participants")
    .insert({
      cohort_id: cohortId,
      name: enrollment.name,
      email: enrollment.email,
      phone: enrollment.phone,
      timezone: enrollment.timezone,
      status: "active",
      current_day: 0,
      revoked: false,
      stripe_payment_id: session.id,
    })
    .select("id")
    .single();

  if (participantError || !participant) {
    console.error("Participant insert failed:", participantError);
    // Return 500 so Stripe retries
    return NextResponse.json(
      { error: "Participant creation failed." },
      { status: 500 }
    );
  }

  // Create 10 day state rows
  const dayRows = Array.from({ length: 10 }, (_, i) => ({
    participant_id: participant.id,
    day: i + 1,
  }));

  const { error: dayStateError } = await supabase
    .from("participant_day_state")
    .insert(dayRows);

  if (dayStateError) {
    console.error("Day state insert failed:", dayStateError);
    // Don't return 500 here — participant exists, day states can be fixed manually
  }

  // Mark pending enrollment as fulfilled
  await supabase
    .from("pending_enrollments")
    .update({
      status: "fulfilled",
      fulfilled_participant_id: participant.id,
    })
    .eq("id", pendingId);

  // Send welcome email
  try {
    await sendWelcomeEmail(enrollment.email, enrollment.name, cohortId);
  } catch (err) {
    console.error("Welcome email failed:", err);
    // Don't fail the webhook — participant is created, email can be retried
  }

  console.log("Enrolled:", enrollment.email, "cohort:", cohortId);
  return NextResponse.json({ received: true });
}