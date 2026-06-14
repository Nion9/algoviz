"use client";
import { useCallback } from "react";
import { SortVisualizer } from "./SortVisualizer";
import { insertionSort } from "@/algorithms/sorting/insertionSort";

export function InsertionSortVisualizer() {
  const gen = useCallback((arr: number[]) => insertionSort(arr), []);
  return <SortVisualizer label="insertion sort" generatorFn={gen} />;
}
