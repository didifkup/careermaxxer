"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { resetProgress } from "@/lib/progress";
import { useToast } from "@/contexts/ToastContext";

export function Nav() {
  const pathname = usePathname();
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [logoError, setLogoError] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  const { addToast } = useToast();

  useEffect(() => {
    if (!settingsOpen) return;
    const close = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) setSettingsOpen(false);
    };
    document.addEventListener("click", close);
    return () => document.removeEventListener("click", close);
  }, [settingsOpen]);

  const handleResetProgress = () => {
    if (typeof window === "undefined") return;
    if (!window.confirm("Reset all progress? This can't be undone.")) return;
    resetProgress();
    window.dispatchEvent(new CustomEvent("progress-reset"));
    addToast("Progress reset.", "info");
    setSettingsOpen(false);
  };

  const tabs = [
    { label: "Technicals", href: "/practice" },
    { label: "Reading", href: "/learn" },
    { label: "Quiz", href: "/quiz" },
    { label: "Labs", href: "/worlds" },
    { label: "Resume Lab", href: "/worlds/resume" },
    { label: "Storyteller", href: "/storyteller" },
    { label: "Mock", href: "/mock-interview" },
    { label: "Arena", href: "/arena" },
  ];

  return (
    <header className="sticky top-0 z-50 border-b border-black/5 bg-surface-raised shadow-sm">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-4 sm:px-6">
        <Link
          href="/"
          aria-label="CareerMaxxer home"
          className="group relative inline-flex items-center gap-3 rounded-full px-2 py-1.5 transition-all duration-200 hover:bg-slate-900/[0.035] active:scale-[0.99]"
        >
          {/* Glass highlight sweep */}
          <span className="pointer-events-none absolute inset-0 overflow-hidden rounded-full">
            <span
              className="cm-sheen-trigger absolute -left-1/2 top-[-60%] h-[220%] w-1/2 opacity-0 group-hover:opacity-100"
              style={{
                background:
                  "linear-gradient(90deg, transparent, rgba(255,255,255,.55), transparent)",
              }}
            />
          </span>

          {/* Logo + animated ring */}
          <span className="relative flex h-10 w-10 items-center justify-center">
            {/* Soft glow */}
            <span className="pointer-events-none absolute inset-0 rounded-2xl bg-gradient-to-tr from-blue-500/25 via-cyan-400/20 to-indigo-500/25 blur-md opacity-70 transition-opacity duration-200 group-hover:opacity-95" />

            {/* Electric ring (appears + rotates on hover) */}
            <span
              className="cm-spin-ring pointer-events-none absolute -inset-1 rounded-[18px] opacity-0 transition-opacity duration-200 group-hover:opacity-100"
              style={{
                background:
                  "conic-gradient(from 180deg, rgba(59,130,246,.60), rgba(34,211,238,.50), rgba(99,102,241,.55), rgba(59,130,246,.60))",
                WebkitMask:
                  "radial-gradient(farthest-side, transparent calc(100% - 3px), #000 calc(100% - 2px))",
                mask:
                  "radial-gradient(farthest-side, transparent calc(100% - 3px), #000 calc(100% - 2px))",
              }}
            />

            {/* Logo chip */}
            <span className="relative flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-white shadow-sm ring-1 ring-black/5 transition-transform duration-200 group-hover:scale-[1.06]">
              {logoError ? (
                <span className="text-sm font-black tracking-tighter text-slate-800" aria-hidden>
                  CM
                </span>
              ) : (
                <Image
                  src="/branding/cm-logo.png"
                  alt="CareerMaxxer"
                  width={40}
                  height={40}
                  priority
                  className="h-9 w-9 object-contain"
                  onError={() => setLogoError(true)}
                />
              )}
            </span>
          </span>

          {/* Aggressive wordmark */}
          <span className="flex flex-col leading-none">
            <span className="flex items-baseline gap-1">
              <span className="text-[15px] font-extrabold tracking-tight text-slate-950">
                Career
              </span>
              <span className="text-[15px] font-black tracking-tight bg-gradient-to-r from-slate-950 via-blue-700 to-cyan-500 bg-clip-text text-transparent">
                Maxxer
              </span>
            </span>
            <span className="mt-1 hidden sm:block text-[10px] font-semibold uppercase tracking-[0.22em] text-slate-500">
              fastest ib prep
            </span>
          </span>

          {/* Spark dot */}
          <span className="ml-1 hidden md:inline-flex h-1.5 w-1.5 rounded-full bg-gradient-to-r from-cyan-400 to-blue-500 opacity-70 group-hover:opacity-100 transition-opacity" />
        </Link>

        <nav className="flex items-center gap-1 rounded-full bg-black/5 p-1" aria-label="Main">
          {tabs.map(({ label, href }) => {
            const isActive =
              href === "/arena"
                ? pathname === "/arena" || pathname.startsWith("/arena/")
                : href === "/storyteller"
                  ? pathname === "/storyteller" || pathname.startsWith("/storyteller/")
                  : href === "/mock-interview"
                    ? pathname === "/mock-interview" || pathname.startsWith("/mock-interview/")
                    : href === "/learn"
                      ? pathname === "/learn" || pathname.startsWith("/learn/")
                      : pathname === href || (href === "/" && pathname === "/");
            return (
              <Link
                key={href}
                href={href}
                className={`rounded-full px-4 py-2 text-sm font-medium transition-all duration-200 ${
                  isActive
                    ? "bg-white text-brand-primary shadow-card"
                    : "text-text-secondary hover:bg-white/60 hover:text-text-primary"
                }`}
              >
                {label}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-3">
          <div className="relative" ref={menuRef}>
            <button
              type="button"
              onClick={() => setSettingsOpen((o) => !o)}
              className="rounded-full p-2 text-text-secondary transition hover:bg-black/5 hover:text-text-primary"
              aria-label="Settings"
              aria-expanded={settingsOpen}
            >
              <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </button>
            {settingsOpen && (
              <div className="absolute right-0 top-full mt-1 w-48 rounded-xl border border-black/10 bg-surface-raised py-1 shadow-elevated">
                <button
                  type="button"
                  onClick={handleResetProgress}
                  className="w-full px-4 py-2 text-left text-sm text-text-primary transition hover:bg-black/5"
                >
                  Reset Progress
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
