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

2026-07-21 (cont'd again): Built all remaining chapters (2-7, 27 scenes) via parallel
sub-agents following the Chapter 1 pattern exactly. Lesson learned: per-CHAPTER task
granularity (4-6 scenes each) was too large — agents burned their whole session reading
reference files and never got to writing code, returning empty results. Switched to
per-SCENE task granularity (1 scene = 3 files each) with tighter, more prescriptive prompts
(exact diagram geometry, exact data-role names, exact animation steps) — this worked
reliably, run in batches of 3-5 parallel agents at a time (batches of 9 had a ~20% silent
failure rate — some tasks return an empty result with no files written despite the tool
reporting "completed"; always verify the filesystem after every batch and retry any missing
scene solo before moving on, 1-2 retries was always enough). All 35 scenes across 8 chapters
now exist (105 files: Diagram.tsx/useAnimation.ts/Section.tsx per scene). Wrote index.tsx for
chapters 2-7 (composing scenes in plan.md order) and wired everything into app/page.tsx.
Full verification pass: `npx tsc --noEmit`, `npm run lint`, `npm run build` all pass clean;
dev server + curl confirms every chapter's caption text renders with zero error boundaries
triggered. plan.md checklist fully marked done (all 8 chapters, all 35 scenes).

Next steps for a future session (polish pass, not missing functionality):
- Visual QA in an actual browser (this session only verified via SSR HTML + build/type
  checks — nobody has *looked* at the animations yet; scroll through every chapter and check
  pacing, easing, whether captions are legible over their diagrams, whether any diagram's
  hand-picked SVG coordinates look cramped/overlapping at different viewport sizes).
- Mobile/responsive check — ChapterSection is `h-screen w-full`, diagrams use viewBox scaling,
  but nothing has been tested below desktop width yet.
- Consider adding a subtle progress indicator (which chapter you're in) since it's a long
  single-page scroll with no navigation currently beyond the Ch.0 roadmap.
- Re-check color contrast of text-ink-dim captions against each scene's specific background —
  built somewhat "blind" (no visual feedback loop during construction).
- Deploy to Vercel (not done yet) and smoke-test the production deployment.
- A few scenes reused Tailwind-adjacent ad-hoc colors (e.g. text-success/text-danger) — confirm
  every color reference actually resolves to a real @theme token (build passing means no
  outright typos broke compilation, but worth a visual sanity pass).
