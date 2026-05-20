import { getParticipant } from "@/lib/n8n";

export default async function WaitingPage() {
  let cohortId = "";
  let participantName = "";
  try {
    const { participant } = await getParticipant();
    cohortId = participant.cohortId;
    participantName = participant.name.split(" ")[0];
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
    <div className="min-h-screen bg-background">

      {/* Header */}
      <header className="border-b">
        <div className="mx-auto flex max-w-3xl items-center justify-between px-8 py-3">
          <a href="/progress" className="flex items-center gap-2 hover:opacity-80">
            <img src="/assets/site-icon.png" alt="AI Muse" className="h-7 w-7 rounded object-contain" />
            <span className="text-sm font-medium">Make AI Your Muse</span>
          </a>
        </div>
      </header>

      <main className="mx-auto max-w-3xl px-8">

        {/* Start date banner */}
        <div className="mt-10 mb-8 rounded-lg border border-[#F09595] bg-[#FCEBEB] px-6 py-5">
          <p className="text-xs font-medium uppercase tracking-wide text-[#A32D2D] mb-1">
            Your cohort starts
          </p>
          <p className="text-2xl font-medium text-[#501313]">{startDate}</p>
          {participantName && (
            <p className="mt-1 text-sm text-[#791F1F]">
              {"Welcome, " + participantName + ". You are in."}
            </p>
          )}
        </div>

        {/* Description */}
        <p className="text-base text-muted-foreground leading-relaxed mb-8">
          You will receive your first lesson on Monday morning. Each weekday for 10 days, a short lesson arrives in your inbox — 10 minutes, that is it.
        </p>

        {/* What to expect */}
        <div className="rounded-md border bg-muted/40 p-5 mb-8">
          <p className="mb-3 text-xs font-medium uppercase tracking-wide text-muted-foreground">
            What to expect
          </p>
          <div className="space-y-2 text-sm text-muted-foreground">
            <p>Monday–Friday · One lesson per day · ~10 minutes</p>
            <p>Email reminders each morning</p>
            <p>Access every lesson here any time after it sends</p>
            <p>Capstone project unlocks after Day 10</p>
          </div>
        </div>

        {/* CTAs */}
        <div className="flex flex-col gap-3 sm:flex-row">
          <a
            href="/welcome"
            className="flex-1 rounded-md bg-[#E24B4A] px-5 py-3 text-center text-sm font-medium text-white hover:bg-[#c73f3e]"
          >
            Read the course overview →
          </a>
          <a
            href="/progress"
            className="flex-1 rounded-md border px-5 py-3 text-center text-sm text-muted-foreground hover:bg-accent"
          >
            Go to my dashboard
          </a>
        </div>

        <p className="mt-8 text-xs text-muted-foreground text-center">
          {"Questions? "}
          <a
            href="mailto:support.muse@bryancassady.com?subject=Pre-cohort%20question"
            className="underline"
          >
            Contact us
          </a>
        </p>

      </main>

    </div>
  );
}