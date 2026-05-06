"use client";

import { useEffect, useState, useCallback } from "react";
import { Separator } from "@/components/ui/separator";
import type { Lesson, Participant, LearnMoreLink, Exercise } from "@/lib/types";


type SectionId = "essential" | "advanced" | "learnmore";

const SECTIONS: { id: SectionId; label: string }[] = [
  { id: "essential", label: "Essential" },
  { id: "advanced", label: "Advanced" },
  { id: "learnmore", label: "Learn More" },
];

interface Props {
  participant: Participant;
  lesson: Lesson;
}

export function LessonView({ participant, lesson }: Props) {
  const [activeSection, setActiveSection] = useState<SectionId>("essential");
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const isDoneInitially = (participant.daysComplete ?? []).includes(lesson.day);
  const [isDone, setIsDone] = useState(isDoneInitially);
  const [markingDone, setMarkingDone] = useState(false);
  const [toastMsg, setToastMsg] = useState<string | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id as SectionId);
          }
        }
      },
      { rootMargin: "-30% 0px -60% 0px" }
    );
    SECTIONS.forEach((section) => {
      const el = document.getElementById(section.id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!dropdownOpen) return;
    const handler = () => setDropdownOpen(false);
    document.addEventListener("click", handler);
    return () => document.removeEventListener("click", handler);
  }, [dropdownOpen]);

  const firstName = participant.name.split(" ")[0];

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
  const handleMarkDone = useCallback(async () => {
    if (isDone) return;
    setMarkingDone(true);
    try {
      const res = await fetch("/api/lesson/complete", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ day: lesson.day }),
      });
      const data = await res.json();
      if (data.ok) {
        setIsDone(true);
        setToastMsg("Day " + String(lesson.day) + " marked as complete!");
        setTimeout(() => setToastMsg(null), 3000);
      } else {
        setToastMsg("Something went wrong. Try again.");
        setTimeout(() => setToastMsg(null), 3000);
      }
    } catch {
      setToastMsg("Network error. Try again.");
      setTimeout(() => setToastMsg(null), 3000);
    } finally {
      setMarkingDone(false);
    }
  }, [isDone, lesson.day]);

async function handleLogout() {
  await fetch("/api/auth/logout", { method: "POST" });
  window.location.href = "/login";
}

  const phaseLabel = lesson.phase === "foundation" ? "Foundation" : "SPARKS";

  return (
    <div className="min-h-screen bg-background">

      {toastMsg && (
        <div className="fixed bottom-4 left-1/2 z-50 -translate-x-1/2 rounded-md bg-foreground px-4 py-2.5 text-sm text-background shadow-lg">
          {toastMsg}
        </div>
      )}

      {/* Header */}
      <header className="border-b">
        <div className="mx-auto flex max-w-3xl items-center justify-between px-6 py-3">
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

      {/* Sticky nav */}
      <nav className="sticky top-0 z-10 border-b bg-background">
        <div className="mx-auto flex max-w-3xl gap-1 px-6 py-2">
          {SECTIONS.map((section) => {
            const isActive = activeSection === section.id;
            return (
              <a
                key={section.id}
                href={"#" + section.id}
                className={
                  "rounded px-3 py-1.5 text-xs transition-colors " +
                  (isActive
                    ? "bg-[#FCEBEB] font-medium text-[#A32D2D]"
                    : "text-muted-foreground hover:text-foreground")
                }
              >
                {section.label}
              </a>
            );
          })}
        </div>
      </nav>

      <main className="mx-auto max-w-3xl px-6">

        {/* Title */}
        <div className="py-6">
          <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
            {"Day " + String(lesson.day) + " · " + phaseLabel}
          </p>
          <h1 className="mt-2 text-2xl font-medium">{lesson.title}</h1>
          <p className="mt-1 text-sm text-muted-foreground">~10 minutes today</p>
          {isDone ? (
            <div className="mb-4 flex items-center gap-2 rounded-md border border-green-200 bg-green-50 px-4 py-2.5">
              <span className="text-sm text-green-700">
                ✓ You completed this day
              </span>
            </div>
          ) : (
            <div className="mb-4 flex items-center gap-2 rounded-md border bg-muted/40 px-4 py-2.5">
              <span className="text-sm text-muted-foreground">
                Watch the Essential video, then mark this day as done.
              </span>
            </div>
          )}
        </div>

        {/* Essential */}
        <section id="essential" className="scroll-mt-16 py-6">
          <h2 className="mb-3 text-base font-medium">Essential</h2>
          <VideoPlayer videoUrl={lesson.essential.videoUrl} />
          <ExerciseBlock exercise={lesson.essential.exercise} />
          <div className="mt-6">
            {isDone ? (
              <div className="flex items-center gap-2 text-sm text-green-700">
                <span>✓</span>
                <span>Day complete</span>
              </div>
            ) : (
              <button
                onClick={handleMarkDone}
                disabled={markingDone}
                className="rounded-md bg-[#E24B4A] px-5 py-2.5 text-sm font-medium text-white hover:bg-[#c73f3e] disabled:opacity-50"
              >
                {markingDone ? "Saving..." : "Mark as done"}
              </button>
            )}
          </div>
        </section>

        <Separator />

        {/* Advanced */}
        <section id="advanced" className="scroll-mt-16 py-6">
          <h2 className="text-base font-medium">Advanced</h2>
          <p className="mb-3 mt-1 text-sm text-muted-foreground">
            Optional. Go deeper when you have time.
          </p>
          <VideoPlayer videoUrl={lesson.advanced.videoUrl} />
          <ExerciseBlock exercise={lesson.advanced.exercise} />
        </section>

        <Separator />

        {/* Learn More */}
        <section id="learnmore" className="scroll-mt-16 py-6 pb-12">
          <h2 className="text-base font-medium">Learn More</h2>
          <p className="mb-4 mt-1 text-sm text-muted-foreground">
            Articles, tools, and references from today&apos;s lesson.
          </p>
          <LearnMoreList links={lesson.learnMore} />
        </section>

      </main>

      {/* Footer */}
      <footer className="border-t bg-muted/30">
        <div className="mx-auto flex max-w-3xl items-center justify-between px-6 py-3 text-xs text-muted-foreground">
          <a href="/progress" className="hover:underline">
            Back to overview
          </a>
          <a href="mailto:support@example.com" className="hover:underline">
            Need help? Contact us
          </a>
        </div>
      </footer>

    </div>
  );
}

// ---------- Subcomponents ----------

function VideoPlayer({ videoUrl }: { videoUrl: string }) {
  return (
    <div className="aspect-video overflow-hidden rounded-md bg-black">
      <iframe
        src={videoUrl}
        className="h-full w-full"
        allow="autoplay; fullscreen; picture-in-picture"
        allowFullScreen
      />
    </div>
  );
}

function ExerciseBlock({ exercise }: { exercise: Exercise }) {
  return (
    <div className="mt-4">
      <p className="mb-3 text-xs font-medium uppercase tracking-wide text-muted-foreground">
        Exercise
      </p>
      <ol className="mb-4 space-y-3">
        {exercise.steps.map((step, i) => (
          <li key={i} className="flex gap-3">
            <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#E24B4A] text-[10px] font-medium text-white mt-0.5">
              {i + 1}
            </span>
            <span className="text-sm leading-relaxed">{step.text}</span>
          </li>
        ))}
      </ol>
      {exercise.prompt !== null && (
        <PromptBox prompt={exercise.prompt} />
      )}
    </div>
  );
}

function PromptBox({ prompt }: { prompt: string }) {
  const [copied, setCopied] = useState(false);

  function handleCopy() {
    navigator.clipboard.writeText(prompt).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  }

  return (
    <div className="rounded-md border border-dashed bg-muted/40 p-4">
      <div className="mb-2 flex items-center justify-between">
        <span className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
          Try this prompt
        </span>
        <button
          onClick={handleCopy}
          className="text-xs text-muted-foreground hover:text-foreground"
        >
          {copied ? "Copied!" : "Copy"}
        </button>
      </div>
      <p className="font-mono text-sm leading-relaxed">{prompt}</p>
    </div>
  );
}

function LearnMoreList({ links }: { links: LearnMoreLink[] }) {
  if (!links || links.length === 0) return null;
  return (
    <div className="divide-y">
      {links.map((link, i) => (
        <a
          key={i}
          href={link.url}
          target="_blank"
          rel="noreferrer"
          className="flex items-center justify-between py-3 hover:opacity-70"
        >
          <span className="text-sm">{link.title}</span>
          <span className="text-xs capitalize text-muted-foreground">
            {link.type + " ↗"}
          </span>
        </a>
      ))}
    </div>
  );
}