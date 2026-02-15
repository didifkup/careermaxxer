"use client";

import Link from "next/link";
import type { LabDef } from "@/lib/worlds/catalog";
import { WorldIcon } from "./WorldIcon";

export type WorldComingSoonProps = {
  lab: LabDef;
};

export function WorldComingSoon({ lab }: WorldComingSoonProps) {
  return (
    <div className="mx-auto max-w-[500px] space-y-8 px-4 py-12">
      <nav className="text-sm text-slate-500">
        <Link href="/worlds" className="text-blue-600 hover:underline">
          Labs
        </Link>
        <span className="mx-2">→</span>
        <span className="text-slate-700">{lab.title}</span>
      </nav>
      <div className="flex flex-col items-center rounded-3xl border border-blue-100/70 bg-white/75 p-8 shadow-[0_20px_60px_rgba(37,99,235,0.10)] backdrop-blur-xl text-center">
        <WorldIcon slug={lab.slug} className="mx-auto" />
        <h1 className="mt-6 font-display text-2xl font-semibold text-slate-800">
          {lab.title}
        </h1>
        <p className="mt-2 text-slate-500">
          This lab is being calibrated. For now, run Financial System Core.
        </p>
        <p className="mt-4 text-sm text-slate-400">
          Unlock logic can be added later. This is a placeholder.
        </p>
        <Link
          href="/worlds"
          className="mt-8 inline-flex items-center gap-2 rounded-2xl border border-blue-200/80 bg-white px-4 py-2.5 text-sm font-medium text-blue-700 transition hover:bg-blue-50"
        >
          ← Back to Labs
        </Link>
      </div>
    </div>
  );
}
