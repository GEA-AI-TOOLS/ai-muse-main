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

const CONTENT_SECTIONS = [
  {
    tag: "You are not behind.",
    body: "You are at the point where how you use AI starts to matter. Stop treating it like an answer box. Start reasoning with it.",
  },
  {
    tag: "Stop querying. Start reasoning.",
    body: "AI is not here to replace your thinking. It is here to extend it. The mistake most people make is querying. The move is reasoning together.",
  },
  {
    tag: "Three things change everything.",
    list: [
      "How you frame the problem",
      "How you iterate",
      "How you steer what comes back",
    ],
    footer: "Improve these, your results improve immediately.",
  },
  {
    tag: "What the 10 days look like.",
    body: "Days 1 to 4 build the foundation — mindset shift, using AI to challenge your thinking, generating volume, and synthesizing complexity. Days 5 to 10 apply the SPARKS system: Speak, Pivot, Ask, Reframe, Keep going, Strategic pause. These are behaviours, not features.",
  },
  {
    tag: "You build something real.",
    body: "The capstone is a personal AI assistant built around your work, your challenges, your way of thinking. Not a certificate — the thing itself.",
  },
  {
    tag: "10 minutes a day. That's it.",
    body: "Show up. Try things. Consistent practice beats perfect prompts.",
  },
  {
    tag: "The tool doesn't change. You do.",
    body: "The value is not in the tool. It is in how you use it. Reasoning with AI, not querying it, is what changes your output.",
    highlight: true,
  },
];

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
            This page mirrors the real course — same structure, same summaries, same
            daily rhythm. Video, exercises, and prompts unlock when you enroll.
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
            {totalComplete} of 10 days complete · today is Day{" "}
            {AUDIT_PERSONA.currentDay}
          </p>
        </div>

        {/* Day list */}
        <div className="border-b py-8">
          <h2 className="mb-4 text-xl font-medium">All 10 days</h2>
          <p className="mb-4 text-sm text-muted-foreground">
            {AUDIT_COPY.dayListHint}
          </p>
          <div className="divide-y">
            {Array.from({ length: 10 }, (_, i) => i + 1).map((day) => {
              const status = getDayStatus(day);
              const title = DAY_TITLES[day] ?? "Lesson " + String(day);
              const phase = PHASE_LABEL[day] === "foundation" ? "Foundation" : "SPARKS";
              const label =
                status === "complete" ? "Revisit" :
                status === "missed" ? "Catch up" :
                status === "today" ? "Today" : "Preview →";
              const labelStyle =
                status === "missed" || status === "today"
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

        <Separator />

        {/* Intro video — unlocked by design */}
        <div className="border-b py-8">
          <p className="mb-1 text-xs font-medium uppercase tracking-wide text-muted-foreground">
            Before you begin
          </p>
          <h2 className="mb-4 text-xl font-medium">A word from Bryan</h2>
          <div className="aspect-video overflow-hidden rounded-md bg-black">
            <iframe
              src="https://www.youtube.com/embed/dlY4Rh1LXXQ?si=lBtOQn_rRg1Wg8oz"
              className="h-full w-full"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
        </div>

        {/* Assessment — small locked teaser */}
        <div className="border-b py-8">
          <LockedCard
            title="Know where you start"
            subtitle="A short AI self-assessment prompt, unlocked when you enroll."
          />
        </div>

        {/* Content sections */}
        <div className="flex flex-col py-8">
          {CONTENT_SECTIONS.map((section, i) => (
            <div
              key={i}
              className={
                "border-b py-8 " +
                (section.highlight ? "-ml-6 border-l-[3px] border-l-[#E24B4A] pl-6" : "")
              }
            >
              <h2 className={"mb-3 text-xl font-medium " + (section.highlight ? "text-[#E24B4A]" : "")}>
                {section.tag}
              </h2>
              {section.body && (
                <p className="text-base leading-relaxed text-muted-foreground">
                  {section.body}
                </p>
              )}
              {section.list && (
                <>
                  <ul className="mb-3 mt-2 flex flex-col gap-2">
                    {section.list.map((item, j) => (
                      <li key={j} className="flex items-start gap-3 text-base text-muted-foreground">
                        <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[#E24B4A]" />
                        {item}
                      </li>
                    ))}
                  </ul>
                  {section.footer && (
                    <p className="text-sm italic text-muted-foreground">{section.footer}</p>
                  )}
                </>
              )}
            </div>
          ))}
        </div>

        {/* What's ahead */}
        <div className="border-b py-8">
          <h2 className="mb-4 text-xl font-medium">What's ahead</h2>
          <div className="flex flex-col gap-3">
            <LockedCard
              title="Capstone · build your own AI tool"
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