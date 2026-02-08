"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState, useRef } from "react";
import { loadProgress, resetProgress } from "@/lib/progress";
import { SALARY_MAX } from "@/lib/constants";
import { useToast } from "@/contexts/ToastContext";

function formatSalary(n: number): string {
  if (n >= 1_000_000) return `$${(n / 1_000_000).toFixed(1)}M`;
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
    minimumFractionDigits: 0,
  }).format(n);
}

export function Nav() {
  const pathname = usePathname();
  const [salary, setSalary] = useState(0);
  const [settingsOpen, setSettingsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  const { addToast } = useToast();

  useEffect(() => {
    setSalary(loadProgress().salary);
  }, []);

  useEffect(() => {
    const onReset = () => setSalary(loadProgress().salary);
    window.addEventListener("progress-reset", onReset);
    return () => window.removeEventListener("progress-reset", onReset);
  }, []);

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
    { label: "Practice", href: "/" },
    { label: "Reading", href: "/reading" },
    { label: "Quiz", href: "/quiz" },
    { label: "Worlds", href: "/worlds" },
  ];

  return (
    <header className="sticky top-0 z-50 border-b border-black/5 bg-surface-raised shadow-sm">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-4 sm:px-6">
        <Link
          href="/"
          className="font-display text-xl font-bold tracking-tight text-brand-primary transition hover:opacity-90 active:scale-[0.98]"
        >
          CareerMaxxer
        </Link>

        <nav className="flex items-center gap-1 rounded-full bg-black/5 p-1" aria-label="Main">
          {tabs.map(({ label, href }) => {
            const isActive = pathname === href || (href === "/" && pathname === "/");
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
          <div className="hidden min-w-[100px] text-right sm:block">
            <span className="text-xs text-text-secondary">Salary</span>
            <p className="font-semibold text-brand-accent">{formatSalary(salary)}</p>
          </div>
          <div className="h-10 w-24 overflow-hidden rounded-full bg-black/10 shadow-inner">
            <div
              className="h-full rounded-full bg-brand-accent transition-all duration-500 ease-out"
              style={{ width: `${Math.min(100, (salary / SALARY_MAX) * 100)}%` }}
              role="progressbar"
              aria-valuenow={salary}
              aria-valuemin={0}
              aria-valuemax={SALARY_MAX}
            />
          </div>

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
