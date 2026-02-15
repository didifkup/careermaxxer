import type { JourneyDiagram } from "@/components/labs/fsm/diagrams/types";

export type JourneySection = {
  id: string;
  label: string;
  title: string;
  body: string[];
  diagram?: JourneyDiagram;
};

export const maLevel1Sections: JourneySection[] = [
  {
    id: "01-what-is-ma",
    label: "SECTION 01",
    title: "What M&A Really Is",
    body: [
      "M&A means one company buys another company (or two companies combine).",
      "It's like one team buying another team's whole playbook, players, and equipment.",
      "The big question is: does buying this company make the buyer better off?",
    ],
    diagram: {
      kind: "flowCanvas",
      layout: "stack",
      nodes: [
        { id: "buyer", title: "Buyer (Acquirer)", tone: "accent", icon: "stack" },
        { id: "deal", title: "Buys", icon: "bolt" },
        { id: "target", title: "Target (Seller)", tone: "accent", icon: "dot" },
      ],
      edges: [
        { from: "buyer", to: "deal" },
        { from: "deal", to: "target" },
      ],
      highlights: ["buyer", "target"],
    },
  },
  {
    id: "02-players",
    label: "SECTION 02",
    title: "Who's Involved in a Deal",
    body: [
      "A deal isn't just two CEOs shaking hands.",
      "There are teams: the buyer and seller, investment bankers, lawyers, accountants, and sometimes regulators.",
      "Everyone has a job. Bankers help structure and explain the deal.",
    ],
    diagram: {
      kind: "splitSignal",
      left: { id: "deal", title: "A Deal Has Teams", tone: "accent", icon: "stack" },
      branches: [
        { id: "biz", title: "Buyer + Seller", icon: "dot" },
        { id: "bank", title: "Bankers + Advisors", icon: "wave" },
      ],
    },
  },
  {
    id: "03-buy-side-sell-side",
    label: "SECTION 03",
    title: "Buy-Side vs Sell-Side (Simple)",
    body: [
      "If your client is buying a company, that's buy-side work.",
      "If your client is selling a company, that's sell-side work.",
      "Both sides need models, decks, and clear math to make decisions.",
    ],
    diagram: {
      kind: "splitSignal",
      left: { id: "ib", title: "Investment Bank Work", tone: "accent", icon: "stack" },
      branches: [
        { id: "buy", title: "Buy-Side (Client Buys)" },
        { id: "sell", title: "Sell-Side (Client Sells)" },
      ],
    },
  },
  {
    id: "04-what-model-shows",
    label: "SECTION 04",
    title: "What an M&A Model Shows",
    body: [
      "An M&A model shows what happens after the deal.",
      "It estimates the combined company's earnings and the impact on the buyer's EPS.",
      "It helps answer: is the deal accretive (helps EPS) or dilutive (hurts EPS)?",
    ],
    diagram: {
      kind: "flowCanvas",
      layout: "stack",
      nodes: [
        { id: "inputs", title: "Deal Inputs", icon: "bolt" },
        { id: "proforma", title: "Pro Forma Company", tone: "accent", icon: "stack" },
        { id: "eps", title: "EPS Impact", tone: "accent", icon: "dot" },
      ],
      edges: [
        { from: "inputs", to: "proforma" },
        { from: "proforma", to: "eps" },
      ],
      highlights: ["eps"],
    },
  },
  {
    id: "05-accretion-dilution",
    label: "SECTION 05",
    title: "Accretion vs Dilution (The One-Line Test)",
    body: [
      "Accretive means the buyer's EPS goes up after the deal.",
      "Dilutive means the buyer's EPS goes down after the deal.",
      "So the test is simple: Pro Forma EPS compared to Standalone EPS.",
    ],
    diagram: {
      kind: "equationBar",
      tokens: [
        { text: "Pro Forma EPS", tone: "accent" },
        { text: "Standalone EPS" },
        { text: "Accretive / Dilutive", tone: "accent" },
      ],
      operators: [" vs ", " → "],
    },
  },
  {
    id: "06-how-you-pay",
    label: "SECTION 06",
    title: "How Deals Get Paid For",
    body: [
      "A buyer can pay with cash, stock, or a mix of both.",
      "Cash means the buyer uses cash or borrows money (debt).",
      "Stock means the buyer issues new shares to the seller.",
    ],
    diagram: {
      kind: "splitSignal",
      left: { id: "pay", title: "Payment Method", tone: "accent", icon: "stack" },
      branches: [
        { id: "cash", title: "Cash (or Debt-Funded Cash)", icon: "bolt" },
        { id: "stock", title: "Stock (New Shares)", icon: "wave" },
        { id: "mix", title: "Mix", icon: "dot" },
      ],
    },
  },
  {
    id: "07-stock-deal-pe",
    label: "SECTION 07",
    title: "Why P/E Ratios Matter in Stock Deals",
    body: [
      "In a stock deal, the buyer is paying with shares.",
      "If the buyer has a high P/E and buys a lower P/E company, the deal is more likely to be accretive.",
      "A simple way to think: expensive 'currency' (high P/E stock) can buy earnings more easily.",
    ],
    diagram: {
      kind: "flowCanvas",
      layout: "stack",
      nodes: [
        { id: "high", title: "High P/E Buyer", tone: "good" },
        { id: "buys", title: "Buys", icon: "bolt" },
        { id: "low", title: "Lower P/E Target", tone: "good" },
        { id: "eps", title: "More Likely Accretive", tone: "accent", icon: "dot" },
      ],
      edges: [
        { from: "high", to: "buys" },
        { from: "buys", to: "low" },
        { from: "low", to: "eps" },
      ],
      highlights: ["eps"],
    },
  },
  {
    id: "08-proforma-adjustments",
    label: "SECTION 08",
    title: "The 4 Adjustments That Change Everything",
    body: [
      "You can't just add the two companies' net incomes and call it a day.",
      "Deals create extra changes: financing costs, synergies, one-time fees, and accounting effects.",
      "These are usually the biggest reasons a deal looks accretive or dilutive.",
    ],
    diagram: {
      kind: "flowCanvas",
      layout: "stack",
      nodes: [
        { id: "base", title: "Buyer NI + Target NI", icon: "stack" },
        { id: "adj", title: "+ / - Deal Adjustments", tone: "accent", icon: "bolt" },
        { id: "pf", title: "Pro Forma Net Income", tone: "accent", icon: "dot" },
      ],
      edges: [
        { from: "base", to: "adj" },
        { from: "adj", to: "pf" },
      ],
      highlights: ["pf"],
    },
  },
  {
    id: "09-financing",
    label: "SECTION 09",
    title: "Financing: Debt Creates Interest Expense",
    body: [
      "If the buyer borrows money to fund the deal, it pays interest.",
      "Interest expense reduces net income, which can make a deal more dilutive.",
      "So in cash (or debt-funded) deals, interest is a huge driver.",
    ],
    diagram: {
      kind: "flowCanvas",
      layout: "stack",
      nodes: [
        { id: "debt", title: "New Debt", tone: "warn" },
        { id: "interest", title: "Interest Expense", tone: "warn", icon: "wave" },
        { id: "ni", title: "Lower Net Income", icon: "bolt" },
        { id: "eps", title: "EPS Impact", tone: "accent", icon: "dot" },
      ],
      edges: [
        { from: "debt", to: "interest" },
        { from: "interest", to: "ni" },
        { from: "ni", to: "eps" },
      ],
      highlights: ["eps"],
    },
  },
  {
    id: "10-synergies",
    label: "SECTION 10",
    title: "Synergies: Cost Savings Boost Earnings",
    body: [
      "Synergies usually mean cost savings after combining companies.",
      "If expenses go down, net income goes up, and the deal looks more accretive.",
      "In models, synergies are often one of the biggest 'make it work' levers.",
    ],
    diagram: {
      kind: "flowCanvas",
      layout: "stack",
      nodes: [
        { id: "save", title: "Cost Savings (Synergies)", tone: "good", icon: "bolt" },
        { id: "ni", title: "Higher Net Income", tone: "good" },
        { id: "eps", title: "More Accretive", tone: "accent", icon: "dot" },
      ],
      edges: [
        { from: "save", to: "ni" },
        { from: "ni", to: "eps" },
      ],
      highlights: ["eps"],
    },
  },
  {
    id: "11-fees",
    label: "SECTION 11",
    title: "Fees: One-Time Costs Can Hit Earnings",
    body: [
      "Deals come with fees: bankers, lawyers, accountants.",
      "Many of these hit the income statement (one-time), which can reduce net income in the deal year.",
      "So fees often make Year 1 look worse than later years.",
    ],
    diagram: {
      kind: "flowCanvas",
      layout: "stack",
      nodes: [
        { id: "fees", title: "One-Time Fees", tone: "warn" },
        { id: "ni", title: "Lower Year 1 Net Income", tone: "warn" },
        { id: "eps", title: "Year 1 EPS Pressure", tone: "accent", icon: "dot" },
      ],
      edges: [
        { from: "fees", to: "ni" },
        { from: "ni", to: "eps" },
      ],
      highlights: ["eps"],
    },
  },
  {
    id: "12-sources-uses",
    label: "SECTION 12",
    title: "Sources & Uses (Where Money Comes From / Goes)",
    body: [
      "Sources & Uses is the deal's money map.",
      "Uses is what you spend: purchase price, fees, refinancing, etc.",
      "Sources is where money comes from: cash, debt, or stock.",
    ],
    diagram: {
      kind: "splitSignal",
      left: { id: "map", title: "Deal Money Map", tone: "accent", icon: "stack" },
      branches: [
        { id: "uses", title: "Uses (Spend)", icon: "bolt" },
        { id: "sources", title: "Sources (Fund)", icon: "wave" },
      ],
    },
  },
  {
    id: "13-ppa-goodwill",
    label: "SECTION 13",
    title: "Goodwill (The Plug) and Write-Ups",
    body: [
      "When a buyer pays more than the fair value of the target's net assets, the extra becomes goodwill.",
      "In models, we often write some assets up to fair value, which can create more depreciation/amortization later.",
      "More D&A can reduce future earnings, which matters for EPS.",
    ],
    diagram: {
      kind: "equationBar",
      tokens: [
        { text: "Purchase Price", tone: "accent" },
        { text: "FMV of Net Assets" },
        { text: "Goodwill", tone: "accent" },
      ],
      operators: [" − ", " = "],
    },
  },
  {
    id: "14-deferred-taxes",
    label: "SECTION 14",
    title: "Deferred Taxes (The 'Book vs Tax' Gap)",
    body: [
      "Sometimes book accounting and tax accounting don't match.",
      "When assets are written up for book, but not for tax, that difference creates deferred taxes.",
      "In models, deferred taxes often show up as a deferred tax liability (DTL).",
    ],
    diagram: {
      kind: "flowCanvas",
      layout: "stack",
      nodes: [
        { id: "book", title: "Book Basis ↑", icon: "stack" },
        { id: "tax", title: "Tax Basis (Maybe Not ↑)", icon: "wave" },
        { id: "dtl", title: "DTL Created", tone: "accent", icon: "dot" },
      ],
      edges: [
        { from: "book", to: "tax" },
        { from: "tax", to: "dtl" },
      ],
      highlights: ["dtl"],
    },
  },
  {
    id: "15-proforma-eps",
    label: "SECTION 15",
    title: "Pro Forma EPS: The Finish Line",
    body: [
      "After you build adjustments, you get pro forma net income.",
      "Then you divide by pro forma shares to get pro forma EPS.",
      "Finally, you compare pro forma EPS vs standalone EPS to judge accretion/dilution.",
    ],
    diagram: {
      kind: "flowCanvas",
      layout: "stack",
      nodes: [
        { id: "pfni", title: "Pro Forma Net Income", tone: "accent", icon: "stack" },
        { id: "shares", title: "÷ Pro Forma Shares", icon: "wave" },
        { id: "pfeps", title: "Pro Forma EPS", tone: "accent", icon: "dot" },
      ],
      edges: [
        { from: "pfni", to: "shares" },
        { from: "shares", to: "pfeps" },
      ],
      highlights: ["pfeps"],
    },
  },
  {
    id: "16-sensitivity",
    label: "SECTION 16",
    title: "Sensitivities: Show the Range",
    body: [
      "Bankers don't show just one answer. They show how the answer changes if assumptions change.",
      "Offer price, synergies, interest rate, and mix of cash/stock are common 'knobs'.",
      "Sensitivity tables show the range of outcomes fast.",
    ],
    diagram: {
      kind: "flowCanvas",
      layout: "stack",
      nodes: [
        { id: "knobs", title: "Knobs (Inputs)", icon: "bolt" },
        { id: "table", title: "Sensitivity Table", icon: "wave" },
        { id: "range", title: "Outcome Range", tone: "accent", icon: "dot" },
      ],
      edges: [
        { from: "knobs", to: "table" },
        { from: "table", to: "range" },
      ],
      highlights: ["range"],
    },
  },
];
