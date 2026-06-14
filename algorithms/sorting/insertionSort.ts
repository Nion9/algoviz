import type { AlgorithmGenerator } from "@/types";
import type { SortState } from "./types";

export function* insertionSort(input: number[]): AlgorithmGenerator<SortState> {
  const array = [...input];
  const n = array.length;

  yield {
    state: { array: [...array], comparing: [], pivot: null, sorted: [0], swapped: false },
    description: `Starting insertion sort. First element ${array[0]} is trivially sorted.`,
  };

  for (let i = 1; i < n; i++) {
    const key = array[i];
    let j = i - 1;

    yield {
      state: { array: [...array], comparing: [i], pivot: i, sorted: Array.from({ length: i }, (_, k) => k), swapped: false },
      description: `Inserting ${key} (index ${i}) into the sorted portion.`,
    };

    while (j >= 0 && array[j] > key) {
      yield {
        state: { array: [...array], comparing: [j, j + 1], pivot: i, sorted: Array.from({ length: i }, (_, k) => k), swapped: false },
        description: `${array[j]} > ${key} — shifting ${array[j]} right.`,
      };

      array[j + 1] = array[j];
      j--;

      yield {
        state: { array: [...array], comparing: [j + 1, j + 2], pivot: null, sorted: Array.from({ length: i }, (_, k) => k), swapped: true },
        description: `Shifted ${array[j + 1]} to index ${j + 1}.`,
      };
    }

    array[j + 1] = key;

    yield {
      state: { array: [...array], comparing: [j + 1], pivot: null, sorted: Array.from({ length: i + 1 }, (_, k) => k), swapped: false },
      description: `Placed ${key} at index ${j + 1}.`,
    };
  }

  yield {
    state: { array: [...array], comparing: [], pivot: null, sorted: Array.from({ length: n }, (_, k) => k), swapped: false },
    description: "Array is fully sorted!",
  };
}
