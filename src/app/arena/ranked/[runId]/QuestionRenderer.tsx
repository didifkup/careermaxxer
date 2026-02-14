"use client";

import { useMemo } from "react";
import type { RunQuestion } from "./types";

interface QuestionRendererProps {
  question: RunQuestion;
  value: string | string[];
  onChange: (value: string | string[]) => void;
  disabled?: boolean;
}

const OPTION_KEYS = ["option_a", "option_b", "option_c", "option_d"] as const;

function getOptionLabel(key: (typeof OPTION_KEYS)[number]): string {
  return key.replace("option_", "").toUpperCase();
}

export function QuestionRenderer({
  question,
  value,
  onChange,
  disabled,
}: QuestionRendererProps) {
  const options = useMemo(() => {
    return OPTION_KEYS.map((key) => ({
      key,
      label: getOptionLabel(key),
      text: question[key],
    })).filter((o) => o.text != null && o.text.trim() !== "");
  }, [question]);

  if (question.format === "mcq") {
    const single = typeof value === "string" ? value : Array.isArray(value) ? value[0] ?? "" : "";
    return (
      <fieldset className="space-y-2" disabled={disabled}>
        <legend className="sr-only">Choose one</legend>
        {options.map((opt) => (
          <label
            key={opt.key}
            className="flex cursor-pointer items-start gap-3 rounded-lg border border-input bg-background px-4 py-3 transition hover:bg-accent/50 has-[:checked]:border-brand-primary has-[:checked]:bg-brand-primary/5"
          >
            <input
              type="radio"
              name="mcq"
              value={opt.label}
              checked={single === opt.label}
              onChange={() => onChange(opt.label)}
              className="mt-1 h-4 w-4 border-input text-brand-primary focus:ring-brand-primary"
            />
            <span className="text-sm text-text-primary">{opt.text}</span>
          </label>
        ))}
      </fieldset>
    );
  }

  if (question.format === "multi") {
    const arr = Array.isArray(value) ? value : typeof value === "string" ? (value ? [value] : []) : [];
    const toggle = (label: string) => {
      if (arr.includes(label)) {
        onChange(arr.filter((x) => x !== label));
      } else {
        onChange([...arr, label]);
      }
    };
    return (
      <fieldset className="space-y-2" disabled={disabled}>
        <legend className="sr-only">Choose all that apply</legend>
        {options.map((opt) => (
          <label
            key={opt.key}
            className="flex cursor-pointer items-start gap-3 rounded-lg border border-input bg-background px-4 py-3 transition hover:bg-accent/50 has-[:checked]:border-brand-primary has-[:checked]:bg-brand-primary/5"
          >
            <input
              type="checkbox"
              value={opt.label}
              checked={arr.includes(opt.label)}
              onChange={() => toggle(opt.label)}
              className="mt-1 h-4 w-4 rounded border-input text-brand-primary focus:ring-brand-primary"
            />
            <span className="text-sm text-text-primary">{opt.text}</span>
          </label>
        ))}
      </fieldset>
    );
  }

  if (question.format === "fill") {
    const single = typeof value === "string" ? value : Array.isArray(value) ? value.join(", ") : "";
    return (
      <div>
        <input
          type="text"
          value={single}
          onChange={(e) => onChange(e.target.value)}
          disabled={disabled}
          placeholder="Your answer"
          className="w-full rounded-lg border border-input bg-background px-4 py-3 text-sm outline-none placeholder:text-muted-foreground focus:ring-2 focus:ring-ring"
        />
      </div>
    );
  }

  if (question.format === "drag") {
    const single = typeof value === "string" ? value : Array.isArray(value) ? value.join(",") : "";
    return (
      <div className="space-y-2">
        <p className="text-xs text-text-secondary">
          Enter the correct order as comma-separated letters (e.g. A, B, C, D)
        </p>
        <input
          type="text"
          value={single}
          onChange={(e) => onChange(e.target.value)}
          disabled={disabled}
          placeholder="e.g. A, B, C, D"
          className="w-full rounded-lg border border-input bg-background px-4 py-3 text-sm outline-none placeholder:text-muted-foreground focus:ring-2 focus:ring-ring"
        />
      </div>
    );
  }

  return null;
}
