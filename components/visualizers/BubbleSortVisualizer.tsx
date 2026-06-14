"use client";
import { useCallback } from "react";
import { SortVisualizer } from "./SortVisualizer";
import type { AlgorithmGenerator } from "@/types";
import type { SortState } from "@/algorithms/sorting/types";

function* bubbleSortAdapted(arr: number[]): AlgorithmGenerator<SortState> {
  const array = [...arr];
  const n = array.length;
  const sorted: number[] = [];

  yield {
    state: { array: [...array], comparing: [], pivot: null, sorted: [], swapped: false },
    description: `Starting bubble sort on ${n} elements.`,
  };

  for (let pass = 0; pass < n - 1; pass++) {
    let swappedThisPass = false;
    for (let i = 0; i < n - pass - 1; i++) {
      yield {
        state: { array: [...array], comparing: [i, i + 1], pivot: null, sorted: [...sorted], swapped: false },
        description: `Pass ${pass + 1}: Comparing ${array[i]} and ${array[i + 1]}.`,
      };
      if (array[i] > array[i + 1]) {
        [array[i], array[i + 1]] = [array[i + 1], array[i]];
        swappedThisPass = true;
        yield {
          state: { array: [...array], comparing: [i, i + 1], pivot: null, sorted: [...sorted], swapped: true },
          description: `Swapped — ${array[i + 1]} moved left.`,
        };
      }
    }
    sorted.unshift(n - 1 - pass);
    if (!swappedThisPass) {
      yield {
        state: { array: [...array], comparing: [], pivot: null, sorted: Array.from({ length: n }, (_, k) => k), swapped: false },
        description: `No swaps in pass ${pass + 1} — sorted early!`,
      };
      return;
    }
  }
  yield {
    state: { array: [...array], comparing: [], pivot: null, sorted: Array.from({ length: n }, (_, k) => k), swapped: false },
    description: "Array is fully sorted!",
  };
}

export function BubbleSortVisualizer() {
  const gen = useCallback((arr: number[]) => bubbleSortAdapted(arr), []);
  return <SortVisualizer label="bubble sort" generatorFn={gen} />;
}
