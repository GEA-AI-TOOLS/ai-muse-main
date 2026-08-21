"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Clock, BookOpen, BarChart3, Award, CalendarDays } from "lucide-react";
import { SALE_MODE, SALE_COHORT_START } from "@/lib/launch-config";
import { track } from "@vercel/analytics";

const BENEFITS = [
  { Icon: Clock, title: "Ten minutes a day", desc: "Short enough to do before your first meeting." },
  { Icon: BookOpen, title: "Built on research", desc: "Grounded in roughly 90 academic studies." },
  { Icon: BarChart3, title: "Measured results", desc: "57 to 81 average. You see your own change." },
  { Icon: Award, title: "Two certificates, yours for life", desc: "Publicly verifiable. Every prompt and template stays with you." },
];

const SALE_END_LABEL = "Aug 24";

// Domains people mistype most often, mapped to what they meant.
const DOMAIN_FIXES: Record<string, string> = {
  "gmial.com": "gmail.com",
  "gmai.com": "gmail.com",
  "gmail.co": "gmail.com",
  "gmail.con": "gmail.com",
  "gmaill.com": "gmail.com",
  "gmail.cm": "gmail.com",
  "gnail.com": "gmail.com",
  "hotmial.com": "hotmail.com",
  "hotmail.co": "hotmail.com",
  "hotmail.con": "hotmail.com",
  "outlok.com": "outlook.com",
  "outlook.co": "outlook.com",
  "yahooo.com": "yahoo.com",
  "yaho.com": "yahoo.com",
  "yahoo.co": "yahoo.com",
  "iclod.com": "icloud.com",
  "icloud.co": "icloud.com",
  "protonmai.com": "protonmail.com",
};

function suggestEmail(value: string): string | null {
  const at = value.lastIndexOf("@");
  if (at === -1) return null;

  const local = value.slice(0, at);
  const domain = value.slice(at + 1).toLowerCase().trim();
  if (!local || !domain) return null;

  const fix = DOMAIN_FIXES[domain];
  return fix ? local + "@" + fix : null;
}

function getUpcomingMonday(): Date {
  const date = new Date();
  const day = date.getUTCDay();
  const daysUntilMonday = day === 0 ? 1 : day === 1 ? 7 : 8 - day;
  date.setUTCDate(date.getUTCDate() + daysUntilMonday);
  date.setUTCHours(0, 0, 0, 0);
  return date;
}

function cohortStartLabel(): string {
  const date = SALE_MODE
    ? new Date(SALE_COHORT_START + "T00:00:00.000Z")
    : getUpcomingMonday();
  return date.toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
    timeZone: "UTC",
  });
}

export function EnrollForm() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [name, setName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [suggestion, setSuggestion] = useState<string | null>(null);

  function handleEmailChange(value: string) {
    setEmail(value);
    setSuggestion(suggestEmail(value));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await fetch("/api/enroll/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, lastName, email }),
      });
      const data = await res.json();

      if (!data.ok) {
        setError(data.error ?? "Something went wrong. Try again.");
        setLoading(false);
        return;
      }

      track("enroll_started");

      const checkoutRes = await fetch("/api/enroll/create-checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const checkoutData = await checkoutRes.json();

      if (!checkoutData.url) {
        setError("Failed to start checkout. Try again.");
        setLoading(false);
        return;
      }

      track("checkout_started");
      window.location.href = checkoutData.url;
    } catch {
      setError("Network error. Try again.");
      setLoading(false);
    }
  }

  const inputCls =
    "h-10 border-white/30 bg-white/[0.08] text-white placeholder:text-neutral-400 focus-visible:ring-[#FF3B3B]/60";
  const labelCls = "mb-1.5 block text-[12px] font-medium text-[#C4BFBD]";
  const display = { fontFamily: "var(--font-display), Georgia, serif" };

  return (
    <div className="min-h-screen bg-[#121216] font-[family-name:var(--font-body),ui-sans-serif,system-ui]">
      <div className="grid min-h-screen grid-cols-1 lg:h-screen lg:grid-cols-[1fr_minmax(440px,36%)] lg:overflow-hidden">

        {/* Left: pitch */}
        <div className="relative flex flex-col justify-center overflow-hidden px-8 py-12 sm:px-14 lg:px-20 lg:py-10 xl:px-28">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0"
            style={{
              backgroundImage:
                "linear-gradient(to right, rgba(255,255,255,0.075) 1px, transparent 1px)," +
                "linear-gradient(to bottom, rgba(255,255,255,0.075) 1px, transparent 1px)",
              backgroundSize: "52px 52px",
              maskImage: "radial-gradient(ellipse 85% 75% at 42% 45%, black, transparent)",
              WebkitMaskImage: "radial-gradient(ellipse 85% 75% at 42% 45%, black, transparent)",
            }}
          />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -left-40 top-1/4 h-[30rem] w-[30rem] rounded-full blur-3xl"
            style={{ background: "radial-gradient(circle, rgba(255,59,59,0.20), transparent 70%)" }}
          />

          <div className="relative max-w-2xl">
            <p className="mb-5 text-[12px] font-semibold uppercase tracking-[0.18em] text-[#FFA8A2]">
              10 days · 10 minutes a day
            </p>
            <h1 style={display} className="text-[46px] leading-[1.03] text-white sm:text-[58px] xl:text-[66px]">
              Get Disciplined AI
            </h1>
            <p className="mt-6 max-w-lg text-[18px] leading-relaxed text-[#E7E5E4]">
              Think different, work different with AI. Fast.
            </p>

            <div className="mt-8 inline-flex items-center gap-3 rounded-lg border border-white/15 bg-white/[0.06] px-5 py-3.5">
              <CalendarDays size={19} className="shrink-0 text-[#FFA8A2]" strokeWidth={2} />
              <p className="text-[15px] text-[#E7E5E4]">
                Your cohort starts{" "}
                <span className="font-semibold text-white">{cohortStartLabel()}</span>
                {SALE_MODE ? ". Lessons unlock that day." : "."}
              </p>
            </div>

            <div className="mt-12 h-px w-full max-w-lg bg-white/15" />

            <p className="mb-8 mt-10 text-[12px] font-semibold uppercase tracking-[0.18em] text-[#FFA8A2]">
              What you get
            </p>
            <div className="grid max-w-2xl grid-cols-1 gap-x-14 gap-y-9 sm:grid-cols-2">
              {BENEFITS.map(({ Icon, title, desc }) => (
                <div key={title} className="flex gap-4">
                  <span className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-[#FF3B3B]/16">
                    <Icon size={17} className="text-[#FFA8A2]" strokeWidth={2} />
                  </span>
                  <div>
                    <p className="text-[15px] font-semibold text-white">{title}</p>
                    <p className="mt-1.5 text-[13.5px] leading-relaxed text-[#B9B4B2]">{desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right: form */}
        <div className="flex min-h-0 flex-col justify-center border-t border-white/12 bg-[#1B1B21] px-7 py-7 sm:px-9 lg:border-l lg:border-t-0 lg:px-8 lg:py-5">

          <div className="mb-5 rounded-lg border border-[#FF3B3B]/40 bg-[#FF3B3B]/[0.09] px-4 py-2.5">
            {SALE_MODE && (
              <p className="mb-1.5 text-[11px] font-semibold uppercase tracking-[0.12em] text-[#FFA8A2]">
                {"Pre-launch · ends " + SALE_END_LABEL}
              </p>
            )}
            <div className="flex items-baseline gap-2.5">
              <span style={display} className="text-[30px] leading-none text-white">€147</span>
              {SALE_MODE && (
                <span className="text-[15px] text-[#A8A29E] line-through">€195</span>
              )}
            </div>
            <p className="mt-1.5 text-[12.5px] leading-relaxed text-[#E7E5E4]">
              Full course. Both certificates. Lifetime access.
            </p>
          </div>

          <div className="mb-5 flex items-center gap-2">
            <span className="flex h-[18px] w-[18px] items-center justify-center rounded-full bg-[#FF3B3B] text-[10px] font-bold text-white">
              1
            </span>
            <span className="text-[11px] font-semibold uppercase tracking-[0.08em] text-white">Details</span>
            <span className="h-px flex-1 bg-white/20" />
            <span className="flex h-[18px] w-[18px] items-center justify-center rounded-full border border-white/35 text-[10px] font-bold text-[#C4BFBD]">
              2
            </span>
            <span className="text-[11px] font-semibold uppercase tracking-[0.08em] text-[#C4BFBD]">Pay</span>
            <span className="h-px flex-1 bg-white/20" />
            <span className="flex h-[18px] w-[18px] items-center justify-center rounded-full border border-white/35 text-[10px] font-bold text-[#C4BFBD]">
              3
            </span>
            <span className="text-[11px] font-semibold uppercase tracking-[0.08em] text-[#C4BFBD]">Set up</span>
          </div>

          <form onSubmit={handleSubmit} className="space-y-3">
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className={labelCls}>First name</label>
                <Input
                  type="text"
                  placeholder="Sarah"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  autoFocus
                  className={inputCls}
                />
              </div>
              <div>
                <label className={labelCls}>Last name</label>
                <Input
                  type="text"
                  placeholder="Chen"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  required
                  className={inputCls}
                />
              </div>
            </div>

            <div>
              <label className={labelCls}>Email</label>
              <Input
                type="email"
                placeholder="you@company.com"
                value={email}
                onChange={(e) => handleEmailChange(e.target.value)}
                required
                className={inputCls}
              />

              {suggestion && (
                <p className="mt-1.5 text-[12px] text-[#FFA8A2]">
                  Did you mean{" "}
                  <button
                    type="button"
                    onClick={() => {
                      setEmail(suggestion);
                      setSuggestion(null);
                    }}
                    className="font-semibold underline underline-offset-2"
                  >
                    {suggestion}
                  </button>
                  ?
                </p>
              )}
            </div>

            {error && <p className="text-[12px] text-[#ff8a82]">{error}</p>}

            <Button
              type="submit"
              className="h-12 w-full bg-[#E0233F] text-[15px] font-semibold hover:bg-[#FF3B3B]"
              disabled={loading}
            >
              {loading ? "Opening secure checkout..." : "Continue to payment"}
            </Button>

            <p className="text-center text-[12px] leading-relaxed text-[#A8A29E]">
              Card payment via Stripe. 14 day refund.
              <br />
              Already enrolled?{" "}
              <a href="/login" className="text-[#FFA8A2] underline">Log in</a>
            </p>
          </form>

        </div>
      </div>
    </div>
  );
}