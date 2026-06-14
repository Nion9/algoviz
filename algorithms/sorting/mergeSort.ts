import type { AlgorithmGenerator } from "@/types";
import type { SortState } from "./types";

export function* mergeSort(input: number[]): AlgorithmGenerator<SortState> {
  const array = [...input];
  const n = array.length;

  yield {
    state: { array: [...array], comparing: [], pivot: null, sorted: [], swapped: false },
    description: `Starting merge sort on ${n} elements.`,
  };

  yield* mergeSortHelper(array, 0, n - 1);

  yield {
    state: { array: [...array], comparing: [], pivot: null, sorted: Array.from({ length: n }, (_, k) => k), swapped: false },
    description: "Array is fully sorted!",
  };
}

function* mergeSortHelper(
  array: number[],
  left: number,
  right: number
): AlgorithmGenerator<SortState> {
  if (left >= right) return;

  const mid = Math.floor((left + right) / 2);

  yield {
    state: { array: [...array], comparing: [left, right], pivot: mid, sorted: [], swapped: false },
    description: `Dividing: indices ${left}–${right}, mid at ${mid}.`,
  };

  yield* mergeSortHelper(array, left, mid);
  yield* mergeSortHelper(array, mid + 1, right);

  const leftArr = array.slice(left, mid + 1);
  const rightArr = array.slice(mid + 1, right + 1);
  let i = 0, j = 0, k = left;
  const merging: number[] = [];

  while (i < leftArr.length && j < rightArr.length) {
    merging.push(k);
    yield {
      state: { array: [...array], comparing: [...merging], pivot: null, sorted: [], swapped: false },
      description: `Merging: comparing ${leftArr[i]} and ${rightArr[j]}.`,
    };
    if (leftArr[i] <= rightArr[j]) {
      array[k++] = leftArr[i++];
    } else {
      array[k++] = rightArr[j++];
    }
    yield {
      state: { array: [...array], comparing: [...merging], pivot: null, sorted: [], swapped: true },
      description: `Placed ${array[k - 1]} at index ${k - 1}.`,
    };
  }

  while (i < leftArr.length) {
    merging.push(k); array[k++] = leftArr[i++];
    yield { state: { array: [...array], comparing: [...merging], pivot: null, sorted: [], swapped: false }, description: `Copying left: ${array[k-1]} → index ${k-1}.` };
  }
  while (j < rightArr.length) {
    merging.push(k); array[k++] = rightArr[j++];
    yield { state: { array: [...array], comparing: [...merging], pivot: null, sorted: [], swapped: false }, description: `Copying right: ${array[k-1]} → index ${k-1}.` };
  }
}
