import type { Node } from "@/lib/curriculum";
import { FLOOR10_QUESTIONS } from "@/lib/floor10Questions";
import type { FloorSpec } from "./types";

const SALARY = 10_000;

export const floor10: FloorSpec = {
  floorNumber: 10,
  title: "Merger Models – Concepts",
  nodes: [
    {
      id: "node-accretion-dilution",
      floorNumber: 10,
      title: "Accretion vs Dilution",
      slug: "accretion-dilution",
      salaryReward: SALARY,
      difficulty: "Easy",
      lesson: {
        headline: "Accretion and dilution tell you if a deal helps or hurts earnings.",
        bullets: [
          "Accretive deal: earnings per share (EPS) goes up. Dilutive deal: EPS goes down. Think: after the deal, do owners earn more or less per share? That's accretion vs dilution.",
        ],
        analogy: "After the deal, do owners earn more or less per share?",
        recap: "After the deal, do owners earn more or less per share?",
      },
      questions: [],
    },
    {
      id: "node-why-accretive",
      floorNumber: 10,
      title: "Why a Deal Can Be Accretive",
      slug: "why-accretive",
      salaryReward: SALARY,
      difficulty: "Easy",
      lesson: {
        headline: "A deal becomes accretive when: the buyer pays a low price, the target makes strong profits, debt is cheap, or synergies exist.",
        bullets: [
          "Cheap money plus strong earnings = higher EPS. Accretion comes from smart pricing.",
        ],
        analogy: "Cheap money + strong earnings = higher EPS.",
        recap: "Cheap money + strong earnings = higher EPS.",
      },
      questions: [],
    },
    {
      id: "node-what-are-synergies",
      floorNumber: 10,
      title: "What Are Synergies?",
      slug: "what-are-synergies",
      salaryReward: SALARY,
      difficulty: "Easy",
      lesson: {
        headline: "Synergies mean: two companies together work better than apart.",
        bullets: [
          "Examples: cutting duplicate costs, selling more products together, sharing technology. Synergies create extra value. 1 + 1 > 2.",
        ],
        analogy: "1 + 1 > 2",
        recap: "1 + 1 > 2",
      },
      questions: [],
    },
    {
      id: "node-types-synergies",
      floorNumber: 10,
      title: "Types of Synergies",
      slug: "types-synergies",
      salaryReward: SALARY,
      difficulty: "Easy",
      lesson: {
        headline: "There are two main types of synergies.",
        bullets: [
          "Cost synergies: firing duplicate staff, closing extra offices. Revenue synergies: cross-selling products, reaching more customers. Cost synergies are easier. Revenue synergies are riskier.",
        ],
        analogy: "Cost synergies are easier. Revenue synergies are riskier.",
        recap: "Cost synergies are easier. Revenue synergies are riskier.",
      },
      questions: [],
    },
    {
      id: "node-why-premium",
      floorNumber: 10,
      title: "Why Pay a Premium?",
      slug: "why-premium",
      salaryReward: SALARY,
      difficulty: "Easy",
      lesson: {
        headline: "A premium is paying more than the current stock price.",
        bullets: [
          "Buyers pay premiums because: they expect synergies, they want control, they see future growth, they fear competitors. Premium = belief in future value.",
        ],
        analogy: "Premium = belief in future value.",
        recap: "Premium = belief in future value.",
      },
      questions: [],
    },
    {
      id: "node-ma-risks",
      floorNumber: 10,
      title: "Risks in Mergers & Acquisitions",
      slug: "ma-risks",
      salaryReward: SALARY,
      difficulty: "Easy",
      lesson: {
        headline: "M&A is risky. Main risks include: overpaying, synergies not happening, culture clash, integration problems, taking on too much debt.",
        bullets: [
          "Many deals fail because the plan looks good on paper but fails in real life.",
        ],
        analogy: "Many deals fail because the plan looks good on paper but fails in real life.",
        recap: "Many deals fail because the plan looks good on paper but fails in real life.",
      },
      questions: [],
    },
  ] as Node[],
  questions: FLOOR10_QUESTIONS,
  completion: {
    lastNodeId: "node-ma-risks",
    message: "You now understand why deals actually happen.",
    nextFloor: "Floor 11: Merger Models – Calculations",
  },
};
