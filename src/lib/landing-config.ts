// ============================================================
// LANDING PAGE CONTENT CONFIG
// Everything editable lives here. Components read from this file
// and never hardcode copy, questions, answers, or testimonials.
// No em dashes anywhere, per site rule.
// ============================================================

export const LANDING = {
  enrollHref: "/enroll",
  auditHref: "/audit",
  contactMailto: "mailto:bryan.h@bryancassady.com?subject=SPARKS%20for%20teams",

  header: {
    brand: "Make AI Your Muse",
    nav: [
      { label: "How it works", href: "#shift" },
      { label: "Curriculum", href: "#curriculum" },
      { label: "Pricing", href: "#pricing" },
      { label: "For teams", href: "#teams" },
      { label: "Contact", href: "#contact" },
    ],
  },

  hero: {
    eyebrow: "A 10-day course. 10 minutes a day.",
    // The word wrapped in *asterisks* gets the red underline treatment.
    headline: "Sharper thinking. Better outputs. Decisions you'd *defend*.",
    sub: "Most people use AI like a search engine and get average answers back. SPARKS is a daily practice that changes how you work with AI, built from the methods used inside 200+ organizations.",
    trust: "By Bryan Cassady. Bestselling author. 40,000+ leaders trained.",
  },

  stats: [
    { value: 10.3, prefix: "$", decimals: 1, label: "returned per $1 spent on AI by high performers. Everyone else: no measurable impact.", sub: "range $3.70 to $10.30" },
    { value: 45, suffix: "%", decimals: 0, label: "performance lift AI gives technical experts. The gap comes from thinking, not tools.", sub: "vs 20% for general staff" },
    { value: 87, suffix: "%", decimals: 0, label: "better decisions when diverse perspectives are used. One prompt can build the panel.", sub: "covered on Day 7" },
  ],

  // Placeholder brand names. Replace with real logo <img> paths later.
  brands: ["Ripple", "IKEA", "British Airways", "Brand four", "Brand five", "Brand six", "Brand seven", "Brand eight"],

  shift: {
    heading: "The tool was never the problem.",
    before: {
      tab: "Asking AI",
      lines: [
        "A knife brand asked AI for marketing ideas.",
        "AI said: highlight your craftsmanship and heritage.",
        "Every knife brand says this.",
      ],
    },
    after: {
      tab: "Steering AI",
      lines: [
        "Same brand. Same AI. Problem defined first, the obvious banned, one constraint added.",
        "AI said: \u201cYou will throw away 11 phones before this knife needs sharpening.\u201d",
        "Only that brand could say this.",
      ],
    },
    prose: "Used as an oracle, AI makes you think less. Research puts the correlation between unstructured AI use and declining critical thinking at r = -0.68. Used as a muse, it makes you think better. SPARKS is the muse method: six behaviors, ten minutes a day.",
  },

  curriculum: {
    heading: "Ten days. One behavior at a time.",
    sub: "Four days of foundation, six days of the SPARKS practice. Every day ends with a real exercise on your real work.",
    days: [
      { day: 1, label: "Muse, not oracle", letter: null, coreIdea: "AI only knows what you give it. Bring the problem, let AI pressure-test it, keep the decision. Define the bottleneck before you open the tool." },
      { day: 2, label: "Human element", letter: null, coreIdea: "AI amplifies what you bring. Experts get a 45% lift, novices far less. Your domain knowledge is the multiplier, not a nice-to-have." },
      { day: 3, label: "C.A.R. framework", letter: null, coreIdea: "Context, Action, Result. The structure that moves AI output from the most average idea in your category to one only you could say." },
      { day: 4, label: "Think-less trap", letter: null, coreIdea: "Default AI is optimized to stop your thinking. Change your custom instructions once and every conversation after that changes." },
      { day: 5, label: "Speak it out", letter: "S", coreIdea: "Writing filters ideas before they form. Speak for 90 seconds, unedited, then let AI find the argument already hiding in what you said." },
      { day: 6, label: "Pivot roles", letter: "P", coreIdea: "Stop instructing AI to answer. Give it permission to interrogate you first. The answer to its question contains constraints you did not know you had." },
      { day: 7, label: "Ask for more", letter: "A", coreIdea: "AI's first answer is its most average answer. Everything worth using is one or two follow-ups deeper." },
      { day: 8, label: "Reframe", letter: "R", coreIdea: "Thinking harder inside the wrong frame gets you to the wrong place faster. Find the real problem hiding behind the one you were given." },
      { day: 9, label: "Keep going", letter: "K", coreIdea: "Great ideas come after the obvious ones. Documented iteration is a skill. Undocumented iteration is luck." },
      { day: 10, label: "Stop and think", letter: "S", coreIdea: "Strategic pauses produce measurable results: 40% more sales, 52% higher profits. The capstone is a structured application of all ten days." },
    ],
    capstone: { label: "Capstone", coreIdea: "Build a custom AI tool around one real challenge from your work. Reviewed, and it earns the certificate of mastery." },
  },

  // ============================================================
  // IS THIS FOR ME. Fully config-driven.
  // Q1 routes: any option with route "team" short-circuits to teamResult.
  // Otherwise remaining questions show, and the result is picked from
  // individualResults by the id of the LAST question's chosen option,
  // with copy that can reference earlier answers.
  // Add or edit questions and results freely; components adapt.
  // ============================================================
  fit: {
    heading: "Is this for you?",
    sub: "A few taps. Honest answer, no email needed.",
    questions: [
      {
        id: "who",
        question: "How are you planning to take this?",
        options: [
          { id: "solo", label: "Just me" },
          { id: "team", label: "With my team", route: "team" },
        ],
      },
      {
        id: "usage",
        question: "How would you describe your AI use today?",
        options: [
          { id: "barely", label: "Barely use it" },
          { id: "hitmiss", label: "Results are hit or miss" },
          { id: "daily", label: "Daily, want an edge" },
        ],
      },
      {
        id: "goal",
        question: "What would make this worth it?",
        options: [
          { id: "ideas", label: "Better ideas" },
          { id: "decisions", label: "Better decisions" },
          { id: "time", label: "Less time wasted" },
          { id: "relevance", label: "Staying relevant" },
        ],
      },
    ],
    // Keyed by the chosen option id of the "goal" question.
    individualResults: {
      ideas: {
        verdict: "Yes, with one caveat",
        headline: "Average ideas are a structure problem, and structure is teachable.",
        body: "High performers return $3.70 to $10.30 per $1 spent on AI. The difference is never the tool. If better ideas are the goal, three days do most of that work:",
        dayCards: [
          { day: 3, text: "C.A.R.: from generic output to ideas only you could say." },
          { day: 7, text: "Push past the first answer, where the average lives." },
          { day: 8, text: "Reframe the question that limits every answer." },
        ],
        caveat: "The caveat: this only works if you do the ten minutes. It is a practice, not a reference library.",
      },
      decisions: {
        verdict: "Yes, with one caveat",
        headline: "Hit or miss is not a you problem. It is a sequencing problem.",
        body: "The gap between people who get value from AI and people who don't comes down to whether the problem was defined before the tool was opened. For decisions specifically:",
        dayCards: [
          { day: 1, text: "Define the bottleneck before you open the tool." },
          { day: 8, text: "Find the real problem hiding behind the one you were given." },
          { day: 10, text: "Stop and think. Verify before you commit." },
        ],
        caveat: "The caveat: this only works if you do the ten minutes. It is a practice, not a reference library.",
      },
      time: {
        verdict: "Yes, with one caveat",
        headline: "You are not slow. Your iteration loop is undocumented.",
        body: "Pushing past AI's first answer produces 15% better output in 40% less time. The habit takes days, not months, to build:",
        dayCards: [
          { day: 4, text: "Fix your default instructions once, benefit every day." },
          { day: 7, text: "Better follow-ups beat better prompts." },
          { day: 9, text: "A change log so you never start from zero again." },
        ],
        caveat: "The caveat: this only works if you do the ten minutes. It is a practice, not a reference library.",
      },
      relevance: {
        verdict: "Yes, with one caveat",
        headline: "Your expertise is not obsolete. It is the multiplier.",
        body: "When AI writes and you just read, you forget 83% of it. The people staying relevant are not the fastest prompters, they are the deepest thinkers:",
        dayCards: [
          { day: 2, text: "Why your knowledge is worth more with AI, not less." },
          { day: 6, text: "Capture what you know before it walks out the door." },
          { day: 9, text: "Track your own progress and keep compounding." },
        ],
        caveat: "The caveat: this only works if you do the ten minutes. It is a practice, not a reference library.",
      },
    },
    teamResult: {
      verdict: "Then you want the live version",
      headline: "Same ten days, run as a facilitated cohort with your team in the room.",
      body: "The exercises work better with colleagues, because you are all bringing real problems from the same organization. Delivered live by Bryan, with group work, discussion, and direct access throughout. Available to teams and organizations only, not to individuals.",
      facts: [
        { label: "Format", value: "Live cohort, Zoom" },
        { label: "Led by", value: "Bryan, in person" },
        { label: "Delivered inside", value: "200+ organizations" },
      ],
      bailout: "Taking it on your own instead? The self-paced course starts whenever you do.",
    },
  },

  // ============================================================
  // TESTIMONIALS. Dummy entries; replace with real cleaned ones.
  // type: "text" renders a quote card. type: "video" renders a
  // portrait card with a play affordance; set videoUrl when ready.
  // ============================================================
  testimonials: {
    heading: "From past participants",
    sub: "Two cohorts in. Here is what they said.",
    items: [
      { type: "text", name: "Frederic M.", role: "Participant, live cohort", quote: "Placeholder quote. Replace with the cleaned testimonial text from the first cohort wave." },
      { type: "video", name: "Participant name", role: "Video testimonial", videoUrl: "", quote: "Short pull-quote overlay for the video card." },
      { type: "text", name: "Jay N.", role: "Participant, live cohort", quote: "Placeholder quote. Replace with the cleaned testimonial text from the first cohort wave." },
      { type: "video", name: "Participant name", role: "Video testimonial", videoUrl: "", quote: "Short pull-quote overlay for the video card." },
      { type: "text", name: "Hannah B.", role: "Participant, video cohort", quote: "Placeholder quote. Replace with the cleaned testimonial text from the second cohort wave." },
    ],
  },

  assessment: {
    kicker: "AI collaboration assessment",
    heading: "How do you actually use AI?",
    sub: "Copy the assessment prompt into your AI tool. It is anonymous, runs in your own chat, and if your AI has memory enabled it scores how you really work, not how you think you work. Takes 5 to 10 minutes.",
    afterCopyHeading: "While it runs: see how past participants moved",
    afterCopyBody: "The same assessment, taken before and after the course. Replace these with real anonymized results.",
    examples: [
      { label: "Participant A", before: 38, beforeLabel: "Fast Producer", after: 71, afterLabel: "AI Steerer" },
      { label: "Participant B", before: 52, beforeLabel: "Practical Operator", after: 83, afterLabel: "AI Co-Builder" },
      { label: "Participant C", before: 24, beforeLabel: "Fast Starter", after: 61, afterLabel: "Practical Operator" },
    ],
  },

  bio: {
    heading: "The person behind SPARKS",
    // First-person scaffold. Bryan rewrites in his own voice.
    paragraphs: [
      "I'm Bryan Cassady. I've spent the last two decades teaching innovation to leaders, 40,000 of them so far, across 200+ organizations in 32 countries. I wrote the bestselling books CYCLES and The Generative Organization.",
      "SPARKS exists because I kept watching smart people get average results from AI. The tools were never the problem. The thinking before the tool was. This course is ten days of fixing exactly that.",
    ],
  },

  pricing: {
    heading: "The 10-day course",
    basePrice: 195,
    salePrice: 147, // set to null to show basePrice plain
    currency: "$",
    priceNote: "Launch pricing",
    includes: [
      "10 daily lessons, video plus summary plus exercise, 10 minutes each",
      "Advanced track on every day for going deeper",
      "The prompts, templates, and GPTs used in every exercise",
      "Capstone: build your own AI tool, reviewed",
      "Certificates of completion and mastery, publicly verifiable",
      "Lifetime access",
    ],
  },

  enterprise: {
    heading: "Running this with a team?",
    body: "The live version of SPARKS runs as facilitated cohorts: same ten days, delivered live with group exercises, discussion, and direct access to Bryan. Available to teams and organizations only.",
    note: "Individual? The self-paced course above is built for you.",
    cta: "Talk to us",
  },

  contact: {
    heading: "Get in touch",
    sub: "Questions about the course, enrollment, or anything else. Send a message and Bryan's team will reply directly to your email.",
    namePlaceholder: "Your name",
    emailPlaceholder: "you@company.com",
    messagePlaceholder: "What's on your mind?",
    submitLabel: "Send message",
    successHeading: "Message sent",
    successBody: "Thanks for reaching out. You will hear back at the email you provided.",
    errorFallback: "Something went wrong. Try again.",
  },

  faq: {
    heading: "Questions",
    items: [
      { q: "How is the course delivered?", a: "Self-paced, in your browser. One lesson a day for ten days, each built around a short video, a summary, and an exercise you run on your own work. About ten minutes a day." },
      { q: "Do I need a technical background?", a: "No. You need a free account on any major AI tool. The methods are about thinking, not engineering." },
      { q: "Which AI tools does it work with?", a: "ChatGPT, Claude, and Gemini all work. The methods are tool-agnostic, and every exercise includes one-click links for each." },
      { q: "Can I see the course before buying?", a: "Yes. Day 1 is fully open in the course preview, video, exercise, and prompt included. No signup needed." },
      { q: "What is the SPARKS framework?", a: "SPARKS is a six-behavior method for working with AI, created by Bryan Cassady: Speak it out, Pivot roles, Ask for more, Reframe, Keep going, and Stop and think. Days 1 to 4 of the course build the foundation, days 5 to 10 practice one behavior each." },
      { q: "What is the capstone?", a: "A custom AI tool you build around one real challenge from your own work, using everything from the ten days. Submitting it earns the certificate of mastery." },
      { q: "Are the certificates verifiable?", a: "Yes. Both certificates carry a public verification link that anyone can check." },
      { q: "What if I miss a day?", a: "Catch up anytime. You have lifetime access, and the course keeps your place." },
      { q: "Is there a version for teams?", a: "Yes. The live version runs as facilitated cohorts for teams and organizations. It is not available to individuals." },
      { q: "What is the refund policy?", a: "Placeholder. Write the real policy before launch." },
    ],
  },

  finalCta: {
    heading: "Ten minutes a day. Ten days.",
    sub: "The tool doesn't change. You do.",
  },

  footer: {
    line: "A 10-day course by Bryan Cassady",
    links: [
      { label: "Preview the course", href: "/audit" },
      { label: "Enroll", href: "/enroll" },
      { label: "Contact", href: "mailto:bryan.h@bryancassady.com" },
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
