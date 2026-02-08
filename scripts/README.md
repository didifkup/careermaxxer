# PDF → Raw Q/A extraction pipeline

Extract raw text from a PDF and then detect Q/A candidates **without** rewriting or categorization.

## Folders

- `scripts/` – scripts and this README
- `scripts/in/` – put your source PDF here
- `scripts/out/` – generated `pdf_text.txt` and `qa_candidates.json`

## Dependencies

From the project root:

```bash
npm install pdf-parse
npm install -D tsx
```

- **pdf-parse** – extract text from PDF (used by `extract_pdf_text.ts`)
- **tsx** – run TypeScript scripts (or use `npx ts-node` if you prefer)

## Steps

1. **Put the PDF in place**
   - Copy your PDF to `scripts/in/source.pdf`.

2. **Extract PDF text (with page markers)**
   - Input: `scripts/in/source.pdf`
   - Output: `scripts/out/pdf_text.txt`
   - Page markers: `=== PAGE 1 ===`, `=== PAGE 2 ===`, …

3. **Extract Q/A candidates**
   - Input: `scripts/out/pdf_text.txt`
   - Output: `scripts/out/qa_candidates.json`
   - Each candidate: `{ id, page, section, rawQuestionText, rawAnswerText }`
   - Heuristics: numbered questions (e.g. `1.`, `2)`), “Answer:” or answer blocks; if no answer, `rawAnswerText` is `""`.

## Exact commands (from project root)

```bash
# 1. Install dependencies (once)
npm install pdf-parse
npm install -D tsx

# 2. Place your PDF
#    Copy your file to:  scripts/in/source.pdf

# 3. Extract text from PDF
npx tsx scripts/extract_pdf_text.ts

# 4. Extract Q/A candidates
npx tsx scripts/extract_qa_candidates.ts
```

Outputs:

- `scripts/out/pdf_text.txt` – full text with `=== PAGE N ===` markers
- `scripts/out/qa_candidates.json` – array of `{ id, page, section, rawQuestionText, rawAnswerText }`

No categorization or rewriting is done in this pipeline.
