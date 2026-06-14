import algorithms from "@/data/algorithms.json";
import type { AlgorithmMeta } from "@/types";
import { ComplexityBadge } from "@/components/ui/ComplexityBadge";
import { notFound } from "next/navigation";
import type { Metadata } from "next";

interface PageProps {
  params: { category: string; algo: string };
}

const algos = algorithms as AlgorithmMeta[];

export function generateStaticParams() {
  return algos.map((a) => ({ category: a.category, algo: a.id }));
}

export function generateMetadata({ params }: PageProps): Metadata {
  const algo = algos.find((a) => a.id === params.algo);
  if (!algo) return { title: "Not found" };
  return {
    title: `${algo.name} — AlgoViz`,
    description: algo.description,
  };
}

async function getVisualizer(id: string) {
  switch (id) {
    case "bubble-sort": {
      const { BubbleSortVisualizer } = await import("@/components/visualizers/SortVisualizers");
      return <BubbleSortVisualizer />;
    }
    case "selection-sort": {
      const { SelectionSortVisualizer } = await import("@/components/visualizers/SortVisualizers");
      return <SelectionSortVisualizer />;
    }
    case "insertion-sort": {
      const { InsertionSortVisualizer } = await import("@/components/visualizers/SortVisualizers");
      return <InsertionSortVisualizer />;
    }
    case "merge-sort": {
      const { MergeSortVisualizer } = await import("@/components/visualizers/SortVisualizers");
      return <MergeSortVisualizer />;
    }
    case "quick-sort": {
      const { QuickSortVisualizer } = await import("@/components/visualizers/SortVisualizers");
      return <QuickSortVisualizer />;
    }
    default:
      return (
        <div className="flex items-center justify-center h-48 rounded-xl border border-dashed border-zinc-200 dark:border-zinc-700 text-zinc-400 text-sm">
          Visualizer coming soon
        </div>
      );
  }
}

export default async function AlgoPage({ params }: PageProps) {
  const algo = algos.find((a) => a.id === params.algo);
  if (!algo) notFound();

  const visualizer = await getVisualizer(algo.id);

  return (
    <div className="max-w-3xl">
      {/* Breadcrumb */}
      <nav className="text-sm text-zinc-400 mb-6">
        <a href="/" className="hover:text-zinc-600">Home</a>
        <span className="mx-2">/</span>
        <a href={`/${algo.category}`} className="hover:text-zinc-600 capitalize">
          {algo.categoryLabel}
        </a>
        <span className="mx-2">/</span>
        <span className="text-zinc-600 dark:text-zinc-300">{algo.name}</span>
      </nav>

      {/* Header */}
      <h1 className="text-3xl font-semibold tracking-tight mb-2">{algo.name}</h1>
      <p className="text-zinc-500 mb-6 leading-relaxed">{algo.description}</p>

      {/* Complexity */}
      <div className="mb-8 p-4 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900">
        <ComplexityBadge meta={algo} />
      </div>

      {/* Visualizer */}
      <div className="mb-8">
        <h2 className="text-lg font-medium mb-4">Visualizer</h2>
        {visualizer}
      </div>

      {/* Tags */}
      <div className="flex flex-wrap gap-2 mt-4">
        {algo.tags.map((tag) => (
          <span key={tag} className="text-xs px-2.5 py-1 rounded-full bg-zinc-100 dark:bg-zinc-800 text-zinc-500">
            {tag}
          </span>
        ))}
      </div>
    </div>
  );
}
