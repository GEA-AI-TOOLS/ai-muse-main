import { Separator } from "@/components/ui/separator";
import { TrackerBar } from "@/components/tracker-bar";
import { AuditBar, AuditHeader } from "@/components/audit/audit-bar";
import { LockedCard, EnrollCta } from "@/components/audit/audit-lock";
import { AUDIT_PERSONA, AUDIT_COPY } from "@/lib/audit-config";

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

function getDayStatus(day: number): "complete" | "today" | "missed" | "upcoming" {
  if (AUDIT_PERSONA.daysComplete.includes(day)) return "complete";
  if (day === AUDIT_PERSONA.currentDay) return "today";
  if (day < AUDIT_PERSONA.currentDay) return "missed";
  return "upcoming";
}

export function AuditView() {
  const totalComplete = AUDIT_PERSONA.daysComplete.length;

  return (
    <div className="min-h-screen bg-background sm:border-x-2 sm:border-b-2 sm:border-[#E24B4A]">

      <AuditBar />
      <AuditHeader />

      <main className="mx-auto max-w-3xl px-8">

        {/* Hero */}
        <div className="border-b py-12">
          <p className="mb-3 text-xs font-medium uppercase tracking-wide text-muted-foreground">
            Course preview
          </p>
          <h1 className="mb-4 text-4xl font-medium leading-tight">
            Make AI Your Muse in 10 Days
          </h1>
          <p className="max-w-xl text-base text-muted-foreground">
            This page mirrors the real course. Same structure, same summaries, same
            daily rhythm. Day 1 is fully open below, so you can see exactly what
            enrolling gets you.
          </p>
          <div className="mt-6">
            <EnrollCta />
          </div>
        </div>

        {/* Simulated progress */}
        <div className="border-b py-8">
          <h2 className="mb-1 text-xl font-medium">A sample learner's week</h2>
          <p className="mb-6 text-sm text-muted-foreground">
            {AUDIT_COPY.personaNote}
          </p>
          <div className="rounded-md border bg-muted/30 px-5 py-4">
            <TrackerBar
              currentDay={AUDIT_PERSONA.currentDay}
              daysComplete={AUDIT_PERSONA.daysComplete}
              allDone={false}
              basePath="/audit/lesson"
            />
          </div>
          <p className="mt-3 text-xs text-muted-foreground">
            {totalComplete} of 10 days complete. Today is Day {AUDIT_PERSONA.currentDay}.
          </p>
        </div>

        <Separator />

        {/* Course overview link, mirrors /progress -> /welcome in the real app */}
        <div className="py-4">
          <a
            href="/audit/welcome"
            className="flex items-center justify-between rounded-md border bg-muted/30 px-4 py-3 transition-colors hover:bg-muted/50"
          >
            <div>
              <p className="mb-0.5 text-xs font-medium uppercase tracking-wide text-muted-foreground">
                {AUDIT_COPY.courseOverviewTitle}
              </p>
              <p className="text-sm font-medium">{AUDIT_COPY.courseOverviewSubtitle}</p>
            </div>
            <span className="shrink-0 text-xs text-muted-foreground">Read →</span>
          </a>
        </div>

        <Separator />

        {/* Day 1 highlight */}
        <div className="py-8">
          <a
            href="/audit/lesson/1"
            className="block rounded-lg border-2 border-[#E24B4A] bg-[#FCEBEB] px-5 py-5 transition-opacity hover:opacity-90 dark:bg-[#3a1010]"
          >
            <div className="flex items-center justify-between gap-4">
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
              <span className="shrink-0 rounded-md bg-[#E24B4A] px-4 py-2 text-sm font-medium text-white">
                {AUDIT_COPY.day1Cta}
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
              const status = getDayStatus(day);
              const title = DAY_TITLES[day] ?? "Lesson " + String(day);
              const phase = PHASE_LABEL[day] === "foundation" ? "Foundation" : "SPARKS";
              const isDayOne = day === 1;
              const label = isDayOne
                ? "Unlocked"
                : status === "complete" ? "Revisit"
                : status === "missed" ? "Catch up"
                : status === "today" ? "Today"
                : "Preview →";
              const labelStyle = isDayOne
                ? "text-[#0F6E56] font-medium"
                : status === "missed" || status === "today"
                ? "text-[#E24B4A]"
                : "text-muted-foreground";

              return (
                <a
                  key={day}
                  href={"/audit/lesson/" + String(day)}
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
          <h2 className="mb-4 text-xl font-medium">What's ahead</h2>
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