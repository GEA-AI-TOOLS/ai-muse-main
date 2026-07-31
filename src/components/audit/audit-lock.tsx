import { AUDIT_COPY, AUDIT_ENROLL_HREF, FILLER_PROMPT, FILLER_STEPS } from "@/lib/audit-config";

function LockIcon({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
      <path d="M7 11V7a5 5 0 0 1 10 0v4" />
    </svg>
  );
}

/** Frosted wrapper. Children must be FAKE content — this is DOM-visible. */
export function Frosted({ children, label }: { children: React.ReactNode; label: string }) {
  return (
    <div className="relative overflow-hidden rounded-md border">
      <div className="pointer-events-none select-none blur-[4px]" aria-hidden="true">
        {children}
      </div>
      <div className="absolute inset-0 flex items-center justify-center gap-2 bg-background/10">
        <span className="flex items-center gap-2 rounded-md border bg-background/80 px-3 py-1.5 text-xs font-medium text-foreground shadow-sm">
          <LockIcon size={13} />
          {label}
        </span>
      </div>
    </div>
  );
}

export function LockedVideo() {
  return (
    <div className="relative aspect-video overflow-hidden rounded-md bg-muted">
      <div className="pointer-events-none absolute inset-0 blur-2xl opacity-40" aria-hidden="true">
        <div className="absolute left-[8%] top-[15%] h-[45%] w-[40%] rounded-full bg-[#E24B4A]" />
        <div className="absolute right-[10%] bottom-[8%] h-[50%] w-[45%] rounded-full bg-foreground/60" />
      </div>
      <div className="absolute inset-0 flex flex-col items-center justify-center gap-2">
        <div className="text-foreground"><LockIcon size={24} /></div>
        <p className="text-sm font-medium">{AUDIT_COPY.videoLockTitle}</p>
        <p className="text-xs text-muted-foreground">{AUDIT_COPY.videoLock}</p>
      </div>
    </div>
  );
}

export function LockedPromptBox() {
  return (
    <div className="mt-4">
      <Frosted label={AUDIT_COPY.promptLock}>
        <div className="bg-[#FDF5F5] p-4 dark:bg-[#2a0e0e]">
          <p className="mb-2 text-[10px] font-medium uppercase tracking-[0.4px] text-muted-foreground">
            Try this prompt
          </p>
          <pre className="max-h-64 overflow-hidden whitespace-pre-wrap font-mono text-[13px] leading-relaxed text-foreground">
            {FILLER_PROMPT}
          </pre>
        </div>
      </Frosted>
      <DeadButtons labels={["Copy", "ChatGPT ↗", "Claude ↗", "Gemini ↗"]} />
    </div>
  );
}

export function LockedExercise({
  objective,
  timeMinutes,
  hasDemo,
}: {
  objective?: string;
  timeMinutes?: number;
  hasDemo?: boolean;
}) {
  return (
    <div className="mt-4">
      {hasDemo && (
        <div className="mb-5 flex gap-1 border-b" aria-hidden="true">
          <span className="border-b-2 border-[#E24B4A] px-4 py-2.5 text-sm font-medium text-[#E24B4A]">
            Exercise
          </span>
          <span className="cursor-not-allowed px-4 py-2.5 text-sm font-medium text-muted-foreground opacity-45">
            Demo Video
            <span className="ml-1.5 text-[10px] font-normal">locked</span>
          </span>
        </div>
      )}

      <div className="mb-4 flex items-center justify-between">
        <div>
          <p className="text-[10px] font-medium uppercase tracking-[0.4px] text-muted-foreground">Exercise</p>
          {objective && <p className="mt-0.5 text-xs text-muted-foreground">{"Objective: " + objective}</p>}
        </div>
        {timeMinutes && <span className="text-xs text-muted-foreground">{timeMinutes + " min"}</span>}
      </div>

      <Frosted label={AUDIT_COPY.exerciseLock}>
        <div className="flex flex-col gap-3 p-1">
          {FILLER_STEPS.map((step, i) => (
            <div key={i} className="rounded-md border bg-muted/30 p-4">
              <div className="mb-2 flex items-center gap-2">
                <span className="text-lg font-medium leading-none text-[#E24B4A]">{step.task}</span>
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
      </Frosted>

      <LockedPromptBox />
    </div>
  );
}

export function LockedCard({ title, subtitle }: { title: string; subtitle?: string }) {
  return (
    <div className="flex items-center justify-between gap-4 rounded-md border border-dashed bg-muted/20 px-5 py-4">
      <div>
        <p className="text-sm font-medium">{title}</p>
        {subtitle && <p className="mt-0.5 text-xs text-muted-foreground">{subtitle}</p>}
      </div>
      <div className="flex shrink-0 items-center gap-2 text-muted-foreground">
        <LockIcon size={16} />
        <span className="text-xs">{AUDIT_COPY.genericLock}</span>
      </div>
    </div>
  );
}

export function DeadButtons({ labels }: { labels: string[] }) {
  return (
    <div className="mt-3 flex flex-wrap items-center gap-2" aria-hidden="true">
      {labels.map((label) => (
        <span
          key={label}
          className="cursor-not-allowed select-none rounded border px-3 py-1.5 text-xs text-muted-foreground opacity-45"
        >
          {label}
        </span>
      ))}
    </div>
  );
}

export function EnrollCta({ className = "" }: { className?: string }) {
  return (
    <a
      href={AUDIT_ENROLL_HREF}
      className={"inline-flex items-center rounded-md bg-[#E24B4A] px-4 py-2 text-sm font-medium text-white hover:bg-[#c73f3e] " + className}
    >
      {AUDIT_COPY.barCta}
    </a>
  );
}