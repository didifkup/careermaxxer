import type { JourneyDiagram } from "./diagrams/types";

export type JourneySection = {
  id: string;
  label: string;
  title: string;
  body: string[];
  diagram?: JourneyDiagram;
};

export const fsmJourneySections: JourneySection[] = [
  {
    id: "01-machine",
    label: "SECTION 01",
    title: "The Business Is a Machine",
    body: [
      "Imagine a company is a machine. It sells things, pays bills, borrows money sometimes, and (hopefully) keeps some cash at the end of the day.",
      "Financial Statement Modeling is building a digital version of that machine in Excel so you can understand it and predict what it might do next.",
      "You're not memorizing finance. You're learning how money flows through a business.",
    ],
    diagram: {
      kind: "flowCanvas",
      layout: "stack",
      nodes: [
        { id: "inputs", title: "Inputs", subtitle: "Assumptions", icon: "dot" },
        { id: "machine", title: "Business Machine", tone: "accent", icon: "stack" },
        { id: "outputs", title: "Outputs", subtitle: "Profit, cash, balance", icon: "dot" },
      ],
    },
  },
  {
    id: "02-cameras",
    label: "SECTION 02",
    title: "The Three Cameras",
    body: [
      "There are three ways to look at the same company. Think of them as three cameras filming the same story from different angles.",
      "One camera shows profit, one camera shows cash, and one camera shows what the company owns and owes.",
    ],
    diagram: {
      kind: "flowCanvas",
      layout: "stack",
      nodes: [
        { id: "c1", title: "Income Statement", subtitle: "Profit", icon: "stack" },
        { id: "c2", title: "Cash Flow Statement", subtitle: "Cash", icon: "wave" },
        { id: "c3", title: "Balance Sheet", subtitle: "Snapshot", icon: "stack" },
      ],
    },
  },
  {
    id: "03-income",
    label: "SECTION 03",
    title: "Camera 1: Profit (Income Statement)",
    body: [
      "The Income Statement answers: \"Did we make money over this period?\"",
      "It starts with money coming in (Revenue) and subtracts different types of costs until you reach the final profit number (Net Income).",
      "Net Income is the 'final score' for profit.",
    ],
    diagram: {
      kind: "flowCanvas",
      layout: "stack",
      nodes: [
        { id: "rev", title: "Revenue", icon: "dot" },
        { id: "cogs", title: "COGS", subtitle: "Cost to make the product", icon: "bolt" },
        { id: "gp", title: "Gross Profit", icon: "dot" },
        { id: "opex", title: "Operating Expenses", icon: "bolt" },
        { id: "ebit", title: "Operating Income (EBIT)", icon: "dot" },
        { id: "inttax", title: "Interest + Taxes", icon: "bolt" },
        { id: "ni", title: "Net Income", tone: "accent", icon: "stack" },
      ],
      highlights: ["ni"],
    },
  },
  {
    id: "04-profit-not-cash",
    label: "SECTION 04",
    title: "Profit Is Not Cash",
    body: [
      "This is the biggest beginner mistake: profit is not the same thing as cash.",
      "A company can 'make' revenue but not collect the cash yet (like selling something and letting the customer pay later).",
      "So we need a second statement that tells the truth about cash.",
    ],
    diagram: {
      kind: "equationBar",
      tokens: [
        { text: "You sell today → Revenue ↑", tone: "good" },
        { text: "Customer pays later → Cash does NOT go up (yet)", tone: "warn" },
      ],
      operators: [" vs "],
    },
  },
  {
    id: "05-cash-flow",
    label: "SECTION 05",
    title: "Camera 2: Cash (Cash Flow Statement)",
    body: [
      "The Cash Flow Statement tracks where cash actually moved.",
      "It starts with Net Income, then fixes it by adding back non-cash items and adjusting for changes in working capital.",
      "At the end, it tells you how much cash increased or decreased.",
    ],
    diagram: {
      kind: "flowCanvas",
      layout: "stack",
      nodes: [
        { id: "ni", title: "Net Income", tone: "accent", icon: "stack" },
        { id: "noncash", title: "+ Non-cash expenses", subtitle: "e.g. Depreciation", icon: "wave" },
        { id: "wc", title: "± Working Capital changes", tone: "warn", icon: "bolt" },
        { id: "capex", title: "− Capex", subtitle: "Buying equipment", tone: "warn", icon: "bolt" },
        { id: "debt", title: "± Debt / Equity changes", icon: "stack" },
        { id: "change-cash", title: "= Change in Cash", tone: "accent", icon: "wave" },
      ],
      highlights: ["change-cash"],
    },
  },
  {
    id: "06-working-capital",
    label: "SECTION 06",
    title: "Working Capital: The Hidden Gears",
    body: [
      "Working capital is where beginners get confused, so here's the simple idea: it explains timing.",
      "If customers owe you money, you may have profit but you don't have the cash yet. If you owe suppliers, you may have costs but you haven't paid cash yet.",
      "These timing differences push cash up or down.",
    ],
    diagram: {
      kind: "equationBar",
      tokens: [
        { text: "Asset ↑", tone: "neutral" },
        { text: "Cash ↓", tone: "warn" },
        { text: "Liability ↑", tone: "neutral" },
        { text: "Cash ↑", tone: "good" },
      ],
      operators: [" → ", "  |  ", " → "],
    },
  },
  {
    id: "07-balance-sheet",
    label: "SECTION 07",
    title: "Camera 3: The Snapshot (Balance Sheet)",
    body: [
      "The Balance Sheet is a snapshot of the company at one point in time.",
      "It answers: \"What do we own, and how did we pay for it?\"",
      "There is one rule that can never break: Assets must equal Liabilities plus Equity.",
    ],
    diagram: {
      kind: "equationBar",
      tokens: [
        { text: "Assets", tone: "accent" },
        { text: "Liabilities", tone: "neutral" },
        { text: "Equity", tone: "neutral" },
      ],
      operators: [" = ", " + "],
    },
  },
  {
    id: "08-connection",
    label: "SECTION 08",
    title: "How the Statements Connect",
    body: [
      "The statements are not separate. They feed into each other like pipes.",
      "Net Income flows into Cash Flow. Cash Flow updates Ending Cash. Ending Cash sits on the Balance Sheet.",
      "Net Income also rolls into Retained Earnings (on the Balance Sheet).",
    ],
    diagram: {
      kind: "splitSignal",
      left: { id: "ni", title: "Net Income", tone: "accent", icon: "stack" },
      branches: [
        { id: "cfs", title: "Cash Flow Statement", subtitle: "→ Ending Cash", icon: "wave" },
        { id: "re", title: "Retained Earnings", subtitle: "Balance Sheet", icon: "stack" },
      ],
      bottom: { id: "bs", title: "Balance Sheet", subtitle: "Assets = L + E", tone: "accent", icon: "stack" },
      highlights: ["bs"],
    },
  },
  {
    id: "09-build-order",
    label: "SECTION 09",
    title: "The Build Order (How Bankers Build It)",
    body: [
      "In modeling, order matters. You build the past first, then forecast the future.",
      "Most models follow a simple build order so nothing breaks while you link the statements together.",
    ],
    diagram: {
      kind: "flowCanvas",
      layout: "stack",
      nodes: [
        { id: "1", title: "Input historicals", icon: "dot" },
        { id: "2", title: "Forecast Income Statement", icon: "stack" },
        { id: "3", title: "Forecast Balance Sheet", subtitle: "Working capital", icon: "stack" },
        { id: "4", title: "Build Cash Flow Statement", icon: "wave" },
        { id: "5", title: "Add schedules", subtitle: "PP&E, debt", icon: "bolt" },
        { id: "6", title: "Balance + check", tone: "accent", icon: "dot" },
      ],
      highlights: ["6"],
    },
  },
  {
    id: "10-revenue-engine",
    label: "SECTION 10",
    title: "Revenue Is the Engine",
    body: [
      "Revenue is the engine. If revenue changes, almost everything else changes.",
      "That's why analysts care so much about revenue assumptions.",
      "A simple forecast is growth rate. A more detailed forecast is price × volume or segment builds.",
    ],
    diagram: {
      kind: "flowCanvas",
      layout: "stack",
      nodes: [
        { id: "rev", title: "Revenue ↑", tone: "accent", icon: "dot" },
        { id: "costs", title: "Costs ↑", icon: "bolt" },
        { id: "profit", title: "Profit ↑", icon: "dot" },
        { id: "cash", title: "Cash changes", icon: "wave" },
        { id: "bs", title: "Balance Sheet changes", icon: "stack" },
      ],
    },
  },
  {
    id: "11-ppe-loop",
    label: "SECTION 11",
    title: "PP&E: The Equipment Loop",
    body: [
      "Companies buy equipment (Capex). That uses cash immediately.",
      "But the equipment gets expensed slowly over time (Depreciation).",
      "This creates a loop that connects all three statements.",
    ],
    diagram: {
      kind: "flowCanvas",
      layout: "stack",
      nodes: [
        { id: "begin", title: "Beginning PP&E", icon: "stack" },
        { id: "capex", title: "+ Capex", icon: "bolt" },
        { id: "dep", title: "− Depreciation", icon: "wave" },
        { id: "end", title: "= Ending PP&E", tone: "accent", icon: "stack" },
      ],
      highlights: ["end"],
    },
  },
  {
    id: "12-revolver",
    label: "SECTION 12",
    title: "The Revolver (When Cash Would Go Negative)",
    body: [
      "In real life, cash can't be negative. If the model would run out of cash, the company borrows from a revolver (like a credit line).",
      "If the company has extra cash, it pays the revolver down.",
      "This creates circular logic because interest depends on debt, and debt depends on cash.",
    ],
    diagram: {
      kind: "flowCanvas",
      layout: "stack",
      nodes: [
        { id: "debt", title: "Debt", tone: "accent", icon: "bolt" },
        { id: "interest", title: "Interest", icon: "wave" },
        { id: "ni", title: "Net Income", icon: "stack" },
        { id: "cash", title: "Cash", icon: "wave" },
        { id: "debt2", title: "Debt (loop)", tone: "accent", icon: "bolt" },
      ],
      edges: [
        { from: "cash", to: "debt2", variant: "dashed" },
      ],
    },
  },
  {
    id: "13-master-diagram",
    label: "SECTION 13",
    title: "The Full System (One Diagram)",
    body: [
      "Here's the full company machine in one picture.",
      "When this flows correctly and the Balance Sheet balances, your model is integrated.",
    ],
    diagram: {
      kind: "splitSignal",
      left: { id: "ni", title: "Net Income", tone: "accent", icon: "stack" },
      branches: [
        { id: "cfs", title: "Cash Flow", subtitle: "→ Ending Cash", icon: "wave" },
        { id: "re", title: "Retained Earnings", icon: "stack" },
      ],
      bottom: {
        id: "balance",
        title: "Assets = Liabilities + Equity",
        tone: "accent",
        icon: "stack",
      },
      highlights: ["balance"],
    },
  },
  {
    id: "14-what-you-built",
    label: "SECTION 14",
    title: "What You Just Built (In Real Banker Terms)",
    body: [
      "If your model is linked and balances, you built a 3-statement model.",
      "That's the base layer for DCF, LBO, and M&A models.",
      "In other words: you built the foundation of investment banking modeling.",
    ],
    diagram: {
      kind: "flowCanvas",
      layout: "stack",
      nodes: [
        { id: "model", title: "3-Statement Model", tone: "accent", icon: "stack" },
        { id: "dcf", title: "Powers DCF", icon: "dot" },
        { id: "ma", title: "Powers M&A", icon: "dot" },
        { id: "lbo", title: "Powers LBO", icon: "dot" },
      ],
    },
  },
  {
    id: "15-mental-model",
    label: "SECTION 15",
    title: "The One-Line Mental Model",
    body: [
      "If you remember only one thing, remember this flow:",
      "Income Statement tells the profit story. Cash Flow tells the cash truth. Balance Sheet proves it balances.",
      "That's Financial Statement Modeling.",
    ],
    diagram: {
      kind: "flowCanvas",
      layout: "wide",
      nodes: [
        { id: "profit", title: "Profit", subtitle: "Income Statement", icon: "stack" },
        { id: "cash", title: "Cash", subtitle: "Cash Flow", icon: "wave" },
        { id: "balance", title: "Balance", subtitle: "Balance Sheet", icon: "stack" },
      ],
    },
  },
];
