import type { Node } from "@/lib/curriculum";
import { FLOOR1_QUESTIONS } from "@/lib/floor1Questions";
import type { FloorSpec } from "./types";

const SALARY = 20_000;

export const floor1: FloorSpec = {
  floorNumber: 1,
  title: "Finance Concepts",
  nodes: [
    {
      id: "node-assets-liabilities",
      floorNumber: 1,
      title: "Assets vs Liabilities",
      slug: "assets-vs-liabilities",
      salaryReward: SALARY,
      difficulty: "Easy",
      lesson: {
        headline: "Imagine a company like a kid with a backpack.",
        bullets: [
          "Assets are things the kid HAS that help them. Examples: Cash, a laptop, a bike.",
          "Liabilities are things the kid OWES. Examples: Borrowed money, a loan, a credit card bill.",
          "Assets help you. Liabilities weigh you down.",
        ],
        analogy: "Companies work the same way.",
        recap: "Assets help you. Liabilities weigh you down. Companies work the same way.",
      },
      questions: [],
    },
    {
      id: "node-debt-equity",
      floorNumber: 1,
      title: "Debt vs Equity",
      slug: "debt-vs-equity",
      salaryReward: SALARY,
      difficulty: "Easy",
      lesson: {
        headline: "Companies need money to grow. They have two choices.",
        bullets: [
          "Debt means borrowing money. It must be paid back and it has interest.",
          "Equity means selling part of the company. No payback required; ownership is shared.",
        ],
        analogy: "Debt = borrowing. Equity = sharing ownership.",
        recap: "Debt = borrowing. Equity = sharing ownership.",
      },
      questions: [],
    },
    {
      id: "node-why-equity",
      floorNumber: 1,
      title: "Why Issue Equity Instead of Debt",
      slug: "why-equity-instead-of-debt",
      salaryReward: SALARY,
      difficulty: "Easy",
      lesson: {
        headline: "Some companies don't want to borrow money.",
        bullets: [
          "This happens when: they are new, they don't make steady cash, or they already owe a lot.",
          "Equity is safer because: no required payments, no interest, investors share the risk.",
        ],
        analogy: "Equity = less pressure.",
        recap: "Equity = less pressure.",
      },
      questions: [],
    },
    {
      id: "node-why-debt",
      floorNumber: 1,
      title: "Why Issue Debt Instead of Equity",
      slug: "why-debt-instead-of-equity",
      salaryReward: SALARY,
      difficulty: "Easy",
      lesson: {
        headline: "Strong companies often prefer debt.",
        bullets: [
          "They keep full ownership. Debt is usually cheaper. Interest can lower taxes.",
          "If cash is steady, debt makes sense.",
        ],
        analogy: "Debt = confidence.",
        recap: "Debt = confidence.",
      },
      questions: [],
    },
    {
      id: "node-pe-what-they-want",
      floorNumber: 1,
      title: "What Private Equity Investors Look For",
      slug: "private-equity-what-they-want",
      salaryReward: SALARY,
      difficulty: "Easy",
      lesson: {
        headline: "Private equity investors buy companies to improve them and sell them later for more money.",
        bullets: [
          "They like companies that: make steady money, can grow, have good management, aren't too risky.",
        ],
        analogy: "Think: Buy → Improve → Sell.",
        recap: "Buy → Improve → Sell.",
      },
      questions: [],
    },
    {
      id: "node-drivers-value",
      floorNumber: 1,
      title: "Drivers of Business Value",
      slug: "drivers-of-business-value",
      salaryReward: SALARY,
      difficulty: "Easy",
      lesson: {
        headline: "A company is worth more when it makes more profit, grows faster, has less risk, has loyal customers, and has strong leadership.",
        bullets: ["Simple rule: More money + growth − risk = higher value."],
        analogy: "More money + growth − risk = higher value.",
        recap: "More money + growth − risk = higher value.",
      },
      questions: [],
    },
  ] as Node[],
  questions: FLOOR1_QUESTIONS,
  completion: {
    lastNodeId: "node-drivers-value",
    message: "You now understand what most candidates don't.",
    nextFloor: "Floor 2: Accounting – Concepts",
  },
};
