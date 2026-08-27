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
    .select("id, token, status, percent_off, expires_at")
    .eq("token", token)
    .maybeSingle();

  let issue: CouponIssue = null;
  let validToken: string | undefined = undefined;
  let percentOff: number | undefined = undefined;

  if (!coupon) {
    issue = "not_found";
  } else if (coupon.status === "redeemed") {
    issue = "redeemed";
  } else if (coupon.status === "revoked") {
    issue = "revoked";
  } else if (coupon.expires_at && new Date(coupon.expires_at) < new Date()) {
    issue = "expired";
  } else {
    validToken = coupon.token;
    percentOff = coupon.percent_off;
  }

  return (
    <EnrollForm
      couponToken={validToken}
      percentOff={percentOff}
      couponIssue={issue}
    />
  );
}