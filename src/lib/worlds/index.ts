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

export type ScenarioQuestion = {
  type: "scenario";
  id: string;
  title?: string;
  context: string;
  prompt: string;
  choices: string[];
  correctIndex: number;
};

export type CashMeterQuestion = {
  type: "cash_meter";
  id: string;
  title?: string;
  startingCash: number;
  prompt: string;
  steps: Array<{
    id: string;
    label: string;
    direction: "wc_asset" | "wc_liability";
    polarity: "increase" | "decrease";
    amount: number;
  }>;
  correctEndingCash: number;
};

export type Question =
  | MCQuestion
  | BooleanQuestion
  | FillQuestion
  | NumericQuestion
  | DragMatchQuestion
  | OrderQuestion
  | DragQuestion
  | ScenarioQuestion
  | CashMeterQuestion;

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
  // =========================
  // WORLD 3 (MAX GAMEY + SCENARIO) — DATA
  // =========================
  {
    id: "w3",
    slug: "world-3",
    title: "World 3: Costs & Margins",
    description: "Train analyst intuition: what costs move, and why margins change.",
    nodes: [
      { id: "w3n1", title: "Deep Fixed vs Variable Costs", order: 1, lessonId: "w3_lesson_1_fixed_variable", salaryReward: 1700, isBoss: false },
      { id: "w3n2", title: "Gross vs Operating Profit", order: 2, lessonId: "w3_lesson_2_profit_levels", salaryReward: 1800, isBoss: false },
      { id: "w3n3", title: "Margin Expansion", order: 3, lessonId: "w3_lesson_3_expansion", salaryReward: 1900, isBoss: false },
      { id: "w3n4", title: "Margin Compression", order: 4, lessonId: "w3_lesson_4_compression", salaryReward: 1900, isBoss: false },
      { id: "w3n5", title: "Operating Leverage", order: 5, lessonId: "w3_lesson_5_operating_leverage", salaryReward: 2100, isBoss: false },
      { id: "w3n6", title: "Cost Structure Red Flags", order: 6, lessonId: "w3_lesson_6_red_flags", salaryReward: 2400, isBoss: true },
    ],
  },
  // =========================
  // WORLD 4 (BALANCE SHEET) — DATA
  // =========================
  {
    id: "w4",
    slug: "world-4",
    title: "World 4: Balance Sheet",
    description: "Learn the company's 'stuff' (assets), 'IOUs' (liabilities), and 'owner share' (equity).",
    nodes: [
      { id: "w4n1", title: "Assets vs Liabilities vs Equity", order: 1, lessonId: "w4_lesson_1_ale", salaryReward: 1900, isBoss: false },
      { id: "w4n2", title: "Current vs Non-Current", order: 2, lessonId: "w4_lesson_2_current_noncurrent", salaryReward: 1900, isBoss: false },
      { id: "w4n3", title: "Retained Earnings Roll-Forward", order: 3, lessonId: "w4_lesson_3_re_rollforward", salaryReward: 2100, isBoss: false },
      { id: "w4n4", title: "Dividends & Buybacks", order: 4, lessonId: "w4_lesson_4_div_buyback", salaryReward: 2200, isBoss: false },
      { id: "w4n5", title: "Other Assets/Liabilities (Plugs)", order: 5, lessonId: "w4_lesson_5_other_plugs", salaryReward: 2200, isBoss: false },
      { id: "w4n6", title: "Balance Sheet Must Balance", order: 6, lessonId: "w4_lesson_6_must_balance", salaryReward: 2400, isBoss: false },
      { id: "w4n7", title: "Balance Sheet Red Flags", order: 7, lessonId: "w4_lesson_7_red_flags", salaryReward: 2600, isBoss: true },
    ],
  },
  // =========================
  // WORLD 5 (WORKING CAPITAL + DYNAMIC CASH METER) — DATA
  // =========================
  {
    id: "w5",
    slug: "world-5",
    title: "World 5: Working Capital",
    description: "Feel cash get trapped (or freed) by A/R, Inventory, A/P, and Deferred Revenue.",
    nodes: [
      { id: "w5n1", title: "What Working Capital Is", order: 1, lessonId: "w5_lesson_1_wc_intro", salaryReward: 2000, isBoss: false },
      { id: "w5n2", title: "Accounts Receivable", order: 2, lessonId: "w5_lesson_2_ar", salaryReward: 2100, isBoss: false },
      { id: "w5n3", title: "Inventory", order: 3, lessonId: "w5_lesson_3_inventory", salaryReward: 2100, isBoss: false },
      { id: "w5n4", title: "Accounts Payable", order: 4, lessonId: "w5_lesson_4_ap", salaryReward: 2200, isBoss: false },
      { id: "w5n5", title: "Deferred Revenue", order: 5, lessonId: "w5_lesson_5_defrev", salaryReward: 2200, isBoss: false },
      { id: "w5n6", title: "WC Roll-Forwards", order: 6, lessonId: "w5_lesson_6_rollforwards", salaryReward: 2300, isBoss: false },
      { id: "w5n7", title: "Net WC Impact", order: 7, lessonId: "w5_lesson_7_net_wc", salaryReward: 2400, isBoss: false },
      { id: "w5n8", title: "Liquidity Analysis", order: 8, lessonId: "w5_lesson_8_liquidity", salaryReward: 2500, isBoss: false },
      { id: "w5n9", title: "Profitable but Dying Case", order: 9, lessonId: "w5_lesson_9_profitable_dying", salaryReward: 2800, isBoss: true },
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

  // =========================
  // WORLD 3 (MAX GAMEY + SCENARIO) — LESSONS
  // =========================

  w3_lesson_1_fixed_variable: {
    id: "w3_lesson_1_fixed_variable",
    headline: "Some costs scale with sales. Some don't. That changes everything.",
    story:
      "Lemonade stand example:\n- Cups + lemons scale when you sell more (variable).\n- Booth rent stays mostly the same (fixed).\n\nFixed vs variable tells you how profits behave when revenue moves.",
    ruleCard: "Variable costs move with volume. Fixed costs stay mostly the same (short term).",
    questions: [
      {
        type: "drag_match",
        id: "w3q1_1",
        prompt: "Match each cost to Fixed or Variable (lemonade stand).",
        items: [
          { id: "i1", label: "Lemons" },
          { id: "i2", label: "Cups" },
          { id: "i3", label: "Monthly booth rent" },
          { id: "i4", label: "Card fee per sale" },
        ],
        slots: [
          { id: "s1", label: "Variable" },
          { id: "s2", label: "Variable" },
          { id: "s3", label: "Fixed" },
          { id: "s4", label: "Variable" },
        ],
        correct: { s1: "i1", s2: "i2", s3: "i3", s4: "i4" },
      },
      {
        type: "scenario",
        id: "w3q1_2",
        title: "Mini Case",
        context:
          "You run a stand.\nRent is $60 per month.\nLemons cost $1 per cup.\n\nYou expect to sell 100 cups this month.",
        prompt: "Which cost is MOST 'locked in' even if you sell 0 cups?",
        choices: ["Lemons", "Rent", "Cups", "Card fees"],
        correctIndex: 1,
      },
      {
        type: "numeric",
        id: "w3q1_3",
        prompt: "You sell 100 cups. Variable cost is $1 per cup. Total variable cost = ?",
        answer: 100,
        tolerance: 0,
      },
      {
        type: "order",
        id: "w3q1_4",
        prompt: "Order the analyst thinking when you see a cost line item.",
        items: [
          { id: "a", label: "Ask: does it depend on units sold?" },
          { id: "b", label: "Decide: fixed vs variable" },
          { id: "c", label: "Predict: what happens if revenue changes?" },
        ],
        correctOrder: ["a", "b", "c"],
      },
      {
        type: "mc",
        id: "w3q1_5",
        prompt: "If sales double, which cost is MOST likely to double?",
        choices: ["Rent", "Insurance", "Raw materials", "Office salary"],
        correctIndex: 2,
      },
    ],
    bossQuestion: {
      type: "scenario",
      id: "w3b1",
      title: "Boss Case",
      context:
        "Two businesses have the same revenue today.\n\nBusiness A has high fixed costs.\nBusiness B has mostly variable costs.\n\nNext month, revenue might jump up.",
      prompt: "Which business is more likely to see profit jump FAST when revenue grows?",
      choices: ["Business A", "Business B", "Both the same", "Neither"],
      correctIndex: 0,
    },
    mastery: {
      badgeName: "Cost Type Spotter",
      celebrationCopy: "You can now predict what costs do when revenue moves.\nNext: the profit staircase.",
      salaryReward: 1700,
    },
  },

  w3_lesson_2_profit_levels: {
    id: "w3_lesson_2_profit_levels",
    headline: "Profit has levels. Analysts care which level is changing.",
    story:
      "Think of profit like a staircase:\nRevenue\n− COGS = Gross Profit\n− Operating Expenses = Operating Profit\n\nGross tells you about the product.\nOperating tells you about the whole business machine.",
    ruleCard: "Gross Profit = Revenue - COGS. Operating Profit = Gross Profit - OpEx.",
    questions: [
      {
        type: "order",
        id: "w3q2_1",
        prompt: "Put the staircase in order (top to bottom).",
        items: [
          { id: "a", label: "Revenue" },
          { id: "b", label: "COGS" },
          { id: "c", label: "Gross Profit" },
          { id: "d", label: "Operating Expenses" },
          { id: "e", label: "Operating Profit" },
        ],
        correctOrder: ["a", "b", "c", "d", "e"],
      },
      {
        type: "numeric",
        id: "w3q2_2",
        prompt: "Revenue 100. COGS 60. Gross Profit = ?",
        answer: 40,
        tolerance: 0,
      },
      {
        type: "numeric",
        id: "w3q2_3",
        prompt: "Gross Profit 40. OpEx 25. Operating Profit = ?",
        answer: 15,
        tolerance: 0,
      },
      {
        type: "drag_match",
        id: "w3q2_4",
        prompt: "Match the cost to where it usually lives.",
        items: [
          { id: "i1", label: "Raw materials" },
          { id: "i2", label: "Shipping per order" },
          { id: "i3", label: "Office rent" },
          { id: "i4", label: "Marketing salaries" },
        ],
        slots: [
          { id: "s1", label: "COGS (hits Gross Profit)" },
          { id: "s2", label: "COGS (hits Gross Profit)" },
          { id: "s3", label: "OpEx (hits Operating Profit)" },
          { id: "s4", label: "OpEx (hits Operating Profit)" },
        ],
        correct: { s1: "i1", s2: "i2", s3: "i3", s4: "i4" },
      },
      {
        type: "scenario",
        id: "w3q2_5",
        title: "Mini Case",
        context:
          "A company has strong Gross Profit.\nBut Operating Profit is weak.\n\nRevenue is fine. COGS is fine.",
        prompt: "What's the most likely problem?",
        choices: ["COGS too high", "Operating expenses too high", "Revenue too high", "Taxes too low"],
        correctIndex: 1,
      },
    ],
    bossQuestion: {
      type: "mc",
      id: "w3b2",
      prompt: "If COGS drops while OpEx stays the same, which improves first?",
      choices: ["Gross Profit", "Taxes", "Cash", "Shares outstanding"],
      correctIndex: 0,
    },
    mastery: {
      badgeName: "Profit Staircase Pro",
      celebrationCopy: "You can now diagnose profit at the right level.\nNext: margin expansion.",
      salaryReward: 1800,
    },
  },

  w3_lesson_3_expansion: {
    id: "w3_lesson_3_expansion",
    headline: "Expansion means you keep MORE money per $1 of revenue.",
    story:
      "If you sell $100 and keep $20 as profit, that's 20% margin.\nIf you later keep $25 on $100, margin expanded.\n\nExpansion usually happens when costs grow slower than revenue.",
    ruleCard: "Margin = Profit ÷ Revenue. Expansion = margin goes up.",
    questions: [
      {
        type: "numeric",
        id: "w3q3_1",
        prompt: "Revenue 100. Profit 20. Margin (%) = ? (enter 20)",
        answer: 20,
        tolerance: 0,
      },
      {
        type: "numeric",
        id: "w3q3_2",
        prompt: "Revenue 100. Profit 25. Margin (%) = ?",
        answer: 25,
        tolerance: 0,
      },
      {
        type: "drag_match",
        id: "w3q3_3",
        prompt: "Match the event to what it usually does to margins.",
        items: [
          { id: "i1", label: "Supplier price cuts" },
          { id: "i2", label: "Automation lowers labor needs" },
          { id: "i3", label: "Heavy discounting" },
        ],
        slots: [
          { id: "s1", label: "Margin up" },
          { id: "s2", label: "Margin up" },
          { id: "s3", label: "Margin down" },
        ],
        correct: { s1: "i1", s2: "i2", s3: "i3" },
      },
      {
        type: "scenario",
        id: "w3q3_4",
        title: "Mini Case",
        context:
          "Revenue grows 10%.\nCosts only grow 3%.\n\nProfit grows faster than revenue.",
        prompt: "What likely happened to margins?",
        choices: ["Expanded", "Compressed", "Stayed exactly the same", "Went negative"],
        correctIndex: 0,
      },
      {
        type: "order",
        id: "w3q3_5",
        prompt: "Order the margin expansion chain reaction.",
        items: [
          { id: "a", label: "Revenue grows" },
          { id: "b", label: "Costs grow slower than revenue" },
          { id: "c", label: "Margin increases" },
        ],
        correctOrder: ["a", "b", "c"],
      },
    ],
    bossQuestion: {
      type: "mc",
      id: "w3b3",
      prompt: "Cleanest definition of margin expansion?",
      choices: ["Profit per $ of revenue increases", "Revenue increases", "Costs exist", "Taxes decrease"],
      correctIndex: 0,
    },
    mastery: {
      badgeName: "Margin Expander",
      celebrationCopy: "You can spot efficiency improving.\nNext: compression (the pain).",
      salaryReward: 1900,
    },
  },

  w3_lesson_4_compression: {
    id: "w3_lesson_4_compression",
    headline: "Compression means you keep LESS per $1 of revenue.",
    story:
      "Margins shrink when costs rise, prices fall, or the business gets sloppy.\n\nAnalysts watch this closely because shrinking margins can crush value.",
    ruleCard: "Compression = margin goes down.",
    questions: [
      {
        type: "scenario",
        id: "w3q4_1",
        title: "Mini Case",
        context:
          "Revenue grows 15%.\nCOGS grows 25%.\n\nProfit barely moves.",
        prompt: "What's the most likely story?",
        choices: ["Margin expansion", "Margin compression", "Operating leverage improving", "No change"],
        correctIndex: 1,
      },
      {
        type: "numeric",
        id: "w3q4_2",
        prompt: "Year 1: Rev 100, Profit 30. Margin = 30. Year 2: Rev 100, Profit 20. Margin = ?",
        answer: 20,
        tolerance: 0,
      },
      {
        type: "drag_match",
        id: "w3q4_3",
        prompt: "Match the cause to what it usually does to margins.",
        items: [
          { id: "i1", label: "Raw material costs spike" },
          { id: "i2", label: "Discount prices hard" },
          { id: "i3", label: "Hire a lot without revenue growth" },
        ],
        slots: [
          { id: "s1", label: "Margin down" },
          { id: "s2", label: "Margin down" },
          { id: "s3", label: "Margin down" },
        ],
        correct: { s1: "i1", s2: "i2", s3: "i3" },
      },
      {
        type: "order",
        id: "w3q4_4",
        prompt: "Order the compression story.",
        items: [
          { id: "a", label: "Costs rise or prices fall" },
          { id: "b", label: "Profit per dollar shrinks" },
          { id: "c", label: "Margin decreases" },
        ],
        correctOrder: ["a", "b", "c"],
      },
      {
        type: "boolean",
        id: "w3q4_5",
        prompt: "Compression can happen even if revenue is growing.",
        correct: true,
      },
    ],
    bossQuestion: {
      type: "mc",
      id: "w3b4",
      prompt: "Revenue up 15% but profit up 2%. Likely margins…",
      choices: ["Expanded", "Compressed", "Stayed the same", "Went infinite"],
      correctIndex: 1,
    },
    mastery: {
      badgeName: "Compression Catcher",
      celebrationCopy: "You can spot margin pain.\nNext: operating leverage (the turbo).",
      salaryReward: 1900,
    },
  },

  w3_lesson_5_operating_leverage: {
    id: "w3_lesson_5_operating_leverage",
    headline: "Operating leverage = profits move faster than revenue (when fixed costs exist).",
    story:
      "If you have fixed costs, extra revenue can turn into profit fast.\n\nThat's why some businesses scale like crazy once they pass break-even.",
    ruleCard: "High fixed costs + growing revenue = profits can jump fast (operating leverage).",
    questions: [
      {
        type: "drag_match",
        id: "w3q5_1",
        prompt: "Match the business to its typical cost structure.",
        items: [
          { id: "i1", label: "Software subscriptions" },
          { id: "i2", label: "Restaurant" },
          { id: "i3", label: "Factory making goods" },
        ],
        slots: [
          { id: "s1", label: "Higher fixed-cost share (often)" },
          { id: "s2", label: "More variable costs (often)" },
          { id: "s3", label: "Mixed fixed + variable (often)" },
        ],
        correct: { s1: "i1", s2: "i2", s3: "i3" },
      },
      {
        type: "scenario",
        id: "w3q5_2",
        title: "Mini Case",
        context:
          "Company A has big fixed costs.\nRevenue increases 20%.\nFixed costs barely change.\n\nProfit jumps a lot.",
        prompt: "What concept is this?",
        choices: ["Operating leverage", "Margin compression", "CAGR", "Tax shield"],
        correctIndex: 0,
      },
      {
        type: "numeric",
        id: "w3q5_3",
        prompt: "Fixed costs = 60. Variable cost = $1 per unit. Units = 50. Total cost = ?",
        answer: 110,
        tolerance: 0,
      },
      {
        type: "numeric",
        id: "w3q5_4",
        prompt: "Revenue = 200. Total cost = 110. Profit = ?",
        answer: 90,
        tolerance: 0,
      },
      {
        type: "order",
        id: "w3q5_5",
        prompt: "Order the operating leverage chain reaction.",
        items: [
          { id: "a", label: "Revenue increases" },
          { id: "b", label: "Fixed costs stay mostly the same" },
          { id: "c", label: "Profit jumps faster than revenue" },
        ],
        correctOrder: ["a", "b", "c"],
      },
    ],
    bossQuestion: {
      type: "scenario",
      id: "w3b5",
      title: "Boss Case",
      context:
        "Two companies grow revenue by 10%.\nCompany A's profit grows 25%.\nCompany B's profit grows 8%.",
      prompt: "Which company likely has stronger operating leverage?",
      choices: ["Company A", "Company B", "They're identical", "Impossible to tell"],
      correctIndex: 0,
    },
    mastery: {
      badgeName: "Operating Leverage Wizard",
      celebrationCopy: "You now get why some companies scale like monsters.\nFinal boss: red flags.",
      salaryReward: 2100,
    },
  },

  w3_lesson_6_red_flags: {
    id: "w3_lesson_6_red_flags",
    headline: "Red flags are patterns that scream: \"Margins might break.\"",
    story:
      "Analysts look for patterns like:\n- costs growing faster than revenue\n- margins shrinking for multiple periods\n- heavy discounting\n- hiring like crazy without revenue\n\nThese patterns can wreck a model fast.",
    ruleCard: "Red flags = costs up faster than revenue, or margin worse without a good reason.",
    questions: [
      {
        type: "drag_match",
        id: "w3q6_1",
        prompt: "Match each situation to: Healthy or Red Flag.",
        items: [
          { id: "i1", label: "Revenue +20%, OpEx +5%" },
          { id: "i2", label: "Revenue +10%, COGS +25%" },
          { id: "i3", label: "Margin down 3 years in a row" },
          { id: "i4", label: "Hiring doubles while revenue is flat" },
        ],
        slots: [
          { id: "s1", label: "Healthy" },
          { id: "s2", label: "Red Flag" },
          { id: "s3", label: "Red Flag" },
          { id: "s4", label: "Red Flag" },
        ],
        correct: { s1: "i1", s2: "i2", s3: "i3", s4: "i4" },
      },
      {
        type: "scenario",
        id: "w3q6_2",
        title: "Mini Case",
        context:
          "A company reports:\nRevenue +12%\nCOGS +22%\n\nManagement says: \"All good.\"",
        prompt: "What's the best analyst reaction?",
        choices: [
          "No problem—growth is growth",
          "This is likely margin compression; investigate pricing/cost pressure",
          "Celebrate and stop checking",
          "Ignore COGS completely",
        ],
        correctIndex: 1,
      },
      {
        type: "order",
        id: "w3q6_3",
        prompt: "Order the analyst response when you spot a red flag.",
        items: [
          { id: "a", label: "Identify the cost line causing it (COGS vs OpEx)" },
          { id: "b", label: "Ask: is there a real reason? (pricing, mix, inflation, strategy)" },
          { id: "c", label: "Adjust assumptions + re-forecast" },
        ],
        correctOrder: ["a", "b", "c"],
      },
      {
        type: "boolean",
        id: "w3q6_4",
        prompt: "Costs rising faster than revenue can be a major warning sign.",
        correct: true,
      },
    ],
    bossQuestion: {
      type: "scenario",
      id: "w3b6",
      title: "Final Boss Case",
      context:
        "Year 1:\nRevenue 100\nCOGS 60\nOpEx 20\n\nYear 2:\nRevenue 110\nCOGS 75\nOpEx 22",
      prompt: "What's the cleanest story?",
      choices: [
        "Margin expansion (more efficient)",
        "Margin compression (COGS pressure)",
        "Operating leverage improving",
        "No meaningful change",
      ],
      correctIndex: 1,
    },
    mastery: {
      badgeName: "Red Flag Hunter",
      celebrationCopy: "You can now talk like an analyst about margins, leverage, and red flags.\nNext world: Balance Sheet basics.",
      salaryReward: 2400,
    },
  },

  // =========================
  // WORLD 4 (BALANCE SHEET) — LESSONS
  // =========================

  w4_lesson_1_ale: {
    id: "w4_lesson_1_ale",
    headline: "Balance Sheet = what you own, what you owe, and what's left for owners.",
    story:
      "Imagine a kid owns a bike.\n\nIf they bought it with a loan:\n- The bike is an ASSET (stuff you own)\n- The loan is a LIABILITY (stuff you owe)\n- What's left is EQUITY (owner's share)\n\nThe rule is always:\nAssets = Liabilities + Equity",
    ruleCard: "Assets = Liabilities + Equity (A = L + E). Always.",
    questions: [
      {
        type: "drag_match",
        id: "w4q1_1",
        prompt: "Match each item to Assets, Liabilities, or Equity.",
        items: [
          { id: "i1", label: "Cash" },
          { id: "i2", label: "Accounts payable (bills you owe)" },
          { id: "i3", label: "Inventory" },
          { id: "i4", label: "Retained earnings" },
        ],
        slots: [
          { id: "s1", label: "Asset" },
          { id: "s2", label: "Liability" },
          { id: "s3", label: "Asset" },
          { id: "s4", label: "Equity" },
        ],
        correct: { s1: "i1", s2: "i2", s3: "i3", s4: "i4" },
      },
      {
        type: "scenario",
        id: "w4q1_2",
        title: "Mini Case",
        context:
          "A company has:\nAssets = 200\nLiabilities = 120",
        prompt: "What must Equity be?",
        choices: ["80", "120", "200", "320"],
        correctIndex: 0,
      },
      {
        type: "numeric",
        id: "w4q1_3",
        prompt: "Assets 500. Liabilities 300. Equity = ?",
        answer: 200,
        tolerance: 0,
      },
      {
        type: "boolean",
        id: "w4q1_4",
        prompt: "Equity is what owners would get if the company sold all assets and paid all liabilities.",
        correct: true,
      },
      {
        type: "order",
        id: "w4q1_5",
        prompt: "Order the logic of the balance sheet equation.",
        items: [
          { id: "a", label: "List what the company owns (Assets)" },
          { id: "b", label: "List what the company owes (Liabilities)" },
          { id: "c", label: "Whatever is left belongs to owners (Equity)" },
        ],
        correctOrder: ["a", "b", "c"],
      },
    ],
    bossQuestion: {
      type: "scenario",
      id: "w4b1",
      title: "Boss Case",
      context:
        "Assets are 1,000.\nLiabilities increase by 50.\nAssets stay the same.",
      prompt: "What must happen to Equity for the balance sheet to still balance?",
      choices: ["Equity increases by 50", "Equity decreases by 50", "Nothing changes", "Equity becomes zero"],
      correctIndex: 1,
    },
    mastery: {
      badgeName: "A=L+E Enforcer",
      celebrationCopy: "You now know the one rule you can't break.\nNext: current vs non-current.",
      salaryReward: 1900,
    },
  },

  w4_lesson_2_current_noncurrent: {
    id: "w4_lesson_2_current_noncurrent",
    headline: "Current = happens within ~1 year. Non-current = longer-term.",
    story:
      "Think 'soon' vs 'later':\n- Current assets: cash, A/R, inventory\n- Current liabilities: A/P, accrued expenses\n\nNon-current is longer-term stuff:\n- PP&E (factories)\n- Long-term debt",
    ruleCard: "Current = expected to turn into cash / be paid within ~1 year.",
    questions: [
      {
        type: "drag_match",
        id: "w4q2_1",
        prompt: "Match each item to Current or Non-Current.",
        items: [
          { id: "i1", label: "Cash" },
          { id: "i2", label: "Inventory" },
          { id: "i3", label: "PP&E (equipment)" },
          { id: "i4", label: "Long-term debt" },
        ],
        slots: [
          { id: "s1", label: "Current" },
          { id: "s2", label: "Current" },
          { id: "s3", label: "Non-Current" },
          { id: "s4", label: "Non-Current" },
        ],
        correct: { s1: "i1", s2: "i2", s3: "i3", s4: "i4" },
      },
      {
        type: "scenario",
        id: "w4q2_2",
        title: "Mini Case",
        context:
          "A company must pay this bill in 6 months.",
        prompt: "Is it current or non-current?",
        choices: ["Current", "Non-Current"],
        correctIndex: 0,
      },
      {
        type: "mc",
        id: "w4q2_3",
        prompt: "Which is usually a current liability?",
        choices: ["Accounts payable", "Goodwill", "PP&E", "Retained earnings"],
        correctIndex: 0,
      },
      {
        type: "boolean",
        id: "w4q2_4",
        prompt: "Current items are usually more tied to daily operations.",
        correct: true,
      },
      {
        type: "order",
        id: "w4q2_5",
        prompt: "Order the 'current asset' vibe from most liquid to less liquid.",
        items: [
          { id: "a", label: "Cash" },
          { id: "b", label: "Accounts receivable" },
          { id: "c", label: "Inventory" },
        ],
        correctOrder: ["a", "b", "c"],
      },
    ],
    bossQuestion: {
      type: "scenario",
      id: "w4b2",
      title: "Boss Case",
      context:
        "A company sells inventory today.\nThe customer will pay next month.",
      prompt: "What current asset usually increases first?",
      choices: ["Accounts receivable", "PP&E", "Long-term debt", "Common stock"],
      correctIndex: 0,
    },
    mastery: {
      badgeName: "Current vs Long-Term",
      celebrationCopy: "You can now bucket the balance sheet like an analyst.\nNext: retained earnings roll-forward.",
      salaryReward: 1900,
    },
  },

  w4_lesson_3_re_rollforward: {
    id: "w4_lesson_3_re_rollforward",
    headline: "Retained earnings is basically the company's 'saved profits' account.",
    story:
      "Retained earnings rolls forward like a piggy bank:\n\nRE (start)\n+ Net Income\n- Dividends (money paid out)\n= RE (end)\n\nThis is one of the most important roll-forwards in modeling.",
    ruleCard: "RE_end = RE_start + Net Income - Dividends.",
    questions: [
      {
        type: "numeric",
        id: "w4q3_1",
        prompt: "RE start 100. Net income 30. Dividends 5. RE end = ?",
        answer: 125,
        tolerance: 0,
      },
      {
        type: "scenario",
        id: "w4q3_2",
        title: "Mini Case",
        context:
          "A company has RE start = 200.\nIt loses money: Net income = -20.\nIt still pays dividends = 10.",
        prompt: "What happens to retained earnings?",
        choices: ["It increases", "It decreases", "It stays the same", "It becomes an asset"],
        correctIndex: 1,
      },
      {
        type: "numeric",
        id: "w4q3_3",
        prompt: "RE start 500. Net income 0. Dividends 20. RE end = ?",
        answer: 480,
        tolerance: 0,
      },
      {
        type: "boolean",
        id: "w4q3_4",
        prompt: "If net income is negative, retained earnings can go down.",
        correct: true,
      },
      {
        type: "order",
        id: "w4q3_5",
        prompt: "Order the roll-forward steps.",
        items: [
          { id: "a", label: "Start with last period RE" },
          { id: "b", label: "Add net income" },
          { id: "c", label: "Subtract dividends" },
          { id: "d", label: "You get ending RE" },
        ],
        correctOrder: ["a", "b", "c", "d"],
      },
    ],
    bossQuestion: {
      type: "scenario",
      id: "w4b3",
      title: "Boss Case",
      context:
        "RE start = 1,000\nNet income = 100\nDividends = 0",
      prompt: "Ending RE = ?",
      choices: ["900", "1,000", "1,100", "1,200"],
      correctIndex: 2,
    },
    mastery: {
      badgeName: "RE Roll-Forward",
      celebrationCopy: "You can now roll equity forward like a real modeler.\nNext: dividends & buybacks.",
      salaryReward: 2100,
    },
  },

  w4_lesson_4_div_buyback: {
    id: "w4_lesson_4_div_buyback",
    headline: "Dividends and buybacks both return cash to shareholders.",
    story:
      "Two ways to give owners money:\n1) Dividends = cash paid out\n2) Buybacks = company buys its own stock\n\nBoth reduce equity (because cash leaves the company).",
    ruleCard: "Dividends & buybacks = cash outflows and usually reduce equity.",
    questions: [
      {
        type: "scenario",
        id: "w4q4_1",
        title: "Mini Case",
        context:
          "Company pays a dividend of 10.\nCash goes down by 10.",
        prompt: "What happens to equity?",
        choices: ["Up 10", "Down 10", "No change", "Becomes a liability"],
        correctIndex: 1,
      },
      {
        type: "scenario",
        id: "w4q4_2",
        title: "Mini Case",
        context:
          "Company spends 50 to buy back shares.\nCash goes down by 50.",
        prompt: "What's the cleanest equity impact?",
        choices: ["Equity increases by 50", "Equity decreases by 50", "Liabilities increase by 50", "Assets increase by 50"],
        correctIndex: 1,
      },
      {
        type: "mc",
        id: "w4q4_3",
        prompt: "Which is more like 'paying owners directly'?",
        choices: ["Dividend", "Inventory", "Depreciation", "Accounts payable"],
        correctIndex: 0,
      },
      {
        type: "boolean",
        id: "w4q4_4",
        prompt: "A company can do buybacks even if it has zero dividends.",
        correct: true,
      },
      {
        type: "numeric",
        id: "w4q4_5",
        prompt: "Cash decreases by 20 from dividends. If liabilities don't change, equity must change by ?",
        answer: -20,
        tolerance: 0,
      },
    ],
    bossQuestion: {
      type: "scenario",
      id: "w4b4",
      title: "Boss Case",
      context:
        "Assets = 300\nLiabilities = 200\nEquity = 100\n\nCompany pays dividends of 30 (cash out).",
      prompt: "New equity must be…",
      choices: ["130", "100", "70", "170"],
      correctIndex: 2,
    },
    mastery: {
      badgeName: "Shareholder Payouts",
      celebrationCopy: "You understand how cash returning to owners hits equity.\nNext: 'Other' plugs.",
      salaryReward: 2200,
    },
  },

  w4_lesson_5_other_plugs: {
    id: "w4_lesson_5_other_plugs",
    headline: "Sometimes models use 'Other' as a catch-all bucket.",
    story:
      "Companies often have messy stuff that's hard to forecast.\nThey group it like:\n- Other assets\n- Other liabilities\n\nAnalysts treat these carefully:\n- If it's tied to operations → grow with revenue\n- If unclear/immaterial → straight-line",
    ruleCard: "'Other' items are catch-alls. Forecast based on what they really are.",
    questions: [
      {
        type: "scenario",
        id: "w4q5_1",
        title: "Mini Case",
        context:
          "You see 'Other assets' jump a lot.\nThe footnote says it's mostly prepaid supplier deposits tied to sales volume.",
        prompt: "Best forecast approach?",
        choices: ["Grow with revenue", "Straight-line forever", "Set to zero", "Treat as equity"],
        correctIndex: 0,
      },
      {
        type: "scenario",
        id: "w4q5_2",
        title: "Mini Case",
        context:
          "'Other liabilities' is small and management doesn't explain it.\nIt's not material.",
        prompt: "Best simple approach?",
        choices: ["Straight-line prior period", "Triple it", "Delete it", "Move it to revenue"],
        correctIndex: 0,
      },
      {
        type: "boolean",
        id: "w4q5_3",
        prompt: "You should check footnotes if 'Other' seems large.",
        correct: true,
      },
      {
        type: "mc",
        id: "w4q5_4",
        prompt: "Why are 'Other' items annoying in modeling?",
        choices: ["They combine unrelated stuff", "They are always cash", "They are always taxes", "They are never important"],
        correctIndex: 0,
      },
      {
        type: "order",
        id: "w4q5_5",
        prompt: "Order the 'Other item' workflow.",
        items: [
          { id: "a", label: "Check if it's material (big enough to matter)" },
          { id: "b", label: "Look for footnote detail / what it really is" },
          { id: "c", label: "Choose driver: revenue-tied vs straight-line" },
        ],
        correctOrder: ["a", "b", "c"],
      },
    ],
    bossQuestion: {
      type: "scenario",
      id: "w4b5",
      title: "Boss Case",
      context:
        "Other assets = 5% of total assets and growing with revenue historically.",
      prompt: "What's a reasonable first-pass forecast method?",
      choices: ["Grow with revenue", "Set to zero", "Make it a liability", "Randomize it"],
      correctIndex: 0,
    },
    mastery: {
      badgeName: "Plug Whisperer",
      celebrationCopy: "You can now handle messy 'Other' items like a sane modeler.\nNext: the balance sheet must balance.",
      salaryReward: 2200,
    },
  },

  w4_lesson_6_must_balance: {
    id: "w4_lesson_6_must_balance",
    headline: "If the balance sheet doesn't balance, the model is wrong. Period.",
    story:
      "This is like a video game rule:\nIf A ≠ L + E, the game is broken.\n\nIn real life, most 'model not balancing' problems come from a small mistake somewhere.",
    ruleCard: "A must equal L + E. If not, something is wrong in the model.",
    questions: [
      {
        type: "numeric",
        id: "w4q6_1",
        prompt: "Assets = 900. Liabilities = 500. Equity must be = ?",
        answer: 400,
        tolerance: 0,
      },
      {
        type: "scenario",
        id: "w4q6_2",
        title: "Mini Case",
        context:
          "Assets = 1,000\nLiabilities = 650\nEquity = 300",
        prompt: "Does it balance?",
        choices: ["Yes", "No"],
        correctIndex: 1,
      },
      {
        type: "numeric",
        id: "w4q6_3",
        prompt: "In that case, how big is the imbalance? (A - (L+E))",
        answer: 50,
        tolerance: 0,
      },
      {
        type: "boolean",
        id: "w4q6_4",
        prompt: "A small imbalance (like 1) still means the model is broken.",
        correct: true,
      },
      {
        type: "order",
        id: "w4q6_5",
        prompt: "Order the debugging steps when the balance sheet doesn't balance.",
        items: [
          { id: "a", label: "Check the equation: A vs (L+E)" },
          { id: "b", label: "Look for a missing / double-counted line item" },
          { id: "c", label: "Check sign errors (plus vs minus)" },
          { id: "d", label: "Re-check roll-forwards (RE, debt, PP&E)" },
        ],
        correctOrder: ["a", "b", "c", "d"],
      },
    ],
    bossQuestion: {
      type: "scenario",
      id: "w4b6",
      title: "Boss Case",
      context:
        "Assets = 800\nLiabilities = 500\nEquity = 300\n\nCompany pays dividends of 20 (cash out).",
      prompt: "After dividends, what must equity be for the balance sheet to still balance? (Liabilities unchanged)",
      choices: ["320", "300", "280", "500"],
      correctIndex: 2,
    },
    mastery: {
      badgeName: "Balance Guardian",
      celebrationCopy: "You can now spot and debug imbalance like a real analyst.\nFinal boss: red flags.",
      salaryReward: 2400,
    },
  },

  w4_lesson_7_red_flags: {
    id: "w4_lesson_7_red_flags",
    headline: "Balance sheet red flags are 'something smells off' patterns.",
    story:
      "Red flags analysts watch:\n- Receivables growing way faster than revenue\n- Inventory piling up\n- Weird 'Other' items getting huge\n- Debt rising fast while cash is falling\n\nBalance sheet tells the truth about reality.",
    ruleCard: "Red flags = assets/liabilities moving in weird ways vs the business story.",
    questions: [
      {
        type: "scenario",
        id: "w4q7_1",
        title: "Mini Case",
        context:
          "Revenue grows 5%.\nAccounts receivable grows 30%.",
        prompt: "Cleanest concern?",
        choices: [
          "Customers may not be paying (collection issue)",
          "Margins are expanding",
          "COGS is falling",
          "Tax rate changed",
        ],
        correctIndex: 0,
      },
      {
        type: "scenario",
        id: "w4q7_2",
        title: "Mini Case",
        context:
          "Inventory grows fast for 3 periods.\nSales are flat.",
        prompt: "What's a likely red flag story?",
        choices: [
          "They might be overproducing / can't sell",
          "They are collecting cash faster",
          "They paid down debt",
          "They issued dividends",
        ],
        correctIndex: 0,
      },
      {
        type: "scenario",
        id: "w4q7_3",
        title: "Mini Case",
        context:
          "'Other assets' jumps from 2% → 12% of total assets.\nNo explanation.",
        prompt: "Best analyst reaction?",
        choices: [
          "Investigate footnotes; could hide risks",
          "Ignore it; it's called 'Other' for a reason",
          "Call it revenue",
          "Move it to cash",
        ],
        correctIndex: 0,
      },
      {
        type: "drag_match",
        id: "w4q7_4",
        prompt: "Match the pattern to the likely concern.",
        items: [
          { id: "i1", label: "A/R up much faster than revenue" },
          { id: "i2", label: "Inventory up while sales flat" },
          { id: "i3", label: "Debt up while cash down" },
        ],
        slots: [
          { id: "s1", label: "Collection risk" },
          { id: "s2", label: "Demand / stockpile risk" },
          { id: "s3", label: "Liquidity / leverage risk" },
        ],
        correct: { s1: "i1", s2: "i2", s3: "i3" },
      },
    ],
    bossQuestion: {
      type: "scenario",
      id: "w4b7",
      title: "Final Boss Case",
      context:
        "Year 1:\nRevenue 100\nA/R 10\nInventory 12\nDebt 30\nCash 20\n\nYear 2:\nRevenue 105\nA/R 18\nInventory 20\nDebt 50\nCash 5",
      prompt: "Which combo is the biggest red flag?",
      choices: [
        "A/R and inventory growing way faster than revenue + debt up + cash down",
        "Revenue is growing",
        "Debt exists",
        "Cash is a number",
      ],
      correctIndex: 0,
    },
    mastery: {
      badgeName: "Balance Sheet Detective",
      celebrationCopy: "You can now read the balance sheet like an analyst and spot danger.\nNext world: Working Capital.",
      salaryReward: 2600,
    },
  },

  // -------------------------
  // WORLD 5 — NODE 1 — What Working Capital Is
  // -------------------------
  w5_lesson_1_wc_intro: {
    id: "w5_lesson_1_wc_intro",
    headline: "Working Capital = money stuck in day-to-day operations.",
    story:
      "Think lemonade stand:\n- You buy lemons first (cash out)\n- You sell lemonade\n- Sometimes customers pay later (A/R)\n\nSo you can 'make a sale' but not get cash yet.\nThat gap is working capital.",
    ruleCard:
      "The only rule:\nWC assets ↑ use cash, ↓ give cash.\nWC liabilities ↑ give cash, ↓ use cash.",
    questions: [
      {
        type: "scenario",
        id: "w5q1_0",
        title: "The Only Rule",
        context:
          "Pick the correct cash impact rule.",
        prompt: "Which is correct?",
        choices: [
          "WC assets ↑ cash ↑, WC liabilities ↑ cash ↑",
          "WC assets ↑ cash ↓, WC liabilities ↑ cash ↑",
          "WC assets ↑ cash ↑, WC liabilities ↑ cash ↓",
          "WC assets ↓ cash ↓, WC liabilities ↓ cash ↓",
        ],
        correctIndex: 1,
      },
      {
        type: "drag_match",
        id: "w5q1_1",
        prompt: "Match each item to WC Asset or WC Liability.",
        items: [
          { id: "i1", label: "Accounts Receivable (A/R)" },
          { id: "i2", label: "Inventory" },
          { id: "i3", label: "Accounts Payable (A/P)" },
          { id: "i4", label: "Deferred Revenue" },
        ],
        slots: [
          { id: "s1", label: "WC Asset" },
          { id: "s2", label: "WC Asset" },
          { id: "s3", label: "WC Liability" },
          { id: "s4", label: "WC Liability" },
        ],
        correct: { s1: "i1", s2: "i2", s3: "i3", s4: "i4" },
      },
      {
        type: "scenario",
        id: "w5q1_2",
        title: "Mini Case",
        context:
          "You sell $100 of lemonade.\nCustomers pay $70 today.\n$30 comes later.",
        prompt: "What likely increased?",
        choices: ["Cash", "Accounts receivable", "Inventory", "Accounts payable"],
        correctIndex: 1,
      },
      {
        type: "boolean",
        id: "w5q1_3",
        prompt: "A company can be profitable and still run out of cash because of working capital.",
        correct: true,
      },
      {
        type: "order",
        id: "w5q1_4",
        prompt: "Order the 'cash gets trapped' story.",
        items: [
          { id: "a", label: "You make sales" },
          { id: "b", label: "Customers pay later (A/R rises)" },
          { id: "c", label: "Cash today is lower than profit suggests" },
        ],
        correctOrder: ["a", "b", "c"],
      },
    ],
    bossQuestion: {
      type: "scenario",
      id: "w5b1",
      title: "Boss Case",
      context:
        "Two companies have the same profit.\nCompany A collects cash fast.\nCompany B collects cash slow (A/R rising).",
      prompt: "Which company is more likely to have better cash flow?",
      choices: ["Company A", "Company B", "Both same", "Impossible to tell"],
      correctIndex: 0,
    },
    mastery: {
      badgeName: "WC Basics",
      celebrationCopy: "You understand why cash can lag profit.\nNext: A/R (the 'pay me later' line).",
      salaryReward: 2000,
    },
  },

  // -------------------------
  // WORLD 5 — NODE 2 — Accounts Receivable
  // -------------------------
  w5_lesson_2_ar: {
    id: "w5_lesson_2_ar",
    headline: "A/R = sales you counted… but cash you haven't collected yet.",
    story:
      "A/R is like customer IOUs.\nIf A/R increases, cash is usually worse than profit.\nIf A/R decreases, you collected cash → cash flow improves.",
    ruleCard: "A/R (WC asset): ↑ uses cash, ↓ gives cash.",
    questions: [
      {
        type: "cash_meter",
        id: "w5q2_1",
        title: "Cash Pocket Meter",
        startingCash: 100,
        prompt: "Apply the A/R move and compute ending cash.",
        steps: [
          { id: "s1", label: "Δ Accounts Receivable", direction: "wc_asset", polarity: "increase", amount: 15 },
        ],
        correctEndingCash: 85,
      },
      {
        type: "cash_meter",
        id: "w5q2_2",
        title: "Cash Pocket Meter",
        startingCash: 100,
        prompt: "A/R goes down (collections improved). Compute ending cash.",
        steps: [
          { id: "s1", label: "Δ Accounts Receivable", direction: "wc_asset", polarity: "decrease", amount: 20 },
        ],
        correctEndingCash: 120,
      },
      {
        type: "scenario",
        id: "w5q2_3",
        title: "Mini Case",
        context:
          "Revenue is up 10%.\nA/R is up 40%.",
        prompt: "Cleanest concern?",
        choices: ["Customers paying slower", "COGS fell", "Tax rate changed", "Capex increased"],
        correctIndex: 0,
      },
      {
        type: "boolean",
        id: "w5q2_4",
        prompt: "If A/R decreases, cash flow is helped (all else equal).",
        correct: true,
      },
    ],
    bossQuestion: {
      type: "cash_meter",
      id: "w5b2",
      title: "Boss: A/R Chaos",
      startingCash: 200,
      prompt: "Apply both A/R moves and compute ending cash.",
      steps: [
        { id: "s1", label: "Δ Accounts Receivable", direction: "wc_asset", polarity: "increase", amount: 35 },
        { id: "s2", label: "Δ Accounts Receivable", direction: "wc_asset", polarity: "decrease", amount: 10 },
      ],
      correctEndingCash: 175,
    },
    mastery: {
      badgeName: "A/R Collector",
      celebrationCopy: "You now feel A/R as cash moving.\nNext: inventory (cash turns into stuff).",
      salaryReward: 2100,
    },
  },

  // -------------------------
  // WORLD 5 — NODE 3 — Inventory
  // -------------------------
  w5_lesson_3_inventory: {
    id: "w5_lesson_3_inventory",
    headline: "Inventory = cash turned into stuff on a shelf.",
    story:
      "Inventory rising means you bought more than you sold.\nThat traps cash.\nInventory falling means you sold more than you bought.\nThat frees cash.",
    ruleCard: "Inventory (WC asset): ↑ uses cash, ↓ gives cash.",
    questions: [
      {
        type: "cash_meter",
        id: "w5q3_1",
        title: "Cash Pocket Meter",
        startingCash: 120,
        prompt: "Inventory increases. Compute ending cash.",
        steps: [
          { id: "s1", label: "Δ Inventory", direction: "wc_asset", polarity: "increase", amount: 20 },
        ],
        correctEndingCash: 100,
      },
      {
        type: "cash_meter",
        id: "w5q3_2",
        title: "Cash Pocket Meter",
        startingCash: 120,
        prompt: "Inventory decreases (you sold through stock). Compute ending cash.",
        steps: [
          { id: "s1", label: "Δ Inventory", direction: "wc_asset", polarity: "decrease", amount: 30 },
        ],
        correctEndingCash: 150,
      },
      {
        type: "scenario",
        id: "w5q3_3",
        title: "Mini Case",
        context:
          "Sales are flat.\nInventory is rising fast.",
        prompt: "Likely story?",
        choices: ["Overstock / can't sell", "Collecting cash faster", "Paid down debt", "Margin expansion"],
        correctIndex: 0,
      },
      {
        type: "boolean",
        id: "w5q3_4",
        prompt: "Inventory rising can be a red flag if sales aren't rising too.",
        correct: true,
      },
    ],
    bossQuestion: {
      type: "cash_meter",
      id: "w5b3",
      title: "Boss: Shelf Trap Mix",
      startingCash: 300,
      prompt: "Inventory goes up then down. Compute ending cash.",
      steps: [
        { id: "s1", label: "Δ Inventory", direction: "wc_asset", polarity: "increase", amount: 60 },
        { id: "s2", label: "Δ Inventory", direction: "wc_asset", polarity: "decrease", amount: 10 },
      ],
      correctEndingCash: 250,
    },
    mastery: {
      badgeName: "Inventory Hunter",
      celebrationCopy: "You understand the shelf trap.\nNext: A/P (pay later).",
      salaryReward: 2100,
    },
  },

  // -------------------------
  // WORLD 5 — NODE 4 — Accounts Payable
  // -------------------------
  w5_lesson_4_ap: {
    id: "w5_lesson_4_ap",
    headline: "A/P = bills you owe suppliers. It can boost cash (short-term).",
    story:
      "If A/P increases, you delayed paying suppliers.\nThat keeps cash in your pocket (for now).\nIf A/P decreases, you paid suppliers.\nThat uses cash.",
    ruleCard: "A/P (WC liability): ↑ gives cash, ↓ uses cash.",
    questions: [
      {
        type: "cash_meter",
        id: "w5q4_1",
        title: "Cash Pocket Meter",
        startingCash: 100,
        prompt: "A/P increases. Compute ending cash.",
        steps: [
          { id: "s1", label: "Δ Accounts Payable", direction: "wc_liability", polarity: "increase", amount: 25 },
        ],
        correctEndingCash: 125,
      },
      {
        type: "cash_meter",
        id: "w5q4_2",
        title: "Cash Pocket Meter",
        startingCash: 100,
        prompt: "A/P decreases (you paid suppliers). Compute ending cash.",
        steps: [
          { id: "s1", label: "Δ Accounts Payable", direction: "wc_liability", polarity: "decrease", amount: 30 },
        ],
        correctEndingCash: 70,
      },
      {
        type: "boolean",
        id: "w5q4_3",
        prompt: "A/P rising can temporarily help cash flow.",
        correct: true,
      },
    ],
    bossQuestion: {
      type: "cash_meter",
      id: "w5b4",
      title: "Boss: Supplier Float",
      startingCash: 180,
      prompt: "A/P up then down. Compute ending cash.",
      steps: [
        { id: "s1", label: "Δ Accounts Payable", direction: "wc_liability", polarity: "increase", amount: 40 },
        { id: "s2", label: "Δ Accounts Payable", direction: "wc_liability", polarity: "decrease", amount: 10 },
      ],
      correctEndingCash: 210,
    },
    mastery: {
      badgeName: "A/P Ninja",
      celebrationCopy: "You get the supplier-float effect.\nNext: deferred revenue (cash first).",
      salaryReward: 2200,
    },
  },

  // -------------------------
  // WORLD 5 — NODE 5 — Deferred Revenue
  // -------------------------
  w5_lesson_5_defrev: {
    id: "w5_lesson_5_defrev",
    headline: "Deferred revenue = cash now, revenue later.",
    story:
      "Gift card logic:\nThey pay you today.\nYou record a liability until you deliver.\nWhen deferred revenue rises, cash usually rises too.",
    ruleCard: "Deferred revenue (WC liability): ↑ gives cash, ↓ uses cash.",
    questions: [
      {
        type: "cash_meter",
        id: "w5q5_1",
        title: "Cash Pocket Meter",
        startingCash: 90,
        prompt: "Deferred revenue increases. Compute ending cash.",
        steps: [
          { id: "s1", label: "Δ Deferred Revenue", direction: "wc_liability", polarity: "increase", amount: 30 },
        ],
        correctEndingCash: 120,
      },
      {
        type: "cash_meter",
        id: "w5q5_2",
        title: "Cash Pocket Meter",
        startingCash: 90,
        prompt: "Deferred revenue decreases (you delivered service). Compute ending cash.",
        steps: [
          { id: "s1", label: "Δ Deferred Revenue", direction: "wc_liability", polarity: "decrease", amount: 20 },
        ],
        correctEndingCash: 70,
      },
      {
        type: "scenario",
        id: "w5q5_3",
        title: "Mini Case",
        context:
          "A company sells annual subscriptions.\nCustomers pay upfront.",
        prompt: "Which line likely increases when customers pay?",
        choices: ["Deferred revenue", "Inventory", "PP&E", "Retained earnings immediately"],
        correctIndex: 0,
      },
      {
        type: "boolean",
        id: "w5q5_4",
        prompt: "Deferred revenue increasing usually means cash came in before revenue is recognized.",
        correct: true,
      },
    ],
    bossQuestion: {
      type: "cash_meter",
      id: "w5b5",
      title: "Boss: Subscription Flow",
      startingCash: 50,
      prompt: "Upfront cash then delivery. Compute ending cash.",
      steps: [
        { id: "s1", label: "Δ Deferred Revenue", direction: "wc_liability", polarity: "increase", amount: 40 },
        { id: "s2", label: "Δ Deferred Revenue", direction: "wc_liability", polarity: "decrease", amount: 10 },
      ],
      correctEndingCash: 80,
    },
    mastery: {
      badgeName: "Deferred Rev Wizard",
      celebrationCopy: "You understand cash-before-revenue.\nNext: roll-forwards.",
      salaryReward: 2200,
    },
  },

  // -------------------------
  // WORLD 5 — NODE 6 — WC Roll-Forwards
  // -------------------------
  w5_lesson_6_rollforwards: {
    id: "w5_lesson_6_rollforwards",
    headline: "Roll-forward = Beginning + increases − decreases = Ending.",
    story:
      "This is the modeling pattern you'll use constantly.\nIt works for A/R, inventory, A/P, deferred revenue—everything.\n\nIt's just tracking change over time.",
    ruleCard: "EOP = BOP + Increase − Decrease.",
    questions: [
      {
        type: "numeric",
        id: "w5q6_1",
        prompt: "A/R BOP 10. Increase 8. Decrease 3. A/R EOP = ?",
        answer: 15,
        tolerance: 0,
      },
      {
        type: "numeric",
        id: "w5q6_2",
        prompt: "A/P BOP 20. Increase 6. Decrease 11. A/P EOP = ?",
        answer: 15,
        tolerance: 0,
      },
      {
        type: "scenario",
        id: "w5q6_3",
        title: "Mini Case",
        context:
          "A/R EOP is way higher than BOP.\nManagement says collections improved.",
        prompt: "Best analyst reaction?",
        choices: ["Something doesn't add up; investigate drivers", "Ignore it", "It must be taxes", "It means margins expanded"],
        correctIndex: 0,
      },
      {
        type: "boolean",
        id: "w5q6_4",
        prompt: "Roll-forwards are a structured way to explain why an account changed.",
        correct: true,
      },
    ],
    bossQuestion: {
      type: "numeric",
      id: "w5b6",
      prompt: "Inventory BOP 30. Increase 25. Decrease 10. Inventory EOP = ?",
      answer: 45,
      tolerance: 0,
    },
    mastery: {
      badgeName: "Roll-Forward Machine",
      celebrationCopy: "You can track working capital accounts like an analyst.\nNext: net WC impact (combo cash meter).",
      salaryReward: 2300,
    },
  },

  // -------------------------
  // WORLD 5 — NODE 7 — Net WC Impact
  // -------------------------
  w5_lesson_7_net_wc: {
    id: "w5_lesson_7_net_wc",
    headline: "Net WC impact = combined cash punch of all WC changes.",
    story:
      "Now you combine everything:\n- WC assets ↑ use cash, ↓ give cash\n- WC liabilities ↑ give cash, ↓ use cash\n\nNet cash impact is the sum of all moves.",
    ruleCard: "Add/subtract each WC move based on the rule.",
    questions: [
      {
        type: "cash_meter",
        id: "w5q7_1",
        title: "Combo Cash Meter",
        startingCash: 100,
        prompt: "Apply all WC moves and compute ending cash.",
        steps: [
          { id: "s1", label: "Δ Accounts Receivable", direction: "wc_asset", polarity: "increase", amount: 10 },
          { id: "s2", label: "Δ Inventory", direction: "wc_asset", polarity: "increase", amount: 5 },
          { id: "s3", label: "Δ Accounts Payable", direction: "wc_liability", polarity: "increase", amount: 12 },
        ],
        correctEndingCash: 97,
      },
      {
        type: "cash_meter",
        id: "w5q7_2",
        title: "Combo Cash Meter",
        startingCash: 200,
        prompt: "Apply the moves (watch the polarity).",
        steps: [
          { id: "s1", label: "Δ Deferred Revenue", direction: "wc_liability", polarity: "increase", amount: 20 },
          { id: "s2", label: "Δ Accounts Receivable", direction: "wc_asset", polarity: "increase", amount: 30 },
          { id: "s3", label: "Δ Inventory", direction: "wc_asset", polarity: "decrease", amount: 10 },
        ],
        correctEndingCash: 200,
      },
      {
        type: "boolean",
        id: "w5q7_3",
        prompt: "Net WC can make cash flow much higher or lower than net income.",
        correct: true,
      },
    ],
    bossQuestion: {
      type: "cash_meter",
      id: "w5b7",
      title: "Boss: Net WC Stress Test",
      startingCash: 150,
      prompt: "One period of WC chaos. Where does cash land?",
      steps: [
        { id: "s1", label: "Δ Accounts Receivable", direction: "wc_asset", polarity: "increase", amount: 25 },
        { id: "s2", label: "Δ Inventory", direction: "wc_asset", polarity: "increase", amount: 10 },
        { id: "s3", label: "Δ Accounts Payable", direction: "wc_liability", polarity: "decrease", amount: 5 },
        { id: "s4", label: "Δ Deferred Revenue", direction: "wc_liability", polarity: "increase", amount: 15 },
      ],
      correctEndingCash: 125,
    },
    mastery: {
      badgeName: "Net WC Calculator",
      celebrationCopy: "You can now compute WC's cash impact like a real modeler.\nNext: liquidity analysis.",
      salaryReward: 2400,
    },
  },

  // -------------------------
  // WORLD 5 — NODE 8 — Liquidity Analysis
  // -------------------------
  w5_lesson_8_liquidity: {
    id: "w5_lesson_8_liquidity",
    headline: "Liquidity = can you pay bills without panicking?",
    story:
      "Liquidity is short-term survival.\nWorking capital can quietly drain liquidity even when profits look fine.\n\nYour goal: spot cash stress early.",
    ruleCard: "Liquidity risk rises when cash shrinks and WC assets rise.",
    questions: [
      {
        type: "scenario",
        id: "w5q8_1",
        title: "Mini Case",
        context:
          "Company is profitable.\nBut A/R and inventory are rising fast.\nCash is shrinking.",
        prompt: "Best explanation?",
        choices: [
          "Cash is trapped in working capital",
          "Margins expanded",
          "Taxes disappeared",
          "Capex must be zero",
        ],
        correctIndex: 0,
      },
      {
        type: "cash_meter",
        id: "w5q8_2",
        title: "Liquidity Meter",
        startingCash: 80,
        prompt: "Working capital changes hit cash. Where does cash end?",
        steps: [
          { id: "s1", label: "Δ Accounts Receivable", direction: "wc_asset", polarity: "increase", amount: 25 },
          { id: "s2", label: "Δ Inventory", direction: "wc_asset", polarity: "increase", amount: 15 },
          { id: "s3", label: "Δ Accounts Payable", direction: "wc_liability", polarity: "decrease", amount: 10 },
        ],
        correctEndingCash: 30,
      },
      {
        type: "boolean",
        id: "w5q8_3",
        prompt: "Liquidity problems can show up on the balance sheet before the income statement.",
        correct: true,
      },
    ],
    bossQuestion: {
      type: "scenario",
      id: "w5b8",
      title: "Boss Case",
      context:
        "Cash is falling.\nA/R rising.\nInventory rising.\nA/P falling.",
      prompt: "Best summary?",
      choices: [
        "Liquidity is worsening because cash is trapped and bills are being paid faster",
        "Everything is fine because revenue exists",
        "Margins must be expanding",
        "This only affects taxes",
      ],
      correctIndex: 0,
    },
    mastery: {
      badgeName: "Liquidity Watch",
      celebrationCopy: "You can spot cash stress early.\nFinal boss: profitable but dying.",
      salaryReward: 2500,
    },
  },

  // -------------------------
  // WORLD 5 — NODE 9 (BOSS) — Profitable but Dying Case
  // -------------------------
  w5_lesson_9_profitable_dying: {
    id: "w5_lesson_9_profitable_dying",
    headline: "Final Boss: Profitable… but dying from cash drain.",
    story:
      "Classic trap:\nIncome statement looks good.\nBut cash is disappearing.\nWorking capital is exploding.\n\nYour job: diagnose it in one sentence.",
    ruleCard: "Profit ≠ cash. WC can kill a profitable company.",
    questions: [
      {
        type: "scenario",
        id: "w5q9_1",
        title: "Mini Case",
        context:
          "Net income is up.\nBut CFO is down big.\nA/R and inventory increased a lot.",
        prompt: "Most likely explanation?",
        choices: [
          "Cash got trapped in working capital",
          "Taxes went negative",
          "Depreciation disappeared",
          "Revenue became fake automatically",
        ],
        correctIndex: 0,
      },
      {
        type: "cash_meter",
        id: "w5q9_2",
        title: "The Dying Company Meter",
        startingCash: 120,
        prompt: "Working capital explodes. Where does cash end?",
        steps: [
          { id: "s1", label: "Δ Accounts Receivable", direction: "wc_asset", polarity: "increase", amount: 50 },
          { id: "s2", label: "Δ Inventory", direction: "wc_asset", polarity: "increase", amount: 40 },
          { id: "s3", label: "Δ Accounts Payable", direction: "wc_liability", polarity: "increase", amount: 10 },
        ],
        correctEndingCash: 40,
      },
    ],
    bossQuestion: {
      type: "scenario",
      id: "w5b9",
      title: "FINAL BOSS",
      context:
        "Profit is higher.\nCash fell 120 → 40.\nA/R jumped.\nInventory jumped.\nA/P barely moved.",
      prompt: "Best one-sentence analyst answer?",
      choices: [
        "Profit is real, but cash is trapped in working capital—liquidity risk is rising.",
        "Everything is great because profit is up.",
        "This is only a tax timing issue.",
        "Margins must be expanding.",
      ],
      correctIndex: 0,
    },
    mastery: {
      badgeName: "WC Boss Slayer",
      celebrationCopy: "You just learned why profitable companies can still die: cash trapped in working capital.\nNext world: Depreciation & CapEx.",
      salaryReward: 2800,
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
