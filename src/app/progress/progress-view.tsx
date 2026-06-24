"use client";

import { Separator } from "@/components/ui/separator";
import type { Participant } from "@/lib/types";
import { useState, useEffect } from "react";
import { TrackerBar } from "@/components/tracker-bar";

interface Props {
  participant: Participant;
}

const DAY_TITLES: Record<number, string> = {
  1: "What is AI",
  2: "The Human Element",
  3: "Unlocking Innovation",
  4: "How We Use AI Wrong",
  5: "Speak It Out",
  6: "Pivot Roles",
  7: "Ask for More",
  8: "Reframe",
  9: "Keep Going",
  10: "Stop and Think",
};

const PHASE_LABEL: Record<number, string> = {
  1: "foundation",
  2: "foundation",
  3: "foundation",
  4: "foundation",
  5: "sparks",
  6: "sparks",
  7: "sparks",
  8: "sparks",
  9: "sparks",
  10: "sparks",
};

export function ProgressView({ participant }: Props) {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [completionCert, setCompletionCert] = useState<{ id: string; verification_code: string; issued_at: string } | null>(null);
  const [masteryCert, setMasteryCert] = useState<{ id: string; verification_code: string; issued_at: string } | null>(null);
  const [certsEnabled, setCertsEnabled] = useState(true);
  const [issuingCert, setIssuingCert] = useState(false);
  const [certError, setCertError] = useState("");
  const [darkMode, setDarkMode] = useState(false);
  const { currentDay, daysComplete = [] } = participant;
  const firstName = participant.name.split(" ")[0];
  const totalComplete = daysComplete.length;
  const allDone = totalComplete === 10;
  const verifyHost = (process.env.NEXT_PUBLIC_APP_URL ?? "https://sparks.bryancassady.com").replace(/^https?:\/\//, "").replace(/\/$/, "");

  useEffect(() => {
    fetch("/api/capstone/status")
      .then((r) => r.json())
      .then((data) => {
        if (data.ok) {
          setCompletionCert(data.completionCert);
          setMasteryCert(data.masteryCert);
          setCertsEnabled(data.certsEnabled ?? true);
        }
      })
      .catch(() => {});
  }, []);

  useEffect(() => {
    const stored = localStorage.getItem("darkMode");
    if (stored === "true") {
      setDarkMode(true);
      document.documentElement.classList.add("dark");
    }
  }, []);

  function toggleDarkMode() {
    const next = !darkMode;
    setDarkMode(next);
    localStorage.setItem("darkMode", String(next));
    if (next) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }

  useEffect(() => {
    if (!dropdownOpen) return;
    const handler = () => setDropdownOpen(false);
    document.addEventListener("click", handler);
    return () => document.removeEventListener("click", handler);
  }, [dropdownOpen]);

  function getDayStatus(day: number): "complete" | "today" | "missed" | "locked" {
    if (daysComplete.includes(day)) return "complete";
    if (day === currentDay) return "today";
    if (day < currentDay) return "missed";
    return "locked";
  }

  function formatCohort(cohortId: string): string {
    const parts = cohortId.replace("cohort_", "").split("_");
    if (parts.length !== 3) return cohortId;
    const date = new Date(
      Number(parts[0]),
      Number(parts[1]) - 1,
      Number(parts[2])
    );
    return "Cohort · " + date.toLocaleDateString("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
    });
  }

  async function handleIssueCert() {
    setCertError("");
    setIssuingCert(true);
    try {
      const res = await fetch("/api/certificates/issue-completion", { method: "POST" });
      const data = await res.json();
      if (data.ok) {
        // Re-fetch status to get the full cert object with real id
        const statusRes = await fetch("/api/capstone/status");
        const statusData = await statusRes.json();
        if (statusData.ok && statusData.completionCert) {
          setCompletionCert(statusData.completionCert);
        } else {
          setCompletionCert({
            id: data.certId ?? "",
            verification_code: data.verificationCode,
            issued_at: data.issuedAt,
          });
        }
      } else {
        setCertError(data.error ?? "Something went wrong. Try again.");
      }
    } catch {
      setCertError("Network error. Try again.");
    } finally {
      setIssuingCert(false);
    }
  }

  async function handleLogout() {
    await fetch("/api/auth/logout", { method: "POST" });
    window.location.href = "/login";
  }

  const missedDays = Array.from({ length: 10 }, (_, i) => i + 1)
    .filter((day) => getDayStatus(day) === "missed");
  const hasMissed = missedDays.length > 0;

  return (
    <div className="min-h-screen bg-background">

      <header className="border-b">
        <div className="mx-auto flex max-w-3xl items-center justify-between px-8 py-3">
          <a href="/progress" className="flex items-center gap-2 hover:opacity-80">
            <img src="/assets/site-icon.png" alt="AI Muse" className="h-7 w-7 rounded object-contain" />
            <span className="text-sm font-medium">Make AI Your Muse</span>
          </a>
          <div className="flex items-center gap-3">
            <button
              onClick={toggleDarkMode}
              className="text-muted-foreground hover:text-foreground"
              aria-label="Toggle dark mode"
            >
              {darkMode ? (
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="5"/>
                  <line x1="12" y1="1" x2="12" y2="3"/>
                  <line x1="12" y1="21" x2="12" y2="23"/>
                  <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/>
                  <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/>
                  <line x1="1" y1="12" x2="3" y2="12"/>
                  <line x1="21" y1="12" x2="23" y2="12"/>
                  <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/>
                  <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/>
                </svg>
              ) : (
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
                </svg>
              )}
            </button>
            <div className="relative">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setDropdownOpen(!dropdownOpen);
                }}
                className="flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground"
              >
                {"Hi, " + firstName + " ▾"}
              </button>
              {dropdownOpen && (
                <div className="absolute right-0 top-7 z-50 w-52 rounded-md border bg-background shadow-md">
                  <div className="px-3 py-2.5">
                    <p className="text-xs text-muted-foreground">
                      {formatCohort(participant.cohortId)}
                    </p>
                    <p className="mt-0.5 text-xs text-muted-foreground">
                      {participant.email}
                    </p>
                  </div>
                  <div className="border-t" />
                  <a
                    href="/account/devices"
                    className="block w-full px-3 py-2.5 text-left text-xs hover:bg-accent"
                  >
                    Manage devices
                  </a>
                  <div className="border-t" />
                  <button
                    onClick={handleLogout}
                    className="w-full px-3 py-2.5 text-left text-xs hover:bg-accent"
                  >
                    Log out
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-3xl px-8">

        <div className="py-8">
          <h1 className="text-2xl font-medium">Your 10-day journey</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            {totalComplete} of 10 days complete
            {allDone
              ? " · All done"
              : currentDay <= 10
              ? " · Today is Day " + String(currentDay)
              : " · Course complete"}
          </p>
        </div>

        <div className="mb-8">
          <TrackerBar
            currentDay={currentDay}
            daysComplete={daysComplete}
            allDone={allDone}
          />
        </div>

        <Separator />

        {/* Course overview card */}
        <div className="py-4">
          <a
            href="/welcome"
            className="flex items-center justify-between rounded-md border bg-muted/30 px-4 py-3 hover:bg-muted/50 transition-colors"
          >
            <div>
              <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground mb-0.5">
                Course overview
              </p>
              <p className="text-sm font-medium">Before you begin — read this once</p>
            </div>
            <span className="text-xs text-muted-foreground shrink-0">Read →</span>
          </a>
        </div>

        <Separator />

        {/* Today card or capstone card */}
        <div className="py-4">
          {allDone ? (
            <CapstoneCard />
          ) : currentDay >= 1 && currentDay <= 10 ? (
            <TodayCard
              day={currentDay}
              isDone={daysComplete.includes(currentDay)}
            />
          ) : null}
        </div>

        <Separator />

        <div className="py-4 pb-12">

          <p className="mb-3 text-xs font-medium uppercase tracking-wide text-muted-foreground">
            Completed
          </p>
          {daysComplete.length === 0 && (
            <p className="text-sm text-muted-foreground">
              Nothing yet — complete your first lesson to get started.
            </p>
          )}
          <div className="divide-y">
            {Array.from({ length: 10 }, (_, i) => i + 1)
              .filter((day) => getDayStatus(day) === "complete")
              .map((day) => (
                <DayRow key={day} day={day} status="complete" />
              ))}
          </div>

          {hasMissed && (
            <>
              <p className="mb-3 mt-6 text-xs font-medium uppercase tracking-wide text-muted-foreground">
                Missed — catch up anytime
              </p>
              <div className="divide-y">
                {missedDays.map((day) => (
                  <DayRow key={day} day={day} status="missed" />
                ))}
              </div>
            </>
          )}

          {!allDone && (
            <>
              <p className="mb-3 mt-6 text-xs font-medium uppercase tracking-wide text-muted-foreground">
                Upcoming — open anytime
              </p>
              <div className="divide-y">
                {Array.from({ length: 10 }, (_, i) => i + 1)
                  .filter((day) => getDayStatus(day) === "locked")
                  .map((day) => (
                    <DayRow key={day} day={day} status="locked" />
                  ))}
              </div>
            </>
          )}

          {allDone && (
            <div className="mt-6 rounded-md border border-dashed p-4 text-center">
              <p className="text-sm text-muted-foreground">
                All 10 lessons complete.{" "}
                <a href="/capstone" className="text-[#E24B4A] underline">
                  Start your capstone project →
                </a>
              </p>
            </div>
          )}

        </div>
        <Separator />

        <div className="py-8 pb-16">
          <h2 className="mb-1 text-base font-medium">Your certificates</h2>
          <p className="mb-5 text-sm text-muted-foreground">
            Certificates are permanently verifiable via a public link.
          </p>

          <div className="flex flex-col gap-4">

            {completionCert && certsEnabled ? (
              <div className="rounded-md border p-5 flex items-center justify-between gap-6">
                <div className="flex items-start gap-4">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#FCEBEB]">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#E24B4A" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="20 6 9 17 4 12"/>
                    </svg>
                  </div>
                  <div>
                    <p className="text-sm font-medium">Certificate of Completion</p>
                    <p className="mt-0.5 text-xs text-muted-foreground">
                      {"Issued " + new Date(completionCert.issued_at).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" }) + " · All 10 days completed"}
                    </p>
                    <p className="mt-1.5 text-xs text-muted-foreground">
                      {"Verify: "}
                      <a
                        href={"/verify/" + completionCert.verification_code}
                        target="_blank"
                        rel="noreferrer"
                        className="text-[#E24B4A] hover:underline"
                      >
                        {verifyHost + "/verify/" + completionCert.verification_code}
                      </a>
                    </p>
                  </div>
                </div>
                <button
                  className="shrink-0 flex items-center gap-2 rounded-md border px-4 py-2 text-sm hover:bg-accent"
                  onClick={() => window.open("/api/certificates/download?id=" + completionCert.id, "_blank")}
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
                    <polyline points="7 10 12 15 17 10"/>
                    <line x1="12" y1="15" x2="12" y2="3"/>
                  </svg>
                  Download PDF
                </button>
              </div>
            ) : completionCert && !certsEnabled ? (
              <div className="rounded-md border border-amber-200 bg-amber-50 p-5 dark:border-amber-900 dark:bg-amber-950">
                <div className="flex items-start gap-4">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-amber-100 dark:bg-amber-900">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#B45309" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <circle cx="12" cy="12" r="10"/>
                      <polyline points="12 6 12 12 16 14"/>
                    </svg>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-amber-900 dark:text-amber-300">Certificate of Completion</p>
                    <p className="mt-0.5 text-xs text-amber-800 dark:text-amber-400">
                      Your completion is being confirmed. Your certificate will be available here shortly.
                    </p>
                  </div>
                </div>
              </div>
            ) : allDone ? (
              <div className="rounded-md border p-5">
                <div className="flex items-start gap-4">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#FCEBEB]">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#E24B4A" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="20 6 9 17 4 12"/>
                    </svg>
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium">Certificate of Completion</p>
                    <p className="mt-0.5 text-xs text-muted-foreground mb-3">
                      You have completed all 10 days. Issue your certificate now.
                    </p>
                    {certError && (
                      <p className="mb-2 text-xs text-destructive">{certError}</p>
                    )}
                    <button
                      onClick={handleIssueCert}
                      disabled={issuingCert}
                      className="inline-flex items-center gap-2 rounded-md bg-[#E24B4A] px-4 py-2 text-sm font-medium text-white hover:bg-[#c73f3e] disabled:opacity-60"
                    >
                      {issuingCert ? "Issuing..." : "Issue completion certificate"}
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <div className="rounded-md border border-dashed p-5 flex items-center justify-between gap-6 opacity-55">
                <div className="flex items-start gap-4">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-muted">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="20 6 9 17 4 12"/>
                    </svg>
                  </div>
                  <div>
                    <p className="text-sm font-medium">Certificate of Completion</p>
                    <p className="mt-0.5 text-xs text-muted-foreground">Complete all 10 days to earn this.</p>
                  </div>
                </div>
              </div>
            )}

            {masteryCert && certsEnabled ? (
              <div className="rounded-md border border-[#F09595] bg-[#FCEBEB] p-5 flex items-center justify-between gap-6">
                <div className="flex items-start gap-4">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#E24B4A]">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="white">
                      <path d="M12 2l2.4 7.4H22l-6.2 4.5 2.4 7.4L12 17l-6.2 4.3 2.4-7.4L2 9.4h7.6z"/>
                    </svg>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-[#501313]">Certificate of Mastery</p>
                    <p className="mt-0.5 text-xs text-[#791F1F]">
                      {"Issued " + new Date(masteryCert.issued_at).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" }) + " · Capstone submitted"}
                    </p>
                    <p className="mt-1.5 text-xs text-[#791F1F]">
                      {"Verify: "}
                      <a
                        href={"/verify/" + masteryCert.verification_code}
                        target="_blank"
                        rel="noreferrer"
                        className="underline hover:opacity-80"
                      >
                        {verifyHost + "/verify/" + masteryCert.verification_code}
                      </a>
                    </p>
                  </div>
                </div>
                <button
                  className="shrink-0 flex items-center gap-2 rounded-md bg-[#E24B4A] px-4 py-2 text-sm font-medium text-white hover:bg-[#c73f3e]"
                  onClick={() => window.open("/api/certificates/download?id=" + masteryCert.id, "_blank")}
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
                    <polyline points="7 10 12 15 17 10"/>
                    <line x1="12" y1="15" x2="12" y2="3"/>
                  </svg>
                  Download PDF
                </button>
              </div>
            ) : masteryCert && !certsEnabled ? (
              <div className="rounded-md border border-amber-200 bg-amber-50 p-5 dark:border-amber-900 dark:bg-amber-950">
                <div className="flex items-start gap-4">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-amber-100 dark:bg-amber-900">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#B45309" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <circle cx="12" cy="12" r="10"/>
                      <polyline points="12 6 12 12 16 14"/>
                    </svg>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-amber-900 dark:text-amber-300">Certificate of Mastery</p>
                    <p className="mt-0.5 text-xs text-amber-800 dark:text-amber-400">
                      Submitted. Your certificate is under review. Check back soon.
                    </p>
                  </div>
                </div>
              </div>
            ) : (
              <div className="rounded-md border border-dashed p-5 flex items-center justify-between gap-6 opacity-55">
                <div className="flex items-start gap-4">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-muted">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                      <path d="M12 2l2.4 7.4H22l-6.2 4.5 2.4 7.4L12 17l-6.2 4.3 2.4-7.4L2 9.4h7.6z"/>
                    </svg>
                  </div>
                  <div>
                    <p className="text-sm font-medium">Certificate of Mastery</p>
                    <p className="mt-0.5 text-xs text-muted-foreground">Submit your capstone project to earn this.</p>
                  </div>
                </div>
                {allDone ? (
                  <a href="/capstone" className="shrink-0 text-sm text-[#E24B4A] hover:underline">
                    Go to capstone →
                  </a>
                ) : (
                  <div className="shrink-0 text-right">
                    <span className="text-sm text-muted-foreground opacity-50 cursor-not-allowed">
                      Go to capstone →
                    </span>
                    <p className="text-xs text-muted-foreground mt-0.5">Complete all 10 days first</p>
                  </div>
                )}
              </div>
            )}

          </div>
        </div>
      </main>

    </div>
  );
}


function TodayCard({ day, isDone }: { day: number; isDone: boolean }) {
  return (
    <a
      href={"/lesson/" + String(day)}
      className="block rounded-lg border border-[#F09595] bg-[#FCEBEB] px-4 py-4 hover:opacity-90"
    >
      <div className="flex items-center justify-between">
        <div>
          <p className="text-xs font-medium uppercase tracking-wide text-[#A32D2D]">
            Today
          </p>
          <p className="mt-0.5 text-base font-medium text-[#501313]">
            {"Day " + String(day) + " · " + (DAY_TITLES[day] ?? "Lesson " + String(day))}
          </p>
          <p className="mt-0.5 text-xs text-[#791F1F]">
            {isDone ? "Completed today ✓" : "~10 min · Essential ready"}
          </p>
        </div>
        <div className="rounded-md bg-[#E24B4A] px-4 py-2 text-sm font-medium text-white">
          {isDone ? "Revisit" : "Start"}
        </div>
      </div>
    </a>
  );
}

function CapstoneCard() {
  return (
    <a
      href="/capstone"
      className="block rounded-lg border border-[#F09595] bg-[#FCEBEB] px-4 py-4 hover:opacity-90"
    >
      <div className="flex items-center justify-between">
        <div>
          <p className="text-xs font-medium uppercase tracking-wide text-[#A32D2D]">
            All 10 days complete
          </p>
          <p className="mt-0.5 text-base font-medium text-[#501313]">
            Capstone · Build your own AI tool
          </p>
          <p className="mt-0.5 text-xs text-[#791F1F]">
            Apply everything. Build something real.
          </p>
        </div>
        <div className="rounded-md bg-[#E24B4A] px-4 py-2 text-sm font-medium text-white">
          Start
        </div>
      </div>
    </a>
  );
}

function DayRow({
  day,
  status,
}: {
  day: number;
  status: "complete" | "missed" | "locked";
}) {
  const title = DAY_TITLES[day] ?? "Lesson " + String(day);
  const phase = PHASE_LABEL[day];
  const label = "Day " + String(day) + " · " + title;
  const sublabel = phase === "foundation" ? "Foundation" : "SPARKS";

  if (status === "complete") {
    return (
      <a
        href={"/lesson/" + String(day)}
        className="flex items-center justify-between py-3 hover:opacity-70"
      >
        <div>
          <p className="text-sm">{label}</p>
          <p className="text-xs text-muted-foreground">{sublabel}</p>
        </div>
        <span className="text-xs text-muted-foreground">Revisit</span>
      </a>
    );
  }

  if (status === "missed") {
    return (
      <a
        href={"/lesson/" + String(day)}
        className="flex items-center justify-between py-3 hover:opacity-70"
      >
        <div>
          <p className="text-sm">{label}</p>
          <p className="text-xs text-muted-foreground">{sublabel}</p>
        </div>
        <span className="text-xs text-[#E24B4A]">Catch up</span>
      </a>
    );
  }

  // "locked" days are now openable (all 10 unlocked) — render as a startable link
  return (
    <a
      href={"/lesson/" + String(day)}
      className="flex items-center justify-between py-3 hover:opacity-70"
    >
      <div>
        <p className="text-sm">{label}</p>
        <p className="text-xs text-muted-foreground">{sublabel}</p>
      </div>
      <span className="text-xs text-muted-foreground">Start →</span>
    </a>
  );
}