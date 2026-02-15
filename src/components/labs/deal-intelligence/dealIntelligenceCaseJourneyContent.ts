import type { JourneySection } from "./dealIntelligenceLevel1JourneyContent";

export const dealIntelligenceCaseSections: JourneySection[] = [
  {
    id: "dic-01-case-goal",
    label: "CASE — STEP 01",
    title: "Case Goal: Build a Small, Defensible Deal Set",
    body: [
      "In this case mode, you practice the real workflow: screen → verify → spread.",
      "You're trying to create a short list of deals you can defend in a meeting.",
      "The win condition is clarity: you know why each deal is in your table.",
    ],
    diagram: {
      kind: "flowCanvas",
      layout: "stack",
      nodes: [
        { id: "screen", title: "Screen", icon: "wave" },
        { id: "verify", title: "Verify", tone: "accent", icon: "stack" },
        { id: "spread", title: "Spread + Output", tone: "accent", icon: "bolt" },
      ],
      edges: [
        { from: "screen", to: "verify" },
        { from: "verify", to: "spread" },
      ],
      highlights: ["verify"],
    },
  },
  {
    id: "dic-02-where-deals-come-from",
    label: "CASE — STEP 02",
    title: "Where Your Deals Come From (3 Sources)",
    body: [
      "1) Your team's existing comps list (fastest starting point).",
      "2) A database screen to find more deals.",
      "3) Fairness opinions from relevant deals (they sometimes list great comps).",
    ],
    diagram: {
      kind: "splitSignal",
      left: {
        id: "sources",
        title: "Deal Sources",
        tone: "accent",
        icon: "stack",
      },
      branches: [
        { id: "team", title: "Team / Prior Work", icon: "dot" },
        { id: "db", title: "Database Screen", icon: "wave" },
        { id: "fo", title: "Fairness Opinions", icon: "bolt" },
      ],
    },
  },
  {
    id: "dic-03-verify-terms",
    label: "CASE — STEP 03",
    title: "Verify Deal Terms (Don't Trust Databases Blindly)",
    body: [
      "Databases are great for finding deals, but they can have mistakes.",
      "So you confirm the key terms and financials in actual documents.",
      "Think of it like: database = map, filings = the real street signs.",
    ],
    diagram: {
      kind: "flowCanvas",
      layout: "stack",
      nodes: [
        { id: "map", title: "Database (Map)", icon: "wave" },
        {
          id: "signs",
          title: "SEC Filings / Press Releases",
          tone: "accent",
          icon: "stack",
        },
        { id: "truth", title: "Confirmed Truth", tone: "accent", icon: "bolt" },
      ],
      edges: [
        { from: "map", to: "signs" },
        { from: "signs", to: "truth" },
      ],
      highlights: ["signs"],
    },
  },
  {
    id: "dic-04-spread-output",
    label: "CASE — STEP 04",
    title: "Your Output (The Deal Table Everyone Uses)",
    body: [
      "You end with a comps table: deals, dates, premiums, and multiples.",
      "Then you summarize with median/mean and a clean valuation range.",
      "This becomes a real 'what buyers paid' reality-check for your target.",
    ],
    diagram: {
      kind: "flowCanvas",
      layout: "stack",
      nodes: [
        { id: "table", title: "Deal Comps Table", tone: "accent", icon: "stack" },
        { id: "stats", title: "Median / Mean / Range", icon: "wave" },
        { id: "implied", title: "Implied Valuation", tone: "accent", icon: "bolt" },
      ],
      edges: [
        { from: "table", to: "stats" },
        { from: "stats", to: "implied" },
      ],
      highlights: ["implied"],
    },
  },
];
