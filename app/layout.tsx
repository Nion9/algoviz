import type { Metadata } from "next";
import "@/styles/globals.css";

export const metadata: Metadata = {
  title: "AlgoViz — Algorithm visualizer",
  description:
    "Interactive visualizations for sorting, graph, AI/ML, data structure, and more algorithms. Free, forever.",
  openGraph: {
    title: "AlgoViz",
    description: "See algorithms think. Free interactive visualizations.",
    type: "website",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen">
        <header className="border-b border-zinc-200 dark:border-zinc-800 sticky top-0 bg-white/90 dark:bg-zinc-950/90 backdrop-blur z-50">
          <div className="max-w-6xl mx-auto px-4 h-14 flex items-center justify-between">
            <a href="/" className="font-semibold text-lg tracking-tight">
              AlgoViz
            </a>
            <nav className="flex gap-6 text-sm text-zinc-500">
              <a href="/sorting" className="hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors">Sorting</a>
              <a href="/graph" className="hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors">Graph</a>
              <a href="/ml" className="hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors">AI / ML</a>
            </nav>
          </div>
        </header>
        <main className="max-w-6xl mx-auto px-4 py-10">{children}</main>
        <footer className="border-t border-zinc-200 dark:border-zinc-800 mt-20 py-8 text-center text-sm text-zinc-400">
          AlgoViz — open source, free forever. Built by{" "}
          <a
            href="https://linkedin.com/in/nion007"
            className="underline hover:text-zinc-600"
            target="_blank"
            rel="noopener noreferrer"
          >
            Nion
          </a>
          .
        </footer>
      </body>
    </html>
  );
}
