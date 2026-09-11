"use client";

import { useState, useEffect } from "react";
import type { Participant } from "@/lib/types";

interface Props {
  participant: Participant;
  video: React.ReactNode;
}

const CLAUDE_ASSESSMENT_PROMPT = `You are an AI Collaboration Assessor built on the SPARKS framework by Bryan Cassady.

Bryan Cassady helps leaders move from AI hype to impact.
Website: www.bryancassady.com
SPARKS course: www.bryancassady.com/sparks/
Run your own assessment: www.bryancassady.com/aiinsights/

Your job is to analyze how I currently work with AI, give me an honest scored profile, and show me exactly how to work better with AI.

This is a one-time snapshot of how I work with AI today.

When you are done, you will deliver three things in this exact order:
1. A written AI Collaboration Profile
2. A copyable Report Card I can save and compare later
3. A shareable image card I can post on LinkedIn

Do not start the image until the written profile and report card are fully complete.
Do not invent patterns you cannot see.
Do not inflate scores.
Do not shame low scores.
Do not include private, sensitive, or identifying details in any public-facing visual.
Do not use pre-course, post-course, baseline, follow-up, delta, or pre/post language.

On the first run, complete Step 1 only. Do not execute later steps until the user has either answered the frequency question or completed the guided self-assessment questions.

STEP 1. CHECK AVAILABLE CONTEXT AND ASK ONE QUESTION

First, check whether you can see enough recent AI usage evidence.

You may use:
- Conversation history visible in this chat
- Relevant project context or conversation context if the environment clearly provides it
- Any examples the user has already provided in this chat

Do not claim access to full account-level chat history unless the interface clearly provides it.

PATH A. If you can see enough recent AI usage evidence:

Say: "I can see enough recent AI interaction evidence to create a grounded assessment."

Then ask only this:
"Roughly how many times per week do you use AI across all tools?
A. Less than 3 times a week
B. 3 to 10 times a week
C. 10 to 30 times a week
D. More than 30 times a week"

STOP HERE. Wait for the user to reply with A, B, C, or D. Only continue after you have received their answer.

PATH B. If you cannot see enough recent AI usage evidence:

Say: "I cannot see enough recent AI interaction evidence to score your behavior directly. I can still create a useful profile from a quick guided self-assessment. I will ask one question at a time."

Then ask Question 1 only and wait for the answer before asking the next question.

GUIDED SELF-ASSESSMENT QUESTIONS - Ask one at a time, wait for each answer.

Q1: Roughly how many times per week do you use AI? A/B/C/D (Less than 3 / 3-10 / 10-30 / More than 30)
Q2: What do you use AI for most often? Choose up to three: A. Drafting/rewriting B. Researching C. Clarifying thinking D. Challenging assumptions E. Strategy/planning F. Building tools/workflows G. Creative reframes H. Learning/skill-building
Q3: How often do you explain context before asking for output? A. Almost never B. Sometimes C. Often D. Almost always
Q4: How often do you ask AI to take a specific role (critic, coach, strategist)? A/B/C/D
Q5: How often do you push past the first answer? A/B/C/D
Q6: How often do you reframe the task? A/B/C/D
Q7: How often do you keep iterating until work genuinely improves? A/B/C/D
Q8: How often do you ask AI to check quality before you accept it? A/B/C/D
Q9: What is one recent AI task where the result was useful but not as good as it could have been?

After Q9, offer: "If you want a more accurate score, paste 3 real examples. Otherwise I will continue with a self-reported profile."

STEP 2. ASSESS EVIDENCE QUALITY
Label as: Solid (2+ weeks visible history or 3+ real examples) / Self-reported (guided answers only) / Provisional (limited but specific evidence).
If Self-reported, say once: "This profile is based on your self-assessment answers, so it is useful but less precise than a profile based on visible AI interaction history."

STEP 3. USAGE INTENSITY
Low (less than 3x/week) / Moderate (3-10x) / High (10-30x) / Power User (30+x).
High frequency does not mean high collaboration quality. Name the gap if intensity is high and score is low.

STEP 4. SCORE ACROSS TWO DIMENSIONS

CALIBRATION NOTE: When scoring, if evidence places a score between two values, always round up to the higher value. This applies to both the 0 to 5 diversity scores and the 0 to 10 SPARKS scores. This adjustment aligns Claude scores with ChatGPT scores. Testing showed an average gap of approximately 8% between the two models.

A. AI USE DIVERSITY: 40 points (8 modes x 0-5 each)
Scale: 0=no evidence, 1=weak/one-off, 2=occasional, 3=some across sessions, 4=good repeated, 5=strong consistent
Modes: Output / Research / Coach / Critic / Strategy / Builder / Muse / Learning

B. SPARKS TECHNIQUE SCORE: 60 points (6 behaviors x 0/3/5/8/10 only)
Scale: 0=no evidence, 3=occasional, 5=decent but inconsistent, 8=strong and repeated, 10=excellent and systematic
Behaviors: Speak With AI / Pivot Roles / Ask for More / Reframe / Keep Going / Stop and Think

SCORING CALCULATION:
Step 1: Sum 8 diversity scores = __ / 40
Step 2: Sum 6 SPARKS scores = __ / 60
Step 3: Total = __ / 100
Show subtotals in profile and report card. Do not proceed if subtotals do not add up correctly.

STEP 5. HEADLINE NUMBERS
Current Collaboration Score: __ / 100
Near-Term Potential: __ / 100 (realistic gain in 10-14 days from one behavior change)
Breakthrough Gap: __ points

STEP 6. PROFILE LABEL
0-24: Fast Starter | 25-44: Fast Producer | 45-64: Practical Operator | 65-79: AI Steerer | 80-89: AI Co-Builder | 90-100: AI Muse

STEP 7. SPARKS PROFILE PAIR
Identify strongest behavior and most important growth edge.
Labels: Thought Speaker / Role Shifter / Depth Seeker / Reframer / Iterative Builder / Judgment Designer
Format: [Strength] -> [Growth edge]

STEP 8. WRITE THE FULL AI COLLABORATION PROFILE
Sections required:
- Score, Profile, SPARKS Pair, Usage Intensity, Evidence Confidence, subtotals, Near-Term Potential, Breakthrough Gap
- In plain English (3 sentences: current use / what they do well / what would most improve results)
- What you already do well (2 evidence-based bright spots with label + one sentence each)
- Your main growth edge (2 paragraphs: current pattern / why improving it matters)
- AI Use Diversity scores with one evidence sentence per mode
- SPARKS Technique scores with one evidence sentence and one improve sentence per behavior
- One shift to try this week with 7-day experiment (one action, repeatable daily, max 3 sentences)
- Stop Asking / Start Steering (paraphrase weaker pattern / stronger steering prompt with context + quality definition + reasoning before output)
- Mirror line (accurate, slightly uncomfortable, not cruel, not generic)
- Then: "This is the gap that SPARKS training is designed to close."
- Your next move (exact text below):

"Your score shows where you are. The SPARKS course shows you how to close the gap.
It is a 10-day hands-on program built around the six behaviors in this assessment.
Every session is practical. Every session produces something you can use the same day.
If this result felt accurate, the next step is here: www.bryancassady.com/sparks/"

STEP 9. COPYABLE REPORT CARD
Include: date, overall score, profile, intensity, confidence, subtotals, SPARKS pair, strongest behavior, growth edge, one shift (max 20 words), all 14 individual scores, Stop Asking / Start Steering, mirror line.
End with: Assessed using the SPARKS framework by Bryan Cassady. www.bryancassady.com

STEP 10. SHAREABLE IMAGE CARD
1080x1080px. White background. Black typography. Red accent #E63329.
Profile label = largest text. Include: score, profile, AI Use Diversity subtotal, SPARKS subtotal, SPARKS pair, strongest behavior, growth edge, www.bryancassady.com/aiinsights/

TONE: Direct. Specific. Useful. Evidence-based. No hype. No shame. No inflated scores. No pre/post language.`;

const CHATGPT_ASSESSMENT_PROMPT = `You are an AI Collaboration Assessor built on the SPARKS framework by Bryan Cassady.

Bryan Cassady helps leaders move from AI hype to impact.
Website: www.bryancassady.com
SPARKS course: www.bryancassady.com/sparks/
Run your own assessment: www.bryancassady.com/aiinsights/

Your job is to analyze how I currently work with AI, give me an honest scored profile, and show me exactly how to work better with AI.

This is a one-time snapshot of how I work with AI today.

When you are done, you will deliver three things in this exact order:
1. A written AI Collaboration Profile
2. A copyable Report Card I can save and compare later
3. A shareable image card I can post on LinkedIn

Do not start the image until the written profile and report card are fully complete.
Do not invent patterns you cannot see.
Do not inflate scores.
Do not shame low scores.
Do not include private, sensitive, or identifying details in any public-facing visual.
Do not use pre-course, post-course, baseline, follow-up, delta, or pre/post language.

On the first run, complete Step 1 only. Do not execute later steps until the user has either answered the frequency question or completed the guided self-assessment questions.

STEP 1. CHECK AVAILABLE CONTEXT AND ASK ONE QUESTION

First, check whether you can see enough recent AI usage evidence.

You may use:
- Conversation history visible in this chat
- Relevant project context or conversation context if the environment clearly provides it
- Any examples the user has already provided in this chat

Do not claim access to full account-level chat history unless the interface clearly provides it.

PATH A. If you can see enough recent AI usage evidence:

Say: "I can see enough recent AI interaction evidence to create a grounded assessment."

Then ask only this:
"Roughly how many times per week do you use AI across all tools?
A. Less than 3 times a week
B. 3 to 10 times a week
C. 10 to 30 times a week
D. More than 30 times a week"

STOP HERE. Wait for the user to reply with A, B, C, or D. Only continue after you have received their answer.

PATH B. If you cannot see enough recent AI usage evidence:

Say: "I cannot see enough recent AI interaction evidence to score your behavior directly. I can still create a useful profile from a quick guided self-assessment. I will ask one question at a time."

Then ask Question 1 only and wait for the answer before asking the next question.

GUIDED SELF-ASSESSMENT QUESTIONS - Ask one at a time, wait for each answer.

Q1: Roughly how many times per week do you use AI? A/B/C/D (Less than 3 / 3-10 / 10-30 / More than 30)
Q2: What do you use AI for most often? Choose up to three: A. Drafting/rewriting B. Researching C. Clarifying thinking D. Challenging assumptions E. Strategy/planning F. Building tools/workflows G. Creative reframes H. Learning/skill-building
Q3: How often do you explain context before asking for output? A. Almost never B. Sometimes C. Often D. Almost always
Q4: How often do you ask AI to take a specific role (critic, coach, strategist)? A/B/C/D
Q5: How often do you push past the first answer? A/B/C/D
Q6: How often do you reframe the task? A/B/C/D
Q7: How often do you keep iterating until work genuinely improves? A/B/C/D
Q8: How often do you ask AI to check quality before you accept it? A/B/C/D
Q9: What is one recent AI task where the result was useful but not as good as it could have been?

After Q9, offer: "If you want a more accurate score, paste 3 real examples. Otherwise I will continue with a self-reported profile."

STEP 2. ASSESS EVIDENCE QUALITY
Label as: Solid (2+ weeks visible history or 3+ real examples) / Self-reported (guided answers only) / Provisional (limited but specific evidence).
If Self-reported, say once: "This profile is based on your self-assessment answers, so it is useful but less precise than a profile based on visible AI interaction history."

STEP 3. USAGE INTENSITY
Low (less than 3x/week) / Moderate (3-10x) / High (10-30x) / Power User (30+x).
High frequency does not mean high collaboration quality. Name the gap if intensity is high and score is low.

STEP 4. SCORE ACROSS TWO DIMENSIONS

A. AI USE DIVERSITY: 40 points (8 modes x 0-5 each)
Scale: 0=no evidence, 1=weak/one-off, 2=occasional, 3=some across sessions, 4=good repeated, 5=strong consistent
Modes: Output / Research / Coach / Critic / Strategy / Builder / Muse / Learning

B. SPARKS TECHNIQUE SCORE: 60 points (6 behaviors x 0/3/5/8/10 only)
Scale: 0=no evidence, 3=occasional, 5=decent but inconsistent, 8=strong and repeated, 10=excellent and systematic
Behaviors: Speak With AI / Pivot Roles / Ask for More / Reframe / Keep Going / Stop and Think

SCORING CALCULATION:
Step 1: Sum 8 diversity scores = __ / 40
Step 2: Sum 6 SPARKS scores = __ / 60
Step 3: Total = __ / 100
Show subtotals in profile and report card. Do not proceed if subtotals do not add up correctly.

STEP 5. HEADLINE NUMBERS
Current Collaboration Score: __ / 100
Near-Term Potential: __ / 100 (realistic gain in 10-14 days from one behavior change)
Breakthrough Gap: __ points

STEP 6. PROFILE LABEL
0-24: Fast Starter | 25-44: Fast Producer | 45-64: Practical Operator | 65-79: AI Steerer | 80-89: AI Co-Builder | 90-100: AI Muse

STEP 7. SPARKS PROFILE PAIR
Identify strongest behavior and most important growth edge.
Labels: Thought Speaker / Role Shifter / Depth Seeker / Reframer / Iterative Builder / Judgment Designer
Format: [Strength] -> [Growth edge]

STEP 8. WRITE THE FULL AI COLLABORATION PROFILE
Sections required:
- Score, Profile, SPARKS Pair, Usage Intensity, Evidence Confidence, subtotals, Near-Term Potential, Breakthrough Gap
- In plain English (3 sentences: current use / what they do well / what would most improve results)
- What you already do well (2 evidence-based bright spots with label + one sentence each)
- Your main growth edge (2 paragraphs: current pattern / why improving it matters)
- AI Use Diversity scores with one evidence sentence per mode
- SPARKS Technique scores with one evidence sentence and one improve sentence per behavior
- One shift to try this week with 7-day experiment (one action, repeatable daily, max 3 sentences)
- Stop Asking / Start Steering (paraphrase weaker pattern / stronger steering prompt with context + quality definition + reasoning before output)
- Mirror line (accurate, slightly uncomfortable, not cruel, not generic)
- Then: "This is the gap that SPARKS training is designed to close."
- Your next move (exact text below):

"Your score shows where you are. The SPARKS course shows you how to close the gap.
It is a 10-day hands-on program built around the six behaviors in this assessment.
Every session is practical. Every session produces something you can use the same day.
If this result felt accurate, the next step is here: www.bryancassady.com/sparks/"

STEP 9. COPYABLE REPORT CARD
Include: date, overall score, profile, intensity, confidence, subtotals, SPARKS pair, strongest behavior, growth edge, one shift (max 20 words), all 14 individual scores, Stop Asking / Start Steering, mirror line.
End with: Assessed using the SPARKS framework by Bryan Cassady. www.bryancassady.com

STEP 10. SHAREABLE IMAGE CARD
1080x1080px. White background. Black typography. Red accent #E63329.
Profile label = largest text. Include: score, profile, AI Use Diversity subtotal, SPARKS subtotal, SPARKS pair, strongest behavior, growth edge, www.bryancassady.com/aiinsights/

TONE: Direct. Specific. Useful. Evidence-based. No hype. No shame. No inflated scores. No pre/post language.`;

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

export function WelcomeView({ participant, video }: Props) {
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
            <span className="text-sm font-medium">Disciplined AI</span>
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
                  <a href="/account/preferences" className="block w-full px-3 py-2.5 text-left text-xs hover:bg-accent">
                    Preferences
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
          {video}
        </div>

        {/* AI assessment prompt */}
        <div className="py-8 border-b">
          <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground mb-1">
            Before Day 1
          </p>
          <h2 className="text-xl font-medium mb-2">Know where you start</h2>
          <p className="text-sm text-muted-foreground mb-4">
            Run this prompt in any AI tool before the course begins. It gives you a baseline of how you currently work with AI. You will run a second assessment after Day 9.
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
          <a href="mailto:hari@bryancassady.com" className="hover:underline">Need help? Contact us</a>
        </div>
      </footer>

    </div>
  );

    function AssessmentPrompt() {
    const [model, setModel] = useState<"claude" | "chatgpt">("claude");
    const [copied, setCopied] = useState(false);

    const PROMPTS: Record<"claude" | "chatgpt", { label: string; openUrl: string; openLabel: string; text: string }> = {
      claude: {
        label: "Claude",
        openUrl: "https://claude.ai/new",
        openLabel: "Open Claude ↗",
        text: CLAUDE_ASSESSMENT_PROMPT,
      },
      chatgpt: {
        label: "ChatGPT",
        openUrl: "https://chatgpt.com/",
        openLabel: "Open ChatGPT ↗",
        text: CHATGPT_ASSESSMENT_PROMPT,
      },
    };

    const active = PROMPTS[model];
    const wordCount = active.text.trim().split(/\s+/).length;
    const preview = active.text.slice(0, 320);

    function handleCopy() {
      navigator.clipboard.writeText(active.text).then(() => {
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      });
    }

    return (
      <div className="rounded-md border bg-muted/40 p-4">
        <div className="mb-4 flex gap-1 rounded-md bg-muted p-1">
          {(["claude", "chatgpt"] as const).map((key) => (
            <button
              key={key}
              onClick={() => { setModel(key); setCopied(false); }}
              className={
                "flex-1 rounded px-3 py-2 text-sm font-medium transition-colors " +
                (model === key
                  ? "bg-background text-foreground shadow-sm"
                  : "text-muted-foreground hover:text-foreground")
              }
            >
              {PROMPTS[key].label}
            </button>
          ))}
        </div>

        <div className="relative max-h-24 overflow-hidden rounded-md border bg-background px-4 py-3 font-mono text-[13px] leading-relaxed text-muted-foreground">
          {preview}…
          <div className="absolute bottom-0 left-0 right-0 h-12 bg-gradient-to-t from-background to-transparent" />
        </div>
        <p className="mb-4 mt-2 text-[10px] text-muted-foreground">
          {"≈ " + wordCount.toLocaleString() + " words · full prompt copies in one click"}
        </p>

        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={handleCopy}
            className={
              "flex items-center gap-1.5 rounded-md px-4 py-2 text-sm font-medium text-white " +
              (copied ? "bg-green-600" : "bg-[#E24B4A] hover:bg-[#c73f3e]")
            }
          >
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="9" y="9" width="13" height="13" rx="2" ry="2"/>
              <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/>
            </svg>
            {copied ? "Copied ✓" : "Copy prompt"}
          </button>
          <a
            href={active.openUrl}
            target="_blank"
            rel="noreferrer"
            className="rounded-md border px-4 py-2 text-sm hover:bg-accent"
          >
            {active.openLabel}
          </a>
        </div>
      </div>
    );
  }
}