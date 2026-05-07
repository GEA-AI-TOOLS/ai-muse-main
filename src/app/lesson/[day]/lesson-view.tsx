"use client";

import { useEffect, useState, useCallback } from "react";
import { Separator } from "@/components/ui/separator";
import { SummaryBlock } from "@/components/summary-block";
import { ExerciseBlock } from "@/components/exercise-block";
import type { Lesson, Participant } from "@/lib/types";

type SectionId = "essential" | "advanced" | "learnmore";

const SECTIONS: { id: SectionId; label: string }[] = [
  { id: "essential", label: "Essential" },
  { id: "advanced", label: "Advanced" },
  { id: "learnmore", label: "Learn More" },
];

function encodePromptUrl(base: string, prompt: string): string {
  return base + encodeURIComponent(prompt);
}

interface Props {
  participant: Participant;
  lesson: Lesson;
}

export function LessonView({ participant, lesson }: Props) {
  const [activeSection, setActiveSection] = useState<SectionId>("essential");
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [advancedOpen, setAdvancedOpen] = useState(false);

  const isDoneInitially = (participant.daysComplete ?? []).includes(lesson.day);
  const [isDone, setIsDone] = useState(isDoneInitially);
  const [markingDone, setMarkingDone] = useState(false);
  const [toastMsg, setToastMsg] = useState<string | null>(null);

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

  const firstName = participant.name.split(" ")[0];

  function formatCohort(cohortId: string): string {
    const parts = cohortId.replace("cohort_", "").split("_");
    if (parts.length !== 3) return cohortId;
    const date = new Date(Number(parts[0]), Number(parts[1]) - 1, Number(parts[2]));
    return "Cohort · " + date.toLocaleDateString("en-US", {
      month: "long", day: "numeric", year: "numeric",
    });
  }

  async function handleLogout() {
    await fetch("/api/auth/logout", { method: "POST" });
    window.location.href = "/login";
  }

  const phaseLabel = lesson.phase === "foundation" ? "Foundation" : "SPARKS";
  const supportEmail = "mailto:support.muse@bryancassady.com?subject=Help%20with%20Day%20" + String(lesson.day);

  // Build LLM URLs from prompt if present
  function getLlmUrls(prompt: string | null) {
    if (!prompt) return {};
    return {
      chatGpt: encodePromptUrl("https://chatgpt.com/?q=", prompt),
      claude: encodePromptUrl("https://claude.ai/new?q=", prompt),
      gemini: encodePromptUrl("https://gemini.google.com/app?q=", prompt),
    };
  }

  const essentialUrls = getLlmUrls(lesson.essential.exercise.prompt);
  const advancedUrls = getLlmUrls(lesson.advanced.exercise.prompt);

  return (
    <div className="min-h-screen bg-background">

      {toastMsg && (
        <div className="fixed bottom-4 left-1/2 z-50 -translate-x-1/2 rounded-md bg-foreground px-5 py-3 text-sm text-background shadow-lg">
          {toastMsg}
        </div>
      )}

      {/* Header */}
      <header className="border-b">
        <div className="mx-auto flex max-w-4xl items-center justify-between px-8 py-4">
          <a href="/progress" className="flex items-center gap-2 hover:opacity-80">
            <div className="flex h-7 w-7 items-center justify-center rounded bg-[#E24B4A] text-sm font-medium text-white">
              M
            </div>
            <span className="text-base font-medium">Make AI Your Muse</span>
          </a>
          <div className="flex items-center gap-4">
            <button
              onClick={toggleDarkMode}
              className="text-muted-foreground hover:text-foreground"
              aria-label="Toggle dark mode"
            >
              {darkMode ? (
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/>
                </svg>
              ) : (
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
                </svg>
              )}
            </button>
            <div className="relative">
              <button
                onClick={(e) => { e.stopPropagation(); setDropdownOpen(!dropdownOpen); }}
                className="flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground"
              >
                {"Hi, " + firstName + " ▾"}
              </button>
              {dropdownOpen && (
                <div className="absolute right-0 top-8 z-50 w-56 rounded-md border bg-background shadow-md">
                  <div className="px-4 py-3">
                    <p className="text-xs text-muted-foreground">{formatCohort(participant.cohortId)}</p>
                    <p className="mt-0.5 text-xs text-muted-foreground">{participant.email}</p>
                  </div>
                  <div className="border-t" />
                  <button
                    onClick={handleLogout}
                    className="w-full px-4 py-3 text-left text-sm hover:bg-accent"
                  >
                    Log out
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Sticky nav */}
      <nav className="sticky top-0 z-10 border-b bg-background">
        <div className="mx-auto flex max-w-4xl gap-1 px-8 py-2">
          {SECTIONS.map((section) => {
            const isActive = activeSection === section.id;
            return (
              <a
                key={section.id}
                href={"#" + section.id}
                className={
                  "rounded px-4 py-2 text-sm transition-colors " +
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

      <main className="mx-auto max-w-4xl px-8">

        {/* Title block */}
        <div className="py-8">
          <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
            {"Day " + String(lesson.day) + " · " + phaseLabel}
          </p>
          <h1 className="mt-2 text-3xl font-medium">{lesson.title}</h1>
          <p className="mt-1 text-base text-muted-foreground">~10 minutes today</p>
        </div>

        {/* Status banner */}
        {isDone ? (
          <div className="mb-5 flex items-center gap-2 rounded-md border border-green-200 bg-green-50 px-5 py-3 dark:border-green-900 dark:bg-green-950">
            <span className="text-sm text-green-700 dark:text-green-400">
              You completed this day
            </span>
          </div>
        ) : (
          <div className="mb-5 rounded-md border bg-muted/40 px-5 py-3">
            <span className="text-sm text-muted-foreground">
              Watch Essential, then mark this day as done.
            </span>
          </div>
        )}

        {/* Essential */}
        <section id="essential" className="scroll-mt-20 py-8">
          <h2 className="mb-4 text-lg font-medium">Essential</h2>
          <VideoPlayer videoUrl={lesson.essential.videoUrl} />
          <SummaryBlock summary={lesson.essential.summary} />
          <div className="mt-8 mb-2 border-t pt-6">
            <h3 className="text-base font-semibold">Exercise</h3>
          </div>
          <ExerciseBlock
            exercise={lesson.essential.exercise}
            promptChatGptUrl={essentialUrls.chatGpt}
            promptClaudeUrl={essentialUrls.claude}
            promptGeminiUrl={essentialUrls.gemini}
          />
          <div className="mt-8">
            {isDone ? (
              <div className="flex items-center gap-2 text-sm text-green-700 dark:text-green-400">
                <span>Day complete</span>
              </div>
            ) : (
              <button
                onClick={handleMarkDone}
                disabled={markingDone}
                className="rounded-md bg-[#E24B4A] px-6 py-3 text-sm font-medium text-white hover:bg-[#c73f3e] disabled:opacity-50"
              >
                {markingDone ? "Saving..." : "Mark as done"}
              </button>
            )}
          </div>
        </section>

        <Separator />

        {/* Advanced — accordion */}
        <section id="advanced" className="scroll-mt-20 py-8">
          <button
            onClick={() => setAdvancedOpen(!advancedOpen)}
            className="flex w-full items-center justify-between"
          >
            <div className="text-left">
              <h2 className="text-lg font-medium">Advanced</h2>
              <p className="mt-0.5 text-sm text-muted-foreground">
                Optional. Go deeper when you have time.
              </p>
            </div>
            <div className={
              "flex h-8 w-8 items-center justify-center rounded-full border text-muted-foreground transition-transform " +
              (advancedOpen ? "rotate-180" : "")
            }>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="6 9 12 15 18 9"/>
              </svg>
            </div>
          </button>

          {advancedOpen && (
            <div className="mt-6">
              <VideoPlayer videoUrl={lesson.advanced.videoUrl} />
              <SummaryBlock summary={lesson.advanced.summary} />
              <div className="mt-8 mb-2 border-t pt-6">
                <h3 className="text-base font-semibold">Exercise</h3>
              </div>
              <ExerciseBlock
                exercise={lesson.advanced.exercise}
                promptChatGptUrl={advancedUrls.chatGpt}
                promptClaudeUrl={advancedUrls.claude}
                promptGeminiUrl={advancedUrls.gemini}
              />
            </div>
          )}
        </section>

        <Separator />

        {/* Learn More */}
        <section id="learnmore" className="scroll-mt-20 py-8 pb-16">
          <h2 className="mb-1 text-lg font-medium">Learn More</h2>
          <p className="mb-5 text-sm text-muted-foreground">
            Articles, tools, and references from today&apos;s lesson.
          </p>
          <div className="divide-y">
            {lesson.learnMore.map((link, i) => (
              <a
                key={i}
                href={link.url}
                target="_blank"
                rel="noreferrer"
                className="flex items-center justify-between py-4 hover:opacity-70"
              >
                <span className="text-base">{link.title}</span>
                <span className="text-sm capitalize text-muted-foreground">
                  {link.type + " ↗"}
                </span>
              </a>
            ))}
          </div>
        </section>

      </main>

      {/* Footer */}
      <footer className="border-t bg-muted/30">
        <div className="mx-auto flex max-w-4xl items-center justify-between px-8 py-4 text-sm text-muted-foreground">
          <a href="/progress" className="hover:underline">Back to overview</a>
          <a href={supportEmail} className="hover:underline">Need help? Contact us</a>
        </div>
      </footer>

    </div>
  );
}

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