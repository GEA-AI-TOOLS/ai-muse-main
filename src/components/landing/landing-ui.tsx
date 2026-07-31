"use client";

// ============================================================
// Landing UI primitives v4.
// Changes in this version:
// - DragMarquee: true infinite band. Content is tripled inside a
//   hidden scroll container, auto-scrolls right to left, and arrow
//   clicks smoothly center the next or previous card.
// - Full-bleed background components: DotBackground,
//   GridSpotlightBackground, BlobBackground, WaveBackground.
//   Drop inside a `relative isolate overflow-hidden` section,
//   before the constrained content column.
// - useSafeReducedMotion: hydration-safe reduced-motion hook.
// Mechanic credits: DragMarquee follows the motion.dev infinite
// marquee pattern; Spotlight and the grid cursor reveal are the
// Kokonut/Aceternity spotlight mechanics rebuilt for a dark cinematic landing page.
// ============================================================

import { Children, useEffect, useRef, useState, type ReactNode, type PointerEvent } from "react";
import dynamic from "next/dynamic";
import {
  motion,
  useInView,
  useReducedMotion,
} from "motion/react";
import Grainient from "./grainient";
import SoftAurora from "./soft-aurora";
import SideRays from "./side-rays";

// Silk is a WebGL/three.js canvas: nothing can render for it during SSR or
// before the (heavy) three.js bundle loads and the shader compiles, which is
// exactly the 1-3s gap that showed a flat, static reddish background instead
// of the hero. Loading it as a client-only dynamic import with a CSS-only
// fallback that already looks like a frozen frame of the shader means there
// is no visible "pop" moment: the placeholder already reads as the hero, and
// the real canvas just starts moving once it's ready.
// ---------- hydration-safe reduced motion ----------

export function useSafeReducedMotion(): boolean {
  const real = useReducedMotion();
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    const id = requestAnimationFrame(() => setMounted(true));
    return () => cancelAnimationFrame(id);
  }, []);
  return mounted ? !!real : false;
}

// ---------- Badge (small pill label, 5 prior ad-hoc call sites consolidated) ----------

const BADGE_TONE = {
  neutral: "bg-white/[0.08] text-neutral-500",
  "accent-solid": "bg-[#C73F3E] text-white",
  "accent-tint": "bg-[#E24B4A]/12 text-[#ff8a82]",
  "accent-outline": "border border-[#E24B4A]/35 bg-white/[0.055] text-[#ff8a82]",
} as const;

const BADGE_SIZE = {
  sm: "px-2 py-0.5",
  md: "px-2.5 py-1",
} as const;

export function Badge({
  children,
  tone = "neutral",
  size = "md",
  className = "",
}: {
  children: ReactNode;
  tone?: keyof typeof BADGE_TONE;
  size?: keyof typeof BADGE_SIZE;
  className?: string;
}) {
  return (
    <span
      className={
        "inline-flex shrink-0 items-center rounded-full text-[11px] font-medium " +
        BADGE_SIZE[size] + " " + BADGE_TONE[tone] + " " + className
      }
    >
      {children}
    </span>
  );
}

// ---------- Reveal ----------

export function Reveal({
  children,
  delay = 0,
  className = "",
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
}) {
  const reduce = useSafeReducedMotion();
  return (
    <motion.div
      className={className}
      initial={reduce ? false : { opacity: 0, y: 14 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: delay / 1000 }}
    >
      {children}
    </motion.div>
  );
}

// ---------- Ticker ----------

export function Ticker({
  value,
  prefix = "",
  suffix = "",
  decimals = 0,
  duration = 1400,
  className = "",
}: {
  value: number;
  prefix?: string;
  suffix?: string;
  decimals?: number;
  duration?: number;
  className?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.6 });
  const reduce = useSafeReducedMotion();
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (!inView) return;
    if (reduce) {
      const id = requestAnimationFrame(() => setDisplay(value));
      return () => cancelAnimationFrame(id);
    }
    let raf = 0;
    const start = performance.now();
    const tick = (now: number) => {
      const p = Math.min(1, (now - start) / duration);
      const eased = 1 - Math.pow(1 - p, 3);
      setDisplay(value * eased);
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => {
      cancelAnimationFrame(raf);
    };
  }, [inView, value, duration, reduce]);

  return (
    <span ref={ref} className={className}>
      {prefix + display.toLocaleString("en-US", { maximumFractionDigits: decimals, minimumFractionDigits: decimals }) + suffix}
    </span>
  );
}

// ---------- Marquee (brands: auto, pause on hover) ----------

export function Marquee({ children }: { children: ReactNode }) {
  return (
    <div className="landing-mq group relative overflow-hidden">
      <style>{`
        @keyframes landing-marquee {
          from { transform: translateX(0); }
          to { transform: translateX(-33.333333%); }
        }
        .landing-mq-track { animation: landing-marquee 34s linear infinite; }
        .landing-mq:hover .landing-mq-track { animation-play-state: paused; }
      `}</style>
      <div className="landing-mq-track flex w-max items-center">
        <div className="flex items-center">{children}</div>
        <div className="flex items-center" aria-hidden="true">{children}</div>
        <div className="flex items-center" aria-hidden="true">{children}</div>
      </div>
      <div className="pointer-events-none absolute inset-y-0 left-0 w-16 bg-gradient-to-r from-[#070304] to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-16 bg-gradient-to-l from-[#070304] to-transparent" />
    </div>
  );
}

// ---------- DragMarquee (testimonials: infinite band) ----------

export function DragMarquee({
  children,
  speed = 0.45,
  arrows = false,
}: {
  children: ReactNode;
  speed?: number;
  arrows?: boolean;
}) {
  const items = Children.toArray(children);
  const viewportRef = useRef<HTMLDivElement | null>(null);
  const trackRef = useRef<HTMLDivElement | null>(null);
  const paused = useRef(false);
  const animating = useRef(false);
  const copyWidth = useRef(0);

  useEffect(() => {
    const viewport = viewportRef.current;
    const track = trackRef.current;
    if (!viewport || !track) return;

    const measure = () => {
      copyWidth.current = track.scrollWidth / 3;
      if (viewport.scrollLeft < 1) viewport.scrollLeft = copyWidth.current;
    };

    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(track);

    let raf = 0;
    const tick = () => {
      if (!paused.current && !animating.current && copyWidth.current > 0) {
        viewport.scrollLeft += speed;
        if (viewport.scrollLeft >= copyWidth.current * 2) {
          viewport.scrollLeft -= copyWidth.current;
        } else if (viewport.scrollLeft <= 0) {
          viewport.scrollLeft += copyWidth.current;
        }
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
    };
  }, [speed]);

  function snap(dir: 1 | -1) {
    const viewport = viewportRef.current;
    const track = trackRef.current;
    if (!viewport || !track) return;

    const cards = Array.from(track.children) as HTMLElement[];
    if (cards.length === 0) return;

    const viewportCenter = viewport.scrollLeft + viewport.clientWidth / 2;
    const currentIndex = cards.reduce((best, card, i) => {
      const center = card.offsetLeft + card.offsetWidth / 2;
      const bestCard = cards[best];
      const bestCenter = bestCard.offsetLeft + bestCard.offsetWidth / 2;
      return Math.abs(center - viewportCenter) < Math.abs(bestCenter - viewportCenter) ? i : best;
    }, 0);
    const target = cards[currentIndex + dir] ?? cards[dir > 0 ? cards.length - 1 : 0];
    const nextLeft = target.offsetLeft + target.offsetWidth / 2 - viewport.clientWidth / 2;

    paused.current = true;
    animating.current = true;
    viewport.scrollTo({ left: nextLeft, behavior: "smooth" });
    window.setTimeout(() => {
      if (copyWidth.current > 0) {
        if (viewport.scrollLeft >= copyWidth.current * 2) viewport.scrollLeft -= copyWidth.current;
        if (viewport.scrollLeft <= 0) viewport.scrollLeft += copyWidth.current;
      }
      animating.current = false;
      paused.current = false;
    }, 520);
  }

  return (
    <div
      className="relative"
      onMouseEnter={() => {
        paused.current = true;
      }}
      onMouseLeave={() => {
        paused.current = false;
      }}
      onTouchStart={() => {
        paused.current = true;
      }}
      onTouchEnd={() => {
        paused.current = false;
      }}
    >
      <style>{`
        .landing-drag-scroll {
          scrollbar-width: none;
        }
        .landing-drag-scroll::-webkit-scrollbar {
          display: none;
        }
      `}</style>
      <div className="relative overflow-hidden">
        <div ref={viewportRef} className="landing-drag-scroll overflow-x-auto">
          <div ref={trackRef} className="flex w-max gap-4 pr-4">
            {[0, 1, 2].flatMap((copy) =>
              items.map((item, i) => (
                <div key={String(copy) + "-" + String(i)} className="shrink-0">
                  {item}
                </div>
              ))
            )}
          </div>
        </div>
        <div className="pointer-events-none absolute inset-y-0 left-0 w-12 bg-gradient-to-r from-[#070304] to-transparent" />
        <div className="pointer-events-none absolute inset-y-0 right-0 w-12 bg-gradient-to-l from-[#070304] to-transparent" />
      </div>
      {arrows && (
        <div className="mx-auto mt-5 flex max-w-6xl justify-center gap-3 px-5 sm:px-8">
          <button
            type="button"
            onClick={() => snap(-1)}
            aria-label="Previous testimonials"
            className="flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-white/[0.04] text-neutral-300 transition-all hover:border-[#E24B4A]/60 hover:bg-[#E24B4A]/10 hover:text-white active:scale-95"
          >
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6" /></svg>
          </button>
          <button
            type="button"
            onClick={() => snap(1)}
            aria-label="Next testimonials"
            className="flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-white/[0.04] text-neutral-300 transition-all hover:border-[#E24B4A]/60 hover:bg-[#E24B4A]/10 hover:text-white active:scale-95"
          >
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6" /></svg>
          </button>
        </div>
      )}
    </div>
  );
}

// ---------- Spotlight (cursor-follow glow inside a card) ----------

export function Spotlight({ children, className = "" }: { children: ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [pos, setPos] = useState<{ x: number; y: number } | null>(null);
  const reduce = useSafeReducedMotion();

  function onMove(e: PointerEvent<HTMLDivElement>) {
    if (reduce || e.pointerType !== "mouse") return;
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    setPos({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  }

  return (
    <div
      ref={ref}
      className={"relative " + className}
      onPointerMove={onMove}
      onPointerLeave={() => setPos(null)}
    >
      {pos && (
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 transition-opacity duration-300"
          style={{
            background:
              "radial-gradient(220px circle at " +
              String(pos.x) +
              "px " +
              String(pos.y) +
              "px, rgba(226,75,74,0.24), transparent 70%)",
          }}
        />
      )}
      {children}
    </div>
  );
}

// ---------- Full-bleed backgrounds ----------

export function DotBackground({ fade = true, dotOpacity = 0.11 }: { fade?: boolean; dotOpacity?: number }) {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 -z-10"
      style={{
        backgroundImage: "radial-gradient(rgba(255,255,255," + dotOpacity + ") 1px, transparent 1px)",
        backgroundSize: "22px 22px",
        maskImage: fade ? "radial-gradient(ellipse 80% 60% at 50% 40%, black, transparent)" : undefined,
        WebkitMaskImage: fade ? "radial-gradient(ellipse 80% 60% at 50% 40%, black, transparent)" : undefined,
      }}
    />
  );
}

export function GridSpotlightBackground({
  gridColor = "255,255,255",
  gridOpacity = 0.055,
  spotlightColor = "226,75,74",
  spotlightOpacity = 0.5,
}: {
  gridColor?: string;
  gridOpacity?: number;
  spotlightColor?: string;
  spotlightOpacity?: number;
} = {}) {
  const ref = useRef<HTMLDivElement>(null);
  const [pos, setPos] = useState<{ x: number; y: number } | null>(null);
  const reduce = useSafeReducedMotion();

  useEffect(() => {
    const el = ref.current;
    if (!el || reduce) return;
    const onMove = (e: MouseEvent) => {
      const r = el.getBoundingClientRect();
      setPos({ x: e.clientX - r.left, y: e.clientY - r.top });
    };
    const onLeave = () => setPos(null);
    // listen on the parent section so cards do not block the effect
    const parent = el.parentElement ?? el;
    parent.addEventListener("mousemove", onMove);
    parent.addEventListener("mouseleave", onLeave);
    return () => {
      parent.removeEventListener("mousemove", onMove);
      parent.removeEventListener("mouseleave", onLeave);
    };
  }, [reduce]);

  const gridImg =
    "linear-gradient(to right, rgba(" + gridColor + "," + String(gridOpacity) + ") 1px, transparent 1px)," +
    "linear-gradient(to bottom, rgba(" + gridColor + "," + String(gridOpacity) + ") 1px, transparent 1px)";

  return (
    <div ref={ref} aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
      <div className="absolute inset-0" style={{ backgroundImage: gridImg, backgroundSize: "40px 40px" }} />
      {pos && (
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              "linear-gradient(to right, rgba(" + spotlightColor + "," + String(spotlightOpacity) + ") 1px, transparent 1px)," +
              "linear-gradient(to bottom, rgba(" + spotlightColor + "," + String(spotlightOpacity) + ") 1px, transparent 1px)",
            backgroundSize: "40px 40px",
            maskImage: "radial-gradient(200px circle at " + String(pos.x) + "px " + String(pos.y) + "px, black, transparent 70%)",
            WebkitMaskImage: "radial-gradient(200px circle at " + String(pos.x) + "px " + String(pos.y) + "px, black, transparent 70%)",
          }}
        />
      )}
    </div>
  );
}

const BLOB_RED: [string, string, string] = [
  "rgba(226,75,74,0.24)",
  "rgba(226,75,74,0.18)",
  "rgba(255,70,70,0.14)",
];

export function BlobBackground({
  opacity = 1,
  colors = BLOB_RED,
}: {
  opacity?: number;
  colors?: [string, string, string];
}) {
  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10 overflow-hidden" style={{ opacity }}>
      <style>{`
        @keyframes blob-a { 0%,100% { transform: translate(0,0) scale(1); } 50% { transform: translate(60px,-40px) scale(1.15); } }
        @keyframes blob-b { 0%,100% { transform: translate(0,0) scale(1); } 50% { transform: translate(-50px,50px) scale(1.1); } }
        @keyframes blob-c { 0%,100% { transform: translate(0,0) scale(1); } 50% { transform: translate(40px,60px) scale(0.9); } }
        .blob-a { animation: blob-a 18s ease-in-out infinite; }
        .blob-b { animation: blob-b 22s ease-in-out infinite; }
        .blob-c { animation: blob-c 26s ease-in-out infinite; }
        @media (prefers-reduced-motion: reduce) { .blob-a,.blob-b,.blob-c { animation: none; } }
      `}</style>
      <div className="blob-a absolute -left-20 top-10 h-72 w-72 rounded-full blur-3xl" style={{ background: "radial-gradient(circle, " + colors[0] + ", transparent 70%)" }} />
      <div className="blob-b absolute right-0 top-40 h-80 w-80 rounded-full blur-3xl" style={{ background: "radial-gradient(circle, " + colors[1] + ", transparent 70%)" }} />
      <div className="blob-c absolute bottom-0 left-1/3 h-64 w-64 rounded-full blur-3xl" style={{ background: "radial-gradient(circle, " + colors[2] + ", transparent 70%)" }} />
    </div>
  );
}

export function HeroBackground() {
  // GridSpotlightBackground tracks the mouse via its own parentElement, so it
  // is rendered here as a Fragment child (not wrapped in another div) to land
  // as a direct child of the <section>, matching how it's used lower on the
  // page (Included/Explorer, Contact) so the hover spotlight actually tracks.
  // Silk kept available (see silk.tsx), just not rendered here anymore: swapped
  // for the same checkbox-grid + red spotlight used lower on the page.
  // Base tint shifted to a dark blue (vs. the site's near-black/red base) and
  // the grid lines brightened to red, both user-directed for hero contrast:
  // a deliberate, scoped exception, same pattern as PricingRaysBackground's.
  return (
    <>
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10 overflow-hidden bg-[#070B1C]" />
      <GridSpotlightBackground gridColor="226,75,74" gridOpacity={0.22} spotlightOpacity={0.75} />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 overflow-hidden"
        style={{
          background:
            "radial-gradient(900px circle at 50% 24%, rgba(255,110,90,0.18), transparent 60%)," +
            "linear-gradient(to bottom, rgba(7,11,28,0.4), rgba(7,11,28,0.16) 32%, rgba(7,11,28,0.42) 68%, rgba(7,11,28,0.82))",
        }}
      />
    </>
  );
}

// PricingFaq's background. Gold/blue rays are a confirmed, deliberate
// exception to the red-only palette (user-directed): the component's own
// defaults, reverted to exactly, not the system's reds.
export function PricingRaysBackground() {
  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10 overflow-hidden bg-[#050203]">
      <SideRays
        speed={2.5}
        rayColor1="#EAB308"
        rayColor2="#96c8ff"
        intensity={2}
        spread={2}
        origin="top-right"
        tilt={0}
        saturation={1.5}
        blend={0.75}
        falloff={1.6}
        opacity={1.0}
      />
    </div>
  );
}

export function LiquidSignalBackground() {
  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10 overflow-hidden bg-[linear-gradient(135deg,#070304_0%,#130608_46%,#0b0405_100%)]">
      <style>{`
        @keyframes signal-drift-a { 0%,100% { transform: translate3d(0,0,0) rotate(-7deg); } 50% { transform: translate3d(42px,-28px,0) rotate(-3deg); } }
        @keyframes signal-drift-b { 0%,100% { transform: translate3d(0,0,0) rotate(9deg); } 50% { transform: translate3d(-34px,30px,0) rotate(5deg); } }
        @keyframes signal-scan { 0% { transform: translateX(-34%); } 100% { transform: translateX(34%); } }
        @keyframes signal-sheet { 0%,100% { transform: translate3d(-2%,0,0) skewX(-10deg); opacity: 0.34; } 50% { transform: translate3d(3%,-2%,0) skewX(-7deg); opacity: 0.52; } }
        .signal-drift-a { animation: signal-drift-a 20s ease-in-out infinite; }
        .signal-drift-b { animation: signal-drift-b 24s ease-in-out infinite; }
        .signal-scan { animation: signal-scan 18s linear infinite alternate; }
        .signal-sheet { animation: signal-sheet 16s ease-in-out infinite; }
        @media (prefers-reduced-motion: reduce) {
          .signal-drift-a,.signal-drift-b,.signal-scan,.signal-sheet { animation: none; }
        }
      `}</style>
      <div
        className="signal-drift-a absolute -left-32 top-10 h-[420px] w-[640px] rounded-[48px] blur-3xl"
        style={{ background: "radial-gradient(circle at 35% 40%, rgba(226,75,74,0.22), transparent 68%)" }}
      />
      <div
        className="signal-drift-b absolute -right-28 bottom-6 h-[460px] w-[620px] rounded-[48px] blur-3xl"
        style={{ background: "radial-gradient(circle at 55% 45%, rgba(240,149,149,0.24), transparent 70%)" }}
      />
      <div
        className="signal-sheet absolute left-1/2 top-1/2 h-[150%] w-[72%] -translate-x-1/2 -translate-y-1/2 rounded-[64px] border border-white/10 bg-white/[0.05] backdrop-blur-sm"
        style={{ boxShadow: "inset 0 0 80px rgba(226,75,74,0.08)" }}
      />
      <div
        className="absolute inset-0 opacity-[0.18]"
        style={{
          backgroundImage:
            "linear-gradient(115deg, transparent 0 42%, rgba(226,75,74,0.32) 42.2%, transparent 42.8% 100%)," +
            "linear-gradient(115deg, transparent 0 58%, rgba(255,255,255,0.08) 58.15%, transparent 58.7% 100%)",
          backgroundSize: "260px 260px, 340px 340px",
        }}
      />
      <div
        className="signal-scan absolute inset-y-0 left-1/2 w-[55%] -translate-x-1/2 opacity-60"
        style={{
          background:
            "linear-gradient(90deg, transparent, rgba(255,255,255,0.16), rgba(226,75,74,0.18), transparent)",
          filter: "blur(18px)",
        }}
      />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_35%,rgba(226,75,74,0.10),transparent_36%),linear-gradient(to_bottom,rgba(5,2,3,0.18),rgba(5,2,3,0.08))]" />
    </div>
  );
}

export function WaveBackground() {
  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10 overflow-hidden bg-[#050203]">
      <SoftAurora />
      <div
        className="absolute inset-0"
        style={{
          background: "linear-gradient(to bottom, rgba(5,2,3,0.30), rgba(5,2,3,0.85))",
        }}
      />
    </div>
  );
}



export function DarkVeilBackground() {
  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10 overflow-hidden bg-[#050203]">
      <style>{`
        @keyframes dark-veil-drift { 0%,100% { transform: translate3d(-2%,0,0) scale(1); } 50% { transform: translate3d(2%,-2%,0) scale(1.08); } }
        @keyframes dark-veil-scan { from { transform: translateY(-20%); } to { transform: translateY(20%); } }
        .dark-veil-drift { animation: dark-veil-drift 20s ease-in-out infinite; }
        .dark-veil-scan { animation: dark-veil-scan 9s linear infinite alternate; }
        @media (prefers-reduced-motion: reduce) { .dark-veil-drift,.dark-veil-scan { animation: none; } }
      `}</style>
      <div className="dark-veil-drift absolute -left-20 top-[-18%] h-[70%] w-[62%] rounded-full blur-3xl" style={{ background: "radial-gradient(circle at 45% 50%, rgba(226,75,74,0.32), transparent 68%)" }} />
      <div className="dark-veil-drift absolute -right-24 bottom-[-24%] h-[76%] w-[64%] rounded-full blur-3xl" style={{ background: "radial-gradient(circle at 55% 45%, rgba(106,16,23,0.38), transparent 70%)", animationDelay: "-7s" }} />
      <div className="dark-veil-scan absolute inset-x-[-8%] top-0 h-[130%] rotate-[-8deg] opacity-35" style={{ background: "repeating-linear-gradient(to bottom, transparent 0 18px, rgba(255,255,255,0.045) 19px, transparent 21px)" }} />
      <div className="absolute inset-0" style={{ background: "radial-gradient(900px circle at 50% 48%, rgba(226,75,74,0.16), transparent 64%), linear-gradient(to bottom, rgba(5,2,3,0.18), rgba(5,2,3,0.88))" }} />
    </div>
  );
}
// ---------- Waveform audio player (Bryan hello) ----------

const WAVE_BARS = [
  5, 9, 14, 10, 17, 12, 20, 15, 11, 18, 13, 8, 16, 20, 14, 10, 17, 12, 19, 15,
  9, 14, 18, 11, 16, 12, 8, 15, 19, 13, 10, 16, 12, 17, 9, 14, 11, 7, 12, 8,
];

export function Waveform({ src, label, duration }: { src: string; label: string; duration: string }) {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [playing, setPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const disabled = !src;
  const reduce = useSafeReducedMotion();

  useEffect(() => {
    if (!src) return;
    const audio = new Audio(src);
    audio.preload = "none";
    audioRef.current = audio;
    const onTime = () => {
      if (audio.duration > 0) setProgress(audio.currentTime / audio.duration);
    };
    const onEnd = () => {
      setPlaying(false);
      setProgress(0);
    };
    audio.addEventListener("timeupdate", onTime);
    audio.addEventListener("ended", onEnd);
    return () => {
      audio.pause();
      audio.removeEventListener("timeupdate", onTime);
      audio.removeEventListener("ended", onEnd);
      audioRef.current = null;
    };
  }, [src]);

  function toggle() {
    const audio = audioRef.current;
    if (!audio) return;
    if (playing) {
      audio.pause();
      setPlaying(false);
    } else {
      void audio.play();
      setPlaying(true);
    }
  }

  const activeBars = Math.round(progress * WAVE_BARS.length);

  return (
    <div className="flex items-center gap-4 rounded-xl border border-white/10 bg-white/[0.045] px-4 py-3.5 shadow-[0_20px_70px_rgba(0,0,0,0.35)] backdrop-blur-xl">
      <button
        onClick={toggle}
        disabled={disabled}
        aria-label={playing ? "Pause" : "Play " + label}
        className={
          "flex h-10 w-10 shrink-0 items-center justify-center rounded-full transition-all active:scale-95 " +
          (disabled
            ? "cursor-not-allowed bg-white/5 text-neutral-600"
            : "bg-[#E24B4A] text-white shadow-[0_0_30px_rgba(226,75,74,0.26)] hover:bg-[#ff5a56]")
        }
      >
        {playing ? (
          <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor"><rect x="6" y="5" width="4" height="14" rx="1" /><rect x="14" y="5" width="4" height="14" rx="1" /></svg>
        ) : (
          <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor" className="ml-0.5"><path d="M8 5v14l11-7z" /></svg>
        )}
      </button>
      <div className="flex h-8 flex-1 items-center gap-[3px]" aria-hidden="true">
        {WAVE_BARS.map((h, i) => (
          <span
            key={i}
            className="w-[3px] rounded-full"
            style={{
              height: String(h + (playing && !reduce && i % 3 === 0 ? 3 : 0)) + "px",
              backgroundColor: i < activeBars ? "#E24B4A" : disabled ? "#27272A" : "#57534E",
              transition: reduce ? "none" : "height 0.25s ease, background-color 0.15s",
            }}
          />
        ))}
      </div>
      <div className="shrink-0 text-right">
        <p className="text-xs font-medium text-white">{label}</p>
        <p className="text-[11px] text-neutral-400">{disabled ? "Audio coming soon" : duration}</p>
      </div>
    </div>
  );
}

// ---------- Grain overlay ----------

export function GrainOverlay() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-50 opacity-[0.055] mix-blend-screen"
      style={{
        backgroundImage:
          "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
        backgroundSize: "256px 256px",
      }}
    />
  );
}
