import type { RefObject } from "react";
import { gsap, useGSAP } from "@/lib/motion/gsap";
import { useScrollTimeline } from "@/lib/motion/useScrollTimeline";

/**
 * The three queued programs bounce impatiently in place — a short vertical
 * yoyo, staggered per box so they don't move in lockstep — while the CPU
 * chip sits still. Sets up the problem that hardware-interrupt-timer and
 * round-robin-scheduling go on to solve.
 */
export function useSingleCoreProblemAnimation(scope: RefObject<HTMLElement | null>) {
  useGSAP(
    () => {
      gsap.set('[data-role="queued-program"]', { y: 0 });
    },
    { scope },
  );

  useScrollTimeline(
    scope,
    (tl) => {
      tl.to('[data-role="queued-program"]', {
        y: -10,
        duration: 0.18,
        repeat: 5,
        yoyo: true,
        stagger: 0.12,
      });
    },
    { runway: "short" },
  );
}
