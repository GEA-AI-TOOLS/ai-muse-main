"use client";

import { Separator } from "@/components/ui/separator";
import { TrackerBar } from "@/components/tracker-bar";
import { AuditBar, AuditHeader } from "@/components/audit/audit-bar";
import { LockedCard, EnrollCta } from "@/components/audit/audit-lock";
import { AuditTour } from "@/components/audit/audit-tour";
import { AUDIT_COPY } from "@/lib/audit-config";
import { PROGRESS_TOUR } from "@/lib/audit-tour";
import { useAuditProgress } from "@/hooks/use-audit-progress";
import { track } from "@vercel/analytics";

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
  1: "foundation", 2: "foundation", 3: "foundation", 4: "foundation",
  5: "sparks", 6: "sparks", 7: "sparks", 8: "sparks", 9: "sparks", 10: "sparks",
};

export function AuditView() {
  const { day1Done, currentDay, daysComplete } = useAuditProgress();

  return (
    <div className="min-h-screen bg-background sm:border-x-2 sm:border-b-2 sm:border-[#E24B4A]">

      <AuditBar showTour />
      <AuditHeader />
      <AuditTour id="progress" steps={PROGRESS_TOUR.steps} finish={PROGRESS_TOUR.finish} />

      <main className="mx-auto max-w-3xl px-8">

        {/* Hero */}
        <div className="border-b py-12">
          <p className="mb-3 text-xs font-medium uppercase tracking-wide text-muted-foreground">
            Course preview
          </p>

          <h1 className="mb-4 text-4xl font-medium leading-tight">
            Disciplined AI: The SPARKS Method
          </h1>

          <p className="max-w-xl text-base text-muted-foreground">
            This page mirrors the real course. Same structure, same summaries, same
            daily rhythm. Day 1 is fully open below, so you can see exactly what
            enrolling gets you.
          </p>

          {/* Course benefits */}
          <div className="mt-7 grid grid-cols-1 overflow-hidden rounded-md border bg-muted/20 sm:grid-cols-3">
            <div className="px-5 py-4 sm:border-r">
              <div className="flex items-baseline gap-1.5">
                <span className="text-3xl font-medium leading-none text-[#E24B4A]">
                  10
                </span>
                <span className="text-lg font-medium">min</span>
              </div>
              <p className="mt-2 text-xs leading-relaxed text-muted-foreground">
                A day. Short enough to finish before your first meeting.
              </p>
            </div>

            <div className="border-t px-5 py-4 sm:border-r sm:border-t-0">
              <div className="flex items-center gap-2">
                <span className="text-3xl font-medium leading-none">57</span>
                <span className="text-2xl text-[#E24B4A]">→</span>
                <span className="text-3xl font-medium leading-none text-[#E24B4A]">81</span>
              </div>
              <p className="mt-2 text-xs leading-relaxed text-muted-foreground">
                Average learner score from Day 1 to Day 10.
              </p>
            </div>

            <div className="border-t px-5 py-4 sm:border-t-0">
              <div className="text-3xl font-medium leading-none text-[#E24B4A]">
                Yours.
              </div>
              <p className="mt-2 text-xs leading-relaxed text-muted-foreground">
                Keep every prompt and template after the course ends.
              </p>
            </div>
          </div>

          {/* Actions */}
          <div className="mt-6 flex flex-wrap items-center gap-3">
            <EnrollCta />
           <a 
              href="/audit/lesson/1"
              onClick={() => track("audit_day_clicked", { day: 1, placement: "hero" })}
              className="inline-flex items-center justify-center rounded-md border px-4 py-2 text-sm font-medium transition-colors hover:bg-muted/50"
            >
              {day1Done ? "Revisit Day 1 →" : "Try Day 1 free →"}
            </a>
          </div>
        </div>

        {/* Progress, the visitor is their own Day 1 learner */}
        <div className="border-b py-8">
          <h2 className="mb-1 text-xl font-medium">{AUDIT_COPY.progressTitle}</h2>
          <p className="mb-6 text-sm text-muted-foreground">
            {day1Done ? AUDIT_COPY.progressNoteDone : AUDIT_COPY.progressNote}
          </p>
          <div data-tour="tracker" className="rounded-md border bg-muted/30 px-5 py-4">
            <TrackerBar
              currentDay={currentDay}
              daysComplete={daysComplete}
              allDone={false}
              basePath="/audit/lesson"
            />
          </div>
          {day1Done && (
            <div className="mt-4 flex flex-col gap-3 rounded-md border border-[#F09595] bg-[#FCEBEB] px-5 py-4 dark:border-[#791F1F] dark:bg-[#3a1010] sm:flex-row sm:items-center sm:justify-between">
              <p className="text-sm text-[#501313] dark:text-[#f5c1c1]">
                {AUDIT_COPY.progressDoneCta}
              </p>
              <div
                className="shrink-0"
                onClick={() => track("enroll_cta_clicked", { placement: "audit_progress_done" })}
              >
                <EnrollCta />
              </div>
            </div>
          )}
        </div>

        <Separator />

        {/* Course overview link, mirrors /progress -> /welcome in the real app */}
        <div className="py-4">
          <a
            href="/audit/welcome"
            data-tour="welcome"
            onClick={() => track("audit_welcome_clicked", { placement: "progress" })}
            className="flex flex-col gap-2 rounded-md border bg-muted/30 px-4 py-3 transition-colors hover:bg-muted/50 sm:flex-row sm:items-center sm:justify-between sm:gap-4"
          >
            <div>
              <p className="mb-0.5 text-xs font-medium uppercase tracking-wide text-muted-foreground">
                {AUDIT_COPY.courseOverviewTitle}
              </p>
              <p className="text-sm font-medium">{AUDIT_COPY.courseOverviewSubtitle}</p>
            </div>
            <span className="shrink-0 text-xs text-muted-foreground">Open →</span>
          </a>
        </div>

        <Separator />

        {/* Day 1 highlight */}
        <div className="py-8">
          <a
            href="/audit/lesson/1"
            data-tour="day1"
            onClick={() => track("audit_day_clicked", { day: 1, placement: "highlight_card" })}
            className="block rounded-lg border-2 border-[#E24B4A] bg-[#FCEBEB] px-5 py-5 transition-opacity hover:opacity-90 dark:bg-[#3a1010]"
          >
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="text-xs font-medium uppercase tracking-wide text-[#A32D2D] dark:text-[#f5c1c1]">
                  {AUDIT_COPY.day1HighlightTitle}
                </p>
                <p className="mt-1 text-base font-medium text-[#501313] dark:text-[#f5c1c1]">
                  {"Day 1 · " + DAY_TITLES[1]}
                </p>
                <p className="mt-1 max-w-md text-xs text-[#791F1F] dark:text-[#f5c1c1]">
                  {AUDIT_COPY.day1HighlightBody}
                </p>
              </div>
              <span className="shrink-0 rounded-md bg-[#E24B4A] px-4 py-2 text-center text-sm font-medium text-white sm:inline-block">
                {day1Done ? AUDIT_COPY.day1CtaDone : AUDIT_COPY.day1Cta}
              </span>
            </div>
          </a>
        </div>

        {/* Day list */}
        <div className="border-b py-8">
          <h2 className="mb-1 text-xl font-medium">All 10 days</h2>
          <p className="mb-4 text-sm text-muted-foreground">
            {AUDIT_COPY.otherDaysNote}
          </p>
          <div className="divide-y">
            {Array.from({ length: 10 }, (_, i) => i + 1).map((day) => {
              const title = DAY_TITLES[day] ?? "Lesson " + String(day);
              const phase = PHASE_LABEL[day] === "foundation" ? "Foundation" : "SPARKS";
              let label = "Preview →";
              let labelStyle = "text-muted-foreground";
              if (day === 1) {
                label = day1Done ? "Done ✓" : "Open";
                labelStyle = "text-[#0F6E56] font-medium";
              } else if (day === 2 && day1Done) {
                label = "Up next";
                labelStyle = "text-[#E24B4A]";
              }

              return (
                <a
                  key={day}
                  href={"/audit/lesson/" + String(day)}
                  onClick={() => track("audit_day_clicked", { day, placement: "day_list" })}
                  className="flex items-center justify-between py-3 hover:opacity-70"
                >
                  <div>
                    <p className="text-sm">{"Day " + String(day) + " · " + title}</p>
                    <p className="text-xs text-muted-foreground">{phase}</p>
                  </div>
                  <span className={"text-xs " + labelStyle}>{label}</span>
                </a>
              );
            })}
          </div>
        </div>

        {/* What's ahead */}
        <div className="border-b py-8">
          <div data-tour="ahead">
            <h2 className="mb-4 text-xl font-medium">What&apos;s ahead</h2>
            <div className="flex flex-col gap-3">
              <LockedCard
                title="Capstone. Build your own AI tool"
                subtitle="Unlocks after all 10 days. Apply everything to something real."
              />
              <LockedCard
                title="Certificate of completion"
                subtitle="Verifiable, issued when all 10 days are done."
              />
              <LockedCard
                title="Certificate of mastery"
                subtitle="Verifiable, issued when your capstone is reviewed."
              />
            </div>
          </div>
        </div>

        {/* Final CTA */}
        <div className="flex flex-col items-center gap-4 py-10 pb-16 text-center">
          <p className="text-sm text-muted-foreground">
            Everything above unlocks the moment you enroll.
          </p>
          <EnrollCta />
        </div>

      </main>

      <footer className="border-t bg-muted/30">
        <div className="mx-auto flex max-w-3xl items-center justify-between px-8 py-4 text-sm text-muted-foreground">
          <a href="/home" className="hover:underline">Back home</a>
          <a href="/enroll" className="hover:underline">Enroll →</a>
        </div>
      </footer>

    </div>
  );
}