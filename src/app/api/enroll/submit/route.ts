import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";
import { generateOtp, hashOtp, sendOtpEmail } from "@/lib/otp";
import { sendWhatsAppOtp } from "@/lib/whatsapp";

const OTP_EXPIRY_MINUTES = 10;

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { name, lastName, email, phone, timezone } = body;

  if (!name || !email || !timezone) {
    return NextResponse.json(
      { ok: false, error: "Name, email and timezone are required." },
      { status: 400 }
    );
  }

  const cleanEmail = email.toLowerCase().trim();
  const cleanPhone = phone?.trim() ?? "";
  const hasPhone = cleanPhone.length > 0;

  // Block already-enrolled active participants
  const { data: existing } = await supabase
    .from("participants")
    .select("id, status")
    .eq("email", cleanEmail)
    .single();

  if (existing && existing.status === "active") {
    return NextResponse.json(
      { ok: false, error: "You are already enrolled. Log in instead." },
      { status: 409 }
    );
  }

  // Expire any previous pending enrollments for this email
  await supabase
    .from("pending_enrollments")
    .update({ status: "expired" })
    .eq("email", cleanEmail)
    .in("status", ["pending", "verified"]);

  // Generate email OTP
  const emailOtp = generateOtp();
  const emailHash = hashOtp(emailOtp);
  const expiresAt = new Date(
    Date.now() + OTP_EXPIRY_MINUTES * 60 * 1000
  ).toISOString();

  // Generate WhatsApp OTP if phone given
  const whatsappOtp = hasPhone ? generateOtp() : null;
  const whatsappHash = whatsappOtp ? hashOtp(whatsappOtp) : null;

  // Insert pending enrollment
  const { error: insertError } = await supabase
    .from("pending_enrollments")
    .insert({
      name: name.trim(),
      last_name: lastName?.trim() ?? null,
      email: cleanEmail,
      phone: cleanPhone,
      timezone,
      otp_hash: emailHash,
      otp_attempts: 0,
      otp_expires_at: expiresAt,
      whatsapp_otp_hash: whatsappHash,
      whatsapp_otp_attempts: 0,
      whatsapp_otp_expires_at: hasPhone ? expiresAt : null,
      phone_verified: false,
      status: "pending",
    });

  if (insertError) {
    console.error("pending_enrollment insert failed:", insertError);
    return NextResponse.json(
      { ok: false, error: "Something went wrong. Try again." },
      { status: 500 }
    );
  }

  // Send both OTPs in parallel
  const sends: Promise<void>[] = [
    sendOtpEmail(cleanEmail, name.trim(), emailOtp),
  ];

  if (hasPhone && whatsappOtp) {
    sends.push(sendWhatsAppOtp(cleanPhone, whatsappOtp, name.trim()));
  }

  try {
    await Promise.all(sends);
  } catch (err) {
    console.error("OTP send failed:", err);
    return NextResponse.json(
      { ok: false, error: "Failed to send verification codes. Try again." },
      { status: 500 }
    );
  }

  return NextResponse.json({ ok: true, hasPhone });
}