import type { RefObject } from "react";
import { gsap, useGSAP } from "@/lib/motion/gsap";
import { useScrollTimeline } from "@/lib/motion/useScrollTimeline";
import { themeColor } from "@/lib/motion/theme";
import { MEMORY_TAPE_STEP } from "@/components/shared/diagrams/MemoryTape";
import { ENTRY_POINT_BYTE } from "./Diagram";

/** How far above its landing byte each segment chip starts before falling into place. */
const CHIP_DROP_DISTANCE = -32;

/**
 * Each `.text` / `.data` / `.bss` chip free-falls (fading in as it goes)
 * onto its own byte cell, one after another. Only once all three have
 * landed does MemoryTape's pointer — hidden until now, since nothing is
 * executing yet — fade in and slide onto the `.text` cell (the entry
 * point), which then pulses solid signal-color to show the fetch-execute
 * loop (Ch.1) picking back up right where a freshly loaded process needs
 * it to.
 */
export function useElfExecutionAnimation(scope: RefObject<HTMLElement | null>) {
  useGSAP(
    () => {
      gsap.set('[data-role="segment-chip"]', { y: CHIP_DROP_DISTANCE, opacity: 0 });
      gsap.set('[data-role="pointer"]', { opacity: 0 });
      gsap.set(`[data-role="byte"][data-index="${ENTRY_POINT_BYTE}"] rect`, {
        transformOrigin: "50% 50%",
      });
    },
    { scope },
  );

  useScrollTimeline(
    scope,
    (tl) => {
      const signal = themeColor("--color-signal");

      tl.to('[data-role="segment-chip"]', {
        y: 0,
        opacity: 1,
        duration: 0.5,
        stagger: 0.25,
        ease: "power1.out",
      })
        .to('[data-role="pointer"]', {
          x: ENTRY_POINT_BYTE * MEMORY_TAPE_STEP,
          opacity: 1,
          duration: 0.6,
          ease: "power1.inOut",
        })
        .to(`[data-role="byte"][data-index="${ENTRY_POINT_BYTE}"] rect`, {
          scale: 1.2,
          stroke: signal,
          fill: signal,
          duration: 0.25,
          ease: "power1.out",
        })
        .to(`[data-role="byte"][data-index="${ENTRY_POINT_BYTE}"] rect`, {
          scale: 1,
          duration: 0.25,
          ease: "power1.inOut",
        });
    },
    { runway: "medium" },
  );
}
