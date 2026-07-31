import type { Metadata } from "next";
import { Fraunces, Geist } from "next/font/google";
import { LANDING } from "@/lib/landing-config";
import { LandingView } from "./landing-view";

// Fraunces: wide, warm serif. Replaces Instrument Serif, which is a
// condensed face and read as horizontally squished at display sizes.
// If this still is not right, the next candidate is Newsreader.
const fraunces = Fraunces({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-display",
  display: "swap",
});

const geist = Geist({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Make AI Your Muse in 10 Days | SPARKS by Bryan Cassady",
  description:
    "The only AI course that scores you before and after. Ten minutes a day for ten days, built on the SPARKS framework by Bryan Cassady. Preview Day 1 free, no signup.",
  alternates: { canonical: "/home" },
  openGraph: {
    title: "The only AI course that proves it worked",
    description:
      "Scored before. Scored after. A 10-day daily AI practice by Bryan Cassady.",
    type: "website",
  },
};

const courseJsonLd = {
  "@context": "https://schema.org",
  "@type": "Course",
  name: "Make AI Your Muse in 10 Days",
  description:
    "A 10-day self-paced AI course built on the SPARKS framework: Speak it out, Pivot roles, Ask for more, Reframe, Keep going, Stop and think. Every participant is assessed before and after the course.",
  provider: { "@type": "Person", name: "Bryan Cassady" },
  offers: {
    "@type": "Offer",
    price: String(LANDING.pricing.selfPaced.salePrice ?? LANDING.pricing.selfPaced.basePrice),
    priceCurrency: "USD",
    availability: "https://schema.org/InStock",
  },
  hasCourseInstance: {
    "@type": "CourseInstance",
    courseMode: "online",
    courseWorkload: "PT10M",
  },
};

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "What is the SPARKS framework?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "SPARKS is a six-behavior method for working with AI, created by Bryan Cassady: Speak it out, Pivot roles, Ask for more, Reframe, Keep going, and Stop and think. Days 1 to 4 of the course build the foundation, days 5 to 10 practice one behavior each.",
      },
    },
    {
      "@type": "Question",
      name: "Can I see the course before buying?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. Day 1 is fully open in the course preview, video, exercise, and prompt included. No signup needed.",
      },
    },
    {
      "@type": "Question",
      name: "Is there a version for teams?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. The live version runs as facilitated cohorts for teams and organizations. It is not available to individuals.",
      },
    },
  ],
};

export default function HomePage() {
  return (
    <div className={fraunces.variable + " " + geist.variable}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(courseJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
      <LandingView />
    </div>
  );
}
