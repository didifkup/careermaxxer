import type { Node } from "@/lib/curriculum";
import { FLOOR11_QUESTIONS } from "@/lib/floor11Questions";
import type { FloorSpec } from "./types";

const SALARY = 10_000;

export const floor11: FloorSpec = {
  floorNumber: 11,
  title: "Merger Models – Calculations",
  nodes: [
    {
      id: "node-merger-model-walkthrough",
      floorNumber: 11,
      title: "Walking Through a Basic Merger Model",
      slug: "merger-model-walkthrough",
      salaryReward: SALARY,
      difficulty: "Easy",
      lesson: {
        headline: "A merger model answers one question: after buying another company, do shareholders win or lose?",
        bullets: [
          "Basic steps: combine the two companies' earnings, add synergies, subtract new costs (interest, dilution, amortization), divide by new share count, compare EPS before vs after. Before vs after EPS tells you if the deal works.",
        ],
        analogy: "Before vs after EPS tells you if the deal works.",
        recap: "Before vs after EPS tells you if the deal works.",
      },
      questions: [],
    },
    {
      id: "node-determining-accretion-dilution",
      floorNumber: 11,
      title: "Determining Accretion / Dilution",
      slug: "determining-accretion-dilution",
      salaryReward: SALARY,
      difficulty: "Easy",
      lesson: {
        headline: "Accretion and dilution come from EPS.",
        bullets: [
          "If post-deal EPS > pre-deal EPS → accretive. If post-deal EPS < pre-deal EPS → dilutive. That's it. Everything in the model feeds into that comparison.",
        ],
        analogy: "Post-deal EPS vs pre-deal EPS.",
        recap: "Post-deal EPS vs pre-deal EPS.",
      },
      questions: [],
    },
    {
      id: "node-stock-vs-cash-consideration",
      floorNumber: 11,
      title: "Stock vs Cash Consideration",
      slug: "stock-vs-cash-consideration",
      salaryReward: SALARY,
      difficulty: "Easy",
      lesson: {
        headline: "How you pay matters.",
        bullets: [
          "Cash deal: no new shares, adds interest expense, less dilution. Stock deal: new shares issued, no interest, more dilution. Cash hurts through interest. Stock hurts through dilution.",
        ],
        analogy: "Cash hurts through interest. Stock hurts through dilution.",
        recap: "Cash hurts through interest. Stock hurts through dilution.",
      },
      questions: [],
    },
    {
      id: "node-synergies-affect-accretion",
      floorNumber: 11,
      title: "How Synergies Affect Accretion",
      slug: "synergies-affect-accretion",
      salaryReward: SALARY,
      difficulty: "Easy",
      lesson: {
        headline: "Synergies increase combined earnings. Higher earnings → higher EPS → more accretion.",
        bullets: [
          "Cost synergies help faster. Revenue synergies help later. Synergies can turn a bad deal into a good one.",
        ],
        analogy: "Synergies can turn a bad deal into a good one.",
        recap: "Synergies can turn a bad deal into a good one.",
      },
      questions: [],
    },
    {
      id: "node-purchase-accounting-intuition",
      floorNumber: 11,
      title: "Purchase Accounting (Intuition)",
      slug: "purchase-accounting-intuition",
      salaryReward: SALARY,
      difficulty: "Easy",
      lesson: {
        headline: "Purchase accounting adjusts the balance sheet. When a company is bought: assets are written up, new amortization appears, goodwill is created.",
        bullets: [
          "These changes affect earnings and therefore EPS. Accounting matters for accretion.",
        ],
        analogy: "Accounting matters for accretion.",
        recap: "Accounting matters for accretion.",
      },
      questions: [],
    },
  ] as Node[],
  questions: FLOOR11_QUESTIONS,
  completion: {
    lastNodeId: "node-purchase-accounting-intuition",
    message: "You can now explain merger math with confidence.",
    nextFloor: "Floor 12: LBO Models – Concepts",
  },
};
