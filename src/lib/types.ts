export type ParticipantStatus = "active" | "completed" | "inactive" | "needs_attention";
export type Phase = "foundation" | "sparks";
export type LessonSection = "essential" | "advanced" | "learnmore";
export type LearnMoreType = "article" | "tool" | "video" | "other";

export interface SummarySection {
  coreIdea: string;
  science: string;
  fact: string;
  framework: string;
  example: string;
  keyTakeaway: string;
}

export interface ExerciseStep {
  task: string;
  title: string;
  items: string[];
}

export interface Exercise {
  objective: string;
  doneWhen: string;
  timeMinutes: number;
  steps: ExerciseStep[];
  prompt: string | null;
  demo?: {
    videoUrl: string;
    title: string;
  };
}

export interface LessonVideo {
  videoUrl: string;
  slideUrl?: string;
  durationSeconds: number;
  summary: SummarySection;
  exercise: Exercise;
}

export interface LearnMoreLink {
  title: string;
  url: string;
  type: LearnMoreType;
}

export interface Lesson {
  day: number;
  title: string;
  phase: Phase;
  essential: LessonVideo;
  advanced: LessonVideo;
  learnMore: LearnMoreLink[];
  sectionTitles: {
  essential: string;
  advanced: string;
};
}

export interface Participant {
  id: string;
  name: string;
  email: string;
  cohortId: string;
  currentDay: number;
  status: ParticipantStatus;
  timezone: string;
  enrolledAt: string;
  daysComplete?: number[];
  revoked?: boolean;
}

export interface SessionData {
  name: string;
  email: string;
  cohortId: string;
  currentDay: number;
  daysComplete: number[];
  revoked: boolean;
  status?: string;       // carry status so /api/participant stops hardcoding "active"
  fetchedAt?: number;    // epoch ms when this cookie was last refreshed from DB
}

export interface ParticipantResponse {
  participant: Participant;
}

export interface ClickResponse {
  ok: boolean;
  redirectTo?: string;
}

export interface ApiError {
  error: string;
}

export interface DayProgress {
  day: number;
  sentAt?: string | null;
  doneAt?: string | null;
  reminderSentAt?: string | null;
}

export interface MagicLink {
  token: string;
  participantId: string;
  purpose: "initial_pairing" | "new_device";
  expiresAt?: string;
  usedAt?: string | null;
  used?: boolean;
}