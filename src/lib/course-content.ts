import type { Lesson } from "@/lib/types";

const PLACEHOLDER_SUMMARY = {
  coreIdea: "Core idea placeholder — replace with real content.",
  science: "Science placeholder — replace with real content.",
  fact: "data placeholder — replace with real content.",
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

// test commit comment

export const COURSE_CONTENT: Record<number, Lesson> = {
  1: {
    day: 1,
    title: "AI is a Muse, Not an Oracle",
    phase: "foundation",

    sectionTitles: {
      essential: "AI is a Muse",
      advanced: "The AI Divide",
    },

    essential: {
      videoUrl: "https://www.youtube.com/embed/SW7-qabC61o?si=vD2Eu7gdJ9IQYZ4V",
      durationSeconds: 600,
      summary: [
        {
          heading: "Core Idea",
          body: "AI is not an oracle. It does not know what your organization needs, what your priorities are, or what success looks like for you. It only knows what you give it. The moment you ask AI what to do before defining what you need, you hand over the steering wheel. The right model: you bring the problem, AI pressure-tests it, you make the decision. AI as muse, not authority.",
        },
        {
          heading: "The Data",
          body: "High performers return $3.70 to $10.30 per $1 spent on AI. Everyone else sees zero measurable EBIT impact. Same tools. Completely different results. The gap is not about which platform they use or how advanced their prompts are. It comes down to one thing: whether the problem was clearly defined before the tool was opened.",
        },
        {
          heading: "How AI Actually Works",
          body: "AI is a system trained on human-generated data. It finds patterns in that data and predicts the most useful response to whatever input you give it. The less context you provide, the more it defaults to the most obvious, generic patterns. It has no awareness of your situation, your constraints, or your goals. It fills the gap with plausible-sounding answers. That is not intelligence. That is pattern completion.",
        },
        {
          heading: "The Oracle Trap",
          body: "Most people open AI and ask what to do. AI answers confidently. They follow. The output lands somewhere, just not where they needed to go. This is the Oracle Trap: deferring to AI before defining the problem. The fix is a sequencing shift. Define the bottleneck first. Not the symptom, the root cause. One clear sentence. Then bring AI in to work on that specific thing. Same tool. Completely different output.",
        },
        {
          heading: "Key Takeaway",
          body: "Most AI failures are not tool failures. They are sequencing failures. The people getting real ROI from AI are not using better prompts. They are asking better questions before they open the tool. Problem definition is the skill. AI is just what comes after.",
        },
      ],
      exercise: {
        objective: "Use AI as a muse to remove a bottleneck",
        doneWhen: "You have run the prompt, identified the real bottleneck, and have at least one high-leverage action you will test this week.",
        timeMinutes: 8,
        steps: [
          {
            task: "01",
            title: "Describe the context",
            items: [
              "Describe your initiative or decision in one sentence",
              "Be specific enough that a stranger would understand it",
            ],
          },
          {
            task: "02",
            title: "Define the bottleneck",
            items: [
              "Write one sentence: what is the single thing stopping this from moving forward?",
              "Ask yourself: is this the cause or the symptom? Keep digging until you hit the cause.",
            ],
          },
          {
            task: "03",
            title: "Review the output",
            items: [
              "Read the suggestions. Do they address the root cause or drift toward symptoms?",
              "Keep only the actions that target the bottleneck you defined",
            ],
          },
        ],
        prompt: "I am working on [describe your initiative or decision].\n\nThe bottleneck is: [one sentence. Not the symptom. The root cause.]\n\nGiven only this bottleneck, what are the highest-leverage actions I can take.\n\nDo not suggest tools or platforms. Do not solve the symptom. Stay focused on the bottleneck I defined.\n\n-----------\n\nIf any bracket above is not filled in, do not proceed. Ask me one question at a time to help me fill it in. Start with the initiative. Then the bottleneck. Do not move to the next question until I have answered the current one. When I answer, reflect back what I said and ask if it captures the real bottleneck or just the symptom. Make this a thinking exercise, not a form to complete.",
        demo: {
          videoUrl: "https://www.youtube.com/embed/avH9md3C-5c?si=0_l2rxyTe4Z3ujT4",
          title: "Day 1 : Essential Demo",
        },
      },
    },

    advanced: {
      videoUrl: "https://www.youtube.com/embed/wbw2UkaMUBU?si=CupkPVs5k-Y8yYYN",
      durationSeconds: 840,
      summary: [
        {
          heading: "Core Idea",
          body: "80% of AI investment produces nothing. Organizations run pilots, see promising demos, then hit friction around ownership, data, and risk. The pilot gets parked. A new one starts. The cycle repeats. The 20% who get real value do one thing differently: they connect AI to a clearly defined problem with a clear objective and a systems view of how change actually happens.",
        },
        {
          heading: "The Data",
          body: "AI value breaks down like this: 10% comes from algorithms, 20% from data infrastructure, and 70% from people, process, and culture. Most organizations invert this. They spend 70% on technology and hope value emerges from the other 30%. It does not. The bottleneck is almost never the tool.",
        },
        {
          heading: "How Systems Actually Fail",
          body: "Russell Ackoff put it plainly: the more efficiently you solve the wrong problem, the worse it gets. Most AI failures are not execution failures. They are objective failures. The team was moving fast in the wrong direction. One pause, one question, one clear objective changes the output entirely. 94% of errors live in the system, not in the individual doing the work.",
        },
        {
          heading: "Pilot Purgatory",
          body: "The pattern is predictable. Launch a proof of concept. Prove AI works in a narrow setting. Hit friction around data access, ownership, or risk. Park it. Start a new pilot. Each cycle builds AI skepticism and sunk cost without producing anything in production. The exit from this loop is not a better pilot. It is a clearer problem definition tied to a real business objective before the pilot starts.",
        },
        {
          heading: "Key Takeaway",
          body: "The AI divide is not a technology gap. It is a thinking gap. The organizations winning with AI are not using more advanced tools. They are defining better objectives before they touch the tool. Identify the obvious solution everyone is pushing for. Then stop. Ask what the real objective is. The non-obvious solution almost always lives there.",
        },
      ],
      exercise: {
        objective: "Apply the non-obvious process to a real challenge you are facing",
        doneWhen: "You have one non-obvious idea to work with",
        timeMinutes: 10,
        steps: [
          {
            task: "01",
            title: "Write the situation and the obvious solution",
            items: [
              "Describe what is going wrong in one to three sentences",
              "Write the obvious solution everyone is already pushing for",
            ],
          },
          {
            task: "02",
            title: "Define a new, one sentence objective",
            items: [
              "Write the precise outcome you need. Not the symptom. Not the direction.",
              "Push back on yourself: does it sound like a direction or a real outcome?",
            ],
          },
          {
            task: "03",
            title: "Evaluate the solutions against your objective",
            items: [
              "Review solutions: Focus on one you have not thought of yet",
              "Evaluate each against your objective only.",
            ],
          },
        ],
        prompt: "I have a problem I need to solve at work.\n\nThe situation is: [describe what is going wrong. One to three sentences.]\n\nThe obvious solution everyone is pushing for is: [what is the default fix people are jumping to.]\n\nBefore I go there, help me do this properly.\n\nStep one. Ask me one question to help me write the real objective in one sentence. Not the symptom. Not the direction. The precise outcome I need.\n\nStep two. Once I have the objective, give me three solutions. One slow. One fast. One I have not thought of.\n\nStep three. Evaluate all three against my objective. Not against cost. Not against effort. Against the objective only. Recommend the one that fits best.\n\n------------\n\nIf any bracket is empty, ask me one question at a time before proceeding. Start with the situation. Then the obvious solution. Do not move to step two until my objective is written in one clear sentence. Push back if it sounds like a direction rather than a precise outcome.",
        demo: {
          videoUrl: "https://www.youtube.com/embed/vs1BedZV-6s?si=aqbqsFL1ulVRsrUJ",
          title: "Day 1 : Advanced Demo",
        },
      },
    },

    learnMore: [
      { title: "Read more on problem definition Chapters 11 in CYCLES and 10 in the Generative Organization", url: "https://www.books.genorg.ai", type: "article" },
      { title: "Draft Video - What is the one thing to teach if you teach 1 thing Ted X Salford- Bryan Cassady", url: "https://youtu.be/aFnS3SVXFpY", type: "video" },
      { title: "Notebook LM: Using Al - Objectives or Tools first", url: "https://notebooklm.google.com/notebook/9479de63-ed47-4bd9-8269-685fb6580d5a?authuser=2", type: "tool" },
      //{ title: "Bonus: My collection for HR managers ... Literature reviews: Effective usage of Al, and Training methods", url: "https://shares.showellapp.com/3KY2GPTzxunwQdJ740hBysNn", type: "other" },
    ],
  },

  2: {
    day: 2,
    title: "The Human Element",
    phase: "foundation",

    sectionTitles: {
      essential: "The Human Element: Your Expertise is Irreplaceable",
      advanced: "How to become an expert in anything fast with AI​",
    },

    essential: {
      videoUrl: "https://www.youtube.com/embed/VcX4OK66TXI?si=-E277i8yKoBnTZse",
      durationSeconds: 600,
      summary: [
        {
          heading: "Core Idea",
          body: "AI does not equalize capability. It amplifies what you already bring. A novice and an expert using the same tool, the same prompt, and the same model produce dramatically different outputs. The gap is not in the prompting. It is in the thinking behind the prompt. Your domain knowledge is not a nice-to-have. It is the multiplier.",
        },
        {
          heading: "The Data",
          body: "AI gives technical experts a 45% performance lift, middle managers 35%, and general staff 20%. Same tools. Widening gap. Research also shows that when you write something yourself, recall is around 80%. When AI writes it and you just read it, you forget 83% of it. Offloading your thinking to AI does not just produce weaker output. It erodes your ability to think at all.",
        },
        {
          heading: "Three Things Going Wrong",
          body: "First: productive failure gets skipped. Research by Manu Kapur at ETH Zurich over 20 years shows that wrestling with wrong attempts before getting help produces 30 to 40% better understanding. Second: premature agreement kicks in. A well-phrased, confident AI response feels like clarity. You stop thinking. Confirmation bias takes over. Third: use it or lose it. When you stop asking hard questions yourself, you gradually lose the ability to ask them.",
        },
        {
          heading: "The Amplifier Model",
          body: "AI is a cognitive amplifier. Amplifiers magnify what you bring in. Bring brilliance, get insight. Bring vague thinking, get noise that sounds credible. The future is not prompt engineering. It is context engineering: giving AI your real thinking, your genuine uncertainties, and your domain knowledge so it can respond to what you actually know and what you actually need.",
        },
        {
          heading: "Key Takeaway",
          body: "The people getting the most from AI are not the fastest prompt writers. They are the deepest thinkers. They bring their current thinking first, then use AI to fill specific gaps. Brain first. Bot second. Your knowledge does not become obsolete when AI arrives. It becomes more valuable.",
        },
      ],
      exercise: {
        objective: "See how expertise changes the output",
        doneWhen: "You have run the prompt and can answer: does this help more than a generic prompt?",
        timeMinutes: 8,
        steps: [
          {
            task: "01",
            title: "Define Task + Add reference files",
            items: [
              "Describe your task or challenge in one sentence",
              "Attach any relevant files or context you have",
              "More context means better results",
            ],
          },
          {
            task: "02",
            title: "Define your current thinking and uncertainties (gaps)",
            items: [
              "Write your own take in three to five sentences. What you know. What you have seen. What your instinct says.",
              "Write what you are uncertain about - the gaps. What you don't know. What would take you long to verify.",
            ],
          },
          {
            task: "03",
            title: "Run Prompt. Evaluate the results.",
            items: [
              "Run the prompt with all fields filled in",
              "Check: does the response address your gaps or just restate what you already know?",
            ],
          },
        ],
        prompt: "I am working on: [ describe your task or challenge in one sentence + attach relevant files. ]\n\nMy current thinking is: [ paste your own take. Three to five sentences. What you know. What you have seen. What your instinct says. ]\n\nI am uncertain about: [ specific gaps. What you don't know. What would take you long to verify. ]\n\nRespond only to my gaps. Use my thinking as context. Do not rewrite what I already know. Do not give generic advice. Make your response specific to what I told you.\n\n---------\n\nIf any bracket is not filled, do not proceed. Ask me one question at a time. Start with the task. Then my thinking. Then my gaps. Do not move to the next question until I have answered. If my answers sound vague or generic, push back and ask me to be more specific.",
        demo: {
          videoUrl: "https://www.youtube.com/embed/8bOKvuWzF-0?si=n02m_DRRMoIssGbE",
          title: "Day 2 : Essential Demo",
        },
      },
    },

    advanced: {
      videoUrl: "https://www.youtube.com/embed/sfRvb9zDXhA?si=vZxbmlUCXGAfNIpf",
      durationSeconds: 840,
      summary: [
        {
          heading: "Core Idea",
          body: "AI can accelerate expertise building if you know how to use it as a research partner, not a search engine. The key is to start with a hypothesis or a research question, not a generic topic. A well-formed research question tells AI what to look for, what to exclude, and what level of evidence to prioritize.",
        },
        {
          heading: "The Method",
          body: "There are two ways in. Search for tensions: find where experts disagree and what is still unsettled in a field. Or write a research question: start with an objective or a hypothesis, then use AI to build a structured literature review around it. Both approaches force you to think before you search, which changes the quality of what comes back.",
        },
        {
          heading: "The 4-Step Process",
          body: "Step one: define your research question. Narrow, testable, answerable. Step two: run deep research with more than one AI model. Step three: review the results as a human. Judge what comes back. Flag contradictions. Note what you did not know. Step four: create a context file. Save the key findings so future AI sessions start from your extended knowledge, not from zero.",
        },
        {
          heading: "Three Research Modes",
          body: "Choose the mode that fits the task. Broad scan: understand the landscape of a new topic quickly. Deep dive: follow a specific question into the evidence. Synthesis: combine outputs from multiple sources into one coherent picture. Each mode calls for a different approach to how you frame your question and which tools you use.",
        },
        {
          heading: "Key Takeaway",
          body: "AI cannot build expertise for you. But it can compress the time it takes to build it yourself. The constraint is always the quality of the question you start with. A sharp research question turns AI into a research collaborator. A vague one gives you a confident-sounding summary of the obvious.",
        },
      ],
      exercise: {
        objective: "Apply the full 4-step method to a real challenge from your work. Artifact: Your Deep Research File.",
        doneWhen: "You have extended your expertise in one area important to you.",
        timeMinutes: 10,
        steps: [
          {
            task: "01",
            title: "Define your research question",
            items: [
              "Write what you believe is true in your field right now — one sentence.",
              "Use the GPT or prompt guide to sharpen it into a deep search question: <a href=\"https://docs.google.com/document/d/1H2_z3V-RHlJWtPFVqhfOriV4tlj9KTzxfrdKvlPeBXs/edit?tab=t.mq13ety9iq09\" target=\"_blank\" rel=\"noreferrer\" style=\"color:#E24B4A;\">https://docs.google.com/document/d/1H2_z3V-RHlJWtPFVqhfOriV4tlj9KTzxfrdKvlPeBXs/edit?tab=t.mq13ety9iq09</a>",
              "Or use the Literature Review GPT directly: <a href=\"https://chatgpt.com/g/g-6a1c4b5bbf748191a5b0fbbfb0d62501-literature-review\" target=\"_blank\" rel=\"noreferrer\" style=\"color:#E24B4A;\">https://chatgpt.com/g/g-6a1c4b5bbf748191a5b0fbbfb0d62501-literature-review</a>",
            ],
          },
          {
            task: "02",
            title: "Run deep research with AI",
            items: [
              "Use more than one model.",
              "Come back in a few minutes for the results.",
            ],
          },
          {
            task: "03",
            title: "Review the results as a human",
            items: [
              "Judge what comes back. If using NotebookLM, make a video, podcast, or infographic.",
              "Note new hypotheses and what you did not know.",
            ],
          },
          {
            task: "04",
            title: "Create a context file",
            items: [
              "Save key data into a resource file or new project — ChatGPT, Gemini, or NotebookLM.",
            ],
          },
        ],
        prompt: null,
        demo: {
          videoUrl: "https://www.youtube.com/embed/-N3GmOyzXYc?si=bdY0KmwDhraTh15E",
          title: "Day 2 : Advanced Demo",
        },
      },
    },

    learnMore: [
      { title: "When help comes too early. TEDx Rabat April 26- Bryan Cassady", url: "http://tiny.cc/Help-Early-slides", type: "other" },
      { title: "Al as Equalizer or Amplifier? Task Complexity as the Moderating Factor for Human Expertise in Hybrid Intelligence Systems", url: "http://tiny.cc/day2_article", type: "article" },
      // { title: "The importance of expertise in the age of Al", url: "http://tiny.cc/notebookLM2", type: "tool" },
      // { title: "Systems-Level Expertise: An Al-Augmented Framework for Accelerated Domain Mastery\" (A notebook LM research report)", url: "https://1drv.ms/b/c/c37128d8066b9290/IQDp-I8HJyDsT5cP_1fHFVa6ASchCUEK4ZvtAjzjGZv1Ptl?e=hN2BYz", type: "article" },
      { title: "Notebook Guide: 7 Steps to Master Research Projects Fast", url: "https://www.wisdomquant.com/notebooklm-guide-research-projects/", type: "article" },
      { title: "Building Expertise Fast with Al", url: "https://notebooklm.google.com/notebook/e02b1788-1e33-49c2-9385-ee7b7958cfb4?authuser=2", type: "tool" },
    ],
  },

  3: {
    day: 3,
    title: "The C.A.R. Framework",
    phase: "foundation",

    sectionTitles: {
      essential: "Unlocking Innovation with AI (Generic to Creative)",
      advanced: "Constrained Creativity: The Friction Framework",
    },

    essential: {
      videoUrl: "https://www.youtube.com/embed/x5f1e1_9xI4?si=NP5Nv6DhXefRUXwW",
      durationSeconds: 600,
      summary: [
        {
          heading: "Core Idea",
          body: "AI can generate more ideas than any human team. That is not the problem. The problem is that without structure, it generates the most average ideas, the ones that every other brand in your category is already doing. The C.A.R. framework (Context, Action, Result) is how you move from generic to genuinely creative output.",
        },
        {
          heading: "The Science",
          body: "Scientists scanned brains during AI brainstorming sessions and found that unstructured AI use produces high mental effort with low creative output. Structured AI does the opposite: it reduces strain and increases creative synthesis. The formula for human idea generation is Stimulus x Diversity squared x Clarity. AI adds Clarity squared and removes Fear. Structure is the mechanism that unlocks this.",
        },
        {
          heading: "The C.A.R. Framework",
          body: "Context means setting the scene completely: who, what, why, and what is at stake. Action means defining the task, the technique, and the constraint. How should AI approach this? What creative method should it use? What is off-limits? Result means specifying how the output should be evaluated and filtered: rank by discomfort, surface the surprising, kill the weak.",
        },
        {
          heading: "Böhler Knives",
          body: "A 200-year-old knife brand entering the home cooking market asked AI for marketing ideas with no context. It got: highlight your craftsmanship and heritage. Every knife brand says this. Rebuilt with C.A.R., banning heritage language, targeting a buyer who replaces everything, and constraining to five provocative concepts, the output became: 'You will throw away 11 phones before this knife needs sharpening.' Only that brand could say that.",
        },
        {
          heading: "Key Takeaway",
          body: "Creativity with AI is not about more ideas faster. It is about better ideas, more consistently. The C.A.R. framework is not a prompt trick. It is a thinking discipline. Give AI the full scene, tell it how to work, and tell it how to filter. The structure is what gets you into the creative sweet spot.",
        },
      ],
      exercise: {
        objective: "Apply CAR method in your real work",
        doneWhen: "You have ideas that are more creative than when you started",
        timeMinutes: 8,
        steps: [
          {
            task: "01",
            title: "Context",
            items: [
              "Write what you know about your task in 3 to 5 sentences",
              "Include your instinct and what you have already seen",
            ],
          },
          {
            task: "02",
            title: "Action",
            items: [
              "Specify how you want AI to work",
              "Define what you want as output (Recommended to watch the lesson)",
            ],
          },
          {
            task: "03",
            title: "Review",
            items: [
              "Add details to sharpen the output",
              "Have AI rank and recommend the best options",
              "Present your result",
              "Suggestion: Use this prompt as a guide <a href=\"http://tiny.cc/actions-ideas\" target=\"_blank\" rel=\"noreferrer\" style=\"color:#E24B4A;\">http://tiny.cc/actions-ideas</a>",
              "Sheet = Homework Exercise",
            ],
          },
        ],
        prompt: null,
        demo: {
          videoUrl: "https://www.youtube.com/embed/Mc52QH4cKDU?si=cgzXQYcMSr24z4bQ",
          title: "Day 3 : Essential Demo",
        },
      },
    },

    advanced: {
      videoUrl: "https://www.youtube.com/embed/EeBV8CBphmI?si=ki1osc8w1ZAzVK8s",
      durationSeconds: 840,
      summary: [
        {
          heading: "Core Idea",
          body: "C.A.R. gets you consistent creative output. Friction gets you breakthroughs. When you force AI away from the most probable answers by banning the obvious and injecting unrelated domains, you get 30% more novel solutions. Constraints are not a limitation on creativity. They are the engine of it.",
        },
        {
          heading: "The Science",
          body: "Restricted toolsets force AI away from its probabilistic center, the cluster of most common, most expected answers. The result is genuinely novel output. Without a wall, AI defaults to average. The discomfort you feel when setting a hard constraint is not a problem with the approach. It is a signal that the constraint is working.",
        },
        {
          heading: "The Friction Formula",
          body: "Step one: write your goal. Step two: list the three most obvious ideas and ban them completely. Step three: pick one unrelated domain, a sport, a courtroom, a recipe, a natural phenomenon, anything. Step four: force AI to solve your brief using only that domain's logic, language, and structure. The collision between your brief and the alien domain is where the idea lives.",
        },
        {
          heading: "The Guardian",
          body: "The Guardian newspaper, 100 years old, targeting Gen Z, asked AI for marketing ideas with a baseline prompt. It got: launch a TikTok, use memes, partner with influencers. Every legacy media brand is already doing this. With friction, banning all references to news, journalism, and credibility, and injecting the logic of a tree, the output became: 'Every ring is a year it did not lie to you. 100 rings. Still standing.'",
        },
        {
          heading: "Key Takeaway",
          body: "Great creativity is not the absence of limits. It is what happens when you weaponize them. C.A.R. gives you consistency. Friction gives you originality. Use C.A.R. when you need reliable quality. Use Friction when you need something no one has seen before.",
        },
      ],
      exercise: {
        objective: "Generate ideas using The Wall and The Bridge",
        doneWhen: "You have three options built entirely from that collision, the weakest killed, and the strongest recommended.",
        timeMinutes: 10,
        steps: [
          {
            task: "01",
            title: "My brief",
            items: [
              "My brief: [what you are working on, your audience, what they want, and what stops them.]",
            ],
          },
          {
            task: "02",
            title: "The Wall",
            items: [
              "The Wall: Here are 3 obvious solutions [list solutions] ban all three completely.",
              "Do not use them anywhere in the response.",
            ],
          },
          {
            task: "03",
            title: "The Bridge",
            items: [
              "The Bridge: Inject the logic of [one unrelated world: a sport, a courtroom, a recipe, a natural phenomenon, anything]. Use only that world's logic, language, and structure to solve the brief. Nothing from the original vocabulary of the brief.",
            ],
          },
          {
            task: "04",
            title: "To deliver",
            items: [
              "To deliver [Give me three options built entirely from that collision. Nothing safe. Nothing expected. If any option could have been produced without the constraint replace it. Rank all three. Kill the weakest. Recommend the strongest and explain why in one sentence.]",
              "End with one line: what did the constraint force you to find that you never would have found without it? Present as [social media post, email, landing page, ad, or something else].",
            ],
          },
        ],
        prompt: "My brief: [what you are working on, your audience, what they want, and what stops them.]\n\nThe Wall: Here are 3 obvious solutions [list solutions] ban all three completely.\nDo not use them anywhere in the response.\n\nThe Bridge: Inject the logic of [one unrelated world: a sport, a courtroom, a recipe, a natural phenomenon, anything]. Use only that world's logic, language, and structure to solve the brief. Nothing from the original vocabulary of the brief.\n\nTo deliver [Give me three options built entirely from that collision. Nothing safe. Nothing expected. If any option could have been produced without the constraint replace it. Rank all three. Kill the weakest. Recommend the strongest and explain why in one sentence.]\n\nEnd with one line: what did the constraint force you to find that you never would have found without it? Present as [social media post, email, landing page, ad, or something else].\n\nScan every bracket. For each unfilled bracket teach and ask one question at a time in this exact way.\n\nFor the brief ask: Great friction starts with a clear brief. What are you working on, who is it for, and what stops them from engaging?\n\nFor the unrelated world say first: Now we build the wall. The more unrelated the world you pick, the more original your output will be. Then suggest three options based on the brief and ask: Here are three worlds we could inject into your brief: [suggest three]. Which feels most interesting? Or pick your own.",
        demo: {
          videoUrl: "https://www.youtube.com/embed/h7c7Q9PQ4Y0?si=50cV235WZzl6wWsH",
          title: "Day 3 : Advanced Demo",
        },
      },
    },

    learnMore: [
      { title: "The Art and Science of Mechanical creativity Demo + Video + Webinar", url: "http://tiny.cc/mechanicalcreativity", type: "video" },
      { title: "A Systematic Review of Human-Al Co-Creativity", url: "http://tiny.cc/article_day3", type: "article" },
      { title: "Using AI to build ideas", url: "http://tiny.cc/notebookLM_day3", type: "tool" },
      { title: "Build ideas prompts, top innovation methods", url: "https://genorg.ai/prompts", type: "other" },
      { title: "How to generate 1213 ideas in 15 minutes", url: "http://tiny.cc/actions-ideas", type: "other" },
    ],
  },

  4: {
    day: 4,
    title: "Default AI Makes You Think Less",
    phase: "foundation",

    sectionTitles: {
      essential: "How We Use AI Wrong",
      advanced: "How Often AI Sounds Right While Being Wrong",
    },

    essential: {
      videoUrl: "https://www.youtube.com/embed/RV75EMovRBA?si=yglVEgbSxzfZNZBH",
      durationSeconds: 600,
      summary: [
        {
          heading: "Core Idea",
          body: "Default AI is optimized to stop your thinking. It gives you fast, confident, complete-sounding answers that feel like conclusions. You accept them. You move on. Your reasoning muscle never fires. This is not a bug in the technology. It is the design. And it gets worse the more you use it without changing the instructions.",
        },
        {
          heading: "The Data",
          body: "Research shows AI usage correlates with critical thinking at r = -0.68, and the cognitive offloading factor is r = -0.75. Squaring that last number means AI usage explains 56% of the variance in reduced critical thinking. Karen Thornber at Harvard put it plainly: LLMs enable us to avoid engaging in challenging mental skills. Unpracticed thinking gets worse.",
        },
        {
          heading: "The Bias Stack",
          body: "Three biases compound when you use default AI without safeguards. Satisficing: you accept the first answer that seems good enough. Authority bias: confident, well-structured AI output feels authoritative, so you trust it. Confirmation bias: you read AI responses looking for agreement, and you find it, because AI is trained to agree. All three work together to degrade your judgment over time.",
        },
        {
          heading: "The Fix",
          body: "Change your custom instructions. Set up AI to label uncertainty, to push back on weak premises, to ask one clarifying question before solving, and to never default to agreement. This is not about making AI harder to use. It is about making it work with your thinking rather than replacing it. The same tool, with different instructions, produces fundamentally different interactions.",
        },
        {
          heading: "Key Takeaway",
          body: "Default AI makes you think less. This is measurable and it compounds. The solution is not to use AI less. It is to use it differently. Update your instructions once. The dividend is every conversation after that.",
        },
      ],
      exercise: {
        objective: "Personalize your instructions for your needs",
        doneWhen: "Your instructions are updated",
        timeMinutes: 8,
        steps: [
          {
            task: "01",
            title: "Run Prompt",
            items: [
              "Run the prompt. Let AI ask you questions and answer them one at a time.",
              "Here is an interactive prompt you can run",
              "It will ask you questions",
              "<a href=\"http://tiny.cc/sparks-instructions\" target=\"_blank\" rel=\"noreferrer\" style=\"color:#E24B4A;\">http://tiny.cc/sparks-instructions</a>",
              "Tab: Homework",
            ],
          },
          {
            task: "02",
            title: "Read",
            items: [
              "Carefully read the instructions AI generates",
              "Edit anything that feels wrong or does not sound like you",
            ],
          },
          {
            task: "03",
            title: "Save and test",
            items: [
              "Add the final version to your AI instructions",
              "Run a test to confirm it works",
            ],
          },
          {
            task: "04",
            title: "Review again after a month",
            items: [
              "Make sure your memory is on",
              "Come back after a month and review again. Your needs will have changed.",
            ],
          },
        ],
        prompt: null,
        demo: {
          videoUrl: "https://www.youtube.com/embed/7ML8RYOsl2w?si=DoTvrCUGgDso-Whr",
          title: "Day 4 : Essential Demo",
        },
      },
    },

    advanced: {
      videoUrl: "https://www.youtube.com/embed/7ZQ5EM-wEWU?si=XNmH9NIYQ7LWf4Fx",
      durationSeconds: 840,
      summary: [
        {
          heading: "Core Idea",
          body: "AI does not look things up. It predicts the most plausible next word, based on patterns in its training data. Confidence is a design feature, not a signal of accuracy. The more convincing an answer sounds, the more dangerous it is to accept without verification.",
        },
        {
          heading: "The Mechanism",
          body: "When AI encounters a knowledge gap, it does not say it does not know. It does what it was trained to do: produce the most plausible-sounding continuation. Dates, names, statistics, and citations all get generated with the same fluency whether they are real or fabricated. The structure of the answer is perfect. The content may be fiction.",
        },
        {
          heading: "The Transparency Paradox",
          body: "A study of 257 medical students making 3,855 diagnostic decisions found that when AI was right and explained its reasoning, accuracy increased by 6.3%. When AI was wrong and explained its reasoning, accuracy dropped by 4.9%. The explanation made the wrong answer more convincing. Fluency is not truth. A well-explained error is more dangerous than a naked one.",
        },
        {
          heading: "Real Consequences",
          body: "In 2023, a New York attorney filed legal briefs citing cases that AI had fabricated. The format was perfect. The quotes read like law. Three cases were completely invented. He filed without verifying. He was fined $5,000. This is not an edge case. It is the default behavior of a system that is optimized to sound right, not to be right.",
        },
        {
          heading: "Key Takeaway",
          body: "Treat every number, date, name, and citation in an AI response as unverified until sourced. The stress test is simple: demand a source, demand a confidence rating, demand explicit uncertainty. AI fluency is a trust signal, not a truth signal. They are not the same thing.",
        },
      ],
      exercise: {
        objective: "Build a healthy skepticism of AI OUTPUTS",
        doneWhen: "You have found at least one error and understand why AI produced it",
        timeMinutes: 10,
        steps: [
          {
            task: "01",
            title: "Pick a topic you know well",
            items: [
              "Choose a topic where you already know the facts",
              "Write down 2 to 3 facts you know are correct",
            ],
          },
          {
            task: "02",
            title: "Ask AI for facts. No special instructions.",
            items: [
              "Ask AI about that topic with no extra guidance",
              "Let it answer without prompting it to be careful or cite sources",
            ],
          },
          {
            task: "03",
            title: "Check the answer against what you know",
            items: [
              "Compare the AI response to your known facts",
              "Note any errors, distortions, or numbers that feel off",
              "Cross-check using a second AI tool if needed",
            ],
          },
          {
            task: "04",
            title: "Now use the prompt. Review your recent reply and the errors found.",
            items: [
              "Run the prompt asking AI to review its own previous reply",
              "Ask it to explain the errors it made",
              "Notice what it catches and what it misses",
            ],
          },
        ],
        prompt: "You are a Verification Analyst helping me fact-check AI-generated content.\n\nExtract each factual claim. Rate confidence HIGH/MEDIUM/LOW. Flag anything you cannot verify.\n\nDo not assume accuracy. Treat every name, date, and number as unverified until sourced.",
        demo: {
          videoUrl: "https://www.youtube.com/embed/NEe-vgVIois?si=SgjYYeRbk27TKE5j",
          title: "Day 4 : Advanced Demo",
        },
      },
    },

    learnMore: [
      { title: "Article - For Understanding the Data Behind Al Overreliance: \"The Impact of Generative Al on Critical Thinking\" by Microsoft Research / Carnegie Mellon", url: "https://www.microsoft.com/en-us/research/wp-content/uploads/2025/01/lee_2025_ai_critical_thinking_survey.pdf", type: "article" },
      { title: "Video - Dr. Liz Moyer teaches how to spot \"confidence traps\" in Al responses", url: "https://www.youtube.com/watch?v=DhmBBnVvRXs", type: "video" },
      { title: "Notebook - Notebook on how to stop using Al wrong", url: "https://notebooklm.google.com/notebook/51505702-5ae2-4bdc-8391-0ba3fa2d2810", type: "tool" },
    ],
  },

  5: {
    day: 5,
    title: "Speak It Out",
    phase: "sparks",

    sectionTitles: {
      essential: "S: Speak It Out",
      advanced: "TRUE NORTH",
    },

    essential: {
      videoUrl: "https://www.youtube.com/embed/tYnO5DlfDA0?si=nDJD9dgQY90g1SMQ",
      durationSeconds: 600,
      summary: [
        {
          heading: "Core Idea",
          body: "Writing filters ideas before they form. When you type, your brain simultaneously manages syntax, spelling, fine motor control, and idea generation, and they all compete for the same working memory. The first casualty is early-stage thinking. Speech does not have this problem. Speech is a biological adaptation of 200,000 years. Writing is a cultural technology of 5,000. Say the idea out loud before you write it.",
        },
        {
          heading: "The Science",
          body: "Research on working memory shows that writing overloads cognitive capacity and destroys early-stage ideas before they reach the page. Oral speech mathematically increases the originality of connections. Dictation produces narratives that are longer, more complex, and structurally stronger than typed equivalents. Speed matters too: you speak at around 180 words per minute and type at around 40. The mouth is not slower. It is faster and less filtered.",
        },
        {
          heading: "The Mechanism",
          body: "Step one: voice memo, 60 to 90 seconds, unedited. Do not correct yourself. Do not stop. Step two: paste the raw transcript into AI without cleaning it. Step three: ask AI to extract the argument hiding in what you said. Step four: write from knowing, not discovering. You are not replacing writing. You are giving writing something real to work with.",
        },
        {
          heading: "The Comparison",
          body: "A senior strategist given a complex brief typed for 45 minutes and produced half a page. Thinking was present. The modality strangled it. The same strategist, same brief, used a voice memo instead. In 90 seconds: 'The question is not how do we present it. It is how do we make the answer feel obvious.' The insight was already there. The tool was wrong.",
        },
        {
          heading: "Key Takeaway",
          body: "S is not a speaking exercise. It is a thinking liberation. The blank page does not free your ideas. It censors them. The editing loop that makes writing feel careful is the same mechanism that kills your best ideas before you know you had them. Speak first. Write second. Give AI your raw voice, not your cleaned thinking.",
        },
      ],
      exercise: {
        objective: "Speak it out. How could AI help you at work?",
        doneWhen: "You have given speaking things out a real try",
        timeMinutes: 8,
        steps: [
          {
            task: "01",
            title: "Identify a challenge",
            items: [
              "Pick something you would like help with",
              "Give yourself 5 minutes to think before moving to Step 2",
            ],
          },
          {
            task: "02",
            title: "Speak it out",
            items: [
              "Open your AI tool and switch to voice mode",
              "Speak for 60 to 90 seconds. Do not stop. Do not correct yourself. Do not clean the transcript.",
            ],
          },
          {
            task: "03",
            title: "Review",
            items: [
              "Paste your raw transcript with the prompt",
              "Let AI find the core message, two supporting points, and one sharp opening sentence",
              "Do not ask it to rewrite or polish. Only what you already said.",
            ],
          },
        ],
        prompt: "You are a thinking partner helping me extract the argument from raw spoken thought.\n\nI will give you an unedited voice transcript. It might be messy, unstructured, and conversational.\n\nRespond with:\n\nOne core message – what is the big idea here\n\nTwo supporting points — the evidence or reasoning already in the transcript.\n\nOne opening sentence — the sharpest way to start if I were to write this up.\n\nDo not rewrite or polish. Do not add ideas I did not say. Only find the argument already in it.\n\n[Speak it out using voice feature or paste your raw transcript here]",
        demo: {
          videoUrl: "https://www.youtube.com/embed/DZJtkQqXN7g?si=xmTM-eLAQFu1E5T8",
          title: "Day 5 : Essential Demo",
        },
      },
    },

    advanced: {
      videoUrl: "https://www.youtube.com/embed/h3M4PxPz6jo?si=EjH5y8mrDDM81sh2",
      durationSeconds: 840,
      summary: [
        {
          heading: "Core Idea",
          body: "Vague thinking does not disappear when you use AI. It gets faster. TRUE NORTH is a structured brief that turns vague principles into a story anyone can execute, whether that is a team member, an AI tool, or both. Fewer than 2 in 5 managers can name one of their company's top five strategic priorities. TRUE NORTH solves that.",
        },
        {
          heading: "The Science",
          body: "Research shows constrained briefs produce 28% more original ideas than open ones. 145 workplace studies confirm this. Psychological Science (2011) and Byron and Khazanchi (2012) both find that boundaries are not a creativity constraint. They are a creativity engine. The Wendy's case shows exactly why: vague mission in, generic ideas out. TRUE NORTH in, specific actionable ideas out.",
        },
        {
          heading: "The TRUE NORTH Structure",
          body: "N: Narrative. The story. Why this matters. O: Objective. We need ideas for blank. R: Restrictions. What we will NOT do. T: Tactical constraints. The hard limits. H: Start Here. Where to look first, plus a two or three word headline that anyone on the team can act on without asking a question.",
        },
        {
          heading: "Wendy's",
          body: "Wendy's mission statement: deliver superior quality products through leadership and innovation. Ask AI for product ideas from that: five generic ideas that could apply to any fast food company anywhere. Rebuilt with TRUE NORTH, defining the narrative around a health-skeptical consumer, restrictions banning health-food language, and a clear start-here on existing menu strengths, the output produced: 'Swap the Fries,' real customer stories, calorie boards framed as confidence. Specific. Actionable. Only Wendy's could say it.",
        },
        {
          heading: "Key Takeaway",
          body: "Give AI and your team the full story. A TRUE NORTH is not a strategy document. It is the minimum context required for anyone, human or AI, to know what to do next without asking. Build it once. Use it every session.",
        },
      ],
      exercise: {
        objective: "Make a TRUE NORTH",
        doneWhen: "You have a TRUE NORTH that is clear enough for both AI and your team to act on",
        timeMinutes: 10,
        steps: [
          {
            task: "01",
            title: "Challenge Identification",
            items: [
              "Pick something you have been struggling to articulate at work",
              "Copy any relevant information you have on it. Add relevant files.",
            ],
          },
          {
            task: "02",
            title: "Make a TRUE NORTH",
            items: [
              "Option 1: Fill in the TRUE NORTH template for a project you are working on. Refer to the TRUE NORTH learn more resource.",
              "Option 2: Use the GPT and ask for help: <a href=\"https://chatgpt.com/g/g-6754129342648191a94c50c383fd267b-cycles-2-0-9-true-north\" target=\"_blank\" rel=\"noreferrer\" style=\"color:#E24B4A;\">https://chatgpt.com/g/g-6754129342648191a94c50c383fd267b-cycles-2-0-9-true-north</a> (use prompt below)",
              "Share your first ideas. Attach documents if applicable.",
            ],
          },
          {
            task: "03",
            title: "Review it",
            items: [
              "With AI: use the GPT to stress test your TRUE NORTH",
              "With people: ask someone if it is clear and if they would know what to do",
            ],
          },
        ],
        prompt: "The AI solution\nI would like help writing a TRUE NORTH\n\nGive me a first draft\n\nThen ask me questions about each section one at a time, so I can accept or improve\n\nGoal = A clear, very clear objective for me, AI and my team\n[first ideas]\nIf applicable, attach documents",
        demo: {
          videoUrl: "https://www.youtube.com/embed/LL910WqkulM?si=t3dbxreryEvhs9ZG",
          title: "Day 5 : Advanced Demo",
        },
      },
    },

    learnMore: [
      { title: "\"Rambler: Supporting Writing With Speech via LLM-Assisted Gist Manipulation\"", url: "https://arxiv.org/html/2401.10838v2", type: "article" },
      // { title: "Speaking versus writing Speaking reduces cognitive load and enhances Al collaboration", url: "https://notebooklm.google.com/notebook/6c78bd65-d982-4198-b8f5-ebced697acb1", type: "tool" },
      { title: "Claude report: EFFECTIVE AI USE IN KNOWLEDGE WORK- A Central Synthesis of Six Research Reports (92 studies)", url: "https://1drv.ms/w/c/c37128d8066b9290/IQAJGJyKJTCKSZw4B9mTmovoAaTNs0HMFFL5PDjYssILygg?e=KWwM1f", type: "article" },
      // { title: "Effective versus merely efficient Al use by knowledge workers (36 studies)", url: "https://1drv.ms/w/c/c37128d8066b9290/IQChxePCfsvzSLcijgplmhT8AVOvWqXKY0MWceLS50C1mvU?e=IMPu9c", type: "article" },
      { title: "Effective Use of ChatGPT and Claude by Knowledge Workers (12 studies)", url: "https://1drv.ms/w/c/c37128d8066b9290/IQBAhtccl4j8RIv0AsDHpa5DAWGFiNhQmFjLinX726uopAM?e=wG8wus", type: "article" },
      { title: "Notebook LM: Effective versus Efficient usage of Al - Facts and research (220 articles and studies)", url: "https://notebooklm.google.com/notebook/f3168f59-185a-44e5-ae29-d591ac121cbe", type: "tool" },
      { title: "Get Any Team Aligned in 30 Minutes Cassady & Gueorguiev - ResearchGate, 2023", url: "https://www.researchgate.net/publication/371867884_Get_any_team_aligned_in_less_than_30_minutes", type: "article" },
      { title: "TRUE NORTH - 6 Lessons 7 minutes", url: "https://www.youtube.com/playlist?list=PL9E8oJF93SyFV_TsJQU1K0QMgdEUNBzou", type: "video" },
      { title: "CYCLES (chapter 9) and the Generative Organization (chapter 9)", url: "https://www.books.genorg.ai", type: "article" },
    ],
  },

  6: {
    day: 6,
    title: "Pivot Roles",
    phase: "sparks",
    sectionTitles: {
      essential: "P: Pivot Roles. Let AI Be the Interviewer.",
      advanced: "Uncovering Deeper Insights by Reversing the Dialogue",
    },
    essential: {
      videoUrl: "https://www.youtube.com/embed/i_HaEWl97lQ?si=16Umk2zGHynWpxg6",
      durationSeconds: 600,
      summary: [
        { heading: "Core Idea", body: "You wrote the prompt carefully. AI answered instantly. It looked right. You moved on. Later you realized you had been working on the wrong challenge. The problem was never the AI answer. It was the question you never got asked. Stop giving AI instructions to answer. Give it permission to interrogate you first." },
        { heading: "The Science", body: "Humans are poor at articulating what they need without being questioned first. Research on 319 knowledge workers found that higher AI confidence correlates with less critical thinking from the user. A separate study on mechanical designers found that those using AI questioning produced significantly more feasible designs than those who simply prompted directly. The AI that asks you questions produces better output than the AI you instruct." },
        { heading: "The Intent Formulation Gap", body: "You carry tacit knowledge, things you know but have never had to articulate. AI operates on explicit constraints, things you have stated in the prompt. Between those two sits the gap where most AI output goes wrong. Questioning is the bridge. When AI asks you a question, you answer it. That answer contains constraints you did not know you had. Those constraints change the output." },
        { heading: "The Flipped Interaction", body: "Model A: you instruct, AI answers. Fast. Shallow. Risk of missed constraints. Model B: AI questions, you clarify, AI answers. Slower. Grounded. Output built on your actual situation. The TRIZ patent drafting study showed that standard prompting produced generic output with no match to real patents. Flipped interaction produced solutions that mirrored actual authorized patent outcomes." },
        { heading: "Key Takeaway", body: "Before answering, ask me everything you need to know. Three words you can add to almost any prompt. They slow the interaction down by two minutes and improve the output by an order of magnitude. Model B is not harder. It just requires you to answer questions. That is where the real thinking happens." },
      ],
      exercise: {
        objective: "Get AI to ask questions about how you could be using AI better",
        doneWhen: "You have at least one non-obvious AI recommendation you will act on",
        timeMinutes: 10,
        steps: [
          {
            task: "01",
            title: "Update the prompt (for you) + context about yourself",
            items: [
              "Add context about yourself and your role",
              "Attach any relevant files that describe your work or current initiatives",
            ],
          },
          {
            task: "02",
            title: "Answer questions",
            items: [
              "Let AI ask you questions one at a time about your targets, current initiatives, and constraints",
              "Answer until it has enough context to give you both obvious and non-obvious AI recommendations",
            ],
          },
          {
            task: "03",
            title: "Reflect",
            items: [
              "Review the recommendations. Which ones surprised you?",
              "Bonus: Run this using the TRUE NORTH GPT to turn ideas into a capstone project: https://chatgpt.com/g/g-6754129342648191a94c50c383fd267b-cycles-2-0-9-true-north",
            ],
          },
        ],
        prompt: "I'm [add some context about yourself + Attach some relevant files]\n\nI'd like your help figuring out how I can best use AI to solve some of my important business challenges.\n\nAsk me questions, one at a time, about our targets, current initiatives, and constraints until you have enough context to give me a few obvious and a few non-obvious AI recommendations.",
        demo: {
          videoUrl: "https://www.youtube.com/embed/-N3GmOyzXYc?si=bdY0KmwDhraTh15E",
          title: "Day 6 : Essential Demo",
        },
      },
    },
    advanced: {
      videoUrl: "https://www.youtube.com/embed/LktSYyznOf8?si=vpo1rvDeTua_O13h",
      durationSeconds: 600,
      summary: [
        { heading: "Core Idea", body: "Your senior expert is leaving in six months. They run knowledge transfer sessions. The result is a document of process steps. The judgment, the workarounds, the unwritten rules, the mindset: those leave with the person. Tacit knowledge cannot be extracted by instruction alone. It can only be surfaced through interrogation. AI-led questioning is the only scalable tool that can capture it before it disappears." },
        { heading: "Three Types of Hidden Knowledge", body: "Relational knowledge: unwritten social rules, expectations, and how people actually react versus how the org chart says they should. Somatic knowledge: physical intuition, the mechanic's trained ear, the sensory cues that experienced practitioners use but cannot describe. Collective knowledge: the team heuristics and norms that differ from official guidelines and exist only in practice." },
        { heading: "The Load That Builds Expertise", body: "When AI absorbs the task complexity, it also absorbs the cognitive work that builds skill. Model A, where you instruct and AI delivers, minimizes friction but also minimizes schema development. Model B, where AI questions and you externalize your thinking, forces reasoning, schema-building, and reflection. The output is grounded. The long-term effect is that expertise is preserved, captured, and scaled rather than allowed to quietly disappear." },
        { heading: "LumaStyle", body: "An online fashion brand facing rising customer acquisition costs used Model A: one prompt, generic marketing budget split, mechanized convergence. Using Model B, AI questioned the user through Socratic prompting, surfacing hidden assumptions about diminishing returns and channel attribution. The output became a risk-adjusted allocation emphasizing long-term ROI. Same challenge. Completely different level of output." },
        { heading: "Key Takeaway", body: "The organization's most valuable knowledge has never been written down. The exit interview catches what people remember to say. AI-led questioning catches what people did not know they knew. Build the habit now. Before the expert leaves." },
      ],
      exercise: {
        objective: "Use Pivoting to better understand the work of a colleague, and ask the right questions if he/she left",
        doneWhen: "You have an exit interview questionnaire ready to use",
        timeMinutes: 10,
        steps: [
          {
            task: "01",
            title: "Update the prompt",
            items: [
              "Insert the primary job title or role of the colleague you want to understand",
              "Add any relevant context about their work",
            ],
          },
          {
            task: "02",
            title: "Answer questions",
            items: [
              "Let AI ask you questions one at a time about your colleague's key tasks and roles",
              "Answer until it has enough context to build a clear picture of their work",
            ],
          },
          {
            task: "03",
            title: "Reflect. Is this better or worse than you would have done without AI?",
            items: [
              "Review the exit interview questionnaire AI produced",
              "Ask yourself: would you have thought of these questions on your own?",
            ],
          },
        ],
        prompt: "I would like to better understand the work a colleague does.\n\nAsk me questions about his/her job one at a time to clearly understand his/her key tasks and roles. His/her primary job is [insert data].\n\nAsk me questions one at a time to better understand the content of work being done and the questions I would need to ask if he/she left the company.\n\nOutput: an exit interview questionnaire",
        demo: {
          videoUrl: "https://www.youtube.com/embed/-N3GmOyzXYc?si=bdY0KmwDhraTh15E",
          title: "Day 6 : Advanced Demo",
        },
      },
    },
    learnMore: [
      {
        title: "Rethinking AI conversations (6 Minutes)",
        url: "https://notebooklm.google.com/notebook/47de7061-ed48-44d9-9a4c-99bb64b4766d/artifact/47b59664-8b80-49b2-bcdc-a8d375d91ee4",
        type: "video",
      },
      {
        title: "Epistemic Reversal",
        url: "https://notebooklm.google.com/notebook/47de7061-ed48-44d9-9a4c-99bb64b4766d/artifact/27eeedd5-d1b0-4d71-ab53-f5b4c1093576",
        type: "other",
      },
      {
        title: "The Pivot - What happens when AI asks the questions",
        url: "https://notebooklm.google.com/notebook/47de7061-ed48-44d9-9a4c-99bb64b4766d?authuser=2",
        type: "tool",
      },
      {
        title: "Flipped Interaction with AI: A Systematic Literature Review on Clarifying Questions, Output Quality, and Evidence-Based Prompting Protocols",
        url: "https://1drv.ms/w/c/c37128d8066b9290/IQBm6Dely9z1RadRwuFMTapsAWuC406gsavP9tUHWd66M?e=nLo9WL",
        type: "article",
      },
      {
        title: "Why your AI should interview you first",
        url: "https://notebooklm.google.com/notebook/47de7061-ed48-44d9-9a4c-99bb64b4766d/artifact/af7748a6-aaa5-4bbe-be25-c151acb23877",
        type: "other",
      },
    ],
  },

  7: {
    day: 7,
    title: "Ask for More",
    phase: "sparks",
    sectionTitles: {
      essential: "A: Ask for More. Building Your Idea Factory.",
      advanced: "Using AI Panels and Libraries for Diverse Perspectives",
    },
    essential: {
      videoUrl: "https://www.youtube.com/embed/AyIIA2ysYuM?si=7DBxPoSpEckoZ6va",
      durationSeconds: 600,
      summary: [
        {
          heading: "Core Idea",
          body: "AI's first answer is its most average answer. It is the statistical center of everything it has seen on a topic. When you accept the first response and move on, you are not getting AI's best output. You are getting its default. The fastest way to improve AI output is not a better prompt. It is a better follow-up.",
        },
        {
          heading: "The Data",
          body: "Research shows that challenging the first AI answer and asking for more produces 15% higher output quality while reducing time spent by 40%. You do not need to write a better prompt. You need to stay in the conversation longer. Most people quit after round one. The people getting the best output stay in the ring.",
        },
        {
          heading: "The READ Framework",
          body: "R: Read the output. What works, what does not. E: Direct it. Keep what you like, name what to drop, push the focus. A: Ask for more. Constrain: remove the obvious. Extend: look in this direction. Associate: combine with this stimulus. D: Done when you have something genuinely better than the first response, not just rearranged.",
        },
        {
          heading: "Vending Machine vs. Sparring Partner",
          body: "Most people use AI like a vending machine: insert prompt, receive answer, walk away. The output is pre-loaded and generic. Treat it like a sparring partner instead: you throw a jab, it responds, you adjust, it adapts. The output sharpens because you stayed in the ring. The interaction itself is the quality mechanism.",
        },
        {
          heading: "Key Takeaway",
          body: "The first answer is where the average lives. Everything worth using is one or two follow-ups deeper. Read the output, name what is weak, redirect, push, constrain, extend. Ask for more every time the first answer feels flat. It almost always does.",
        },
      ],
      exercise: {
        objective: "The first answer is the most average answer. Push for a second better answer.",
        doneWhen: "You have gone from a generic reply to a creative one by asking for more",
        timeMinutes: 10,
        steps: [
          {
            task: "01",
            title: "Find a recent AI reply that needs to be improved",
            items: [
              "Pick any AI reply from the last few days that felt generic or flat",
              "Paste it into the Ask for More template",
            ],
          },
          {
            task: "02",
            title: "Reframe and Push",
            items: [
              "Open the template: <a href=\"https://tiny.cc/askmore\" target=\"_blank\" rel=\"noreferrer\" style=\"color:#E24B4A;\">https://tiny.cc/askmore</a>",
              "Make a copy, go to the \"Ask for more\" sheet, and fill in the blanks in red box",
              "Run the prompt. Let AI push past its first answer.",
            ],
          },
          {
            task: "03",
            title: "Compare your results",
            items: [
              "Put the first reply and the new reply side by side",
              "Ask yourself: which one would you actually use?",
            ],
          },
        ],
        prompt: null,
        demo: {
          videoUrl: "https://www.youtube.com/embed/QG_Hw9ErZbA?si=CjtDP4VfRMRnlOzC",
          title: "Day 7 : Essential Demo",
        },
      },
    },
    advanced: {
      videoUrl: "https://www.youtube.com/embed/aNfyBHl66zA?si=s_3ewxsqd4l8x2HW",
      durationSeconds: 600,
      summary: [
        {
          heading: "Core Idea",
          body: "Iteration inside one mind, even an AI mind, goes deeper but not wider. The same blind spots persist. The same assumptions stay unchallenged. Diversity of perspective does more for creative and strategic output than depth of iteration. You do not need a bigger team. You need a better prompt that forces AI to think like a team.",
        },
        {
          heading: "The Data",
          body: "Decisions made with diverse perspectives are 87% better. Source: Cloverpop, Hacking Diversity with Inclusive Decision Making. A CFO, a product designer, and a frontline support agent looking at the same proposal ask fundamentally different questions. What does this cost? Will people use it? What breaks first? Each question opens a different failure mode. Solo iteration misses all three.",
        },
        {
          heading: "Solo Iteration vs. Panel Critique",
          body: "Solo iteration goes deeper. It improves the answer you already have. It refines what you can already see. Panel critique goes wider. It finds blind spots. It stress-tests the thinking. It surfaces assumptions that look like facts. Both have a place, but most people use only one. The missing mode is almost always the panel.",
        },
        {
          heading: "How to Build a Panel",
          body: "Name the perspectives you want. CFO, HR Director, CEO, Sales Director, customer, skeptic, competitor. Give AI enough context on each role or person to make the feedback specific. Ask it to respond as each persona in turn. Then ask for the key patterns across all feedback and the top three improvements. The panel is as good as the personas you define.",
        },
        {
          heading: "Key Takeaway",
          body: "Better ideas emerge when AI thinks like a team. You do not need permission, budget, or a meeting. You need one prompt that assigns roles and asks for feedback from each. Build the panel before the presentation, not after it.",
        },
      ],
      exercise: {
        objective: "Ask AI for more. Get synthetic user feedback on a proposal.",
        doneWhen: "You have synthetic feedback from at least two personas and 3 concrete improvements to act on",
        timeMinutes: 15,
        steps: [
          {
            task: "01",
            title: "Find something you would like to get feedback on",
            items: [
              "Pick a proposal, idea, or presentation you are working on",
            ],
          },
          {
            task: "02",
            title: "Give context. Describe your challenge, insert your idea. Update.",
            items: [
              "Describe your challenge in one sentence",
              "Insert your idea or attach your document",
            ],
          },
          {
            task: "03",
            title: "Define your personas. Update and run the prompt.",
            items: [
              "Name the personas you want feedback from: CFO, HR Director, CEO, Sales Director, or whoever matters",
              "Optional: download their LinkedIn profiles or answer questions about each to make the personas sharper",
              "Run the prompt and let AI respond as each persona",
            ],
          },
          {
            task: "04",
            title: "Reflection",
            items: [
              "Review the feedback from each persona",
              "Identify the key patterns across all feedback",
              "Pick 3 suggestions to improve your proposal",
            ],
          },
        ],
        prompt: "I have been working on [describe your challenge]\nI have this idea [Insert Idea]\nPlease create a series of personas to represent [people in my management team]\n[CFO | HR Director | CEO | Sales Director] [note: you could include PDFs of their profiles by downloading their LinkedIn profiles or answer questions about each]\nPlease provide feedback on my presentation using these personas\nBased on this, summarize the key feedback, give 3 suggestions on how to improve this project",
        demo: {
          videoUrl: "https://www.youtube.com/embed/S09dXQer_Ic?si=oQqnbIWZ1fFE-RbN",
          title: "Day 7 : Advanced Demo",
        },
      },
    },
    learnMore: [
      {
        title: "Notebook LM podcast: Chain-of-Thought versus Tree-of-Thoughts",
        url: "https://tiny.cc/podcast_day7",
        type: "other",
      },
      {
        title: "Notebook - Ask more: Improving AI reasoning through collaboration",
        url: "https://tiny.cc/notebook_day7",
        type: "tool",
      },
      {
        title: "Encouraging Divergent Thinking in Large Language Models through MultiAgent Debate",
        url: "https://arxiv.org/html/2305.19118v4",
        type: "article",
      },
      {
        title: "Making the Difference: Applying a Logic of Diversity",
        url: "https://www.researchgate.net/publication/276055305_Making_the_Difference_Applying_a_Logic_of_Diversity",
        type: "article",
      },
      {
        title: "ChatGPT as a board of advisors",
        url: "https://www.youtube.com/watch?v=Bh-46lrcHpc",
        type: "video",
      },
      {
        title: "Delivering through diversity",
        url: "https://www.mckinsey.com/capabilities/people-and-organizational-performance/our-insights/delivering-through-diversity",
        type: "article",
      },
    ],
  },

  8: {
    day: 8,
    title: "Reframe",
    phase: "sparks",
    sectionTitles: {
      essential: "R: Reframe. Seeing the Problem Anew.",
      advanced: "Problution",
    },
    essential: {
      videoUrl: "https://www.youtube.com/embed/nUV7CGCTeCs?si=WLCaO_Toov7q6jS5",
      durationSeconds: 600,
      summary: [
        {
          heading: "Core Idea",
          body: "Thinking harder inside the wrong frame gets you to the wrong place faster. Reframing is not about finding a better solution to the problem you were given. It is about finding the real problem hiding behind the one you were given. The question you start with determines every answer that follows.",
        },
        {
          heading: "The Science",
          body: "Research by Rittel (1973) found that high-creative teams explore up to 26 levels of problem depth. Most teams stop at 4 to 10. The gap between 10 and 26 is where the real problem lives. The How Might We (HMW) method is the tool that operationalizes this: it reframes the challenge as an opportunity, opens new solution spaces, and forces you to name the barrier explicitly before asking for solutions.",
        },
        {
          heading: "Weak vs. Strong HMW",
          body: "A weak HMW is vague about the user, abstract about the outcome, and names no barrier. It produces generic solutions: pay more, add benefits, recruit harder. A strong HMW is specific about the user's lived experience, concrete about the outcome, and names the real barrier. The hospital nursing case shows this precisely: 'How do we retain nurses?' produces salary benchmarks. 'How might we help nurses feel staying is worth it despite stressful shifts?' produces recognition, recovery time, peer support, and manager behavior changes.",
        },
        {
          heading: "AI Amplifies the Frame You Provide",
          body: "AI does not question your problem statement. It accepts it and works inside it. If the frame is wrong, every suggestion AI produces will be wrong in the same direction. The hospital asked AI 'how do we retain nurses?' and got higher salaries and signing bonuses. That is not wrong. It is incomplete. The frame limited the search space. Reframing before prompting changes everything.",
        },
        {
          heading: "Key Takeaway",
          body: "Reframing is not creativity. It is excavation. You are digging for the real problem that sits beneath the one everyone agreed to work on. Ask AI for five HMW reframes of your current challenge. Pick the one that opens the most interesting solution space. That is where the better answer lives.",
        },
      ],
      exercise: {
        objective: "Practice making HMWs to find better solutions",
        doneWhen: "You have used one reframe to create new ideas",
        timeMinutes: 8,
        steps: [
          {
            task: "01",
            title: "Choose one real challenge",
            items: [
              "Pick a challenge you are currently working on",
              "Write it in one sentence",
            ],
          },
          {
            task: "02",
            title: "Ask AI for 5 HMW reframes and new solutions",
            items: [
              "Insert your challenge into the prompt",
              "Ask AI to reframe it 5 different ways using \"How Might We\"",
              "For each reframe, ask AI to show the new solution space it opens",
            ],
          },
          {
            task: "03",
            title: "Choose the best reframe and generate ideas",
            items: [
              "Pick the reframe that opens the most interesting solution space",
              "Generate ideas from that angle",
            ],
          },
        ],
        prompt: "I am working on this challenge: [#1 insert challenge].\nHow might we see this challenge from another perspective?\nGive me 5 different How Might We reframes.\nFor each reframe, show the new solution space it opens.",
        demo: {
          videoUrl: "https://www.youtube.com/embed/1GZ7MvglvXM?si=gsyIHxkIAH3572xd",
          title: "Day 8 : Essential Demo",
        },
      },
    },
    advanced: {
      videoUrl: "https://www.youtube.com/embed/BSa_mY7o2OU?si=7CZ-RPRtjQOf90Nl",
      durationSeconds: 600,
      summary: [
        {
          heading: "Core Idea",
          body: "You ask AI to solve your problem. Back comes something fast and generic. You rephrase, add detail, ask again. Still generic, just dressed differently. You are polishing the wrong lever. A better prompt does not get a better answer when the problem definition is wrong. A better problem does.",
        },
        {
          heading: "The Method",
          body: "Keep reframing the problem until you find the version that is both right and solvable. Right: if you solved it, the original pain goes away. Solvable: you can act on it with what you control. Three tools: Altitude (move the problem up or down, ask why you want it or what stops it), Reversal (flip the goal, ask how you would make it worse on purpose), Perspective (change whose problem it is: the customer, the doer, a rival).",
        },
        {
          heading: "Altitude",
          body: "Moving up means finding the real goal behind the stated problem. Moving down means finding the specific person or moment where the problem actually happens. The books-driving-talks challenge, restated at altitude, becomes: the book is the trailer, not the movie. A book that wins talks gets seen, not read cover to cover. That reframe changes the entire approach.",
        },
        {
          heading: "Reversal",
          body: "Ask how you would guarantee the problem gets worse. List the actions that would maximize failure. Then read that list. It tells you exactly what assumptions are baked into the current solution. Guarantee zero usage: write another generic 250-page AI book for everyone, give no path from page to booking. Reading that in reverse reveals the actual levers.",
        },
        {
          heading: "Key Takeaway",
          body: "Solve first or frame first. Old approach: solve the problem as first stated, get generic options, little action. New approach: build a solvable frame, then ask, get specific options and something to do this week. The quality of the solution is determined before you open the tool.",
        },
      ],
      exercise: {
        objective: "Going on a problution journey",
        doneWhen: "You have at least one reframe that changes how you see the problem",
        timeMinutes: 8,
        steps: [
          {
            task: "01",
            title: "Write your problem in one sentence. No jargon.",
            items: [
              "State the problem plainly. One sentence. No buzzwords.",
            ],
          },
          {
            task: "02",
            title: "Pick one or more method. Ask AI to reframe the challenge.",
            items: [
              "Altitude: move the problem up or down. Ask why you want it, or what stops it.",
              "Reversal: flip the goal. Ask how you would make this worse on purpose.",
              "Perspective: change whose problem it is. The customer, the doer, a rival.",
            ],
          },
          {
            task: "03",
            title: "Reflect. Do these problem definitions get you closer to a solution?",
            items: [
              "Compare your original problem statement to the reframes",
              "Pick the definition that opens the most useful solution space",
            ],
          },
        ],
        prompt: null,
        demo: {
          videoUrl: "https://www.youtube.com/embed/gSvjE5zA4f4?si=Er2FSkZ7B5sWMq4t",
          title: "Day 8 : Advanced Demo",
        },
      },
    },
    learnMore: [
      {
        title: "NotebookLM podcast - Learn how Human and AI synergy drives innovation",
        url: "https://tiny.cc/day8_podcast",
        type: "other",
      },
      {
        title: "Evidence of problem exploration in creative designs",
        url: "https://tiny.cc/day8_article",
        type: "article",
      },
      {
        title: "Notebook LM - Reframe problems to unlock innovation.",
        url: "https://notebooklm.google.com/notebook/21b92200-127c-4861-bd25-f85a43ac60c4",
        type: "tool",
      },
      {
        title: "Are You Solving the Right Problem? HBR, Wedell-Wedellsborg.",
        url: "https://hbr.org/2017/01/are-you-solving-the-right-problems",
        type: "article",
      },
      {
        title: "Problem definition: CYCLES ch.11 and The Generative Organization ch.10. Free download",
        url: "https://www.books.genorg.ai",
        type: "article",
      },
      {
        title: "Stalking the Wild solution",
        url: "https://www.amazon.co.uk/Stalking-Wild-Solution-Approach-Creative/dp/0943456193",
        type: "article",
      },
    ],
  },

  9: {
    day: 9,
    title: "Keep Going",
    phase: "sparks",
    sectionTitles: {
      essential: "K: Keep Going",
      advanced: "How to Persistently Refine and Improve with AI",
    },
    essential: {
      videoUrl: "https://www.youtube.com/embed/znfkC-CaQtE?si=vH2o5eabZ7eMvXq3",
      durationSeconds: 600,
      summary: [
        {
          heading: "Core Idea",
          body: "Creativity is doing more than the first thing you thought of. Mediocre ideas become great ones through cycles of iteration, reflection, and return. Winners do not start with better ideas. They take good or even mediocre ideas and make them great over time. Just doing it seldom works. Doing it, thinking, doing it again does.",
        },
        {
          heading: "Three Facts About Persistence",
          body: "First: great ideas almost always come after the obvious ones. Day two of a brainstorm typically produces 80% of the big ideas. First-day thinking is warm-up. Second: TRIZ analysis shows that 97% of innovations are recombinations of existing ideas. AI is exceptionally good at recombination, but only if you keep pushing past the first output. Third: do it, think, do it again. Reflection between cycles is what converts iteration into learning.",
        },
        {
          heading: "Smart AI Has Discipline",
          body: "The difference between AI that helps and AI that spins is discipline. Clear objectives: what does done look like? Structured methodology: what process are we following? Human-AI collaboration: who decides and when? Without these three, more iteration does not mean better output. It means more of the same output with greater time invested.",
        },
        {
          heading: "SPARKS as a System",
          body: "Each behavior in SPARKS is a habit that keeps you working smart. S-P-A-R-K is five habits that compound. The sixth, S for Stop and Think, comes on Day 10. Together they form the practice. Not a technique you use once. A system you build over time. Innovation is not a sprint of brilliant insights. It is a marathon of thoughtful, purposeful strides.",
        },
        {
          heading: "Key Takeaway",
          body: "The biggest risk in AI-assisted work is stopping too soon. The first output is the starting point. Track your score from your pre-course assessment versus now. Look at what changed. Name one habit you will keep. Then keep going.",
        },
      ],
      exercise: {
        objective: "Keep going.",
        doneWhen: "You have compared your results and identified one area to keep improving",
        timeMinutes: 10,
        steps: [
          {
            task: "01",
            title: "Reflect. For you, what is \"Smart AI\"?",
            items: [
              "Search for your old AI usage assessment results",
              "Write down what smart AI use looks like for you personally",
            ],
          },
          {
            task: "02",
            title: "Re-do your AI Usage Assessment",
            items: [
              "Retake the assessment: <a href=\"https://shares.showellapp.com/yNgk9qeArvSKm9Wm8nYxmVGY\" target=\"_blank\" rel=\"noreferrer\" style=\"color:#E24B4A;\">https://shares.showellapp.com/yNgk9qeArvSKm9Wm8nYxmVGY</a>",
              "Compare your new results to your previous ones",
            ],
          },
          {
            task: "03",
            title: "Compare versus your previous results. Reflect: are you making progress?",
            items: [
              "Look at what changed and what did not",
              "Name one thing you will do differently in the next 30 days",
            ],
          },
        ],
        prompt: "Below are my 2 AI usage assessments, first is my assessment results before the class, the second is my assessment results now.\nMake a comparison chart. Do you see changes in the way I use AI?\nProvide recommendations to continue improving.\n\nMy before Assessment:\n[Paste your older assessment here]\n\nMy Latest Assessment:\n[Paste your newer assessment here]",
        demo: {
          videoUrl: "https://www.youtube.com/embed/-N3GmOyzXYc?si=AEo7noZx0lnisPyx",
          title: "Day 9 : Essential Demo",
        },
      },
    },
    advanced: {
      videoUrl: "https://www.youtube.com/embed/RMme-mY5A6I?si=vSkSPJpLqwknockf",
      durationSeconds: 600,
      summary: [
        {
          heading: "Core Idea",
          body: "You iterate. Output gets better. Someone asks what changed between V1 and V3. You cannot answer. Next project: round one again. Undocumented iteration is luck. Documented iteration is a skill. If you cannot explain why the output got better, you cannot repeat it.",
        },
        {
          heading: "The Data",
          body: "Research published at NeurIPS 2023 (Self-Refine) tracked performance across iteration rounds: Round 1 to Round 2 produces a jump from 22 to 27 points. Round 2 to Round 3: 27 to 28.8. Round 3 to Round 4: 28.8 to 28.9. Most gains happen in rounds 1 and 2. After that, diminishing returns set in sharply. Knowing when to stop is as important as knowing how to continue.",
        },
        {
          heading: "The V1-V2-V3 Method",
          body: "Between each version, write one sentence: what was the flaw, and what was the fix. That sentence is the learning. Over time, your change log becomes your process manual. You stop starting from zero. You start each new project from the lessons of the last one. The document is the discipline.",
        },
        {
          heading: "The Plateau Signal",
          body: "V1 to V2: big jump. V2 to V3: clear gain. V3 to V4: barely different. Stop. Most people quit too early on quality and too late on polish. The plateau signal is simple: if two consecutive rounds produce no meaningful change, the current approach is exhausted. Either stop or change the approach entirely before continuing.",
        },
        {
          heading: "Key Takeaway",
          body: "Smart persistence is not more iterations. It is documented iterations with a clear stop signal. Build a change log. Write the flaw and the fix between every version. Review the log before the next project. Never start from zero again.",
        },
      ],
      exercise: {
        objective: "Build a change log. Learn to never start from zero again.",
        doneWhen: "You have a change log and a better prompt ready for next time",
        timeMinutes: 10,
        steps: [
          {
            task: "01",
            title: "Do something with iterations",
            items: [
              "Pick a task you just completed with AI where you ran multiple rounds",
              "Gather the results, the feedback you gave, and the final output",
            ],
          },
          {
            task: "02",
            title: "Analyze the results with the prompt below",
            items: [
              "Run the prompt: \"Based on the work I just did, please help me create a change log and a new and better prompt for next time\"",
              "The output will include: what you did, user feedback, a checklist for next time, how to improve the process, and a prompt to run next time",
            ],
          },
          {
            task: "03",
            title: "Reflect. How could you do this more often?",
            items: [
              "Review the change log AI produced",
              "Identify one process you repeat regularly where this would save you time",
            ],
          },
        ],
        prompt: "Based on the work I just did, please help me create a change log and a new and better prompt for next time\n\nKey outputs\nResults of my work\nFeedback I gave\nA new and better process and prompt\nHow to improve the process\nA prompt to run next time",
        demo: {
          videoUrl: "https://www.youtube.com/embed/GwGiFf_cYQ4?si=zIaOZQ8q31dS-Wiq",
          title: "Day 9 : Advanced Demo",
        },
      },
    },
    learnMore: [
      {
        title: "Self-Refine: Iterative Refinement with Self-Feedback",
        url: "https://openreview.net/forum?id=S37hOerQLB",
        type: "article",
      },
      {
        title: "2 Chapters on persistence Chapter 14 in CYCLES, 13 in the Generative Organization. Free download",
        url: "https://www.books.genorg.ai",
        type: "article",
      },
      {
        title: "Notebook LM - Keep going - your key to success",
        url: "https://notebooklm.google.com/notebook/58932dde-cd07-476d-907e-b3fe36edb468",
        type: "tool",
      },
      {
        title: "NotebookLM podcast - Teaching AI to fix its own mistake",
        url: "https://notebooklm.google.com/notebook/58932dde-cd07-476d-907e-b3fe36edb468/artifact/25a4cb86-fc1a-4721-9474-da376e25a6fa?utm_source=nlm_web_share&utm_medium=google_oo&utm_campaign=art_share_1&utm_content=&utm_smc=nlm_web_share_google_oo_art_share_1_",
        type: "other",
      },
      {
        title: "The Persistent Engine",
        url: "https://notebooklm.google.com/notebook/58932dde-cd07-476d-907e-b3fe36edb468/artifact/cfb8e87e-d4eb-4682-a28e-ae2c30ce9e6e?utm_source=nlm_web_share&utm_medium=google_oo&utm_campaign=art_share_1&utm_content=&utm_smc=nlm_web_share_google_oo_art_share_1_",
        type: "video",
      },
    ],
  },

  10: {
    day: 10,
    title: "Stop and Think",
    phase: "sparks",
    sectionTitles: {
      essential: "Stop and Think: Making AI Your Own",
    },
    essential: {
      videoUrl: "https://www.youtube.com/embed/PzG3Q1yU0EI?si=rJf_tk-tNCY-fET6",
      durationSeconds: 600,
      summary: [
        {
          heading: "Core Idea",
          body: "The final letter of SPARKS is S: Stop and Think. It is the protocol most people skip. Strategic pauses produce measurable results. Research across 312 companies found that teams that built in structured pauses saw 40% more sales and 52% higher profits compared to teams that operated in constant motion. Stopping is not a failure of momentum. It is the act that makes momentum sustainable.",
        },
        {
          heading: "The Three Questions",
          body: "Every strategic pause comes down to three questions. Am I doing something I should be doing? Am I getting closer to my objective? Should I change my approach? These are not reflection exercises. They are course-correction tools. The capstone is a structured application of all three: stop, assess what you have built, and decide whether it does what you set out to do.",
        },
        {
          heading: "The Capstone",
          body: "The capstone is a custom AI tool built around one real challenge from your work. It requires four ingredients: a clear objective (ideally a TRUE NORTH from Day 5), any data or context the tool needs, the work methods the tool will follow, and a specific target output. The build uses the skills from all ten days, particularly problem definition, flipped interaction, and structured briefs.",
        },
        {
          heading: "Regular LLM vs. Custom AI Tool",
          body: "A regular LLM gives you a blank prompt box and a general-purpose model. A custom AI tool starts from your objective, follows your process, uses your context, and produces your specified output every time. The difference is not the underlying technology. It is the structured thinking you built into the instructions. That is the skill the course has been building toward.",
        },
        {
          heading: "Key Takeaway",
          body: "You have spent ten days learning to think before you type, define before you prompt, and push past the first answer. The capstone is the proof that you can. Build something real. Test it on something real. Improve it. Then keep going. The goal was never to finish the course. It was to change how you work.",
        },
      ],
      exercise: {
        objective: "Build your AI tool",
        doneWhen: "You have a working AI tool you have tested on a real task",
        timeMinutes: 10,
        steps: [
          {
            task: "01",
            title: "Define Objectives",
            items: [
              "Write what this tool is for in your own words",
              "Use a TRUE NORTH if you made one on Day 5. If not, a short written objective is enough to start.",
            ],
          },
          {
            task: "02",
            title: "Gather Data",
            items: [
              "Collect the files, examples, and context your tool needs",
              "Bonus: use the Deep Search prompt",
            ],
          },
          {
            task: "03",
            title: "Methods + Output",
            items: [
              "Write how the tool works and what it produces",
              "Ask AI for help",
              "Bonus: use the Make Instruction prompt",
            ],
          },
          {
            task: "04",
            title: "Build, test, improve",
            items: [
              "Build it on your platform of choice. Run it on something real.",
              "Improve based on what you find",
              "Bonus: use the Ping Pong Test prompt",
              "The capstone page has detailed steps with screenshots.",
              "You have to submit the project there.",
              "It is only unlocked once all 10 lessons are marked as done.",
              "All links: <a href=\"https://www.tiny.cc/sparksend/\" target=\"_blank\" rel=\"noreferrer\" style=\"color:#E24B4A;\">https://www.tiny.cc/sparksend/</a>",
            ],
          },
        ],
        prompt: null,
        demo: {
          videoUrl: "https://www.youtube.com/embed/yjjL8x8EG84?si=b84mVznSmLlQn2I7",
          title: "Day 10 : Essential Demo",
        },
      },
    },
  },
};

export function getLesson(day: number): Lesson | null {
  return COURSE_CONTENT[day] ?? null;
}
