"use client";

import { useState, useCallback } from "react";
import { loadProgress } from "@/lib/progress";
import { getNextNodeAfter } from "@/lib/curriculum";
import type { Node } from "@/lib/curriculum";
import {
  BINGE_BREATHER_AFTER_NODES,
  BINGE_MID_SESSION_PEAK_AFTER_NODES,
} from "@/lib/constants";
import type { PostCompleteData, PostCompleteViewType } from "@/components/PostCompleteView";

/**
 * Determines which post-complete view to show based on session node count.
 * Binge rhythm: node 1–2 → nextReward, node 3 → midSessionPeak, node 4 → breather.
 * Preserves UX: mid-session peak after 3rd node, soft burnout breather after 4th.
 */
export function getPostCompleteViewType(sessionCompletedCount: number): PostCompleteViewType {
  if (sessionCompletedCount >= BINGE_BREATHER_AFTER_NODES) return "breather";
  if (sessionCompletedCount >= BINGE_MID_SESSION_PEAK_AFTER_NODES) return "midSessionPeak";
  return "nextReward";
}

/**
 * In-memory session progress for the 15-minute binge flow.
 * Not persisted: resets when the user leaves the page. Used to:
 * - Show mid-session peak after 3rd node, breather after 4th
 * - Trigger calm-mode styling (slower animations, calmer colors) after 4 nodes
 * - Track analytics (e.g. session_4_nodes_reached)
 * Does not change persisted progress (that stays in progress.ts / localStorage).
 */
export function useSessionProgress() {
  const [sessionCompletedCount, setSessionCompletedCount] = useState(0);

  /**
   * Call after completing a node: increments in-memory session count.
   * Page should pass (sessionCompletedCount + 1) into buildPostCompleteData so the correct view is shown.
   */
  const incrementSession = useCallback(() => {
    setSessionCompletedCount((prev) => prev + 1);
  }, []);

  /**
   * Builds the post-complete payload shown in the modal after a node is completed.
   * Uses session count to pick view: 3 → midSessionPeak, 4 → breather, else nextReward (one-more-node preview).
   */
  const buildPostCompleteData = useCallback(
    (completedNode: Node, newSessionCount: number): PostCompleteData => {
      const nextNode = getNextNodeAfter(completedNode.id) ?? null;
      const view = getPostCompleteViewType(newSessionCount);
      const nextProgress = loadProgress();
      return {
        view,
        nextNode,
        sessionCompletedCount: newSessionCount,
        completedNode,
        currentFloor: nextProgress.currentFloor,
      };
    },
    []
  );

  return {
    sessionCompletedCount,
    incrementSession,
    buildPostCompleteData,
    getPostCompleteViewType,
  };
}
