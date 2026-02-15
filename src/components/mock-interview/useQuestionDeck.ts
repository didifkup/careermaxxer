"use client";

import { useState, useEffect, useCallback, useRef } from "react";

export type QuestionItem = {
  id: string;
  track: string;
  difficulty: number;
  tags: string[];
  prompt: string;
};

function shuffleArray<T>(arr: T[]): T[] {
  const out = [...arr];
  for (let i = out.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [out[i], out[j]] = [out[j]!, out[i]!];
  }
  return out;
}

type UseQuestionDeckParams = {
  track: string;
  difficulty: number;
  onPoolError?: (message: string) => void;
};

type UseQuestionDeckReturn = {
  currentQuestion: QuestionItem | null;
  loading: boolean;
  next: () => void;
  prev: () => void;
  shuffle: () => void;
  reset: () => void;
  canPrev: boolean;
  canNext: boolean;
  meta: { index: number; total: number; seenCount: number };
};

export function useQuestionDeck({
  track,
  difficulty,
  onPoolError,
}: UseQuestionDeckParams): UseQuestionDeckReturn {
  const [pool, setPool] = useState<QuestionItem[]>([]);
  const [shuffledOrder, setShuffledOrder] = useState<string[]>([]);
  const [questionHistory, setQuestionHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const [loading, setLoading] = useState(true);
  const seenSetRef = useRef<Set<string>>(new Set());
  const onPoolErrorRef = useRef(onPoolError);
  onPoolErrorRef.current = onPoolError;

  const poolById = pool.length > 0 ? new Map(pool.map((q) => [q.id, q])) : null;
  const currentId = historyIndex >= 0 && historyIndex < questionHistory.length
    ? questionHistory[historyIndex]!
    : null;
  const currentQuestion = currentId && poolById ? poolById.get(currentId) ?? null : null;

  const total = pool.length;
  const seenCount = seenSetRef.current.size;

  const addToSeen = useCallback((id: string) => {
    seenSetRef.current.add(id);
  }, []);

  const pickNextUnseen = useCallback((): string | null => {
    for (const id of shuffledOrder) {
      if (!seenSetRef.current.has(id)) return id;
    }
    return null;
  }, [shuffledOrder]);

  const getRandomUnseen = useCallback((): string | null => {
    const unseen = shuffledOrder.filter((id) => !seenSetRef.current.has(id));
    if (unseen.length === 0) return null;
    return unseen[Math.floor(Math.random() * unseen.length)]!;
  }, [shuffledOrder]);

  const setCurrentQuestionById = useCallback(
    (id: string, appendToHistory: boolean) => {
      addToSeen(id);
      if (appendToHistory) {
        setQuestionHistory((prev) => {
          const next = prev.slice(0, historyIndex + 1);
          next.push(id);
          return next;
        });
        setHistoryIndex((prev) => prev + 1);
      }
    },
    [addToSeen, historyIndex]
  );

  const next = useCallback(() => {
    if (historyIndex < questionHistory.length - 1) {
      setHistoryIndex((prev) => prev + 1);
      return;
    }
    const nextId = pickNextUnseen();
    if (nextId) {
      setCurrentQuestionById(nextId, true);
      return;
    }
    if (shuffledOrder.length > 0) {
      seenSetRef.current.clear();
      const ids = shuffleArray([...shuffledOrder]);
      setShuffledOrder(ids);
      const first = ids[0]!;
      addToSeen(first);
      setQuestionHistory((prev) => [...prev, first]);
      setHistoryIndex(questionHistory.length);
      onPoolErrorRef.current?.("You've seen them all — looping.");
    }
  }, [historyIndex, questionHistory.length, pickNextUnseen, setCurrentQuestionById, shuffledOrder, addToSeen]);

  const prev = useCallback(() => {
    if (historyIndex > 0) {
      setHistoryIndex((prev) => prev - 1);
    }
  }, [historyIndex]);

  const shuffle = useCallback(() => {
    const randomId = getRandomUnseen();
    if (randomId) {
      setCurrentQuestionById(randomId, true);
      return;
    }
    if (shuffledOrder.length > 0) {
      const id = shuffledOrder[Math.floor(Math.random() * shuffledOrder.length)]!;
      setQuestionHistory((prev) => [...prev, id]);
      setHistoryIndex(questionHistory.length);
      onPoolErrorRef.current?.("You've seen them all — looping.");
    }
  }, [getRandomUnseen, setCurrentQuestionById, shuffledOrder, questionHistory.length]);

  const reset = useCallback(() => {
    setQuestionHistory([]);
    setHistoryIndex(-1);
    setPool([]);
    setShuffledOrder([]);
    seenSetRef.current.clear();
  }, []);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    seenSetRef.current.clear();
    setQuestionHistory([]);
    setHistoryIndex(-1);

    fetch(
      `/api/mock/questions?track=${track}&difficulty=${difficulty}&pool=1`
    )
      .then((res) => {
        if (cancelled) return res;
        if (!res.ok) return res.json().then((j) => Promise.reject(new Error(j?.error ?? "Failed to load")));
        return res.json();
      })
      .then((data: QuestionItem[]) => {
        if (cancelled || !Array.isArray(data) || data.length === 0) return;
        setPool(data);
        const ids = shuffleArray(data.map((q) => q.id));
        setShuffledOrder(ids);
        const first = ids[0]!;
        seenSetRef.current.add(first);
        setQuestionHistory([first]);
        setHistoryIndex(0);
      })
      .catch((err: unknown) => {
        if (cancelled) return;
        const message =
          err instanceof Error ? err.message : typeof err === "string" ? err : "Failed to load questions";
        onPoolErrorRef.current?.(message);
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, [track, difficulty]);

  const canPrev = historyIndex > 0;
  const canNext = total > 0;

  return {
    currentQuestion,
    loading,
    next,
    prev,
    shuffle,
    reset,
    canPrev,
    canNext,
    meta: {
      index: historyIndex + 1,
      total,
      seenCount,
    },
  };
}
