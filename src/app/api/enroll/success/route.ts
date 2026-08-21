import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import { supabase } from "@/lib/supabase";
import { fulfillEnrollment } from "@/lib/enrollment";
import { track } from "@vercel/analytics/server";
import {
  generateSessionToken,
  parseDeviceLabel,
  AUTH_COOKIE_OPTIONS,
  SESSION_COOKIE_OPTIONS,
} from "@/lib/cookies";

export const dynamic = "force-dynamic";

const APP_URL = process.env.NEXT_PUBLIC_APP_URL!;

export async function GET(req: NextRequest) {
  const sessionId = req.nextUrl.searchParams.get("session_id");

  const fallback = NextResponse.redirect(APP_URL + "/enroll/success?manual=1");

  if (!sessionId || !process.env.STRIPE_SECRET_KEY) {
    return fallback;
  }

  try {
    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
    const session = await stripe.checkout.sessions.retrieve(sessionId);

    if (session.payment_status !== "paid") {
      return fallback;
    }

    const pendingId = session.metadata?.pending_enrollment_id;
    if (!pendingId) {
      return fallback;
    }

    const result = await fulfillEnrollment(session.id, pendingId, session.created);
    await track("enroll_completed");

    if (!result) {
      return fallback;
    }

    const { data: participant } = await supabase
      .from("participants")
      .select("id, name, email, cohort_id, current_day, status, revoked")
      .eq("id", result.participantId)
      .single();

    if (!participant || participant.revoked) {
      return fallback;
    }

    // Version gate: don't auto-login live-cohort accounts on the video deployment
    const { data: scCohort } = await supabase
      .from("cohorts")
      .select("cohort_type")
      .eq("cohort_id", participant.cohort_id)
      .single();

    if (scCohort?.cohort_type === "live") {
      return fallback;
    }

    const { data: dayStates } = await supabase
      .from("participant_day_state")
      .select("day, done_at")
      .eq("participant_id", participant.id);

    const daysComplete = (dayStates ?? [])
      .filter((d) => d.done_at !== null)
      .map((d) => d.day as number);

    const token = generateSessionToken();
    const ua = req.headers.get("user-agent") ?? "";
    const expiresAt = new Date(Date.now() + 60 * 60 * 24 * 30 * 1000).toISOString();

    const { error: sessErr } = await supabase.from("sessions").insert({
      participant_id: participant.id,
      session_token: token,
      device_label: parseDeviceLabel(ua),
      expires_at: expiresAt,
      last_seen_at: new Date().toISOString(),
    });

    if (sessErr) {
      console.error("enroll/success: session insert failed:", sessErr);
      return fallback;
    }

    const sessionData = {
      name: participant.name,
      email: participant.email,
      cohortId: participant.cohort_id,
      currentDay: participant.current_day,
      daysComplete,
      revoked: participant.revoked,
      status: participant.status,
      fetchedAt: Date.now(),
    };

    const res = NextResponse.redirect(APP_URL + "/enroll/complete");
    res.cookies.set("auth", token, AUTH_COOKIE_OPTIONS);
    res.cookies.set("session_data", JSON.stringify(sessionData), SESSION_COOKIE_OPTIONS);

    return res;
  } catch (err) {
    console.error("enroll/success: auto-login failed:", err);
    return fallback;
  }
}