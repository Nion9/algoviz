"use client";

interface PlaybackControlsProps {
  isPlaying: boolean;
  isFinished: boolean;
  stepIndex: number;
  totalSteps: number;
  speed: number;
  onPlay: () => void;
  onPause: () => void;
  onStepForward: () => void;
  onStepBackward: () => void;
  onReset: () => void;
  onSpeedChange: (speed: number) => void;
}

export function PlaybackControls({
  isPlaying,
  isFinished,
  stepIndex,
  totalSteps,
  speed,
  onPlay,
  onPause,
  onStepForward,
  onStepBackward,
  onReset,
  onSpeedChange,
}: PlaybackControlsProps) {
  return (
    <div className="flex flex-wrap items-center gap-3 py-3 border-t border-zinc-200 dark:border-zinc-800">
      <button
        onClick={onReset}
        className="px-3 py-1.5 text-sm rounded-lg border border-zinc-200 dark:border-zinc-700 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
        title="Reset"
      >
        ↩ Reset
      </button>

      <button
        onClick={onStepBackward}
        disabled={stepIndex <= 0}
        className="px-3 py-1.5 text-sm rounded-lg border border-zinc-200 dark:border-zinc-700 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
        title="Step back"
      >
        ← Step
      </button>

      <button
        onClick={isPlaying ? onPause : onPlay}
        className="px-4 py-1.5 text-sm rounded-lg bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900 hover:bg-zinc-700 dark:hover:bg-zinc-300 transition-colors font-medium"
      >
        {isPlaying ? "⏸ Pause" : isFinished ? "↺ Replay" : "▶ Play"}
      </button>

      <button
        onClick={onStepForward}
        disabled={isFinished}
        className="px-3 py-1.5 text-sm rounded-lg border border-zinc-200 dark:border-zinc-700 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
        title="Step forward"
      >
        Step →
      </button>

      <div className="flex items-center gap-2 ml-auto">
        <span className="text-xs text-zinc-500">Speed</span>
        <input
          type="range"
          min={0.5}
          max={5}
          step={0.5}
          value={speed}
          onChange={(e) => onSpeedChange(Number(e.target.value))}
          className="w-24"
        />
        <span className="text-xs font-medium text-zinc-700 dark:text-zinc-300 w-8">
          {speed}×
        </span>
      </div>

      <div className="text-xs text-zinc-400 ml-2">
        {stepIndex < 0 ? "—" : stepIndex + 1} / {totalSteps}
      </div>
    </div>
  );
}
