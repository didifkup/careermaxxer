import type { JourneySection } from "./marketSignalLevel1JourneyContent";

export const marketSignalLevel2Sections: JourneySection[] = [
  {
    id: "ms2-01-when-to-use-which-multiple",
    label: "LEVEL 2 — SECTION 01",
    title: "Choosing the Right Multiple (Like a Real Analyst)",
    body: [
      "Different multiples fit different situations.",
      "EV/EBITDA is popular because it focuses on operations and ignores debt differences.",
      "P/E works best when earnings are real, stable, and companies have similar leverage.",
    ],
  },
  {
    id: "ms2-02-forward-vs-ltm",
    label: "LEVEL 2 — SECTION 02",
    title: "LTM vs Forward Multiples (What the Market Cares About)",
    body: [
      "LTM uses what already happened (last twelve months). It's real, but backward-looking.",
      "Forward uses estimates (next year or two). It's riskier, but markets price the future.",
      "Good comps often show both side-by-side.",
    ],
  },
  {
    id: "ms2-03-median-vs-mean",
    label: "LEVEL 2 — SECTION 03",
    title: "Median vs Mean (How Pros Avoid Outliers)",
    body: [
      "Mean can get wrecked by one weird outlier company.",
      "Median is often safer for larger comp sets.",
      "If your peer group is tiny and clean, mean is fine.",
    ],
  },
  {
    id: "ms2-04-calendarization",
    label: "LEVEL 2 — SECTION 04",
    title: "Calendarization (Making Time Periods Comparable)",
    body: [
      "A comps table breaks if peers have different fiscal year ends.",
      "Calendarization adjusts results so everyone is compared on the same calendar period.",
      "It's basically 'line up the timelines' so the multiples mean something.",
    ],
  },
  {
    id: "ms2-05-non-gaap-bridge",
    label: "LEVEL 2 — SECTION 05",
    title: "GAAP vs Non-GAAP (What Gets Added Back and Why)",
    body: [
      "GAAP is the official accounting version. It can include non-cash items and one-time noise.",
      "Non-GAAP is a 'cleaner' view management and analysts often talk about.",
      "The key is consistency: if you adjust one company, you should adjust peers similarly.",
    ],
  },
  {
    id: "ms2-06-why-market-can-be-wrong",
    label: "LEVEL 2 — SECTION 06",
    title: "The Market Signal Isn't Always 'Correct'",
    body: [
      "Comps show what the market is paying, not what a textbook says it 'should' be worth.",
      "Sometimes the market misprices individual stocks even if it's roughly right overall.",
      "That's why comps + DCF together are powerful: they check each other.",
    ],
  },
];
