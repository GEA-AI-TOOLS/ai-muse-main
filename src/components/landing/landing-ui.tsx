"use client";

// ============================================================
// Zero-dependency animation primitives for the landing page.
// Reveal: fade + rise on first scroll into view.
// Ticker: counts a number up on first view.
// Marquee: CSS-driven infinite scroll, pauses on hover.
// All respect prefers-reduced-motion.
// ============================================================

import { useEffect, useRef, useState, type ReactNode } from "react";

function prefersReducedMotion(): boolean {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

export function useInViewOnce<T extends HTMLElement>(threshold = 0.2) {
  const ref = useRef<T | null>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    if (prefersReducedMotion()) {
      setInView(true);
      return;
    }
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) {
          setInView(true);
          obs.disconnect();
        }
      },
      { threshold }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);

  return { ref, inView };
}

export function Reveal({
  children,
  delay = 0,
  className = "",
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
}) {
  const { ref, inView } = useInViewOnce<HTMLDivElement>();
  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: inView ? 1 : 0,
        transform: inView ? "none" : "translateY(14px)",
        transition:
          "opacity 0.65s cubic-bezier(0.22,1,0.36,1) " +
          String(delay) +
          "ms, transform 0.65s cubic-bezier(0.22,1,0.36,1) " +
          String(delay) +
          "ms",
      }}
    >
      {children}
    </div>
  );
}

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
  const { ref, inView } = useInViewOnce<HTMLSpanElement>(0.6);
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (!inView) return;
    if (prefersReducedMotion()) {
      setDisplay(value);
      return;
    }
    let raf = 0;
    const start = performance.now();
    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / duration);
      const eased = 1 - Math.pow(1 - t, 3);
      setDisplay(value * eased);
      if (t < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, value, duration]);

  return (
    <span ref={ref} className={className}>
      {prefix + display.toFixed(decimals) + suffix}
    </span>
  );
}

const GRAIN_SVG =
  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='120' height='120'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E";

export function GrainOverlay() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-30 opacity-[0.03] mix-blend-overlay"
      style={{ backgroundImage: "url(\"" + GRAIN_SVG + "\")" }}
    />
  );
}

export function Marquee({ children }: { children: ReactNode }) {
  return (
    <div className="group relative overflow-hidden">
      <style>{`
        @keyframes landing-marquee {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }
        .landing-marquee-track {
          animation: landing-marquee 32s linear infinite;
        }
        .group:hover .landing-marquee-track { animation-play-state: paused; }
        @media (prefers-reduced-motion: reduce) {
          .landing-marquee-track { animation: none; }
        }
      `}</style>
      <div className="landing-marquee-track flex w-max items-center">
        {children}
        {children}
      </div>
      <div className="pointer-events-none absolute inset-y-0 left-0 w-16 bg-gradient-to-r from-white to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-16 bg-gradient-to-l from-white to-transparent" />
    </div>
  );
}
