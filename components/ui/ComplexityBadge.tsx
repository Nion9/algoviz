import type { AlgorithmMeta } from "@/types";
import { clsx } from "clsx";

const difficultyColors = {
  beginner: "bg-emerald-50 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300",
  intermediate: "bg-amber-50 text-amber-700 dark:bg-amber-950 dark:text-amber-300",
  advanced: "bg-red-50 text-red-700 dark:bg-red-950 dark:text-red-300",
};

interface ComplexityBadgeProps {
  meta: AlgorithmMeta;
}

export function ComplexityBadge({ meta }: ComplexityBadgeProps) {
  return (
    <div className="flex flex-wrap gap-3 text-sm">
      <div className="flex flex-col gap-0.5">
        <span className="text-xs text-zinc-400 uppercase tracking-wide">Time (avg)</span>
        <code className="font-mono text-zinc-700 dark:text-zinc-300">
          {meta.timeComplexity.average}
        </code>
      </div>
      <div className="flex flex-col gap-0.5">
        <span className="text-xs text-zinc-400 uppercase tracking-wide">Time (worst)</span>
        <code className="font-mono text-zinc-700 dark:text-zinc-300">
          {meta.timeComplexity.worst}
        </code>
      </div>
      <div className="flex flex-col gap-0.5">
        <span className="text-xs text-zinc-400 uppercase tracking-wide">Space</span>
        <code className="font-mono text-zinc-700 dark:text-zinc-300">
          {meta.spaceComplexity}
        </code>
      </div>
      <div className="flex flex-col gap-0.5 ml-auto">
        <span className="text-xs text-zinc-400 uppercase tracking-wide">Difficulty</span>
        <span
          className={clsx(
            "px-2 py-0.5 rounded-full text-xs font-medium",
            difficultyColors[meta.difficulty]
          )}
        >
          {meta.difficulty}
        </span>
      </div>
    </div>
  );
}
