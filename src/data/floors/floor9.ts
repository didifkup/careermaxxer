import { FLOOR9_QUESTIONS } from "@/lib/floor9Questions";
import type { FloorSpec } from "./types";

const SALARY = 10_000;
const FLOOR_TITLE = "Discounted Cash Flow (DCF) – The Discount Rate (WACC)";

export const floor9: FloorSpec = {
  floorNumber: 9,
  title: FLOOR_TITLE,
  metadata: {
    title: FLOOR_TITLE,
    conceptFocus: "WACC, cost of equity & debt, beta, tax-affecting debt",
    totalReward: 7 * SALARY,
    milestoneCopy: "You now understand how risk controls value.",
    backgroundStyle: "cool",
  },
  nodes: [
    {
      id: "node-wacc-what",
      floorNumber: 9,
      title: "What is WACC?",
      slug: "what-is-wacc",
      salaryReward: SALARY,
      difficulty: "Easy",
      lesson: {
        headline: "WACC stands for Weighted Average Cost of Capital. Big idea: WACC is the risk rate of a company.",
        bullets: [
          "It answers: how risky is this business? Higher risk → higher WACC. Lower risk → lower WACC. WACC is used to discount future cash because risky money is worth less today.",
        ],
        analogy: "Higher risk → higher WACC. Lower risk → lower WACC.",
        recap: "Higher risk → higher WACC. Lower risk → lower WACC.",
      },
      questions: [],
    },
    {
      id: "node-wacc-calculated",
      floorNumber: 9,
      title: "How WACC Is Calculated (Intuition)",
      slug: "wacc-calculated",
      salaryReward: SALARY,
      difficulty: "Easy",
      lesson: {
        headline: "WACC blends two costs: cost of equity (owners) and cost of debt (lenders). Each one is weighted by how much the company uses it.",
        bullets: [
          "Think: if I use more debt, debt matters more. If I use more equity, equity matters more. WACC is a weighted average.",
        ],
        analogy: "WACC is a weighted average.",
        recap: "WACC is a weighted average.",
      },
      questions: [],
    },
    {
      id: "node-cost-of-equity",
      floorNumber: 9,
      title: "Cost of Equity",
      slug: "cost-of-equity",
      salaryReward: SALARY,
      difficulty: "Easy",
      lesson: {
        headline: "Cost of equity is the return owners expect for taking risk.",
        bullets: [
          "Equity is riskier because: owners are paid last, returns are not guaranteed. So equity usually costs more than debt. Cost of equity = what owners demand.",
        ],
        analogy: "Cost of equity = what owners demand.",
        recap: "Cost of equity = what owners demand.",
      },
      questions: [],
    },
    {
      id: "node-cost-of-debt",
      floorNumber: 9,
      title: "Cost of Debt",
      slug: "cost-of-debt",
      salaryReward: SALARY,
      difficulty: "Easy",
      lesson: {
        headline: "Cost of debt is the interest rate a company pays on its loans.",
        bullets: [
          "Debt is less risky because: lenders are paid first, payments are fixed. That's why debt is usually cheaper. Cost of debt = interest rate.",
        ],
        analogy: "Cost of debt = interest rate.",
        recap: "Cost of debt = interest rate.",
      },
      questions: [],
    },
    {
      id: "node-what-is-beta",
      floorNumber: 9,
      title: "What is Beta?",
      slug: "what-is-beta",
      salaryReward: SALARY,
      difficulty: "Easy",
      lesson: {
        headline: "Beta measures how risky a stock is compared to the market.",
        bullets: [
          "Beta = 1 → same risk as market. Beta > 1 → more risky. Beta < 1 → less risky. Higher beta means investors demand higher returns.",
        ],
        analogy: "Higher beta = higher risk = higher return demanded.",
        recap: "Higher beta = higher risk = higher return demanded.",
      },
      questions: [],
    },
    {
      id: "node-tax-affect-debt",
      floorNumber: 9,
      title: "Why We Tax-Affect Cost of Debt",
      slug: "tax-affect-debt",
      salaryReward: SALARY,
      difficulty: "Easy",
      lesson: {
        headline: "Interest on debt lowers taxes. That's because interest is tax-deductible.",
        bullets: [
          "So debt is even cheaper after accounting for taxes. This is called the tax shield.",
        ],
        analogy: "This is called the tax shield.",
        recap: "This is called the tax shield.",
      },
      questions: [],
    },
    {
      id: "node-wacc-increases",
      floorNumber: 9,
      title: "What Happens If WACC Increases?",
      slug: "wacc-increases",
      salaryReward: SALARY,
      difficulty: "Easy",
      lesson: {
        headline: "WACC is used to discount cash. If WACC goes up: future cash is discounted more, present value goes down, company value falls.",
        bullets: [
          "Higher risk → lower valuation.",
        ],
        analogy: "Higher risk → lower valuation.",
        recap: "Higher risk → lower valuation.",
      },
      questions: [],
    },
  ],
  questions: FLOOR9_QUESTIONS,
  completion: {
    lastNodeId: "node-wacc-increases",
    message: "You now understand how risk controls value.",
    nextFloor: "Floor 10: Merger Models – Concepts",
  },
};
