import type { StepState } from "@/types";

export interface SortState extends StepState {
  array: number[];
  comparing: number[];
  pivot: number | null;
  sorted: number[];
  swapped: boolean;
}
