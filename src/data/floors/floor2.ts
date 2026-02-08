import type { Node } from "@/lib/curriculum";
import { FLOOR2_QUESTIONS } from "@/lib/floor2Questions";
import type { FloorSpec } from "./types";

const SALARY = 10_000;

export const floor2: FloorSpec = {
  floorNumber: 2,
  title: "Accounting – Concepts",
  nodes: [
    {
      id: "node-three-statements",
      floorNumber: 2,
      title: "The Three Financial Statements",
      slug: "three-financial-statements",
      salaryReward: SALARY,
      difficulty: "Easy",
      lesson: {
        headline: "Think of a company like a person with three reports.",
        bullets: [
          "Income Statement = Scoreboard. It shows how much money the company made over time. Revenue comes in, expenses go out, profit is what's left.",
          "Balance Sheet = Snapshot. It shows what the company owns and owes at one moment. Assets, liabilities, and equity.",
          "Cash Flow Statement = Bank App. It shows where cash actually moved in and out.",
        ],
        analogy: "Each statement tells a different part of the story.",
        recap: "Income = scoreboard. Balance = snapshot. Cash flow = bank app.",
      },
      questions: [],
    },
    {
      id: "node-statements-linked",
      floorNumber: 2,
      title: "How the Three Statements Are Linked",
      slug: "statements-linked",
      salaryReward: SALARY,
      difficulty: "Easy",
      lesson: {
        headline: "The three statements talk to each other.",
        bullets: [
          "Profit from the income statement flows into equity on the balance sheet.",
          "Cash from the cash flow statement changes cash on the balance sheet.",
          "The balance sheet always balances: Assets = Liabilities + Equity.",
        ],
        analogy: "If one statement changes, the others react.",
        recap: "If one statement changes, the others react.",
      },
      questions: [],
    },
    {
      id: "node-depreciation-increases",
      floorNumber: 2,
      title: "When Depreciation Increases",
      slug: "depreciation-increases",
      salaryReward: SALARY,
      difficulty: "Easy",
      lesson: {
        headline: "Depreciation spreads the cost of equipment over time.",
        bullets: [
          "When depreciation goes up: Income Statement—profit goes down. Cash Flow—cash goes up (it's a non-cash expense). Balance Sheet—assets go down, cash goes up.",
          "Depreciation lowers taxes but does not use cash.",
        ],
        analogy: "Depreciation lowers taxes but does not use cash.",
        recap: "Depreciation lowers taxes but does not use cash.",
      },
      questions: [],
    },
    {
      id: "node-dividends",
      floorNumber: 2,
      title: "When a Company Issues Dividends",
      slug: "dividends",
      salaryReward: SALARY,
      difficulty: "Easy",
      lesson: {
        headline: "Dividends are cash paid to owners.",
        bullets: [
          "When dividends are paid: Income Statement—no change. Cash Flow—cash goes out. Balance Sheet—cash goes down, equity goes down.",
          "Dividends reward owners but reduce company cash.",
        ],
        analogy: "Dividends reward owners but reduce company cash.",
        recap: "Dividends reward owners but reduce company cash.",
      },
      questions: [],
    },
    {
      id: "node-working-capital",
      floorNumber: 2,
      title: "Working Capital",
      slug: "working-capital",
      salaryReward: SALARY,
      difficulty: "Easy",
      lesson: {
        headline: "Working capital measures short-term money health.",
        bullets: [
          "Working Capital = Current Assets − Current Liabilities.",
          "It shows if a company can pay bills soon and keep operating smoothly.",
        ],
        analogy: "Think of it as money for daily life.",
        recap: "Think of it as money for daily life.",
      },
      questions: [],
    },
    {
      id: "node-why-working-capital",
      floorNumber: 2,
      title: "Why Working Capital Matters",
      slug: "why-working-capital",
      salaryReward: SALARY,
      difficulty: "Easy",
      lesson: {
        headline: "A company can be profitable and still fail if it runs out of cash.",
        bullets: [
          "Good working capital means bills get paid, employees get paid, business keeps running.",
          "Bad working capital creates cash stress.",
        ],
        analogy: "Bad working capital creates cash stress.",
        recap: "Bad working capital creates cash stress.",
      },
      questions: [],
    },
    {
      id: "node-deferred-revenue",
      floorNumber: 2,
      title: "Deferred Revenue",
      slug: "deferred-revenue",
      salaryReward: SALARY,
      difficulty: "Easy",
      lesson: {
        headline: "Deferred revenue is money received before work is done.",
        bullets: [
          "Example: You pay for Netflix before watching. Netflix owes you the service.",
          "Until the work is done, the money is a liability.",
        ],
        analogy: "Until the work is done, the money is a liability.",
        recap: "Until the work is done, the money is a liability.",
      },
      questions: [],
    },
    {
      id: "node-goodwill",
      floorNumber: 2,
      title: "Goodwill",
      slug: "goodwill",
      salaryReward: SALARY,
      difficulty: "Easy",
      lesson: {
        headline: "Goodwill is extra value paid in an acquisition.",
        bullets: [
          "If you buy a company for more than its book value, the extra is goodwill.",
          "It represents brand, reputation, customers, and trust.",
        ],
        analogy: "It represents brand, reputation, customers, and trust.",
        recap: "It represents brand, reputation, customers, and trust.",
      },
      questions: [],
    },
    {
      id: "node-goodwill-creation",
      floorNumber: 2,
      title: "What Creates Goodwill in an Acquisition",
      slug: "goodwill-creation",
      salaryReward: SALARY,
      difficulty: "Easy",
      lesson: {
        headline: "Goodwill is created when buyers believe a company is worth more than it looks on paper.",
        bullets: [
          "This can be due to: strong brand, loyal customers, growth expectations, synergies.",
          "Goodwill exists because of future belief.",
        ],
        analogy: "Goodwill exists because of future belief.",
        recap: "Goodwill exists because of future belief.",
      },
      questions: [],
    },
    {
      id: "node-cash-vs-accrual",
      floorNumber: 2,
      title: "Cash vs Accrual Accounting",
      slug: "cash-vs-accrual",
      salaryReward: SALARY,
      difficulty: "Easy",
      lesson: {
        headline: "There are two ways to count money.",
        bullets: [
          "Cash accounting: count money when cash moves.",
          "Accrual accounting: count money when work happens. Most companies use accrual because it shows the real picture.",
        ],
        analogy: "Most companies use accrual because it shows the real picture.",
        recap: "Most companies use accrual because it shows the real picture.",
      },
      questions: [],
    },
  ] as Node[],
  questions: FLOOR2_QUESTIONS,
  completion: {
    lastNodeId: "node-cash-vs-accrual",
    message: "You just unlocked the language of business.",
    nextFloor: "Floor 3: Accounting – Calculations",
  },
};
