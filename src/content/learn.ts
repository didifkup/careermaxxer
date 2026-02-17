/**
 * Learn / Reading Lab — category registry only.
 * No article types or article content yet; add in a future pass
 * (e.g. extend this file or add /src/content/learnArticles.ts).
 */

export type LearnCategory = {
  id: string;
  title: string;
  hook: string;
  description: string;
  iconKey: string;
  colorKey: string;
};

export const CATEGORIES: LearnCategory[] = [
  {
    id: "investment-banking-career",
    title: "Investment Banking Career",
    hook: "From analyst to MD — paths, timelines, and how to climb.",
    description: "Structured guides on IB career progression, roles, and advancement.",
    iconKey: "career",
    colorKey: "blue",
  },
  {
    id: "investment-banking-life",
    title: "Life in Banking",
    hook: "Hours, culture, and what a typical week really looks like.",
    description: "Realistic snapshots of day-to-day life and work rhythm in IB.",
    iconKey: "life",
    colorKey: "indigo",
  },
  {
    id: "investment-banking-culture",
    title: "Banking Culture",
    hook: "Team dynamics, expectations, and how to thrive in the room.",
    description: "Culture, norms, and soft skills that matter in banking.",
    iconKey: "culture",
    colorKey: "violet",
  },
  {
    id: "investment-banking-news",
    title: "IB & Markets News",
    hook: "Deals, macro, and headlines that move the industry.",
    description: "Curated news and context for staying current in IB.",
    iconKey: "news",
    colorKey: "cyan",
  },
  {
    id: "recruiting",
    title: "Recruiting",
    hook: "Applications, timelines, superdays, and offer tactics.",
    description: "End-to-end recruiting playbooks for IB and adjacent roles.",
    iconKey: "recruiting",
    colorKey: "teal",
  },
  {
    id: "compensation",
    title: "Compensation",
    hook: "Base, bonus, and total comp by level and group.",
    description: "Comp structures, benchmarks, and negotiation basics.",
    iconKey: "compensation",
    colorKey: "emerald",
  },
  {
    id: "exits",
    title: "Exits",
    hook: "PE, HF, corp dev, and when to make the jump.",
    description: "Exit paths from banking and how to position yourself.",
    iconKey: "exits",
    colorKey: "amber",
  },
  {
    id: "student-strategy",
    title: "Student Strategy",
    hook: "Freshman to senior year — what to do when to land IB.",
    description: "Year-by-year playbooks for students targeting IB.",
    iconKey: "student",
    colorKey: "blue",
  },
];

export function getCategories(): LearnCategory[] {
  return CATEGORIES;
}

export function getCategory(id: string): LearnCategory | undefined {
  return CATEGORIES.find((c) => c.id === id);
}
