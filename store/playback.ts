import { create } from "zustand";
import type { PlaybackStore } from "@/types";

export const usePlaybackStore = create<PlaybackStore>((set) => ({
  speed: 1,
  isPlaying: false,
  currentStep: 0,
  totalSteps: 0,
  setSpeed: (speed) => set({ speed }),
  setPlaying: (isPlaying) => set({ isPlaying }),
  setCurrentStep: (currentStep) => set({ currentStep }),
  setTotalSteps: (totalSteps) => set({ totalSteps }),
  reset: () => set({ isPlaying: false, currentStep: 0, totalSteps: 0 }),
}));
