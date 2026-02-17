/**
 * Shared classNames for /learn that mirror the AI Lab aesthetic
 * (landing hero, Labs/Worlds cards, Storyteller).
 */

export const learnStyles = {
  container:
    "mx-auto max-w-[900px] px-4 py-12 md:py-16",

  pageTitle:
    "font-display text-4xl font-semibold text-slate-800 md:text-5xl",

  pageSubtitle:
    "mt-2 text-base text-slate-500 md:text-lg",

  pageSubtext:
    "mt-1 text-sm text-slate-400",

  cardBase:
    "rounded-2xl border border-blue-100/70 bg-white/75 backdrop-blur-xl shadow-[0_20px_60px_rgba(37,99,235,0.10)] transition-all duration-200",

  cardHover:
    "hover:-translate-y-0.5 hover:border-blue-200/90 hover:shadow-[0_24px_64px_rgba(37,99,235,0.14)]",

  pill:
    "rounded-full px-2.5 py-0.5 text-xs font-medium bg-blue-100 text-blue-700",

  pillMuted:
    "rounded-full px-2.5 py-0.5 text-xs font-medium bg-slate-100 text-slate-500",

  subtleBorder:
    "border border-black/5",

  glow:
    "shadow-[0_20px_60px_rgba(37,99,235,0.10)]",

  glowHover:
    "hover:shadow-[0_24px_64px_rgba(37,99,235,0.14)]",

  gradientText:
    "bg-gradient-to-r from-slate-800 via-blue-700 to-slate-800 bg-clip-text text-transparent",

  ctaPrimary:
    "inline-flex items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-blue-600 to-blue-500 px-4 py-2.5 text-sm font-semibold text-white shadow-[0_10px_25px_rgba(37,99,235,0.30)] transition hover:shadow-[0_12px_28px_rgba(37,99,235,0.35)] active:scale-[0.98]",

  ctaSecondary:
    "inline-flex items-center justify-center gap-2 rounded-2xl border border-blue-200/80 bg-white px-4 py-2.5 text-sm font-medium text-blue-700 transition hover:bg-blue-50",

  inputLike:
    "w-full rounded-xl border border-blue-100/70 bg-white/80 px-4 py-3 text-[15px] placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-300/80 transition",
} as const;

export type LearnStyles = typeof learnStyles;
