"use client";

import { useEffect, useState } from "react";
import { getSalarySnapshot, SALARY_CAP } from "@/lib/worlds/progress";
import { useMounted } from "@/hooks/useMounted";

function formatSalary(n: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
    minimumFractionDigits: 0,
  }).format(n);
}

export function SalaryHUD() {
  const mounted = useMounted();
  const [salary, setSalary] = useState(0);

  useEffect(() => {
    if (!mounted) return;
    setSalary(getSalarySnapshot());
  }, [mounted]);

  useEffect(() => {
    if (!mounted) return;
    const onFocus = () => setSalary(getSalarySnapshot());
    window.addEventListener("focus", onFocus);
    return () => window.removeEventListener("focus", onFocus);
  }, [mounted]);

  const displaySalary = mounted ? salary : 0;
  const pct = mounted ? Math.min(100, SALARY_CAP > 0 ? (salary / SALARY_CAP) * 100 : 0) : 0;

  return (
    <div className="flex min-w-0 flex-col gap-1.5 sm:flex-row sm:items-center sm:gap-3">
      <div className="min-w-0 shrink-0">
        <p className="text-xs text-text-secondary">Starting Salary</p>
        <p className="font-semibold text-brand-accent tabular-nums">
          {formatSalary(displaySalary)} / {formatSalary(SALARY_CAP)}
        </p>
      </div>
      <div
        className="h-2.5 min-w-[80px] flex-1 overflow-hidden rounded-full bg-black/10 shadow-inner sm:h-3 sm:max-w-[200px]"
        role="progressbar"
        aria-valuenow={displaySalary}
        aria-valuemin={0}
        aria-valuemax={SALARY_CAP}
        aria-label="Starting salary progress"
      >
        <div
          className="h-full rounded-full bg-brand-accent transition-all duration-500 ease-out"
          style={{ width: `${pct}%` }}
        />
      </div>
    </div>
  );
}
