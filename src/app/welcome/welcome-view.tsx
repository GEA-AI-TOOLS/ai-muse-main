"use client";

import { useState, useEffect } from "react";
import type { Participant } from "@/lib/types";

interface Props {
  participant: Participant;
}

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
    body: null,
    list: [
      "How you frame the problem",
      "How you iterate",
      "How you steer what comes back",
    ],
    footer: "Improve these, your results improve immediately.",
  },
  {
    tag: "What the next 10 days look like.",
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

export function WelcomeView({ participant }: Props) {
  const [darkMode, setDarkMode] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const firstName = participant.name.split(" ")[0];

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
    if (!dropdownOpen) return;
    const handler = () => setDropdownOpen(false);
    document.addEventListener("click", handler);
    return () => document.removeEventListener("click", handler);
  }, [dropdownOpen]);

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

  return (
    <div className="min-h-screen bg-background">

      {/* Header */}
      <header className="border-b">
        <div className="mx-auto flex max-w-3xl items-center justify-between px-8 py-3">
          <a href="/progress" className="flex items-center gap-2 hover:opacity-80">
            <img src="/assets/site-icon.png" alt="AI Muse" className="h-7 w-7 rounded object-contain" />
            <span className="text-sm font-medium">Make AI Your Muse</span>
          </a>
          <div className="flex items-center gap-3">
            <button onClick={toggleDarkMode} className="text-muted-foreground hover:text-foreground" aria-label="Toggle dark mode">
              {darkMode ? (
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/>
                </svg>
              ) : (
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
                </svg>
              )}
            </button>
            <div className="relative">
              <button
                onClick={(e) => { e.stopPropagation(); setDropdownOpen(!dropdownOpen); }}
                className="flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground"
              >
                {"Hi, " + firstName + " ▾"}
              </button>
              {dropdownOpen && (
                <div className="absolute right-0 top-7 z-50 w-52 rounded-md border bg-background shadow-md">
                  <div className="px-3 py-2.5">
                    <p className="text-xs text-muted-foreground">{formatCohort(participant.cohortId)}</p>
                    <p className="mt-0.5 text-xs text-muted-foreground">{participant.email}</p>
                  </div>
                  <div className="border-t" />
                  <a href="/account/devices" className="block w-full px-3 py-2.5 text-left text-xs hover:bg-accent">
                    Manage devices
                  </a>
                  <div className="border-t" />
                  <button onClick={handleLogout} className="w-full px-3 py-2.5 text-left text-xs hover:bg-accent">
                    Log out
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-3xl px-8">

        {/* Hero block */}
        <div className="py-12 border-b">
          <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground mb-3">
            Before you begin
          </p>
          <h1 className="text-4xl font-medium leading-tight mb-4">
            {"What you are about to do\nis different."}
          </h1>
          <p className="text-base text-muted-foreground max-w-xl">
            Most people use AI the same way they used Google. This is not that. Read this once before Day 1. It will change what you notice.
          </p>
        </div>

        {/* Video */}
        <div className="py-8 border-b">
          <div className="aspect-video overflow-hidden rounded-md bg-black">
            <iframe
              src="https://player.vimeo.com/video/502671331"
              className="h-full w-full"
              allow="autoplay; fullscreen; picture-in-picture"
              allowFullScreen
            />
          </div>
        </div>

        {/* AI assessment prompt */}
        <div className="py-8 border-b">
          <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground mb-1">
            Before Day 1
          </p>
          <h2 className="text-xl font-medium mb-2">Know where you start</h2>
          <p className="text-sm text-muted-foreground mb-4">
            Run this prompt in any AI tool before the course begins. It gives you a baseline of how you currently work with AI. You will run a second assessment after Day 10.
          </p>
          <AssessmentPrompt />
        </div>

        {/* Content sections */}
        <div className="py-8 flex flex-col gap-0">
          {SECTIONS.map((section, i) => (
            <div
              key={i}
              className={
                "py-8 border-b " +
                (section.highlight
                  ? "border-l-[3px] border-l-[#E24B4A] pl-6 -ml-6"
                  : "")
              }
            >
              <h2 className={
                "text-xl font-medium mb-3 " +
                (section.highlight ? "text-[#E24B4A]" : "")
              }>
                {section.tag}
              </h2>
              {section.body && (
                <p className="text-base text-muted-foreground leading-relaxed">
                  {section.body}
                </p>
              )}
              {section.list && (
                <>
                  <ul className="mt-2 mb-3 flex flex-col gap-2">
                    {section.list.map((item, j) => (
                      <li key={j} className="flex items-start gap-3 text-base text-muted-foreground">
                        <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[#E24B4A]" />
                        {item}
                      </li>
                    ))}
                  </ul>
                  {section.footer && (
                    <p className="text-sm text-muted-foreground italic">{section.footer}</p>
                  )}
                </>
              )}
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="py-10 pb-16 flex flex-col items-center text-center gap-4">
          <p className="text-sm text-muted-foreground">You have read enough. Now start.</p>
          <a
            href="/progress"
            className="inline-flex items-center gap-2 rounded-md bg-[#E24B4A] px-6 py-3 text-sm font-medium text-white hover:bg-[#c73f3e]"
          >
            Go to your dashboard →
          </a>
        </div>

      </main>

      {/* Footer */}
      <footer className="border-t bg-muted/30">
        <div className="mx-auto flex max-w-3xl items-center justify-between px-8 py-4 text-sm text-muted-foreground">
          <a href="/progress" className="hover:underline">Back to overview</a>
          <a href="mailto:support.muse@bryancassady.com" className="hover:underline">Need help? Contact us</a>
        </div>
      </footer>

    </div>
  );

  function AssessmentPrompt() {
    const [expanded, setExpanded] = useState(false);
    const [copied, setCopied] = useState(false);

    const prompt = `You are an AI Collaboration Assessor built on the SPARKS framework by Bryan Cassady.
Bryan Cassady helps leaders move from AI hype to impact. General information: www.bryancassady.com SPARKS information: www.bryancassady.com/sparks/ Run your own assessment: www.bryancassady.com/aiinsights/
Your job is to analyze how I currently work with AI, give me an honest scored profile, and show me exactly how to close the gaps.
Base everything on visible evidence. Do not invent patterns you cannot see. Do not inflate scores. Do not shame low scores.
The final output has three parts:
A detailed AI Collaboration Profile
A viral one-page share card in SVG
A detailed one-page diagnostic SVG report
STEP 1. CHECK CHAT HISTORY BY DEFAULT.
First, check whether you can see my recent AI conversation history or usage patterns.
If you can see chat history, use it by default.
Look across at least the past 2 weeks of visible interaction history where available.
Look for evidence of:
How I prompt AI
Whether I speak with AI or only type short commands
How often I iterate
Whether I use AI for output, thinking, strategy, critique, learning, or building
Whether I ask AI to challenge assumptions
Whether I define success criteria before asking for output
Whether I reframe tasks
Whether I verify or judge quality before finishing
Then tell me this in one sentence:
"I can see enough recent AI interaction history to create a grounded assessment."
Then ask:
"Roughly how many times per week do you use AI across all tools?
A. Less than 3 times a week B. 3 to 10 times a week C. 10 to 30 times a week D. More than 30 times a week"
Wait for my answer before continuing.
If you cannot see at least 2 weeks of recent chat history, say this:
"I cannot see enough recent AI interaction history to score you accurately."
Then ask this exactly and wait for my full response:
"I need to see how you actually use AI before I can score you accurately. Please give me 3 real examples from your recent work. For each one tell me:
What you asked AI
What AI gave you
What you did next
Also tell me roughly how many times per week you use AI across all tools:
A. Less than 3 times a week B. 3 to 10 times a week C. 10 to 30 times a week D. More than 30 times a week"
Do not score until you have real evidence and a frequency answer.
If examples are too vague, say so and ask for more detail.
STEP 2. ASSESS EVIDENCE QUALITY.
Before scoring, note internally:
How much evidence do you have?
Use this standard:
Solid:
At least 2 weeks of visible chat history, or
3 or more specific examples with enough detail
Provisional:
Less than 2 weeks of visible history, or
Fewer than 3 examples, or
Thin examples without enough detail
Do not show your internal reasoning. Only show the final Evidence Confidence label.
STEP 3. USAGE INTENSITY.
Use the frequency answer to assign one label.
Low: Less than 3 times a week. AI is occasional. Moderate: 3 to 10 times a week. AI is a regular tool. High: 10 to 30 times a week. AI is part of the daily workflow. Power User: More than 30 times a week. AI is constant. Risk is speed without quality.
Note: High frequency does not mean high collaboration quality. A Power User with a low score is your most important profile to name directly but without shame.
STEP 4. SCORE ACROSS TWO DIMENSIONS.
Total score is out of 100.
A. AI USE DIVERSITY: 40 points
Score visible use across 8 modes. Each mode is worth 0 to 5 points.
0 = no evidence 1 = weak evidence 3 = some evidence 5 = strong evidence
Output Mode. Drafts, rewrites, summarizes, formats, edits.
Research Mode. Explores, compares, synthesizes, explains options.
Coach Mode. Asks AI to ask questions, clarify thinking, guide reflection.
Critic Mode. Asks AI to challenge assumptions, find risks, stress-test ideas.
Strategy Mode. Uses AI to compare options, evaluate trade-offs, make decisions.
Builder Mode. Creates tools, workflows, templates, automations, processes.
Muse Mode. Uses AI for reframes, metaphors, creative leaps, alternative angles.
Learning Mode. Uses AI to explain, tutor, simulate practice, build skill.
B. SPARKS TECHNIQUE SCORE: 60 points
Score six behaviors. Each behavior is worth 0 to 10 points.
0 = no evidence 3 = occasional or weak evidence 5 = decent but inconsistent 8 = strong and repeated 10 = excellent and systematic
Speak With AI. Uses AI as a thinking partner by speaking with AI, not just typing short commands.
Pivot Roles. Asks AI to act as critic, coach, customer, strategist, skeptic, editor, teacher, interviewer, or other useful role.
Ask for More. Pushes past the first answer for depth, alternatives, sharper versions, examples, or stronger reasoning.
Reframe. Changes the problem definition, audience, assumption, constraint, success measure, or angle.
Keep Going. Iterates until the work genuinely improves, not just until it looks finished.
Stop and Think. Checks quality, verifies assumptions, decides what good means, or asks for evaluation before finishing.
STEP 5. GIVE THREE HEADLINE NUMBERS.
Current Collaboration Score: __ / 100 Near-Term Potential: __ / 100 Breakthrough Gap: __ points
STEP 6. ASSIGN A PROFILE LABEL.
0 to 24: Fast Starter. 25 to 44: Fast Producer. 45 to 64: Practical Operator. 65 to 79: AI Steerer. 80 to 89: AI Co-Builder. 90 to 100: AI Muse.
STEP 7. ASSIGN A SPARKS PROFILE PAIR.
STEP 8. GENERATE THE DETAILED PROFILE.`;

      const preview = prompt.slice(0, 300);

      function handleCopy() {
        navigator.clipboard.writeText(prompt).then(() => {
          setCopied(true);
          setTimeout(() => setCopied(false), 2000);
        });
      }

      return (
        <div className="rounded-md border border-dashed bg-muted/40 p-4">
          <p className="mb-2 text-[10px] font-medium uppercase tracking-[0.4px] text-muted-foreground">
            Assessment prompt
          </p>
          <div className="relative">
            <p className="font-mono text-sm leading-relaxed whitespace-pre-wrap">
              {expanded ? prompt : preview + "..."}
            </p>
            {!expanded && (
              <div className="absolute bottom-0 left-0 right-0 h-12 bg-gradient-to-t from-muted/40 to-transparent" />
            )}
          </div>
          <div className="mt-3 flex flex-wrap items-center gap-2">
            <button
              onClick={() => setExpanded(!expanded)}
              className="flex items-center gap-1.5 rounded border px-3 py-1.5 text-xs hover:bg-accent"
            >
              {expanded ? "Show less" : "Show full prompt"}
            </button>
            <button
              onClick={handleCopy}
              className="flex items-center gap-1.5 rounded border px-3 py-1.5 text-xs hover:bg-accent"
            >
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="9" y="9" width="13" height="13" rx="2" ry="2"/>
                <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/>
              </svg>
              {copied ? "Copied!" : "Copy prompt"}
            </button>
            <a
              href="https://chatgpt.com"
              target="_blank"
              rel="noreferrer"
              className="rounded border px-3 py-1.5 text-xs hover:bg-accent"
            >
              Open ChatGPT ↗
            </a>
            <a
              href="https://claude.ai/new"
              target="_blank"
              rel="noreferrer"
              className="rounded border px-3 py-1.5 text-xs hover:bg-accent"
            >
              Open Claude ↗
            </a>
          </div>
        </div>
      );
    }
}