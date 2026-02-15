"use client";

import { useParams, notFound } from "next/navigation";
import Link from "next/link";
import { useCallback, useEffect, useState } from "react";
import { getWorldBySlug } from "@/lib/worlds";
import type { PathNode } from "@/lib/worlds";
import type { ModelingProgress } from "@/lib/worlds/progress";
import { getProgressSnapshot } from "@/lib/worlds/progress";
import { getLabBySlug } from "@/lib/worlds/catalog";
import { SalaryHUD } from "@/components/worlds/SalaryHUD";
import { FSMDetailClient } from "@/components/worlds/FSMDetailClient";
import { WorldComingSoon } from "@/components/worlds/WorldComingSoon";
import { useMounted } from "@/hooks/useMounted";

const worldsDetailBg = {
  backgroundImage: `radial-gradient(ellipse at top, rgba(37,99,235,0.14), transparent 60%), linear-gradient(rgba(37,99,235,0.035) 1px, transparent 1px), linear-gradient(90deg, rgba(37,99,235,0.035) 1px, transparent 1px)`,
  backgroundSize: "100% 100%, 44px 44px, 44px 44px",
};

type NodeState = "locked" | "unlocked" | "completed";

function getNodeState(
  completedNodeIds: string[],
  nodes: PathNode[],
  nodeIndex: number
): NodeState {
  const node = nodes[nodeIndex];
  if (!node) return "locked";
  if (completedNodeIds.includes(node.id)) return "completed";
  if (nodeIndex === 0) return "unlocked";
  const prev = nodes[nodeIndex - 1];
  return prev && completedNodeIds.includes(prev.id) ? "unlocked" : "locked";
}

interface NodeBubbleProps {
  node: PathNode;
  state: NodeState;
  worldSlug: string;
  onLockedClick: () => void;
}

function NodeBubble({ node, state, worldSlug, onLockedClick }: NodeBubbleProps) {
  const isLocked = state === "locked";
  const isCompleted = state === "completed";
  const isUnlocked = state === "unlocked";
  const isBoss = node.isBoss === true;
  const href = `/worlds/${worldSlug}/lesson/${node.lessonId}?nodeId=${encodeURIComponent(node.id)}`;

  const content = (
    <>
      <span
        className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-sm font-bold transition ${
          isCompleted
            ? "bg-success/20 text-success"
            : isUnlocked
              ? "bg-brand-primary/15 text-brand-primary group-hover:bg-brand-primary/25"
              : "bg-black/10 text-text-secondary"
        } ${isBoss ? "ring-2 ring-warning/50 text-warning" : ""}`}
        aria-hidden
      >
        {isCompleted ? "✓" : isBoss ? "★" : node.order}
      </span>
      <span className="min-w-0 flex-1 truncate text-left text-sm font-medium text-text-primary">
        {node.title}
      </span>
    </>
  );

  if (isLocked) {
    return (
      <button
        type="button"
        onClick={onLockedClick}
        className="group flex w-full items-center gap-3 rounded-xl border-2 border-black/10 bg-surface-base px-4 py-3 opacity-70 transition hover:border-black/20 hover:opacity-90 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary focus-visible:ring-offset-2"
        aria-label={`${node.title} (locked)`}
      >
        {content}
        <span className="shrink-0 text-black/40" aria-hidden>🔒</span>
      </button>
    );
  }

  return (
    <Link
      href={href}
      className={`group flex w-full items-center gap-3 rounded-xl border-2 px-4 py-3 shadow-card transition focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary focus-visible:ring-offset-2 ${
        isBoss
          ? "border-warning/50 bg-warning/5 hover:border-warning/70 hover:shadow-elevated"
          : "border-brand-primary/30 bg-surface-raised hover:border-brand-primary/50 hover:shadow-elevated"
      }`}
      aria-label={isCompleted ? `${node.title} (completed)` : node.title}
    >
      {content}
      {isBoss && (
        <span className="shrink-0 rounded-full bg-warning/20 px-2 py-0.5 text-xs font-semibold text-warning">
          Boss
        </span>
      )}
    </Link>
  );
}

const EMPTY_PROGRESS: ModelingProgress = { completedNodeIds: [] };

function ExistingWorldMap({
  worldSlug,
  world,
}: {
  worldSlug: string;
  world: { title: string; nodes: PathNode[] };
}) {
  const mounted = useMounted();
  const [progress, setProgress] = useState<ModelingProgress>(EMPTY_PROGRESS);
  const [lockedMessage, setLockedMessage] = useState<string | null>(null);

  const refreshProgress = useCallback(() => {
    setProgress(getProgressSnapshot());
  }, []);

  useEffect(() => {
    if (!mounted) return;
    refreshProgress();
  }, [mounted, refreshProgress]);

  useEffect(() => {
    if (!mounted) return;
    const onFocus = () => refreshProgress();
    window.addEventListener("focus", onFocus);
    return () => window.removeEventListener("focus", onFocus);
  }, [mounted, refreshProgress]);

  const nodes = [...world.nodes].sort((a, b) => a.order - b.order);
  const handleLockedClick = () => {
    setLockedMessage("Finish the previous node first.");
    setTimeout(() => setLockedMessage(null), 3000);
  };

  return (
    <div className="mx-auto max-w-2xl">
      <header className="mb-8">
        <h1 className="font-display text-2xl font-bold text-brand-primary">
          {world.title}
        </h1>
        <div className="mt-4">
          <SalaryHUD />
        </div>
        {lockedMessage && (
          <p
            className="mt-3 rounded-lg bg-warning/15 px-3 py-2 text-sm text-warning"
            role="status"
          >
            {lockedMessage}
          </p>
        )}
      </header>
      <section aria-label="Path">
        <ul className="flex flex-col gap-3">
          {nodes.map((node, index) => (
            <li key={node.id}>
              <NodeBubble
                node={node}
                state={getNodeState(progress.completedNodeIds, nodes, index)}
                worldSlug={worldSlug}
                onLockedClick={handleLockedClick}
              />
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}

export default function WorldPage() {
  const params = useParams();
  const worldSlug = typeof params?.worldSlug === "string" ? params.worldSlug : "";

  const lab = getLabBySlug(worldSlug);
  const world = getWorldBySlug(worldSlug);

  if (!worldSlug) {
    notFound();
  }

  if (lab && lab.slug === "fsm") {
    return (
      <div
        className="min-h-screen px-4 py-8 md:py-12"
        style={worldsDetailBg}
      >
        <FSMDetailClient />
      </div>
    );
  }

  if (lab && lab.slug !== "fsm") {
    return (
      <div
        className="min-h-screen"
        style={worldsDetailBg}
      >
        <WorldComingSoon lab={lab} />
      </div>
    );
  }

  if (world) {
    return (
      <div className="mx-auto max-w-4xl px-4 py-8">
        <ExistingWorldMap worldSlug={worldSlug} world={world} />
      </div>
    );
  }

  notFound();
}
