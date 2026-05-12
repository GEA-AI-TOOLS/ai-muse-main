import Link from "next/link";

interface Props {
  currentDay: number;
  daysComplete: number[];
  allDone: boolean;
}

export function TrackerBar({ currentDay, daysComplete, allDone }: Props) {
  return (
    <div>
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

          // Completed and past days are clickable
          if (isComplete || isMissed) {
            return (
              <a key={day} href={"/lesson/" + String(day)}>
                {dot}
              </a>
            );
          }

          return <div key={day}>{dot}</div>;
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