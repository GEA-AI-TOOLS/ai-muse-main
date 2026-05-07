import { getParticipant } from "@/lib/n8n";

export default async function WaitingPage() {
  let cohortId = "";
  try {
    const { participant } = await getParticipant();
    cohortId = participant.cohortId;
  } catch {
    // show generic message if can't fetch
  }

  function formatStartDate(id: string): string {
    const parts = id.replace("cohort_", "").split("_");
    if (parts.length !== 3) return "soon";
    const date = new Date(Number(parts[0]), Number(parts[1]) - 1, Number(parts[2]));
    return date.toLocaleDateString("en-US", {
      weekday: "long", month: "long", day: "numeric",
    });
  }

  const startDate = cohortId ? formatStartDate(cohortId) : "soon";

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="w-full max-w-md text-center">
        <div className="mb-6 flex justify-center">
          <a href="/progress" className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded bg-[#E24B4A] text-sm font-medium text-white">
              M
            </div>
          </a>
        </div>
        <h1 className="mb-3 text-2xl font-medium">Your cohort starts {startDate}</h1>
        <p className="mb-6 text-sm text-muted-foreground leading-relaxed">
          You will receive your first lesson on Monday morning. Each weekday for 10 days, a short lesson arrives in your inbox — 10 minutes, that is it.
        </p>
        <div className="rounded-md border bg-muted/40 p-5 text-left">
          <p className="mb-3 text-xs font-medium uppercase tracking-wide text-muted-foreground">
            What to expect
          </p>
          <div className="space-y-2 text-sm text-muted-foreground">
            <p>Monday–Friday · One lesson per day · ~10 minutes</p>
            <p>Email + WhatsApp reminders each morning</p>
            <p>Access every lesson here any time after it sends</p>
            <p>Capstone project unlocks after Day 10</p>
          </div>
        </div>
        <p className="mt-6 text-xs text-muted-foreground">
          {"Questions? "}
          <a
            href="mailto:support.muse@bryancassady.com?subject=Pre-cohort%20question"
            className="underline"
          >
            Contact us
          </a>
        </p>
      </div>
    </div>
  );
}