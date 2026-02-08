import type { Question } from "@/lib/curriculum";

/**
 * Floor 13: LBO Models – Calculations
 * Theme: "Turning Debt Into Returns"
 */
export const FLOOR13_QUESTIONS: Record<string, Question[]> = {
  "node-lbo-model-walkthrough": [
    {
      id: "f13-walk-q1",
      type: "orderSteps",
      prompt: "Put the LBO steps in order.",
      steps: ["Pay down debt", "Buy the company", "Sell the company"],
      correctOrder: [1, 0, 2],
      explainLikeIm5: "First you buy the company using equity and debt, then the company generates cash and you use it to pay down debt, then you sell the company later. Less debt plus higher value = more equity.",
    },
    {
      id: "f13-walk-q2",
      prompt: "An LBO model focuses on:",
      choices: ["Revenue only", "Equity returns"],
      correctIndex: 1,
      explainLikeIm5: "A simple LBO model answers: if I buy this company with debt, how much do I make? It's about equity returns—how much you get back on the equity you put in.",
    },
    {
      id: "f13-walk-q3",
      type: "trueFalse",
      prompt: "Debt paydown increases equity value.",
      correctAnswer: true,
      explainLikeIm5: "Yes. As you pay down debt, what's left for owners (equity) goes up. Less debt plus higher value = more equity. That's the engine of LBO returns.",
    },
  ],
  "node-irr-calculated": [
    {
      id: "f13-irr-q1",
      prompt: "IRR measures:",
      choices: ["Total profit", "Speed of returns"],
      correctIndex: 1,
      explainLikeIm5: "IRR measures how fast your money grows—the yearly return you earn. It depends on how much you invest, how much you get back, and how long it takes. Faster and bigger = higher IRR.",
    },
    {
      id: "f13-irr-q2",
      type: "trueFalse",
      prompt: "Getting money back faster increases IRR.",
      correctAnswer: true,
      explainLikeIm5: "Yes. IRR answers: what yearly return do I earn? If you get your money back faster, the same profit is a higher yearly return. Time matters a lot for IRR.",
    },
    {
      id: "f13-irr-q3",
      type: "fillInBlank",
      prompt: "IRR measures how fast your money ______.",
      correctAnswer: "grows",
      explainLikeIm5: "IRR measures how fast your money grows—the annual rate of return. It's about speed, not just total profit.",
    },
  ],
  "node-debt-paydown": [
    {
      id: "f13-debt-q1",
      prompt: "Debt is mainly paid down using:",
      choices: ["Revenue", "Free cash flow"],
      correctIndex: 1,
      explainLikeIm5: "Debt paydown comes from free cash flow. Each year the company earns cash, pays interest, and uses leftover cash to repay debt. Cash flow is the engine.",
    },
    {
      id: "f13-debt-q2",
      type: "trueFalse",
      prompt: "Paying down debt reduces risk.",
      correctAnswer: true,
      explainLikeIm5: "Yes. As debt goes down, there's less to pay back. So risk falls and equity value rises. Debt paydown is how PE firms build value.",
    },
    {
      id: "f13-debt-q3",
      type: "fillInBlank",
      prompt: "Debt paydown increases ______ value.",
      correctAnswer: "equity",
      explainLikeIm5: "As you pay down debt, what's left for owners goes up. So debt paydown increases equity value. Less debt = more equity.",
    },
  ],
  "node-leverage-affects-returns": [
    {
      id: "f13-lev-q1",
      prompt: "Leverage increases:",
      choices: ["Only risk", "Both risk and return"],
      correctIndex: 1,
      explainLikeIm5: "Leverage magnifies results. If things go well: less equity invested, more upside, higher IRR. If things go badly: debt still must be paid, equity can be wiped out. So both risk and return go up.",
    },
    {
      id: "f13-lev-q2",
      type: "trueFalse",
      prompt: "Leverage always guarantees higher returns.",
      correctAnswer: false,
      explainLikeIm5: "No. Leverage magnifies both gains and losses. If things go badly, debt still must be paid and equity can be wiped out. Leverage is powerful—and dangerous.",
    },
    {
      id: "f13-lev-q3",
      type: "fillInBlank",
      prompt: "Leverage magnifies both gains and ______.",
      correctAnswer: "losses",
      explainLikeIm5: "Leverage magnifies results—both good and bad. When things go well, returns are bigger. When things go badly, losses are bigger too.",
    },
  ],
  "node-exit-multiples-decrease": [
    {
      id: "f13-exit-q1",
      prompt: "Lower exit multiples cause:",
      choices: ["Higher returns", "Lower returns"],
      correctIndex: 1,
      explainLikeIm5: "Exit multiple matters a lot. If exit multiple goes down, sale price is lower, equity value falls, and IRR drops. Even a great company can have poor returns if the exit price is bad.",
    },
    {
      id: "f13-exit-q2",
      type: "trueFalse",
      prompt: "Exit multiple has no impact on IRR.",
      correctAnswer: false,
      explainLikeIm5: "No. Exit multiple has a big impact. When you sell at a lower multiple, you get less for the company—so equity value and IRR drop. Entry price plus exit price = destiny.",
    },
    {
      id: "f13-exit-q3",
      type: "fillInBlank",
      prompt: "A lower exit multiple means a lower ______ price.",
      correctAnswer: "sale",
      explainLikeIm5: "Exit multiple is the multiple you sell at (e.g. EV/EBITDA). A lower exit multiple means you sell the company at a lower price—so returns suffer.",
    },
  ],
};
