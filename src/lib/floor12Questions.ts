import type { Question } from "@/lib/curriculum";

/**
 * Floor 12: LBO Models – Concepts
 * Theme: "Buying Companies With Borrowed Money"
 */
export const FLOOR12_QUESTIONS: Record<string, Question[]> = {
  "node-what-is-lbo": [
    {
      id: "f12-lbo-q1",
      prompt: "An LBO uses a lot of:",
      choices: ["Cash only", "Debt"],
      correctIndex: 1,
      explainLikeIm5: "A leveraged buyout means buying a company using a lot of borrowed money. PE firms put in some of their own money and borrow the rest. Leverage = borrowed money.",
    },
    {
      id: "f12-lbo-q2",
      type: "trueFalse",
      prompt: "In an LBO, the company helps pay its own debt.",
      correctAnswer: true,
      explainLikeIm5: "Yes. The company's cash flow is used to pay back the debt. So the business helps pay for its own purchase.",
    },
    {
      id: "f12-lbo-q3",
      type: "fillInBlank",
      prompt: "Leverage means using borrowed ______.",
      correctAnswer: "money",
      explainLikeIm5: "Leverage = borrowed money. In an LBO, you use a lot of debt—that's the leverage.",
    },
  ],
  "node-why-pe-uses-leverage": [
    {
      id: "f12-lev-q1",
      prompt: "Leverage helps PE firms:",
      choices: ["Lower returns", "Increase returns"],
      correctIndex: 1,
      explainLikeIm5: "Leverage helps increase returns. You invest less of your own money, debt is cheaper than equity, and if the company performs well, gains are bigger. Leverage magnifies results—both good and bad.",
    },
    {
      id: "f12-lev-q2",
      type: "trueFalse",
      prompt: "Debt is usually cheaper than equity.",
      correctAnswer: true,
      explainLikeIm5: "Yes. Debt (borrowed money) usually costs less than equity (owners' money). So using more debt can boost returns when things go well.",
    },
    {
      id: "f12-lev-q3",
      type: "fillInBlank",
      prompt: "Leverage makes gains ______.",
      correctAnswer: "bigger",
      explainLikeIm5: "When the company does well, leverage magnifies the gains—you get a bigger return on the money you put in. But it also magnifies losses if things go bad.",
    },
  ],
  "node-good-lbo-candidate": [
    {
      id: "f12-cand-q1",
      prompt: "A good LBO candidate usually has:",
      choices: ["Unstable cash flow", "Predictable cash flow"],
      correctIndex: 1,
      explainLikeIm5: "PE firms like companies with steady, predictable cash flow. You need that cash to pay down debt. Unstable cash flow is risky for an LBO.",
    },
    {
      id: "f12-cand-q2",
      type: "tapAllThatApply",
      prompt: "Which traits make a good LBO candidate?",
      choices: ["Strong margins", "Steady cash flow", "Huge losses"],
      correctIndices: [0, 1],
      explainLikeIm5: "Good LBO candidates have strong margins, steady cash flow, low risk, and few capital spending needs. Huge losses make it hard to pay debt—bad for an LBO.",
    },
    {
      id: "f12-cand-q3",
      type: "trueFalse",
      prompt: "High risk companies are ideal LBO targets.",
      correctAnswer: false,
      explainLikeIm5: "No. PE firms want stable companies—steady cash flow, low risk. High risk companies are dangerous when you have a lot of debt to pay back.",
    },
  ],
  "node-how-pe-makes-money": [
    {
      id: "f12-money-q1",
      prompt: "Paying down debt helps:",
      choices: ["Increase equity value", "Decrease ownership"],
      correctIndex: 0,
      explainLikeIm5: "As debt goes down, what's left for owners (equity) goes up. PE firms make money by: paying down debt, growing the business, and selling at a higher price. Debt goes down, equity value goes up.",
    },
    {
      id: "f12-money-q2",
      type: "tapAllThatApply",
      prompt: "How do PE firms make money?",
      choices: ["Debt repayment", "Business growth", "Ignoring the company"],
      correctIndices: [0, 1],
      explainLikeIm5: "PE firms make money in three main ways: paying down debt (equity value goes up), growing the business, and selling at a higher price. They buy, improve, and sell. Ignoring the company doesn't help.",
    },
    {
      id: "f12-money-q3",
      type: "trueFalse",
      prompt: "Selling at a higher price increases returns.",
      correctAnswer: true,
      explainLikeIm5: "Yes. One of the main ways PE makes money is selling the company at a higher price than they paid. Buy, improve, and sell at a higher value.",
    },
  ],
  "node-main-drivers-irr": [
    {
      id: "f12-irr-q1",
      prompt: "IRR improves when you:",
      choices: ["Hold longer forever", "Exit faster"],
      correctIndex: 1,
      explainLikeIm5: "IRR measures how fast money grows. Time matters—faster gains = higher IRR. So exiting faster (when you've made your return) can improve IRR. Holding forever doesn't help IRR.",
    },
    {
      id: "f12-irr-q2",
      type: "tapAllThatApply",
      prompt: "What affects IRR?",
      choices: ["Entry price", "Exit price", "Office color"],
      correctIndices: [0, 1],
      explainLikeIm5: "Main drivers of IRR: entry price (buy cheap), exit price (sell high), debt usage, and how fast you exit. Office color doesn't affect returns.",
    },
    {
      id: "f12-irr-q3",
      type: "trueFalse",
      prompt: "Time is a key driver of IRR.",
      correctAnswer: true,
      explainLikeIm5: "Yes. IRR measures how fast your money grows. So time matters a lot—faster gains mean higher IRR. How long you hold affects the return.",
    },
  ],
  "node-typical-exit-strategies": [
    {
      id: "f12-exit-q1",
      prompt: "An IPO means:",
      choices: ["Shutting down the company", "Going public"],
      correctIndex: 1,
      explainLikeIm5: "IPO = Initial Public Offering. It means taking the company public—selling shares on the stock market. It's one common exit strategy for PE firms.",
    },
    {
      id: "f12-exit-q2",
      type: "tapAllThatApply",
      prompt: "Which are common exit strategies?",
      choices: ["Sale to another company", "IPO", "Never selling"],
      correctIndices: [0, 1],
      explainLikeIm5: "Common exits: sell to another company, sell to another PE firm, or IPO (go public). The goal is a clean exit at a higher value. PE firms don't hold forever—they plan to sell.",
    },
    {
      id: "f12-exit-q3",
      type: "trueFalse",
      prompt: "Private equity firms plan their exit early.",
      correctAnswer: true,
      explainLikeIm5: "Yes. PE firms don't hold companies forever. They buy, improve, and plan from the start how they'll exit—sale, IPO, or sale to another PE firm. Exit planning happens early.",
    },
  ],
};
