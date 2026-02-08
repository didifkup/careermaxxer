import type { Question } from "@/lib/curriculum";

/**
 * Floor 5: Equity Value & Enterprise Value – Calculations — "Turning Stock Price Into Real Value"
 */
export const FLOOR5_QUESTIONS: Record<string, Question[]> = {
  "node-calc-ev": [
    {
      id: "f5-ev-q1",
      type: "orderSteps",
      prompt: "Put the steps in order.",
      steps: ["Add debt", "Start with equity value", "Subtract cash"],
      correctOrder: [1, 0, 2],
      explainLikeIm5: "First start with equity value, then add debt (and minority interest & preferred), then subtract cash. That gives the value of the whole company.",
    },
    {
      id: "f5-ev-q2",
      prompt: "Debt is:",
      choices: ["Subtracted", "Added"],
      correctIndex: 1,
      explainLikeIm5: "Debt is added when calculating enterprise value. The buyer takes over the debt, so it increases the takeover value.",
    },
    {
      id: "f5-ev-q3",
      type: "trueFalse",
      prompt: "Cash lowers enterprise value.",
      correctAnswer: true,
      explainLikeIm5: "Yes. You subtract cash when calculating enterprise value. Cash makes the company cheaper to buy, so it lowers EV.",
    },
  ],
  "node-fully-diluted": [
    {
      id: "f5-dil-q1",
      prompt: "Fully diluted shares include:",
      choices: ["Only common stock", "All possible shares"],
      correctIndex: 1,
      explainLikeIm5: "Fully diluted shares assume all possible shares exist—common shares, stock options, and convertible securities. It shows the real number if everyone converts.",
    },
    {
      id: "f5-dil-q2",
      type: "trueFalse",
      prompt: "Options can increase the share count.",
      correctAnswer: true,
      explainLikeIm5: "Yes. When options are exercised, they turn into shares. So options can increase the share count and dilute value per share.",
    },
    {
      id: "f5-dil-q3",
      type: "fillInBlank",
      prompt: "More shares means lower value per ______.",
      correctAnswer: "share",
      explainLikeIm5: "The same total equity value spread over more shares means each share is worth less. More shares = lower value per share.",
    },
  ],
  "node-options-convertibles": [
    {
      id: "f5-opt-q1",
      prompt: "Options affect equity value by:",
      choices: ["Increasing debt", "Increasing shares"],
      correctIndex: 1,
      explainLikeIm5: "Options and convertibles can turn into shares. When they do, the share count increases and equity value is spread thinner.",
    },
    {
      id: "f5-opt-q2",
      type: "trueFalse",
      prompt: "More shares can reduce value per share.",
      correctAnswer: true,
      explainLikeIm5: "Yes. When options or convertibles turn into shares, there are more shares. The same equity value spread over more shares means lower value per share.",
    },
    {
      id: "f5-opt-q3",
      type: "fillInBlank",
      prompt: "Dilution means ownership gets ______.",
      correctAnswer: "smaller",
      explainLikeIm5: "Dilution means your slice of the pie gets smaller—more shares exist, so each share is worth less. That's why bankers always check for dilution.",
    },
  ],
  "node-nols": [
    {
      id: "f5-nol-q1",
      prompt: "NOLs help reduce:",
      choices: ["Revenue", "Taxes"],
      correctIndex: 1,
      explainLikeIm5: "NOLs are past losses a company can reuse. They lower future taxes by offsetting future profits. That increases future cash flow.",
    },
    {
      id: "f5-nol-q2",
      type: "trueFalse",
      prompt: "NOLs increase future cash flow.",
      correctAnswer: true,
      explainLikeIm5: "Yes. When NOLs lower future taxes, the company keeps more cash. So NOLs help increase future cash flow.",
    },
    {
      id: "f5-nol-q3",
      type: "tapAllThatApply",
      prompt: "Why might NOLs be worth less?",
      choices: ["They can expire", "They may be limited", "They increase debt"],
      correctIndices: [0, 1],
      explainLikeIm5: "NOLs can expire if not used in time, and they may be limited by rules. They don't increase debt—they're about past losses reducing future taxes.",
    },
  ],
};
