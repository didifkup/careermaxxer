/**
 * Server-only OpenAI helper. Use from API routes or Server Components only.
 * Expects in .env.local: OPENAI_API_KEY, optional OPENAI_MODEL (default gpt-4.1-mini).
 */

import OpenAI from "openai";

function getApiKey(): string {
  const key = process.env.OPENAI_API_KEY?.trim();
  if (!key) {
    throw new Error(
      "OPENAI_API_KEY is missing. Add it to .env.local or your deployment environment."
    );
  }
  return key;
}

let _client: OpenAI | null = null;

/** Lazy singleton client. Throws if OPENAI_API_KEY is missing. */
export function getOpenAIClient(): OpenAI {
  if (!_client) {
    _client = new OpenAI({ apiKey: getApiKey() });
  }
  return _client;
}

/** Lazy client instance (same as getOpenAIClient()). Use server-side only. */
export const openai = new Proxy({} as OpenAI, {
  get(_, prop) {
    return (getOpenAIClient() as Record<string, unknown>)[prop as string];
  },
});

export function getOpenAIModel(): string {
  return process.env.OPENAI_MODEL?.trim() || "gpt-4.1-mini";
}
