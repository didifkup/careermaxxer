import type { JourneySection } from "./leverageEngineLevel1JourneyContent";

export const leverageEngineLevel2Sections: JourneySection[] = [
  {
    id: "le2-01-debt-stack",
    label: "LEVEL 2 — SECTION 01",
    title: "The Debt Stack (Who Gets Paid First)",
    body: [
      "LBO debt comes in layers, like floors of a building.",
      "Top floors (senior secured loans) usually get paid first and cost less.",
      "Lower floors (high yield, mezz) cost more because they're riskier.",
    ],
  },
  {
    id: "le2-02-loans-vs-bonds",
    label: "LEVEL 2 — SECTION 02",
    title: "Loans vs Bonds (Quick Difference)",
    body: [
      "Leveraged loans are usually floating-rate and often secured by assets.",
      "High-yield bonds are often fixed-rate and can be unsecured.",
      "Both can fund LBOs, but they behave differently in a model.",
    ],
  },
  {
    id: "le2-03-revolver",
    label: "LEVEL 2 — SECTION 03",
    title: "Revolver (The Company's Credit Card)",
    body: [
      "A revolver is a flexible loan the company can draw and repay.",
      "In models, it's used when cash is short (to avoid going negative).",
      "When cash is strong, the model usually pays the revolver back first.",
    ],
  },
  {
    id: "le2-04-covenants",
    label: "LEVEL 2 — SECTION 04",
    title: "Covenants (Rules the Lenders Make You Follow)",
    body: [
      "Covenants are lender rules like: don't let leverage get too high, or keep coverage strong.",
      "Some are checked every quarter (maintenance).",
      "Some only matter when you do a move (incurrence), like taking more debt.",
    ],
  },
  {
    id: "le2-05-coverage-vs-leverage",
    label: "LEVEL 2 — SECTION 05",
    title: "2 Ratios You Must Know: Leverage + Coverage",
    body: [
      "Leverage ratio is usually Debt / EBITDA (how heavy the debt load is).",
      "Coverage ratio is usually EBITDA / Interest (can you afford interest?).",
      "If leverage is too high or coverage is too low, lenders panic.",
    ],
  },
  {
    id: "le2-06-cash-sweep",
    label: "LEVEL 2 — SECTION 06",
    title: "Cash Sweep (Extra Cash Pays Down Debt)",
    body: [
      "A cash sweep means leftover cash is used to pay down debt early.",
      "This can boost equity returns because debt drops faster.",
      "But it can reduce flexibility if the company needs cash for growth.",
    ],
  },
];
