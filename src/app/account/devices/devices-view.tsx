"use client";

import { useState } from "react";

interface Session {
  id: string;
  session_token: string;
  device_label: string;
  last_seen_at: string;
  created_at: string;
}

interface Props {
  sessions: Session[];
  currentToken: string;
}

export function DevicesView({ sessions: initial, currentToken }: Props) {
  const [sessions, setSessions] = useState(initial);
  const [removing, setRemoving] = useState<string | null>(null);

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

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b">
        <div className="mx-auto flex max-w-2xl items-center px-8 py-4">
          <a href="/progress" className="flex items-center gap-2 hover:opacity-80">
            <div className="flex h-6 w-6 items-center justify-center rounded bg-[#E24B4A] text-xs font-medium text-white">
              M
            </div>
            <span className="text-sm font-medium">Make AI Your Muse</span>
          </a>
        </div>
      </header>

      <main className="mx-auto max-w-2xl px-8 py-10">
        <h1 className="mb-1 text-2xl font-medium">Logged-in devices</h1>
        <p className="mb-2 text-sm text-muted-foreground">
          You can be logged in on up to 5 devices at a time.
        </p>
        <p className="mb-8 text-sm text-muted-foreground">
          Remove a device to log it out immediately.
        </p>

        <div className="divide-y rounded-md border">
          {sessions.length === 0 && (
            <p className="px-5 py-4 text-sm text-muted-foreground">
              No active sessions found.
            </p>
          )}
          {sessions.map((session) => {
            const isCurrent = session.session_token === currentToken;
            return (
              <div
                key={session.id}
                className="flex items-center justify-between px-5 py-4"
              >
                <div>
                  <div className="flex items-center gap-2">
                    <p className="text-sm font-medium">
                      {session.device_label ?? "Unknown device"}
                    </p>
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

        <p className="mt-6 text-xs text-muted-foreground">
          Removing this device will log you out and redirect you to log in again.
        </p>
      </main>
    </div>
  );
}