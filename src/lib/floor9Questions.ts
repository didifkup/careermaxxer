import type { Question } from "@/lib/curriculum";

/**
 * Floor 9: Discounted Cash Flow (DCF) – The Discount Rate (WACC)
 * Theme: "Risk Changes What Money Is Worth"
 */
export const FLOOR9_QUESTIONS: Record<string, Question[]> = {
  "node-wacc-what": [
    {
      id: "f9-wacc1-q1",
      prompt: "WACC measures:",
      choices: ["Profit", "Risk"],
      correctIndex: 1,
      explainLikeIm5: "WACC is the risk rate of a company. It answers: how risky is this business? Higher risk → higher WACC. It's used to discount future cash because risky money is worth less today.",
    },
    {
      id: "f9-wacc1-q2",
      type: "trueFalse",
      prompt: "Higher risk leads to a higher WACC.",
      correctAnswer: true,
      explainLikeIm5: "Yes. WACC is the risk rate. Higher risk → higher WACC. Lower risk → lower WACC.",
    },
    {
      id: "f9-wacc1-q3",
      type: "fillInBlank",
      prompt: "WACC is used to discount future ______.",
      correctAnswer: "cash",
      explainLikeIm5: "WACC is the rate used to discount future cash flows in a DCF. Risky money is worth less today.",
    },
  ],
  "node-wacc-calculated": [
    {
      id: "f9-wacc2-q1",
      type: "tapAllThatApply",
      prompt: "WACC includes the cost of:",
      choices: ["Equity", "Debt", "Revenue"],
      correctIndices: [0, 1],
      explainLikeIm5: "WACC blends cost of equity (owners) and cost of debt (lenders). Each is weighted by how much the company uses it. Revenue is not a cost of capital.",
    },
    {
      id: "f9-wacc2-q2",
      type: "trueFalse",
      prompt: "WACC is a weighted average.",
      correctAnswer: true,
      explainLikeIm5: "Yes. WACC is a weighted average of the cost of equity and cost of debt. If you use more debt, debt matters more; if you use more equity, equity matters more.",
    },
    {
      id: "f9-wacc2-q3",
      type: "fillInBlank",
      prompt: "WACC depends on the company's ______ structure.",
      correctAnswer: "capital",
      explainLikeIm5: "WACC depends on how the company is financed—how much debt vs equity. That's the capital structure.",
    },
  ],
  "node-cost-of-equity": [
    {
      id: "f9-equity-q1",
      prompt: "Equity is riskier because owners are paid:",
      choices: ["First", "Last"],
      correctIndex: 1,
      explainLikeIm5: "Owners are paid last—after lenders. So equity is riskier. Cost of equity is the return owners expect for taking that risk.",
    },
    {
      id: "f9-equity-q2",
      type: "trueFalse",
      prompt: "Cost of equity is usually higher than cost of debt.",
      correctAnswer: true,
      explainLikeIm5: "Yes. Equity is riskier, so owners demand a higher return. Cost of equity = what owners demand.",
    },
    {
      id: "f9-equity-q3",
      type: "fillInBlank",
      prompt: "Cost of equity reflects what owners ______.",
      correctAnswer: "expect",
      explainLikeIm5: "Cost of equity is the return owners expect for taking risk. It reflects what they demand.",
    },
  ],
  "node-cost-of-debt": [
    {
      id: "f9-debt-q1",
      prompt: "Cost of debt is based on:",
      choices: ["Interest rate", "Stock price"],
      correctIndex: 0,
      explainLikeIm5: "Cost of debt is the interest rate a company pays on its loans. Debt is less risky because lenders are paid first and payments are fixed.",
    },
    {
      id: "f9-debt-q2",
      type: "trueFalse",
      prompt: "Debt is usually less risky than equity.",
      correctAnswer: true,
      explainLikeIm5: "Yes. Lenders are paid first and payments are fixed. So debt is usually cheaper than equity.",
    },
    {
      id: "f9-debt-q3",
      type: "fillInBlank",
      prompt: "Debt is cheaper because lenders are paid ______.",
      correctAnswer: "first",
      explainLikeIm5: "Lenders are paid first, so debt is less risky. That's why cost of debt is usually lower than cost of equity.",
    },
  ],
  "node-what-is-beta": [
    {
      id: "f9-beta-q1",
      prompt: "Beta measures:",
      choices: ["Growth", "Risk"],
      correctIndex: 1,
      explainLikeIm5: "Beta measures how risky a stock is compared to the market. Beta = 1 means same risk as market; higher beta means more risky.",
    },
    {
      id: "f9-beta-q2",
      type: "trueFalse",
      prompt: "A higher beta means higher risk.",
      correctAnswer: true,
      explainLikeIm5: "Yes. Higher beta means the stock is riskier than the market. So investors demand higher returns.",
    },
    {
      id: "f9-beta-q3",
      type: "fillInBlank",
      prompt: "Beta compares a stock to the ______.",
      correctAnswer: "market",
      explainLikeIm5: "Beta measures how risky a stock is compared to the overall market. Market is the benchmark.",
    },
  ],
  "node-tax-affect-debt": [
    {
      id: "f9-tax-q1",
      prompt: "Debt is tax-affected because:",
      choices: ["Interest reduces taxes", "Debt is risky"],
      correctIndex: 0,
      explainLikeIm5: "Interest on debt is tax-deductible. So interest lowers taxable income and the company pays less tax. That's the tax shield—debt is even cheaper after taxes.",
    },
    {
      id: "f9-tax-q2",
      type: "trueFalse",
      prompt: "Interest payments lower taxable income.",
      correctAnswer: true,
      explainLikeIm5: "Yes. Interest is tax-deductible. So interest payments lower taxable income and reduce taxes. That's why we tax-affect cost of debt.",
    },
    {
      id: "f9-tax-q3",
      type: "fillInBlank",
      prompt: "The tax benefit of debt is called a tax ______.",
      correctAnswer: "shield",
      explainLikeIm5: "The tax benefit of debt—because interest is deductible—is called the tax shield. It makes debt even cheaper after taxes.",
    },
  ],
  "node-wacc-increases": [
    {
      id: "f9-inc-q1",
      prompt: "If WACC increases, valuation usually:",
      choices: ["Goes up", "Goes down"],
      correctIndex: 1,
      explainLikeIm5: "WACC is used to discount cash. If WACC goes up, future cash is discounted more, so present value goes down. Higher risk → lower valuation.",
    },
    {
      id: "f9-inc-q2",
      type: "trueFalse",
      prompt: "Higher risk lowers present value.",
      correctAnswer: true,
      explainLikeIm5: "Yes. When you discount future cash at a higher rate (higher risk), today's value is lower. So higher risk → lower present value.",
    },
    {
      id: "f9-inc-q3",
      type: "fillInBlank",
      prompt: "Higher WACC means future cash is worth ______ today.",
      correctAnswer: "less",
      explainLikeIm5: "Higher WACC means you're discounting more. So the same future cash is worth less today. Higher risk → lower value today.",
    },
  ],
};
