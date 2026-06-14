import algorithms from "@/data/algorithms.json";
import type { AlgorithmMeta } from "@/types";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";

interface PageProps {
  params: { category: string };
}

const algos = algorithms as AlgorithmMeta[];

const CATEGORY_LABELS: Record<string, string> = {
  sorting: "Sorting & searching",
  searching: "Searching",
  graph: "Graph algorithms",
  ml: "AI / Machine learning",
  dp: "Dynamic programming",
  strings: "String algorithms",
  crypto: "Cryptography",
  geometry: "Computational geometry",
};

export function generateStaticParams() {
  const cats = [...new Set(algos.map((a) => a.category))];
  return cats.map((c) => ({ category: c }));
}

export function generateMetadata({ params }: PageProps): Metadata {
  const label = CATEGORY_LABELS[params.category] ?? params.category;
  return { title: `${label} — AlgoViz` };
}

export default function CategoryPage({ params }: PageProps) {
  const filtered = algos.filter((a) => a.category === params.category);
  if (filtered.length === 0) notFound();

  const label = CATEGORY_LABELS[params.category] ?? params.category;

  return (
    <div>
      <nav className="text-sm text-zinc-400 mb-6">
        <a href="/" className="hover:text-zinc-600">Home</a>
        <span className="mx-2">/</span>
        <span className="text-zinc-600 dark:text-zinc-300">{label}</span>
      </nav>

      <h1 className="text-3xl font-semibold tracking-tight mb-2">{label}</h1>
      <p className="text-zinc-500 mb-8">{filtered.length} algorithms</p>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {filtered.map((algo) => (
          <Link
            key={algo.id}
            href={`/${algo.category}/${algo.id}`}
            className="group flex flex-col p-5 rounded-xl border border-zinc-200 dark:border-zinc-800 hover:border-zinc-400 dark:hover:border-zinc-600 bg-white dark:bg-zinc-900 transition-all"
          >
            <span className="font-medium mb-1">{algo.name}</span>
            <span className="text-sm text-zinc-400 line-clamp-2 mb-4">
              {algo.description}
            </span>
            <div className="flex gap-2 mt-auto">
              <span className="text-xs px-2 py-0.5 rounded-full bg-zinc-100 dark:bg-zinc-800 text-zinc-500 font-mono">
                {algo.timeComplexity.average}
              </span>
              <span className="text-xs px-2 py-0.5 rounded-full bg-zinc-100 dark:bg-zinc-800 text-zinc-500 font-mono">
                {algo.spaceComplexity} space
              </span>
              <span
                className={`ml-auto text-xs px-2 py-0.5 rounded-full ${
                  algo.difficulty === "beginner"
                    ? "bg-emerald-50 text-emerald-600 dark:bg-emerald-950 dark:text-emerald-400"
                    : algo.difficulty === "intermediate"
                    ? "bg-amber-50 text-amber-600 dark:bg-amber-950 dark:text-amber-400"
                    : "bg-red-50 text-red-600 dark:bg-red-950 dark:text-red-400"
                }`}
              >
                {algo.difficulty}
              </span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
