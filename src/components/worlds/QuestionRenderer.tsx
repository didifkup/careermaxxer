"use client";

import { useState, useEffect } from "react";
import type {
  Question,
  MCQuestion,
  BooleanQuestion,
  FillQuestion,
  NumericQuestion,
  DragMatchQuestion,
  OrderQuestion,
  ScenarioQuestion,
  CashMeterQuestion,
} from "@/lib/worlds";

function isMCQuestion(q: Question): q is MCQuestion {
  return q.type === "mc";
}
function isBooleanQuestion(q: Question): q is BooleanQuestion {
  return q.type === "boolean";
}
function isFillQuestion(q: Question): q is FillQuestion {
  return q.type === "fill";
}
function isNumericQuestion(q: Question): q is NumericQuestion {
  return q.type === "numeric";
}
function isDragMatchQuestion(q: Question): q is DragMatchQuestion {
  return q.type === "drag_match";
}
function isOrderQuestion(q: Question): q is OrderQuestion {
  return q.type === "order";
}
function isScenarioQuestion(q: Question): q is ScenarioQuestion {
  return q.type === "scenario";
}
function isCashMeterQuestion(q: Question): q is CashMeterQuestion {
  return q.type === "cash_meter";
}

/** Fisher–Yates shuffle; returns new array. */
function shuffle<T>(arr: T[]): T[] {
  const out = [...arr];
  for (let i = out.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [out[i], out[j]] = [out[j], out[i]];
  }
  return out;
}

/** Normalize for fill comparison: trim, lowercase, collapse spaces. */
function normalizeFill(s: string): string {
  return s.trim().toLowerCase().replace(/\s+/g, " ");
}

export interface QuestionRendererProps {
  question: Question;
  onCorrect: () => void;
  onIncorrect: () => void;
}

type Feedback = "correct" | "incorrect" | null;

export function QuestionRenderer({
  question,
  onCorrect,
  onIncorrect,
}: QuestionRendererProps) {
  const [selected, setSelected] = useState<number | boolean | null>(null);
  const [feedback, setFeedback] = useState<Feedback>(null);
  const [fillInput, setFillInput] = useState("");
  const [numericInput, setNumericInput] = useState("");
  /** For fill/numeric: true after correct Check, show "Next" to advance. */
  const [showNextForFillNumeric, setShowNextForFillNumeric] = useState(false);
  /** drag_match: slotId -> itemId; items not in any slot stay in pool. */
  const [dragMatchAssignments, setDragMatchAssignments] = useState<Record<string, string>>({});
  const [dragMatchPool, setDragMatchPool] = useState<string[]>([]);
  /** order: current order of item ids (shuffled initially). */
  const [orderOrderedIds, setOrderOrderedIds] = useState<string[]>([]);
  /** cash_meter: user's ending cash input and meter display (animates to correct on success). */
  const [cashMeterEndingInput, setCashMeterEndingInput] = useState("");
  const [cashMeterDisplayCash, setCashMeterDisplayCash] = useState(0);

  useEffect(() => {
    setSelected(null);
    setFillInput("");
    setNumericInput("");
    setFeedback(null);
    setShowNextForFillNumeric(false);
    if (isDragMatchQuestion(question)) {
      setDragMatchAssignments({});
      setDragMatchPool(question.items.map((i) => i.id));
    }
    if (isOrderQuestion(question)) {
      setOrderOrderedIds(shuffle(question.items.map((i) => i.id)));
    }
    if (isCashMeterQuestion(question)) {
      setCashMeterEndingInput("");
      setCashMeterDisplayCash(question.startingCash);
    }
  }, [question.id]);

  const handleChoice = (value: number | boolean) => {
    setSelected(value);
    const correct =
      isMCQuestion(question)
        ? value === question.correctIndex
        : isScenarioQuestion(question)
          ? value === question.correctIndex
          : isBooleanQuestion(question)
            ? value === question.correct
            : false;
    setFeedback(correct ? "correct" : "incorrect");
    if (correct) {
      onCorrect();
    } else {
      onIncorrect();
    }
  };

  if (isMCQuestion(question)) {
    const choices = question.choices;
    if (!choices || choices.length < 3 || choices.length > 4) {
      return (
        <p className="text-sm text-error">Invalid MC question (need 3–4 choices).</p>
      );
    }
    return (
      <div className="space-y-4">
        <p className="text-lg font-medium text-text-primary">{question.prompt}</p>
        {feedback !== null && (
          <p
            className={`text-sm ${feedback === "correct" ? "text-success" : "text-error"}`}
            role="status"
          >
            {feedback === "correct" ? "Nice." : "Try again."}
          </p>
        )}
        <div className="space-y-2">
          {choices.map((choice, i) => (
            <button
              key={i}
              type="button"
              onClick={() => handleChoice(i)}
              className={`w-full rounded-xl border-2 px-4 py-3 text-left text-sm font-medium transition ${
                selected === i
                  ? "border-brand-primary bg-brand-primary/10 text-brand-primary"
                  : "border-black/10 bg-surface-raised text-text-primary hover:border-brand-primary/30"
              }`}
            >
              {choice}
            </button>
          ))}
        </div>
      </div>
    );
  }

  if (isScenarioQuestion(question)) {
    const choices = question.choices;
    if (!choices || choices.length < 2) {
      return (
        <p className="text-sm text-error">Invalid scenario question (need at least 2 choices).</p>
      );
    }
    const caseTitle = question.title ?? "Mini Case";
    return (
      <div className="space-y-4">
        <div className="rounded-xl border-2 border-brand-primary/20 bg-surface-base p-4">
          <p className="text-xs font-semibold uppercase tracking-wide text-text-secondary">
            {caseTitle}
          </p>
          <p className="mt-2 whitespace-pre-line text-sm text-text-primary">{question.context}</p>
        </div>
        <p className="text-lg font-medium text-text-primary">{question.prompt}</p>
        {feedback !== null && (
          <p
            className={`text-sm ${feedback === "correct" ? "text-success" : "text-error"}`}
            role="status"
          >
            {feedback === "correct" ? "Nice." : "Try again."}
          </p>
        )}
        <div className="space-y-2">
          {choices.map((choice, i) => (
            <button
              key={i}
              type="button"
              onClick={() => handleChoice(i)}
              className={`w-full rounded-xl border-2 px-4 py-3 text-left text-sm font-medium transition ${
                selected === i
                  ? "border-brand-primary bg-brand-primary/10 text-brand-primary"
                  : "border-black/10 bg-surface-raised text-text-primary hover:border-brand-primary/30"
              }`}
            >
              {choice}
            </button>
          ))}
        </div>
      </div>
    );
  }

  if (isBooleanQuestion(question)) {
    return (
      <div className="space-y-4">
        <p className="text-lg font-medium text-text-primary">{question.prompt}</p>
        {feedback !== null && (
          <p
            className={`text-sm ${feedback === "correct" ? "text-success" : "text-error"}`}
            role="status"
          >
            {feedback === "correct" ? "Nice." : "Try again."}
          </p>
        )}
        <div className="flex gap-2">
          <button
            type="button"
            onClick={() => handleChoice(true)}
            className={`flex-1 rounded-xl border-2 px-4 py-3 text-sm font-medium transition ${
              selected === true
                ? "border-brand-primary bg-brand-primary/10 text-brand-primary"
                : "border-black/10 bg-surface-raised text-text-primary hover:border-brand-primary/30"
            }`}
          >
            True
          </button>
          <button
            type="button"
            onClick={() => handleChoice(false)}
            className={`flex-1 rounded-xl border-2 px-4 py-3 text-sm font-medium transition ${
              selected === false
                ? "border-brand-primary bg-brand-primary/10 text-brand-primary"
                : "border-black/10 bg-surface-raised text-text-primary hover:border-brand-primary/30"
            }`}
          >
            False
          </button>
        </div>
      </div>
    );
  }

  if (isFillQuestion(question)) {
    const handleCheck = () => {
      const normalized = normalizeFill(fillInput);
      const expected = normalizeFill(question.answer);
      const correct = normalized === expected;
      setFeedback(correct ? "correct" : "incorrect");
      if (correct) {
        setShowNextForFillNumeric(true);
      } else {
        onIncorrect();
      }
    };
    const handleNext = () => onCorrect();
    const handleKeyDown = (e: React.KeyboardEvent) => {
      if (e.key !== "Enter") return;
      if (showNextForFillNumeric) handleNext();
      else handleCheck();
    };
    return (
      <div className="space-y-4">
        <p className="text-lg font-medium text-text-primary">{question.prompt}</p>
        {feedback !== null && (
          <p
            className={`text-sm ${feedback === "correct" ? "text-success" : "text-error"}`}
            role="status"
          >
            {feedback === "correct" ? "Nice." : "Try again."}
          </p>
        )}
        <input
          type="text"
          value={fillInput}
          onChange={(e) => setFillInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder={question.placeholder}
          className="w-full rounded-xl border-2 border-black/10 bg-surface-raised px-4 py-3 text-text-primary placeholder:text-text-secondary focus:border-brand-primary focus:outline-none focus:ring-0"
          aria-label="Your answer"
          disabled={showNextForFillNumeric}
        />
        {showNextForFillNumeric ? (
          <button
            type="button"
            onClick={handleNext}
            onKeyDown={(e) => e.key === "Enter" && handleNext()}
            className="rounded-xl bg-brand-primary px-6 py-3 font-semibold text-text-inverse transition hover:opacity-90 active:scale-[0.98]"
          >
            Next
          </button>
        ) : (
          <button
            type="button"
            onClick={handleCheck}
            className="rounded-xl bg-brand-primary px-6 py-3 font-semibold text-text-inverse transition hover:opacity-90 active:scale-[0.98]"
          >
            Check
          </button>
        )}
      </div>
    );
  }

  if (isNumericQuestion(question)) {
    const tolerance = question.tolerance ?? 0;
    const handleCheck = () => {
      const parsed = Number(numericInput.trim());
      const valid = Number.isFinite(parsed);
      const correct = valid && Math.abs(parsed - question.answer) <= tolerance;
      setFeedback(correct ? "correct" : "incorrect");
      if (correct) {
        setShowNextForFillNumeric(true);
      } else {
        onIncorrect();
      }
    };
    const handleNext = () => onCorrect();
    const handleKeyDown = (e: React.KeyboardEvent) => {
      if (e.key !== "Enter") return;
      if (showNextForFillNumeric) handleNext();
      else handleCheck();
    };
    return (
      <div className="space-y-4">
        <p className="text-lg font-medium text-text-primary">{question.prompt}</p>
        {feedback !== null && (
          <p
            className={`text-sm ${feedback === "correct" ? "text-success" : "text-error"}`}
            role="status"
          >
            {feedback === "correct" ? "Nice." : "Try again."}
          </p>
        )}
        <div className="flex flex-wrap items-center gap-2">
          <input
            type="number"
            inputMode="decimal"
            value={numericInput}
            onChange={(e) => setNumericInput(e.target.value)}
            onKeyDown={handleKeyDown}
            className="w-full min-w-0 rounded-xl border-2 border-black/10 bg-surface-raised px-4 py-3 text-text-primary focus:border-brand-primary focus:outline-none focus:ring-0 sm:max-w-[200px]"
            aria-label="Your answer"
            disabled={showNextForFillNumeric}
          />
          {question.unit && (
            <span className="text-sm text-text-secondary">{question.unit}</span>
          )}
        </div>
        {showNextForFillNumeric ? (
          <button
            type="button"
            onClick={handleNext}
            onKeyDown={(e) => e.key === "Enter" && handleNext()}
            className="rounded-xl bg-brand-primary px-6 py-3 font-semibold text-text-inverse transition hover:opacity-90 active:scale-[0.98]"
          >
            Next
          </button>
        ) : (
          <button
            type="button"
            onClick={handleCheck}
            className="rounded-xl bg-brand-primary px-6 py-3 font-semibold text-text-inverse transition hover:opacity-90 active:scale-[0.98]"
          >
            Check
          </button>
        )}
      </div>
    );
  }

  if (isDragMatchQuestion(question)) {
    const itemById = Object.fromEntries(question.items.map((i) => [i.id, i]));
    const handleCheck = () => {
      const correct =
        question.slots.every(
          (s) => (dragMatchAssignments[s.id] ?? null) === (question.correct[s.id] ?? null)
        ) &&
        Object.keys(question.correct).every(
          (slotId) => dragMatchAssignments[slotId] === question.correct[slotId]
        );
      setFeedback(correct ? "correct" : "incorrect");
      if (correct) onCorrect();
      else onIncorrect();
    };
    const handleDragStart = (e: React.DragEvent, itemId: string) => {
      e.dataTransfer.setData("text/plain", itemId);
      e.dataTransfer.effectAllowed = "move";
    };
    const handleDropOnSlot = (e: React.DragEvent, slotId: string) => {
      e.preventDefault();
      const itemId = e.dataTransfer.getData("text/plain");
      if (!itemId || !itemById[itemId]) return;
      setDragMatchAssignments((prev) => {
        const next = { ...prev };
        const prevSlot = Object.entries(next).find(([, id]) => id === itemId)?.[0];
        if (prevSlot) delete next[prevSlot];
        next[slotId] = itemId;
        return next;
      });
      setDragMatchPool((prev) => prev.filter((id) => id !== itemId));
    };
    const handleDropOnPool = (e: React.DragEvent) => {
      e.preventDefault();
      const itemId = e.dataTransfer.getData("text/plain");
      if (!itemId || !itemById[itemId]) return;
      setDragMatchAssignments((prev) => {
        const next = { ...prev };
        const slotId = Object.entries(next).find(([, id]) => id === itemId)?.[0];
        if (slotId) delete next[slotId];
        return next;
      });
      setDragMatchPool((prev) => (prev.includes(itemId) ? prev : [...prev, itemId]));
    };
    const handleDragOver = (e: React.DragEvent) => {
      e.preventDefault();
      e.dataTransfer.dropEffect = "move";
    };
    return (
      <div className="space-y-4">
        <p className="text-lg font-medium text-text-primary">{question.prompt}</p>
        {feedback !== null && (
          <p
            className={`text-sm ${feedback === "correct" ? "text-success" : "text-error"}`}
            role="status"
          >
            {feedback === "correct" ? "Nice." : "Try again."}
          </p>
        )}
        <div
          className={`flex flex-col gap-4 sm:flex-row transition-colors duration-300 ${
            feedback === "incorrect" ? "animate-shake" : ""
          } ${feedback === "correct" ? "rounded-xl ring-2 ring-success/50 ring-offset-2 ring-offset-[var(--color-surface-base)]" : ""}`}
        >
          <div
            className={`min-h-[120px] flex-1 rounded-xl border-2 p-3 transition-colors ${
              feedback === "correct"
                ? "border-success/30 bg-success/5"
                : "border-dashed border-black/15 bg-black/5"
            }`}
            onDragOver={handleDragOver}
            onDrop={handleDropOnPool}
            role="region"
            aria-label="Card pool"
          >
            <p className="mb-2 text-xs font-medium text-text-secondary">Cards</p>
            <div className="flex flex-wrap gap-2">
              {dragMatchPool.map((id) => {
                const item = itemById[id];
                if (!item) return null;
                return (
                  <div
                    key={id}
                    draggable
                    onDragStart={(e) => handleDragStart(e, id)}
                    className="cursor-grab rounded-lg border-2 border-black/10 bg-surface-raised px-3 py-2 text-sm font-medium text-text-primary shadow-sm transition hover:border-brand-primary/30 hover:shadow active:cursor-grabbing active:scale-[0.98]"
                    role="button"
                    tabIndex={0}
                    aria-label={`Drag ${item.label}`}
                  >
                    {item.label}
                  </div>
                );
              })}
            </div>
          </div>
          <div
            className={`flex min-w-0 flex-1 flex-col gap-2 rounded-xl border-2 p-3 transition-colors ${
              feedback === "correct"
                ? "border-success/30 bg-success/5"
                : "border-black/10 bg-surface-base"
            }`}
          >
            <p className="text-xs font-medium text-text-secondary">Slots</p>
            {question.slots.map((slot) => {
              const assignedItemId = dragMatchAssignments[slot.id];
              const assignedItem = assignedItemId ? itemById[assignedItemId] : null;
              return (
                <div
                  key={slot.id}
                  className={`flex min-h-[44px] items-center rounded-lg border-2 border-dashed p-2 transition-colors ${
                    feedback === "correct" ? "border-success/25 bg-success/5" : "border-black/15 bg-black/5"
                  }`}
                  onDragOver={handleDragOver}
                  onDrop={(e) => handleDropOnSlot(e, slot.id)}
                  data-slot-id={slot.id}
                  role="region"
                  aria-label={`Slot: ${slot.label}`}
                >
                  <span className="mr-2 shrink-0 text-xs text-text-secondary">{slot.label}</span>
                  {assignedItem ? (
                    <div
                      draggable
                      onDragStart={(e) => handleDragStart(e, assignedItem.id)}
                      className="cursor-grab rounded border border-black/10 bg-surface-raised px-2 py-1.5 text-sm text-text-primary transition hover:border-brand-primary/30 hover:shadow active:cursor-grabbing active:scale-[0.98]"
                    >
                      {assignedItem.label}
                    </div>
                  ) : (
                    <span className="text-sm text-text-secondary">Drop here</span>
                  )}
                </div>
              );
            })}
          </div>
        </div>
        <button
          type="button"
          onClick={handleCheck}
          className="rounded-xl bg-brand-primary px-6 py-3 font-semibold text-text-inverse transition hover:opacity-90 active:scale-[0.98]"
        >
          Check
        </button>
      </div>
    );
  }

  if (isOrderQuestion(question)) {
    const itemById = Object.fromEntries(question.items.map((i) => [i.id, i]));
    const handleCheck = () => {
      const correct =
        orderOrderedIds.length === question.correctOrder.length &&
        orderOrderedIds.every((id, i) => id === question.correctOrder[i]);
      setFeedback(correct ? "correct" : "incorrect");
      if (correct) onCorrect();
      else onIncorrect();
    };
    const handleDragStart = (e: React.DragEvent, itemId: string) => {
      e.dataTransfer.setData("text/plain", itemId);
      e.dataTransfer.effectAllowed = "move";
    };
    const handleDragOver = (e: React.DragEvent) => {
      e.preventDefault();
      e.dataTransfer.dropEffect = "move";
    };
    const handleDrop = (e: React.DragEvent, dropIndex: number) => {
      e.preventDefault();
      const itemId = e.dataTransfer.getData("text/plain");
      if (!itemId || !itemById[itemId]) return;
      const currentIndex = orderOrderedIds.indexOf(itemId);
      if (currentIndex === -1) return;
      if (currentIndex === dropIndex) return;
      setOrderOrderedIds((prev) => {
        const next = prev.filter((id) => id !== itemId);
        const insertAt = currentIndex < dropIndex ? dropIndex - 1 : dropIndex;
        next.splice(insertAt, 0, itemId);
        return next;
      });
    };
    return (
      <div className="space-y-4">
        <p className="text-lg font-medium text-text-primary">{question.prompt}</p>
        {feedback !== null && (
          <p
            className={`text-sm ${feedback === "correct" ? "text-success" : "text-error"}`}
            role="status"
          >
            {feedback === "correct" ? "Nice." : "Try again."}
          </p>
        )}
        <ul
          className={`flex flex-col gap-2 transition-colors duration-300 ${feedback === "incorrect" ? "animate-shake" : ""} ${feedback === "correct" ? "rounded-xl ring-2 ring-success/50 ring-offset-2 ring-offset-[var(--color-surface-base)] p-1" : ""}`}
          role="list"
        >
          {orderOrderedIds.map((id, index) => {
            const item = itemById[id];
            if (!item) return null;
            return (
              <li
                key={id}
                draggable
                onDragStart={(e) => handleDragStart(e, id)}
                onDragOver={handleDragOver}
                onDrop={(e) => handleDrop(e, index)}
                className={`cursor-grab rounded-xl border-2 px-4 py-3 text-sm font-medium text-text-primary shadow-sm transition active:cursor-grabbing active:scale-[0.98] ${
                  feedback === "correct"
                    ? "border-success/30 bg-success/10"
                    : "border-black/10 bg-surface-raised hover:border-brand-primary/30 hover:shadow"
                }`}
                role="button"
                tabIndex={0}
                aria-label={`Drag to reorder: ${item.label}`}
              >
                <span className="mr-2 inline-block w-6 shrink-0 rounded bg-black/10 text-center text-xs font-bold text-text-secondary">
                  {index + 1}
                </span>
                {item.label}
              </li>
            );
          })}
        </ul>
        <button
          type="button"
          onClick={handleCheck}
          className="rounded-xl bg-brand-primary px-6 py-3 font-semibold text-text-inverse transition hover:opacity-90 active:scale-[0.98]"
        >
          Check
        </button>
      </div>
    );
  }

  if (isCashMeterQuestion(question)) {
    const title = question.title ?? "Cash Meter";
    const displayCash =
      cashMeterDisplayCash === 0 ? question.startingCash : cashMeterDisplayCash;
    const maxRange =
      Math.max(question.startingCash, question.correctEndingCash, 0) + 50;
    const barPct = Math.min(
      100,
      Math.max(0, (displayCash / maxRange) * 100)
    );
    const handleCheck = () => {
      const parsed = Number(cashMeterEndingInput.trim());
      const valid = Number.isFinite(parsed);
      const correct = valid && parsed === question.correctEndingCash;
      setFeedback(correct ? "correct" : "incorrect");
      if (correct) {
        setCashMeterDisplayCash(question.correctEndingCash);
        onCorrect();
      } else {
        onIncorrect();
      }
    };
    return (
      <div className="space-y-4">
        <p className="text-xs font-semibold uppercase tracking-wide text-text-secondary">
          {title}
        </p>
        <p className="text-lg font-medium text-text-primary">{question.prompt}</p>

        {/* Cash in Pocket meter */}
        <div className="rounded-xl border-2 border-black/10 bg-surface-base p-4">
          <p className="text-xs font-medium text-text-secondary">
            Cash in Pocket
          </p>
          <p className="mt-1 font-semibold tabular-nums text-brand-accent">
            {displayCash.toLocaleString("en-US")}
          </p>
          <div
            className="mt-2 h-2.5 overflow-hidden rounded-full bg-black/10"
            role="progressbar"
            aria-valuenow={displayCash}
            aria-valuemin={0}
            aria-valuemax={maxRange}
          >
            <div
              className="h-full rounded-full bg-brand-accent transition-all duration-500 ease-out"
              style={{ width: `${barPct}%` }}
            />
          </div>
          <p className="mt-1 text-xs text-text-secondary">
            Starting cash: {question.startingCash.toLocaleString("en-US")}
          </p>
        </div>

        {/* Steps as stacked cards */}
        <div className="flex flex-col gap-2">
          {question.steps.map((step) => (
            <div
              key={step.id}
              className="rounded-xl border-2 border-black/10 bg-surface-raised p-3"
            >
              <p className="font-medium text-text-primary">{step.label}</p>
              <div className="mt-2 flex flex-wrap gap-1.5">
                <span
                  className={`rounded px-2 py-0.5 text-xs font-medium ${
                    step.direction === "wc_asset"
                      ? "bg-brand-primary/15 text-brand-primary"
                      : "bg-warning/15 text-warning"
                  }`}
                >
                  {step.direction === "wc_asset" ? "WC Asset" : "WC Liability"}
                </span>
                <span
                  className={`rounded px-2 py-0.5 text-xs font-medium ${
                    step.polarity === "increase"
                      ? "bg-success/15 text-success"
                      : "bg-error/15 text-error"
                  }`}
                >
                  {step.polarity === "increase" ? "Increase" : "Decrease"}
                </span>
                <span className="text-sm font-semibold tabular-nums text-text-primary">
                  {step.amount.toLocaleString("en-US")}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Ending Cash input */}
        <div>
          <label htmlFor="cash-meter-ending" className="text-sm font-medium text-text-primary">
            Ending Cash
          </label>
          <input
            id="cash-meter-ending"
            type="number"
            inputMode="decimal"
            value={cashMeterEndingInput}
            onChange={(e) => setCashMeterEndingInput(e.target.value)}
            className="mt-1 w-full max-w-[200px] rounded-xl border-2 border-black/10 bg-surface-raised px-4 py-3 text-text-primary focus:border-brand-primary focus:outline-none focus:ring-0"
            aria-label="Ending cash"
          />
        </div>

        {feedback !== null && (
          <p
            className={`text-sm ${feedback === "correct" ? "text-success" : "text-error"}`}
            role="status"
          >
            {feedback === "correct"
              ? "Nice."
              : "Try again. Rule: WC assets ↑ use cash, ↓ give cash. WC liabilities ↑ give cash, ↓ use cash."}
          </p>
        )}

        <button
          type="button"
          onClick={handleCheck}
          className="rounded-xl bg-brand-primary px-6 py-3 font-semibold text-text-inverse transition hover:opacity-90 active:scale-[0.98]"
        >
          Check
        </button>
      </div>
    );
  }

  return (
    <p className="text-sm text-text-secondary">This question type is not supported yet.</p>
  );
}
