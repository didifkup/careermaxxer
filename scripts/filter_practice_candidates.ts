/**
 * Filter qa_candidates.json to practice_candidates.json.
 * KEEP: Finance Concepts, Accounting, EV & EV, Valuation Methodologies/Metrics, DCF, Merger Models, LBO.
 * EXCLUDE: Fit/Behavioral, Recruiting, Resume/CV, Understanding Banking, Why banking/firm, industry-specific.
 */

import * as fs from "fs";
import * as path from "path";

const DIR = path.resolve(__dirname);
const INPUT = path.join(DIR, "out", "qa_candidates.json");
const OUTPUT = path.join(DIR, "out", "practice_candidates.json");

type QACandidate = {
  id: string;
  page: number;
  section: string;
  rawQuestionText: string;
  rawAnswerText: string;
};

/** Bucket labels for kept candidates */
const BUCKETS = [
  "Finance Concepts",
  "Accounting",
  "Equity Value & Enterprise Value",
  "Valuation Methodologies",
  "Valuation Metrics and Multiples",
  "DCF",
  "Merger Models",
  "LBO Models",
] as const;

/** Inclusion: section or question must strongly match one of these patterns (per bucket). */
const INCLUSION_PATTERNS: Record<(typeof BUCKETS)[number], RegExp> = {
  "Finance Concepts": /time value of money|discount rate|wacc|irr|npv|present value|opportunity cost|cost of capital|investment decision/i,
  Accounting: /income statement|balance sheet|cash flow statement|financial statement|depreciation|amortization|gaap|ifrs|revenue|expense|net income|deferred|working capital|goodwill|lease accounting|free cash flow|accrual|accounts receivable|inventory|equity value.*enterprise value|three financial statement/i,
  "Equity Value & Enterprise Value": /equity value|enterprise value|tev|diluted equity|basic equity|noncontrolling|nci|preferred stock|net operating assets|noa|common shareholders'? equity|ev calculation|move from equity value to enterprise/i,
  "Valuation Methodologies": /valuation method|comps|comparable company|precedent transaction|dcf analysis|sum.of.the.parts|valuation methodology/i,
  "Valuation Metrics and Multiples": /multiple|ev\/ebitda|ev\/revenue|p\/e|p\/ebitda|valuation metric|comps multiple|precedent multiple|implied value/i,
  DCF: /dcf|terminal value|free cash flow|unlevered|fcf projection|discount rate|wacc|gordon growth|exit multiple|dcf assumption/i,
  "Merger Models": /merger model|accretion|dilution|accretive|dilutive|purchase price|sources and uses|m&a deal|buyer and seller|weighted cost of acquisition|seller's? yield/i,
  "LBO Models": /lbo|leveraged buyout|leveraged buy.out|debt and equity|irr.*exit|exit multiple|lbo model|sponsor|sources.*uses.*lbo/i,
};

/** Exclusion: if section or question matches any of these, drop the candidate. */
const EXCLUSION_PATTERNS: RegExp[] = [
  // Fit / Behavioral
  /fit\s*question|behavioral|walk me through your resume|tell me about yourself|why are you here today/i,
  /big 5|teamwork|leadership|strengths and weaknesses|flaws and failures|short stories?|your story/i,
  /ethical dilemma|stepped up.*leadership|difficult situation.*leader/i,
  /what are your (strengths|weaknesses|failure)|greatest (strength|weakness)/i,
  /feedback.*internship|feedback.*job/i,
  /explain or justify your.*real weakness|objections bankers will raise|you knew about banking|thought you wanted to do consulting/i,
  // Recruiting
  /recruiting process|recruitment|hirevue|sophomore|internship.*apply/i,
  // Resume / CV
  /resume\/cv|resume walkthrough|three most impressive.*resume|entries on your resume/i,
  // Understanding Banking
  /understanding banking|how do companies select.*banks|pitch book|groups at (an )?investment bank|ipo process|sell-side|buy-side|debt issuance/i,
  /walk me through (the )?process of (a )?(typical )?(sell-side|buy-side)|leveraged buyout.*how the process works/i,
  /you become an investment banker.*financial advisor|how would you add value/i,
  // Why banking / why our firm
  /why investment banking|why our bank|why (this |our )?firm|why (did you )?(attend|quit|choose)/i,
  // Outside the box
  /outside the box|other (banks|firms).*applying|which groups.*interested|received offers|rotational program|questions for me/i,
  // Discussing transaction experience (deal discussion in interviews)
  /discussing transaction experience|how to discuss your (own )?deals|deal (you worked on|experience)/i,
  /background information.*celsius|deal rationale.*revenue growth|premium paid.*deal multiple|your opinion of the deal/i,
  /were there any unusual deal terms|earnout/i,
  /company background.*leveraged buyout|your personal contributions|unique contributions to this deal|how did you move the process forward/i,
  /regulated multi-utility|electricity, gas, and water.*segment|spac vs\.?\s*ipo|spac process|going public/i,
  // Industry-specific (section or question clearly from industry section)
  /consumer\/retail|retail|dcm|leveraged finance|levfin|distressed|restructuring|ecm|equity capital market/i,
  /financial institutions group|fig|financial sponsors|fsg|healthcare|biotech|industrials/i,
  /metals and mining|mining|oil and gas|power and utilities|utilities/i,
  /private capital advisory|secondaries|private companies|project finance|infrastructure/i,
  /real estate (properties|investment)|reit|renewables|technology,? media|tmt|telecom/i,
];

function getText(c: QACandidate): string {
  return `${c.section} ${c.rawQuestionText}`.toLowerCase();
}

function matchesExclusion(c: QACandidate): boolean {
  const text = getText(c);
  return EXCLUSION_PATTERNS.some((re) => re.test(text));
}

function getBucket(c: QACandidate): (typeof BUCKETS)[number] | null {
  const text = getText(c);
  for (const bucket of BUCKETS) {
    if (INCLUSION_PATTERNS[bucket].test(text)) return bucket;
  }
  return null;
}

function main() {
  if (!fs.existsSync(INPUT)) {
    console.error(`Input not found: ${INPUT}`);
    process.exit(1);
  }

  const raw = fs.readFileSync(INPUT, "utf8");
  const candidates: QACandidate[] = JSON.parse(raw);

  const kept: (QACandidate & { bucket: (typeof BUCKETS)[number] })[] = [];
  const excluded: QACandidate[] = [];

  for (const c of candidates) {
    if (matchesExclusion(c)) {
      excluded.push(c);
      continue;
    }
    const bucket = getBucket(c);
    if (bucket) {
      kept.push({ ...c, bucket });
    } else {
      excluded.push(c);
    }
  }

  fs.mkdirSync(path.dirname(OUTPUT), { recursive: true });
  fs.writeFileSync(OUTPUT, JSON.stringify(kept, null, 2), "utf8");

  console.log("Kept count:", kept.length);
  console.log("Excluded count:", excluded.length);

  // 25 samples across categories: aim for ~3 per bucket, then fill
  const byBucket: Record<string, (typeof kept)[0][]> = {};
  for (const b of BUCKETS) byBucket[b] = [];
  for (const k of kept) byBucket[k.bucket].push(k);

  const samples: (typeof kept)[0][] = [];
  const perBucket = Math.max(1, Math.floor(25 / BUCKETS.length));
  for (const b of BUCKETS) {
    samples.push(...byBucket[b].slice(0, perBucket));
  }
  let need = 25 - samples.length;
  if (need > 0) {
    for (const b of BUCKETS) {
      const already = samples.filter((s) => s.bucket === b).length;
      const more = byBucket[b].slice(already, already + Math.ceil(need / BUCKETS.length));
      for (const m of more) {
        if (samples.length >= 25) break;
        samples.push(m);
      }
    }
  }
  const finalSamples = samples.slice(0, 25);

  console.log("\n--- 25 kept samples across categories ---\n");
  function trunc(s: string, len: number) {
    return !s ? "" : s.length <= len ? s : s.slice(0, len) + "...";
  }
  finalSamples.forEach((s, i) => {
    console.log(`[${i + 1}] bucket: ${s.bucket} | page: ${s.page} | section: ${trunc(s.section, 50)}`);
    console.log(`    Q: ${trunc(s.rawQuestionText, 200)}`);
    console.log("");
  });
}

main();
