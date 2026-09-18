"use client";

import { useEffect, useMemo, useRef } from "react";
import { Separator } from "@/components/ui/separator";
import { SummaryBlock } from "@/components/summary-block";
import { TrackerBar } from "@/components/tracker-bar";
import { AuditBar, AuditHeader } from "@/components/audit/audit-bar";
import { ExerciseBlock } from "@/components/exercise-block";
import { AssessmentPrompt } from "@/components/assessment-prompt";
import { AuditTour } from "@/components/audit/audit-tour";
import {
  LockedVideo,
  LockedExercise,
  LockedCard,
  EnrollCta,
} from "@/components/audit/audit-lock";
import { AUDIT_COPY, isLocked } from "@/lib/audit-config";
import { lessonTour } from "@/lib/audit-tour";
import { useAuditProgress } from "@/hooks/use-audit-progress";
import type { Lesson } from "@/lib/types";
import { track } from "@vercel/analytics";
import { useIsMobile } from "@/hooks/use-is-mobile";

// Day 1 counts as done once the visitor has reached the end of the
// exercise AND spent at least this long on the page. Stops a quick
// scroll (or the tour scrolling for them) from counting.
const DAY1_DONE_MIN_MS = 60_000;

function encodePromptUrl(base: string, prompt: string): string {
  return base + encodeURIComponent(prompt);
}

function getLlmUrls(prompt: string | null) {
  if (!prompt) return {};
  return {
    chatGpt: encodePromptUrl("https://chatgpt.com/?q=", prompt),
    claude: encodePromptUrl("https://claude.ai/new?q=", prompt),
    gemini: "https://gemini.google.com/app",
  };
}

const SECTIONS: { id: string; label: string }[] = [
  { id: "essential", label: "Essential" },
  { id: "advanced", label: "Advanced" },
  { id: "learnmore", label: "Learn More" },
];

export function AuditLessonView({
  lesson,
  essentialVideo,
  advancedVideo,
  essentialDemoVideo,
  advancedDemoVideo,
}: {
  lesson: Lesson;
  essentialVideo: React.ReactNode;
  advancedVideo?: React.ReactNode;
  essentialDemoVideo?: React.ReactNode;
  advancedDemoVideo?: React.ReactNode;
}) {
  const isMobile = useIsMobile();
  const { day1Done, currentDay, daysComplete, markDay1Done } = useAuditProgress();
  const phaseLabel = lesson.phase === "foundation" ? "Foundation" : "SPARKS";
  const hasDemo = !!lesson.essential.exercise.demo?.videoUrl?.trim();
  const isDayOne = lesson.day === 1;
  const tour = useMemo(() => lessonTour(hasDemo), [hasDemo]);

  useEffect(() => {
    track("audit_lesson_opened", { day: lesson.day, phase: lesson.phase });
  }, [lesson.day, lesson.phase]);

  // Mark Day 1 done: end of exercise reached + minimum time on page.
  const doneSentinelRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!isDayOne || day1Done) return;
    const el = doneSentinelRef.current;
    if (!el) return;
    const openedAt = Date.now();
    let reached = false;
    const tryMark = () => {
      if (reached && Date.now() - openedAt >= DAY1_DONE_MIN_MS) markDay1Done();
    };
    const timer = window.setTimeout(tryMark, DAY1_DONE_MIN_MS);
    const io = new IntersectionObserver((entries) => {
      if (entries.some((e) => e.isIntersecting)) {
        reached = true;
        tryMark();
      }
    });
    io.observe(el);
    return () => {
      window.clearTimeout(timer);
      io.disconnect();
    };
  }, [isDayOne, day1Done, markDay1Done]);

  const essentialUrls = getLlmUrls(lesson.essential.exercise.prompt);
  const advancedUrls = getLlmUrls(lesson.advanced?.exercise.prompt ?? null);

  const navItems = SECTIONS.filter((s) => {
    if (s.id === "advanced") return !!lesson.advanced;
    if (s.id === "learnmore") return !!(lesson.learnMore && lesson.learnMore.length > 0);
    return true;
  });

  const hookVisible =
    !isLocked("essentialSummary", lesson.day) && !!lesson.essential.summary[0]?.body?.trim();

  return (
    <div className="min-h-screen bg-background">

      <AuditBar showTour={isDayOne} />
      <AuditHeader />
      {isDayOne && <AuditTour id="lesson" steps={tour.steps} finish={tour.finish} />}

      <nav data-audit-sticky className="sticky top-10 z-20 border-b bg-background">
        <div className="mx-auto flex max-w-4xl gap-1 px-8 py-2">
          {navItems.map((section) => (
           <a 
              key={section.id}
              href={"#" + section.id}
              onClick={() => track("audit_section_viewed", { day: lesson.day, section: section.id })}
              className="rounded px-4 py-2 text-sm text-muted-foreground hover:text-foreground"
            >
              {section.label}
            </a>
          ))}
        </div>
      </nav>

      <main className="mx-auto max-w-4xl px-8">

        <div className="py-8">
          <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
            {"Day " + String(lesson.day) + " · " + phaseLabel}
          </p>
          <h1 className="mt-2 text-3xl font-medium">{lesson.title}</h1>
          <p className="mt-1 text-base text-muted-foreground">~10 minutes today</p>
        </div>

        <div className="mb-6 rounded-md border bg-muted/30 px-5 py-4">
          <TrackerBar
            currentDay={currentDay}
            daysComplete={daysComplete}
            allDone={false}
            basePath="/audit/lesson"
          />
          <p className="mt-4 border-t pt-3 text-xs text-muted-foreground">
            {isDayOne ? AUDIT_COPY.lessonNoteDay1 : AUDIT_COPY.lessonNotePreview}
          </p>
        </div>

        <section id="essential" className="scroll-mt-28 py-8">
          <h2 className="text-xl font-semibold text-[#E24B4A]">Essential</h2>
          {lesson.sectionTitles?.essential ? (
            <p className="mt-0.5 mb-4 text-base font-medium text-foreground">
              {lesson.sectionTitles.essential}
            </p>
          ) : (
            <div className="mb-4" />
          )}

          {/* Desktop: hook card above the video, unchanged */}
          {hookVisible && (
            <div className="mb-5 hidden rounded-r-md border-l-[3px] border-l-[#E24B4A] bg-[#FCEBEB] px-4 py-3 dark:bg-[#3a1010] sm:block">
              <p className="mb-1 text-[10px] font-medium uppercase tracking-[0.4px] text-[#A32D2D]">
                {lesson.essential.summary[0].heading}
              </p>
              <p className="text-sm leading-relaxed text-[#501313] dark:text-[#f5c1c1]">
                {lesson.essential.summary[0].body}
              </p>
            </div>
          )}

          {isMobile ? (
            <div data-tour="video">
              {isLocked("essentialVideo", lesson.day) ? <LockedVideo /> : essentialVideo}
              {hookVisible && (
                <p className="mt-3 text-xs leading-relaxed text-muted-foreground">
                  {lesson.essential.summary[0].body}
                </p>
              )}
            </div>
          ) : (
            <div data-tour="video">
              {isLocked("essentialVideo", lesson.day) ? <LockedVideo /> : essentialVideo}
            </div>
          )}

          {!isLocked("essentialSummary", lesson.day) && (
            <div data-tour="summary">
              <div className="mt-8 mb-1">
                <h3 className="text-base font-semibold">Summary</h3>
              </div>
              <SummaryBlock summary={lesson.essential.summary} skipFirst />
            </div>
          )}

          <div data-tour="exercise">
            <div className="mt-8 mb-2 border-t pt-6">
              <h3 className="text-base font-semibold">Exercise</h3>
            </div>
            {isLocked("essentialExercise", lesson.day) ? (
              <LockedExercise
                objective={lesson.essential.exercise.objective}
                timeMinutes={lesson.essential.exercise.timeMinutes}
                hasDemo={hasDemo}
              />
            ) : (
              <ExerciseBlock
                exercise={lesson.essential.exercise}
                promptChatGptUrl={essentialUrls.chatGpt}
                promptClaudeUrl={essentialUrls.claude}
                promptGeminiUrl={essentialUrls.gemini}
                demoVideo={essentialDemoVideo}
              />
            )}
          </div>

          {isDayOne && (
            <>
              <div ref={doneSentinelRef} aria-hidden="true" className="h-px" />
              <div
                id="assessment"
                data-tour="assessment"
                className="mt-8 scroll-mt-28 border-t pt-6"
              >
                <p className="mb-1 text-xs font-medium text-[#E24B4A]">
                  {AUDIT_COPY.assessmentEyebrow}
                </p>
                <h3 className="text-base font-semibold">{AUDIT_COPY.assessmentTitle}</h3>
                <p className="mb-4 mt-1 max-w-xl text-sm text-muted-foreground">
                  {AUDIT_COPY.assessmentBody}
                </p>
                <AssessmentPrompt source="audit_day1" />
              </div>
            </>
          )}

          <div
            className="mt-8 rounded-md border border-[#F09595] bg-[#FCEBEB] px-5 py-4 dark:border-[#791F1F] dark:bg-[#3a1010]"
            onClick={() => track("enroll_cta_clicked", { placement: "audit_paywall", day: lesson.day })}
          >
            <p className="mb-3 text-sm text-[#501313] dark:text-[#f5c1c1]">
              {isDayOne ? AUDIT_COPY.paywallDay1 : AUDIT_COPY.paywallOther}
            </p>
            <EnrollCta />
          </div>
        </section>

        <Separator />

        {lesson.advanced && (
          <section id="advanced" data-tour="advanced" className="scroll-mt-28 py-8">
            <h2 className="text-xl font-semibold text-[#E24B4A]">Advanced</h2>
            {lesson.sectionTitles?.advanced ? (
              <p className="mt-0.5 text-base font-medium text-foreground">
                {lesson.sectionTitles.advanced}
              </p>
            ) : null}
            <p className="mt-0.5 mb-4 text-sm text-muted-foreground">
              Optional. Go deeper when you have time.
            </p>
            {isLocked("advanced", lesson.day) ? (
              <LockedCard
                title={lesson.sectionTitles?.advanced ?? "Advanced lesson"}
                subtitle="A second video, summary, and exercise for this day."
              />
            ) : (
              <div className="mt-6">
                {advancedVideo}
                <div className="mt-8 mb-1">
                  <h3 className="text-base font-semibold">Summary</h3>
                </div>
                <SummaryBlock summary={lesson.advanced.summary} skipFirst />
                <div className="mt-8 mb-2 border-t pt-6">
                  <h3 className="text-base font-semibold">Exercise</h3>
                </div>
                <ExerciseBlock
                  exercise={lesson.advanced.exercise}
                  promptChatGptUrl={advancedUrls.chatGpt}
                  promptClaudeUrl={advancedUrls.claude}
                  promptGeminiUrl={advancedUrls.gemini}
                  demoVideo={advancedDemoVideo}
                />
              </div>
            )}
          </section>
        )}

        {lesson.day < 10 && (
          <div className="pb-2">
           <a 
              href={"/audit/lesson/" + String(lesson.day + 1)}
              className="flex items-center justify-between rounded-md border bg-muted/30 px-5 py-4 transition-colors hover:bg-muted/50"
            >
              <div>
                <p className="mb-0.5 text-xs font-medium uppercase tracking-wide text-muted-foreground">
                  Next lesson
                </p>
                <p className="text-sm font-medium">{"Day " + String(lesson.day + 1)}</p>
              </div>
              <span className="text-sm text-[#E24B4A]">Continue →</span>
            </a>
          </div>
        )}

        <Separator />

        {lesson.learnMore && lesson.learnMore.length > 0 && (
          <section id="learnmore" data-tour="learnmore" className="scroll-mt-28 py-8 pb-16">
            <h2 className="mb-1 text-xl font-semibold text-[#E24B4A]">Learn More</h2>
            <p className="mb-5 text-sm text-muted-foreground">
              Articles, tools, and references from this lesson.
            </p>
            <div className="divide-y">
              {lesson.learnMore.map((link, i) =>
                isLocked("learnMore", lesson.day) ? (
                  <div key={i} className="flex cursor-not-allowed items-center justify-between gap-4 py-4">
                    <span className="text-base text-muted-foreground">{link.title}</span>
                    <span className="shrink-0 text-xs capitalize text-muted-foreground opacity-45">
                      {link.type + " · locked"}
                    </span>
                  </div>
                ) : (
                 <a
                    key={i}
                    href={link.url}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center justify-between gap-4 py-4 hover:opacity-70"
                  >
                    <span className="text-base">{link.title}</span>
                    <span className="shrink-0 text-sm capitalize text-muted-foreground">
                      {link.type + " ↗"}
                    </span>
                  </a>
                )
              )}
            </div>
          </section>
        )}

      </main>

      <footer className="border-t bg-muted/30">
        <div className="mx-auto flex max-w-4xl items-center justify-between px-8 py-4 text-sm text-muted-foreground">
          <a href="/audit" className="hover:underline">Back to course overview</a>
          <a href="/enroll" className="hover:underline">Enroll →</a>
        </div>
      </footer>

    </div>
  );
}