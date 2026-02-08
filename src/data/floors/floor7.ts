import type { Node } from "@/lib/curriculum";
import { FLOOR7_QUESTIONS } from "@/lib/floor7Questions";
import type { FloorSpec } from "./types";

const SALARY = 10_000;

export const floor7: FloorSpec = {
  floorNumber: 7,
  title: "Valuation Metrics & Multiples",
  nodes: [
    {
      id: "node-common-multiples",
      floorNumber: 7,
      title: "Common Valuation Multiples",
      slug: "common-multiples",
      salaryReward: SALARY,
      difficulty: "Easy",
      lesson: {
        headline: "Valuation multiples are shortcuts. They help compare companies fast.",
        bullets: [
          "The most common ones are: EV/EBITDA, P/E (Price to Earnings), EV/Revenue. They answer: how expensive is this company?",
          "Higher multiple = more expensive. Lower multiple = cheaper.",
        ],
        analogy: "Higher multiple = more expensive. Lower multiple = cheaper.",
        recap: "Higher multiple = more expensive. Lower multiple = cheaper.",
      },
      questions: [],
    },
    {
      id: "node-why-multiples-differ",
      floorNumber: 7,
      title: "Why Multiples Differ in the Same Industry",
      slug: "why-multiples-differ",
      salaryReward: SALARY,
      difficulty: "Easy",
      lesson: {
        headline: "Even companies in the same industry can trade at different multiples.",
        bullets: [
          "Why? One grows faster, one is riskier, one is more profitable, one has better leadership. Better business = higher multiple.",
        ],
        analogy: "Better business = higher multiple.",
        recap: "Better business = higher multiple.",
      },
      questions: [],
    },
    {
      id: "node-high-ev-ebitda",
      floorNumber: 7,
      title: "What a High EV / EBITDA Multiple Means",
      slug: "high-ev-ebitda",
      salaryReward: SALARY,
      difficulty: "Easy",
      lesson: {
        headline: "EV/EBITDA compares company value to operating profit.",
        bullets: [
          "A high EV/EBITDA multiple means: investors expect strong growth, the business is seen as high quality, the company is expensive. High multiple = high expectations.",
        ],
        analogy: "High multiple = high expectations.",
        recap: "High multiple = high expectations.",
      },
      questions: [],
    },
    {
      id: "node-low-pe",
      floorNumber: 7,
      title: "What a Low P / E Multiple Means",
      slug: "low-pe",
      salaryReward: SALARY,
      difficulty: "Easy",
      lesson: {
        headline: "P/E compares price to profit.",
        bullets: [
          "A low P/E multiple can mean: the company is cheap, growth is slow, risk is high. Low doesn't always mean bad—it means the market is cautious.",
        ],
        analogy: "Low doesn't always mean bad. It means the market is cautious.",
        recap: "Low doesn't always mean bad. It means the market is cautious.",
      },
      questions: [],
    },
    {
      id: "node-why-ev-ebitda-vs-pe",
      floorNumber: 7,
      title: "Why Use EV / EBITDA Instead of P / E",
      slug: "why-ev-ebitda-vs-pe",
      salaryReward: SALARY,
      difficulty: "Easy",
      lesson: {
        headline: "P/E is affected by debt, taxes, and accounting choices. EV/EBITDA removes those effects.",
        bullets: [
          "That makes EV/EBITDA better for: comparing companies with different debt, looking at the business itself.",
        ],
        analogy: "EV/EBITDA focuses on the business itself.",
        recap: "EV/EBITDA focuses on the business itself.",
      },
      questions: [],
    },
    {
      id: "node-ebitda-misleading",
      floorNumber: 7,
      title: "Why EBITDA Can Be Misleading",
      slug: "ebitda-misleading",
      salaryReward: SALARY,
      difficulty: "Easy",
      lesson: {
        headline: "EBITDA is not cash. It ignores: capital spending, debt payments, working capital needs.",
        bullets: [
          "A company can have high EBITDA but still run out of cash. EBITDA is helpful, but incomplete.",
        ],
        analogy: "EBITDA is helpful, but incomplete.",
        recap: "EBITDA is helpful, but incomplete.",
      },
      questions: [],
    },
  ] as Node[],
  questions: FLOOR7_QUESTIONS,
  completion: {
    lastNodeId: "node-ebitda-misleading",
    message: "You can now speak the language of valuation.",
    nextFloor: "Floor 8: Discounted Cash Flow – Assumptions & Analysis",
  },
};
