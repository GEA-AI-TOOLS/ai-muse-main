import type { Metadata } from "next";
import { AuditView } from "./audit-view";

export const metadata: Metadata = {
  title: "Disciplined AI: The SPARKS Method — Course preview",
  description:
    "See exactly what the 10-day course looks like before you enroll. Real structure, real summaries, locked video and exercises.",
  alternates: { canonical: "/audit" },
  openGraph: {
    title: "Disciplined AI: The SPARKS Method — Course preview",
    description:
      "See exactly what the 10-day course looks like before you enroll.",
    type: "website",
  },
};

export default function AuditPage() {
  return <AuditView />;
}