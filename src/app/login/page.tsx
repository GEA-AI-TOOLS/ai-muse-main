"use client";

import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

type Step = "email" | "otp" | "devices";

interface ActiveSession {
  id: string;
  device_label: string;
  last_seen_at: string;
}

const OTP_EXPIRY_SECONDS = 600; // 10 minutes
const MAX_OTP_ATTEMPTS = 5;
const RESEND_COOLDOWN_SECONDS = 30;

export default function LoginPage() {
  const [step, setStep] = useState<Step>("email");
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [activeSessions, setActiveSessions] = useState<ActiveSession[]>([]);
  const [removingId, setRemovingId] = useState<string | null>(null);

  // OTP timer state
  const [otpSecondsLeft, setOtpSecondsLeft] = useState(OTP_EXPIRY_SECONDS);
  const [resendCooldown, setResendCooldown] = useState(0);
  const [otpAttempts, setOtpAttempts] = useState(0);
  const [lockedUntil, setLockedUntil] = useState<number | null>(null);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const resendRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const [isNewDevice, setIsNewDevice] = useState(false);

  useEffect(() => {
    setIsNewDevice(
      new URLSearchParams(window.location.search).get("reason") === "new-device"
    );
  }, []);

  // OTP countdown timer
  useEffect(() => {
    if (step !== "otp") return;
    setOtpSecondsLeft(OTP_EXPIRY_SECONDS);
    timerRef.current = setInterval(() => {
      setOtpSecondsLeft((s) => {
        if (s <= 1) {
          clearInterval(timerRef.current!);
          return 0;
        }
        return s - 1;
      });
    }, 1000);
    return () => clearInterval(timerRef.current!);
  }, [step]);

  function formatTimer(seconds: number): string {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return String(m) + ":" + String(s).padStart(2, "0");
  }

  function startResendCooldown() {
    setResendCooldown(RESEND_COOLDOWN_SECONDS);
    resendRef.current = setInterval(() => {
      setResendCooldown((s) => {
        if (s <= 1) {
          clearInterval(resendRef.current!);
          return 0;
        }
        return s - 1;
      });
    }, 1000);
  }

  async function handleEmailSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const res = await fetch("/api/auth/otp/request", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const data = await res.json();
      if (data.notEnrolled) {
        setError("notEnrolled");
      } else if (data.revoked) {
        setError("revoked");
      } else if (!data.ok) {
        setError(data.error ?? "Something went wrong. Try again.");
      } else {
        setOtpAttempts(0);
        setLockedUntil(null);
        setStep("otp");
        startResendCooldown();
      }
    } catch {
      setError("Network error. Check your connection.");
    } finally {
      setLoading(false);
    }
  }

  async function handleResend() {
    if (resendCooldown > 0) return;
    setError("");
    setLoading(true);
    try {
      const res = await fetch("/api/auth/otp/request", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const data = await res.json();
      if (data.ok) {
        setOtp("");
        setOtpSecondsLeft(OTP_EXPIRY_SECONDS);
        clearInterval(timerRef.current!);
        timerRef.current = setInterval(() => {
          setOtpSecondsLeft((s) => {
            if (s <= 1) { clearInterval(timerRef.current!); return 0; }
            return s - 1;
          });
        }, 1000);
        startResendCooldown();
      } else {
        setError(data.error ?? "Failed to resend. Try again.");
      }
    } catch {
      setError("Network error. Try again.");
    } finally {
      setLoading(false);
    }
  }

  async function submitOtp(removeSessionId?: string) {
    setError("");
    setLoading(true);
    try {
      const res = await fetch("/api/auth/otp/verify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          otp,
          removeSessionId: removeSessionId ?? null,
        }),
      });
      const data = await res.json();

      if (data.deviceCapReached) {
        setActiveSessions(data.sessions ?? []);
        setStep("devices");
      } else if (!data.ok) {
        const newAttempts = otpAttempts + 1;
        setOtpAttempts(newAttempts);

        if (newAttempts >= MAX_OTP_ATTEMPTS) {
          // Lock for 10 minutes
          const until = Date.now() + 10 * 60 * 1000;
          setLockedUntil(until);
          setError("locked");
        } else {
          const remaining = MAX_OTP_ATTEMPTS - newAttempts;
          setError(
            "Incorrect code. " + String(remaining) + " attempt" + (remaining === 1 ? "" : "s") + " remaining."
          );
        }
      } else {
        await new Promise((r) => setTimeout(r, 100));
        window.location.href = data.redirectTo ?? "/today";
      }
    } catch {
      setError("Network error. Check your connection.");
    } finally {
      setLoading(false);
    }
  }

  async function handleOtpSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (otpSecondsLeft === 0) {
      setError("expired");
      return;
    }
    if (lockedUntil && Date.now() < lockedUntil) {
      setError("locked");
      return;
    }
    await submitOtp();
  }

  async function handleRemoveAndLogin(sessionId: string) {
    setRemovingId(sessionId);
    await submitOtp(sessionId);
    setRemovingId(null);
  }

  function formatDate(iso: string): string {
    return new Date(iso).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  }

  function getLockMinutesLeft(): number {
    if (!lockedUntil) return 0;
    return Math.ceil((lockedUntil - Date.now()) / 60000);
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="w-full max-w-sm">

        <div className="mb-8 flex items-center gap-2">
          <img src="/assets/site-icon.png" alt="AI Muse" className="h-7 w-7 rounded object-contain" />
          <span className="text-sm font-medium">Make AI Your Muse</span>
        </div>

        {step === "email" && (
          <>
            <h1 className="mb-1 text-xl font-medium">Welcome back</h1>
            <p className="mb-6 text-sm text-muted-foreground">
              Enter the email you enrolled with.
            </p>

            {isNewDevice && (
              <div className="mb-6 rounded-md border bg-muted/40 px-4 py-3 text-sm text-muted-foreground">
                Looks like a new browser or device. Log in again to continue.
              </div>
            )}

            <form onSubmit={handleEmailSubmit} className="space-y-3">
              <Input
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                autoFocus
              />

              {error === "notEnrolled" && (
                <div className="rounded-md border bg-muted/40 px-4 py-3 text-sm text-muted-foreground">
                  {"This email is not enrolled. "}
                  <a href="/enroll" className="text-[#E24B4A] underline hover:opacity-80">
                    Enroll now →
                  </a>
                </div>
              )}

              {error === "revoked" && (
                <div className="rounded-md border border-destructive/30 bg-destructive/5 px-4 py-3 text-sm text-destructive">
                  {"Your access has been revoked. "}
                  <a
                    href="mailto:support.muse@bryancassady.com"
                    className="underline hover:opacity-80"
                  >
                    Contact support
                  </a>
                  {" for help."}
                </div>
              )}

              {error && error !== "notEnrolled" && error !== "revoked" && (
                <p className="text-xs text-destructive">{error}</p>
              )}

              <Button
                type="submit"
                className="w-full bg-[#E24B4A] hover:bg-[#c73f3e]"
                disabled={loading}
              >
                {loading ? "Sending..." : "Send code"}
              </Button>
            </form>
          </>
        )}

        {step === "otp" && (
          <>
            <h1 className="mb-1 text-xl font-medium">Check your email</h1>
            <p className="mb-2 text-sm text-muted-foreground">
              {"We sent a 6-digit code to " + email + "."}
            </p>

            {/* Timer */}
            {otpSecondsLeft > 0 && error !== "locked" && (
              <p className="mb-4 text-xs text-muted-foreground">
                {"Code expires in "}
                <span className={otpSecondsLeft < 60 ? "text-destructive font-medium" : ""}>
                  {formatTimer(otpSecondsLeft)}
                </span>
              </p>
            )}

            <form onSubmit={handleOtpSubmit} className="space-y-3">
              <Input
                type="text"
                inputMode="numeric"
                placeholder="123456"
                maxLength={6}
                value={otp}
                onChange={(e) => setOtp(e.target.value.replace(/\D/g, ""))}
                required
                autoFocus
                disabled={otpSecondsLeft === 0 || error === "locked"}
              />

              {/* Expired state */}
              {(otpSecondsLeft === 0 || error === "expired") && error !== "locked" && (
                <div className="rounded-md border bg-muted/40 px-4 py-3 text-sm text-muted-foreground">
                  Your code has expired.{" "}
                  <button
                    type="button"
                    onClick={handleResend}
                    className="text-[#E24B4A] underline hover:opacity-80"
                  >
                    Request a new one
                  </button>
                </div>
              )}

              {/* Locked state */}
              {error === "locked" && (
                <div className="rounded-md border border-destructive/30 bg-destructive/5 px-4 py-3 text-sm text-destructive">
                  {"Too many incorrect attempts. Try again in " + String(getLockMinutesLeft()) + " minute" + (getLockMinutesLeft() === 1 ? "" : "s") + "."}
                </div>
              )}

              {/* Regular error */}
              {error && error !== "locked" && error !== "expired" && otpSecondsLeft > 0 && (
                <p className="text-xs text-destructive">{error}</p>
              )}

              <Button
                type="submit"
                className="w-full bg-[#E24B4A] hover:bg-[#c73f3e]"
                disabled={loading || otpSecondsLeft === 0 || error === "locked"}
              >
                {loading ? "Verifying..." : "Continue"}
              </Button>

              {/* Resend button — only when timer still running and not locked */}
              {otpSecondsLeft > 0 && error !== "locked" && (
                <button
                  type="button"
                  onClick={handleResend}
                  disabled={resendCooldown > 0 || loading}
                  className="w-full text-center text-xs text-muted-foreground hover:underline disabled:opacity-50 disabled:no-underline"
                >
                  {resendCooldown > 0
                    ? "Resend code in " + String(resendCooldown) + "s"
                    : "Resend code"}
                </button>
              )}

              <button
                type="button"
                onClick={() => {
                  setStep("email");
                  setOtp("");
                  setError("");
                  setOtpAttempts(0);
                  setLockedUntil(null);
                  clearInterval(timerRef.current!);
                  clearInterval(resendRef.current!);
                }}
                className="w-full text-center text-xs text-muted-foreground hover:underline"
              >
                Use a different email
              </button>
            </form>
          </>
        )}

        {step === "devices" && (
          <>
            <h1 className="mb-1 text-xl font-medium">Too many devices</h1>
            <p className="mb-6 text-sm text-muted-foreground">
              You are logged in on 5 devices. Remove one to log in here.
            </p>

            <div className="mb-4 divide-y rounded-md border">
              {activeSessions.map((session) => (
                <div
                  key={session.id}
                  className="flex items-center justify-between px-4 py-3"
                >
                  <div>
                    <p className="text-sm font-medium">
                      {session.device_label ?? "Unknown device"}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {"Last active " + formatDate(session.last_seen_at)}
                    </p>
                  </div>
                  <button
                    onClick={() => handleRemoveAndLogin(session.id)}
                    disabled={loading}
                    className={
                      "text-xs font-medium text-[#E24B4A] hover:underline disabled:opacity-50 " +
                      (removingId === session.id ? "opacity-50" : "")
                    }
                  >
                    {removingId === session.id ? "Removing..." : "Remove"}
                  </button>
                </div>
              ))}
            </div>

            {error && <p className="mb-3 text-xs text-destructive">{error}</p>}

            <p className="text-xs text-muted-foreground">
              Removing a device logs it out immediately. Once removed, you will
              be logged in on this device automatically.
            </p>
          </>
        )}

      </div>
    </div>
  );
}