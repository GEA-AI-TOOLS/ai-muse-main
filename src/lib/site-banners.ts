export interface SiteBanner {
  id: string;
  message: string;
  linkText?: string;
  linkHref?: string;
  cohorts: string[];
  enabled: boolean;
}

export const SITE_BANNERS: SiteBanner[] = [
  {
    id: "capstone-deadline-jun29-2026",
    message:
      "Your capstone is where this becomes real. Build a small AI tool, GPT, or custom agent around something from your own work, and earn the Certificate of Mastery on top of your Certificate of Completion.\n**You have 2 weeks from the end of Day 10 to submit it.**",
    linkText: "Open the capstone",
    linkHref: "/capstone",
    cohorts: ["cohort_2026_06_29"],
    enabled: true,
  },
  {
    id: "week1-feedback-form-jun29-2026",
    message:
      "You signed up to help us shape this course, and your feedback matters.\nWe put together a short form on how week one went. It takes about 15 minutes, and honest answers are the useful ones.",
    linkText: "Fill in the form",
    linkHref: "https://forms.gle/pGAcLWDgnkhdpyv36",
    cohorts: ["cohort_2026_06_29"],
    enabled: true,
  },
];