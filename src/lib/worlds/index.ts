/**
 * Worlds content — types, data, and helpers only. No React.
 */

// ---------------------------------------------------------------------------
// Question (discriminated union)
// ---------------------------------------------------------------------------

export type MCQuestion = {
  type: "mc";
  id: string;
  prompt: string;
  choices: string[];
  correctIndex: number;
};

export type BooleanQuestion = {
  type: "boolean";
  id: string;
  prompt: string;
  correct: boolean;
};

export type FillQuestion = {
  type: "fill";
  id: string;
  prompt: string;
  answer: string;
  placeholder?: string;
};

export type NumericQuestion = {
  type: "numeric";
  id: string;
  prompt: string;
  answer: number;
  tolerance?: number;
  unit?: string;
};

export type DragMatchQuestion = {
  type: "drag_match";
  id: string;
  prompt: string;
  items: { id: string; label: string }[];
  slots: { id: string; label: string }[];
  correct: Record<string, string>;
};

export type OrderQuestion = {
  type: "order";
  id: string;
  prompt: string;
  items: { id: string; label: string }[];
  correctOrder: string[];
};

/** Placeholder — not implemented yet. */
export type DragQuestion = { type: "drag"; id: string };

/** Placeholder — not implemented yet. */
export type ScenarioQuestion = { type: "scenario"; id: string };

export type Question =
  | MCQuestion
  | BooleanQuestion
  | FillQuestion
  | NumericQuestion
  | DragMatchQuestion
  | OrderQuestion
  | DragQuestion
  | ScenarioQuestion;

// ---------------------------------------------------------------------------
// Path node & lesson
// ---------------------------------------------------------------------------

export type PathNode = {
  id: string;
  title: string;
  order: number;
  lessonId: string;
  salaryReward: number;
  isBoss?: boolean;
};

export type Lesson = {
  id: string;
  headline: string;
  story: string;
  ruleCard: string;
  questions: Question[];
  bossQuestion: Question;
  mastery: {
    badgeName: string;
    celebrationCopy: string;
    salaryReward: number;
  };
};

// ---------------------------------------------------------------------------
// World
// ---------------------------------------------------------------------------

export type World = {
  id: string;
  slug: string;
  title: string;
  description: string;
  nodes: PathNode[];
};

// ---------------------------------------------------------------------------
// Data
// ---------------------------------------------------------------------------

// =========================
// WORLD 0 (FULL) — DATA
// =========================

export const WORLDS: World[] = [
  {
    id: "w0",
    slug: "world-0",
    title: "World 0: What Is a Model?",
    description: "No fear. Just clarity. Learn what a model is and how analysts think.",
    nodes: [
      {
        id: "w0n1",
        title: "A Model Is a Story",
        order: 1,
        lessonId: "w0_lesson_1_story",
        salaryReward: 700,
        isBoss: false,
      },
      {
        id: "w0n2",
        title: "Guesses vs Rules",
        order: 2,
        lessonId: "w0_lesson_2_rules",
        salaryReward: 800,
        isBoss: false,
      },
      {
        id: "w0n3",
        title: "The 3 Statements (3 Cameras)",
        order: 3,
        lessonId: "w0_lesson_3_statements",
        salaryReward: 900,
        isBoss: false,
      },
      {
        id: "w0n4",
        title: "How the Statements Talk",
        order: 4,
        lessonId: "w0_lesson_4_links",
        salaryReward: 900,
        isBoss: false,
      },
      {
        id: "w0n5",
        title: "The Analyst Workflow",
        order: 5,
        lessonId: "w0_lesson_5_workflow",
        salaryReward: 1200,
        isBoss: true,
      },
    ],
  },
  // =========================
  // WORLD 1 (FULL) — DATA
  // =========================
  {
    id: "w1",
    slug: "world-1",
    title: "World 1: Income Statement",
    description: "Learn profit like a real analyst (but explained like a 5th grader).",
    nodes: [
      {
        id: "w1n1",
        title: "Money In vs Money Out",
        order: 1,
        lessonId: "w1_lesson_1_profit",
        salaryReward: 1100,
        isBoss: false,
      },
      {
        id: "w1n2",
        title: "Break-even & Losses",
        order: 2,
        lessonId: "w1_lesson_2_breakeven",
        salaryReward: 1200,
        isBoss: false,
      },
      {
        id: "w1n3",
        title: "Types of Expenses (Fixed vs Variable)",
        order: 3,
        lessonId: "w1_lesson_3_fixed_variable",
        salaryReward: 1300,
        isBoss: false,
      },
      {
        id: "w1n4",
        title: "EBITDA (Fake But Useful Profit)",
        order: 4,
        lessonId: "w1_lesson_4_ebitda",
        salaryReward: 1400,
        isBoss: false,
      },
      {
        id: "w1n5",
        title: "Taxes (Government Cut)",
        order: 5,
        lessonId: "w1_lesson_5_taxes",
        salaryReward: 1400,
        isBoss: false,
      },
      {
        id: "w1n6",
        title: "Read a Real Income Statement",
        order: 6,
        lessonId: "w1_lesson_6_read_is",
        salaryReward: 1700,
        isBoss: true,
      },
    ],
  },
  // =========================
  // WORLD 2 (GAME EDITION) — DATA
  // =========================
  {
    id: "w2",
    slug: "world-2",
    title: "World 2: Revenue Forecasting",
    description: "Forecast revenue with drivers, sanity checks, and game reps.",
    nodes: [
      { id: "w2n1", title: "Growth Rates", order: 1, lessonId: "w2_lesson_1_growth", salaryReward: 1600, isBoss: false },
      { id: "w2n2", title: "Price × Volume", order: 2, lessonId: "w2_lesson_2_pxv", salaryReward: 1700, isBoss: false },
      { id: "w2n3", title: "CAGR", order: 3, lessonId: "w2_lesson_3_cagr", salaryReward: 1800, isBoss: false },
      { id: "w2n4", title: "Driver-Based Forecasting", order: 4, lessonId: "w2_lesson_4_drivers", salaryReward: 1900, isBoss: false },
      { id: "w2n5", title: "Segment Revenue Builds", order: 5, lessonId: "w2_lesson_5_segments", salaryReward: 2000, isBoss: false },
      { id: "w2n6", title: "Revenue Sanity Checks", order: 6, lessonId: "w2_lesson_6_sanity", salaryReward: 2100, isBoss: false },
      { id: "w2n7", title: "Forecasting vs Reality", order: 7, lessonId: "w2_lesson_7_reality", salaryReward: 2400, isBoss: true },
    ],
  },
];

export const LESSONS: Record<string, Lesson> = {
  // -------------------------
  // NODE 1 — A Model Is a Story
  // -------------------------
  w0_lesson_1_story: {
    id: "w0_lesson_1_story",
    headline: "A financial model is not math. It's a story.",
    story:
      "Imagine your friend starts a lemonade stand.\n\nYou ask: \"How much money will you make this summer?\"\n\nYour friend doesn't know the future… so they guess, but they guess in a smart way.\n\nThey say: \"I think I'll sell 10 cups a day. Each cup is $2. Lemons cost money. Cups cost money.\"\n\nThat smart guess—written down with numbers—is a financial model.",
    ruleCard: "A financial model is a smart guess about the future, using numbers and rules.",
    questions: [
      {
        type: "mc",
        id: "w0q1_1",
        prompt: "Which one is a financial model?",
        choices: [
          "\"This company is cool.\"",
          "\"Revenue will go up because vibes.\"",
          "\"Revenue will grow 10% next year based on last year's sales.\"",
          "\"I like this stock.\"",
        ],
        correctIndex: 2,
      },
      {
        type: "mc",
        id: "w0q1_2",
        prompt: "A financial model is MOSTLY about…",
        choices: ["the past", "the future", "gossip", "luck"],
        correctIndex: 1,
      },
      {
        type: "boolean",
        id: "w0q1_3",
        prompt: "A model is supposed to be 100% correct.",
        correct: false,
      },
      {
        type: "mc",
        id: "w0q1_4",
        prompt: "Why do we use rules in a model?",
        choices: [
          "To make it complicated",
          "To sound smart",
          "To keep guesses consistent",
          "Because Excel demands it",
        ],
        correctIndex: 2,
      },
      {
        type: "boolean",
        id: "w0q1_5",
        prompt: "Everyone guesses. Analysts just try to guess smarter.",
        correct: true,
      },
      {
        type: "mc",
        id: "w0q1_6",
        prompt: "Which is the BETTER model?",
        choices: [
          "\"Revenue will go up.\"",
          "\"Revenue will go up because we opened 5 new stores that each sell $1M.\"",
          "\"Revenue will go up because we're popular.\"",
          "\"Revenue will go up because I said so.\"",
        ],
        correctIndex: 1,
      },
    ],
    bossQuestion: {
      type: "mc",
      id: "w0b1",
      prompt:
        "Two people predict lemonade sales next summer. Who has the better model?",
      choices: [
        "A: \"We will sell more.\"",
        "B: \"We sold 1,000 cups last year. We're adding one stand, so ~1,500 cups.\"",
        "A: \"Trust me bro.\"",
        "B: \"My cousin said it'll be busy.\"",
      ],
      correctIndex: 1,
    },
    mastery: {
      badgeName: "Model Thinker",
      celebrationCopy:
        "You just learned the secret: models are stories.\nNow the rest will feel way less scary.",
      salaryReward: 700,
    },
  },

  // -------------------------
  // NODE 2 — Guesses vs Rules
  // -------------------------
  w0_lesson_2_rules: {
    id: "w0_lesson_2_rules",
    headline: "Guesses become powerful when you use rules.",
    story:
      "A guess is like saying: \"I think we'll sell more lemonade.\"\n\nA rule is like saying: \"If we sell 10 cups per day at $2 each, revenue is $20 per day.\"\n\nRules turn your brain into a calculator.\n\nIn modeling, we separate:\n- Inputs (the guesses)\n- Outputs (the results)",
    ruleCard: "Inputs are guesses. Rules turn inputs into outputs.",
    questions: [
      {
        type: "mc",
        id: "w0q2_1",
        prompt: "Which is an INPUT (a guess)?",
        choices: [
          "Revenue",
          "\"We will sell 10 cups per day\"",
          "Profit",
          "Cash at the end of the year",
        ],
        correctIndex: 1,
      },
      {
        type: "mc",
        id: "w0q2_2",
        prompt: "Which is a RULE?",
        choices: [
          "\"Revenue will be higher.\"",
          "\"Revenue = Price × Cups Sold\"",
          "\"This company is great.\"",
          "\"I hope we make money.\"",
        ],
        correctIndex: 1,
      },
      {
        type: "mc",
        id: "w0q2_3",
        prompt: "If Price is $2 and Cups Sold is 10, Revenue is…",
        choices: ["$8", "$12", "$20", "$200"],
        correctIndex: 2,
      },
      {
        type: "boolean",
        id: "w0q2_4",
        prompt: "Outputs are the numbers your rules create.",
        correct: true,
      },
      {
        type: "boolean",
        id: "w0q2_5",
        prompt: "A model is better when the rules are clear and repeatable.",
        correct: true,
      },
      {
        type: "mc",
        id: "w0q2_6",
        prompt: "Which is an OUTPUT (a result)?",
        choices: [
          "\"We think growth is 10%\"",
          "\"Price is $3\"",
          "\"Profit is $5\"",
          "\"We hope it works\"",
        ],
        correctIndex: 2,
      },
      {
        type: "mc",
        id: "w0q2_7",
        prompt: "Why do we separate inputs from rules?",
        choices: [
          "So you can change guesses without breaking the model",
          "So it looks cooler",
          "So it's harder to understand",
          "Because it doesn't matter",
        ],
        correctIndex: 0,
      },
    ],
    bossQuestion: {
      type: "mc",
      id: "w0b2",
      prompt:
        "You want to test a new idea: selling lemonade for $3 instead of $2. What should you change?",
      choices: [
        "Change every revenue number by hand",
        "Change the input (Price) and let the rules update everything",
        "Delete the model",
        "Guess again without numbers",
      ],
      correctIndex: 1,
    },
    mastery: {
      badgeName: "Rule Builder",
      celebrationCopy:
        "You learned the cheat code: separate guesses from rules.\nThat's how real models stay clean.",
      salaryReward: 800,
    },
  },

  // -------------------------
  // NODE 3 — The 3 Statements (3 Cameras)
  // -------------------------
  w0_lesson_3_statements: {
    id: "w0_lesson_3_statements",
    headline: "The 3 statements are 3 different cameras.",
    story:
      "Think of a company like a video game character.\n\nWe have 3 \"cameras\" to understand what's happening:\n\n1) Income Statement = a MOVIE (what happened over time)\n2) Balance Sheet = a PHOTO (what the company has right now)\n3) Cash Flow Statement = RECEIPTS (where cash actually went)",
    ruleCard: "Income = movie. Balance Sheet = photo. Cash Flow = receipts.",
    questions: [
      {
        type: "mc",
        id: "w0q3_1",
        prompt: "Which statement is a MOVIE over time?",
        choices: ["Income Statement", "Balance Sheet", "Cash Flow Statement", "None"],
        correctIndex: 0,
      },
      {
        type: "mc",
        id: "w0q3_2",
        prompt: "Which statement is a PHOTO at one moment?",
        choices: ["Income Statement", "Balance Sheet", "Cash Flow Statement", "Textbook"],
        correctIndex: 1,
      },
      {
        type: "mc",
        id: "w0q3_3",
        prompt: "Which statement shows where CASH moved?",
        choices: ["Income Statement", "Balance Sheet", "Cash Flow Statement", "Stock chart"],
        correctIndex: 2,
      },
      {
        type: "boolean",
        id: "w0q3_4",
        prompt: "The Balance Sheet tells you what the company owns and owes right now.",
        correct: true,
      },
      {
        type: "mc",
        id: "w0q3_5",
        prompt: "You want to know: \"Did we make money this year?\" Which camera?",
        choices: ["Income Statement", "Balance Sheet", "Cash Flow Statement", "TikTok"],
        correctIndex: 0,
      },
      {
        type: "mc",
        id: "w0q3_6",
        prompt: "You want to know: \"Do we have enough cash today?\" Which camera?",
        choices: ["Income Statement", "Balance Sheet", "Cash Flow Statement", "None"],
        correctIndex: 1,
      },
      {
        type: "mc",
        id: "w0q3_7",
        prompt: "You want to know: \"Why did cash change?\" Which camera?",
        choices: ["Income Statement", "Balance Sheet", "Cash Flow Statement", "Instagram"],
        correctIndex: 2,
      },
    ],
    bossQuestion: {
      type: "mc",
      id: "w0b3",
      prompt:
        "A company shows high profit, but cash is going down. Which statement helps explain WHY?",
      choices: ["Income Statement", "Balance Sheet", "Cash Flow Statement", "None"],
      correctIndex: 2,
    },
    mastery: {
      badgeName: "Camera Switcher",
      celebrationCopy:
        "You can now pick the right statement for the right question.\nThat's actual analyst thinking.",
      salaryReward: 900,
    },
  },

  // -------------------------
  // NODE 4 — How the Statements Talk
  // -------------------------
  w0_lesson_4_links: {
    id: "w0_lesson_4_links",
    headline: "The statements are connected like a chain.",
    story:
      "Here's the simplest way to remember the links:\n\n- Income Statement shows profit (Net Income).\n- Profit doesn't disappear. It affects the Balance Sheet (Retained Earnings).\n- Cash Flow Statement explains why Cash changes.\n- Cash on the Balance Sheet is the final cash number.\n\nIt's one story… told from 3 angles.",
    ruleCard: "Profit moves equity. Cash flow explains cash. Cash ends on the balance sheet.",
    questions: [
      {
        type: "mc",
        id: "w0q4_1",
        prompt: "Profit (Net Income) lives on the…",
        choices: ["Balance Sheet", "Income Statement", "Cash Flow Statement", "All 3"],
        correctIndex: 1,
      },
      {
        type: "mc",
        id: "w0q4_2",
        prompt: "Which statement explains why cash changed?",
        choices: ["Income Statement", "Balance Sheet", "Cash Flow Statement", "None"],
        correctIndex: 2,
      },
      {
        type: "boolean",
        id: "w0q4_3",
        prompt: "Cash on the Balance Sheet is the 'ending cash' number.",
        correct: true,
      },
      {
        type: "mc",
        id: "w0q4_4",
        prompt: "If profit goes UP, what usually happens to Retained Earnings (all else equal)?",
        choices: ["Goes down", "Stays the same", "Goes up", "Disappears"],
        correctIndex: 2,
      },
      {
        type: "boolean",
        id: "w0q4_5",
        prompt: "The 3 statements are separate stories that don't affect each other.",
        correct: false,
      },
      {
        type: "mc",
        id: "w0q4_6",
        prompt: "Where do you find the company's cash balance?",
        choices: ["Income Statement", "Balance Sheet", "Cash Flow Statement only", "Press release"],
        correctIndex: 1,
      },
      {
        type: "mc",
        id: "w0q4_7",
        prompt: "Which is the best 'chain'?",
        choices: [
          "Profit → Retained Earnings; Cash Flow → Cash",
          "Cash → Profit; Profit → Receipts",
          "Balance Sheet → TikTok; Cash Flow → Memes",
          "Nothing connects",
        ],
        correctIndex: 0,
      },
    ],
    bossQuestion: {
      type: "mc",
      id: "w0b4",
      prompt:
        "A company shows higher profit this year. What is the MOST likely place you'll see that effect show up next?",
      choices: [
        "Cash Flow Statement only, always",
        "Balance Sheet (Retained Earnings)",
        "It won't show anywhere",
        "Only in the stock price",
      ],
      correctIndex: 1,
    },
    mastery: {
      badgeName: "Statement Linker",
      celebrationCopy:
        "You just learned the hidden wiring.\nNow models will feel like one connected story.",
      salaryReward: 900,
    },
  },

  // -------------------------
  // NODE 5 (BOSS) — The Analyst Workflow
  // -------------------------
  w0_lesson_5_workflow: {
    id: "w0_lesson_5_workflow",
    headline: "Analysts build models in a specific order (for a reason).",
    story:
      "Modeling is like building a LEGO set.\n\nYou don't start with the roof.\nYou start with the base.\n\nA simple analyst workflow is:\n1) Input the past (historicals)\n2) Forecast the Income Statement\n3) Forecast Balance Sheet pieces (schedules)\n4) Build the Cash Flow Statement\n5) Add a cash plug (revolver) if needed\n6) Sanity check everything\n\nThis order keeps the model from breaking.",
    ruleCard: "Build from the past → forecast statements → connect cash → sanity check.",
    questions: [
      {
        type: "mc",
        id: "w0q5_1",
        prompt: "What's the FIRST thing analysts usually do?",
        choices: [
          "Sanity check",
          "Input historical results (the past)",
          "Add a revolver",
          "Pick a stock price",
        ],
        correctIndex: 1,
      },
      {
        type: "mc",
        id: "w0q5_2",
        prompt: "What usually comes BEFORE building the Cash Flow Statement?",
        choices: [
          "Forecast the Income Statement and Balance Sheet pieces",
          "Celebrate",
          "Delete Excel",
          "Pick a logo color",
        ],
        correctIndex: 0,
      },
      {
        type: "boolean",
        id: "w0q5_3",
        prompt: "The order matters because later steps depend on earlier steps.",
        correct: true,
      },
      {
        type: "mc",
        id: "w0q5_4",
        prompt: "Why do analysts sanity check at the end?",
        choices: [
          "To make sure the model makes sense and ties out",
          "To waste time",
          "Because it's optional",
          "To impress people with colors",
        ],
        correctIndex: 0,
      },
      {
        type: "mc",
        id: "w0q5_5",
        prompt: "If you build cash flow, what number are you trying to explain?",
        choices: [
          "Revenue",
          "Ending cash",
          "Number of employees",
          "Logo design",
        ],
        correctIndex: 1,
      },
      {
        type: "boolean",
        id: "w0q5_6",
        prompt: "You should start a model by guessing the final answer first.",
        correct: false,
      },
      {
        type: "mc",
        id: "w0q5_7",
        prompt: "If cash goes negative in the forecast, what tool often helps plug the gap?",
        choices: ["A revolver (credit line)", "A new logo", "More jargon", "A meme"],
        correctIndex: 0,
      },
      {
        type: "mc",
        id: "w0q5_8",
        prompt: "Which workflow sounds most correct?",
        choices: [
          "Input past → Forecast IS → Forecast BS schedules → Build CFS → Add revolver → Sanity checks",
          "Build CFS → Guess revenue → Sanity check → Input past",
          "Make charts → Pick stock price → Write story",
          "None of these",
        ],
        correctIndex: 0,
      },
    ],
    bossQuestion: {
      type: "mc",
      id: "w0b5",
      prompt:
        "You just forecasted the Income Statement. What is the BEST next step?",
      choices: [
        "Sanity check right now and stop",
        "Forecast Balance Sheet pieces (schedules) so you can build cash flow next",
        "Jump to EPS",
        "Delete the model and restart",
      ],
      correctIndex: 1,
    },
    mastery: {
      badgeName: "Workflow Wizard",
      celebrationCopy:
        "You now understand how analysts actually build models.\nWorld 1 is where you start making money for real.",
      salaryReward: 1200,
    },
  },

  // -------------------------
  // WORLD 1 — NODE 1 — Money In vs Money Out
  // -------------------------
  w1_lesson_1_profit: {
    id: "w1_lesson_1_profit",
    headline: "Profit is what's left after you pay the bills.",
    story:
      "Imagine your lemonade stand makes $20 today.\n\nBut you spend $8 on lemons and cups.\n\nWhat's left is your profit.\n\nIf you spend MORE than you make, profit goes negative — that's a loss.",
    ruleCard: "Profit = Revenue − Expenses.",
    questions: [
      {
        type: "mc",
        id: "w1q1_1",
        prompt: "Revenue means…",
        choices: [
          "Money coming in from selling stuff",
          "Money you spend",
          "Money you borrow",
          "Money you wish you had",
        ],
        correctIndex: 0,
      },
      {
        type: "mc",
        id: "w1q1_2",
        prompt: "Expenses are…",
        choices: [
          "Money you spend to run the business",
          "Money coming in",
          "Only taxes",
          "Only rent",
        ],
        correctIndex: 0,
      },
      {
        type: "fill",
        id: "w1q1_3",
        prompt: "Fill in the rule: Profit = Revenue − _____.",
        answer: "Expenses",
        placeholder: "Type one word",
      },
      {
        type: "numeric",
        id: "w1q1_4",
        prompt: "Revenue = 50, Expenses = 30. Profit = ?",
        answer: 20,
        tolerance: 0,
      },
      {
        type: "numeric",
        id: "w1q1_5",
        prompt: "Revenue = 40, Expenses = 55. Profit = ?",
        answer: -15,
        tolerance: 0,
      },
      {
        type: "boolean",
        id: "w1q1_6",
        prompt: "If profit is negative, the company has a loss.",
        correct: true,
      },
      {
        type: "mc",
        id: "w1q1_7",
        prompt: "Which change increases profit the most (all else equal)?",
        choices: [
          "Revenue up",
          "Expenses down",
          "Both A and B",
          "Neither",
        ],
        correctIndex: 2,
      },
      {
        type: "mc",
        id: "w1q1_8",
        prompt: "If revenue stays the same, how can profit go up?",
        choices: [
          "Spend less (lower expenses)",
          "Sell fewer items",
          "Borrow money",
          "Raise taxes",
        ],
        correctIndex: 0,
      },
    ],
    bossQuestion: {
      type: "mc",
      id: "w1b1",
      prompt:
        "A lemonade stand made $100 and spent $100. What happened?",
      choices: [
        "Big profit",
        "Break-even (profit = 0)",
        "Loss",
        "Impossible",
      ],
      correctIndex: 1,
    },
    mastery: {
      badgeName: "Profit Calculator",
      celebrationCopy:
        "You can now explain profit in one sentence.\nThat's the foundation of the Income Statement.",
      salaryReward: 1100,
    },
  },

  // -------------------------
  // WORLD 1 — NODE 2 — Break-even & Losses
  // -------------------------
  w1_lesson_2_breakeven: {
    id: "w1_lesson_2_breakeven",
    headline: "Break-even means you didn't win… but you didn't lose.",
    story:
      "Break-even is when profit is exactly 0.\n\nYou made enough money to pay the bills — nothing more.\n\nIt's like finishing a race in the middle: not a trophy, but not a disaster.",
    ruleCard: "Break-even happens when Revenue = Expenses.",
    questions: [
      {
        type: "boolean",
        id: "w1q2_1",
        prompt: "Break-even means profit equals 0.",
        correct: true,
      },
      {
        type: "mc",
        id: "w1q2_2",
        prompt: "If a company is at break-even, then…",
        choices: [
          "Revenue is higher than expenses",
          "Expenses are higher than revenue",
          "Revenue equals expenses",
          "Profit is negative",
        ],
        correctIndex: 2,
      },
      {
        type: "numeric",
        id: "w1q2_3",
        prompt: "Expenses are 80. What revenue is needed to break even?",
        answer: 80,
        tolerance: 0,
      },
      {
        type: "numeric",
        id: "w1q2_4",
        prompt: "Revenue is 60. Profit is -10. What are expenses?",
        answer: 70,
        tolerance: 0,
      },
      {
        type: "mc",
        id: "w1q2_5",
        prompt: "Company has a loss. Which is the fastest fix?",
        choices: [
          "Raise revenue or cut expenses",
          "Buy a logo",
          "Ignore it",
          "Ask Excel nicely",
        ],
        correctIndex: 0,
      },
      {
        type: "boolean",
        id: "w1q2_6",
        prompt: "If expenses drop and revenue stays the same, profit improves.",
        correct: true,
      },
      {
        type: "mc",
        id: "w1q2_7",
        prompt: "Revenue = 90, Expenses = 100. Which is true?",
        choices: [
          "Profit is 10",
          "Profit is -10",
          "Break-even",
          "Profit is 190",
        ],
        correctIndex: 1,
      },
    ],
    bossQuestion: {
      type: "mc",
      id: "w1b2",
      prompt:
        "You're losing money. Which plan gets you to break-even most directly?",
      choices: [
        "Make +$20 more revenue OR cut -$20 expenses",
        "Borrow $20",
        "Post more on social media with no changes",
        "Hope it works out",
      ],
      correctIndex: 0,
    },
    mastery: {
      badgeName: "Break-even Boss",
      celebrationCopy:
        "Break-even isn't glamorous, but it's survival.\nNow you can spot it instantly.",
      salaryReward: 1200,
    },
  },

  // -------------------------
  // WORLD 1 — NODE 3 — Fixed vs Variable Costs
  // -------------------------
  w1_lesson_3_fixed_variable: {
    id: "w1_lesson_3_fixed_variable",
    headline: "Some costs grow with sales. Some don't.",
    story:
      "Rent is usually fixed: it stays the same even if you sell 0 cups.\n\nCups and lemons are variable: the more you sell, the more you buy.\n\nThis matters because fixed costs make losses scarier when sales drop.",
    ruleCard: "Fixed costs stay. Variable costs scale with sales.",
    questions: [
      {
        type: "mc",
        id: "w1q3_1",
        prompt: "Which is usually a fixed cost?",
        choices: ["Rent", "Cups", "Lemons", "Credit card fees per sale"],
        correctIndex: 0,
      },
      {
        type: "mc",
        id: "w1q3_2",
        prompt: "Which is usually a variable cost?",
        choices: ["Rent", "CEO salary (usually)", "Cups per lemonade", "Insurance (usually)"],
        correctIndex: 2,
      },
      {
        type: "boolean",
        id: "w1q3_3",
        prompt: "Variable costs usually increase when sales increase.",
        correct: true,
      },
      {
        type: "boolean",
        id: "w1q3_4",
        prompt: "Fixed costs go up every time you sell one more lemonade.",
        correct: false,
      },
      {
        type: "mc",
        id: "w1q3_5",
        prompt: "Two stands have the same revenue. Which one is riskier if sales drop?",
        choices: [
          "The one with higher fixed costs",
          "The one with higher variable costs",
          "They're identical risk",
          "The one with a cooler brand",
        ],
        correctIndex: 0,
      },
      {
        type: "mc",
        id: "w1q3_6",
        prompt: "If you sell more, which cost is most likely to rise?",
        choices: ["Rent", "Cups & lemons", "A yearly license fee", "None"],
        correctIndex: 1,
      },
      {
        type: "mc",
        id: "w1q3_7",
        prompt: "Why do fixed costs feel scary?",
        choices: [
          "You pay them even when you sell nothing",
          "They are always illegal",
          "They increase your revenue",
          "They don't exist",
        ],
        correctIndex: 0,
      },
    ],
    bossQuestion: {
      type: "mc",
      id: "w1b3",
      prompt:
        "Same revenue, different costs. Which business is safer in a downturn?",
      choices: [
        "High fixed costs, low variable costs",
        "Low fixed costs, higher variable costs",
        "Doesn't matter",
        "The one with the bigger office",
      ],
      correctIndex: 1,
    },
    mastery: {
      badgeName: "Cost Structure Scout",
      celebrationCopy:
        "You now see what costs DO when sales change.\nThat's a real analyst superpower.",
      salaryReward: 1300,
    },
  },

  // -------------------------
  // WORLD 1 — NODE 4 — EBITDA
  // -------------------------
  w1_lesson_4_ebitda: {
    id: "w1_lesson_4_ebitda",
    headline: "EBITDA is a 'cleaned up' profit number analysts love.",
    story:
      "Sometimes profit looks messy because of taxes, interest, or \"paper expenses.\"\n\nEBITDA is a way to focus on the core business engine.\n\nIt's not perfect — but it's useful.",
    ruleCard: "EBITDA is a 'business engine' profit proxy (not cash).",
    questions: [
      {
        type: "boolean",
        id: "w1q4_1",
        prompt: "EBITDA is the same thing as cash in the bank.",
        correct: false,
      },
      {
        type: "mc",
        id: "w1q4_2",
        prompt: "Why do analysts use EBITDA?",
        choices: [
          "To focus on core operations and compare companies",
          "Because it's always cash",
          "Because taxes don't exist",
          "To make spreadsheets look cooler",
        ],
        correctIndex: 0,
      },
      {
        type: "mc",
        id: "w1q4_3",
        prompt: "Which item is NOT part of 'core operations' in the simple sense?",
        choices: ["Selling lemonade", "Paying lemon costs", "Interest expense", "Paying staff"],
        correctIndex: 2,
      },
      {
        type: "boolean",
        id: "w1q4_4",
        prompt: "Two companies can have the same EBITDA but different cash.",
        correct: true,
      },
      {
        type: "mc",
        id: "w1q4_5",
        prompt: "EBITDA is MOST useful when you want to…",
        choices: [
          "Compare operating performance",
          "Find exact ending cash",
          "Avoid doing any math",
          "Predict stock price perfectly",
        ],
        correctIndex: 0,
      },
      {
        type: "mc",
        id: "w1q4_6",
        prompt: "If depreciation is a 'paper expense,' EBITDA usually…",
        choices: [
          "Ignores it (conceptually)",
          "Adds it as extra cash",
          "Deletes revenue",
          "Is always negative",
        ],
        correctIndex: 0,
      },
    ],
    bossQuestion: {
      type: "mc",
      id: "w1b4",
      prompt:
        "Two companies have the same EBITDA. Company A has big inventory buildup. Company B doesn't. Who likely has better cash?",
      choices: [
        "Company A",
        "Company B",
        "They must be identical",
        "Impossible to tell",
      ],
      correctIndex: 1,
    },
    mastery: {
      badgeName: "EBITDA Decoder",
      celebrationCopy:
        "You understand why EBITDA exists — and why it can still lie.\nThat's the right mindset.",
      salaryReward: 1400,
    },
  },

  // -------------------------
  // WORLD 1 — NODE 5 — Taxes
  // -------------------------
  w1_lesson_5_taxes: {
    id: "w1_lesson_5_taxes",
    headline: "Taxes are the government's cut of your profit.",
    story:
      "If you make money, the government usually takes a slice.\n\nWe'll keep it simple:\nTaxes = Pre-tax profit × Tax rate.\n\nIf profit is negative, assume taxes are ~0 for now.",
    ruleCard: "Taxes ≈ Pre-tax profit × tax rate (simple version).",
    questions: [
      {
        type: "numeric",
        id: "w1q5_1",
        prompt: "Pre-tax profit = 100. Tax rate = 20%. Taxes = ?",
        answer: 20,
        tolerance: 0,
      },
      {
        type: "numeric",
        id: "w1q5_2",
        prompt: "Pre-tax profit = 50. Tax rate = 30%. Taxes = ?",
        answer: 15,
        tolerance: 0,
      },
      {
        type: "boolean",
        id: "w1q5_3",
        prompt: "Higher tax rate means lower net income (all else equal).",
        correct: true,
      },
      {
        type: "mc",
        id: "w1q5_4",
        prompt: "What happens to taxes if pre-tax profit goes up?",
        choices: ["Taxes usually go up", "Taxes always go down", "Taxes disappear", "No change"],
        correctIndex: 0,
      },
      {
        type: "numeric",
        id: "w1q5_5",
        prompt: "Pre-tax profit = -10. Taxes (simple version) = ?",
        answer: 0,
        tolerance: 0,
      },
      {
        type: "mc",
        id: "w1q5_6",
        prompt: "Net income is…",
        choices: [
          "Profit after taxes",
          "Profit before expenses",
          "Cash in the bank",
          "Revenue only",
        ],
        correctIndex: 0,
      },
    ],
    bossQuestion: {
      type: "numeric",
      id: "w1b5",
      prompt: "Pre-tax profit = 200. Tax rate = 25%. Taxes = ?",
      answer: 50,
      tolerance: 0,
    },
    mastery: {
      badgeName: "Tax Tamer",
      celebrationCopy:
        "You can now take profit and translate it into net income.\nThat's a real Income Statement step.",
      salaryReward: 1400,
    },
  },

  // -------------------------
  // WORLD 1 — NODE 6 (BOSS) — Read a Real Income Statement
  // -------------------------
  w1_lesson_6_read_is: {
    id: "w1_lesson_6_read_is",
    headline: "Can you read an Income Statement like an analyst?",
    story:
      "A real Income Statement is just the same story, line by line:\n\nRevenue\n− Costs\n= Profit\n\nThe trick is spotting what's driving the changes.\nThat's what analysts do all day.",
    ruleCard: "Read top to bottom: revenue → costs → profit.",
    questions: [
      {
        type: "mc",
        id: "w1q6_1",
        prompt: "Which line usually comes first on an Income Statement?",
        choices: ["Revenue", "Taxes", "Net income", "Cash"],
        correctIndex: 0,
      },
      {
        type: "mc",
        id: "w1q6_2",
        prompt: "If revenue rises but profit falls, what's the MOST likely reason?",
        choices: [
          "Costs rose faster than revenue",
          "Taxes disappeared",
          "Revenue is fake",
          "Profit is always random",
        ],
        correctIndex: 0,
      },
      {
        type: "mc",
        id: "w1q6_3",
        prompt: "Which is a red flag?",
        choices: [
          "Revenue grows and costs grow a little",
          "Revenue flat but costs spike up",
          "Revenue up and profit up",
          "Stable margins",
        ],
        correctIndex: 1,
      },
      {
        type: "numeric",
        id: "w1q6_4",
        prompt: "Revenue = 120. Expenses = 90. Profit = ?",
        answer: 30,
        tolerance: 0,
      },
      {
        type: "mc",
        id: "w1q6_5",
        prompt: "Margins are basically…",
        choices: [
          "How much profit you keep from each $1 of revenue",
          "How many employees you have",
          "Your tax rate",
          "Your cash balance",
        ],
        correctIndex: 0,
      },
      {
        type: "boolean",
        id: "w1q6_6",
        prompt: "Big revenue does NOT automatically mean a good business.",
        correct: true,
      },
    ],
    bossQuestion: {
      type: "mc",
      id: "w1b6",
      prompt:
        "Business A: Revenue 200, Profit 10.\nBusiness B: Revenue 80, Profit 16.\nWhich business is 'better' at keeping money (more efficient)?",
      choices: [
        "Business A",
        "Business B",
        "They are the same",
        "Impossible to tell",
      ],
      correctIndex: 1,
    },
    mastery: {
      badgeName: "Income Statement Reader",
      celebrationCopy:
        "You can now read an Income Statement and spot what matters.\nWorld 2 is where you start forecasting the future.",
      salaryReward: 1700,
    },
  },

  // =========================
  // WORLD 2 (GAME EDITION) — LESSONS
  // =========================

  // -------------------------
  // NODE 1 — Growth Rates
  // -------------------------
  w2_lesson_1_growth: {
    id: "w2_lesson_1_growth",
    headline: "Growth rate = the simplest forecast spell.",
    story:
      "If revenue was $100 last year and you assume 10% growth, next year becomes $110.\n\nIt's not magic. It's a rule.\n\nThen you sanity-check the rule (because reality bites).",
    ruleCard: "Next Revenue = Last Revenue × (1 + growth rate).",
    questions: [
      {
        type: "order",
        id: "w2q1_1",
        prompt: "Put the forecasting steps in the best order.",
        items: [
          { id: "a", label: "Pick a growth rate" },
          { id: "b", label: "Calculate next year revenue" },
          { id: "c", label: "Sanity-check if it's realistic" },
        ],
        correctOrder: ["a", "b", "c"],
      },
      {
        type: "numeric",
        id: "w2q1_2",
        prompt: "Last revenue = 100. Growth = 10%. Next revenue = ?",
        answer: 110,
        tolerance: 0,
      },
      {
        type: "numeric",
        id: "w2q1_3",
        prompt: "Last revenue = 200. Growth = 5%. Next revenue = ?",
        answer: 210,
        tolerance: 0,
      },
      {
        type: "numeric",
        id: "w2q1_4",
        prompt: "Last revenue = 80. Growth = -10%. Next revenue = ?",
        answer: 72,
        tolerance: 0,
      },
      {
        type: "drag_match",
        id: "w2q1_5",
        prompt: "Match the growth rate to what it means.",
        items: [
          { id: "i1", label: "+10%" },
          { id: "i2", label: "0%" },
          { id: "i3", label: "-5%" },
        ],
        slots: [
          { id: "s1", label: "Revenue goes up" },
          { id: "s2", label: "Revenue stays flat" },
          { id: "s3", label: "Revenue goes down" },
        ],
        correct: { s1: "i1", s2: "i2", s3: "i3" },
      },
      {
        type: "mc",
        id: "w2q1_6",
        prompt: "Which growth assumption is MOST aggressive?",
        choices: ["2%", "8%", "15%", "0%"],
        correctIndex: 2,
      },
    ],
    bossQuestion: {
      type: "numeric",
      id: "w2b1",
      prompt: "Last revenue = 150. Growth = 20%. Next revenue = ?",
      answer: 180,
      tolerance: 0,
    },
    mastery: {
      badgeName: "Growth Baseline Builder",
      celebrationCopy: "You can forecast revenue with one clean rule.\nNow we make it smarter.",
      salaryReward: 1600,
    },
  },

  // -------------------------
  // NODE 2 — Price × Volume
  // -------------------------
  w2_lesson_2_pxv: {
    id: "w2_lesson_2_pxv",
    headline: "Revenue is often just: Price × Volume.",
    story:
      "If you sell 10 cups at $2 each, you make $20.\n\nBusinesses do this too:\nPrice per subscription × subscribers.\nPrice per burger × burgers.\n\nThis helps you explain WHY revenue changed.",
    ruleCard: "Revenue = Price × Volume.",
    questions: [
      {
        type: "numeric",
        id: "w2q2_1",
        prompt: "Price = 3. Volume = 50. Revenue = ?",
        answer: 150,
        tolerance: 0,
      },
      {
        type: "numeric",
        id: "w2q2_2",
        prompt: "Price = 10. Volume = 12. Revenue = ?",
        answer: 120,
        tolerance: 0,
      },
      {
        type: "drag_match",
        id: "w2q2_3",
        prompt: "Match the change to what it does to revenue (assume the other stays the same).",
        items: [
          { id: "i1", label: "Price goes up" },
          { id: "i2", label: "Volume goes up" },
          { id: "i3", label: "Price goes down" },
          { id: "i4", label: "Volume goes down" },
        ],
        slots: [
          { id: "s1", label: "Revenue increases" },
          { id: "s2", label: "Revenue decreases" },
          { id: "s3", label: "Revenue increases" },
          { id: "s4", label: "Revenue decreases" },
        ],
        correct: { s1: "i1", s2: "i3", s3: "i2", s4: "i4" },
      },
      {
        type: "order",
        id: "w2q2_4",
        prompt: "Put the logic in order: Why did revenue increase?",
        items: [
          { id: "a", label: "Find old price and old volume" },
          { id: "b", label: "Find new price and new volume" },
          { id: "c", label: "See whether price or volume changed more" },
        ],
        correctOrder: ["a", "b", "c"],
      },
      {
        type: "mc",
        id: "w2q2_5",
        prompt: "Revenue grew from 100 to 120. Price stayed the same. What happened?",
        choices: ["Volume increased", "Volume decreased", "Price decreased", "Nothing changed"],
        correctIndex: 0,
      },
    ],
    bossQuestion: {
      type: "numeric",
      id: "w2b2",
      prompt: "Price rises 2 → 3. Volume stays 10. New revenue = ?",
      answer: 30,
      tolerance: 0,
    },
    mastery: {
      badgeName: "Price×Volume Detective",
      celebrationCopy: "Now you can explain revenue growth like an analyst.\nNext: CAGR.",
      salaryReward: 1700,
    },
  },

  // -------------------------
  // NODE 3 — CAGR
  // -------------------------
  w2_lesson_3_cagr: {
    id: "w2_lesson_3_cagr",
    headline: "CAGR is one smooth growth speed.",
    story:
      "Revenue can bounce around each year.\n\nCAGR is one clean number that describes the overall speed.\n\nIt's like saying: \"On average, we grew about X% per year.\"",
    ruleCard: "CAGR summarizes multi-year growth into one smooth rate.",
    questions: [
      {
        type: "mc",
        id: "w2q3_1",
        prompt: "CAGR is best described as…",
        choices: [
          "One smooth average growth rate over multiple years",
          "Profit margin",
          "Cash balance",
          "A random guess",
        ],
        correctIndex: 0,
      },
      {
        type: "boolean",
        id: "w2q3_2",
        prompt: "CAGR makes bumpy growth look smooth.",
        correct: true,
      },
      {
        type: "drag_match",
        id: "w2q3_3",
        prompt: "Match the situation to whether CAGR is useful.",
        items: [
          { id: "i1", label: "Comparing growth from 2019→2024" },
          { id: "i2", label: "Only one year of data" },
          { id: "i3", label: "Comparing two companies over 5 years" },
        ],
        slots: [
          { id: "s1", label: "Useful" },
          { id: "s2", label: "Not very useful" },
          { id: "s3", label: "Useful" },
        ],
        correct: { s1: "i1", s2: "i2", s3: "i3" },
      },
      {
        type: "numeric",
        id: "w2q3_4",
        prompt: "If revenue goes 100 → 121 in 2 years, the smooth rate is about 10% per year. Enter: 10",
        answer: 10,
        tolerance: 0,
      },
      {
        type: "boolean",
        id: "w2q3_5",
        prompt: "CAGR tells you the exact revenue in each year.",
        correct: false,
      },
    ],
    bossQuestion: {
      type: "mc",
      id: "w2b3",
      prompt: "What's the main point of CAGR?",
      choices: [
        "One number that summarizes the growth speed over multiple years",
        "Exact year-by-year revenue",
        "Profit after taxes",
        "Cash in bank",
      ],
      correctIndex: 0,
    },
    mastery: {
      badgeName: "CAGR Commander",
      celebrationCopy: "You can speak in analyst shorthand for multi-year growth.\nNow: drivers.",
      salaryReward: 1800,
    },
  },

  // -------------------------
  // NODE 4 — Driver-Based Forecasting
  // -------------------------
  w2_lesson_4_drivers: {
    id: "w2_lesson_4_drivers",
    headline: "Drivers are the WHY behind revenue.",
    story:
      "A lazy forecast says: \"Revenue +10%.\"\n\nA driver forecast says: \"We're opening 3 stores and each store sells $50.\"\n\nDrivers make forecasts explainable and easier to check.",
    ruleCard: "Drivers turn guesses into explainable math.",
    questions: [
      {
        type: "drag_match",
        id: "w2q4_1",
        prompt: "Match the forecast to the type.",
        items: [
          { id: "i1", label: "Revenue +10% because vibes" },
          { id: "i2", label: "Revenue +10% because +2 stores" },
          { id: "i3", label: "Revenue +20% because price +5% and users +15%" },
        ],
        slots: [
          { id: "s1", label: "Not driver-based" },
          { id: "s2", label: "Driver-based" },
          { id: "s3", label: "Driver-based" },
        ],
        correct: { s1: "i1", s2: "i2", s3: "i3" },
      },
      {
        type: "numeric",
        id: "w2q4_2",
        prompt: "New stores = 3. Revenue per store = 50. Added revenue = ?",
        answer: 150,
        tolerance: 0,
      },
      {
        type: "numeric",
        id: "w2q4_3",
        prompt: "Subscribers = 100. Price per month = 5. Monthly revenue = ?",
        answer: 500,
        tolerance: 0,
      },
      {
        type: "order",
        id: "w2q4_4",
        prompt: "Order the driver-based build.",
        items: [
          { id: "a", label: "Pick the driver (stores/users/units)" },
          { id: "b", label: "Estimate the driver level (how many?)" },
          { id: "c", label: "Multiply into revenue" },
        ],
        correctOrder: ["a", "b", "c"],
      },
      {
        type: "boolean",
        id: "w2q4_5",
        prompt: "Drivers make it easier to sanity-check forecasts.",
        correct: true,
      },
    ],
    bossQuestion: {
      type: "mc",
      id: "w2b4",
      prompt: "What makes a 50% revenue growth forecast believable?",
      choices: [
        "You wrote it in bold",
        "Drivers explain it (new stores/users/price)",
        "You feel confident",
        "A meme said so",
      ],
      correctIndex: 1,
    },
    mastery: {
      badgeName: "Driver Builder",
      celebrationCopy: "Now your forecast has a backbone.\nNext: segments.",
      salaryReward: 1900,
    },
  },

  // -------------------------
  // NODE 5 — Segment Revenue Builds
  // -------------------------
  w2_lesson_5_segments: {
    id: "w2_lesson_5_segments",
    headline: "Total revenue is often multiple mini-businesses added together.",
    story:
      "A company might sell:\n- Product A\n- Product B\n- Product C\n\nInstead of one big guess, you forecast each segment and add them up.\nThat makes your forecast smarter.",
    ruleCard: "Total Revenue = Segment A + Segment B + Segment C…",
    questions: [
      {
        type: "numeric",
        id: "w2q5_1",
        prompt: "Segment A = 60, Segment B = 40. Total revenue = ?",
        answer: 100,
        tolerance: 0,
      },
      {
        type: "numeric",
        id: "w2q5_2",
        prompt: "A=120, B=30, C=50. Total revenue = ?",
        answer: 200,
        tolerance: 0,
      },
      {
        type: "drag_match",
        id: "w2q5_3",
        prompt: "Match the segment to the likely growth story.",
        items: [
          { id: "i1", label: "New product just launched" },
          { id: "i2", label: "Mature product in a stable market" },
          { id: "i3", label: "Old product getting replaced" },
        ],
        slots: [
          { id: "s1", label: "Fast growth possible" },
          { id: "s2", label: "Slow steady growth" },
          { id: "s3", label: "Decline possible" },
        ],
        correct: { s1: "i1", s2: "i2", s3: "i3" },
      },
      {
        type: "mc",
        id: "w2q5_4",
        prompt: "Why forecast by segment?",
        choices: [
          "Different segments grow differently",
          "It removes assumptions",
          "It guarantees accuracy",
          "It avoids math",
        ],
        correctIndex: 0,
      },
      {
        type: "order",
        id: "w2q5_5",
        prompt: "Order the segment forecast flow.",
        items: [
          { id: "a", label: "Forecast each segment" },
          { id: "b", label: "Add segments to get total revenue" },
          { id: "c", label: "Sanity-check the total" },
        ],
        correctOrder: ["a", "b", "c"],
      },
    ],
    bossQuestion: {
      type: "mc",
      id: "w2b5",
      prompt: "One segment shrinks, one grows fast. What happens to total revenue?",
      choices: ["It depends on which effect is bigger", "It always grows", "It always shrinks", "It becomes zero"],
      correctIndex: 0,
    },
    mastery: {
      badgeName: "Segment Stacker",
      celebrationCopy: "You can now forecast like the company is LEGO pieces.\nNext: sanity checks.",
      salaryReward: 2000,
    },
  },

  // -------------------------
  // NODE 6 — Revenue Sanity Checks
  // -------------------------
  w2_lesson_6_sanity: {
    id: "w2_lesson_6_sanity",
    headline: "Sanity checks stop spreadsheet fantasy.",
    story:
      "A forecast should pass the common-sense test.\n\nAsk:\n- Is this growth rate realistic?\n- Do the drivers fit reality?\n- Did we accidentally make the company 10× bigger overnight?\n\nSanity checks save you from embarrassment.",
    ruleCard: "Sanity checks ask: 'Does this make sense in the real world?'",
    questions: [
      {
        type: "drag_match",
        id: "w2q6_1",
        prompt: "Match the forecast to: reasonable or suspicious.",
        items: [
          { id: "i1", label: "Revenue +5% with stable customers" },
          { id: "i2", label: "Revenue +300% forever with no drivers" },
          { id: "i3", label: "Revenue +20% with new stores + price increase" },
        ],
        slots: [
          { id: "s1", label: "Reasonable" },
          { id: "s2", label: "Suspicious" },
          { id: "s3", label: "Reasonable" },
        ],
        correct: { s1: "i1", s2: "i2", s3: "i3" },
      },
      {
        type: "boolean",
        id: "w2q6_2",
        prompt: "Sanity checks help catch unrealistic assumptions.",
        correct: true,
      },
      {
        type: "mc",
        id: "w2q6_3",
        prompt: "Revenue growth goes 10% → 12% → 15% → 80%. What's the issue?",
        choices: ["Nothing", "The jump to 80% needs a strong explanation", "Growth can't change", "Revenue is always flat"],
        correctIndex: 1,
      },
      {
        type: "order",
        id: "w2q6_4",
        prompt: "Order the sanity-check sequence.",
        items: [
          { id: "a", label: "Check growth vs history" },
          { id: "b", label: "Check drivers are possible" },
          { id: "c", label: "Check the forecast doesn't explode unrealistically" },
        ],
        correctOrder: ["a", "b", "c"],
      },
      {
        type: "mc",
        id: "w2q6_5",
        prompt: "If a forecast fails sanity checks, what should you do?",
        choices: ["Tighten assumptions / update drivers", "Make it bigger", "Ignore it", "Hide it"],
        correctIndex: 0,
      },
    ],
    bossQuestion: {
      type: "mc",
      id: "w2b6",
      prompt: "Your model says revenue doubles every year forever. Best response?",
      choices: ["Ship it", "Add sanity checks and make assumptions realistic", "Delete the model", "Make it triple instead"],
      correctIndex: 1,
    },
    mastery: {
      badgeName: "Sanity Check Sheriff",
      celebrationCopy: "You can now spot 'spreadsheet fantasy.'\nFinal node: forecasting vs reality.",
      salaryReward: 2100,
    },
  },

  // -------------------------
  // NODE 7 (BOSS) — Forecasting vs Reality
  // -------------------------
  w2_lesson_7_reality: {
    id: "w2_lesson_7_reality",
    headline: "Forecasting is guessing — but disciplined guessing.",
    story:
      "Forecasts are not facts.\n\nReality can change because:\n- customers change\n- competition changes\n- the economy changes\n\nYour job is to make a forecast that is explainable, realistic, and easy to update.",
    ruleCard: "A good forecast is explainable, realistic, and updateable.",
    questions: [
      {
        type: "boolean",
        id: "w2q7_1",
        prompt: "A forecast is guaranteed to happen exactly as predicted.",
        correct: false,
      },
      {
        type: "drag_match",
        id: "w2q7_2",
        prompt: "Match each forecast to how strong it is.",
        items: [
          { id: "i1", label: "\"Revenue +40% because vibes.\"" },
          { id: "i2", label: "\"Revenue +40% because price +5% and users +33%.\"" },
          { id: "i3", label: "\"Revenue +40% because last year was good.\"" },
        ],
        slots: [
          { id: "s1", label: "Weak" },
          { id: "s2", label: "Strong" },
          { id: "s3", label: "Weak" },
        ],
        correct: { s1: "i1", s2: "i2", s3: "i3" },
      },
      {
        type: "mc",
        id: "w2q7_3",
        prompt: "New data comes in. What should you do?",
        choices: ["Update assumptions and re-forecast", "Never change anything", "Hide the numbers", "Delete the model"],
        correctIndex: 0,
      },
      {
        type: "order",
        id: "w2q7_4",
        prompt: "Order the disciplined forecasting mindset.",
        items: [
          { id: "a", label: "Use drivers" },
          { id: "b", label: "Sanity-check" },
          { id: "c", label: "Update when reality changes" },
        ],
        correctOrder: ["a", "b", "c"],
      },
      {
        type: "boolean",
        id: "w2q7_5",
        prompt: "A good forecast is easy to update when new info arrives.",
        correct: true,
      },
    ],
    bossQuestion: {
      type: "mc",
      id: "w2b7",
      prompt: "Which explanation is strongest for 40% revenue growth next year?",
      choices: [
        "\"Because we're awesome.\"",
        "\"Because price +2% and customers +35% from a new channel.\"",
        "\"Because I feel it.\"",
        "\"Because last year was good.\"",
      ],
      correctIndex: 1,
    },
    mastery: {
      badgeName: "Forecasting Realist",
      celebrationCopy: "You forecast like an analyst now.\nWorld 3: costs + margins (profit gets spicy).",
      salaryReward: 2400,
    },
  },
};

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

export function getWorldBySlug(slug: string): World | undefined {
  return WORLDS.find((w) => w.slug === slug);
}

export function getLessonById(id: string): Lesson | undefined {
  return LESSONS[id];
}

export function getWorldNodes(worldSlug: string): PathNode[] {
  const world = getWorldBySlug(worldSlug);
  return world ? world.nodes : [];
}
