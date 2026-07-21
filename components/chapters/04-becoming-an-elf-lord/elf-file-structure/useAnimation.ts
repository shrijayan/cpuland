import type { RefObject } from "react";
import { gsap, useGSAP } from "@/lib/motion/gsap";
import { useScrollTimeline } from "@/lib/motion/useScrollTimeline";
import { ELF_BLOCK_COUNT, POINTER_ARROW_COUNT } from "./Diagram";

/**
 * The 4 structural blocks pop in left-to-right one at a time — each step
 * gets its own label, same turn-by-turn build as round-robin-scheduling —
 * so the row assembles as ELF Header, then Program Header Table, then
 * Section Header Table, then Data. Only once every block exists do the two
 * pointer arrows draw themselves (DrawSVG) down out of PHT and SHT into
 * the Data block: the "exploded view" of what those header tables
 * actually describe.
 */
export function useElfFileStructureAnimation(scope: RefObject<HTMLElement | null>) {
  useGSAP(
    () => {
      gsap.set('[data-role="elf-block"]', {
        opacity: 0,
        scale: 0.85,
        transformOrigin: "50% 50%",
      });
      gsap.set('[data-role="pointer-arrow"]', { drawSVG: "0%" });
    },
    { scope },
  );

  useScrollTimeline(
    scope,
    (tl) => {
      for (let i = 0; i < ELF_BLOCK_COUNT; i++) {
        tl.to(`[data-role="elf-block"][data-index="${i}"]`, {
          opacity: 1,
          scale: 1,
          duration: 0.5,
          ease: "back.out(1.7)",
        }).addLabel(`block${i}`);
      }

      tl.addLabel("assembled");

      for (let i = 0; i < POINTER_ARROW_COUNT; i++) {
        tl.to(`[data-role="pointer-arrow"][data-index="${i}"]`, {
          drawSVG: "100%",
          duration: 0.6,
          ease: "none",
        });
      }
    },
    { runway: "long" },
  );
}
