export type AuditSection =
  | "essentialVideo"
  | "essentialSummary"
  | "essentialExercise"
  | "advanced"
  | "learnMore";

type LockMap = Record<AuditSection, boolean>;

// Global default. Structure visible, payload locked.
const DEFAULT_LOCKS: LockMap = {
  essentialVideo: true,
  essentialSummary: false, // the hook, always visible
  essentialExercise: true, // covers steps, prompt, and demo tab together
  advanced: true,
  learnMore: true,
};

// Per-day overrides. Day 1 is the fully open sample.
// Advanced is left unset on purpose, it stays locked so the teaser
// still shows visitors what enrolling adds even on the open day.
const DAY_OVERRIDES: Record<number, Partial<LockMap>> = {
  1: {
    essentialVideo: false,
    essentialExercise: false,
    learnMore: false,
  },
};

export function isLocked(section: AuditSection, day?: number): boolean {
  if (day !== undefined) {
    const override = DAY_OVERRIDES[day]?.[section];
    if (override !== undefined) return override;
  }
  return DEFAULT_LOCKS[section];
}

// Simulated participant. Day 4 falls out as "missed" from the
// existing status logic (day < currentDay && not complete).
export const AUDIT_PERSONA = {
  currentDay: 5,
  daysComplete: [1, 2, 3],
};

export const AUDIT_ENROLL_HREF = "/enroll";

export const AUDIT_COPY = {
  barLabel: "Audit mode",
  barText: "This is a preview of the paid course. Locked sections open when you enroll.",
  barCta: "Enroll",
  headerName: "Audit mode preview",
  videoLock: "Available to enrolled participants",
  videoLockTitle: "Lesson video",
  promptLock: "Prompt unlocks on enrollment",
  exerciseLock: "Exercise unlocks on enrollment",
  genericLock: "Unlocks on enrollment",
  personaNote: "This shows a sample learner's progress. Your own progress starts when you enroll.",
  day1HighlightTitle: "Day 1 is fully unlocked",
  day1HighlightBody: "Everything below is exactly what you get in the paid course. Video, exercise, prompt, and links, all open.",
  day1Cta: "Open Day 1",
  otherDaysNote: "You can audit every other day too. Structure and summaries are open. Video, exercises, and prompts unlock when you enroll.",
  courseOverviewTitle: "Course overview",
  courseOverviewSubtitle: "What the 10 days cover, before you begin",
};

// Fake filler for locked exercise steps. Never the real prompt.
export const FILLER_PROMPT = `I am working on [describe the thing you are trying to move forward].

The real constraint is: [one sentence. Not the symptom. The cause.]

Given only that constraint, what are the highest-leverage moves available to me.

Do not suggest tools or platforms. Do not solve around the edges.

-----------

If any bracket above is empty, ask me one question at a time before you proceed. Reflect my answer back before moving on.`;

export const FILLER_STEPS = [
  { task: "01", title: "Describe the context", items: ["Set the scene in one sentence", "Be specific enough for a stranger"] },
  { task: "02", title: "Name the constraint", items: ["Cause, not symptom", "Keep digging until it stops moving"] },
  { task: "03", title: "Review the output", items: ["Does it hit the constraint you named?", "Keep only what does"] },
];