/**
 * Seed mock_questions with 25 technical + 15 behavioral.
 * Run: npx tsx scripts/seed-mock-questions.ts
 * Requires: NEXT_PUBLIC_SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY in env (e.g. .env.local).
 */

import { createClient } from "@supabase/supabase-js";
import { readFileSync, existsSync } from "fs";
import { join } from "path";

function loadEnvLocal() {
  const path = join(process.cwd(), ".env.local");
  if (!existsSync(path)) return;
  const content = readFileSync(path, "utf-8");
  for (const line of content.split("\n")) {
    const m = line.match(/^\s*([A-Za-z_][A-Za-z0-9_]*)\s*=\s*(.*)$/);
    if (m) process.env[m[1]!] = m[2]!.replace(/^["']|["']$/g, "").trim();
  }
}

loadEnvLocal();

const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
if (!url || !key) {
  console.error("Missing NEXT_PUBLIC_SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY");
  process.exit(1);
}

const supabase = createClient(url, key);

type Track = "technical" | "behavioral";

const TECHNICAL_RUBRIC = {
  content: "Correctness vs ideal answer; key terms and logic",
  structure: "Clear flow: setup, steps, conclusion",
  clarity: "Articulation and pace",
  concision: "No fluff; direct",
  confidence: "Firm delivery",
  overall: "Blend of above",
};

const BEHAVIORAL_RUBRIC = {
  content: "Relevance and specificity of example",
  structure: "STAR/CAR: Situation, Task, Action, Result with impact",
  clarity: "Clear and audible",
  concision: "Focused; no rambling",
  confidence: "Calm and assured",
  overall: "Blend of above",
};

const technicalQuestions: Array<{
  track: Track;
  difficulty: number;
  tags: string[];
  prompt: string;
  ideal_answer: string;
  rubric_json: object;
}> = [
  {
    track: "technical",
    difficulty: 1,
    tags: ["Accounting", "3 statements"],
    prompt: "How do the three financial statements link together?",
    ideal_answer:
      "Net income from the income statement flows into retained earnings on the balance sheet. The cash flow statement starts with net income and reconciles to the change in cash. The ending cash on the cash flow statement ties to cash on the balance sheet. Retained earnings = prior RE + net income - dividends.",
    rubric_json: TECHNICAL_RUBRIC,
  },
  {
    track: "technical",
    difficulty: 1,
    tags: ["Accounting", "Retained earnings"],
    prompt: "Walk me through the retained earnings formula.",
    ideal_answer:
      "Retained earnings = prior period retained earnings + net income - dividends paid. It's the cumulative earnings kept in the company rather than distributed to shareholders.",
    rubric_json: TECHNICAL_RUBRIC,
  },
  {
    track: "technical",
    difficulty: 1,
    tags: ["Valuation", "DCF"],
    prompt: "What is a DCF and what are the main steps?",
    ideal_answer:
      "A DCF values a company by discounting its future free cash flows to today. Steps: project revenue and expenses to get unlevered FCF, estimate terminal value (growth perpetuity or exit multiple), discount all FCFs and TV to present value using WACC, sum to get enterprise value.",
    rubric_json: TECHNICAL_RUBRIC,
  },
  {
    track: "technical",
    difficulty: 1,
    tags: ["Valuation", "WACC"],
    prompt: "What is WACC and how do you use it?",
    ideal_answer:
      "WACC is the weighted average cost of capital—the blended rate a company pays for debt and equity. You use it as the discount rate when valuing unlevered free cash flows in a DCF. WACC = (E/V)*Re + (D/V)*Rd*(1-T).",
    rubric_json: TECHNICAL_RUBRIC,
  },
  {
    track: "technical",
    difficulty: 1,
    tags: ["Valuation", "EV", "Equity value"],
    prompt: "How do you get from equity value to enterprise value?",
    ideal_answer:
      "Enterprise value = equity value (market cap) + total debt - cash and equivalents + noncontrolling interest + preferred stock. EV represents the value of the whole firm before financing structure.",
    rubric_json: TECHNICAL_RUBRIC,
  },
  {
    track: "technical",
    difficulty: 2,
    tags: ["Valuation", "Comps"],
    prompt: "What are trading comps and how do you use them?",
    ideal_answer:
      "Trading comps use comparable public companies. You gather EV and equity metrics (EV/EBITDA, P/E), calculate multiples, and apply median or mean multiples to the target's metrics to imply valuation. Used for context and sanity check vs DCF.",
    rubric_json: TECHNICAL_RUBRIC,
  },
  {
    track: "technical",
    difficulty: 2,
    tags: ["Valuation", "Terminal value"],
    prompt: "How do you calculate terminal value in a DCF?",
    ideal_answer:
      "Two main methods: (1) Perpetuity growth: TV = FCF in year N+1 / (WACC - g). (2) Exit multiple: TV = metric in year N (e.g. EBITDA) × exit multiple. Then discount TV to present value at WACC.",
    rubric_json: TECHNICAL_RUBRIC,
  },
  {
    track: "technical",
    difficulty: 2,
    tags: ["DCF", "Unlevered FCF"],
    prompt: "What is unlevered free cash flow and how do you calculate it?",
    ideal_answer:
      "UFCF is cash flow available to all capital providers before debt. Formula: EBIT*(1-tax rate) + D&A - capex - change in NWC. It's used in DCF because we discount at WACC, which is a blended cost of capital.",
    rubric_json: TECHNICAL_RUBRIC,
  },
  {
    track: "technical",
    difficulty: 2,
    tags: ["DCF", "Beta"],
    prompt: "How do you unlever and relever beta?",
    ideal_answer:
      "Unlevered beta = levered beta / (1 + (1-T)*D/E). Removes effect of leverage. Relever with target D/E: levered beta = unlevered beta * (1 + (1-T)*D/E). Used when target has different capital structure than comps.",
    rubric_json: TECHNICAL_RUBRIC,
  },
  {
    track: "technical",
    difficulty: 2,
    tags: ["M&A", "Accretion dilution"],
    prompt: "What does accretion/dilution mean in M&A?",
    ideal_answer:
      "It measures whether the deal increases or decreases the acquirer's EPS. Accretive = EPS goes up; dilutive = EPS goes down. You compare pro forma EPS (combined earnings / combined shares) to acquirer standalone EPS. All-cash is often accretive due to fewer shares; all-stock can be dilutive.",
    rubric_json: TECHNICAL_RUBRIC,
  },
  {
    track: "technical",
    difficulty: 2,
    tags: ["M&A", "Synergies"],
    prompt: "How do you incorporate synergies in an accretion/dilution analysis?",
    ideal_answer:
      "Add expected cost or revenue synergies to pro forma net income (after tax). Then recalculate pro forma EPS. A deal that's dilutive on a standalone basis can become accretive on a synergy-adjusted basis.",
    rubric_json: TECHNICAL_RUBRIC,
  },
  {
    track: "technical",
    difficulty: 2,
    tags: ["LBO", "Basics"],
    prompt: "What is an LBO in one sentence?",
    ideal_answer:
      "An LBO is the acquisition of a company using a significant amount of debt, with the target's cash flows used to pay down the debt and the equity value growing as debt is repaid.",
    rubric_json: TECHNICAL_RUBRIC,
  },
  {
    track: "technical",
    difficulty: 2,
    tags: ["LBO", "Returns"],
    prompt: "What drives returns in an LBO?",
    ideal_answer:
      "Three main drivers: (1) Debt paydown—as you repay debt, equity value increases. (2) Multiple expansion—selling at a higher multiple than entry. (3) EBITDA growth—operating improvement. Leverage amplifies equity returns when the thesis works.",
    rubric_json: TECHNICAL_RUBRIC,
  },
  {
    track: "technical",
    difficulty: 3,
    tags: ["Accounting", "Cash flow"],
    prompt: "Walk me through the cash flow statement from net income to cash.",
    ideal_answer:
      "Start with net income. Add back non-cash items (D&A, SBC). Adjust for change in working capital (increase in AR/Inventory uses cash; increase in AP is source). Then cash from operations. Investing: capex, M&A. Financing: debt, equity, dividends. Net change in cash.",
    rubric_json: TECHNICAL_RUBRIC,
  },
  {
    track: "technical",
    difficulty: 3,
    tags: ["Valuation", "Precedent transactions"],
    prompt: "When would you use precedent transactions over trading comps?",
    ideal_answer:
      "Precedent transactions show what acquirers actually paid for control. Use when valuing an M&A target or when the company is likely to be sold. Trading comps reflect current public market multiples. Precedent includes control premium and synergies; trading comps don't.",
    rubric_json: TECHNICAL_RUBRIC,
  },
  {
    track: "technical",
    difficulty: 3,
    tags: ["DCF", "Circular reference"],
    prompt: "Why is there a circular reference in a DCF with interest in the FCF?",
    ideal_answer:
      "If you use interest in the FCF calculation (e.g. levered FCF), your FCF depends on debt level. WACC depends on D/E. Equity value depends on FCF and WACC. So equity value and D/E are circular. Solution: use unlevered FCF and WACC, or iterate until D/E stabilizes.",
    rubric_json: TECHNICAL_RUBRIC,
  },
  {
    track: "technical",
    difficulty: 3,
    tags: ["M&A", "Purchase price allocation"],
    prompt: "What happens to the balance sheet in an acquisition?",
    ideal_answer:
      "Assets and liabilities of the target are marked to fair value. Goodwill = purchase price - net identifiable assets at FV. Acquired intangibles (e.g. customer relationships) are separately valued and amortized. Debt is typically refinanced. Equity of target is eliminated.",
    rubric_json: TECHNICAL_RUBRIC,
  },
  {
    track: "technical",
    difficulty: 3,
    tags: ["LBO", "Sources and uses"],
    prompt: "What are the main sources and uses in an LBO?",
    ideal_answer:
      "Uses: purchase price (equity value), refinance target debt, fees. Sources: sponsor equity, debt (senior, subordinated, mezzanine), rollover equity. Debt is typically the majority. Equity cushion and covenants depend on lender appetite and cash flow stability.",
    rubric_json: TECHNICAL_RUBRIC,
  },
  {
    track: "technical",
    difficulty: 1,
    tags: ["Accounting"],
    prompt: "What is the difference between cash flow and profit?",
    ideal_answer:
      "Profit (net income) is accrual-based: revenue when earned, expenses when incurred. Cash flow is actual cash in and out. A company can be profitable but have negative cash flow (e.g. heavy capex, working capital build) or have positive cash flow without profit (e.g. depreciation add-back).",
    rubric_json: TECHNICAL_RUBRIC,
  },
  {
    track: "technical",
    difficulty: 1,
    tags: ["Valuation"],
    prompt: "What is enterprise value and why use it?",
    ideal_answer:
      "EV = market cap + debt - cash (plus other adjustments). It represents the total value of the company's operations. We use it to compare companies with different capital structures and to apply multiples (e.g. EV/EBITDA) that are capital-structure neutral.",
    rubric_json: TECHNICAL_RUBRIC,
  },
  {
    track: "technical",
    difficulty: 2,
    tags: ["Accounting", "Depreciation"],
    prompt: "Why do you add back depreciation in the cash flow statement?",
    ideal_answer:
      "Depreciation is a non-cash expense—it reduces net income but doesn't use cash. So we add it back in the operating section to get from net income to cash from operations. Capex is the actual cash outflow and appears in investing.",
    rubric_json: TECHNICAL_RUBRIC,
  },
  {
    track: "technical",
    difficulty: 2,
    tags: ["Valuation", "Multiples"],
    prompt: "When would you use P/E vs EV/EBITDA?",
    ideal_answer:
      "P/E is equity multiple; affected by leverage and one-time items. EV/EBITDA is enterprise multiple; strips capital structure and is often used for comparables. Use EV/EBITDA when companies have different D/E or when comparing across sectors. P/E is intuitive for equity investors.",
    rubric_json: TECHNICAL_RUBRIC,
  },
  {
    track: "technical",
    difficulty: 2,
    tags: ["M&A", "Deal structure"],
    prompt: "What's the difference between an asset deal and a stock deal?",
    ideal_answer:
      "Stock deal: buyer acquires the company's shares; liabilities typically come with the company. Asset deal: buyer acquires specific assets and assumes selected liabilities. Asset deals can reduce risk (leave behind unwanted liabilities) and have tax implications for the seller (e.g. double tax in asset deal for corps).",
    rubric_json: TECHNICAL_RUBRIC,
  },
  {
    track: "technical",
    difficulty: 3,
    tags: ["LBO", "IRR"],
    prompt: "How does leverage affect IRR in an LBO?",
    ideal_answer:
      "Leverage amplifies equity IRR. When the company grows and pays down debt, equity value increases as a percentage of a smaller equity base. If the deal fails, equity can be wiped out. Higher leverage means higher potential return but higher risk. Sponsors target 20–25%+ equity IRR.",
    rubric_json: TECHNICAL_RUBRIC,
  },
  {
    track: "technical",
    difficulty: 3,
    tags: ["DCF", "Sensitivity"],
    prompt: "What variables do you typically sensitize in a DCF?",
    ideal_answer:
      "WACC (discount rate), terminal growth rate, and sometimes key revenue or margin assumptions. WACC and terminal growth have the largest impact on value. Two-way or three-way sensitivity tables show how valuation changes with these inputs.",
    rubric_json: TECHNICAL_RUBRIC,
  },
];

const behavioralQuestions: Array<{
  track: Track;
  difficulty: number;
  tags: string[];
  prompt: string;
  ideal_answer: string;
  rubric_json: object;
}> = [
  {
    track: "behavioral",
    difficulty: 1,
    tags: ["Tell me about yourself"],
    prompt: "Tell me about yourself.",
    ideal_answer:
      "Structure: brief background (education, one role), why you're interested in finance/IB, and why this firm. Keep to 60–90 seconds. End with a question or clear segue. Be specific—one concrete example from your resume.",
    rubric_json: BEHAVIORAL_RUBRIC,
  },
  {
    track: "behavioral",
    difficulty: 1,
    tags: ["Why IB"],
    prompt: "Why investment banking?",
    ideal_answer:
      "Situation: what sparked your interest (class, deal, experience). Task: what you wanted—exposure to deals, modeling, clients. Action: what you did to pursue it (courses, clubs, internships). Result: why you're committed and what you bring. Be specific; avoid generic 'fast-paced' only.",
    rubric_json: BEHAVIORAL_RUBRIC,
  },
  {
    track: "behavioral",
    difficulty: 1,
    tags: ["Why us"],
    prompt: "Why our firm?",
    ideal_answer:
      "Research-driven: name a specific deal, sector focus, or culture point. Connect your skills and interests to what the firm does. Mention one concrete fact (recent deal, training program, size). Avoid generic flattery.",
    rubric_json: BEHAVIORAL_RUBRIC,
  },
  {
    track: "behavioral",
    difficulty: 2,
    tags: ["Leadership"],
    prompt: "Describe a time you demonstrated leadership.",
    ideal_answer:
      "Use STAR: Situation (context, team size). Task (goal, challenge). Action (what you did—delegated, decided, motivated; be specific). Result (outcome with a metric or tangible impact—e.g. delivered on time, improved score by X).",
    rubric_json: BEHAVIORAL_RUBRIC,
  },
  {
    track: "behavioral",
    difficulty: 2,
    tags: ["Failure"],
    prompt: "Tell me about a time you failed.",
    ideal_answer:
      "Pick a real example. Situation and Task briefly. Action: what you did wrong or what was out of your control. Result: what you learned and how you applied it (specific change in behavior or process). Show accountability and growth.",
    rubric_json: BEHAVIORAL_RUBRIC,
  },
  {
    track: "behavioral",
    difficulty: 2,
    tags: ["Conflict"],
    prompt: "Describe a conflict you had with a teammate or superior.",
    ideal_answer:
      "STAR: Situation (professional context, no blame). Task (goal or deadline at stake). Action (how you addressed it—listened, proposed solution, escalated if needed). Result (resolution and relationship outcome). Show maturity and focus on resolution.",
    rubric_json: BEHAVIORAL_RUBRIC,
  },
  {
    track: "behavioral",
    difficulty: 2,
    tags: ["Strength"],
    prompt: "What is your greatest strength?",
    ideal_answer:
      "Name one strength with a short example. E.g. 'I'm analytical—in my last role I built a model that identified X, which led to Y.' Tie to the job: modeling, teamwork, or client focus.",
    rubric_json: BEHAVIORAL_RUBRIC,
  },
  {
    track: "behavioral",
    difficulty: 2,
    tags: ["Weakness"],
    prompt: "What is your greatest weakness?",
    ideal_answer:
      "Real weakness, not a humble brag. Show self-awareness and what you're doing to improve. E.g. 'I used to overcommit; now I block focus time and communicate deadlines earlier.' Keep it brief and professional.",
    rubric_json: BEHAVIORAL_RUBRIC,
  },
  {
    track: "behavioral",
    difficulty: 2,
    tags: ["Teamwork"],
    prompt: "Give an example of working in a team under pressure.",
    ideal_answer:
      "Situation (deadline, stakes). Task (your role). Action (how you coordinated, communicated, or stepped up). Result (delivered on time, client feedback, or lesson learned). Include a specific detail (timeline, size of team, outcome).",
    rubric_json: BEHAVIORAL_RUBRIC,
  },
  {
    track: "behavioral",
    difficulty: 3,
    tags: ["Deal experience"],
    prompt: "Describe a deal or project you worked on.",
    ideal_answer:
      "Context (type of deal, your role). Your contribution (model, diligence, coordination). Outcome (signed, closed, or key takeaway). Be concise; have 2–3 bullet points in mind. Quantify if possible (size, timeline).",
    rubric_json: BEHAVIORAL_RUBRIC,
  },
  {
    track: "behavioral",
    difficulty: 3,
    tags: ["Handling feedback"],
    prompt: "Tell me about a time you received critical feedback.",
    ideal_answer:
      "Situation (who, when). The feedback (brief). Action (how you responded—listened, asked questions, changed behavior). Result (improved outcome or relationship). Show coachability.",
    rubric_json: BEHAVIORAL_RUBRIC,
  },
  {
    track: "behavioral",
    difficulty: 1,
    tags: ["Fit"],
    prompt: "Where do you see yourself in five years?",
    ideal_answer:
      "Realistic path: analyst to associate, then interest in staying in finance (IB, PE, or corp dev). Tie to skills you're building now. Avoid sounding like you're using the role as a brief stepping stone without commitment.",
    rubric_json: BEHAVIORAL_RUBRIC,
  },
  {
    track: "behavioral",
    difficulty: 2,
    tags: ["Initiative"],
    prompt: "Describe a time you took initiative without being asked.",
    ideal_answer:
      "Situation (gap or opportunity). Task (what needed to happen). Action (what you did—research, proposal, implementation). Result (impact—saved time, won a client, improved process). Be specific.",
    rubric_json: BEHAVIORAL_RUBRIC,
  },
  {
    track: "behavioral",
    difficulty: 2,
    tags: ["Resilience"],
    prompt: "Describe a time you had to overcome a setback.",
    ideal_answer:
      "STAR: Setback (missed deadline, lost deal, mistake). What you did (owned it, replanned, communicated). Result (recovered, learned, or improved process). Show resilience and accountability.",
    rubric_json: BEHAVIORAL_RUBRIC,
  },
  {
    track: "behavioral",
    difficulty: 3,
    tags: ["Prioritization"],
    prompt: "How do you prioritize when you have multiple urgent tasks?",
    ideal_answer:
      "Concrete method: urgency/importance, stakeholder alignment, or deadline order. Give a short example: 'On X project I had A, B, C due; I did A first because..., then B.' Show you communicate and deliver.",
    rubric_json: BEHAVIORAL_RUBRIC,
  },
];

async function main() {
  const all = [...technicalQuestions, ...behavioralQuestions];
  const { error } = await supabase.from("mock_questions").insert(all);
  if (error) {
    console.error("Seed failed:", error);
    process.exit(1);
  }
  console.log(`Seeded ${all.length} mock questions (25 technical, 15 behavioral).`);
}

main();
