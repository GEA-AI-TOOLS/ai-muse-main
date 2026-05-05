import type { Lesson } from "@/lib/types";

export const COURSE_CONTENT: Record<number, Lesson> = {
  1: {
    day: 1,
    title: "What is AI",
    phase: "foundation",
    essential: {
      videoUrl: "https://player.vimeo.com/video/76979871",
      durationSeconds: 600,
      exercise: {
        steps: [
          { text: "Open your AI tool of choice — ChatGPT, Claude, or Gemini." },
          { text: "Ask it to explain what it actually is, in plain language." },
          { text: "Push back on one thing it says. Ask it to go deeper on that point." },
        ],
        prompt: "Explain what you are to someone who has never used AI before. Be honest about what you can and cannot do.",
      },
    },
    advanced: {
      videoUrl: "https://player.vimeo.com/video/76979871",
      durationSeconds: 840,
      exercise: {
        steps: [
          { text: "Ask your AI tool to describe its own limitations in detail." },
          { text: "Pick one limitation and explore what that means for how you use it." },
          { text: "Write one sentence summarising what AI is — in your own words, not its." },
        ],
        prompt: "What are your most important limitations? Don't hedge — be specific about what you genuinely cannot do well.",
      },
    },
    learnMore: [
      {
        title: "What is AI — a plain English explainer",
        url: "https://www.example.com",
        type: "article",
      },
      {
        title: "SPARKS practice partner GPT",
        url: "https://www.example.com",
        type: "tool",
      },
    ],
  },

  2: {
    day: 2,
    title: "The Human Element",
    phase: "foundation",
    essential: {
      videoUrl: "https://player.vimeo.com/video/76979871",
      durationSeconds: 600,
      exercise: {
        steps: [
          { text: "Think of a decision you made last week that required judgment." },
          { text: "Describe that decision to your AI tool. Ask what it would have recommended." },
          { text: "Note where its answer differs from what you actually did, and why." },
        ],
        prompt: "I made a decision recently: [describe it]. What would you have recommended, and what would you have missed without knowing me?",
      },
    },
    advanced: {
      videoUrl: "https://player.vimeo.com/video/76979871",
      durationSeconds: 840,
      exercise: {
        steps: [
          { text: "Identify a recurring decision in your work that you make on instinct." },
          { text: "Try to articulate the reasoning behind that instinct to your AI tool." },
          { text: "Ask it to challenge your reasoning. Accept one challenge as valid." },
        ],
        prompt: "Here is a judgment call I make regularly: [describe it]. Challenge my reasoning. Find the weakest assumption I am making.",
      },
    },
    learnMore: [
      {
        title: "The human side of AI adoption",
        url: "https://www.example.com",
        type: "article",
      },
    ],
  },

  3: {
    day: 3,
    title: "Unlocking Innovation",
    phase: "foundation",
    essential: {
      videoUrl: "https://player.vimeo.com/video/76979871",
      durationSeconds: 600,
      exercise: {
        steps: [
          { text: "Pick a problem you have been stuck on — work, creative, or personal." },
          { text: "Ask AI to generate 10 possible approaches, including ones that feel wrong." },
          { text: "Identify one approach you would never have considered yourself." },
        ],
        prompt: "Here is a problem I am stuck on: [describe it]. Give me 10 approaches including unconventional ones you think I would reject.",
      },
    },
    advanced: {
      videoUrl: "https://player.vimeo.com/video/76979871",
      durationSeconds: 840,
      exercise: {
        steps: [
          { text: "Take the unconventional approach from the Essential exercise." },
          { text: "Ask AI to help you pressure-test it — what would need to be true for it to work?" },
          { text: "Identify one thing you could actually test or try in the next 48 hours." },
        ],
        prompt: "The unconventional idea is: [describe it]. What would need to be true for this to work? Help me find the smallest possible test.",
      },
    },
    learnMore: [
      {
        title: "How AI unlocks creative problem solving",
        url: "https://www.example.com",
        type: "article",
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
      exercise: {
        steps: [
          { text: "Find a prompt you used recently that gave a mediocre result." },
          { text: "Rewrite it using what you learned today — give it context, a role, and a constraint." },
          { text: "Compare the two outputs side by side." },
        ],
        prompt: null,
      },
    },
    advanced: {
      videoUrl: "https://player.vimeo.com/video/76979871",
      durationSeconds: 840,
      exercise: {
        steps: [
          { text: "Think about the last three times AI gave you a useless answer." },
          { text: "Identify the pattern — what did each bad prompt have in common?" },
          { text: "Write your own rule for what makes a good prompt, in one sentence." },
        ],
        prompt: "Here are three prompts that gave me bad results: [list them]. What pattern do you see? What rule should I follow?",
      },
    },
    learnMore: [
      {
        title: "Common AI mistakes and how to avoid them",
        url: "https://www.example.com",
        type: "article",
      },
    ],
  },

  5: {
    day: 5,
    title: "Speak It Out",
    phase: "sparks",
    essential: {
      videoUrl: "https://player.vimeo.com/video/76979871",
      durationSeconds: 600,
      exercise: {
        steps: [
          { text: "Pick a task you would normally just think through in your head." },
          { text: "Instead, speak it out to AI — describe what you're trying to do, why it matters, and what's blocking you." },
          { text: "Let AI reflect it back. Notice what it catches that you glossed over." },
        ],
        prompt: "I am trying to [goal]. The reason it matters is [why]. What is blocking me is [blocker]. What am I missing?",
      },
    },
    advanced: {
      videoUrl: "https://player.vimeo.com/video/76979871",
      durationSeconds: 840,
      exercise: {
        steps: [
          { text: "Take something you are about to present or share with others." },
          { text: "Speak it out to AI before you share it — your intent, your concern, your audience." },
          { text: "Ask it: what is the gap between what I think I am saying and what my audience will hear?" },
        ],
        prompt: "I am about to share [describe it] with [describe audience]. My intent is [intent]. What is the gap between what I think I am saying and what they will hear?",
      },
    },
    learnMore: [
      {
        title: "Why thinking out loud works",
        url: "https://www.example.com",
        type: "article",
      },
      {
        title: "SPARKS practice partner GPT",
        url: "https://www.example.com",
        type: "tool",
      },
    ],
  },

  6: {
    day: 6,
    title: "Pivot Roles",
    phase: "sparks",
    essential: {
      videoUrl: "https://player.vimeo.com/video/76979871",
      durationSeconds: 600,
      exercise: {
        steps: [
          { text: "Take a piece of work you are currently doing — a document, plan, or idea." },
          { text: "Ask AI to review it from three roles: a skeptic, a customer, and a domain expert." },
          { text: "Use one perspective to make a real change to the work." },
        ],
        prompt: "Review what I share from three roles: (1) a skeptic looking for flaws, (2) a customer who has to use this, (3) a domain expert. Here is the work: [paste it]",
      },
    },
    advanced: {
      videoUrl: "https://player.vimeo.com/video/76979871",
      durationSeconds: 840,
      exercise: {
        steps: [
          { text: "Assign AI a role that feels uncomfortable — a critic, a competitor, a regulator." },
          { text: "Ask it to evaluate your work from that role without softening." },
          { text: "Sit with the hardest thing it says. Write down whether it is right." },
        ],
        prompt: "You are a [uncomfortable role]. Review my work with no softening. Tell me the hardest truth about it. Here is the work: [paste it]",
      },
    },
    learnMore: [
      {
        title: "Role prompting and why it works",
        url: "https://www.example.com",
        type: "article",
      },
    ],
  },

  7: {
    day: 7,
    title: "Ask for More",
    phase: "sparks",
    essential: {
      videoUrl: "https://player.vimeo.com/video/76979871",
      durationSeconds: 600,
      exercise: {
        steps: [
          { text: "Start a conversation with AI about any topic you are working on." },
          { text: "After its first response, do not accept it. Ask it to go deeper on the most interesting point." },
          { text: "Do this three times in a row. See how far the thinking goes." },
        ],
        prompt: "You just gave me a surface-level answer. Pick the most interesting idea in what you said and go three levels deeper.",
      },
    },
    advanced: {
      videoUrl: "https://player.vimeo.com/video/76979871",
      durationSeconds: 840,
      exercise: {
        steps: [
          { text: "Find a topic where you think you already know a lot." },
          { text: "Ask AI to tell you something about it that would genuinely surprise you." },
          { text: "Chase the most surprising thing it says until you understand it fully." },
        ],
        prompt: "I think I know a lot about [topic]. Tell me something about it that would genuinely surprise someone with my level of knowledge.",
      },
    },
    learnMore: [
      {
        title: "Getting more out of every AI conversation",
        url: "https://www.example.com",
        type: "article",
      },
    ],
  },

  8: {
    day: 8,
    title: "Reframe",
    phase: "sparks",
    essential: {
      videoUrl: "https://player.vimeo.com/video/76979871",
      durationSeconds: 600,
      exercise: {
        steps: [
          { text: "Think of a situation where you feel stuck or frustrated." },
          { text: "Describe it to AI. Ask it to reframe in three ways — each changing what the real problem is." },
          { text: "Pick the reframe that feels most uncomfortable. That is usually the useful one." },
        ],
        prompt: "Here is my situation: [describe it]. Reframe this three ways. Each should change what I think the actual problem is. Make at least one uncomfortable.",
      },
    },
    advanced: {
      videoUrl: "https://player.vimeo.com/video/76979871",
      durationSeconds: 840,
      exercise: {
        steps: [
          { text: "Take the most uncomfortable reframe from the Essential exercise." },
          { text: "Ask AI: if this reframe is correct, what would I need to do differently?" },
          { text: "Write down one concrete action that follows from accepting it." },
        ],
        prompt: "If the reframe is [describe it], what would I need to do differently? Be specific and practical, not abstract.",
      },
    },
    learnMore: [
      {
        title: "Reframing as a thinking tool",
        url: "https://www.example.com",
        type: "article",
      },
    ],
  },

  9: {
    day: 9,
    title: "Keep Going",
    phase: "sparks",
    essential: {
      videoUrl: "https://player.vimeo.com/video/76979871",
      durationSeconds: 600,
      exercise: {
        steps: [
          { text: "Find a conversation with AI that stalled or gave diminishing returns." },
          { text: "Pick up from where it went flat. Tell AI what was missing and ask it to try again." },
          { text: "Practice the recovery: 'That wasn't right because X. Try again with that in mind.'" },
        ],
        prompt: "Our conversation stalled because [reason]. Try again. Focus on [what was missing] and do not repeat [what did not work].",
      },
    },
    advanced: {
      videoUrl: "https://player.vimeo.com/video/76979871",
      durationSeconds: 840,
      exercise: {
        steps: [
          { text: "Start a conversation with a hard, open-ended question." },
          { text: "Every time AI gives a good answer, ask: and what else?" },
          { text: "Keep going until it runs dry. Count how many rounds it takes." },
        ],
        prompt: "I am going to keep asking 'and what else?' after every answer. Start with [topic]. Do not repeat yourself. Go until you genuinely have nothing left.",
      },
    },
    learnMore: [
      {
        title: "Building momentum with AI",
        url: "https://www.example.com",
        type: "article",
      },
    ],
  },

  10: {
    day: 10,
    title: "Stop and Think",
    phase: "sparks",
    essential: {
      videoUrl: "https://player.vimeo.com/video/76979871",
      durationSeconds: 600,
      exercise: {
        steps: [
          { text: "Before you use AI today, write down in one sentence what you want to think through." },
          { text: "After the conversation, write down what actually changed in your thinking." },
          { text: "Compare the two. The gap between them is the skill." },
        ],
        prompt: null,
      },
    },
    advanced: {
      videoUrl: "https://player.vimeo.com/video/76979871",
      durationSeconds: 840,
      exercise: {
        steps: [
          { text: "Review all 10 days. Which SPARKS letter had the biggest impact on how you work?" },
          { text: "Ask AI to help you design a 5-minute daily practice around that letter." },
          { text: "Write it down. Commit to it for the next two weeks." },
        ],
        prompt: "The SPARKS letter that changed how I work most is [letter] because [reason]. Help me design a 5-minute daily practice around it that I will actually stick to.",
      },
    },
    learnMore: [
      {
        title: "Reflection as a practice",
        url: "https://www.example.com",
        type: "article",
      },
    ],
  },
};

export function getLesson(day: number): Lesson | null {
  return COURSE_CONTENT[day] ?? null;
}