import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";
import { generateOtp, hashOtp, sendOtpEmail } from "@/lib/otp";

const OTP_EXPIRY_MINUTES = 10;

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { name, email, phone, timezone } = body;

  if (!name || !email || !timezone) {
    return NextResponse.json(
      { ok: false, error: "Name, email and timezone are required." },
      { status: 400 }
    );
  }

  const cleanEmail = email.toLowerCase().trim();

  // Check if already an active participant
  const { data: existing } = await supabase
    .from("participants")
    .select("id, status")
    .eq("email", cleanEmail)
    .single();

  if (existing && existing.status === "active") {
    return NextResponse.json(
      { ok: false, error: "You're already enrolled. Log in instead." },
      { status: 409 }
    );
  }

  // Clean up any previous pending enrollments for this email
  await supabase
    .from("pending_enrollments")
    .update({ status: "expired" })
    .eq("email", cleanEmail)
    .in("status", ["pending", "verified"]);

  // Generate OTP
  const otp = generateOtp();
  const hash = hashOtp(otp);
  const expiresAt = new Date(
    Date.now() + OTP_EXPIRY_MINUTES * 60 * 1000
  ).toISOString();

  // Create pending enrollment
  const { error: insertError } = await supabase
    .from("pending_enrollments")
    .insert({
      name: name.trim(),
      email: cleanEmail,
      phone: phone?.trim() ?? "",
      timezone,
      otp_hash: hash,
      otp_attempts: 0,
      otp_expires_at: expiresAt,
      status: "pending",
    });

  if (insertError) {
    console.error("pending_enrollment insert failed:", insertError);
    return NextResponse.json(
      { ok: false, error: "Something went wrong. Try again." },
      { status: 500 }
    );
  }

  // Send OTP email
  try {
    await sendOtpEmail(cleanEmail, name.trim(), otp);
  } catch (err) {
    console.error("OTP email failed:", err);
    return NextResponse.json(
      { ok: false, error: "Failed to send verification email. Try again." },
      { status: 500 }
    );
  }

  return NextResponse.json({ ok: true });
}