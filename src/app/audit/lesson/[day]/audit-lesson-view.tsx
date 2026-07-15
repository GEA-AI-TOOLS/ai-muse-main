import { Separator } from "@/components/ui/separator";
import { SummaryBlock } from "@/components/summary-block";
import { TrackerBar } from "@/components/tracker-bar";
import { AuditBar, AuditHeader } from "@/components/audit/audit-bar";
import {
  LockedVideo,
  LockedExercise,
  LockedCard,
  EnrollCta,
} from "@/components/audit/audit-lock";
import { AUDIT_PERSONA, AUDIT_COPY, isLocked } from "@/lib/audit-config";
import type { Lesson } from "@/lib/types";

const SECTIONS: { id: string; label: string }[] = [
  { id: "essential", label: "Essential" },
  { id: "advanced", label: "Advanced" },
  { id: "learnmore", label: "Learn More" },
];

export function AuditLessonView({ lesson }: { lesson: Lesson }) {
  const phaseLabel = lesson.phase === "foundation" ? "Foundation" : "SPARKS";
  const hasDemo = !!lesson.essential.exercise.demo?.videoUrl?.trim();

  const navItems = SECTIONS.filter((s) => {
    if (s.id === "advanced") return !!lesson.advanced;
    if (s.id === "learnmore") return !!(lesson.learnMore && lesson.learnMore.length > 0);
    return true;
  });

  return (
    <div className="min-h-screen bg-background">

      <AuditBar />
      <AuditHeader />

      <nav className="sticky top-10 z-20 border-b bg-background">
        <div className="mx-auto flex max-w-4xl gap-1 px-8 py-2">
          {navItems.map((section) => (
            <a
              key={section.id}
              href={"#" + section.id}
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
            currentDay={AUDIT_PERSONA.currentDay}
            daysComplete={AUDIT_PERSONA.daysComplete}
            allDone={false}
            basePath="/audit/lesson"
          />
          <p className="mt-4 border-t pt-3 text-xs text-muted-foreground">
            {AUDIT_COPY.personaNote}
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

          {!isLocked("essentialSummary", lesson.day) &&
            lesson.essential.summary[0]?.body?.trim() && (
              <div className="mb-5 rounded-r-md border-l-[3px] border-l-[#E24B4A] bg-[#FCEBEB] px-4 py-3 dark:bg-[#3a1010]">
                <p className="mb-1 text-[10px] font-medium uppercase tracking-[0.4px] text-[#A32D2D]">
                  {lesson.essential.summary[0].heading}
                </p>
                <p className="text-sm leading-relaxed text-[#501313] dark:text-[#f5c1c1]">
                  {lesson.essential.summary[0].body}
                </p>
              </div>
            )}

          {isLocked("essentialVideo", lesson.day) ? (
            <LockedVideo />
          ) : (
            <div className="aspect-video overflow-hidden rounded-md bg-black">
              <iframe
                src={lesson.essential.videoUrl}
                className="h-full w-full"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
          )}

          {!isLocked("essentialSummary", lesson.day) && (
            <>
              <div className="mt-8 mb-1">
                <h3 className="text-base font-semibold">Summary</h3>
              </div>
              <SummaryBlock summary={lesson.essential.summary} skipFirst />
            </>
          )}

          <div className="mt-8 mb-2 border-t pt-6">
            <h3 className="text-base font-semibold">Exercise</h3>
          </div>
          <LockedExercise
            objective={lesson.essential.exercise.objective}
            timeMinutes={lesson.essential.exercise.timeMinutes}
            hasDemo={hasDemo}
          />

          <div className="mt-8 rounded-md border border-[#F09595] bg-[#FCEBEB] px-5 py-4 dark:border-[#791F1F] dark:bg-[#3a1010]">
            <p className="mb-3 text-sm text-[#501313] dark:text-[#f5c1c1]">
              Enroll to unlock the video, the exercise, and the prompt for all 10 days.
            </p>
            <EnrollCta />
          </div>
        </section>

        <Separator />

        {lesson.advanced && (
          <section id="advanced" className="scroll-mt-28 py-8">
            <h2 className="text-xl font-semibold text-[#E24B4A]">Advanced</h2>
            {lesson.sectionTitles?.advanced ? (
              <p className="mt-0.5 text-base font-medium text-foreground">
                {lesson.sectionTitles.advanced}
              </p>
            ) : null}
            <p className="mt-0.5 mb-4 text-sm text-muted-foreground">
              Optional. Go deeper when you have time.
            </p>
            <LockedCard
              title={lesson.sectionTitles?.advanced ?? "Advanced lesson"}
              subtitle="A second video, summary, and exercise for this day."
            />
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
          <section id="learnmore" className="scroll-mt-28 py-8 pb-16">
            <h2 className="mb-1 text-xl font-semibold text-[#E24B4A]">Learn More</h2>
            <p className="mb-5 text-sm text-muted-foreground">
              Articles, tools, and references from this lesson.
            </p>
            <div className="divide-y">
              {lesson.learnMore.map((link, i) => (
                <div
                  key={i}
                  className="flex cursor-not-allowed items-center justify-between gap-4 py-4"
                >
                  <span className="text-base text-muted-foreground">{link.title}</span>
                  <span className="shrink-0 text-xs capitalize text-muted-foreground opacity-45">
                    {link.type + " · locked"}
                  </span>
                </div>
              ))}
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