"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function CapstonePage() {
  const [submitted, setSubmitted] = useState(false);
  const [projectUrl, setProjectUrl] = useState("");
  const [notes, setNotes] = useState("");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    // Dummy — not connected to anything yet
    setSubmitted(true);
  }

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b">
        <div className="mx-auto flex max-w-3xl items-center px-6 py-3">
          <a href="/progress" className="flex items-center gap-2 hover:opacity-80">
            <div className="flex h-6 w-6 items-center justify-center rounded bg-[#E24B4A] text-xs font-medium text-white">
              M
            </div>
            <span className="text-sm font-medium">Make AI Your Muse</span>
          </a>
        </div>
      </header>

      <main className="mx-auto max-w-3xl px-6 py-10">

        <div className="mb-2 text-xs font-medium uppercase tracking-wide text-muted-foreground">
          Capstone
        </div>
        <h1 className="mb-2 text-3xl font-medium">Build your own AI tool</h1>
        <p className="mb-8 text-sm text-muted-foreground">
          Apply everything from the 10 days. Build a custom GPT, a Claude project, or a Gemini Gem — something real that you will actually use.
        </p>

        <div className="mb-10 aspect-video overflow-hidden rounded-md bg-black">
          <div className="flex h-full w-full items-center justify-center">
            <span className="text-sm text-white/40">Capstone video — coming soon</span>
          </div>
        </div>

        <div className="mb-10 space-y-6">
          <Step
            number="01"
            title="Pick your tool"
            description="Choose a platform: ChatGPT (custom GPT), Claude (project with instructions), or Gemini (Gem). Pick the one you already use."
          />
          <Step
            number="02"
            title="Define the job"
            description="Write one sentence: what does your tool do, for whom, and what does it never do. This becomes your system prompt foundation."
          />
          <Step
            number="03"
            title="Write your system prompt using C.A.R."
            description="Context: who is using this, what do they bring to it, what are they trying to accomplish. Action: the specific task, the tone, the format. Review: what counts as a good output and what disqualifies a bad one."
          />
          <Step
            number="04"
            title="Test it against three real tasks"
            description="Run three actual problems you face through your tool. Note where it works exactly as intended and where it needs adjustment."
          />
          <Step
            number="05"
            title="Refine and share"
            description="Make one improvement based on your tests. Then submit your project link below."
          />
        </div>

        <div className="rounded-md border p-6">
          {submitted ? (
            <div className="text-center">
              <p className="mb-1 text-base font-medium">Project submitted</p>
              <p className="text-sm text-muted-foreground">
                Well done. Check your email for next steps.
              </p>
            </div>
          ) : (
            <>
              <h2 className="mb-1 text-base font-medium">Submit your project</h2>
              <p className="mb-4 text-sm text-muted-foreground">
                Share a link to your custom GPT, Claude project, or Gemini Gem.
              </p>
              <form onSubmit={handleSubmit} className="space-y-3">
                <div>
                  <label className="mb-1 block text-xs text-muted-foreground">
                    Project link
                  </label>
                  <Input
                    type="url"
                    placeholder="https://chatgpt.com/g/..."
                    value={projectUrl}
                    onChange={(e) => setProjectUrl(e.target.value)}
                    required
                  />
                </div>
                <div>
                  <label className="mb-1 block text-xs text-muted-foreground">
                    What does it do? (one sentence)
                  </label>
                  <Input
                    type="text"
                    placeholder="It helps me write better briefs for my team."
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    required
                  />
                </div>
                <Button
                  type="submit"
                  className="w-full bg-[#E24B4A] hover:bg-[#c73f3e]"
                >
                  Submit project
                </Button>
              </form>
            </>
          )}
        </div>

      </main>

      <footer className="border-t bg-muted/30">
        <div className="mx-auto flex max-w-3xl items-center justify-between px-6 py-3 text-xs text-muted-foreground">
          <a href="/progress" className="hover:underline">Back to overview</a>
          <a
            href="mailto:support.muse@bryancassady.com?subject=Capstone%20help"
            className="hover:underline"
          >
            Need help? Contact us
          </a>
        </div>
      </footer>
    </div>
  );
}

function Step({
  number,
  title,
  description,
}: {
  number: string;
  title: string;
  description: string;
}) {
  return (
    <div className="flex gap-4">
      <span className="mt-0.5 text-xl font-medium leading-none text-[#E24B4A]">
        {number}
      </span>
      <div>
        <p className="font-medium">{title}</p>
        <p className="mt-1 text-sm text-muted-foreground leading-relaxed">{description}</p>
      </div>
    </div>
  );
}