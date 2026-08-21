"use client";

import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { track } from "@vercel/analytics";

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

const SKIP_UNLOCK_SECONDS = 30;

function detectTimezone(): string {
  try {
    return Intl.DateTimeFormat().resolvedOptions().timeZone;
  } catch {
    return "Europe/London";
  }
}

interface Props {
  initialName: string;
  initialEmail: string;
  initialEmailVerified: boolean;
  initialPhone: string;
  initialPhoneVerified: boolean;
}

export function CompleteForm({
  initialName,
  initialEmail,
  initialEmailVerified,
  initialPhone,
  initialPhoneVerified,
}: Props) {
  const [step, setStep] = useState<"details" | "verify">("details");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [done, setDone] = useState(false);

  const [email, setEmail] = useState(initialEmail);
  const [timezone, setTimezone] = useState("Europe/London");
  const [emailReminders, setEmailReminders] = useState(true);
  const [wantsWhatsapp, setWantsWhatsapp] = useState(initialPhone.trim().length > 0);
  const [dialCode, setDialCode] = useState("+1");
  const [phoneNumber, setPhoneNumber] = useState("");

  const [hasPhone, setHasPhone] = useState(initialPhone.trim().length > 0);

  const [emailOtp, setEmailOtp] = useState("");
  const [emailVerified, setEmailVerified] = useState(initialEmailVerified);
  const [emailVerifying, setEmailVerifying] = useState(false);
  const [emailError, setEmailError] = useState("");

  const [whatsappOtp, setWhatsappOtp] = useState("");
  const [phoneVerified, setPhoneVerified] = useState(initialPhoneVerified);
  const [phoneVerifying, setPhoneVerifying] = useState(false);
  const [phoneError, setPhoneError] = useState("");

  const [skipPhoneChecked, setSkipPhoneChecked] = useState(false);
  const [skipUnlockIn, setSkipUnlockIn] = useState(SKIP_UNLOCK_SECONDS);

  const [finishing, setFinishing] = useState(false);
  const [finishError, setFinishError] = useState("");

  useEffect(() => {
    let detected = detectTimezone();
    if (detected === "Asia/Calcutta") detected = "Asia/Kolkata";
    if (TIMEZONES.some((tz) => tz.value === detected)) {
      setTimezone(detected);
    }
  }, []);

  // Countdown for the "verify this later" checkbox. Only runs once we're on
  // the verify step with a phone present and not yet verified.
  useEffect(() => {
    if (step !== "verify" || !hasPhone || phoneVerified) return;
    if (skipUnlockIn <= 0) return;

    const t = setTimeout(() => setSkipUnlockIn((s) => s - 1), 1000);
    return () => clearTimeout(t);
  }, [step, hasPhone, phoneVerified, skipUnlockIn]);

  // Warn on tab close while setup is genuinely unfinished. The handler is
  // held in a ref so we can detach it synchronously right before our own
  // deliberate navigation — a state update would not have flushed in time.
  const unloadHandlerRef = useRef<((e: BeforeUnloadEvent) => void) | null>(null);

  useEffect(() => {
    if (done) return;

    function handler(e: BeforeUnloadEvent) {
      e.preventDefault();
      e.returnValue = "";
    }

    unloadHandlerRef.current = handler;
    window.addEventListener("beforeunload", handler);

    return () => {
      window.removeEventListener("beforeunload", handler);
      unloadHandlerRef.current = null;
    };
  }, [done]);

  function detachUnloadGuard() {
    if (unloadHandlerRef.current) {
      window.removeEventListener("beforeunload", unloadHandlerRef.current);
      unloadHandlerRef.current = null;
    }
  }

  async function handleDetailsSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");

    let phone = "";
    if (wantsWhatsapp) {
      const digits = phoneNumber.replace(/\D/g, "");
      if (digits.length < 7 || digits.length > 15) {
        setError("Enter a valid mobile number, 7 to 15 digits, without the country code.");
        return;
      }
      phone = dialCode + digits;
    }

    setLoading(true);
    try {
      const res = await fetch("/api/enroll/complete", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: "send-otp",
          email,
          timezone,
          phone,
          emailReminders,
        }),
      });
      const data = await res.json();
      if (!data.ok) {
        setError(data.error ?? "Something went wrong. Try again.");
      } else {
        track("profile_setup_started");
        setHasPhone(data.hasPhone);
        if (data.emailAlreadyVerified) setEmailVerified(true);
        if (data.phoneAlreadyVerified) setPhoneVerified(true);
        setStep("verify");
      }
    } catch {
      setError("Network error. Try again.");
    } finally {
      setLoading(false);
    }
  }

  async function handleVerifyEmail() {
    setEmailError("");
    setEmailVerifying(true);
    try {
      const res = await fetch("/api/enroll/complete", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "verify-email", emailOtp }),
      });
      const data = await res.json();
      if (!data.ok) {
        setEmailError(data.error ?? "Incorrect or expired code.");
      } else {
        setEmailVerified(true);
      }
    } catch {
      setEmailError("Network error. Try again.");
    } finally {
      setEmailVerifying(false);
    }
  }

  async function handleVerifyPhone() {
    setPhoneError("");
    setPhoneVerifying(true);
    try {
      const res = await fetch("/api/enroll/complete", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "verify-phone", whatsappOtp }),
      });
      const data = await res.json();
      if (!data.ok) {
        setPhoneError(data.error ?? "Incorrect or expired code.");
      } else {
        setPhoneVerified(true);
      }
    } catch {
      setPhoneError("Network error. Try again.");
    } finally {
      setPhoneVerifying(false);
    }
  }

  async function handleFinish() {
    setFinishError("");
    setFinishing(true);
    try {
      const res = await fetch("/api/enroll/complete", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "finish" }),
      });
      const data = await res.json();
      if (!data.ok) {
        setFinishError(data.error ?? "Could not finish setup. Try again.");
        setFinishing(false);
        return;
      }
      setDone(true);
      track("profile_completed");

      // Detach synchronously, before navigating. Relying on the effect
      // cleanup would be too late — the browser starts unloading first.
      detachUnloadGuard();

      window.location.href = data.redirectTo ?? "/progress";
    } catch {
      setFinishError("Network error. Try again.");
      setFinishing(false);
    }
  }

  // email only: emailVerified
  // email + phone: emailVerified AND (phoneVerified OR skipPhoneChecked)
  const canFinish =
    emailVerified && (!hasPhone || phoneVerified || skipPhoneChecked);

  const skipCheckboxUnlocked = phoneVerified || skipUnlockIn <= 0;

  const inputCls =
    "h-11 border-white/25 bg-white/[0.09] text-[15px] text-white placeholder:text-neutral-400 focus-visible:ring-[#FF3B3B]/60";
  const selectCls =
    "h-11 w-full rounded-md border border-white/25 bg-[#1B1B21] px-3 text-[15px] text-white focus:outline-none focus:ring-2 focus:ring-[#FF3B3B]";
  const labelCls = "mb-1.5 block text-[13px] font-medium text-[#E7E5E4]";
  const display = { fontFamily: "var(--font-display), Georgia, serif" };

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#121216] px-5 py-10 font-[family-name:var(--font-body),ui-sans-serif,system-ui]">
      <div className="w-full max-w-md rounded-xl border border-white/12 bg-[#1B1B21] px-7 py-7">

        <p className="mb-2 text-[11px] font-semibold uppercase tracking-[0.18em] text-[#FFA8A2]">
          Payment received
        </p>
        <h1 style={display} className="mb-2 text-[28px] leading-tight text-white">
          Finish setting up your access
        </h1>
        <p className="mb-6 text-[14px] leading-relaxed text-[#D6D3D1]">
          You are enrolled, {initialName}. One last step so we can send your
          calendar invite and daily lessons to the right place.
        </p>

        {step === "details" && (
          <form onSubmit={handleDetailsSubmit} className="space-y-4">
            <div>
              <label className={labelCls}>Your email</label>
              <Input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className={inputCls}
              />
              <p className="mt-1.5 text-[12px] leading-relaxed text-[#B9B4B2]">
                This is where your lessons and login codes go. Correct it here if
                there is a typo.
              </p>
            </div>

            <div>
              <label className={labelCls}>Your timezone</label>
              <select
                value={timezone}
                onChange={(e) => setTimezone(e.target.value)}
                className={selectCls}
              >
                {TIMEZONES.map((tz) => (
                  <option key={tz.value} value={tz.value}>{tz.label}</option>
                ))}
              </select>
            </div>

            <div className="space-y-2.5 pt-0.5">
              <label className="flex cursor-pointer items-start gap-2.5">
                <input
                  type="checkbox"
                  checked={emailReminders}
                  onChange={(e) => setEmailReminders(e.target.checked)}
                  className="mt-0.5 h-4 w-4 shrink-0 rounded accent-[#FF3B3B]"
                />
                <span className="text-[13.5px] leading-snug text-[#E7E5E4]">
                  Email me in the evening if the lesson is unopened
                </span>
              </label>

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
                <span className="text-[13.5px] leading-snug text-[#E7E5E4]">
                  Also send lesson reminders on WhatsApp
                </span>
              </label>
            </div>

            {wantsWhatsapp && (
              <div>
                <label className={labelCls}>WhatsApp number</label>

                <div className="flex items-stretch gap-2">
                  <select
                    value={dialCode}
                    onChange={(e) => setDialCode(e.target.value)}
                    className="h-11 shrink-0 rounded-md border border-white/25 bg-[#1B1B21] px-2 text-[15px] text-white focus:outline-none focus:ring-2 focus:ring-[#FF3B3B]"
                    style={{ width: "104px", flexBasis: "104px" }}
                  >
                    {COUNTRY_CODES.map((c) => (
                      <option key={c.code} value={c.code}>{c.label}</option>
                    ))}
                  </select>

                  <input
                    type="tel"
                    inputMode="tel"
                    autoComplete="tel-national"
                    placeholder="612 345 678"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value.replace(/[^\d\s\-]/g, ""))}
                    required={wantsWhatsapp}
                    style={{ flex: "1 1 0%", minWidth: 0 }}
                    className="h-11 rounded-md border border-white/25 bg-white/[0.09] px-3 text-[15px] text-white placeholder:text-neutral-400 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#FF3B3B]/60"
                  />
                </div>

                <p className="mt-1.5 text-[12px] leading-relaxed text-[#B9B4B2]">
                  We&apos;ll save this number either way. Verifying it now is
                  optional, you can also verify it later in your preferences.
                </p>
              </div>
            )}

            {error && <p className="text-[13px] text-[#ff8a82]">{error}</p>}

            <Button
              type="submit"
              className="h-12 w-full bg-[#E0233F] text-[15px] font-semibold hover:bg-[#FF3B3B]"
              disabled={loading}
            >
              {loading ? "Sending code..." : "Send my verification code"}
            </Button>
          </form>
        )}

        {step === "verify" && (
          <div className="space-y-6">
            {/* Email verification — mandatory */}
            <div>
              <label className={labelCls}>Email code</label>
              <p className="mb-2 text-[12.5px] leading-relaxed text-[#B9B4B2]">
                Sent to {email}.
              </p>
              <div className="flex gap-2">
                <Input
                  type="text"
                  inputMode="numeric"
                  placeholder="123456"
                  maxLength={6}
                  value={emailOtp}
                  onChange={(e) => setEmailOtp(e.target.value.replace(/\D/g, ""))}
                  disabled={emailVerified}
                  autoFocus
                  className={inputCls + " flex-1"}
                />
                <Button
                  type="button"
                  onClick={handleVerifyEmail}
                  disabled={emailVerified || emailVerifying || emailOtp.length < 4}
                  className="h-11 shrink-0 bg-[#E0233F] px-5 text-[14px] font-semibold hover:bg-[#FF3B3B] disabled:bg-white/10 disabled:text-[#8F8A87]"
                >
                  {emailVerified ? "Verified ✓" : emailVerifying ? "Checking..." : "Verify"}
                </Button>
              </div>
              {emailError && <p className="mt-2 text-[13px] text-[#ff8a82]">{emailError}</p>}
            </div>

            {/* Phone verification — optional */}
            {hasPhone && (
              <div>
                <label className={labelCls}>SMS code</label>
                <p className="mb-2 text-[12.5px] leading-relaxed text-[#B9B4B2]">
                  Sent by SMS to your number.
                </p>
                <div className="flex gap-2">
                  <Input
                    type="text"
                    inputMode="numeric"
                    placeholder="123456"
                    maxLength={6}
                    value={whatsappOtp}
                    onChange={(e) => setWhatsappOtp(e.target.value.replace(/\D/g, ""))}
                    disabled={phoneVerified}
                    className={inputCls + " flex-1"}
                  />
                  <Button
                    type="button"
                    onClick={handleVerifyPhone}
                    disabled={phoneVerified || phoneVerifying || whatsappOtp.length < 4}
                    className="h-11 shrink-0 bg-[#E0233F] px-5 text-[14px] font-semibold hover:bg-[#FF3B3B] disabled:bg-white/10 disabled:text-[#8F8A87]"
                  >
                    {phoneVerified ? "Verified ✓" : phoneVerifying ? "Checking..." : "Verify"}
                  </Button>
                </div>
                {phoneError && <p className="mt-2 text-[13px] text-[#ff8a82]">{phoneError}</p>}

                {!phoneVerified && (
                  <label
                    className={
                      "mt-3 flex items-start gap-2.5 " +
                      (skipCheckboxUnlocked ? "cursor-pointer" : "cursor-not-allowed opacity-60")
                    }
                  >
                    <input
                      type="checkbox"
                      checked={skipPhoneChecked}
                      disabled={!skipCheckboxUnlocked}
                      onChange={(e) => setSkipPhoneChecked(e.target.checked)}
                      className="mt-0.5 h-4 w-4 shrink-0 rounded accent-[#FF3B3B]"
                    />
                    <span className="text-[12.5px] leading-snug text-[#D6D3D1]">
                      {skipCheckboxUnlocked
                        ? "Verify this later instead, from my preferences"
                        : "Verify this later instead (unlocks in " + skipUnlockIn + "s)"}
                    </span>
                  </label>
                )}
              </div>
            )}

            <div>
              <Button
                type="button"
                onClick={handleFinish}
                disabled={!canFinish || finishing}
                className="h-12 w-full bg-[#E0233F] text-[15px] font-semibold hover:bg-[#FF3B3B] disabled:bg-white/10 disabled:text-[#8F8A87]"
              >
                {finishing ? "Finishing..." : "Continue to the course"}
              </Button>
              {finishError && <p className="mt-2 text-[13px] text-[#ff8a82]">{finishError}</p>}
            </div>

            <button
              type="button"
              onClick={() => {
                setStep("details");
                setEmailOtp("");
                setWhatsappOtp("");
                setEmailError("");
                setPhoneError("");
              }}
              className="w-full text-center text-[13px] text-[#A8A29E] hover:text-white hover:underline"
            >
              Wrong email? Go back and change it
            </button>

            <p className="text-center text-[12px] leading-relaxed text-[#8F8A87]">
              Code not arriving? Check your spam folder, it usually lands there.
            </p>
          </div>
        )}

      </div>
    </div>
  );
}