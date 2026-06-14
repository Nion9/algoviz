import type { AlgorithmGenerator } from "@/types";
import type { SortState } from "./types";

export function* quickSort(input: number[]): AlgorithmGenerator<SortState> {
  const array = [...input];
  const n = array.length;
  const sorted: number[] = [];

  yield {
    state: { array: [...array], comparing: [], pivot: null, sorted: [], swapped: false },
    description: `Starting quick sort on ${n} elements.`,
  };

  yield* partition(array, 0, n - 1, sorted);

  yield {
    state: { array: [...array], comparing: [], pivot: null, sorted: Array.from({ length: n }, (_, k) => k), swapped: false },
    description: "Array is fully sorted!",
  };
}

function* partition(
  array: number[],
  low: number,
  high: number,
  sorted: number[]
): AlgorithmGenerator<SortState> {
  if (low >= high) {
    if (low === high) sorted.push(low);
    return;
  }

  const pivotVal = array[high];

  yield {
    state: { array: [...array], comparing: [low, high], pivot: high, sorted: [...sorted], swapped: false },
    description: `Partitioning indices ${low}–${high}. Pivot = ${pivotVal} (index ${high}).`,
  };

  let i = low - 1;

  for (let j = low; j < high; j++) {
    yield {
      state: { array: [...array], comparing: [j, high], pivot: high, sorted: [...sorted], swapped: false },
      description: `Comparing ${array[j]} with pivot ${pivotVal}.`,
    };

    if (array[j] <= pivotVal) {
      i++;
      if (i !== j) {
        [array[i], array[j]] = [array[j], array[i]];
        yield {
          state: { array: [...array], comparing: [i, j], pivot: high, sorted: [...sorted], swapped: true },
          description: `${array[j]} ≤ pivot — swapping ${array[j]} and ${array[i]}.`,
        };
      }
    }
  }

  // Place pivot in correct position
  [array[i + 1], array[high]] = [array[high], array[i + 1]];
  const pivotIdx = i + 1;
  sorted.push(pivotIdx);

  yield {
    state: { array: [...array], comparing: [i + 1, high], pivot: pivotIdx, sorted: [...sorted], swapped: true },
    description: `Pivot ${pivotVal} placed at final position ${pivotIdx}.`,
  };

  yield* partition(array, low, pivotIdx - 1, sorted);
  yield* partition(array, pivotIdx + 1, high, sorted);
}
