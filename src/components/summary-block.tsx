import type { SummarySection } from "@/lib/types";

interface Props {
  summary: SummarySection;
  skipFirst?: boolean; // skip the first block (it's rendered above the video as the hook)
}

export function SummaryBlock({ summary, skipFirst = false }: Props) {
  const blocks = (summary ?? []).filter((b) => b.body && b.body.trim().length > 0);
  const visible = skipFirst ? blocks.slice(1) : blocks;

  if (visible.length === 0) return null;

  const lastIndex = visible.length - 1;

  return (
    <div className="mt-4 flex flex-col gap-2">
      {visible.map((block, i) => {
        const h = block.heading.trim().toLowerCase();
        // Red only if it's the core idea (and first) or the key takeaway (and last)
        const isHighlight =
          (i === 0 && h === "core idea") ||
          (i === lastIndex && h === "key takeaway");
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
      })}
    </div>
  );
}