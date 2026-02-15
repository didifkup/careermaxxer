import type { JourneyDiagram } from "@/components/labs/fsm/diagrams/types";

export type JourneySection = {
  id: string;
  label: string;
  title: string;
  body: string[];
  diagram?: JourneyDiagram;
};

export const dealIntelligenceLevel1Sections: JourneySection[] = [
  {
    id: "di-01-what-it-is",
    label: "SECTION 01",
    title: "What Transaction Comps Actually Are",
    body: [
      "Transaction comps means: look at REAL past deals and see what buyers paid.",
      "It's like checking house sale prices in your neighborhood — except for companies.",
      "This is one of the fastest ways bankers sanity-check a valuation.",
    ],
    diagram: {
      kind: "flowCanvas",
      layout: "stack",
      nodes: [
        { id: "past", title: "Past Deals", tone: "accent", icon: "stack" },
        { id: "paid", title: "What Buyers Paid", icon: "bolt" },
        { id: "today", title: "Value Today", tone: "accent", icon: "dot" },
      ],
      edges: [
        { from: "past", to: "paid" },
        { from: "paid", to: "today" },
      ],
      highlights: ["paid"],
    },
  },
  {
    id: "di-02-why-different-from-trading-comps",
    label: "SECTION 02",
    title: "Why Deals Look More Expensive Than Trading Comps",
    body: [
      "Trading comps = what the market is paying for minority shares right now.",
      "Transaction comps = what someone paid to take CONTROL.",
      "Control usually costs extra, so deal multiples often come with a premium.",
    ],
    diagram: {
      kind: "splitSignal",
      left: {
        id: "comp",
        title: "Two 'Comps'",
        tone: "accent",
        icon: "wave",
      },
      branches: [
        { id: "trade", title: "Trading = No Control", icon: "dot" },
        { id: "deal", title: "Deal = Control (Premium)", icon: "bolt" },
      ],
    },
  },
  {
    id: "di-03-transaction-value",
    label: "SECTION 03",
    title: "Transaction Value (The Whole-Business Price Tag)",
    body: [
      "In deal comps, we usually care about the price for the WHOLE business.",
      "That whole-business price is basically enterprise value in an M&A context.",
      "You compare transaction value to target metrics like Revenue or EBITDA.",
    ],
    diagram: {
      kind: "equationBar",
      tokens: [
        { text: "Transaction Value", tone: "accent" },
        { text: "Target EBITDA / Revenue", tone: "accent" },
        { text: "Deal Multiple", tone: "accent" },
      ],
      operators: [" ÷ ", " = "],
    },
  },
  {
    id: "di-04-common-deal-multiples",
    label: "SECTION 04",
    title: "The 4 Deal Multiples You'll See Everywhere",
    body: [
      "TV / EBITDA: the classic 'deal price vs operating profit' view.",
      "TV / Revenue: used when EBITDA is messy or not disclosed.",
      "TV / EBIT: useful when D&A differences matter a lot.",
      "Offer price / EPS (or Offer value / Net income): equity-focused deal multiple.",
    ],
    diagram: {
      kind: "splitSignal",
      left: {
        id: "tv",
        title: "Transaction Value (TV)",
        tone: "accent",
        icon: "stack",
      },
      branches: [
        { id: "ebitda", title: "TV / EBITDA", icon: "bolt" },
        { id: "rev", title: "TV / Revenue", icon: "wave" },
        { id: "ebit", title: "TV / EBIT", icon: "dot" },
        { id: "pe", title: "Offer / EPS", icon: "wave" },
      ],
    },
  },
  {
    id: "di-05-premium",
    label: "SECTION 05",
    title: "Premium Paid (The 'Control Tax')",
    body: [
      "Premium paid is how much higher the offer is compared to the target's pre-deal stock price.",
      "It answers: 'How much extra did the buyer pay to win?'",
      "Premiums move with the M&A environment and how competitive the process is.",
    ],
    diagram: {
      kind: "equationBar",
      tokens: [
        { text: "Premium", tone: "accent" },
        { text: "Offer − Unaffected", tone: "accent" },
        { text: "Unaffected", tone: "accent" },
      ],
      operators: [" = ", " ÷ "],
    },
  },
  {
    id: "di-06-synergies",
    label: "SECTION 06",
    title: "Synergies (Why Strategics Can Pay More)",
    body: [
      "Synergies are 'extra value' a buyer thinks they can create after the deal.",
      "Example: combining teams, cutting duplicate costs, or selling to each other's customers.",
      "If synergies are big, a strategic buyer can justify a higher premium.",
    ],
    diagram: {
      kind: "splitSignal",
      left: {
        id: "buy",
        title: "Buyer Types",
        tone: "accent",
        icon: "stack",
      },
      branches: [
        { id: "strategic", title: "Strategic: synergy upside", icon: "bolt" },
        { id: "financial", title: "Financial: returns discipline", icon: "dot" },
      ],
    },
  },
  {
    id: "di-07-the-3-step-method",
    label: "SECTION 07",
    title: "Transaction Comps in 3 Steps",
    body: [
      "1) Find comparable deals (same vibe, same industry, similar size).",
      "2) Calculate deal multiples + premium for each deal.",
      "3) Use the median/mean range to imply a value for your target.",
    ],
    diagram: {
      kind: "flowCanvas",
      layout: "stack",
      nodes: [
        { id: "find", title: "Find Deals", icon: "dot" },
        { id: "calc", title: "Calc Multiples", icon: "wave" },
        { id: "apply", title: "Implied Value Range", tone: "accent", icon: "bolt" },
      ],
      edges: [
        { from: "find", to: "calc" },
        { from: "calc", to: "apply" },
      ],
      highlights: ["apply"],
    },
  },
  {
    id: "di-08-garbage-in",
    label: "SECTION 08",
    title: "The #1 Rule: Garbage Data = Garbage Result",
    body: [
      "Transaction comps only work if the deals are actually comparable.",
      "If you grab random deals that 'sort of' match, your output becomes fake confidence.",
      "So the real skill is deal selection + cleaning the inputs.",
    ],
    diagram: {
      kind: "flowCanvas",
      layout: "stack",
      nodes: [
        { id: "bad", title: "Random Deals", icon: "dot" },
        { id: "noise", title: "Noisy Multiples", icon: "wave" },
        { id: "wrong", title: "Wrong Conclusion", tone: "accent", icon: "bolt" },
      ],
      edges: [
        { from: "bad", to: "noise" },
        { from: "noise", to: "wrong" },
      ],
      highlights: ["wrong"],
    },
  },
  {
    id: "di-09-finding-deals",
    label: "SECTION 09",
    title: "Where You Find Deals (Real Banker Workflow)",
    body: [
      "Start with: prior comps lists, your team's past work, and databases (CIQ / FactSet / Bloomberg).",
      "Then VERIFY deal terms using real source documents (press releases + SEC filings).",
      "The database helps you screen. The filings confirm the truth.",
    ],
    diagram: {
      kind: "flowCanvas",
      layout: "stack",
      nodes: [
        { id: "db", title: "Database Screen", icon: "wave" },
        { id: "docs", title: "Source Docs", tone: "accent", icon: "stack" },
        { id: "final", title: "Final Deal Set", tone: "accent", icon: "bolt" },
      ],
      edges: [
        { from: "db", to: "docs" },
        { from: "docs", to: "final" },
      ],
      highlights: ["docs"],
    },
  },
  {
    id: "di-10-what-docs",
    label: "SECTION 10",
    title: "The 3 Documents You Keep Opening",
    body: [
      "Announcement press release: quick terms, sometimes synergy talk.",
      "8-K: official filing around the announcement or closing.",
      "Proxy / S-4 / tender docs: deep details, fairness opinion, premium analysis, capitalization.",
    ],
    diagram: {
      kind: "splitSignal",
      left: {
        id: "docs",
        title: "Source Documents",
        tone: "accent",
        icon: "stack",
      },
      branches: [
        { id: "pr", title: "Press Release", icon: "dot" },
        { id: "8k", title: "8-K", icon: "wave" },
        { id: "proxy", title: "Proxy / S-4 / Tender", icon: "bolt" },
      ],
    },
  },
];
