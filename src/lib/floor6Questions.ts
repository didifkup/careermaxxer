import type { Question } from "@/lib/curriculum";

/**
 * Floor 6: Valuation Methodologies — "How Bankers Decide What Something Is Worth"
 */
export const FLOOR6_QUESTIONS: Record<string, Question[]> = {
  "node-major-valuation-methods": [
    {
      id: "f6-major-q1",
      prompt: "Which is NOT a main valuation method?",
      choices: ["Comparable Companies", "Discounted Cash Flow", "Balance Sheet Method"],
      correctIndex: 2,
      explainLikeIm5: "The main methods bankers use are Comps, Precedent Transactions, and DCF. Balance Sheet Method is not one of the big three.",
    },
    {
      id: "f6-major-q2",
      type: "tapAllThatApply",
      prompt: "Which are main valuation methods?",
      choices: ["Comps", "Precedent Transactions", "DCF"],
      correctIndices: [0, 1, 2],
      explainLikeIm5: "All three—Comps, Precedent Transactions, and DCF—are the main valuation methods bankers use. Each answers the same question from a different angle.",
    },
    {
      id: "f6-major-q3",
      type: "trueFalse",
      prompt: "Bankers usually use more than one valuation method.",
      correctAnswer: true,
      explainLikeIm5: "Yes. Bankers don't use just one way. They usually use Comps, Precedent Transactions, and DCF together to get a better answer.",
    },
  ],
  "node-comps-analysis": [
    {
      id: "f6-comps-q1",
      prompt: "Comps compare a company to:",
      choices: ["Its past", "Similar companies"],
      correctIndex: 1,
      explainLikeIm5: "Comparable Companies Analysis looks at similar companies—same industry, similar size and growth. It's like pricing a house by looking at similar houses.",
    },
    {
      id: "f6-comps-q2",
      type: "trueFalse",
      prompt: "Comps reflect current market prices.",
      correctAnswer: true,
      explainLikeIm5: "Yes. Comps show what multiples similar companies trade at today. This shows what the market thinks right now.",
    },
    {
      id: "f6-comps-q3",
      type: "fillInBlank",
      prompt: "Comps show what the market thinks ______.",
      correctAnswer: "today",
      explainLikeIm5: "Comps reflect current trading. They show what the market thinks today, not in the past.",
    },
  ],
  "node-precedent-transactions": [
    {
      id: "f6-prec-q1",
      prompt: "Precedent transactions look at:",
      choices: ["Current stock prices", "Past acquisitions"],
      correctIndex: 1,
      explainLikeIm5: "Precedent Transactions look at past deals—what similar companies sold for when they were acquired. Not current stock prices.",
    },
    {
      id: "f6-prec-q2",
      type: "trueFalse",
      prompt: "Precedent transaction prices often include a premium.",
      correctAnswer: true,
      explainLikeIm5: "Yes. When buyers acquire a company, they usually pay a premium for control. So precedent transaction prices are often higher than trading prices.",
    },
    {
      id: "f6-prec-q3",
      type: "fillInBlank",
      prompt: "Precedent transactions show what buyers paid in the ______.",
      correctAnswer: "past",
      explainLikeIm5: "Precedent Transactions look at past deals. They answer: how much did others pay to buy companies before?",
    },
  ],
  "node-dcf-intro": [
    {
      id: "f6-dcf-q1",
      prompt: "DCF focuses on:",
      choices: ["Past prices", "Future cash"],
      correctIndex: 1,
      explainLikeIm5: "DCF values a company based on its future. You project future cash, adjust for time and risk, and add everything up. It focuses on the business itself.",
    },
    {
      id: "f6-dcf-q2",
      type: "trueFalse",
      prompt: "DCF ignores the stock market.",
      correctAnswer: true,
      explainLikeIm5: "Yes. DCF doesn't look at what the market is paying. It asks: how much is this company's future cash worth today? It focuses on the business, not the market.",
    },
    {
      id: "f6-dcf-q3",
      type: "fillInBlank",
      prompt: "DCF asks what future cash is worth ______.",
      correctAnswer: "today",
      explainLikeIm5: "DCF turns future cash into today's value. It answers: how much is future cash worth today?",
    },
  ],
  "node-when-trust-dcf": [
    {
      id: "f6-trust-q1",
      prompt: "DCF is better when a company is:",
      choices: ["Very similar to others", "Unique"],
      correctIndex: 1,
      explainLikeIm5: "When a company is unique, there may be no good comparables. DCF lets you value it based on its own future cash, not the crowd.",
    },
    {
      id: "f6-trust-q2",
      type: "trueFalse",
      prompt: "DCF relies less on market moods.",
      correctAnswer: true,
      explainLikeIm5: "Yes. Comps follow the crowd—what the market is paying. DCF follows logic—your assumptions about future cash. So DCF is better when the market is noisy.",
    },
    {
      id: "f6-trust-q3",
      type: "tapAllThatApply",
      prompt: "When is DCF more useful?",
      choices: ["Market chaos", "No good comps", "Very stable market"],
      correctIndices: [0, 1],
      explainLikeIm5: "DCF is more useful when the market is chaotic or when there are no good comparable companies. A very stable market with good comps is when Comps work well.",
    },
  ],
  "node-strengths-weaknesses": [
    {
      id: "f6-sw-q1",
      prompt: "Which method is most assumption-heavy?",
      choices: ["Comps", "DCF"],
      correctIndex: 1,
      explainLikeIm5: "DCF is very sensitive to assumptions—growth, discount rate, terminal value. Comps use market multiples, so they rely less on your own assumptions.",
    },
    {
      id: "f6-sw-q2",
      type: "tapAllThatApply",
      prompt: "Which are weaknesses?",
      choices: ["Market bias", "Old deal data", "Perfect accuracy"],
      correctIndices: [0, 1],
      explainLikeIm5: "Market bias (Comps can be wrong when the market is wrong) and old deal data (Precedents may be from old deals) are weaknesses. Perfect accuracy is not a weakness—no method is perfectly accurate.",
    },
    {
      id: "f6-sw-q3",
      type: "trueFalse",
      prompt: "Using multiple methods gives a better answer.",
      correctAnswer: true,
      explainLikeIm5: "Yes. Every method has pros and cons. That's why bankers use Comps, Precedents, and DCF together—to get a better answer.",
    },
  ],
};
