import type { RefObject } from "react";
import { gsap, useGSAP } from "@/lib/motion/gsap";
import { useScrollTimeline } from "@/lib/motion/useScrollTimeline";
import { HEAP_TILE_COUNT, STACK_FRAME_COUNT } from "./Diagram";

const STACK_GROWTH_STEPS = STACK_FRAME_COUNT - 1;
const HEAP_GROWTH_STEPS = HEAP_TILE_COUNT - 1;

/**
 * Two reveals sharing one scrubbed timeline. First the stack's frames grow
 * downward one at a time (frame 0 already sits at the top) — the call
 * stack pushing deeper. Then the heap's tiles grow upward one at a time
 * (tile 0 already sits on the libc baseline) — the allocator handing out
 * more of the arena it already owns. The last tile is the one time that
 * arena isn't big enough, so a brief "mmap/sbrk" arrow flashes above it —
 * the one moment the allocator has to ask the kernel for more memory.
 */
export function useStackVsHeapAnimation(scope: RefObject<HTMLElement | null>) {
  useGSAP(
    () => {
      for (let index = 1; index <= STACK_GROWTH_STEPS; index++) {
        gsap.set(`[data-role="stack-frame"][data-index="${index}"]`, { opacity: 0, scaleY: 0 });
      }
      for (let index = 1; index <= HEAP_GROWTH_STEPS; index++) {
        gsap.set(`[data-role="heap-tile"][data-index="${index}"]`, { opacity: 0, scaleY: 0 });
      }
      gsap.set('[data-role="heap-syscall-arrow"]', { opacity: 0 });
    },
    { scope },
  );

  useScrollTimeline(
    scope,
    (tl) => {
      tl.addLabel("stackStart");

      for (let index = 1; index <= STACK_GROWTH_STEPS; index++) {
        tl.to(`[data-role="stack-frame"][data-index="${index}"]`, {
          opacity: 1,
          scaleY: 1,
          duration: 0.5,
          ease: "power2.out",
        }).addLabel(`stackFrame${index}`);
      }

      tl.addLabel("heapStart");

      for (let index = 1; index <= HEAP_GROWTH_STEPS; index++) {
        tl.to(`[data-role="heap-tile"][data-index="${index}"]`, {
          opacity: 1,
          scaleY: 1,
          duration: 0.5,
          ease: "power2.out",
        }).addLabel(`heapTile${index}`);
      }

      tl.to(
        '[data-role="heap-syscall-arrow"]',
        { opacity: 1, duration: 0.25 },
        `heapTile${HEAP_GROWTH_STEPS}`,
      )
        .to(
          '[data-role="heap-syscall-arrow"]',
          { opacity: 0, duration: 0.35 },
          `heapTile${HEAP_GROWTH_STEPS}+=0.45`,
        )
        .addLabel("done");
    },
    { runway: "medium" },
  );
}
