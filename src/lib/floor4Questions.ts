import type { Question } from "@/lib/curriculum";

/**
 * Floor 4: Equity Value & Enterprise Value – Concepts — "What a Company Is Really Worth"
 */
export const FLOOR4_QUESTIONS: Record<string, Question[]> = {
  "node-ev-what": [
    {
      id: "f4-ev1-q1",
      prompt: "Enterprise value measures:",
      choices: ["Only the stock price", "The entire company"],
      correctIndex: 1,
      explainLikeIm5: "Enterprise value is the value of the whole company—what it would cost to buy everything, including debt and cash.",
    },
    {
      id: "f4-ev1-q2",
      type: "trueFalse",
      prompt: "Enterprise value includes debt.",
      correctAnswer: true,
      explainLikeIm5: "Yes. When you buy a company, you take over its debt too. Enterprise value is the total takeover price.",
    },
    {
      id: "f4-ev1-q3",
      type: "fillInBlank",
      prompt: "Enterprise value is the cost to buy the ______ company.",
      correctAnswer: "entire",
      explainLikeIm5: "Enterprise value means buying the whole company—the business, the debt, and the cash.",
    },
  ],
  "node-ev-why-instead-of-equity": [
    {
      id: "f4-ev2-q1",
      prompt: "Enterprise value ignores:",
      choices: ["The business", "Financing choices"],
      correctIndex: 1,
      explainLikeIm5: "Enterprise value focuses on the business itself and ignores how it was financed—debt vs equity.",
    },
    {
      id: "f4-ev2-q2",
      type: "trueFalse",
      prompt: "Enterprise value helps compare companies fairly.",
      correctAnswer: true,
      explainLikeIm5: "Yes. Two companies with the same business but different amounts of debt or cash can be compared fairly using enterprise value.",
    },
    {
      id: "f4-ev2-q3",
      type: "fillInBlank",
      prompt: "Enterprise value focuses on the ______ itself.",
      correctAnswer: "business",
      explainLikeIm5: "Enterprise value is about the business, not how it was paid for. That's why bankers use it.",
    },
  ],
  "node-market-cap-vs-equity": [
    {
      id: "f4-mc-q1",
      prompt: "Market cap equals:",
      choices: ["Debt × shares", "Share price × shares"],
      correctIndex: 1,
      explainLikeIm5: "Market cap is the stock price times the number of shares. It's a simple way to see what the stock is worth.",
    },
    {
      id: "f4-mc-q2",
      type: "trueFalse",
      prompt: "Equity value includes more than just common shares.",
      correctAnswer: true,
      explainLikeIm5: "Yes. Equity value can include stock options and convertible shares. It's more complete than market cap.",
    },
    {
      id: "f4-mc-q3",
      type: "fillInBlank",
      prompt: "Equity value represents the value to ______.",
      correctAnswer: "owners",
      explainLikeIm5: "Equity value is what owners are worth today. Market cap is simple; equity value is more complete.",
    },
  ],
  "node-why-subtract-cash": [
    {
      id: "f4-cash-q1",
      prompt: "Cash is subtracted because it:",
      choices: ["Increases value", "Lowers purchase cost"],
      correctIndex: 1,
      explainLikeIm5: "When you buy a company, you get its cash too. So cash lowers the real cost—like paying $100 but getting $20 back.",
    },
    {
      id: "f4-cash-q2",
      type: "trueFalse",
      prompt: "Cash increases enterprise value.",
      correctAnswer: false,
      explainLikeIm5: "No. Cash is subtracted when calculating enterprise value. It makes the company cheaper to buy, not more expensive.",
    },
    {
      id: "f4-cash-q3",
      type: "fillInBlank",
      prompt: "Cash makes a company ______ to buy.",
      correctAnswer: "cheaper",
      explainLikeIm5: "If the company has cash, you get that cash when you buy. So the real cost is lower—the company is cheaper to buy.",
    },
  ],
  "node-why-add-debt": [
    {
      id: "f4-debt-q1",
      prompt: "Debt is added because buyers:",
      choices: ["Ignore it", "Must repay it"],
      correctIndex: 1,
      explainLikeIm5: "When you buy a company, you take over its loans. The buyer must repay the debt, so it increases the true cost.",
    },
    {
      id: "f4-debt-q2",
      type: "trueFalse",
      prompt: "Debt increases enterprise value.",
      correctAnswer: true,
      explainLikeIm5: "Yes. Debt is money the buyer must take over and repay. So it makes the company more expensive to buy.",
    },
    {
      id: "f4-debt-q3",
      type: "fillInBlank",
      prompt: "Debt makes a company more ______ to buy.",
      correctAnswer: "expensive",
      explainLikeIm5: "Debt is something the buyer must pay. So more debt means a higher true cost—the company is more expensive to buy.",
    },
  ],
  "node-minority-preferred": [
    {
      id: "f4-min-q1",
      prompt: "Minority interest means owning:",
      choices: ["All of a company", "Part of a company"],
      correctIndex: 1,
      explainLikeIm5: "Minority interest means you own most of a company but not all of it—you own a part of another company.",
    },
    {
      id: "f4-min-q2",
      type: "tapAllThatApply",
      prompt: "Which are added to enterprise value?",
      choices: ["Minority interest", "Preferred stock", "Office chairs"],
      correctIndices: [0, 1],
      explainLikeIm5: "Minority interest and preferred stock affect the full company value, so they are included in enterprise value. Office chairs don't work that way.",
    },
    {
      id: "f4-min-q3",
      type: "trueFalse",
      prompt: "Preferred stock is paid before common stock.",
      correctAnswer: true,
      explainLikeIm5: "Yes. Preferred stock is special ownership—it gets paid before common stock, more like debt.",
    },
  ],
  "node-equity-negative": [
    {
      id: "f4-neg-q1",
      prompt: "Equity value can be negative when:",
      choices: ["Cash is high", "Debt is higher than assets"],
      correctIndex: 1,
      explainLikeIm5: "When debt is very high and assets are worth less, there may be nothing left for owners. Equity value can be zero or negative.",
    },
    {
      id: "f4-neg-q2",
      type: "trueFalse",
      prompt: "Equity holders are paid last.",
      correctAnswer: true,
      explainLikeIm5: "Yes. Lenders and others get paid first. What's left goes to equity owners—so they can get nothing if debt is too high.",
    },
    {
      id: "f4-neg-q3",
      type: "fillInBlank",
      prompt: "Equity value shows what is left for ______.",
      correctAnswer: "owners",
      explainLikeIm5: "Equity value is what owners get. If debt is higher than assets, owners might get nothing—equity value can be negative.",
    },
  ],
};
