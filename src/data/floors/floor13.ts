import type { Node } from "@/lib/curriculum";
import { FLOOR13_QUESTIONS } from "@/lib/floor13Questions";
import type { FloorSpec } from "./types";

const SALARY = 10_000;

export const floor13: FloorSpec = {
  floorNumber: 13,
  title: "LBO Models – Calculations",
  nodes: [
    {
      id: "node-lbo-model-walkthrough",
      floorNumber: 13,
      title: "Walking Through a Simple LBO Model",
      slug: "lbo-model-walkthrough",
      salaryReward: SALARY,
      difficulty: "Easy",
      lesson: {
        headline: "A simple LBO model answers one question: if I buy this company with debt, how much do I make?",
        bullets: [
          "Basic steps: buy the company using equity and debt, let the company generate cash, use cash to pay down debt, sell the company later, see how much equity is left. Less debt plus higher value = more equity.",
        ],
        analogy: "Less debt + higher value = more equity.",
        recap: "Less debt + higher value = more equity.",
      },
      questions: [],
    },
    {
      id: "node-irr-calculated",
      floorNumber: 13,
      title: "How IRR Is Calculated (Intuition)",
      slug: "irr-calculated",
      salaryReward: SALARY,
      difficulty: "Easy",
      lesson: {
        headline: "IRR measures how fast your money grows.",
        bullets: [
          "It answers: if I invest money today, what yearly return do I earn? IRR depends on: how much you invest, how much you get back, how long it takes. Faster and bigger = higher IRR.",
        ],
        analogy: "Faster + bigger = higher IRR.",
        recap: "Faster + bigger = higher IRR.",
      },
      questions: [],
    },
    {
      id: "node-debt-paydown",
      floorNumber: 13,
      title: "Determining Debt Paydown",
      slug: "debt-paydown",
      salaryReward: SALARY,
      difficulty: "Easy",
      lesson: {
        headline: "Debt paydown comes from free cash flow.",
        bullets: [
          "Each year: company earns cash, pays interest, uses leftover cash to repay debt. As debt goes down: risk falls, equity value rises. Cash flow is the engine.",
        ],
        analogy: "Cash flow is the engine.",
        recap: "Cash flow is the engine.",
      },
      questions: [],
    },
    {
      id: "node-leverage-affects-returns",
      floorNumber: 13,
      title: "How Leverage Affects Returns",
      slug: "leverage-affects-returns",
      salaryReward: SALARY,
      difficulty: "Easy",
      lesson: {
        headline: "Leverage magnifies results.",
        bullets: [
          "If things go well: less equity invested, more upside, higher IRR. If things go badly: debt still must be paid, equity can be wiped out. Leverage is powerful—and dangerous.",
        ],
        analogy: "Leverage is powerful—and dangerous.",
        recap: "Leverage is powerful—and dangerous.",
      },
      questions: [],
    },
    {
      id: "node-exit-multiples-decrease",
      floorNumber: 13,
      title: "What If Exit Multiples Decrease?",
      slug: "exit-multiples-decrease",
      salaryReward: SALARY,
      difficulty: "Easy",
      lesson: {
        headline: "Exit multiple matters a lot in an LBO.",
        bullets: [
          "If exit multiple goes down: sale price is lower, equity value falls, IRR drops. Even a great company can have poor returns if the exit price is bad. Entry price plus exit price = destiny.",
        ],
        analogy: "Entry price + exit price = destiny.",
        recap: "Entry price + exit price = destiny.",
      },
      questions: [],
    },
  ] as Node[],
  questions: FLOOR13_QUESTIONS,
  completion: {
    lastNodeId: "node-exit-multiples-decrease",
    message: "You now understand private equity math at a professional level.",
    nextFloor: "FINAL FLOORS: Industry-Specific Technicals",
  },
};
