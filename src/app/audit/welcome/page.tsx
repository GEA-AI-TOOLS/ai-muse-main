import type { Metadata } from "next";
import { AuditWelcomeView } from "./audit-welcome-view.tsx";

export const metadata: Metadata = {
  title: "Course overview, Make AI Your Muse",
  description: "What the 10 day course covers and how it works, before you enroll.",
  alternates: { canonical: "/audit/welcome" },
};

export default function AuditWelcomePage() {
  return <AuditWelcomeView />;
}