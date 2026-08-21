"use client";

import { useState } from "react";

interface Session {
  id: string;
  session_token: string;
  device_label: string;
  last_seen_at: string;
  created_at: string;
}

interface ParticipantPrefs {
  name: string;
  email: string;
  phone: string;
  phoneVerified: boolean;
  emailReminders: boolean;
  whatsappReminders: boolean;
}

interface Props {
  participant: ParticipantPrefs;
  sessions: Session[];
  currentToken: string;
}

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

function buildE164(dialCode: string, number: string): string {
  const digits = number.replace(/\D/g, "");
  return dialCode + digits;
}

export function PreferencesView({ participant, sessions: initialSessions, currentToken }: Props) {
  const [sessions, setSessions] = useState(initialSessions);
  const [removing, setRemoving] = useState<string | null>(null);

  const [emailReminders, setEmailReminders] = useState(participant.emailReminders);
  const [whatsappReminders, setWhatsappReminders] = useState(participant.whatsappReminders);
  const [savingPrefs, setSavingPrefs] = useState(false);
  const [prefsMsg, setPrefsMsg] = useState("");

  const [phoneVerified, setPhoneVerified] = useState(participant.phoneVerified);
  const [phoneOnFile, setPhoneOnFile] = useState(participant.phone);

  const hasUnverifiedPhone = !participant.phoneVerified && participant.phone.trim().length > 0;

  const [showPhoneForm, setShowPhoneForm] = useState(false);
  const [phoneStep, setPhoneStep] = useState<"enter" | "verify">("enter");
  const [dialCode, setDialCode] = useState(
    COUNTRY_CODES.find((c) => participant.phone.startsWith(c.code))?.code ?? "+1"
  );
  const [phoneNumber, setPhoneNumber] = useState(
    hasUnverifiedPhone
      ? participant.phone.replace(
          COUNTRY_CODES.find((c) => participant.phone.startsWith(c.code))?.code ?? "",
          ""
        )
      : ""
  );
  const [phoneOtp, setPhoneOtp] = useState("");
  const [phoneLoading, setPhoneLoading] = useState(false);
  const [phoneError, setPhoneError] = useState("");

  function formatDate(iso: string): string {
    return new Date(iso).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  }

  async function handleRemove(sessionId: string, isCurrentDevice: boolean) {
    setRemoving(sessionId);
    try {
      const res = await fetch("/api/account/devices/remove", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ sessionId }),
      });
      const data = await res.json();
      if (data.ok) {
        if (isCurrentDevice) {
          window.location.href = "/login";
        } else {
          setSessions((prev) => prev.filter((s) => s.id !== sessionId));
        }
      }
    } finally {
      setRemoving(null);
    }
  }

  async function handleSavePrefs(nextEmail: boolean, nextWhatsapp: boolean) {
    setSavingPrefs(true);
    setPrefsMsg("");
    try {
      const res = await fetch("/api/account/preferences/update", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          emailReminders: nextEmail,
          whatsappReminders: nextWhatsapp,
        }),
      });
      const data = await res.json();
      if (data.ok) {
        setPrefsMsg("Saved");
        setTimeout(() => setPrefsMsg(""), 2000);
      } else {
        setPrefsMsg(data.error ?? "Could not save. Try again.");
      }
    } catch {
      setPrefsMsg("Network error. Try again.");
    } finally {
      setSavingPrefs(false);
    }
  }

  function toggleEmailReminders() {
    const next = !emailReminders;
    setEmailReminders(next);
    handleSavePrefs(next, whatsappReminders);
  }

  function toggleWhatsappReminders() {
    if (!phoneVerified) return;
    const next = !whatsappReminders;
    setWhatsappReminders(next);
    handleSavePrefs(emailReminders, next);
  }

  async function handleSendPhoneOtp(e: React.FormEvent) {
    e.preventDefault();
    setPhoneError("");
    const digits = phoneNumber.replace(/\D/g, "");
    if (digits.length < 7 || digits.length > 15) {
      setPhoneError("Enter a valid phone number (7–15 digits).");
      return;
    }
    setPhoneLoading(true);
    try {
      const res = await fetch("/api/account/phone/verify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "send", phone: buildE164(dialCode, phoneNumber) }),
      });
      const data = await res.json();
      if (data.ok) {
        setPhoneStep("verify");
      } else {
        setPhoneError(data.error ?? "Could not send code. Try again.");
      }
    } catch {
      setPhoneError("Network error. Try again.");
    } finally {
      setPhoneLoading(false);
    }
  }

  async function handleVerifyPhoneOtp(e: React.FormEvent) {
    e.preventDefault();
    setPhoneError("");
    setPhoneLoading(true);
    try {
      const res = await fetch("/api/account/phone/verify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: "check",
          phone: buildE164(dialCode, phoneNumber),
          otp: phoneOtp,
        }),
      });
      const data = await res.json();
      if (data.ok) {
        setPhoneVerified(true);
        setPhoneOnFile(buildE164(dialCode, phoneNumber));
        setWhatsappReminders(true);
        setShowPhoneForm(false);
        setPhoneStep("enter");
        handleSavePrefs(emailReminders, true);
      } else {
        setPhoneError(data.error ?? "Incorrect or expired code.");
      }
    } catch {
      setPhoneError("Network error. Try again.");
    } finally {
      setPhoneLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b">
        <div className="mx-auto flex max-w-2xl items-center px-8 py-4">
          <a href="/progress" className="flex items-center gap-2 hover:opacity-80">
            <img src="/assets/site-icon.png" alt="Disciplined AI" className="h-7 w-7 rounded object-contain" />
            <span className="text-sm font-medium">Disciplined AI</span>
          </a>
        </div>
      </header>

      <main className="mx-auto max-w-2xl px-8 py-10">
        <h1 className="mb-1 text-2xl font-medium">Preferences</h1>
        <p className="mb-8 text-sm text-muted-foreground">{participant.email}</p>

        {/* Reminders */}
        <section className="mb-10">
          <h2 className="mb-1 text-sm font-medium uppercase tracking-wide text-muted-foreground">
            Reminders
          </h2>
          <p className="mb-4 text-xs text-muted-foreground">
            You will always get the daily lesson email. These control the extra nudges.
          </p>

          <div className="divide-y rounded-md border">
            <div className="flex items-center justify-between gap-4 px-5 py-4">
              <div>
                <p className="text-sm font-medium">Evening email reminder</p>
                <p className="mt-0.5 text-xs text-muted-foreground">
                  One reminder if today&apos;s lesson is still unopened by evening.
                </p>
              </div>
              <button
                role="switch"
                aria-checked={emailReminders}
                onClick={toggleEmailReminders}
                disabled={savingPrefs}
                className={
                  "relative inline-flex h-6 w-11 shrink-0 items-center rounded-full transition-colors disabled:opacity-50 " +
                  (emailReminders ? "bg-[#E24B4A]" : "bg-muted-foreground/25")
                }
              >
                <span
                  className={
                    "inline-block h-4 w-4 transform rounded-full bg-white shadow transition-transform " +
                    (emailReminders ? "translate-x-6" : "translate-x-1")
                  }
                />
              </button>
            </div>

            {phoneVerified && (
              <div className="flex items-center justify-between gap-4 px-5 py-4">
                <div>
                  <p className="text-sm font-medium">WhatsApp reminder</p>
                  <p className="mt-0.5 text-xs text-muted-foreground">
                    Sent to {phoneOnFile}.
                  </p>
                </div>
                <button
                  role="switch"
                  aria-checked={whatsappReminders}
                  onClick={toggleWhatsappReminders}
                  disabled={savingPrefs}
                  className={
                    "relative inline-flex h-6 w-11 shrink-0 items-center rounded-full transition-colors disabled:opacity-50 " +
                    (whatsappReminders ? "bg-[#E24B4A]" : "bg-muted-foreground/25")
                  }
                >
                  <span
                    className={
                      "inline-block h-4 w-4 transform rounded-full bg-white shadow transition-transform " +
                      (whatsappReminders ? "translate-x-6" : "translate-x-1")
                    }
                  />
                </button>
              </div>
            )}
          </div>
          {prefsMsg && <p className="mt-2 text-xs text-muted-foreground">{prefsMsg}</p>}
        </section>

        {/* Add or verify WhatsApp number */}
        {!phoneVerified && (
          <section className="mb-10">
            <h2 className="mb-1 text-sm font-medium uppercase tracking-wide text-muted-foreground">
              WhatsApp reminders
            </h2>

            {!showPhoneForm && (
              <div className="rounded-md border bg-muted/30 px-5 py-4">
                <p className="mb-3 text-sm text-muted-foreground">
                  {hasUnverifiedPhone
                    ? "We have " + participant.phone + " on file but it isn't verified yet."
                    : "Add a number to get WhatsApp reminders alongside email."}
                </p>
                <button
                  onClick={() => setShowPhoneForm(true)}
                  className="rounded-md bg-[#E24B4A] px-4 py-2 text-xs font-medium text-white hover:bg-[#c73f3e]"
                >
                  {hasUnverifiedPhone ? "Verify this number" : "Add WhatsApp number"}
                </button>
              </div>
            )}

            {showPhoneForm && phoneStep === "enter" && (
              <form onSubmit={handleSendPhoneOtp} className="rounded-md border px-5 py-4">
                <label className="mb-1.5 block text-xs text-muted-foreground">WhatsApp number</label>
                <div className="flex gap-2">
                  <select
                    value={dialCode}
                    onChange={(e) => setDialCode(e.target.value)}
                    className="w-28 shrink-0 rounded-md border bg-background px-2 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-ring"
                  >
                    {COUNTRY_CODES.map((c) => (
                      <option key={c.code} value={c.code}>{c.label}</option>
                    ))}
                  </select>
                  <input
                    type="tel"
                    placeholder="612 345 678"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value.replace(/[^\d\s\-]/g, ""))}
                    required
                    className="flex-1 rounded-md border bg-background px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-ring"
                  />
                </div>
                {phoneError && <p className="mt-2 text-xs text-destructive">{phoneError}</p>}
                <div className="mt-3 flex gap-2">
                  <button
                    type="submit"
                    disabled={phoneLoading}
                    className="rounded-md bg-[#E24B4A] px-4 py-2 text-xs font-medium text-white hover:bg-[#c73f3e] disabled:opacity-50"
                  >
                    {phoneLoading ? "Sending..." : "Send code"}
                  </button>
                  <button
                    type="button"
                    onClick={() => { setShowPhoneForm(false); setPhoneError(""); }}
                    className="text-xs text-muted-foreground hover:underline"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            )}

            {showPhoneForm && phoneStep === "verify" && (
              <form onSubmit={handleVerifyPhoneOtp} className="rounded-md border px-5 py-4">
                <p className="mb-3 text-xs text-muted-foreground">
                  We sent a code by SMS to {buildE164(dialCode, phoneNumber)}. It can take a few minutes to arrive.
                </p>
                <label className="mb-1.5 block text-xs text-muted-foreground">Code</label>
                <input
                  type="text"
                  inputMode="numeric"
                  placeholder="123456"
                  maxLength={6}
                  value={phoneOtp}
                  onChange={(e) => setPhoneOtp(e.target.value.replace(/\D/g, ""))}
                  required
                  autoFocus
                  className="w-full rounded-md border bg-background px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-ring"
                />
                {phoneError && <p className="mt-2 text-xs text-destructive">{phoneError}</p>}
                <div className="mt-3 flex gap-2">
                  <button
                    type="submit"
                    disabled={phoneLoading}
                    className="rounded-md bg-[#E24B4A] px-4 py-2 text-xs font-medium text-white hover:bg-[#c73f3e] disabled:opacity-50"
                  >
                    {phoneLoading ? "Verifying..." : "Verify"}
                  </button>
                  <button
                    type="button"
                    onClick={() => setPhoneStep("enter")}
                    className="text-xs text-muted-foreground hover:underline"
                  >
                    Back
                  </button>
                </div>
              </form>
            )}
          </section>
        )}

        {/* Devices */}
        <section>
          <h2 className="mb-1 text-sm font-medium uppercase tracking-wide text-muted-foreground">
            Logged-in devices
          </h2>
          <p className="mb-4 text-xs text-muted-foreground">
            Up to 5 devices at a time. Remove one to log it out immediately.
          </p>

          <div className="divide-y rounded-md border">
            {sessions.length === 0 && (
              <p className="px-5 py-4 text-sm text-muted-foreground">No active sessions found.</p>
            )}
            {sessions.map((session) => {
              const isCurrent = session.session_token === currentToken;
              return (
                <div key={session.id} className="flex items-center justify-between px-5 py-4">
                  <div>
                    <div className="flex items-center gap-2">
                      <p className="text-sm font-medium">{session.device_label ?? "Unknown device"}</p>
                      {isCurrent && (
                        <span className="rounded bg-[#FCEBEB] px-2 py-0.5 text-[10px] font-medium text-[#A32D2D]">
                          This device
                        </span>
                      )}
                    </div>
                    <p className="mt-0.5 text-xs text-muted-foreground">
                      {"Last active " + formatDate(session.last_seen_at)}
                    </p>
                  </div>
                  <button
                    onClick={() => handleRemove(session.id, isCurrent)}
                    disabled={removing === session.id}
                    className="text-xs text-destructive hover:underline disabled:opacity-50"
                  >
                    {removing === session.id ? "Removing..." : "Remove"}
                  </button>
                </div>
              );
            })}
          </div>
        </section>
      </main>
    </div>
  );
}