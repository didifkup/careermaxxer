import type { JourneyDiagram } from "@/components/labs/fsm/diagrams/types";
import type { JourneySection } from "./dcfLevel1JourneyContent";

export const dcfLevel2Sections: JourneySection[] = [
  {
    id: "l2-01-assumptions",
    label: "LEVEL 2 — SECTION 01",
    title: "DCF Is Mostly Assumptions",
    body: [
      "A DCF looks like math, but it's really assumptions wearing a math costume.",
      "Growth, margins, WACC, and terminal value choices matter more than any spreadsheet formatting.",
      "A great analyst can explain assumptions clearly. A weak analyst hides behind formulas.",
    ],
    diagram: {
      kind: "flowCanvas",
      layout: "stack",
      nodes: [
        { id: "assume", title: "Assumptions", tone: "accent", icon: "bolt" },
        { id: "model", title: "DCF Math", icon: "wave" },
        { id: "output", title: "Valuation Output", tone: "accent", icon: "dot" },
      ],
      highlights: ["output"],
    },
  },
  {
    id: "l2-02-wacc-sensitivity",
    label: "LEVEL 2 — SECTION 02",
    title: "Small WACC Changes Can Move Value A Lot",
    body: [
      "DCF is sensitive. That means small input changes can create big output changes.",
      "If WACC moves a little higher, present values drop — sometimes a lot.",
      "This is why bankers always show a range, not one 'perfect' number.",
    ],
    diagram: {
      kind: "splitSignal",
      left: { id: "wacc", title: "WACC Shift", tone: "accent", icon: "wave" },
      branches: [
        { id: "low", title: "Lower WACC → Higher Value", tone: "good" },
        { id: "high", title: "Higher WACC → Lower Value", tone: "warn" },
      ],
    },
  },
  {
    id: "l2-03-terminal-dominates",
    label: "LEVEL 2 — SECTION 03",
    title: "Terminal Value Often Dominates the DCF",
    body: [
      "In many DCFs, terminal value is most of the total value.",
      "That means your 'forever' assumption can matter more than your detailed year-by-year forecast.",
      "So bankers sanity-check terminal assumptions carefully.",
    ],
    diagram: {
      kind: "splitSignal",
      left: { id: "sources", title: "EV Components", tone: "accent", icon: "dot" },
      branches: [
        { id: "forecast", title: "Forecast Years (Often Smaller)" },
        { id: "tv", title: "Terminal Value (Often Bigger)", tone: "accent", icon: "dot" },
      ],
      bottom: { id: "ev", title: "Enterprise Value", tone: "accent" },
      highlights: ["tv", "ev"],
    },
  },
  {
    id: "l2-04-exit-vs-perp",
    label: "LEVEL 2 — SECTION 04",
    title: "Exit Multiple Is the 'Market Anchor'",
    body: [
      "Perpetuity growth is clean in theory.",
      "Exit multiples feel real in practice because deals and markets often talk in multiples.",
      "Many bankers use both: one as the main method, the other as a sanity check.",
    ],
    diagram: {
      kind: "splitSignal",
      left: { id: "tv", title: "Terminal Value", tone: "accent" },
      branches: [
        { id: "perp", title: "Perpetuity Growth (Theory)" },
        { id: "exit", title: "Exit Multiple (Market)", tone: "accent" },
      ],
    },
  },
  {
    id: "l2-05-interview-what-tested",
    label: "LEVEL 2 — SECTION 05",
    title: "In Interviews, They're Testing Understanding",
    body: [
      "Interviewers usually don't care if you memorized a perfect formula.",
      "They care if you can explain the story: cash flows, discounting, and EV vs equity.",
      "If you can explain the flow clearly, you sound like someone who actually understands valuation.",
    ],
    diagram: {
      kind: "flowCanvas",
      layout: "stack",
      nodes: [
        { id: "cash", title: "Explain Cash Flows", icon: "stack" },
        { id: "disc", title: "Explain Discounting", icon: "wave" },
        { id: "bridge", title: "Explain EV vs Equity", icon: "bolt" },
        { id: "win", title: "Strong DCF Answer", tone: "accent", icon: "dot" },
      ],
      highlights: ["win"],
    },
  },
  {
    id: "l2-06-when-dcf-weak",
    label: "LEVEL 2 — SECTION 06",
    title: "When DCF Gets Weak",
    body: [
      "DCF works best when the business is stable and you can predict cash reasonably well.",
      "DCF gets weaker when cash flows swing wildly, the business is early-stage, or terminal assumptions are basically guesses.",
      "In those cases, comps and common sense matter more.",
    ],
    diagram: {
      kind: "splitSignal",
      left: { id: "dcf", title: "DCF Reliability", tone: "accent" },
      branches: [
        { id: "stable", title: "Stable Cash → Stronger DCF", tone: "good" },
        { id: "wild", title: "Unstable Cash → Weaker DCF", tone: "warn" },
      ],
    },
  },
  {
    id: "l2-07-pe-diff",
    label: "LEVEL 2 — SECTION 07",
    title: "How PE Thinks Differently",
    body: [
      "Investment banking often uses DCF to estimate value today.",
      "Private equity cares a lot about: what return do we earn when we sell later?",
      "So PE focuses heavily on exit multiple and IRR thinking.",
    ],
    diagram: {
      kind: "flowCanvas",
      layout: "stack",
      nodes: [
        { id: "buy", title: "Buy Price" },
        { id: "ops", title: "Cash Flows During Hold", icon: "stack" },
        { id: "exit", title: "Exit Multiple / Sale Price", icon: "wave" },
        { id: "irr", title: "IRR (Return)", tone: "accent", icon: "dot" },
      ],
      highlights: ["irr"],
    },
  },
  {
    id: "l2-08-final",
    label: "LEVEL 2 — SECTION 08",
    title: "DCF Is a Thinking Tool, Not a Truth Machine",
    body: [
      "DCF isn't a magic truth machine. It's a thinking tool.",
      "It forces you to be clear about growth, profitability, reinvestment, and risk.",
      "If you can explain those clearly, you understand DCF the way bankers actually use it.",
    ],
    diagram: {
      kind: "flowCanvas",
      layout: "stack",
      nodes: [
        { id: "growth", title: "Growth" },
        { id: "margins", title: "Margins" },
        { id: "reinvest", title: "Reinvestment" },
        { id: "risk", title: "Risk (WACC)" },
        { id: "insight", title: "Valuation Insight", tone: "accent", icon: "dot" },
      ],
      highlights: ["insight"],
    },
  },
];
