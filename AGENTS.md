# cpu.land — Animated Rebuild

Rebuilding https://cpu.land ("Putting the 'You' in CPU" by Lexi Mattick / Hack Club) as a fully
animated, scroll-driven story. Goal: minimal text (max 1-2 line captions), everything else
explained through animation of diagrams (CPU, RAM, stack, page tables, fork/COW, etc).
Deploy target: Vercel.

## Source of Truth for Content
- `devxdocs/content/raw/0X-*.md` — verbatim copies of every chapter fetched directly from
  cpu.land via the WebFetch tool (NOT summarized by an agent). Always read the raw file for a
  chapter before building/animating that section, to avoid hallucinating facts. Never rewrite
  these files from memory — only re-fetch from the live site if they need updating.
- `devxdocs/plan.md` — the section-by-section design plan (caption text + animation
  description) for every chapter. This is what implementation work should follow.

## Coding Rules (see ~/.config/opencode/AGENTS.md for full global rules)
- Clean code / SOLID / DRY. No magic constants — pull from config/theme files.
- One responsibility per file. A chapter = its own folder with separate files for
  section/layout, diagram (SVG), and animation logic (hook). See plan.md for the exact
  folder convention.
- Fail fast, no silent fallback constants.

## Tech Stack (decided — see devxdocs/plan.md for full reasoning)
- Next.js (App Router) + TypeScript, deployed on Vercel.
- GSAP + ScrollTrigger for scroll-scrubbed animation timelines.
- Lenis for smooth scrolling.
- Diagrams are hand-built SVG animated with GSAP — no Lottie/Rive/Three.js.

## Progress Tracking
- `devxdocs/agentlog.md` — append-only log. Add a line every session with the date and what
  was done / what's next. Read only the tail of this file when resuming work (don't read the
  whole history unless you need deep context).
- `devxdocs/plan.md` — has a checklist of chapters/sections; mark items done as they're built.

## Workflow for building a new chapter/section
1. Read the chapter's raw content file in `devxdocs/content/raw/`.
2. Find its entry in `devxdocs/plan.md` for the caption text + animation approach.
3. Scaffold `components/chapters/0X-slug/` with `Section.tsx`, `Diagram.tsx`, `useAnimation.ts`.
4. Wire it into `app/page.tsx`.
5. Commit with a small, descriptive message. Commit often (after each section, not each chapter).
6. Append a line to `devxdocs/agentlog.md`.
