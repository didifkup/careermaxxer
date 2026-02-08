/**
 * Load qa_candidates.json and print:
 * - Total count
 * - Top 15 sections by count
 * - 30 samples (10 accounting/finance, 10 valuation/EV/DCF, 10 M&A/merger/LBO)
 */

import * as fs from "fs";
import * as path from "path";

const OUT = path.join(path.resolve(__dirname), "out", "qa_candidates.json");

type Candidate = {
  id: string;
  page: number;
  section: string;
  rawQuestionText: string;
  rawAnswerText: string;
};

function trunc(s: string, len: number): string {
  if (!s) return "";
  return s.length <= len ? s : s.slice(0, len) + "...";
}

function main() {
  const raw = fs.readFileSync(OUT, "utf8");
  const candidates: Candidate[] = JSON.parse(raw);

  const total = candidates.length;
  const sectionCounts: Record<string, number> = {};
  for (const c of candidates) {
    const s = c.section || "(empty)";
    sectionCounts[s] = (sectionCounts[s] ?? 0) + 1;
  }
  const topSections = Object.entries(sectionCounts)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 15);

  const text = (c: Candidate) =>
    `${c.section} ${c.rawQuestionText} ${c.rawAnswerText}`.toLowerCase();
  // Prefer technical sections: Accounting ~50+, EV/DCF ~71–103, M&A/LBO ~107+
  const acc = candidates.filter((c) => {
    const t = text(c);
    const q = c.rawQuestionText.toLowerCase();
    return (
      (c.page >= 50 && c.page <= 70) &&
      /accounting|income statement|balance sheet|cash flow|financial statement|depreciation|amortization|gaap|revenue|expense|net income|deferred|working capital|goodwill|lease|free cash flow/.test(t)
    );
  });
  const val = candidates.filter((c) => {
    const t = text(c);
    return (
      (c.page >= 71 && c.page <= 106) &&
      /enterprise value|equity value|ev\/ebitda|dcf|discount|wacc|terminal value|multiple|implied value|comps|precedent|valuation methodology/.test(t)
    );
  });
  const ma = candidates.filter((c) => {
    const t = text(c);
    return (
      (c.page >= 107) &&
      /merger|m&a|acquisition|leveraged buyout|lbo|synergy|premium|accretive|dilutive|deal value|purchase price/.test(t)
    );
  });
  // Fallback: if not enough in page range, add by keyword only
  if (acc.length < 10) {
    const extra = candidates.filter(
      (c) =>
        !acc.includes(c) &&
        /income statement|balance sheet|three financial statements|depreciation|amortization|free cash flow|working capital/.test(text(c))
    );
    acc.push(...extra.slice(0, 10 - acc.length));
  }
  if (val.length < 10) {
    const extra = candidates.filter(
      (c) =>
        !val.includes(c) &&
        /enterprise value|equity value|dcf|wacc|terminal value|ev\/ebitda/.test(text(c))
    );
    val.push(...extra.slice(0, 10 - val.length));
  }
  if (ma.length < 10) {
    const extra = candidates.filter(
      (c) =>
        !ma.includes(c) &&
        /merger model|lbo|leveraged buyout|acquisition|synergy|accretive|dilutive/.test(text(c))
    );
    ma.push(...extra.slice(0, 10 - ma.length));
  }

  console.log("=== Total Q/A candidates ===\n" + total + "\n");
  console.log("=== Top 15 sections by count ===\n");
  topSections.forEach(([sec, count]) => console.log(`${count}\t${trunc(sec, 80)}`));

  console.log("\n=== 10 samples: Accounting / Finance ===\n");
  acc.slice(0, 10).forEach((c, i) => {
    console.log(`--- Sample ${i + 1} ---`);
    console.log("page:", c.page);
    console.log("section:", c.section);
    console.log("rawQuestionText:", trunc(c.rawQuestionText, 300));
    console.log("rawAnswerText:", trunc(c.rawAnswerText, 300));
    console.log("");
  });

  console.log("\n=== 10 samples: Valuation / EV / DCF ===\n");
  val.slice(0, 10).forEach((c, i) => {
    console.log(`--- Sample ${i + 1} ---`);
    console.log("page:", c.page);
    console.log("section:", c.section);
    console.log("rawQuestionText:", trunc(c.rawQuestionText, 300));
    console.log("rawAnswerText:", trunc(c.rawAnswerText, 300));
    console.log("");
  });

  console.log("\n=== 10 samples: M&A / Merger / LBO ===\n");
  ma.slice(0, 10).forEach((c, i) => {
    console.log(`--- Sample ${i + 1} ---`);
    console.log("page:", c.page);
    console.log("section:", c.section);
    console.log("rawQuestionText:", trunc(c.rawQuestionText, 300));
    console.log("rawAnswerText:", trunc(c.rawAnswerText, 300));
    console.log("");
  });
}

main();
