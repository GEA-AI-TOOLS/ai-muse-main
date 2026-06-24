"use client";

import { useState } from "react";
import type { Exercise } from "@/lib/types";

interface Props {
  exercise: Exercise;
  promptChatGptUrl?: string;
  promptClaudeUrl?: string;
  promptGeminiUrl?: string;
}

function HighlightedPrompt({ text }: { text: string }) {
  const parts = text.split(/(\[[^\]]+\])/g);
  return (
    <>
      {parts.map((part, i) =>
        /^\[[^\]]+\]$/.test(part) ? (
          <span
            key={i}
            className="rounded bg-[#FCEBEB] px-1 py-0.5 font-medium text-[#A32D2D] dark:bg-[#3a1010] dark:text-[#f5c1c1]"
          >
            {part}
          </span>
        ) : (
          <span key={i}>{part}</span>
        )
      )}
    </>
  );
}

export function ExerciseBlock({
  exercise,
  promptChatGptUrl,
  promptClaudeUrl,
  promptGeminiUrl,
}: Props) {
  const hasDemo = !!exercise.demo?.videoUrl?.trim();
  const [tab, setTab] = useState<"exercise" | "demo">("exercise");

  return (
    <div className="mt-4">
      {/* Tabs — only shown when a demo exists */}
      {hasDemo && (
        <div className="mb-5 flex gap-1 border-b">
          <button
            onClick={() => setTab("exercise")}
            className={
              "px-4 py-2.5 text-sm font-medium transition-colors " +
              (tab === "exercise"
                ? "border-b-2 border-[#E24B4A] text-[#E24B4A]"
                : "text-muted-foreground hover:text-foreground")
            }
          >
            Exercise
          </button>
          <button
            onClick={() => setTab("demo")}
            className={
              "px-4 py-2.5 text-sm font-medium transition-colors " +
              (tab === "demo"
                ? "border-b-2 border-[#E24B4A] text-[#E24B4A]"
                : "text-muted-foreground hover:text-foreground")
            }
          >
            Demo Video
            <span className="ml-1.5 text-[10px] font-normal text-muted-foreground">
              optional
            </span>
          </button>
        </div>
      )}

      {/* Demo tab */}
      {hasDemo && tab === "demo" && (
        <div className="mb-2">
          <div className="aspect-video overflow-hidden rounded-md bg-black">
            <iframe
              src={exercise.demo!.videoUrl}
              className="h-full w-full"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
          <p className="mt-3 text-sm text-muted-foreground">
            {exercise.demo!.title}
          </p>
          <p className="mt-1 text-xs text-muted-foreground">
            Watch this if you want to see an example before running the exercise. The exercise itself is the main task.
          </p>
        </div>
      )}

      {/* Exercise tab (default) */}
      {(!hasDemo || tab === "exercise") && (
        <>
          <div className="mb-4 flex items-center justify-between">
            <div>
              <p className="text-[10px] font-medium uppercase tracking-[0.4px] text-muted-foreground">
                Exercise
              </p>
              <p className="mt-0.5 text-xs text-muted-foreground">
                {"Objective: " + exercise.objective}
              </p>
            </div>
            <span className="text-xs text-muted-foreground">
              {exercise.timeMinutes + " min"}
            </span>
          </div>

          <div className="mb-4 flex flex-col gap-3">
            {exercise.steps.map((step, i) => (
              <div key={i} className="rounded-md border bg-muted/30 p-4">
                <div className="mb-2 flex items-center gap-2">
                  <span className="text-lg font-medium text-[#E24B4A] leading-none">
                    {step.task}
                  </span>
                  <span className="text-sm font-medium">{step.title}</span>
                </div>
                <ul className="space-y-1.5">
                  {step.items.map((item, j) => (
                    <li key={j} className="flex gap-2 text-sm leading-relaxed">
                      <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-muted-foreground" />
                      <span dangerouslySetInnerHTML={{ __html: item }} />
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="rounded-md border bg-muted/20 px-3 py-2 text-xs text-muted-foreground">
            <span className="font-medium">Done when: </span>
            {exercise.doneWhen}
          </div>

          {exercise.prompt && (
            <PromptBox
              prompt={exercise.prompt}
              chatGptUrl={promptChatGptUrl}
              claudeUrl={promptClaudeUrl}
              geminiUrl={promptGeminiUrl}
            />
          )}
        </>
      )}
    </div>
  );
}

function PromptBox({
  prompt,
  chatGptUrl,
  claudeUrl,
  geminiUrl,
}: {
  prompt: string;
  chatGptUrl?: string;
  claudeUrl?: string;
  geminiUrl?: string;
}) {
  const [copied, setCopied] = useState(false);

  function handleCopy() {
    // Copy the RAW prompt (with brackets intact) — highlighting is display-only
    navigator.clipboard.writeText(prompt).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  }

  return (
    <div className="mt-4 rounded-md border border-[#F3C9C9] bg-[#FDF5F5] p-4 dark:border-[#3a1010] dark:bg-[#2a0e0e]">
      <p className="mb-2 text-[10px] font-medium uppercase tracking-[0.4px] text-muted-foreground">
        Try this prompt
      </p>
      <pre className="mb-2 max-h-64 overflow-auto whitespace-pre-wrap font-mono text-[13px] leading-relaxed text-foreground">
        <HighlightedPrompt text={prompt} />
      </pre>
      <p className="mb-4 text-[10px] text-muted-foreground">
        Fill in the highlighted brackets before sending.
      </p>
      <div className="flex flex-wrap items-center gap-2">
        <button
          onClick={handleCopy}
          className="flex items-center gap-1.5 rounded border px-3 py-1.5 text-xs hover:bg-accent"
        >
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <rect x="9" y="9" width="13" height="13" rx="2" ry="2"/>
            <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/>
          </svg>
          {copied ? "Copied!" : "Copy"}
        </button>
        {chatGptUrl && (
          <a href={chatGptUrl} target="_blank" rel="noreferrer" className="rounded border px-3 py-1.5 text-xs hover:bg-accent">
            ChatGPT ↗
          </a>
        )}
        {claudeUrl && (
          <a href={claudeUrl} target="_blank" rel="noreferrer" className="rounded border px-3 py-1.5 text-xs hover:bg-accent">
            Claude ↗
          </a>
        )}
        {geminiUrl && (
          <a href={geminiUrl} target="_blank" rel="noreferrer" className="rounded border px-3 py-1.5 text-xs hover:bg-accent" title="Prompt copied — just paste when Gemini opens">
            Gemini ↗
          </a>
        )}
      </div>
      {geminiUrl && (
        <p className="mt-2 text-[10px] text-muted-foreground">
          Gemini: prompt copied automatically — just paste when it opens.
        </p>
      )}
    </div>
  );
}