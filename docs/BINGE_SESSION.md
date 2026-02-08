# How the 15-Minute Binge Session Emerges

The MVP is tuned so a typical session naturally guides the user through **~4 nodes in ~15 minutes** with no extra configuration.

## 1. Node pacing (2–4 min per node)

- **Learning**: Content is capped (e.g. `BULLETS_MAX`, short recap) so a node can be read in ~30–75 seconds.
- **Questions**: Max **5 questions** per node (`MAX_QUESTIONS_PER_NODE`). Celebration nodes have **0 questions**.
- **Celebration nodes** (every 4th in path: EBITDA, Why discounting, Tying it together): lesson → short recap + salary + light confetti → Continue. No quiz, so they take ~1–2 minutes.

So each node stays within 2–4 minutes total.

## 2. Difficulty curve (Easy → Easy → Medium → Celebration)

- Nodes are tagged **Easy**, **Medium**, or **Celebration** in curriculum.
- Path order gives: Easy, Easy, Medium, Celebration, then repeat. Celebration nodes are the “recovery” moment: no questions, lighter confetti, calmer copy.

## 3. Reward density

- **Salary curve**: First 4 nodes give **$20k** each, next 4 **$15k**, last 4 **$10k** (total still $180k).
- Completing **3–4 nodes** in one session usually:
  - Crosses a salary milestone (e.g. 25%, 40%) and/or
  - Triggers a **wolf stage** upgrade (0→1 at 20%, 1→2 at 40%, etc.).

So the user sees visible progress (salary bar, wolf level, floor) within one sit-down.

## 4. Mid-session peak (after 3rd node)

- After the **3rd** node in a session we show **midSessionPeak**: “Promotion unlocked”, “You’re thinking like an investment banker”, and a highlighted **floor**.
- Then “Continue” → next node preview. This creates a clear “peak” moment before the 4th node.

## 5. One-more-node loop

- After **every** node completion we show a **next-node preview**: title, salary reward, subtle glow.
- Primary CTA: **“One more →”** (start next node).
- Secondary: **“Save & come back”** (close modal, no guilt).

So the default path is “one more,” but exit is always easy and neutral.

## 6. Soft burnout prevention (after 4 nodes)

- **Session count** is in-memory only (not persisted). After **4** nodes we show the breather: “You’re on fire 🔥 Want a 60-second breather?” with **“Keep going”** as default.
- When `sessionCompletedCount >= 4`, post-complete UI uses **calmer colors** and **slower transitions** (e.g. success tones, longer duration). No guilt language.

## 7. Copy tone

- No pressure or guilt. Copy uses **confidence and identity**: “You’re building your salary”, “Your office floor”, “Your wolf looks sharper today”, “Promotion unlocked”.

---

**Net effect**: A user who does “one more” a few times will typically complete 4 nodes, see a wolf upgrade and/or salary milestone, get a mid-session peak after node 3, then a gentle breather after node 4—all in ~15 minutes, with a natural “one more” loop and a calm, opt-in pause.
