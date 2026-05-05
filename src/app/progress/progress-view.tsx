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
  const { currentDay, daysComplete = [] } = participant;
  const firstName = participant.name.split(" ")[0];
  const totalComplete = daysComplete.length;

  useEffect(() => {
  if (!dropdownOpen) return;
  const handler = () => setDropdownOpen(false);
  document.addEventListener("click", handler);
  return () => document.removeEventListener("click", handler);
  }, [dropdownOpen]);

  function getDayStatus(day: number): "complete" | "today" | "locked" {
    if (daysComplete.includes(day)) return "complete";
    if (day === currentDay) return "today";
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

  return (
    <div className="min-h-screen bg-background">

      <header className="border-b">
        <div className="mx-auto flex max-w-2xl items-center justify-between px-6 py-3">
          <div className="flex items-center gap-2">
            <div className="flex h-6 w-6 items-center justify-center rounded bg-[#E24B4A] text-xs font-medium text-white">
              M
            </div>
            <span className="text-sm font-medium">Make AI Your Muse</span>
          </div>
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
      </header>

      <main className="mx-auto max-w-2xl px-6">

        <div className="py-8">
          <h1 className="text-2xl font-medium">Your 10-day journey</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            {totalComplete} of 10 days complete
            {currentDay <= 10 ? " · Today is Day " + currentDay : " · Course complete"}
          </p>
        </div>

        <div className="mb-8">
          <TrackerBar currentDay={currentDay} daysComplete={daysComplete} />
        </div>

        <Separator />

        {currentDay <= 10 && (
          <div className="py-4">
            <TodayCard day={currentDay} />
          </div>
        )}

        <Separator />

        <div className="py-4">
          <p className="mb-3 text-xs font-medium uppercase tracking-wide text-muted-foreground">
            Completed
          </p>
          {daysComplete.length === 0 && (
            <p className="text-sm text-muted-foreground">Nothing yet — Day 1 starts soon.</p>
          )}
          <div className="divide-y">
            {daysComplete.map((day) => (
              <DayRow key={day} day={day} status="complete" />
            ))}
          </div>
        </div>

        <Separator />

        <div className="py-4 pb-12">
          <p className="mb-3 text-xs font-medium uppercase tracking-wide text-muted-foreground">
            Upcoming
          </p>
          <div className="divide-y opacity-50">
            {Array.from({ length: 10 }, (_, i) => i + 1)
              .filter((day) => getDayStatus(day) === "locked")
              .map((day) => (
                <DayRow key={day} day={day} status="locked" />
              ))}
          </div>
        </div>

      </main>

    </div>
  );
}

function TrackerBar({
  currentDay,
  daysComplete,
}: {
  currentDay: number;
  daysComplete: number[];
}) {
  return (
    <div>
      <div className="flex items-end justify-between">
        {Array.from({ length: 10 }, (_, i) => i + 1).map((day, index) => {
          const isComplete = daysComplete.includes(day);
          const isToday = day === currentDay;
          const isLocked = !isComplete && !isToday;

          const dotSize = isToday ? "h-9 w-9" : "h-8 w-8";

          let dotStyle = "";
          let textStyle = "";

          if (isComplete) {
            dotStyle = "bg-[#E24B4A] text-white";
            textStyle = "text-muted-foreground";
          } else if (isToday) {
            dotStyle = "border-2 border-[#E24B4A] text-[#E24B4A] bg-white ring-4 ring-[#FCEBEB]";
            textStyle = "text-[#A32D2D] font-medium";
          } else {
            dotStyle = "border border-border text-muted-foreground bg-background";
            textStyle = "text-muted-foreground";
          }

          return (
            <div key={day} className="flex flex-col items-center gap-1.5">
              {index > 0 && (
                <div
                  className="absolute"
                  style={{ display: "none" }}
                />
              )}
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
          style={{ width: (daysComplete.length / 10) * 100 + "%" }}
        />
      </div>

      <div className="mt-3 flex justify-between text-[10px] text-muted-foreground">
        <span>Phase 1 · Foundation</span>
        <span>Phase 2 · SPARKS</span>
      </div>
    </div>
  );
}

function TodayCard({ day }: { day: number }) {
  return (
    <a
      href={"/lesson/" + String(day)}
      className="block rounded-lg border border-[#F09595] bg-[#FCEBEB] px-4 py-4 hover:opacity-90"
    >
      <div className="flex items-center justify-between">
        <div>
          <p className="text-xs font-medium uppercase tracking-wide text-[#A32D2D]">Today</p>
          <p className="mt-0.5 text-base font-medium text-[#501313]">
            {"Day " + String(day) + " · " + (DAY_TITLES[day] ?? "Lesson " + String(day))}
          </p>
          <p className="mt-0.5 text-xs text-[#791F1F]">~10 min · Essential ready</p>
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
  status: "complete" | "locked";
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