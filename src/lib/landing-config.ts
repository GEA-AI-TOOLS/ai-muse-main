// ============================================================
// LANDING PAGE CONTENT CONFIG v3
// Everything editable lives here. Components read from this file
// and never hardcode copy, questions, resources, or testimonials.
// No em dashes anywhere, per site rule.
// ============================================================

// Explicit types so per-array inference never breaks the build
// (every option shares one shape; route is optional everywhere).
export type ExplorerOption = {
  id: string;
  label: string;
  route?: "team";
  boosts: Record<string, number>;
};
export type ExplorerQuestion = {
  id: string;
  question: string;
  options: ExplorerOption[];
};

// Proof section. Explicit types so the mixed-shape summary array and the
// chart data never break per-array inference.
export type ProofSummaryItem = {
  from: number | null; // null renders a single figure instead of a before/after pair
  to: number;
  prefix?: string;
  suffix?: string;
  label: string;
};
export type ProofBand = {
  range: string;
  before: number;
  after: number;
  highlight?: boolean;
};
export type ProofParticipant = {
  id: number;
  before: number;
  after: number;
};

export const LANDING = {
  enrollHref: "/enroll",
  liveCohortHref: "/enroll",
  auditHref: "/audit",
  loginHref: "/login",
  contactMailto: "mailto:courses@bryancassady.com?subject=Disciplined%20AI%20for%20teams",

  header: {
    brand: "Disciplined AI",
    nav: [
      { label: "Proof", href: "#proof" },
      { label: "Curriculum", href: "#curriculum" },
      { label: "Pricing", href: "#pricing" },
      { label: "For teams", href: "#pricing" },
    ],
  },

  hero: {
    eyebrow: "A 10-day course. 10 minutes a day.",
    // The word wrapped in *asterisks* gets the red underline treatment.
    headline: "The only AI course that *proves* it worked.",
    sub: "Every participant is scored before the course and after it. Most AI training asks you to trust it. SPARKS shows you the numbers, built from the methods used inside 200+ organizations.",
    trust: "By Bryan Cassady. Bestselling author. 40,000+ leaders trained.",
    chip: { before: 38, after: 71, label: "Real AI usage, scored before and after (sample data)" },
    nps: { score: 80, label: "NPS across two beta cohorts" },
    testAssessment: { heading: "Test your AI usage, free", sub: "Takes 5 to 10 minutes" },
  },

  // ============================================================
  // PROOF SECTION. Slope graph left, Bryan portrait video right.
  // Hover any line for the tooltip. All numbers are PLACEHOLDER
  // until real anonymized cohort data is dropped in.
  // ============================================================
  // Cohort figures below are from the 24-participant assessment set.
  // NOTE: distribution.bands "Below 50" (29%) and "50 to 69" (46%) came in as
  // supplied numbers and do not match the 24-row participant table, which works
  // out to 37.5% / 37.5% / 25%. The 25% and 96% figures do match. Confirm which
  // cohort the distribution percentages describe before this goes live.
  proof: {
    kicker: "Measured, not promised",
    heading: "The change, measured.",
    sub: "The same assessment is completed before and after the course. Explore the results and see how individual participants changed.",

    summary: {
      items: [
        { from: 25, to: 96, suffix: "%", label: "Participants scoring 70 or higher" },
        { from: 57, to: 81, label: "Average assessment score" },
        { from: null, to: 24, prefix: "+", suffix: " points", label: "Average improvement" },
      ] as ProofSummaryItem[],
      note: "70 represents a top 20th percentile result.",
    },

    distribution: {
      title: "Where participants moved",
      caption: "The proportion reaching top-20% performance increased from 25% to 96%.",
      beforeLabel: "Before",
      afterLabel: "After",
      bands: [
        { range: "Below 50", before: 29, after: 0 },
        { range: "50 to 69", before: 46, after: 4 },
        { range: "70+", before: 25, after: 96, highlight: true },
      ] as ProofBand[],
    },

    journeys: {
      title: "Every participant's journey",
      caption: "19 of 24 participants improved their assessment score.",
      // A move of 3 points or less either way is treated as no meaningful
      // change, which is why 3 small declines are not counted as declines.
      // This threshold is stated on the page so the count is inspectable.
      meaningfulThreshold: 3,
      thresholdNote: "Moves of 3 points or less either way are counted as no meaningful change.",
      benchmark: 70,
      benchmarkLabel: "70 = Top 20%",
      axisLabels: { before: "Before", after: "After" },
      legend: { improved: "Improved", flat: "No meaningful change", declined: "Declined" },
      participants: [
        { id: 1, before: 28, after: 71 },
        { id: 2, before: 32, after: 73 },
        { id: 3, before: 41, after: 77 },
        { id: 4, before: 53, after: 76 },
        { id: 5, before: 54, after: 71 },
        { id: 6, before: 61, after: 68 },
        { id: 7, before: 57, after: 86 },
        { id: 8, before: 76, after: 73 },
        { id: 9, before: 35, after: 74 },
        { id: 10, before: 38, after: 77 },
        { id: 11, before: 43, after: 79 },
        { id: 12, before: 46, after: 80 },
        { id: 13, before: 48, after: 82 },
        { id: 14, before: 42, after: 83 },
        { id: 15, before: 52, after: 84 },
        { id: 16, before: 55, after: 85 },
        { id: 17, before: 57, after: 86 },
        { id: 18, before: 71, after: 87 },
        { id: 19, before: 62, after: 90 },
        { id: 20, before: 82, after: 85 },
        { id: 21, before: 60, after: 90 },
        { id: 22, before: 88, after: 79 },
        { id: 23, before: 86, after: 89 },
        { id: 24, before: 91, after: 88 },
      ] as ProofParticipant[],
    },

    video: {
      title: "See it in 1 min",
      caption: "A short explanation of why the course is assessed before and after.",
      duration: "1:30",
      // Public, unsigned Mux playback ID. Empty = placeholder.
      muxPlaybackId: "5oCgHGmNEFU0257S1fSUw6mbpz02sCwGLf9UxcTkSjGUI",
      // Frame (in seconds) pulled from Mux for the custom thumbnail.
      thumbnailTime: 2,
    },

    trust: {
      heading: "Built on research. Open to inspection.",
      points: [
        "Informed by approximately 90 academic studies on effective AI training.",
        "The assessment is free to complete before purchasing anything.",
        "It measures how participants use AI, not only how capable they believe they are.",
      ],
      ctaLabel: "Run the assessment, free",
      ctaHref: "#assessment",
      ctaNote: "Takes less than five minutes.",
    },
  },

  // Brands: if src is empty or the image fails to load, a text chip
  // with the name renders instead, so the strip always scrolls.
  brands: {
    heading: "Trusted by leaders at",
    items: [
      { name: "Ripple", src: "" },
      { name: "IKEA", src: "" },
      { name: "British Airways", src: "" },
      { name: "Air France", src: "" },
      { name: "Garnier", src: "" },
      { name: "Kimberly-Clark", src: "" },
      { name: "Luminus", src: "" },
    ],
  },

  curriculum: {
    heading: "Ten days. One behavior at a time.",
    sub: "Four days of foundation, six days of the SPARKS practice. Every day ends with a real exercise on your real work.",
    days: [
      { day: 1, label: "Muse, not oracle", letter: null, stat: "$3.70 to $10.30 per $1", statLabel: "return for high performers", coreIdea: "AI only knows what you give it. Bring the problem, let AI pressure-test it, keep the decision. Define the bottleneck before you open the tool.", example: null },
      { day: 2, label: "Human element", letter: null, stat: "45%", statLabel: "performance lift for experts", coreIdea: "AI amplifies what you bring. Experts get a 45% lift, novices far less. Your domain knowledge is the multiplier, not a nice-to-have.", example: null },
      { day: 3, label: "C.A.R. framework", letter: null, stat: null, statLabel: null, coreIdea: "Context, Action, Result. The structure that moves AI output from the most average idea in your category to one only you could say.",
        example: {
          beforeTitle: "Asking",
          before: "A knife brand asked AI for marketing ideas. AI said: highlight your craftsmanship and heritage. Every knife brand says this.",
          afterTitle: "Steering",
          after: "Same brand, same AI, problem defined first and the obvious banned. AI said: \u201cYou will throw away 11 phones before this knife needs sharpening.\u201d Only that brand could say this.",
        } },
      { day: 4, label: "Think-less trap", letter: null, stat: "r = -0.68", statLabel: "AI use vs critical thinking", coreIdea: "Default AI is optimized to stop your thinking. Change your custom instructions once and every conversation after that changes.", example: null },
      { day: 5, label: "Speak it out", letter: "S", stat: "180 vs 40", statLabel: "words per minute, speech vs typing", coreIdea: "Writing filters ideas before they form. Speak for 90 seconds, unedited, then let AI find the argument already hiding in what you said.", example: null },
      { day: 6, label: "Pivot roles", letter: "P", stat: null, statLabel: null, coreIdea: "Stop instructing AI to answer. Give it permission to interrogate you first. Its questions surface constraints you did not know you had.", example: null },
      { day: 7, label: "Ask for more", letter: "A", stat: "15% better, 40% faster", statLabel: "from challenging the first answer", coreIdea: "AI's first answer is its most average answer. Everything worth using is one or two follow-ups deeper.", example: null },
      { day: 8, label: "Reframe", letter: "R", stat: "26 levels", statLabel: "of problem depth in top teams", coreIdea: "Thinking harder inside the wrong frame gets you to the wrong place faster. Find the real problem hiding behind the one you were given.", example: null },
      { day: 9, label: "Keep going", letter: "K", stat: "80%", statLabel: "of big ideas arrive on day two", coreIdea: "Great ideas come after the obvious ones. Documented iteration is a skill. Undocumented iteration is luck.", example: null },
      { day: 10, label: "Stop and think", letter: "S", stat: "40% / 52%", statLabel: "more sales / higher profits from pauses", coreIdea: "Strategic pauses produce measurable results. The capstone is a structured application of all ten days.", example: null },
    ],
    capstone: { label: "Capstone", coreIdea: "Build a custom AI tool around one real challenge from your work. Reviewed, and it earns the certificate of mastery." },
  },

  // ============================================================
  // WHAT YOU WALK AWAY WITH
  // ============================================================
  included: {
    heading: "What you walk away with",
    sub: "Not a certificate for showing up. A stack of things you keep using.",
    items: [
      { title: "10 daily lessons", desc: "Video, summary, and a real exercise. Ten minutes each." },
      { title: "Advanced track", desc: "An optional deeper lesson on every single day." },
      { title: "Capstone project", desc: "Your own AI tool, built on your real work, reviewed." },
      { title: "Two verifiable certificates", desc: "Public verification links. Not fakeable." },
      { title: "Bryan's personal guidance", desc: "Feedback and direction along the way." },
      { title: "Daily rhythm, kept for you", desc: "Lesson emails plus reminders by email and WhatsApp." },
      { title: "Resource library", desc: "NotebookLM notebooks, literature reviews, AI papers." },
      { title: "Prompts, GPTs, templates", desc: "Everything used in the exercises is yours to keep." },
      { title: "Bragging rights", desc: "A before and after score that proves the change." },
    ],
  },

  // ============================================================
  // RESOURCE EXPLORER
  // Right panel shows only the matches by default; a toggle
  // reveals the full catalogue.
  // ============================================================
  explorer: {
    heading: "Where should you start?",
    sub: "Three quick answers. We point you at the right thing.",
    highlightCount: 3,
    emptyHint: "Answer on the left and your matches appear here.",
    showAllLabel: "Browse everything",
    hideAllLabel: "Show only my matches",
    questions: [
      {
        id: "who",
        question: "How are you planning to work with us?",
        options: [
          { id: "solo", label: "Just me", boosts: { course: 3, gpts: 1, prompts: 1 } },
          { id: "team", label: "With my team", route: "team", boosts: { live: 4, keynote: 2, miro: 1 } },
        ],
      },
      {
        id: "usage",
        question: "How would you describe your AI use today?",
        options: [
          { id: "barely", label: "Barely use it", boosts: { course: 2, toolkit: 1 } },
          { id: "hitmiss", label: "Results are hit or miss", boosts: { course: 2, prompts: 2 } },
          { id: "daily", label: "Daily, want an edge", boosts: { gpts: 2, pitch: 1, prompts: 1 } },
        ],
      },
      {
        id: "goal",
        question: "What would make this worth it?",
        options: [
          { id: "ideas", label: "Better ideas", boosts: { course: 1, gpts: 2, miro: 1 } },
          { id: "decisions", label: "Better decisions", boosts: { course: 2, pitch: 2 } },
          { id: "time", label: "Less time wasted", boosts: { prompts: 2, toolkit: 2 } },
          { id: "events", label: "Inspiring my org", boosts: { keynote: 3, live: 2 } },
        ],
      },
    ] as ExplorerQuestion[],
    reasons: {
      course: "The 10-day practice is the foundation everything else builds on.",
      live: "For teams, the live cohort is the same course with your people in the room.",
      gpts: "29 ready-made GPTs for the jobs you already do.",
      prompts: "50+ smart prompts that run the method for you.",
      pitch: "Get a structured, honest review before the real audience sees it.",
      toolkit: "256 vetted AI tools, organized by what they are actually for.",
      miro: "AI-enabled Miro templates for workshops and team sessions.",
      keynote: "Bryan on stage, with a live audience assessment built in.",
      events: "Talks, workshops, and materials from past events.",
    } as Record<string, string>,
    resources: [
      { id: "course", title: "The 10-day course", desc: "Self-paced, 10 minutes a day", href: "/enroll", tag: "Course" },
      { id: "live", title: "Live cohort for teams", desc: "Facilitated, organizations only", href: "#pricing", tag: "Teams" },
      { id: "gpts", title: "29 custom GPTs", desc: "Purpose-built assistants", href: "#", tag: "Tools" },
      { id: "prompts", title: "50+ smart prompts", desc: "Auto-run, guided prompts", href: "#", tag: "Tools" },
      { id: "pitch", title: "Pitch review tool", desc: "Structured feedback on your pitch", href: "#", tag: "Tools" },
      { id: "toolkit", title: "AI Innovation Toolkit", desc: "256 AI tools, curated", href: "#", tag: "Library" },
      { id: "miro", title: "Miro templates", desc: "AI-enabled workshop boards", href: "#", tag: "Teams" },
      { id: "keynote", title: "Bryan as keynote speaker", desc: "Talks with live assessment", href: "#pricing", tag: "Teams" },
      { id: "events", title: "Past event resources", desc: "Recordings and materials", href: "#", tag: "Library" },
    ],
    teamNote: "Team answers point to the live formats. The live cohort and keynotes are for organizations only.",
  },

  testimonials: {
    heading: "From past participants",
    sub: "Two cohorts in. Sample quotes below while the cleaned testimonial set is finalized.",
items: [
      {
        type: "text",
        name: "Giovanni Alvarado",
        role: "RACSA",
        quote:
          "SPARKS completely transforms how you work with AI. It’s not just about getting answers. It’s a structured framework that amplifies your own expertise and builds a true collaborative partnership.",
      },
      {
        type: "text",
        name: "Ian Koh",
        role: "Experienced AI user",
        quote:
          "This course is excellent, even for someone who has been using AI for quite a while. I was skeptical at first, but I was blown away by what I learned. Highly recommended.",
      },
      {
        type: "text",
        name: "Adrian Phang",
        role: "Participant · Live cohort",
        quote:
          "As a novice AI user, I learned to use AI as a thinking partner. It challenged me to become clearer in my messaging, and the quality of the output improved with the clarity of my instructions.",
      },
      {
        type: "text",
        name: "Roland Geyer",
        role: "Onyx Enterprises GmbH",
        quote:
          "SPARKS does much more than introduce AI tools. It changes how you work with AI. The daily exercises apply directly to your own tasks, making the time immediately useful and helping the learning stick.",
      },
      {
        type: "text",
        name: "Ricardo Barbosa",
        role: "CENIT",
        quote:
          "The most important change was rewriting my AI instructions. It radically changed every interaction, and the outcomes became genuinely impressive.",
      },
    ],
  },

  assessment: {
    kicker: "AI collaboration assessment",
    heading: "How do you actually use AI?",
    sub: "Copy the assessment prompt into your AI tool. It is anonymous, runs in your own chat, and if your AI has memory enabled it scores how you really work, not how you think you work. Takes 5 to 10 minutes.",
    afterCopyNote: "Copied. Paste it into a new chat. Your profile will look like the sample on the right, then compare your move with the cohort lines above.",
    sample: {
      caption: "Sample output",
      score: 71,
      profile: "AI Steerer",
      pair: "Depth Seeker \u2192 Judgment Designer",
      bars: [
        { label: "Speak it out", value: 8 },
        { label: "Pivot roles", value: 5 },
        { label: "Ask for more", value: 8 },
        { label: "Reframe", value: 5 },
        { label: "Keep going", value: 8 },
        { label: "Stop and think", value: 3 },
      ],
    },
  },

  bio: {
    heading: "The person behind SPARKS",
    paragraphs: [
      "I'm Bryan Cassady. Two decades teaching innovation to leaders, 40,000 of them, across 200+ organizations in 32 countries. Author of the bestselling CYCLES and The Generative Organization.",
      "SPARKS exists because I kept watching smart people get average results from AI. The tools were never the problem. The thinking before the tool was.",
    ],
    audio: {
      enabled: false, // flip to true once Bryan's real hello audio is ready
      label: "A hello from Bryan",
      duration: "Sample audio",
      // PLACEHOLDER: royalty-free sample track (SoundHelix demo music).
      // Replace with Bryan's real recorded hello when available.
      src: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3",
    },
  },

  pricingFaq: {
    heading: "Choose how you build better AI habits.",
    sub: "A practical 10-day program that changes how you think and work with AI. Learn independently, practise live with Bryan, or bring a measured cohort program to your organization.",
  },

  // Company starting price, live cohort date, and the money-back guarantee
  // row are placeholders pending confirmation from Bryan's fact sheet.
  // Do not treat as final; confirm before this goes live to real traffic.
  pricing: {
    selfPaced: {
      kicker: "Self-paced · Video course",
      heading: "The 10-Day Course",
      basePrice: 195,
      salePrice: 147, // set to null to show basePrice plain
      currency: "€",
      priceNote: "pre-launch price",
      afterLaunchNote: "Regular price €195 after launch",
      saleNote: "This is a pre-launch enrollment. Lessons unlock on the course start date, not the day you enroll.",
      body: "Build the six SPARKS behaviors at your own pace.",
      includes: [
        "10 practical lessons",
        "Advanced track",
        "One exercise each day",
        "Every prompt, GPT, and template used in the course",
        "Capstone review and certificates",
        "Lifetime access",
      ],
      time: "10 minutes a day",
      cta: "Reserve your spot",
    },
    liveCohort: {
      badge: "Best results",
      kicker: "Live cohort",
      heading: "The Live Cohort",
      price: 1095,
      currency: "€",
      priceUnit: "per person",
      body: "Everything in the self-paced course, plus live practice, feedback, and accountability with Bryan.",
      includes: [
        "Live sessions with Bryan",
        "Real-time application and group discussion",
        "Feedback on exercises and capstone",
        "All course materials, prompts, GPTs, and templates",
        "Certificates and lifetime access",
      ],
      time: "30 minutes a day for 10 days",
      cohortDate: "Next cohort date to be announced",
      cta: "Notify me",
      enrollmentOpen: false,
    },
    company: {
      kicker: "Company program",
      tagline: "Disciplined AI for teams",
      heading: "Company Cohort",
      priceFrom: 12500, // placeholder, confirm starting price before launch
      currency: "€",
      priceNote: "Programs from",
      body: "A measured program built around your team's real work.",
      includes: [
        "Baseline AI-usage assessment",
        "Live or self-paced cohort delivery",
        "Exercises grounded in current company work",
        "Content shaped around priority use cases and risks",
        "Follow-up assessment",
        "Cohort-level findings",
        "Leadership debrief and next-step recommendations",
        "Direct program planning with Bryan's team",
      ],
      time: "Live delivery is 30 minutes a day for 10 days",
      cta: "Design your company cohort",
    },
    previewCta: "Free course preview",
    comparison: {
      columns: ["Self-paced", "Live", "Company"],
      // Money-back guarantee row is a placeholder pending confirmation of real terms.
      rows: [
        { label: "Daily time", values: ["10 min", "30 min", "30 min live"] },
        { label: "Live guidance", values: ["No", "Yes", "Optional"] },
        { label: "Individual feedback", values: ["Capstone", "Live + capstone", "Program-dependent"] },
        { label: "Assessment", values: ["Individual", "Individual", "Baseline + follow-up"] },
        { label: "Money-back guarantee", values: ["Yes", "Yes", "Yes"] },
        { label: "Uses real company work", values: ["Participant choice", "Participant choice", "Yes"] },
        { label: "Leadership report", values: ["No", "No", "Yes"] },
      ],
    },
  },

  enterprise: {
    heading: "Running this with a team?",
    body: "The live version of SPARKS runs as facilitated cohorts: same ten days, delivered live with group exercises, discussion, and direct access to Bryan. Available to teams and organizations only.",
    note: "Individual? The self-paced course above is built for you.",
    cta: "Talk to us",
  },

  contact: {
    heading: "Get in touch",
    sub: "Questions before enrolling, team inquiries, or anything else.",
    namePlaceholder: "Your name",
    emailPlaceholder: "Your email",
    messagePlaceholder: "What can we help with?",
    submitLabel: "Send message",
    successHeading: "Message sent",
    successBody: "We read everything. You will hear back within two working days.",
    errorFallback: "Something went wrong. Try again, or email us directly.",
  },

  faq: {
    items: [
      { q: "How is the course delivered?", a: "Self-paced, in your browser. One lesson a day for ten days, each built around a short video, a summary, and an exercise you run on your own work. About ten minutes a day." },
      { q: "Do I need a technical background?", a: "No. You need a free account on any major AI tool. The methods are about thinking, not engineering." },
      { q: "Which AI tools does it work with?", a: "ChatGPT, Claude, and Gemini all work. The methods are tool-agnostic, and every exercise includes one-click links for each." },
      { q: "Can I see the course before buying?", a: "Yes. Day 1 is fully open in the course preview, video, exercise, and prompt included. No signup needed." },
      { q: "What is the SPARKS framework?", a: "SPARKS is a six-behavior method for working with AI, created by Bryan Cassady: Speak it out, Pivot roles, Ask for more, Reframe, Keep going, and Stop and think. Days 1 to 4 build the foundation, days 5 to 10 practice one behavior each." },
      { q: "What is the capstone?", a: "A custom AI tool you build around one real challenge from your own work, using everything from the ten days. Submitting it earns the certificate of mastery." },
      { q: "What if I miss a day?", a: "Catch up anytime. You have lifetime access, and the course keeps your place." },
      { q: "Is there a version for teams?", a: "Yes. Individuals can join a live cohort with Bryan, and companies can run SPARKS as a facilitated program built around their team's real work." },
      { q: "What is the refund policy?", a: "All three tiers include a money-back guarantee. Exact terms and window are being finalized. If this affects your decision to enroll, contact us first and we will confirm the current policy before you pay." },
    ],
  },

  finalCta: {
    heading: "Ten minutes a day. Ten days.",
    sub: "The tool doesn't change. You do.",
    ps: "Still deciding? Day 1 is fully open. Watch it, run the exercise, then come back.",
  },

  footer: {
    line: "A 10-day course by Bryan Cassady",
    links: [
      { label: "Preview the course", href: "/audit" },
      { label: "Enroll", href: "/enroll" },
      { label: "Contact", href: "#contact" },
    ],
  },
};

// ============================================================
// ASSESSMENT PROMPTS
// One base prompt. The Claude variant splices in the calibration
// note (it exists to align Claude scoring with ChatGPT scoring).
// Edit BASE_PROMPT freely; the splice marker is the STEP 4 line.
// ============================================================

const CALIBRATION_NOTE = `CALIBRATION NOTE: When scoring, if evidence places a score between two values, always round up to the higher value. This applies to both the 0 to 5 diversity scores and the 0 to 10 SPARKS scores. This adjustment aligns Claude scores with ChatGPT scores. Testing showed an average gap of approximately 8% between the two models.

`;

const BASE_PROMPT = `You are an AI Collaboration Assessor built on the SPARKS framework by Bryan Cassady.

Bryan Cassady helps leaders move from AI hype to impact.
Website: www.bryancassady.com
SPARKS course: www.bryancassady.com/sparks/
Run your own assessment: www.bryancassady.com/aiinsights/

Your job is to analyze how I currently work with AI, give me an honest scored profile, and show me exactly how to work better with AI.

This is a one-time snapshot of how I work with AI today.

When you are done, you will deliver three things in this exact order:
1. A written AI Collaboration Profile
2. A copyable Report Card I can save and compare later
3. A shareable image card I can post on LinkedIn

Do not start the image until the written profile and report card are fully complete.
Do not invent patterns you cannot see.
Do not inflate scores.
Do not shame low scores.
Do not include private, sensitive, or identifying details in any public-facing visual.
Do not use pre-course, post-course, baseline, follow-up, delta, or pre/post language.

On the first run, complete Step 1 only. Do not execute later steps until the user has either answered the frequency question or completed the guided self-assessment questions.

STEP 1. CHECK AVAILABLE CONTEXT AND ASK ONE QUESTION

First, check whether you can see enough recent AI usage evidence.

You may use:
- Conversation history visible in this chat
- Relevant project context or conversation context if the environment clearly provides it
- Any examples the user has already provided in this chat

Do not claim access to full account-level chat history unless the interface clearly provides it.

PATH A. If you can see enough recent AI usage evidence:

Say: "I can see enough recent AI interaction evidence to create a grounded assessment."

Then ask only this:
"Roughly how many times per week do you use AI across all tools?
A. Less than 3 times a week
B. 3 to 10 times a week
C. 10 to 30 times a week
D. More than 30 times a week"

STOP HERE. Wait for the user to reply with A, B, C, or D. Only continue after you have received their answer.

PATH B. If you cannot see enough recent AI usage evidence:

Say: "I cannot see enough recent AI interaction evidence to score your behavior directly. I can still create a useful profile from a quick guided self-assessment. I will ask one question at a time."

Then ask Question 1 only and wait for the answer before asking the next question.

GUIDED SELF-ASSESSMENT QUESTIONS - Ask one at a time, wait for each answer.

Q1: Roughly how many times per week do you use AI? A/B/C/D (Less than 3 / 3-10 / 10-30 / More than 30)
Q2: What do you use AI for most often? Choose up to three: A. Drafting/rewriting B. Researching C. Clarifying thinking D. Challenging assumptions E. Strategy/planning F. Building tools/workflows G. Creative reframes H. Learning/skill-building
Q3: How often do you explain context before asking for output? A. Almost never B. Sometimes C. Often D. Almost always
Q4: How often do you ask AI to take a specific role (critic, coach, strategist)? A/B/C/D
Q5: How often do you push past the first answer? A/B/C/D
Q6: How often do you reframe the task? A/B/C/D
Q7: How often do you keep iterating until work genuinely improves? A/B/C/D
Q8: How often do you ask AI to check quality before you accept it? A/B/C/D
Q9: What is one recent AI task where the result was useful but not as good as it could have been?

After Q9, offer: "If you want a more accurate score, paste 3 real examples. Otherwise I will continue with a self-reported profile."

STEP 2. ASSESS EVIDENCE QUALITY
Label as: Solid (2+ weeks visible history or 3+ real examples) / Self-reported (guided answers only) / Provisional (limited but specific evidence).
If Self-reported, say once: "This profile is based on your self-assessment answers, so it is useful but less precise than a profile based on visible AI interaction history."

STEP 3. USAGE INTENSITY
Low (less than 3x/week) / Moderate (3-10x) / High (10-30x) / Power User (30+x).
High frequency does not mean high collaboration quality. Name the gap if intensity is high and score is low.

STEP 4. SCORE ACROSS TWO DIMENSIONS

{{CALIBRATION}}A. AI USE DIVERSITY: 40 points (8 modes x 0-5 each)
Scale: 0=no evidence, 1=weak/one-off, 2=occasional, 3=some across sessions, 4=good repeated, 5=strong consistent
Modes: Output / Research / Coach / Critic / Strategy / Builder / Muse / Learning

B. SPARKS TECHNIQUE SCORE: 60 points (6 behaviors x 0/3/5/8/10 only)
Scale: 0=no evidence, 3=occasional, 5=decent but inconsistent, 8=strong and repeated, 10=excellent and systematic
Behaviors: Speak With AI / Pivot Roles / Ask for More / Reframe / Keep Going / Stop and Think

SCORING CALCULATION:
Step 1: Sum 8 diversity scores = __ / 40
Step 2: Sum 6 SPARKS scores = __ / 60
Step 3: Total = __ / 100
Show subtotals in profile and report card. Do not proceed if subtotals do not add up correctly.

STEP 5. HEADLINE NUMBERS
Current Collaboration Score: __ / 100
Near-Term Potential: __ / 100 (realistic gain in 10-14 days from one behavior change)
Breakthrough Gap: __ points

STEP 6. PROFILE LABEL
0-24: Fast Starter | 25-44: Fast Producer | 45-64: Practical Operator | 65-79: AI Steerer | 80-89: AI Co-Builder | 90-100: AI Muse

STEP 7. SPARKS PROFILE PAIR
Identify strongest behavior and most important growth edge.
Labels: Thought Speaker / Role Shifter / Depth Seeker / Reframer / Iterative Builder / Judgment Designer
Format: [Strength] -> [Growth edge]

STEP 8. WRITE THE FULL AI COLLABORATION PROFILE
Sections required:
- Score, Profile, SPARKS Pair, Usage Intensity, Evidence Confidence, subtotals, Near-Term Potential, Breakthrough Gap
- In plain English (3 sentences: current use / what they do well / what would most improve results)
- What you already do well (2 evidence-based bright spots with label + one sentence each)
- Your main growth edge (2 paragraphs: current pattern / why improving it matters)
- AI Use Diversity scores with one evidence sentence per mode
- SPARKS Technique scores with one evidence sentence and one improve sentence per behavior
- One shift to try this week with 7-day experiment (one action, repeatable daily, max 3 sentences)
- Stop Asking / Start Steering (paraphrase weaker pattern / stronger steering prompt with context + quality definition + reasoning before output)
- Mirror line (accurate, slightly uncomfortable, not cruel, not generic)
- Then: "This is the gap that SPARKS training is designed to close."
- Your next move (exact text below):

"Your score shows where you are. The SPARKS course shows you how to close the gap.
It is a 10-day hands-on program built around the six behaviors in this assessment.
Every session is practical. Every session produces something you can use the same day.
If this result felt accurate, the next step is here: www.bryancassady.com/sparks/"

STEP 9. COPYABLE REPORT CARD
Include: date, overall score, profile, intensity, confidence, subtotals, SPARKS pair, strongest behavior, growth edge, one shift (max 20 words), all 14 individual scores, Stop Asking / Start Steering, mirror line.
End with: Assessed using the SPARKS framework by Bryan Cassady. www.bryancassady.com

STEP 10. SHAREABLE IMAGE CARD
1080x1080px. White background. Black typography. Red accent #E63329.
Profile label = largest text. Include: score, profile, AI Use Diversity subtotal, SPARKS subtotal, SPARKS pair, strongest behavior, growth edge, www.bryancassady.com/aiinsights/

TONE: Direct. Specific. Useful. Evidence-based. No hype. No shame. No inflated scores. No pre/post language.`;

export const ASSESSMENT_PROMPTS = {
  claude: {
    label: "Claude",
    openUrl: "https://claude.ai/new",
    openLabel: "Open Claude \u2197",
    text: BASE_PROMPT.replace("{{CALIBRATION}}", CALIBRATION_NOTE),
  },
  chatgpt: {
    label: "ChatGPT",
    openUrl: "https://chatgpt.com/",
    openLabel: "Open ChatGPT \u2197",
    text: BASE_PROMPT.replace("{{CALIBRATION}}", ""),
  },
} as const;

export type AssessmentModel = keyof typeof ASSESSMENT_PROMPTS;
