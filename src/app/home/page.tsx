import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Make AI Your Muse in 10 Days",
  description: "A 10-day self-paced course to change how you work with AI.",
};

export default function HomePage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-6 px-8 text-center">
      <img src="/assets/site-icon.png" alt="AI Muse" className="h-12 w-12 rounded object-contain" />
      <h1 className="max-w-lg text-3xl font-medium leading-tight">
        Make AI Your Muse in 10 Days
      </h1>
      <p className="max-w-md text-base text-muted-foreground">
        A short daily practice to think better with AI. Landing page in progress.
      </p>
      <div className="flex items-center gap-3">
        <a
          href="/enroll"
          className="rounded-md bg-[#E24B4A] px-6 py-3 text-sm font-medium text-white hover:bg-[#c73f3e]"
        >
          Enroll
        </a>
        <a
          href="/audit"
          className="rounded-md border px-6 py-3 text-sm font-medium hover:bg-accent"
        >
          See a preview
        </a>
      </div>
    </div>
  );
}