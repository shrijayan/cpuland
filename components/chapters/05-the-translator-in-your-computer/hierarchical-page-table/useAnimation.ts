import type { RefObject } from "react";
import { gsap, useGSAP } from "@/lib/motion/gsap";
import { useScrollTimeline } from "@/lib/motion/useScrollTimeline";
import { themeColor } from "@/lib/motion/theme";
import { LEVEL_COUNT, LEVEL_CONNECTOR_COUNT } from "./Diagram";

const BIT_GROUP_HIGHLIGHT_DURATION = 0.25;
const TABLE_LEVEL_REVEAL_DURATION = 0.5;
const CONNECTOR_DRAW_DURATION = 0.4;
const RAM_PAGE_POP_DURATION = 0.5;

/**
 * Walks the 4-level tree exactly one level at a time, top (Level 4) to
 * bottom (Level 1): the bit group that indexes this level lights up
 * signal-colored first, then the level's own box fades/scales in right
 * after it, then (for every level but the last) a straight connector
 * line draws itself — DrawSVG — down to where the next level will
 * appear. Each level gets its own `addLabel` so the sequence reads as 4
 * distinct steps. Once Level 1 is in, the 4 KiB RAM page just pops into
 * place at the bottom — the one real page the whole tree was built to
 * find, versus the (potentially huge) empty space it never had to
 * allocate a single table for.
 */
export function useHierarchicalPageTableAnimation(scope: RefObject<HTMLElement | null>) {
  useGSAP(
    () => {
      gsap.set('[data-role="bit-group"] rect', { stroke: themeColor("--color-ink-faint") });
      gsap.set('[data-role="table-level"]', {
        opacity: 0,
        scale: 0.85,
        transformOrigin: "50% 50%",
      });
      gsap.set('[data-role="level-connector"]', { drawSVG: "0%" });
      gsap.set('[data-role="ram-page"]', {
        opacity: 0,
        scale: 0.85,
        transformOrigin: "50% 50%",
      });
    },
    { scope },
  );

  useScrollTimeline(
    scope,
    (tl) => {
      const signal = themeColor("--color-signal");

      for (let level = 0; level < LEVEL_COUNT; level++) {
        tl.to(`[data-role="bit-group"][data-index="${level}"] rect`, {
          stroke: signal,
          duration: BIT_GROUP_HIGHLIGHT_DURATION,
        }).to(`[data-role="table-level"][data-index="${level}"]`, {
          opacity: 1,
          scale: 1,
          duration: TABLE_LEVEL_REVEAL_DURATION,
          ease: "back.out(1.7)",
        });

        if (level < LEVEL_CONNECTOR_COUNT) {
          tl.to(`[data-role="level-connector"][data-index="${level}"]`, {
            drawSVG: "100%",
            duration: CONNECTOR_DRAW_DURATION,
            ease: "none",
          });
        }

        tl.addLabel(`level${level}`);
      }

      tl.to('[data-role="ram-page"]', {
        opacity: 1,
        scale: 1,
        duration: RAM_PAGE_POP_DURATION,
        ease: "back.out(1.7)",
      });
    },
    { runway: "long" },
  );
}
