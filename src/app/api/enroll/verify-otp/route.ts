import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";
import { verifyOtpHash } from "@/lib/otp";

const MAX_ATTEMPTS = 5;

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { email, emailOtp, whatsappOtp } = body;

  if (!email || !emailOtp) {
    return NextResponse.json(
      { ok: false, error: "Email and code required." },
      { status: 400 }
    );
  }

  const cleanEmail = email.toLowerCase().trim();

  // Find pending enrollment
  const { data: enrollment, error } = await supabase
    .from("pending_enrollments")
    .select("id, phone, otp_hash, otp_attempts, otp_expires_at, whatsapp_otp_hash, whatsapp_otp_attempts, whatsapp_otp_expires_at, status")
    .eq("email", cleanEmail)
    .eq("status", "pending")
    .order("created_at", { ascending: false })
    .limit(1)
    .single();

  if (error || !enrollment) {
    return NextResponse.json(
      { ok: false, error: "Session expired. Please start over." },
      { status: 401 }
    );
  }

  const hasPhone = enrollment.phone && enrollment.phone.trim().length > 0;

  // --- Validate email OTP ---

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
      { ok: false, error: "Email code expired. Please start over." },
      { status: 401 }
    );
  }

  if (
    !enrollment.otp_hash ||
    !verifyOtpHash(emailOtp.trim(), enrollment.otp_hash)
  ) {
    await supabase
      .from("pending_enrollments")
      .update({ otp_attempts: enrollment.otp_attempts + 1 })
      .eq("id", enrollment.id);

    const remaining = MAX_ATTEMPTS - enrollment.otp_attempts - 1;
    return NextResponse.json(
      {
        ok: false,
        field: "email",
        error:
          remaining > 0
            ? "Incorrect email code. " + String(remaining) + " attempts remaining."
            : "Too many attempts. Please start over.",
      },
      { status: 401 }
    );
  }

  // --- Validate WhatsApp OTP (only if phone given) ---

  if (hasPhone && whatsappOtp) {
    if ((enrollment.whatsapp_otp_attempts ?? 0) >= MAX_ATTEMPTS) {
      return NextResponse.json(
        { ok: false, error: "Too many WhatsApp attempts. Please start over." },
        { status: 429 }
      );
    }

    if (
      !enrollment.whatsapp_otp_expires_at ||
      new Date(enrollment.whatsapp_otp_expires_at) < new Date()
    ) {
      return NextResponse.json(
        { ok: false, error: "WhatsApp code expired. Please start over." },
        { status: 401 }
      );
    }

    if (
      !enrollment.whatsapp_otp_hash ||
      !verifyOtpHash(whatsappOtp.trim(), enrollment.whatsapp_otp_hash)
    ) {
      await supabase
        .from("pending_enrollments")
        .update({
          whatsapp_otp_attempts: (enrollment.whatsapp_otp_attempts ?? 0) + 1,
        })
        .eq("id", enrollment.id);

      const remaining = MAX_ATTEMPTS - (enrollment.whatsapp_otp_attempts ?? 0) - 1;
      return NextResponse.json(
        {
          ok: false,
          field: "whatsapp",
          error:
            remaining > 0
              ? "Incorrect WhatsApp code. " + String(remaining) + " attempts remaining."
              : "Too many attempts. Please start over.",
        },
        { status: 401 }
      );
    }
  }

  // --- Both valid — mark as verified ---

  await supabase
    .from("pending_enrollments")
    .update({
      status: "verified",
      verified_at: new Date().toISOString(),
      otp_hash: null,
      otp_attempts: 0,
      otp_expires_at: null,
      whatsapp_otp_hash: null,
      whatsapp_otp_attempts: 0,
      whatsapp_otp_expires_at: null,
      phone_verified: hasPhone && !!whatsappOtp,
      whatsapp_reminders: hasPhone && !!whatsappOtp,
    })
    .eq("id", enrollment.id);

  return NextResponse.json({ ok: true });
}