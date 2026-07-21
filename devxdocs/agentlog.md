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

2026-07-21 (visual QA session): Set up chrome-devtools MCP server (global config,
~/.config/opencode/opencode.jsonc) so future sessions can actually see the site instead of
inferring from build/type checks alone — required pointing --executablePath at the system's
Chromium (no Google Chrome installed) and adding --isolated (a stale/duplicate MCP server
process was holding the browser profile lock; --isolated uses a fresh temp profile per launch
so this can't recur). Found and fixed the single biggest bug in the whole site:

- **Root cause of "content cut off / not visible" across every chapter**: in
  `lib/motion/useScrollTimeline.ts`, `start: "top top"` is a STRING, and GSAP's
  `_parsePosition` resolves a relative `end: "+=X%"` against a string start as just
  `X% of the trigger's own height` — it does NOT implicitly add the trigger's own 100% first.
  So `SCROLL_RUNWAY.short = "+=60%"` meant the pin released after only 60% of a viewport-height
  of scroll (~600px), while the reserved spacer (sized for start + that same distance, PLUS the
  trigger's natural height) was ~1600px — leaving a ~1000px dead zone every single scene where
  the previous scene had already frozen in its end state but the next one hadn't started yet.
  Fixed by changing the three runway constants to include the base 100% themselves
  ("+=160%"/"+=240%"/"+=360%"), with a big comment explaining why, so nobody "fixes" it back.
  Verified empirically before/after with direct scrollTo probes at many points within one
  section's pin range (real trusted `press_key` PageDown too, not just synthetic events, to
  rule out it being a testing artifact) — pin now correctly holds for its entire spacer.
- Learned mid-session: this must be checked against the PRODUCTION build (`next build && next
  start`), not `next dev` — dev mode's Fast Refresh / React double-invoke left stale/duplicate
  ScrollTrigger pin-spacers that produced confusing, inconsistent measurements that had nothing
  to do with the real bug above.
- Surveyed all 35 scenes visually (scroll probes at ~65-70% through each scene's pin range +
  screenshots). Several things that looked like bugs at a 70% sample turned out to be fine once
  checked at 95% (the animation just hadn't finished yet at 70% for scenes with more sub-steps
  than runway percentage budget) — always re-check at a late sample point before concluding
  something is broken, not just one arbitrary scroll position.
- Real bugs fixed this session:
  - `stack-vs-heap`: Stack and Heap panels each stretched the FULL section height with content
    `justify-start`/`justify-end` pinned to opposite ends — technically "correct" per the code
    but visually read as two disconnected halves with a huge dead gap. Fixed by giving both
    panels a shared fixed-height box (h-64/h-80) instead of stretching full height.
  - `fork-clone`: `child-box` and `child-badge` were each getting `xPercent: 130` independently
    — since `xPercent` is relative to EACH element's own width, and the box/badge are different
    widths, they drifted out of alignment after the split. Fixed by animating a shared
    `child-column` wrapper instead so box+badge move the same actual pixel distance together.
  - Shared `Ring` primitive + `syscall-interrupt`'s own ring: the "RING 0" label sat inside the
    ring, close to/exactly where the mode-dot ends up resting (kernel-mode position) — dot
    visually covered the label. Moved both "RING 3" and "RING 0" labels fully outside their
    respective ring circles (mirrors how "RING 3" was already placed outside the outer ring).
- Clarity improvement (per user request — animation should be self-explanatory, we should NOT
  add prose text to compensate): `round-robin-scheduling` process blocks were 3 identical
  unlabeled cyan bars for the whole scene (only two generic timing brackets faded in at the very
  end) — added persistent "P1"/"P2"/"P3" labels directly on each block, fading in right as that
  block finishes growing, so it's immediately legible that these are three distinct processes
  taking turns, not just an abstract pattern. This is the model to follow for future clarity
  fixes: short (1-3 word) labels ON the diagram, not more caption text.
- False alarms (re-verified fine at 95%, no fix needed): `exec-flow-binfmt` "flat" key overlap,
  `static-vs-dynamic-linking` missing shared-foo box, `process-isolation-mapping` second arrow
  not completing, `elf-execution` segments not landing — all just needed more scroll to finish.
- Not fixed (low priority, cosmetic only): `binary-to-asm` has a brief ghosting/double-exposure
  during the hex\u2194asm flip transition (inherent to the crossfade-based flip technique, only
  visible mid-scroll, not at rest — would need a true 3D flip with backface-visibility to fully
  fix, not worth it for how minor it is).
- Rebuilt + restarted production server + full re-verification screenshot pass after every fix
  batch. `npx tsc --noEmit` and `npm run build` clean throughout. No console errors.
- IMPORTANT for next session: the chrome-devtools MCP browser is a SEPARATE isolated Chromium
  instance from whatever browser the user has open on their own screen — verifying something
  here does not mean the user's own tab is showing the same (possibly stale/cached) state. Tell
  the user explicitly to hard-refresh their own tab after any fix.
Next: deploy to Vercel, mobile/responsive pass, and a final aesthetic polish pass (spacing,
color contrast, easing feel) now that the structural bugs are cleared.
