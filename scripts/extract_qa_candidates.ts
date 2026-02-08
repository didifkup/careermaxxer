/**
 * Extract Q/A candidates from extracted PDF text using conservative heuristics.
 * Input:  scripts/out/pdf_text.txt (with === PAGE N === markers)
 * Output: scripts/out/qa_candidates.json
 * Format: { id, page, section, rawQuestionText, rawAnswerText }
 * - Numbered questions detected; "Answer:" or answer blocks where present; else rawAnswerText = "".
 */

import * as fs from "fs";
import * as path from "path";

const DIR = path.resolve(__dirname);
const INPUT = path.join(DIR, "out", "pdf_text.txt");
const OUTPUT = path.join(DIR, "out", "qa_candidates.json");

const PAGE_MARKER = /^=== PAGE (\d+) ===$/;

export type QACandidate = {
  id: string;
  page: number;
  section: string;
  rawQuestionText: string;
  rawAnswerText: string;
};

/** Conservative: line starts with number + dot or paren (e.g. "1." or "2)") */
const NUMBERED_QUESTION = /^\d+[.)]\s+/;

/** "Answer:" or "Answer :" (with optional space) */
const ANSWER_LABEL = /^\s*Answer\s*:\s*/i;

function parsePages(content: string): { page: number; text: string }[] {
  const pages: { page: number; text: string }[] = [];
  const lines = content.split(/\r?\n/);
  let currentPage = 0;
  let currentLines: string[] = [];

  for (const line of lines) {
    const match = line.match(PAGE_MARKER);
    if (match) {
      if (currentPage > 0) {
        pages.push({ page: currentPage, text: currentLines.join("\n").trim() });
      }
      currentPage = parseInt(match[1], 10);
      currentLines = [];
    } else {
      currentLines.push(line);
    }
  }
  if (currentPage > 0) {
    pages.push({ page: currentPage, text: currentLines.join("\n").trim() });
  }
  return pages;
}

/** Skip boilerplate lines at start of pages (headers, footers, page numbers). */
const BOILERPLATE =
  /^(Access the |\d+ of \d+|https?:|Return to Top|-- \d+ of \d+ --)/i;

function extractCandidatesFromPage(pageNum: number, text: string): QACandidate[] {
  const candidates: QACandidate[] = [];
  const lines = text.split(/\r?\n/);
  let section = "";
  let globalIndex = 0;
  let i = 0;

  while (i < lines.length) {
    const line = lines[i]!;
    const trimmed = line.trim();

    if (NUMBERED_QUESTION.test(trimmed)) {
      const questionLines: string[] = [trimmed];
      let j = i + 1;
      let answerStartIndex = -1;

      while (j < lines.length) {
        const next = lines[j]!;
        const nextTrimmed = next.trim();
        if (NUMBERED_QUESTION.test(nextTrimmed)) break;
        if (ANSWER_LABEL.test(nextTrimmed)) {
          answerStartIndex = j;
          break;
        }
        questionLines.push(next);
        j++;
      }

      const rawQuestionText = questionLines.join("\n").trim();
      let rawAnswerText = "";

      let nextI = j;
      if (answerStartIndex >= 0) {
        const answerLines: string[] = [];
        const answerFirst = lines[answerStartIndex]!;
        const answerMatch = answerFirst.match(ANSWER_LABEL);
        const afterLabel = answerMatch
          ? answerFirst.slice(answerFirst.indexOf(answerMatch[0]) + answerMatch[0].length).trim()
          : answerFirst.trim();
        if (afterLabel) answerLines.push(afterLabel);
        for (let k = answerStartIndex + 1; k < lines.length; k++) {
          const nl = lines[k]!;
          if (NUMBERED_QUESTION.test(nl.trim())) break;
          answerLines.push(nl);
          nextI = k + 1;
        }
        rawAnswerText = answerLines.join(" ").trim();
      }

      globalIndex += 1;
      candidates.push({
        id: `q-p${pageNum}-${globalIndex}`,
        page: pageNum,
        section,
        rawQuestionText,
        rawAnswerText,
      });
      i = answerStartIndex >= 0 ? nextI : j;
      continue;
    }

    if (
      trimmed.length > 0 &&
      trimmed.length < 100 &&
      !/^\d/.test(trimmed) &&
      !BOILERPLATE.test(trimmed)
    ) {
      section = trimmed;
    }
    i++;
  }

  return candidates;
}

function main() {
  if (!fs.existsSync(INPUT)) {
    console.error(`Input not found: ${INPUT}`);
    process.exit(1);
  }

  const content = fs.readFileSync(INPUT, "utf8");
  const pages = parsePages(content);
  const all: QACandidate[] = [];

  for (const { page, text } of pages) {
    const candidates = extractCandidatesFromPage(page, text);
    all.push(...candidates);
  }

  fs.mkdirSync(path.dirname(OUTPUT), { recursive: true });
  fs.writeFileSync(OUTPUT, JSON.stringify(all, null, 2), "utf8");
  console.log(`Wrote ${all.length} Q/A candidates to ${OUTPUT}`);
}

main();