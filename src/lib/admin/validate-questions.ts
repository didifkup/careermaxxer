/**
 * Validate parsed CSV rows for questions table. Returns valid rows and errors.
 */

const FORMATS = new Set(["mcq", "multi", "fill", "drag"]);
const MCQ_OPTIONS = ["a", "b", "c", "d"];
const CORRECT_ANSWER_MCQ = new Set(["A", "B", "C", "D"]);

export interface ValidQuestionRow {
  topic: string;
  subtopic: string;
  difficulty: number;
  format: string;
  prompt: string;
  option_a: string | null;
  option_b: string | null;
  option_c: string | null;
  option_d: string | null;
  correct_answer: string;
  explanation: string;
  expected_time_sec: number;
  tags: string[] | null;
}

function get(row: Record<string, string>, key: string): string {
  const v = row[key] ?? row[key.toLowerCase()] ?? "";
  return String(v).trim();
}

function parseTags(tagsStr: string): string[] | null {
  const s = tagsStr.trim();
  if (!s) return null;
  return s
    .split(",")
    .map((t) => t.trim())
    .filter(Boolean);
}

export function validateQuestions(
  rows: Record<string, string>[]
): { valid: ValidQuestionRow[]; errors: string[] } {
  const valid: ValidQuestionRow[] = [];
  const errors: string[] = [];

  for (let i = 0; i < rows.length; i++) {
    const row = rows[i]!;
    const rowNum = i + 2;

    const topic = get(row, "topic");
    const subtopic = get(row, "subtopic");
    const difficultyRaw = get(row, "difficulty");
    const format = get(row, "format").toLowerCase();
    const prompt = get(row, "prompt");
    const option_a = get(row, "option_a") || null;
    const option_b = get(row, "option_b") || null;
    const option_c = get(row, "option_c") || null;
    const option_d = get(row, "option_d") || null;
    const correct_answer = get(row, "correct_answer");
    const explanation = get(row, "explanation");
    const expectedTimeRaw = get(row, "expected_time_sec");
    const tagsStr = get(row, "tags");

    if (!topic) {
      errors.push(`Row ${rowNum}: topic is required`);
      continue;
    }
    if (!subtopic) {
      errors.push(`Row ${rowNum}: subtopic is required`);
      continue;
    }
    if (!prompt) {
      errors.push(`Row ${rowNum}: prompt is required`);
      continue;
    }
    if (!explanation) {
      errors.push(`Row ${rowNum}: explanation is required`);
      continue;
    }

    const difficulty = parseInt(difficultyRaw, 10);
    if (Number.isNaN(difficulty) || difficulty < 1 || difficulty > 5) {
      errors.push(`Row ${rowNum}: difficulty must be 1-5`);
      continue;
    }

    if (!FORMATS.has(format)) {
      errors.push(`Row ${rowNum}: format must be mcq, multi, fill, or drag`);
      continue;
    }

    if (format === "mcq") {
      if (!option_a || !option_b || !option_c || !option_d) {
        errors.push(`Row ${rowNum}: mcq requires option_a, option_b, option_c, option_d`);
        continue;
      }
      const ca = correct_answer.toUpperCase();
      if (!CORRECT_ANSWER_MCQ.has(ca)) {
        errors.push(`Row ${rowNum}: correct_answer must be A, B, C, or D for mcq`);
        continue;
      }
    }

    let expected_time_sec = 30;
    if (expectedTimeRaw) {
      const n = parseInt(expectedTimeRaw, 10);
      if (!Number.isNaN(n) && n >= 1) expected_time_sec = Math.min(300, n);
    }

    valid.push({
      topic,
      subtopic,
      difficulty,
      format,
      prompt,
      option_a: option_a || null,
      option_b: option_b || null,
      option_c: option_c || null,
      option_d: option_d || null,
      correct_answer: correct_answer || "",
      explanation,
      expected_time_sec,
      tags: parseTags(tagsStr),
    });
  }

  return { valid, errors };
}
