import { NextRequest, NextResponse } from "next/server";
import { requireAdmin } from "../auth";
import { createServiceRoleClient } from "@/lib/supabase/server";
import { parseCSV } from "@/lib/admin/csv";
import { validateQuestions, type ValidQuestionRow } from "@/lib/admin/validate-questions";

const MAX_FILE_BYTES = 5 * 1024 * 1024;
const BATCH_SIZE = 250;

export async function POST(request: NextRequest) {
  const admin = await requireAdmin();
  if ("error" in admin) return admin.error;

  const contentType = request.headers.get("content-type") ?? "";
  if (!contentType.includes("multipart/form-data")) {
    return NextResponse.json(
      { error: "Content-Type must be multipart/form-data" },
      { status: 400 }
    );
  }

  let formData: FormData;
  try {
    formData = await request.formData();
  } catch (e) {
    return NextResponse.json(
      { error: "Failed to parse form data", inserted: 0, failed: 0, errors: [] },
      { status: 400 }
    );
  }

  const file = formData.get("file");
  if (!file || !(file instanceof File)) {
    return NextResponse.json(
      { error: "No file provided", inserted: 0, failed: 0, errors: [] },
      { status: 400 }
    );
  }

  if (file.size > MAX_FILE_BYTES) {
    return NextResponse.json(
      {
        error: `File too large (max ${MAX_FILE_BYTES / 1024 / 1024}MB)`,
        inserted: 0,
        failed: 0,
        errors: [],
      },
      { status: 400 }
    );
  }

  const ext = file.name.toLowerCase().slice(-4);
  if (ext !== ".csv") {
    return NextResponse.json(
      { error: "Only .csv files are allowed", inserted: 0, failed: 0, errors: [] },
      { status: 400 }
    );
  }

  let text: string;
  try {
    text = await file.text();
  } catch (e) {
    return NextResponse.json(
      {
        error: "Failed to read file",
        inserted: 0,
        failed: 0,
        errors: [],
      },
      { status: 400 }
    );
  }

  let rows: Record<string, string>[];
  try {
    rows = parseCSV(text);
  } catch (e) {
    return NextResponse.json(
      {
        error: "Invalid CSV format",
        inserted: 0,
        failed: 0,
        errors: [e instanceof Error ? e.message : "Parse error"],
      },
      { status: 400 }
    );
  }

  const { valid, errors: validationErrors } = validateQuestions(rows);

  if (valid.length === 0) {
    return NextResponse.json({
      inserted: 0,
      failed: rows.length,
      errors: validationErrors.slice(0, 100),
    });
  }

  const supabase = createServiceRoleClient();
  let inserted = 0;
  const errors = [...validationErrors];

  for (let i = 0; i < valid.length; i += BATCH_SIZE) {
    const batch = valid.slice(i, i + BATCH_SIZE) as ValidQuestionRow[];
    const payload = batch.map((row) => ({
      topic: row.topic,
      subtopic: row.subtopic,
      difficulty: row.difficulty,
      format: row.format,
      prompt: row.prompt,
      option_a: row.option_a,
      option_b: row.option_b,
      option_c: row.option_c,
      option_d: row.option_d,
      correct_answer: row.correct_answer,
      explanation: row.explanation,
      expected_time_sec: row.expected_time_sec,
      tags: row.tags,
      is_active: true,
    }));

    const { error } = await supabase.from("questions").insert(payload);
    if (error) {
      errors.push(`Batch at row ${i + 2}: ${error.message}`);
    } else {
      inserted += batch.length;
    }
  }

  const failed = rows.length - inserted;

  return NextResponse.json({
    inserted,
    failed,
    errors: errors.slice(0, 100),
  });
}
