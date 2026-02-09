"use client";

import { Suspense, useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { loadProgress, completeNode } from "@/lib/progress";
import type { Progress } from "@/lib/progress";
import { getNodeById } from "@/lib/curriculum";
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
      <div className="flex min-h-[60vh] items-center justify-center">
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

    setPostCompleteData(buildPostCompleteData(selectedNode, newSessionCount));
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
    <div className="flex flex-col gap-8 lg:flex-row lg:items-start lg:gap-10">
      <section className="min-w-0 flex-1 overflow-auto">
        <div className="max-h-[calc(100vh-8rem)] overflow-y-auto pr-2">
          <BuildingPath progress={progress} onSelectNode={handleSelectNode} />
        </div>
      </section>
      <section className="shrink-0 lg:sticky lg:top-24">
        <WolfPanel progress={progress} />
      </section>

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
