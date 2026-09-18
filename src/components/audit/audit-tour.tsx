"use client";

import { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { useRouter } from "next/navigation";
import { track } from "@vercel/analytics";
import { AUDIT_COPY } from "@/lib/audit-config";
import {
  TOUR_START_EVENT,
  consumeTourParam,
  markCompleted,
  markDismissed,
  markInvited,
  shouldInvite,
  type AuditTourId,
  type TourFinish,
  type TourStep,
} from "@/lib/audit-tour";

type ResolvedStep = TourStep & { target: string };
type Phase = "idle" | "invite" | "running";
type Box = { top: number; left: number; width: number; height: number; stickyBottom: number };

const INVITE_DELAY_MS = 1500;
const FORCED_START_DELAY_MS = 500;
const MOBILE_QUERY = "(max-width: 639px)";
const POPOVER_WIDTH = 320;
const GAP = 12;
const EDGE = 16;
const PAD = 6;
const MOBILE_SHEET_RESERVE = 0.42; // share of the screen kept free for the bottom sheet

function findTarget(name: string): HTMLElement | null {
  return document.querySelector<HTMLElement>('[data-tour="' + name + '"]');
}

/** Bottom edge of all sticky bars once they are stuck (audit bar, lesson nav). */
function stickyBottom(): number {
  let max = 0;
  document.querySelectorAll<HTMLElement>("[data-audit-sticky]").forEach((el) => {
    const top = parseFloat(getComputedStyle(el).top) || 0;
    max = Math.max(max, top + el.offsetHeight);
  });
  return max;
}

function reducedMotion(): boolean {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

function scrollToElement(el: HTMLElement) {
  const top = el.getBoundingClientRect().top + window.scrollY - stickyBottom() - GAP * 2;
  window.scrollTo({ top: Math.max(0, top), behavior: reducedMotion() ? "auto" : "smooth" });
}

function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = useState(false);
  useEffect(() => {
    const mql = window.matchMedia(query);
    const update = () => setMatches(mql.matches);
    update();
    mql.addEventListener("change", update);
    return () => mql.removeEventListener("change", update);
  }, [query]);
  return matches;
}

/** False on the first frame, true on the next. Drives the enter transition. */
function useEntered(key: string): boolean {
  const [entered, setEntered] = useState(false);
  useEffect(() => {
    setEntered(false);
    const raf = requestAnimationFrame(() => setEntered(true));
    return () => cancelAnimationFrame(raf);
  }, [key]);
  return entered;
}

function CloseIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M18 6 6 18M6 6l12 12" />
    </svg>
  );
}

export function AuditTour({
  id,
  steps,
  finish,
}: {
  id: AuditTourId;
  steps: TourStep[];
  finish: TourFinish;
}) {
  const router = useRouter();
  const isMobile = useMediaQuery(MOBILE_QUERY);

  const [mounted, setMounted] = useState(false);
  const [phase, setPhase] = useState<Phase>("idle");
  const [resolved, setResolved] = useState<ResolvedStep[]>([]);
  const [index, setIndex] = useState(0);
  const [box, setBox] = useState<Box | null>(null);
  const [popHeight, setPopHeight] = useState(190);

  const phaseRef = useRef<Phase>("idle");
  const stepsRef = useRef(steps);
  const forcedRef = useRef<"on" | "off" | null | undefined>(undefined);
  const popRef = useRef<HTMLDivElement>(null);
  const primaryRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    stepsRef.current = steps;
  }, [steps]);

  useEffect(() => {
    setMounted(true);
  }, []);

  const setPhaseSafe = useCallback((next: Phase) => {
    phaseRef.current = next;
    setPhase(next);
  }, []);

  const start = useCallback(
    (trigger: "invite" | "button" | "link") => {
      if (phaseRef.current === "running") return;
      const list: ResolvedStep[] = [];
      for (const step of stepsRef.current) {
        const target = step.targets.find((name) => findTarget(name) !== null);
        if (target) list.push({ ...step, target });
      }
      if (list.length === 0) {
        setPhaseSafe("idle");
        return;
      }
      markInvited(id);
      setResolved(list);
      setIndex(0);
      setBox(null);
      setPhaseSafe("running");
      track("audit_tour_started", { tour: id, trigger });
    },
    [id, setPhaseSafe]
  );

  // Auto-invite, or forced start from ?tour=1.
  useEffect(() => {
    if (forcedRef.current === undefined) forcedRef.current = consumeTourParam();
    const forced = forcedRef.current;
    if (forced === "off") return;

    if (forced === "on") {
      const t = window.setTimeout(() => start("link"), FORCED_START_DELAY_MS);
      return () => window.clearTimeout(t);
    }

    if (!shouldInvite(id)) return;
    const t = window.setTimeout(() => {
      if (phaseRef.current !== "idle") return;
      markInvited(id);
      setPhaseSafe("invite");
      track("audit_tour_invited", { tour: id });
    }, INVITE_DELAY_MS);
    return () => window.clearTimeout(t);
  }, [id, start, setPhaseSafe]);

  // "Tour" button in the audit bar.
  useEffect(() => {
    const onStart = () => start("button");
    window.addEventListener(TOUR_START_EVENT, onStart);
    return () => window.removeEventListener(TOUR_START_EVENT, onStart);
  }, [start]);

  const step = phase === "running" ? resolved[index] : undefined;
  const total = resolved.length;
  const isLast = index === total - 1;

  // Bring the target into view when the step changes.
  useEffect(() => {
    if (!step) return;
    const el = findTarget(step.target);
    if (!el) return;
    const r = el.getBoundingClientRect();
    const vh = window.innerHeight;
    const reserve = isMobile ? Math.round(vh * MOBILE_SHEET_RESERVE) : 0;
    const fits = r.top >= stickyBottom() + GAP && r.bottom <= vh - reserve - GAP;
    if (!fits) scrollToElement(el);
  }, [step, isMobile]);

  useEffect(() => {
    if (phase !== "running") return;
    track("audit_tour_step", { tour: id, step: index + 1 });
  }, [phase, index, id]);

  // Follow the target through scroll, resize, and layout changes.
  useEffect(() => {
    if (!step) return;
    let el = findTarget(step.target);
    let raf = 0;
    const measure = () => {
      if (!el || !el.isConnected) el = findTarget(step.target); // layout swapped (mobile/desktop)
      if (!el) {
        setBox(null);
        return;
      }
      const r = el.getBoundingClientRect();
      setBox({ top: r.top, left: r.left, width: r.width, height: r.height, stickyBottom: stickyBottom() });
    };
    const update = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(measure);
    };
    measure();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    const ro = typeof ResizeObserver !== "undefined" ? new ResizeObserver(update) : null;
    if (el && ro) ro.observe(el);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
      ro?.disconnect();
    };
  }, [step]);

  // Measure the popover so it can flip above the target when needed.
  useLayoutEffect(() => {
    const h = popRef.current?.offsetHeight;
    if (h && Math.abs(h - popHeight) > 1) setPopHeight(h);
  });

  // Keep keyboard focus on the tour's main button.
  useEffect(() => {
    if (phase === "running") primaryRef.current?.focus({ preventScroll: true });
  }, [phase, index]);

  const close = useCallback(() => {
    setPhaseSafe("idle");
    setBox(null);
  }, [setPhaseSafe]);

  const complete = useCallback(() => {
    markCompleted(id);
    track("audit_tour_completed", { tour: id });
    close();
    if ("href" in finish) {
      router.push(finish.href);
    } else {
      const el = findTarget(finish.scrollTo);
      if (el) scrollToElement(el);
    }
  }, [id, finish, close, router]);

  const skip = useCallback(() => {
    // Closing on the last step still counts as having seen the whole tour.
    if (index === total - 1) {
      markCompleted(id);
      track("audit_tour_completed", { tour: id });
    } else {
      markDismissed(id);
      track("audit_tour_skipped", { tour: id, step: index + 1 });
    }
    close();
  }, [id, index, total, close]);

  const next = useCallback(() => {
    if (index < total - 1) setIndex(index + 1);
    else complete();
  }, [index, total, complete]);

  const back = useCallback(() => {
    setIndex((i) => Math.max(0, i - 1));
  }, []);

  const dismissInvite = useCallback(() => {
    markDismissed(id);
    track("audit_tour_invite_dismissed", { tour: id });
    close();
  }, [id, close]);

  useEffect(() => {
    if (phase !== "running") return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        skip();
        return;
      }
      // Arrows only when focus is not inside something else (video player, inputs).
      const active = document.activeElement;
      const free = !active || active === document.body || popRef.current?.contains(active);
      if (!free) return;
      if (e.key === "ArrowRight") next();
      else if (e.key === "ArrowLeft") back();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [phase, skip, next, back]);

  const entered = useEntered(phase === "running" ? "run-" + String(index) : phase);

  if (!mounted || phase === "idle") return null;

  const enterClass =
    "transition duration-200 ease-out motion-reduce:transition-none " +
    (entered ? "translate-y-0 opacity-100" : "translate-y-2 opacity-0");

  // ---------- Invite ----------
  if (phase === "invite") {
    return createPortal(
      <div
        role="dialog"
        aria-labelledby="audit-tour-invite-title"
        className={
          "fixed z-[70] rounded-lg border bg-background p-4 shadow-xl " +
          (isMobile ? "inset-x-3 bottom-[max(0.75rem,env(safe-area-inset-bottom))] " : "bottom-6 right-6 w-80 ") +
          enterClass
        }
      >
        <div className="flex items-start justify-between gap-3">
          <div>
            <p id="audit-tour-invite-title" className="text-sm font-medium">
              {AUDIT_COPY.tourInviteTitle}
            </p>
            <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
              {AUDIT_COPY.tourInviteBody}
            </p>
          </div>
          <button
            type="button"
            onClick={dismissInvite}
            aria-label="Close"
            className="-mr-1 -mt-1 rounded p-1.5 text-muted-foreground hover:text-foreground"
          >
            <CloseIcon />
          </button>
        </div>
        <div className="mt-4 flex gap-2">
          <button
            type="button"
            onClick={() => start("invite")}
            className="min-h-10 flex-1 rounded-md bg-[#E24B4A] px-4 text-sm font-medium text-white hover:bg-[#c73f3e]"
          >
            {AUDIT_COPY.tourInviteStart}
          </button>
          <button
            type="button"
            onClick={dismissInvite}
            className="min-h-10 rounded-md border px-4 text-sm hover:bg-muted/50"
          >
            {AUDIT_COPY.tourInviteLater}
          </button>
        </div>
      </div>,
      document.body
    );
  }

  if (!step) return null;

  // ---------- Running ----------
  const vw = window.innerWidth;
  const vh = window.innerHeight;

  const spotlight = box ? (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed z-[60] rounded-[10px] ring-2 ring-[#E24B4A]"
      style={{
        top: box.top - PAD,
        left: box.left - PAD,
        width: box.width + PAD * 2,
        height: box.height + PAD * 2,
        boxShadow: "0 0 0 9999px rgba(0, 0, 0, 0.55)",
      }}
    />
  ) : (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 z-[60] bg-black/55" />
  );

  const dots = (
    <div className="flex items-center gap-1.5" aria-hidden="true">
      {resolved.map((_, i) => (
        <span
          key={i}
          className={
            "h-1.5 rounded-full transition-all motion-reduce:transition-none " +
            (i === index ? "w-4 bg-[#E24B4A]" : "w-1.5 bg-muted-foreground/30")
          }
        />
      ))}
    </div>
  );

  const counter = (
    <span className="text-xs text-muted-foreground">{String(index + 1) + " of " + String(total)}</span>
  );

  const buttons = (
    <div className="flex items-center gap-2">
      {index > 0 && (
        <button
          type="button"
          onClick={back}
          className={"rounded-md border px-3 text-sm hover:bg-muted/50 " + (isMobile ? "min-h-11" : "min-h-9")}
        >
          Back
        </button>
      )}
      <button
        ref={primaryRef}
        type="button"
        onClick={next}
        className={
          "rounded-md bg-[#E24B4A] px-4 text-sm font-medium text-white hover:bg-[#c73f3e] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#E24B4A] focus-visible:ring-offset-2 " +
          (isMobile ? "min-h-11 flex-1" : "min-h-9")
        }
      >
        {isLast ? finish.label : "Next"}
      </button>
    </div>
  );

  const closeButton = (
    <button
      type="button"
      onClick={skip}
      aria-label={isLast ? "Close tour" : "Skip tour"}
      className="-mr-1.5 rounded p-1.5 text-muted-foreground hover:text-foreground"
    >
      <CloseIcon />
    </button>
  );

  // Mobile: bottom sheet. Anchored popovers break on small screens.
  if (isMobile) {
    return createPortal(
      <>
        {spotlight}
        <div
          ref={popRef}
          role="dialog"
          aria-labelledby="audit-tour-title"
          aria-describedby="audit-tour-body"
          className={
            "fixed inset-x-0 bottom-0 z-[70] rounded-t-2xl border-t bg-background px-5 pt-4 shadow-2xl pb-[max(1.25rem,env(safe-area-inset-bottom))] " +
            enterClass
          }
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              {counter}
              {dots}
            </div>
            {closeButton}
          </div>
          <p id="audit-tour-title" className="mt-2 text-base font-medium">{step.title}</p>
          <p id="audit-tour-body" className="mt-1 text-sm leading-relaxed text-muted-foreground">{step.body}</p>
          <div className="mt-4 flex items-center gap-3">
            {!isLast && (
              <button type="button" onClick={skip} className="min-h-11 px-1 text-sm text-muted-foreground">
                Skip
              </button>
            )}
            <div className="flex-1">
              <div className="flex justify-end">{buttons}</div>
            </div>
          </div>
        </div>
      </>,
      document.body
    );
  }

  // Desktop: popover below the target, else above, else pinned to the bottom of the screen.
  let top: number;
  let left: number;
  if (box) {
    const below = box.top + box.height + PAD + GAP;
    const above = box.top - PAD - GAP - popHeight;
    if (below + popHeight <= vh - EDGE) top = below;
    else if (above >= box.stickyBottom + EDGE) top = above;
    else top = vh - popHeight - EDGE;
    left = Math.min(Math.max(box.left, EDGE), vw - POPOVER_WIDTH - EDGE);
  } else {
    top = Math.max(EDGE, (vh - popHeight) / 2);
    left = Math.max(EDGE, (vw - POPOVER_WIDTH) / 2);
  }

  return createPortal(
    <>
      {spotlight}
      <div
        ref={popRef}
        role="dialog"
        aria-labelledby="audit-tour-title"
        aria-describedby="audit-tour-body"
        className={"fixed z-[70] rounded-lg border bg-background p-4 shadow-2xl " + enterClass}
        style={{ top, left, width: POPOVER_WIDTH }}
      >
        <div className="flex items-center justify-between">
          {counter}
          {closeButton}
        </div>
        <p id="audit-tour-title" className="mt-1 text-base font-medium">{step.title}</p>
        <p id="audit-tour-body" className="mt-1 text-sm leading-relaxed text-muted-foreground">{step.body}</p>
        <div className="mt-4 flex items-center justify-between gap-3">
          {dots}
          {buttons}
        </div>
      </div>
    </>,
    document.body
  );
}