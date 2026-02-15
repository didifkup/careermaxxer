import type { JourneySection } from "./leverageEngineLevel1JourneyContent";

/**
 * Case mode = "Cocktail Napkin LBO"
 * Inspired by the manual's simple LBO intuition and the napkin workflow:
 * Offer → Sources & Uses → Exit assumptions → IRR
 */
export const leverageEngineCaseSections: JourneySection[] = [
  {
    id: "lec-01-case-goal",
    label: "CASE — STEP 01",
    title: "Case Goal: Build an LBO on a 'Napkin'",
    body: [
      "This case is the fastest LBO you can do without building a full model.",
      "You'll connect: purchase price, financing, exit value, and returns.",
      "If you can explain this cleanly, you can talk LBOs in interviews.",
    ],
    diagram: {
      kind: "flowCanvas",
      layout: "stack",
      nodes: [
        { id: "offer", title: "Offer / Price", icon: "dot" },
        { id: "fund", title: "Sources & Uses", tone: "accent", icon: "stack" },
        { id: "exit", title: "Exit Value", icon: "wave" },
        { id: "ret", title: "IRR + MOIC", tone: "accent", icon: "bolt" },
      ],
      edges: [
        { from: "offer", to: "fund" },
        { from: "fund", to: "exit" },
        { from: "exit", to: "ret" },
      ],
      highlights: ["ret"],
    },
  },
  {
    id: "lec-02-sources-uses",
    label: "CASE — STEP 02",
    title: "Sources & Uses (Where the Money Comes From)",
    body: [
      "'Uses' is what you need money for: buying equity + refinancing old debt + fees.",
      "'Sources' is where money comes from: new debt + equity + maybe existing cash.",
      "If sources don't equal uses, your deal math is broken.",
    ],
    diagram: {
      kind: "splitSignal",
      left: {
        id: "su",
        title: "Sources vs Uses",
        tone: "accent",
        icon: "stack",
      },
      branches: [
        { id: "uses", title: "Uses = needs cash", icon: "dot" },
        { id: "sources", title: "Sources = gets cash", icon: "bolt" },
      ],
    },
  },
  {
    id: "lec-03-exit-assumptions",
    label: "CASE — STEP 03",
    title: "Exit Assumptions (3 Things Decide the Exit Value)",
    body: [
      "Exit value is mostly driven by: exit EBITDA, exit multiple, and remaining net debt.",
      "Simple napkin version: assume EBITDA and the multiple stay the same.",
      "Then the biggest swing is: how much debt got paid down.",
    ],
    diagram: {
      kind: "flowCanvas",
      layout: "stack",
      nodes: [
        { id: "ebitda", title: "Exit EBITDA", icon: "wave" },
        { id: "mult", title: "Exit Multiple", icon: "dot" },
        { id: "ev", title: "Exit EV", tone: "accent", icon: "stack" },
        { id: "debt", title: "minus Debt", icon: "bolt" },
        { id: "eq", title: "Exit Equity", tone: "accent", icon: "dot" },
      ],
      edges: [
        { from: "ebitda", to: "mult" },
        { from: "mult", to: "ev" },
        { from: "ev", to: "debt" },
        { from: "debt", to: "eq" },
      ],
      highlights: ["eq"],
    },
  },
  {
    id: "lec-04-irr",
    label: "CASE — STEP 04",
    title: "Returns (Turn Entry Equity into Exit Equity)",
    body: [
      "You invest equity at the start.",
      "At exit, you get equity value back.",
      "MOIC is 'exit equity ÷ entry equity'. IRR depends on how many years passed.",
    ],
    diagram: {
      kind: "equationBar",
      tokens: [
        { text: "MOIC", tone: "accent" },
        { text: "Exit Equity", tone: "accent" },
        { text: "Entry Equity", tone: "accent" },
      ],
      operators: [" = ", " ÷ "],
    },
  },
];
