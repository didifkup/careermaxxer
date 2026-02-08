import type { Node } from "@/lib/curriculum";
import { FLOOR3_QUESTIONS } from "@/lib/floor3Questions";
import type { FloorSpec } from "./types";

const SALARY = 10_000;

export const floor3: FloorSpec = {
  floorNumber: 3,
  title: "Accounting – Calculations",
  nodes: [
    {
      id: "node-project-income-statement",
      floorNumber: 3,
      title: "Projecting the Income Statement",
      slug: "project-income-statement",
      salaryReward: SALARY,
      difficulty: "Easy",
      lesson: {
        headline: "Projecting the income statement means guessing the future using simple rules.",
        bullets: [
          "You usually: start with revenue, estimate expenses as percentages of revenue, subtract expenses from revenue, get profit.",
          "Think: Money in minus money out = profit.",
        ],
        analogy: "Money in – money out = profit.",
        recap: "Money in – money out = profit.",
      },
      questions: [],
    },
    {
      id: "node-project-d-and-a",
      floorNumber: 3,
      title: "Projecting Depreciation & Amortization",
      slug: "project-d-and-a",
      salaryReward: SALARY,
      difficulty: "Easy",
      lesson: {
        headline: "Depreciation and amortization spread costs over time.",
        bullets: [
          "Instead of expensing something all at once, you expense a little each year.",
          "Most models link depreciation to past capital spending and use a simple percentage or schedule. It's a non-cash expense but still important.",
        ],
        analogy: "It's a fake expense, but still important.",
        recap: "It's a non-cash expense, but still important.",
      },
      questions: [],
    },
    {
      id: "node-project-working-capital",
      floorNumber: 3,
      title: "Projecting Working Capital",
      slug: "project-working-capital",
      salaryReward: SALARY,
      difficulty: "Easy",
      lesson: {
        headline: "Working capital changes when timing changes.",
        bullets: [
          "If customers pay slower, cash is stuck. If suppliers are paid later, cash is saved.",
          "You project working capital by estimating changes and seeing if cash is tied up or freed. Working capital changes affect cash flow.",
        ],
        analogy: "Working capital changes affect cash flow.",
        recap: "Working capital changes affect cash flow.",
      },
      questions: [],
    },
    {
      id: "node-project-capex",
      floorNumber: 3,
      title: "Projecting Capital Expenditures (CapEx)",
      slug: "project-capex",
      salaryReward: SALARY,
      difficulty: "Easy",
      lesson: {
        headline: "Capital expenditures are big purchases.",
        bullets: [
          "Examples: machines, buildings, equipment. Companies usually project CapEx as a % of revenue or based on past spending.",
          "CapEx uses real cash.",
        ],
        analogy: "CapEx uses real cash.",
        recap: "CapEx uses real cash.",
      },
      questions: [],
    },
    {
      id: "node-project-deferred-taxes",
      floorNumber: 3,
      title: "Projecting Deferred Taxes",
      slug: "project-deferred-taxes",
      salaryReward: SALARY,
      difficulty: "Easy",
      lesson: {
        headline: "Deferred taxes come from timing differences.",
        bullets: [
          "Sometimes accounting profit and tax profit are different. When that happens, taxes are delayed and deferred taxes appear.",
          "They smooth taxes over time.",
        ],
        analogy: "They smooth taxes over time.",
        recap: "They smooth taxes over time.",
      },
      questions: [],
    },
    {
      id: "node-fcf",
      floorNumber: 3,
      title: "Free Cash Flow (FCF)",
      slug: "free-cash-flow",
      salaryReward: SALARY,
      difficulty: "Easy",
      lesson: {
        headline: "Free cash flow is the cash a company can actually use.",
        bullets: [
          "It starts with profit and then: adds back non-cash expenses, subtracts real spending, adjusts for working capital.",
          "Free cash flow is what investors care about.",
        ],
        analogy: "Free cash flow is what investors care about.",
        recap: "Free cash flow is what investors care about.",
      },
      questions: [],
    },
    {
      id: "node-unlevered-fcf",
      floorNumber: 3,
      title: "Unlevered Free Cash Flow",
      slug: "unlevered-fcf",
      salaryReward: SALARY,
      difficulty: "Easy",
      lesson: {
        headline: "Unlevered free cash flow ignores debt.",
        bullets: [
          "It shows cash available to everyone (debt and equity). This helps value the whole business.",
          "Think: Cash before paying lenders.",
        ],
        analogy: "Cash before paying lenders.",
        recap: "Cash before paying lenders.",
      },
      questions: [],
    },
    {
      id: "node-levered-fcf",
      floorNumber: 3,
      title: "Levered Free Cash Flow",
      slug: "levered-fcf",
      salaryReward: SALARY,
      difficulty: "Easy",
      lesson: {
        headline: "Levered free cash flow comes after debt.",
        bullets: [
          "It shows cash left for equity owners only. Interest and debt payments are removed first.",
          "Think: What owners actually get.",
        ],
        analogy: "What owners actually get.",
        recap: "What owners actually get.",
      },
      questions: [],
    },
  ] as Node[],
  questions: FLOOR3_QUESTIONS,
  completion: {
    lastNodeId: "node-levered-fcf",
    message: "You can now build the numbers behind a company.",
    nextFloor: "Floor 4: Enterprise Value & Equity Value",
  },
};
