import type { Question } from "@/lib/curriculum";

/**
 * Floor 11: Merger Models – Calculations
 * Theme: "Does the Deal Actually Help Shareholders?"
 */
export const FLOOR11_QUESTIONS: Record<string, Question[]> = {
  "node-merger-model-walkthrough": [
    {
      id: "f11-walk-q1",
      type: "orderSteps",
      prompt: "Put the merger model steps in order.",
      steps: ["Compare EPS", "Combine earnings", "Divide by share count"],
      correctOrder: [1, 2, 0],
      explainLikeIm5: "First you combine the two companies' earnings, then divide by the new share count to get EPS, then compare before vs after. Before vs after EPS tells you if the deal works.",
    },
    {
      id: "f11-walk-q2",
      prompt: "A merger model is mainly about:",
      choices: ["Revenue growth", "EPS impact"],
      correctIndex: 1,
      explainLikeIm5: "A merger model answers: after buying another company, do shareholders win or lose? It's about EPS impact—does EPS go up or down?",
    },
    {
      id: "f11-walk-q3",
      type: "trueFalse",
      prompt: "Merger models compare before and after EPS.",
      correctAnswer: true,
      explainLikeIm5: "Yes. You combine earnings, add synergies, subtract costs, divide by new share count, then compare EPS before vs after. That comparison tells you if the deal works.",
    },
  ],
  "node-determining-accretion-dilution": [
    {
      id: "f11-acc-q1",
      prompt: "A deal is accretive when EPS:",
      choices: ["Goes up", "Goes down"],
      correctIndex: 0,
      explainLikeIm5: "Post-deal EPS > pre-deal EPS means accretive. Post-deal EPS < pre-deal EPS means dilutive. Everything in the model feeds into that comparison.",
    },
    {
      id: "f11-acc-q2",
      type: "trueFalse",
      prompt: "Accretion is based on total profit, not EPS.",
      correctAnswer: false,
      explainLikeIm5: "No. Accretion and dilution are about EPS—earnings per share. If EPS goes up, it's accretive. Total profit alone doesn't tell you per-share impact.",
    },
    {
      id: "f11-acc-q3",
      type: "fillInBlank",
      prompt: "Accretion and dilution are measured using ______ per share.",
      correctAnswer: "earnings",
      explainLikeIm5: "Accretion and dilution come from EPS—earnings per share. You compare post-deal EPS to pre-deal EPS. That's it.",
    },
  ],
  "node-stock-vs-cash-consideration": [
    {
      id: "f11-stock-q1",
      prompt: "Stock deals usually cause:",
      choices: ["More dilution", "More interest"],
      correctIndex: 0,
      explainLikeIm5: "Stock deal = new shares issued. More shares means more dilution—EPS gets spread across more shares. Cash deals add interest expense instead.",
    },
    {
      id: "f11-stock-q2",
      type: "tapAllThatApply",
      prompt: "Cash deals usually involve:",
      choices: ["Interest expense", "New shares", "Debt"],
      correctIndices: [0, 2],
      explainLikeIm5: "Cash deals are often financed with debt. So you get interest expense and debt. No new shares—that's the difference from stock deals. Cash hurts through interest; stock hurts through dilution.",
    },
    {
      id: "f11-stock-q3",
      type: "trueFalse",
      prompt: "Cash deals avoid dilution.",
      correctAnswer: true,
      explainLikeIm5: "Yes. Cash deal = no new shares issued. So no dilution from the deal. But you add interest expense from the debt used to pay. Stock deals add new shares, so more dilution.",
    },
  ],
  "node-synergies-affect-accretion": [
    {
      id: "f11-syn-q1",
      prompt: "Synergies usually make a deal:",
      choices: ["More dilutive", "More accretive"],
      correctIndex: 1,
      explainLikeIm5: "Synergies increase combined earnings. Higher earnings → higher EPS → more accretion. Synergies can turn a bad deal into a good one. Cost synergies help faster; revenue synergies help later.",
    },
    {
      id: "f11-syn-q2",
      type: "trueFalse",
      prompt: "Cost synergies are usually more reliable than revenue synergies.",
      correctAnswer: true,
      explainLikeIm5: "Yes. Cost synergies—cutting duplicate costs—help faster and are easier to predict. Revenue synergies—selling more together—help later and are riskier.",
    },
    {
      id: "f11-syn-q3",
      type: "fillInBlank",
      prompt: "Synergies increase combined ______.",
      correctAnswer: "earnings",
      explainLikeIm5: "Synergies increase the combined company's earnings. Higher earnings with the same or similar share count means higher EPS—more accretion.",
    },
  ],
  "node-purchase-accounting-intuition": [
    {
      id: "f11-pa-q1",
      prompt: "Purchase accounting mainly affects:",
      choices: ["EPS", "Revenue growth"],
      correctIndex: 0,
      explainLikeIm5: "Purchase accounting adjusts the balance sheet when a company is bought—assets written up, new amortization, goodwill. These changes affect earnings and therefore EPS. Accounting matters for accretion.",
    },
    {
      id: "f11-pa-q2",
      type: "tapAllThatApply",
      prompt: "Purchase accounting can create:",
      choices: ["Goodwill", "Amortization", "Free cash"],
      correctIndices: [0, 1],
      explainLikeIm5: "When a company is bought, purchase accounting can create goodwill (the premium paid over book value) and new amortization (from writing up assets). It doesn't create free cash—it's accounting.",
    },
    {
      id: "f11-pa-q3",
      type: "trueFalse",
      prompt: "Purchase accounting has no effect on accretion.",
      correctAnswer: false,
      explainLikeIm5: "No. Purchase accounting creates amortization and other expenses that reduce earnings. So it affects EPS and therefore accretion. Accounting matters for the merger model.",
    },
  ],
};
