/**
 * Worlds overview catalog — 6 labs (AI lab branding).
 * FSM modules are the existing World 0..5; others are coming soon.
 */

export type WorldSlug =
  | "fsm"
  | "dcf"
  | "ma"
  | "market-signals"
  | "deal-intelligence"
  | "leverage";

export type LabDef = {
  slug: WorldSlug;
  title: string;
  hook: string;
  placeholderMinutes: number;
  available: boolean;
};

export const LABS: LabDef[] = [
  {
    slug: "fsm",
    title: "Financial System Core",
    hook: "Build the three-statement engine end-to-end.",
    placeholderMinutes: 0, // computed from FSM modules
    available: true,
  },
  {
    slug: "dcf",
    title: "Discount Engine",
    hook: "Turn forecasts into intrinsic value—cleanly.",
    placeholderMinutes: 90,
    available: false,
  },
  {
    slug: "ma",
    title: "Acquisition Protocol",
    hook: "Model synergies, pricing, and dilution.",
    placeholderMinutes: 75,
    available: false,
  },
  {
    slug: "market-signals",
    title: "Market Signal Lab",
    hook: "Benchmark how markets price companies.",
    placeholderMinutes: 60,
    available: false,
  },
  {
    slug: "deal-intelligence",
    title: "Deal Intelligence Lab",
    hook: "Learn what real deals imply about value.",
    placeholderMinutes: 60,
    available: false,
  },
  {
    slug: "leverage",
    title: "Leverage Engine",
    hook: "Understand debt, paydown, and sponsor returns.",
    placeholderMinutes: 75,
    available: false,
  },
];

export type FSMModuleDef = {
  id: string;
  slug: string;
  title: string;
  description: string;
  href: string;
  estimatedMinutes: number;
};

/** FSM = existing World 0..5. href points to existing world map. */
export const FSM_MODULES: FSMModuleDef[] = [
  {
    id: "world-0",
    slug: "world-0",
    title: "What Is a Model?",
    description: "No fear. Just clarity. Learn what a model is and how analysts think.",
    href: "/worlds/world-0",
    estimatedMinutes: 12,
  },
  {
    id: "world-1",
    slug: "world-1",
    title: "Income Statement",
    description: "Build and read the P&L like an analyst.",
    href: "/worlds/world-1",
    estimatedMinutes: 18,
  },
  {
    id: "world-2",
    slug: "world-2",
    title: "Revenue Forecasting",
    description: "Forecast revenue with drivers, sanity checks, and game reps.",
    href: "/worlds/world-2",
    estimatedMinutes: 20,
  },
  {
    id: "world-3",
    slug: "world-3",
    title: "Costs & Margins",
    description: "Train analyst intuition: what costs move, and why margins change.",
    href: "/worlds/world-3",
    estimatedMinutes: 15,
  },
  {
    id: "world-4",
    slug: "world-4",
    title: "Balance Sheet",
    description: "Learn assets, liabilities, equity, and how the balance sheet links.",
    href: "/worlds/world-4",
    estimatedMinutes: 18,
  },
  {
    id: "world-5",
    slug: "world-5",
    title: "Working Capital",
    description: "Feel cash get trapped or freed by A/R, Inventory, A/P, and Deferred Revenue.",
    href: "/worlds/world-5",
    estimatedMinutes: 20,
  },
];

export const FSM_TOTAL_MINUTES = FSM_MODULES.reduce(
  (sum, m) => sum + m.estimatedMinutes,
  0
);

export function getLabBySlug(slug: string): LabDef | undefined {
  return LABS.find((l) => l.slug === slug);
}

export function formatTimeMinutes(totalMinutes: number): string {
  if (totalMinutes < 60) return `~${totalMinutes} min`;
  const h = Math.floor(totalMinutes / 60);
  const m = totalMinutes % 60;
  if (m === 0) return `~${h} hr`;
  return `~${h} hr ${m} min`;
}
