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
import { BuildingPath } from "@/components/BuildingPath";
import { WolfPanel } from "@/components/WolfPanel";
import { LearningModal } from "@/components/LearningModal";
import type { PostCompleteData } from "@/components/PostCompleteView";

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
    setProgress(loadProgress());
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
    const onReset = () => setProgress(loadProgress());
    window.addEventListener("progress-reset", onReset);
    return () => window.removeEventListener("progress-reset", onReset);
  }, []);

  const refreshProgress = () => setProgress(loadProgress());

  if (progress === null) {
    return (
      <div
        className="practice-tower practice-tower-page flex min-h-[60vh] flex-1 items-center justify-center pt-6"
        style={{ background: "var(--practice-tower-bg)" }}
      >
        <div className="h-10 w-10 animate-spin rounded-full border-2 border-brand-primary border-t-transparent" />
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
      className="practice-tower practice-tower-page flex min-h-0 flex-1 flex-col pt-2"
      style={{ background: "var(--practice-tower-bg)" }}
    >
      <div
        ref={scrollContainerRef}
        className="practice-tower-container mx-auto w-full max-w-[880px] flex-1 flex flex-col overflow-y-auto overflow-x-hidden pb-4 scroll-smooth"
      >
        <section className="flex flex-col gap-3">
          <BuildingPath
            progress={progress}
            onSelectNode={handleSelectNode}
            justCompletedNodeId={justCompletedNodeId}
            selectedNodeId={selectedNode?.id ?? undefined}
          />
          <section>
            <WolfPanel progress={progress} justEarnedSalary={justEarnedSalary} />
          </section>
        </section>
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
