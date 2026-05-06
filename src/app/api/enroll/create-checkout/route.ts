import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import { supabase } from "@/lib/supabase";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);
const APP_URL = process.env.NEXT_PUBLIC_APP_URL!;

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { email } = body;

  if (!email) {
    return NextResponse.json(
      { ok: false, error: "Email required." },
      { status: 400 }
    );
  }

  const cleanEmail = email.toLowerCase().trim();

  // Find the verified pending enrollment
  const { data: enrollment, error } = await supabase
    .from("pending_enrollments")
    .select("id, name, email")
    .eq("email", cleanEmail)
    .eq("status", "verified")
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
        price: process.env.STRIPE_PRICE_ID!,
        quantity: 1,
      },
    ],
    customer_email: cleanEmail,
    metadata: {
      pending_enrollment_id: enrollment.id,
      participant_name: enrollment.name,
      participant_email: enrollment.email,
    },
    success_url: APP_URL + "/enroll/success?session_id={CHECKOUT_SESSION_ID}",
    cancel_url: APP_URL + "/enroll/cancelled",
  });

  // Store session ID on pending enrollment
  await supabase
    .from("pending_enrollments")
    .update({ stripe_session_id: session.id })
    .eq("id", enrollment.id);

  return NextResponse.json({ url: session.url });
}