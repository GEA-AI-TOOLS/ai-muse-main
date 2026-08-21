import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[a-z]{2,}$/i;
const DEFAULT_TIMEZONE = "Europe/London";

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { name, lastName, email } = body;

  if (!name || !email) {
    return NextResponse.json(
      { ok: false, error: "Name and email are required." },
      { status: 400 }
    );
  }

  const cleanEmail = email.toLowerCase().trim();

  if (!EMAIL_RE.test(cleanEmail)) {
    return NextResponse.json(
      { ok: false, error: "Enter a valid email address." },
      { status: 400 }
    );
  }

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

  // Insert pending enrollment. No OTP is sent here any more — email ownership
  // is proven after payment, on the complete-profile step. Timezone gets a
  // placeholder and is set for real once they complete their profile.
  const { error: insertError } = await supabase
    .from("pending_enrollments")
    .insert({
      name: name.trim(),
      last_name: lastName?.trim() ?? null,
      email: cleanEmail,
      phone: "",
      timezone: DEFAULT_TIMEZONE,
      otp_hash: null,
      otp_attempts: 0,
      otp_expires_at: null,
      phone_verified: false,
      email_reminders: true,
      status: "pending",
    });

  if (insertError) {
    console.error("pending_enrollment insert failed:", insertError);
    return NextResponse.json(
      { ok: false, error: "Something went wrong. Try again." },
      { status: 500 }
    );
  }

  return NextResponse.json({ ok: true });
}