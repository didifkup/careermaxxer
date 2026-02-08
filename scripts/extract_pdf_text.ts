/**
 * Extract raw text from a PDF, one page at a time, with page markers.
 * Input:  scripts/in/source.pdf
 * Output: scripts/out/pdf_text.txt (markers like === PAGE 12 ===)
 */

import * as fs from "fs";
import * as path from "path";
import { PDFParse } from "pdf-parse";

const DIR = path.resolve(__dirname);
const INPUT = path.join(DIR, "in", "source.pdf");
const OUTPUT = path.join(DIR, "out", "pdf_text.txt");

async function main() {
  if (!fs.existsSync(INPUT)) {
    console.error(`Input not found: ${INPUT}`);
    process.exit(1);
  }
  const data = fs.readFileSync(INPUT);
  const parser = new PDFParse({ data });
  const info = await parser.getInfo({ parsePageInfo: true });
  const numPages = info.total;

  const lines: string[] = [];
  for (let n = 1; n <= numPages; n++) {
    const result = await parser.getText({ partial: [n] });
    lines.push(`=== PAGE ${n} ===`);
    lines.push((result.text ?? "").trim());
    lines.push("");
  }
  await parser.destroy();

  fs.mkdirSync(path.dirname(OUTPUT), { recursive: true });
  fs.writeFileSync(OUTPUT, lines.join("\n"), "utf8");
  console.log(`Wrote ${numPages} pages to ${OUTPUT}`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
