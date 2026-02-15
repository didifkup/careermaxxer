"use client";

import type { WorldSlug } from "@/lib/worlds/catalog";
import { cn } from "@/lib/utils";

const STROKE = "rgba(29,78,216,0.80)";
const SVG_PROPS = {
  viewBox: "0 0 24 24",
  fill: "none" as const,
  strokeWidth: 2,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};

export type WorldIconProps = {
  slug: WorldSlug;
  active?: boolean;
  className?: string;
};

export function WorldIcon({ slug, active, className }: WorldIconProps) {
  return (
    <div
      className={cn(
        "group/icon relative flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-blue-200/70 bg-white/70 shadow-[0_10px_30px_rgba(37,99,235,0.10)] shadow-[inset_0_1px_0_rgba(255,255,255,0.85)] transition-all duration-200",
        "hover:-translate-y-px hover:scale-[1.03] hover:border-blue-300/80",
        className
      )}
    >
      {active && (
        <span
          className="world-ping-ring absolute -inset-1 rounded-full border border-blue-400/40"
          aria-hidden
        />
      )}
      <svg
        width="24"
        height="24"
        {...SVG_PROPS}
        stroke={STROKE}
        className="relative z-10"
        aria-hidden
      >
        {slug === "fsm" && <IconFSM />}
        {slug === "dcf" && <IconDCF />}
        {slug === "ma" && <IconMA />}
        {slug === "market-signals" && <IconMarketSignals />}
        {slug === "deal-intelligence" && <IconDealIntelligence />}
        {slug === "leverage" && <IconLeverage />}
      </svg>
    </div>
  );
}

function IconFSM() {
  return (
    <>
      <line x1="12" y1="12" x2="12" y2="6" />
      <line x1="12" y1="12" x2="7" y2="16" />
      <line x1="12" y1="12" x2="17" y2="16" />
      <circle cx="12" cy="12" r="2" />
      <circle
        cx="12"
        cy="6"
        r="1.5"
        className="svg-origin opacity-80 transition-all duration-200 group-hover:opacity-100 group-hover:scale-[1.06]"
      />
      <circle
        cx="7"
        cy="16"
        r="1.5"
        className="svg-origin opacity-80 transition-all duration-200 group-hover:opacity-100 group-hover:scale-[1.06]"
      />
      <circle
        cx="17"
        cy="16"
        r="1.5"
        className="svg-origin opacity-80 transition-all duration-200 group-hover:opacity-100 group-hover:scale-[1.06]"
      />
    </>
  );
}

function IconDCF() {
  return (
    <>
      <path d="M20 7 C16 7 14 9 12 11 C10 13 8 15 4 17" className="opacity-80 transition-opacity duration-200 group-hover:opacity-95" />
      <circle
        cx="10"
        cy="13"
        r="1.6"
        className="svg-origin transition-transform duration-200 group-hover:-translate-x-[1px]"
      />
      <line x1="8.5" y1="6" x2="5.5" y2="6" className="opacity-70 transition-opacity duration-200 group-hover:opacity-90" />
      <line x1="5.5" y1="6" x2="7" y2="4.7" className="opacity-70 transition-opacity duration-200 group-hover:opacity-90" />
      <line x1="5.5" y1="6" x2="7" y2="7.3" className="opacity-70 transition-opacity duration-200 group-hover:opacity-90" />
    </>
  );
}

function IconMA() {
  return (
    <>
      <circle
        cx="8"
        cy="12"
        r="2.2"
        className="svg-origin transition-transform duration-200 group-hover:translate-x-[1px]"
      />
      <circle
        cx="16"
        cy="12"
        r="2.2"
        className="svg-origin transition-transform duration-200 group-hover:-translate-x-[1px]"
      />
      <circle cx="12" cy="12" r="1.6" className="opacity-70 transition-opacity duration-200 group-hover:opacity-90" />
      <line x1="10.2" y1="12" x2="11.4" y2="12" />
      <line x1="13.8" y1="12" x2="12.6" y2="12" />
    </>
  );
}

function IconMarketSignals() {
  return (
    <>
      <path
        d="M3 13 C5 9 7 17 9 13 C11 9 13 17 15 13 C17 9 19 17 21 13"
        className="opacity-80 transition-opacity duration-200 group-hover:opacity-95"
      />
      <circle
        cx="18.5"
        cy="11.5"
        r="1.4"
        className="svg-origin transition-transform duration-200 group-hover:translate-x-[1px]"
      />
    </>
  );
}

function IconDealIntelligence() {
  return (
    <>
      <path d="M6 8 H18" />
      <path d="M6 12 H18" />
      <path d="M6 16 H14" />
      <circle
        cx="18"
        cy="16"
        r="2"
        className="svg-origin transition-transform duration-200 group-hover:scale-[1.06]"
      />
      <line x1="19.5" y1="17.5" x2="21" y2="19" />
    </>
  );
}

function IconLeverage() {
  return (
    <>
      <path d="M7 17 L9 13 L11 17 Z" />
      <line
        x1="9"
        y1="13"
        x2="20"
        y2="9.5"
        className="svg-origin transition-transform duration-200 group-hover:rotate-[1deg]"
      />
      <circle
        cx="20"
        cy="9.5"
        r="1.7"
        className="svg-origin transition-transform duration-200 group-hover:translate-y-[-1px]"
      />
      <line x1="5.5" y1="18.5" x2="12.5" y2="18.5" className="opacity-70" />
    </>
  );
}
