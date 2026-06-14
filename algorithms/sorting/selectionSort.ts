import type { AlgorithmGenerator } from "@/types";
import type { SortState } from "./types";

export function* selectionSort(input: number[]): AlgorithmGenerator<SortState> {
  const array = [...input];
  const n = array.length;
  const sorted: number[] = [];

  yield {
    state: { array: [...array], comparing: [], pivot: null, sorted: [], swapped: false },
    description: `Starting selection sort on ${n} elements.`,
  };

  for (let i = 0; i < n - 1; i++) {
    let minIdx = i;

    yield {
      state: { array: [...array], comparing: [i], pivot: i, sorted: [...sorted], swapped: false },
      description: `Pass ${i + 1}: Looking for the minimum element from index ${i}.`,
    };

    for (let j = i + 1; j < n; j++) {
      yield {
        state: { array: [...array], comparing: [minIdx, j], pivot: minIdx, sorted: [...sorted], swapped: false },
        description: `Comparing ${array[j]} at index ${j} with current min ${array[minIdx]} at index ${minIdx}.`,
      };

      if (array[j] < array[minIdx]) {
        minIdx = j;
        yield {
          state: { array: [...array], comparing: [minIdx, j], pivot: minIdx, sorted: [...sorted], swapped: false },
          description: `New minimum found: ${array[minIdx]} at index ${minIdx}.`,
        };
      }
    }

    if (minIdx !== i) {
      [array[i], array[minIdx]] = [array[minIdx], array[i]];
      yield {
        state: { array: [...array], comparing: [i, minIdx], pivot: null, sorted: [...sorted], swapped: true },
        description: `Swapping ${array[minIdx]} and ${array[i]} — placing minimum at index ${i}.`,
      };
    }

    sorted.push(i);
  }

  sorted.push(n - 1);

  yield {
    state: { array: [...array], comparing: [], pivot: null, sorted: Array.from({ length: n }, (_, k) => k), swapped: false },
    description: "Array is fully sorted!",
  };
}
