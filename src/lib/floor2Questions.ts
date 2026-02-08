import type { Question } from "@/lib/curriculum";

/**
 * Floor 2: Accounting – Concepts — exact practice questions per node (Duolingo-style).
 * Theme: "How Company Money Moves"
 */
export const FLOOR2_QUESTIONS: Record<string, Question[]> = {
  "node-three-statements": [
    {
      id: "f2-s1-q1",
      prompt: "Which statement shows profit?",
      choices: ["Balance Sheet", "Income Statement", "Cash Flow Statement"],
      correctIndex: 1,
      explainLikeIm5: "The income statement shows revenue, expenses, and what's left—profit. That's the scoreboard.",
    },
    {
      id: "f2-s1-q2",
      prompt: "Which statement is a snapshot in time?",
      choices: ["Income Statement", "Balance Sheet", "Cash Flow Statement"],
      correctIndex: 1,
      explainLikeIm5: "The balance sheet shows what the company owns and owes at one moment—like a photo.",
    },
    {
      id: "f2-s1-q3",
      type: "trueFalse",
      prompt: "The cash flow statement shows real cash movement.",
      correctAnswer: true,
      explainLikeIm5: "Yes! It shows where cash actually moved in and out—like a bank app.",
    },
  ],
  "node-statements-linked": [
    {
      id: "f2-l1-q1",
      prompt: "Net income flows into:",
      choices: ["Debt", "Equity", "Revenue"],
      correctIndex: 1,
      explainLikeIm5: "Profit from the income statement flows into equity on the balance sheet. They're linked!",
    },
    {
      id: "f2-l1-q2",
      prompt: "Cash on the balance sheet comes from:",
      choices: ["Income Statement", "Cash Flow Statement"],
      correctIndex: 1,
      explainLikeIm5: "The cash flow statement shows where cash moved. That cash shows up on the balance sheet.",
    },
    {
      id: "f2-l1-q3",
      type: "trueFalse",
      prompt: "If one statement changes, the others may change too.",
      correctAnswer: true,
      explainLikeIm5: "Yes! The three statements talk to each other. If one changes, the others react.",
    },
  ],
  "node-depreciation-increases": [
    {
      id: "f2-d1-q1",
      prompt: "Depreciation is a:",
      choices: ["Cash expense", "Non-cash expense"],
      correctIndex: 1,
      explainLikeIm5: "Depreciation is a non-cash expense. It lowers profit on paper but doesn't use actual cash.",
    },
    {
      id: "f2-d1-q2",
      prompt: "Higher depreciation causes profit to:",
      choices: ["Increase", "Decrease"],
      correctIndex: 1,
      explainLikeIm5: "When depreciation goes up, profit on the income statement goes down. It's an expense.",
    },
    {
      id: "f2-d1-q3",
      type: "trueFalse",
      prompt: "Depreciation reduces taxes.",
      correctAnswer: true,
      explainLikeIm5: "Yes! Depreciation is an expense, so it lowers taxable profit. Lower profit means lower taxes.",
    },
  ],
  "node-dividends": [
    {
      id: "f2-dv1-q1",
      prompt: "Dividends first affect which statement?",
      choices: ["Income Statement", "Cash Flow Statement"],
      correctIndex: 1,
      explainLikeIm5: "Dividends are cash going out. That shows up on the cash flow statement first.",
    },
    {
      id: "f2-dv1-q2",
      type: "tapAllThatApply",
      prompt: "What goes down when dividends are paid?",
      choices: ["Cash", "Equity", "Revenue"],
      correctIndices: [0, 1],
      explainLikeIm5: "When dividends are paid, cash goes out and equity goes down. Revenue doesn't change.",
    },
    {
      id: "f2-dv1-q3",
      type: "trueFalse",
      prompt: "Dividends reduce net income.",
      correctAnswer: false,
      explainLikeIm5: "No. Dividends don't appear on the income statement. They reduce cash and equity, not net income.",
    },
  ],
  "node-working-capital": [
    {
      id: "f2-w1-q1",
      prompt: "Working capital measures:",
      choices: ["Long-term growth", "Short-term health"],
      correctIndex: 1,
      explainLikeIm5: "Working capital measures short-term money health—can the company pay bills and keep operating?",
    },
    {
      id: "f2-w1-q2",
      type: "fillInBlank",
      prompt: "Working capital equals assets minus ______.",
      correctAnswer: "liabilities",
      explainLikeIm5: "Working Capital = Current Assets − Current Liabilities. It's money for daily life.",
    },
    {
      id: "f2-w1-q3",
      type: "trueFalse",
      prompt: "Working capital is about day-to-day money.",
      correctAnswer: true,
      explainLikeIm5: "Yes! It shows if a company can pay bills soon and keep operating smoothly.",
    },
  ],
  "node-why-working-capital": [
    {
      id: "f2-w2-q1",
      prompt: "A company can be profitable but still:",
      choices: ["Run out of cash", "Never need cash"],
      correctIndex: 0,
      explainLikeIm5: "A company can make profit on paper but still run out of cash. That's why working capital matters.",
    },
    {
      id: "f2-w2-q2",
      type: "trueFalse",
      prompt: "Working capital affects a company's survival.",
      correctAnswer: true,
      explainLikeIm5: "Yes! Bad working capital creates cash stress. Good working capital means bills get paid and the business keeps running.",
    },
  ],
  "node-deferred-revenue": [
    {
      id: "f2-dr-q1",
      prompt: "Deferred revenue means:",
      choices: ["Work done, no payment", "Payment received, work not done"],
      correctIndex: 1,
      explainLikeIm5: "Deferred revenue is money you received before the work is done. Like paying for Netflix before watching.",
    },
    {
      id: "f2-dr-q2",
      prompt: "Deferred revenue is a:",
      choices: ["Asset", "Liability"],
      correctIndex: 1,
      explainLikeIm5: "Until the work is done, the company owes the service. So it's a liability.",
    },
    {
      id: "f2-dr-q3",
      type: "trueFalse",
      prompt: "Deferred revenue becomes revenue later.",
      correctAnswer: true,
      explainLikeIm5: "Yes! When you do the work, the liability goes down and revenue is recorded.",
    },
  ],
  "node-goodwill": [
    {
      id: "f2-g1-q1",
      prompt: "Goodwill happens when you pay:",
      choices: ["Less than book value", "More than book value"],
      correctIndex: 1,
      explainLikeIm5: "Goodwill is the extra value paid when you buy a company for more than its book value.",
    },
    {
      id: "f2-g1-q2",
      prompt: "Goodwill represents:",
      choices: ["Cash", "Intangible value"],
      correctIndex: 1,
      explainLikeIm5: "Goodwill represents things like brand, reputation, customers, and trust—not cash.",
    },
    {
      id: "f2-g1-q3",
      type: "trueFalse",
      prompt: "Goodwill appears only after a purchase.",
      correctAnswer: true,
      explainLikeIm5: "Yes! You only record goodwill when you acquire another company and pay more than book value.",
    },
  ],
  "node-goodwill-creation": [
    {
      id: "f2-g2-q1",
      prompt: "Goodwill is created during:",
      choices: ["Daily operations", "Acquisitions"],
      correctIndex: 1,
      explainLikeIm5: "Goodwill is created when one company buys another and pays more than book value.",
    },
    {
      id: "f2-g2-q2",
      type: "trueFalse",
      prompt: "Goodwill comes from future expectations.",
      correctAnswer: true,
      explainLikeIm5: "Yes! Buyers pay extra because they believe the company is worth more—strong brand, loyal customers, growth.",
    },
  ],
  "node-cash-vs-accrual": [
    {
      id: "f2-ca-q1",
      prompt: "Accrual accounting records revenue when:",
      choices: ["Cash arrives", "Work is done"],
      correctIndex: 1,
      explainLikeIm5: "Accrual accounting counts money when the work happens, not when cash moves.",
    },
    {
      id: "f2-ca-q2",
      type: "trueFalse",
      prompt: "Large companies usually use accrual accounting.",
      correctAnswer: true,
      explainLikeIm5: "Yes! Most companies use accrual because it shows the real picture of when work was done.",
    },
  ],
};

export const FLOOR2_NODE_IDS = Object.keys(FLOOR2_QUESTIONS) as string[];
