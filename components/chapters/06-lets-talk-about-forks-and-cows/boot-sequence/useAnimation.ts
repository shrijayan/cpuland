import type { RefObject } from "react";
import { gsap, useGSAP } from "@/lib/motion/gsap";
import { useScrollTimeline } from "@/lib/motion/useScrollTimeline";
import { themeColor } from "@/lib/motion/theme";
import { EASE } from "@/lib/motion/constants";
import { BOOT_STAGES, BOOT_STAGE_SPACING } from "./Diagram";

const HOP_COUNT = BOOT_STAGES.length - 1;
const HOP_DURATION = 0.6;
const HIGHLIGHT_DURATION = 0.25;
const STAGE_POP_SCALE = 1.1;

function stageRectSelector(index: number) {
  return `[data-role="boot-stage"][data-index="${index}"] rect`;
}

function arrowSelector(index: number) {
  return `[data-role="boot-arrow"][data-index="${index}"]`;
}

/**
 * The baton starts resting over "Firmware" and hops stage-to-stage exactly
 * like MemoryTape's instruction pointer (fetch-execute-cycle, Ch.1): one
 * GSAP `x` tween per hop, stepping BOOT_STAGE_SPACING at a time. Every hop
 * is labeled `arrive{n}` at the instant it lands, so the stage it just left
 * dims (and the arrow it's crossing lights up) exactly when it departs,
 * while the stage it lands on brightens (and that arrow dims back) exactly
 * on the `arrive` label — brighten/dim always reads as caused by the
 * baton's own arrival or departure, never a separate timer.
 */
export function useBootSequenceAnimation(scope: RefObject<HTMLElement | null>) {
  useGSAP(
    () => {
      gsap.set('[data-role="baton"]', { x: 0 });
      gsap.set('[data-role="boot-stage"] rect', { scale: 1, transformOrigin: "50% 50%" });
    },
    { scope },
  );

  useScrollTimeline(
    scope,
    (tl) => {
      const signal = themeColor("--color-signal");
      const idle = themeColor("--color-ink-faint");

      // Stage 0 ("Firmware") starts already carrying the baton, so the very
      // first beat is it lighting up — nothing has departed yet.
      tl.to(stageRectSelector(0), {
        stroke: signal,
        scale: STAGE_POP_SCALE,
        duration: HIGHLIGHT_DURATION,
      }).addLabel("arrive0");

      for (let i = 0; i < HOP_COUNT; i++) {
        const arriveLabel = `arrive${i + 1}`;

        tl.to('[data-role="baton"]', {
          x: BOOT_STAGE_SPACING * (i + 1),
          duration: HOP_DURATION,
          ease: EASE.standard,
        })
          .to(arrowSelector(i), { stroke: signal, duration: HIGHLIGHT_DURATION }, "<")
          .to(stageRectSelector(i), { stroke: idle, scale: 1, duration: HIGHLIGHT_DURATION }, "<")
          .addLabel(arriveLabel)
          .to(
            stageRectSelector(i + 1),
            { stroke: signal, scale: STAGE_POP_SCALE, duration: HIGHLIGHT_DURATION },
            arriveLabel,
          )
          .to(arrowSelector(i), { stroke: idle, duration: HIGHLIGHT_DURATION }, arriveLabel);
      }
    },
    { runway: "medium" },
  );
}
