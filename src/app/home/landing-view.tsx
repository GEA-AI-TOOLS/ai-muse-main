"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { AnimatePresence, motion, useInView } from "motion/react";
import { ArrowRight, Check, Copy, ExternalLink, Play, Sparkles, Star } from "lucide-react";
import { LANDING, ASSESSMENT_PROMPTS, type AssessmentModel } from "@/lib/landing-config";
import MuxPlayer from "@mux/mux-player-react";
import SpecularButton from "@/components/landing/specular-button";
import ShinyText from "@/components/landing/shiny-text";
import TrueFocus from "@/components/landing/true-focus";
import {
  Badge,
  Reveal,
  Ticker,
  Marquee,
  DragMarquee,
  Spotlight,
  Waveform,
  GrainOverlay,
  HeroBackground,
  BlobBackground,
  WaveBackground,
  DarkVeilBackground,
  DotBackground,
  GridSpotlightBackground,
  PricingRaysBackground,
  useSafeReducedMotion,
} from "@/components/landing/landing-ui";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

const RED = "#FF3B3B";
// The system's one deliberate second hue (see DESIGN.md "The Two-Signal
// Rule"): a cool steel blue used exclusively for the "before" state in the
// before/after proof motif, so the transformation reads as an actual color
// shift, not just a number and a lighter/darker red.
const BEFORE = "#7C93B3";
// Solid-fill CTAs use #C81E3A/#E0233F (Tailwind arbitrary values, hardcoded
// per class below) rather than RED: white text on #E24B4A is 3.9:1, below
// WCAG AA's 4.5:1 floor. #C81E3A ("Cardinal" in DESIGN.md) hits 5.67:1 at
// rest; #E0233F ("Cardinal Bright") hits 4.69:1 on hover, brighter and more
// saturated than the rest state so "hover intensifies" still holds. Chosen
// over the previous #C73F3E specifically for higher chroma: same lightness
// range reads as vivid blood red instead of a muted brownish red.
const PANEL = "border border-white/10 bg-white/[0.045] shadow-[0_24px_90px_rgba(0,0,0,0.34)] backdrop-blur-xl";
const PANEL_STRONG = "border border-[#C81E3A]/30 bg-[#130608]/70 shadow-[0_30px_110px_rgba(200,30,58,0.18)] backdrop-blur-2xl";
const display = { fontFamily: "var(--font-display), Georgia, serif" };

// Layout rule for every section:
//   <section class="relative isolate overflow-hidden">  <- full viewport width
//     <SomeBackground />                                <- spans edge to edge
//     <div class="mx-auto max-w-6xl px-5 sm:px-8">      <- content column only
// Backgrounds are never inside the constrained column.

// ---------- shared bits ----------

function EnrollButton({ small = false }: { small?: boolean }) {
  return (
    <a
      href={LANDING.enrollHref}
      className={
        "group relative inline-flex items-center justify-center overflow-hidden rounded-md bg-[#C81E3A] font-medium text-white shadow-[0_0_34px_rgba(226,75,74,0.28)] transition-all before:absolute before:inset-y-0 before:-left-10 before:w-8 before:rotate-12 before:bg-white/30 before:blur-sm before:transition-transform before:duration-700 hover:bg-[#E0233F] hover:shadow-[0_0_52px_rgba(226,75,74,0.42)] hover:before:translate-x-44 active:scale-[0.98] " +
        (small ? "px-4 py-2 text-sm" : "px-6 py-3 text-sm")
      }
    >
      Enroll
    </a>
  );
}

function HeroEnrollButton() {
  return (
    <a href="#pricing" className="inline-flex overflow-hidden rounded-[10px]">
      <SpecularButton
        size="sm"
        radius={10}
        tint="#C81E3A"
        tintOpacity={0.94}
        blur={0}
        textColor="#ffffff"
        lineColor="#FFD9C2"
        baseColor="#7A2320"
        intensity={0.85}
        shineSize={9}
        shineFade={26}
        thickness={1.1}
        speed={0.28}
        followMouse
        proximity={220}
        autoAnimate={false}
      >
        Learn More
      </SpecularButton>
    </a>
  );
}
function PreviewButton({ small = false }: { small?: boolean }) {
  return (
    <a
      href={LANDING.auditHref}
      className={
        "inline-flex items-center justify-center gap-1.5 rounded-md border border-white/12 bg-white/[0.04] font-medium leading-none text-neutral-100 shadow-[inset_0_1px_0_rgba(255,255,255,0.08)] backdrop-blur-xl transition-all hover:border-[#E24B4A]/50 hover:bg-[#E24B4A]/10 hover:text-white active:scale-[0.98] " +
        (small ? "px-4 py-2 text-sm" : "px-[22px] py-[10px] text-[0.85rem]")
      }
    >
      Preview Day 1 free
    </a>
  );
}

function SectionHeading({ children, color = "white" }: { children: ReactNode; color?: "white" | "bright-red" }) {
  return (
    <h2
      style={display}
      className={"text-[28px] leading-tight sm:text-[34px] " + (color === "bright-red" ? "text-[#FF3B3B]" : "text-white")}
    >
      {children}
    </h2>
  );
}

function Col({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <div className={"mx-auto max-w-6xl px-5 sm:px-8 " + className}>{children}</div>;
}

// ---------- header (hidden until the hero is scrolled) ----------

function Header() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 420);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <motion.header
      initial={false}
      animate={{
        paddingTop: scrolled ? 0 : 20,
        paddingLeft: scrolled ? 0 : 20,
        paddingRight: scrolled ? 0 : 20,
      }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className="fixed inset-x-0 top-0 z-40"
    >
      <motion.div
        initial={false}
        animate={{
          maxWidth: scrolled ? 1600 : 940,
          borderRadius: scrolled ? 0 : 999,
          backgroundColor: scrolled ? "rgba(7,3,4,0.86)" : "rgba(255,255,255,0.06)",
          borderColor: scrolled ? "rgba(255,255,255,0.10)" : "rgba(255,255,255,0.14)",
        }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        className="mx-auto border shadow-[0_18px_60px_rgba(0,0,0,0.40),inset_0_1px_0_rgba(255,255,255,0.10)] backdrop-blur-2xl"
      >
        <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-2.5 sm:px-8">
          <a href="#top" className="flex items-center gap-2">
            <img src="/assets/site-icon.png" alt="" className="h-7 w-7 rounded object-contain" />
            <span className="text-sm font-medium text-white">{LANDING.header.brand}</span>
          </a>
          <nav className="hidden items-center gap-6 md:flex">
            {LANDING.header.nav.map((item) => (
              <a key={item.label} href={item.href} className="text-sm text-neutral-300 transition-colors hover:text-white">
                {item.label}
              </a>
            ))}
          </nav>
          <div className="flex items-center gap-3">
            <a
              href={LANDING.loginHref}
              className="hidden items-center justify-center rounded-full border border-white/14 bg-white/[0.03] px-4 py-1.5 text-sm text-neutral-200 transition-colors hover:border-white/30 hover:bg-white/[0.08] hover:text-white sm:inline-flex"
            >
              Log in
            </a>
            <EnrollButton small />
          </div>
        </div>
      </motion.div>
    </motion.header>
  );
}
// ---------- hero ----------

function Hero() {
  const parts = LANDING.hero.headline.split("*");
  const chip = LANDING.hero.chip;
  const nps = LANDING.hero.nps;
  return (
    <section id="top" className="relative isolate min-h-[100svh] overflow-hidden">
      <HeroBackground />

      <Reveal delay={200} className="absolute right-5 top-20 z-10 sm:right-8 sm:top-24">
        <div className="flex items-center gap-2 rounded-full border border-[#E24B4A]/35 bg-white/[0.06] px-4 py-2 shadow-[0_10px_30px_rgba(0,0,0,0.3)] backdrop-blur-xl">
          <Star size={14} className="text-[#ff8a82]" fill="currentColor" />
          <span style={display} className="text-sm font-medium text-white">
            {"NPS "}<Ticker value={nps.score} duration={1200} />
          </span>
        </div>
      </Reveal>

      <Col className="flex flex-col items-center pb-10 pt-16 text-center sm:pb-16 sm:pt-24 lg:pt-28">
        <Reveal>
          <p className="mb-4 text-xs font-medium uppercase tracking-[0.14em]">
            <ShinyText
              text={LANDING.hero.eyebrow}
              speed={2.6}
              color="#ff8a82"
              shineColor="#ffe3df"
              spread={110}
              direction="left"
            />
          </p>
        </Reveal>
        <Reveal delay={80}>
          <h1 style={display} className="mx-auto max-w-3xl text-[40px] leading-[1.1] text-white sm:text-[56px]">
            {parts.map((part, i) =>
              i % 2 === 1 ? (
                <span key={i} className="relative whitespace-nowrap">
                  {part}
                  <motion.span
                    aria-hidden="true"
                    className="absolute -bottom-1 left-0 h-[3px] w-full origin-left rounded-full bg-[#E24B4A]"
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{ duration: 0.5, delay: 0.7, ease: [0.22, 1, 0.36, 1] }}
                  />
                </span>
              ) : (
                <span key={i}>{part}</span>
              )
            )}
          </h1>
        </Reveal>
        <Reveal delay={160}>
          <p className="mx-auto mt-6 max-w-xl text-[17px] leading-relaxed text-neutral-300">{LANDING.hero.sub}</p>
        </Reveal>
        <Reveal delay={240}>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <HeroEnrollButton />
            <PreviewButton />
          </div>
          <div className="mt-7 flex max-w-2xl flex-wrap items-center justify-center gap-3">
            <div className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.05] px-5 py-3 shadow-[0_20px_60px_rgba(0,0,0,0.25)] backdrop-blur-xl transition-colors hover:border-[#E24B4A]/40">
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#E24B4A]/15">
                <ArrowRight size={16} className="text-[#ff8a82]" />
              </span>
              <div className="text-left leading-tight">
                <p style={display} className="text-[16px] text-white">
                  <Ticker value={chip.before} duration={900} className="text-[#7C93B3]" />
                  <span className="mx-1.5 text-[#E24B4A]">{"\u2192"}</span>
                  <Ticker value={chip.after} duration={1400} className="font-medium text-[#ff9a92]" />
                </p>
                <p className="mt-0.5 text-[11px] uppercase tracking-wide text-neutral-400">{chip.label}</p>
              </div>
            </div>
            <a
              href="#assessment"
              className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.05] px-5 py-3 shadow-[0_20px_60px_rgba(0,0,0,0.25)] backdrop-blur-xl transition-colors hover:border-[#E24B4A]/40 hover:bg-[#E24B4A]/10"
            >
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#E24B4A]/15">
                <Sparkles size={15} className="text-[#ff8a82]" />
              </span>
              <div className="text-left leading-tight">
                <p style={display} className="text-[16px] font-medium text-[#ff9a92]">
                  {LANDING.hero.testAssessment.heading}
                </p>
                <p className="mt-0.5 text-[11px] uppercase tracking-wide text-neutral-400">{LANDING.hero.testAssessment.sub}</p>
              </div>
            </a>
          </div>
          <p className="mt-4 text-sm text-neutral-500">{LANDING.hero.trust}</p>
        </Reveal>
      </Col>
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-0 h-28"
        style={{ background: "linear-gradient(to bottom, transparent, rgba(7,3,4,0.78) 70%, rgba(7,3,4,1))" }}
      />
    </section>
  );
}

// ---------- proof (summary + distribution / journeys / video + trust) ----------

// All three evidence cards share this shell so they render at exactly the same
// width, radius, padding, heading position, and caption position. Grid stretch
// plus flex-1 bodies then force identical heights across the row.
const PROOF_CARD = "flex h-full flex-col rounded-2xl border border-white/10 bg-white/[0.03] p-5 backdrop-blur-xl";
const PROOF_BODY = "relative mt-4 min-h-[248px] flex-1";
// min-h reserves two lines so the divider rule lands at the same height in all
// three cards even though the captions are different lengths.
const PROOF_CAPTION = "mt-4 min-h-[52px] border-t border-white/10 pt-3 text-[12px] leading-relaxed text-neutral-500";
const FLAT = "#57534E";

function ProofCardTitle({ children }: { children: ReactNode }) {
  return <p style={display} className="text-[17px] leading-snug text-white">{children}</p>;
}

function ProofSummary() {
  const cfg = LANDING.proof.summary;
  return (
    <div className="rounded-2xl border border-white/10 bg-white/[0.03] px-5 py-5 backdrop-blur-xl sm:px-7">
      <div className="grid gap-5 sm:grid-cols-3 sm:gap-0 sm:divide-x sm:divide-white/10">
        {cfg.items.map((item, i) => {
          // A suffix that starts with a space is a word ("points") and renders
          // smaller alongside the figure; a symbol suffix ("%") stays inline.
          const wordSuffix = item.suffix?.startsWith(" ") ?? false;
          const inlineSuffix = wordSuffix ? "" : (item.suffix ?? "");
          return (
            <div key={item.label} className={i === 0 ? "sm:pr-6" : "sm:px-6"}>
              <div style={display} className="flex items-baseline gap-2 text-[28px] leading-none">
                {item.from !== null && (
                  <>
                    <span className="text-neutral-500">
                      <Ticker value={item.from} suffix={inlineSuffix} duration={900} />
                    </span>
                    <span className="text-[17px] text-neutral-600">{"\u2192"}</span>
                  </>
                )}
                <span className="text-[#ff9a92]">
                  <Ticker value={item.to} prefix={item.prefix ?? ""} suffix={inlineSuffix} duration={900} />
                </span>
                {wordSuffix && <span className="text-sm text-neutral-500">{(item.suffix ?? "").trim()}</span>}
              </div>
              <p className="mt-2 text-[13px] leading-relaxed text-neutral-400">{item.label}</p>
            </div>
          );
        })}
      </div>
      <p className="mt-5 border-t border-white/10 pt-3 text-xs text-neutral-500">{cfg.note}</p>
    </div>
  );
}

function DistributionBar({
  label,
  value,
  color,
  inView,
  reduce,
  delay,
}: {
  label: string;
  value: number;
  color: string;
  inView: boolean;
  reduce: boolean;
  delay: number;
}) {
  return (
    <div className="mt-2 flex items-center gap-2.5">
      <span className="w-11 shrink-0 text-[11px] uppercase tracking-[0.08em] text-neutral-500">{label}</span>
      <div className="h-2 flex-1 overflow-hidden rounded-full bg-white/[0.06]">
        <motion.div
          className="h-full w-full rounded-full"
          style={{ background: color, transformOrigin: "left" }}
          initial={reduce ? false : { scaleX: 0 }}
          animate={inView ? { scaleX: value / 100 } : undefined}
          transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
        />
      </div>
      <span className="w-9 shrink-0 text-right text-[11px] tabular-nums text-neutral-400">{String(value) + "%"}</span>
    </div>
  );
}

function DistributionChart() {
  const cfg = LANDING.proof.distribution;
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.4 });
  const reduce = useSafeReducedMotion();
  const [active, setActive] = useState<string | null>(null);

  return (
    <div ref={ref} className="flex h-full flex-col justify-center gap-2.5">
      {cfg.bands.map((band, i) => {
        const isActive = active === band.range;
        return (
          <div
            key={band.range}
            onMouseEnter={() => setActive(band.range)}
            onMouseLeave={() => setActive(null)}
            onTouchStart={() => setActive(isActive ? null : band.range)}
            className={
              "relative cursor-default rounded-lg px-2.5 py-2 transition-colors " +
              (band.highlight
                ? "bg-[#E24B4A]/[0.07] ring-1 ring-inset ring-[#E24B4A]/25"
                : "ring-1 ring-inset ring-transparent hover:bg-white/[0.035]")
            }
          >
            <AnimatePresence>
              {isActive && (
                <motion.div
                  initial={reduce ? false : { opacity: 0, y: 4 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.15 }}
                  className="pointer-events-none absolute -top-1 left-1/2 z-10 -translate-x-1/2 -translate-y-full whitespace-nowrap rounded-md border border-white/10 bg-neutral-900 px-2.5 py-1.5 text-[11px] shadow-lg"
                >
                  <span className="font-medium text-white">{band.range}</span>
                  <span className="mx-1.5 text-neutral-500">{"\u00b7"}</span>
                  <span className="text-neutral-400">{cfg.beforeLabel + " " + String(band.before) + "%"}</span>
                  <span className="mx-1.5 text-neutral-600">{"\u2192"}</span>
                  <span className="text-[#ff9a92]">{cfg.afterLabel + " " + String(band.after) + "%"}</span>
                </motion.div>
              )}
            </AnimatePresence>
            <div className="flex items-baseline justify-between gap-2">
              <span className={"text-[12px] " + (band.highlight ? "font-medium text-[#ff9a92]" : "text-neutral-400")}>
                {band.range}
              </span>
              {band.highlight && <Badge tone="accent-tint" size="sm">Top 20%</Badge>}
            </div>
            <DistributionBar
              label={cfg.beforeLabel}
              value={band.before}
              color={BEFORE}
              inView={inView}
              reduce={reduce}
              delay={0.1 * i}
            />
            <DistributionBar
              label={cfg.afterLabel}
              value={band.after}
              color={RED}
              inView={inView}
              reduce={reduce}
              delay={0.1 * i + 0.12}
            />
          </div>
        );
      })}
    </div>
  );
}

function JourneyChart() {
  const cfg = LANDING.proof.journeys;
  const ref = useRef<SVGSVGElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.3 });
  const reduce = useSafeReducedMotion();
  const [hovered, setHovered] = useState<number | null>(null);

  const W = 300;
  const H = 236;
  const X0 = 46;
  const X1 = 222;
  const TOP = 20;
  const BOT = 200;
  const yFor = (score: number) => BOT - (score / 100) * (BOT - TOP);

  const T = cfg.meaningfulThreshold;
  // Colour strictly by actual score movement, so the three real declines stay
  // visible rather than being folded into the improved count.
  const kindOf = (delta: number) => (delta > T ? "up" : delta < -T ? "down" : "flat");
  const hoveredP = cfg.participants.find((p) => p.id === hovered);
  const hoveredDelta = hoveredP ? hoveredP.after - hoveredP.before : 0;

  return (
    <div className="flex h-full flex-col">
      <div className="relative flex-1">
        <AnimatePresence>
          {hoveredP && (
            <motion.div
              initial={reduce ? false : { opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.15 }}
              className="pointer-events-none absolute left-1/2 top-0 z-10 -translate-x-1/2 whitespace-nowrap rounded-md border border-white/10 bg-neutral-900 px-2.5 py-1.5 text-[11px] shadow-lg"
            >
              <span className="font-medium text-white">{"Participant " + String(hoveredP.id)}</span>
              <span className="mx-1.5 text-neutral-600">{"\u00b7"}</span>
              <span className="text-neutral-400">{hoveredP.before}</span>
              <span className="mx-1 text-neutral-600">{"\u2192"}</span>
              <span className="text-[#ff9a92]">{hoveredP.after}</span>
              <span className="mx-1.5 text-neutral-600">{"\u00b7"}</span>
              <span className={hoveredDelta > 0 ? "text-[#ff9a92]" : "text-neutral-400"}>
                {(hoveredDelta > 0 ? "+" : "") + String(hoveredDelta)}
              </span>
            </motion.div>
          )}
        </AnimatePresence>

        <svg
          ref={ref}
          viewBox={"0 0 " + String(W) + " " + String(H)}
          className="h-full w-full"
          role="img"
          aria-label="Before and after assessment score for each of 24 participants"
        >
          <defs>
            <linearGradient id="proofJourneyUp" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor={BEFORE} />
              <stop offset="100%" stopColor={RED} />
            </linearGradient>
          </defs>

          {[X0, X1].map((x) => (
            <line key={x} x1={x} y1={TOP} x2={x} y2={BOT} stroke="rgba(255,255,255,0.12)" strokeWidth="1" />
          ))}
          {[0, 50, 100].map((s) => (
            <text key={s} x={X0 - 8} y={yFor(s) + 3.5} textAnchor="end" fontSize="9" fill="#78716C">{s}</text>
          ))}

          <line
            x1={X0}
            y1={yFor(cfg.benchmark)}
            x2={X1}
            y2={yFor(cfg.benchmark)}
            stroke="rgba(255,255,255,0.28)"
            strokeWidth="1"
            strokeDasharray="4 4"
          />
          <text x={W - 2} y={yFor(cfg.benchmark) - 5} textAnchor="end" fontSize="9" fill="#A8A29E">
            {cfg.benchmarkLabel}
          </text>

          <text x={X0} y={BOT + 20} textAnchor="middle" fontSize="10" fill="#A8A29E">{cfg.axisLabels.before}</text>
          <text x={X1} y={BOT + 20} textAnchor="middle" fontSize="10" fill="#A8A29E">{cfg.axisLabels.after}</text>

          {cfg.participants.map((p, i) => {
            const delta = p.after - p.before;
            const kind = kindOf(delta);
            const isHover = hovered === p.id;
            const dim = hovered !== null && !isHover;
            const stroke = kind === "up" ? "url(#proofJourneyUp)" : kind === "down" ? BEFORE : FLAT;
            return (
              <g
                key={p.id}
                onMouseEnter={() => setHovered(p.id)}
                onMouseLeave={() => setHovered(null)}
                onTouchStart={() => setHovered(isHover ? null : p.id)}
                style={{ cursor: "pointer" }}
              >
                <line x1={X0} y1={yFor(p.before)} x2={X1} y2={yFor(p.after)} stroke="transparent" strokeWidth="12" />
                {kind === "down" ? (
                  // Declines fade in rather than draw: animating pathLength makes
                  // framer-motion own stroke-dasharray, which would wipe out the
                  // dashed treatment the legend refers to.
                  <motion.line
                    x1={X0}
                    y1={yFor(p.before)}
                    x2={X1}
                    y2={yFor(p.after)}
                    stroke={isHover ? RED : stroke}
                    strokeWidth={isHover ? 2.5 : 1.25}
                    strokeLinecap="round"
                    strokeDasharray="3 3"
                    initial={reduce ? undefined : { opacity: 0 }}
                    animate={inView ? { opacity: dim ? 0.18 : 0.75 } : undefined}
                    transition={{ duration: 0.8, delay: 0.03 * i, ease: [0.22, 1, 0.36, 1] }}
                  />
                ) : (
                  <motion.line
                    x1={X0}
                    y1={yFor(p.before)}
                    x2={X1}
                    y2={yFor(p.after)}
                    stroke={isHover ? RED : stroke}
                    strokeWidth={isHover ? 2.5 : kind === "up" ? 1.5 : 1.25}
                    strokeLinecap="round"
                    opacity={dim ? 0.18 : kind === "up" ? 0.9 : 0.75}
                    initial={reduce ? undefined : { pathLength: 0 }}
                    animate={inView ? { pathLength: 1 } : undefined}
                    transition={{ duration: 0.8, delay: 0.03 * i, ease: [0.22, 1, 0.36, 1] }}
                  />
                )}
                {isHover && (
                  <>
                    <circle cx={X0} cy={yFor(p.before)} r={3.5} fill={BEFORE} />
                    <circle cx={X1} cy={yFor(p.after)} r={3.5} fill={RED} />
                  </>
                )}
              </g>
            );
          })}
        </svg>
      </div>

      <div className="mt-2 flex flex-wrap items-center gap-x-3.5 gap-y-1.5 text-[12px] text-neutral-500">
        <span className="flex items-center gap-1.5">
          <span className="h-[2px] w-4 rounded-full" style={{ background: "linear-gradient(90deg," + BEFORE + "," + RED + ")" }} />
          {cfg.legend.improved}
        </span>
        <span className="flex items-center gap-1.5">
          <span className="h-[2px] w-4 rounded-full" style={{ background: FLAT }} />
          {cfg.legend.flat}
        </span>
        <span className="flex items-center gap-1.5">
          <span
            className="h-0 w-4 border-t-2 border-dashed"
            style={{ borderColor: BEFORE }}
          />
          {cfg.legend.declined}
        </span>
      </div>
      <p className="mt-1.5 text-[12px] leading-relaxed text-neutral-600">{cfg.thresholdNote}</p>
    </div>
  );
}

function ProofVideo() {
  const cfg = LANDING.proof.video;
  const [playing, setPlaying] = useState(false);
  const poster = cfg.muxPlaybackId
    ? "https://image.mux.com/" + cfg.muxPlaybackId + "/thumbnail.jpg?time=" + String(cfg.thumbnailTime) + "&width=800"
    : "";

  return (
    <div className="relative h-full w-full overflow-hidden rounded-xl bg-[#0b0708]">
      {playing && cfg.muxPlaybackId ? (
        <MuxPlayer
          playbackId={cfg.muxPlaybackId}
          accentColor="#C81E3A"
          autoPlay
          metadata={{ video_title: cfg.title }}
          className="absolute inset-0 h-full w-full"
          // --media-object-fit crops the portrait source to the card box
          // instead of letterboxing or stretching it.
          style={{ "--media-object-fit": "cover", height: "100%", width: "100%" }}
        />
      ) : (
        <button
          type="button"
          onClick={() => setPlaying(true)}
          aria-label={"Play video: " + cfg.title}
          className="group absolute inset-0 h-full w-full"
        >
          {poster && (
            <img
              src={poster}
              alt=""
              aria-hidden="true"
              className="absolute inset-0 h-full w-full object-cover opacity-70 transition-opacity duration-300 group-hover:opacity-85"
            />
          )}
          {/* Brand-consistent tint so the thumbnail sits in the site palette. */}
          <span
            aria-hidden="true"
            className="absolute inset-0"
            style={{
              background:
                "radial-gradient(circle at 50% 42%, rgba(226,75,74,0.22), transparent 62%)," +
                "linear-gradient(to top, rgba(9,4,5,0.92), rgba(9,4,5,0.28) 55%, rgba(9,4,5,0.5))",
            }}
          />
          <span className="absolute inset-0 flex items-center justify-center">
            <span className="flex h-14 w-14 items-center justify-center rounded-full bg-white/95 shadow-lg transition-transform duration-200 group-hover:scale-105">
              <Play size={18} fill="currentColor" className="ml-0.5 text-[#171514]" />
            </span>
          </span>
          <span className="absolute bottom-3 right-3 rounded-full border border-white/15 bg-black/60 px-2 py-0.5 text-[11px] font-medium tabular-nums text-white backdrop-blur-sm">
            {cfg.duration}
          </span>
        </button>
      )}
    </div>
  );
}

function ProofTrust() {
  const cfg = LANDING.proof.trust;
  return (
    <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-6 backdrop-blur-xl sm:p-8">
      <div className="grid gap-7 lg:grid-cols-[1fr_auto] lg:items-center lg:gap-12">
        <div>
          <p style={display} className="text-xl leading-snug text-white">{cfg.heading}</p>
          <ul className="mt-4 flex flex-col gap-2.5">
            {cfg.points.map((point, i) => (
              <li key={i} className="flex gap-2.5 text-[13px] leading-relaxed text-neutral-400">
                <Check size={13} className="mt-1 shrink-0 text-[#E24B4A]" strokeWidth={3} />
                {point}
              </li>
            ))}
          </ul>
        </div>
        <div className="flex flex-col items-start gap-2 lg:items-end">
          <a
            href={cfg.ctaHref}
            className="inline-flex items-center justify-center rounded-md bg-[#C81E3A] px-6 py-3 text-sm font-medium text-white transition-all hover:bg-[#E0233F] active:scale-[0.99]"
          >
            {cfg.ctaLabel}
          </a>
          <p className="text-xs text-neutral-500">{cfg.ctaNote}</p>
        </div>
      </div>
    </div>
  );
}

function Proof() {
  const cfg = LANDING.proof;
  return (
    <section id="proof" className="relative isolate overflow-hidden border-b border-white/10 bg-[#090405]">
      <DotBackground />
      <Col className="py-16 sm:py-24">
        <Reveal>
          <p className="mb-2 text-xs font-medium uppercase tracking-[0.14em] text-[#ff8a82]">{cfg.kicker}</p>
          <div style={display} className="text-[28px] leading-tight text-white sm:text-[34px]">
            <TrueFocus
              sentence={cfg.heading}
              blurAmount={4}
              animationDuration={0.5}
              pauseBetweenAnimations={2.2}
            />
          </div>
          <p className="mt-3 max-w-xl text-[15px] leading-relaxed text-neutral-400">{cfg.sub}</p>
        </Reveal>

        <Reveal delay={80}>
          <div className="mt-8">
            <ProofSummary />
          </div>
        </Reveal>

        <div className="mt-4 grid grid-cols-1 gap-4 lg:grid-cols-3">
          <Reveal delay={120} className="h-full">
            <div className={PROOF_CARD}>
              <ProofCardTitle>{cfg.distribution.title}</ProofCardTitle>
              <div className={PROOF_BODY}>
                <DistributionChart />
              </div>
              <p className={PROOF_CAPTION}>{cfg.distribution.caption}</p>
            </div>
          </Reveal>

          <Reveal delay={160} className="h-full">
            <div className={PROOF_CARD}>
              <ProofCardTitle>{cfg.journeys.title}</ProofCardTitle>
              <div className={PROOF_BODY}>
                <JourneyChart />
              </div>
              <p className={PROOF_CAPTION}>{cfg.journeys.caption}</p>
            </div>
          </Reveal>

          <Reveal delay={200} className="h-full">
            <div className={PROOF_CARD}>
              <ProofCardTitle>{cfg.video.title}</ProofCardTitle>
              <div className={PROOF_BODY}>
                <ProofVideo />
              </div>
              <p className={PROOF_CAPTION}>{cfg.video.caption}</p>
            </div>
          </Reveal>
        </div>

        <Reveal delay={240}>
          <div className="mt-4">
            <ProofTrust />
          </div>
        </Reveal>
      </Col>
    </section>
  );
}

// ---------- brands ----------

function slugifyBrand(name: string) {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function BrandItem({ name, src }: { name: string; src: string }) {
  const [failed, setFailed] = useState(false);
  const url = src || "/assets/brand_icon/" + slugifyBrand(name) + ".png";
  return (
    <span
      className="group/brand mx-6 inline-flex items-center transition-transform duration-200 hover:scale-110"
      title={name}
    >
      {failed ? (
        <span className="whitespace-nowrap rounded-md border border-white/10 px-4 py-2 text-sm font-medium text-neutral-500 transition-colors duration-200 group-hover/brand:border-white/25 group-hover/brand:text-neutral-300">
          {name}
        </span>
      ) : (
        <img
          src={url}
          alt={name}
          onError={() => setFailed(true)}
          className="h-8 w-auto min-w-[64px] object-contain opacity-45 grayscale transition-all duration-200 group-hover/brand:opacity-100 group-hover/brand:grayscale-0"
        />
      )}
    </span>
  );
}

function Brands() {
  const cfg = LANDING.brands;
  return (
    <section className="relative isolate overflow-hidden bg-[#090405]">
      <div className="pb-12 pt-7">
        <p className="mb-8 text-center text-xs font-medium uppercase tracking-[0.14em] text-neutral-500">{cfg.heading}</p>
        <Marquee>
          {cfg.items.map((brand, i) => (
            <BrandItem key={i} name={brand.name} src={brand.src} />
          ))}
        </Marquee>
      </div>
    </section>
  );
}

// ---------- curriculum ----------

const DAY_ORDER = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];

function Curriculum() {
  const [open, setOpen] = useState<number | null>(1);
  const days = LANDING.curriculum.days;
  const openDay = open === 11 ? null : days.find((d) => d.day === open);
  const lineRef = useRef<HTMLDivElement>(null);
  const lineInView = useInView(lineRef, { once: true, amount: 0.5 });
  const reduce = useSafeReducedMotion();

  function step(dir: 1 | -1) {
    const current = open ?? 0;
    const idx = DAY_ORDER.indexOf(current);
    const nextIdx = idx === -1 ? (dir === 1 ? 0 : DAY_ORDER.length - 1) : (idx + dir + DAY_ORDER.length) % DAY_ORDER.length;
    setOpen(DAY_ORDER[nextIdx]);
  }

  return (
    <section id="curriculum" className="relative isolate overflow-hidden border-t border-white/10 bg-[#050810]">
      <BlobBackground opacity={0.7} colors={["rgba(58,92,168,0.30)", "rgba(80,120,190,0.22)", "rgba(56,180,210,0.16)"]} />
      <Col className="py-16 sm:py-24">
        <Reveal>
          <SectionHeading>{LANDING.curriculum.heading}</SectionHeading>
          <p className="mt-3 max-w-xl text-[15px] leading-relaxed text-neutral-400">{LANDING.curriculum.sub}</p>
        </Reveal>

        <Reveal delay={120}>
          <Spotlight className="mt-10 rounded-2xl border border-white/10 bg-white/[0.055] p-6 backdrop-blur-xl sm:p-8">
            <div className="mb-2 flex w-full justify-between text-[11px] uppercase tracking-[0.12em]">
              <span className="text-neutral-500">Foundation</span>
              <span className="text-[#ff8a82]">SPARKS</span>
            </div>

            <div ref={lineRef} className="relative">
              <div aria-hidden="true" className="absolute left-5 right-5 top-5 hidden h-[2px] overflow-hidden sm:block">
                <motion.div
                  className="h-full w-full origin-left"
                  style={{ background: "linear-gradient(to right, rgba(255,255,255,0.18) 0%, rgba(255,255,255,0.18) 34%, rgba(240,149,149,0.7) 42%, #E24B4A 100%)" }}
                  initial={reduce ? undefined : { scaleX: 0 }}
                  animate={lineInView ? { scaleX: 1 } : undefined}
                  transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
                />
              </div>

              <div className="relative grid grid-cols-4 gap-x-2 gap-y-5 sm:grid-cols-11">
                {days.map((d, i) => {
                  const isSparks = !!d.letter;
                  const isOpen = open === d.day;
                  return (
                    <motion.button
                      key={d.day}
                      onClick={() => setOpen(isOpen ? null : d.day)}
                      aria-expanded={isOpen}
                      className="group flex flex-col items-center gap-1.5"
                      initial={reduce ? undefined : { opacity: 0, y: 10 }}
                      animate={lineInView ? { opacity: 1, y: 0 } : undefined}
                      transition={{ duration: 0.4, delay: 0.08 * i }}
                      whileTap={reduce ? undefined : { scale: 0.92 }}
                    >
                      <motion.span
                        animate={isOpen && !reduce ? { scale: [1, 1.18, 1] } : undefined}
                        transition={{ duration: 0.35 }}
                        className={
                          "flex h-10 w-10 items-center justify-center rounded-full border text-sm font-medium shadow-[0_0_0_4px_#0a0f18] transition-colors " +
                          (isOpen
                            ? "border-[#C81E3A] bg-[#C81E3A] text-white ring-4 ring-[#E24B4A]/15"
                            : isSparks
                            ? "border-[#F09595] bg-[#0d1420] text-[#ff9a92] group-hover:border-[#E24B4A]"
                            : "border-white/15 bg-[#0f151f] text-neutral-300 group-hover:border-neutral-400")
                        }
                      >
                        {d.letter ?? d.day}
                      </motion.span>
                      <span className={"text-center text-[11px] leading-tight " + (isOpen ? "font-medium text-[#ff8a82]" : "text-neutral-500")}>
                        {d.label}
                      </span>
                    </motion.button>
                  );
                })}
                <motion.button
                  onClick={() => setOpen(open === 11 ? null : 11)}
                  aria-expanded={open === 11}
                  className="group flex flex-col items-center gap-1.5"
                  initial={reduce ? undefined : { opacity: 0, y: 10 }}
                  animate={lineInView ? { opacity: 1, y: 0 } : undefined}
                  transition={{ duration: 0.4, delay: 0.08 * days.length }}
                  whileTap={reduce ? undefined : { scale: 0.92 }}
                >
                  <span
                    className={
                      "flex h-10 w-10 items-center justify-center rounded-full border border-dashed text-[#E24B4A] shadow-[0_0_0_4px_#0a0f18] transition-colors " +
                      (open === 11 ? "border-[#E24B4A] bg-[#3a1216] ring-4 ring-[#E24B4A]/15" : "border-[#E24B4A]/45 bg-[#150a0c] group-hover:bg-[#2a1013]")
                    }
                  >
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" />
                    </svg>
                  </span>
                  <span className={"text-center text-[11px] leading-tight " + (open === 11 ? "font-medium text-[#ff8a82]" : "text-neutral-500")}>
                    {LANDING.curriculum.capstone.label}
                  </span>
                </motion.button>
              </div>
            </div>

            <div
              className="grid transition-[grid-template-rows] duration-300 ease-out"
              style={{ gridTemplateRows: open !== null ? "1fr" : "0fr" }}
            >
              <div className="overflow-hidden">
                <div className="mt-6 flex items-stretch gap-2 sm:gap-3">
                  <button
                    onClick={() => step(-1)}
                    aria-label="Previous day"
                    className="hidden shrink-0 items-center justify-center rounded-xl px-1 text-neutral-300 transition-colors hover:bg-white/[0.08] hover:text-white sm:flex"
                  >
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6" /></svg>
                  </button>
                  <div className="relative flex-1 overflow-hidden rounded-xl border border-white/10 bg-white/[0.05] p-6 backdrop-blur-xl">
                    <div
                      aria-hidden="true"
                      className="pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full blur-3xl"
                      style={{ background: "radial-gradient(circle, rgba(226,75,74,0.18), transparent 70%)" }}
                    />
                    <AnimatePresence mode="wait">
                      <motion.div
                        key={open ?? "none"}
                        initial={reduce ? false : { opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={reduce ? undefined : { opacity: 0, y: -6 }}
                        transition={{ duration: 0.22, ease: "easeOut" }}
                      >
                        {open === 11 ? (
                          <>
                            <p className="text-[11px] font-medium uppercase tracking-[0.12em] text-[#ff8a82]">After day 10</p>
                            <p style={display} className="mt-1 text-xl text-white">{LANDING.curriculum.capstone.label}</p>
                            <p className="mt-3 max-w-2xl text-[15px] leading-relaxed text-neutral-400">{LANDING.curriculum.capstone.coreIdea}</p>
                          </>
                        ) : openDay ? (
                          <div className="grid grid-cols-1 gap-6 md:grid-cols-[1fr_auto]">
                            <div>
                              <p className="text-[11px] font-medium uppercase tracking-[0.12em] text-[#ff8a82]">
                                {"Day " + String(openDay.day) + (openDay.letter ? " \u00b7 SPARKS" : " \u00b7 Foundation")}
                              </p>
                              <p style={display} className="mt-1 text-xl text-white">{openDay.label}</p>
                              <p className="mt-3 max-w-2xl text-[15px] leading-relaxed text-neutral-400">{openDay.coreIdea}</p>
                              {openDay.example && (
                                <div className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-2">
                                  <div className="rounded-lg border border-white/10 bg-white/[0.07] p-4">
                                    <p className="text-[11px] font-medium uppercase tracking-[0.4px] text-neutral-500">{openDay.example.beforeTitle}</p>
                                    <p className="mt-1.5 text-[13px] leading-relaxed text-neutral-400">{openDay.example.before}</p>
                                  </div>
                                  <div className="rounded-lg border-l-[3px] border-[#E24B4A] bg-[#E24B4A]/16 p-4">
                                    <p className="text-[11px] font-medium uppercase tracking-[0.4px] text-[#ff8a82]">{openDay.example.afterTitle}</p>
                                    <p className="mt-1.5 text-[13px] leading-relaxed text-red-100/80">{openDay.example.after}</p>
                                  </div>
                                </div>
                              )}
                            </div>
                            {openDay.stat && (
                              <div className="flex flex-col items-start justify-center border-t border-white/10 pt-4 md:min-w-[160px] md:max-w-[200px] md:border-l md:border-t-0 md:pl-6 md:pt-0">
                                <p style={display} className="text-[26px] leading-tight text-[#E24B4A]">{openDay.stat}</p>
                                <p className="mt-1 text-xs leading-snug text-neutral-500">{openDay.statLabel}</p>
                              </div>
                            )}
                          </div>
                        ) : null}
                      </motion.div>
                    </AnimatePresence>
                  </div>
                  <button
                    onClick={() => step(1)}
                    aria-label="Next day"
                    className="hidden shrink-0 items-center justify-center rounded-xl px-1 text-neutral-300 transition-colors hover:bg-white/[0.08] hover:text-white sm:flex"
                  >
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6" /></svg>
                  </button>
                </div>
              </div>
            </div>
          </Spotlight>
        </Reveal>

        <Reveal delay={80}>
          <div className="mt-8">
            <PreviewButton />
          </div>
        </Reveal>
      </Col>
    </section>
  );
}

// ---------- what you walk away with (glass tiles over grid spotlight) ----------

const INCLUDED_ICONS: Record<string, ReactNode> = {
  "10 daily lessons": <path d="M8 5v14l11-7z" />,
  "Advanced track": <path d="M12 2 2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />,
  "Capstone project": <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" />,
  "Two verifiable certificates": <path d="M12 15a5 5 0 1 0 0-10 5 5 0 0 0 0 10zM8.5 13.5 7 22l5-3 5 3-1.5-8.5" />,
  "Bryan's personal guidance": <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />,
  "Daily rhythm, kept for you": <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9M13.73 21a2 2 0 0 1-3.46 0" />,
  "Resource library": <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2zM22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />,
  "Prompts, GPTs, templates": <path d="m12 3-1.9 4.9L5 10l5.1 2.1L12 17l1.9-4.9L19 10l-5.1-2.1zM5 3v4M3 5h4M19 17v4M17 19h4" />,
  "Bragging rights": <path d="M8 21h8M12 17v4M7 4h10v5a5 5 0 0 1-10 0zM7 5H4a2 2 0 0 0 0 4h.5M17 5h3a2 2 0 0 1 0 4h-.5" />,
};

// Bento pattern for the 9 included-items grid: exactly one hero tile (2x2)
// at lg and up, everything else uniform 1x1. This is deliberate arithmetic,
// not a style choice: with a 3-col grid, one 2x2 tile plus two 1x1 tiles
// exactly fills the first two rows (4+1+1=6 cells), and the remaining 6
// items exactly fill two more rows of three. A second or third wide tile
// breaks that division and strands a tile alone on its own row (confirmed
// bug: item 8 previously spanned 2 cols and had no neighbor left to pair
// with). Mobile/tablet stay uniform; asymmetry is a desktop-only device.
const INCLUDED_BENTO: Record<number, { span: string; featured?: boolean }> = {
  0: { span: "lg:col-span-2 lg:row-span-2", featured: true },
};

function IncludedTile({ item, index }: { item: { title: string; desc: string }; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const [pos, setPos] = useState<{ x: number; y: number } | null>(null);
  const reduce = useSafeReducedMotion();

  function onMove(e: React.PointerEvent<HTMLDivElement>) {
    if (reduce || e.pointerType !== "mouse") return;
    const r = ref.current?.getBoundingClientRect();
    if (!r) return;
    setPos({ x: e.clientX - r.left, y: e.clientY - r.top });
  }

  const icon = INCLUDED_ICONS[item.title] ?? <polyline points="20 6 9 17 4 12" />;
  const bento = INCLUDED_BENTO[index];
  const featured = !!bento?.featured;

  return (
    <Reveal delay={index * 50} className={bento?.span}>
      <div
        ref={ref}
        onPointerMove={onMove}
        onPointerLeave={() => setPos(null)}
        className={
          "group relative flex h-full flex-col overflow-hidden rounded-xl border border-white/10 bg-white/[0.045] shadow-[0_18px_60px_rgba(0,0,0,0.25)] backdrop-blur-2xl transition-all duration-300 hover:-translate-y-1 hover:border-[#FF3B3B]/55 hover:bg-white/[0.07] " +
          (featured ? "justify-end p-5 sm:p-6" : "justify-center p-4")
        }
      >
        <div
          aria-hidden="true"
          className={
            "pointer-events-none absolute -right-12 -top-12 rounded-full bg-[#FF3B3B]/16 blur-2xl opacity-0 transition-opacity duration-300 group-hover:opacity-100 " +
            (featured ? "h-56 w-56" : "h-32 w-32")
          }
        />
        {pos && (
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 transition-opacity duration-300"
            style={{
              background:
                "radial-gradient(180px circle at " + String(pos.x) + "px " + String(pos.y) +
                "px, rgba(255,59,59,0.18), transparent 70%)",
            }}
          />
        )}
        <div className="relative">
          <span
            className={
              "inline-flex items-center justify-center rounded-lg bg-[#FF3B3B] text-white shadow-[0_0_18px_rgba(255,59,59,0.35)] transition-transform duration-300 group-hover:scale-110 " +
              (featured ? "h-10 w-10" : "h-7 w-7")
            }
          >
            <svg width={featured ? "19" : "13"} height={featured ? "19" : "13"} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              {icon}
            </svg>
          </span>
          {featured ? (
            <p style={{ fontFamily: "var(--font-display), Georgia, serif" }} className="mt-3 text-xl text-[#FF3B3B]">{item.title}</p>
          ) : (
            <p className="mt-2 text-sm font-medium text-white">{item.title}</p>
          )}
          <p className={"mt-1 leading-snug text-neutral-500 line-clamp-2 " + (featured ? "max-w-xs text-sm" : "text-[13px]")}>{item.desc}</p>
        </div>
      </div>
    </Reveal>
  );
}

function Included() {
  const cfg = LANDING.included;
  return (
    <section className="relative isolate overflow-hidden">
      <Col className="py-10 sm:py-14">
        <Reveal>
          <SectionHeading color="bright-red">{cfg.heading}</SectionHeading>
          <p className="mt-3 text-[15px] text-neutral-400">{cfg.sub}</p>
        </Reveal>
        <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3 lg:auto-rows-[128px]">
          {cfg.items.map((item, i) => (
            <IncludedTile key={item.title} item={item} index={i} />
          ))}
        </div>
      </Col>
    </section>
  );
}

// ---------- resource explorer ----------

function Explorer() {
  const cfg = LANDING.explorer;
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [showAll, setShowAll] = useState(false);

  const isTeam = cfg.questions.some((q) =>
    q.options.some((o) => o.id === answers[q.id] && o.route === "team")
  );
  const anyAnswered = Object.keys(answers).length > 0;

  const scores: Record<string, number> = {};
  for (const q of cfg.questions) {
    const chosen = q.options.find((o) => o.id === answers[q.id]);
    if (!chosen) continue;
    for (const [rid, pts] of Object.entries(chosen.boosts)) {
      scores[rid] = (scores[rid] ?? 0) + pts;
    }
  }

  // The primary offer is always pinned first: the live course for
  // team answers, the self-paced course otherwise.
  const pinnedId = isTeam ? "live" : "course";
  const sortedByScore = [...cfg.resources].sort((a, b) => (scores[b.id] ?? 0) - (scores[a.id] ?? 0));
  let matches: typeof cfg.resources = [];
  if (anyAnswered) {
    const pinned = cfg.resources.find((r) => r.id === pinnedId);
    const others = sortedByScore.filter((r) => r.id !== pinnedId && (scores[r.id] ?? 0) > 0);
    matches = [...(pinned ? [pinned] : []), ...others].slice(0, cfg.highlightCount);
  }
  const matchIds = new Set(matches.map((r) => r.id));
  const rest = sortedByScore.filter((r) => !matchIds.has(r.id));

  return (
    <section className="relative isolate overflow-hidden">
      <Col className="py-16 sm:py-24">
        <Reveal>
          <SectionHeading>{cfg.heading}</SectionHeading>
          <p className="mt-3 text-[15px] text-neutral-400">{cfg.sub}</p>
        </Reveal>

        <div className="mt-8 grid grid-cols-1 gap-8 lg:grid-cols-[1fr_400px]">
          <Reveal delay={100}>
            <div className={"flex flex-col gap-7 rounded-2xl p-6 sm:p-8 " + PANEL}>
              {cfg.questions.map((q) => (
                <div key={q.id}>
                  <p className="mb-2.5 text-sm text-white">{q.question}</p>
                  <div className="flex flex-wrap gap-2">
                    {q.options.map((o) => {
                      const selected = answers[q.id] === o.id;
                      return (
                        <button
                          key={o.id}
                          onClick={() => setAnswers((prev) => ({ ...prev, [q.id]: o.id }))}
                          aria-pressed={selected}
                          className={
                            "rounded-md px-4 py-2 text-sm transition-all active:scale-[0.97] " +
                            (selected
                              ? "bg-[#C81E3A] font-medium text-white"
                              : "border border-white/15 text-neutral-400 hover:border-neutral-500 hover:text-white")
                          }
                        >
                          {o.label}
                        </button>
                      );
                    })}
                  </div>
                </div>
              ))}
              {anyAnswered && (
                <button onClick={() => { setAnswers({}); setShowAll(false); }} className="self-start text-sm text-neutral-500 hover:text-white">
                  Start over
                </button>
              )}
              {isTeam && (
                <div className="rounded-lg border-l-[3px] border-[#E24B4A] bg-[#E24B4A]/12 px-4 py-3">
                  <p className="text-sm leading-relaxed text-red-100/80">{cfg.teamNote}</p>
                  <a href={LANDING.contactMailto} className="mt-2 inline-flex items-center rounded-md bg-[#C81E3A] px-4 py-2 text-sm font-medium text-white hover:bg-[#E0233F]">
                    {LANDING.enterprise.cta}
                  </a>
                </div>
              )}
            </div>
          </Reveal>

          <Reveal delay={180}>
            <div className="lg:sticky lg:top-24 lg:max-h-[calc(100vh-7rem)] lg:overflow-hidden">
              <p className="mb-3 text-[11px] font-medium uppercase tracking-[0.12em] text-neutral-500">
                {anyAnswered ? "Your matches" : "Your matches will appear here"}
              </p>

              {!anyAnswered && !showAll && (
                <div className="rounded-xl border border-dashed border-white/15 bg-white/[0.035] px-5 py-8 text-center backdrop-blur-xl">
                  <p className="text-sm text-neutral-500">{cfg.emptyHint}</p>
                </div>
              )}

              {/* No enter/exit animations here on purpose. Mixing them
                  with layout reordering caused overlapping mid-flight
                  cards. Pure layout transitions with a short tween are
                  glitch-free. */}
              <div
                className={
                  "relative flex flex-col gap-2" +
                  (showAll ? " max-h-[calc(100vh-16rem)] overflow-y-auto pr-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden" : "")
                }
              >
                {matches.map((r) => (
                  <motion.a
                    key={r.id}
                    href={r.href}
                    layout
                    transition={{ duration: 0.25, ease: "easeOut" }}
                    className="flex items-start justify-between gap-3 rounded-xl border border-[#F09595] bg-[#E24B4A]/16 px-4 py-3"
                  >
                    <div>
                      <p className="text-sm font-medium text-red-100/80">{r.title}</p>
                      <p className="mt-0.5 text-xs text-red-100/70">{cfg.reasons[r.id] ?? r.desc}</p>
                    </div>
                    <Badge tone="accent-solid" size="sm">For you</Badge>
                  </motion.a>
                ))}

                {showAll &&
                  (anyAnswered ? rest : sortedByScore).map((r) => (
                    <motion.a
                      key={r.id}
                      href={r.href}
                      layout
                      transition={{ duration: 0.25, ease: "easeOut" }}
                      className="flex items-start justify-between gap-3 rounded-xl border border-white/10 bg-white/[0.045] px-4 py-2.5 transition-colors hover:border-white/15"
                    >
                      <div>
                        <p className="text-sm text-white">{r.title}</p>
                        <p className="mt-0.5 text-xs text-neutral-500">{r.desc}</p>
                      </div>
                      <Badge tone="neutral" size="sm">{r.tag}</Badge>
                    </motion.a>
                  ))}

                </div>

              {showAll && (
                <p className="mt-2 flex items-center gap-1.5 text-[11px] text-neutral-600">
                  <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M12 5v14M19 12l-7 7-7-7" />
                  </svg>
                  Scroll within this list for more
                </p>
              )}

              <motion.button
                layout
                transition={{ duration: 0.25, ease: "easeOut" }}
                onClick={() => setShowAll(!showAll)}
                className="mt-3 inline-flex items-center gap-1.5 self-start text-sm text-neutral-500 transition-colors hover:text-white"
              >
                {showAll ? cfg.hideAllLabel : cfg.showAllLabel + " (" + String(cfg.resources.length) + ")"}
                <svg
                  className={"transition-transform duration-200 " + (showAll ? "rotate-180" : "")}
                  width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                >
                  <polyline points="6 9 12 15 18 9" />
                </svg>
              </motion.button>
            </div>
          </Reveal>
        </div>
      </Col>
    </section>
  );
}

// ---------- testimonials ----------

function Testimonials() {
  const cfg = LANDING.testimonials;
  return (
    <section className="relative isolate overflow-hidden border-t border-white/10 bg-[#070304]">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-36"
        style={{ background: "linear-gradient(to bottom, #050810, transparent)" }}
      />
      <Col className="py-16 pb-8 sm:py-24 sm:pb-10">
        <Reveal>
          <SectionHeading>{cfg.heading}</SectionHeading>
          <p className="mt-3 text-[15px] text-neutral-400">{cfg.sub}</p>
        </Reveal>
      </Col>
      <Reveal>
        <div className="pb-8 sm:pb-10">
          <DragMarquee arrows>
            {cfg.items.map((t, i) =>
              t.type === "video" ? (
                <div key={i} className="relative flex aspect-[3/4] w-56 shrink-0 select-none flex-col justify-end overflow-hidden rounded-xl bg-neutral-800">
                  <div
                    aria-hidden="true"
                    className="absolute inset-0 opacity-40"
                    style={{ background: "radial-gradient(circle at 35% 30%, rgba(226,75,74,0.5), transparent 60%)" }}
                  />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="flex h-12 w-12 items-center justify-center rounded-full bg-white/90">
                      <Play size={16} fill="currentColor" className="ml-0.5 text-[#171514]" />
                    </span>
                  </div>
                  <div className="relative bg-gradient-to-t from-black/70 to-transparent p-4 pt-10">
                    <p className="text-sm font-medium text-white">{t.name}</p>
                    <p className="text-xs text-white/70">{t.role}</p>
                  </div>
                </div>
              ) : (
                <figure key={i} className="flex h-56 w-72 shrink-0 select-none flex-col justify-between rounded-xl border border-white/10 bg-white/[0.045] p-5">
                  <blockquote className="line-clamp-5 text-sm leading-relaxed text-neutral-300">{"\u201c" + t.quote + "\u201d"}</blockquote>
                  <figcaption className="mt-4 shrink-0">
                    <p className="text-sm font-medium text-white">{t.name}</p>
                    <p className="text-xs text-neutral-500">{t.role}</p>
                  </figcaption>
                </figure>
              )
            )}
          </DragMarquee>
        </div>
      </Reveal>
    </section>
  );
}

// ---------- assessment (prompt left, sample output right) ----------

function Assessment() {
  const cfg = LANDING.assessment;
  const [model, setModel] = useState<AssessmentModel>("claude");
  const [copied, setCopied] = useState(false);
  const [hasCopied, setHasCopied] = useState(false);
  const active = ASSESSMENT_PROMPTS[model];
  const reduce = useSafeReducedMotion();

  function handleCopy() {
    navigator.clipboard.writeText(active.text).then(() => {
      setCopied(true);
      setHasCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  }

  return (
    <section id="assessment" className="relative isolate overflow-hidden bg-[#070304]">
      <DotBackground />
      <Col className="py-16 sm:py-24">
        <Reveal>
          <p className="mb-2 text-xs font-medium uppercase tracking-[0.14em] text-[#FF3B3B]">{cfg.kicker}</p>
          <SectionHeading>{cfg.heading}</SectionHeading>
          <p className="mt-3 max-w-2xl text-[15px] leading-relaxed text-neutral-400">{cfg.sub}</p>
        </Reveal>

        <div className="mt-8 grid grid-cols-1 gap-8 md:grid-cols-[1fr_340px]">
          <Reveal delay={100}>
            <div className="rounded-2xl border border-white/10 p-6 sm:p-8">
              <div className="mb-5 inline-flex rounded-lg bg-white/[0.08] p-1" role="tablist" aria-label="Choose AI model">
                {(Object.keys(ASSESSMENT_PROMPTS) as AssessmentModel[]).map((key) => (
                  <button
                    key={key}
                    role="tab"
                    aria-selected={model === key}
                    onClick={() => setModel(key)}
                    className={
                      "rounded-md px-4 py-2 text-sm font-medium transition-all " +
                      (model === key ? "bg-white/[0.045] text-white shadow-sm" : "text-neutral-500 hover:text-neutral-300")
                    }
                  >
                    {ASSESSMENT_PROMPTS[key].label}
                  </button>
                ))}
              </div>

              <div className="relative overflow-hidden rounded-lg border border-white/10 bg-white/[0.035] p-4">
                <pre className="max-h-24 overflow-hidden whitespace-pre-wrap font-mono text-[12px] leading-relaxed text-neutral-500">
                  {active.text.slice(0, 320) + "\u2026"}
                </pre>
                <div className="pointer-events-none absolute inset-x-0 bottom-0 h-12 bg-gradient-to-t from-[#090405] to-transparent" />
              </div>
              <p className="mt-2.5 text-xs text-neutral-500">
                {"\u2248 " + active.text.trim().split(/\s+/).length.toLocaleString("en-US") + " words \u00b7 the full prompt copies in one click"}
              </p>

              <div className="mt-5 flex flex-wrap gap-2.5">
                <button
                  onClick={handleCopy}
                  className={
                    "inline-flex items-center gap-2 rounded-md px-5 py-2.5 text-sm font-medium text-white transition-all active:scale-[0.98] " +
                    (copied ? "bg-[#0F6E56]" : "bg-[#C81E3A] hover:bg-[#E0233F]")
                  }
                >
                  <Copy size={15} />{copied ? "Copied \u2713" : "Copy prompt"}
                </button>
                <a
                  href={active.openUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center rounded-md border border-white/15 px-5 py-2.5 text-sm text-white transition-all hover:bg-white/[0.08] active:scale-[0.98]"
                >
                  {active.openLabel}<ExternalLink size={14} className="ml-1.5" />
                </a>
              </div>

              <AnimatePresence>
                {hasCopied && (
                  <motion.p
                    initial={reduce ? false : { opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    className="mt-4 text-sm leading-relaxed text-[#0F6E56]"
                  >
                    {cfg.afterCopyNote}
                  </motion.p>
                )}
              </AnimatePresence>
            </div>
          </Reveal>

          <Reveal delay={200}>
            <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.045] p-6">
              <div
                aria-hidden="true"
                className="pointer-events-none absolute -right-12 -top-12 h-40 w-40 rounded-full blur-3xl"
                style={{ background: "radial-gradient(circle, rgba(226,75,74,0.16), transparent 70%)" }}
              />
              <Badge tone="neutral" className="uppercase tracking-[0.08em]">{cfg.sample.caption}</Badge>
              <div className="mt-4 flex items-baseline gap-1.5">
                <span style={display} className="text-[44px] leading-none text-[#E24B4A]">
                  <Ticker value={cfg.sample.score} />
                </span>
                <span className="text-lg text-neutral-500">/100</span>
              </div>
              <p style={display} className="mt-1 text-xl text-white">{cfg.sample.profile}</p>
              <p className="mt-0.5 text-xs text-neutral-500">{cfg.sample.pair}</p>
              <div className="mt-5 flex flex-col gap-2.5">
                {cfg.sample.bars.map((b, i) => (
                  <div key={b.label} className="flex items-center gap-3">
                    <span className="w-[92px] shrink-0 text-xs text-neutral-400">{b.label}</span>
                    <div className="h-1.5 flex-1 rounded-full bg-white/[0.08]">
                      <motion.div
                        className="h-1.5 rounded-full bg-[#E24B4A]"
                        initial={reduce ? false : { width: 0 }}
                        whileInView={{ width: String((b.value / 10) * 100) + "%" }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.7, delay: 0.08 * i, ease: [0.22, 1, 0.36, 1] }}
                      />
                    </div>
                    <span className="w-5 shrink-0 text-right text-xs text-neutral-500">{b.value}</span>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </Col>
    </section>
  );
}

// ---------- bio (photo + text + voice) ----------

function Bio() {
  const cfg = LANDING.bio;
  const showAudio = LANDING.bio.audio.enabled;
  return (
    <section className="relative isolate overflow-hidden border-t border-white/10">
      <DotBackground fade={false} dotOpacity={0.24} />
      <Col className="grid grid-cols-1 gap-10 py-16 sm:py-24 md:grid-cols-[260px_1fr]">
        <Reveal className="h-full">
          <div className="relative flex h-full min-h-[320px] w-full max-w-[260px] flex-col justify-end overflow-hidden rounded-2xl border border-white/10 bg-neutral-900">
            <img
              src="/assets/bryan-bio-headshot.jpg"
              alt="Bryan Cassady"
              className="absolute inset-0 h-full w-full object-cover"
            />
            <div className="relative bg-gradient-to-t from-black/70 to-transparent p-4 pt-12">
              <p className="text-sm font-medium text-white">Bryan Cassady</p>
              <p className="mt-0.5 text-xs text-white/70">Bestselling author, Disciplined AI</p>
            </div>
          </div>
        </Reveal>
        <Reveal delay={100}>
          <div className={"rounded-2xl p-6 sm:p-8 " + PANEL}>
            <SectionHeading>{cfg.heading}</SectionHeading>
            {cfg.paragraphs.map((p, i) => (
              <p key={i} className="mt-4 max-w-xl text-[15px] leading-relaxed text-neutral-400">{p}</p>
            ))}
            {showAudio && (
              <div className="mt-6 max-w-md">
                <Waveform src={cfg.audio.src} label={cfg.audio.label} duration={cfg.audio.duration} />
              </div>
            )}
          </div>
        </Reveal>
      </Col>
    </section>
  );
}

// ---------- pricing + faq ----------

function fmtPrice(currency: string, amount: number) {
  return currency + amount.toLocaleString("en-US");
}

function PricingFaq() {
  const p = LANDING.pricing;
  const solo = p.selfPaced;
  const cohort = p.liveCohort;
  const company = p.company;
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section id="pricing" className="relative isolate overflow-hidden border-t border-white/10 bg-[#050203]">
      <PricingRaysBackground />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-48"
        style={{ background: "linear-gradient(to bottom, #070304, transparent)" }}
      />
      <Col className="py-12 sm:py-16">
        <Reveal>
          <SectionHeading>{LANDING.pricingFaq.heading}</SectionHeading>
          <p className="mt-3 text-[15px] text-neutral-400">{LANDING.pricingFaq.sub}</p>
        </Reveal>

        <div className="mt-6 grid grid-cols-1 gap-4 lg:grid-cols-3">
          <Reveal delay={100}>
            <div className={"relative flex h-full flex-col overflow-hidden rounded-2xl " + PANEL}>
              <div aria-hidden="true" className="h-1 w-full bg-gradient-to-r from-[#C81E3A] to-[#F09595]" />
              <div className="flex flex-1 flex-col p-5 sm:p-6">
                <span className="text-xs font-medium uppercase tracking-[0.12em] text-neutral-500">{solo.kicker}</span>
                <p style={display} className="mt-1.5 text-xl text-white">{solo.heading}</p>
                <div className="mt-4 flex items-baseline gap-2.5">
                  <span style={{ ...display, textShadow: "0 0 24px rgba(255,59,59,0.35)" }} className="text-[32px] leading-none text-[#FF3B3B]">{fmtPrice(solo.currency, solo.salePrice)}</span>
                  <span className="text-sm text-neutral-500">{solo.priceNote}</span>
                </div>
                <p className="mt-1 text-xs text-neutral-500">{solo.afterLaunchNote}</p>
                {solo.saleNote && (
                  <div className="mt-3 rounded-md border-l-[3px] border-[#E24B4A] bg-[#E24B4A]/10 px-3 py-2">
                    <p className="text-xs leading-relaxed text-red-100/80">{solo.saleNote}</p>
                  </div>
                )}
                <p className="mt-3 text-sm leading-relaxed text-neutral-300">{solo.body}</p>
                <ul className="mt-4 flex flex-1 flex-col gap-2">
                  {solo.includes.map((line, i) => (
                    <li key={i} className="flex gap-2.5 text-sm leading-relaxed text-neutral-300">
                      <Check size={13} className="mt-1 shrink-0 text-[#C81E3A]" strokeWidth={3} />
                      {line}
                    </li>
                  ))}
                </ul>
                <p className="mt-4 text-xs uppercase tracking-[0.1em] text-neutral-500">Time: {solo.time}</p>
                <div className="mt-4">
                  <a href={LANDING.enrollHref} className="inline-flex w-full items-center justify-center rounded-md bg-[#C81E3A] px-5 py-2.5 text-sm font-medium text-white transition-all hover:bg-[#E0233F] active:scale-[0.99]">
                    {solo.cta}
                  </a>
                </div>
              </div>
            </div>
          </Reveal>

          <Reveal delay={140}>
            <div className={"relative flex h-full flex-col overflow-hidden rounded-2xl " + PANEL_STRONG}>
              <div aria-hidden="true" className="h-1 w-full bg-gradient-to-r from-[#C81E3A] to-[#F09595]" />
              <div className="relative flex flex-1 flex-col p-5 sm:p-6">
                <Badge tone="accent-solid" className="absolute right-5 top-5 sm:right-6 sm:top-6">{cohort.badge}</Badge>
                <span className="text-xs font-medium uppercase tracking-[0.12em] text-[#ff8a82]">{cohort.kicker}</span>
                <p style={display} className="mt-1.5 text-xl text-white">{cohort.heading}</p>
                <div className="mt-4 flex items-baseline gap-2">
                  <span style={display} className="text-[32px] leading-none text-white">{fmtPrice(cohort.currency, cohort.price)}</span>
                  <span className="text-sm text-neutral-500">{cohort.priceUnit}</span>
                </div>
                <p className="mt-3 text-sm leading-relaxed text-neutral-300">{cohort.body}</p>
                <ul className="mt-4 flex flex-1 flex-col gap-2">
                  {cohort.includes.map((line, i) => (
                    <li key={i} className="flex gap-2.5 text-sm leading-relaxed text-neutral-300">
                      <Check size={13} className="mt-1 shrink-0 text-[#C81E3A]" strokeWidth={3} />
                      {line}
                    </li>
                  ))}
                </ul>
                <p className="mt-4 text-xs uppercase tracking-[0.1em] text-neutral-500">Time: {cohort.time}</p>
                <p className="mt-1 text-xs text-neutral-500">{cohort.cohortDate}</p>
                <div className="mt-4">
                  {cohort.enrollmentOpen ? (
                    <a href={LANDING.liveCohortHref} className="inline-flex w-full items-center justify-center rounded-md bg-[#C81E3A] px-5 py-2.5 text-sm font-medium text-white transition-all hover:bg-[#E0233F] active:scale-[0.99]">
                      {cohort.cta}
                    </a>
                  ) : (
                    <a href={LANDING.contactMailto} className="inline-flex w-full items-center justify-center rounded-md border border-white/15 bg-white/[0.04] px-5 py-2.5 text-sm font-medium text-white transition-all hover:bg-white/[0.08] active:scale-[0.99]">
                      {cohort.cta}
                    </a>
                  )}
                </div>
              </div>
            </div>
          </Reveal>

          <Reveal delay={180}>
            <div className={"relative flex h-full flex-col overflow-hidden rounded-2xl " + PANEL}>
              <div
                aria-hidden="true"
                className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full blur-3xl"
                style={{ background: "radial-gradient(circle, rgba(200,30,58,0.20), transparent 70%)" }}
              />
              <div className="relative flex flex-1 flex-col p-5 sm:p-6">
                <span className="text-xs font-medium uppercase tracking-[0.12em] text-neutral-500">{company.kicker}</span>
                <p className="mt-1.5 text-xs uppercase tracking-[0.1em] text-[#ff8a82]">{company.tagline}</p>
                <p style={display} className="mt-1 text-xl text-white">{company.heading}</p>
                <div className="mt-4 flex items-baseline gap-2">
                  <span className="text-sm text-neutral-500">{company.priceNote}</span>
                  <span style={display} className="text-[32px] leading-none text-white">{fmtPrice(company.currency, company.priceFrom)}</span>
                </div>
                <p className="mt-3 text-sm leading-relaxed text-neutral-300">{company.body}</p>
                <ul className="mt-4 flex flex-1 flex-col gap-2">
                  {company.includes.map((line, i) => (
                    <li key={i} className="flex gap-2.5 text-sm leading-relaxed text-neutral-300">
                      <Check size={13} className="mt-1 shrink-0 text-[#C81E3A]" strokeWidth={3} />
                      {line}
                    </li>
                  ))}
                </ul>
                <p className="mt-4 text-xs uppercase tracking-[0.1em] text-neutral-500">Time: {company.time}</p>
                <div className="mt-4">
                  <a href={LANDING.contactMailto} className="inline-flex w-full items-center justify-center rounded-md border border-white/15 bg-white/[0.045] px-5 py-2.5 text-sm font-medium text-white transition-all hover:bg-white/[0.08] active:scale-[0.99]">
                    {company.cta}
                  </a>
                </div>
              </div>
            </div>
          </Reveal>
        </div>

        <Reveal delay={200}>
          <p className="mt-5 text-center text-sm text-neutral-500">
            <a href={LANDING.auditHref} className="text-[#ff8a82] underline underline-offset-4 hover:text-white">{p.previewCta}</a>
          </p>
        </Reveal>

        <Reveal delay={210}>
          <div className="mt-8 overflow-x-auto rounded-2xl border border-white/10">
            <table className="w-full min-w-[560px] border-collapse text-sm">
              <thead>
                <tr className="bg-white/[0.04]">
                  <th className="p-3 text-left font-medium text-neutral-500"></th>
                  {p.comparison.columns.map((col) => (
                    <th key={col} className="p-3 text-left text-xs font-medium uppercase tracking-[0.1em] text-neutral-400">{col}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {p.comparison.rows.map((row, i) => (
                  <tr key={row.label} className={i % 2 === 1 ? "bg-white/[0.02]" : undefined}>
                    <td className="p-3 text-neutral-400">{row.label}</td>
                    {row.values.map((val, j) => (
                      <td key={j} className="p-3 text-neutral-200">{val}</td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Reveal>

        <Reveal delay={220}>
          <div className="mt-10 divide-y divide-white/10 border-y border-white/10">
            {LANDING.faq.items.map((item, i) => {
              const isOpen = open === i;
              return (
                <div key={i}>
                  <button
                    onClick={() => setOpen(isOpen ? null : i)}
                    aria-expanded={isOpen}
                    className="flex w-full items-center justify-between gap-4 py-4 text-left"
                  >
                    <span className="text-[15px] text-white">{item.q}</span>
                    <svg
                      className={"shrink-0 text-neutral-500 transition-transform duration-200 " + (isOpen ? "rotate-45" : "")}
                      width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"
                    >
                      <line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" />
                    </svg>
                  </button>
                  <div className="grid transition-[grid-template-rows] duration-300 ease-out" style={{ gridTemplateRows: isOpen ? "1fr" : "0fr" }}>
                    <div className="overflow-hidden">
                      <p className="pb-4 pr-8 text-sm leading-relaxed text-neutral-400">{item.a}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </Reveal>
      </Col>
    </section>
  );
}

// ---------- contact ----------

function Contact() {
  const cfg = LANDING.contact;
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [submitted, setSubmitted] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const res = await fetch("/api/contact/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, message }),
      });
      const data = await res.json();
      if (!data.ok) {
        setError(data.error ?? cfg.errorFallback);
      } else {
        setSubmitted(true);
      }
    } catch {
      setError(cfg.errorFallback);
    } finally {
      setLoading(false);
    }
  }

  return (
    <section id="contact" className="relative isolate overflow-hidden border-t border-white/10 bg-[#090405]">
      <GridSpotlightBackground />
      <Col className="py-10 sm:py-14">
        <Reveal>
          <SectionHeading>{cfg.heading}</SectionHeading>
          <p className="mt-3 text-[15px] leading-relaxed text-neutral-400">{cfg.sub}</p>
        </Reveal>
        <div className="mt-6">
          <Reveal delay={100}>
            {submitted ? (
              <div className="rounded-2xl border border-white/10 bg-white/[0.045] p-6 sm:p-8">
                <p style={display} className="text-xl text-white">{cfg.successHeading}</p>
                <p className="mt-2 text-sm text-neutral-400">{cfg.successBody}</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col gap-4 rounded-2xl border border-white/10 bg-white/[0.045] p-6 sm:p-8">
                <Input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder={cfg.namePlaceholder}
                  className="h-11 border-white/10 bg-white/[0.04] px-3.5 text-white placeholder:text-neutral-600 focus-visible:ring-[#E24B4A]/45"
                />
                <Input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder={cfg.emailPlaceholder}
                  className="h-11 border-white/10 bg-white/[0.04] px-3.5 text-white placeholder:text-neutral-600 focus-visible:ring-[#E24B4A]/45"
                />
                <Textarea
                  required
                  rows={5}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder={cfg.messagePlaceholder}
                  className="border-white/10 bg-white/[0.04] px-3.5 py-2.5 text-white placeholder:text-neutral-600 focus-visible:ring-[#E24B4A]/45"
                />
                {error && <p className="text-sm text-[#ff8a82]">{error}</p>}
                <Button
                  type="submit"
                  disabled={loading}
                  className="h-11 self-start bg-[#C81E3A] px-6 text-white hover:bg-[#E0233F]"
                >
                  {loading ? "Sending\u2026" : cfg.submitLabel}
                </Button>
              </form>
            )}
          </Reveal>
        </div>
      </Col>
    </section>
  );
}

// ---------- final cta + footer ----------

function FinalCta() {
  const chip = LANDING.hero.chip;
  const nps = LANDING.hero.nps;
  return (
    <section className="relative isolate overflow-hidden border-t border-white/10">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10"
        style={{ background: "radial-gradient(600px circle at 50% 110%, rgba(226,75,74,0.10), transparent 70%)" }}
      />
      <DarkVeilBackground />
      <WaveBackground />
      <Col className="flex flex-col items-center py-20 text-center sm:py-28">
        <Reveal>
          <h2 style={display} className="text-[32px] leading-tight text-white sm:text-[42px]">{LANDING.finalCta.heading}</h2>
          <p className="mt-3 text-base text-neutral-400">{LANDING.finalCta.sub}</p>
        </Reveal>
        <Reveal delay={100}>
          <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
            <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.045] px-3.5 py-1.5">
              <span style={display} className="text-sm text-[#7C93B3]">{chip.before}</span>
              <ArrowRight size={14} className="text-[#E24B4A]" />
              <span style={display} className="text-sm font-medium text-[#E24B4A]">{chip.after}</span>
            </span>
            <span className="inline-flex items-center rounded-full border border-white/10 bg-white/[0.045] px-3.5 py-1.5">
              <span style={display} className="text-sm font-medium text-[#E24B4A]">{"NPS " + String(nps.score)}</span>
            </span>
          </div>
        </Reveal>
        <Reveal delay={180}>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <EnrollButton />
            <PreviewButton />
          </div>
          <p className="mt-6 max-w-md text-sm text-neutral-500">{LANDING.finalCta.ps}</p>
        </Reveal>
      </Col>
      </section>
  );
}

// ---------- page ----------

export function LandingView() {
  return (
    <div className="overflow-x-clip bg-[#070304] font-[family-name:var(--font-body),ui-sans-serif,system-ui] text-white antialiased">
      <GrainOverlay />
      <Header />
      <main>
        <Hero />
        <Proof />
        <Brands />
        <Curriculum />
        <div className="relative isolate overflow-hidden border-y border-white/10 bg-[#050810]">
          <GridSpotlightBackground />
          <Included />
          <Explorer />
        </div>
        <Testimonials />
        <Assessment />
        <Bio />
        <PricingFaq />
        <Contact />
        <FinalCta />
      </main>
    </div>
  );
}
