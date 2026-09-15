import { supabase } from "@/lib/supabase";
import { EnrollForm } from "../../enroll-form";

interface Props {
  params: Promise<{ token: string }>;
}

type CouponIssue = "not_found" | "redeemed" | "revoked" | "expired" | null;

export default async function InvitePage({ params }: Props) {
  const { token } = await params;

  const { data: coupon } = await supabase
    .from("coupons")
    .select("id, token, status, percent_off, amount_off_cents, is_unlimited, expires_at")
    .eq("token", token)
    .maybeSingle();

  let issue: CouponIssue = null;
  let validToken: string | undefined = undefined;
  let percentOff: number | undefined = undefined;
  let amountOffCents: number | undefined = undefined;

  if (!coupon) {
    issue = "not_found";
  } else if (coupon.status === "revoked") {
    issue = "revoked";
  } else if (coupon.expires_at && new Date(coupon.expires_at) < new Date()) {
    issue = "expired";
  } else if (coupon.status === "redeemed" && !coupon.is_unlimited) {
    // Unlimited coupons never actually flip to "redeemed" (see
    // create-checkout / fulfillEnrollment), so this branch only ever
    // fires for a genuine single-use coupon that's already been used.
    issue = "redeemed";
  } else {
    validToken = coupon.token;
    if (coupon.percent_off && Number(coupon.percent_off) > 0) {
      percentOff = Number(coupon.percent_off);
    }
    if (coupon.amount_off_cents) {
      amountOffCents = coupon.amount_off_cents;
    }
  }

  return (
    <EnrollForm
      couponToken={validToken}
      percentOff={percentOff}
      amountOffCents={amountOffCents}
      couponIssue={issue}
    />
  );
}