"use client";
import { useCallback } from "react";
import { SortVisualizer } from "./SortVisualizer";
import { mergeSort } from "@/algorithms/sorting/mergeSort";
import type { AlgorithmGenerator } from "@/types";
import type { SortState } from "@/algorithms/sorting/types";

function* mergeSortAdapted(arr: number[]): AlgorithmGenerator<SortState> {
  const array = [...arr];
  const n = array.length;

  yield {
    state: { array: [...array], comparing: [], pivot: null, sorted: [], swapped: false },
    description: `Starting merge sort on ${n} elements.`,
  };

  yield* mergeHelper(array, 0, n - 1);

  yield {
    state: {
      array: [...array],
      comparing: [],
      pivot: null,
      sorted: Array.from({ length: n }, (_, k) => k),
      swapped: false,
    },
    description: "Array is fully sorted!",
  };
}

function* mergeHelper(
  array: number[],
  left: number,
  right: number
): AlgorithmGenerator<SortState> {
  if (left >= right) return;
  const mid = Math.floor((left + right) / 2);

  yield {
    state: { array: [...array], comparing: [left, right], pivot: mid, sorted: [], swapped: false },
    description: `Dividing indices ${left}–${right}, mid = ${mid}.`,
    highlight: [left, right],
  };

  yield* mergeHelper(array, left, mid);
  yield* mergeHelper(array, mid + 1, right);

  const L = array.slice(left, mid + 1);
  const R = array.slice(mid + 1, right + 1);
  let i = 0, j = 0, k = left;
  const merging: number[] = [];

  while (i < L.length && j < R.length) {
    merging.push(k);
    yield {
      state: { array: [...array], comparing: merging.slice(-2), pivot: null, sorted: [], swapped: false },
      description: `Merging: comparing ${L[i]} and ${R[j]}.`,
    };
    array[k++] = L[i] <= R[j] ? L[i++] : R[j++];
    yield {
      state: { array: [...array], comparing: [k - 1], pivot: null, sorted: [], swapped: true },
      description: `Placed ${array[k - 1]} at index ${k - 1}.`,
    };
  }
  while (i < L.length) { array[k++] = L[i++]; }
  while (j < R.length) { array[k++] = R[j++]; }
}

export function MergeSortVisualizer() {
  const gen = useCallback((arr: number[]) => mergeSortAdapted(arr), []);
  return <SortVisualizer label="merge sort" generatorFn={gen} />;
}
