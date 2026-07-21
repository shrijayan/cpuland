"use client";

import type { RefObject } from "react";
import { gsap, useGSAP } from "@/lib/motion/gsap";
import { useScrollTimeline } from "@/lib/motion/useScrollTimeline";
import { EASE } from "@/lib/motion/constants";

/** Scale the chip shrinks to as it "pulls back" — mirrors the hook's zoom-in start scale. */
const CHIP_EXIT_SCALE = 0.55;

/**
 * The visual reverse of Ch.0's hook: the CPU chip that has anchored the
 * whole story shrinks and fades out, as if the camera is pulling back out
 * through the motherboard and then the screen. Once it's gone, the credits
 * fade in one line after another to close the story out.
 */
export function useClosingAnimation(scope: RefObject<HTMLElement | null>) {
  useGSAP(
    () => {
      gsap.set('[data-role="chip"]', { opacity: 1, scale: 1, transformOrigin: "50% 50%" });
      gsap.set('[data-role="credits-line"]', { opacity: 0 });
    },
    { scope },
  );

  useScrollTimeline(
    scope,
    (tl) => {
      tl.to('[data-role="chip"]', {
        opacity: 0,
        scale: CHIP_EXIT_SCALE,
        duration: 1.4,
        ease: EASE.exit,
      }).to(
        '[data-role="credits-line"]',
        { opacity: 1, duration: 0.6, stagger: 0.4 },
        ">0.2",
      );
    },
    { runway: "medium" },
  );
}
