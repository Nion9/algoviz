import algorithms from "@/data/algorithms.json";
import type { AlgorithmMeta } from "@/types";
import Link from "next/link";

const CATEGORIES = [
  { id: "sorting",   label: "Sorting & searching", color: "#378ADD", count: 0 },
  { id: "graph",     label: "Graph algorithms",     color: "#1D9E75", count: 0 },
  { id: "ml",        label: "AI / Machine learning", color: "#7F77DD", count: 0 },
  { id: "searching", label: "Searching",             color: "#378ADD", count: 0 },
];

// Count algorithms per category
const algos = algorithms as AlgorithmMeta[];
CATEGORIES.forEach((cat) => {
  cat.count = algos.filter((a) => a.category === cat.id && a.phase === 1).length;
});

export default function HomePage() {
  const phase1 = algos.filter((a) => a.phase === 1);

  return (
    <div>
      {/* Hero */}
      <div className="mb-14 max-w-2xl">
        <h1 className="text-4xl font-semibold tracking-tight mb-4">
          See algorithms think
        </h1>
        <p className="text-lg text-zinc-500 leading-relaxed">
          Interactive visualizations for every major algorithm — step by step,
          at your own pace. Free, no accounts, no ads.
        </p>
      </div>

      {/* Category cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-14">
        {CATEGORIES.filter((c) => c.count > 0).map((cat) => (
          <Link
            key={cat.id}
            href={`/${cat.id}`}
            className="group block p-6 rounded-2xl border border-zinc-200 dark:border-zinc-800 hover:border-zinc-400 dark:hover:border-zinc-600 transition-all bg-white dark:bg-zinc-900"
          >
            <div
              className="w-3 h-3 rounded-full mb-4"
              style={{ background: cat.color }}
            />
            <h2 className="font-medium text-lg mb-1 group-hover:text-zinc-600 dark:group-hover:text-zinc-300 transition-colors">
              {cat.label}
            </h2>
            <p className="text-sm text-zinc-400">{cat.count} algorithms</p>
          </Link>
        ))}
      </div>

      {/* All algorithms list */}
      <div>
        <h2 className="text-xl font-medium mb-6">All algorithms</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {phase1.map((algo) => (
            <Link
              key={algo.id}
              href={`/${algo.category}/${algo.id}`}
              className="group flex flex-col p-4 rounded-xl border border-zinc-200 dark:border-zinc-800 hover:border-zinc-400 dark:hover:border-zinc-600 bg-white dark:bg-zinc-900 transition-all"
            >
              <span className="text-sm font-medium mb-1">{algo.name}</span>
              <span className="text-xs text-zinc-400 line-clamp-2">
                {algo.description}
              </span>
              <div className="mt-3 flex gap-2">
                <span className="text-xs px-2 py-0.5 rounded-full bg-zinc-100 dark:bg-zinc-800 text-zinc-500">
                  {algo.timeComplexity.average}
                </span>
                <span
                  className={`text-xs px-2 py-0.5 rounded-full ${
                    algo.difficulty === "beginner"
                      ? "bg-emerald-50 text-emerald-600 dark:bg-emerald-950 dark:text-emerald-400"
                      : "bg-amber-50 text-amber-600 dark:bg-amber-950 dark:text-amber-400"
                  }`}
                >
                  {algo.difficulty}
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
