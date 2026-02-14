"use client";

import { useState } from "react";
import type { StorytellerResponse, ToneOption, LengthOption } from "./types";
import { StorytellerResponseCards } from "./StorytellerResponseCards";
import { AIPanel } from "./AIPanel";

export function StorytellerClient() {
  const [theme, setTheme] = useState("");
  const [topic, setTopic] = useState("");
  const [tone, setTone] = useState<ToneOption>("chill");
  const [length, setLength] = useState<LengthOption>("medium");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [response, setResponse] = useState<StorytellerResponse | null>(null);
  const [lastInput, setLastInput] = useState<{
    theme: string;
    topic: string;
  } | null>(null);
  const [themeFocusedOnce, setThemeFocusedOnce] = useState(false);

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
        setError(
          json.error ?? `Request failed (${res.status})`
        );
        if (res.status === 429)
          setError("You've hit the limit for now. Try again in a few minutes.");
        return;
      }
      if (json.ok && json.data) {
        setResponse(json.data);
      } else {
        setError(json.error ?? "Something went wrong.");
      }
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Network error. Try again."
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="mx-auto max-w-[900px] space-y-8 px-4 py-12 md:py-16">
      <AIPanel
        theme={theme}
        setTheme={setTheme}
        topic={topic}
        setTopic={setTopic}
        tone={tone}
        setTone={setTone}
        length={length}
        setLength={setLength}
        loading={loading}
        error={error}
        onSubmit={handleSubmit}
        themeFocusedOnce={themeFocusedOnce}
        setThemeFocusedOnce={setThemeFocusedOnce}
      />

      {/* Output area */}
      {(lastInput || loading || response) && (
        <div className="space-y-4">
          {lastInput && (
            <div className="flex justify-end">
              <div className="max-w-[85%] rounded-2xl rounded-tr-sm bg-blue-50/80 px-4 py-3 text-sm text-slate-800 border border-blue-100/70">
                <p className="font-medium">Theme:</p>
                <p className="mt-0.5">{lastInput.theme}</p>
                <p className="mt-2 font-medium">Topic:</p>
                <p className="mt-0.5">{lastInput.topic}</p>
              </div>
            </div>
          )}

          {loading && (
            <div className="space-y-4">
              <p className="text-sm text-slate-500">Synthesizing…</p>
              <div className="space-y-4">
                {[1, 2, 3, 4, 5].map((i) => (
                  <div
                    key={i}
                    className="h-24 animate-pulse rounded-xl border border-slate-200/80 bg-white/60"
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
          onClick={() => {
            setError(null);
            setLastInput(null);
          }}
          className="text-sm text-blue-600 hover:underline"
        >
          Try again
        </button>
      )}
    </div>
  );
}
