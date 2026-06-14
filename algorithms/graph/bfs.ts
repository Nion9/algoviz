import type { AlgorithmGenerator } from "@/types";

export interface BFSState {
  visited: Set<number>;
  queue: number[];
  current: number | null;
  order: number[];
}

export interface GraphNode {
  id: number;
  x: number;
  y: number;
}

export interface GraphEdge {
  from: number;
  to: number;
}

export function* bfs(
  adjacency: Record<number, number[]>,
  start: number
): AlgorithmGenerator<BFSState> {
  const visited = new Set<number>();
  const queue: number[] = [start];
  const order: number[] = [];

  visited.add(start);

  yield {
    state: { visited: new Set(visited), queue: [...queue], current: null, order: [] },
    description: `Starting BFS from node ${start}. Adding to queue.`,
  };

  while (queue.length > 0) {
    const current = queue.shift()!;
    order.push(current);

    yield {
      state: { visited: new Set(visited), queue: [...queue], current, order: [...order] },
      description: `Visiting node ${current}.`,
      highlight: [current],
    };

    const neighbours = adjacency[current] ?? [];
    for (const neighbour of neighbours) {
      if (!visited.has(neighbour)) {
        visited.add(neighbour);
        queue.push(neighbour);
        yield {
          state: { visited: new Set(visited), queue: [...queue], current, order: [...order] },
          description: `Node ${neighbour} discovered — added to queue.`,
          highlight: [current, neighbour],
        };
      }
    }
  }

  yield {
    state: { visited: new Set(visited), queue: [], current: null, order: [...order] },
    description: `BFS complete. Visit order: ${order.join(" → ")}.`,
  };
}
