import { NextRequest, NextResponse } from "next/server";
import { sendCompletionEmail } from "@/lib/email";
import { supabase } from "@/lib/supabase";
import {
  validateSessionToken,
  SESSION_COOKIE_OPTIONS,
} from "@/lib/cookies";

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { day } = body;

  if (!day || typeof day !== "number" || day < 1 || day > 10) {
    return NextResponse.json(
      { ok: false, error: "Invalid day." },
      { status: 400 }
    );
  }

  // Get participant ID from auth cookie
  const authToken = req.cookies.get("auth")?.value;
  if (!authToken) {
    return NextResponse.json(
      { ok: false, error: "Not authenticated." },
      { status: 401 }
    );
  }

  const participantId = await validateSessionToken(authToken);
  if (!participantId) {
    return NextResponse.json(
      { ok: false, error: "Invalid session." },
      { status: 401 }
    );
  }


  // Mark day as done
  const { error: updateError } = await supabase
    .from("participant_day_state")
    .update({ done_at: new Date().toISOString() })
    .eq("participant_id", participantId)
    .eq("day", day)
    .is("done_at", null); // only update if not already done

  if (updateError) {
    return NextResponse.json(
      { ok: false, error: "Failed to mark complete." },
      { status: 500 }
    );
  }

  // Fetch fresh participant data to rebuild session cookie
  const { data: participant, error: pError } = await supabase
    .from("participants")
    .select("id, name, email, cohort_id, current_day, status, timezone, enrolled_at, revoked")
    .eq("id", participantId)
    .single();

  if (pError || !participant) {
    return NextResponse.json(
      { ok: false, error: "Failed to refresh session." },
      { status: 500 }
    );
  }

  const { data: dayStates } = await supabase
    .from("participant_day_state")
    .select("day, done_at")
    .eq("participant_id", participantId);

  const daysComplete = (dayStates ?? [])
    .filter((d) => d.done_at !== null)
    .map((d) => d.day as number);

  // --- Re-activation + counter reset on every completion ---
  // Activity signal = any lesson completion. Reset counter; if inactive/needs_attention → active.
  const newStatus =
    participant.status === "inactive" || participant.status === "needs_attention"
      ? "active"
      : participant.status;

  await supabase
    .from("participants")
    .update({
      missed_day_counter: 0,
      status: newStatus,
      updated_at: new Date().toISOString(),
    })
    .eq("id", participantId);

  // --- All-10-done detection (runs on every completion, not just day 10) ---
  const completedCount = daysComplete.length; // already computed above from fresh dayStates

  if (completedCount === 10) {
    // Mark completed (terminal state — stops all scheduler sends)
    await supabase
      .from("participants")
      .update({ status: "completed", completed_at: new Date().toISOString() })
      .eq("id", participantId);

    // Issue completion cert if not already issued
    const { data: existingCompletionCert } = await supabase
      .from("certificates")
      .select("id")
      .eq("participant_id", participantId)
      .eq("type", "completion")
      .maybeSingle();

    if (!existingCompletionCert) {
      const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
      let certCode = "MUSE-" + String(new Date().getFullYear()) + "-";
      for (let i = 0; i < 4; i++) {
        certCode += chars[Math.floor(Math.random() * chars.length)];
      }

      await supabase.from("certificates").insert({
        participant_id: participantId,
        type: "completion",
        verification_code: certCode,
        cohort_id: participant.cohort_id,
      });

      // Fire completion email (dummy for now — real content later, with day emails)
      try {
        await sendCompletionEmail(participant.email, participant.name, participant.cohort_id);
        await supabase.from("message_logs").insert({
          participant_id: participantId,
          message_type: "completion_email",
          channel: "email",
          status: "sent",
          sent_at: new Date().toISOString(),
        });
      } catch (err) {
        console.error("Completion email failed:", err);
        // Don't fail the request — cert is already issued, email is best-effort
      }
    }
  }

  // Build fresh session_data
  const newSessionData = {
    name: participant.name,
    email: participant.email,
    cohortId: participant.cohort_id,
    currentDay: participant.current_day,
    daysComplete,
    revoked: participant.revoked,
    status: participant.status,
    fetchedAt: Date.now(),
  };

  const res = NextResponse.json({ ok: true, daysComplete });

  // Refresh session cookie with updated daysComplete
  res.cookies.set(
    "session_data",
    JSON.stringify(newSessionData),
    SESSION_COOKIE_OPTIONS
  );

  return res;
}