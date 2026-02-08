"use client";

import { useEffect, useState } from "react";
import { loadProgress } from "@/lib/progress";
import type { Progress } from "@/lib/progress";
import { QuizFlow } from "@/components/QuizFlow";

export default function QuizPage() {
  const [progress, setProgress] = useState<Progress | null>(null);

  useEffect(() => {
    setProgress(loadProgress());
  }, []);

  if (progress === null) {
    return (
      <div className="flex min-h-[40vh] items-center justify-center">
        <div className="h-10 w-10 animate-spin rounded-full border-2 border-brand-primary border-t-transparent" />
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-xl">
      <h1 className="text-2xl font-bold text-text-primary">Quiz</h1>
      <p className="mt-2 text-text-secondary">
        Review questions from nodes you&apos;ve completed. No salary changes — just practice.
      </p>
      <div className="mt-8">
        <QuizFlow progress={progress} />
      </div>
    </div>
  );
}
