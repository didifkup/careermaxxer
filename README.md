# CareerMaxxer (IB Academy)

Duolingo-style learning app: climb an office building by floors. Complete nodes → salary grows ($0 → $180k), wolf evolves (Pup → Legend). No backend; progress in **localStorage**. Mobile-responsive with bottom-sheet modals on small screens.

---

## How to run

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

**Production build:**

```bash
npm run build
npm run start
```

---

## What’s built

### Practice (home)

- **Building path** — Vertical path of 4 floors, 3 nodes per floor (12 nodes). Duolingo-style zigzag; locked / unlocked / completed states.
- **Learning flow** — Tap unlocked node → Lesson (headline, bullets, “Like you’re 5”, recap) → Quiz (one question per screen, must answer correctly to advance) → Node Complete (+$15k, confetti) → optional Breather (after 4 nodes), Celebration (every 6th), Next reward preview (“One more →” opens next node).
- **Wolf panel** — Sticky on the right; 5 stages (Pup → Legend) by salary %; level-up animation; salary bar to $180k; current floor.
- **Bingeability** — “One more” preview, breather banner after 4 nodes, celebration every 6th; session count in memory only.

### Reading

- List of all node topics (same curriculum). Tap → **Reading Card** (lesson content only, no questions). **“Practice this now”** → jumps to Practice and opens that node’s learning modal (`?open=nodeId`).

### Quiz

- **Quiz mode** — Randomized questions from **completed** nodes only. One question per screen; correct/incorrect + “Explain like I’m 5”. **No salary changes.** Score + streak-style encouragement (“X in a row!”); end screen with score and short message.

### Global

- **Toast system** — Locked node, “Progress saved!”, “Progress reset.” (variants: default, success, info).
- **Settings** (gear in nav) — **Reset Progress** with confirm; dispatches `progress-reset` so Practice/Quiz refresh; toast “Progress reset.”
- **Analytics placeholders** — `track('node_opened')`, `track('node_completed')`, `track('session_4_nodes_reached')` in `src/lib/analytics.ts` (no integration; log in dev).
- **Confetti** — Lightweight custom burst on node completion (no extra deps).
- **Landing** — Subtle background gradient; floating icons (💼📈💰) in building path; Duolingo-ish microcopy (“One node at a time. Unlock the next, grow your salary — you’ve got this.”).
- **Mobile** — Learning and Reading modals become **bottom sheets** on small screens (max-sm: anchored to bottom, rounded top).

### Tech

- **Next.js 15** (App Router) + **TypeScript**
- **Tailwind CSS** + design tokens (`globals.css`, `tailwind.config.ts`)
- **Progress** — `src/lib/progress.ts`: load/save/reset, unlock/complete, wolf stage from salary %, streak (per day).
- **Curriculum** — `src/lib/curriculum.ts`: 12 nodes, 4 floors; each node: lesson (headline, bullets, analogy, recap) + 2 questions; difficulty Easy/Medium.

---

## Project layout

| Path | Purpose |
|------|--------|
| `src/app/` | Routes: `page.tsx` (Practice), `reading/page.tsx`, `quiz/page.tsx`, `layout.tsx`, `globals.css` |
| `src/components/` | Nav, BuildingPath, FloorSection, NodeButton, WolfPanel, WolfAvatar, LearningModal, QuestionFlow, PostCompleteView, ReadingCard, QuizFlow, Toast, Providers |
| `src/contexts/` | ToastContext (global toasts) |
| `src/lib/` | constants, curriculum, progress, storage, analytics, confetti |

Design system: CSS variables in `globals.css`; Tailwind theme (colors, radius, shadow, animation) in `tailwind.config.ts`.
