"use client";

import { useEffect } from "react";
import Link from "next/link";
import type { Node } from "@/lib/curriculum";

const BULLETS_MAX = 4;

interface ReadingCardProps {
  open: boolean;
  node: Node | null;
  onClose: () => void;
}

export function ReadingCard({ open, node, onClose }: ReadingCardProps) {
  useEffect(() => {
    if (!open) return;
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleEscape);
    return () => window.removeEventListener("keydown", handleEscape);
  }, [open, onClose]);

  if (!open) return null;

  const handleOverlayClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) onClose();
  };

  if (!node) return null;

  const { lesson } = node;
  const bullets = lesson.bullets.slice(0, BULLETS_MAX);

  return (
    <div
      className="fixed inset-0 z-50 flex p-4 max-sm:items-end max-sm:justify-center max-sm:p-0 sm:items-center sm:justify-center"
      role="dialog"
      aria-modal="true"
      aria-labelledby="reading-card-title"
    >
      <div
        className="absolute inset-0 bg-black/50 animate-[fade-in_0.2s_ease-out_forwards]"
        onClick={handleOverlayClick}
        aria-hidden
      />
      <div
        className="relative z-10 w-full max-w-lg max-h-[90vh] overflow-hidden rounded-2xl bg-surface-raised shadow-elevated flex flex-col animate-[slide-up_0.3s_ease-out] max-sm:max-h-[85vh] max-sm:rounded-b-none max-sm:rounded-t-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="shrink-0 border-b border-black/5 px-5 py-4">
          <div className="flex items-center justify-between gap-3">
            <span className="rounded-full bg-brand-primary/15 px-2.5 py-0.5 text-xs font-semibold text-brand-primary">
              Floor {node.floorNumber}
            </span>
          </div>
          <h2 id="reading-card-title" className="mt-1 text-lg font-bold text-text-primary">
            {node.title}
          </h2>
        </div>
        <div className="flex-1 overflow-y-auto px-5 py-4 space-y-5">
          <p className="text-base font-semibold leading-snug text-text-primary">
            {lesson.headline}
          </p>
          {bullets.length > 0 && (
            <ul className="space-y-2">
              {bullets.map((b, i) => (
                <li key={i} className="flex gap-2 text-sm text-text-primary">
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-brand-primary" />
                  <span>{b}</span>
                </li>
              ))}
            </ul>
          )}
          <div className="rounded-xl bg-brand-primary/5 p-4">
            <p className="text-xs font-semibold uppercase tracking-wide text-brand-primary">
              Like you&apos;re 5
            </p>
            <p className="mt-2 text-sm leading-snug text-text-primary">
              {lesson.analogy}
            </p>
          </div>
          <p className="text-sm font-medium text-text-secondary">
            {lesson.recap}
          </p>
        </div>
        <div className="shrink-0 border-t border-black/5 px-5 py-4 flex gap-3">
          <button
            type="button"
            onClick={onClose}
            className="flex-1 rounded-xl border-2 border-black/15 bg-surface-base py-3 font-semibold text-text-primary transition hover:bg-black/5"
          >
            Close
          </button>
          <Link
            href={`/?open=${encodeURIComponent(node.id)}`}
            className="flex-1 rounded-xl bg-brand-accent py-3 text-center font-semibold text-white shadow-card transition hover:opacity-95 active:scale-[0.99]"
          >
            Practice this now
          </Link>
        </div>
      </div>
    </div>
  );
}
