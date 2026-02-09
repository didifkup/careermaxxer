import { FLOOR12_QUESTIONS } from "@/lib/floor12Questions";
import type { FloorSpec } from "./types";

const SALARY = 10_000;
const FLOOR_TITLE = "LBO Models – Concepts";

export const floor12: FloorSpec = {
  floorNumber: 12,
  title: FLOOR_TITLE,
  metadata: {
    title: FLOOR_TITLE,
    conceptFocus: "Leveraged buyouts, leverage, LBO candidates, IRR drivers, exits",
    totalReward: 6 * SALARY,
    milestoneCopy: "You now understand how private equity creates returns.",
    backgroundStyle: "accent",
  },
  nodes: [
    {
      id: "node-what-is-lbo",
      floorNumber: 12,
      title: "What is a Leveraged Buyout (LBO)?",
      slug: "what-is-lbo",
      salaryReward: SALARY,
      difficulty: "Easy",
      lesson: {
        headline: "A leveraged buyout means buying a company using a lot of borrowed money.",
        bullets: [
          "Private equity firms: put in some of their own money, borrow the rest using debt. The company's cash flow helps pay back the debt. Leverage = borrowed money.",
        ],
        analogy: "Leverage = borrowed money.",
        recap: "Leverage = borrowed money.",
      },
      questions: [],
    },
    {
      id: "node-why-pe-uses-leverage",
      floorNumber: 12,
      title: "Why Private Equity Uses Leverage",
      slug: "why-pe-uses-leverage",
      salaryReward: SALARY,
      difficulty: "Easy",
      lesson: {
        headline: "Leverage helps increase returns.",
        bullets: [
          "Why? You invest less of your own money, debt is cheaper than equity, and if the company performs well, gains are bigger. Leverage magnifies results—both good and bad.",
        ],
        analogy: "Leverage magnifies results—both good and bad.",
        recap: "Leverage magnifies results—both good and bad.",
      },
      questions: [],
    },
    {
      id: "node-good-lbo-candidate",
      floorNumber: 12,
      title: "What Makes a Good LBO Candidate",
      slug: "good-lbo-candidate",
      salaryReward: SALARY,
      difficulty: "Easy",
      lesson: {
        headline: "Not every company is good for an LBO.",
        bullets: [
          "PE firms like companies with: steady cash flow, low risk, strong margins, few capital spending needs. Stable cash helps pay debt safely.",
        ],
        analogy: "Stable cash helps pay debt safely.",
        recap: "Stable cash helps pay debt safely.",
      },
      questions: [],
    },
    {
      id: "node-how-pe-makes-money",
      floorNumber: 12,
      title: "How PE Firms Make Money in an LBO",
      slug: "how-pe-makes-money",
      salaryReward: SALARY,
      difficulty: "Easy",
      lesson: {
        headline: "PE firms make money in three main ways: paying down debt, growing the business, and selling at a higher price.",
        bullets: [
          "They buy, improve, and sell. Debt goes down. Equity value goes up.",
        ],
        analogy: "They buy, improve, and sell.",
        recap: "They buy, improve, and sell.",
      },
      questions: [],
    },
    {
      id: "node-main-drivers-irr",
      floorNumber: 12,
      title: "Main Drivers of IRR",
      slug: "main-drivers-irr",
      salaryReward: SALARY,
      difficulty: "Easy",
      lesson: {
        headline: "IRR measures how fast money grows.",
        bullets: [
          "Main drivers of IRR: entry price (buy cheap), exit price (sell high), debt usage, how fast you exit. Time matters. Faster gains = higher IRR.",
        ],
        analogy: "Faster gains = higher IRR.",
        recap: "Faster gains = higher IRR.",
      },
      questions: [],
    },
    {
      id: "node-typical-exit-strategies",
      floorNumber: 12,
      title: "Typical Exit Strategies",
      slug: "typical-exit-strategies",
      salaryReward: SALARY,
      difficulty: "Easy",
      lesson: {
        headline: "PE firms don't hold companies forever.",
        bullets: [
          "Common exits: sell to another company, sell to another PE firm, IPO (go public). The goal is a clean exit at a higher value.",
        ],
        analogy: "The goal is a clean exit at a higher value.",
        recap: "The goal is a clean exit at a higher value.",
      },
      questions: [],
    },
  ],
  questions: FLOOR12_QUESTIONS,
  completion: {
    lastNodeId: "node-typical-exit-strategies",
    message: "You now understand how private equity creates returns.",
    nextFloor: "Floor 13: LBO Models – Calculations",
  },
};
