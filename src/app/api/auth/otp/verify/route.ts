import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";
import {
  signAuthToken,
  AUTH_COOKIE_OPTIONS,
  SESSION_COOKIE_OPTIONS,
} from "@/lib/cookies";

const STUB_OTP = "123456";

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { email, otp } = body;

  if (!email || !otp) {
    return NextResponse.json(
      { ok: false, error: "Email and code required." },
      { status: 400 }
    );
  }

  // Look up participant by email
  const { data: participant, error } = await supabase
    .from("participants")
    .select("id, name, email, cohort_id, current_day, status, timezone, enrolled_at, revoked")
    .eq("email", email)
    .single();

  if (error || !participant) {
    // Generic message — don't reveal whether email exists
    return NextResponse.json(
      { ok: false, error: "If you're enrolled, check your email for a code." },
      { status: 401 }
    );
  }

  // STUB: accept hardcoded OTP.
  // In prod: verify otp_hash against Supabase, check expiry + attempts.
  if (otp !== STUB_OTP) {
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

  // Fetch day states for session_data
  const { data: dayStates } = await supabase
    .from("participant_day_state")
    .select("day, done_at")
    .eq("participant_id", participant.id);

  const daysComplete = (dayStates ?? [])
    .filter((d) => d.done_at !== null)
    .map((d) => d.day as number);

  // Sign auth JWT
  const authToken = await signAuthToken(participant.id);

  // Build session_data
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