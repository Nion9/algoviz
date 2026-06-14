"use client";
import { useCallback } from "react";
import { SortVisualizer } from "./SortVisualizer";
import { selectionSort } from "@/algorithms/sorting/selectionSort";

export function SelectionSortVisualizer() {
  const gen = useCallback((arr: number[]) => selectionSort(arr), []);
  return <SortVisualizer label="selection sort" generatorFn={gen} showMin />;
}
