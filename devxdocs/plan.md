# Animation Design Plan — cpu.land Rebuild

This is the implementation spec. Every section listed below gets built as its own component
folder (see "Folder Convention"). Read the matching chapter's raw content in
`devxdocs/content/raw/0X-*.md` before building a section — this plan is the *design*, the raw
file is the *fact source*.

## Philosophy

- **Text budget: 1-2 short lines per scroll-section, max.** No paragraphs, ever. If a concept
  needs more explanation than 2 lines can hold, that means it needs a second scroll-section
  and a second animation beat — not more text.
- **Show, don't tell.** Every technical concept below has a physical/visual metaphor (a moving
  pointer, a splitting cell, a locked box, a tree growing). The animation IS the explanation.
- **Continuity over slides.** Where possible, one chapter's closing visual becomes the next
  chapter's opening visual (e.g. the CPU chip from the Ch.0 zoom-in is the same CPU chip used
  in Ch.1's fetch-execute loop) so it reads as one continuous story, not disconnected slides.

## The Animation Mechanism (how scroll drives everything)

1. Each section is **pinned** to the viewport (it stays fixed like a full-screen slide) for a
   fixed scroll distance (e.g. 250vh of scroll = one section's "runway").
2. A single GSAP timeline is built for that section, containing every animation step in order
   (move this, then fade that, then highlight this).
3. `ScrollTrigger` with `scrub: true` ties the timeline's progress (0 → 1) directly to how far
   the user has scrolled through that section's runway. This is what makes it scrub like a
   video slider instead of autoplaying.
4. Captions are keyframes **on that same timeline** (e.g. `.to(caption1, {opacity: 0}, "40%")`)
   — not a separate system. One timeline drives both the diagram and the text.
5. Lenis provides the smooth-scroll feel; it just feeds scroll position to ScrollTrigger every
   frame.

Every section below lists: **Caption(s)** (the actual copy, in order) and **Animation** (the
visual metaphor + what moves, in order). "Reuses" notes call out shared visual language so we
build a small reusable diagram library instead of one-off SVGs everywhere (DRY).

## Folder Convention

```
components/
  chapters/
    00-intro/
      index.tsx            # composes this chapter's scenes in order
      hook/
        Section.tsx         # layout, pin wrapper, caption text
        Diagram.tsx         # scene markup (SVG, sometimes plain HTML/CSS)
        useAnimation.ts      # GSAP timeline for this section
      roadmap/ ...
    01-the-basics/
      index.tsx
      binary-to-asm/ ...
      fetch-execute-cycle/ ...
      (one subfolder per section listed below)
  shared/
    Caption.tsx            # consistent 1-2 line caption styling
    CaptionLayer.tsx        # stacks caption beats so they cross-fade in place
    ChapterSection.tsx      # the full-viewport pin target every scene renders into
    diagrams/              # reusable primitives (Ring, MemoryTape, CpuChip, ...)
lib/
  motion/
    gsap.ts                # single GSAP plugin-registration point — import gsap from here
    constants.ts            # scroll runway lengths, easing — no magic numbers elsewhere
    useScrollTimeline.ts     # shared hook wrapping ScrollTrigger pin+scrub boilerplate
    SmoothScrollProvider.tsx # Lenis + ScrollTrigger clock sync
    theme.ts                 # reads color tokens from globals.css at runtime for GSAP tweens
app/
  page.tsx                 # imports chapters in order — thin composition root only
```

Every scene follows the same three-file shape: `Diagram.tsx` renders markup with semantic
`data-role`/`data-beat` attributes and no animation logic; `useAnimation.ts` calls
`useScrollTimeline` and targets those attributes with GSAP selector strings (scoped
automatically, no ref-per-element plumbing); `Section.tsx` wires the two together inside a
`ChapterSection` + `CaptionLayer`. Copy an existing scene folder as the starting template for
a new one rather than inventing a new shape.

## Progress Checklist

- [x] Chapter 0 — Intro (2 sections)
- [x] Chapter 1 — The Basics (6 sections)
- [ ] Chapter 2 — Multitasking (4 sections)
- [ ] Chapter 3 — Exec (5 sections)
- [ ] Chapter 4 — ELF (5 sections)
- [ ] Chapter 5 — Paging (6 sections)
- [ ] Chapter 6 — Fork & COW (5 sections)
- [ ] Chapter 7 — Epilogue (2 sections)

---

## Chapter 0 — Intro

### 1. `hook` — done
- **Caption:** "What actually happens when you press run?"
- **Animation:** Dark screen, blinking terminal cursor. A hand/click triggers a program icon.
  Camera zooms *through* the screen — into the motherboard, into a CPU die — ending on a
  pulsing CPU chip. Sets up the visual actor used throughout Ch.1.

### 2. `roadmap` — done
- **Caption:** "8 chapters. One rabbit hole."
- **Animation:** Chapter numbers 0-7 appear as stepping stones in a path; camera pans across
  them left-to-right, then the path fades except for a "you are here" marker on Ch.1, inviting
  the scroll to continue.

---

## Chapter 1 — The Basics

> Note: a separate `cpu-intro` scene ("the CPU just runs instructions, forever") was planned
> but folded into the end of Ch.0's `hook` instead — the chip already ends there mid-pulse, and
> starting Ch.1 on a second, near-identical beat felt redundant. The `CpuChip` primitive it
> would have used is still shared and reused.

### 1. `binary-to-asm` — done
- **Caption:** "Machine code is just bytes. Assembly is bytes you can read."
- **Animation:** A row of raw bits morphs into hex bytes, which morphs into assembly text
  (`add ebx, 10`). Matching byte ↔ word pairs share a color so the translation is visually
  obvious. (Reuses: color-coded token component.)

### 2. `fetch-execute-cycle` — done
- **Caption 1 (0-40%):** "Fetch: read the next instruction."
- **Caption 2 (40-80%):** "Execute it. Then move on."
- **Caption 3 (80-100%):** "Repeat. Forever."
- **Animation:** A horizontal strip of memory byte-boxes ("memory tape") with a glowing
  instruction-pointer arrow. Pointer highlights a box (fetch), slides to the next box
  (execute), then a loop icon draws itself around the row. (Reuses: memory-tape component,
  used again in Ch.4 and Ch.5.)

### 3. `processors-are-naive` — done
- **Caption:** "The CPU only knows the next instruction. 'Processes' don't exist to it."
- **Animation:** The memory tape zoomed out; the pointer just keeps marching in a straight
  line while a dashed "process" label flickers in and out above it, showing it's an illusion
  layered on top, not something the CPU tracks itself.

### 4. `rings-kernel-user` — done
- **Caption:** "Ring 0 can touch anything. Ring 3 can't touch much."
- **Animation:** Two concentric rings — inner "ring 0" (kernel), outer "ring 3" (user). A
  program-dot sits in the outer ring; it tries to reach into the inner ring and bounces off
  with a denied-flash. (Reuses: ring component, used again for the higher-half-kernel section
  in Ch.5.)

### 5. `syscall-interrupt` — done
- **Caption:** "Need the kernel? Knock with an interrupt."
- **Animation:** The program-dot fires a signal (INT); a trace line draws to the matching
  Interrupt Vector Table row; the dot jumps into the kernel ring, pulses (doing its work), then
  a trace draws back out (IRET) as the dot returns to ring 3.

### 6. `libc-wrapper` — done
- **Caption:** "Libraries hide the knock for you."
- **Animation:** A friendly `exit(1)` call drops into a box labeled "libc," which then fires
  the same INT/IRET mechanism from the previous scene in miniature underneath — showing it's
  the same knock, just wrapped.

---

## Chapter 2 — Multitasking

### 1. `single-core-problem`
- **Caption:** "One CPU core. Many programs. A trick is needed."
- **Animation:** One CPU box, three program icons queued beside it, all wanting the CPU
  at once (impatient bouncing).

### 2. `hardware-interrupt-timer`
- **Caption:** "A timer chip interrupts, no matter what."
- **Animation:** A ticking timer-chip icon sends a pulse into the CPU mid-execution of program
  code, forcing a jump to kernel code. (Reuses: ring-jump visual language from Ch.1.)

### 3. `round-robin-scheduling`
- **Caption:** "Everyone gets a slice of time."
- **Animation:** The big one. A horizontal timeline builds left-to-right as you scroll: 3
  process blocks cycle in turn, a thin "kernel scheduler" sliver between each, with
  "timeslice (2ms)" and "target latency (6ms)" brackets drawing in underneath.

### 4. `preemption-loop`
- **Caption:** "Interrupt. Save. Switch. Resume."
- **Animation:** A circular 4-step flow diagram animates one full rotation: set timer → run
  program → timer fires → switch — looping back to where `round-robin-scheduling` left off.

---

## Chapter 3 — Exec

### 1. `execve-intro`
- **Caption:** "execve() replaces a program... with another program."
- **Animation:** A process box containing "code A"; execve() is called; code A fades out and
  code B fades in *inside the same box* (a replacement, not an addition).

### 2. `exec-flow-binfmt`
- **Caption:** "The kernel tries format after format until one fits."
- **Animation:** User-space → kernel-space flowchart. `./file.bin` → `execve()` syscall →
  arrow crosses into kernel space → a keyring metaphor: the kernel tries keys (binfmt
  handlers) on a lock one at a time until one turns.

### 3. `binprm-buffer-shebang`
- **Caption:** "Only the first 256 bytes matter here."
- **Animation:** A byte array representing a file; the first 256 bytes glow and stay, the rest
  fade to gray and visually fall off the edge of the screen.

### 4. `shebang-argv-rewrite`
- **Caption:** "Scripts quietly rewrite their own arguments."
- **Animation:** An `argv` array of chips `[./script, A, B, C]`. Chip 0 is removed; new chips
  (interpreter path, interpreter args) slide in from the left; remaining args shift right.

### 5. `shell-fallback`
- **Caption:** "No shebang? Your shell just guesses: 'it's a script.'"
- **Animation:** execve fails (red X) → shell icon shrugs → retries by wrapping the file with
  itself as interpreter → succeeds (green check).

---

## Chapter 4 — ELF

### 1. `elf-file-structure`
- **Caption:** "Every binary has the same 4 building blocks."
- **Animation:** The big one. 4 stacked blocks assemble in sequence — ELF Header, Program
  Header Table, Section Header Table, Data — then arrows draw from PHT/SHT into the Data
  block (exploded-view style).

### 2. `program-header-types`
- **Caption:** "The header table says what to load, and where."
- **Animation:** The PHT block from the previous section expands into 4 rows (`PT_LOAD`,
  `PT_NOTE`, `PT_DYNAMIC`, `PT_INTERP`), each gaining a small icon.

### 3. `section-header-map`
- **Caption:** "The section table is a map, mostly for debuggers."
- **Animation:** Treasure-map metaphor — an old map unrolls, islands labeled `.text`, `.data`,
  `.bss`, `.shstrtab` appear with a compass rose; camera pans across it.

### 4. `static-vs-dynamic-linking`
- **Caption:** "Copy the library in — or borrow it live."
- **Animation:** Split screen. Left (static): function `foo`'s code is physically copied into
  two separate program boxes. Right (dynamic): two program boxes hold only a name-tag `foo`,
  with arrows pointing out to one shared `foo` box.

### 5. `elf-execution`
- **Caption:** "Load the segments into memory. Jump. Go."
- **Animation:** `PT_LOAD` blocks fly from the file into a memory strip (reuses the
  memory-tape component from Ch.1); the instruction pointer lands on the entry point and the
  fetch-execute loop resumes (ties back to Ch.1 visually).

---

## Chapter 5 — Paging

### 1. `mmu-translation`
- **Caption:** "Every address you use is a lie the MMU tells."
- **Animation:** The CPU asks an MMU "librarian" character to translate an address; the MMU
  flips through a dictionary and returns a different address — the hex value visibly morphs
  as it passes through the MMU box.

### 2. `page-size-breakdown`
- **Caption:** "Only the top bits get translated. The rest stay put."
- **Animation:** A 64-bit address bar; the lowest 12 bits highlight separately (untouched page
  offset) while the upper bits pass through the MMU box and morph, then recombine.

### 3. `process-isolation-mapping`
- **Caption:** "Same address. Two processes. Different memory."
- **Animation:** Two process boxes both point at virtual address `0x400000`; arrows diverge
  into two separate spots inside one shared physical-memory strip.

### 4. `higher-half-kernel`
- **Caption:** "Half the address space always belongs to the kernel."
- **Animation:** A long horizontal bar splits at the midpoint — user space / kernel space. A
  user-mode dot tries to cross into kernel space and is blocked. (Reuses: ring-block visual
  language from Ch.1.)

### 5. `hierarchical-page-table`
- **Caption:** "A 4-level tree, so empty memory costs nothing."
- **Animation:** The big one. A tree grows top-down, one level per scroll step: level 4 table
  → indexed by address bits → points to a level 3 table → ... → level 1 → points into a 4 KiB
  RAM block. Relevant address bits highlight as each level is indexed.

### 6. `page-fault-demand-paging`
- **Caption:** "Missing memory? Fault, fetch, retry."
- **Animation:** 3-panel comic, scroll-scrubbed: (1) CPU requests an address, MMU is confused
  → page-fault lightning bolt (2) kernel loads data from disk into RAM (3) MMU says "here's
  your memory," CPU says thanks.

---

## Chapter 6 — Fork & COW

### 1. `fork-clone`
- **Caption:** "fork() clones a process. Now there are two."
- **Animation:** One process box splits into two identical boxes (cell-mitosis style), labeled
  "parent" and "child." A return-value badge shows `0` on the child, the child's PID on the
  parent.

### 2. `fork-exec-pattern`
- **Caption:** "Clone yourself. Then become someone else."
- **Animation:** Continues from `fork-clone` — the child box immediately morphs (execve) into
  a new program icon. (Ties back to Ch.3's `execve-intro` replace animation.)

### 3. `copy-on-write`
- **Caption:** "Both share memory... until either one writes."
- **Animation:** Parent + child page-table arrows both point to one shared, locked
  (read-only) physical memory block. The moment either process writes, the block splits into
  two separate writable copies (mitosis again, this time for a single memory page).

### 4. `init-process-tree`
- **Caption:** "One process started it all: init."
- **Animation:** A single root node "init" at the top; a tree grows downward/outward live as
  new process nodes fork off, building an org chart in front of you.

### 5. `boot-sequence`
- **Caption:** "Firmware, bootloader, kernel, then you."
- **Animation:** A 4-stage relay-race handoff: motherboard firmware passes a baton to the
  bootloader, which passes to the kernel, which passes to init — each stage steps in as the
  previous one dims.

---

## Chapter 7 — Epilogue

### 1. `stack-vs-heap`
- **Caption:** "The stack grows down. The heap grows on request."
- **Animation:** Split screen. Left: stack — fixed high address, frames pushing/popping like
  stacked blocks. Right: heap — grows as `malloc` is called, managed by libc, which
  occasionally calls out to `mmap`/`sbrk`.

### 2. `closing`
- **Caption:** "You now know what your computer is doing."
- **Animation:** Reverse of Ch.0's zoom-in — pull back from the CPU die, out through the
  motherboard, out through the screen, to a minimal credits fade (author + Hack Club).

---

## Notes for implementation agents

- Always re-read the matching `devxdocs/content/raw/0X-*.md` file before building a section —
  this plan is the design intent, not a content substitute.
- Build the `shared/diagrams/` primitives (ring, memory-tape, tree-node, mitosis-split) as
  their own small components the first time they're needed, then import/reuse — don't
  copy-paste SVG between chapters.
- Mark checklist items done in this file as sections are completed; append a line to
  `devxdocs/agentlog.md` each session.
