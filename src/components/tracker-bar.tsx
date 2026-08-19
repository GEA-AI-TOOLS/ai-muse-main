"use client";

interface Props {
  currentDay: number;
  daysComplete: number[];
  allDone: boolean;
  basePath?: string;
}

const RING_R = 24;
const RING_CIRCUMFERENCE = 2 * Math.PI * RING_R;

export function TrackerBar({ currentDay, daysComplete, allDone, basePath = "/lesson" }: Props) {
  const activeDay = allDone ? 10 : currentDay;
  const dayLabels: Record<number, string> = {
    1: "What is AI", 2: "The Human Element", 3: "Unlocking Innovation",
    4: "How We Use AI Wrong", 5: "Speak It Out", 6: "Pivot Roles",
    7: "Ask for More", 8: "Reframe", 9: "Keep Going", 10: "Stop and Think",
  };
  const phaseLabel = activeDay <= 4 ? "Foundation phase" : "SPARKS phase";
  const progress = daysComplete.length / 10;
  const ringOffset = RING_CIRCUMFERENCE * (1 - progress);

  return (
    <div>

      {/* Mobile: progress ring + segmented bar. Desktop: hidden entirely. */}
      <div className="sm:hidden">
        <div className="flex items-center gap-3.5">
          <div className="relative shrink-0" style={{ width: 64, height: 64, minWidth: 64, minHeight: 64 }}>
            <svg width="64" height="64" viewBox="0 0 64 64" className="absolute inset-0 block">
              <circle cx="32" cy="32" r={RING_R} fill="none" stroke="currentColor" strokeWidth="5" className="text-muted" />
              <circle
                cx="32" cy="32" r={RING_R} fill="none" stroke="#E24B4A" strokeWidth="5" strokeLinecap="round"
                strokeDasharray={RING_CIRCUMFERENCE}
                strokeDashoffset={ringOffset}
                transform="rotate(-90 32 32)"
                className="transition-[stroke-dashoffset] duration-500"
              />
            </svg>
            <div
              className="pointer-events-none absolute flex flex-col items-center justify-center text-center"
              style={{ left: 0, top: 0, width: 64, height: 64 }}
            >
              <span className="block text-[16px] font-semibold leading-none text-[#E24B4A]">{daysComplete.length}</span>
              <span className="mt-1 block text-[8px] font-medium uppercase leading-none tracking-wide text-muted-foreground">of 10</span>
            </div>
          </div>
          <a href={basePath + "/" + String(activeDay)} className="min-w-0 flex-1">
            <p className="truncate text-[15px] font-medium">
              {allDone ? "All days complete" : "Day " + String(activeDay) + " · " + (dayLabels[activeDay] ?? "")}
            </p>
            <p className="mt-0.5 text-xs text-muted-foreground">{allDone ? "Course complete" : phaseLabel}</p>
          </a>
        </div>

        <div className="mt-3 flex gap-1">
          {Array.from({ length: 10 }, (_, i) => i + 1).map((day) => (
            <div
              key={day}
              className={
                "h-1 flex-1 rounded-full " +
                (daysComplete.includes(day) ? "bg-[#E24B4A]" : "bg-muted")
              }
            />
          ))}
        </div>
      </div>

      {/* Desktop: unchanged dot row, exactly as before. */}
      <div className="hidden sm:block">
        <div className="flex items-end justify-between">
          {Array.from({ length: 10 }, (_, i) => i + 1).map((day) => {
            const isComplete = daysComplete.includes(day);
            const isToday = day === currentDay && !allDone;
            const isMissed = !isComplete && !isToday && day < currentDay;
            const dotSize = isToday ? "h-9 w-9" : "h-8 w-8";

            let dotStyle = "";
            let textStyle = "";

            if (isComplete) {
              dotStyle = "bg-[#E24B4A] text-white";
              textStyle = "text-muted-foreground";
            } else if (isToday) {
              dotStyle = "border-2 border-[#E24B4A] text-[#E24B4A] bg-white ring-4 ring-[#FCEBEB]";
              textStyle = "text-[#A32D2D] font-medium";
            } else if (isMissed) {
              dotStyle = "border-2 border-dashed border-[#E24B4A] text-[#E24B4A] bg-white";
              textStyle = "text-[#A32D2D]";
            } else {
              dotStyle = "border border-border text-muted-foreground bg-background";
              textStyle = "text-muted-foreground";
            }

            const dot = (
              <div className="flex flex-col items-center gap-1.5">
                <div className={
                  "flex items-center justify-center rounded-full text-xs font-medium " +
                  dotSize + " " + dotStyle
                }>
                  {isComplete ? "✓" : String(day)}
                </div>
                <span className={"text-[10px] " + textStyle}>
                  {isToday ? "Today" : "Day " + String(day)}
                </span>
              </div>
            );

            return (
              <a key={day} href={basePath + "/" + String(day)}>
                {dot}
              </a>
            );
          })}
        </div>

        <div className="relative mt-1">
          <div className="h-1 w-full rounded-full bg-muted" />
          <div
            className="absolute top-0 left-0 h-1 rounded-full bg-[#E24B4A] transition-all"
            style={{ width: String((daysComplete.length / 10) * 100) + "%" }}
          />
        </div>

        <div className="mt-3 flex justify-between text-[10px] text-muted-foreground">
          <span>Phase 1 · Foundation</span>
          <span>Phase 2 · SPARKS</span>
        </div>
      </div>

      {allDone && (
        <div className="mt-4 flex items-center gap-3">
          <div className="h-px flex-1 bg-[#E24B4A]" />
          <a
            href="/capstone"
            className="flex items-center gap-2 rounded-md bg-[#E24B4A] px-4 py-1.5 text-xs font-medium text-white hover:bg-[#c73f3e]"
          >
            Capstone unlocked →
          </a>
          <div className="h-px flex-1 bg-[#E24B4A]" />
        </div>
      )}
    </div>
  );
}