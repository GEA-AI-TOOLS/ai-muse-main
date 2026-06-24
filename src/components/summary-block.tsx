import type { SummarySection } from "@/lib/types";

const ROWS: {
  key: keyof SummarySection;
  label: string;
  highlight: boolean;
}[] = [
  { key: "coreIdea", label: "Core idea", highlight: true },
  { key: "science", label: "The science", highlight: false },
  { key: "fact", label: "Myth or fact", highlight: false },
  { key: "framework", label: "The Framework / Mechanism", highlight: false },
  { key: "example", label: "Example", highlight: false },
  { key: "keyTakeaway", label: "Key takeaway", highlight: true },
];

interface Props {
  summary: SummarySection;
  skipCoreIdea?: boolean;
}

export function SummaryBlock({ summary, skipCoreIdea = false }: Props) {
  const visibleRows = ROWS.filter((row) => {
    if (skipCoreIdea && row.key === "coreIdea") return false;
    const val = summary[row.key];
    return val && val.trim().length > 0;
  });

  if (visibleRows.length === 0) return null;

  return (
    <div className="mt-4 flex flex-col gap-2">
      {visibleRows.map((row) => {
        const isHighlight = row.highlight;
        return (
          <div
            key={row.key}
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
              {row.label}
            </p>
            <p
              className={
                "text-sm leading-relaxed " +
                (isHighlight ? "text-[#501313] dark:text-[#f5c1c1]" : "text-foreground")
              }
            >
              {summary[row.key]}
            </p>
          </div>
        );
      })}
    </div>
  );
}