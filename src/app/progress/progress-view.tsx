"use client";

import { Separator } from "@/components/ui/separator";
import type { Participant } from "@/lib/types";
import { useState, useEffect } from "react";

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
  const [darkMode, setDarkMode] = useState(false);
  const { currentDay, daysComplete = [] } = participant;
  const firstName = participant.name.split(" ")[0];
  const totalComplete = daysComplete.length;
  const allDone = totalComplete === 10;

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
            <div className="flex h-6 w-6 items-center justify-center rounded bg-[#E24B4A] text-xs font-medium text-white">
              M
            </div>
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

        {/* Today card or capstone card */}
        <div className="py-4">
          {allDone ? (
            <CapstoneCard />
          ) : currentDay <= 10 ? (
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
                Upcoming
              </p>
              <div className="divide-y opacity-50">
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

      </main>

    </div>
  );
}

function TrackerBar({
  currentDay,
  daysComplete,
  allDone,
}: {
  currentDay: number;
  daysComplete: number[];
  allDone: boolean;
}) {
  return (
    <div>
      <div className="flex items-end justify-between">
        {Array.from({ length: 10 }, (_, i) => i + 1).map((day) => {
          const isComplete = daysComplete.includes(day);
          const isToday = day === currentDay && !allDone;
          const isMissed = !isComplete && !isToday && day < currentDay;

          const dotSize = isToday ? "h-9 w-9" : "h-8 w-8";

          let dotStyle = "";
          let textStyle = "";

          if (isComplete) {
            dotStyle = "bg-[#E24B4A] text-white";
            textStyle = "text-muted-foreground";
          } else if (isToday) {
            dotStyle = "border-2 border-[#E24B4A] text-[#E24B4A] bg-white ring-4 ring-[#FCEBEB]";
            textStyle = "text-[#A32D2D] font-medium";
          } else if (isMissed) {
            dotStyle = "border-2 border-dashed border-[#E24B4A] text-[#E24B4A] bg-white";
            textStyle = "text-[#A32D2D]";
          } else {
            dotStyle = "border border-border text-muted-foreground bg-background";
            textStyle = "text-muted-foreground";
          }

          return (
            <div key={day} className="flex flex-col items-center gap-1.5">
              <div
                className={
                  "flex items-center justify-center rounded-full text-xs font-medium " +
                  dotSize + " " + dotStyle
                }
              >
                {isComplete ? "✓" : String(day)}
              </div>
              <span className={"text-[10px] " + textStyle}>
                {isToday ? "Today" : "Day " + String(day)}
              </span>
            </div>
          );
        })}
      </div>

      <div className="relative mt-1">
        <div className="h-1 w-full rounded-full bg-muted" />
        <div
          className="absolute top-0 left-0 h-1 rounded-full bg-[#E24B4A] transition-all"
          style={{ width: String((daysComplete.length / 10) * 100) + "%" }}
        />
      </div>

      <div className="mt-3 flex justify-between text-[10px] text-muted-foreground">
        <span>Phase 1 · Foundation</span>
        <span>Phase 2 · SPARKS</span>
      </div>

      {allDone && (
        <div className="mt-4 flex items-center gap-3">
          <div className="h-px flex-1 bg-[#E24B4A]" />
          <a
            href="/capstone"
            className="flex items-center gap-2 rounded-md bg-[#E24B4A] px-4 py-1.5 text-xs font-medium text-white hover:bg-[#c73f3e]"
          >
            Capstone unlocked →
          </a>
          <div className="h-px flex-1 bg-[#E24B4A]" />
        </div>
      )}
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

  return (
    <div className="flex items-center justify-between py-3">
      <div>
        <p className="text-sm">{label}</p>
        <p className="text-xs text-muted-foreground">{sublabel}</p>
      </div>
      <span className="text-xs text-muted-foreground">Locked</span>
    </div>
  );
}