"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import {
  getProgressSnapshot,
  getSalarySnapshot,
  resetProgress,
  resetSalary,
  addSalary,
  SALARY_CAP,
} from "@/lib/worlds/progress";
import { useMounted } from "@/hooks/useMounted";

function formatSalary(n: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
    minimumFractionDigits: 0,
  }).format(n);
}

/**
 * Dev-only debug page for Worlds progress/salary QA.
 * Not linked in nav — use /worlds/debug directly.
 */
export default function WorldsDebugPage() {
  const mounted = useMounted();
  const [salary, setSalary] = useState(0);
  const [progress, setProgress] = useState<{ completedNodeIds: string[] }>({
    completedNodeIds: [],
  });

  const refresh = () => {
    setSalary(getSalarySnapshot());
    setProgress(getProgressSnapshot());
  };

  useEffect(() => {
    if (!mounted) return;
    refresh();
  }, [mounted]);

  const handleResetAll = () => {
    resetProgress();
    resetSalary();
    refresh();
  };

  const handleSetSalaryToCap = () => {
    resetSalary();
    addSalary(179_000);
    refresh();
  };

  return (
    <div className="mx-auto max-w-2xl space-y-6">
      <div className="flex items-center justify-between gap-4">
        <h1 className="font-display text-xl font-bold text-brand-primary">
          Worlds debug (QA)
        </h1>
        <Link
          href="/worlds"
          className="text-sm text-text-secondary underline hover:text-text-primary"
        >
          ← Back to Worlds
        </Link>
      </div>

      <section className="rounded-xl border-2 border-black/10 bg-surface-base p-4">
        <h2 className="text-sm font-semibold text-text-secondary">Salary</h2>
        <p className="mt-1 font-semibold text-brand-accent tabular-nums">
          {formatSalary(salary)} / {formatSalary(SALARY_CAP)}
        </p>
      </section>

      <section className="rounded-xl border-2 border-black/10 bg-surface-base p-4">
        <h2 className="text-sm font-semibold text-text-secondary">
          Completed nodes ({progress.completedNodeIds.length})
        </h2>
        <ul className="mt-2 max-h-40 overflow-y-auto text-sm text-text-primary">
          {progress.completedNodeIds.length === 0 ? (
            <li className="text-text-secondary">None</li>
          ) : (
            progress.completedNodeIds.map((id) => (
              <li key={id} className="font-mono">
                {id}
              </li>
            ))
          )}
        </ul>
      </section>

      <div className="flex flex-wrap gap-2">
        <button
          type="button"
          onClick={handleResetAll}
          className="rounded-lg border-2 border-error/50 bg-error/10 px-4 py-2 text-sm font-semibold text-error transition hover:bg-error/20"
        >
          Reset salary + progress
        </button>
        <button
          type="button"
          onClick={handleSetSalaryToCap}
          className="rounded-lg border-2 border-brand-primary/30 bg-brand-primary/10 px-4 py-2 text-sm font-semibold text-brand-primary transition hover:bg-brand-primary/20"
        >
          Set salary to $179,000 (test cap)
        </button>
      </div>
    </div>
  );
}
