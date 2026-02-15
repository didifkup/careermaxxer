import type { JourneyDiagram } from "@/components/labs/fsm/diagrams/types";

export type JourneySection = {
  id: string;
  label: string;
  title: string;
  body: string[];
  diagram?: JourneyDiagram;
};

export const marketSignalLevel1Sections: JourneySection[] = [
  {
    id: "ms-01-what-is-signal",
    label: "SECTION 01",
    title: "What a \"Market Signal\" Even Means",
    body: [
      "The stock market is basically a giant voting machine that updates every second.",
      "A 'market signal' is what the market is telling you through prices: what similar companies are worth right now.",
      "Trading comps is how bankers and analysts read that signal.",
    ],
    diagram: {
      kind: "flowCanvas",
      layout: "stack",
      nodes: [
        { id: "market", title: "Market Prices", tone: "accent", icon: "wave" },
        { id: "signal", title: "Signal", icon: "bolt" },
        { id: "yourco", title: "Your Company", tone: "accent", icon: "dot" },
      ],
      edges: [
        { from: "market", to: "signal" },
        { from: "signal", to: "yourco" },
      ],
      highlights: ["signal"],
    },
  },
  {
    id: "ms-02-relative-vs-dcf",
    label: "SECTION 02",
    title: "Trading Comps vs DCF (Simple Difference)",
    body: [
      "DCF asks: 'What is this company worth based on its future cash?'",
      "Trading comps asks: 'What are similar companies worth in the market right now?'",
      "In real banking, comps are a fast reality-check.",
    ],
    diagram: {
      kind: "splitSignal",
      left: {
        id: "value",
        title: "Two Ways to Value",
        tone: "accent",
        icon: "stack",
      },
      branches: [
        { id: "dcf", title: "DCF = Future Cash Story", icon: "wave" },
        { id: "comps", title: "Comps = Market Reality", icon: "bolt" },
      ],
    },
  },
  {
    id: "ms-03-equity-vs-ev",
    label: "SECTION 03",
    title: "Equity Value vs Enterprise Value (The Key Unlock)",
    body: [
      "Equity value is the value of just the stock (what shareholders own).",
      "Enterprise value is the value of the whole operating business (the company 'as a machine').",
      "You use EV when comparing companies with different debt levels.",
    ],
    diagram: {
      kind: "flowCanvas",
      layout: "stack",
      nodes: [
        {
          id: "ev",
          title: "Enterprise Value (Whole Business)",
          tone: "accent",
          icon: "stack",
        },
        { id: "bridge", title: "minus net debt →", icon: "wave" },
        { id: "eq", title: "Equity Value (Stock Only)", tone: "accent", icon: "dot" },
      ],
      edges: [
        { from: "ev", to: "bridge" },
        { from: "bridge", to: "eq" },
      ],
      highlights: ["ev", "eq"],
    },
  },
  {
    id: "ms-04-why-multiples-exist",
    label: "SECTION 04",
    title: "Why We Use Multiples (Not Just Prices)",
    body: [
      "Companies are different sizes, so comparing just 'price' is unfair.",
      "Multiples standardize value by dividing by a performance number (like EBITDA or earnings).",
      "It's like comparing phones by price per GB instead of just price.",
    ],
    diagram: {
      kind: "equationBar",
      tokens: [
        { text: "Value", tone: "accent" },
        { text: "Performance Metric", tone: "accent" },
        { text: "Multiple", tone: "accent" },
      ],
      operators: [" ÷ ", " = "],
    },
  },
  {
    id: "ms-05-common-multiples",
    label: "SECTION 05",
    title: "The 3 Multiples You'll See Everywhere",
    body: [
      "EV/EBITDA: super common when comparing operating performance.",
      "P/E: common for mature profitable companies (stock price vs earnings).",
      "EV/Revenue: used when profits are messy or negative (early/high growth).",
    ],
    diagram: {
      kind: "splitSignal",
      left: {
        id: "mult",
        title: "Most Used Multiples",
        tone: "accent",
        icon: "stack",
      },
      branches: [
        { id: "evEbitda", title: "EV / EBITDA", icon: "bolt" },
        { id: "pe", title: "P / E", icon: "wave" },
        { id: "evRev", title: "EV / Revenue", icon: "dot" },
      ],
    },
  },
  {
    id: "ms-06-process",
    label: "SECTION 06",
    title: "Trading Comps in 4 Moves",
    body: [
      "1) Pick a peer group (similar companies).",
      "2) Pull market data + key financials.",
      "3) Calculate multiples for each peer.",
      "4) Apply a typical multiple to your company to estimate value.",
    ],
    diagram: {
      kind: "flowCanvas",
      layout: "stack",
      nodes: [
        { id: "pick", title: "Pick Peers", icon: "dot" },
        { id: "pull", title: "Pull Data", icon: "wave" },
        { id: "calc", title: "Calc Multiples", icon: "bolt" },
        { id: "apply", title: "Apply to Target", tone: "accent", icon: "stack" },
      ],
      edges: [
        { from: "pick", to: "pull" },
        { from: "pull", to: "calc" },
        { from: "calc", to: "apply" },
      ],
      highlights: ["apply"],
    },
  },
  {
    id: "ms-07-pick-peers",
    label: "SECTION 07",
    title: "Picking Peers (You're Basically Triangulating)",
    body: [
      "Picking comps is not perfect. It's more like 'best match' hunting.",
      "You triangulate using: company filings, equity research, and data tools (like Bloomberg/CIQ).",
      "Your goal is companies that make money in a similar way.",
    ],
    diagram: {
      kind: "splitSignal",
      left: {
        id: "tri",
        title: "Triangulation",
        tone: "accent",
        icon: "wave",
      },
      branches: [
        { id: "filings", title: "Filings (10-K)", icon: "dot" },
        { id: "research", title: "Equity Research", icon: "bolt" },
        { id: "tools", title: "Data Tools", icon: "wave" },
      ],
    },
  },
  {
    id: "ms-08-shares-matter",
    label: "SECTION 08",
    title: "Shares Matter (The Pizza Slice Trap)",
    body: [
      "Market cap = share price × shares outstanding.",
      "If you mess up the share count, you mess up the whole valuation.",
      "That's why analysts focus on diluted shares (options/convertibles can add shares).",
    ],
    diagram: {
      kind: "equationBar",
      tokens: [
        { text: "Market Cap", tone: "accent" },
        { text: "Share Price", tone: "accent" },
        { text: "Diluted Shares", tone: "accent" },
      ],
      operators: [" = ", " × "],
    },
  },
  {
    id: "ms-09-net-debt",
    label: "SECTION 09",
    title: "Net Debt (The Bridge to Enterprise Value)",
    body: [
      "Enterprise value is basically: what the business is worth before deciding how it's financed.",
      "Net debt is: debt minus cash (and a few other items depending on the case).",
      "A simple mental model: EV = Market Cap + Net Debt.",
    ],
    diagram: {
      kind: "equationBar",
      tokens: [
        { text: "Enterprise Value", tone: "accent" },
        { text: "Market Cap", tone: "accent" },
        { text: "Net Debt", tone: "accent" },
      ],
      operators: [" = ", " + "],
    },
  },
  {
    id: "ms-10-clean-earnings",
    label: "SECTION 10",
    title: "Clean Earnings (Don't Let One-Time Stuff Lie to You)",
    body: [
      "Sometimes earnings include weird one-time things (lawsuit, restructuring, big gain).",
      "If you compare a 'messy' company to clean peers, your comps get distorted.",
      "So analysts often 'normalize' earnings to compare apples-to-apples.",
    ],
    diagram: {
      kind: "flowCanvas",
      layout: "stack",
      nodes: [
        { id: "gaap", title: "Reported (GAAP)", icon: "stack" },
        {
          id: "scrub",
          title: "Remove One-Time Noise",
          tone: "accent",
          icon: "bolt",
        },
        { id: "norm", title: "Normalized Metrics", tone: "accent", icon: "dot" },
      ],
      edges: [
        { from: "gaap", to: "scrub" },
        { from: "scrub", to: "norm" },
      ],
      highlights: ["norm"],
    },
  },
  {
    id: "ms-11-output",
    label: "SECTION 11",
    title: "What You Actually Deliver (The Table Everyone Stares At)",
    body: [
      "The output is a clean comps table: peers, key metrics, and multiples.",
      "Then you summarize with stats like median/mean and a 'range'.",
      "That range becomes an implied valuation for your company.",
    ],
    diagram: {
      kind: "flowCanvas",
      layout: "stack",
      nodes: [
        { id: "table", title: "Comps Table", tone: "accent", icon: "stack" },
        { id: "stats", title: "Median / Mean / Range", icon: "wave" },
        { id: "implied", title: "Implied Value", tone: "accent", icon: "dot" },
      ],
      edges: [
        { from: "table", to: "stats" },
        { from: "stats", to: "implied" },
      ],
      highlights: ["implied"],
    },
  },
];
