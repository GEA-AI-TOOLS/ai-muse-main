import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { supabase } from "@/lib/supabase";
import { validateSessionToken } from "@/lib/cookies";
import { generateOtp, hashOtp, verifyOtpHash, sendOtpEmail } from "@/lib/otp";
import { sendPhoneOtp, checkPhoneOtp } from "@/lib/phone";
import { sendEnrollmentWelcome } from "@/lib/enrollment";
import { getCohortAccess } from "@/lib/cohort-access";

const OTP_EXPIRY_MINUTES = 10;
const MAX_ATTEMPTS = 5;
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[a-z]{2,}$/i;

export async function POST(req: NextRequest) {
  const cookieStore = await cookies();
  const authToken = cookieStore.get("auth")?.value;

  if (!authToken) {
    return NextResponse.json({ ok: false, error: "Not logged in." }, { status: 401 });
  }

  const participantId = await validateSessionToken(authToken);

  if (!participantId) {
    return NextResponse.json({ ok: false, error: "Session expired." }, { status: 401 });
  }

  const { data: participant } = await supabase
    .from("participants")
    .select("id, name, email, pending_email, phone, email_verified, phone_verified, setup_otp_hash, setup_otp_attempts, setup_otp_expires_at, profile_completed_at")
    .eq("id", participantId)
    .single();

  if (!participant) {
    return NextResponse.json({ ok: false, error: "Account not found." }, { status: 404 });
  }

  if (participant.profile_completed_at) {
    return NextResponse.json(
      { ok: false, error: "Setup is already complete." },
      { status: 409 }
    );
  }

  const body = await req.json();
  const { action } = body;

  // ---------- send-otp ----------

  if (action === "send-otp") {
    const { email, timezone, phone, emailReminders } = body;

    if (!email || !timezone) {
      return NextResponse.json(
        { ok: false, error: "Email and timezone are required." },
        { status: 400 }
      );
    }

    const cleanEmail = String(email).toLowerCase().trim();
    const cleanPhone = typeof phone === "string" ? phone.trim() : "";
    const hasPhone = cleanPhone.length > 0;

    if (!EMAIL_RE.test(cleanEmail)) {
      return NextResponse.json(
        { ok: false, error: "Enter a valid email address." },
        { status: 400 }
      );
    }

    // Email is unchanged and already verified — nothing to re-send or
    // re-verify for it. This is the common "went back, came forward again"
    // path, not a correction.
    const emailUnchanged = cleanEmail === participant.email;
    const emailAlreadyVerified = emailUnchanged && participant.email_verified;

    // Same idea for phone: same number, already verified, don't re-send.
    const phoneUnchanged = cleanPhone === (participant.phone ?? "").trim();
    const phoneAlreadyVerified = hasPhone && phoneUnchanged && participant.phone_verified;

    // If they corrected their email to something new, make sure it is not
    // already taken.
    if (!emailUnchanged) {
      const { data: taken } = await supabase
        .from("participants")
        .select("id")
        .eq("email", cleanEmail)
        .neq("id", participantId)
        .maybeSingle();

      if (taken) {
        return NextResponse.json(
          { ok: false, error: "That email is already used by another account." },
          { status: 409 }
        );
      }
    }

    // Changing the email or phone number invalidates any prior verification
    // on that field — only an unchanged value keeps its verified status.
    const updatePayload: Record<string, unknown> = {
      timezone,
      phone: cleanPhone,
      email_reminders: emailReminders ?? true,
      updated_at: new Date().toISOString(),
    };

    if (!emailAlreadyVerified) {
      updatePayload.pending_email = cleanEmail;
    } else {
      updatePayload.pending_email = null;
    }

    if (!emailUnchanged) {
      updatePayload.email_verified = false;
    }
    if (hasPhone && !phoneUnchanged) {
      updatePayload.phone_verified = false;
    }
    if (!hasPhone) {
      updatePayload.phone_verified = false;
    }

    let otp: string | null = null;
    if (!emailAlreadyVerified) {
      otp = generateOtp();
      const expiresAt = new Date(Date.now() + OTP_EXPIRY_MINUTES * 60 * 1000).toISOString();
      updatePayload.setup_otp_hash = hashOtp(otp);
      updatePayload.setup_otp_attempts = 0;
      updatePayload.setup_otp_expires_at = expiresAt;
    }

    const { error: updateError } = await supabase
      .from("participants")
      .update(updatePayload)
      .eq("id", participantId);

    if (updateError) {
      console.error("complete: profile save failed:", updateError);
      return NextResponse.json(
        { ok: false, error: "Could not save your details. Try again." },
        { status: 500 }
      );
    }

    const sends: Promise<void>[] = [];

    if (!emailAlreadyVerified && otp) {
      sends.push(sendOtpEmail(cleanEmail, participant.name, otp));
    }
    if (hasPhone && !phoneAlreadyVerified) {
      sends.push(sendPhoneOtp(cleanPhone));
    }

    try {
      await Promise.all(sends);
    } catch (err) {
      console.error("complete: otp send failed:", err);
      return NextResponse.json(
        { ok: false, error: "Failed to send the code. Check the address and try again." },
        { status: 500 }
      );
    }

    return NextResponse.json({
      ok: true,
      hasPhone,
      emailAlreadyVerified,
      phoneAlreadyVerified,
    });
  }

  // ---------- verify-email (mandatory) ----------
  // Only marks email_verified. Never finalizes the profile on its own —
  // that only happens via the explicit "finish" action below, once the
  // frontend's own gate (email verified, and phone verified-or-skipped)
  // is satisfied.

  if (action === "verify-email") {
    const { emailOtp } = body;

    if (!emailOtp) {
      return NextResponse.json({ ok: false, error: "Code required." }, { status: 400 });
    }

    if (participant.setup_otp_attempts >= MAX_ATTEMPTS) {
      return NextResponse.json(
        { ok: false, error: "Too many attempts. Request a new code." },
        { status: 429 }
      );
    }

    if (!participant.setup_otp_expires_at || new Date(participant.setup_otp_expires_at) < new Date()) {
      return NextResponse.json(
        { ok: false, error: "Code expired. Go back and request a new one." },
        { status: 401 }
      );
    }

    if (!participant.setup_otp_hash || !verifyOtpHash(String(emailOtp).trim(), participant.setup_otp_hash)) {
      await supabase
        .from("participants")
        .update({ setup_otp_attempts: participant.setup_otp_attempts + 1 })
        .eq("id", participantId);

      const remaining = MAX_ATTEMPTS - participant.setup_otp_attempts - 1;

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

    const finalEmail = participant.pending_email ?? participant.email;

    const { error: emailFinalError } = await supabase
      .from("participants")
      .update({
        email: finalEmail,
        pending_email: null,
        email_verified: true,
        setup_otp_hash: null,
        setup_otp_attempts: 0,
        setup_otp_expires_at: null,
        updated_at: new Date().toISOString(),
      })
      .eq("id", participantId);

    if (emailFinalError) {
      console.error("complete: email finalize failed:", emailFinalError);
      return NextResponse.json(
        { ok: false, error: "Could not verify email. Try again." },
        { status: 500 }
      );
    }

    // Force the session_data cookie to refetch, the email may have changed.
    cookieStore.delete("session_data");

    return NextResponse.json({ ok: true });
  }

  // ---------- verify-phone (optional) ----------
  // Only marks phone_verified. Does not finalize the profile.

  if (action === "verify-phone") {
    const { whatsappOtp } = body;

    if (!whatsappOtp || !participant.phone) {
      return NextResponse.json({ ok: false, error: "Code required." }, { status: 400 });
    }

    const approved = await checkPhoneOtp(participant.phone, String(whatsappOtp).trim());

    if (!approved) {
      return NextResponse.json(
        { ok: false, error: "Incorrect or expired code." },
        { status: 401 }
      );
    }

    const { error: phoneFinalError } = await supabase
      .from("participants")
      .update({
        phone_verified: true,
        whatsapp_reminders: true,
        updated_at: new Date().toISOString(),
      })
      .eq("id", participantId);

    if (phoneFinalError) {
      console.error("complete: phone finalize failed:", phoneFinalError);
      return NextResponse.json(
        { ok: false, error: "Could not verify phone. Try again." },
        { status: 500 }
      );
    }

    return NextResponse.json({ ok: true });
  }

  // ---------- finish (explicit, only action that finalizes) ----------
  // The frontend only calls this once its own gate is satisfied:
  //   email verified, AND (no phone OR phone verified OR phone skipped).
  // We re-check the email condition server-side too, since that one is
  // never safe to trust from the client. Phone/skip is a UX-only gate —
  // the phone number was already saved back at send-otp regardless.

  if (action === "finish") {
    if (!participant.email_verified) {
      return NextResponse.json(
        { ok: false, error: "Verify your email first." },
        { status: 400 }
      );
    }

    const { error: finishError } = await supabase
      .from("participants")
      .update({ profile_completed_at: new Date().toISOString() })
      .eq("id", participantId);

    if (finishError) {
      console.error("complete: finish failed:", finishError);
      return NextResponse.json(
        { ok: false, error: "Could not finish setup. Try again." },
        { status: 500 }
      );
    }

    await sendEnrollmentWelcome(participantId);

    // Sale-batch cohorts stay locked until their access date. Send those
    // people to /waiting instead of dropping them on an empty /progress.
    let redirectTo = "/progress";

    const { data: fresh } = await supabase
      .from("participants")
      .select("cohort_id")
      .eq("id", participantId)
      .single();

    if (fresh?.cohort_id) {
      const access = await getCohortAccess(fresh.cohort_id);
      if (access.locked) {
        redirectTo = "/waiting";
      }
    }

    return NextResponse.json({ ok: true, redirectTo });
  }

  return NextResponse.json({ ok: false, error: "Unknown action." }, { status: 400 });
}