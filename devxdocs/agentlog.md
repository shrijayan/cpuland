# Agent Log

Append-only. Newest entries at the bottom. Read only the tail when resuming.

---

2026-07-21: Initialized git repo. Scraped all 8 chapters of cpu.land verbatim via direct
WebFetch tool calls (not agent-summarized, to avoid hallucination) and saved to
devxdocs/content/raw/0X-*.md. Deleted an earlier agent-paraphrased all-chapters.md so
raw/ is the single source of truth. Decided tech stack: Next.js + TypeScript + GSAP/ScrollTrigger
+ Lenis, deployed on Vercel, SVG diagrams animated by hand (no Lottie/Three.js). Wrote
devxdocs/plan.md: 35 scroll-sections across 8 chapters, each with real caption copy + animation
description.

2026-07-21 (cont'd): Scaffolded Next.js 16 + React 19 + TypeScript + Tailwind v4 via
create-next-app (in /tmp, merged in — repo already had files). Installed gsap, @gsap/react,
lenis. Built the core motion engine: lib/motion/gsap.ts (single plugin-registration point —
ScrollTrigger, MotionPathPlugin, DrawSVGPlugin), lib/motion/useScrollTimeline.ts (the shared
pin+scrub hook every scene uses), lib/motion/SmoothScrollProvider.tsx (Lenis <-> GSAP ticker
sync), lib/motion/theme.ts (reads color tokens from globals.css at runtime so JS never
hardcodes a hex color). Designed the dark "premium tech" theme in app/globals.css (@theme
tokens: void/surface/ink + user/kernel/signal/danger/success semantic accents, Geist
Sans+Mono). Built shared/{Caption,CaptionLayer,ChapterSection} + shared/diagrams/{Ring,
MemoryTape,CpuChip} primitives. Built Chapter 0 (hook, roadmap) and Chapter 1 — The Basics, all
6 scenes (binary-to-asm, fetch-execute-cycle, processors-are-naive, rings-kernel-user,
syscall-interrupt, libc-wrapper) fully wired with real GSAP timelines. `npm run build` and
`npm run lint` both pass clean; verified via dev server + curl that SSR output contains the
expected content with no error boundaries triggered. Updated plan.md checklist (Ch.0-1 done;
dropped a redundant standalone `cpu-intro` scene, folded into Ch.0's hook ending instead).
Next: delegate Chapters 2-7 to parallel agents, each building against the same
Diagram/useAnimation/Section pattern and reusing the shared primitives, then wire into
app/page.tsx, build-check, and commit.
