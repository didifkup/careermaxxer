import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { getOpenAIClient, getOpenAIModel } from "@/lib/openai";
import { createHash } from "crypto";

// ---------------------------------------------------------------------------
// Truth anchors: keyword packs + bullets. Best match by keyword score.
// ---------------------------------------------------------------------------

const ANCHOR_PACKS: Array<{ keywords: string[]; anchors: string[] }> = [
  {
    keywords: ["3 statements", "income statement", "balance sheet", "cash flow", "retained earnings", "link", "linking"],
    anchors: [
      "Income statement flows into balance sheet (net income → retained earnings).",
      "Cash flow statement explains change in cash on balance sheet.",
      "Retained earnings = prior RE + net income - dividends.",
    ],
  },
  {
    keywords: ["dcf", "discount", "terminal value", "wacc", "npv", "present value"],
    anchors: [
      "DCF = sum of future free cash flows discounted to today.",
      "Terminal value captures value beyond the forecast period.",
      "WACC is the discount rate for unlevered cash flows.",
    ],
  },
  {
    keywords: ["enterprise value", "equity value", "bridge", "net debt", "ev", "market cap"],
    anchors: [
      "EV = equity value + net debt (and other adjustments).",
      "Net debt = total debt - cash and equivalents.",
      "EV is the value of the whole firm before financing.",
    ],
  },
  {
    keywords: ["wacc", "beta", "unlever", "relever", "capm", "cost of equity"],
    anchors: [
      "Unlevered beta removes effect of debt; relever with target D/E.",
      "CAPM: cost of equity = risk-free rate + beta × equity risk premium.",
      "WACC blends cost of debt and cost of equity by their weights.",
    ],
  },
  {
    keywords: ["trading comps", "multiples", "ev/ebitda", "p/e", "comps", "comparable"],
    anchors: [
      "Trading comps use public companies; multiples (EV/EBITDA, P/E) compare valuation.",
      "EV/EBITDA is enterprise multiple; P/E is equity multiple.",
      "Use median or mean; watch for outliers.",
    ],
  },
  {
    keywords: ["transaction comps", "precedent", "control premium", "premium"],
    anchors: [
      "Transaction comps use past M&A deals; precedent transactions.",
      "Control premium: acquirer pays more for control.",
      "Use deal value (EV) and deal multiples.",
    ],
  },
  {
    keywords: ["accretion", "dilution", "synergies", "purchase price", "earnings per share"],
    anchors: [
      "Accretion/dilution: does the deal increase or decrease EPS?",
      "All-stock deal: acquirer shares increase; EPS can dilute even if value-creating.",
      "Synergies can make a dilutive deal accretive on a synergy-adjusted basis.",
    ],
  },
  {
    keywords: ["lbo", "leverage", "irr", "debt paydown", "sponsor"],
    anchors: [
      "LBO: acquire with significant debt; pay down with cash flow.",
      "Equity return (IRR) is amplified by leverage when the asset performs.",
      "Debt paydown increases equity value; exit multiple and time drive IRR.",
    ],
  },
];

const GENERIC_ANCHORS = [
  "Define key terms in plain English.",
  "Give 1 concrete example.",
  "Explain inputs → outputs.",
  "Mention common mistakes.",
];

function pickAnchorPack(topic: string): string[] {
  const lower = topic.toLowerCase();
  let bestScore = 0;
  let bestPack = GENERIC_ANCHORS;
  for (const pack of ANCHOR_PACKS) {
    let score = 0;
    for (const kw of pack.keywords) {
      if (lower.includes(kw.toLowerCase())) score++;
    }
    if (score > bestScore) {
      bestScore = score;
      bestPack = pack.anchors;
    }
  }
  return bestPack;
}

// ---------------------------------------------------------------------------
// Rate limit: in-memory, 10 per 10 min per key (user id or IP)
// ---------------------------------------------------------------------------

const RATE_WINDOW_MS = 10 * 60 * 1000;
const RATE_MAX = 10;
const rateMap = new Map<string, number[]>();

function rateLimitKey(userId: string | null, ip: string): string {
  return userId ? `u:${userId}` : `ip:${ip}`;
}

function checkRateLimit(key: string): boolean {
  const now = Date.now();
  let times = rateMap.get(key) ?? [];
  times = times.filter((t) => now - t < RATE_WINDOW_MS);
  if (times.length >= RATE_MAX) return false;
  times.push(now);
  rateMap.set(key, times);
  return true;
}

// ---------------------------------------------------------------------------
// Cache: in-memory TTL 6h
// ---------------------------------------------------------------------------

const CACHE_TTL_MS = 6 * 60 * 60 * 1000;
const cache = new Map<string, { data: unknown; expires: number }>();

function cacheKey(theme: string, topic: string, tone: string, length: string): string {
  return createHash("sha256").update(`${theme}|${topic}|${tone}|${length}`).digest("hex");
}

function getCached(key: string): unknown | null {
  const entry = cache.get(key);
  if (!entry || Date.now() > entry.expires) {
    if (entry) cache.delete(key);
    return null;
  }
  return entry.data;
}

function setCached(key: string, data: unknown): void {
  cache.set(key, { data, expires: Date.now() + CACHE_TTL_MS });
}

// ---------------------------------------------------------------------------
// Prompt + JSON parse
// ---------------------------------------------------------------------------

const SYSTEM_PROMPT = `You are Storyteller — a supportive, witty friend who's insanely good at explaining investment banking concepts simply.
Your writing must sound human and natural, like a caring friend texting you, not like a textbook or AI.
Rules:
- Use the user's theme as the center of the analogy.
- Explain at a 5th grade level.
- Be technically correct and follow the truth anchors.
- No robotic phrasing, no corporate tone, no "as an AI" or "as a language model".
- Keep it vivid and concrete (1–2 mini-scenes).
- Output ONLY valid JSON matching the schema below. No markdown, no code fence.

OUTPUT FORMAT — return ONLY this JSON shape, nothing else:
{
  "story_title": "string",
  "story": "string",
  "analogy_map": [{"concept":"string","analogy":"string"}],
  "reality_check": ["string"],
  "mini_quiz": [{"q":"string","a":"string"}],
  "takeaway": "string"
}

STYLE: Use contractions, casual wording, friendly vibe. Avoid stiff transitions like "Firstly/Secondly". Keep lists short and punchy. reality_check: 3–6 bullets, plain English. mini_quiz: 2–3 Qs, answers short and friendly. takeaway: one memorable sentence.`;

function buildUserMessage(
  theme: string,
  topic: string,
  tone: string,
  length: string,
  anchors: string[]
): string {
  return `THEME: ${theme}
TOPIC (free text): ${topic}
TONE: ${tone}
LENGTH: ${length}

TRUTH ANCHORS (must be covered accurately):
${anchors.map((a) => `- ${a}`).join("\n")}

Return ONLY valid JSON matching the schema (story_title, story, analogy_map, reality_check, mini_quiz, takeaway). No other text.`;
}

function parseJsonResponse(content: string): unknown {
  const trimmed = content.trim();
  const noFence = trimmed.replace(/^```(?:json)?\s*/i, "").replace(/\s*```$/i, "").trim();
  return JSON.parse(noFence) as unknown;
}

// ---------------------------------------------------------------------------
// Handler
// ---------------------------------------------------------------------------

export async function POST(request: NextRequest) {
  const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? request.headers.get("x-real-ip") ?? "unknown";
  let userId: string | null = null;
  try {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();
    userId = user?.id ?? null;
  } catch {
    // auth optional
  }

  const rlKey = rateLimitKey(userId, ip);
  if (!checkRateLimit(rlKey)) {
    return NextResponse.json(
      { ok: false, error: "Too many requests. Try again in a few minutes." },
      { status: 429 }
    );
  }

  let body: { theme?: unknown; topic?: unknown; tone?: unknown; length?: unknown };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid JSON" }, { status: 400 });
  }

  const theme = typeof body.theme === "string" ? body.theme.trim() : "";
  const topic = typeof body.topic === "string" ? body.topic.trim() : "";
  const tone = typeof body.tone === "string" && ["fun", "chill", "serious"].includes(body.tone) ? body.tone : "chill";
  const length = typeof body.length === "string" && ["short", "medium", "long"].includes(body.length) ? body.length : "medium";

  if (theme.length < 3 || theme.length > 300) {
    return NextResponse.json({ ok: false, error: "Theme must be 3–300 characters" }, { status: 400 });
  }
  if (topic.length < 3 || topic.length > 300) {
    return NextResponse.json({ ok: false, error: "Topic must be 3–300 characters" }, { status: 400 });
  }

  const cKey = cacheKey(theme, topic, tone, length);
  const cached = getCached(cKey);
  if (cached) {
    return NextResponse.json({ ok: true, data: cached });
  }

  try {
    const openai = getOpenAIClient();
    const model = getOpenAIModel();
    const anchors = pickAnchorPack(topic);
    const userMessage = buildUserMessage(theme, topic, tone, length, anchors);

    const completion = await openai.chat.completions.create({
      model,
      messages: [
        { role: "system", content: SYSTEM_PROMPT },
        { role: "user", content: userMessage },
      ],
      response_format: { type: "json_object" },
      max_tokens: 2000,
    });

    const raw = completion.choices[0]?.message?.content?.trim() ?? "";
    if (!raw) {
      return NextResponse.json({ ok: false, error: "Empty response from model" }, { status: 500 });
    }

    let data: unknown;
    try {
      data = parseJsonResponse(raw);
    } catch {
      // One repair attempt
      const repair = await openai.chat.completions.create({
        model,
        messages: [
          { role: "system", content: "Output ONLY valid JSON. No markdown, no explanation." },
          { role: "user", content: `Fix this to be valid JSON only:\n${raw}` },
        ],
        response_format: { type: "json_object" },
        max_tokens: 2000,
      });
      const repairRaw = repair.choices[0]?.message?.content?.trim() ?? "";
      try {
        data = parseJsonResponse(repairRaw);
      } catch {
        return NextResponse.json({ ok: false, error: "Could not parse model response" }, { status: 500 });
      }
    }

    setCached(cKey, data);
    return NextResponse.json({ ok: true, data });
  } catch (err) {
    const msg = err instanceof Error ? err.message : "OpenAI request failed";
    if (msg.includes("OPENAI_API_KEY")) {
      return NextResponse.json({ ok: false, error: "OPENAI_API_KEY is missing" }, { status: 500 });
    }
    return NextResponse.json({ ok: false, error: msg }, { status: 500 });
  }
}
