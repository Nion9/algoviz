"use client";
import { useCallback } from "react";
import { SortVisualizer } from "./SortVisualizer";
import { quickSort } from "@/algorithms/sorting/quickSort";

export function QuickSortVisualizer() {
  const gen = useCallback((arr: number[]) => quickSort(arr), []);
  return <SortVisualizer label="quick sort" generatorFn={gen} showPivot />;
}
