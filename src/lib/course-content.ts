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

export const COURSE_CONTENT: Record<number, Lesson> = {
  1: {
    day: 1,
    title: "AI is a Muse, Not an Oracle",
    phase: "foundation",

    sectionTitles: {
      essential: "AI is a Muse, Not an Oracle",
      advanced: "The AI Divide",
    },

    essential: {
      videoUrl: "https://player.vimeo.com/video/76979871",
      durationSeconds: 600,
      summary: {
        coreIdea: "AI has no knowledge of your business, your context, or your goals. It only knows what you tell it. The people who get value from AI direct it. The people who don't defer to it. That is the only distinction that matters. The quality of your input determines the quality of your output. Every time.",
        fact: "Most people assume smarter AI produces better outcomes. Wrong. 78% of organisations use AI regularly. More than 80% report zero measurable impact on earnings. The tool was not the problem. The question was. AI was not working on your problem. It was working on the most likely version of your problem based on every similar question it has ever seen. That is not the same thing.",
        science: "McKinsey's 2024 global survey found that high-performing organisations define strategic goals and operational bottlenecks before selecting tools. These leaders generate $3.70 for every dollar spent on AI. Gen AI high performers reach $10.30 per dollar. Organisations that adopt tools without defining the problem first average zero measurable impact. The difference is not budget. It is not technical capability. It is whether the problem was defined before the tool was opened.",
        framework: "Three steps. Write the bottleneck in one sentence before opening any AI tool. Not the symptom. The bottleneck. Bring that sentence to AI as a directed question aimed at that specific problem. Evaluate every output against the bottleneck you defined. Does this solve it? If not, reject it and redirect.",
        example: "Albemarle, a global energy firm, had one rule. No chasing shiny objects. They defined one problem: how to aggregate cross-plant operational data into a single reusable model. That one defined problem powered over 200 improvement projects and saved $150 million annually. One problem solved everywhere. Not many problems solved once.",
        keyTakeaway: "Define the problem first. AI answers questions. You ask them. A muse does not make decisions for you. It provokes, challenges, and expands your thinking. But only after you have defined the direction.",
      },
      exercise: {
        objective: "Define a real bottleneck before asking AI for help",
        doneWhen: "You have one clear bottleneck and a focused AI-generated action list tied to that bottleneck.",
        timeMinutes: 8,
        steps: [
          {
            task: "01",
            title: "Choose the initiative",
            items: [
              "Pick one real initiative or decision you are working on.",
              "Write it in plain language before opening an AI tool.",
            ],
          },
          {
            task: "02",
            title: "Name the bottleneck",
            items: [
              "Write the bottleneck in one sentence.",
              "Do not write the symptom. Write the root cause.",
            ],
          },
          {
            task: "03",
            title: "Use the prompt",
            items: [
              "Copy the prompt below and paste it into any AI tool.",
              "Fill in the brackets first. If you leave any blank, let the AI ask you one question at a time.",
            ],
          },
        ],
        prompt: "I am working on [describe your initiative or decision].\nThe bottleneck is: [one sentence. Not the symptom. The root cause.]\nGiven only this bottleneck, what are the [three / five] highest-leverage actions I can take in the next [30 days / 90 days / this quarter]?\nDo not suggest tools or platforms. Do not solve the symptom. Stay focused on the bottleneck I defined.\n-----------\nIf any bracket above is not filled in, do not proceed. Ask me one question at a time to help me fill it in. Start with the initiative. Then the bottleneck. Then the time horizon. Do not move to the next question until I have answered the current one. When I answer, reflect back what I said and ask if it captures the real bottleneck or just the symptom. Make this a thinking exercise, not a form to complete.",
      },
    },

    advanced: {
      videoUrl: "https://player.vimeo.com/video/76979871",
      durationSeconds: 840,
      summary: {
        coreIdea: "The gap between what AI could do for your organisation and what it is actually delivering is not closing. It is getting wider. The organisations winning with AI are not running more experiments. They are running fewer and finishing them. The AI Divide is not a technology problem. It is a problem-definition problem.",
        fact: "Most organisations respond to poor AI results by running more pilots. Wrong response. The 6% of organisations capturing real measurable value started with the business, not the tool. More experiments without a defined business objective just produces more pilots that never reach production.",
        science: "High-performing organisations focus on three to five use cases maximum at any given time. Laggard organisations run six or more pilots simultaneously. None reach production. 78% of organisations report regular AI use. More than 80% report zero measurable impact on earnings. The only consistent differentiator across every study is whether the problem was precisely defined before the tool was selected.",
        framework: "Three concepts. The 10-20-70 rule: 10% on models, 20% on data, 70% on people, process, and culture. Most organisations invert this and spend 70% on technology. The value was always in the 70%. Pilot Purgatory: pilots loop endlessly because they are not connected to a defined objective with a named owner and a production pathway. The Replication Gap: high performers design every use case as a reusable module from day one. Tools-first organisations rebuild from scratch every time.",
        example: "A bank deploying AI for credit risk. The objective was not \"improve credit decisions.\" It was: reduce default rate by 8% while maintaining full compliance with regulation X. That one sentence governed every decision. Two models compared. The less accurate but more auditable model was selected because it fit the defined problem. The output was embedded directly into the existing credit officer interface. No extra screens. No extra clicks. A production system. Not a pilot.",
        keyTakeaway: "AI is not the strategy. The business is the strategy. High performers transition from Project AI to Operation AI. That transition only happens when the problem is defined before the tool is opened.",
      },
      exercise: {
        objective: "Turn a vague AI problem into a precise business objective",
        doneWhen: "You have one clear objective and three possible solutions evaluated against that objective only.",
        timeMinutes: 10,
        steps: [
          {
            task: "01",
            title: "Describe the situation",
            items: [
              "Write what is going wrong in one to three sentences.",
              "Be specific about the business problem, not the AI tool.",
            ],
          },
          {
            task: "02",
            title: "Name the obvious solution",
            items: [
              "Write the default fix people are already pushing for.",
              "Do not assume it is the right answer yet.",
            ],
          },
          {
            task: "03",
            title: "Use the prompt",
            items: [
              "Paste the prompt into any AI tool.",
              "Let it help you define the real objective before it suggests solutions.",
            ],
          },
        ],
        prompt: "I have a problem I need to solve at work.\nThe situation is: [describe what is going wrong. One to three sentences.]\nThe obvious solution everyone is pushing for is: [what is the default fix people are jumping to.]\nBefore I go there, help me do this properly.\nStep one. Ask me one question to help me write the real objective in one sentence. Not the symptom. Not the direction. The precise outcome I need.\nStep two. Once I have the objective, give me three solutions. One expensive. One cheap. One I have not thought of.\nStep three. Evaluate all three against my objective. Not against cost. Not against effort. Against the objective only. Recommend the one that fits best.\n------------\nIf any bracket is empty, ask me one question at a time before proceeding. Start with the situation. Then the obvious solution. Do not move to step two until my objective is written in one clear sentence. Push back if it sounds like a direction rather than a precise outcome.",
      },
    },

    learnMore: [
      { title: "Notebook LM", url: "http://tiny.cc/notebook_day1", type: "tool" },
      { title: "NotebookLM podcast", url: "http://tiny.cc/notebookLM_pod_day1", type: "video" },
      { title: "Video", url: "http://tiny.cc/day1_video", type: "video" },
    ],
  },

  2: {
    day: 2,
    title: "The Human Element",
    phase: "foundation",

    sectionTitles: {
      essential: "The Human Element",
      advanced: "",
    },

    essential: {
      videoUrl: "https://player.vimeo.com/video/76979871",
      durationSeconds: 600,
      summary: {
        coreIdea: "AI multiplies your expertise. It does not replace it. Shallow thinking in gives you polished but hollow output. Deep expertise in gives you something genuinely useful. You and a colleague can use the exact same tool with the exact same prompt and get completely different quality. The gap is not the prompt. It is what you bring to it.",
        fact: "Four beliefs to drop. AI is the great equalizer. It is not. The gap between experts and novices gets bigger with AI, not smaller. Better prompts mean better output. Wrong. Prompts shape delivery, knowledge drives quality. You don't need to learn deeply anymore. Dangerous. It leads straight to skill atrophy. More AI use means smarter work. Also wrong. Brain-first workers consistently beat AI-first workers.",
        science: "MIT ran an EEG study on AI reliance. Full AI reliance caused a 55% drop in brain connectivity. Technical experts using AI still gained 45% in performance. General staff gained only 20%. The amplifier is only as good as the signal going in.",
        framework: "Four steps, in order, every time. Think first. Before you open any AI tool, write your own take. Identify your gaps. What are you uncertain about? What would take long to verify? Delegate precisely. Give AI your draft and your context. Ask it to fill only those gaps. Judge and refine. You own the output. AI assisted.",
        example: "Draft your answer first. Then open AI and see what it actually changed. Take an AI output you would normally accept and find three things wrong with it using your own knowledge. After using AI, close the chat and recall three key points from memory. If you cannot, you did not own it.",
        keyTakeaway: "Amplifiers magnify what you bring. Brilliance or noise. Brain first, bot second. Experts catch what AI misses. Your knowledge is the multiplier, not the tool.",
      },
      exercise: {
        objective: "Use AI to extend your thinking, not replace it",
        doneWhen: "You have written your own take, identified your gaps, used AI only on those gaps, and refined the result yourself.",
        timeMinutes: 10,
        steps: [
          {
            task: "01",
            title: "Think first",
            items: [
              "Pick one task you are working on this week.",
              "Write your own take. No AI. No Google. Three to five sentences.",
            ],
          },
          {
            task: "02",
            title: "Identify your gaps",
            items: [
              "Write down two things you are uncertain about.",
              "Name what would take long to verify or what you are not confident about.",
            ],
          },
          {
            task: "03",
            title: "Delegate precisely",
            items: [
              "Open AI and paste the prompt below.",
              "Fill in every bracket before you send it.",
            ],
          },
          {
            task: "04",
            title: "Judge and refine",
            items: [
              "Read every point AI gives you.",
              "Keep what connects to your context. Cut what does not.",
            ],
          },
        ],
        prompt: "I am working on: [describe your task or challenge in one sentence]\nMy current thinking is: [paste your own take. Three to five sentences. What you know. What you have seen. What your instinct says.]\nI am uncertain about: [two specific gaps. What you don't know. What would take you long to verify.]\nRespond only to my gaps. Use my thinking as context. Do not rewrite what I already know. Do not give generic advice. Make your response specific to what I told you.\n---------\nIf any bracket is not filled, do not proceed. Ask me one question at a time. Start with the task. Then my thinking. Then my gaps. Do not move to the next question until I have answered. If my answers sound vague or generic, push back and ask me to be more specific.",
      },
    },

    advanced: {
      videoUrl: "https://player.vimeo.com/video/76979871",
      durationSeconds: 840,
      summary: { ...PLACEHOLDER_SUMMARY },
      exercise: { ...PLACEHOLDER_EXERCISE },
    },

    learnMore: [
      { title: "Notebook LM", url: "http://tiny.cc/notebookLM_2", type: "tool" },
      { title: "NotebookLM1", url: "http://tiny.cc/notebook_1", type: "tool" },
      { title: "Article", url: "http://tiny.cc/day2_article", type: "article" },
    ],
  },

  3: {
    day: 3,
    title: "The C.A.R. Framework",
    phase: "foundation",

    sectionTitles: {
      essential: "The C.A.R. Framework",
      advanced: "The Friction Framework",
    },

    essential: {
      videoUrl: "https://player.vimeo.com/video/76979871",
      durationSeconds: 600,
      summary: {
        coreIdea: "Structure changes everything. You can use the same AI, the same screen, and the same person and get completely different results just by changing how you think before you hit send. Typing \"give me ideas\" is the worst thing you can do. It gives AI nothing to work with. Structure is what turns a traffic jam into a highway.",
        fact: "Most people think better AI output comes from using AI more or finding smarter prompts. Wrong. The variable was never the technology. It was always the structure you brought to it. A vague question gets the most average answer. Every time.",
        science: "The numbers are hard to ignore. Humans alone produced 1.4 good ideas per hundred. Adding AI with no structure moved it to 1.7. Adding context got to 2.0. Adding structured techniques hit 5.8. Add a proper review step and you reach 14. Nearly ten times the starting point. Same AI throughout. Only the structure changed.",
        framework: "C.A.R. has three parts. Context is not just what your brand does. It is who your buyer is, what tension they carry, what they resist. Action is not \"give me ideas.\" It is a specific task, a creative technique, and one constraint that forces originality. Review is the most skipped step and the most powerful one. Rank the output. Kill the weak ideas. Keep only what earns its place.",
        example: "Bohler Knives. 200 years old. Selling a £180 knife to a 31-year-old who replaces everything. The vague prompt gave them: highlight craftsmanship, partner with influencers, offer a lifetime guarantee. Every other brand says the same. The C.A.R. prompt gave them: \"You will throw away 11 phones before this knife needs sharpening.\" One line. Completely different thinking.",
        keyTakeaway: "Creativity with AI is not about more ideas faster. It is about better ideas more consistently. The output always tells you everything about the prompt that made it. Use C.A.R. on something real today.",
      },
      exercise: {
        objective: "Use the C.A.R. framework on a real task",
        doneWhen: "You have one ranked, stress-tested, ready-to-use output created from clear context, action, and review criteria.",
        timeMinutes: 8,
        steps: [
          {
            task: "01",
            title: "Choose a real challenge",
            items: [
              "Pick something you actually need AI help with.",
              "Use a specific task, not a vague topic.",
            ],
          },
          {
            task: "02",
            title: "Fill in C.A.R.",
            items: [
              "Complete the Context, Action, and Review fields.",
              "Make the banned word or angle specific. This prevents generic output.",
            ],
          },
          {
            task: "03",
            title: "Run and review",
            items: [
              "Paste the prompt into any AI tool.",
              "Rank, cut, and improve the output before using it.",
            ],
          },
        ],
        prompt: "I need help with the following challenge. Use the C.A.R. framework to produce strong, original, useful results.\n\nCONTEXT — what's the situation?\nWorking on: [a short specific sentence, e.g. \"LinkedIn post for a 10-day AI course\"]\nFor: [who + what they want, e.g. \"busy managers who want practical AI skills\"]\nTheir hesitation: [their skepticism, fear, or what's burned them before]\nBanned: [one word, phrase, or angle that would make this generic]\n\nACTION — how should AI work?\nOutput: [what + how many, e.g. \"5 LinkedIn posts\"]\nUse one of: inversion, analogy, contradiction, provocation. Pick one: [__]\n\nREVIEW — how do we know it's good?\nRank all options. Cut the weakest. Improve the rest.\nStress-test the winner: would it still land if [a skeptical version of the audience] read it cold?\nRecommend the strongest in one sentence. Give the final, ready to use.\n\nAI instructions:\n- If any field above is empty or vague, ask ONE question at a time, in order.\n- With each question, add a short \"why this matters\" so the user learns the move while using it.\n- Don't proceed until every field is concrete enough to act on.\n- \"Banned\" is required. If empty, ask: \"What's the obvious angle everyone else would take? We'll ban that.\"",
      },
    },

    advanced: {
      videoUrl: "https://player.vimeo.com/video/76979871",
      durationSeconds: 840,
      summary: {
        coreIdea: "C.A.R. makes you better. It does not make you breakthrough. Even with perfect context, perfect action, and perfect review, AI is still a pattern recognition engine reaching for the most probable answer. To get ideas that could not have existed any other way, you need friction. Deliberate constraint that forces AI out of familiar territory.",
        fact: "Most people think more freedom produces more creativity. Wrong. The restricted group produced solutions rated 30% more novel than the group with unlimited resources. Without a wall to push against, you drift back to the average. Every time. The wall is not the obstacle. The wall is the brief.",
        science: "Constraints produce 30% more novel solutions than unlimited resources. This is not a creative philosophy. It is empirical research. Dr. Seuss wrote Green Eggs and Ham under a 50-word limit. The constraint did not shrink the idea. It forced a completely different kind of thinking.",
        framework: "Three steps. The Wall: identify the three most obvious directions AI will take and ban all three explicitly in the prompt. The Bridge: pick one completely unrelated domain and inject its logic into the brief. The Result: AI is forced to combine two things that should not go together. That collision is where the original idea lives. The more wrong the combination feels, the more right the output tends to be.",
        example: "The Guardian needed to reach Gen Z. The plain prompt gave them: launch TikTok, use memes, partner with influencers. Every legacy media brand already does this. With friction, they banned the words news, journalism, truth, and credibility. They injected the logic of a 100-year-old tree. AI came back with: \"Every ring is a year it did not lie to you. 100 rings. Still standing.\" No mention of journalism. No mention of truth. The most honest thing The Guardian ever said to a generation that trusts nothing.",
        keyTakeaway: "C.A.R. every day. Friction when you hit the ceiling. The signal is when outputs feel almost right but not quite. That almost is when you build the wall. The discomfort in your prompt is not a problem. It is the point.",
      },
      exercise: {
        objective: "Use friction to force AI beyond the obvious answer",
        doneWhen: "You have banned the obvious directions, injected an unrelated world, and selected the strongest idea from the collision.",
        timeMinutes: 10,
        steps: [
          {
            task: "01",
            title: "Write the brief",
            items: [
              "Describe what you are working on, who it is for, what they want, and what stops them.",
              "Keep it specific enough for AI to act on.",
            ],
          },
          {
            task: "02",
            title: "Build the wall",
            items: [
              "Identify the three most obvious directions AI would normally take.",
              "Ban all three completely.",
            ],
          },
          {
            task: "03",
            title: "Build the bridge",
            items: [
              "Choose one unrelated world.",
              "Force AI to solve the brief using only that world’s logic, language, and structure.",
            ],
          },
        ],
        prompt: "My brief: [what you are working on, your audience, what they want, and what stops them.]\nThe Wall: Identify the three most obvious directions you would normally take this brief. List them out loud. Then ban all three completely. Do not use them anywhere in the response.\nThe Bridge: Inject the logic of [one unrelated world: a sport, a courtroom, a recipe, a natural phenomenon, anything]. Use only that world's logic, language, and structure to solve the brief. Nothing from the original vocabulary of the brief.\nThe Result: Give me three options built entirely from that collision. Nothing safe. Nothing expected. If any option could have been produced without the constraint replace it. Rank all three. Kill the weakest. Recommend the strongest and explain why in one sentence. End with one line: what did the constraint force you to find that you never would have found without it? Present as [social media post, email, landing page, ad, or something else].\nScan every bracket. For each unfilled bracket teach and ask one question at a time in this exact way.\nFor the brief ask: Great friction starts with a clear brief. What are you working on, who is it for, and what stops them from engaging?\nFor the unrelated world say first: Now we build the wall. The more unrelated the world you pick, the more original your output will be. Then suggest three options based on the brief and ask: Here are three worlds we could inject into your brief: [suggest three]. Which feels most interesting? Or pick your own.",
      },
    },

    learnMore: [
      { title: "NotebookLM podcast", url: "http://tiny.cc/CAR_day3", type: "video" },
      { title: "Notebook LM", url: "http://tiny.cc/notebookLM_day3", type: "tool" },
      { title: "Article", url: "http://tiny.cc/article_day3", type: "article" },
    ],
  },

  4: {
    day: 4,
    title: "Default AI Makes You Think Less",
    phase: "foundation",

    sectionTitles: {
      essential: "Default AI Makes You Think Less",
      advanced: "Fluency is Not Truth",
    },

    essential: {
      videoUrl: "https://player.vimeo.com/video/76979871",
      durationSeconds: 600,
      summary: {
        coreIdea: "Every time you ask AI a question and move on without checking, your thinking gets skipped. Not slowed. Skipped entirely. Default AI is optimized to stop your thinking. It gives polished answers instantly, agrees with your framing, and never tells you what is missing. The fix is one setting change. Not a new tool. Not a new skill. One paste.",
        fact: "Most people believe faster and smoother AI answers are better. Wrong. Default AI exploits three biases at once and they compound. Satisficing: your brain accepts the first good enough answer and stops searching. Authority bias: AI sounds confident so you trust it like an expert even though it has no judgment. Confirmation bias: AI mirrors your framing and agrees with your premise. You never hear the pushback you need. Each one makes the next one harder to notice.",
        science: "A study of 666 people measured the relationship between AI use and critical thinking. The correlation was negative 0.68. The more you use AI, the less critically you think. The mediating factor was cognitive offloading. That correlation was even stronger at negative 0.75. Harvard professor Karen Thornber puts it simply: LLMs enable us to avoid engaging in challenging mental skills. Unpracticed thinking gets worse. Your AI is not making you dumber. But it is making you less practiced. That has the same result.",
        framework: "One setting change. Three protocols. Epistemic humility: AI labels every claim as fact, inference, or speculation. No more fake certainty. Active engagement: AI asks one clarifying question before solving. It makes you think before it thinks for you. Anti-sycophancy: AI never defaults to agreement. It pushes back and gives counter-arguments. One paste. Every conversation changes from that point forward.",
        example: "Input: \"We're moving to cross-functional squads. Good idea?\" Default AI validates the choice. Thinking stops. You feel good. You move on. With custom instructions, the same question gets a confidence tag, a clarifying question about what problem you are actually solving, and a counter-argument. The first answer ended your thinking. The second made it sharper.",
        keyTakeaway: "Default AI makes you think less. Change the instructions or your judgment degrades every time you use it. Same tool. Different behavior. The difference is one setting.",
      },
      exercise: {
        objective: "Change your AI settings so the tool challenges your thinking instead of replacing it",
        doneWhen: "Your AI asks a clarifying question, labels claims, and pushes back on weak framing.",
        timeMinutes: 8,
        steps: [
          {
            task: "01",
            title: "Open your AI settings",
            items: [
              "Go to settings in ChatGPT, Gemini, or whichever AI tool you use daily.",
              "Find the custom instructions field.",
            ],
          },
          {
            task: "02",
            title: "Paste the instructions",
            items: [
              "Copy the instructions template below.",
              "Paste it into the custom instructions field.",
            ],
          },
          {
            task: "03",
            title: "Ask a real question",
            items: [
              "Use something you actually need an answer on right now.",
              "Check whether it asks a clarifying question, labels claims, and pushes back.",
            ],
          },
        ],
        prompt: "Role: You are a Critical Thought Partner and \"Devil’s Advocate.\" Your goal is to improve decision quality, not just speed. You must actively mitigate my cognitive biases: Overconfidence, Cognitive Offloading, and Confirmation Bias.\nCore Protocols:\n1. Epistemic Humility (Anti-Overconfidence)\nLabel Confidence: Explicitly tag assertions as [Fact], [High Confidence Inference], or [Speculation].\nNo Fake Certainty: Never sound authoritative on ambiguous topics. Admit limits immediately.\nShow Logic: Outline the logic trail for complex answers. Flag guesses clearly.\n2. Active Engagement (Anti-Offloading)\nFriction is Good: Do not solve complex problems immediately.\nThe 1-Question Rule: Before executing a major request, ask one clarifying question that forces me to verify my assumptions or define success.\nDemand Specificity: If a prompt is vague, do not guess. Ask for constraints.\n3. Anti-Sycophancy (Anti-Confirmation Bias)\nNever Default to Agreement: If my premise is flawed or weak, push back.\nRed Team Mode: For every strategic opinion I present, provide at least one strong counter-argument or edge case.\nWiden the Scope: Avoid \"Yes, and...\" Use \"Yes, but...\" or \"Alternatively...\"\nCheck the Echo Chamber: If I ask for validation, ask: \"Would you like me to analyze the opposing view?\"",
      },
    },

    advanced: {
      videoUrl: "https://player.vimeo.com/video/76979871",
      durationSeconds: 840,
      summary: {
        coreIdea: "AI does not look things up. It predicts the most plausible next word. Confidence is a design feature, not a reliability signal. The more convincing an answer sounds, the more dangerous it is to accept without checking. You did not catch the error because you did not know the right answer. That is exactly when it matters most.",
        fact: "Most people believe that a specific, confident AI answer means it is drawing from real information. Wrong. AI is never trained to say it does not know. When it hits a knowledge gap it does not stop. It predicts what a knowledgeable answer would look like and delivers it with full confidence. It is not lying. It is performing what knowledge looks like.",
        science: "257 medical students made 3,855 diagnostic decisions with AI support. When AI was right, explanations helped. Accuracy went up 6.3 points. When AI was wrong, explanations made things worse. Accuracy dropped 4.9 points. Students treated explained AI as 15 percentage points more accurate than it actually was. The better AI explained itself, the more dangerous the wrong answers became.",
        framework: "The stress test has three requirements. Demand a source for every claim. Demand a confidence rating: high, medium, or low. Demand that AI states uncertainty explicitly. This does not make AI smarter. It makes the gaps visible. The hallucinations were always there. The stress test forces them into the open.",
        example: "A New York attorney asked ChatGPT for legal cases. Six citations came back. Perfect format. Quoted passages. He filed them in federal court without verifying. Three cases were completely fabricated. Invented names. Invented courts. Invented rulings. He was fined $5,000. The only way to catch it was to check. He did not check.",
        keyTakeaway: "Fluency is not truth. Stress test before you trust. Same AI, one added line, completely different visibility.",
      },
      exercise: {
        objective: "Learn to fact-check AI output before trusting it",
        doneWhen: "You have compared a normal AI answer with a stress-tested answer and identified at least one unsupported or risky claim.",
        timeMinutes: 10,
        steps: [
          {
            task: "01",
            title: "Pick your topic",
            items: [
              "Choose something you know well.",
              "Write down two or three facts you already know are correct.",
            ],
          },
          {
            task: "02",
            title: "Ask AI normally",
            items: [
              "Type your question with no special instructions.",
              "Notice how confident the answer sounds.",
            ],
          },
          {
            task: "03",
            title: "Check the answer",
            items: [
              "Compare it against your baseline facts and one external source.",
              "Find at least one error, weak claim, or fabricated detail.",
            ],
          },
          {
            task: "04",
            title: "Run the stress test",
            items: [
              "Use the prompt below on the exact same topic.",
              "Compare both outputs side by side.",
            ],
          },
        ],
        prompt: "You are a Verification Analyst helping me fact-check AI-generated content.\nI will give you: a block of text produced by an AI on a factual topic.\nExtract each factual claim. Rate confidence HIGH/MEDIUM/LOW. Flag anything you cannot verify.\nDo not assume accuracy. Treat every name, date, and number as unverified until sourced.\n[PASTE AI-GENERATED TEXT HERE]",
      },
    },

    learnMore: [
      { title: "NotebookLM1", url: "http://tiny.cc/notebookLM_4a", type: "tool" },
      { title: "Article", url: "http://tiny.cc/day4_video", type: "article" },
      { title: "Notebook LM2", url: "http://tiny.cc/day4_notebook", type: "tool" },
    ],
  },

  5: {
    day: 5,
    title: "Speak It Out",
    phase: "sparks",
    sectionTitles: {
      essential: "",
      advanced: "",
    },
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
    sectionTitles: {
      essential: "",
      advanced: "",
    },
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
    sectionTitles: {
      essential: "",
      advanced: "",
    },
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
    sectionTitles: {
      essential: "",
      advanced: "",
    },
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
    sectionTitles: {
      essential: "",
      advanced: "",
    },
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
    sectionTitles: {
      essential: "",
      advanced: "",
    },
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