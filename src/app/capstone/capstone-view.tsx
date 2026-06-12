"use client";

import { useEffect, useState } from "react";
import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import type { Participant } from "@/lib/types";

type SectionId = "start" | "build" | "submit" | "certificate";

const SECTIONS: { id: SectionId; label: string }[] = [
  { id: "start", label: "Start" },
  { id: "build", label: "Build" },
  { id: "submit", label: "Submit" },
  { id: "certificate", label: "Certificate" },
];

// ── Temporary slide embed (stands in for the lesson video until it's recorded) ──
// Paste the Canva "Present and share → Embed" URL here. Leave empty to show a placeholder.
// When the real video is ready, set USE_VIDEO to true and put the embed URL in VIDEO_EMBED_URL.
const SLIDE_EMBED_URL = "https://www.canva.com/design/DAHK7uXjMHs/9aIpInGH-5WN5eMMAnyG7A/view?embed";
const VIDEO_EMBED_URL = ""; // e.g. "https://player.vimeo.com/video/XXXX"
const USE_VIDEO = false;

// Key links
const HANDOUT_URL = "https://tiny.cc/sparksend";
const REVIEW_GPT_URL =
  "https://chatgpt.com/g/g-6a033acc15448191bf72d50f6069dbe2-ai-tools-reviewer";
const EVAL_FORM_URL = "https://forms.gle/VSLBXXNqUesYqXQW8";

// The live "Try it" demo tool - The Devil's Advocate. Leave empty for a "coming soon" pill.
const EXAMPLE_TOOL_URL = "https://chatgpt.com/g/g-6a190e4fed9881918828a961d5a1d120-the-devil-s-advocate";

type PlatformId = "gemini" | "chatgpt-project" | "chatgpt-gpt" | "claude";

const PLATFORMS: {
  id: PlatformId;
  label: string;
  url: string;
  urlLabel: string;
  cost: "Free" | "Paid";
  recommended?: boolean;
}[] = [
  {
    id: "gemini",
    label: "Gemini Gem",
    url: "https://gemini.google.com/gems/view",
    urlLabel: "gemini.google.com",
    cost: "Free",
    recommended: true,
  },
  {
    id: "chatgpt-project",
    label: "ChatGPT Project",
    url: "https://chatgpt.com/",
    urlLabel: "chatgpt.com",
    cost: "Free",
  },
  {
    id: "chatgpt-gpt",
    label: "Custom GPT",
    url: "https://chatgpt.com/gpts/mine",
    urlLabel: "chatgpt.com/gpts",
    cost: "Paid",
  },
  {
    id: "claude",
    label: "Claude Project",
    url: "https://claude.ai/projects",
    urlLabel: "claude.ai/projects",
    cost: "Paid",
  },
];

// Each step may carry an optional `image` (screenshot). Drop files in
// /public/assets/capstone/<platform>/ and reference them here.
type Step = { task: string; title: string; items: string[]; image?: string };

const PLATFORM_STEPS: Record<PlatformId, Step[]> = {
  gemini: [
    { task: "01", title: "Open Gemini Gems", items: ["Go to gemini.google.com and open the side panel.", "Select Explore Gems, then New Gem."], image: "/assets/capstone/gemini/step-01.png" },
    { task: "02", title: "Name your Gem", items: ["Give it a name and a one-line description."], image: "/assets/capstone/gemini/step-02.png" },
    { task: "03", title: "Paste your instructions", items: ["Paste your instruction text into the instructions field."], image: "" },
    { task: "04", title: "Test and refine", items: ["Click Save, then test it with a real task.", "Adjust the instructions based on what you get back."], image: "" },
    { task: "05", title: "Copy the share link", items: ["Copy the share link from the Gem menu.", "This is the optional link for the submit step."], image: "" },
  ],
  "chatgpt-project": [
    { task: "01", title: "Open ChatGPT Projects", items: ["Go to chatgpt.com and click Projects in the left sidebar.", "Click New project and name it."], image: "/assets/capstone/chatgpt-project/1.png" },
    { task: "02", title: "Add instructions", items: ["Open project settings and find the Instructions field.", "Paste your instructions here."], image: "/assets/capstone/chatgpt-project/2.png" },
    { task: "03", title: "Add files (optional)", items: ["Add any reference documents your tool should know about."], image: "/assets/capstone/chatgpt-project/3.png" },
    { task: "04", title: "Test and refine", items: ["Run a real task through it.", "Tweak the instructions if needed."], image: "" },
    { task: "05", title: "Copy the link", items: ["Copy the project URL from your browser."], image: "" },
  ],
  "chatgpt-gpt": [
    { task: "01", title: "Open the GPT builder", items: ["Go to chatgpt.com/gpts/mine and click Create.", "Needs a ChatGPT Plus or Team account."], image: "/assets/capstone/chatgpt-gpt/1.png" },
    { task: "02", title: "Configure", items: ["Switch to the Configure tab.", "Add a name, description, and paste your instructions."], image: "/assets/capstone/chatgpt-gpt/2.png" },
    { task: "03", title: "Add starters", items: ["Add 2 to 3 example prompts that show what it does."], image: "" },
    { task: "04", title: "Test in preview", items: ["Use the preview panel to test it live.", "Adjust until the output matches what you need."], image: "" },
    { task: "05", title: "Publish and copy", items: ["Set sharing to Anyone with a link and Save.", "Copy the share URL."], image: "/assets/capstone/chatgpt-gpt/5.png" },
  ],
  claude: [
    { task: "01", title: "Open Claude Projects", items: ["Go to claude.ai/projects and click New project.", "Available on Claude Pro and Team plans."], image: "/assets/capstone/claude/1.png" },
    { task: "02", title: "Add instructions", items: ["Click Project instructions and paste your instructions."], image: "/assets/capstone/claude/2.png" },
    { task: "03", title: "Add files (optional)", items: ["Add reference documents under Project knowledge."], image: "" },
    { task: "04", title: "Test with a real task", items: ["Run your task through it.", "Revise the instructions based on what you see."], image: "" },
  ],
};

// Phase 1 - the four ingredients, as short build steps. Detail lives in the handout.
const BUILD_STEPS: { task: string; title: string; items: string[] }[] = [
  {
    task: "01",
    title: "Define your objective",
    items: [
      "Say what your tool is for, in one or two lines.",
      "Made a TRUE NORTH on Day 5? Use it. It works as your objective.",
    ],
  },
  {
    task: "02",
    title: "Gather your data",
    items: [
      "Collect the files, examples, or notes your tool should know.",
      "Add only what the task needs. This step is optional.",
    ],
  },
  {
    task: "03",
    title: "Write your work methods and output",
    items: [
      "Say how it should work and what it should produce.",
      "The handout has a prompt that writes this with you.",
    ],
  },
  {
    task: "04",
    title: "Build and test",
    items: [
      "Pick a platform below and set it up.",
      "Run it on something real. Adjust if needed.",
    ],
  },
];

interface CertData {
  id: string;
  verification_code: string;
  issued_at: string;
}

interface Props {
  participant: Participant;
}

export function CapstoneView({ participant }: Props) {
  const [activeSection, setActiveSection] = useState<SectionId>("start");
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
  const [certsEnabled, setCertsEnabled] = useState(true);

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
          setCertsEnabled(data.certsEnabled ?? true);
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
        setCertsEnabled(data.certsEnabled ?? true);
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

  const supportEmail = "mailto:hari@bryancassady.com?subject=Capstone%20help";
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
            Apply everything from the 10 days. Build one tool you will actually use.
          </p>
        </div>

        {/* ── START ── */}
        <section id="start" className="scroll-mt-20 py-8">

          {/* Slides */}
          <div className="aspect-video overflow-hidden rounded-md border bg-black mb-6">
            {USE_VIDEO && VIDEO_EMBED_URL ? (
              <iframe
                src={VIDEO_EMBED_URL}
                title="Capstone video"
                className="h-full w-full"
                allow="autoplay; fullscreen; picture-in-picture"
                allowFullScreen
              />
            ) : SLIDE_EMBED_URL ? (
              <iframe
                src={SLIDE_EMBED_URL}
                title="Capstone slides"
                className="h-full w-full"
                allow="fullscreen"
                allowFullScreen
              />
            ) : (
              <div className="flex h-full w-full items-center justify-center">
                <span className="text-sm text-white/40">Capstone brief coming soon</span>
              </div>
            )}
          </div>

          {/* Handout callout - prominent, near the top */}
          <a
            href={HANDOUT_URL}
            target="_blank"
            rel="noreferrer"
            className="mb-6 flex items-center justify-between gap-4 rounded-md border-l-[3px] border-l-[#E24B4A] bg-[#FCEBEB] px-5 py-4 hover:opacity-90 dark:bg-[#3a1010]"
          >
            <div className="flex items-start gap-3">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#E24B4A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mt-0.5 shrink-0">
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
                <polyline points="14 2 14 8 20 8"/>
              </svg>
              <div>
                <p className="text-sm font-semibold text-[#501313] dark:text-[#f5c1c1]">Your step-by-step guide</p>
                <p className="mt-0.5 text-xs text-[#791F1F] dark:text-[#f5c1c1]">
                  The full walkthrough, with the prompts that do the work. Keep it open while you build.
                </p>
              </div>
            </div>
            <span className="shrink-0 text-sm font-medium text-[#A32D2D]">Open guide →</span>
          </a>

          {/* How it works - two phases */}
          <div className="rounded-md border bg-muted/20 p-5">
            <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground mb-3">
              How it works
            </p>
            <div className="grid gap-3 sm:grid-cols-2">
              <div className="rounded-md border bg-background p-4">
                <p className="text-sm font-semibold">Phase 1 · Make</p>
                <p className="mt-1 text-xs text-muted-foreground">
                  Build your tool in 4 steps. See the Build section below.
                </p>
              </div>
              <div className="rounded-md border bg-background p-4">
                <p className="text-sm font-semibold">Phase 2 · Submit</p>
                <p className="mt-1 text-xs text-muted-foreground">
                  Review it, submit it, fill the short form. See the Submit section below.
                </p>
              </div>
            </div>
          </div>
        </section>

        <Separator />

        {/* ── BUILD (Phase 1) ── */}
        <section id="build" className="scroll-mt-20 py-8">
          <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">Phase 1</p>
          <h2 className="mt-1 mb-1 text-lg font-medium">Make your tool</h2>
          <p className="mb-6 text-sm text-muted-foreground">
            Four steps. The prompts that help with each one are in your{" "}
            <a href={HANDOUT_URL} target="_blank" rel="noreferrer" className="text-[#E24B4A] hover:underline">guide</a>.
          </p>

          {/* The 4 build steps */}
          <div className="mb-8 flex flex-col gap-3">
            {BUILD_STEPS.map((step, i) => (
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

          {/* Small, separated example card */}
          <div className="mb-8 rounded-md border border-dashed bg-muted/10 p-4">
            <div className="flex items-center justify-between gap-4">
              <div>
                <p className="text-[10px] font-medium uppercase tracking-[0.4px] text-muted-foreground">
                  Want to see a finished one first?
                </p>
                <p className="mt-1 text-sm font-medium">The Devil&rsquo;s Advocate</p>
                <p className="mt-0.5 text-xs text-muted-foreground">
                  A tool that pushes back on any plan instead of agreeing. Try it, then build your own.
                </p>
              </div>
              {EXAMPLE_TOOL_URL ? (
                <a
                  href={EXAMPLE_TOOL_URL}
                  target="_blank"
                  rel="noreferrer"
                  className="shrink-0 rounded-md border px-4 py-2 text-sm font-medium hover:bg-accent"
                >
                  Try it →
                </a>
              ) : (
                <span className="shrink-0 rounded-md border border-dashed px-4 py-2 text-sm text-muted-foreground">
                  Coming soon
                </span>
              )}
            </div>
          </div>

          {/* Build on your platform */}
          <div className="border-t pt-6">
            <h3 className="mb-1 text-base font-semibold">Build it on your platform</h3>
            <p className="mb-3 text-sm text-muted-foreground">
              Same steps everywhere, only the screen changes. Start with{" "}
              <span className="font-medium text-foreground">Gemini</span>, free for anyone.
            </p>

            <div className="flex flex-wrap gap-1 rounded-md border bg-muted/30 p-1">
              {PLATFORMS.map((platform) => {
                const isActive = activePlatform === platform.id;
                return (
                  <button
                    key={platform.id}
                    onClick={() => setActivePlatform(platform.id)}
                    className={
                      "flex-1 min-w-[120px] rounded px-3 py-2 text-xs font-medium transition-colors " +
                      (isActive
                        ? "bg-background shadow-sm text-foreground border"
                        : "text-muted-foreground hover:text-foreground")
                    }
                  >
                    <span className="flex items-center justify-center gap-1.5">
                      {platform.label}
                      <span
                        className={
                          "rounded px-1.5 py-0.5 text-[9px] font-semibold uppercase tracking-wide " +
                          (platform.cost === "Free"
                            ? "bg-green-100 text-green-700 dark:bg-green-950 dark:text-green-400"
                            : "bg-muted text-muted-foreground")
                        }
                      >
                        {platform.cost}
                      </span>
                    </span>
                  </button>
                );
              })}
            </div>

            <div className="mt-0 rounded-b-md rounded-t-none border border-t-0 bg-background p-5">
              <div className="mb-4 flex items-center gap-2">
                <a
                  href={currentPlatform.url}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1.5 rounded-md border px-3 py-1.5 text-xs text-muted-foreground hover:text-foreground hover:bg-accent transition-colors"
                >
                  <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>
                    <polyline points="15 3 21 3 21 9"/>
                    <line x1="10" y1="14" x2="21" y2="3"/>
                  </svg>
                  {currentPlatform.urlLabel}
                </a>
                {currentPlatform.recommended ? (
                  <span className="rounded bg-[#FCEBEB] px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-[#A32D2D]">
                    Recommended, free
                  </span>
                ) : null}
              </div>

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
                    {step.image ? (
                      <img
                        src={step.image}
                        alt={currentPlatform.label + " " + step.title}
                        className="mt-3 w-full rounded border"
                        loading="lazy"
                      />
                    ) : null}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <Separator />

        {/* ── SUBMIT (Phase 2) ── */}
        <section id="submit" className="scroll-mt-20 py-8">
          <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">Phase 2</p>
          <h2 className="mt-1 mb-1 text-lg font-medium">Review and submit</h2>
          <p className="mb-6 text-sm text-muted-foreground">
            Review your tool, submit it, then fill the short form.
          </p>

          {alreadySubmitted ? (
            <div className="flex flex-col gap-4">
              <div className="rounded-md border border-green-200 bg-green-50 p-6 text-center dark:border-green-900 dark:bg-green-950">
                <p className="text-base font-medium text-green-800 dark:text-green-300 mb-1">
                  Project submitted
                </p>
                <p className="text-sm text-green-700 dark:text-green-400">
                  {certsEnabled
                    ? "Your certificate has been issued. See the Certificate section below."
                    : "We are reviewing your submission. Your certificate will appear in the Certificate section below once it is ready."}
                </p>
              </div>

              {/* Form still required after submit */}
              <div className="rounded-md border-l-[3px] border-l-[#E24B4A] bg-[#FCEBEB] p-5 dark:bg-[#3a1010]">
                <p className="text-sm font-semibold text-[#501313] dark:text-[#f5c1c1]">
                  One last step: the course form
                </p>
                <p className="mt-1 text-xs text-[#791F1F] dark:text-[#f5c1c1]">
                  If you have not filled it yet, please do. It helps us review your submission.
                </p>
                <a
                  href={EVAL_FORM_URL}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-3 inline-flex items-center gap-2 rounded-md bg-[#E24B4A] px-4 py-2 text-sm font-medium text-white hover:bg-[#c73f3e]"
                >
                  Open the course form →
                </a>
              </div>
            </div>
          ) : (
            <div className="flex flex-col gap-5">

              {/* Step 1 - Review GPT */}
              <div className="rounded-md border p-5">
                <div className="flex items-center gap-2 mb-3">
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#E24B4A] text-xs font-medium text-white">1</span>
                  <span className="text-sm font-medium">Review your tool</span>
                </div>
                <p className="text-sm text-muted-foreground mb-4">
                  Open the Review GPT. Give it the three things it asks for. It returns a report.
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
                    "Tell it you are submitting a capstone tool for review.",
                    "Give it your project description, your objective, and your instructions.",
                    "When it is done, copy the whole response.",
                  ].map((item, i) => (
                    <li key={i} className="flex gap-2 text-sm text-muted-foreground">
                      <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-muted-foreground" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
                <p className="mt-4 text-xs text-muted-foreground rounded-md bg-muted/40 px-3 py-2">
                  Your files stay private. The GPT reviews your work in its own window. We never see your files.
                </p>
              </div>

              {/* Step 2 - Paste report */}
              <div className="rounded-md border p-5">
                <div className="flex items-center gap-2 mb-3">
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#E24B4A] text-xs font-medium text-white">2</span>
                  <span className="text-sm font-medium">Paste the report</span>
                </div>
                <label className="mb-1.5 block text-sm text-muted-foreground">
                  Paste the whole response from the Review GPT. Copy everything, top to bottom.
                </label>
                <textarea
                  className="w-full min-h-[140px] rounded-md border bg-background px-3 py-2 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring resize-y"
                  placeholder="Paste the complete response from the Review GPT..."
                  value={reviewReport}
                  onChange={(e) => setReviewReport(e.target.value)}
                />

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

              {/* Step 3 - Tell us what you built */}
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
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) => setDescription(e.target.value)}
                    />
                    <p className="mt-1.5 text-xs text-muted-foreground">
                      One line, in your own words.
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
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) => setGemUrl(e.target.value)}
                    />
                    <p className="mt-1.5 text-xs text-muted-foreground">
                      Link to your Gem, GPT, or project, if it is shareable.
                    </p>
                  </div>
                </div>
              </div>

              {submitError && submitResult === null && (
                <p className="text-xs text-destructive">{submitError}</p>
              )}

              <Button
                className="w-full bg-[#E24B4A] hover:bg-[#c73f3e]"
                onClick={handleSubmit}
                disabled={submitting}
              >
                {submitting ? "Submitting..." : "Submit capstone"}
              </Button>

              {/* Course form - required final step, below the submit button */}
              <div className="rounded-md border-l-[3px] border-l-[#E24B4A] bg-[#FCEBEB] p-5 dark:bg-[#3a1010]">
                <div className="flex items-center gap-2 mb-1">
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#E24B4A] text-xs font-medium text-white">4</span>
                  <span className="text-sm font-semibold text-[#501313] dark:text-[#f5c1c1]">Fill the course form</span>
                </div>
                <p className="mt-1 text-xs text-[#791F1F] dark:text-[#f5c1c1]">
                  After you submit, fill this short form. It helps us review your submission.
                </p>
                <a
                  href={EVAL_FORM_URL}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-3 inline-flex items-center gap-2 rounded-md bg-[#E24B4A] px-4 py-2 text-sm font-medium text-white hover:bg-[#c73f3e]"
                >
                  Open the course form →
                </a>
              </div>
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
            {completionCert && certsEnabled ? (
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
            ) : completionCert && !certsEnabled ? (
              <div className="rounded-md border border-amber-200 bg-amber-50 p-5 dark:border-amber-900 dark:bg-amber-950">
                <div className="flex items-start gap-4">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-amber-100 dark:bg-amber-900">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#B45309" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <circle cx="12" cy="12" r="10"/>
                      <polyline points="12 6 12 12 16 14"/>
                    </svg>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-amber-900 dark:text-amber-300">Certificate of Completion</p>
                    <p className="mt-0.5 text-xs text-amber-800 dark:text-amber-400">
                      Your completion is being confirmed. Your certificate will be available here shortly.
                    </p>
                  </div>
                </div>
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
            {masteryCert && certsEnabled ? (
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
            ) : masteryCert && !certsEnabled ? (
              <div className="rounded-md border border-amber-200 bg-amber-50 p-5 dark:border-amber-900 dark:bg-amber-950">
                <div className="flex items-start gap-4">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-amber-100 dark:bg-amber-900">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#B45309" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <circle cx="12" cy="12" r="10"/>
                      <polyline points="12 6 12 12 16 14"/>
                    </svg>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-amber-900 dark:text-amber-300">Certificate of Mastery</p>
                    <p className="mt-0.5 text-xs text-amber-800 dark:text-amber-400">
                      Submitted. Your certificate is under review. Check back soon.
                    </p>
                  </div>
                </div>
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