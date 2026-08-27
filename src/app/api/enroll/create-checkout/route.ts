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
  const { email, couponToken } = body;

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

  let couponRow: { id: string; stripe_promotion_code_id: string } | null = null;

  if (couponToken) {
    const { data } = await supabase
      .from("coupons")
      .select("id, stripe_promotion_code_id, status, expires_at")
      .eq("token", couponToken)
      .maybeSingle();

    const expired = !!data?.expires_at && new Date(data.expires_at) < new Date();

    // Re-validate fresh, right now — the page that sent this token may have
    // loaded minutes or hours ago. Someone else could have redeemed it or
    // an admin could have revoked it since. Only "unused" or
    // "checkout_started" (an earlier abandoned attempt) are acceptable
    // states to attach to a new Checkout Session.
    const stillRedeemable =
      !!data && !expired && (data.status === "unused" || data.status === "checkout_started");

    if (stillRedeemable && data) {
      couponRow = { id: data.id, stripe_promotion_code_id: data.stripe_promotion_code_id };
    }
    // If the coupon has since become invalid, fall through silently to a
    // normal, non-discounted checkout rather than failing the request.
  }

  // Stripe treats `allow_promotion_codes` and `discounts` as mutually
  // exclusive if BOTH keys are present on the object at all — even when one
  // is false/undefined, the JSON body still includes the key. Must build
  // the params conditionally and never let both keys exist together.
  const sessionParams: Stripe.Checkout.SessionCreateParams = {
    mode: "payment",
    line_items: [
      {
        price: ACTIVE_PRICE_ID,
        quantity: 1,
      },
    ],
    customer_email: cleanEmail,
    metadata: {
      pending_enrollment_id: enrollment.id,
      participant_name: enrollment.name,
      participant_email: enrollment.email,
      coupon_id: couponRow?.id ?? "",
    },
    success_url: APP_URL + "/api/enroll/success?session_id={CHECKOUT_SESSION_ID}",
    cancel_url: APP_URL + "/enroll/cancelled",
  };

  if (couponRow) {
    sessionParams.discounts = [{ promotion_code: couponRow.stripe_promotion_code_id }];
  } else {
    sessionParams.allow_promotion_codes = true;
  }

  // Create Stripe Checkout session
  const session = await stripe.checkout.sessions.create(sessionParams);

  // Store session ID on pending enrollment
  await supabase
    .from("pending_enrollments")
    .update({ stripe_session_id: session.id })
    .eq("id", enrollment.id);

  if (couponRow) {
    await supabase
      .from("coupons")
      .update({ status: "checkout_started", stripe_checkout_session_id: session.id })
      .eq("id", couponRow.id);
  }

  return NextResponse.json({ url: session.url });
}