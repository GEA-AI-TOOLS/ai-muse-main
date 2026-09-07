// Pre-launch sale configuration.
// Flip SALE_MODE to false to return to completely normal behaviour.
// Nothing else needs changing when you do.

export const SALE_MODE = false;

// Monday the pre-launch cohort starts. Lessons unlock 00:00 UTC this day.
export const SALE_COHORT_START = "2026-09-7";

// Stripe price used while SALE_MODE is on.
export const ACTIVE_PRICE_ID = SALE_MODE
  ? process.env.STRIPE_PRICE_ID_SALE ?? process.env.STRIPE_PRICE_ID!
  : process.env.STRIPE_PRICE_ID!;