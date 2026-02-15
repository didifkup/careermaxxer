import type { JourneyDiagram } from "@/components/labs/fsm/diagrams/types";

export type JourneySection = {
  id: string;
  label: string;
  title: string;
  body: string[];
  diagram?: JourneyDiagram;
};

export const dcfLevel1Sections: JourneySection[] = [
  {
    id: "01-valuation-future-to-today",
    label: "SECTION 01",
    title: "Valuation = Future Cash, Brought to Today",
    body: [
      "Imagine you're buying a lemonade stand. You don't just care what it did last year. You care what it will do in the future.",
      "A DCF model asks: if this business gives me cash in the future, what is that future cash worth today?",
      "DCF stands for Discounted Cash Flow — future cash, translated into today's dollars.",
    ],
    diagram: {
      kind: "flowCanvas",
      layout: "stack",
      nodes: [
        { id: "future", title: "Future Cash Flows", tone: "accent", icon: "stack" },
        { id: "rate", title: "Discount Rate", icon: "wave" },
        { id: "pv", title: "Present Value (Today)", tone: "accent", icon: "dot" },
      ],
      edges: [
        { from: "future", to: "rate" },
        { from: "rate", to: "pv" },
      ],
      highlights: ["pv"],
    },
  },
  {
    id: "02-two-ways",
    label: "SECTION 02",
    title: "Two Common Ways to Value a Company",
    body: [
      "There are two popular ways to estimate value.",
      "One way is to look at what similar companies trade for (Comps).",
      "The other way is to forecast cash and discount it back (DCF).",
    ],
    diagram: {
      kind: "splitSignal",
      left: { id: "root", title: "Estimate Value", tone: "accent", icon: "stack" },
      branches: [
        { id: "comps", title: "Comps (Market Prices)", icon: "wave" },
        { id: "dcf", title: "DCF (Future Cash)", icon: "bolt" },
      ],
    },
  },
  {
    id: "03-ev-vs-equity",
    label: "SECTION 03",
    title: "Enterprise Value vs Equity Value",
    body: [
      "Enterprise Value is the value of the whole business (like buying the entire lemonade stand).",
      "Equity Value is the part that belongs to shareholders after debts are handled.",
      "A simple way to remember it: Equity Value is what's left after net debt.",
    ],
    diagram: {
      kind: "equationBar",
      tokens: [
        { text: "Enterprise Value", tone: "accent" },
        { text: "Net Debt" },
        { text: "Equity Value", tone: "accent" },
      ],
      operators: [" − ", " = "],
    },
  },
  {
    id: "04-what-dcf-adds",
    label: "SECTION 04",
    title: "What a DCF Adds Up",
    body: [
      "A DCF usually has two big parts.",
      "Part 1: the present value of the cash you forecast for the next few years.",
      "Part 2: the present value of the value after that (Terminal Value).",
    ],
    diagram: {
      kind: "splitSignal",
      left: { id: "sources", title: "DCF Parts", tone: "accent", icon: "stack" },
      branches: [
        { id: "pv-forecast", title: "PV of Forecast Cash", tone: "accent" },
        { id: "pv-tv", title: "PV of Terminal Value" },
      ],
      bottom: { id: "ev", title: "Enterprise Value", tone: "accent", icon: "dot" },
      highlights: ["ev"],
    },
  },
  {
    id: "05-two-stage",
    label: "SECTION 05",
    title: "Two-Stage DCF (The Usual Setup)",
    body: [
      "Most DCFs are two-stage.",
      "Stage 1: forecast cash for years 1–5 or 1–10.",
      "Stage 2: estimate the business value after that (Terminal Value), then discount everything.",
    ],
    diagram: {
      kind: "splitSignal",
      left: { id: "inputs", title: "DCF Inputs", tone: "accent", icon: "stack" },
      branches: [
        { id: "stage1", title: "Forecast Years 1–5/10", icon: "stack" },
        { id: "tv", title: "Terminal Value", icon: "dot" },
      ],
      bottom: { id: "wacc", title: "Discount at WACC", tone: "accent", icon: "wave" },
      highlights: ["wacc"],
    },
  },
  {
    id: "06-ufcf",
    label: "SECTION 06",
    title: "Unlevered Free Cash Flow (UFCF)",
    body: [
      "UFCF is the cash the business generates from operations after it reinvests to keep running.",
      "It ignores how the company is financed (debt vs equity). That's why it's called unlevered.",
      "In an unlevered DCF, UFCF is the cash we discount.",
    ],
    diagram: {
      kind: "flowCanvas",
      layout: "stack",
      nodes: [
        { id: "ebit", title: "EBIT", icon: "stack" },
        { id: "tax", title: "Taxes on EBIT" },
        { id: "da", title: "+ Depreciation", icon: "wave" },
        { id: "wc", title: "± Working Capital", icon: "bolt" },
        { id: "capex", title: "- Capex", tone: "warn", icon: "bolt" },
        { id: "ufcf", title: "Unlevered FCF", tone: "accent", icon: "dot" },
      ],
      highlights: ["ufcf"],
    },
  },
  {
    id: "07-why-discount",
    label: "SECTION 07",
    title: "Why We Discount",
    body: [
      "Money today is worth more than money later.",
      "If someone promises you $100 next year, you wouldn't pay $100 for it today.",
      "Discounting is how we turn future dollars into today dollars.",
    ],
    diagram: {
      kind: "flowCanvas",
      layout: "stack",
      nodes: [
        { id: "future", title: "Future Cash", icon: "stack" },
        { id: "formula", title: "÷ (1 + r)^t", icon: "wave" },
        { id: "pv", title: "Present Value", tone: "accent", icon: "dot" },
      ],
      highlights: ["pv"],
    },
  },
  {
    id: "08-wacc",
    label: "SECTION 08",
    title: "WACC (The Discount Rate for UFCF)",
    body: [
      "WACC is the blended return investors expect from debt and equity together.",
      "If a business is riskier, WACC is usually higher. Higher WACC means lower present value.",
      "In an unlevered DCF, WACC is the standard discount rate.",
    ],
    diagram: {
      kind: "equationBar",
      tokens: [
        { text: "Cost of Debt (1-T)" },
        { text: "Debt %" },
        { text: "Cost of Equity" },
        { text: "Equity %" },
        { text: "WACC", tone: "accent" },
      ],
      operators: [" × ", " + ", " × ", " = "],
    },
  },
  {
    id: "09-terminal-two-ways",
    label: "SECTION 09",
    title: "Terminal Value: Two Popular Methods",
    body: [
      "Terminal Value is the value of the company at the end of the forecast period.",
      "We use it because we can't forecast year 47 with confidence.",
      "There are two common methods: Perpetuity Growth and Exit Multiple.",
    ],
    diagram: {
      kind: "splitSignal",
      left: { id: "tv", title: "Terminal Value", tone: "accent", icon: "dot" },
      branches: [
        { id: "perp", title: "Perpetuity Growth" },
        { id: "exit", title: "Exit Multiple" },
      ],
    },
  },
  {
    id: "10-perpetuity",
    label: "SECTION 10",
    title: "Perpetuity Growth (The Forever Assumption)",
    body: [
      "This method assumes cash flows grow forever at a steady rate.",
      "The growth rate is usually small and stable, like the economy over time.",
      "If growth gets too high, the math breaks, so we keep it realistic.",
    ],
    diagram: {
      kind: "equationBar",
      tokens: [
        { text: "Terminal Value", tone: "accent" },
        { text: "FCF(t+1)" },
        { text: "(WACC − g)" },
      ],
      operators: [" = ", " ÷ "],
    },
  },
  {
    id: "11-exit-multiple",
    label: "SECTION 11",
    title: "Exit Multiple (The Market Anchor)",
    body: [
      "This method uses a market multiple, like EBITDA × 8x.",
      "It's basically saying: if the market buys similar companies at this multiple, we can use that as an estimate.",
      "It's common to sanity-check this against comps.",
    ],
    diagram: {
      kind: "flowCanvas",
      layout: "stack",
      nodes: [
        { id: "ebitda", title: "Terminal EBITDA", icon: "stack" },
        { id: "mult", title: "× Exit Multiple", icon: "wave" },
        { id: "tv", title: "Terminal Value", tone: "accent", icon: "dot" },
      ],
      highlights: ["tv"],
    },
  },
  {
    id: "12-ev-to-equity",
    label: "SECTION 12",
    title: "From EV to Equity Value (The Bridge)",
    body: [
      "After you get Enterprise Value, you adjust for cash and debt.",
      "Cash adds because it's extra value sitting there.",
      "Debt subtracts because it must be paid off.",
    ],
    diagram: {
      kind: "flowCanvas",
      layout: "stack",
      nodes: [
        { id: "ev", title: "Enterprise Value", tone: "accent", icon: "stack" },
        { id: "cash", title: "+ Cash", tone: "good" },
        { id: "debt", title: "- Debt", tone: "warn" },
        { id: "eq", title: "Equity Value", tone: "accent", icon: "dot" },
      ],
      highlights: ["eq"],
    },
  },
  {
    id: "13-per-share",
    label: "SECTION 13",
    title: "Value Per Share",
    body: [
      "To get a price per share, you divide Equity Value by diluted shares.",
      "Diluted shares means 'all the shares that could exist' (like options turning into shares).",
      "This step is basically: how big is the pizza, and how many slices exist?",
    ],
    diagram: {
      kind: "flowCanvas",
      layout: "stack",
      nodes: [
        { id: "eq", title: "Equity Value", tone: "accent" },
        { id: "shares", title: "÷ Diluted Shares", icon: "wave" },
        { id: "pps", title: "Value Per Share", tone: "accent", icon: "dot" },
      ],
      highlights: ["pps"],
    },
  },
  {
    id: "14-sensitivities",
    label: "SECTION 14",
    title: "DCF Outputs Are Ranges",
    body: [
      "DCF is very sensitive. Small changes in WACC or growth can change value a lot.",
      "That's why we don't treat DCF like an exact answer.",
      "We show a range using sensitivity tables.",
    ],
    diagram: {
      kind: "flowCanvas",
      layout: "stack",
      nodes: [
        { id: "wacc", title: "WACC ↑ / ↓", icon: "bolt" },
        { id: "g", title: "Growth ↑ / ↓", icon: "bolt" },
        { id: "range", title: "Value Range", tone: "accent", icon: "dot" },
      ],
      highlights: ["range"],
    },
  },
  {
    id: "15-mental-model",
    label: "SECTION 15",
    title: "The One-Line DCF Mental Model",
    body: [
      "Predict future cash.",
      "Discount it back to today.",
      "Convert EV to equity and divide by shares.",
      "That's DCF.",
    ],
    diagram: {
      kind: "flowCanvas",
      layout: "stack",
      nodes: [
        { id: "predict", title: "Predict Cash", icon: "stack" },
        { id: "discount", title: "Discount to Today", icon: "wave" },
        { id: "bridge", title: "EV → Equity → Per Share", icon: "dot", tone: "accent" },
      ],
      highlights: ["bridge"],
    },
  },
];
