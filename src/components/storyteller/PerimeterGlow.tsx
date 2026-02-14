"use client";

import { useId, useRef, useState, useLayoutEffect } from "react";
import { cn } from "@/lib/utils";

const BORDER_RADIUS_PX = 16; // matches rounded-2xl (1rem)
const BORDER_CENTER_PX = 0.5; // center of 1px border

export type PerimeterGlowProps = {
  className?: string;
  children: React.ReactNode;
};

function rectToViewBox(
  width: number,
  height: number
): { x: number; y: number; w: number; h: number; rx: number; ry: number } {
  if (width <= 0 || height <= 0) {
    return { x: 2, y: 2, w: 96, h: 96, rx: 18, ry: 18 };
  }
  const vw = 100;
  const vh = 100;
  const scaleX = vw / width;
  const scaleY = vh / height;
  const x = BORDER_CENTER_PX * scaleX;
  const y = BORDER_CENTER_PX * scaleY;
  const w = vw - 2 * x;
  const h = vh - 2 * y;
  const rx = Math.min(BORDER_RADIUS_PX * scaleX, w / 2);
  const ry = Math.min(BORDER_RADIUS_PX * scaleY, h / 2);
  return { x, y, w, h, rx, ry };
}

const FALLBACK_RECT = { x: 2, y: 2, w: 96, h: 96, rx: 18, ry: 18 };

export function PerimeterGlow({ className, children }: PerimeterGlowProps) {
  const id = useId().replace(/:/g, "");
  const gradId = `pg-grad-${id}`;
  const trailId = `pg-trail-${id}`;
  const glowId = `pg-glow-${id}`;
  const wrapRef = useRef<HTMLDivElement>(null);
  const [size, setSize] = useState({ width: 0, height: 0 });

  useLayoutEffect(() => {
    const el = wrapRef.current;
    if (!el) return;
    const update = () => {
      const { width, height } = el.getBoundingClientRect();
      setSize({ width, height });
    };
    update();
    const ro = new ResizeObserver(update);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  const rect =
    size.width > 0 && size.height > 0
      ? rectToViewBox(size.width, size.height)
      : FALLBACK_RECT;

  return (
    <div
      ref={wrapRef}
      className={cn("perimeter-glow-wrap relative rounded-2xl group transition-shadow duration-200", className)}
    >
      <div className="relative rounded-2xl border border-blue-200/70 bg-white">
        {children}
      </div>
      <svg
        className="pointer-events-none absolute inset-0 h-full w-full"
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
        aria-hidden
      >
        <defs>
          <linearGradient id={gradId} x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="transparent" />
            <stop offset="20%" stopColor="#93C5FD" />
            <stop offset="50%" stopColor="#2563EB" />
            <stop offset="80%" stopColor="#60A5FA" />
            <stop offset="100%" stopColor="transparent" />
          </linearGradient>
          <linearGradient id={trailId} x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="transparent" />
            <stop offset="40%" stopColor="rgba(147,197,253,0.6)" />
            <stop offset="100%" stopColor="transparent" />
          </linearGradient>
          <filter id={glowId}>
            <feGaussianBlur in="SourceGraphic" stdDeviation="2.4" />
          </filter>
        </defs>
        {/* A) Base stroke — always visible (idle), path aligned to inner border */}
        <rect
          x={rect.x}
          y={rect.y}
          width={rect.w}
          height={rect.h}
          rx={rect.rx}
          ry={rect.ry}
          fill="none"
          stroke="rgba(37,99,235,0.35)"
          strokeWidth="2"
          vectorEffect="non-scaling-stroke"
        />
        {/* B) Main highlight stroke */}
        <rect
          x={rect.x}
          y={rect.y}
          width={rect.w}
          height={rect.h}
          rx={rect.rx}
          ry={rect.ry}
          fill="none"
          stroke={`url(#${gradId})`}
          strokeWidth="2"
          strokeLinecap="round"
          strokeDasharray="120 560"
          vectorEffect="non-scaling-stroke"
          className="pg-anim pg-main"
        />
        {/* C) Glow stroke (duplicate of main) */}
        <rect
          x={rect.x}
          y={rect.y}
          width={rect.w}
          height={rect.h}
          rx={rect.rx}
          ry={rect.ry}
          fill="none"
          stroke={`url(#${gradId})`}
          strokeWidth="4"
          strokeLinecap="round"
          strokeDasharray="120 560"
          vectorEffect="non-scaling-stroke"
          opacity="0.55"
          filter={`url(#${glowId})`}
          className="pg-anim pg-glow"
        />
        {/* D) Secondary trail stroke */}
        <rect
          x={rect.x}
          y={rect.y}
          width={rect.w}
          height={rect.h}
          rx={rect.rx}
          ry={rect.ry}
          fill="none"
          stroke={`url(#${trailId})`}
          strokeWidth="2"
          strokeLinecap="round"
          strokeDasharray="80 600"
          vectorEffect="non-scaling-stroke"
          className="pg-anim pg-trail"
        />
      </svg>
    </div>
  );
}
