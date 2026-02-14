"use client";

import { useState, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { previewCSV } from "@/lib/admin/csv";

type Result = {
  inserted: number;
  failed: number;
  errors: string[];
} | null;

export function ImportClient() {
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<{ rowCount: number } | null>(null);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<Result>(null);
  const [dragOver, setDragOver] = useState(false);

  const handleFile = useCallback((f: File | null) => {
    setFile(f);
    setResult(null);
    if (!f) {
      setPreview(null);
      return;
    }
    if (f.name.toLowerCase().slice(-4) !== ".csv") {
      setPreview(null);
      return;
    }
    const reader = new FileReader();
    reader.onload = () => {
      try {
        const text = String(reader.result ?? "");
        const { rowCount } = previewCSV(text, 5);
        setPreview({ rowCount });
      } catch {
        setPreview(null);
      }
    };
    reader.readAsText(f);
  }, []);

  const onDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      setDragOver(false);
      const f = e.dataTransfer.files[0];
      if (f) handleFile(f);
    },
    [handleFile]
  );

  const onDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(true);
  }, []);

  const onDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
  }, []);

  const onInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const f = e.target.files?.[0];
      handleFile(f ?? null);
    },
    [handleFile]
  );

  const onSubmit = useCallback(async () => {
    if (!file) return;
    setLoading(true);
    setResult(null);
    try {
      const formData = new FormData();
      formData.append("file", file);
      const res = await fetch("/api/admin/import-questions", {
        method: "POST",
        body: formData,
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        setResult({
          inserted: data.inserted ?? 0,
          failed: data.failed ?? 0,
          errors: data.error ? [data.error] : (Array.isArray(data.errors) ? data.errors : []),
        });
      } else {
        setResult({
          inserted: data.inserted ?? 0,
          failed: data.failed ?? 0,
          errors: Array.isArray(data.errors) ? data.errors : [],
        });
      }
    } catch {
      setResult({
        inserted: 0,
        failed: 0,
        errors: ["Network error"],
      });
    } finally {
      setLoading(false);
    }
  }, [file]);

  return (
    <div className="mx-auto max-w-2xl space-y-8 py-8">
      <div>
        <h1 className="font-display text-2xl font-bold text-brand-primary">
          Import questions
        </h1>
        <p className="mt-1 text-sm text-text-secondary">
          Upload a CSV to add questions to the Arena bank.
        </p>
      </div>

      <div
        onDrop={onDrop}
        onDragOver={onDragOver}
        onDragLeave={onDragLeave}
        className={`rounded-xl border-2 border-dashed p-8 text-center transition-colors ${
          dragOver
            ? "border-brand-primary bg-brand-primary/5"
            : "border-black/15 bg-black/[0.02]"
        }`}
      >
        <input
          type="file"
          accept=".csv"
          onChange={onInputChange}
          className="sr-only"
          id="csv-upload"
        />
        <label
          htmlFor="csv-upload"
          className="cursor-pointer text-sm font-medium text-brand-primary hover:underline"
        >
          Choose CSV file
        </label>
        <p className="mt-2 text-sm text-text-secondary">
          or drag and drop here
        </p>
        {file && (
          <div className="mt-4 space-y-1 text-left text-sm">
            <p className="font-medium text-text-primary">{file.name}</p>
            <p className="text-text-secondary">
              {(file.size / 1024).toFixed(1)} KB
            </p>
            {preview != null && (
              <p className="text-text-secondary">
                ~{preview.rowCount} row{preview.rowCount !== 1 ? "s" : ""}
              </p>
            )}
          </div>
        )}
      </div>

      <div className="flex gap-3">
        <Button
          onClick={onSubmit}
          disabled={!file || loading}
        >
          {loading ? "Importing…" : "Import questions"}
        </Button>
      </div>

      {loading && (
        <div className="flex items-center gap-2 text-sm text-text-secondary">
          <span
            className="inline-block h-4 w-4 animate-spin rounded-full border-2 border-brand-primary border-t-transparent"
            aria-hidden
          />
          Uploading and validating…
        </div>
      )}

      {result && !loading && (
        <div className="space-y-4 rounded-xl border border-black/10 bg-surface-raised p-6">
          {result.inserted > 0 && (
            <div
              className="rounded-lg border border-green-500/30 bg-green-500/10 px-4 py-3 text-sm font-medium text-green-800"
              role="alert"
            >
              Question bank updated successfully.
            </div>
          )}
          <div className="flex flex-wrap gap-4 text-sm">
            <span className="text-text-primary">
              Inserted: <strong>{result.inserted}</strong>
            </span>
            <span className="text-text-primary">
              Failed: <strong>{result.failed}</strong>
            </span>
          </div>
          {result.errors.length > 0 && (
            <div>
              <p className="mb-2 text-sm font-medium text-text-primary">
                Errors
              </p>
              <ul className="max-h-60 list-inside list-disc space-y-1 overflow-y-auto rounded border border-black/10 bg-black/5 p-3 text-xs text-text-secondary">
                {result.errors.map((err, i) => (
                  <li key={i}>{err}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}

      <p className="text-sm text-text-secondary">
        <a href="/arena" className="text-brand-primary hover:underline">
          Back to Arena
        </a>
      </p>
    </div>
  );
}
