import type { Node } from "@/lib/curriculum";
import { FLOOR6_QUESTIONS } from "@/lib/floor6Questions";
import type { FloorSpec } from "./types";

const SALARY = 10_000;

export const floor6: FloorSpec = {
  floorNumber: 6,
  title: "Valuation Methodologies",
  nodes: [
    {
      id: "node-major-valuation-methods",
      floorNumber: 6,
      title: "Major Valuation Methods",
      slug: "major-valuation-methods",
      salaryReward: SALARY,
      difficulty: "Easy",
      lesson: {
        headline: "Bankers don't use just one way to value companies. They usually use three.",
        bullets: [
          "Comparable Companies (Comps): look at similar companies and see what they're worth.",
          "Precedent Transactions: look at what similar companies sold for in the past.",
          "Discounted Cash Flow (DCF): figure out how much cash the company will make in the future. Each method answers the same question from a different angle.",
        ],
        analogy: "Each method answers the same question from a different angle.",
        recap: "Each method answers the same question from a different angle.",
      },
      questions: [],
    },
    {
      id: "node-comps-analysis",
      floorNumber: 6,
      title: "Comparable Companies Analysis",
      slug: "comps-analysis",
      salaryReward: SALARY,
      difficulty: "Easy",
      lesson: {
        headline: "Comparable Companies Analysis is like pricing a house.",
        bullets: [
          "You look at: similar companies, same industry, similar size and growth. Then you see what multiples those companies trade at.",
          "This shows what the market thinks today.",
        ],
        analogy: "This shows what the market thinks today.",
        recap: "This shows what the market thinks today.",
      },
      questions: [],
    },
    {
      id: "node-precedent-transactions",
      floorNumber: 6,
      title: "Precedent Transactions Analysis",
      slug: "precedent-transactions",
      salaryReward: SALARY,
      difficulty: "Easy",
      lesson: {
        headline: "Precedent Transactions look at past deals.",
        bullets: [
          "These prices are usually higher because: buyers pay a premium and control is changing hands. This method shows what buyers paid before.",
          "Think: How much did others pay to buy companies?",
        ],
        analogy: "How much did others pay to buy companies?",
        recap: "How much did others pay to buy companies?",
      },
      questions: [],
    },
    {
      id: "node-dcf-intro",
      floorNumber: 6,
      title: "Discounted Cash Flow (DCF)",
      slug: "dcf-intro",
      salaryReward: SALARY,
      difficulty: "Easy",
      lesson: {
        headline: "DCF values a company based on its future.",
        bullets: [
          "You: project future cash, adjust for time and risk, add everything up. DCF answers: how much is future cash worth today?",
          "It focuses on the business itself, not the market.",
        ],
        analogy: "It focuses on the business itself, not the market.",
        recap: "It focuses on the business itself, not the market.",
      },
      questions: [],
    },
    {
      id: "node-when-trust-dcf",
      floorNumber: 6,
      title: "When to Trust DCF More Than Comps",
      slug: "when-trust-dcf",
      salaryReward: SALARY,
      difficulty: "Easy",
      lesson: {
        headline: "Sometimes the market is noisy. DCF is better when: the company is unique, the market is unstable, or there are no good comparables.",
        bullets: [
          "DCF lets you control assumptions. Comps follow the crowd. DCF follows logic.",
        ],
        analogy: "Comps follow the crowd. DCF follows logic.",
        recap: "Comps follow the crowd. DCF follows logic.",
      },
      questions: [],
    },
    {
      id: "node-strengths-weaknesses",
      floorNumber: 6,
      title: "Strengths & Weaknesses of Each Method",
      slug: "strengths-weaknesses",
      salaryReward: SALARY,
      difficulty: "Easy",
      lesson: {
        headline: "Every valuation method has pros and cons.",
        bullets: [
          "Comps: easy to understand, but the market can be wrong. Precedents: show real deal prices, but deals may be old. DCF: deep and logical, but very sensitive to assumptions.",
          "That's why bankers use all of them.",
        ],
        analogy: "That's why bankers use all of them.",
        recap: "That's why bankers use all of them.",
      },
      questions: [],
    },
  ] as Node[],
  questions: FLOOR6_QUESTIONS,
  completion: {
    lastNodeId: "node-strengths-weaknesses",
    message: "You now think like a valuation professional.",
    nextFloor: "Floor 7: Discounted Cash Flow – Assumptions & Analysis",
  },
};
