# Refactor: Binge Session Clarity & Maintainability

Refactor for clarity, maintainability, and readability **without changing behavior**. All binge mechanics preserved.

## Summary of changes

### 1. Session logic → `useSessionProgress` hook

- **New:** `src/hooks/useSessionProgress.ts`
  - Holds **in-memory** `sessionCompletedCount` (not persisted).
  - `incrementSession()` — call after completing a node.
  - `buildPostCompleteData(completedNode, newSessionCount)` — builds the post-complete payload (view, nextNode, currentFloor) using the same logic as before.
  - `getPostCompleteViewType(count)` — pure helper: 3 → midSessionPeak, 4 → breather, else nextReward.
- **Page** uses the hook: `const { sessionCompletedCount, incrementSession, buildPostCompleteData } = useSessionProgress();` and calls `setPostCompleteData(buildPostCompleteData(selectedNode, newSessionCount))` instead of inlining view/nextNode/currentFloor.

### 2. Binge constants

- **New in** `src/lib/constants.ts`:
  - `BINGE_BREATHER_AFTER_NODES = 4` — show breather after 4 nodes.
  - `BINGE_MID_SESSION_PEAK_AFTER_NODES = 3` — show mid-session peak after 3rd node.
  - `BINGE_CALM_MODE_AFTER_NODES = 4` — calm-mode styling (slower transitions, calmer colors) when session count ≥ 4.
- **Page** uses `BINGE_BREATHER_AFTER_NODES` for analytics (`session_4_nodes_reached`).
- **PostCompleteView** uses `BINGE_CALM_MODE_AFTER_NODES` for `isCalm` (no magic number).

### 3. Shared `formatSalary`

- **New:** `src/lib/format.ts` — single `formatSalary(n: number): string`.
- **Used in:** PostCompleteView, LearningModal (CelebrationCompleteScreen), WolfPanel, QuestionFlow.
- **Not changed:** Nav keeps its own formatter (supports `$1.0M` style).

### 4. Naming and comments

- **PostCompleteView:** File-level comment describing nextReward / midSessionPeak / breather / celebration. `calmMode` JSDoc references `BINGE_CALM_MODE_AFTER_NODES`. Inline comment for “soft burnout prevention”.
- **LearningModal:** File-level comment (binge pacing, Celebration nodes skip quiz). Comment on `handleStartCelebration` (difficulty rhythm). Comment on questions slice (2–4 min pacing).
- **Curriculum:** Top comment added for difficulty rhythm (Easy → Easy → Medium → Celebration) and Celebration nodes.
- **useSessionProgress:** JSDoc on hook and on `getPostCompleteViewType`, `incrementSession`, `buildPostCompleteData`.

### 5. Reduced duplication

- Post-complete view type and payload construction live in one place (hook + constants).
- `formatSalary` in one place (`lib/format.ts`); removed from PostCompleteView, LearningModal, WolfPanel, QuestionFlow.
- Page no longer imports `getNextNodeAfter` or inlines view/nextNode/currentFloor logic.

## Files touched

| File | Change |
|------|--------|
| `src/hooks/useSessionProgress.ts` | **New** — session count state, incrementSession, buildPostCompleteData, getPostCompleteViewType |
| `src/lib/constants.ts` | Added BINGE_BREATHER_AFTER_NODES, BINGE_MID_SESSION_PEAK_AFTER_NODES, BINGE_CALM_MODE_AFTER_NODES |
| `src/lib/format.ts` | **New** — formatSalary |
| `src/lib/curriculum.ts` | Added top comment (difficulty rhythm, Celebration nodes) |
| `src/app/page.tsx` | Use useSessionProgress; use buildPostCompleteData and BINGE_BREATHER_AFTER_NODES; removed getNextNodeAfter |
| `src/components/PostCompleteView.tsx` | Use formatSalary + BINGE_CALM_MODE_AFTER_NODES; added file and inline comments |
| `src/components/LearningModal.tsx` | Use formatSalary from lib; removed local formatSalary; added file and inline comments |
| `src/components/WolfPanel.tsx` | Use formatSalary from lib |
| `src/components/QuestionFlow.tsx` | Use formatSalary from lib |
| `docs/REFACTOR_BINGE_SESSION.md` | **New** — this summary |

## Binge behavior preserved

- **15-minute binge pacing:** Unchanged. MAX_QUESTIONS_PER_NODE, Celebration nodes (no quiz), lesson/recap lengths unchanged.
- **Difficulty rhythm (Easy → Easy → Medium → Celebration):** Unchanged. Curriculum and LearningModal logic unchanged; comments added.
- **Session-based node tracking:** Unchanged. Still in-memory only; now encapsulated in `useSessionProgress` with same semantics (increment after complete, count used for view and calm mode).
- **One-more-node preview:** Unchanged. nextReward view, “One more →”, “Save & come back”, card with glow still driven by same data; built by `buildPostCompleteData` (same nextNode, view).
- **Wolf evolution triggers:** Unchanged. progress.ts and WolfPanel unchanged; salary curve and wolf stage logic unchanged.
- **Salary milestone animations:** Unchanged. Confetti, level-up, floor highlight unchanged; currentFloor still passed in PostCompleteData from loadProgress() after completeNode.
- **UX timing, rewards, flow:** Unchanged. View choice (3 → midSessionPeak, 4 → breather, else nextReward), calm mode (count ≥ 4), analytics (session_4_nodes_reached at 4) identical.
