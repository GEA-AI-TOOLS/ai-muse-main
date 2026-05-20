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
              src="https://player.vimeo.com/video/76979871"
              className="h-full w-full"
              allow="autoplay; fullscreen; picture-in-picture"
              allowFullScreen
            />
          </div>
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
}