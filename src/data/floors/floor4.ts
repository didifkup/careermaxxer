import type { Node } from "@/lib/curriculum";
import { FLOOR4_QUESTIONS } from "@/lib/floor4Questions";
import type { FloorSpec } from "./types";

const SALARY = 10_000;

export const floor4: FloorSpec = {
  floorNumber: 4,
  title: "Equity Value & Enterprise Value – Concepts",
  nodes: [
    {
      id: "node-ev-what",
      floorNumber: 4,
      title: "What is Enterprise Value?",
      slug: "what-is-ev",
      salaryReward: SALARY,
      difficulty: "Easy",
      lesson: {
        headline: "Enterprise value is the value of the whole company.",
        bullets: [
          "Imagine buying a house: you don't just buy the furniture—you take the mortgage too. Enterprise value means: what would it cost to buy everything?",
          "It includes: the business, the debt, and the cash. Enterprise value = total takeover price.",
        ],
        analogy: "Enterprise value = total takeover price.",
        recap: "Enterprise value = total takeover price.",
      },
      questions: [],
    },
    {
      id: "node-ev-why-instead-of-equity",
      floorNumber: 4,
      title: "Why Use Enterprise Value Instead of Equity Value?",
      slug: "why-ev-instead-of-equity",
      salaryReward: SALARY,
      difficulty: "Easy",
      lesson: {
        headline: "Two companies can look different but still have the same business.",
        bullets: [
          "One might have more debt or more cash. Enterprise value ignores financing choices and focuses on the business itself.",
          "That's why bankers use it.",
        ],
        analogy: "Enterprise value focuses on the business itself.",
        recap: "Enterprise value focuses on the business itself.",
      },
      questions: [],
    },
    {
      id: "node-market-cap-vs-equity",
      floorNumber: 4,
      title: "Market Cap vs Equity Value",
      slug: "market-cap-vs-equity",
      salaryReward: SALARY,
      difficulty: "Easy",
      lesson: {
        headline: "Market cap is the stock price times shares. Equity value is what owners are worth today.",
        bullets: [
          "They are similar, but equity value can include stock options and convertible shares.",
          "Market cap is simple. Equity value is more complete.",
        ],
        analogy: "Market cap is simple. Equity value is more complete.",
        recap: "Market cap is simple. Equity value is more complete.",
      },
      questions: [],
    },
    {
      id: "node-why-subtract-cash",
      floorNumber: 4,
      title: "Why Subtract Cash?",
      slug: "why-subtract-cash",
      salaryReward: SALARY,
      difficulty: "Easy",
      lesson: {
        headline: "Cash lowers the real cost of buying a company.",
        bullets: [
          "If you buy a company for $100 and it has $20 in cash, you really paid $80. That's why cash is subtracted when calculating enterprise value.",
          "Cash makes companies cheaper.",
        ],
        analogy: "Cash makes companies cheaper.",
        recap: "Cash makes companies cheaper.",
      },
      questions: [],
    },
    {
      id: "node-why-add-debt",
      floorNumber: 4,
      title: "Why Add Debt?",
      slug: "why-add-debt",
      salaryReward: SALARY,
      difficulty: "Easy",
      lesson: {
        headline: "Debt is money the buyer must take over.",
        bullets: [
          "If a company has loans, the buyer must pay them. So debt increases the true cost of buying the company.",
          "Debt makes companies more expensive.",
        ],
        analogy: "Debt makes companies more expensive.",
        recap: "Debt makes companies more expensive.",
      },
      questions: [],
    },
    {
      id: "node-minority-preferred",
      floorNumber: 4,
      title: "Minority Interest & Preferred Stock",
      slug: "minority-preferred",
      salaryReward: SALARY,
      difficulty: "Easy",
      lesson: {
        headline: "Some companies own parts of other companies. Minority interest means: you own most, but not all.",
        bullets: [
          "Preferred stock is special ownership: paid before common stock, more like debt.",
          "Both affect the full company value, so they are included in enterprise value.",
        ],
        analogy: "Both affect the full company value.",
        recap: "Both affect the full company value.",
      },
      questions: [],
    },
    {
      id: "node-equity-negative",
      floorNumber: 4,
      title: "When Can Equity Value Be Negative?",
      slug: "equity-value-negative",
      salaryReward: SALARY,
      difficulty: "Easy",
      lesson: {
        headline: "Equity value is what owners get.",
        bullets: [
          "If debt is very high and assets are worth less, owners might get nothing. That means equity value can be zero or even negative.",
        ],
        analogy: "Equity value can be zero or negative when debt is higher than assets.",
        recap: "Equity value can be zero or negative when debt is higher than assets.",
      },
      questions: [],
    },
  ] as Node[],
  questions: FLOOR4_QUESTIONS,
  completion: {
    lastNodeId: "node-equity-negative",
    message: "You now know what companies are really worth.",
    nextFloor: "Floor 5: Equity Value & Enterprise Value – Calculations",
  },
};
