# plan.md — Section-by-Section Animation Design

This is the build checklist. Every "scene" below = one pinned, scroll-scrubbed section in the
final site. Rule for every scene: **max 2 lines of caption text, everything else is animation.**
Jokes/asides/footnotes/code-walkthroughs from the source article are intentionally cut — only
the one core mechanism per scene survives, expressed as a moving diagram.

Read `devxdocs/content/raw/0X-*.md` for the verbatim source before implementing a scene — do not
rely on the summaries below for facts, they're just the animation brief.

Scroll length guide: **short** = 100vh pin, **medium** = 150-200vh pin, **long** = 250-350vh pin
(more scroll distance = more sub-steps in the animation before it releases).

Folder convention per scene: `components/chapters/0X-slug/NN-scene-slug/` containing
`Section.tsx` (layout + caption), `Diagram.tsx` (SVG markup), `useAnimation.ts` (GSAP timeline).

Status legend: `[ ]` not started · `[~]` in progress · `[x]` done

---

## Chapter 0 — Intro (`00-intro`)

### 0.1 Hook + roadmap — `[ ]` — short
- **Caption:** "What actually happens when you run a program?"
- **Animation:** A blank dark screen. A cursor types `./program` and hits enter. Cut to a
  small looping "?" pulse over a CPU icon. Then the 8 chapter icons (CPU, clock, terminal,
  elf/file, map, fork, epilogue) slide in left-to-right as a horizontal roadmap — this doubles
  as the site's chapter nav.
- **Interaction:** clicking a roadmap icon scroll-jumps to that chapter.

---

## Chapter 1 — The Basics (`01-the-basics`)

### 1.1 Machine code ⇄ assembly — `[ ]` — short
- **Caption:** "Machine code is just bytes. Assembly is bytes you can read."
- **Animation:** 3 bytes (`83 C3 0A`) morph/transform in place into the text `add ebx, 10`
  and back, on scroll-scrub (bidirectional). Bytes are color-coded per matching assembly word.

### 1.2 Fetch-execute cycle — `[ ]` — medium
- **Caption:** "Fetch: read the instruction. Execute: run it, move on." (2 captions, swap mid-pin)
- **Animation:** row of RAM byte-boxes + CPU box + "instruction pointer" arrow. Arrow slides
  box→box on scroll; each arrival highlights the box, "flies" a copy into the CPU (fetch), CPU
  pulses (execute), arrow advances. Loops for ~4 boxes then releases.

### 1.3 Processors are naive — `[ ]` — short
- **Caption:** "The CPU only knows the next instruction. 'Processes' don't exist to it."
- **Animation:** Same RAM strip zooms out; instruction pointer just keeps marching in one
  straight line off-screen, no branching, no awareness of anything else. A ghostly "process"
  label box fades in/out above it to show it's an illusion layered on top.

### 1.4 Two rings (kernel vs user mode) — `[ ]` — medium
- **Caption:** "Ring 0 can touch anything. Ring 3 can't touch much."
- **Animation:** Two concentric rings (donut shape). A dot (the CPU's current privilege level)
  sits in ring 0 by default; on scroll it moves out to ring 3 as a "start program" arrow fires.
  While in ring 3, an attempt to reach into protected memory (a padlocked box in the center)
  bounces off with a small shake ("segfault" flash).

### 1.5 Syscall = software interrupt — `[ ]` — long
- **Caption:** "A syscall jumps you into the kernel — safely, at a preset address."
- **Animation:** IVT table of 4 rows appears. User-mode dot triggers `INT` → line traces from
  dot to the matching IVT row → jumps to kernel-mode code (ring flips to 0, dot recolors) →
  kernel box does its thing → `IRET` traces back → ring flips back to 3. This is the single
  most important diagram in the chapter; give it the most scroll runway.

### 1.6 Libc wraps the interrupt — `[ ]` — short
- **Caption:** "You call `exit()`. Libc hides the interrupt underneath."
- **Animation:** A friendly `exit(1)` call box shrinks/drops into a libc "box," which then
  emits the same INT/IRET trace from 1.5 in miniature underneath — showing it's the same
  mechanism, just wrapped.

---

## Chapter 2 — Slice Dat Time (`02-slice-dat-time`)

### 2.1 Hardware interrupt (timer) — `[ ]` — short
- **Caption:** "A timer chip interrupts you, whether you like it or not."
- **Animation:** Program code marching (from 1.2's motif) gets struck by a lightning bolt from
  a small clock icon; execution jumps to kernel code, recoloring rings like scene 1.4.

### 2.2 Round-robin scheduling — `[ ]` — long
- **Caption:** "Each process gets a timeslice, then it's the next one's turn."
- **Animation:** 3 horizontal lanes (Process 1/2/3), a playhead sweeps left to right giving
  each lane a highlighted "running" block in turn, with a thin "kernel scheduler" tick between
  each. Label the repeating cycle width as "target latency." Scrub controls playhead position
  directly — this is a Gantt chart brought to life.

### 2.3 Cooperative vs preemptive (history beat) — `[ ]` — short
- **Caption:** "Old OSes waited for programs to yield. Modern ones don't ask."
- **Animation:** Split screen: left lane (cooperative) shows one block running forever until it
  voluntarily "hands off" (only sometimes — show one that never does, freezing the lane red).
  Right lane (preemptive, reuse 2.2 motif) always cuts blocks off on schedule regardless.

---

## Chapter 3 — How to Run a Program (`03-how-to-run-a-program`)

### 3.1 execve flow (user space → kernel space) — `[ ]` — medium
- **Caption:** "`execve` hands your program to the kernel to load and run."
- **Animation:** Flowchart nodes: terminal `./file.bin` → `execve(...)` → SYSCALL trace (reuse
  1.5 motif, small) → "load a binary" → "try a binfmt" loop node. Scroll advances a highlight
  token through the flowchart nodes in sequence.

### 3.2 The 256-byte buffer — `[ ]` — short
- **Caption:** "The kernel peeks at just the first 256 bytes to identify the file."
- **Animation:** A file represented as a long strip of bytes; first 256 highlighted and copied
  into a small "buf" box, the rest fades translucent.

### 3.3 Binfmt handler chain — `[ ]` — medium
- **Caption:** "It tries each format handler until one understands the file."
- **Animation:** A vertical list of handler chips (script, elf, flat, misc...); a token drops
  down trying each one, bouncing off (rejected) until it lands on the right one (accepted,
  glows green). Show one recursive case: script → script → elf nesting as a small inset.

### 3.4 Shebang truncation bug — `[ ]` — short
- **Caption:** "Shebangs come from that same 256-byte buffer — longer paths get cut off."
- **Animation:** A shebang line `#!/very/long/path...` extends past a hard 256-byte marker; the
  overflow text visibly clips/disappears at the line.

### 3.5 argv rewriting for interpreters — `[ ]` — short
- **Caption:** "The kernel rewrites your arguments to call the real interpreter first."
- **Animation:** `argv` boxes `[./script, B, C]` reorder/insert into
  `[/usr/bin/node, --flag, ./script, B, C]` via sliding tiles.

### 3.6 Shell retry-as-script fallback — `[ ]` — short
- **Caption:** "If exec fails outright, your shell quietly retries it as a script."
- **Animation:** `execve` node flashes red (ENOEXEC) → arrow loops back into the shell →
  shell re-wraps the call and fires again, succeeding (green).

---

## Chapter 4 — Becoming an Elf-Lord (`04-becoming-an-elf-lord`)

### 4.1 ELF file overview — `[ ]` — medium
- **Caption:** "Every ELF file has 4 parts: header, two tables, and the data they point to."
- **Animation:** A long horizontal bar splits into 4 labeled blocks (Header / PHT / SHT / Data)
  one at a time as you scroll; thin arrows grow from PHT and SHT down into the Data block.

### 4.2 Program header table entry types — `[ ]` — short
- **Caption:** "PT_LOAD says 'put this in memory.' Others describe or link it."
- **Animation:** 4 chip cards (PT_LOAD, PT_NOTE, PT_DYNAMIC, PT_INTERP) flip in one at a time
  with a 2-3 word description each (already covered by caption budget — keep card text ≤3 words).

### 4.3 Section header table = map — `[ ]` — short
- **Caption:** "The section table is a map of what's what, mainly for debuggers."
- **Animation:** The Data block from 4.1 gets carved into labeled regions (.text/.data/.bss/
  .rodata) with a small magnifying-glass icon sweeping across, "revealing" each label.

### 4.4 Static vs dynamic linking — `[ ]` — medium
- **Caption:** "Static linking copies the library in. Dynamic linking just points to it."
- **Animation:** Split screen. Left: a `foo` code block gets physically copy-pasted into two
  separate program boxes. Right: two program boxes each just hold a name-tag "foo," with arrows
  pointing out to one shared `foo` box sitting outside both.

### 4.5 Execution / entry point handoff — `[ ]` — medium
- **Caption:** "Segments load into memory, then the CPU jumps straight to the entry point."
- **Animation:** PT_LOAD blocks from 4.1 fly into a "RAM" strip at specific addresses; then the
  instruction-pointer arrow (from 1.2) appears and jumps directly to the entry point address —
  visually reconnecting to the fetch-execute loop concept.

---

## Chapter 5 — The Translator in Your Computer (`05-the-translator-in-your-computer`)

### 5.1 Virtual → physical translation (MMU) — `[ ]` — medium
- **Caption:** "Every memory address you use is fake — the MMU translates it for real."
- **Animation:** CPU box asks a "translator" box for address `0xfff...`; translator flips
  through a little dictionary/book and returns a different address `0x53a...`; CPU then reads
  from a RAM strip at that translated spot.

### 5.2 Same virtual address, two processes — `[ ]` — short
- **Caption:** "Two programs can both use address 0x400000 — and never collide."
- **Animation:** Two process boxes both point to the same labeled address; the translator
  redirects each one to a different physical location on the same RAM strip below.

### 5.3 Higher-half kernel split — `[ ]` — short
- **Caption:** "The top half of memory is always the kernel's, off-limits to programs."
- **Animation:** A single memory strip splits at its midpoint into "user space" / "kernel
  space" bands; user-mode dot (ring 3 motif) tries to cross into kernel band and is blocked.

### 5.4 Hierarchical page table walk — `[ ]` — long
- **Caption:** "One address is split into 4 lookups, cutting through a tree of tables."
- **Animation:** The most involved diagram in the site. An address bar splits into 4 labeled
  bit-groups; a token walks down 4 levels of page tables (each level: jump to entry using the
  next bit-group, follow pointer to next table), lands on a 4 KiB page in RAM at the end. Long
  scroll pin, one level revealed per ~25% of scroll.

### 5.5 Page fault / demand paging — [ ] — medium
- **Caption:** "Missing memory? The CPU pauses, the kernel loads it, then retries."
- **Animation:** 3-panel comic motif: CPU asks translator for a page → translator shrugs,
  fires a "page fault" bolt → kernel box loads data into RAM → CPU retries the same read,
  succeeds. Reuses the interrupt trace motif from 1.5/2.1.

---

## Chapter 6 — Let's Talk About Forks and Cows (`06-lets-talk-about-forks-and-cows`)

### 6.1 fork() clones a process — `[ ]` — medium
- **Caption:** "`fork` clones you. The copy gets PID 0-ish; you get its real PID."
- **Animation:** One process box splits into two identical boxes (parent + child) with a
  cloning/mitosis-style animation; a small returned-value tag appears on each ("child PID" on
  parent, "0" on child).

### 6.2 Fork-exec pattern — `[ ]` — short
- **Caption:** "Fork, then exec in the child — that's how new programs launch."
- **Animation:** Chains scene 6.1's child box directly into 3.1's execve flow-token, replacing
  the child box's contents with a new program.

### 6.3 Copy-on-write (COW) pages — `[ ]` — long
- **Caption:** "Both copies share memory — until one writes, then it's actually copied."
- **Animation:** Parent + child both point to the same RAM block (read-only, padlock icon). One
  writes → padlock triggers a segfault spark → kernel duplicates just that one page → write
  succeeds on the new copy. Directly reuses the page-fault motif from 5.5.

### 6.4 The init process tree — `[ ]` — medium
- **Caption:** "Every process traces back to one ancestor: init, PID 1."
- **Animation:** A tree grows from a single "init" root node, branching recursively into child
  nodes (reuse fork motif per branch). Scroll builds the tree top-down.

### 6.5 Boot sequence — `[ ]` — medium
- **Caption:** "Firmware finds a bootloader, which finds a kernel, which starts init."
- **Animation:** 4-step horizontal pipeline (Firmware → Bootloader → Kernel → Init), a token
  travels left to right, each stage box "activating" (lighting up) as the token passes through.

### 6.6 Recap / highlight reel — `[ ]` — long
- **Caption:** "fork → exec → ELF loads → paging isolates it. That's how programs run."
- **Animation:** Miniature replays of 6.1 (fork), 3.1 (execve), 4.5 (ELF load), 5.1 (paging) as
  4 small looping thumbnails arranged in a row/grid, tying the whole article together visually.

---

## Chapter 7 — Epilogue (`07-epilogue`)

### 7.1 The end card — `[ ]` — short
- **Caption:** "That's the whole story — from power-on to your cursor blinking."
- **Animation:** Simple, quiet outro: CPU icon with a content/pleased expression, gentle fade,
  chapter roadmap from 0.1 reappears fully lit up (all 8 icons now "complete").

### 7.2 Bonus: stack vs heap — `[ ]` — medium
- **Caption:** "The stack is paged in lazily. The heap is just libc bookkeeping on `mmap`."
- **Animation:** Two vertical columns: Stack (top of memory, grows downward, boxes fade in
  as needed — demand paging motif from 5.5) vs Heap (grows upward from a libc-managed box,
  `malloc`/`free` tiles being placed/removed).

### 7.3 Credits — `[ ]` — short
- **Caption:** "Rebuilt from Lexi Mattick's 'Putting the You in CPU' (Hack Club, 2023)."
- **Animation:** Static-ish credits screen, minimal motion (fade-in list). Link to original.

---

## Build Order

Chapters are built in order 0 → 7 since later diagrams intentionally reuse motifs established
earlier (ring flip, interrupt trace, fetch-execute arrow, page-fault comic). Within a chapter,
scenes are built in listed order. Update the `[ ]` → `[x]` checkboxes above as each scene ships,
and log progress in `devxdocs/agentlog.md`.
