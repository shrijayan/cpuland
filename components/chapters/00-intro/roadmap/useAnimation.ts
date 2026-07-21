"use client";

import type { RefObject } from "react";
import { gsap, useGSAP } from "@/lib/motion/gsap";
import { useScrollTimeline } from "@/lib/motion/useScrollTimeline";

/**
 * Draws the roadmap spine, pops in each chapter node in sequence, then
 * settles with chapter 1's node pulsing (it's what plays next).
 */
export function useRoadmapAnimation(scope: RefObject<HTMLElement | null>) {
  useGSAP(
    () => {
      gsap.set('[data-role="node"]', { opacity: 0, y: 14 });
      gsap.set('[data-role="spine"]', { drawSVG: "0%" });
    },
    { scope },
  );

  useScrollTimeline(
    scope,
    (tl) => {
      tl.to('[data-role="spine"]', { drawSVG: "100%", duration: 1.2, ease: "none" })
        .to(
          '[data-role="node"]',
          { opacity: 1, y: 0, stagger: 0.12, duration: 0.5, ease: "power2.out" },
          "<0.1",
        )
        .to(
          '[data-role="node"][data-index="1"] circle',
          {
            scale: 1.18,
            transformOrigin: "50% 50%",
            duration: 0.4,
            ease: "back.out(2)",
          },
          ">-0.15",
        );
    },
    { runway: "medium" },
  );
}
