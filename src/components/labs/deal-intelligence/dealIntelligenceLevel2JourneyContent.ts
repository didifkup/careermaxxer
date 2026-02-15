import type { JourneySection } from "./dealIntelligenceLevel1JourneyContent";

export const dealIntelligenceLevel2Sections: JourneySection[] = [
  {
    id: "di2-01-screening",
    label: "LEVEL 2 — SECTION 01",
    title: "Screening Like a Pro (So You Don't Waste Hours)",
    body: [
      "The best screens stack a few filters: industry match, size match, and recency.",
      "You also filter for deals where financials are actually disclosed (or you can't calculate multiples).",
      "The goal is a small list you can defend, not a huge list you can't explain.",
    ],
  },
  {
    id: "di2-02-primary-vs-secondary",
    label: "LEVEL 2 — SECTION 02",
    title: "Primary vs Secondary Relevance (How Bankers Justify a Comp)",
    body: [
      "Primary relevance is the big stuff: industry, customers, products, and size.",
      "Secondary relevance is the 'texture': margins, leverage, growth, cyclicality, geography.",
      "If primary doesn't match, the comp is usually dead on arrival.",
    ],
  },
  {
    id: "di2-03-recency",
    label: "LEVEL 2 — SECTION 03",
    title: "Recency (Old Deals Can Lie)",
    body: [
      "Deal multiples change when the market mood changes.",
      "If you go too old, you're basically valuing in a different universe.",
      "Use a 'recent window' unless the industry is slow and there aren't many deals.",
    ],
  },
  {
    id: "di2-04-median-mean",
    label: "LEVEL 2 — SECTION 04",
    title: "Median vs Mean (The Outlier Problem)",
    body: [
      "Mean gets dragged around by one crazy deal.",
      "Median is usually safer when you have a bigger comp set.",
      "If your set is tiny and clean, mean can be okay.",
    ],
  },
  {
    id: "di2-05-ltm-vs-forward",
    label: "LEVEL 2 — SECTION 05",
    title: "LTM vs Forward Multiples (Deals Look Ahead Too)",
    body: [
      "LTM uses what happened before the deal. It's real, but backward.",
      "Forward uses projections. It's closer to how buyers think, but depends on the forecast quality.",
      "If the materials include 1–2 year projections, show both.",
    ],
  },
  {
    id: "di2-06-premium-mechanics",
    label: "LEVEL 2 — SECTION 06",
    title: "Premium Mechanics (What 'Unaffected' Really Means)",
    body: [
      "Premium is measured vs the price before the market started 'smelling the deal'.",
      "Sometimes you use a day, a week, or a month average depending on the situation.",
      "If historical price data is hard to find, fairness opinions sometimes show it.",
    ],
  },
];
