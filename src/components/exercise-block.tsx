"use client";

import { useState } from "react";
import type { Exercise } from "@/lib/types";

interface Props {
  exercise: Exercise;
  promptChatGptUrl?: string;
  promptClaudeUrl?: string;
  promptGeminiUrl?: string;
}

export function ExerciseBlock({
  exercise,
  promptChatGptUrl,
  promptClaudeUrl,
  promptGeminiUrl,
}: Props) {
  return (
    <div className="mt-4">
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
          <div
            key={i}
            className="rounded-md border bg-muted/30 p-4"
          >
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
                  <span>{item}</span>
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
    navigator.clipboard.writeText(prompt).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  }

  return (
    <div className="mt-4 rounded-md border border-dashed bg-muted/40 p-4">
      <p className="mb-2 text-[10px] font-medium uppercase tracking-[0.4px] text-muted-foreground">
        Try this prompt
      </p>
      <p className="mb-4 font-mono text-sm leading-relaxed">{prompt}</p>
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
          <a
            href={chatGptUrl}
            target="_blank"
            rel="noreferrer"
            className="rounded border px-3 py-1.5 text-xs hover:bg-accent"
          >
            ChatGPT ↗
          </a>
        )}
        {claudeUrl && (
          <a
            href={claudeUrl}
            target="_blank"
            rel="noreferrer"
            className="rounded border px-3 py-1.5 text-xs hover:bg-accent"
          >
            Claude ↗
          </a>
        )}
        {geminiUrl && (
          <a
            href={geminiUrl}
            target="_blank"
            rel="noreferrer"
            className="rounded border px-3 py-1.5 text-xs hover:bg-accent"
            title="Prompt copied — just paste when Gemini opens"
          >
            Gemini ↗
          </a>
        )}
        {geminiUrl && (
          <p className="mt-2 text-[10px] text-muted-foreground">
            Gemini: prompt copied automatically — just paste when it opens.
          </p>
        )}
      </div>
    </div>
  );
}