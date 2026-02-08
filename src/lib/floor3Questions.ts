import type { Question } from "@/lib/curriculum";

/**
 * Floor 3: Accounting – Calculations — "Turning Numbers Into Motion"
 */
export const FLOOR3_QUESTIONS: Record<string, Question[]> = {
  "node-project-income-statement": [
    {
      id: "f3-is1-q1",
      type: "orderSteps",
      prompt: "Put the steps in order.",
      steps: ["Subtract expenses", "Start with revenue", "Estimate expenses"],
      correctOrder: [1, 2, 0],
      explainLikeIm5: "First you start with revenue, then estimate expenses as a % of revenue, then subtract to get profit.",
    },
    {
      id: "f3-is1-q2",
      prompt: "Revenue is:",
      choices: ["Money coming in", "Money going out"],
      correctIndex: 0,
      explainLikeIm5: "Revenue is money coming in from sales. Money going out is expenses.",
    },
    {
      id: "f3-is1-q3",
      type: "trueFalse",
      prompt: "Expenses are often projected as a % of revenue.",
      correctAnswer: true,
      explainLikeIm5: "Yes! Most models estimate expenses as a percentage of revenue. It keeps things simple.",
    },
  ],
  "node-project-d-and-a": [
    {
      id: "f3-da-q1",
      prompt: "Depreciation spreads a cost over:",
      choices: ["One day", "Many years"],
      correctIndex: 1,
      explainLikeIm5: "Depreciation spreads the cost over many years. You expense a little each year instead of all at once.",
    },
    {
      id: "f3-da-q2",
      type: "trueFalse",
      prompt: "Depreciation uses real cash.",
      correctAnswer: false,
      explainLikeIm5: "No. Depreciation is a non-cash expense. It lowers profit on paper but does not use actual cash.",
    },
    {
      id: "f3-da-q3",
      type: "fillInBlank",
      prompt: "Depreciation is linked to past ______.",
      correctAnswer: "capital spending",
      explainLikeIm5: "Most models link depreciation to past capital spending—the big purchases the company made.",
    },
  ],
  "node-project-working-capital": [
    {
      id: "f3-wc-q1",
      prompt: "If customers pay slower, cash:",
      choices: ["Increases", "Gets stuck"],
      correctIndex: 1,
      explainLikeIm5: "When customers pay slower, cash gets stuck. You have not received it yet.",
    },
    {
      id: "f3-wc-q2",
      type: "trueFalse",
      prompt: "Working capital changes affect cash flow.",
      correctAnswer: true,
      explainLikeIm5: "Yes! When working capital goes up or down, it affects how much cash is tied up or freed.",
    },
    {
      id: "f3-wc-q3",
      type: "fillInBlank",
      prompt: "Working capital is about timing of ______.",
      correctAnswer: "cash",
      explainLikeIm5: "Working capital is about when cash moves—when you get paid and when you pay others.",
    },
  ],
  "node-project-capex": [
    {
      id: "f3-cx-q1",
      prompt: "CapEx is spending on:",
      choices: ["Salaries", "Equipment"],
      correctIndex: 1,
      explainLikeIm5: "CapEx is spending on big things like equipment, machines, and buildings. Salaries are operating expenses.",
    },
    {
      id: "f3-cx-q2",
      type: "trueFalse",
      prompt: "CapEx uses real cash.",
      correctAnswer: true,
      explainLikeIm5: "Yes! When a company buys equipment or a building, real cash goes out.",
    },
    {
      id: "f3-cx-q3",
      type: "tapAllThatApply",
      prompt: "Which are CapEx?",
      choices: ["Factory", "Computer equipment", "Office rent"],
      correctIndices: [0, 1],
      explainLikeIm5: "A factory and computer equipment are big purchases (CapEx). Office rent is an operating expense.",
    },
  ],
  "node-project-deferred-taxes": [
    {
      id: "f3-dt-q1",
      prompt: "Deferred taxes happen because of:",
      choices: ["Errors", "Timing differences"],
      correctIndex: 1,
      explainLikeIm5: "Deferred taxes come from timing differences—when accounting profit and tax profit are different.",
    },
    {
      id: "f3-dt-q2",
      type: "trueFalse",
      prompt: "Deferred taxes mean taxes disappear forever.",
      correctAnswer: false,
      explainLikeIm5: "No. Deferred taxes smooth taxes over time. The company will pay later; taxes do not disappear.",
    },
    {
      id: "f3-dt-q3",
      type: "fillInBlank",
      prompt: "Deferred taxes come from differences in ______.",
      correctAnswer: "timing",
      explainLikeIm5: "Deferred taxes come from timing—when you count profit for accounting vs for taxes.",
    },
  ],
  "node-fcf": [
    {
      id: "f3-fcf-q1",
      prompt: "Free cash flow is:",
      choices: ["Accounting profit", "Real usable cash"],
      correctIndex: 1,
      explainLikeIm5: "Free cash flow is the real cash a company can use—after adding back fake expenses and subtracting real spending.",
    },
    {
      id: "f3-fcf-q2",
      type: "trueFalse",
      prompt: "Depreciation is added back in free cash flow.",
      correctAnswer: true,
      explainLikeIm5: "Yes! Depreciation is a non-cash expense, so we add it back to get real cash flow.",
    },
    {
      id: "f3-fcf-q3",
      type: "tapAllThatApply",
      prompt: "What affects free cash flow?",
      choices: ["CapEx", "Working capital", "Logo design"],
      correctIndices: [0, 1],
      explainLikeIm5: "CapEx and working capital changes affect free cash flow. Logo design is usually a small expense.",
    },
  ],
  "node-unlevered-fcf": [
    {
      id: "f3-ufcf-q1",
      prompt: "Unlevered free cash flow ignores:",
      choices: ["Revenue", "Debt"],
      correctIndex: 1,
      explainLikeIm5: "Unlevered means before debt. It shows cash available to everyone—debt and equity holders.",
    },
    {
      id: "f3-ufcf-q2",
      type: "trueFalse",
      prompt: "Unlevered cash flow is before interest.",
      correctAnswer: true,
      explainLikeIm5: "Yes! Unlevered cash flow is before interest and debt payments. It values the whole business.",
    },
    {
      id: "f3-ufcf-q3",
      type: "fillInBlank",
      prompt: "Unlevered free cash flow is for ______ investors.",
      correctAnswer: "all",
      explainLikeIm5: "Unlevered free cash flow is for all investors—both lenders and equity owners.",
    },
  ],
  "node-levered-fcf": [
    {
      id: "f3-lfcf-q1",
      prompt: "Levered free cash flow belongs to:",
      choices: ["Everyone", "Equity owners"],
      correctIndex: 1,
      explainLikeIm5: "Levered free cash flow is what is left after debt payments—so it belongs to equity owners only.",
    },
    {
      id: "f3-lfcf-q2",
      type: "trueFalse",
      prompt: "Interest is subtracted in levered free cash flow.",
      correctAnswer: true,
      explainLikeIm5: "Yes! Levered cash flow is after interest and debt payments. So interest is already taken out.",
    },
    {
      id: "f3-lfcf-q3",
      type: "fillInBlank",
      prompt: "Levered free cash flow is cash after paying ______.",
      correctAnswer: "debt",
      explainLikeIm5: "Levered free cash flow is what owners get after the company pays debt and interest.",
    },
  ],
};

export const FLOOR3_NODE_IDS = Object.keys(FLOOR3_QUESTIONS) as string[];
