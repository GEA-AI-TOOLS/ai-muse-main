import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";
import { verifyOtpHash } from "@/lib/otp";

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

  const cleanEmail = email.toLowerCase().trim();

  // Find the pending enrollment
  const { data: enrollment, error } = await supabase
    .from("pending_enrollments")
    .select("id, otp_hash, otp_attempts, otp_expires_at, status")
    .eq("email", cleanEmail)
    .eq("status", "pending")
    .order("created_at", { ascending: false })
    .limit(1)
    .single();

  if (error || !enrollment) {
    return NextResponse.json(
      { ok: false, error: "Incorrect or expired code." },
      { status: 401 }
    );
  }

  if (enrollment.otp_attempts >= MAX_ATTEMPTS) {
    return NextResponse.json(
      { ok: false, error: "Too many attempts. Please start over." },
      { status: 429 }
    );
  }

  if (
    !enrollment.otp_expires_at ||
    new Date(enrollment.otp_expires_at) < new Date()
  ) {
    return NextResponse.json(
      { ok: false, error: "Code expired. Please start over." },
      { status: 401 }
    );
  }

  if (
    !enrollment.otp_hash ||
    !verifyOtpHash(otp.trim(), enrollment.otp_hash)
  ) {
    await supabase
      .from("pending_enrollments")
      .update({ otp_attempts: enrollment.otp_attempts + 1 })
      .eq("id", enrollment.id);

    const remaining = MAX_ATTEMPTS - enrollment.otp_attempts - 1;
    return NextResponse.json(
      {
        ok: false,
        error:
          remaining > 0
            ? "Incorrect code. " + String(remaining) + " attempts remaining."
            : "Too many attempts. Please start over.",
      },
      { status: 401 }
    );
  }

  // Mark as verified, clear OTP
  await supabase
    .from("pending_enrollments")
    .update({
      status: "verified",
      verified_at: new Date().toISOString(),
      otp_hash: null,
      otp_attempts: 0,
      otp_expires_at: null,
    })
    .eq("id", enrollment.id);

  return NextResponse.json({ ok: true });
}