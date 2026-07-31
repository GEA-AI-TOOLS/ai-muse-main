---
name: SPARKS Landing (Make AI Your Muse)
description: Dark cinematic landing page for the SPARKS 10-day AI course by Bryan Cassady
colors:
  bg-void: "#070304"
  bg-panel-section: "#090405"
  bg-deep: "#050203"
  primary: "#E24B4A"
  primary-hover: "#ff5a56"
  primary-deep: "#7A2320"
  hero-shader-red: "#ff2121"
  accent-rose: "#F09595"
  accent-coral: "#ff8a82"
  accent-coral-light: "#ff9a92"
  accent-highlight: "#FFD9C2"
  cta-fill: "#C81E3A"
  cta-fill-hover: "#E0233F"
  before-signal: "#7C93B3"
  curriculum-navy: "#050810"
  signal-bright: "#FF3B3B"
  glow-tint-warm: "rgba(255,130,100,0.14)"
  glow-tint-hot: "rgba(255,70,70,0.14)"
  glow-tint-ember: "rgba(106,16,23,0.38)"
  success: "#0F6E56"
  neutral-white: "#ffffff"
  neutral-300: "#d4d4d4"
  neutral-400: "#a3a3a3"
  neutral-500: "#737373"
  neutral-600: "#525252"
typography:
  display:
    fontFamily: "Fraunces, Georgia, serif"
    fontSize: "clamp(2.5rem, 5vw, 3.5rem)"
    fontWeight: 400
    lineHeight: 1.1
    letterSpacing: "normal"
  stat:
    fontFamily: "Fraunces, Georgia, serif"
    fontSize: "clamp(2.75rem, 4vw, 3.125rem)"
    fontWeight: 400
    lineHeight: 1
    letterSpacing: "normal"
  stat-compact:
    fontFamily: "Fraunces, Georgia, serif"
    fontSize: "36px"
    fontWeight: 400
    lineHeight: 1
    letterSpacing: "normal"
  headline:
    fontFamily: "Fraunces, Georgia, serif"
    fontSize: "clamp(1.75rem, 4vw, 2.125rem)"
    fontWeight: 400
    lineHeight: 1.2
    letterSpacing: "normal"
  headline-lg:
    fontFamily: "Fraunces, Georgia, serif"
    fontSize: "clamp(2rem, 5vw, 2.625rem)"
    fontWeight: 400
    lineHeight: 1.2
    letterSpacing: "normal"
  title:
    fontFamily: "Fraunces, Georgia, serif"
    fontSize: "1.25rem"
    fontWeight: 400
    lineHeight: 1.25
    letterSpacing: "normal"
  body-lg:
    fontFamily: "Geist, ui-sans-serif, system-ui"
    fontSize: "17px"
    fontWeight: 400
    lineHeight: 1.6
  body:
    fontFamily: "Geist, ui-sans-serif, system-ui"
    fontSize: "15px"
    fontWeight: 400
    lineHeight: 1.6
  body-sm:
    fontFamily: "Geist, ui-sans-serif, system-ui"
    fontSize: "13px"
    fontWeight: 400
    lineHeight: 1.5
  label:
    fontFamily: "Geist, ui-sans-serif, system-ui"
    fontSize: "11px"
    fontWeight: 500
    lineHeight: 1.3
    letterSpacing: "0.14em"
  caption:
    fontFamily: "Geist, ui-sans-serif, system-ui"
    fontSize: "12px"
    fontWeight: 400
    lineHeight: 1.3
    letterSpacing: "normal"
rounded:
  sm: "6px"
  md: "10px"
  lg: "16px"
  xl: "24px"
  full: "9999px"
spacing:
  xs: "8px"
  sm: "12px"
  md: "20px"
  lg: "32px"
  xl: "64px"
  section-y: "96px"
components:
  button-primary:
    backgroundColor: "{colors.cta-fill}"
    textColor: "{colors.neutral-white}"
    rounded: "{rounded.md}"
    padding: "12px 24px"
  button-primary-hover:
    backgroundColor: "{colors.cta-fill-hover}"
  button-ghost:
    backgroundColor: "transparent"
    textColor: "{colors.neutral-white}"
    rounded: "{rounded.md}"
    padding: "12px 24px"
  panel-glass:
    backgroundColor: "rgba(255,255,255,0.045)"
    rounded: "{rounded.xl}"
    padding: "28px"
  badge-neutral:
    backgroundColor: "rgba(255,255,255,0.08)"
    textColor: "{colors.neutral-500}"
    rounded: "{rounded.full}"
    padding: "4px 10px"
  badge-accent-solid:
    backgroundColor: "{colors.cta-fill}"
    textColor: "{colors.neutral-white}"
    rounded: "{rounded.full}"
    padding: "2px 8px"
---

# Design System: SPARKS Landing (Make AI Your Muse)

## Overview

**Creative North Star: "The Late-Night Signal"**

A dark broadcast studio, glowing red in the dark, transmitting proof through noise. The page reads as a signal being received rather than a brochure being read: near-black surfaces, a single red accent doing all the emotional work, film grain over everything, and background elements (scan lines, drifting glows, liquid signal sheets) that behave like a transmission rather than décor. This is not a moody aesthetic pasted onto a normal SaaS layout; the dark cinematic identity is the point, chosen deliberately over an earlier white-background brief because it fits the "proof, not hype" positioning: something serious is being measured in the dark, and the numbers are the light source.

Density is comfortable, not dense: generous vertical rhythm between sections (`py-16 sm:py-24`), single-column content column capped narrow (`max-w-6xl`) inside full-bleed section backgrounds. Motion is restrained and physics-real (long eases, no bounce); glow and grain carry atmosphere so kinetic motion doesn't have to.

**Key Characteristics:**
- Near-black backgrounds with a single warm-red accent doing almost all the work, plus one narrow-purpose steel blue reserved for the before/after proof motif alone
- Full-bleed backgrounds behind a constrained content column (see The Full-Bleed Rule)
- Frosted glass panels that float on the dark backdrop, lit by soft red glow blooms instead of hard drop shadows
- Persistent film grain overlay (`GrainOverlay`) ties every section together as one continuous transmission
- Fraunces serif for anything that needs to feel spoken or declared; Geist sans for everything read at a glance

## Colors

The palette is almost monochrome by design: near-black voids, white/near-white text and glass, with Signal Red carrying emphasis, urgency, and brand identity almost everywhere, Before Signal (steel blue) confined to the before/after proof motif, and two confirmed exceptions (Curriculum Navy, a shared background across a run of sections; Signal Bright, one section's accent) — see Named Rules.

### Primary
- **Signal Red** (`#E24B4A`): the only saturated color in the system. Used for every primary CTA, active state, underline accent, stat highlight, and glow bloom. Hover state lightens to **Hot Red** (`#ff5a56`).
- **Ember Deep** (`#7A2320`): the shadow/base tone under Signal Red on the specular hero button; gives the accent a physical, lit-from-within quality rather than a flat fill.
- **Hero Shader Red** (`#ff2121`): the `Silk` shader's own color in `HeroBackground`, more saturated than Signal Red specifically because it's animated and heavily blurred by motion — a flat color at Signal Red's saturation would read as muddy in motion. Was already the shipped value, just undocumented until now. The CSS-only loading fallback shown before the shader mounts is built from this color plus Cardinal and Ember Deep, so the placeholder reads as the same hero rather than a mismatched flash.

### Secondary
- **Soft Rose** (`#F09595`): the dimmed/secondary state of Signal Red, used for the before/after line gradient's warm end and borders on tinted panels.
- **Coral Text** (`#ff8a82` / `#ff9a92`): Signal Red lightened further for running text and small labels on dark backgrounds, where the full-saturation red would fail contrast or feel aggressive.
- **Cardinal / CTA Fill** (`#C81E3A`, hover `#E0233F` "Cardinal Bright"): the accessible solid-fill background for any button/badge carrying white text, and the pricing card's top accent bar. `#E24B4A` under white text is 3.9:1, below WCAG AA's 4.5:1 floor. Cardinal hits 5.67:1 at rest, Cardinal Bright 4.69:1 on hover (brighter, not lighter-toward-gray, so "hover intensifies" still holds). Chosen for higher chroma than a plain darkened red: same lightness range as a "safe" darker red, but reads as vivid blood red instead of muted brown. Every full-opacity red button/badge uses this pair, not Signal Red directly.
- **Glow Tints** (`rgba(255,130,100,0.14)` warm, `rgba(255,70,70,0.14)` hot, `rgba(106,16,23,0.38)` ember): low-alpha derivatives of Signal Red used exclusively inside decorative blur blobs (`BlobBackground`, `DarkVeilBackground`) — not new hues, tonal variants of the one accent at glow-appropriate opacity.

### Neutral
- **Void** (`#070304`): the page's base background; the darkest surface in the system.
- **Panel Black** (`#090405`): a hair lighter than Void, used to separate section backgrounds (Proof, Brands, Pricing) from the page base.
- **Deep Black** (`#050203`): used specifically behind full-bleed animated backgrounds (hero, final CTA) so glow blooms have maximum contrast to bloom against.
- **White** (`#ffffff`): headlines, primary body copy on dark.
- **Neutral 300–600** (Tailwind `neutral-300` through `neutral-600`): the entire secondary-text hierarchy (sub-copy, captions, disabled states), stepping darker as importance decreases.

### Signal (the default two, plus confirmed per-section exceptions)
- **Before Signal** (`#7C93B3`, a desaturated steel blue): used exclusively for the "before" state in the before/after proof motif (SlopeChart's before-dots and connecting-line gradient, the hero and final-CTA "before" number, the proof tooltip's before value). It exists so the transformation reads as an actual color shift, not a number next to a lighter shade of the same red. Never appears anywhere else.
- **Curriculum Navy** (`#050810`, section background only, see Layout): the confirmed exception to the Void/Panel Black backdrop, shared across three consecutive sections (Curriculum, Included, Explorer) so the run reads as one continuous stretch rather than three separate one-offs. Curriculum's `BlobBackground` glow is re-tinted blue to match; Included and Explorer sit on the flat navy with `GridSpotlightBackground`'s grid lines over it. Red still carries every action/selection state throughout; only the passive background hue changed.
- **Signal Bright** (`#FF3B3B`, a higher-chroma, higher-lightness red than Signal Red): Included's confirmed exception, used for that section's heading, icon chips (solid fill, not the translucent tint the rest of the system uses), the featured tile's title, and hover accents. It exists because the muted translucent-red treatment read as flat there; it is not a general-purpose brighter red for the rest of the system.
- **Pricing Rays** (gold `#EAB308` / light blue `#96c8ff`, decorative only): Pricing's confirmed exception, and the only place genuinely new hues (not a red variant) appear anywhere in the system. Explicitly requested by the user after an earlier red-tinted version of this same effect read as an unwanted reddish wash; these are the `SideRays` component's own defaults, used as-is rather than remapped into the palette. Confined to the `PricingRaysBackground` decorative layer only — every functional element in Pricing (CTAs, check-marks, badges) still uses the system's reds (Cardinal `#C81E3A`), never gold or blue.

### Named Rules
**The Default-Two, Confirmed-Exception Rule.** The system's default palette carries exactly two chromatic colors: Signal Red for emphasis/action/proof, Before Signal (steel blue) for the before-state only. A section (or a confirmed run of adjacent sections, like Curriculum Navy) may carry one additional confirmed, user-directed, named exception (background hue, accent hue) when the default reads as flat there — Curriculum Navy, Signal Bright, and Pricing Rays are the three so far. An exception is scoped to what the user actually confirmed, gets a name and an entry in this file, and is never quietly extended to another section without being asked. Don't invent a new exception, and don't unilaterally decide an existing exception should spread further, without the user asking for that specific change.

**The Accent-Not-Wash Rule.** A confirmed accent color earns its place in small, deliberate doses: a CTA fill, an icon, a border, a badge. It does not earn a whole-section ambient background wash (a full-section `BlobBackground` glow, a tinted flat background color) as the default way to add atmosphere — that reads as "the section is that color" rather than "that color is the accent." Confirmed twice in one round: Testimonials' and Assessment's `BlobBackground` red washes were both removed for reading as reddish/not-dark, while their actual accent elements (kickers, CTAs, check-marks) got brighter, not dimmer.

**The Full-Bleed Rule.** Every section wraps a full-viewport-width background layer (`relative isolate overflow-hidden` + an absolutely-positioned background component) around a horizontally constrained content column (`mx-auto max-w-6xl px-5 sm:px-8`). Backgrounds never get clipped to the content column; content never spans full-bleed.

## Typography

**Display Font:** Fraunces (with Georgia fallback)
**Body Font:** Geist (with ui-sans-serif, system-ui fallback)

**Character:** A wide, warm serif for anything spoken aloud (headlines, prices, stat callouts) paired with a clean, neutral grotesque for everything read at a glance (body copy, labels, UI chrome). The serif carries the "human, a real person made this claim" register; the sans carries the "measured, factual" register. Fraunces was chosen over Instrument Serif specifically because Instrument Serif's condensed proportions read as horizontally squished at display sizes.

### Hierarchy
- **Display** (Fraunces 400, `40px–56px` responsive, `line-height: 1.1`): hero headline only.
- **Stat** (Fraunces 400, `44px–50px`, `line-height: 1`): large numeric callouts (assessment score) — same declarative register as Display, sized for a number rather than a sentence.
- **Stat Compact** (Fraunces 400, `36px`, `line-height: 1`): the pricing card figures specifically — Stat's own size read too large once the pricing cards were compacted to fit heading + both cards in one viewport; this is the deliberate smaller sibling for that one dense-card context, not a system-wide Stat resize.
- **Headline** (Fraunces 400, `28px` mobile / `34px` `sm:` and up, `line-height: 1.2`): section headings (`SectionHeading`, proof heading) — one step below Display, used repeatedly at the top of every major section.
- **Headline Large** (Fraunces 400, `32px` mobile / `42px` `sm:` and up, `line-height: 1.2`): the final CTA's closing heading only — a one-off peak-end moment that reads bigger than a repeated section head but doesn't need Display's full fluid hero clamp.
- **Title** (Fraunces 400/500, `20px–28px`, `line-height: 1.25`): card/panel titles inside expanded curriculum days, price card headings, testimonial video captions.
- **Body Large** (Geist 400, `17px`, `line-height: 1.6`): the hero subhead only — one step up from Body for the single most-read sentence on the page.
- **Body** (Geist 400, `15px`, `line-height: 1.6`): all running copy; kept under ~65ch (`max-w-xl`/`max-w-2xl` containers).
- **Body Small** (Geist 400, `13px`, `line-height: 1.5`): secondary/supporting copy inside dense panels (curriculum before/after example bodies, FAQ answers at this weight in some contexts).
- **Label** (Geist 500, `11px`, `letter-spacing: 0.14em`, uppercase): eyebrows, kickers, section overlines, tab labels, badge/chip text.
- **Caption** (Geist 400, `12px`): micro annotations (word-count under the assessment prompt, axis ticks) — smaller than Label but not uppercase/tracked, used sparingly.

### Named Rules
**The Spoken vs. Measured Rule.** If the copy is a claim, price, or headline, it's Fraunces. If it's a fact, a label, or something scanned rather than read, it's Geist. Never mix the two within the same text role.

**The Nine-Step Rule.** The full type scale is nine named steps (Display, Stat, Headline, Title, Body Large, Body, Body Small, Label, Caption), not four. Every new text element must land on one of these nine values; a font-size that matches none of them is drift, not a tenth step waiting to be invented ad hoc.

## Layout

Content is column-constrained at `max-w-6xl` with `px-5 sm:px-8` gutters, sitting inside full-bleed sections (see The Full-Bleed Rule). Vertical rhythm between sections is generous and consistent: `py-16 sm:py-24` for standard sections, tighter (`py-16 sm:py-20`) for the compact enterprise callout.

Two-column asymmetric splits are the default pattern for content-plus-detail layouts (proof chart + portrait video, assessment prompt + sample output, explorer questions + matches): a flexible primary column (`1fr`) paired with a fixed-width secondary column (`320px`–`400px`), stacking to one column on mobile (`grid-cols-1` → `md:grid-cols-[1fr_Npx]`).

The curriculum section uses a segmented horizontal stepper (11 nodes across `grid-cols-4` mobile / `grid-cols-11` desktop) with a progress line that fills on scroll-into-view; this is the system's one signature structural device beyond the standard section pattern. Each node needs a background-matching mask ring (`shadow-[0_0_0_4px_<bg>]`) so the connecting line appears to run behind it rather than through it; every node in the stepper, including the capstone, must carry this ring or the line visibly cuts across it.

Curriculum, Included, and Explorer together are the system's one deliberate background-color exception (confirmed by the user, extended across all three in the same round): instead of Void/Panel Black, all three run on **Curriculum Navy** (`#050810`). Curriculum layers `BlobBackground` on top with its glow tinted blue (`rgba(58,92,168,0.30)` / `rgba(80,120,190,0.22)` / `rgba(56,180,210,0.16)` via its `colors` prop) instead of red, and node fills shifted to matching dark-navy tones (`#0d1420` SPARKS-day fill, `#0f151f` foundation-day fill, `#0a0f18` mask ring, including the capstone node). Included and Explorer share a **single** `GridSpotlightBackground` instance, mounted once on a wrapper `<div>` around both `<Included />` and `<Explorer />` rather than once per section. This is load-bearing, not tidiness: `GridSpotlightBackground` tracks the cursor via a `mousemove` listener on its own parent element, so two separate instances each reset/clip their glow at their own section boundary, breaking the highlight as the cursor crosses from one into the other. One shared instance on a shared parent makes the cursor-follow glow continuous across both sections. Any future pair of adjacent sections that should feel like one continuous surface (not just matching color) needs this same shared-instance-on-a-shared-wrapper pattern, not just matching `bg-` classes on separate sections. Signal Red still carries all action/selection state throughout this three-section run (day badges, CTAs, icon chips, hover accents) — only the passive background hue changed. `BlobBackground` now accepts a `colors` prop specifically so this kind of section-run variation doesn't require a new component.

The "What you walk away with" grid is a bento layout at `lg` and up: exactly one 2×2 hero tile plus eight uniform 1×1 tiles. This ratio is load-bearing, not stylistic — in a 3-column grid, one 2×2 tile plus two 1×1 tiles exactly fills the first two rows (6 cells), and the remaining six 1×1 tiles exactly fill two more rows, with zero remainder. Adding a second or third wide tile breaks that division and stranded a tile alone on its own row in an earlier version; keep it to exactly one hero tile unless the total item count changes and the arithmetic is redone.

## Elevation & Depth

Depth is conveyed through glass and glow, not directional drop shadows. Panels are translucent (`bg-white/[0.045]` typical), backdrop-blurred (`backdrop-blur-xl`/`2xl`), and bordered in low-opacity white (`border-white/10`) so they read as frosted glass floating over the dark void rather than opaque cards stacked on top of it. Where a shadow does appear, it's a soft ambient spread (`shadow-[0_20-30px_Npx_rgba(0,0,0,0.25-0.4)]`), never a hard offset shadow implying a directional light source.

Red glow blooms (`radial-gradient(circle, rgba(226,75,74,0.1-0.24), transparent 70%)`, heavily blurred) are the system's actual depth cue: elements that matter most sit closest to a bloom.

### Shadow Vocabulary
- **Ambient panel** (`box-shadow: 0 24px 90px rgba(0,0,0,0.34)`): default glass panel elevation.
- **Accent glow** (`box-shadow: 0 0 34px rgba(226,75,74,0.28)`, hover `0 0 52px rgba(226,75,74,0.42)`): primary CTA buttons; the glow intensifies on hover instead of the shadow shifting direction.

### Named Rules
**The Glow-Not-Shadow Rule.** Nothing in this system casts a directional drop shadow implying an offset light source. Depth comes from blur + translucency (glass) or radial red bloom (glow). If a component needs to feel "lifted," blur its background and add a glow, don't add `box-shadow: 0 4px 6px black`.

## Shapes

Corners are consistently soft, never sharp: buttons and small chips use `rounded-md` (10px equivalent), cards and panels use `rounded-xl`/`rounded-2xl` (16–24px), pills, avatar chips, and the copy-state buttons use `rounded-full`. Borders are hairline and low-opacity (`border-white/10` at rest, brightening toward `border-[#E24B4A]/40–60` on hover/active) rather than solid, high-contrast strokes. A persistent film-grain texture (`GrainOverlay`, `mix-blend-screen`, ~5.5% opacity) sits above the entire page as a fixed overlay, unifying every section's surface.

## Components

### Buttons
- **Shape:** `rounded-md` (10px), pill (`rounded-full`) reserved for tag/copy-state micro-buttons.
- **Primary:** Signal Red fill, white text, accent glow shadow, a diagonal white shine sweep that animates across on hover (`before:` pseudo-element), hover darkens shadow spread and lightens fill to Hot Red. Active state scales down slightly (`active:scale-[0.98]`).
- **Ghost/Secondary:** transparent-to-translucent white fill (`bg-white/[0.04]`), hairline white border, hover shifts border and background toward Signal Red at low opacity rather than filling solid.
- **Hover/Focus:** every interactive surface transitions border-color and background together (150–300ms), never color alone; focus rings on form inputs use Signal Red at reduced opacity.

### Cards / Panels
- **Corner Style:** `rounded-xl`–`rounded-2xl` (16–24px).
- **Background:** translucent white (`bg-white/[0.045]` standard, `bg-white/[0.055]`–`[0.07]` for slightly more prominent panels), backdrop-blurred.
- **Shadow Strategy:** ambient ombient panel shadow (see Elevation); accent-tier panels (e.g. the company pricing card) additionally get a tinted red border and a larger, softer red glow bloom in one corner.
- **Border:** hairline `border-white/10`, or `border-[#E24B4A]/25` for panels the system wants to mark as elevated/premium (the company pricing card, the enterprise callout).
- **Internal Padding:** `p-5`–`p-8`, scaling up with panel prominence.
- **Fixed-height card grids** (testimonials, and any future card row/grid where cards sit side by side): give the card an explicit height and `line-clamp` its variable-length text, don't let height track content. Auto-height cards in a row read as misaligned even when each one is internally tidy, and it compounds in Testimonials specifically since captions (`figcaption`) need to land at the same vertical position across every card regardless of quote length — `justify-between` inside a fixed-height card is what pins the caption to the bottom and lets the quote's own length create the gap above it, not the reverse.

### Chips / Pills — `Badge` component (`landing-ui.tsx`)
Five prior ad-hoc pill implementations were consolidated into one `Badge` component with a `tone` and `size` prop; every new small-label pill should use it rather than a new one-off `<span>`.
- **Shape:** rounded-full, `size="md"` (`px-2.5 py-1`, default) or `size="sm"` (`px-2 py-0.5`, tighter contexts like match/tag chips).
- **Text:** always Label-step type (`text-[11px] font-medium`); pass `className` for uppercase/tracking variants (e.g. the assessment "Sample output" caption).
- **Tones:** `neutral` (white/[0.08] bg, neutral-500 text — resource tags, generic captions), `accent-solid` (CTA Fill bg, white text — definitive match tags like "For you"), `accent-tint` (Signal Red/12% bg, coral text — individual pricing note), `accent-outline` (Signal Red/35% border, white/[0.055] bg, coral text — premium/company pricing note).

### Inputs / Fields
- **Style:** hairline white border (`border-white/10`), translucent dark fill (`bg-white/[0.04]`), white text, muted placeholder (`neutral-600`).
- **Focus:** ring shifts to Signal Red at reduced opacity (`focus-visible:ring-[#E24B4A]/45`).

### Navigation
- **Style:** floating pill header that starts as a rounded, inset capsule (`rounded-full`, translucent white) over the hero and morphs into a full-width, square-cornered bar (`rounded-none`, higher-opacity near-black) once the page scrolls, animated via layout transition rather than a hard cut.
- **Typography:** brand wordmark in body sans at `text-sm font-medium`; nav links in muted neutral, brightening to white on hover; no active-state underline, hover color shift only.
- **Mobile:** nav links hidden below `md`; only the brand mark, log-in (hidden below `sm`), and the primary Enroll button remain visible.

### Signature Component: Slope Chart
The before/after proof chart (`SlopeChart`) is the system's signature data visualization: paired dots connected by a line per participant, each line running a Before Signal-to-Signal Red gradient (steel blue at the before-dot, red at the after-dot), animated to draw on scroll-into-view, with a red pulsing glow ring on every "after" point and a hover tooltip that dims all other lines. It's the clearest expression of "proof, not promise" in visual form, the one place the system's two-hue rule is fully in play, and should be the reference for any future data-viz component in this system.

## Do's and Don'ts

### Do:
- **Do** keep Signal Red as the only saturated hue anywhere on the page; every other color is a neutral or a red tint/shade.
- **Do** use glass + blur + glow for elevation; reserve directional shadows for nothing.
- **Do** keep the film grain overlay active on every page in this system; it's part of the identity, not a decorative extra.
- **Do** pair Fraunces for anything declarative (headlines, prices, stats) with Geist for anything scanned (body, labels, UI chrome).
- **Do** keep full-bleed backgrounds behind a constrained `max-w-6xl` content column; never let content itself go full width.

### Don't:
- **Don't** introduce a new color anywhere in this system without it being a confirmed, user-directed, named, scoped exception per The Default-Two, Confirmed-Exception Rule; guessing at "this section needs more color" on your own is not confirmation.
- **Don't** use Before Signal (steel blue) outside the before/after proof motif, Curriculum Navy outside the Curriculum/Included/Explorer run, or Signal Bright outside Included, without the user confirming the scope should grow.
- **Don't** use a translucent/low-opacity fill for anything that sits on top of a moving or animated element (a progress line, a background shader) unless you've confirmed the fill is genuinely meant to show what's behind it; the Curriculum capstone circle shipped with a 4%-opacity fill that let the connecting line visibly cut through it — always check whether "translucent" was an intentional glass effect or an accidental see-through.
- **Don't** add hard, directional drop shadows; they contradict The Glow-Not-Shadow Rule and read as off-system.
- **Don't** run this dark cinematic system on a white background or light section as a "variant"; the identity is the darkness, not a color that happens to be dark right now. (Note: this supersedes CLAUDE.md's earlier "white background" instruction, confirmed stale by the user; CLAUDE.md should be updated separately to avoid future contradiction.)
- **Don't** present the placeholder cohort stats, testimonials, or brand logos as if they were final/real; the visual system supports them, but the content behind them is explicitly provisional (see PRODUCT.md Evidence on Hand).
- **Don't** wash an entire section in a low-opacity red background glow (e.g. a full-section `BlobBackground`) as the default way to "add atmosphere." Confirmed too much for Testimonials: it read as the section being reddish rather than dark with a red accent. Red's rarity is what makes it read as emphasis; reserve full-section ambient glow for sections that have explicitly earned it (Hero, final CTA), not as a default texture.
- **Don't** put a permanent, rest-state glow shadow (e.g. `shadow-[0_0_28px_rgba(226,75,74,0.08)]`) on a control that also has a hover-state glow. If a button glows at rest AND on hover, hover has nothing left to communicate. Reserve the glow for the interactive state.
- **Don't** apply CSS `scroll-behavior: smooth` to a container that's also driven by a `requestAnimationFrame` loop mutating `scrollLeft` every frame (the `DragMarquee` pattern). Browsers animate every micro-increment as its own smooth-scroll transition, and those queue/overlap into a stutter-stop-jerk motion instead of continuous movement — this is exactly what made the testimonials marquee move in slow jerks and kept scrolling after the mouse left. Give `scroll-behavior: smooth` only to a container whose scroll position changes via discrete, deliberate jumps (a "snap to next card" click), never to one driven by a per-frame animation loop; pass `{ behavior: "smooth" }` explicitly on the one `scrollTo()` call that wants it instead.
