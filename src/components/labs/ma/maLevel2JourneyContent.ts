import type { JourneySection } from "./maLevel1JourneyContent";
import type { JourneyDiagram } from "@/components/labs/fsm/diagrams/types";

export const maLevel2Sections: JourneySection[] = [
  {
    id: "l2-01-what-bankers-care",
    label: "LEVEL 2 — SECTION 01",
    title: "What Bankers Actually Care About",
    body: [
      "In real deals, bankers care about 3 things: price, structure, and story.",
      "Price: what are we paying and is it defensible?",
      "Structure: cash vs stock vs debt — and what does that do to EPS and risk?",
    ],
    diagram: {
      kind: "flowCanvas",
      layout: "stack",
      nodes: [
        { id: "price", title: "Price", tone: "accent" },
        { id: "structure", title: "Structure", tone: "accent" },
        { id: "story", title: "Story", tone: "accent" },
        { id: "decision", title: "Deal Decision", tone: "accent", icon: "dot" },
      ],
      edges: [
        { from: "price", to: "structure" },
        { from: "structure", to: "story" },
        { from: "story", to: "decision" },
      ],
      highlights: ["decision"],
    },
  },
  {
    id: "l2-02-accretion-is-not-everything",
    label: "LEVEL 2 — SECTION 02",
    title: "Accretion Isn't Everything (But It Matters)",
    body: [
      "A deal can be dilutive in Year 1 and still be a great strategic move.",
      "But markets often react to near-term EPS, so bankers still model it carefully.",
      "That's why you'll see Year 1, Year 2, and steady-state thinking.",
    ],
    diagram: {
      kind: "splitSignal",
      left: {
        id: "eps",
        title: "EPS Impact Over Time",
        tone: "accent",
        icon: "wave",
      },
      branches: [
        { id: "y1", title: "Year 1: Fees + Integration", tone: "warn" },
        { id: "y2", title: "Year 2+: Synergies Show Up", tone: "good" },
      ],
    },
  },
  {
    id: "l2-03-biggest-levers",
    label: "LEVEL 2 — SECTION 03",
    title: "The 4 Biggest Levers in Most M&A Models",
    body: [
      "Most of the result comes from a few knobs.",
      "The biggest levers are: purchase price, mix (cash/stock), synergies, and interest rate.",
      "If you can explain these, you can explain 80% of the model.",
    ],
    diagram: {
      kind: "flowCanvas",
      layout: "stack",
      nodes: [
        { id: "pp", title: "Purchase Price" },
        { id: "mix", title: "Cash/Stock Mix" },
        { id: "syn", title: "Synergies" },
        { id: "rate", title: "Interest Rate" },
        { id: "eps", title: "EPS Outcome", tone: "accent", icon: "dot" },
      ],
      edges: [
        { from: "pp", to: "mix" },
        { from: "mix", to: "syn" },
        { from: "syn", to: "rate" },
        { from: "rate", to: "eps" },
      ],
      highlights: ["eps"],
    },
  },
  {
    id: "l2-04-cash-vs-stock-tradeoff",
    label: "LEVEL 2 — SECTION 04",
    title: "Cash vs Stock: The Tradeoff",
    body: [
      "Cash (often debt-funded) can boost EPS if interest is low, but increases leverage and risk.",
      "Stock avoids interest, but increases share count, which can dilute EPS.",
      "Bankers test different mixes to find a sweet spot.",
    ],
    diagram: {
      kind: "splitSignal",
      left: {
        id: "mix",
        title: "Consideration Mix",
        tone: "accent",
        icon: "stack",
      },
      branches: [
        {
          id: "cash",
          title: "More Cash → More Interest + More Risk",
          tone: "warn",
        },
        {
          id: "stock",
          title: "More Stock → More Shares + Dilution Risk",
          tone: "warn",
        },
      ],
    },
  },
  {
    id: "l2-05-ppa-is-quiet-killer",
    label: "LEVEL 2 — SECTION 05",
    title: "PPA Can Quietly Hurt EPS",
    body: [
      "Purchase price allocation (PPA) can create extra depreciation and amortization.",
      "That extra D&A can reduce GAAP earnings and EPS.",
      "This is why 'write-ups' matter in real M&A models.",
    ],
    diagram: {
      kind: "flowCanvas",
      layout: "stack",
      nodes: [
        { id: "writeup", title: "Asset Write-Ups", tone: "warn" },
        { id: "da", title: "Higher D&A", tone: "warn", icon: "wave" },
        { id: "eps", title: "Lower GAAP EPS", tone: "accent", icon: "dot" },
      ],
      edges: [
        { from: "writeup", to: "da" },
        { from: "da", to: "eps" },
      ],
      highlights: ["eps"],
    },
  },
  {
    id: "l2-06-interview-answers",
    label: "LEVEL 2 — SECTION 06",
    title: "Interview-Grade Explanation (Simple)",
    body: [
      "If you can explain this clearly, you're strong:",
      "We build pro forma net income by adding the companies and adjusting for financing, synergies, fees, and accounting.",
      "Then we divide by pro forma shares and compare EPS to judge accretion/dilution.",
    ],
    diagram: {
      kind: "flowCanvas",
      layout: "stack",
      nodes: [
        { id: "add", title: "Add Earnings", icon: "stack" },
        {
          id: "adj",
          title: "Adjust (Financing/Synergies/Fees/PPA)",
          tone: "accent",
          icon: "bolt",
        },
        { id: "divide", title: "Divide by Shares", icon: "wave" },
        { id: "compare", title: "Compare EPS", tone: "accent", icon: "dot" },
      ],
      edges: [
        { from: "add", to: "adj" },
        { from: "adj", to: "divide" },
        { from: "divide", to: "compare" },
      ],
      highlights: ["compare"],
    },
  },
  {
    id: "l2-07-sensitivities-are-the-product",
    label: "LEVEL 2 — SECTION 07",
    title: "In Real Life, Sensitivities Are the Product",
    body: [
      "The 'answer' is rarely one number.",
      "Decision-makers want to see: if price goes up, if synergies are lower, if rates rise — what happens?",
      "That's why bankers build fast sensitivity tables and scenarios.",
    ],
    diagram: {
      kind: "flowCanvas",
      layout: "stack",
      nodes: [
        { id: "scenario", title: "Scenario Grid", icon: "wave" },
        { id: "range", title: "Outcome Range", tone: "accent", icon: "dot" },
      ],
      edges: [{ from: "scenario", to: "range" }],
      highlights: ["range"],
    },
  },
];
