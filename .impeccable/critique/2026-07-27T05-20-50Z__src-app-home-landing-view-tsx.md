---
target: landing page
total_score: 25
max_score: 32
na_heuristics: 7,10
p0_count: 2
p1_count: 2
timestamp: 2026-07-27T05-20-50Z
slug: src-app-home-landing-view-tsx
---
Method: dual-agent (A: a171ecdee78a65895 · B: a2ce14b167e7c9568)

## Design Health Score

| # | Heuristic | Score | Key Issue |
|---|-----------|-------|-----------|
| 1 | Visibility of System Status | 3/4 | Hero stat Tickers can render `0`/`NPS 0` momentarily on first paint before count-up finishes; `body` has a `transition: height` rule the detector flagged as unusual layout-transition scope |
| 2 | Match System / Real World | 3/4 | SPARKS profile labels ("Fast Producer → AI Steerer") appear in the SlopeChart tooltip and Assessment sample with no on-page legend; the 6-tier scale only exists inside the copy-paste AI prompt text |
| 3 | User Control and Freedom | 3/4 | Quiz "Start over", curriculum prev/next, FAQ toggle all work; no "back to top" on a long single-page scroll |
| 4 | Consistency and Standards | 3/4 | Two visually different primary-CTA implementations for the same action: `SpecularButton` in the hero vs. CSS-shine `EnrollButton` elsewhere |
| 5 | Error Prevention | 3/4 | Contact form has required fields + native email validation; no field-level inline errors, no textarea maxlength |
| 6 | Recognition Rather Than Recall | 4/4 | Selected/open/active states are clear everywhere (quiz chips, curriculum node, assessment tab) |
| 7 | Flexibility and Efficiency | n/a | Persuade-mode landing page; no power-user path expected |
| 8 | Aesthetic and Minimalist Design | 3/4 | Strong single-hue system in principle, but detector confirms 3.9:1 text contrast (below WCAG AA 4.5:1) on white-on-`#E24B4A` CTAs, and 10px text below an 11px legibility floor on 11+ curriculum labels |
| 9 | Error Recovery | 3/4 | Contact form shows a fallback error message; no inline field-level error copy |
| 10 | Help and Documentation | n/a | Marketing page; FAQ substitutes informally |
| **Total** | | **25/32** | **Good (78%)** |

## Design Specificity Verdict

**LLM assessment:** This reads as authored for SPARKS specifically, not a generic AI-course template. The slope chart with per-participant hover tooltips, the 6-letter SPARKS horizontal stepper split into Foundation/SPARKS days, the "C.A.R." before/after knife-brand example, the profile-label taxonomy (Fast Producer → AI Steerer), and the copy-paste assessment-prompt mechanism are all product-specific proof devices, not stock SaaS patterns.

**Deterministic scan (tempers the verdict above):** The detector's browser pass flagged 55 anti-patterns, and several of the distinct rule categories it hit are specifically named for common generic-AI-output visual smells: `gpt-thin-border-wide-shadow`, `codex-grid-background`, `overused-font` (Geist at 87% of all text), `nested-cards` (15+ instances), `radial-spotlight-glow`, `dark-glow`, `gradient-text`. None of these alone is damning, and DESIGN.md documents most of them as deliberate system choices (glow-not-shadow, grain overlay, single accent). But their concentration is worth naming: the underlying *content and interaction* design is specific to SPARKS, while a meaningful share of the *surface visual vocabulary* (glass panels, glow blooms, grain, marquees) matches patterns the detector associates with generic AI-generated interfaces. That tension is real, not a false alarm — it doesn't undo the specificity verdict, but it's the honest caveat on it.

**CLI scan:** 34 static findings — `design-system-font-size` ×30 (mostly one-off pixel sizes outside the documented type scale: 10px, 13px, 16-17px, 26px, 34px, 40-44px, 50px), `design-system-color` ×3 (alpha-tint variants of the documented accent, likely intentional glow tints, not new hues — see caveat below), `layout-transition` ×1 (`transition: height` on `landing-ui.tsx:605`, corroborated live).

**Likely false positives:** the 3 `design-system-color` hits (`landing-ui.tsx:398/437/522`, `silk.tsx:130`) are alpha/tint derivatives of the documented Signal Red accent used for decorative blur glows, not new arbitrary brand colors — consistent with The One Voice Rule in DESIGN.md, not a violation of it. Not adjudicated with full confidence since no source comment marks them as intentional, but they read as tonal variants on inspection.

**Visual overlays:** the browser detector overlay is no longer live (the helper was stopped after evidence capture, per protocol), but Assessment B captured full console output and two screenshots. Notably, the mobile screenshot shows the "Trusted by leaders at" strip rendering **real logo images** for at least IKEA and British Airways (not text-chip placeholders) — this contradicts both `CLAUDE.md` and `PRODUCT.md`'s stated assumption that `LANDING.brands` is "placeholder names, not logos yet." Either real logo assets already exist at `/assets/brand_icon/` (in which case: are they licensed/cleared for use?), or the fallback text-chip path is silently failing to trigger and something else is rendering in that slot. Worth a direct look before assuming this is fine.

## Overall Impression

The bones are genuinely good: a specific, coherent proof mechanism (before/after scoring), a real personalization device (the resource explorer), and a consistently executed dark-cinematic visual system that matches DESIGN.md closely in the shipped code. What's holding it back from shipping to real traffic isn't the concept, it's a cluster of unresolved dev-state artifacts (a literal "Placeholder" FAQ answer, unlabeled brand/testimonial trust signals, one of them possibly using real uncleared logos) sitting directly in the path of the primary audience's highest-stakes decision, plus a genuine accessibility miss (CTA text contrast) on the page's single most important interactive element. The single biggest opportunity: close the gap between "what PRODUCT.md says is placeholder" and "what a real visitor actually sees," because right now that gap is exactly where an HR/L&D buyer would lose trust.

## What's Working

1. **SlopeChart hover tooltip** — the per-participant before/after reveal is the clearest embodiment of "proof, not promise" on the page, and it's genuinely interactive, not decorative, on desktop.
2. **Sample-data disclosure discipline in the hero chip** — "(sample data)" is baked directly into the visible caption text, not buried in a comment or config note. The right pattern — it's just not applied consistently to the brand strip or testimonials (see P0 below).
3. **Resource Explorer's pinning logic** — always surfaces the right primary offer first (course vs. live cohort) based on a single "solo vs. team" answer, a smart low-effort personalization for a page serving two audiences with one layout.

## Priority Issues

**[P0] Unlabeled and possibly unverified trust signals ship as real to visitors.**
Why it matters: the brand strip ("Trusted by leaders at Ripple, IKEA, British Airways, Air France, Garnier, Kimberly-Clark…") and testimonials ("From past participants — Two cohorts in. Here is what they said.") carry zero visible disclaimer, unlike the hero stat chip which does. A real HR/L&D buyer doing vendor diligence will read named companies and quoted "participants" as literal claims — directly contradicting PRODUCT.md's own principle ("Never let placeholder data... read as real to a visitor"). This is compounded by evidence that at least two brand slots (IKEA, British Airways) are rendering real logo image files, not the documented placeholder text-chip fallback, which raises a separate licensing/clearance question that needs a direct answer, not an assumption.
Fix: confirm whether real logo assets exist at `/assets/brand_icon/` and whether they're cleared for use; if not, remove them so the text-chip fallback renders. Add a visible "sample" marker to the testimonials section heading, matching the hero chip's existing pattern, until real cohort quotes land.
Suggested command: `/impeccable harden`

**[P0] Primary CTA text fails WCAG AA contrast, systemwide.**
Why it matters: the detector confirmed 3.9:1 contrast (white text on `#E24B4A`) against the 4.5:1 AA minimum, repeated across the nav CTA, hero CTA, mobile CTA, contact-form CTA, and sticky CTA — meaning the page's single most important interactive element (the primary conversion action) is under-contrast everywhere it appears, not just once.
Fix: darken the red fill slightly for text-bearing surfaces, or use a darker text color/text-shadow on the red fill, without breaking The One Voice Rule (still one hue family). Verify against 4.5:1 post-fix.
Suggested command: `/impeccable harden`

**[P1] Refund-policy FAQ answer literally reads "Placeholder."**
Why it matters: `LANDING.faq.items`'s last entry answers "What is the refund policy?" with "Placeholder. Write the real policy before launch." This is a dev artifact currently live in a customer-facing FAQ, at the exact moment (pricing/refund) where reassurance matters most to a buyer about to commit money.
Fix: at minimum, replace with a neutral holding statement ("Refund terms are being finalized; contact us before enrolling if this affects your decision") rather than shipping the literal word "Placeholder" to a real visitor.
Suggested command: `/impeccable clarify`

**[P1] The flagship proof interaction is inert on mobile, and mobile has a real layout bug.**
Why it matters: two separate mobile-specific problems compound. First, `SlopeChart`'s participant lines only respond to `onMouseEnter`/`onMouseLeave` — there's no touch equivalent, so the section's own instruction ("Hover any line to see one participant's move") describes an action impossible on a touch device; the flagship proof mechanism is silently decorative for the secondary (mobile) audience. Second, the detector's mobile screenshot (375×812) shows a visible ~15-20px horizontal-overflow strip down the right edge of the viewport, meaning something on the page is wider than the viewport at that breakpoint.
Fix: add `onClick`/`onTouchStart` toggle behavior to `SlopeChart` participant lines for touch devices; audit for the specific element causing horizontal overflow at 375px (likely a fixed-width or unclamped background/decorative element) and constrain it.
Suggested command: `/impeccable adapt`

**[P2] Testimonial marquee fights touch-drag, and several labels sit below the legibility floor.**
Why it matters: `DragMarquee` auto-scrolls continuously via `requestAnimationFrame` and only pauses on `onMouseEnter`/`onMouseLeave` — no `touchstart`/`touchend` handler — so a mobile user swiping through testimonials feels the carousel fighting their finger. Separately, the detector found 10px text (below an 11px floor) on 11+ curriculum day labels ("Muse, not oracle," "Human element," etc.) and the assessment "Sample output" caption, which is exactly the kind of small-text-on-mobile problem that compounds with the contrast issue above.
Fix: pause the rAF auto-scroll loop on `touchstart`, resume on `touchend`/`touchcancel`, matching the existing mouse-pause behavior. Bump the smallest curriculum labels to at least 11px.
Suggested command: `/impeccable adapt`

## Persona Red Flags

**Jordan (confused first-timer).** Encounters "Fast Producer → AI Steerer" in the SlopeChart tooltip and "AI Steerer" as the sample profile label in the Assessment section with no on-page legend defining the 6-tier scale (Fast Starter → Fast Producer → Practical Operator → AI Steerer → AI Co-Builder → AI Muse) — that scale exists only inside the copy-paste AI prompt text, never as visitor-facing copy. Jordan can't tell if "AI Steerer" is good or bad without hovering multiple lines and inferring from vertical position.

**Riley (stress tester).** The Explorer quiz survives rapid re-answering and route switching cleanly — toggling "Just me" → "With my team" correctly re-pins to `live`/`keynote`/`miro` matches and surfaces the team note + CTA. The contact form correctly blocks invalid email; adversarial text input is inert client-side (no injection observed). The real crack Riley would find: the testimonial marquee's mouse-only pause (P2 above) is exactly the kind of interaction a methodical tester catches by dragging aggressively on a touch device, and the 375px horizontal-overflow strip (P1 above) is the kind of edge Riley specifically hunts for.

**Casey (distracted mobile, one thumb).** Nav links and "Log in" are correctly hidden below `md`/`sm`, reducing mobile chrome — a good call. But the curriculum's prev/next arrow buttons are `hidden sm:flex`, so on mobile Casey can only navigate the 11-day stepper by tapping individual ~40px node circles in a cramped 4-column grid, which the detector separately flagged as visually crowded at 375px (multiple overlapping annotation/label collisions in that exact region).

**Priya (invented — VP of L&D vetting SPARKS for a 200-person cohort, the primary audience).** Two specific things would make her hesitate: (1) the brand strip claiming peer companies as clients with no verification path, and the possibility that real, unlicensed logos are already live (P0 above) — this is the first thing a professional buyer sanity-checks, and it currently fails that check; (2) "Custom" pricing behind a bare `mailto:` link gives her nothing to bring back to a budget conversation without first initiating email contact from what may be a locked-down corporate environment — most enterprise landing pages give at least a "starting at" figure to enable self-service pre-qualification before a human touch.

## Minor Observations

- Two different primary-CTA button implementations (`SpecularButton` in the hero vs. CSS-shine `EnrollButton` elsewhere) for the same action — likely unintentional drift, worth consolidating for consistency.
- `Explorer`'s three quiz questions render all at once rather than paginating one-at-a-time — a minor, defensible cognitive-load tradeoff for a 3-question quiz, not worth fixing on its own.
- The `isTeam` callout inside the Explorer reuses `LANDING.enterprise.cta` ("Talk to us") rather than quiz-contextual copy — not wrong, just slightly generic for the moment it appears in.
- `body`'s `transition: height` (flagged by both static scan and live console) is unusual scope for a transition; worth a quick check that it's intentional and not a stray global rule.

## Questions to Consider

1. If the brand strip and testimonials stay unlabeled through launch, what's the actual gate between "code complete" and "real traffic" catching this — is there a pre-launch content freeze checklist today, or none?
2. The whole positioning is "proof, not promise" — should the SlopeChart's touch-interaction gap be the single biggest investment left before launch, given it's the flagship proof device and it's currently inert for every mobile visitor?
3. Is "Custom" pricing behind a cold `mailto:` really the intended first touch for the *primary* audience, or was the lead-capture form PRODUCT.md flags as "may become a form later" meant to land before this ships to real traffic?
