import type { RefObject } from "react";
import { gsap, useGSAP } from "@/lib/motion/gsap";
import { useScrollTimeline } from "@/lib/motion/useScrollTimeline";
import { themeColor } from "@/lib/motion/theme";
import { LOOP_NODES } from "./Diagram";

const LOOP_DRAW_DURATION = 4;
const NODE_FLASH_DURATION = 0.3;

/**
 * `loop-path` draws itself once fully around the ring while each node
 * flashes signal-colored right as the draw reaches its position on the
 * circle. One label per node, spaced evenly across the draw tween's
 * duration, in the same clockwise order the path itself sweeps through
 * them (set timer -> run program -> timer fires -> switch).
 */
export function usePreemptionLoopAnimation(scope: RefObject<HTMLElement | null>) {
  useGSAP(
    () => {
      gsap.set('[data-role="loop-path"]', { drawSVG: "0%" });
      gsap.set('[data-role="loop-node"] circle', {
        fill: themeColor("--color-surface-raised"),
      });
    },
    { scope },
  );

  useScrollTimeline(
    scope,
    (tl) => {
      const signal = themeColor("--color-signal");

      tl.to('[data-role="loop-path"]', {
        drawSVG: "100%",
        duration: LOOP_DRAW_DURATION,
        ease: "none",
      });

      LOOP_NODES.forEach((_, index) => {
        const label = `node${index}`;
        const time = (index * LOOP_DRAW_DURATION) / LOOP_NODES.length;

        tl.addLabel(label, time).to(
          `[data-role="loop-node"][data-index="${index}"] circle`,
          { fill: signal, duration: NODE_FLASH_DURATION, yoyo: true, repeat: 1 },
          label,
        );
      });
    },
    { runway: "medium" },
  );
}
