# 🧮 AlgoViz

**Interactive Algorithm Visualizer** — free, open source, no ads.  
Understand how algorithms work by seeing them run step by step, right in your browser.

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Next.js](https://img.shields.io/badge/Next.js-14-black?logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.3-blue?logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.3-38B2AC?logo=tailwind-css)](https://tailwindcss.com/)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](CONTRIBUTING.md)

![AlgoViz Demo](public/demo.gif) <!-- Replace with an actual screenshot/GIF -->

## ✨ Features

- 🎨 **Canvas‑based visualizations** — smooth, 60 fps animations of algorithm steps
- 📚 **25+ algorithms** across sorting, searching, graphs, and AI/ML basics
- 🧩 **Generator‑function architecture** — clean separation of algorithm logic and UI
- 🎛️ **Playback controls** — play, pause, step forward/back, speed control, custom inputs
- 🌙 **Dark mode** (coming soon)
- 🧠 **Beginner‑friendly** — difficulty tags, time/space complexity, code snippets
- ⚡ **Static generation** with Next.js App Router — instant page loads, SEO‑friendly

## 🛠️ Tech Stack

| Area           | Technology                                      |
|----------------|-------------------------------------------------|
| Framework      | [Next.js 14](https://nextjs.org/) (App Router)  |
| Language       | [TypeScript](https://www.typescriptlang.org/)   |
| Styling        | [Tailwind CSS](https://tailwindcss.com/)        |
| State Management| [Zustand](https://docs.pmnd.rs/zustand) (playback state) |
| Visualization  | HTML5 Canvas API                                |
| Hosting        | [Vercel](https://vercel.com)                     |


## 📁 Project Structure
```bash
algoviz/
├── app/                   # Next.js App Router pages
│   ├── page.tsx           # Homepage — category grid
│   ├── [category]/
│   │   ├── page.tsx       # Category listing
│   │   └── [algo]/
│   │       └── page.tsx   # Individual algorithm page
├── algorithms/            # Pure algorithm logic (no UI)
│   ├── sorting/
│   │   ├── bubbleSort.ts
│   │   ├── mergeSort.ts
│   │   └── ...
│   ├── searching/
│   └── graph/
│       └── bfs.ts
├── components/
│   ├── visualizers/       # Canvas‑based visualizer components
│   │   ├── BubbleSortVisualizer.tsx
│   │   ├── MergeSortVisualizer.tsx
│   │   └── ...
│   └── ui/                # Shared UI (controls, badges, layouts)
│       ├── PlaybackBar.tsx
│       ├── ComplexityBadge.tsx
│       └── ...
├── hooks/
│   └── useAlgorithm.ts    # Core playback engine
├── data/
│   └── algorithms.json    # Master registry — all algorithm metadata
├── store/
│   └── playback.ts        # Zustand store (speed, step, state)
├── types/
│   └── index.ts           # Shared TypeScript types
├── public/                # Static assets (demo gif, favicon)
└── styles/                # Global Tailwind styles
```


## 🚀 Getting Started

```bash
# 1. Clone the repository
git clone https://github.com/yourusername/algoviz.git
cd algoviz

# 2. Install dependencies
npm install

# 3. Run the development server
npm run dev

# 4. Open in your browser
open http://localhost:3000
```

