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
      videoUrl: "https://www.youtube.com/embed/4598hpYrCiw?si=5BrpJrzafRIuI7pI?rel=0",
      slideUrl: "https://ukscjhoyjyfmfyqxhraq.supabase.co/storage/v1/object/public/course-assets/Day%201%20_%20Intro%20+%20lesson%201.pdf",
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
              "Reject what dosen't fit",
            ],
          },
        ],
        prompt: "I am working on [describe your initiative or decision].\nThe bottleneck is: [one sentence. Not the symptom. The root cause.]\nGiven only this bottleneck, what are the [three / five] highest-leverage actions I can take in the next [30 days / 90 days / this quarter]?\nDo not suggest tools or platforms. Do not solve the symptom. Stay focused on the bottleneck I defined.\n-----------\nIf any bracket above is not filled in, do not proceed. Ask me one question at a time to help me fill it in. Start with the initiative. Then the bottleneck. Then the time horizon. Do not move to the next question until I have answered the current one. When I answer, reflect back what I said and ask if it captures the real bottleneck or just the symptom. Make this a thinking exercise, not a form to complete.",
      },
    },

    advanced: {
      videoUrl: "https://www.youtube.com/embed/AjcFQvpGRtA?si=9TOX-ADndFfxIcDa?rel=0",
      slideUrl: "https://ukscjhoyjyfmfyqxhraq.supabase.co/storage/v1/object/public/course-assets/Day_1-%20Advanced.pdf",
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
              "Be specific about the business problem, not the solution",
            ],
          },
          {
            task: "02",
            title: "Define the objective & name the obvious solution",
            items: [
              "Define the objective in one sentence.",
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
      { title: "NotebookLM", url: "http://tiny.cc/notebookLM_2", type: "tool" },
      { title: "Article", url: "http://tiny.cc/day2_article", type: "article" },
      { title: "Notebook LM", url: "http://tiny.cc/notebook_1", type: "tool" },
      { title: "Read more on problem definition — Chapters 11 in CYCLES and 10 in The Generative Organization", url: "https://www.books.genorg.ai", type: "article" },
      { title: "TED x Salford — What is the one thing to teach if you teach one thing", url: "https://youtu.be/aFnS3SVXFpY", type: "video" },
      { title: "Notebook LM: Using AI — Objectives or Tools First", url: "https://notebooklm.google.com/notebook/9479de63-ed47-4bd9-8269-685fb6580d5a?authuser=2", type: "tool" },
      { title: "Bonus: Literature reviews — Effective Usage of AI and Training Methods (HR managers)", url: "https://shares.showellapp.com/3KY2GPTzxunwQdJ740hBysNn", type: "other" },
    ],
  },

  2: {
    day: 2,
    title: "The Human Element",
    phase: "foundation",

    sectionTitles: {
      essential: "The Human Element",
      advanced: "How to become an expert in anything fast with AI​",
    },

    essential: {
      videoUrl: "hthttps://www.youtube.com/embed/c9WopFRNGrY?si=Vq3VkBuyCUWrJY1H?rel=0",
      slideUrl: "https://ukscjhoyjyfmfyqxhraq.supabase.co/storage/v1/object/public/course-assets/Day%202-%20Essentials%20Expertise.pdf",
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
        objective: "See how expertise changes the output more than the prompt​",
        doneWhen: "You have run the prompt and reviewed the results — does this help more than a generic prompt?",
        timeMinutes: 8,
        steps: [
          {
            task: "01",
            title: "Define task and add reference files",
            items: [
              "Describe your task or challenge in one sentence.",
              "Attach anything relevant — reports, briefs, past work. More context = better results (usually).",
            ],
          },
          {
            task: "02",
            title: "Current thinking and identify gaps",
            items: [
              "Write your own take in three to five sentences: what you know, what you have seen, what your instinct says.",
              "Then name your specific gaps — what you do not know, what would take you long to verify.",
            ],
          },
          {
            task: "03",
            title: "Run the prompt and evaluate results",
            items: [
              "Copy the prompt below and paste it into any AI tool.",
              "You can fill in the brackets or run it as is — letting AI ask you one question at a time to fill them.",
            ],
          },
        ],
        prompt: "I am working on: [#1 describe your task or challenge in one sentence + attach relevant files.]\nMy current thinking is: [#2 paste your own take. Three to five sentences. What you know. What you have seen. What your instinct says.]\nI am uncertain about: [#3 specific gaps. What you don't know. What would take you long to verify.]\nRespond only to my gaps. Use my thinking as context. Do not rewrite what I already know. Do not give generic advice. Make your response specific to what I told you.\n---------\nIf any bracket is not filled, do not proceed. Ask me one question at a time. Start with the task. Then my thinking. Then my gaps. Do not move to the next question until I have answered. If my answers sound vague or generic, push back and ask me to be more specific.",
      },
    },

    advanced: {
    videoUrl: "https://www.youtube.com/embed/adKQchE9FKE?si=ttJZNYn5OwRRyqmM?rel=0",
    slideUrl: "https://ukscjhoyjyfmfyqxhraq.supabase.co/storage/v1/object/public/course-assets/Day%202-%20Advanced%20Expert%20anything%20fast.pdf",
    durationSeconds: 840,
    summary: {
      coreIdea: "You give AI a topic. It gives you a summary. That is not research. That is recycling. The model is not the constraint. The question is the constraint. A sharper question run on a basic tool beats a vague question run on the most powerful model available. Only you can write a sharp question. AI cannot do it for you. When you bring the depth of your expertise to the question and let AI bring its reach to the search, you produce findings that neither of you could reach alone.",
      fact: "Most people believe better AI gives better research. Wrong. The moment you let AI decide what is worth asking, the whole system collapses. A topic dressed as a question gets you an essay. Interesting, generic, forgettable. A precise question with a population, a variable, and a time frame gives AI something real to find. That second question came from someone who knows the field. AI cannot write that question. You can.",
      science: "Boston Consulting Group ran a field experiment with 500 consultants. On complex professional tasks, consultants using AI alone were 19 percentage points less likely to produce correct solutions than those working without it. But consultants combining expertise with AI on tasks within AI's capability scored 40% higher on quality than those using no AI at all. The gap is not the tool. The gap is whether the expert is steering it.",
      framework: "Four steps. Write your current belief about a topic in one sentence. What do you think is true right now? Write what would prove you wrong. That tension between what you believe and what might disprove it is your research question. Sharpen it: add a population, a variable, a time frame. Make it specific enough that you can imagine what a real finding would look like. Hand it to AI and read what comes back. Not to confirm what you already think. To find what you do not yet know.",
      example: "Two people. Same tool. The novice types the topic, reads the summary, accepts it. Produces something that sounds researched but cannot survive a single hard question. The expert writes a precise question drawn from ten years of domain knowledge, runs the source-grounded search, gets three findings they genuinely did not know, and spots the one AI got wrong because they know the field. Same tool. Different question. Completely different world.",
      keyTakeaway: "You write the question. AI finds the answer. A topic gets you a summary, rarely usable. A vague question gets you a plausible answer, sometimes usable. A precise question gets you cited findings, always usable. The only variable is the quality of the input. And the only source of a quality input is your expertise.",
    },
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
            `Use the GPT or prompt guide to sharpen it into a deep search question: 
https://docs.google.com/document/d/1H2_z3V-RHlJWtPFVqhfOriV4tlj9KTzxfrdKvlPeBXs/edit?tab=t.mq13ety9iq09`,
            `Or use the Literature Review GPT directly:
https://chatgpt.com/g/g-6a1c4b5bbf748191a5b0fbbfb0d62501-literature-review`,
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
    },
  },

    learnMore: [
      { title: "When Help Comes Too Early — TEDx Rabat, Bryan Cassady", url: "http://tiny.cc/Help-Early-slides", type: "video" },
      { title: "AI as Equalizer or Amplifier? Task Complexity as the Moderating Factor for Human Expertise in Hybrid Intelligence Systems", url: "http://tiny.cc/day2_article", type: "article" },
      { title: "The Importance of Expertise in the Age of AI", url: "http://tiny.cc/notebookLM2", type: "tool" },
      { title: "Systems-Level Expertise: An AI-Augmented Framework for Accelerated Domain Mastery", url: "https://1drv.ms/b/c/c37128d8066b9290/IQDp-I8HJyDsT5cP_1fHFVa6ASchCUEK4ZvtAjzjGZv1Ptl?e=hN2BYz", type: "article" },
      { title: "NotebookLM Guide: 7 Steps to Master Research Projects Fast", url: "https://www.wisdomquant.com/notebooklm-guide-research-projects/", type: "video" },
      { title: "NotebookLM: Building Expertise Fast with AI", url: "https://notebooklm.google.com/notebook/e02b1788-1e33-49c2-9385-ee7b7958cfb4?authuser=2", type: "tool" },
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
      videoUrl: "https://www.youtube.com/embed/coNfyR_6lt0?si=MBPsyPBR4ygkjBzt?rel=0",
      slideUrl: "https://ukscjhoyjyfmfyqxhraq.supabase.co/storage/v1/object/public/course-assets/Day-3-Essential.pdf",
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
        objective: "Use a structured innovation method to generate better ideas for a real challenge",
        doneWhen: "You have run the prompt and evaluated whether the method changed the quality of ideas compared to a generic prompt.",
        timeMinutes: 10,
        steps: [
          {
            task: "01",
            title: "Set your context",
            items: [
              "Fill in your role, your challenge in one sentence, and who it is for.",
              "Add any constraints — budget, timing, non-negotiables.",
            ],
          },
          {
            task: "02",
            title: "Pick your action method",
            items: [
              "Open the Innovation Actions sheet (link below) and pick one method. Paste it in place of the Archetypal Analysis block in the prompt.",
              "No sheet? The Archetypal Analysis example already in the prompt works as a starting point — just run it as is.",
              '<a href="https://tiny.cc/actions-ideas" target="_blank" rel="noreferrer" style="color:#E24B4A;">Innovation Actions sheet →</a>',
            ],
          },
          {
            task: "03",
            title: "Add your details and set your review",
            items: [
              "Paste anything relevant into the Details section — background, files, links, context.",
              "Fill in how you want the output delivered — ranked list, infographic, table, document.",
            ],
          },
          {
            task: "04",
            title: "Run it and evaluate",
            items: [
              "Send the prompt and read what comes back.",
              "Does the method change the quality of ideas compared to a generic prompt?",
            ],
          },
        ],
        prompt: "You are a [1. role] helping with [2. challenge in one sentence].\n\nCONTEXT\nWho, what, and any details that matter: [3. person or audience + constraints + anything specific — the more you add, the better the output]\n\nACTION\nApproach this innovation challenge through the lens of Archetypal Analysis. Here's a structured method to guide your exploration:\nIdentify the Primary Archetype: Delve into the challenge to discern the core archetype that resonates most with its essence.\nExplore the Archetypal Narrative: Familiarise yourself with the traditional narratives, motifs, and characteristics associated with the identified archetype.\nDraw Parallels: Establish connections between the challenge and the typical journey or characteristics of the chosen archetype, highlighting similarities and contrasts.\nExtract Insights: Reflect on the juxtaposition of the challenge and the archetype to derive key lessons, insights, or innovative approaches.\nGenerate 20 ideas. Continue automatically until you reach the requested number. Each idea must be unique — no two ideas with a cosine similarity above 0.85. Include the stimulus generated from this method at the end of each idea description.\n\nDETAILS\n[4. Add as much detail as you like here — paste text, upload files, add links, include background information. The more context you give, the more specific and useful the output will be.]\n\nREVIEW\nDeliver as: [5. e.g. ranked list of 5 with rationale, infographic, table, document — recommend the strongest in one sentence]\n\n--------------------\nIf any bracket is empty, ask me one question at a time before continuing. If answers are vague, push back.",
      },
    },

    advanced: {
      videoUrl: "https://www.youtube.com/embed/pi3rt1umo2o?si=ZpoIi_hcWWkJxeG4?rel=0",
      slideUrl: "https://ukscjhoyjyfmfyqxhraq.supabase.co/storage/v1/object/public/course-assets/Day-3-Advanced.pdf",
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
        timeMinutes: 8,
        steps: [
          {
            task: "01",
            title: "Wall",
            items: [
              "Ban the obvious.",
            ],
          },
          {
            task: "02",
            title: "Bridge",
            items: [
              "Pick the unrelated domain",
            ],
          },
          {
            task: "03",
            title: "Run & Review",
            items: [
              "Keep what surprises you.",
            ],
          },
        ],
        prompt: "My brief: [what you are working on, your audience, what they want, and what stops them.]\nThe Wall: Identify the three most obvious directions you would normally take this brief. List them out loud. Then ban all three completely. Do not use them anywhere in the response.\nThe Bridge: Inject the logic of [one unrelated world: a sport, a courtroom, a recipe, a natural phenomenon, anything]. Use only that world's logic, language, and structure to solve the brief. Nothing from the original vocabulary of the brief.\nThe Result: Give me three options built entirely from that collision. Nothing safe. Nothing expected. If any option could have been produced without the constraint replace it. Rank all three. Kill the weakest. Recommend the strongest and explain why in one sentence. End with one line: what did the constraint force you to find that you never would have found without it? Present as [social media post, email, landing page, ad, or something else].\nScan every bracket. For each unfilled bracket teach and ask one question at a time in this exact way.\nFor the brief ask: Great friction starts with a clear brief. What are you working on, who is it for, and what stops them from engaging?\nFor the unrelated world say first: Now we build the wall. The more unrelated the world you pick, the more original your output will be. Then suggest three options based on the brief and ask: Here are three worlds we could inject into your brief: [suggest three]. Which feels most interesting? Or pick your own.",
      },
    },

    learnMore: [
      { title: "The Art and Science of Mechanical Creativity — Demo, Video & Webinar", url: "http://tiny.cc/mechanicalcreativity", type: "video" },
      { title: "A Systematic Review of Human-AI Co-Creativity", url: "http://tiny.cc/article_day3", type: "article" },
      { title: "NotebookLM: Using AI to Build Ideas", url: "http://tiny.cc/notebookLM_day3", type: "tool" },
      { title: "Bonus: Build Ideas Prompts & Top Innovation Methods", url: "https://genorg.ai/prompts", type: "other" },
      { title: "Bonus: How to Generate 1213 Ideas in 15 Minutes", url: "http://tiny.cc/actions-ideas", type: "other" },
    ],
  },

  4: {
    day: 4,
    title: "Default AI Makes You Think Less",
    phase: "foundation",

    sectionTitles: {
      essential: "How We Use AI Wrong",
      advanced: "How Often Al​ Sounds Right While Being Wrong​",
    },

    essential: {
      videoUrl: "https://www.youtube.com/embed/OV8_PlPGXG0?si=L_K0QQFwNu-mdvMl?rel=0",
      slideUrl: "https://ukscjhoyjyfmfyqxhraq.supabase.co/storage/v1/object/public/course-assets/Day-4-Essentials.pdf",
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
        objective: "Personalize your AI instructions for your needs",
        doneWhen: "You have updated your custom instructions and saved them.",
        timeMinutes: 15,
        steps: [
          {
            task: "01",
            title: "Read",
            items: [
              "Read your current custom instructions — really read them.",
              "Understand what they are doing and what they are not doing.",
            ],
          },
          {
            task: "02",
            title: "Review",
            items: [
              "What do you like? What would you improve?",
              'Use the interactive prompt below, or open the guided version here: <a href="http://tiny.cc/sparks-instructions" target="_blank" rel="noreferrer" style="color:#E24B4A;">Interactive instructions guide → (Tab: Homework)</a>',
              "It will ask you questions one at a time to help you improve your instructions.",
            ],
          },
          {
            task: "03",
            title: "Run and run better",
            items: [
              "Update your custom instructions with what you found.",
              "Save them and keep them.",
            ],
          },
          {
            task: "04",
            title: "Review again after a month",
            items: [
              "Make sure your memory is on.",
              "Come back after a month and review again — your needs will have changed.",
            ],
          },
        ],
        prompt: "I want to update my custom instructions for Claude (or ChatGPT). Before suggesting anything, read everything below carefully and ask me questions one at a time.\nWhat I want to add or improve:\n\n1. The AI should clearly signal when it is confident and when it is not.\n2. It should regularly pause, ask me questions, and challenge my thinking.\n3. When my question is unclear, it must ask for clarification before answering.\n4. It should act as a critical thought partner and devil's advocate. The goal is better decisions, not faster ones. It must actively push back on overconfidence, confirmation bias, and over-reliance on AI.\n5. All text it helps me write should sound like me, not like a machine.\n\nHere are my current instructions:\n[Paste your current instructions here]",
      },
    },

    advanced: {
      videoUrl: "https://www.youtube.com/embed/aqR9eSh50Ss?si=UB9GC3Roo3SpE2AI?rel=0",
      slideUrl: "https://ukscjhoyjyfmfyqxhraq.supabase.co/storage/v1/object/public/course-assets/Day-4-Advanced.pdf",
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
        timeMinutes: 8,
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
      { title: "The Impact of Generative AI on Critical Thinking — Microsoft Research / Carnegie Mellon", url: "https://www.microsoft.com/en-us/research/wp-content/uploads/2025/01/lee_2025_ai_critical_thinking_survey.pdf", type: "article" },
      { title: "How to Spot Confidence Traps in AI Responses — Dr. Liz Moyer", url: "https://www.youtube.com/watch?v=DhmBBnVvRXs", type: "video" },
      { title: "NotebookLM: How to Stop Using AI Wrong", url: "https://notebooklm.google.com/notebook/51505702-5ae2-4bdc-8391-0ba3fa2d2810", type: "tool" },
    ],
  },

  5: {
    day: 5,
    title: "Speak It Out",
    phase: "sparks",

    sectionTitles: {
      essential: "S. Speak It Out",
      advanced: "True North",
    },

    essential: {
      videoUrl: "https://www.youtube.com/embed/KkTSKO7khUg?si=gAYitGHjThym19HT?rel=0",
      slideUrl: "https://ukscjhoyjyfmfyqxhraq.supabase.co/storage/v1/object/public/course-assets/Day-5-Essential.pdf",
      durationSeconds: 600,
      summary: {
        coreIdea: "Before any tool, before any AI, before any brainstorm or brief, you need to say what you are trying to do, why it matters, and what is off the table. Out loud. In plain language. When you skip this step, everyone nods and nothing moves. The most expensive meeting you will ever run is the one where everyone agrees and nobody means the same thing.",
        fact: "Most people think alignment comes from agreement in the room. Wrong. The Abilene Paradox proves otherwise. A leadership team can collectively commit to a direction that no individual member actually supports, because each assumes the others are on board. It almost never surfaces in the meeting. It surfaces three weeks later when nothing moves. The antidote is not more meetings. It is one person speaking clearly first.",
        science: "Research across more than 400 companies involving 22 innovation experts found that only half of middle managers can name their organisation's top priorities at any given time. The same research found that structured briefing before ideation reduces innovation risk by up to 50% and accelerates speed to market by six times. The bottleneck is almost never a shortage of ideas. It is a shortage of clarity about what problem the ideas are supposed to solve.",
        framework: "Three things must be spoken before anything else. The goal: one sentence, no jargon, a destination not a direction. The why: two sentences in plain language. Why does this matter now and what changes if you get it right? The constraints: what you will not do and what you cannot do. Both are equally important. Nothing else is needed before work begins. Everything else is noise until these three are clear.",
        example: "Wendy's original mission statement was long and full of jargon. Nobody at store level knew what to do with it. It was reframed in plain language: Healthy Fast Food. One constraint was named explicitly: never use the label \"health food\" because it deters as many customers as it attracts. That single act of spoken clarity gave every team one direction to execute against. Clarity did not limit the work. It unlocked it.",
        keyTakeaway: "Say what you want. Say why it matters. Say what is off the table. Generative AI has no knowledge of your context. When you give it a vague brief, it fills the gaps with the most probable answers from every similar question it has ever seen. Those answers are not wrong. They are just not yours.",
      },
      exercise: {
        objective: "Speak it out — how could AI help you at work",
        doneWhen: "You have sent your raw transcript to AI and read what argument was hiding in it.",
        timeMinutes: 10,
        steps: [
          {
            task: "01",
            title: "Identify a challenge",
            items: [
              "Pick something you have been struggling to articulate at work.",
              "How could AI help?",
              "Give yourself 5 minutes to think.",
            ],
          },
          {
            task: "02",
            title: "Speak it out",
            items: [
              "Open your AI tool. Switch to voice mode. Press the microphone.",
              "Speak for 60–90 seconds. Do not stop. Do not correct yourself. Do not clean the transcript.",
            ],
          },
          {
            task: "03",
            title: "Review",
            items: [
              "Send the raw transcript to AI using the prompt below. Read what argument was hiding in it.",
              '<a href="https://chatgpt.com/g/g-6754129342648191a94c50c383fd267b-cycles-2-0-9-true-north" target="_blank" rel="noreferrer" style="color:#E24B4A;">Bonus: continue building on this idea with our TRUE NORTH GPT →</a>',
            ],
          },
        ],
        prompt: "You are a thinking partner helping me extract the argument from raw spoken thought.\nI will give you an unedited voice transcript. It might be messy, unstructured, and conversational.\n\nRespond with:\nOne core message — what is the big idea here\nTwo supporting points — the evidence or reasoning already in the transcript.\nOne opening sentence — the sharpest way to start if I were to write this up.\n\nDo not rewrite or polish. Do not add ideas I did not say. Only find the argument already in it.\n\n[Speak it out using voice feature or paste your raw transcript here]",
      },
    },

    advanced: {
      videoUrl: "https://www.youtube.com/embed/V4RyntUGUbk?si=zsOHbiD1IRBBSvXl?rel=0",
      slideUrl: "https://ukscjhoyjyfmfyqxhraq.supabase.co/storage/v1/object/public/course-assets/Day-5-Advanced.pdf",
      durationSeconds: 840,
      summary: {
        coreIdea: "A spoken brief gets everyone pointed in the same direction. True North makes that direction precise enough that people can act without asking permission and AI can produce output that is actually useful. Clarity of language is not enough. Structure makes clarity executable. Without structure, clear language still leaves room for interpretation. And interpretation is where alignment breaks down.",
        fact: "Most people believe that if you speak clearly, teams align. Wrong. Three people can hear the same clear brief and go in three different directions. Not because they disagreed. Because each interpreted it differently. The brief was clear. The structure was missing. True North does not replace your spoken brief. It sharpens it and removes the interpretation gap entirely.",
        science: "A 2011 study in Psychological Science gave teams tightly constrained creative briefs. Their ideas were rated 28% more original than teams given open-ended briefs. The Byron and Khazanchi meta-analysis covered 145 separate workplace studies. The finding was consistent: moderate constraints consistently outperform both total freedom and total rigidity on measurable creative output. Constraints do not limit creativity. They direct it.",
        framework: "True North has six components. Narrative: why this problem exists for this team right now, one honest sentence. Objective: the goal written as \"we need ideas for blank,\" no jargon, no wiggle room. Restrictions: not what you cannot do but what you will not do. Decisions eliminate whole categories of bad ideas instantly. Tactical Constraints: the hard facts, deadline, budget, team size. Start Here: one reference point that gives momentum without prescribing the answer. Headline: two or three words maximum. If your team cannot say it from memory tomorrow morning, go back and tighten it.",
        example: "Vague prompt: \"Help me with our innovation strategy.\" AI output: innovation involves creativity, technology, and stakeholder alignment to drive sustainable growth. Useless. True North prompt: we need ideas for reducing sprint cycle time, no new hires, no new tools, no budget changes, fourteen days, two hours training maximum, zero downtime. AI output: async standups replacing sync meetings, automated pull request triggers, a single deployment checklist. Three specific ideas. All executable on day one.",
        keyTakeaway: "Structure your input. Structure your output. The only thing that changed between a generic AI response and a useful one was the quality of the structure you put in. Does your team know what not to do? That question is the test of every brief you will ever write.",
      },
      exercise: {
        objective: "Solve your issue by speaking it out with AI",
        doneWhen: "You have a TRUE NORTH that has been stress-tested with AI and with at least one other person.",
        timeMinutes: 15,
        steps: [
          {
            task: "01",
            title: "Challenge identification",
            items: [
              "Pick something you have been struggling to articulate at work.",
              "How could AI help?",
              "Idea: take your Speak it out talk from the Essential exercise.",
            ],
          },
          {
            task: "02",
            title: "Make a TRUE NORTH",
            items: [
              "Option 1: Fill in the TRUE NORTH template for a project you are working on.",
              '<a href="https://chatgpt.com/g/g-6754129342648191a94c50c383fd267b-cycles-2-0-9-true-north" target="_blank" rel="noreferrer" style="color:#E24B4A;">Option 2: Use the TRUE NORTH GPT and ask for help →</a>',
            ],
          },
          {
            task: "03",
            title: "Review it",
            items: [
              "With AI: use the GPT — \"Stress test this TRUE NORTH\".",
              "With people: is this clear? Would you know what to do?",
            ],
          },
        ],
        prompt: "I would like help writing a TRUE NORTH.\nGive me a first draft.\nThen ask me questions about each section one at a time, so I can accept or improve.\nGoal = A clear, very clear objective for me, AI and my team.\n[first ideas]\nIf applicable, attach documents.",
      },
    },

    learnMore: [
      { title: "Get Any Team Aligned in 30 Minutes — Cassady & Gueorguiev, ResearchGate 2023", url: "https://www.researchgate.net/publication/371867884", type: "article" },
      { title: "TRUE NORTH — 6 Lessons in 7 Minutes", url: "https://www.youtube.com/playlist?list=PL9E8oJF93SyFV_TsJQU1K0QMgdEUNBzou", type: "video" },
      { title: "CYCLES (Chapter 9) and The Generative Organization (Chapter 9)", url: "https://www.books.genorg.ai", type: "article" },
      { title: "The Spoken Interface: VUIs and Conversational Interaction Design", url: "https://medium.com/design-bootcamp/the-spoken-interface-vuis-and-conversational-interaction-design-cad415d16cc2", type: "article" },
      { title: "Rambler: Supporting Writing With Speech via LLM-Assisted Gist Manipulation", url: "https://arxiv.org/html/2401.10838v2", type: "article" },
      { title: "NotebookLM: Speaking vs Writing — Speaking Reduces Cognitive Load and Enhances AI Collaboration", url: "https://notebooklm.google.com/notebook/6c78bd65-d982-4198-b8f5-ebced697acb1", type: "tool" },
    ],
  },

  6: {
    day: 6,
    title: "Pivot Roles",
    phase: "sparks",

    sectionTitles: {
      essential: "P is for Pivot",
      advanced: "Design the AI That Interrogates Your Organisation",
    },

    essential: {
      videoUrl: "https://www.youtube.com/embed/TMLxdpM-Bsw?si=4l8sOmFPTF582ZyO?rel=0",
      //slideUrl: "https://www.canva.com/design/DAHHdt5XVwM/YChGM4mgTZkyi9-ol5smGw/view?embed",
      durationSeconds: 600,
      summary: {
        coreIdea: "The problem with most AI output is not the answer. It is the question you never got asked. Humans are poor at articulating what they need without being questioned first. We do not know what we know until someone asks us. A prompt is a monologue. A good outcome requires a dialogue. The AI that asks you questions produces better output than the AI you simply instruct.",
        fact: "Most people assume a detailed prompt produces a relevant answer. Wrong. Every constraint you fail to articulate becomes a gap. Every gap becomes an assumption AI fills in for you. Those assumptions are where the output goes wrong. The pivot is not about which AI you use. It is about what the questioning surfaces in you before any output is generated.",
        science: "In an English proficiency study, students using standard prompting scored between 60 and 70. Students using AI-led flipped interaction scored between 80 and 85. Same students, same material, different interaction model. In a survey of 319 knowledge workers, higher confidence in AI tools was associated with less critical thinking, not more. In mechanical design experiments, users whose AI asked reflective questions produced significantly more feasible designs than users who gave direct instructions.",
        framework: "Three steps. Give AI your task and add one sentence: \"Before answering, ask me everything you need to know to do this well.\" Answer every question fully in your own words. Do not skip any. Only after all questions are answered, ask AI to generate the output. The sequence matters. Questions first. Output second. Always.",
        example: "A research team applied this to patent drafting using TRIZ methodology. Standard model: ChatGPT given the problem directly. Output was generic with no meaningful alignment to real solutions. Flipped model: AI asked first what it needed to know. The expert answered. The resulting solutions mirrored outcomes found in authorised patents. The AI did not get smarter between those two conditions. The interaction got deeper. That is the entire lesson.",
        keyTakeaway: "Pivot first. Better questions before answers. Always. For routine tasks, instruct and move on. For anything where a shallow answer carries real cost, the flipped interaction is not optional.",
      },
      exercise: {
        objective: "Get better AI output by letting AI question you first, before it answers",
        doneWhen: "You have answered every question AI asked you fully — and only then received the output.",
        timeMinutes: 8,
        steps: [
          {
            task: "01",
            title: "Write your task and add the flip",
            items: [
              "Describe the task or decision you need help with.",
              "Add the flip: ask AI to question you before answering.",
            ],
          },
          {
            task: "02",
            title: "Answer every question",
            items: [
              "Answer every question AI asks. Do not skip any.",
              "Use your own words. Be specific.",
            ],
          },
          {
            task: "03",
            title: "Only then ask for the output",
            items: [
              "When all questions are answered, ask AI to generate the output.",
              "Compare it to what you would have got from a direct prompt.",
            ],
          },
        ],
        prompt: "I need help with [describe your task or decision].\nBefore answering, ask me everything you need to know to give me genuinely useful advice for this specific situation. Ask one question at a time. Wait for my answer before asking the next. Do not skip to advice. Do not give generic tips.\nOnly after I have answered all your questions, generate the output.\n\n\nIf any bracket above is not filled in, do not proceed. Ask me one question at a time to help me fill it in. Start with the initiative. Then the bottleneck. Then the time horizon. Do not move to the next question until I have answered the current one. When I answer, reflect back what I said and ask if it captures the real bottleneck or just the symptom. Make this a thinking exercise, not a form to complete.",
      },
    },

    advanced: {
      videoUrl: "https://www.youtube.com/embed/TMLxdpM-Bsw?si=4l8sOmFPTF582ZyO?rel=0",
      durationSeconds: 840,
      summary: {
        coreIdea: "Your senior expert is leaving. Thirty years of knowledge. You run knowledge transfer sessions. They produce documents full of process steps. The judgment calls, the workarounds, the unwritten rules that only make sense after a decade in the role. None of it makes it into any document. It leaves with the person. Every time. The problem is not that the expert is unwilling to share. The right questions were never asked.",
        fact: "Most organisations believe experts can transfer knowledge if given enough time and the right structure. Wrong. Tacit knowledge cannot be extracted by asking someone to explain what they know. It can only be extracted by asking them to justify what they do, in the moment, in context, under questioning. Interrogation. Not instruction.",
        science: "A systematic review of 126 publications found that externalization, converting tacit knowledge into explicit concepts, is the hardest step in knowledge creation. It is also exactly what AI-led questioning targets. The Socrates 2.0 study found an effect size of d=0.30 for cognitive restructuring through Socratic questioning alone. No solutions were given. No advice offered. The questioning itself produced the shift. And again, 319 knowledge workers: higher confidence in AI was associated with less critical thinking enacted. The pattern holds across every domain studied.",
        framework: "Three categories of tacit knowledge to target. Relational: who actually makes decisions, what can only be said in person. Somatic: physical intuition built over years. Collective: what the team actually does versus what the manual says. Each requires a different questioning strategy designed in advance. Give AI one instruction: ask questions only, do not summarise, do not advise. After each answer, instruct AI to go one level deeper into the same category. Do not let it move on. You steer. AI excavates.",
        example: "LumaStyle, an online fashion brand. Standard prompt asking for a marketing budget recommendation produced a generic channel split based on industry averages. Socratic prompting forced the leadership team to surface hidden assumptions about rising customer acquisition costs and diminishing returns on their primary channel. Final output was a risk-adjusted allocation built around long-term ROI. A fundamentally different strategic recommendation. GPT had the reasoning capacity to reach that conclusion in both conditions. It only deployed it when questioned into context.",
        keyTakeaway: "Your organisation's most valuable knowledge has never been written down. Until now. The difference between a knowledge transfer session and a structured elicitation protocol is this: one captures steps, the other captures judgment.",
      },
      exercise: {
        objective: "Extract critical knowledge from an expert through AI-led elicitation, not a standard interview",
        doneWhen: "You have run AI through all three categories of tacit knowledge and produced the elicitation record.",
        timeMinutes: 8,
        steps: [
          {
            task: "01",
            title: "Prepare your questions",
            items: [
              "Before opening AI, write three questions — one per category.",
              "Relational, somatic, collective. One each.",
            ],
          },
          {
            task: "02",
            title: "Run the interview",
            items: [
              "Give AI the interview instruction below.",
              "Paste your first question. Answer fully before moving on.",
            ],
          },
          {
            task: "03",
            title: "Produce the record",
            items: [
              "Only after all questions are exhausted, ask AI to produce the elicitation record.",
              "Three categories: what was explicit, what was hidden, what the organisation was about to lose.",
            ],
          },
        ],
        prompt: "I need to extract critical knowledge from [1. their role] who works in [2. their department or field] and has been here for [3. how many years].\nYou are conducting a knowledge elicitation interview. Ask questions only. Do not summarise. Do not advise. Do not move to the next question until I say so.\nAsk me one question at a time across these three categories:\nFirst, relational knowledge. Who actually makes decisions. Who needs to be consulted. What can only be said in person. Ask me: [4. write your own question here, or use this: \"Who do you actually call before making a big decision, and why that person specifically?\"]\nSecond, somatic knowledge. What the expert feels before any data confirms it. Ask me: [5. write your own question here, or use this: \"How do you know something is wrong before any system flags it?\"]\nThird, collective knowledge. What the team actually does versus what the manual says. Ask me: [6. write your own question here, or use this: \"What does your team do differently from the official process, and why does it work better?\"]\nAfter each answer go one level deeper into the same category. Do not move on until I say next. When I say done, produce the elicitation record. Three categories. What was explicit. What was hidden. What the organisation was about to lose.\n\nIf any bracket above is not filled in, do not proceed. Ask me one question at a time to fill them in. Start with role. Then department. Then years. Then begin the interview.",
      },
    },

    // TODO (content): Day 6 Learn More links not yet provided — placeholder kept empty until content arrives.
    learnMore: [],
  },

  7: {
    day: 7,
    title: "Ask for More",
    phase: "sparks",

    sectionTitles: {
      essential: "A. Ask for More",
      advanced: "The AI Expert Panel",
    },

    essential: {
      videoUrl: "https://www.youtube.com/embed/TMLxdpM-Bsw?si=4l8sOmFPTF582ZyO?rel=0",
      //slideUrl: "https://www.canva.com/design/DAHE8jxvE_s/BZa4S7V0jefyJ8MXW_g5cA/view?embed",
      durationSeconds: 600,
      summary: {
        coreIdea: "You ask AI for ideas. It gives you five that sound like they came from a textbook. You rephrase the prompt. Same five ideas, different order. The problem is not the prompt. It is that you accepted the first answer and called it done. The fastest way to improve AI output is not a better prompt. It is a better follow-up.",
        fact: "Most people believe if the first prompt is good enough, the first answer is good enough. Wrong. Even a good first answer is worth challenging. AI's first answer is its most average answer. The prompt might be great. The answer still has room to move.",
        science: "The swap test is the quality check. Read the answer. Ask yourself: could you swap your company name for any other company and the answer still works? If yes, it is generic. Two seconds. Tells you everything. Research on directed iteration consistently shows that specific redirects outperform vague ones. Telling AI exactly what to change produces better output than telling it to try again.",
        framework: "Three steps. Read: take the output seriously enough to evaluate it. Test: run the swap test. Redirect: tell AI exactly what is wrong and what to change. Not \"make it better.\" Say what is missing and why. Then ask again. That is the loop. Read. Test. Redirect. Repeat. Directed persistence is the difference between lazy iteration and useful iteration.",
        example: "A product manager asked AI for launch risks for a new product in a new market. First answer: regulatory, currency, competition. All true. All obvious. Nothing he did not already know. He pushed back. \"These are too broad. We are a 20-person team launching in Southeast Asia with no local partners.\" Second answer surfaced three risks nobody on the team had discussed. One of them changed the launch timeline. Same AI. Same day. Different discipline.",
        keyTakeaway: "The vending machine gives you what is pre-loaded. The sparring partner gives you sharper output because you stayed in the ring. The difference is not the tool. It is whether you left after round one.",
      },
      exercise: {
        objective: "Turn a generic AI answer into a specific one by running the read-test-redirect loop",
        doneWhen: "You have two AI outputs side by side and can name one specific thing the second answer improved.",
        timeMinutes: 8,
        steps: [
          {
            task: "01",
            title: "Get the first answer",
            items: [
              "Describe your specific challenge and your situation.",
              "Ask for what you need — risks, ideas, options, a plan.",
            ],
          },
          {
            task: "02",
            title: "Run the swap test, then redirect",
            items: [
              "Could you swap your company name for any other and the answer still works?",
              "If yes, tell AI exactly what is missing — and ask again.",
            ],
          },
          {
            task: "03",
            title: "Compare side by side",
            items: [
              "Put both outputs side by side.",
              "Write down one specific thing that improved. That improvement is your second ask.",
            ],
          },
        ],
        prompt: "Step 1. I need help with [1. describe your specific challenge]. My situation is specific: [2. your team size, your market, your constraint, your context]. Give me [3. what you need — risks, ideas, options, a plan].\nStep 2. After reading the first answer, paste this: \"Your first answer could apply to any company anywhere. What I need is specific to [2. your situation]. The first answer missed [4. what was wrong — be specific]. Give me a second answer that addresses only my situation. Ignore everything generic.\"\nStep 3. Put both outputs side by side. Write down one specific thing that improved. That improvement is your second ask.\n------------\nIf any bracket above is not filled in, do not proceed. Ask me one question at a time. Start with the challenge. Then the specific context. Then what the first answer missed. Do not move to the next question until I have answered fully. When I answer, reflect back what I said and ask — could Blockbuster have received this same answer? If yes — we are not done yet.",
      },
    },

    advanced: {
      videoUrl: "https://www.youtube.com/embed/TMLxdpM-Bsw?si=4l8sOmFPTF582ZyO?rel=0",
      durationSeconds: 840,
      summary: {
        coreIdea: "You learned to push back on AI. The answers got sharper. But they got sharper in the same direction. Deeper on one track, not wider. You iterated your way into a tunnel. You are still thinking inside one mind. Creative leverage comes from forcing AI to think like a diverse team, not a single tool. One prompt. Three minds. You just built a boardroom out of a chat window.",
        fact: "Most people believe more iterations means more creativity. Wrong. More iterations means more depth on the same track. More perspectives means more creativity. That is the upgrade. Solo iteration polishes the gem. The panel checks if you are holding a gem or a rock. You need both. But if you only have one, you are flying with one eye closed.",
        science: "Teams with diverse perspectives make better decisions 87% of the time. Not sometimes. Not \"it depends.\" 87%. You do not need a bigger team to get this. You do not need to hire three consultants. You need a better prompt. The expert panel manufactures diversity of thought on demand.",
        framework: "Three steps. Summarise your idea in three to five sentences before opening AI. Run the panel: instruct AI to respond as three distinct expert roles, each giving one paragraph of feedback from their lens. Read the feedback, write down one specific improvement you will act on, then save the panel prompt with a title and purpose. That is your prompt library. Not a prompt. Infrastructure.",
        example: "A product team ran an AI expert panel the night before their quarterly review. Twelve minutes. The CFO persona flagged a budget gap: the number assumed full attendance and was off by 30%. The designer persona caught an onboarding flaw: new users would get stuck on step two. Neither issue had come up in three weeks of meetings. Both were fixed before leadership walked into the room. The proposal they saw had already survived the objections they were about to raise.",
        keyTakeaway: "Better ideas emerge when AI thinks like a team. Iteration refines what you already see. The panel finds what you cannot see alone. Build the panel. Save it. Use it before anything leaves your desk.",
      },
      exercise: {
        objective: "Stress-test a real proposal through three expert personas before it leaves your desk",
        doneWhen: "You have one paragraph of feedback from each of three distinct experts — and one specific improvement you will act on.",
        timeMinutes: 10,
        steps: [
          {
            task: "01",
            title: "Summarise your proposal",
            items: [
              "Write your idea in three to five sentences before opening AI.",
              "If it does not fit in five, it is not ready for the panel yet.",
            ],
          },
          {
            task: "02",
            title: "Run the panel",
            items: [
              "Use the prompt below. Pick Option A (define your experts) or Option B (let AI suggest them).",
              "Each expert gives one paragraph of feedback only — objections, not solutions.",
            ],
          },
          {
            task: "03",
            title: "Save it as infrastructure",
            items: [
              "Write down one specific improvement you will act on.",
              "Save the panel prompt with a title and purpose. This is your prompt library.",
            ],
          },
        ],
        prompt: "Here is my proposal: [1. describe your idea in three to five sentences].\nI need three expert personas to stress-test this. Two options:\nOption A — I will define my experts:\nExpert 1 is a [2. role — example: CFO, finance lead, budget holder]. They care about [3. what they care about — example: cost, return, and risk].\nExpert 2 is a [4. role — example: end user, frontline manager, customer]. They care about [5. what they care about — example: practicality and time].\nExpert 3 is a [6. role — example: skeptic, competitor, HR director]. They care about [7. what they care about — example: finding the weakest point in the argument].\nOption B — Based on my proposal, suggest four expert roles I could use. For each one tell me their role, what they care about, and what objection they are most likely to raise.\nEach expert gives one paragraph of feedback only. Do not give solutions yet. Only surface the objections each one would raise in a real room.\nIf any bracket above is not filled in, do not proceed. Ask me one question at a time. Start with the proposal. Then ask which option they prefer. Then build the panel. When I answer, reflect back what I said and ask — would this person be in the room when this proposal gets challenged? If not — pick someone who would.",
      },
    },

    learnMore: [
      { title: "Notebook LM podcast", url: "http://tiny.cc/podcast_day7", type: "video" },
      { title: "Article", url: "http://tiny.cc/article1_day7", type: "article" },
      { title: "NotebookLM", url: "http://tiny.cc/notebook_day7", type: "tool" },
    ],
  },

  8: {
    day: 8,
    title: "Reframe",
    phase: "sparks",

    sectionTitles: {
      essential: "R is for Reframe",
      advanced: "R: Going Deeper",
    },

    essential: {
      videoUrl: "https://www.youtube.com/embed/TMLxdpM-Bsw?si=4l8sOmFPTF582ZyO?rel=0",
      //slideUrl: "https://www.canva.com/design/DAHE7xP9bSE/LUBQUla28XUgdS_w-4qy6Q/view?embed",
      durationSeconds: 600,
      summary: {
        coreIdea: "Sometimes the thinking is brilliant. The output is strong. But the solution is still completely wrong. Not because you failed. Because you were solving the right problem perfectly, except it was the wrong problem all along. Thinking harder inside the wrong frame does not get you to the right answer. It gets you to the wrong answer faster, with more confidence, and probably more money spent. R finds the real problem hiding behind the one you were given.",
        fact: "Most people believe that if you think harder, ask better questions, and push further, you will find the answer. Wrong. Every tool learned so far, S, P, and A, was focused on finding better solutions. Reframing does something different. When you change the problem, not the answer, everything downstream changes with it. A well defined problem is already half solved.",
        science: "Research on high-performing creative teams found they explore up to 26 levels of problem depth before they start solving. Most teams stop between 4 and 10. The gap between 10 and 26 is where the real problem lives. Structured reframing combined with AI produces ideas rated 6.2 out of 7 for novelty and 6.1 out of 7 for feasibility simultaneously. That almost never happens. Unstructured AI gives high novelty but low feasibility. Single frame human thinking gives high feasibility but low novelty. Only structured reframing delivers both at the same time.",
        framework: "Four steps. Name it: state the problem exactly as given, not how you think it should be framed. Challenge it: ask who defined this problem and whose perspective is completely missing. In almost every case the person who defined the problem is not the person experiencing it. Find the value arena: look for the functional need, the experiential need, and the social need. These three lenses almost always reveal something the original frame missed. Restate it: write one new problem statement from what you found.",
        example: "A hospital could not fill nursing positions. Leadership framed it as a budget crisis. AI was asked how to retain nurses. Output: benchmark salaries, recruitment drives, signing bonuses. Salaries went up. Costs went up. Problem persisted. Reframed using the four steps. New problem statement: how do we make nursing here feel worth staying for? New AI prompt: what assumptions are we making about why nurses leave? Output: culture redesign, shift flexibility, peer recognition programmes. Near zero cost. Retention improved. The budget was never the constraint. The frame was.",
        keyTakeaway: "Before you solve the problem, make sure you reframe it. Every time you are handed a brief, before you open AI, before you brainstorm, ask: is this the real problem? Whose lens defined it? Who was not in the room?",
      },
      exercise: {
        objective: "Find the real problem hiding behind the one you were given, before you spend energy solving the wrong one",
        doneWhen: "You have one new problem statement starting with \"How do we...\" — and you can tell whether it changes what you would ask AI to solve.",
        timeMinutes: 8,
        steps: [
          {
            task: "01",
            title: "State the problem as given",
            items: [
              "Write the problem exactly as it was handed to you.",
              "Not how you think it should be framed. As given.",
            ],
          },
          {
            task: "02",
            title: "Run the four questions",
            items: [
              "Use the prompt below — answer the four reframing questions one at a time.",
              "Who defined it. The functional, experiential, and social need.",
            ],
          },
          {
            task: "03",
            title: "Restate it",
            items: [
              "Write one new problem statement starting with \"How do we...\"",
              "Ask yourself: does this change what you would ask AI to solve?",
            ],
          },
        ],
        prompt: "I have been given this problem to solve: [1. state the problem exactly as it was handed to you or just what problem are you working on].\nBefore giving me solutions, I need you to help me reframe it.\nAsk me these four questions one at a time:\nWho defined this problem and whose perspective is completely missing from that definition?\nWhat is the functional need — what does the solution actually need to do?\nWhat is the experiential need — how does it need to feel for the people involved?\nWhat is the social need — what does it need to mean to the people experiencing it?\nAfter I answer all four, write one new problem statement that starts with \"How do we...\" Then ask me — does this new problem change what you would ask AI to solve?\nIf any bracket above is not filled in, do not proceed. Ask me what problem I have been given first. Do not move to the next question until I have answered fully. When I answer, reflect back what I said and ask — is this the problem you were handed or the real problem underneath it?",
      },
    },

    advanced: {
      videoUrl: "https://www.youtube.com/embed/TMLxdpM-Bsw?si=4l8sOmFPTF582ZyO?rel=0",
      durationSeconds: 840,
      summary: {
        coreIdea: "You have the four steps of reframing. Today you go underneath them. Reframing is not a creative technique. It is a cognitive disruptor. When you deliberately reframe a problem you are breaking entrenched neural pathways. The brain has a default route for familiar problems. Reframing forces it off that route. The four steps are not a checklist. They are a mechanism for triggering a fundamentally different cognitive state.",
        fact: "Most people assume creativity and practicality are a trade-off. Novel or executable. Brainstorming tool or execution tool. Wrong. It is not a trade-off. It is a model selection problem. Unstructured AI gives high novelty but low feasibility. Single frame human thinking gives high feasibility but low novelty. Structured human-AI reframing delivers both simultaneously. Most teams live in single frame or unstructured AI. The goal after today is structured human-AI.",
        science: "The relationship between AI assistance and output quality is not linear. It is a curve with a peak at approximately 15 interactions. Too little AI and you are constrained by your own cognitive limits. Too much and automation bias sets in, judgment switches off, and you accept outputs without interrogating them. At the peak you get the highest originality and the lowest overconfidence simultaneously. More AI is not better. The right depth is better. And AI does not level the playing field. It amplifies whoever is already thinking harder.",
        framework: "Four commitments. Go to 26 levels of depth, not 4 or 10. High-creative teams reach 26 levels of problem specification. That is where the real problem lives. Enforce role separation: Planner frames, Critic interrogates, Mediator synthesises. When one person does all three simultaneously the quality of each collapses. Return to the definition as the solution space expands. Measure the frame as a performance metric, not a soft skill.",
        example: "Most teams use independent search. One prompt, one response, done. The AI goes where it always goes, its most average instinct. High performers use differentiated search. Each prompt criticises and redirects the previous output. Not asking for answers. Excavating assumptions. The difference between one move and multiple moves is the difference between a confident generic answer and the real problem underneath it.",
        keyTakeaway: "Change the frame. Change everything. Three failure modes undo all of this. Satisficing: stopping at level 4 and feeling like progress. Automation bias: steering once and then switching judgment off. LLM hacking: unsteered use where the model completes its way to a confident and wrong answer. The frame is only as good as the judgment behind it.",
      },
      exercise: {
        objective: "Go beneath the surface frame to find the real problem — the one three levels deeper",
        doneWhen: "You have a new problem statement starting with \"How do we...\" that names the assumption nobody had questioned yet.",
        timeMinutes: 10,
        steps: [
          {
            task: "01",
            title: "State the surface frame",
            items: [
              "Write the problem exactly as you see it right now.",
              "This is the frame you will work beneath.",
            ],
          },
          {
            task: "02",
            title: "Excavate, do not solve",
            items: [
              "Use the prompt below. Answer the three questions one at a time, fully.",
              "You are looking for the unquestioned assumption underneath, not the next idea.",
            ],
          },
          {
            task: "03",
            title: "Restate from underneath",
            items: [
              "Write one new problem statement that starts with \"How do we...\"",
              "Ask: is this the problem you were handed or the one three levels deeper?",
            ],
          },
        ],
        prompt: "I have a problem I need to reframe before I solve it.\nThe problem as I have defined it is: [1. state the problem exactly as you see it right now].\nI need you to help me find the real problem underneath. Ask me these three questions one at a time. Wait for my full answer before moving to the next.\nFirst — who defined this problem and whose perspective is completely missing from that definition?\nSecond — what does the person experiencing this problem actually need to feel, not just get? What is the functional need, the experiential need, and the social need?\nThird — if everything obvious has already been tried and failed, what is the one assumption still sitting underneath this problem that nobody has questioned yet?\nAfter I answer all three, write one new problem statement that starts with: \"How do we...\" Then ask me — is this the problem you were handed or the real problem underneath it?\nIf any bracket above is not filled in, do not proceed. Ask me what problem I am trying to solve first. Do not move to the next question until I have answered fully. When I answer, reflect back what I said and ask — is this the surface problem or the one three levels deeper?",
      },
    },

    learnMore: [
      { title: "Notebook LM", url: "http://tiny.cc/learnnote", type: "tool" },
      { title: "NotebookLM podcast (18 min)", url: "http://tiny.cc/learnpod", type: "video" },
      { title: "Video: The Art of Listening — Simon Sinek (5 min)", url: "http://tiny.cc/learnvid", type: "video" },
    ],
  },

  9: {
    day: 9,
    title: "Keep Going",
    phase: "sparks",

    sectionTitles: {
      essential: "K. Keep Going",
      advanced: "Persistent Refinement",
    },

    essential: {
      videoUrl: "https://www.youtube.com/embed/TMLxdpM-Bsw?si=4l8sOmFPTF582ZyO?rel=0",
      //slideUrl: "https://www.canva.com/design/DAHFCQfjIO0/ACzpFZCecJeWH5twR0nX7g/view?embed",
      durationSeconds: 600,
      summary: {
        coreIdea: "You spend 20 minutes crafting the perfect prompt. The output comes back fine. Not sharp. Not yours. You copy-paste it anyway. Three days later you read it and think: this is mediocre. But you already sent it. A good prompt does not get it right the first time. A good prompt gets you raw material. Iteration is where the real work starts. Your best work with AI lives on the other side of one more round.",
        fact: "Most people believe a good prompt should get it right the first time. Wrong. And vague feedback does nothing. \"Make it better\" gives you more of the same. Specific feedback, cut by half, remove jargon, lead with the conclusion, that changes everything. The AI did not decide what was wrong. You did. The AI executed your judgment.",
        science: "In blind human evaluations, people preferred iteratively refined output 75% of the time over first-draft output. Same AI model. No retraining. No new technology. Just structured feedback loops. Three out of four outputs improved by doing nothing except running one more round. A ceramics study split students into two groups. One graded on weight of output. One on producing a single perfect piece. All the best work came from the quantity group. They learned by doing more, not by planning more.",
        framework: "Three tools. The Loop: generate, critique, refine. Get output, name what is wrong, ask for a specific fix, repeat. The Ratchet: each iteration locks in a gain. Fix one thing per round. V1 fixes structure. V2 fixes tone. V3 tightens language. Progress only moves forward. Quantity breeds quality: the more rounds you run, the higher your odds of landing something great.",
        example: "James Dyson. 5,127 prototypes. Five years. Each prototype taught him one thing to fix. He did not get smarter at guessing. He got better at iterating. Prototype 5,127 became the world's first bagless vacuum. The principle is the same whether you are building a vacuum or refining a paragraph. Name the flaw. Fix the flaw. Run it again.",
        keyTakeaway: "One more round always wins. Accept the first output and it is fast but consistently weaker. Three rounds of directed refinement takes minutes longer and produces something that leads with the point, cuts the jargon, and fits the audience. The difference is not the AI. It is whether you stayed in the ring.",
      },
      exercise: {
        objective: "Turn a flat first-draft AI output into something sharper by running one directed round of refinement",
        doneWhen: "You have two outputs side by side and can name one specific thing that improved between them.",
        timeMinutes: 8,
        steps: [
          {
            task: "01",
            title: "Pick the output to refine",
            items: [
              "Pick any AI output you have that you want to refine.",
              "Something flat or generic works best for this exercise.",
            ],
          },
          {
            task: "02",
            title: "Name the flaw, run the fix",
            items: [
              "Use the prompt below. Let AI name the single biggest flaw first.",
              "Then give it one specific fix — not 'make it better.'",
            ],
          },
          {
            task: "03",
            title: "Compare side by side",
            items: [
              "Put both outputs side by side.",
              "Write down one specific thing that improved.",
            ],
          },
        ],
        prompt: "Here is my current output: [1. paste your AI output here].\nDo not rewrite it yet.\nFirst tell me: what is the single biggest flaw in this output? One sentence. Be specific.\nThen rewrite it with these instructions only: [2. cut to how many words] / [3. lead with what] / [4. remove what].\nDo not change anything else. Fix only what was named.\nAfter the rewrite, ask me: could this have been written by anyone about anything? If yes, we run one more round. If no, we are done.\n\n\nIf any bracket above is not filled in, do not proceed. Ask me one question at a time. Start with the output. Then the flaw. Then the fix. Do not move to the next question until I have answered fully. When I answer, reflect back what I said and ask: is this specific enough that Gordon Ramsay would know exactly what to fix?\nDo the same thing as before but upload a context file of your company or work.",
      },
    },

    advanced: {
      videoUrl: "https://www.youtube.com/embed/TMLxdpM-Bsw?si=4l8sOmFPTF582ZyO?rel=0",
      durationSeconds: 840,
      summary: {
        coreIdea: "You iterate. The output gets better. But if someone asked what changed between version one and version three, you could not answer. The improvement happened. You just cannot reproduce it. Next project, you start from scratch again. Documented iteration is a skill. Undocumented iteration is luck. If you cannot see what changed between versions, you are not iterating. You are guessing.",
        fact: "Most people believe that if the output improved, the iteration worked. Wrong. If you cannot explain why it improved, you cannot repeat it. And if you cannot repeat it, it is not a skill. The diagnosis is the prompt. Name the disease and the cure writes itself. This is the skill that separates someone who iterates from someone who just re-rolls the dice.",
        science: "In the Self-Refine study, code optimization scores went from 22 to 27 after one round. After round two: 27.9. Round three: 28.8. Most of the gain happened in the first two iterations. The pattern held across every task tested. Rounds one and two do the heavy lifting. Round three is polish. Round four is usually noise. The plateau is not failure. It is the signal to stop.",
        framework: "Three tools. Diagnostic Feedback: name the flaw before you fix it. Not \"it's bad\" but \"this reads like a press release and needs to be an internal memo.\" The diagnosis gives AI a target. The V1-V2-V3 Method: write three versions with one sentence between each noting what the flaw was and what prompt fixed it. The document is the learning. The Plateau Signal: recognise when the improvement is smaller than the effort. Most people quit too early. Some iterate too long and the output starts drifting.",
        example: "A project management app pitch. V1 came back buzzword heavy with no clear value proposition. Diagnosis: reads like every other app on the market. V2 prompt: lead with the one problem this app solves, no buzzwords. V2 was clearer but still abstract. Diagnosis: no concrete scenario. V3 prompt: add one specific scenario in the first sentence, cut to 80 words. V3 landed tight, concrete, and opened with a real situation. The changelog took ten seconds to write. Next time: lead with the problem, add a scenario, cut the buzzwords. You do not start from zero. You start from your changelog.",
        keyTakeaway: "Name the flaw before you fix it. The AI did not diagnose what was wrong. You did. The AI executed your judgment. That distinction is everything. Build the Iteration Log. It is not just a better output. It is a personal playbook that compounds over time.",
      },
      exercise: {
        objective: "Produce three documented versions of an output with a changelog you can reuse next time",
        doneWhen: "You have V1, V2, V3 — each with a named flaw and a named fix — and a one-line changelog you would use again.",
        timeMinutes: 10,
        steps: [
          {
            task: "01",
            title: "Generate V1",
            items: [
              "Describe what you need AI to write — pitch, email, proposal, description.",
              "Generate V1 cold. Do not ask for feedback yet.",
            ],
          },
          {
            task: "02",
            title: "Diagnose, then fix — twice",
            items: [
              "Name the V1 flaw in one sentence. Apply one specific fix. That is V2.",
              "Name the V2 flaw in one sentence. Apply one specific fix. That is V3.",
            ],
          },
          {
            task: "03",
            title: "Write the changelog",
            items: [
              "After V3, write the changelog: V1 → V2 and V2 → V3, with what changed and why.",
              "That changelog is your playbook. Next time you start here, not from zero.",
            ],
          },
        ],
        prompt: "Here is my task: [1. describe what you need AI to write — a pitch, an email, a proposal, a description].\nGenerate V1. Do not ask me for feedback yet.\nV1 flaw: [2. name the specific flaw in one sentence — not \"it is bad\" but what exactly is wrong].\nFix only this: [3. cut to how many words / lead with what / remove what / add what]. Do not change anything else.\nV2 flaw: [4. name the next specific flaw in one sentence].\nFix only this: [5. the one specific fix for V2]. Do not change anything else.\nAfter V3 write the changelog: V1 to V2: [what changed and why] V2 to V3: [what changed and why]\nThat changelog is your playbook. Next time you write a [1. same type of output] you start from the changelog. Not from zero.\n--------------------\nIf any bracket above is not filled in, do not proceed. Ask me one question at a time. Start with the task. Then generate V1. Then ask me what the flaw is. Do not tell me what is wrong. I diagnose. You fix. When I name the flaw, reflect it back and ask — is this specific enough that the fix writes itself?",
      },
    },

    learnMore: [
      { title: "Article 1", url: "http://tiny.cc/day9_art1", type: "article" },
      { title: "Article 2", url: "http://tiny.cc/day9_art2", type: "article" },
      { title: "NotebookLM", url: "http://tiny.cc/day9_notebook", type: "tool" },
    ],
  },

  10: {
    day: 10,
    title: "Stop and Think",
    phase: "sparks",

    sectionTitles: {
      essential: "S. Stop and Think",
      advanced: "Calibrating the Human in the Loop",
    },

    essential: {
      videoUrl: "https://www.youtube.com/embed/TMLxdpM-Bsw?si=4l8sOmFPTF582ZyO?rel=0",
      //slideUrl: "https://www.canva.com/design/DAHFmUM0bOI/dqkMbgQuFQGulWFQMqCy_w/view?embed",
      durationSeconds: 600,
      summary: {
        coreIdea: "Your prompts are sharper. Your outputs are faster. You have stopped staring at blank pages. But something has quietly changed. The thinking feels thinner. You are producing more and reflecting less. You are spending less time disagreeing with what AI gives you and more time editing the surface of it. You are not thinking with AI anymore. You are nodding at it. Stop and Think is not a technique. It is a deliberate structural pause before you accept any AI output as finished thinking.",
        fact: "Most people believe that if AI gave an answer this fast, this fluently, this confidently, it must be correct. Wrong. GPT-4 achieved only 52.9% accuracy at catching errors in its own reasoning. More than half the time it could not see its own mistakes. 70% of AI references in academic work have been found to be inaccurate. The most dangerous AI output is not the one that is obviously wrong. It is the one that sounds the most right.",
        science: "47.1% of simple unambiguous logical errors are missed in speed-first AI workflows. Nearly half. Not complex errors. Simple ones. Missed because the output sounded right and nobody stopped to check. Students who used AI without a reflection step scored 6.71 points lower on average than those who paused. Same material, same students, the pause was the only variable. In clinical settings, participants were 7 times more likely to select an AI-aligned treatment recommendation even when it was wrong. One structured pause, introduced in controlled experiments, significantly reduced overreliance every single time.",
        framework: "Three things that take less than two minutes combined. The Independent Task Step: write your own answer before reading AI's, even one rough sentence. This prevents AI from anchoring your thinking before you have had a chance to think. The Contrastive Prompt: ask AI to show you why it chose this answer over the main alternative. That forces the model to expose its reasoning. The Audit Question: before you copy, paste, send, or act on any output, ask one question. Is this the first answer or the real answer? If you cannot answer with confidence, you have not stopped and thought.",
        example: "A hospital radiology team. Their AI diagnostic system was genuinely good. It flagged anomalies faster than any human. Over time the radiologists stopped forming an independent view first. They saw AI's view first and looked for reasons to confirm it. One day the AI was wrong. The error propagated. Not because the radiologist was incompetent. Because the order of operations had silently reversed. AI thought first. Human confirmed. They did not fail to think. They thought too late.",
        keyTakeaway: "The best use of AI is not the fastest answer. It is the one you stopped to question. You cannot willpower your way to Stop and Think. Willpower is finite. Structure is not. Build the system. That is what makes the other five letters of SPARKS worth anything.",
      },
      exercise: {
        objective: "Build the habit of thinking before you read AI's answer by running one real decision through the Stop and Think prompt",
        doneWhen: "You have filled in all three brackets and read AI's response to your own answer — not the other way around.",
        timeMinutes: 8,
        steps: [
          {
            task: "01",
            title: "Name your task",
            items: [
              "Pick a real task or decision you are working on right now.",
              "Write one sentence describing it before you open the prompt.",
            ],
          },
          {
            task: "02",
            title: "Form your own view first",
            items: [
              "Write your own answer in one sentence before reading AI's.",
              "Then add one thing you know that AI cannot — something from inside the problem.",
            ],
          },
          {
            task: "03",
            title: "Run the prompt",
            items: [
              "Paste the prompt below with all three brackets filled in.",
              "Read AI's response as a challenge to your view, not a replacement for it.",
            ],
          },
        ],
        prompt: "STOP. Before you answer — I am going to think first.\nMy task is [1. describe your task or decision].\nI have paused. Here is my own answer before I read yours: [2. your diagnosis or view in one sentence].\nHere is what I know that you do not: [3. one thing from being inside this problem that AI cannot know].\nNow I am ready. Tell me why my answer is right or wrong. Tell me what assumption you are making. Tell me what the main alternative is and why you ruled it out. Then give me your final answer.\n---------------------------\nIf any bracket above is not filled in, stop. Ask me one question at a time. Start with the task. Then ask for my own answer. Then ask what I know that you do not. Do not give me your answer until I have filled in all three. When I answer, reflect back what I said and ask — did you stop and think first, or did you reach for me before you formed a view?",
      },
    },

    advanced: {
      videoUrl: "https://www.youtube.com/embed/TMLxdpM-Bsw?si=4l8sOmFPTF582ZyO?rel=0",
      durationSeconds: 840,
      summary: {
        coreIdea: "This is not the problem of people who do not pause. That is the beginner problem. This is the problem of people who do pause, who frame first, who interrogate, and who are still getting it wrong. Stopping the line does not automatically change the trajectory. You can pause perfectly and still arrive at the wrong destination. The pause is a vehicle. What matters is where you steer it once you stop. The pause is necessary. It is not sufficient.",
        fact: "Most people believe more human judgment always improves AI output. Wrong. Chess grandmasters who overrode AI recommendations most frequently performed worst. AI alone outperformed. In demand forecasting, statistical AI acting alone outperformed human-AI teams. Not because the humans were careless. Because their professional intuition introduced systematic bias into predictions the model had already optimised. Sometimes the most dangerous thing in the loop is you.",
        science: "Researchers analysed thousands of instances where humans paused and reconsidered AI output. Less than 2% of those reflections changed a wrong answer to a right one. Not because people were not trying. Because they used the pause to justify, not to challenge. They read the output, felt discomfort, paused, and then looked for reasons to confirm what they already believed. The pause became a justification engine. Documented performance gains occur only when human overrides are highly selective and systematically mapped. Precision outperforms volume.",
        framework: "Three types of pause. Most people only ever use one. Verification: is this factually correct? Use when AI hallucination is the risk. Interrogative: is this the real answer? Use when the problem requires judgment AI may have flattened. Delegation: should I be in this loop at all? Use when AI's pattern recognition has surpassed your intuition and your presence degrades the output. Before any override, one question: is my objection based on evidence I have that AI lacks, or is it based on familiarity and discomfort? Evidence is signal. Override. Familiarity is noise. Delegate. And when you delegate, document why and what outcome you are watching for.",
        example: "A chess grandmaster preparing for competition. The AI recommends a piece sacrifice. Counterintuitive. Against everything their pattern recognition has ever told them. They pause genuinely and carefully. They examine the position from multiple angles. Then they override and play the familiar line. They lose. The reflection was real. The pause was genuine. The outcome was worse because the reflection was filtered through expertise the AI had already surpassed in that specific position. Expertise as noise. The thing that made them good was the thing that made them wrong.",
        keyTakeaway: "Stop and Think is not about trusting yourself more than AI. It is about knowing exactly where to trust yourself. Two failure modes: not pausing, and pausing to confirm. The second looks identical to good practice from the outside. Same visual behaviour, same deliberate engagement, same wrong answer, just delivered more slowly and with more confidence. Knowing which pause to deploy is the actual skill.",
      },
      exercise: {
        objective: "Run the Delegation Test on a real decision to find out whether your override was signal or noise",
        doneWhen: "You have named your objection, tested it against the evidence-or-familiarity question, and written one sentence documenting your choice.",
        timeMinutes: 10,
        steps: [
          {
            task: "01",
            title: "Pick a real decision",
            items: [
              "Pick a decision you made this week where you overrode AI or ignored its recommendation.",
              "Be honest. The test only works on real decisions.",
            ],
          },
          {
            task: "02",
            title: "Run the Delegation Test",
            items: [
              "Copy the prompt below and fill in all three brackets.",
              "Answer the one question it asks: evidence or familiarity?",
            ],
          },
          {
            task: "03",
            title: "Document it",
            items: [
              "Write one sentence. Whether you override or delegate, write why.",
              "That sentence is your record. It is how a pause becomes a pattern.",
            ],
          },
        ],
        prompt: "I need to run the Delegation Test on a real decision.\nHere is the decision: [1. describe the decision you faced].\nHere is what AI recommended: [2. what did AI suggest].\nHere is why I overrode it: [3. your reason for overriding — be honest].\nNow ask me one question only: is my reason based on evidence I have that you lack — or is it based on familiarity and discomfort?\nIf I say evidence — ask me to state the specific evidence in one sentence. Then tell me whether my judgment belongs in this loop.\nIf I say familiarity — tell me to delegate. Then ask me to write one sentence documenting why I am delegating and what outcome I will watch for.\n-----------------\nIf any bracket above is not filled in, do not proceed. Ask me one question at a time. Start with the decision. Then the AI recommendation. Then my reason for overriding. Do not run the Delegation Test until I have answered all three. When I answer, reflect back what I said and ask.",
      },
    },

    learnMore: [
      { title: "Article", url: "http://tiny.cc/articl_day10", type: "article" },
      { title: "NotebookLM Podcast", url: "http://tiny.cc/podcast_day10", type: "article" },
      { title: "NotebookLM", url: "http://tiny.cc/notebookLM_dy10", type: "tool" },
    ],
  },
};

export function getLesson(day: number): Lesson | null {
  return COURSE_CONTENT[day] ?? null;
}