"use client";

import { useState } from "react";
import type { StorytellerResponse, ToneOption, LengthOption } from "./types";
import { StorytellerResponseCards } from "./StorytellerResponseCards";

const THEME_CHIPS = ["Gym", "Gaming", "Basketball", "Cars", "Cooking"];
const TOPIC_CHIPS = [
  "3 statements link",
  "DCF intuition",
  "EV vs Equity",
  "WACC + beta",
  "Comps multiples",
  "Accretion/dilution",
  "LBO basics",
];

const TONE_OPTIONS: { value: ToneOption; label: string }[] = [
  { value: "fun", label: "Fun" },
  { value: "chill", label: "Chill" },
  { value: "serious", label: "Serious" },
];
const LENGTH_OPTIONS: { value: LengthOption; label: string }[] = [
  { value: "short", label: "Short" },
  { value: "medium", label: "Medium" },
  { value: "long", label: "Long" },
];

export function StorytellerClient() {
  const [theme, setTheme] = useState("");
  const [topic, setTopic] = useState("");
  const [tone, setTone] = useState<ToneOption>("chill");
  const [length, setLength] = useState<LengthOption>("medium");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [response, setResponse] = useState<StorytellerResponse | null>(null);
  const [lastInput, setLastInput] = useState<{ theme: string; topic: string } | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    const t = theme.trim();
    const p = topic.trim();
    if (t.length < 3 || t.length > 300) {
      setError("Theme must be 3–300 characters.");
      return;
    }
    if (p.length < 3 || p.length > 300) {
      setError("Topic must be 3–300 characters.");
      return;
    }
    setLoading(true);
    setResponse(null);
    setLastInput({ theme: t, topic: p });
    try {
      const res = await fetch("/api/storyteller", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ theme: t, topic: p, tone, length }),
      });
      const json = await res.json().catch(() => ({}));
      if (!res.ok) {
        setError(json.error ?? `Request failed (${res.status})`);
        if (res.status === 429) setError("You've hit the limit for now. Try again in a few minutes.");
        return;
      }
      if (json.ok && json.data) {
        setResponse(json.data);
      } else {
        setError(json.error ?? "Something went wrong.");
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Network error. Try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="mx-auto max-w-2xl space-y-8">
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="rounded-xl border border-black/10 bg-surface-raised p-5 shadow-sm">
          <label htmlFor="theme" className="block text-sm font-medium text-text-primary">
            What are you into?
          </label>
          <textarea
            id="theme"
            value={theme}
            onChange={(e) => setTheme(e.target.value.slice(0, 300))}
            placeholder="Gym + healthy eating, gaming, cars, fashion, sports…"
            maxLength={300}
            rows={2}
            className="mt-2 w-full rounded-lg border border-input bg-background px-3 py-2 text-sm text-text-primary placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
          />
          <p className="mt-1 text-xs text-text-secondary">{theme.length}/300</p>
          <div className="mt-2 flex flex-wrap gap-2">
            {THEME_CHIPS.map((chip) => (
              <button
                key={chip}
                type="button"
                onClick={() => setTheme((prev) => (prev ? `${prev}, ${chip}` : chip))}
                className="rounded-full bg-black/5 px-3 py-1 text-xs font-medium text-text-secondary transition hover:bg-brand-primary/10 hover:text-brand-primary"
              >
                {chip}
              </button>
            ))}
          </div>
        </div>

        <div className="rounded-xl border border-black/10 bg-surface-raised p-5 shadow-sm">
          <label htmlFor="topic" className="block text-sm font-medium text-text-primary">
            What do you want to understand?
          </label>
          <textarea
            id="topic"
            value={topic}
            onChange={(e) => setTopic(e.target.value.slice(0, 300))}
            placeholder="e.g. How the 3 financial statements link (especially retained earnings)"
            maxLength={300}
            rows={3}
            className="mt-2 w-full rounded-lg border border-input bg-background px-3 py-2 text-sm text-text-primary placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
          />
          <p className="mt-1 text-xs text-text-secondary">{topic.length}/300</p>
          <div className="mt-2 flex flex-wrap gap-2">
            {TOPIC_CHIPS.map((chip) => (
              <button
                key={chip}
                type="button"
                onClick={() => setTopic((prev) => (prev ? `${prev} — ${chip}` : chip))}
                className="rounded-full bg-black/5 px-3 py-1 text-xs font-medium text-text-secondary transition hover:bg-brand-primary/10 hover:text-brand-primary"
              >
                {chip}
              </button>
            ))}
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-4">
          <div>
            <span className="mr-2 text-xs text-text-secondary">Tone:</span>
            <select
              value={tone}
              onChange={(e) => setTone(e.target.value as ToneOption)}
              className="rounded-lg border border-input bg-background px-3 py-1.5 text-sm text-text-primary focus:outline-none focus:ring-2 focus:ring-ring"
            >
              {TONE_OPTIONS.map((o) => (
                <option key={o.value} value={o.value}>{o.label}</option>
              ))}
            </select>
          </div>
          <div>
            <span className="mr-2 text-xs text-text-secondary">Length:</span>
            <select
              value={length}
              onChange={(e) => setLength(e.target.value as LengthOption)}
              className="rounded-lg border border-input bg-background px-3 py-1.5 text-sm text-text-primary focus:outline-none focus:ring-2 focus:ring-ring"
            >
              {LENGTH_OPTIONS.map((o) => (
                <option key={o.value} value={o.value}>{o.label}</option>
              ))}
            </select>
          </div>
        </div>

        {error && (
          <p className="rounded-lg bg-destructive/10 px-3 py-2 text-sm text-destructive">
            {error}
          </p>
        )}

        <button
          type="submit"
          disabled={loading}
          className="w-full rounded-xl bg-brand-primary px-4 py-3 text-sm font-semibold text-text-inverse transition hover:opacity-90 disabled:opacity-60 sm:w-auto"
        >
          {loading ? "Thinking…" : "Tell me the story →"}
        </button>
      </form>

      {/* Chat-like output */}
      {(lastInput || loading || response) && (
        <div className="space-y-4">
          {lastInput && (
            <div className="flex justify-end">
              <div className="max-w-[85%] rounded-2xl rounded-tr-sm bg-brand-primary/10 px-4 py-3 text-sm text-text-primary">
                <p className="font-medium">Theme:</p>
                <p className="mt-0.5">{lastInput.theme}</p>
                <p className="mt-2 font-medium">Topic:</p>
                <p className="mt-0.5">{lastInput.topic}</p>
              </div>
            </div>
          )}

          {loading && (
            <div className="space-y-4">
              <p className="text-sm text-text-secondary">Thinking…</p>
              <div className="space-y-4">
                {[1, 2, 3, 4, 5].map((i) => (
                  <div
                    key={i}
                    className="h-24 animate-pulse rounded-xl border border-black/10 bg-surface-raised"
                  />
                ))}
              </div>
            </div>
          )}

          {!loading && response && (
            <StorytellerResponseCards data={response} />
          )}
        </div>
      )}

      {error && !loading && (
        <button
          type="button"
          onClick={() => { setError(null); setLastInput(null); }}
          className="text-sm text-brand-primary hover:underline"
        >
          Try again
        </button>
      )}
    </div>
  );
}
