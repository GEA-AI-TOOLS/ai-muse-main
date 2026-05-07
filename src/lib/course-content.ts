import type { Lesson } from "@/lib/types";

const PLACEHOLDER_SUMMARY = {
  coreIdea: "Core idea placeholder — replace with real content.",
  science: "Science placeholder — replace with real content.",
  numbers: "Numbers placeholder — replace with real content.",
  framework: "Framework placeholder — replace with real content.",
  example: "Example placeholder — replace with real content.",
  keyTakeaway: "Key takeaway placeholder — replace with real content.",
};

const PLACEHOLDER_EXERCISE = {
  objective: "Placeholder objective",
  doneWhen: "Placeholder completion criteria",
  timeMinutes: 10,
  steps: [
    { task: "01", title: "Step one", items: ["Do this first thing"] },
    { task: "02", title: "Step two", items: ["Do this second thing"] },
    { task: "03", title: "Step three", items: ["Do this third thing"] },
  ],
  prompt: null as null,
};

export const COURSE_CONTENT: Record<number, Lesson> = {
  1: {
    day: 1,
    title: "What is AI",
    phase: "foundation",
    essential: {
      videoUrl: "https://player.vimeo.com/video/76979871",
      durationSeconds: 600,
      summary: { ...PLACEHOLDER_SUMMARY },
      exercise: { ...PLACEHOLDER_EXERCISE },
    },
    advanced: {
      videoUrl: "https://player.vimeo.com/video/76979871",
      durationSeconds: 840,
      summary: { ...PLACEHOLDER_SUMMARY },
      exercise: { ...PLACEHOLDER_EXERCISE },
    },
    learnMore: [
      { title: "What is AI — a plain English explainer", url: "https://www.example.com", type: "article" },
    ],
  },

  2: {
    day: 2,
    title: "The Human Element",
    phase: "foundation",
    essential: {
      videoUrl: "https://player.vimeo.com/video/76979871",
      durationSeconds: 600,
      summary: { ...PLACEHOLDER_SUMMARY },
      exercise: { ...PLACEHOLDER_EXERCISE },
    },
    advanced: {
      videoUrl: "https://player.vimeo.com/video/76979871",
      durationSeconds: 840,
      summary: { ...PLACEHOLDER_SUMMARY },
      exercise: { ...PLACEHOLDER_EXERCISE },
    },
    learnMore: [
      { title: "The human side of AI adoption", url: "https://www.example.com", type: "article" },
    ],
  },

  3: {
    day: 3,
    title: "Unlocking Innovation with AI",
    phase: "foundation",
    essential: {
      videoUrl: "https://player.vimeo.com/video/76979871",
      durationSeconds: 600,
      summary: {
        coreIdea: "Structure changes everything. The AI does not get smarter — you do. The variable was never the technology. It was always the structure you brought to it.",
        science: "Brain scans show that unstructured prompting exhausts your brain and produces thin output. Structured prompting activates your frontal lobe differently — less effort, better ideas.",
        numbers: "Humans alone: 1.4 good ideas per 100. AI with no structure: 1.7. AI with context: 2.0. AI with structured techniques: 5.8. AI with a review step: 14.0.",
        framework: "C.A.R. — Context, Action, Review. C: Who is the buyer, what tension do they carry, what do they resist. A: A specific task, a creative technique, and a constraint that forces originality. R: Rank the output, kill the weak ones, push for the line that lands.",
        example: "Bohler Knives typed 'give me marketing ideas' and received generic advice any brand could use. With C.A.R.: 'You will throw away 11 phones before this knife needs sharpening.' Sales increased drastically. Same AI. Different structure. Completely different result.",
        keyTakeaway: "Creativity with AI is not about more ideas faster. It is about better ideas more consistently. The output always tells you everything about the prompt that made it.",
      },
      exercise: {
        objective: "Apply the C.A.R. framework to a real problem",
        doneWhen: "See how the output changed before C.A.R. and after C.A.R.",
        timeMinutes: 8,
        steps: [
          {
            task: "01",
            title: "Frame your real problem",
            items: [
              "Pick a problem from your day-to-day work",
              "Frame it in your own words — one sentence",
            ],
          },
          {
            task: "02",
            title: "Reframe it using C.A.R.",
            items: [
              "Identify the best context: who is involved, what is the tension",
              "Define the action: a specific technique and a constraint",
              "Plan the review: how will you rank and replace weak output",
            ],
          },
          {
            task: "03",
            title: "Run it through AI — then audit",
            items: [
              "Paste your C.A.R. prompt into Claude or ChatGPT",
              "Write what changed versus what you produced without structure",
            ],
          },
        ],
        prompt: "I am working on [describe your problem]. The people involved are [who they are and what they care about]. The tension is [what is actually difficult about this]. Write [number] approaches using [technique — reframing / contrast / provocation]. Never use [what to ban — generic advice / obvious solutions]. Rank the results by [what matters — originality / impact / clarity]. Replace the bottom [number]. Give me the one that makes [describe the person] feel [what emotion or reaction].",
      },
    },
    advanced: {
      videoUrl: "https://player.vimeo.com/video/76979871",
      durationSeconds: 840,
      summary: {
        coreIdea: "The Spotify brief is C.A.R. in live action. Spotify knows every mood, every playlist, every 3am session — but subscribers keep downgrading anyway. The gap is not data. It is structure.",
        science: "Most brands prompt AI with what they sell. The brands that win prompt AI with what their buyer carries emotionally. The brief you write determines the idea you get.",
        numbers: "Spotify has 600 million users. 239 million pay for Premium. The rest churn and return. The difference between a subscriber and a free user is not price awareness — it is emotional justification.",
        framework: "Three prompts in sequence in the same chat. Step 1 builds context — who the subscriber really is and what Spotify knows that nobody else does. Step 2 defines action — the technique, the format, the ban. Step 3 refines — rank, replace, and push to the specific emotional line.",
        example: "A team running the full C.A.R. sequence on the Spotify brief went from 'highlight your personalisation' to 'We know you cried to this song at 2am. We never told anyone.' The data was always there. The structure surfaced it.",
        keyTakeaway: "You are not prompting AI. You are directing it. The brief is the strategy. The prompt is the execution. Run the full sequence and you will see exactly where your thinking was shallow.",
      },
      exercise: {
        objective: "Build a full C.A.R. prompt sequence for Spotify Premium",
        doneWhen: "Did Step 1 change the quality of what AI gave you? Did Step 3 actually improve it, or just shuffle it?",
        timeMinutes: 5,
        steps: [
          {
            task: "01",
            title: "Context — who is the subscriber really",
            items: [
              "You are writing for Spotify Premium. The subscriber is [describe — age, life stage, music habits].",
              "The real reason they keep leaving is [emotional truth — not the practical reason].",
              "What Spotify knows about them that nobody else does is [the intimate data].",
              "Copy the completed prompt into your AI tool.",
            ],
          },
          {
            task: "02",
            title: "Action — technique, format, constraint",
            items: [
              "Add this in the same chat: Write [number] campaign concepts using [technique — emotional memory / provocation / contrast storytelling].",
              "Never mention [what to ban — price, features, competitors].",
              "The format should be [one line / a paragraph / a headline].",
            ],
          },
          {
            task: "03",
            title: "Refine — rank, replace, push",
            items: [
              "Add this final prompt: Rank these by [emotional impact / originality / memorability].",
              "Replace the bottom [number].",
              "Give me the one that makes a [describe the person] feel [what emotion].",
            ],
          },
        ],
        prompt: "You are writing for Spotify Premium. The subscriber is [describe — age, life stage, music habits]. The real reason they keep leaving is [emotional truth — not the practical reason]. What Spotify knows about them that nobody else does is [the intimate data]. Write [number] campaign concepts using [technique — emotional memory / provocation / contrast storytelling]. Never mention [what to ban — price, features, competitors]. The format should be [one line / a paragraph / a headline]. Rank these by [emotional impact / originality / memorability]. Replace the bottom [number]. Give me the one that makes a [describe person] feel [emotion].",
      },
    },
    learnMore: [
      { title: "The science behind structured prompting", url: "https://www.example.com", type: "article" },
      { title: "C.A.R. framework — full reference", url: "https://www.example.com", type: "tool" },
      { title: "Bohler Knives case study", url: "https://www.example.com", type: "article" },
    ],
  },

  4: {
    day: 4,
    title: "How We Use AI Wrong",
    phase: "foundation",
    essential: {
      videoUrl: "https://player.vimeo.com/video/76979871",
      durationSeconds: 600,
      summary: { ...PLACEHOLDER_SUMMARY },
      exercise: { ...PLACEHOLDER_EXERCISE },
    },
    advanced: {
      videoUrl: "https://player.vimeo.com/video/76979871",
      durationSeconds: 840,
      summary: { ...PLACEHOLDER_SUMMARY },
      exercise: { ...PLACEHOLDER_EXERCISE },
    },
    learnMore: [
      { title: "Common AI mistakes and how to avoid them", url: "https://www.example.com", type: "article" },
    ],
  },

  5: {
    day: 5,
    title: "Speak It Out",
    phase: "sparks",
    essential: {
      videoUrl: "https://player.vimeo.com/video/76979871",
      durationSeconds: 600,
      summary: { ...PLACEHOLDER_SUMMARY },
      exercise: { ...PLACEHOLDER_EXERCISE },
    },
    advanced: {
      videoUrl: "https://player.vimeo.com/video/76979871",
      durationSeconds: 840,
      summary: { ...PLACEHOLDER_SUMMARY },
      exercise: { ...PLACEHOLDER_EXERCISE },
    },
    learnMore: [
      { title: "Why thinking out loud works", url: "https://www.example.com", type: "article" },
    ],
  },

  6: {
    day: 6,
    title: "Pivot Roles",
    phase: "sparks",
    essential: {
      videoUrl: "https://player.vimeo.com/video/76979871",
      durationSeconds: 600,
      summary: { ...PLACEHOLDER_SUMMARY },
      exercise: { ...PLACEHOLDER_EXERCISE },
    },
    advanced: {
      videoUrl: "https://player.vimeo.com/video/76979871",
      durationSeconds: 840,
      summary: { ...PLACEHOLDER_SUMMARY },
      exercise: { ...PLACEHOLDER_EXERCISE },
    },
    learnMore: [
      { title: "Role prompting and why it works", url: "https://www.example.com", type: "article" },
    ],
  },

  7: {
    day: 7,
    title: "Ask for More",
    phase: "sparks",
    essential: {
      videoUrl: "https://player.vimeo.com/video/76979871",
      durationSeconds: 600,
      summary: { ...PLACEHOLDER_SUMMARY },
      exercise: { ...PLACEHOLDER_EXERCISE },
    },
    advanced: {
      videoUrl: "https://player.vimeo.com/video/76979871",
      durationSeconds: 840,
      summary: { ...PLACEHOLDER_SUMMARY },
      exercise: { ...PLACEHOLDER_EXERCISE },
    },
    learnMore: [
      { title: "Getting more out of every AI conversation", url: "https://www.example.com", type: "article" },
    ],
  },

  8: {
    day: 8,
    title: "Reframe",
    phase: "sparks",
    essential: {
      videoUrl: "https://player.vimeo.com/video/76979871",
      durationSeconds: 600,
      summary: { ...PLACEHOLDER_SUMMARY },
      exercise: { ...PLACEHOLDER_EXERCISE },
    },
    advanced: {
      videoUrl: "https://player.vimeo.com/video/76979871",
      durationSeconds: 840,
      summary: { ...PLACEHOLDER_SUMMARY },
      exercise: { ...PLACEHOLDER_EXERCISE },
    },
    learnMore: [
      { title: "Reframing as a thinking tool", url: "https://www.example.com", type: "article" },
    ],
  },

  9: {
    day: 9,
    title: "Keep Going",
    phase: "sparks",
    essential: {
      videoUrl: "https://player.vimeo.com/video/76979871",
      durationSeconds: 600,
      summary: { ...PLACEHOLDER_SUMMARY },
      exercise: { ...PLACEHOLDER_EXERCISE },
    },
    advanced: {
      videoUrl: "https://player.vimeo.com/video/76979871",
      durationSeconds: 840,
      summary: { ...PLACEHOLDER_SUMMARY },
      exercise: { ...PLACEHOLDER_EXERCISE },
    },
    learnMore: [
      { title: "Building momentum with AI", url: "https://www.example.com", type: "article" },
    ],
  },

  10: {
    day: 10,
    title: "Stop and Think",
    phase: "sparks",
    essential: {
      videoUrl: "https://player.vimeo.com/video/76979871",
      durationSeconds: 600,
      summary: { ...PLACEHOLDER_SUMMARY },
      exercise: { ...PLACEHOLDER_EXERCISE },
    },
    advanced: {
      videoUrl: "https://player.vimeo.com/video/76979871",
      durationSeconds: 840,
      summary: { ...PLACEHOLDER_SUMMARY },
      exercise: { ...PLACEHOLDER_EXERCISE },
    },
    learnMore: [
      { title: "Reflection as a practice", url: "https://www.example.com", type: "article" },
    ],
  },
};

export function getLesson(day: number): Lesson | null {
  return COURSE_CONTENT[day] ?? null;
}