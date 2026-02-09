import { FLOOR8_QUESTIONS } from "@/lib/floor8Questions";
import type { FloorSpec } from "./types";

const SALARY = 10_000;
const FLOOR_TITLE = "Discounted Cash Flow (DCF) – Assumptions & Analysis";

export const floor8: FloorSpec = {
  floorNumber: 8,
  title: FLOOR_TITLE,
  metadata: {
    title: FLOOR_TITLE,
    conceptFocus: "FCF projection, terminal value, perpetuity vs exit multiple",
    totalReward: 6 * SALARY,
    milestoneCopy: "You can now explain a DCF like a real banker.",
    backgroundStyle: "cool",
  },
  nodes: [
    {
      id: "node-dcf-step-by-step",
      floorNumber: 8,
      title: "DCF Step-by-Step",
      slug: "dcf-step-by-step",
      salaryReward: SALARY,
      difficulty: "Easy",
      lesson: {
        headline: "A DCF is a way to value a company using its future cash.",
        bullets: [
          "It's like asking: if this business gives me cash every year, what is that worth today? DCF steps: project future free cash flow (FCF), calculate terminal value (value after the forecast), discount everything back to today, add it up to get enterprise value.",
          "DCF = future cash turned into today value.",
        ],
        analogy: "DCF = future cash turned into today value.",
        recap: "DCF = future cash turned into today value.",
      },
      questions: [],
    },
    {
      id: "node-projecting-fcf",
      floorNumber: 8,
      title: "Projecting Free Cash Flows",
      slug: "projecting-fcf",
      salaryReward: SALARY,
      difficulty: "Easy",
      lesson: {
        headline: "Free cash flow is the cash a business can actually use.",
        bullets: [
          "A simple way: start with operating profit, then adjust for taxes, fake expenses (like depreciation), real spending (CapEx), and working capital timing. More sales and profit usually mean more cash flow, but spending and timing can reduce it.",
        ],
        analogy: "Free cash flow = real usable cash.",
        recap: "Free cash flow = real usable cash.",
      },
      questions: [],
    },
    {
      id: "node-terminal-value",
      floorNumber: 8,
      title: "Terminal Value (What Happens After Year 5)",
      slug: "terminal-value",
      salaryReward: SALARY,
      difficulty: "Easy",
      lesson: {
        headline: "In a DCF, you only forecast a few years (like 5). But companies don't stop existing after that.",
        bullets: [
          "Terminal value is the value of the business after your forecast ends. It's usually the biggest part of a DCF. Think: what is this company worth after the future years we predicted?",
        ],
        analogy: "What is this company worth after the forecast ends?",
        recap: "What is this company worth after the forecast ends?",
      },
      questions: [],
    },
    {
      id: "node-two-ways-terminal-value",
      floorNumber: 8,
      title: "Two Ways to Calculate Terminal Value",
      slug: "two-ways-terminal-value",
      salaryReward: SALARY,
      difficulty: "Easy",
      lesson: {
        headline: "There are two main ways to calculate terminal value.",
        bullets: [
          "Perpetuity Growth Method: assume cash flow grows forever at a small steady rate. Exit Multiple Method: assume the company sells at the end for a market multiple (like EV/EBITDA). Perpetuity = forever growth. Exit multiple = sell it like comps.",
        ],
        analogy: "Perpetuity = forever growth. Exit multiple = sell it like comps.",
        recap: "Perpetuity = forever growth. Exit multiple = sell it like comps.",
      },
      questions: [],
    },
    {
      id: "node-perpetuity-vs-exit",
      floorNumber: 8,
      title: "Perpetuity vs Exit Multiple (When to Use Which)",
      slug: "perpetuity-vs-exit",
      salaryReward: SALARY,
      difficulty: "Easy",
      lesson: {
        headline: "Use perpetuity growth when: you want a 'business will keep running' assumption, the company is stable and mature, you want a clean long-term view.",
        bullets: [
          "Use exit multiple when: you want to match how the market values companies, there are strong comparable companies, you think of it like a sale at the end. Perpetuity = long-term steady world. Exit multiple = market-based sale world.",
        ],
        analogy: "Perpetuity = long-term steady world. Exit multiple = market-based sale world.",
        recap: "Perpetuity = long-term steady world. Exit multiple = market-based sale world.",
      },
      questions: [],
    },
    {
      id: "node-dcf-assumptions-change",
      floorNumber: 8,
      title: "How Assumptions Change Valuation",
      slug: "dcf-assumptions-change",
      salaryReward: SALARY,
      difficulty: "Easy",
      lesson: {
        headline: "DCF valuation is sensitive. Small changes can cause big value changes.",
        bullets: [
          "If you assume: higher growth → higher value, higher profit margins → higher value, more risk (higher discount rate) → lower value, more spending (CapEx) → lower value. Assumptions are like knobs. Turn the knobs and the valuation moves.",
        ],
        analogy: "Assumptions are like knobs. Turn the knobs and the valuation moves.",
        recap: "Assumptions are like knobs. Turn the knobs and the valuation moves.",
      },
      questions: [],
    },
  ],
  questions: FLOOR8_QUESTIONS,
  completion: {
    lastNodeId: "node-dcf-assumptions-change",
    message: "You can now explain a DCF like a real banker.",
    nextFloor: "Floor 9: DCF – The Discount Rate (WACC)",
  },
};
