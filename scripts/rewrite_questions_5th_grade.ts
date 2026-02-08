/**
 * Rewrite practice questions to 5th-grade level.
 * Input: practice_candidates.json, node_mapping_existing.json
 * Output: rewritten_questions_existing.json
 * Rules: short sentences (<=15 words), plain-English jargon, 3–5 MC choices, explainLikeIm5 in 2–5 sentences.
 */

import * as fs from "fs";
import * as path from "path";

const DIR = path.resolve(__dirname);
const PRACTICE_PATH = path.join(DIR, "out", "practice_candidates.json");
const MAPPING_PATH = path.join(DIR, "out", "node_mapping_existing.json");
const OUTPUT_PATH = path.join(DIR, "out", "rewritten_questions_existing.json");

const MAX_WORDS_PER_SENTENCE = 15;
const MAX_SENTENCES_EXPLAIN = 5;
const MIN_CHOICES = 3;
const MAX_CHOICES = 5;

type PracticeCandidate = {
  id: string;
  page: number;
  section: string;
  rawQuestionText: string;
  rawAnswerText: string;
  bucket: string;
};

type NodeMapping = { coreQuestionIds: string[]; drillQuestionIds: string[] };
type MappingFile = { nodes: Record<string, NodeMapping>; unmappedQuestionIds: string[] };

type RewrittenQuestion = {
  id: string;
  nodeId: string;
  difficulty: "core" | "drill";
  prompt: string;
  choices: string[];
  correctIndex: number;
  explainLikeIm5: string;
  originalQuestionText: string;
  originalAnswerText: string;
  page: number;
  section: string;
};

/** Jargon → plain English (brief). */
const JARGON: Record<string, string> = {
  EBITDA: "earnings before interest, taxes, and non-cash items (a profit measure)",
  "Discount Rate": "the return you could get from similar investments",
  WACC: "the average cost of using both debt and equity (like a blended interest rate)",
  "Present Value": "what future money is worth today",
  "Net Present Value": "present value minus what you pay today",
  IRR: "the rate of return that makes an investment break even",
  "Equity Value": "what the company is worth to shareholders",
  "Enterprise Value": "what the whole business is worth to all investors",
  Revenue: "money from sales (before costs)",
  Expenses: "costs of running the business",
  "Net Income": "profit after all costs and taxes",
  "Income Statement": "a report showing revenue, costs, and profit over time",
  "Balance Sheet": "a snapshot of what a company owns and owes",
  "Cash Flow Statement": "a report showing where cash came from and went",
  "Free Cash Flow": "cash left after running the business and buying equipment",
  "Terminal Value": "estimated value of a business after the forecast period",
  "Working Capital": "short-term assets minus short-term liabilities",
  Depreciation: "spreading the cost of an asset over time",
  Amortization: "spreading the cost of an intangible asset over time",
};

function shortenSentence(s: string, maxWords: number = MAX_WORDS_PER_SENTENCE): string {
  const words = s.trim().split(/\s+/).filter(Boolean);
  if (words.length <= maxWords) return s.trim();
  return words.slice(0, maxWords).join(" ") + (words.length > maxWords ? "." : "");
}

function shortenParagraph(p: string, maxSentences: number = 10): string {
  const sentences = p
    .split(/[.!?]+/)
    .map((s) => s.trim())
    .filter((s) => s.length > 0);
  return sentences
    .slice(0, maxSentences)
    .map((s) => shortenSentence(s))
    .join(". ");
}

function replaceJargon(text: string): string {
  let out = text;
  // Replace phrases first so "Deferred Revenue" and "Accounts Receivable" don't become "Deferred money from sales..."
  out = out.replace(/\bDeferred Revenue\b/gi, "money received in advance for future sales");
  out = out.replace(/\bAccounts Receivable\b/gi, "money customers owe the company");
  out = out.replace(/\bEnterprise Value\b/gi, JARGON["Enterprise Value"]!);
  out = out.replace(/\bEquity Value\b/gi, JARGON["Equity Value"]!);
  for (const [term, plain] of Object.entries(JARGON)) {
    if (term === "Revenue" || term === "Equity Value" || term === "Enterprise Value") continue;
    const re = new RegExp("\\b" + term.replace(/[.*+?^${}()|[\]\\]/g, "\\$&") + "\\b", "gi");
    out = out.replace(re, plain);
  }
  return out;
}

const PAGE_FOOTER = /--\s*\d+\s+of\s+\d+\s*--|Return to Top\.?/gi;

/** Get first line or first sentence as question stem; rest as answer (no footers). */
function extractQandA(raw: string): { question: string; answer: string } {
  const cleaned = raw.replace(PAGE_FOOTER, " ").trim();
  const lines = cleaned.split(/\n/).map((s) => s.trim()).filter(Boolean);
  const firstLine = lines[0] ?? "";
  const stem = firstLine.replace(/^\s*\d+[.)]\s*/, "").trim();
  const rest = lines.slice(1).join(" ").replace(PAGE_FOOTER, " ").trim();
  const answerMatch =
    rest.match(/^(?:No\.|Yes\.)\s*([\s\S]+)/) || rest.match(/^([\s\S]+?)(?:\.\s+--\s|\n\n--)/);
  let answer = answerMatch ? (answerMatch[1] ?? rest).trim() : rest;
  answer = answer.replace(PAGE_FOOTER, " ").trim().slice(0, 800);
  return {
    question: stem,
    answer,
  };
}

/** Build 2–5 short sentences for explainLikeIm5. */
function buildExplain(answer: string): string {
  const simplified = replaceJargon(answer);
  const sentences = simplified
    .split(/[.!?]+/)
    .map((s) => s.trim())
    .filter((s) => s.length > 10);
  const short = sentences
    .slice(0, MAX_SENTENCES_EXPLAIN)
    .map((s) => shortenSentence(s))
    .filter((s) => s.length > 0);
  return short.join(". ").trim() || "See the original answer above.";
}

/** Pick one correct phrase from answer; build wrong choices from distractors. */
function buildChoices(
  questionStem: string,
  answer: string,
  nodeId: string
): { choices: string[]; correctIndex: number } {
  const lower = answer.toLowerCase();
  const stem = questionStem.toLowerCase();

  const genericWrong = [
    "It depends on the company.",
    "There is no single right answer.",
    "Both A and B.",
    "None of the above.",
    "Not enough information.",
  ];

  const byNode: Record<string, string[]> = {
    "node-revenue": ["Expenses", "Profit", "Cash flow", "Assets"],
    "node-expenses": ["Revenue", "Profit", "Equity", "Sales"],
    "node-profit": ["Revenue only", "Expenses only", "Assets minus liabilities", "Cash in the bank"],
    "node-ebitda": ["Net income only", "Revenue minus expenses", "Cash flow", "Total assets"],
    "node-valuation-basics": ["Only equity matters.", "Only debt matters.", "Revenue times 10.", "It is the same as book value."],
    "node-multiples": ["Revenue only", "Profit divided by revenue", "Debt divided by equity", "Growth rate times 2"],
    "node-comps": ["Only private companies", "Only past deals", "Only one company", "Only revenue"],
    "node-why-discounting": ["Inflation only", "Taxes", "Because banks say so", "It does not matter."],
    "node-dcf-idea": ["Only past cash flows", "Revenue minus expenses", "Stock price times shares", "Book value"],
    "node-revenue-growth": ["Profit growth", "Expense growth", "Asset growth", "Debt growth"],
    "node-margins": ["Revenue", "Total sales", "Assets", "Cash balance"],
  };

  let correct = "";
  if (lower.includes("time value") && (lower.includes("invest") || lower.includes("today"))) {
    correct = "Money today can earn more by next year if you invest it.";
  } else if (lower.includes("discount rate") && lower.includes("opportunity")) {
    correct = "The return you could get from similar investments.";
  } else if (lower.includes("wacc") || lower.includes("weighted average cost")) {
    correct = "The average cost of using both debt and equity.";
  } else if (lower.includes("present value") && !lower.includes("net present")) {
    correct = "What future money is worth today.";
  } else if (lower.includes("net present value") || lower.includes("npv")) {
    correct = "Present value minus what you pay today.";
  } else if (lower.includes("irr") || lower.includes("internal rate of return")) {
    correct = "The return rate that makes the investment break even.";
  } else if (lower.includes("three") && lower.includes("financial statement")) {
    correct = "Income statement, balance sheet, and cash flow statement.";
  } else if (lower.includes("link") && lower.includes("statement")) {
    correct = "Net income from the income statement goes to the top of the cash flow statement.";
  } else if (lower.includes("most important") && lower.includes("statement")) {
    correct = "The cash flow statement, because it shows actual cash.";
  } else if (lower.includes("equity value") && lower.includes("enterprise value")) {
    correct = "Equity value is what shareholders own; enterprise value is the whole business.";
  } else if (lower.includes("enterprise value") && (lower.includes("equity") || lower.includes("debt") || lower.includes("cash"))) {
    correct = "Equity value minus cash plus debt (and similar adjustments).";
  } else if (lower.includes("ebitda")) {
    correct = "Earnings before interest, taxes, depreciation, and amortization.";
  } else if (lower.includes("revenue") && stem.includes("what")) {
    correct = "Money from sales before costs are subtracted.";
  } else if (lower.includes("expense")) {
    correct = "Costs of running the business.";
  } else if (lower.includes("profit") || lower.includes("net income")) {
    correct = "What is left after subtracting costs from revenue.";
  } else if (lower.includes("multiple") || lower.includes("ev/ebitda") || lower.includes("p/e")) {
    correct = "Value divided by a metric (e.g. value ÷ profit).";
  } else if (lower.includes("comparable") || lower.includes("comps")) {
    correct = "Value by comparing to similar companies.";
  } else if (lower.includes("dcf") || lower.includes("discount") && lower.includes("cash flow")) {
    correct = "Project future cash flows, discount them to today, and add them up.";
  } else if (lower.includes("margin")) {
    correct = "Profit as a share of revenue (e.g. profit ÷ revenue).";
  } else {
    const firstSentence = answer.split(/[.!?]/)[0]?.trim() ?? "";
    correct = shortenSentence(replaceJargon(firstSentence), 12) || "The first option below.";
  }

  const wrongPool = byNode[nodeId] ?? genericWrong;
  const wrong = wrongPool.slice(0, MAX_CHOICES - 1);
  const allChoices = [correct, ...wrong].filter((c, i, a) => !a.slice(0, i).includes(c));
  const extraWrong = genericWrong.filter((w) => !allChoices.includes(w));
  for (let i = 0; allChoices.length < MIN_CHOICES && i < extraWrong.length; i++) {
    allChoices.push(extraWrong[i]!);
  }
  // Drop choices that look like page footers or are too short/long
  const sanitized = allChoices.filter(
    (c) => !/--\s*\d+.*of\s*\d+--/.test(c) && c.length >= 3 && c.length <= 120
  );
  let final = sanitized.length >= MIN_CHOICES ? sanitized : allChoices;
  let correctIndex = final.indexOf(correct);
  if (correctIndex < 0) {
    final = [correct, ...final.filter((c) => c !== correct)].slice(0, MAX_CHOICES);
    correctIndex = 0;
  }
  return { choices: final, correctIndex };
}

function rewriteOne(
  c: PracticeCandidate,
  nodeId: string,
  difficulty: "core" | "drill"
): RewrittenQuestion {
  const { question, answer } = extractQandA(c.rawQuestionText);
  const answerText = c.rawAnswerText || answer;
  const promptShort = shortenParagraph(replaceJargon(question), 2);
  const prompt = promptShort.length > 0 ? promptShort : shortenSentence(question);
  const { choices, correctIndex } = buildChoices(question, answerText, nodeId);
  const explainLikeIm5 = buildExplain(answerText);

  return {
    id: c.id,
    nodeId,
    difficulty,
    prompt,
    choices,
    correctIndex,
    explainLikeIm5,
    originalQuestionText: c.rawQuestionText.slice(0, 500),
    originalAnswerText: (c.rawAnswerText || answer).slice(0, 500),
    page: c.page,
    section: c.section,
  };
}

function main() {
  if (!fs.existsSync(PRACTICE_PATH) || !fs.existsSync(MAPPING_PATH)) {
    console.error("Missing input files.");
    process.exit(1);
  }

  const practice: PracticeCandidate[] = JSON.parse(fs.readFileSync(PRACTICE_PATH, "utf8"));
  const mappingFile: MappingFile = JSON.parse(fs.readFileSync(MAPPING_PATH, "utf8"));
  const byId = new Map(practice.map((c) => [c.id, c]));

  const rewritten: RewrittenQuestion[] = [];

  for (const [nodeId, nodeMap] of Object.entries(mappingFile.nodes)) {
    for (const id of nodeMap.coreQuestionIds) {
      const c = byId.get(id);
      if (c) rewritten.push(rewriteOne(c, nodeId, "core"));
    }
    for (const id of nodeMap.drillQuestionIds) {
      const c = byId.get(id);
      if (c) rewritten.push(rewriteOne(c, nodeId, "drill"));
    }
  }

  fs.mkdirSync(path.dirname(OUTPUT_PATH), { recursive: true });
  fs.writeFileSync(OUTPUT_PATH, JSON.stringify(rewritten, null, 2), "utf8");
  console.log(`Wrote ${rewritten.length} rewritten questions to ${OUTPUT_PATH}\n`);

  // --- 30 before/after pairs: 10 accounting, 10 valuation/DCF, 10 merger/LBO (or other) ---
  const accountingNodes = ["node-revenue", "node-expenses", "node-profit", "node-ebitda", "node-margins"];
  const valuationNodes = ["node-valuation-basics", "node-multiples", "node-comps", "node-why-discounting", "node-dcf-idea"];
  const otherNodes = ["node-revenue-growth", "node-capstone"];

  const accounting = rewritten.filter((q) => accountingNodes.includes(q.nodeId));
  const valuation = rewritten.filter((q) => valuationNodes.includes(q.nodeId));
  const mergerLBO = rewritten.filter((q) => q.section.toLowerCase().includes("merger") || q.section.toLowerCase().includes("lbo") || q.originalQuestionText.toLowerCase().includes("merger") || q.originalQuestionText.toLowerCase().includes("lbo"));
  const other = rewritten.filter((q) => otherNodes.includes(q.nodeId) && !accounting.includes(q) && !valuation.includes(q));

  const take = (arr: RewrittenQuestion[], n: number) => arr.slice(0, n);
  const pad = (arr: RewrittenQuestion[], n: number, from: RewrittenQuestion[]) => {
    const need = n - arr.length;
    if (need <= 0) return arr;
    const used = new Set(arr.map((q) => q.id));
    const extra = from.filter((q) => !used.has(q.id)).slice(0, need);
    return [...arr, ...extra];
  };

  const acc10 = take(accounting, 10);
  const val10 = take(valuation, 10);
  let merger10 = take(mergerLBO, 10);
  if (merger10.length < 10) merger10 = pad(merger10, 10, [...valuation, ...accounting]);

  console.log("=== 30 BEFORE/AFTER PAIRS ===\n");
  console.log("--- 10 Accounting ---\n");
  acc10.forEach((q, i) => {
    console.log(`[${i + 1}] id: ${q.id} | nodeId: ${q.nodeId}`);
    console.log("BEFORE:", (q.originalQuestionText.split("\n")[0] ?? q.originalQuestionText).slice(0, 120) + "...");
    console.log("AFTER:", q.prompt);
    console.log("CHOICES:", q.choices.slice(0, 3).join(" | "));
    console.log("");
  });
  console.log("--- 10 Valuation / DCF ---\n");
  val10.forEach((q, i) => {
    console.log(`[${i + 1}] id: ${q.id} | nodeId: ${q.nodeId}`);
    console.log("BEFORE:", (q.originalQuestionText.split("\n")[0] ?? q.originalQuestionText).slice(0, 120) + "...");
    console.log("AFTER:", q.prompt);
    console.log("CHOICES:", q.choices.slice(0, 3).join(" | "));
    console.log("");
  });
  console.log("--- 10 Merger / LBO (or other) ---\n");
  merger10.forEach((q, i) => {
    console.log(`[${i + 1}] id: ${q.id} | nodeId: ${q.nodeId}`);
    console.log("BEFORE:", (q.originalQuestionText.split("\n")[0] ?? q.originalQuestionText).slice(0, 120) + "...");
    console.log("AFTER:", q.prompt);
    console.log("CHOICES:", q.choices.slice(0, 3).join(" | "));
    console.log("");
  });
}

main();
