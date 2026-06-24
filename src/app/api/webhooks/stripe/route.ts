import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import { fulfillEnrollment } from "@/lib/enrollment";

let stripe: Stripe;

function getUpcomingMonday(fromDate: Date): Date {
  const date = new Date(fromDate);
  const day = date.getUTCDay(); // 0=Sun, 1=Mon...
  // Days until next Monday
  const daysUntilMonday = day === 0 ? 1 : day === 1 ? 7 : 8 - day;
  date.setUTCDate(date.getUTCDate() + daysUntilMonday);
  date.setUTCHours(0, 0, 0, 0);
  return date;
}

function formatCohortId(monday: Date): string {
  const y = monday.getUTCFullYear();
  const m = String(monday.getUTCMonth() + 1).padStart(2, "0");
  const d = String(monday.getUTCDate()).padStart(2, "0");
  return "cohort_" + y + "_" + m + "_" + d;
}

export async function POST(req: NextRequest) {
  stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);
  const body = await req.text();
  const sig = req.headers.get("stripe-signature");

  if (!sig) {
    return NextResponse.json({ error: "No signature." }, { status: 400 });
  }

  let stripeEvent: Stripe.Event;

  try {
    stripeEvent = stripe.webhooks.constructEvent(
      body,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET!
    );
  } catch (err) {
    console.error("Webhook signature verification failed:", err);
    return NextResponse.json({ error: "Invalid signature." }, { status: 400 });
  }

  // Only handle checkout completion
  if (stripeEvent.type !== "checkout.session.completed") {
    return NextResponse.json({ received: true });
  }

  const session = stripeEvent.data.object as Stripe.Checkout.Session;

  const pendingId = session.metadata?.pending_enrollment_id;
  if (!pendingId) {
    console.error("No pending_enrollment_id in metadata");
    return NextResponse.json({ received: true });
  }

  const result = await fulfillEnrollment(session.id, pendingId, session.created);

  if (!result) {
    // Creation genuinely failed (not just "already existed") — let Stripe retry
    return NextResponse.json({ error: "Fulfillment failed." }, { status: 500 });
  }

  console.log("Webhook fulfilled:", session.id, "existed:", result.alreadyExisted);
  return NextResponse.json({ received: true });
}const session = event.data.object as Stripe.Checkout.Session;

  const pendingId = session.metadata?.pending_enrollment_id;
  if (!pendingId) {
    console.error("No pending_enrollment_id in metadata");
    return NextResponse.json({ received: true });
  }

  const result = await fulfillEnrollment(session.id, pendingId, session.created);

  if (!result) {
    // Genuine failure (not "already existed") — let Stripe retry
    return NextResponse.json({ error: "Fulfillment failed." }, { status: 500 });
  }

  console.log("Webhook fulfilled:", session.id, "existed:", result.alreadyExisted);
  return NextResponse.json({ received: true });
}