import type { RefObject } from "react";
import { gsap, useGSAP } from "@/lib/motion/gsap";
import { useScrollTimeline } from "@/lib/motion/useScrollTimeline";
import { EASE } from "@/lib/motion/constants";

/**
 * `child-box` travels 130% of its own width once it splits off — 100%
 * clears the parent box it started stacked on top of, the extra 30% opens
 * a breathing-room gap between the two. Percent-based (not a fixed pixel
 * gap) so the split scales with box size across breakpoints.
 */
const CHILD_OFFSET = { xPercent: 130 };

const SPLIT_DURATION = 0.9;
const BADGE_POP_DURATION = 0.4;

/**
 * `child-box` starts stacked exactly on top of `process-box` (same grid
 * cell in the Diagram) and invisible. Scroll first slides the whole
 * `child-column` (box + badge together, so they move the same actual
 * distance regardless of their different widths) out to the right while
 * the box fades in — one process splitting into two — then pops each
 * box's `fork()` return value in underneath it: the parent sees the new
 * child's PID, the child sees 0.
 */
export function useForkCloneAnimation(scope: RefObject<HTMLElement | null>) {
  useGSAP(
    () => {
      gsap.set('[data-role="child-column"]', { xPercent: 0 });
      gsap.set('[data-role="child-box"]', { opacity: 0 });
      gsap.set('[data-role="parent-badge"], [data-role="child-badge"]', {
        opacity: 0,
        scale: 0.6,
        transformOrigin: "50% 50%",
      });
    },
    { scope },
  );

  useScrollTimeline(
    scope,
    (tl) => {
      tl.to('[data-role="child-column"]', {
        ...CHILD_OFFSET,
        duration: SPLIT_DURATION,
        ease: EASE.enter,
      })
        .to('[data-role="child-box"]', { opacity: 1, duration: SPLIT_DURATION, ease: EASE.enter }, "<")
        .addLabel("split")
        .to(
          '[data-role="parent-badge"]',
          { opacity: 1, scale: 1, duration: BADGE_POP_DURATION, ease: EASE.snap },
          "split+=0.1",
        )
        .to(
          '[data-role="child-badge"]',
          { opacity: 1, scale: 1, duration: BADGE_POP_DURATION, ease: EASE.snap },
          "<0.15",
        );
    },
    { runway: "medium" },
  );
}
