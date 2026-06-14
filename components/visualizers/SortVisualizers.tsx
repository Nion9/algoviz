"use client";

import { useCallback } from "react";
import { SortVisualizer } from "./SortVisualizer";
import { bubbleSort }    from "@/algorithms/sorting/bubbleSort";
import { selectionSort } from "@/algorithms/sorting/selectionSort";
import { insertionSort } from "@/algorithms/sorting/insertionSort";
import { mergeSort }     from "@/algorithms/sorting/mergeSort";
import { quickSort }     from "@/algorithms/sorting/quickSort";

export function BubbleSortVisualizer() {
  const gen = useCallback((arr: number[]) => bubbleSort(arr), []);
  return <SortVisualizer label="Bubble sort" generatorFn={gen} />;
}

export function SelectionSortVisualizer() {
  const gen = useCallback((arr: number[]) => selectionSort(arr), []);
  return <SortVisualizer label="Selection sort" generatorFn={gen} showMin />;
}

export function InsertionSortVisualizer() {
  const gen = useCallback((arr: number[]) => insertionSort(arr), []);
  return <SortVisualizer label="Insertion sort" generatorFn={gen} />;
}

export function MergeSortVisualizer() {
  const gen = useCallback((arr: number[]) => mergeSort(arr), []);
  return <SortVisualizer label="Merge sort" generatorFn={gen} />;
}

export function QuickSortVisualizer() {
  const gen = useCallback((arr: number[]) => quickSort(arr), []);
  return <SortVisualizer label="Quick sort" generatorFn={gen} showPivot />;
}
