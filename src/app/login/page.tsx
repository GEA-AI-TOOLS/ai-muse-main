"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

type Step = "email" | "otp" | "devices";

interface ActiveSession {
  id: string;
  device_label: string;
  last_seen_at: string;
}

export default function LoginPage() {
  const [step, setStep] = useState<Step>("email");
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [activeSessions, setActiveSessions] = useState<ActiveSession[]>([]);
  const [removingId, setRemovingId] = useState<string | null>(null);

  const isNewDevice =
    typeof window !== "undefined" &&
    new URLSearchParams(window.location.search).get("reason") === "new-device";

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
      if (!data.ok) {
        setError(data.error ?? "Something went wrong. Try again.");
      } else {
        setStep("otp");
      }
    } catch {
      setError("Network error. Check your connection.");
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
        setError(data.error ?? "Incorrect or expired code. Try again.");
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

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="w-full max-w-sm">

        <div className="mb-8 flex items-center gap-2">
          <div className="flex h-7 w-7 items-center justify-center rounded bg-[#E24B4A] text-sm font-medium text-white">
            M
          </div>
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
              {error && <p className="text-xs text-destructive">{error}</p>}
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
            <p className="mb-6 text-sm text-muted-foreground">
              {"We sent a 6-digit code to " + email + ". It expires in 10 minutes."}
            </p>
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
              />
              {error && <p className="text-xs text-destructive">{error}</p>}
              <Button
                type="submit"
                className="w-full bg-[#E24B4A] hover:bg-[#c73f3e]"
                disabled={loading}
              >
                {loading ? "Verifying..." : "Continue"}
              </Button>
              <button
                type="button"
                onClick={() => {
                  setStep("email");
                  setOtp("");
                  setError("");
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