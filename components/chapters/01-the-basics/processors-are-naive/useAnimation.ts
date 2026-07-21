import type { RefObject } from "react";
import { gsap, useGSAP } from "@/lib/motion/gsap";
import { useScrollTimeline } from "@/lib/motion/useScrollTimeline";
import { MEMORY_TAPE_STEP } from "@/components/shared/diagrams/MemoryTape";
import { NAIVE_BYTE_COUNT } from "./Diagram";

const STEPS = NAIVE_BYTE_COUNT - 1;

/**
 * The pointer just keeps marching in a straight line — no branching, no
 * awareness of anything else — while a ghostly "process" label flickers in
 * and out above it, to show that a "process" is an illusion layered on top,
 * not something the CPU itself is tracking.
 */
export function useProcessorsAreNaiveAnimation(scope: RefObject<HTMLElement | null>) {
  useGSAP(
    () => {
      gsap.set('[data-role="process-ghost"]', { opacity: 0 });
    },
    { scope },
  );

  useScrollTimeline(
    scope,
    (tl) => {
      tl.to('[data-role="pointer"]', { x: STEPS * MEMORY_TAPE_STEP, duration: 3, ease: "none" })
        .to('[data-role="process-ghost"]', { opacity: 0.7, duration: 0.4 }, 0.3)
        .to('[data-role="process-ghost"]', { opacity: 0, duration: 0.4 }, 1.0)
        .to('[data-role="process-ghost"]', { opacity: 0.7, duration: 0.4 }, 1.8)
        .to('[data-role="process-ghost"]', { opacity: 0, duration: 0.4 }, 2.5);
    },
    { runway: "medium" },
  );
}
