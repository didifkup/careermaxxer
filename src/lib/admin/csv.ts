/**
 * Lightweight CSV parser. No external dependencies.
 * Handles quoted fields and comma-separated values.
 */

export function parseCSV(text: string): Record<string, string>[] {
  const rows: Record<string, string>[] = [];
  const lines = splitLines(text);
  if (lines.length < 2) return rows;

  const headers = parseLine(lines[0]!);
  const headerKeys = headers.map((h) => h.trim().toLowerCase());

  for (let i = 1; i < lines.length; i++) {
    const values = parseLine(lines[i]!);
    const row: Record<string, string> = {};
    for (let j = 0; j < headerKeys.length; j++) {
      const key = headerKeys[j] ?? "col";
      row[key] = (values[j] ?? "").trim();
    }
    rows.push(row);
  }

  return rows;
}

function splitLines(text: string): string[] {
  return text.replace(/\r\n/g, "\n").replace(/\r/g, "\n").split("\n");
}

function parseLine(line: string): string[] {
  const result: string[] = [];
  let i = 0;
  while (i < line.length) {
    if (line[i] === '"') {
      let field = "";
      i++;
      while (i < line.length) {
        if (line[i] === '"') {
          i++;
          if (line[i] === '"') {
            field += '"';
            i++;
          } else {
            break;
          }
        } else {
          field += line[i];
          i++;
        }
      }
      result.push(field);
      if (line[i] === ",") i++;
    } else {
      let field = "";
      while (i < line.length && line[i] !== ",") {
        field += line[i];
        i++;
      }
      result.push(field);
      if (line[i] === ",") i++;
    }
  }
  return result;
}

/**
 * Client-side: count data rows (excluding header) and preview first N rows.
 */
export function previewCSV(text: string, previewRows = 5): { rowCount: number; preview: Record<string, string>[] } {
  const lines = splitLines(text);
  const rowCount = Math.max(0, lines.length - 1);
  if (lines.length < 2) return { rowCount: 0, preview: [] };

  const headers = parseLine(lines[0]!);
  const headerKeys = headers.map((h) => h.trim().toLowerCase());
  const preview: Record<string, string>[] = [];

  for (let i = 1; i < Math.min(previewRows + 1, lines.length); i++) {
    const values = parseLine(lines[i]!);
    const row: Record<string, string> = {};
    for (let j = 0; j < headerKeys.length; j++) {
      const key = headerKeys[j] ?? "col";
      row[key] = (values[j] ?? "").trim();
    }
    preview.push(row);
  }

  return { rowCount, preview };
}
