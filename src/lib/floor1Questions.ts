import type { Question } from "@/lib/curriculum";

/**
 * Floor 1: Finance Concepts — exact practice questions per node (Duolingo-style).
 * Used when getCoreQuestionsForNode is called for these node IDs; order preserved.
 */
export const FLOOR1_QUESTIONS: Record<string, Question[]> = {
  "node-assets-liabilities": [
    {
      id: "f1-a1-q1",
      prompt: "Which one is an asset?",
      choices: ["Bank loan", "Cash", "Credit card bill"],
      correctIndex: 1,
      explainLikeIm5: "Cash is something you have. A loan or a bill is something you owe.",
    },
    {
      id: "f1-a1-q2",
      type: "tapAllThatApply",
      prompt: "Which are liabilities?",
      choices: ["Cash", "Office building", "Bank loan", "Credit card balance"],
      correctIndices: [2, 3],
      explainLikeIm5: "Liabilities are what you owe. A bank loan and a credit card balance are both things you have to pay back.",
    },
    {
      id: "f1-a1-q3",
      type: "fillInBlank",
      prompt: "Assets help a company ______ money.",
      correctAnswer: "make",
      explainLikeIm5: "Assets are things that help the company make or earn money.",
    },
    {
      id: "f1-a1-q4",
      type: "trueFalse",
      prompt: "Liabilities are things a company owns.",
      correctAnswer: false,
      explainLikeIm5: "Liabilities are what a company owes, not what it owns. Owning is the opposite of owing!",
    },
  ],
  "node-debt-equity": [
    {
      id: "f1-d1-q1",
      prompt: "Debt means:",
      choices: ["Selling ownership", "Borrowing money", "Free money"],
      correctIndex: 1,
      explainLikeIm5: "Debt is when you borrow money. You have to pay it back, usually with interest.",
    },
    {
      id: "f1-d1-q2",
      type: "fillInBlank",
      prompt: "Equity means giving up part of the ______.",
      correctAnswer: "company",
      explainLikeIm5: "When you sell equity, you're selling a piece of the company. The buyer becomes a part-owner.",
    },
    {
      id: "f1-d1-q3",
      prompt: "Which must be paid back?",
      choices: ["Debt", "Equity"],
      correctIndex: 0,
      explainLikeIm5: "Debt has to be paid back. Equity is ownership—there's no loan to repay.",
    },
    {
      id: "f1-d1-q4",
      type: "trueFalse",
      prompt: "Equity investors own part of the company.",
      correctAnswer: true,
      explainLikeIm5: "Yes! When you buy equity, you own a share of the company. That's what makes it different from debt.",
    },
  ],
  "node-why-equity": [
    {
      id: "f1-e1-q1",
      prompt: "A company issues equity to avoid:",
      choices: ["Growth", "Interest payments", "Customers"],
      correctIndex: 1,
      explainLikeIm5: "Equity doesn't require interest payments. That's one reason risky or new companies prefer it over debt.",
    },
    {
      id: "f1-e1-q2",
      type: "trueFalse",
      prompt: "Equity is safer for risky companies.",
      correctAnswer: true,
      explainLikeIm5: "Risky companies may not have steady cash to pay interest. With equity, there are no required payments—investors share the risk.",
    },
    {
      id: "f1-e1-q3",
      type: "tapAllThatApply",
      prompt: "Which companies often issue equity?",
      choices: ["New startups", "Companies with low cash", "Companies already deep in debt"],
      correctIndices: [0, 1, 2],
      explainLikeIm5: "All of these often prefer equity: new companies, those with little cash, and those already owing a lot. Equity means less pressure to pay back.",
    },
  ],
  "node-why-debt": [
    {
      id: "f1-d2-q1",
      prompt: "Debt is better when a company:",
      choices: ["Is struggling", "Has steady cash", "Has no revenue"],
      correctIndex: 1,
      explainLikeIm5: "When a company has steady cash, it can afford to make interest payments. That's when debt often makes sense.",
    },
    {
      id: "f1-d2-q2",
      type: "fillInBlank",
      prompt: "Debt lets owners keep full ______.",
      correctAnswer: "ownership",
      explainLikeIm5: "With debt, you don't sell part of the company—you borrow. So you keep full ownership.",
    },
    {
      id: "f1-d2-q3",
      type: "trueFalse",
      prompt: "Debt can be cheaper than equity.",
      correctAnswer: true,
      explainLikeIm5: "Often yes. Interest on debt can be lower than the return investors expect from equity, and interest can lower taxes.",
    },
  ],
  "node-pe-what-they-want": [
    {
      id: "f1-pe-q1",
      prompt: "Private equity prefers companies that:",
      choices: ["Lose money", "Make steady money", "Never change"],
      correctIndex: 1,
      explainLikeIm5: "PE investors want companies that already make steady money. Then they improve them and sell for more.",
    },
    {
      id: "f1-pe-q2",
      type: "tapAllThatApply",
      prompt: "What do private equity investors like?",
      choices: ["Growth potential", "Strong leadership", "Chaos"],
      correctIndices: [0, 1],
      explainLikeIm5: "They like growth potential and strong leadership. Chaos makes it hard to improve and sell—so they avoid it.",
    },
    {
      id: "f1-pe-q3",
      type: "trueFalse",
      prompt: "Private equity plans to hold companies forever.",
      correctAnswer: false,
      explainLikeIm5: "No. The idea is buy → improve → sell. They plan to sell later for more money.",
    },
  ],
  "node-drivers-value": [
    {
      id: "f1-v1-q1",
      prompt: "What increases value the most?",
      choices: ["More profits", "More problems", "More debt"],
      correctIndex: 0,
      explainLikeIm5: "More profits make a company worth more. Problems and extra debt usually don't!",
    },
    {
      id: "f1-v1-q2",
      type: "tapAllThatApply",
      prompt: "Which drive business value?",
      choices: ["Growth", "Profit", "Risk"],
      correctIndices: [0, 1],
      explainLikeIm5: "Growth and profit increase value. Risk usually reduces it—so we say 'more money + growth − risk = higher value.'",
    },
    {
      id: "f1-v1-q3",
      type: "trueFalse",
      prompt: "Lower risk makes a company more valuable.",
      correctAnswer: true,
      explainLikeIm5: "Yes. When there's less risk, people are willing to pay more for the same level of profit. So lower risk = higher value.",
    },
  ],
};

export const FLOOR1_NODE_IDS = Object.keys(FLOOR1_QUESTIONS) as string[];
