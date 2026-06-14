"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import type { AlgorithmGenerator, AlgorithmStep, StepState } from "@/types";

interface UseAlgorithmOptions<T extends StepState> {
  generator: () => AlgorithmGenerator<T>;
  speed?: number; // steps per second
}

interface UseAlgorithmReturn<T extends StepState> {
  step: AlgorithmStep<T> | null;
  stepIndex: number;
  totalSteps: number;
  isPlaying: boolean;
  isFinished: boolean;
  play: () => void;
  pause: () => void;
  stepForward: () => void;
  stepBackward: () => void;
  reset: () => void;
  setSpeed: (speed: number) => void;
  speed: number;
}

export function useAlgorithm<T extends StepState>({
  generator,
  speed: initialSpeed = 1,
}: UseAlgorithmOptions<T>): UseAlgorithmReturn<T> {
  // Collect all steps upfront so we can go forward/backward freely
  const stepsRef = useRef<AlgorithmStep<T>[]>([]);
  const [stepIndex, setStepIndex] = useState(-1);
  const [isPlaying, setIsPlaying] = useState(false);
  const [speed, setSpeed] = useState(initialSpeed);
  const animFrameRef = useRef<number | null>(null);
  const lastTickRef = useRef<number>(0);

  // Build steps from generator on mount
  useEffect(() => {
    const gen = generator();
    const steps: AlgorithmStep<T>[] = [];
    let result = gen.next();
    while (!result.done) {
      steps.push(result.value);
      result = gen.next();
    }
    stepsRef.current = steps;
    setStepIndex(-1);
    setIsPlaying(false);
  }, [generator]);

  const totalSteps = stepsRef.current.length;
  const isFinished = stepIndex >= totalSteps - 1;
  const currentStep = stepIndex >= 0 ? stepsRef.current[stepIndex] : null;

  // Animation loop
  const tick = useCallback(
    (timestamp: number) => {
      const interval = 1000 / speed;
      if (timestamp - lastTickRef.current >= interval) {
        lastTickRef.current = timestamp;
        setStepIndex((prev) => {
          if (prev >= stepsRef.current.length - 1) {
            setIsPlaying(false);
            return prev;
          }
          return prev + 1;
        });
      }
      animFrameRef.current = requestAnimationFrame(tick);
    },
    [speed]
  );

  useEffect(() => {
    if (isPlaying && !isFinished) {
      animFrameRef.current = requestAnimationFrame(tick);
    } else {
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
    }
    return () => {
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
    };
  }, [isPlaying, isFinished, tick]);

  const play = useCallback(() => {
    if (isFinished) setStepIndex(-1);
    setIsPlaying(true);
  }, [isFinished]);

  const pause = useCallback(() => setIsPlaying(false), []);

  const stepForward = useCallback(() => {
    setIsPlaying(false);
    setStepIndex((prev) => Math.min(prev + 1, stepsRef.current.length - 1));
  }, []);

  const stepBackward = useCallback(() => {
    setIsPlaying(false);
    setStepIndex((prev) => Math.max(prev - 1, 0));
  }, []);

  const reset = useCallback(() => {
    setIsPlaying(false);
    setStepIndex(-1);
  }, []);

  return {
    step: currentStep,
    stepIndex,
    totalSteps,
    isPlaying,
    isFinished,
    play,
    pause,
    stepForward,
    stepBackward,
    reset,
    setSpeed,
    speed,
  };
}
