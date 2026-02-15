"use client";

/**
 * Practice page = Tower (game system).
 * Renders the entire practice experience: floors (concept groupings), nodes (playable lessons),
 * stairs (progress connectors), landings (breathers), and rewards (salary, confidence, completion).
 * See src/types/practice-game.ts for the conceptual vocabulary.
 */
import { Suspense, useEffect, useRef, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { loadProgress, completeNode } from "@/lib/progress";
import type { Progress } from "@/lib/progress";
import { getNodeById, getNextNodeAfter } from "@/lib/curriculum";
import type { Node } from "@/lib/curriculum";
import { track } from "@/lib/analytics";
import { useToast } from "@/contexts/ToastContext";
import { useSessionProgress } from "@/hooks/useSessionProgress";
import { BINGE_BREATHER_AFTER_NODES } from "@/lib/constants";
import { formatSalary } from "@/lib/format";
import { BuildingPath } from "@/components/BuildingPath";
import { WolfMascotCard } from "@/components/ladder/WolfMascotCard";
import { LearningModal } from "@/components/LearningModal";
import { SALARY_MAX } from "@/lib/constants";
import type { PostCompleteData } from "@/components/PostCompleteView";
import { GlassCard } from "@/components/ui/glass-card";

const practicePageBg = {
  backgroundImage: `radial-gradient(ellipse at top, rgba(37,99,235,0.14), transparent 60%), linear-gradient(rgba(37,99,235,0.035) 1px, transparent 1px), linear-gradient(90deg, rgba(37,99,235,0.035) 1px, transparent 1px)`,
  backgroundSize: "100% 100%, 44px 44px, 44px 44px",
};

function PracticePageContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { addToast } = useToast();
  const { sessionCompletedCount, incrementSession, buildPostCompleteData } = useSessionProgress();
  const [progress, setProgress] = useState<Progress | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedNode, setSelectedNode] = useState<Node | null>(null);
  const [postCompleteData, setPostCompleteData] = useState<PostCompleteData | null>(null);
  const [justCompletedNodeId, setJustCompletedNodeId] = useState<string | null>(null);
  const [justEarnedSalary, setJustEarnedSalary] = useState<number | null>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  /** After completion sequence, scroll tower so next node is clearly visible. Smooth; respect reduced-motion. */
  useEffect(() => {
    if (!justCompletedNodeId) return;
    const nextNode = getNextNodeAfter(justCompletedNodeId);
    if (!nextNode) return;
    const container = scrollContainerRef.current;
    if (!container) return;

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const delayMs = 580; // Just after completion sequence (~550ms) so scroll feels like a guided next step

    const t = setTimeout(() => {
      const el = container.querySelector(`[data-node-id="${nextNode.id}"]`);
      if (el instanceof HTMLElement) {
        el.scrollIntoView({
          behavior: prefersReducedMotion ? "auto" : "smooth",
          block: "center",
          inline: "nearest",
        });
      }
    }, delayMs);
    return () => clearTimeout(t);
  }, [justCompletedNodeId]);

  useEffect(() => {
    const p = loadProgress();
    setProgress(p);
    setDisplaySalary(p.salary);
  }, []);

  useEffect(() => {
    const openId = searchParams.get("open");
    if (openId) {
      const node = getNodeById(openId);
      if (node) {
        setSelectedNode(node);
        setPostCompleteData(null);
        setModalOpen(true);
        track("node_opened", { nodeId: openId });
        router.replace("/practice");
      }
    }
  }, [searchParams, router]);

  useEffect(() => {
    const onReset = () => {
      const p = loadProgress();
      setProgress(p);
      setDisplaySalary(p.salary);
    };
    window.addEventListener("progress-reset", onReset);
    return () => window.removeEventListener("progress-reset", onReset);
  }, []);

  const refreshProgress = () => {
    const p = loadProgress();
    setProgress(p);
    setDisplaySalary(p.salary);
  };

  /** Single source of truth for animated salary (hero + WolfPanel). */
  const [displaySalary, setDisplaySalary] = useState(0);
  useEffect(() => {
    if (progress === null) return;
    if (justEarnedSalary == null) setDisplaySalary(progress.salary);
  }, [progress?.salary, justEarnedSalary, progress]);
  useEffect(() => {
    if (justEarnedSalary == null || justEarnedSalary <= 0 || progress === null) return;
    const startSalary = progress.salary - justEarnedSalary;
    const endSalary = progress.salary;
    setDisplaySalary(startSalary);
    const startTime = performance.now();
    let rafId: number;
    const tick = () => {
      const elapsed = performance.now() - startTime;
      const t = Math.min(1, elapsed / 420);
      const eased = 1 - (1 - t) ** 3;
      setDisplaySalary(Math.round(startSalary + (endSalary - startSalary) * eased));
      if (t < 1) rafId = requestAnimationFrame(tick);
    };
    rafId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafId);
  }, [justEarnedSalary, progress?.salary, progress]);

  if (progress === null) {
    return (
      <div
        className="practice-tower practice-tower-page flex min-h-[60vh] flex-1 items-center justify-center pt-6"
        style={practicePageBg}
      >
        <div className="h-10 w-10 animate-spin rounded-full border-2 border-blue-500 border-t-transparent" />
      </div>
    );
  }

  const handleSelectNode = (nodeId: string) => {
    const node = getNodeById(nodeId);
    if (node) {
      setSelectedNode(node);
      setPostCompleteData(null);
      setModalOpen(true);
      track("node_opened", { nodeId });
    }
  };

  const handleModalComplete = () => {
    if (!selectedNode) return;
    completeNode(selectedNode.id);
    refreshProgress();
    const newSessionCount = sessionCompletedCount + 1;
    incrementSession();

    track("node_completed", { nodeId: selectedNode.id });
    if (newSessionCount === BINGE_BREATHER_AFTER_NODES) track("session_4_nodes_reached");

    addToast("Progress saved!", "info");

    setModalOpen(false);
    setPostCompleteData(null);
    setJustCompletedNodeId(selectedNode.id);
    setJustEarnedSalary(selectedNode.salaryReward);
    setTimeout(() => setJustCompletedNodeId(null), 800);
    setTimeout(() => setJustEarnedSalary(null), 2500);
  };

  const handleClose = () => {
    setModalOpen(false);
    setPostCompleteData(null);
  };

  const handleOpenNextNode = (nextNode: Node) => {
    setSelectedNode(nextNode);
    setPostCompleteData(null);
  };

  const handleShowNextReward = () => {
    setPostCompleteData((prev) =>
      prev ? { ...prev, view: "nextReward" } : null
    );
  };

  return (
    <div
      className="practice-tower practice-tower-page flex min-h-0 flex-1 flex-col"
      style={practicePageBg}
    >
      <div className="mx-auto w-full max-w-[900px] flex-1 flex flex-col px-4 py-8 md:py-10">
        {/* Hero: Labs-style header + right-side metric */}
        <header className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h1 className="font-display text-3xl font-semibold text-slate-800 md:text-4xl">
              Career Ladder
            </h1>
            <p className="mt-1 text-base text-slate-500 md:text-lg">
              Master technical concepts. Increase your market value.
            </p>
          </div>
          <div className="flex shrink-0 items-center gap-3 rounded-2xl border border-blue-100/70 bg-white/60 px-4 py-3 backdrop-blur-sm">
            <span className="text-xs font-medium uppercase tracking-wide text-slate-500">
              Market Value
            </span>
            <span
              className={`tabular-nums font-semibold text-slate-800 ${
                justEarnedSalary != null && justEarnedSalary > 0 ? "text-emerald-600" : ""
              }`}
            >
              {formatSalary(displaySalary)}
            </span>
            {justEarnedSalary != null && justEarnedSalary > 0 && (
              <span className="text-xs font-semibold text-emerald-600">
                +{formatSalary(justEarnedSalary)}
              </span>
            )}
          </div>
        </header>

        {/* Ladder + mascot: 12-col grid — map 8–9 cols, mascot 3–4 cols; mobile stack */}
        <GlassCard className="practice-tower-container grid min-h-0 flex-1 grid-cols-1 overflow-hidden p-4 md:grid-cols-12 md:p-6 md:gap-6">
          <div
            ref={scrollContainerRef}
            className="min-h-0 overflow-y-auto overflow-x-hidden pb-4 scroll-smooth md:col-span-8 lg:col-span-9"
          >
            <BuildingPath
              progress={progress}
              onSelectNode={handleSelectNode}
              justCompletedNodeId={justCompletedNodeId}
              selectedNodeId={selectedNode?.id ?? undefined}
            />
          </div>
          <section className="flex min-w-0 flex-col md:col-span-4 md:self-start lg:col-span-3">
            <WolfMascotCard
              level={Math.max(1, Math.min(13, progress.currentFloor + progress.wolfStage * 2))}
              marketValue={displaySalary}
              progressPct={(displaySalary / SALARY_MAX) * 100}
              justEarnedSalary={justEarnedSalary}
              currentLevelLabel={`Level ${String(progress.currentFloor).padStart(2, "0")}`}
              goalLabel={formatSalary(SALARY_MAX)}
            />
          </section>
        </GlassCard>
      </div>

      <LearningModal
        open={modalOpen}
        node={selectedNode}
        postCompleteData={postCompleteData}
        onClose={handleClose}
        onComplete={handleModalComplete}
        onOpenNextNode={handleOpenNextNode}
        onShowNextReward={handleShowNextReward}
      />
    </div>
  );
}

export default function PracticePage() {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-[60vh] items-center justify-center">
          <div className="h-10 w-10 animate-spin rounded-full border-2 border-brand-primary border-t-transparent" />
        </div>
      }
    >
      <PracticePageContent />
    </Suspense>
  );
}
