"use client";

import { useState } from "react";

export function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false);

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(false);
    }
  }

  return (
    <button
      type="button"
      onClick={handleCopy}
      className="rounded-md px-2 py-1 text-xs font-medium text-text-secondary transition hover:bg-black/5 hover:text-text-primary"
      aria-label="Copy"
    >
      {copied ? "Copied!" : "Copy"}
    </button>
  );
}
