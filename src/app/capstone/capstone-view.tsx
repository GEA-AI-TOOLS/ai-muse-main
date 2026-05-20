"use client";

import { useEffect, useState } from "react";
import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import type { Participant } from "@/lib/types";

type SectionId = "lesson" | "example" | "submit" | "certificate";

const SECTIONS: { id: SectionId; label: string }[] = [
  { id: "lesson", label: "Lesson" },
  { id: "example", label: "Example" },
  { id: "submit", label: "Submit" },
  { id: "certificate", label: "Certificate" },
];

type PlatformId = "gemini" | "chatgpt-project" | "chatgpt-gpt" | "claude";

const PLATFORMS: { id: PlatformId; label: string; url: string; urlLabel: string }[] = [
  {
    id: "gemini",
    label: "Gemini Gems",
    url: "https://gemini.google.com/gems/view",
    urlLabel: "gemini.google.com",
  },
  {
    id: "chatgpt-project",
    label: "ChatGPT Project",
    url: "https://chatgpt.com/",
    urlLabel: "chatgpt.com",
  },
  {
    id: "chatgpt-gpt",
    label: "Custom GPT",
    url: "https://chatgpt.com/gpts/mine",
    urlLabel: "chatgpt.com/gpts",
  },
  {
    id: "claude",
    label: "Claude Project",
    url: "https://claude.ai/projects",
    urlLabel: "claude.ai/projects",
  },
];

const PLATFORM_STEPS: Record<PlatformId, { task: string; title: string; items: string[] }[]> = {
  gemini: [
    { task: "01", title: "Open Gemini Gems", items: ["Go to gemini.google.com and open the side panel.", "Select Explore Gems, then New Gem."] },
    { task: "02", title: "Name your Gem", items: ["Give it a name and a one-sentence description of what it does."] },
    { task: "03", title: "Paste your instructions", items: ["Paste your instruction text into the instructions field.", "This defines the role, task, output format, and constraints."] },
    { task: "04", title: "Test and refine", items: ["Click Save, then test it with a real question.", "Adjust the instructions based on what you get back."] },
    { task: "05", title: "Copy the share link", items: ["Once happy, copy the share link from the Gem menu.", "This is what you paste into the submission form."] },
  ],
  "chatgpt-project": [
    { task: "01", title: "Open ChatGPT Projects", items: ["Go to chatgpt.com and click Projects in the left sidebar.", "Click New project and give it a name."] },
    { task: "02", title: "Add custom instructions", items: ["Open the project settings and find the Instructions field.", "Paste your instruction text here — this sets the default behavior for all chats in this project."] },
    { task: "03", title: "Upload context files (optional)", items: ["Add any reference documents, examples, or templates your tool should know about.", "These stay attached to every conversation in the project."] },
    { task: "04", title: "Test and refine", items: ["Start a chat inside the project and run a real task through it.", "Tweak the instructions if the output isn't quite right."] },
    { task: "05", title: "Share the project link", items: ["Copy the project URL from your browser.", "Paste it into the submission form below."] },
  ],
  "chatgpt-gpt": [
    { task: "01", title: "Open the GPT builder", items: ["Go to chatgpt.com/gpts/mine and click Create.", "You need a ChatGPT Plus or Team account to build custom GPTs."] },
    { task: "02", title: "Configure in the builder", items: ["Switch to the Configure tab — this gives you full control.", "Add a name, description, and paste your instructions into the Instructions field."] },
    { task: "03", title: "Set conversation starters", items: ["Add 2–3 example prompts that show what the tool does.", "This helps users understand how to use it from the first screen."] },
    { task: "04", title: "Test in the preview panel", items: ["Use the preview on the right to test your GPT live.", "Adjust instructions until the output matches what you need."] },
    { task: "05", title: "Publish and copy the link", items: ["Set sharing to Anyone with a link and click Save.", "Copy the share URL — this goes in the submission form."] },
  ],
  claude: [
    { task: "01", title: "Open Claude Projects", items: ["Go to claude.ai/projects and click New project.", "Projects are available on Claude Pro and Team plans."] },
    { task: "02", title: "Add project instructions", items: ["Click Project instructions and paste your instruction text.", "This runs before every conversation in the project, setting the tool's role and behaviour."] },
    { task: "03", title: "Upload knowledge files (optional)", items: ["Add any reference documents or examples under Project knowledge.", "Claude will use these as context in every conversation."] },
    { task: "04", title: "Test with a real task", items: ["Start a conversation inside the project and run your chosen task through it.", "Revise the instructions based on what you observe."] },
    { task: "05", title: "Share the project link", items: ["Copy the project URL from your browser address bar.", "Paste it into the submission form below."] },
  ],
};

const REVIEW_GPT_URL =
  "https://chatgpt.com/g/g-6a033acc15448191bf72d50f6069dbe2-ai-tools-reviewer";

interface CertData {
  id: string;
  verification_code: string;
  issued_at: string;
}

interface Props {
  participant: Participant;
}

export function CapstoneView({ participant }: Props) {
  const [activeSection, setActiveSection] = useState<SectionId>("lesson");
  const [activePlatform, setActivePlatform] = useState<PlatformId>("gemini");
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(false);

  // Submit state
  const [reviewReport, setReviewReport] = useState("");
  const [description, setDescription] = useState("");
  const [gemUrl, setGemUrl] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const [submitResult, setSubmitResult] = useState<"pass" | "fail" | "wrong_source" | null>(null);

  // Cert state
  const [completionCert, setCompletionCert] = useState<CertData | null>(null);
  const [masteryCert, setMasteryCert] = useState<CertData | null>(null);
  const [alreadySubmitted, setAlreadySubmitted] = useState(false);

  const firstName = participant.name.split(" ")[0];

  useEffect(() => {
    const stored = localStorage.getItem("darkMode");
    if (stored === "true") {
      setDarkMode(true);
      document.documentElement.classList.add("dark");
    }
  }, []);

  useEffect(() => {
    fetch("/api/capstone/status")
      .then((r) => r.json())
      .then((data) => {
        if (data.ok) {
          if (data.submission) setAlreadySubmitted(true);
          setCompletionCert(data.completionCert);
          setMasteryCert(data.masteryCert);
        }
      })
      .catch(() => {});
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

  async function handleSubmit() {
    setSubmitError("");
    setSubmitResult(null);

    if (!reviewReport.trim()) {
      setSubmitError("Please paste the report from the Review GPT.");
      return;
    }
    if (!description.trim()) {
      setSubmitError("Description is required.");
      return;
    }

    setSubmitting(true);
    try {
      const res = await fetch("/api/capstone/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          reviewReport: reviewReport.trim(),
          description: description.trim(),
          gemUrl: gemUrl.trim() || undefined,
        }),
      });
      const data = await res.json();

      if (data.ok) {
        setSubmitResult("pass");
        setAlreadySubmitted(true);
        setMasteryCert({
          id: data.certId ?? "",
          verification_code: data.verificationCode,
          issued_at: new Date().toISOString(),
        });
      } else {
        setSubmitResult(data.result ?? null);
        setSubmitError(data.error ?? "Something went wrong. Try again.");
      }
    } catch {
      setSubmitError("Network error. Try again.");
    } finally {
      setSubmitting(false);
    }
  }

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id as SectionId);
          }
        }
      },
      { rootMargin: "-30% 0px -60% 0px" }
    );
    SECTIONS.forEach((section) => {
      const el = document.getElementById(section.id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

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

  const supportEmail = "mailto:support.muse@bryancassady.com?subject=Capstone%20help";
  const currentPlatform = PLATFORMS.find((p) => p.id === activePlatform)!;
  const currentSteps = PLATFORM_STEPS[activePlatform];

  return (
    <div className="min-h-screen bg-background">

      {/* Header */}
      <header className="border-b">
        <div className="mx-auto flex max-w-4xl items-center justify-between px-8 py-4">
          <a href="/progress" className="flex items-center gap-2 hover:opacity-80">
            <img src="/assets/site-icon.png" alt="AI Muse" className="h-7 w-7 rounded object-contain" />
            <span className="text-base font-medium">Make AI Your Muse</span>
          </a>
          <div className="flex items-center gap-4">
            <button
              onClick={toggleDarkMode}
              className="text-muted-foreground hover:text-foreground"
              aria-label="Toggle dark mode"
            >
              {darkMode ? (
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="5"/>
                  <line x1="12" y1="1" x2="12" y2="3"/>
                  <line x1="12" y1="21" x2="12" y2="23"/>
                  <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/>
                  <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/>
                  <line x1="1" y1="12" x2="3" y2="12"/>
                  <line x1="21" y1="12" x2="23" y2="12"/>
                  <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/>
                  <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/>
                </svg>
              ) : (
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
                </svg>
              )}
            </button>
            <div className="relative">
              <button
                onClick={(e) => { e.stopPropagation(); setDropdownOpen(!dropdownOpen); }}
                className="flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground"
              >
                {"Hi, " + firstName + " ▾"}
              </button>
              {dropdownOpen && (
                <div className="absolute right-0 top-8 z-50 w-56 rounded-md border bg-background shadow-md">
                  <div className="px-4 py-3">
                    <p className="text-xs text-muted-foreground">{formatCohort(participant.cohortId)}</p>
                    <p className="mt-0.5 text-xs text-muted-foreground">{participant.email}</p>
                  </div>
                  <div className="border-t" />
                  <a
                    href="/account/devices"
                    className="block w-full px-3 py-2.5 text-left text-xs hover:bg-accent"
                  >
                    Manage devices
                  </a>
                  <div className="border-t" />
                  <button
                    onClick={handleLogout}
                    className="w-full px-4 py-3 text-left text-sm hover:bg-accent"
                  >
                    Log out
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Sticky nav */}
      <nav className="sticky top-0 z-10 border-b bg-background">
        <div className="mx-auto flex max-w-4xl gap-1 px-8 py-2">
          {SECTIONS.map((section) => {
            const isActive = activeSection === section.id;
            return (
              <a
                key={section.id}
                href={"#" + section.id}
                className={
                  "rounded px-4 py-2 text-sm transition-colors " +
                  (isActive
                    ? "bg-[#FCEBEB] font-medium text-[#A32D2D]"
                    : "text-muted-foreground hover:text-foreground")
                }
              >
                {section.label}
              </a>
            );
          })}
        </div>
      </nav>

      <main className="mx-auto max-w-4xl px-8">

        {/* Title block */}
        <div className="py-8">
          <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
            Capstone · Final project
          </p>
          <h1 className="mt-2 text-3xl font-medium">Build your own AI tool</h1>
          <p className="mt-1 text-base text-muted-foreground">
            Apply everything from the 10 days. Build something real that you will actually use.
          </p>
        </div>

        {/* ── LESSON ── */}
        <section id="lesson" className="scroll-mt-20 py-8">
          <h2 className="mb-3 text-lg font-medium">Lesson</h2>
          <p className="mb-4 text-sm text-muted-foreground">
            Watch the capstone brief before you start building.
          </p>

          <div className="aspect-video overflow-hidden rounded-md bg-black mb-6 flex items-center justify-center">
            <span className="text-sm text-white/40">Capstone video — coming soon</span>
          </div>

          <div className="mt-6 flex flex-col gap-2">
            {[
              {
                label: "Core idea",
                text: "You have spent 10 days learning a method. The capstone is where you apply it to something that matters to you — one specific, recurring task in your work.",
                highlight: true,
              },
              {
                label: "The goal",
                text: "Build a custom AI tool using any platform of your choice. It should do one thing well, for one specific purpose, with clear instructions on how to behave.",
                highlight: false,
              },
              {
                label: "What good looks like",
                text: "A good tool has a clear role, a defined task, a specific output format, and at least one constraint — something it will never do. Vague instructions produce vague results.",
                highlight: false,
              },
              {
                label: "The platform",
                text: "Use whichever AI platform you prefer. The Example section below shows step-by-step walkthroughs for Gemini Gems, ChatGPT Projects, Custom GPTs, and Claude Projects.",
                highlight: false,
              },
              {
                label: "Key takeaway",
                text: "The tool you build is the proof that you have learned something. Not a certificate — the thing itself.",
                highlight: true,
              },
            ].map((row) => (
              <div
                key={row.label}
                className={
                  "rounded-r-md border-l-[3px] px-4 py-3 " +
                  (row.highlight
                    ? "border-l-[#E24B4A] bg-[#FCEBEB] dark:bg-[#3a1010]"
                    : "border-l-border bg-muted/40")
                }
              >
                <p className={
                  "mb-1 text-[10px] font-medium uppercase tracking-[0.4px] " +
                  (row.highlight ? "text-[#A32D2D]" : "text-muted-foreground")
                }>
                  {row.label}
                </p>
                <p className={
                  "text-sm leading-relaxed " +
                  (row.highlight ? "text-[#501313] dark:text-[#f5c1c1]" : "text-foreground")
                }>
                  {row.text}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-8 mb-2 border-t pt-6">
            <h3 className="text-base font-semibold">What to do</h3>
          </div>
          <div className="mb-4 flex flex-col gap-3">
            {[
              {
                task: "01",
                title: "Pick your use case",
                items: [
                  "Choose one specific, recurring task in your work that AI could help with.",
                  "Be specific — not 'productivity in general' but something concrete: briefing, reviewing, generating, summarising.",
                ],
              },
              {
                task: "02",
                title: "Write your instructions",
                items: [
                  "Define the role your tool will play.",
                  "Describe the task it performs and the format of its output.",
                  "Add at least one constraint — something it will never do.",
                ],
              },
              {
                task: "03",
                title: "Build and test",
                items: [
                  "Create your tool on any AI platform.",
                  "Run three real tasks through it and note where it works and where it needs adjustment.",
                  "Refine based on what you find.",
                ],
              },
              {
                task: "04",
                title: "Review and submit",
                items: [
                  "Run your instruction file through the AI review tool in the Submit section.",
                  "Paste the report and add a one-sentence description of what you built.",
                ],
              },
            ].map((step, i) => (
              <div key={i} className="rounded-md border bg-muted/30 p-4">
                <div className="mb-2 flex items-center gap-2">
                  <span className="text-lg font-medium text-[#E24B4A] leading-none">{step.task}</span>
                  <span className="text-sm font-medium">{step.title}</span>
                </div>
                <ul className="space-y-1.5">
                  {step.items.map((item, j) => (
                    <li key={j} className="flex gap-2 text-sm leading-relaxed">
                      <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-muted-foreground" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <div className="rounded-md border bg-muted/20 px-3 py-2 text-xs text-muted-foreground">
            <span className="font-medium">Done when: </span>
            You have a working tool that performs your chosen task and produces a useful result on a real problem.
          </div>
        </section>

        <Separator />

        {/* ── EXAMPLE ── */}
        <section id="example" className="scroll-mt-20 py-8">
          <h2 className="mb-1 text-lg font-medium">Example</h2>
          <p className="mb-6 text-sm text-muted-foreground">
            A worked example — The Briefing Assistant — built across four platforms. Pick the one you use.
          </p>

          <div className="mb-6 rounded-md border bg-muted/30 p-5">
            <div className="mb-3 flex items-start justify-between gap-4">
              <div>
                <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground mb-1">
                  Example tool
                </p>
                <p className="text-base font-medium">The Briefing Assistant</p>
                <p className="mt-1 text-sm text-muted-foreground">
                  Turns a rough idea into a structured brief. Built for consultants and project leads who write briefs regularly.
                </p>
              </div>
              <a
                href="#"
                target="_blank"
                rel="noreferrer"
                className="shrink-0 rounded-md bg-[#E24B4A] px-4 py-2 text-sm font-medium text-white hover:bg-[#c73f3e]"
              >
                Open example →
              </a>
            </div>
            <div className="border-t pt-3">
              <p className="text-xs text-muted-foreground">
                Try asking it to brief a new product launch, a client workshop, or a team meeting. Notice how the output structure stays consistent regardless of the input.
              </p>
            </div>
          </div>

          {/* Platform tabs */}
          <div className="mt-8 mb-0 border-t pt-6">
            <h3 className="mb-3 text-base font-semibold">How to build this</h3>

            <div className="flex gap-1 rounded-md border bg-muted/30 p-1">
              {PLATFORMS.map((platform) => {
                const isActive = activePlatform === platform.id;
                return (
                  <button
                    key={platform.id}
                    onClick={() => setActivePlatform(platform.id)}
                    className={
                      "flex-1 rounded px-3 py-2 text-xs font-medium transition-colors " +
                      (isActive
                        ? "bg-background shadow-sm text-foreground border"
                        : "text-muted-foreground hover:text-foreground")
                    }
                  >
                    {platform.label}
                  </button>
                );
              })}
            </div>

            <div className="mt-0 rounded-b-md rounded-t-none border border-t-0 bg-background p-5">
              <a
                href={currentPlatform.url}
                target="_blank"
                rel="noreferrer"
                className="mb-4 inline-flex items-center gap-1.5 rounded-md border px-3 py-1.5 text-xs text-muted-foreground hover:text-foreground hover:bg-accent transition-colors"
              >
                <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>
                  <polyline points="15 3 21 3 21 9"/>
                  <line x1="10" y1="14" x2="21" y2="3"/>
                </svg>
                {currentPlatform.urlLabel}
              </a>

              <div className="flex flex-col gap-3">
                {currentSteps.map((step, i) => (
                  <div key={i} className="rounded-md border bg-muted/30 p-4">
                    <div className="mb-2 flex items-center gap-2">
                      <span className="text-lg font-medium text-[#E24B4A] leading-none">{step.task}</span>
                      <span className="text-sm font-medium">{step.title}</span>
                    </div>
                    <ul className="space-y-1.5">
                      {step.items.map((item, j) => (
                        <li key={j} className="flex gap-2 text-sm leading-relaxed">
                          <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-muted-foreground" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <Separator />

        {/* ── SUBMIT ── */}
        <section id="submit" className="scroll-mt-20 py-8">
          <h2 className="mb-1 text-lg font-medium">Submit your project</h2>
          <p className="mb-6 text-sm text-muted-foreground">
            Complete the three steps below to earn your Certificate of Mastery.
          </p>

          {alreadySubmitted ? (
            <div className="rounded-md border border-green-200 bg-green-50 p-6 text-center dark:border-green-900 dark:bg-green-950">
              <p className="text-base font-medium text-green-800 dark:text-green-300 mb-1">
                Project submitted
              </p>
              <p className="text-sm text-green-700 dark:text-green-400">
                Your Certificate of Mastery has been issued. See the Certificate section below.
              </p>
            </div>
          ) : (
            <div className="flex flex-col gap-5">

              {/* Step 1 — Review GPT */}
              <div className="rounded-md border p-5">
                <div className="flex items-center gap-2 mb-3">
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#E24B4A] text-xs font-medium text-white">1</span>
                  <span className="text-sm font-medium">Review your tool</span>
                </div>
                <p className="text-sm text-muted-foreground mb-4">
                  Open the Review GPT and submit your instruction file to get a report.
                </p>
                <a
                  href={REVIEW_GPT_URL}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 rounded-md bg-[#E24B4A] px-4 py-2 text-sm font-medium text-white hover:bg-[#c73f3e]"
                >
                  Open Review GPT →
                </a>
                <ul className="mt-4 space-y-1.5">
                  {[
                    "Open the GPT and describe what you built.",
                    "Upload your instruction file when prompted.",
                    "Copy the full report it gives you.",
                  ].map((item, i) => (
                    <li key={i} className="flex gap-2 text-sm text-muted-foreground">
                      <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-muted-foreground" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
                <p className="mt-4 text-xs text-muted-foreground rounded-md bg-muted/40 px-3 py-2">
                  We never see your instruction file. The GPT processes it privately and does not store it.
                </p>
              </div>

              {/* Step 2 — Paste report */}
              <div className="rounded-md border p-5">
                <div className="flex items-center gap-2 mb-3">
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#E24B4A] text-xs font-medium text-white">2</span>
                  <span className="text-sm font-medium">Paste the report</span>
                </div>
                <label className="mb-1.5 block text-sm text-muted-foreground">
                  Paste the full report from the Review GPT here.
                </label>
                <textarea
                  className="w-full min-h-[140px] rounded-md border bg-background px-3 py-2 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring resize-y"
                  placeholder="Paste the complete report from the Review GPT..."
                  value={reviewReport}
                  onChange={(e) => setReviewReport(e.target.value)}
                />

                {/* Inline feedback for fail / wrong source — shown here under the paste box */}
                {submitResult === "fail" && (
                  <div className="mt-2 rounded-md border border-amber-200 bg-amber-50 px-3 py-2 text-xs text-amber-800 dark:border-amber-900 dark:bg-amber-950 dark:text-amber-300">
                    {submitError}
                  </div>
                )}
                {submitResult === "wrong_source" && (
                  <div className="mt-2 rounded-md border px-3 py-2 text-xs text-muted-foreground bg-muted/40">
                    {submitError}
                  </div>
                )}
              </div>

              {/* Step 3 — Tell us what you built */}
              <div className="rounded-md border p-5">
                <div className="flex items-center gap-2 mb-3">
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#E24B4A] text-xs font-medium text-white">3</span>
                  <span className="text-sm font-medium">Tell us what you built</span>
                </div>

                <div className="flex flex-col gap-4">
                  <div>
                    <label className="mb-1.5 block text-sm font-medium">
                      What does your tool do?
                      <span className="ml-1.5 text-xs font-normal text-muted-foreground">(required)</span>
                    </label>
                    <Input
                      type="text"
                      placeholder="It helps me write structured briefs for client projects."
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                    />
                    <p className="mt-1.5 text-xs text-muted-foreground">
                      One sentence. Specific about what it does and who it is for.
                    </p>
                  </div>

                  <div>
                    <label className="mb-1.5 block text-sm font-medium">
                      Tool link
                      <span className="ml-1.5 text-xs font-normal text-muted-foreground">(optional)</span>
                    </label>
                    <Input
                      type="url"
                      placeholder="https://gemini.google.com/gem/..."
                      value={gemUrl}
                      onChange={(e) => setGemUrl(e.target.value)}
                    />
                    <p className="mt-1.5 text-xs text-muted-foreground">
                      Link to your Gem, custom GPT, Claude project, or any shared AI tool.
                    </p>
                  </div>
                </div>
              </div>

              {/* General error (non-result errors) */}
              {submitError && submitResult === null && (
                <p className="text-xs text-destructive">{submitError}</p>
              )}

              <Button
                className="w-full bg-[#E24B4A] hover:bg-[#c73f3e]"
                onClick={handleSubmit}
                disabled={submitting}
              >
                {submitting ? "Submitting..." : "Submit and earn Certificate of Mastery"}
              </Button>
            </div>
          )}
        </section>

        <Separator />

        {/* ── CERTIFICATE ── */}
        <section id="certificate" className="scroll-mt-20 py-8 pb-16">
          <h2 className="mb-1 text-lg font-medium">Your certificates</h2>
          <p className="mb-6 text-sm text-muted-foreground">
            Both certificates are permanently verifiable via a public link.
          </p>

          <div className="flex flex-col gap-4">

            {/* Completion cert */}
            {completionCert ? (
              <div className="rounded-md border p-5 flex items-center justify-between gap-6">
                <div className="flex items-start gap-4">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#FCEBEB]">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#E24B4A" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="20 6 9 17 4 12"/>
                    </svg>
                  </div>
                  <div>
                    <p className="text-sm font-medium">Certificate of Completion</p>
                    <p className="mt-0.5 text-xs text-muted-foreground">
                      {"Issued " + new Date(completionCert.issued_at).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" }) + " · All 10 days completed"}
                    </p>
                    <p className="mt-1.5 text-xs text-muted-foreground">
                      {"Verify: "}
                      <a
                        href={"/verify/" + completionCert.verification_code}
                        target="_blank"
                        rel="noreferrer"
                        className="text-[#E24B4A] hover:underline"
                      >
                        {"muse.bryancassady.com/verify/" + completionCert.verification_code}
                      </a>
                    </p>
                  </div>
                </div>
                <button
                  className="shrink-0 flex items-center gap-2 rounded-md border px-4 py-2 text-sm hover:bg-accent"
                  onClick={() => window.open("/api/certificates/download?id=" + completionCert.id, "_blank")}
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
                    <polyline points="7 10 12 15 17 10"/>
                    <line x1="12" y1="15" x2="12" y2="3"/>
                  </svg>
                  Download PDF
                </button>
              </div>
            ) : (
              <div className="rounded-md border border-dashed p-5 flex items-center justify-between gap-6 opacity-55">
                <div className="flex items-start gap-4">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-muted">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="20 6 9 17 4 12"/>
                    </svg>
                  </div>
                  <div>
                    <p className="text-sm font-medium">Certificate of Completion</p>
                    <p className="mt-0.5 text-xs text-muted-foreground">Complete all 10 days to earn this.</p>
                  </div>
                </div>
                <a href="/progress" className="shrink-0 text-sm text-[#E24B4A] hover:underline">
                  View progress →
                </a>
              </div>
            )}

            {/* Mastery cert */}
            {masteryCert ? (
              <div className="rounded-md border border-[#F09595] bg-[#FCEBEB] p-5 flex items-center justify-between gap-6">
                <div className="flex items-start gap-4">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#E24B4A]">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="white">
                      <path d="M12 2l2.4 7.4H22l-6.2 4.5 2.4 7.4L12 17l-6.2 4.3 2.4-7.4L2 9.4h7.6z"/>
                    </svg>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-[#501313]">Certificate of Mastery</p>
                    <p className="mt-0.5 text-xs text-[#791F1F]">
                      {"Issued " + new Date(masteryCert.issued_at).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" }) + " · Capstone submitted"}
                    </p>
                    <p className="mt-1.5 text-xs text-[#791F1F]">
                      {"Verify: "}
                      <a
                        href={"/verify/" + masteryCert.verification_code}
                        target="_blank"
                        rel="noreferrer"
                        className="underline hover:opacity-80"
                      >
                        {"muse.bryancassady.com/verify/" + masteryCert.verification_code}
                      </a>
                    </p>
                  </div>
                </div>
                <button
                  className="shrink-0 flex items-center gap-2 rounded-md bg-[#E24B4A] px-4 py-2 text-sm font-medium text-white hover:bg-[#c73f3e]"
                  onClick={() => window.open("/api/certificates/download?id=" + masteryCert.id, "_blank")}
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
                    <polyline points="7 10 12 15 17 10"/>
                    <line x1="12" y1="15" x2="12" y2="3"/>
                  </svg>
                  Download PDF
                </button>
              </div>
            ) : (
              <div className="rounded-md border border-dashed p-5 flex items-center justify-between gap-6 opacity-55">
                <div className="flex items-start gap-4">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-muted">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                      <path d="M12 2l2.4 7.4H22l-6.2 4.5 2.4 7.4L12 17l-6.2 4.3 2.4-7.4L2 9.4h7.6z"/>
                    </svg>
                  </div>
                  <div>
                    <p className="text-sm font-medium">Certificate of Mastery</p>
                    <p className="mt-0.5 text-xs text-muted-foreground">Submit your capstone project to earn this.</p>
                  </div>
                </div>
                <a href="#submit" className="shrink-0 text-sm text-[#E24B4A] hover:underline">
                  Submit project →
                </a>
              </div>
            )}
          </div>
        </section>

      </main>

      {/* Footer */}
      <footer className="border-t bg-muted/30">
        <div className="mx-auto flex max-w-4xl items-center justify-between px-8 py-4 text-sm text-muted-foreground">
          <a href="/progress" className="hover:underline">Back to overview</a>
          <a href={supportEmail} className="hover:underline">Need help? Contact us</a>
        </div>
      </footer>

    </div>
  );
}