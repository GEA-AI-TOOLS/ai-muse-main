import Stripe from "stripe";
import { fulfillEnrollment } from "@/lib/enrollment";

export const dynamic = "force-dynamic";

interface Props {
  searchParams: Promise<{ session_id?: string }>;
}

export default async function EnrollSuccessPage({ searchParams }: Props) {
  const { session_id } = await searchParams;

  // Backup fulfillment in case the webhook is slow or failed.
  // Idempotent — safe if the webhook already ran.
  if (session_id && process.env.STRIPE_SECRET_KEY) {
    try {
      const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
      const session = await stripe.checkout.sessions.retrieve(session_id);

      if (session.payment_status === "paid") {
        const pendingId = session.metadata?.pending_enrollment_id;
        if (pendingId) {
          await fulfillEnrollment(session.id, pendingId, session.created);
        }
      }
    } catch (err) {
      console.error("EnrollSuccess: fulfillment check failed:", err);
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="w-full max-w-sm text-center">
        <div className="mb-6 flex justify-center">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#FCEBEB]">
            <span className="text-2xl">✓</span>
          </div>
        </div>
        <h1 className="mb-2 text-xl font-medium">You&apos;re enrolled</h1>
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