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
        coreIdea: "C.A.R. removes the floor — it stops you getting terrible outputs. Friction removes the ceiling. To reach ideas that genuinely could not have existed any other way, you need constraint, not freedom. The wall is not the obstacle; the wall is the brief.",
        science: "Even with perfect C.A.R., AI remains a pattern recognition engine reaching for the most statistically probable answer. Probable does not equal original. Constraint forces the brain — and the model — out of familiar territory. Without a wall to push against, both drift back to the average. The mechanism: Constraint → Synthesis → Innovation.",
        numbers: "In a controlled study, a group given creative restrictions — limited tools, banned directions, forced boundaries — produced solutions rated 30% more novel by independent judges than a group given unlimited resources. Not slightly better. Thirty percent.",
        framework: "Three steps. The Wall: identify the three most obvious directions AI will take and ban all three explicitly. The Bridge: pick one completely unrelated domain — a sport, a natural phenomenon, a historical period — and inject its logic into the brief. The Result: AI is forced to combine two things that should not go together. That uncomfortable synthesis is where the original idea lives.",
        example: "Dr. Seuss was bet he could not write a children's book using only 50 distinct words. He wrote Green Eggs and Ham. The constraint did not shrink the idea — it produced it. The Guardian reaching Gen Z: ban news, journalism, reporting, truth, credibility. Inject the logic of a 100-year-old tree. AI returned: 'Every ring is a year it did not lie to you. 100 rings. Still standing.' No journalism words. The most honest thing The Guardian has ever said.",
        keyTakeaway: "C.A.R. and Friction are sequential, not competing. C.A.R. for consistency, every day. Friction when outputs feel almost right but not quite — that almost is the signal to build the wall. The discomfort you feel writing a Friction prompt is not a sign you are doing it wrong. It is the point.",
      },
      exercise: {
        objective: "Apply the Friction method to an economy class travel campaign",
        doneWhen: "Find the single line in the output that could only exist because of the constraint — the one you could not have written without the friction.",
        timeMinutes: 5,
        steps: [
          {
            task: "01",
            title: "Identify the obvious",
            items: [
              "Write down the 3 most predictable directions this campaign could go.",
              "Think legroom, food, service, value — the generic answers.",
              "These are what you will ban.",
            ],
          },
          {
            task: "02",
            title: "Pick your domain",
            items: [
              "Choose one from this list — first instinct, do not overthink it:",
              "Marathon running · Deep sea biology · Chess · Japanese tea ceremony · Cave painting",
              "This becomes the logic you inject into the brief.",
            ],
          },
          {
            task: "03",
            title: "Run it through AI — then audit",
            items: [
              "Use the prompt below — fill in your chosen domain before running it.",
              "Read the output. Find the single line that could only exist because of the constraint.",
              "That is the one that matters.",
            ],
          },
        ],
        prompt: "I am writing a campaign for economy class travel. I cannot mention comfort, legroom, food, service or value. I must use the logic and language of [your chosen domain] to reframe what economy class actually is. Write 3 campaign concepts. Push until the idea could not exist without the domain.",
      },
    },
    learnMore: [
      {
        title: "Notebook LM",
        url: "http://tiny.cc/notebookLM_day3",
        type: "tool",
      },
      {
        title: "The science behind structured prompting",
        url: "http://tiny.cc/article_day3",
        type: "article",
      },
      {
        title: "NotebookLM podcast — C.A.R. in depth",
        url: "http://tiny.cc/CAR_day3",
        type: "video",
      },
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