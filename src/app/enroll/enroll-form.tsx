"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

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

function detectTimezone(): string {
  try {
    return Intl.DateTimeFormat().resolvedOptions().timeZone;
  } catch {
    return "Europe/London";
  }
}

// Validate phone number is E.164 compatible (digits only, 7-15 digits)
function validatePhoneNumber(dialCode: string, number: string): string | null {
  const digits = number.replace(/\D/g, "");
  if (digits.length < 7 || digits.length > 15) {
    return "Enter a valid phone number (7–15 digits).";
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

  // Form fields
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [wantsWhatsapp, setWantsWhatsapp] = useState(false);
  const [dialCode, setDialCode] = useState("+1");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [timezone, setTimezone] = useState(detectTimezone());

  // OTP fields
  const [emailOtp, setEmailOtp] = useState("");
  const [whatsappOtp, setWhatsappOtp] = useState("");
  const [hasPhone, setHasPhone] = useState(false);

  async function handleFormSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");

    let phone = "";
    if (wantsWhatsapp) {
      const phoneError = validatePhoneNumber(dialCode, phoneNumber);
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
        body: JSON.stringify({ name, email, phone, timezone }),
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

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="w-full max-w-sm">

        <div className="mb-8 flex items-center gap-2">
          <img src="/assets/site-icon.png" alt="AI Muse" className="h-7 w-7 rounded object-contain" />
          <span className="text-sm font-medium">Make AI Your Muse</span>
        </div>

        {/* Step indicator */}
        <div className="mb-6 flex items-center gap-2">
          <div className={
            "flex h-5 w-5 items-center justify-center rounded-full text-[10px] font-medium " +
            (step === "form" ? "bg-[#E24B4A] text-white" : "bg-[#E24B4A] text-white")
          }>
            {step === "verify" ? "✓" : "1"}
          </div>
          <div className="h-px flex-1 bg-border" />
          <div className={
            "flex h-5 w-5 items-center justify-center rounded-full text-[10px] font-medium " +
            (step === "verify" ? "bg-[#E24B4A] text-white" : "border border-border text-muted-foreground")
          }>
            2
          </div>
          <div className="h-px flex-1 bg-border" />
          <div className="flex h-5 w-5 items-center justify-center rounded-full border border-border text-[10px] font-medium text-muted-foreground">
            3
          </div>
        </div>

        {step === "form" && (
          <>
            <h1 className="mb-1 text-xl font-medium">Join the next cohort</h1>
            <p className="mb-6 text-sm text-muted-foreground">
              10 days. 10 minutes a day. One skill that changes how you work with AI.
            </p>
            <form onSubmit={handleFormSubmit} className="space-y-3">
              <div>
                <label className="mb-1 block text-xs text-muted-foreground">
                  Full name
                </label>
                <Input
                  type="text"
                  placeholder="Sarah Chen"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  autoFocus
                />
              </div>
              <div>
                <label className="mb-1 block text-xs text-muted-foreground">
                  Email
                </label>
                <Input
                  type="email"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>

              {/* WhatsApp checkbox */}
              <div className="rounded-md border bg-muted/20 px-4 py-3">
                <label className="flex items-start gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={wantsWhatsapp}
                    onChange={(e) => {
                      setWantsWhatsapp(e.target.checked);
                      if (!e.target.checked) setPhoneNumber("");
                    }}
                    className="mt-0.5 h-4 w-4 shrink-0 rounded border accent-[#E24B4A]"
                  />
                  <div>
                    <p className="text-sm font-medium">Get WhatsApp reminders</p>
                    <p className="mt-0.5 text-xs text-muted-foreground">
                      People who get a WhatsApp nudge are significantly more likely to finish. It takes 10 seconds to set up.
                    </p>
                  </div>
                </label>

                {wantsWhatsapp && (
                  <div className="mt-3 border-t pt-3">
                    <label className="mb-1.5 block text-xs text-muted-foreground">
                      WhatsApp number
                    </label>
                    <div className="flex gap-2">
                      <select
                        value={dialCode}
                        onChange={(e) => setDialCode(e.target.value)}
                        className="w-28 shrink-0 rounded-md border bg-background px-2 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-ring"
                      >
                        {COUNTRY_CODES.map((c) => (
                          <option key={c.code} value={c.code}>
                            {c.label}
                          </option>
                        ))}
                      </select>
                      <Input
                        type="tel"
                        placeholder="612 345 678"
                        value={phoneNumber}
                        onChange={(e) => setPhoneNumber(e.target.value.replace(/[^\d\s\-]/g, ""))}
                        required={wantsWhatsapp}
                      />
                    </div>
                    <p className="mt-1.5 text-xs text-muted-foreground">
                      Enter your number without the country code.
                    </p>
                  </div>
                )}
              </div>

              <div>
                <label className="mb-1 block text-xs text-muted-foreground">
                  Your timezone
                </label>
                <select
                  value={timezone}
                  onChange={(e) => setTimezone(e.target.value)}
                  className="w-full rounded-md border bg-background px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-ring"
                  required
                >
                  {TIMEZONES.map((tz) => (
                    <option key={tz.value} value={tz.value}>
                      {tz.label}
                    </option>
                  ))}
                </select>
              </div>

              <div className="rounded-md bg-muted/40 px-4 py-3 text-xs text-muted-foreground">
                You will receive daily lessons and reminders by email.
                {wantsWhatsapp
                  ? " WhatsApp reminders will also be sent to the number above."
                  : " Add a WhatsApp number above to also get reminders there."}
              </div>

              {error && (
                <p className="text-xs text-destructive">{error}</p>
              )}
              <Button
                type="submit"
                className="w-full bg-[#E24B4A] hover:bg-[#c73f3e]"
                disabled={loading}
              >
                {loading ? "Sending codes..." : "Continue"}
              </Button>
            </form>
            <p className="mt-4 text-center text-xs text-muted-foreground">
              Already enrolled?{" "}
              <a href="/login" className="underline">Log in</a>
            </p>
          </>
        )}

        {step === "verify" && (
          <>
            <h1 className="mb-1 text-xl font-medium">Verify your details</h1>
            <p className="mb-6 text-sm text-muted-foreground">
              {hasPhone
                ? "We sent codes to " + email + " and your WhatsApp number."
                : "We sent a code to " + email + "."}
            </p>
            <form onSubmit={handleVerifySubmit} className="space-y-4">
              <div>
                <label className="mb-1 block text-xs text-muted-foreground">
                  Email code
                </label>
                <Input
                  type="text"
                  inputMode="numeric"
                  placeholder="123456"
                  maxLength={6}
                  value={emailOtp}
                  onChange={(e) => setEmailOtp(e.target.value.replace(/\D/g, ""))}
                  required
                  autoFocus
                />
              </div>

              {hasPhone && (
                <div>
                  <label className="mb-1 block text-xs text-muted-foreground">
                    WhatsApp code
                  </label>
                  <Input
                    type="text"
                    inputMode="numeric"
                    placeholder="123456"
                    maxLength={6}
                    value={whatsappOtp}
                    onChange={(e) => setWhatsappOtp(e.target.value.replace(/\D/g, ""))}
                    required
                  />
                  <p className="mt-1.5 text-xs text-muted-foreground">
                    Check your WhatsApp messages.
                  </p>
                </div>
              )}

              {error && (
                <p className="text-xs text-destructive">{error}</p>
              )}

              <Button
                type="submit"
                className="w-full bg-[#E24B4A] hover:bg-[#c73f3e]"
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
                className="w-full text-center text-xs text-muted-foreground hover:underline"
              >
                Go back and edit details
              </button>
            </form>
          </>
        )}

      </div>
    </div>
  );
}