import Stripe from "stripe";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { supabase } from "@/lib/supabase";
import { fulfillEnrollment } from "@/lib/enrollment";
import {
  generateSessionToken,
  parseDeviceLabel,
  AUTH_COOKIE_OPTIONS,
  SESSION_COOKIE_OPTIONS,
} from "@/lib/cookies";
import { headers } from "next/headers";

export const dynamic = "force-dynamic";

interface Props {
  searchParams: Promise<{ session_id?: string }>;
}

async function autoLogin(participantId: string): Promise<boolean> {
  const { data: participant } = await supabase
    .from("participants")
    .select("id, name, email, cohort_id, current_day, status, revoked")
    .eq("id", participantId)
    .single();

  if (!participant || participant.revoked) return false;

  const { data: dayStates } = await supabase
    .from("participant_day_state")
    .select("day, done_at")
    .eq("participant_id", participantId);

  const daysComplete = (dayStates ?? [])
    .filter((d) => d.done_at !== null)
    .map((d) => d.day as number);

  // Mint a session row
  const token = generateSessionToken();
  const hdrs = await headers();
  const ua = hdrs.get("user-agent") ?? "";
  const expiresAt = new Date(Date.now() + 60 * 60 * 24 * 30 * 1000).toISOString();

  const { error: sessErr } = await supabase.from("sessions").insert({
    participant_id: participantId,
    session_token: token,
    device_label: parseDeviceLabel(ua),
    expires_at: expiresAt,
    last_seen_at: new Date().toISOString(),
  });

  if (sessErr) {
    console.error("autoLogin: session insert failed:", sessErr);
    return false;
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

  const store = await cookies();
  store.set("auth", token, AUTH_COOKIE_OPTIONS);
  store.set("session_data", JSON.stringify(sessionData), SESSION_COOKIE_OPTIONS);

  return true;
}

export default async function EnrollSuccessPage({ searchParams }: Props) {
  const { session_id } = await searchParams;

  let loggedIn = false;

  if (session_id && process.env.STRIPE_SECRET_KEY) {
    try {
      const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
      const session = await stripe.checkout.sessions.retrieve(session_id);

      // Gate: only proceed for a genuinely paid session
      if (session.payment_status === "paid") {
        const pendingId = session.metadata?.pending_enrollment_id;
        if (pendingId) {
          // Same idempotent helper the webhook uses — race-proof
          const result = await fulfillEnrollment(session.id, pendingId, session.created);
          if (result) {
            loggedIn = await autoLogin(result.participantId);
          }
        }
      }
    } catch (err) {
      console.error("EnrollSuccess: auto-login failed:", err);
      // fall through to manual-login screen
    }
  }

  if (loggedIn) {
    redirect("/progress");
  }

  // Fallback — payment went through but auto-login didn't (rare). Manual login.
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="w-full max-w-sm text-center">
        <div className="mb-6 flex justify-center">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#FCEBEB]">
            <span className="text-2xl">✓</span>
          </div>
        </div>
        <h1 className="mb-2 text-xl font-medium">You're enrolled</h1>
        <p className="mb-6 text-sm text-muted-foreground">
          Your payment went through. Check your email for your welcome message, then log in to start.
        </p>
        <a
          href="/login"
          className="inline-block rounded-md bg-[#E24B4A] px-6 py-2.5 text-sm font-medium text-white hover:bg-[#c73f3e]"
        >
          Log in to your course
        </a>
      </div>
    </div>
  );
}