/**
 * Map practice_candidates.json into the existing 12 curriculum nodes.
 * Input: scripts/out/practice_candidates.json, src/lib/curriculum.ts NODES
 * Output: scripts/out/node_mapping_existing.json
 * Per node: coreQuestionIds (best 5, beginner-friendly), drillQuestionIds (up to 30).
 * Unmapped → unmappedQuestionIds.
 */

import * as fs from "fs";
import * as path from "path";
import { NODES } from "../src/lib/curriculum";

const DIR = path.resolve(__dirname);
const INPUT = path.join(DIR, "out", "practice_candidates.json");
const OUTPUT = path.join(DIR, "out", "node_mapping_existing.json");

const CORE_PER_NODE = 5;
const DRILL_MAX_PER_NODE = 30;

type PracticeCandidate = {
  id: string;
  page: number;
  section: string;
  rawQuestionText: string;
  rawAnswerText: string;
  bucket: string;
};

type NodeMapping = {
  coreQuestionIds: string[];
  drillQuestionIds: string[];
};

/** 12 node IDs from curriculum (order preserved). */
const NODE_IDS = NODES.map((n) => n.id);

/** Return first line of question (stem) for scoring. */
function getStem(c: PracticeCandidate): string {
  const first = c.rawQuestionText.split(/\n/)[0] ?? "";
  return first.replace(/^\s*\d+[.)]\s*/, "").trim();
}

/** Beginner-friendly: short stem, foundational wording. Higher = more beginner-friendly. */
function beginnerScore(c: PracticeCandidate): number {
  const stem = getStem(c).toLowerCase();
  let score = 0;
  if (stem.length < 80) score += 2;
  if (stem.length < 120) score += 1;
  if (/^what (is|are|does)/.test(stem) || /^explain\s/.test(stem)) score += 2;
  if (/what (is|are) the three|how do the (financial )?statements link|why do we need/.test(stem)) score += 2;
  if (/how do you calculate|walk me through|step by step/.test(stem)) score -= 1;
  if (stem.includes("?") && stem.length < 100) score += 1;
  return score;
}

/** Map candidate to one node ID or null (unmapped). */
function mapToNode(c: PracticeCandidate): string | null {
  const text = `${c.section} ${c.rawQuestionText}`.toLowerCase();
  const stem = getStem(c).toLowerCase();
  const bucket = c.bucket;

  // Merger and LBO have no dedicated nodes → unmapped
  if (bucket === "Merger Models" || bucket === "LBO Models") return null;

  // Finance Concepts → Why discounting exists
  if (bucket === "Finance Concepts") return "node-why-discounting";

  // Equity Value & Enterprise Value → Valuation basics
  if (bucket === "Equity Value & Enterprise Value") return "node-valuation-basics";

  // Valuation Methodologies → Comps
  if (bucket === "Valuation Methodologies") return "node-comps";

  // Valuation Metrics and Multiples → Multiples
  if (bucket === "Valuation Metrics and Multiples") return "node-multiples";

  // DCF → DCF idea
  if (bucket === "DCF") return "node-dcf-idea";

  // Accounting → split by topic
  if (bucket === "Accounting") {
    if (/ebitda|earnings before interest/i.test(text) && !/ev\/ebitda|multiple|tev\/ebitda/i.test(stem)) return "node-ebitda";
    if (/margin|gross margin|operating margin|net margin/i.test(text)) return "node-margins";
    if (/revenue|top line|sales|recogni(z|s)ed/i.test(stem) && !/expense|profit|net income|margin/i.test(stem)) return "node-revenue";
    if (/expense|depreciation|amortization|cost of (goods|revenue)|cogs|d&a/i.test(stem)) return "node-expenses";
    if (/growth|growth rate|year.over.year|yoy/i.test(stem) && /revenue|sales|top line/i.test(text)) return "node-revenue-growth";
    // Default: profit / statements
    return "node-profit";
  }

  // Revenue growth (from any bucket)
  if (/revenue growth|growth rate.*revenue|how fast.*(revenue|sales)/i.test(stem)) return "node-revenue-growth";
  if (/margin|gross|operating margin|net margin/i.test(stem)) return "node-margins";

  return null;
}

function main() {
  if (!fs.existsSync(INPUT)) {
    console.error(`Input not found: ${INPUT}`);
    process.exit(1);
  }

  const raw = fs.readFileSync(INPUT, "utf8");
  const candidates: PracticeCandidate[] = JSON.parse(raw);

  const byNode: Record<string, PracticeCandidate[]> = {};
  for (const id of NODE_IDS) byNode[id] = [];
  const unmapped: PracticeCandidate[] = [];

  for (const c of candidates) {
    const nodeId = mapToNode(c);
    if (nodeId) byNode[nodeId].push(c);
    else unmapped.push(c);
  }

  const mapping: Record<string, NodeMapping> = {};
  for (const nodeId of NODE_IDS) {
    const list = byNode[nodeId];
    const withScore = list.map((c) => ({ c, score: beginnerScore(c) }));
    withScore.sort((a, b) => b.score - a.score);
    const core = withScore.slice(0, CORE_PER_NODE).map((x) => x.c.id);
    const drill = withScore.slice(CORE_PER_NODE, CORE_PER_NODE + DRILL_MAX_PER_NODE).map((x) => x.c.id);
    mapping[nodeId] = { coreQuestionIds: core, drillQuestionIds: drill };
  }

  const unmappedIds = unmapped.map((c) => c.id);

  const out = {
    nodes: mapping,
    unmappedQuestionIds: unmappedIds,
  };

  fs.mkdirSync(path.dirname(OUTPUT), { recursive: true });
  fs.writeFileSync(OUTPUT, JSON.stringify(out, null, 2), "utf8");

  // --- Print summary ---
  console.log("Per-node mapped counts (assigned → core + drill in output):\n");
  let totalInOutput = 0;
  for (const nodeId of NODE_IDS) {
    const m = mapping[nodeId];
    const node = NODES.find((n) => n.id === nodeId);
    const title = node?.title ?? nodeId;
    const assigned = byNode[nodeId].length;
    const coreCount = m.coreQuestionIds.length;
    const drillCount = m.drillQuestionIds.length;
    totalInOutput += coreCount + drillCount;
    console.log(`  ${nodeId} (${title}): ${assigned} assigned → core ${coreCount}, drill ${drillCount}`);
  }
  console.log("\nTotal in output (core + drill across nodes):", totalInOutput);
  console.log("Unmapped count:", unmappedIds.length);
  console.log("\n--- 10 unmapped examples (for deciding new nodes later) ---\n");
  unmapped.slice(0, 10).forEach((c, i) => {
    const stem = getStem(c);
    console.log(`[${i + 1}] id: ${c.id} | bucket: ${c.bucket} | page: ${c.page}`);
    console.log(`    Q: ${stem.slice(0, 120)}${stem.length > 120 ? "..." : ""}`);
    console.log("");
  });
}

main();
