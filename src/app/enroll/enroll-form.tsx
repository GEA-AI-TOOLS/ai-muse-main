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

function detectTimezone(): string {
  try {
    return Intl.DateTimeFormat().resolvedOptions().timeZone;
  } catch {
    return "Europe/London";
  }
}

export function EnrollForm() {
  const [step, setStep] = useState<Step>("form");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Form fields
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [timezone, setTimezone] = useState(detectTimezone());

  // OTP fields
  const [emailOtp, setEmailOtp] = useState("");
  const [whatsappOtp, setWhatsappOtp] = useState("");
  const [hasPhone, setHasPhone] = useState(false);

  async function handleFormSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
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
        // Both verified — create Stripe checkout session
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
          <div className="flex h-7 w-7 items-center justify-center rounded bg-[#E24B4A] text-sm font-medium text-white">
            M
          </div>
          <span className="text-sm font-medium">Make AI Your Muse</span>
        </div>

        {/* Step indicator */}
        <div className="mb-6 flex items-center gap-2">
          <div className={
            "flex h-5 w-5 items-center justify-center rounded-full text-[10px] font-medium " +
            (step === "form"
              ? "bg-[#E24B4A] text-white"
              : "bg-[#E24B4A] text-white")
          }>
            {step === "verify" ? "✓" : "1"}
          </div>
          <div className="h-px flex-1 bg-border" />
          <div className={
            "flex h-5 w-5 items-center justify-center rounded-full text-[10px] font-medium " +
            (step === "verify"
              ? "bg-[#E24B4A] text-white"
              : "border border-border text-muted-foreground")
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
              <div>
                <label className="mb-1 block text-xs text-muted-foreground">
                  WhatsApp number
                  <span className="ml-1 text-muted-foreground/60">(optional)</span>
                </label>
                <Input
                  type="tel"
                  placeholder="+1 234 567 8900"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                />
                {phone.trim().length > 0 && (
                  <p className="mt-1.5 text-xs text-muted-foreground">
                    You will receive daily lesson reminders on WhatsApp.
                  </p>
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
                {phone.trim().length > 0
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