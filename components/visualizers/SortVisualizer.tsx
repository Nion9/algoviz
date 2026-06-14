"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { useAlgorithm } from "@/hooks/useAlgorithm";
import { PlaybackControls } from "@/components/ui/PlaybackControls";
import type { AlgorithmGenerator } from "@/types";
import type { SortState } from "@/algorithms/sorting/types";

const COLORS = {
  default:   "#d4d4d8", // zinc-300
  comparing: "#fbbf24", // amber-400
  swapped:   "#f87171", // red-400
  sorted:    "#34d399", // emerald-400
  pivot:     "#a78bfa", // violet-400
  min:       "#60a5fa", // blue-400
};

const DEFAULT_ARRAY = [64, 34, 25, 12, 22, 11, 90, 45, 78, 55];

interface SortVisualizerProps {
  label: string;
  generatorFn: (arr: number[]) => AlgorithmGenerator<SortState>;
  showPivot?: boolean;
  showMin?: boolean;
}

export function SortVisualizer({ label, generatorFn, showPivot, showMin }: SortVisualizerProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [customInput, setCustomInput] = useState(DEFAULT_ARRAY.join(", "));
  const [inputError, setInputError] = useState("");
  const [activeArray, setActiveArray] = useState(DEFAULT_ARRAY);

  const gen = useCallback(
    () => generatorFn(activeArray),
    [generatorFn, activeArray]
  );

  const algo = useAlgorithm<SortState>({ generator: gen, speed: 2 });

  // Draw on each step
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const { width, height } = canvas;
    ctx.clearRect(0, 0, width, height);

    const state: SortState = algo.step?.state ?? {
      array: activeArray,
      comparing: [],
      pivot: null,
      sorted: [],
      swapped: false,
    };

    const { array, comparing, pivot, sorted, swapped } = state;
    const n = array.length;
    const maxVal = Math.max(...array, 1);
    const gap = 6;
    const barWidth = (width - gap * (n + 1)) / n;
    const bottomPad = 24;
    const topPad = 10;
    const usableH = height - bottomPad - topPad;

    array.forEach((val, i) => {
      const barH = (val / maxVal) * usableH;
      const x = gap + i * (barWidth + gap);
      const y = height - bottomPad - barH;

      // Determine color
      let color = COLORS.default;
      if (sorted.includes(i))             color = COLORS.sorted;
      if (showMin && pivot === i && !sorted.includes(i)) color = COLORS.min;
      if (showPivot && pivot === i && !sorted.includes(i)) color = COLORS.pivot;
      if (comparing.includes(i))          color = swapped ? COLORS.swapped : COLORS.comparing;

      // Bar
      ctx.fillStyle = color;
      ctx.beginPath();
      if (ctx.roundRect) {
        ctx.roundRect(x, y, barWidth, barH, Math.min(4, barWidth / 2));
      } else {
        ctx.rect(x, y, barWidth, barH);
      }
      ctx.fill();

      // Value label
      if (barWidth >= 18) {
        ctx.fillStyle = "#71717a";
        ctx.font = `${Math.min(11, barWidth * 0.6)}px monospace`;
        ctx.textAlign = "center";
        ctx.fillText(String(val), x + barWidth / 2, height - 6);
      }
    });
  }, [algo.step, activeArray, showPivot, showMin]);

  function applyCustomInput() {
    const parts = customInput.split(",").map((s) => parseInt(s.trim(), 10));
    if (parts.some(isNaN) || parts.length < 2) {
      setInputError("Enter at least 2 comma-separated numbers.");
      return;
    }
    if (parts.length > 20) {
      setInputError("Max 20 numbers.");
      return;
    }
    setInputError("");
    setActiveArray(parts);
    algo.reset();
  }

  function randomise() {
    const arr = Array.from({ length: 12 }, () => Math.floor(Math.random() * 95) + 5);
    setActiveArray(arr);
    setCustomInput(arr.join(", "));
    setInputError("");
    algo.reset();
  }

  const legendItems = [
    { color: COLORS.comparing, label: "Comparing" },
    { color: COLORS.swapped,   label: "Swapped" },
    { color: COLORS.sorted,    label: "Sorted" },
    ...(showPivot ? [{ color: COLORS.pivot, label: "Pivot" }] : []),
    ...(showMin   ? [{ color: COLORS.min,   label: "Minimum" }] : []),
    { color: COLORS.default,   label: "Unsorted" },
  ];

  return (
    <div className="flex flex-col gap-3">
      {/* Custom input row */}
      <div className="flex gap-2 items-start flex-wrap">
        <div className="flex-1 min-w-0">
          <input
            type="text"
            value={customInput}
            onChange={(e) => setCustomInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && applyCustomInput()}
            placeholder="e.g. 64, 34, 25, 12, 22"
            className="w-full px-3 py-1.5 text-sm rounded-lg border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-900 font-mono focus:outline-none focus:ring-1 focus:ring-zinc-400"
          />
          {inputError && <p className="text-xs text-red-500 mt-1">{inputError}</p>}
        </div>
        <button onClick={applyCustomInput} className="px-3 py-1.5 text-sm rounded-lg border border-zinc-200 dark:border-zinc-700 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors whitespace-nowrap">
          Apply
        </button>
        <button onClick={randomise} className="px-3 py-1.5 text-sm rounded-lg border border-zinc-200 dark:border-zinc-700 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors">
          Random
        </button>
      </div>

      {/* Canvas */}
      <canvas
        ref={canvasRef}
        width={600}
        height={280}
        className="w-full rounded-xl bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800"
      />

      {/* Step description */}
      <p className="text-sm text-zinc-500 min-h-[20px]">
        {algo.step?.description ?? `Press play or step through ${label}.`}
      </p>

      <PlaybackControls
        isPlaying={algo.isPlaying}
        isFinished={algo.isFinished}
        stepIndex={algo.stepIndex}
        totalSteps={algo.totalSteps}
        speed={algo.speed}
        onPlay={algo.play}
        onPause={algo.pause}
        onStepForward={algo.stepForward}
        onStepBackward={algo.stepBackward}
        onReset={algo.reset}
        onSpeedChange={algo.setSpeed}
      />

      {/* Legend */}
      <div className="flex flex-wrap gap-4 text-xs text-zinc-500">
        {legendItems.map(({ color, label: l }) => (
          <div key={l} className="flex items-center gap-1.5">
            <div className="w-3 h-3 rounded-sm flex-shrink-0" style={{ background: color }} />
            {l}
          </div>
        ))}
      </div>
    </div>
  );
}
