import type { Question } from "@/lib/curriculum";

/**
 * Floor 10: Merger Models – Concepts
 * Theme: "Why Companies Buy Other Companies"
 */
export const FLOOR10_QUESTIONS: Record<string, Question[]> = {
  "node-accretion-dilution": [
    {
      id: "f10-acc-q1",
      prompt: "An accretive deal causes EPS to:",
      choices: ["Go up", "Go down"],
      correctIndex: 0,
      explainLikeIm5: "An accretive deal means earnings per share go up after the deal. Dilutive means EPS goes down. Think: after the deal, do owners earn more or less per share?",
    },
    {
      id: "f10-acc-q2",
      type: "trueFalse",
      prompt: "Dilution means shareholders earn less per share.",
      correctAnswer: true,
      explainLikeIm5: "Yes. A dilutive deal means EPS goes down—shareholders earn less per share. Accretive means they earn more per share.",
    },
    {
      id: "f10-acc-q3",
      type: "fillInBlank",
      prompt: "Accretion and dilution focus on ______ per share.",
      correctAnswer: "earnings",
      explainLikeIm5: "Accretion and dilution are about earnings per share (EPS). Does the deal help or hurt EPS? That's accretion vs dilution.",
    },
  ],
  "node-why-accretive": [
    {
      id: "f10-why-q1",
      prompt: "A deal is more likely accretive if the buyer:",
      choices: ["Overpays", "Pays a reasonable price"],
      correctIndex: 1,
      explainLikeIm5: "A deal becomes accretive when the buyer pays a low or reasonable price, the target makes strong profits, debt is cheap, or synergies exist. Overpaying makes accretion harder.",
    },
    {
      id: "f10-why-q2",
      type: "tapAllThatApply",
      prompt: "What can make a deal accretive?",
      choices: ["Low interest rates", "Strong target profits", "No plan at all"],
      correctIndices: [0, 1],
      explainLikeIm5: "Low interest rates (cheap debt) and strong target profits can make a deal accretive. Cheap money plus strong earnings can mean higher EPS. No plan doesn't help.",
    },
    {
      id: "f10-why-q3",
      type: "trueFalse",
      prompt: "Using cheap debt can help accretion.",
      correctAnswer: true,
      explainLikeIm5: "Yes. When debt is cheap (low interest rates), financing the deal costs less. That can help EPS go up—accretion. Smart pricing and cheap money help.",
    },
  ],
  "node-what-are-synergies": [
    {
      id: "f10-syn1-q1",
      prompt: "Synergies mean:",
      choices: ["Extra value from combining companies", "More paperwork"],
      correctIndex: 0,
      explainLikeIm5: "Synergies mean two companies together work better than apart—cutting duplicate costs, selling more together, sharing technology. Extra value. 1 + 1 > 2.",
    },
    {
      id: "f10-syn1-q2",
      type: "trueFalse",
      prompt: "Synergies mean companies perform better together.",
      correctAnswer: true,
      explainLikeIm5: "Yes. Synergies mean two companies together create more value than apart—they perform better together. That's the whole idea of 1 + 1 > 2.",
    },
    {
      id: "f10-syn1-q3",
      type: "fillInBlank",
      prompt: "Synergies mean 1 + 1 is greater than ______.",
      correctAnswer: "2",
      explainLikeIm5: "Synergies create extra value—so combined they're worth more than the sum of the parts. 1 + 1 > 2.",
    },
  ],
  "node-types-synergies": [
    {
      id: "f10-syn2-q1",
      prompt: "Which synergy is easier to achieve?",
      choices: ["Revenue synergy", "Cost synergy"],
      correctIndex: 1,
      explainLikeIm5: "Cost synergies—like cutting duplicate staff or closing extra offices—are easier to achieve. Revenue synergies—cross-selling, reaching more customers—are riskier and harder to predict.",
    },
    {
      id: "f10-syn2-q2",
      type: "tapAllThatApply",
      prompt: "Which are revenue synergies?",
      choices: ["Cross-selling", "Higher prices", "Cutting staff"],
      correctIndices: [0, 1],
      explainLikeIm5: "Revenue synergies are about making more money together—cross-selling products, higher prices, reaching more customers. Cutting staff is a cost synergy.",
    },
    {
      id: "f10-syn2-q3",
      type: "trueFalse",
      prompt: "Revenue synergies are harder to predict.",
      correctAnswer: true,
      explainLikeIm5: "Yes. Cost synergies are easier to plan. Revenue synergies—will customers really buy more?—are harder to predict and riskier.",
    },
  ],
  "node-why-premium": [
    {
      id: "f10-prem-q1",
      prompt: "A premium means paying:",
      choices: ["Less than market price", "More than market price"],
      correctIndex: 1,
      explainLikeIm5: "A premium is paying more than the current stock price. Buyers pay premiums because they expect synergies, want control, see future growth, or fear competitors.",
    },
    {
      id: "f10-prem-q2",
      type: "tapAllThatApply",
      prompt: "Why might a buyer pay a premium?",
      choices: ["Synergies", "Control", "Panic"],
      correctIndices: [0, 1],
      explainLikeIm5: "Buyers pay premiums for synergies (extra value together), control (running the combined company), and sometimes fear of competitors. Panic alone isn't a good reason—but it can drive deals.",
    },
    {
      id: "f10-prem-q3",
      type: "trueFalse",
      prompt: "Premiums are paid because buyers expect future benefits.",
      correctAnswer: true,
      explainLikeIm5: "Yes. Premium = belief in future value. Buyers pay more than market price because they expect synergies, growth, or control to create value later.",
    },
  ],
  "node-ma-risks": [
    {
      id: "f10-risk-q1",
      prompt: "A major M&A risk is:",
      choices: ["Overpaying", "Free money"],
      correctIndex: 0,
      explainLikeIm5: "Overpaying is a major M&A risk. Other risks: synergies not happening, culture clash, integration problems, too much debt. Many deals fail because the plan looks good on paper but fails in real life.",
    },
    {
      id: "f10-risk-q2",
      type: "tapAllThatApply",
      prompt: "Which are M&A risks?",
      choices: ["Culture clash", "Integration problems", "Guaranteed success"],
      correctIndices: [0, 1],
      explainLikeIm5: "Culture clash (people don't work well together) and integration problems (combining systems and teams is hard) are real M&A risks. Guaranteed success is not a risk—it's wishful thinking.",
    },
    {
      id: "f10-risk-q3",
      type: "trueFalse",
      prompt: "Most M&A deals are risk-free.",
      correctAnswer: false,
      explainLikeIm5: "No. M&A is risky. Overpaying, synergies not happening, culture clash, integration problems, too much debt—many deals fail because the plan looks good on paper but fails in real life.",
    },
  ],
};
