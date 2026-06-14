export interface AlgorithmMeta {
  id: string;
  name: string;
  category: string;
  categoryLabel: string;
  description: string;
  timeComplexity: { best: string; average: string; worst: string };
  spaceComplexity: string;
  tags: string[];
  difficulty: "beginner" | "intermediate" | "advanced";
  phase: number;
}

export type StepState = Record<string, unknown>;

export interface AlgorithmStep<T extends StepState = StepState> {
  state: T;
  description: string;
  highlight?: number[];
}

export type AlgorithmGenerator<T extends StepState = StepState> = Generator<
  AlgorithmStep<T>,
  void,
  unknown
>;

export interface PlaybackStore {
  speed: number;
  isPlaying: boolean;
  currentStep: number;
  totalSteps: number;
  setSpeed: (speed: number) => void;
  setPlaying: (playing: boolean) => void;
  setCurrentStep: (step: number) => void;
  setTotalSteps: (total: number) => void;
  reset: () => void;
}

export type Difficulty = "beginner" | "intermediate" | "advanced";
