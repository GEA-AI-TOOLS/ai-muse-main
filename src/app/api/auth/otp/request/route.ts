import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";
import { generateOtp, hashOtp, sendOtpEmail } from "@/lib/otp";

const OTP_EXPIRY_MINUTES = 10;

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { email } = body;

  if (!email || typeof email !== "string") {
    return NextResponse.json(
      { ok: false, error: "Email required." },
      { status: 400 }
    );
  }

  const { data: participant, error } = await supabase
    .from("participants")
    .select("id, name, email, status, revoked, cohort_id")
    .eq("email", email.toLowerCase().trim())
    .single();

  // Closed course — show a clear error if email not found.
  // Participants know they're enrolled, so enumeration risk is low.
  if (error || !participant) {
    return NextResponse.json({ ok: false, notEnrolled: true });
  }

  if (participant.revoked) {
    return NextResponse.json({ ok: false, revoked: true });
  }

  // Version gate (video deployment): reject live-cohort accounts before sending a code.
  const { data: reqCohort } = await supabase
    .from("cohorts")
    .select("cohort_type")
    .eq("cohort_id", participant.cohort_id)
    .single();

  if (reqCohort?.cohort_type === "live") {
    return NextResponse.json(
      {
        ok: false,
        error: "This account is registered for the live version. Please log in at https://sparks.bryancassady.com.",
      },
      { status: 403 }
    );
  }

  const otp = generateOtp();
  const hash = hashOtp(otp);
  const expiresAt = new Date(
    Date.now() + OTP_EXPIRY_MINUTES * 60 * 1000
  ).toISOString();

  await supabase
    .from("participants")
    .update({
      login_otp_hash: hash,
      login_otp_attempts: 0,
      login_otp_expires_at: expiresAt,
    })
    .eq("id", participant.id);

  try {
    await sendOtpEmail(participant.email, participant.name, otp);
  } catch (err) {
    console.error("OTP email failed:", err);
    return NextResponse.json(
      { ok: false, error: "Failed to send code. Try again." },
      { status: 500 }
    );
  }

  return NextResponse.json({ ok: true });
}