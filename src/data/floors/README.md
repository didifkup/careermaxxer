# Data-driven floors (Floor 1, 2, …)

Each floor is **one file**: `floor1.ts`, `floor2.ts`, etc. Adding a new floor is fast.

**Variable-length floors:** Each floor can have **4–15+ nodes**. Each node in the spec is a `FloorNodeInput` (id, floorNumber, title, slug, salaryReward, difficulty, lesson, questions). The build step in `index.ts` adds `floorId`, `floorLabel`, `indexInFloor`, and `totalNodesInFloor` to every node.

## How to add a new floor (e.g. Floor 3)

1. **Create the questions file** (if you want Duolingo-style mixed types):
   - `src/lib/floor3Questions.ts` — export `FLOOR3_QUESTIONS: Record<string, Question[]>` with MC, fill-in, tap-all, true/false per node.

2. **Create the floor spec**:
   - Copy `floor2.ts` → `floor3.ts`.
   - Update: `floorNumber`, `title`, `metadata` (title, conceptFocus, totalReward, optional milestoneCopy, backgroundStyle), `nodes`, `questions`, and `completion`.
   - **metadata** makes the floor intentional: `conceptFocus` (short phrase), `totalReward` (sum of node salaries), `milestoneCopy` (optional; overrides completion.message when set), `backgroundStyle` ("default" | "warm" | "cool" | "accent" | "minimal" for design tokens).

3. **Register the floor**:
   - In `index.ts`: add `import { floor3 } from "./floor3"` and add `floor3` to the `FLOOR_SPECS` array.

No changes needed in:
- `curriculum.ts` — NODES already uses `...FLOOR_NODES_FLAT` (built from all specs).
- `questionBank.ts` — uses `FLOOR_QUESTIONS_MAP` (built from all specs).
- `PostCompleteView.tsx` — uses `FLOOR_COMPLETIONS` (built from all specs).
- Floor titles — `FLOOR_TITLES_FROM_DATA` is built from all specs.

That’s it: **one new file + one line in index.ts**.
