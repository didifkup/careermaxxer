import { NextRequest, NextResponse } from "next/server";
import { getAuthOr401 } from "@/app/api/arena/auth";
import { createServiceRoleClient } from "@/lib/supabase/server";

export async function GET(request: NextRequest) {
  const auth = await getAuthOr401();
  if (auth instanceof NextResponse) return auth;

  const { searchParams } = new URL(request.url);
  const track = searchParams.get("track");
  const difficultyParam = searchParams.get("difficulty");

  if (!track || !["technical", "behavioral"].includes(track)) {
    return NextResponse.json(
      { error: "Missing or invalid track (technical|behavioral)" },
      { status: 400 }
    );
  }
  const difficulty =
    difficultyParam === "1"
      ? 1
      : difficultyParam === "2"
        ? 2
        : difficultyParam === "3"
          ? 3
          : null;
  if (difficulty == null) {
    return NextResponse.json(
      { error: "Missing or invalid difficulty (1|2|3)" },
      { status: 400 }
    );
  }

  const pool = searchParams.get("pool") === "1" || searchParams.get("pool") === "true";

  const supabase = createServiceRoleClient();
  const { data: questions, error } = await supabase
    .from("mock_questions")
    .select("id, track, difficulty, tags, prompt")
    .eq("track", track)
    .eq("difficulty", difficulty)
    .order("created_at", { ascending: false })
    .limit(50);

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
  if (!questions?.length) {
    return NextResponse.json({ error: "No questions found" }, { status: 404 });
  }

  if (pool) {
    return NextResponse.json(
      questions.map((q) => ({
        id: q.id,
        track: q.track,
        difficulty: q.difficulty,
        tags: q.tags ?? [],
        prompt: q.prompt,
      }))
    );
  }

  const pick = questions[Math.floor(Math.random() * questions.length)]!;
  return NextResponse.json({
    id: pick.id,
    track: pick.track,
    difficulty: pick.difficulty,
    tags: pick.tags ?? [],
    prompt: pick.prompt,
  });
}
