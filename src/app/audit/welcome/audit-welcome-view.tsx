import { AuditBar, AuditHeader } from "@/components/audit/audit-bar";
import { LockedCard, EnrollCta } from "@/components/audit/audit-lock";

const SECTIONS = [
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
    body: "Days 1 to 4 build the foundation, mindset shift, using AI to challenge your thinking, generating volume, and synthesizing complexity. Days 5 to 10 apply the SPARKS system, Speak, Pivot, Ask, Reframe, Keep going, Strategic pause. These are behaviours, not features.",
  },
  {
    tag: "You build something real.",
    body: "The capstone is a personal AI assistant built around your work, your challenges, your way of thinking. Not a certificate, the thing itself.",
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

export function AuditWelcomeView() {
  return (
    <div className="min-h-screen bg-background">

      <AuditBar />
      <AuditHeader />

      <main className="mx-auto max-w-3xl px-8">

        <div className="border-b py-12">
          <p className="mb-3 text-xs font-medium uppercase tracking-wide text-muted-foreground">
            Before you begin
          </p>
          <h1 className="mb-4 text-4xl font-medium leading-tight">
            What you are about to do is different.
          </h1>
          <p className="max-w-xl text-base text-muted-foreground">
            Most people use AI the same way they used Google. This is not that. This
            is what every enrolled participant reads before Day 1.
          </p>
        </div>

        <div className="border-b py-8">
          <div className="aspect-video overflow-hidden rounded-md bg-black">
            <iframe
              src="https://www.youtube.com/embed/dlY4Rh1LXXQ?si=lBtOQn_rRg1Wg8oz"
              className="h-full w-full"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
        </div>

        <div className="border-b py-8">
          <LockedCard
            title="Know where you start"
            subtitle="A short AI self-assessment prompt, unlocked when you enroll."
          />
        </div>

        <div className="flex flex-col py-8">
          {SECTIONS.map((section, i) => (
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

        <div className="flex flex-col items-center gap-4 py-10 pb-16 text-center">
          <p className="text-sm text-muted-foreground">You have read enough. See it in action.</p>
          <a
            href="/audit/lesson/1"
            className="inline-flex items-center gap-2 rounded-md bg-[#E24B4A] px-6 py-3 text-sm font-medium text-white hover:bg-[#c73f3e]"
          >
            Open Day 1, fully unlocked →
          </a>
          <EnrollCta className="mt-1" />
        </div>

      </main>

      <footer className="border-t bg-muted/30">
        <div className="mx-auto flex max-w-3xl items-center justify-between px-8 py-4 text-sm text-muted-foreground">
          <a href="/audit" className="hover:underline">Back to overview</a>
          <a href="/enroll" className="hover:underline">Enroll →</a>
        </div>
      </footer>

    </div>
  );
}