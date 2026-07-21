import type { RefObject } from "react";
import { gsap, useGSAP } from "@/lib/motion/gsap";
import { useScrollTimeline } from "@/lib/motion/useScrollTimeline";
import { themeColor } from "@/lib/motion/theme";
import { MAP_TARGET_CELL_INDEX, PROCESS_COUNT } from "./Diagram";

const BOX_INTRO_DURATION = 0.6;
const ARROW_DRAW_DURATION = 0.7;
const CELL_HIGHLIGHT_DURATION = 0.3;

/**
 * Both process boxes pop in together first — same size, same "0x400000"
 * label, nothing to tell them apart yet ("same-address" label). Then, one
 * process at a time (the same turn-by-turn, labeled-sequencing shape as
 * fetch-execute-cycle's pointer moves), its map-arrow draws itself
 * (DrawSVG) down to the one physical-memory cell it's actually backed by,
 * which lights up signal-colored the instant the arrow reaches it. By the
 * end both arrows are visible, landing on two different cells — the same
 * address, resolved two different ways.
 */
export function useProcessIsolationMappingAnimation(scope: RefObject<HTMLElement | null>) {
  useGSAP(
    () => {
      gsap.set('[data-role="process-box"]', {
        opacity: 0,
        scale: 0.85,
        transformOrigin: "50% 50%",
      });
      gsap.set('[data-role="map-arrow"]', { drawSVG: "0%" });
    },
    { scope },
  );

  useScrollTimeline(
    scope,
    (tl) => {
      const signal = themeColor("--color-signal");

      tl.to('[data-role="process-box"]', {
        opacity: 1,
        scale: 1,
        duration: BOX_INTRO_DURATION,
        ease: "back.out(1.7)",
      }).addLabel("same-address");

      for (let i = 0; i < PROCESS_COUNT; i++) {
        const targetCell = MAP_TARGET_CELL_INDEX[i];

        tl.to(`[data-role="map-arrow"][data-index="${i}"]`, {
          drawSVG: "100%",
          duration: ARROW_DRAW_DURATION,
          ease: "none",
        })
          .to(`[data-role="strip-cell"][data-index="${targetCell}"] rect`, {
            stroke: signal,
            duration: CELL_HIGHLIGHT_DURATION,
          })
          .addLabel(`mapped${i}`);
      }
    },
    { runway: "medium" },
  );
}
