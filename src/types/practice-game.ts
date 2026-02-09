/**
 * Practice Game System — conceptual model for the Practice page.
 * The page is treated as a game system, not a content list.
 *
 * Vocabulary:
 * - Tower: the entire practice experience (all floors, progress, rewards).
 * - Floor: a concept grouping; one level of the tower.
 * - Node: a playable lesson (one unit of learning).
 * - Stairs: progress connectors between floors (visual/structural link to next floor).
 * - Landing: a psychological breather (pause moment, e.g. after N nodes).
 * - Rewards: salary, confidence, and completion feedback.
 */

import type { Node } from "@/lib/curriculum";
import type { Progress } from "@/lib/progress";

// ---------------------------------------------------------------------------
// Tower — entire practice experience
// ---------------------------------------------------------------------------

/**
 * Tower: the entire practice experience.
 * Comprises all floors, the user's progress through nodes, and the reward state.
 * The Practice page renders the Tower (BuildingPath + WolfPanel + modals).
 */
export interface Tower {
  /** All floors (concept groupings) in order. */
  floors: Floor[];
  /** User's progress (completed nodes, salary, current position). */
  progress: Progress;
}

/**
 * Floor: a concept grouping — one "level" of the tower.
 * Contains an ordered list of nodes. Floors are displayed as sections
 * (e.g. "Floor 1: Finance Concepts") and connected by stairs.
 */
export interface Floor {
  /** 1-based floor index. */
  floorNumber: number;
  /** Display title for the floor (e.g. "Finance Concepts"). */
  title: string;
  /** Playable lessons on this floor, in path order. */
  nodes: Node[];
}

// ---------------------------------------------------------------------------
// Node — playable lesson (re-export with game-system meaning)
// ---------------------------------------------------------------------------

/**
 * Node: a single playable lesson.
 * The atomic unit of learning: lesson content + questions. Completing a node
 * grants rewards and unlocks the next node (and possibly the next floor via stairs).
 */
export type GameNode = Node;

// ---------------------------------------------------------------------------
// Stairs — progress connectors
// ---------------------------------------------------------------------------

/**
 * Stairs: the connector between two consecutive floors.
 * Represents the visual/structural "climb" from one floor to the next.
 * In the UI, stairs are the vertical elements between FloorSections
 * (e.g. the connector line to next floor). Progress through the last node
 * of a floor implies "climbing the stairs" to the next floor.
 */
export interface Stairs {
  /** Floor index being left (1-based). */
  fromFloor: number;
  /** Floor index being entered (1-based). */
  toFloor: number;
}

// ---------------------------------------------------------------------------
// Landing — psychological breather
// ---------------------------------------------------------------------------

/**
 * Landing: a psychological breather — a moment to pause without guilt.
 * Triggered after a set number of nodes in a session (e.g. after 4 nodes).
 * The UI may show a "breather" view (take a break / keep going) or switch
 * to calmer styling. Landings prevent burnout and give a sense of completion.
 */
export interface Landing {
  /** Session node count that triggered this landing (e.g. 4). */
  afterNodeCount: number;
  /** Kind of breather: full "breather" offer vs mid-session peak. */
  view: "breather" | "midSessionPeak";
}

// ---------------------------------------------------------------------------
// Rewards — salary, confidence, completion
// ---------------------------------------------------------------------------

/**
 * Rewards: feedback given when a node is completed.
 * Three dimensions:
 * - Salary: cumulative money (e.g. +$20k) shown in HUD and post-complete.
 * - Confidence: sense of mastery (e.g. recap, "You're thinking like an IB").
 * - Completion: explicit "node done" state, next node preview, floor completion message.
 */
export interface NodeReward {
  /** Salary delta for this node (e.g. salaryReward from Node). */
  salary: number;
  /** Confidence / mastery messaging (e.g. recap, celebration copy). */
  confidence?: string;
  /** Completion state: node marked complete, next unlock, floor completion if applicable. */
  completion: {
    nodeId: string;
    nextUnlocked: boolean;
    floorCompleted?: boolean;
  };
}
