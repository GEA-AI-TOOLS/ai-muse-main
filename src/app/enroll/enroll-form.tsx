"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Clock, BookOpen, BarChart3, Award, CalendarDays } from "lucide-react";
import { SALE_MODE, SALE_COHORT_START } from "@/lib/launch-config";

type Step = "form" | "verify";

const TIMEZONES = [
  { value: "Europe/London", label: "London (GMT)" },
  { value: "Europe/Brussels", label: "Brussels (GMT+1)" },
  { value: "Europe/Paris", label: "Paris (GMT+1)" },
  { value: "Europe/Berlin", label: "Berlin (GMT+1)" },
  { value: "America/New_York", label: "New York (GMT-5)" },
  { value: "America/Chicago", label: "Chicago (GMT-6)" },
  { value: "America/Denver", label: "Denver (GMT-7)" },
  { value: "America/Los_Angeles", label: "Los Angeles (GMT-8)" },
  { value: "Asia/Dubai", label: "Dubai (GMT+4)" },
  { value: "Asia/Kolkata", label: "India (GMT+5:30)" },
  { value: "Asia/Singapore", label: "Singapore (GMT+8)" },
  { value: "Asia/Tokyo", label: "Tokyo (GMT+9)" },
  { value: "Australia/Sydney", label: "Sydney (GMT+10)" },
];

const COUNTRY_CODES = [
  { code: "+1", label: "🇺🇸 +1" },
  { code: "+44", label: "🇬🇧 +44" },
  { code: "+32", label: "🇧🇪 +32" },
  { code: "+33", label: "🇫🇷 +33" },
  { code: "+49", label: "🇩🇪 +49" },
  { code: "+31", label: "🇳🇱 +31" },
  { code: "+34", label: "🇪🇸 +34" },
  { code: "+39", label: "🇮🇹 +39" },
  { code: "+41", label: "🇨🇭 +41" },
  { code: "+971", label: "🇦🇪 +971" },
  { code: "+91", label: "🇮🇳 +91" },
  { code: "+65", label: "🇸🇬 +65" },
  { code: "+81", label: "🇯🇵 +81" },
  { code: "+61", label: "🇦🇺 +61" },
  { code: "+27", label: "🇿🇦 +27" },
  { code: "+55", label: "🇧🇷 +55" },
  { code: "+52", label: "🇲🇽 +52" },
];

const BENEFITS = [
  { Icon: Clock, title: "Ten minutes a day", desc: "Short enough to do before your first meeting." },
  { Icon: BookOpen, title: "Built on research", desc: "Grounded in roughly 90 academic studies." },
  { Icon: BarChart3, title: "Measured results", desc: "57 to 81 average. You see your own change." },
  { Icon: Award, title: "Two certificates, yours for life", desc: "Publicly verifiable. Every prompt and template stays with you." },
];

const SALE_END_LABEL = "Aug 24";

function detectTimezone(): string {
  try {
    return Intl.DateTimeFormat().resolvedOptions().timeZone;
  } catch {
    return "Europe/London";
  }
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

function validatePhoneNumber(dialCode: string, number: string): string | null {
  const digits = number.replace(/\D/g, "");
  if (digits.length < 7 || digits.length > 15) {
    return "Enter a valid mobile number. Use 7–15 digits, without the country code.";
  }
  return null;
}

function buildE164(dialCode: string, number: string): string {
  const digits = number.replace(/\D/g, "");
  return dialCode + digits;
}

export function EnrollForm() {
  const [step, setStep] = useState<Step>("form");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [lastName, setLastName] = useState("");

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [wantsWhatsapp, setWantsWhatsapp] = useState(false);
  const [emailReminders, setEmailReminders] = useState(true);
  const [dialCode, setDialCode] = useState("+1");
  const [dialCodeOpen, setDialCodeOpen] = useState(false);
  const [customDialCode, setCustomDialCode] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [timezone, setTimezone] = useState(detectTimezone());

  const [emailOtp, setEmailOtp] = useState("");
  const [whatsappOtp, setWhatsappOtp] = useState("");
  const [hasPhone, setHasPhone] = useState(false);

  async function handleFormSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");

    let phone = "";
    if (wantsWhatsapp) {
      const phoneError =
  !/^\+\d{1,4}$/.test(dialCode)
    ? "Enter a valid country code."
    : validatePhoneNumber(dialCode, phoneNumber);
      if (phoneError) {
        setError(phoneError);
        return;
      }
      phone = buildE164(dialCode, phoneNumber);
    }

    setLoading(true);
    try {
      const res = await fetch("/api/enroll/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, lastName, email, phone, timezone, emailReminders }),
      });
      const data = await res.json();
      if (!data.ok) {
        setError(data.error ?? "Something went wrong. Try again.");
      } else {
        setHasPhone(data.hasPhone);
        setStep("verify");
      }
    } catch {
      setError("Network error. Try again.");
    } finally {
      setLoading(false);
    }
  }

  async function handleVerifySubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const res = await fetch("/api/enroll/verify-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          emailOtp,
          whatsappOtp: hasPhone ? whatsappOtp : undefined,
        }),
      });
      const data = await res.json();
      if (!data.ok) {
        setError(data.error ?? "Incorrect or expired code.");
      } else {
        const checkoutRes = await fetch("/api/enroll/create-checkout", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email }),
        });
        const checkoutData = await checkoutRes.json();
        if (!checkoutData.url) {
          setError("Failed to start checkout. Try again.");
        } else {
          window.location.href = checkoutData.url;
        }
      }
    } catch {
      setError("Network error. Try again.");
    } finally {
      setLoading(false);
    }
  }

  const inputCls =
    "h-10 border-white/30 bg-white/[0.08] text-white placeholder:text-neutral-400 focus-visible:ring-[#FF3B3B]/60";
  const selectCls =
    "h-10 w-full rounded-md border border-white/30 bg-white/[0.08] px-3 text-sm text-white focus:outline-none focus:ring-2 focus:ring-[#FF3B3B]";
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

          <div className="mb-4 rounded-lg border border-[#FF3B3B]/40 bg-[#FF3B3B]/[0.09] px-4 py-2.5">
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

          <div className="mb-4 flex items-center gap-2">
            <span className="flex h-[18px] w-[18px] items-center justify-center rounded-full bg-[#FF3B3B] text-[10px] font-bold text-white">
              {step === "verify" ? "✓" : "1"}
            </span>
            <span className="text-[11px] font-semibold uppercase tracking-[0.08em] text-white">Details</span>
            <span className="h-px flex-1 bg-white/20" />
            <span className={
              "flex h-[18px] w-[18px] items-center justify-center rounded-full text-[10px] font-bold " +
              (step === "verify" ? "bg-[#FF3B3B] text-white" : "border border-white/35 text-[#C4BFBD]")
            }>
              2
            </span>
            <span className={"text-[11px] font-semibold uppercase tracking-[0.08em] " + (step === "verify" ? "text-white" : "text-[#C4BFBD]")}>
              Verify
            </span>
            <span className="h-px flex-1 bg-white/20" />
            <span className="flex h-[18px] w-[18px] items-center justify-center rounded-full border border-white/35 text-[10px] font-bold text-[#C4BFBD]">
              3
            </span>
            <span className="text-[11px] font-semibold uppercase tracking-[0.08em] text-[#C4BFBD]">Pay</span>
          </div>

          {step === "form" && (
            <form onSubmit={handleFormSubmit} className="space-y-2.5">
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
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className={inputCls}
                />
              </div>

              <div>
                <label className={labelCls}>Your timezone</label>
                <select
                  value={timezone}
                  onChange={(e) => setTimezone(e.target.value)}
                  className={selectCls}
                  required
                >
                  {TIMEZONES.map((tz) => (
                    <option key={tz.value} value={tz.value}>{tz.label}</option>
                  ))}
                </select>
              </div>

              <div className="space-y-2 pt-0.5">
                <label className="flex cursor-pointer items-start gap-2.5">
                  <input
                    type="checkbox"
                    checked={wantsWhatsapp}
                    onChange={(e) => {
                      setWantsWhatsapp(e.target.checked);
                      if (!e.target.checked) setPhoneNumber("");
                    }}
                    className="mt-0.5 h-4 w-4 shrink-0 rounded accent-[#FF3B3B]"
                  />
                  <span className="text-[12.5px] leading-snug text-[#D6D3D1]">
                    Also send lesson reminders on WhatsApp
                  </span>
                </label>

                <label className="flex cursor-pointer items-start gap-2.5">
                  <input
                    type="checkbox"
                    checked={emailReminders}
                    onChange={(e) => setEmailReminders(e.target.checked)}
                    className="mt-0.5 h-4 w-4 shrink-0 rounded accent-[#FF3B3B]"
                  />
                  <span className="text-[12.5px] leading-snug text-[#D6D3D1]">
                    Email me in the evening if the lesson is unopened
                  </span>
                </label>
              </div>

              {wantsWhatsapp && (
                <div>
                  <label className={labelCls}>WhatsApp number</label>

                  <p className="mb-1.5 text-[11px] leading-relaxed text-[#8F8A87]">
                    We’ll verify this number by SMS. Lesson reminders will be sent on WhatsApp.
                  </p>

                  <div className="flex gap-2">
                    <div className="relative shrink-0">
                      {customDialCode ? (
                        <div className="flex h-10 w-[108px] overflow-hidden rounded-md border border-white/30 bg-white/[0.08]">
                          <input
                            type="text"
                            inputMode="numeric"
                            value={dialCode}
                            placeholder="+00"
                            onChange={(e) => {
                              const digits = e.target.value
                                .replace(/\D/g, "")
                                .slice(0, 4);

                              setDialCode("+" + digits);
                            }}
                            className="min-w-0 flex-1 bg-transparent px-3 text-sm text-white outline-none placeholder:text-[#8F8A87]"
                            autoFocus
                          />

                          <button
                            type="button"
                            onClick={() => setDialCodeOpen((v) => !v)}
                            className="flex w-8 shrink-0 items-center justify-center border-l border-white/15 text-[#C4BFBD] transition-colors hover:bg-white/[0.06]"
                            aria-label="Choose country code"
                          >
                            <svg
                              width="11"
                              height="11"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2.5"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            >
                              <polyline points="6 9 12 15 18 9" />
                            </svg>
                          </button>
                        </div>
                      ) : (
                        <button
                          type="button"
                          onClick={() => setDialCodeOpen((v) => !v)}
                          className={
                            selectCls +
                            " flex w-[92px] items-center justify-between gap-1 text-left"
                          }
                        >
                          <span>
                            {COUNTRY_CODES.find((c) => c.code === dialCode)?.label ??
                              dialCode}
                          </span>

                          <svg
                            width="11"
                            height="11"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="shrink-0 text-[#C4BFBD]"
                          >
                            <polyline points="6 9 12 15 18 9" />
                          </svg>
                        </button>
                      )}

                      {dialCodeOpen && (
                        <>
                          <div
                            className="fixed inset-0 z-10"
                            onClick={() => setDialCodeOpen(false)}
                          />

                          <div className="absolute bottom-[calc(100%+6px)] left-0 z-20 max-h-52 w-48 overflow-y-auto rounded-lg border border-white/15 bg-[#1B1B21] py-1.5 shadow-[0_20px_60px_rgba(0,0,0,0.5)]">
                            {COUNTRY_CODES.map((c) => (
                              <button
                                key={c.code}
                                type="button"
                                onClick={() => {
                                  setDialCode(c.code);
                                  setCustomDialCode(false);
                                  setDialCodeOpen(false);
                                }}
                                className={
                                  "flex w-full items-center gap-2 px-3.5 py-1.5 text-left text-sm transition-colors " +
                                  (c.code === dialCode && !customDialCode
                                    ? "bg-[#FF3B3B]/15 text-white"
                                    : "text-[#D6D3D1] hover:bg-white/[0.06] hover:text-white")
                                }
                              >
                                {c.label}
                              </button>
                            ))}

                            <div className="my-1 border-t border-white/10" />

                            <button
                              type="button"
                              onClick={() => {
                                setCustomDialCode(true);
                                setDialCode("+");
                                setDialCodeOpen(false);
                              }}
                              className={
                                "flex w-full items-center gap-2 px-3.5 py-1.5 text-left text-sm transition-colors " +
                                (customDialCode
                                  ? "bg-[#FF3B3B]/15 text-white"
                                  : "text-[#D6D3D1] hover:bg-white/[0.06] hover:text-white")
                              }
                            >
                              <span className="flex h-5 w-5 items-center justify-center rounded border border-white/20 text-xs">
                                +
                              </span>

                              Other country code
                            </button>
                          </div>
                        </>
                      )}
                    </div>

                    <Input
                      type="tel"
                      inputMode="tel"
                      autoComplete="tel-national"
                      placeholder="612 345 678"
                      value={phoneNumber}
                      onChange={(e) =>
                        setPhoneNumber(e.target.value.replace(/[^\d\s\-]/g, ""))
                      }
                      required={wantsWhatsapp}
                      className={inputCls + " flex-1"}
                    />
                  </div>

                  <p className="mt-1.5 text-[11px] leading-relaxed text-[#8F8A87]">
                    Enter your mobile number without the country code. We’ll verify it by SMS.
                  </p>
                </div>
              )}

              {error && <p className="text-[12px] text-[#ff8a82]">{error}</p>}

              <Button
                type="submit"
                className="h-12 w-full bg-[#E0233F] text-[15px] font-semibold hover:bg-[#FF3B3B]"
                disabled={loading}
              >
                {loading ? "Sending codes..." : "Get access now"}
              </Button>

              <p className="text-center text-[12px] leading-relaxed text-[#A8A29E]">
                Card payment via Stripe. 14 day refund.
                <br />
                Already enrolled?{" "}
                <a href="/login" className="text-[#FFA8A2] underline">Log in</a>
              </p>
            </form>
          )}

          {step === "verify" && (
            <form onSubmit={handleVerifySubmit} className="space-y-2.5">
              <p className="text-[12.5px] leading-relaxed text-[#D6D3D1]">
                {hasPhone
                  ? "We sent an email code to " + email + " and an SMS verification code to your phone."
                  : "We sent a code to " + email + "."}
              </p>

              <div className={hasPhone ? "grid grid-cols-2 gap-3" : ""}>
                <div>
                  <label className={labelCls}>Email code</label>
                  <Input
                    type="text"
                    inputMode="numeric"
                    placeholder="123456"
                    maxLength={6}
                    value={emailOtp}
                    onChange={(e) => setEmailOtp(e.target.value.replace(/\D/g, ""))}
                    required
                    autoFocus
                    className={inputCls}
                  />
                </div>

                {hasPhone && (
                  <div>
                    <label className={labelCls}>SMS code</label>
                    <Input
                      type="text"
                      inputMode="numeric"
                      placeholder="123456"
                      maxLength={6}
                      value={whatsappOtp}
                      onChange={(e) => setWhatsappOtp(e.target.value.replace(/\D/g, ""))}
                      required
                      className={inputCls}
                    />
                  </div>
                )}
              </div>

              {error && <p className="text-[12px] text-[#ff8a82]">{error}</p>}

              <Button
                type="submit"
                className="h-12 w-full bg-[#E0233F] text-[15px] font-semibold hover:bg-[#FF3B3B]"
                disabled={loading}
              >
                {loading ? "Verifying..." : "Continue to payment"}
              </Button>

              <button
                type="button"
                onClick={() => {
                  setStep("form");
                  setEmailOtp("");
                  setWhatsappOtp("");
                  setError("");
                }}
                className="w-full text-center text-[12px] text-[#A8A29E] hover:text-white hover:underline"
              >
                Go back and edit details
              </button>
            </form>
          )}

        </div>
      </div>
    </div>
  );
}