import type { Question } from "@/lib/curriculum";

/**
 * Floor 7: Valuation Metrics & Multiples — "How Bankers Compare Companies Quickly"
 */
export const FLOOR7_QUESTIONS: Record<string, Question[]> = {
  "node-common-multiples": [
    {
      id: "f7-common-q1",
      prompt: "Valuation multiples are used to:",
      choices: ["Predict the future", "Compare companies"],
      correctIndex: 1,
      explainLikeIm5: "Multiples are shortcuts that help compare companies fast. They answer: how expensive is this company? Higher multiple = more expensive, lower = cheaper.",
    },
    {
      id: "f7-common-q2",
      type: "tapAllThatApply",
      prompt: "Which are common valuation multiples?",
      choices: ["EV / EBITDA", "P / E", "Cash Flow / Logo"],
      correctIndices: [0, 1],
      explainLikeIm5: "EV/EBITDA, P/E, and EV/Revenue are common multiples. Cash Flow / Logo is not a real multiple.",
    },
    {
      id: "f7-common-q3",
      type: "trueFalse",
      prompt: "Multiples are quick comparison tools.",
      correctAnswer: true,
      explainLikeIm5: "Yes. Multiples are shortcuts. They help bankers compare companies fast without doing a full valuation each time.",
    },
  ],
  "node-why-multiples-differ": [
    {
      id: "f7-differ-q1",
      prompt: "A higher-growth company usually has:",
      choices: ["Lower multiple", "Higher multiple"],
      correctIndex: 1,
      explainLikeIm5: "Better business = higher multiple. A company that grows faster is usually worth more per dollar of profit, so investors pay a higher multiple.",
    },
    {
      id: "f7-differ-q2",
      type: "tapAllThatApply",
      prompt: "Which can increase a company's multiple?",
      choices: ["Faster growth", "Lower risk", "Weak management"],
      correctIndices: [0, 1],
      explainLikeIm5: "Faster growth and lower risk can push a multiple up. Weak management usually hurts the multiple, not increases it.",
    },
    {
      id: "f7-differ-q3",
      type: "trueFalse",
      prompt: "All companies in the same industry have the same multiple.",
      correctAnswer: false,
      explainLikeIm5: "No. Even in the same industry, one company might grow faster, be less risky, or be more profitable. Better business = higher multiple.",
    },
  ],
  "node-high-ev-ebitda": [
    {
      id: "f7-high-q1",
      prompt: "A high EV / EBITDA multiple usually means:",
      choices: ["Low expectations", "High expectations"],
      correctIndex: 1,
      explainLikeIm5: "A high EV/EBITDA means investors expect strong growth and see the business as high quality. High multiple = high expectations.",
    },
    {
      id: "f7-high-q2",
      type: "trueFalse",
      prompt: "A high multiple always means the company is bad.",
      correctAnswer: false,
      explainLikeIm5: "No. A high multiple usually means the company is expensive because investors have high expectations—strong growth, quality business. It doesn't mean the company is bad.",
    },
    {
      id: "f7-high-q3",
      type: "fillInBlank",
      prompt: "A high multiple often reflects strong ______.",
      correctAnswer: "growth",
      explainLikeIm5: "Investors pay more (higher multiple) when they expect strong growth. So a high multiple often reflects strong growth expectations.",
    },
  ],
  "node-low-pe": [
    {
      id: "f7-lowpe-q1",
      prompt: "A low P / E might suggest:",
      choices: ["High growth", "Lower expectations"],
      correctIndex: 1,
      explainLikeIm5: "A low P/E can mean the company is cheap, growth is slow, or risk is high. So it often reflects lower expectations—the market is cautious.",
    },
    {
      id: "f7-lowpe-q2",
      type: "trueFalse",
      prompt: "A low P / E always means undervalued.",
      correctAnswer: false,
      explainLikeIm5: "No. A low P/E might mean the company is cheap, but it could also mean slow growth or high risk. Low doesn't always mean bad—or always mean a bargain.",
    },
    {
      id: "f7-lowpe-q3",
      type: "fillInBlank",
      prompt: "A low P / E shows market ______.",
      correctAnswer: "caution",
      explainLikeIm5: "When the market is cautious about a company—slow growth, risk—it pays less per dollar of profit. So a low P/E shows market caution.",
    },
  ],
  "node-why-ev-ebitda-vs-pe": [
    {
      id: "f7-why-q1",
      prompt: "EV / EBITDA is better because it ignores:",
      choices: ["Revenue", "Debt and taxes"],
      correctIndex: 1,
      explainLikeIm5: "P/E is affected by debt, taxes, and accounting choices. EV/EBITDA removes those effects, so it's better for comparing companies with different debt and taxes.",
    },
    {
      id: "f7-why-q2",
      type: "trueFalse",
      prompt: "EV / EBITDA focuses more on the core business.",
      correctAnswer: true,
      explainLikeIm5: "Yes. By stripping out debt and taxes, EV/EBITDA lets you look at the operating business itself—better for comparing companies with different capital structures.",
    },
    {
      id: "f7-why-q3",
      type: "fillInBlank",
      prompt: "EV / EBITDA is useful when capital structures are ______.",
      correctAnswer: "different",
      explainLikeIm5: "When companies have different amounts of debt (different capital structures), EV/EBITDA is more comparable than P/E.",
    },
  ],
  "node-ebitda-misleading": [
    {
      id: "f7-ebitda-q1",
      prompt: "EBITDA ignores:",
      choices: ["Capital spending", "Revenue"],
      correctIndex: 0,
      explainLikeIm5: "EBITDA is not cash. It ignores capital spending (CapEx), debt payments, and working capital. A company can have high EBITDA but still run out of cash.",
    },
    {
      id: "f7-ebitda-q2",
      type: "tapAllThatApply",
      prompt: "Why can EBITDA be misleading?",
      choices: ["Ignores CapEx", "Ignores debt", "Shows real cash"],
      correctIndices: [0, 1],
      explainLikeIm5: "EBITDA ignores CapEx and debt payments, so it can look strong even when cash is tight. It does not show real cash—that's why it can be misleading.",
    },
    {
      id: "f7-ebitda-q3",
      type: "trueFalse",
      prompt: "High EBITDA guarantees strong cash flow.",
      correctAnswer: false,
      explainLikeIm5: "No. EBITDA ignores capital spending and debt. A company can have high EBITDA but heavy CapEx or debt and still run out of cash. EBITDA is helpful but incomplete.",
    },
  ],
};
