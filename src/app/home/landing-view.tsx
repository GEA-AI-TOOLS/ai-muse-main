"use client";

import { useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { LANDING, ASSESSMENT_PROMPTS, type AssessmentModel } from "@/lib/landing-config";
import { Reveal, Ticker, Marquee, GrainOverlay } from "@/components/landing/landing-ui";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

const RED = "#E24B4A";
const display = { fontFamily: "var(--font-display), Georgia, serif" };

// ---------- shared bits ----------

function EnrollButton({ small = false }: { small?: boolean }) {
  return (
    <a
      href={LANDING.enrollHref}
      className={
        "inline-flex items-center justify-center rounded-md bg-[#E24B4A] font-medium text-white transition-colors hover:bg-[#c73f3e] " +
        (small ? "px-4 py-2 text-sm" : "px-6 py-3 text-sm")
      }
    >
      Enroll
    </a>
  );
}

function PreviewButton({ small = false }: { small?: boolean }) {
  return (
    <a
      href={LANDING.auditHref}
      className={
        "inline-flex items-center justify-center gap-1.5 rounded-md border border-neutral-300 font-medium text-neutral-900 transition-colors hover:bg-neutral-50 " +
        (small ? "px-4 py-2 text-sm" : "px-6 py-3 text-sm")
      }
    >
      Preview Day 1 free
    </a>
  );
}

function SectionHeading({ children }: { children: React.ReactNode }) {
  return (
    <h2 style={display} className="text-[28px] leading-tight text-neutral-900 sm:text-[34px]">
      {children}
    </h2>
  );
}

// ---------- header ----------

function Header() {
  return (
    <header className="sticky top-0 z-40 border-b border-neutral-200/70 bg-white/85 backdrop-blur">
      <div className="mx-auto flex max-w-5xl items-center justify-between px-5 py-3 sm:px-8">
        <a href="#top" className="flex items-center gap-2">
          <img src="/assets/site-icon.png" alt="" className="h-7 w-7 rounded object-contain" />
          <span className="text-sm font-medium text-neutral-900">{LANDING.header.brand}</span>
        </a>
        <nav className="hidden items-center gap-6 md:flex">
          {LANDING.header.nav.map((item) => (
            <a key={item.href} href={item.href} className="text-sm text-neutral-500 transition-colors hover:text-neutral-900">
              {item.label}
            </a>
          ))}
        </nav>
        <div className="flex items-center gap-2">
          <a href={LANDING.auditHref} className="hidden rounded-md border border-neutral-300 px-3.5 py-1.5 text-sm text-neutral-900 hover:bg-neutral-50 sm:inline-flex">
            Preview
          </a>
          <EnrollButton small />
        </div>
      </div>
    </header>
  );
}

// ---------- hero ----------

function HeroBackground() {
  const ref = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [0, reduceMotion ? 0 : 40]);

  return (
    <div ref={ref} aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
      <motion.div style={{ y }} className="absolute inset-0">
        <div
          className="absolute -left-24 -top-24 h-[420px] w-[420px] rounded-full blur-3xl"
          style={{ background: "radial-gradient(circle, rgba(226,75,74,0.10), transparent 65%)" }}
        />
        <div
          className="absolute -right-16 top-32 h-[360px] w-[360px] rounded-full blur-3xl"
          style={{ background: "radial-gradient(circle, rgba(226,75,74,0.08), transparent 65%)" }}
        />
      </motion.div>
      <div
        className="absolute inset-0 opacity-[0.05]"
        style={{
          backgroundImage: "radial-gradient(#171514 1px, transparent 1px)",
          backgroundSize: "22px 22px",
          maskImage: "linear-gradient(to bottom, black, transparent)",
          WebkitMaskImage: "linear-gradient(to bottom, black, transparent)",
        }}
      />
    </div>
  );
}

function Hero() {
  const parts = LANDING.hero.headline.split("*");
  return (
    <section id="top" className="relative mx-auto max-w-5xl px-5 pb-16 pt-16 sm:px-8 sm:pb-24 sm:pt-24">
      <HeroBackground />
      <Reveal>
        <p className="mb-4 text-xs font-medium uppercase tracking-[0.14em] text-neutral-500">{LANDING.hero.eyebrow}</p>
      </Reveal>
      <Reveal delay={80}>
        <h1 style={display} className="max-w-3xl text-[40px] leading-[1.08] text-neutral-900 sm:text-[58px]">
          {parts.map((part, i) =>
            i % 2 === 1 ? (
              <span key={i} className="relative whitespace-nowrap">
                {part}
                <span aria-hidden="true" className="absolute -bottom-1 left-0 h-[3px] w-full rounded-full bg-[#E24B4A]" />
              </span>
            ) : (
              <span key={i}>{part}</span>
            )
          )}
        </h1>
      </Reveal>
      <Reveal delay={160}>
        <p className="mt-6 max-w-xl text-base leading-relaxed text-neutral-600">{LANDING.hero.sub}</p>
      </Reveal>
      <Reveal delay={240}>
        <div className="mt-8 flex flex-wrap items-center gap-3">
          <EnrollButton />
          <PreviewButton />
        </div>
        <p className="mt-5 text-sm text-neutral-500">{LANDING.hero.trust}</p>
      </Reveal>
    </section>
  );
}

// ---------- stats ----------

function Stats() {
  return (
    <section className="border-y border-neutral-200 bg-neutral-50/60">
      <div className="mx-auto grid max-w-5xl grid-cols-1 gap-8 px-5 py-12 sm:grid-cols-3 sm:px-8">
        {LANDING.stats.map((s, i) => (
          <Reveal key={i} delay={i * 100}>
            <div>
              <p style={display} className="text-[34px] leading-none text-[#E24B4A]">
                <Ticker value={s.value} prefix={s.prefix ?? ""} suffix={s.suffix ?? ""} decimals={s.decimals ?? 0} />
              </p>
              <p className="mt-2 text-sm leading-relaxed text-neutral-700">{s.label}</p>
              {s.sub && <p className="mt-1 text-xs text-neutral-400">{s.sub}</p>}
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

// ---------- brands ----------

function Brands() {
  return (
    <section className="mx-auto max-w-5xl px-5 py-12 sm:px-8">
      <p className="mb-6 text-center text-xs font-medium uppercase tracking-[0.14em] text-neutral-400">Trusted by leaders at</p>
      <Marquee>
        {LANDING.brands.map((name, i) => (
          <span key={i} className="mx-8 whitespace-nowrap text-lg font-medium text-neutral-300">
            {name}
          </span>
        ))}
      </Marquee>
    </section>
  );
}

// ---------- the shift (signature toggle) ----------

function Shift() {
  const [steering, setSteering] = useState(false);
  const active = steering ? LANDING.shift.after : LANDING.shift.before;
  const reduceMotion = useReducedMotion();
  return (
    <section id="shift" className="mx-auto max-w-5xl px-5 py-16 sm:px-8 sm:py-24">
      <Reveal>
        <SectionHeading>{LANDING.shift.heading}</SectionHeading>
      </Reveal>
      <Reveal delay={100}>
        <div className="mt-8 rounded-xl border border-neutral-200 bg-gradient-to-br from-white to-neutral-50/60 p-6 shadow-[0_1px_2px_rgba(0,0,0,0.04)] sm:p-8">
          <style>{`
            .landing-fade { animation: landing-fade-in 0.35s ease both; }
            @keyframes landing-fade-in { from { opacity: 0; transform: translateY(6px); } to { opacity: 1; transform: none; } }
            @media (prefers-reduced-motion: reduce) { .landing-fade { animation: none; } }
          `}</style>
          <div className="mb-6 inline-flex rounded-lg bg-neutral-100 p-1" role="tablist" aria-label="Asking vs steering">
            {[LANDING.shift.before.tab, LANDING.shift.after.tab].map((tab, i) => {
              const isActive = (i === 1) === steering;
              return (
                <button
                  key={tab}
                  role="tab"
                  aria-selected={isActive}
                  onClick={() => setSteering(i === 1)}
                  className={
                    "rounded-md px-4 py-2 text-sm font-medium transition-all " +
                    (isActive ? "bg-white text-neutral-900 shadow-sm" : "text-neutral-500 hover:text-neutral-700")
                  }
                >
                  {tab}
                </button>
              );
            })}
          </div>
          <div className="relative min-h-[130px]">
            {reduceMotion ? (
              <div key={steering ? "after" : "before"}>
                {active.lines.map((line, i) => (
                  <p
                    key={i}
                    className={
                      "text-[17px] leading-relaxed " +
                      (steering && i === 1 ? "font-medium text-[#A32D2D]" : "text-neutral-700") +
                      (i > 0 ? " mt-3" : "")
                    }
                  >
                    {line}
                  </p>
                ))}
              </div>
            ) : (
              <AnimatePresence mode="wait">
                <motion.div
                  key={steering ? "after" : "before"}
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  transition={{ duration: 0.25, ease: "easeOut" }}
                >
                  {active.lines.map((line, i) => (
                    <p
                      key={i}
                      className={
                        "text-[17px] leading-relaxed " +
                        (steering && i === 1 ? "font-medium text-[#A32D2D]" : "text-neutral-700") +
                        (i > 0 ? " mt-3" : "")
                      }
                    >
                      {line}
                    </p>
                  ))}
                </motion.div>
              </AnimatePresence>
            )}
          </div>
          {!steering && (
            <button onClick={() => setSteering(true)} className="mt-4 text-sm font-medium text-[#E24B4A] hover:underline">
              See the same brief, steered
            </button>
          )}
        </div>
      </Reveal>
      <Reveal delay={180}>
        <p className="mt-6 max-w-2xl text-[15px] leading-relaxed text-neutral-600">{LANDING.shift.prose}</p>
      </Reveal>
    </section>
  );
}

// ---------- curriculum ----------

function Curriculum() {
  const [open, setOpen] = useState<number | null>(7);
  const days = LANDING.curriculum.days;
  const openDay = open === 11 ? null : days.find((d) => d.day === open);
  return (
    <section id="curriculum" className="border-t border-neutral-200 bg-neutral-50/60">
      <div className="mx-auto max-w-5xl px-5 py-16 sm:px-8 sm:py-24">
        <Reveal>
          <SectionHeading>{LANDING.curriculum.heading}</SectionHeading>
          <p className="mt-3 max-w-xl text-[15px] leading-relaxed text-neutral-600">{LANDING.curriculum.sub}</p>
        </Reveal>

        <Reveal delay={120}>
          <div className="mt-10">
            <div className="mb-2 flex justify-between text-[11px] uppercase tracking-[0.12em]">
              <span className="text-neutral-400">Foundation</span>
              <span className="text-[#A32D2D]">SPARKS</span>
            </div>
            <div className="grid grid-cols-5 gap-2 sm:grid-cols-11">
              {days.map((d, i) => {
                const isSparks = !!d.letter;
                const isOpen = open === d.day;
                return (
                  <Reveal key={d.day} delay={i * 35} className="group flex flex-col items-center gap-1.5">
                    <button
                      onClick={() => setOpen(isOpen ? null : d.day)}
                      aria-expanded={isOpen}
                      className="contents"
                    >
                      <span
                        className={
                          "flex h-10 w-10 items-center justify-center rounded-full border text-sm font-medium transition-all " +
                          (isOpen
                            ? "border-[#E24B4A] bg-[#E24B4A] text-white ring-4 ring-[#FCEBEB]"
                            : isSparks
                            ? "border-[#F09595] bg-[#FCEBEB] text-[#A32D2D] group-hover:border-[#E24B4A]"
                            : "border-neutral-300 bg-white text-neutral-500 group-hover:border-neutral-500")
                        }
                      >
                        {d.letter ?? d.day}
                      </span>
                      <span className={"text-center text-[10px] leading-tight sm:text-[11px] " + (isOpen ? "font-medium text-[#A32D2D]" : "text-neutral-500")}>
                        {d.label}
                      </span>
                    </button>
                  </Reveal>
                );
              })}
              <Reveal delay={days.length * 35} className="group flex flex-col items-center gap-1.5">
                <button
                  onClick={() => setOpen(open === 11 ? null : 11)}
                  aria-expanded={open === 11}
                  className="contents"
                >
                  <span
                    className={
                      "flex h-10 w-10 items-center justify-center rounded-full border border-dashed text-[#E24B4A] transition-all " +
                      (open === 11 ? "border-[#E24B4A] bg-[#FCEBEB] ring-4 ring-[#FCEBEB]" : "border-[#E24B4A] bg-white group-hover:bg-[#FCEBEB]")
                    }
                  >
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" />
                    </svg>
                  </span>
                  <span className={"text-center text-[10px] leading-tight sm:text-[11px] " + (open === 11 ? "font-medium text-[#A32D2D]" : "text-neutral-500")}>
                    {LANDING.curriculum.capstone.label}
                  </span>
                </button>
              </Reveal>
            </div>
          </div>
        </Reveal>

        <div
          className="grid transition-[grid-template-rows] duration-300 ease-out"
          style={{ gridTemplateRows: open !== null ? "1fr" : "0fr" }}
        >
          <div className="overflow-hidden">
            <div className="mt-6 rounded-xl border border-neutral-200 bg-white p-6">
              {open === 11 ? (
                <>
                  <p className="text-[11px] font-medium uppercase tracking-[0.12em] text-[#A32D2D]">After day 10</p>
                  <p style={display} className="mt-1 text-xl text-neutral-900">{LANDING.curriculum.capstone.label}</p>
                  <p className="mt-3 max-w-2xl text-[15px] leading-relaxed text-neutral-600">{LANDING.curriculum.capstone.coreIdea}</p>
                </>
              ) : openDay ? (
                <>
                  <p className="text-[11px] font-medium uppercase tracking-[0.12em] text-[#A32D2D]">
                    {"Day " + String(openDay.day) + (openDay.letter ? " \u00b7 SPARKS" : " \u00b7 Foundation")}
                  </p>
                  <p style={display} className="mt-1 text-xl text-neutral-900">{openDay.label}</p>
                  <p className="mt-3 max-w-2xl text-[15px] leading-relaxed text-neutral-600">{openDay.coreIdea}</p>
                </>
              ) : null}
            </div>
          </div>
        </div>

        <Reveal delay={80}>
          <div className="mt-8">
            <PreviewButton />
          </div>
        </Reveal>
      </div>
    </section>
  );
}

// ---------- is this for me ----------

function Fit() {
  const cfg = LANDING.fit;
  const [answers, setAnswers] = useState<Record<string, string>>({});

  const q1 = cfg.questions[0];
  const q1Answer = answers[q1.id];
  const routedTeam = q1.options.find((o) => o.id === q1Answer)?.route === "team";
  const remaining = routedTeam ? [] : cfg.questions.slice(1);
  const lastQ = cfg.questions[cfg.questions.length - 1];
  const allAnswered = !routedTeam && cfg.questions.every((q) => answers[q.id]);
  const result = allAnswered
    ? cfg.individualResults[answers[lastQ.id] as keyof typeof cfg.individualResults]
    : null;

  function pick(qid: string, oid: string) {
    setAnswers((prev) => {
      const next = { ...prev, [qid]: oid };
      if (qid === q1.id) return { [qid]: oid };
      return next;
    });
  }

  function OptionRow({ q }: { q: (typeof cfg.questions)[number] }) {
    return (
      <div>
        <p className="mb-2.5 text-sm text-neutral-900">{q.question}</p>
        <div className="flex flex-wrap gap-2">
          {q.options.map((o) => {
            const selected = answers[q.id] === o.id;
            return (
              <button
                key={o.id}
                onClick={() => pick(q.id, o.id)}
                aria-pressed={selected}
                className={
                  "rounded-md px-4 py-2 text-sm transition-all " +
                  (selected
                    ? "bg-[#E24B4A] font-medium text-white"
                    : "border border-neutral-300 text-neutral-600 hover:border-neutral-500 hover:text-neutral-900")
                }
              >
                {o.label}
              </button>
            );
          })}
        </div>
      </div>
    );
  }

  return (
    <section className="mx-auto max-w-5xl px-5 py-16 sm:px-8 sm:py-24">
      <Reveal>
        <SectionHeading>{cfg.heading}</SectionHeading>
        <p className="mt-3 text-[15px] text-neutral-600">{cfg.sub}</p>
      </Reveal>
      <Reveal delay={100}>
        <div className="mt-8 rounded-xl border border-neutral-200 p-6 sm:p-8">
          <div className="flex flex-col gap-6">
            <OptionRow q={q1} />
            {q1Answer && !routedTeam && remaining.map((q) => <OptionRow key={q.id} q={q} />)}
          </div>

          {routedTeam && (
            <div className="landing-fade mt-8 border-t border-neutral-200 pt-8">
              <p className="text-[11px] font-medium uppercase tracking-[0.12em] text-[#A32D2D]">{cfg.teamResult.verdict}</p>
              <p style={display} className="mt-2 max-w-xl text-xl leading-snug text-neutral-900">{cfg.teamResult.headline}</p>
              <p className="mt-3 max-w-xl text-[15px] leading-relaxed text-neutral-600">{cfg.teamResult.body}</p>
              <div className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-3">
                {cfg.teamResult.facts.map((f) => (
                  <div key={f.label} className="rounded-lg bg-neutral-50 px-4 py-3">
                    <p className="text-xs text-neutral-400">{f.label}</p>
                    <p className="mt-0.5 text-sm text-neutral-900">{f.value}</p>
                  </div>
                ))}
              </div>
              <div className="mt-6 flex flex-wrap items-center gap-3">
                <a href={LANDING.contactMailto} className="inline-flex items-center rounded-md bg-[#E24B4A] px-5 py-2.5 text-sm font-medium text-white hover:bg-[#c73f3e]">
                  {LANDING.enterprise.cta}
                </a>
                <PreviewButton small />
                <button onClick={() => setAnswers({})} className="text-sm text-neutral-500 hover:text-neutral-900">Start over</button>
              </div>
              <p className="mt-5 text-sm text-neutral-500">{cfg.teamResult.bailout}</p>
            </div>
          )}

          {result && (
            <div className="landing-fade mt-8 border-t border-neutral-200 pt-8">
              <p className="text-[11px] font-medium uppercase tracking-[0.12em] text-[#A32D2D]">{result.verdict}</p>
              <p style={display} className="mt-2 max-w-xl text-xl leading-snug text-neutral-900">{result.headline}</p>
              <p className="mt-3 max-w-xl text-[15px] leading-relaxed text-neutral-600">{result.body}</p>
              <div className="mt-5 flex flex-col gap-2.5">
                {result.dayCards.map((c) => (
                  <a
                    key={c.day}
                    href={LANDING.auditHref + "/lesson/" + String(c.day)}
                    className="flex items-baseline gap-4 border-l-[3px] border-[#E24B4A] bg-[#FCEBEB] px-4 py-3 transition-opacity hover:opacity-85"
                  >
                    <span className="whitespace-nowrap text-xs font-medium text-[#A32D2D]">{"Day " + String(c.day)}</span>
                    <span className="text-sm leading-relaxed text-[#501313]">{c.text}</span>
                  </a>
                ))}
              </div>
              <p className="mt-4 max-w-xl text-sm text-neutral-400">{result.caveat}</p>
              <div className="mt-6 flex flex-wrap items-center gap-3">
                <EnrollButton small />
                <PreviewButton small />
                <button onClick={() => setAnswers({})} className="text-sm text-neutral-500 hover:text-neutral-900">Start over</button>
              </div>
            </div>
          )}
        </div>
      </Reveal>
    </section>
  );
}

// ---------- testimonials ----------

function Testimonials() {
  const cfg = LANDING.testimonials;
  return (
    <section className="border-t border-neutral-200 bg-neutral-50/60">
      <div className="mx-auto max-w-5xl px-5 py-16 sm:px-8 sm:py-24">
        <Reveal>
          <SectionHeading>{cfg.heading}</SectionHeading>
          <p className="mt-3 text-[15px] text-neutral-600">{cfg.sub}</p>
        </Reveal>
        <Reveal delay={100}>
          <div className="-mx-5 mt-8 flex snap-x snap-mandatory gap-4 overflow-x-auto px-5 pb-4 sm:-mx-8 sm:px-8" style={{ scrollbarWidth: "thin" }}>
            {cfg.items.map((t, i) =>
              t.type === "video" ? (
                <div key={i} className="relative flex aspect-[3/4] w-56 shrink-0 snap-start flex-col justify-end overflow-hidden rounded-xl bg-neutral-200">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="flex h-12 w-12 items-center justify-center rounded-full bg-white/90">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="#171514"><path d="M8 5v14l11-7z" /></svg>
                    </span>
                  </div>
                  <div className="relative bg-gradient-to-t from-black/60 to-transparent p-4 pt-10">
                    <p className="text-sm font-medium text-white">{t.name}</p>
                    <p className="text-xs text-white/75">{t.role}</p>
                  </div>
                </div>
              ) : (
                <figure key={i} className="flex w-72 shrink-0 snap-start flex-col justify-between rounded-xl border border-neutral-200 bg-white p-5">
                  <blockquote className="text-sm leading-relaxed text-neutral-700">{"\u201c" + t.quote + "\u201d"}</blockquote>
                  <figcaption className="mt-4">
                    <p className="text-sm font-medium text-neutral-900">{t.name}</p>
                    <p className="text-xs text-neutral-400">{t.role}</p>
                  </figcaption>
                </figure>
              )
            )}
          </div>
        </Reveal>
      </div>
    </section>
  );
}

// ---------- assessment (copy prompt + compare screen) ----------

function Assessment() {
  const cfg = LANDING.assessment;
  const [model, setModel] = useState<AssessmentModel>("claude");
  const [copied, setCopied] = useState(false);
  const [stage, setStage] = useState<"copy" | "compare">("copy");
  const active = ASSESSMENT_PROMPTS[model];

  function handleCopy() {
    navigator.clipboard.writeText(active.text).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
      setTimeout(() => setStage("compare"), 650);
    });
  }

  return (
    <section className="mx-auto max-w-5xl px-5 py-16 sm:px-8 sm:py-24">
      <Reveal>
        <p className="mb-2 text-xs font-medium uppercase tracking-[0.14em] text-[#A32D2D]">{cfg.kicker}</p>
        <SectionHeading>{cfg.heading}</SectionHeading>
        <p className="mt-3 max-w-2xl text-[15px] leading-relaxed text-neutral-600">{cfg.sub}</p>
      </Reveal>

      <Reveal delay={100}>
        <div className="mt-8 max-w-2xl rounded-xl border border-neutral-200 p-6 sm:p-8">
          {stage === "copy" ? (
            <>
              <div className="mb-5 inline-flex rounded-lg bg-neutral-100 p-1" role="tablist" aria-label="Choose AI model">
                {(Object.keys(ASSESSMENT_PROMPTS) as AssessmentModel[]).map((key) => (
                  <button
                    key={key}
                    role="tab"
                    aria-selected={model === key}
                    onClick={() => setModel(key)}
                    className={
                      "rounded-md px-4 py-2 text-sm font-medium transition-all " +
                      (model === key ? "bg-white text-neutral-900 shadow-sm" : "text-neutral-500 hover:text-neutral-700")
                    }
                  >
                    {ASSESSMENT_PROMPTS[key].label}
                  </button>
                ))}
              </div>

              <div className="relative overflow-hidden rounded-lg border border-neutral-200 bg-neutral-50 p-4">
                <pre className="max-h-24 overflow-hidden whitespace-pre-wrap font-mono text-[12px] leading-relaxed text-neutral-500">
                  {active.text.slice(0, 320) + "\u2026"}
                </pre>
                <div className="pointer-events-none absolute inset-x-0 bottom-0 h-12 bg-gradient-to-t from-neutral-50 to-transparent" />
              </div>
              <p className="mt-2.5 text-xs text-neutral-400">
                {"\u2248 " + active.text.trim().split(/\s+/).length.toLocaleString() + " words \u00b7 the full prompt copies in one click"}
              </p>

              <div className="mt-5 flex flex-wrap gap-2.5">
                <button
                  onClick={handleCopy}
                  className={
                    "inline-flex items-center gap-2 rounded-md px-5 py-2.5 text-sm font-medium text-white transition-colors " +
                    (copied ? "bg-[#0F6E56]" : "bg-[#E24B4A] hover:bg-[#c73f3e]")
                  }
                >
                  {copied ? "Copied \u2713" : "Copy prompt"}
                </button>
                <a
                  href={active.openUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center rounded-md border border-neutral-300 px-5 py-2.5 text-sm text-neutral-900 hover:bg-neutral-50"
                >
                  {active.openLabel}
                </a>
              </div>
            </>
          ) : (
            <div className="landing-fade">
              <p style={display} className="text-xl text-neutral-900">{cfg.afterCopyHeading}</p>
              <p className="mt-2 text-sm text-neutral-500">{cfg.afterCopyBody}</p>
              <div className="mt-6 flex flex-col gap-5">
                {cfg.examples.map((ex) => (
                  <div key={ex.label}>
                    <div className="mb-1.5 flex items-baseline justify-between">
                      <span className="text-sm text-neutral-900">{ex.label}</span>
                      <span className="text-xs text-neutral-400">{ex.beforeLabel + " \u2192 " + ex.afterLabel}</span>
                    </div>
                    <div className="relative h-2 rounded-full bg-neutral-100">
                      <div className="absolute left-0 top-0 h-2 rounded-full bg-[#F09595]" style={{ width: String(ex.before) + "%" }} />
                      <div className="absolute left-0 top-0 h-2 rounded-full bg-[#E24B4A] opacity-60" style={{ width: String(ex.after) + "%" }} />
                    </div>
                    <div className="mt-1 flex justify-between text-[11px] text-neutral-400">
                      <span>{"Before: " + String(ex.before)}</span>
                      <span>{"After: " + String(ex.after)}</span>
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-7 flex flex-wrap items-center gap-3">
                <EnrollButton small />
                <PreviewButton small />
                <button onClick={() => setStage("copy")} className="text-sm text-neutral-500 hover:text-neutral-900">Back to the prompt</button>
              </div>
            </div>
          )}
        </div>
      </Reveal>
    </section>
  );
}

// ---------- bio ----------

function Bio() {
  return (
    <section className="border-t border-neutral-200">
      <div className="mx-auto grid max-w-5xl grid-cols-1 gap-10 px-5 py-16 sm:px-8 sm:py-24 md:grid-cols-[280px_1fr]">
        <Reveal>
          <div className="flex aspect-[4/5] w-full max-w-[280px] items-center justify-center rounded-xl bg-neutral-100 text-sm text-neutral-400">
            Photo of Bryan
          </div>
        </Reveal>
        <Reveal delay={100}>
          <div>
            <SectionHeading>{LANDING.bio.heading}</SectionHeading>
            {LANDING.bio.paragraphs.map((p, i) => (
              <p key={i} className="mt-4 max-w-xl text-[15px] leading-relaxed text-neutral-600">{p}</p>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}

// ---------- pricing ----------

function Pricing() {
  const p = LANDING.pricing;
  return (
    <section id="pricing" className="border-t border-neutral-200 bg-neutral-50/60">
      <div className="mx-auto max-w-5xl px-5 py-16 sm:px-8 sm:py-24">
        <Reveal>
          <div className="mx-auto max-w-md rounded-xl border border-neutral-200 bg-white p-7 sm:p-9">
            <p style={display} className="text-xl text-neutral-900">{p.heading}</p>
            <div className="mt-4 flex items-baseline gap-2.5">
              {p.salePrice !== null ? (
                <>
                  <span className="text-lg text-neutral-400 line-through">{p.currency + String(p.basePrice)}</span>
                  <span style={display} className="text-[42px] leading-none text-neutral-900">{p.currency + String(p.salePrice)}</span>
                  <span className="rounded-full bg-[#FCEBEB] px-2.5 py-1 text-xs font-medium text-[#A32D2D]">{p.priceNote}</span>
                </>
              ) : (
                <span style={display} className="text-[42px] leading-none text-neutral-900">{p.currency + String(p.basePrice)}</span>
              )}
            </div>
            <ul className="mt-6 flex flex-col gap-2.5">
              {p.includes.map((line, i) => (
                <li key={i} className="flex gap-2.5 text-sm leading-relaxed text-neutral-700">
                  <svg className="mt-1 shrink-0" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke={RED} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                  {line}
                </li>
              ))}
            </ul>
            <div className="mt-7">
              <a href={LANDING.enrollHref} className="flex w-full items-center justify-center rounded-md bg-[#E24B4A] px-6 py-3 text-sm font-medium text-white hover:bg-[#c73f3e]">
                Enroll
              </a>
              <p className="mt-3 text-center text-sm text-neutral-500">
                {"Want to look first? "}
                <a href={LANDING.auditHref} className="text-[#E24B4A] hover:underline">{"Preview Day 1 free \u2192"}</a>
              </p>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

// ---------- enterprise ----------

function Enterprise() {
  const e = LANDING.enterprise;
  return (
    <section id="teams" className="border-t border-neutral-200">
      <div className="mx-auto max-w-5xl px-5 py-16 sm:px-8 sm:py-20">
        <Reveal>
          <div className="rounded-xl bg-[#FCEBEB] p-7 sm:p-10">
            <SectionHeading>{e.heading}</SectionHeading>
            <p className="mt-3 max-w-2xl text-[15px] leading-relaxed text-[#501313]">{e.body}</p>
            <div className="mt-6 flex flex-wrap items-center gap-4">
              <a href={LANDING.contactMailto} className="inline-flex items-center rounded-md bg-[#E24B4A] px-5 py-2.5 text-sm font-medium text-white hover:bg-[#c73f3e]">
                {e.cta}
              </a>
              <span className="text-sm text-[#791F1F]">{e.note}</span>
            </div>
          </div>
        </Reveal>
      </div>
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
    <section id="contact" className="border-t border-neutral-200">
      <div className="mx-auto max-w-2xl px-5 py-16 sm:px-8 sm:py-24">
        <Reveal>
          <SectionHeading>{cfg.heading}</SectionHeading>
          <p className="mt-3 text-[15px] leading-relaxed text-neutral-600">{cfg.sub}</p>
        </Reveal>
        <Reveal delay={100}>
          {submitted ? (
            <div className="mt-8 rounded-xl border border-neutral-200 p-6 sm:p-8">
              <p style={display} className="text-xl text-neutral-900">{cfg.successHeading}</p>
              <p className="mt-2 text-sm text-neutral-600">{cfg.successBody}</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="mt-8 flex flex-col gap-4 rounded-xl border border-neutral-200 p-6 sm:p-8">
              <Input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder={cfg.namePlaceholder}
                className="h-11 px-3.5"
              />
              <Input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder={cfg.emailPlaceholder}
                className="h-11 px-3.5"
              />
              <Textarea
                required
                rows={5}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder={cfg.messagePlaceholder}
                className="px-3.5 py-2.5"
              />
              {error && <p className="text-sm text-[#A32D2D]">{error}</p>}
              <Button
                type="submit"
                disabled={loading}
                className="h-11 self-start bg-[#E24B4A] px-6 text-white hover:bg-[#c73f3e]"
              >
                {loading ? "Sending…" : cfg.submitLabel}
              </Button>
            </form>
          )}
        </Reveal>
      </div>
    </section>
  );
}

// ---------- faq ----------

function Faq() {
  const [open, setOpen] = useState<number | null>(null);
  return (
    <section className="mx-auto max-w-3xl px-5 py-16 sm:px-8 sm:py-24">
      <Reveal>
        <SectionHeading>{LANDING.faq.heading}</SectionHeading>
      </Reveal>
      <div className="mt-8 divide-y divide-neutral-200 border-y border-neutral-200">
        {LANDING.faq.items.map((item, i) => {
          const isOpen = open === i;
          return (
            <div key={i}>
              <button
                onClick={() => setOpen(isOpen ? null : i)}
                aria-expanded={isOpen}
                className="flex w-full items-center justify-between gap-4 py-4 text-left"
              >
                <span className="text-[15px] text-neutral-900">{item.q}</span>
                <svg
                  className={"shrink-0 text-neutral-400 transition-transform duration-200 " + (isOpen ? "rotate-45" : "")}
                  width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"
                >
                  <line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" />
                </svg>
              </button>
              <div className="grid transition-[grid-template-rows] duration-250 ease-out" style={{ gridTemplateRows: isOpen ? "1fr" : "0fr" }}>
                <div className="overflow-hidden">
                  <p className="pb-4 pr-8 text-sm leading-relaxed text-neutral-600">{item.a}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}

// ---------- final cta + footer ----------

function FinalCta() {
  return (
    <section className="border-t border-neutral-200 bg-neutral-50/60">
      <div className="mx-auto flex max-w-5xl flex-col items-center px-5 py-20 text-center sm:px-8 sm:py-28">
        <Reveal>
          <h2 style={display} className="text-[32px] leading-tight text-neutral-900 sm:text-[40px]">{LANDING.finalCta.heading}</h2>
          <p className="mt-3 text-base text-neutral-600">{LANDING.finalCta.sub}</p>
        </Reveal>
        <Reveal delay={120}>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <EnrollButton />
            <PreviewButton />
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="border-t border-neutral-200">
      <div className="mx-auto flex max-w-5xl flex-col items-start justify-between gap-4 px-5 py-8 sm:flex-row sm:items-center sm:px-8">
        <div className="flex items-center gap-2.5">
          <img src="/assets/site-icon.png" alt="" className="h-6 w-6 rounded object-contain" />
          <span className="text-sm text-neutral-500">{LANDING.footer.line}</span>
        </div>
        <nav className="flex flex-wrap gap-5">
          {LANDING.footer.links.map((l) => (
            <a key={l.label} href={l.href} className="text-sm text-neutral-500 hover:text-neutral-900">{l.label}</a>
          ))}
        </nav>
      </div>
    </footer>
  );
}

// ---------- page ----------

export function LandingView() {
  return (
    <div className="bg-white text-neutral-900 antialiased">
      <GrainOverlay />
      <Header />
      <main>
        <Hero />
        <Stats />
        <Brands />
        <Shift />
        <Curriculum />
        <Fit />
        <Testimonials />
        <Assessment />
        <Bio />
        <Pricing />
        <Enterprise />
        <Contact />
        <Faq />
        <FinalCta />
      </main>
      <Footer />
    </div>
  );
}
