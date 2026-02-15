import type { JourneyDiagram } from "@/components/labs/fsm/diagrams/types";

export type JourneySection = {
  id: string;
  label: string;
  title: string;
  body: string[];
  diagram?: JourneyDiagram;
};

export const leverageEngineLevel1Sections: JourneySection[] = [
  {
    id: "le-01-what-is-lbo",
    label: "SECTION 01",
    title: "What an LBO Is (In One Sentence)",
    body: [
      "An LBO is buying a company using a lot of borrowed money (debt) plus some investor money (equity).",
      "Debt is the heavy backpack. Equity is your own cash.",
      "If the company survives and pays down debt, the equity can grow really fast.",
    ],
    diagram: {
      kind: "flowCanvas",
      layout: "stack",
      nodes: [
        { id: "debt", title: "Mostly Debt", icon: "bolt" },
        { id: "buy", title: "Buy Company", tone: "accent", icon: "stack" },
        { id: "eq", title: "Some Equity", icon: "dot" },
      ],
      edges: [
        { from: "debt", to: "buy" },
        { from: "buy", to: "eq" },
      ],
      highlights: ["buy"],
    },
  },
  {
    id: "le-02-house-analogy",
    label: "SECTION 02",
    title: "The House + Mortgage Mental Model",
    body: [
      "If you buy a house with a mortgage, you've basically done an LBO idea.",
      "You put down a small amount (equity) and borrow the rest (debt).",
      "If the house value rises AND the mortgage gets paid down, your equity explodes.",
    ],
    diagram: {
      kind: "splitSignal",
      left: {
        id: "house",
        title: "House Analogy",
        tone: "accent",
        icon: "wave",
      },
      branches: [
        { id: "down", title: "Down Payment = Equity", icon: "dot" },
        { id: "mort", title: "Mortgage = Debt", icon: "bolt" },
      ],
    },
  },
  {
    id: "le-03-why-leverage-boosts-returns",
    label: "SECTION 03",
    title: "Why Leverage Boosts Returns",
    body: [
      "Equity is the leftover value after debt gets paid back.",
      "When debt shrinks, the leftover slice (equity) gets bigger — even if the company value stays flat.",
      "That's the core engine: debt paydown turns time into equity growth.",
    ],
    diagram: {
      kind: "flowCanvas",
      layout: "stack",
      nodes: [
        { id: "ev", title: "Company Value (EV)", tone: "accent", icon: "stack" },
        { id: "minus", title: "minus Debt", icon: "wave" },
        { id: "equity", title: "Equity Value", tone: "accent", icon: "dot" },
      ],
      edges: [
        { from: "ev", to: "minus" },
        { from: "minus", to: "equity" },
      ],
      highlights: ["equity"],
    },
  },
  {
    id: "le-04-4-drivers",
    label: "SECTION 04",
    title: "The 4 Return Drivers (Banker Cheat Code)",
    body: [
      "Most LBO returns come from four simple levers.",
      "1) Buy at a good price. 2) Use cheaper debt. 3) Grow EBITDA. 4) Exit at a good multiple.",
      "Analysts talk about these because they explain almost every LBO outcome.",
    ],
    diagram: {
      kind: "flowCanvas",
      layout: "stack",
      nodes: [
        { id: "price", title: "Entry Price", icon: "dot" },
        { id: "debt", title: "Cost of Debt", icon: "wave" },
        { id: "ebitda", title: "EBITDA Growth", icon: "bolt" },
        { id: "exit", title: "Exit Multiple", tone: "accent", icon: "stack" },
      ],
      edges: [
        { from: "price", to: "debt" },
        { from: "debt", to: "ebitda" },
        { from: "ebitda", to: "exit" },
      ],
      highlights: ["exit"],
    },
  },
  {
    id: "le-05-what-makes-good-lbo",
    label: "SECTION 05",
    title: "What Makes a 'Good' LBO Target",
    body: [
      "A good LBO target usually has steady cash flow (so it can pay debt).",
      "It doesn't need insane spending every year (capex + working capital stay reasonable).",
      "And it has room to improve operations — or at least not collapse.",
    ],
    diagram: {
      kind: "splitSignal",
      left: {
        id: "target",
        title: "Good LBO Target",
        tone: "accent",
        icon: "stack",
      },
      branches: [
        { id: "steady", title: "Steady Cash Flow", icon: "wave" },
        { id: "lowcapex", title: "Low Heavy Spending", icon: "dot" },
        { id: "upside", title: "Operational Upside", icon: "bolt" },
      ],
    },
  },
  {
    id: "le-06-entry-to-exit",
    label: "SECTION 06",
    title: "The LBO Timeline (Entry → 3–5 Years → Exit)",
    body: [
      "At entry: you buy the company and load it with debt.",
      "During ownership: cash pays interest and pays down debt, and the business tries to improve.",
      "At exit: you sell the company, repay remaining debt, and whatever is left is the equity payout.",
    ],
    diagram: {
      kind: "flowCanvas",
      layout: "stack",
      nodes: [
        { id: "entry", title: "Entry (Buy)", icon: "dot" },
        { id: "hold", title: "Hold (Pay Down Debt)", icon: "wave" },
        { id: "exit", title: "Exit (Sell)", tone: "accent", icon: "bolt" },
        { id: "payout", title: "Equity Payout", tone: "accent", icon: "stack" },
      ],
      edges: [
        { from: "entry", to: "hold" },
        { from: "hold", to: "exit" },
        { from: "exit", to: "payout" },
      ],
      highlights: ["payout"],
    },
  },
  {
    id: "le-07-returns-metrics",
    label: "SECTION 07",
    title: "Returns: IRR vs MOIC (2 Numbers Everyone Uses)",
    body: [
      "MOIC is 'how many times your money' (like 2.0x, 3.0x).",
      "IRR is the speed of the return (faster money back = higher IRR).",
      "Same MOIC can have different IRR depending on how long it takes.",
    ],
    diagram: {
      kind: "splitSignal",
      left: {
        id: "ret",
        title: "Return Metrics",
        tone: "accent",
        icon: "wave",
      },
      branches: [
        { id: "moic", title: "MOIC = Multiple", icon: "dot" },
        { id: "irr", title: "IRR = Speed", icon: "bolt" },
      ],
    },
  },
];
