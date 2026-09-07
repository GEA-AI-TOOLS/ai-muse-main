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

  // Block anyone who already has a participant account for this email,
  // regardless of status — active, completed, inactive, or needs_attention
  // all mean a real paid enrollment already exists, and letting them
  // through to a second checkout would double-charge them.
  const { data: existing } = await supabase
    .from("participants")
    .select("id, status, revoked")
    .eq("email", cleanEmail)
    .maybeSingle();

  if (existing) {
    return NextResponse.json(
      {
        ok: false,
        field: "email",
        error: "This email is already enrolled. Log in instead, or use a different email.",
      },
      { status: 409 }
    );
  }

  // Check for a checkout genuinely in progress before expiring anything.
  // A row with a stripe_session_id and a recent updated_at means someone
  // is (or very recently was) mid-payment for this email — silently
  // expiring it out from under them orphans their Stripe session and
  // any coupon tied to it. Only treat it as stale after a grace window.
  const CHECKOUT_GRACE_MINUTES = 30;

  const { data: inFlight } = await supabase
    .from("pending_enrollments")
    .select("id, updated_at, stripe_session_id")
    .eq("email", cleanEmail)
    .in("status", ["pending", "verified"])
    .not("stripe_session_id", "is", null)
    .order("updated_at", { ascending: false })
    .limit(1)
    .maybeSingle();

  if (inFlight) {
    const ageMinutes = (Date.now() - new Date(inFlight.updated_at).getTime()) / 60000;
    if (ageMinutes < CHECKOUT_GRACE_MINUTES) {
      return NextResponse.json(
        {
          ok: false,
          error:
            "You already have a checkout in progress for this email. " +
            "Check your email for the payment link, or wait a few minutes and try again.",
        },
        { status: 409 }
      );
    }
  }

  // Expire any previous pending enrollments for this email — safe now,
  // since a genuinely in-flight checkout would have been caught above.
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