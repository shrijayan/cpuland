import type { RefObject } from "react";
import { gsap, useGSAP } from "@/lib/motion/gsap";
import { useScrollTimeline } from "@/lib/motion/useScrollTimeline";

/**
 * Each header-card starts flipped away and invisible, then flips/pops into
 * place one at a time, left-to-right, as the program header table "expands"
 * to reveal its four entry types.
 */
export function useProgramHeaderTypesAnimation(scope: RefObject<HTMLElement | null>) {
  useGSAP(
    () => {
      gsap.set('[data-role="header-card"]', {
        opacity: 0,
        rotateX: -90,
        transformOrigin: "50% 50%",
      });
    },
    { scope },
  );

  useScrollTimeline(
    scope,
    (tl) => {
      tl.to('[data-role="header-card"]', {
        opacity: 1,
        rotateX: 0,
        stagger: 0.2,
        duration: 0.6,
      });
    },
    { runway: "short" },
  );
}
