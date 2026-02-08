"use client";

import { useEffect, useState } from "react";
import { loadProgress } from "@/lib/progress";
import type { Progress } from "@/lib/progress";
import { NODES } from "@/lib/curriculum";
import type { Node } from "@/lib/curriculum";
import { ReadingCard } from "@/components/ReadingCard";

export default function ReadingPage() {
  const [progress, setProgress] = useState<Progress | null>(null);
  const [selectedNode, setSelectedNode] = useState<Node | null>(null);
  const [cardOpen, setCardOpen] = useState(false);

  useEffect(() => {
    setProgress(loadProgress());
  }, []);

  const handleOpenCard = (node: Node) => {
    setSelectedNode(node);
    setCardOpen(true);
  };

  const handleCloseCard = () => {
    setCardOpen(false);
  };

  return (
    <div className="mx-auto max-w-2xl">
      <h1 className="text-2xl font-bold text-text-primary">Reading</h1>
      <p className="mt-2 text-text-secondary">
        Browse lesson content. Tap a topic to open the reading card.
      </p>
      <ul className="mt-6 flex flex-col gap-3">
        {NODES.map((node) => (
          <li key={node.id}>
            <button
              type="button"
              onClick={() => handleOpenCard(node)}
              className="w-full rounded-2xl border-2 border-black/10 bg-surface-raised px-5 py-4 text-left shadow-card transition hover:border-brand-primary/30 hover:shadow-elevated active:scale-[0.99]"
            >
              <div className="flex items-center justify-between gap-3">
                <span className="font-semibold text-text-primary">{node.title}</span>
                <span className="rounded-full bg-brand-primary/15 px-2.5 py-0.5 text-xs font-medium text-brand-primary">
                  Floor {node.floorNumber}
                </span>
              </div>
              <p className="mt-1 text-xs text-text-secondary">{node.difficulty}</p>
            </button>
          </li>
        ))}
      </ul>

      <ReadingCard open={cardOpen} node={selectedNode} onClose={handleCloseCard} />
    </div>
  );
}
