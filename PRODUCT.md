# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

Primary: company and team buyers, HR / L&D / transformation and leadership teams
evaluating SPARKS for their organization (confirmed as primary audience for the
landing page). Their job is to vet a training program for measurable behavior
change before recommending or purchasing it for a cohort.

Secondary: individual professionals and leaders buying the self-paced 10-day
course directly ($147 launch price), doing the course on their own time to get
better, provable results from AI.

## Product Purpose

SPARKS is a 10-day, 10-minutes-a-day course by Bryan Cassady that teaches six
behaviors for working with AI (Speak it out, Pivot roles, Ask for more,
Reframe, Keep going, Stop and think). Success is a measured before/after shift
in how a participant collaborates with AI, not just completion.

## Positioning

"The only AI course that proves it worked." Every participant is scored before
and after via an AI-collaboration assessment (built on ~90 academic studies)
that reads actual AI usage patterns rather than self-reported confidence. A
competing course can claim results; it cannot show the same before/after
scored delta built into the product itself.

## Operating Context

- Self-paced, browser-based. Each day: a short video, a written summary, and
  an exercise run on the participant's own real work.
- Daily rhythm kept via lesson emails plus reminders (email and WhatsApp).
- Tool-agnostic: exercises work with ChatGPT, Claude, and Gemini.
- `/audit` and `/audit/lesson/[day]` is the existing public preview surface
  (Day 1 fully open, no signup) that landing-page CTAs link to.
- Company path is not self-serve: it routes to direct contact/sales
  (`mailto:` today), not a checkout flow.
- Assessment prompt is copy-pasted by the user into their own AI chat; it is
  not run inside the product.

## Capabilities and Constraints

- Stack: Next.js 16, Supabase, Vercel, Stripe, Mux, Twilio/WhatsApp, Brevo.
- No em dashes anywhere (copy, code comments, commit messages).
- Landing page copy, stats, curriculum, testimonials, and prompts are
  centralized in `src/lib/landing-config.ts`; components must not hardcode
  copy.
- No specific accessibility standard is mandated (confirmed); follow general
  best practice (semantic HTML, contrast, respect `prefers-reduced-motion`,
  already implemented in `landing-ui.tsx`).
- Enterprise/company contact is currently a plain `mailto:`; may become a form
  later (open, not yet decided).

## Brand Commitments

- Course name: SPARKS. Site header brand line: "Make AI Your Muse."
- Author: Bryan Cassady, bestselling author (CYCLES, The Generative
  Organization), 40,000+ leaders trained across 200+ organizations in 32
  countries.
- Primary accent per CLAUDE.md: `#E24B4A`, white background, minimal, no
  purple gradients, no Inter-default look. Note: `landing-config.ts`'s
  shareable-image-card spec independently states red accent `#E63329` for
  that one generated asset; flagged as a discrepancy to resolve, not
  resolved here.

## Evidence on Hand

- Cohort numbers (before/after scores, NPS, slope-graph participants) are
  explicitly marked as sample/placeholder data pending real cleaned cohort
  results.
- Testimonials in `LANDING.testimonials.items` are explicitly placeholder
  quotes; must not be presented as real.
- Brand/logo strip (`LANDING.brands`) is placeholder names with no logo
  assets yet.
- Pricing `salePrice: 147` is provisional, unconfirmed against Stripe.
- FAQ refund-policy answer is an explicit placeholder ("Write the real policy
  before launch").
- Bio audio is a royalty-free stand-in track, not Bryan's real recording.
- Future work must not fabricate real testimonials, brand logos, cohort
  statistics, or a refund policy beyond what is explicitly marked provisional
  above.

## Product Principles

1. Prove, don't promise: every claim of behavior change ties back to the
   before/after assessment mechanism, not testimonials or vibes.
2. Company/team buyers are the primary conversion target for this landing
   page; the individual self-serve path stays a strong secondary, not an
   afterthought.
3. Never let placeholder data (stats, testimonials, brand logos, refund
   policy) read as real to a visitor.
4. Content lives in `landing-config.ts`; the page is presentation only.
5. Tool-agnostic by design: nothing on the page should imply lock-in to one
   AI provider.

## Accessibility & Inclusion

No formal standard required (confirmed). No known specific user accessibility
need beyond general best practice.
