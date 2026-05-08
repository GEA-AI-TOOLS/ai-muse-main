import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";
import { verifyOtpHash } from "@/lib/otp";
import {
  generateSessionToken,
  parseDeviceLabel,
  AUTH_COOKIE_OPTIONS,
  SESSION_COOKIE_OPTIONS,
} from "@/lib/cookies";

const MAX_ATTEMPTS = 5;
const DEVICE_CAP = 5;
const SESSION_DAYS = 30;

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { email, otp, removeSessionId } = body;

  if (!email || !otp) {
    return NextResponse.json(
      { ok: false, error: "Email and code required." },
      { status: 400 }
    );
  }

  const { data: participant, error } = await supabase
    .from("participants")
    .select("id, name, email, cohort_id, current_day, status, timezone, enrolled_at, revoked, login_otp_hash, login_otp_attempts, login_otp_expires_at")
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

  // OTP is valid — check device cap
  const now = new Date().toISOString();

  // If a session removal was requested alongside this login attempt, do it first
  if (removeSessionId) {
    await supabase
      .from("sessions")
      .delete()
      .eq("id", removeSessionId)
      .eq("participant_id", participant.id);
  }

  const { data: activeSessions } = await supabase
    .from("sessions")
    .select("id, device_label, last_seen_at, created_at")
    .eq("participant_id", participant.id)
    .gt("expires_at", now)
    .order("last_seen_at", { ascending: false });

  if ((activeSessions ?? []).length >= DEVICE_CAP) {
    // Return sessions list so login page can show inline removal UI
    return NextResponse.json({
      ok: false,
      deviceCapReached: true,
      sessions: activeSessions,
      error:
        "You are logged in on " +
        String(DEVICE_CAP) +
        " devices. Remove one to continue.",
    });
  }

  // Under cap — create session
  await supabase
    .from("participants")
    .update({
      login_otp_hash: null,
      login_otp_attempts: 0,
      login_otp_expires_at: null,
    })
    .eq("id", participant.id);

  const sessionToken = generateSessionToken();
  const expiresAt = new Date(
    Date.now() + SESSION_DAYS * 24 * 60 * 60 * 1000
  ).toISOString();

  const deviceLabel = parseDeviceLabel(
    req.headers.get("user-agent") ?? ""
  );

  await supabase.from("sessions").insert({
    participant_id: participant.id,
    session_token: sessionToken,
    device_label: deviceLabel,
    expires_at: expiresAt,
  });

  const { data: dayStates } = await supabase
    .from("participant_day_state")
    .select("day, done_at")
    .eq("participant_id", participant.id);

  const daysComplete = (dayStates ?? [])
    .filter((d) => d.done_at !== null)
    .map((d) => d.day as number);

  const sessionData = {
    name: participant.name,
    email: participant.email,
    cohortId: participant.cohort_id,
    currentDay: participant.current_day,
    daysComplete,
    revoked: participant.revoked,
  };

  const res = NextResponse.json({ ok: true, redirectTo: "/today" });

  res.cookies.set("auth", sessionToken, AUTH_COOKIE_OPTIONS);
  res.cookies.set(
    "session_data",
    JSON.stringify(sessionData),
    SESSION_COOKIE_OPTIONS
  );

  return res;
}