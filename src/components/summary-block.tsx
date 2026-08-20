"use client";

import { useState } from "react";
import type { SummarySection } from "@/lib/types";

interface Props {
  summary: SummarySection;
  skipFirst?: boolean; // skip the first block (it's rendered above the video as the hook)
}

export function SummaryBlock({ summary, skipFirst = false }: Props) {
  const [expanded, setExpanded] = useState(false);
  const blocks = (summary ?? []).filter((b) => b.body && b.body.trim().length > 0);
  const visible = skipFirst ? blocks.slice(1) : blocks;

  if (visible.length === 0) return null;

  const lastIndex = visible.length - 1;

  function isHighlightBlock(i: number, heading: string) {
    const h = heading.trim().toLowerCase();
    return (i === 0 && h === "core idea") || (i === lastIndex && h === "key takeaway");
  }

  const keyTakeawayIndex = visible.findIndex(
    (b, i) => i === lastIndex && b.heading.trim().toLowerCase() === "key takeaway"
  );
  const hasKeyTakeaway = keyTakeawayIndex !== -1;

  function renderBlock(block: SummarySection[number], i: number) {
    const isHighlight = isHighlightBlock(i, block.heading);
    return (
      <div
        key={i}
        className={
          "rounded-r-md border-l-[3px] px-4 py-3 " +
          (isHighlight
            ? "border-l-[#E24B4A] bg-[#FCEBEB] dark:bg-[#3a1010]"
            : "border-l-border bg-muted/40")
        }
      >
        <p
          className={
            "mb-1 text-[10px] font-medium uppercase tracking-[0.4px] " +
            (isHighlight ? "text-[#A32D2D]" : "text-muted-foreground")
          }
        >
          {block.heading}
        </p>
        <p
          className={
            "text-sm leading-relaxed " +
            (isHighlight ? "text-[#501313] dark:text-[#f5c1c1]" : "text-foreground")
          }
        >
          {block.body}
        </p>
      </div>
    );
  }

  // Desktop: unchanged, every block shown inline, no toggle.
  const desktopView = (
    <div className="hidden sm:flex sm:flex-col sm:gap-2">
      {visible.map((block, i) => renderBlock(block, i))}
    </div>
  );

  // Mobile, no key-takeaway block to anchor on: same as desktop, nothing to collapse.
  if (!hasKeyTakeaway) {
    return (
      <>
        {desktopView}
        <div className="flex flex-col gap-2 sm:hidden">
          {visible.map((block, i) => renderBlock(block, i))}
        </div>
      </>
    );
  }

  const keyTakeaway = visible[keyTakeawayIndex];
  const rest = visible.filter((_, i) => i !== keyTakeawayIndex);

  return (
    <>
      {desktopView}

      {/* Mobile: key takeaway only, rest behind a toggle */}
      <div className="flex flex-col gap-2 sm:hidden">
        {renderBlock(keyTakeaway, keyTakeawayIndex)}

        {expanded && rest.map((block, i) => renderBlock(block, i))}

        {rest.length > 0 && (
          <button
            type="button"
            onClick={() => setExpanded((v) => !v)}
            className="flex w-full items-center justify-center gap-1.5 rounded-md py-2 text-xs text-muted-foreground hover:text-foreground"
          >
            {expanded ? "Show less" : "Read the full breakdown"}
            <svg
              width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
              className={"transition-transform " + (expanded ? "rotate-180" : "")}
            >
              <polyline points="6 9 12 15 18 9" />
            </svg>
          </button>
        )}
      </div>
    </>
  );
}