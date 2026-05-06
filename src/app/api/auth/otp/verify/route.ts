import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";
import { verifyOtpHash } from "@/lib/otp";
import {
  signAuthToken,
  AUTH_COOKIE_OPTIONS,
  SESSION_COOKIE_OPTIONS,
} from "@/lib/cookies";

const MAX_ATTEMPTS = 5;

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { email, otp } = body;

  if (!email || !otp) {
    return NextResponse.json(
      { ok: false, error: "Email and code required." },
      { status: 400 }
    );
  }

  const { data: participant, error } = await supabase
    .from("participants")
    .select(
      "id, name, email, cohort_id, current_day, status, timezone, enrolled_at, revoked, login_otp_hash, login_otp_attempts, login_otp_expires_at"
    )
    .eq("email", email.toLowerCase().trim())
    .single();

  if (error || !participant) {
    return NextResponse.json(
      { ok: false, error: "Incorrect or expired code." },
      { status: 401 }
    );
  }

  if (participant.revoked) {
    return NextResponse.json(
      { ok: false, error: "Your access has been revoked. Please contact support." },
      { status: 403 }
    );
  }

  if (participant.login_otp_attempts >= MAX_ATTEMPTS) {
    return NextResponse.json(
      { ok: false, error: "Too many attempts. Request a new code." },
      { status: 429 }
    );
  }

  if (
    !participant.login_otp_expires_at ||
    new Date(participant.login_otp_expires_at) < new Date()
  ) {
    return NextResponse.json(
      { ok: false, error: "Code expired. Request a new one." },
      { status: 401 }
    );
  }

  if (
    !participant.login_otp_hash ||
    !verifyOtpHash(otp.trim(), participant.login_otp_hash)
  ) {
    await supabase
      .from("participants")
      .update({ login_otp_attempts: participant.login_otp_attempts + 1 })
      .eq("id", participant.id);

    const remaining = MAX_ATTEMPTS - participant.login_otp_attempts - 1;
    return NextResponse.json(
      {
        ok: false,
        error:
          remaining > 0
            ? "Incorrect code. " + String(remaining) + " attempts remaining."
            : "Too many attempts. Request a new code.",
      },
      { status: 401 }
    );
  }

  // Valid — clear OTP columns
  await supabase
    .from("participants")
    .update({
      login_otp_hash: null,
      login_otp_attempts: 0,
      login_otp_expires_at: null,
    })
    .eq("id", participant.id);

  const { data: dayStates } = await supabase
    .from("participant_day_state")
    .select("day, done_at")
    .eq("participant_id", participant.id);

  const daysComplete = (dayStates ?? [])
    .filter((d) => d.done_at !== null)
    .map((d) => d.day as number);

  const authToken = await signAuthToken(participant.id);

  const sessionData = {
    name: participant.name,
    email: participant.email,
    cohortId: participant.cohort_id,
    currentDay: participant.current_day,
    daysComplete,
    revoked: participant.revoked,
  };

  const res = NextResponse.json({ ok: true, redirectTo: "/today" });

  res.cookies.set("auth", authToken, AUTH_COOKIE_OPTIONS);
  res.cookies.set(
    "session_data",
    JSON.stringify(sessionData),
    SESSION_COOKIE_OPTIONS
  );

  return res;
}