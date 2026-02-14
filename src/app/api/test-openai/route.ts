import { NextRequest, NextResponse } from "next/server";
import { getOpenAIClient, getOpenAIModel } from "@/lib/openai";

const DEFAULT_MESSAGE =
  "Say 'OpenAI is connected' in one short sentence.";

export async function POST(request: NextRequest) {
  let message: string;
  try {
    const body = await request.json().catch(() => ({}));
    message =
      typeof body?.message === "string" && body.message.trim()
        ? body.message.trim()
        : DEFAULT_MESSAGE;
  } catch {
    message = DEFAULT_MESSAGE;
  }

  try {
    const openai = getOpenAIClient();
    const completion = await openai.chat.completions.create({
      model: getOpenAIModel(),
      messages: [{ role: "user", content: message }],
      max_tokens: 100,
    });

    const text =
      completion.choices[0]?.message?.content?.trim() ?? "";

    if (!text) {
      return NextResponse.json(
        { ok: false, error: "Empty response from OpenAI" },
        { status: 500 }
      );
    }

    return NextResponse.json({ ok: true, text });
  } catch (err) {
    const isMissingKey =
      err instanceof Error &&
      (err.message.includes("OPENAI_API_KEY") || err.message.includes("apiKey"));
    const reason = isMissingKey
      ? "OPENAI_API_KEY is missing"
      : err instanceof Error
        ? err.message
        : "OpenAI request failed";

    return NextResponse.json(
      { ok: false, error: reason },
      { status: 500 }
    );
  }
}
