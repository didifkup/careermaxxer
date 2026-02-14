import { NextResponse } from "next/server";

/** Lightweight ping to warm server (e.g. before starting a ranked sprint). */
export async function GET() {
  return NextResponse.json({ ok: true }, { status: 200 });
}
