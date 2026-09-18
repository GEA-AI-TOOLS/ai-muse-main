export type AuditTourId = "progress" | "lesson";

export type TourStep = {
  /** data-tour values, first one found on the page wins. Step is dropped if none exist. */
  targets: string[];
  title: string;
  body: string;
};

export type TourFinish =
  | { label: string; href: string }
  | { label: string; scrollTo: string };

export const TOUR_START_EVENT = "audit-tour:start";

export const PROGRESS_TOUR: { steps: TourStep[]; finish: TourFinish } = {
  steps: [
    {
      targets: ["tracker"],
      title: "Your 10-day path",
      body: "One lesson a day, about 10 minutes each. This is how the real course tracks your progress.",
    },
    {
      targets: ["welcome"],
      title: "Start here",
      body: "A short intro video on how the course works, plus a free AI baseline score you can take in minutes.",
    },
    {
      targets: ["day1"],
      title: "Day 1 is fully open",
      body: "The real lesson, not a sample. Video, exercise, prompt, and links.",
    },
    {
      targets: ["ahead"],
      title: "Where it leads",
      body: "Finish all 10 days, build your own AI tool, and earn your certificates.",
    },
  ],
  finish: { label: "Show me Day 1", href: "/audit/lesson/1?tour=1" },
};

export function lessonTour(hasDemo: boolean): { steps: TourStep[]; finish: TourFinish } {
  return {
    steps: [
      {
        targets: ["video"],
        title: "Watch the lesson",
        body: "Most of your 10 minutes happen here.",
      },
      {
        targets: ["summary"],
        title: "Prefer reading?",
        body: "The key points of the video, readable in a minute.",
      },
      {
        targets: ["exercise"],
        title: "Put it to work",
        body:
          "Copy the prompt, or open it straight in ChatGPT, Claude, or Gemini." +
          (hasDemo ? " Stuck? The Demo Video tab shows it done." : ""),
      },
      {
        targets: ["assessment"],
        title: "See where you stand",
        body: "Get your free AI baseline score. Participants go from 57 on Day 1 to 81 by Day 10.",
      },
      {
        targets: ["advanced", "learnmore"],
        title: "Go deeper",
        body: "Advanced lessons and extra reading for when you have more time.",
      },
    ],
    finish: { label: "Start with the video", scrollTo: "video" },
  };
}

// ---------- Storage rules ----------
// Completed: that tour never auto-invites again.
// Dismissed (Not now, Skip, Esc): no auto-invites for any audit tour for 7 days.
// Invited: once per tab session per tour, so back/reload never re-shows it.
// All reads/writes are guarded, storage can throw (Safari private mode, blocked cookies).

const DISMISSED_KEY = "audit_tour:dismissed_at";
const DISMISS_MS = 7 * 24 * 60 * 60 * 1000;
const completedKey = (id: AuditTourId) => "audit_tour:completed:" + id;
const invitedKey = (id: AuditTourId) => "audit_tour:invited:" + id;

function read(kind: "local" | "session", key: string): string | null {
  try {
    return (kind === "local" ? window.localStorage : window.sessionStorage).getItem(key);
  } catch {
    return null;
  }
}

function write(kind: "local" | "session", key: string, value: string) {
  try {
    (kind === "local" ? window.localStorage : window.sessionStorage).setItem(key, value);
  } catch {
    // ignore
  }
}

export function shouldInvite(id: AuditTourId): boolean {
  if (read("session", invitedKey(id))) return false;
  if (read("local", completedKey(id))) return false;
  const dismissedAt = Number(read("local", DISMISSED_KEY));
  if (dismissedAt && Date.now() - dismissedAt < DISMISS_MS) return false;
  return true;
}

export function markInvited(id: AuditTourId) {
  write("session", invitedKey(id), "1");
}

export function markCompleted(id: AuditTourId) {
  write("local", completedKey(id), String(Date.now()));
  // Also counts as seen for this session, so it never pops again right after.
  markInvited(id);
}

export function markDismissed(id: AuditTourId) {
  write("local", DISMISSED_KEY, String(Date.now()));
  markInvited(id);
}

/**
 * Reads ?tour=1 / ?tour=0 once and strips it from the URL, so pressing
 * back to this page never force-starts the tour a second time.
 */
export function consumeTourParam(): "on" | "off" | null {
  try {
    const url = new URL(window.location.href);
    const value = url.searchParams.get("tour");
    if (value === null) return null;
    url.searchParams.delete("tour");
    window.history.replaceState(window.history.state, "", url.pathname + url.search + url.hash);
    if (value === "1") return "on";
    if (value === "0") return "off";
    return null;
  } catch {
    return null;
  }
}