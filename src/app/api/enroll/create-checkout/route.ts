import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import { supabase } from "@/lib/supabase";
import { ACTIVE_PRICE_ID } from "@/lib/launch-config";

const APP_URL = process.env.NEXT_PUBLIC_APP_URL!;

export async function POST(req: NextRequest) {

  if (!process.env.STRIPE_SECRET_KEY) {
    return NextResponse.json({ ok: false, error: "Stripe not configured." }, { status: 500 });
  }
  if (!ACTIVE_PRICE_ID) {
    return NextResponse.json({ ok: false, error: "Price ID not configured." }, { status: 500 });
  }

  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
  
  const body = await req.json();
  const { email } = body;

  if (!email) {
    return NextResponse.json(
      { ok: false, error: "Email required." },
      { status: 400 }
    );
  }

  const cleanEmail = email.toLowerCase().trim();

  // Light server-side sanity check. Stripe Checkout validates format again on
  // their own page, so this is just a cheap guard against obvious garbage.
  if (!/^[^\s@]+@[^\s@]+\.[a-z]{2,}$/i.test(cleanEmail)) {
    return NextResponse.json(
      { ok: false, error: "Enter a valid email address." },
      { status: 400 }
    );
  }

  // Find the pending enrollment. Verification no longer gates checkout —
  // email ownership is proven after payment on the complete-profile step.
  const { data: enrollment, error } = await supabase
    .from("pending_enrollments")
    .select("id, name, email")
    .eq("email", cleanEmail)
    .eq("status", "pending")
    .order("created_at", { ascending: false })
    .limit(1)
    .single();

  if (error || !enrollment) {
    return NextResponse.json(
      { ok: false, error: "Enrollment not found. Please start over." },
      { status: 404 }
    );
  }

  // Create Stripe Checkout session
  const session = await stripe.checkout.sessions.create({
    mode: "payment",
    line_items: [
      {
        price: ACTIVE_PRICE_ID,
        quantity: 1,
      },
    ],
    allow_promotion_codes: true,
    customer_email: cleanEmail,
    metadata: {
      pending_enrollment_id: enrollment.id,
      participant_name: enrollment.name,
      participant_email: enrollment.email,
    },
    success_url: APP_URL + "/api/enroll/success?session_id={CHECKOUT_SESSION_ID}",
    cancel_url: APP_URL + "/enroll/cancelled",
  });

  // Store session ID on pending enrollment
  await supabase
    .from("pending_enrollments")
    .update({ stripe_session_id: session.id })
    .eq("id", enrollment.id);

  return NextResponse.json({ url: session.url });
}