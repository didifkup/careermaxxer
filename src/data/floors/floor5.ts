import type { Node } from "@/lib/curriculum";
import { FLOOR5_QUESTIONS } from "@/lib/floor5Questions";
import type { FloorSpec } from "./types";

const SALARY = 10_000;

export const floor5: FloorSpec = {
  floorNumber: 5,
  title: "Equity Value & Enterprise Value – Calculations",
  nodes: [
    {
      id: "node-calc-ev",
      floorNumber: 5,
      title: "Calculating Enterprise Value",
      slug: "calculating-ev",
      salaryReward: SALARY,
      difficulty: "Easy",
      lesson: {
        headline: "Enterprise value starts with equity value and then adjusts for how the company is financed.",
        bullets: [
          "Simple steps: start with equity value, add debt, add minority interest and preferred stock, subtract cash. This gives the value of the whole company.",
          "Think: Stock value → takeover value.",
        ],
        analogy: "Stock value → takeover value.",
        recap: "Stock value → takeover value.",
      },
      questions: [],
    },
    {
      id: "node-fully-diluted",
      floorNumber: 5,
      title: "Fully Diluted Shares",
      slug: "fully-diluted-shares",
      salaryReward: SALARY,
      difficulty: "Easy",
      lesson: {
        headline: "Fully diluted shares assume all possible shares exist.",
        bullets: [
          "This includes: common shares, stock options, and convertible securities. It shows the real number of shares if everyone converts.",
          "More shares = lower value per share.",
        ],
        analogy: "More shares = lower value per share.",
        recap: "More shares = lower value per share.",
      },
      questions: [],
    },
    {
      id: "node-options-convertibles",
      floorNumber: 5,
      title: "Options & Convertible Securities",
      slug: "options-convertibles",
      salaryReward: SALARY,
      difficulty: "Easy",
      lesson: {
        headline: "Options and convertibles can turn into shares.",
        bullets: [
          "When they do: share count increases, equity value is spread thinner. That's why bankers always check for dilution.",
          "Dilution means ownership gets smaller.",
        ],
        analogy: "Dilution means ownership gets smaller.",
        recap: "Dilution means ownership gets smaller.",
      },
      questions: [],
    },
    {
      id: "node-nols",
      floorNumber: 5,
      title: "Net Operating Losses (NOLs)",
      slug: "nols",
      salaryReward: SALARY,
      difficulty: "Easy",
      lesson: {
        headline: "NOLs are past losses a company can reuse.",
        bullets: [
          "They help by: lowering future taxes and increasing future cash flow. But NOLs can expire and may be limited.",
          "So they add value, but not full value.",
        ],
        analogy: "They add value, but not full value.",
        recap: "They add value, but not full value.",
      },
      questions: [],
    },
  ] as Node[],
  questions: FLOOR5_QUESTIONS,
  completion: {
    lastNodeId: "node-nols",
    message: "You can now turn stock prices into real value.",
    nextFloor: "Floor 6: Valuation Methodologies",
  },
};
