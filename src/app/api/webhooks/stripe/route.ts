import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import { fulfillEnrollment } from "@/lib/enrollment";

let stripe: Stripe;

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
    // Genuine failure (not "already existed") — let Stripe retry
    return NextResponse.json({ error: "Fulfillment failed." }, { status: 500 });
  }

  console.log("Webhook fulfilled:", session.id, "existed:", result.alreadyExisted);
  return NextResponse.json({ received: true });
}