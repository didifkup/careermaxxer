import type { Question } from "@/lib/curriculum";

/**
 * Floor 8: Discounted Cash Flow (DCF) – Assumptions & Analysis
 * Theme: "Future Money Isn't Worth the Same as Today Money"
 */
export const FLOOR8_QUESTIONS: Record<string, Question[]> = {
  "node-dcf-step-by-step": [
    {
      id: "f8-dcf-q1",
      type: "orderSteps",
      prompt: "Put the DCF steps in order.",
      steps: ["Discount back to today", "Project free cash flow", "Add it all up"],
      correctOrder: [1, 0, 2],
      explainLikeIm5: "First you project free cash flow, then discount everything back to today, then add it up to get enterprise value.",
    },
    {
      id: "f8-dcf-q2",
      prompt: "DCF is based on:",
      choices: ["Past stock prices", "Future cash"],
      correctIndex: 1,
      explainLikeIm5: "DCF values a company using its future cash. You ask: if this business gives me cash every year, what is that worth today?",
    },
    {
      id: "f8-dcf-q3",
      type: "trueFalse",
      prompt: "DCF turns future money into today money.",
      correctAnswer: true,
      explainLikeIm5: "Yes. DCF takes future cash flows and discounts them back to today. That's how you get today's value from future money.",
    },
  ],
  "node-projecting-fcf": [
    {
      id: "f8-fcf-q1",
      type: "tapAllThatApply",
      prompt: "What affects free cash flow?",
      choices: ["CapEx", "Working capital", "Company logo"],
      correctIndices: [0, 1],
      explainLikeIm5: "CapEx (real spending) and working capital (timing of cash) affect free cash flow. Company logo doesn't.",
    },
    {
      id: "f8-fcf-q2",
      type: "trueFalse",
      prompt: "Depreciation is added back in free cash flow because it's not real cash.",
      correctAnswer: true,
      explainLikeIm5: "Yes. Depreciation is a non-cash expense. So when you calculate free cash flow, you add it back. You only subtract real spending like CapEx.",
    },
    {
      id: "f8-fcf-q3",
      prompt: "Free cash flow is best described as:",
      choices: ["Real usable cash", "Just accounting profit"],
      correctIndex: 0,
      explainLikeIm5: "Free cash flow is the cash a business can actually use—after taxes, fake expenses, real spending, and working capital. It's real usable cash, not just profit on paper.",
    },
  ],
  "node-terminal-value": [
    {
      id: "f8-tv-q1",
      prompt: "Terminal value represents:",
      choices: ["Value after the forecast period", "Value only in Year 1"],
      correctIndex: 0,
      explainLikeIm5: "You only forecast a few years (like 5). Terminal value is the value of the business after your forecast ends—what happens after that.",
    },
    {
      id: "f8-tv-q2",
      type: "trueFalse",
      prompt: "Terminal value is often a large part of a DCF.",
      correctAnswer: true,
      explainLikeIm5: "Yes. Companies don't stop existing after year 5. So the value of the business after the forecast is usually the biggest part of a DCF.",
    },
    {
      id: "f8-tv-q3",
      type: "fillInBlank",
      prompt: "Terminal value is the value after the forecast ______.",
      correctAnswer: "ends",
      explainLikeIm5: "Terminal value answers: what is this company worth after the future years we predicted? So it's the value after the forecast ends.",
    },
  ],
  "node-two-ways-terminal-value": [
    {
      id: "f8-two-q1",
      prompt: "Which is NOT a common terminal value method?",
      choices: ["Perpetuity growth", "Exit multiple", "Random guess"],
      correctIndex: 2,
      explainLikeIm5: "The two main ways are perpetuity growth (assume cash grows forever at a small rate) and exit multiple (assume the company sells for a market multiple). Random guess is not a method.",
    },
    {
      id: "f8-two-q2",
      type: "fillInBlank",
      prompt: "Perpetuity method assumes growth continues ______.",
      correctAnswer: "forever",
      explainLikeIm5: "Perpetuity means forever. The perpetuity growth method assumes cash flow grows at a small steady rate forever.",
    },
    {
      id: "f8-two-q3",
      type: "trueFalse",
      prompt: "Exit multiple method uses market multiples like EV/EBITDA.",
      correctAnswer: true,
      explainLikeIm5: "Yes. The exit multiple method assumes the company sells at the end for a market multiple—like EV/EBITDA. It's like selling it like comps.",
    },
  ],
  "node-perpetuity-vs-exit": [
    {
      id: "f8-perp-q1",
      prompt: "Perpetuity growth fits best for a:",
      choices: ["Stable mature business", "Completely unpredictable business"],
      correctIndex: 0,
      explainLikeIm5: "Perpetuity growth works when you want a 'business will keep running' assumption—stable and mature. Unpredictable businesses don't fit a steady forever growth.",
    },
    {
      id: "f8-perp-q2",
      type: "tapAllThatApply",
      prompt: "Exit multiple method is useful when:",
      choices: ["You have good comparable companies", "You want to match market pricing", "You want to ignore the market"],
      correctIndices: [0, 1],
      explainLikeIm5: "Exit multiple matches how the market values companies—so you need good comps and you want to match market pricing. You're not ignoring the market.",
    },
    {
      id: "f8-perp-q3",
      type: "trueFalse",
      prompt: "Both terminal value methods are acceptable; they just reflect different assumptions.",
      correctAnswer: true,
      explainLikeIm5: "Yes. Perpetuity = long-term steady world. Exit multiple = market-based sale world. Both are used; they just reflect different assumptions.",
    },
  ],
  "node-dcf-assumptions-change": [
    {
      id: "f8-assum-q1",
      prompt: "Higher growth usually means:",
      choices: ["Lower value", "Higher value"],
      correctIndex: 1,
      explainLikeIm5: "In a DCF, higher growth means more future cash, so the value goes up. Assumptions are like knobs—turn them and the valuation moves.",
    },
    {
      id: "f8-assum-q2",
      prompt: "More risk usually means:",
      choices: ["Lower value", "Higher value"],
      correctIndex: 0,
      explainLikeIm5: "More risk means a higher discount rate. When you discount more, today's value goes down. So more risk usually means lower value.",
    },
    {
      id: "f8-assum-q3",
      type: "tapAllThatApply",
      prompt: "Which can LOWER valuation?",
      choices: ["Higher discount rate", "Higher CapEx", "Higher growth"],
      correctIndices: [0, 1],
      explainLikeIm5: "Higher discount rate (more risk) and higher CapEx (more spending) lower value. Higher growth raises value.",
    },
    {
      id: "f8-assum-q4",
      type: "trueFalse",
      prompt: "DCF is sensitive because assumptions change cash flows and risk.",
      correctAnswer: true,
      explainLikeIm5: "Yes. DCF valuation is sensitive. Small changes in growth, margins, discount rate, or CapEx can cause big value changes. That's why assumptions matter so much.",
    },
  ],
};
