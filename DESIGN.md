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
  accent-rose: "#F09595"
  accent-coral: "#ff8a82"
  accent-coral-light: "#ff9a92"
  accent-highlight: "#FFD9C2"
  gradient-start: "#C73F3E"
  success: "#0F6E56"
  neutral-white: "#ffffff"
  neutral-300: "#d4d4d4"
  neutral-400: "#a3a3a3"
  neutral-500: "#737373"
  neutral-600: "#525252"
typography:
  display:
    fontFamily: "Fraunces, Georgia, serif"
    fontSize: "clamp(1.75rem, 4vw, 3.5rem)"
    fontWeight: 400
    lineHeight: 1.1
    letterSpacing: "normal"
  body:
    fontFamily: "Geist, ui-sans-serif, system-ui"
    fontSize: "15px"
    fontWeight: 400
    lineHeight: 1.6
  label:
    fontFamily: "Geist, ui-sans-serif, system-ui"
    fontSize: "11px"
    fontWeight: 500
    lineHeight: 1.3
    letterSpacing: "0.14em"
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
    backgroundColor: "{colors.primary}"
    textColor: "{colors.neutral-white}"
    rounded: "{rounded.md}"
    padding: "12px 24px"
  button-primary-hover:
    backgroundColor: "{colors.primary-hover}"
  button-ghost:
    backgroundColor: "transparent"
    textColor: "{colors.neutral-white}"
    rounded: "{rounded.md}"
    padding: "12px 24px"
  panel-glass:
    backgroundColor: "rgba(255,255,255,0.045)"
    rounded: "{rounded.xl}"
    padding: "28px"
---

# Design System: SPARKS Landing (Make AI Your Muse)

## Overview

**Creative North Star: "The Late-Night Signal"**

A dark broadcast studio, glowing red in the dark, transmitting proof through noise. The page reads as a signal being received rather than a brochure being read: near-black surfaces, a single red accent doing all the emotional work, film grain over everything, and background elements (scan lines, drifting glows, liquid signal sheets) that behave like a transmission rather than décor. This is not a moody aesthetic pasted onto a normal SaaS layout; the dark cinematic identity is the point, chosen deliberately over an earlier white-background brief because it fits the "proof, not hype" positioning: something serious is being measured in the dark, and the numbers are the light source.

Density is comfortable, not dense: generous vertical rhythm between sections (`py-16 sm:py-24`), single-column content column capped narrow (`max-w-6xl`) inside full-bleed section backgrounds. Motion is restrained and physics-real (long eases, no bounce); glow and grain carry atmosphere so kinetic motion doesn't have to.

**Key Characteristics:**
- Near-black backgrounds with a single warm-red accent, never a second hue competing for attention
- Full-bleed backgrounds behind a constrained content column (see The Full-Bleed Rule)
- Frosted glass panels that float on the dark backdrop, lit by soft red glow blooms instead of hard drop shadows
- Persistent film grain overlay (`GrainOverlay`) ties every section together as one continuous transmission
- Fraunces serif for anything that needs to feel spoken or declared; Geist sans for everything read at a glance

## Colors

The palette is almost monochrome by design: near-black voids, white/near-white text and glass, and exactly one saturated hue (red) carrying all emphasis, urgency, and brand identity.

### Primary
- **Signal Red** (`#E24B4A`): the only saturated color in the system. Used for every primary CTA, active state, underline accent, stat highlight, and glow bloom. Hover state lightens to **Hot Red** (`#ff5a56`).
- **Ember Deep** (`#7A2320`): the shadow/base tone under Signal Red on the specular hero button; gives the accent a physical, lit-from-within quality rather than a flat fill.

### Secondary
- **Soft Rose** (`#F09595`): the dimmed/secondary state of Signal Red, used for non-hovered chart lines, borders on tinted panels, and anywhere Signal Red would be too loud at rest.
- **Coral Text** (`#ff8a82` / `#ff9a92`): Signal Red lightened further for running text and small labels on dark backgrounds, where the full-saturation red would fail contrast or feel aggressive.

### Neutral
- **Void** (`#070304`): the page's base background; the darkest surface in the system.
- **Panel Black** (`#090405`): a hair lighter than Void, used to separate section backgrounds (Proof, Brands, Pricing) from the page base.
- **Deep Black** (`#050203`): used specifically behind full-bleed animated backgrounds (hero, final CTA) so glow blooms have maximum contrast to bloom against.
- **White** (`#ffffff`): headlines, primary body copy on dark.
- **Neutral 300–600** (Tailwind `neutral-300` through `neutral-600`): the entire secondary-text hierarchy (sub-copy, captions, disabled states), stepping darker as importance decreases.

### Named Rules
**The One Voice Rule.** Signal Red is the only chromatic color in the system. Every other color is either a neutral (black/white/gray) or a tonal variant of red itself (lighter for text, darker for shadow). Never introduce a second hue family — no blues, greens, purples — the accent's rarity and consistency is what makes it read as "the proof," not decoration.

**The Full-Bleed Rule.** Every section wraps a full-viewport-width background layer (`relative isolate overflow-hidden` + an absolutely-positioned background component) around a horizontally constrained content column (`mx-auto max-w-6xl px-5 sm:px-8`). Backgrounds never get clipped to the content column; content never spans full-bleed.

## Typography

**Display Font:** Fraunces (with Georgia fallback)
**Body Font:** Geist (with ui-sans-serif, system-ui fallback)

**Character:** A wide, warm serif for anything spoken aloud (headlines, prices, stat callouts) paired with a clean, neutral grotesque for everything read at a glance (body copy, labels, UI chrome). The serif carries the "human, a real person made this claim" register; the sans carries the "measured, factual" register. Fraunces was chosen over Instrument Serif specifically because Instrument Serif's condensed proportions read as horizontally squished at display sizes.

### Hierarchy
- **Display** (Fraunces 400, `40px–56px` responsive, `line-height: 1.1`): hero headline, section headings, price figures, stat numbers.
- **Title** (Fraunces 400/500, `20px–28px`): card/panel titles inside expanded curriculum days, price card headings.
- **Body** (Geist 400, `15px`, `line-height: 1.6`): all running copy; kept under ~65ch (`max-w-xl`/`max-w-2xl` containers).
- **Label** (Geist 500, `11px`, `letter-spacing: 0.14em`, uppercase): eyebrows, kickers, section overlines, tab labels.

### Named Rules
**The Spoken vs. Measured Rule.** If the copy is a claim, price, or headline, it's Fraunces. If it's a fact, a label, or something scanned rather than read, it's Geist. Never mix the two within the same text role.

## Layout

Content is column-constrained at `max-w-6xl` with `px-5 sm:px-8` gutters, sitting inside full-bleed sections (see The Full-Bleed Rule). Vertical rhythm between sections is generous and consistent: `py-16 sm:py-24` for standard sections, tighter (`py-16 sm:py-20`) for the compact enterprise callout.

Two-column asymmetric splits are the default pattern for content-plus-detail layouts (proof chart + portrait video, assessment prompt + sample output, explorer questions + matches): a flexible primary column (`1fr`) paired with a fixed-width secondary column (`320px`–`400px`), stacking to one column on mobile (`grid-cols-1` → `md:grid-cols-[1fr_Npx]`).

The curriculum section uses a segmented horizontal stepper (11 nodes across `grid-cols-4` mobile / `grid-cols-11` desktop) with a progress line that fills on scroll-into-view; this is the system's one signature structural device beyond the standard section pattern.

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

### Chips / Pills
- **Style:** rounded-full, translucent background matched to context (white/[0.08] for neutral state chips, Signal Red at 12–16% opacity for "for you"/match chips).
- **State:** filled Signal Red pill for a definitive tag ("For you"), translucent white pill for a neutral tag (resource category).

### Inputs / Fields
- **Style:** hairline white border (`border-white/10`), translucent dark fill (`bg-white/[0.04]`), white text, muted placeholder (`neutral-600`).
- **Focus:** ring shifts to Signal Red at reduced opacity (`focus-visible:ring-[#E24B4A]/45`).

### Navigation
- **Style:** floating pill header that starts as a rounded, inset capsule (`rounded-full`, translucent white) over the hero and morphs into a full-width, square-cornered bar (`rounded-none`, higher-opacity near-black) once the page scrolls, animated via layout transition rather than a hard cut.
- **Typography:** brand wordmark in body sans at `text-sm font-medium`; nav links in muted neutral, brightening to white on hover; no active-state underline, hover color shift only.
- **Mobile:** nav links hidden below `md`; only the brand mark, log-in (hidden below `sm`), and the primary Enroll button remain visible.

### Signature Component: Slope Chart
The before/after proof chart (`SlopeChart`) is the system's signature data visualization: paired dots connected by a line per participant, animated to draw on scroll-into-view, with a red pulsing glow ring on every "after" point and a hover tooltip that dims all other lines. It's the clearest expression of "proof, not promise" in visual form and should be the reference for any future data-viz component in this system.

## Do's and Don'ts

### Do:
- **Do** keep Signal Red as the only saturated hue anywhere on the page; every other color is a neutral or a red tint/shade.
- **Do** use glass + blur + glow for elevation; reserve directional shadows for nothing.
- **Do** keep the film grain overlay active on every page in this system; it's part of the identity, not a decorative extra.
- **Do** pair Fraunces for anything declarative (headlines, prices, stats) with Geist for anything scanned (body, labels, UI chrome).
- **Do** keep full-bleed backgrounds behind a constrained `max-w-6xl` content column; never let content itself go full width.

### Don't:
- **Don't** introduce a second saturated hue (blue, green, purple) anywhere in this system; it breaks The One Voice Rule and dilutes the accent's meaning.
- **Don't** add hard, directional drop shadows; they contradict The Glow-Not-Shadow Rule and read as off-system.
- **Don't** run this dark cinematic system on a white background or light section as a "variant"; the identity is the darkness, not a color that happens to be dark right now. (Note: this supersedes CLAUDE.md's earlier "white background" instruction, confirmed stale by the user; CLAUDE.md should be updated separately to avoid future contradiction.)
- **Don't** present the placeholder cohort stats, testimonials, or brand logos as if they were final/real; the visual system supports them, but the content behind them is explicitly provisional (see PRODUCT.md Evidence on Hand).
