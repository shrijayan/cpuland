import type { RefObject } from "react";
import { gsap, useGSAP } from "@/lib/motion/gsap";
import { useScrollTimeline } from "@/lib/motion/useScrollTimeline";
import { themeColor } from "@/lib/motion/theme";
import { MEMORY_TAPE_STEP } from "@/components/shared/diagrams/MemoryTape";
import { FETCH_EXECUTE_BYTE_COUNT } from "./Diagram";

const STEPS = FETCH_EXECUTE_BYTE_COUNT - 1;

/**
 * The pointer marches box-to-box; each arrival highlights the current byte
 * (fetch) then hands off to the next (execute). Three caption beats —
 * fetch / execute / repeat — crossfade in step with the very first and very
 * last hop so the words land exactly when the pointer moves.
 */
export function useFetchExecuteAnimation(scope: RefObject<HTMLElement | null>) {
  useGSAP(
    () => {
      gsap.set('[data-beat="execute"], [data-beat="repeat"]', { opacity: 0 });
    },
    { scope },
  );

  useScrollTimeline(
    scope,
    (tl) => {
      const signal = themeColor("--color-signal");
      const idle = themeColor("--color-ink-faint");

      tl.to('[data-role="byte"][data-index="0"] rect', { stroke: signal, duration: 0.3 }).addLabel(
        "step0",
      );

      for (let i = 0; i < STEPS; i++) {
        tl.to('[data-role="pointer"]', {
          x: (i + 1) * MEMORY_TAPE_STEP,
          duration: 0.6,
          ease: "power1.inOut",
        })
          .to(`[data-role="byte"][data-index="${i}"] rect`, { stroke: idle, duration: 0.2 }, "<")
          .to(
            `[data-role="byte"][data-index="${i + 1}"] rect`,
            { stroke: signal, duration: 0.2 },
            "<",
          )
          .addLabel(`step${i + 1}`);
      }

      tl.to('[data-beat="fetch"]', { opacity: 0, duration: 0.3 }, "step0")
        .to('[data-beat="execute"]', { opacity: 1, duration: 0.3 }, "step0")
        .to('[data-beat="execute"]', { opacity: 0, duration: 0.3 }, `step${STEPS}`)
        .to('[data-beat="repeat"]', { opacity: 1, duration: 0.3 }, `step${STEPS}`);
    },
    { runway: "long" },
  );
}
