# Design tokens (reference)

Defined in `src/app/globals.css`. Use via Tailwind:

- **Brand**: `bg-brand-primary`, `text-brand-accent`, etc.
- **Surface**: `bg-surface-base`, `bg-surface-raised`
- **Text**: `text-text-primary`, `text-text-secondary`
- **Semantic**: `text-success`, `bg-success`, `text-warning`, `text-error`
- **Radius**: `rounded-lg`, `rounded-xl`, `rounded-2xl` (map to --radius-*)
- **Shadow**: `shadow-card`, `shadow-elevated`, `shadow-glow`

Opacity variants work with Tailwind, e.g. `bg-brand-primary/80`.

---

## Practice page (scoped to `.practice-tower`)

Premium, finance-grade; white/soft gray base; blue = active, green = completed; animations enhance, never dominate.

| Token | CSS variable | Tailwind |
|-------|--------------|----------|
| Node background | `--practice-node-bg` | `bg-practice-node-bg` |
| Node border | `--practice-node-border` | `border-practice-node-border` |
| Node shadow rest | `--practice-node-shadow-rest` | `shadow-practice-node-rest` |
| Node shadow hover | `--practice-node-shadow-hover` | `shadow-practice-node-hover` |
| Node shadow active | `--practice-node-shadow-active` | `shadow-practice-node-active` |
| Active glow | `--practice-glow-active` | `bg-practice-glow-active/15`, `ring-practice-glow-active` |
| Completed glow | `--practice-glow-completed` | `bg-practice-glow-completed/20`, `text-practice-glow-completed` |
| Locked opacity | `--practice-locked-opacity` | use in overlay |
| Locked blur | `--practice-locked-blur` | `backdrop-blur-[var(--practice-locked-blur)]` |
| Stair locked | `--practice-stair-locked` | `bg-practice-stair-locked` |
| Stair active | `--practice-stair-active` | `bg-practice-stair-active/40` |
| Stair completed | `--practice-stair-completed` | `bg-practice-stair-completed` |
| Landing background | `--practice-landing-bg` | `bg-practice-landing-bg` |
| Floor gradient | `--practice-floor-gradient-*` | inline `linear-gradient` in BuildingPath |
| Tower page background | `--practice-tower-bg` | Full-page game-level gradient (very light) |
| Zig-zag gap (vertical) | `--practice-zigzag-gap-y` | 72px — tight stack for momentum; 2+ future nodes still visible |
| Zig-zag offset (horizontal) | `--practice-zigzag-offset-x` | 240px desktop; mobile = single centered column |

Animation durations: `--practice-duration-rest`, `--practice-duration-hover`, `--practice-duration-active`.

### Practice motion tokens (short, intentional, dopamine without cartoonish)

| Token | CSS variable | Usage |
|-------|--------------|--------|
| Idle pulse timing | `--practice-motion-idle-pulse-duration` (2.4s), `-ease` | Subtle pulse on next node / CTA; use `animate-practice-idle-pulse` |
| Hover scale | `--practice-motion-hover-scale` (1.02), `-duration`, `-ease` | Node/button lift; use `scale-practice-hover`, `duration-practice-hover`, `ease-practice` |
| Completion pop | `--practice-motion-completion-pop-duration` (280ms), `-ease` | Node done / checkmark; use `animate-practice-completion-pop` |
| Reward float timing | `--practice-motion-reward-float-duration` (1.5s), `-ease` | Salary/trophy reveal; use `animate-practice-reward-float` |
| Auto-scroll easing | `--practice-motion-auto-scroll-duration` (480ms), `-ease` | Bring next node into view; JS: `PRACTICE_AUTO_SCROLL_MS` in `@/lib/constants` |

Keyframes: `practice-idle-pulse`, `practice-completion-pop`, `practice-reward-float`. Tailwind: `animate-practice-idle-pulse`, `animate-practice-completion-pop`, `animate-practice-reward-float`, `duration-practice-hover`, `ease-practice`, `ease-practice-completion`, `ease-practice-reward`, `ease-practice-scroll`.
