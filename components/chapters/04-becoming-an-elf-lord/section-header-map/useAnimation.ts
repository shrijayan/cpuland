import type { RefObject } from "react";
import { gsap, useGSAP } from "@/lib/motion/gsap";
import { useScrollTimeline } from "@/lib/motion/useScrollTimeline";
import { EASE } from "@/lib/motion/constants";

/**
 * The map itself unrolls first (fade + scale up), then each island label
 * pops in one at a time — like a highlight panning across the map to find
 * them in turn. The compass rose (nested inside the map so it appears with
 * it) gets one final little rotation as a flourish once every island has
 * been found.
 */
export function useSectionHeaderMapAnimation(scope: RefObject<HTMLElement | null>) {
  useGSAP(
    () => {
      gsap.set('[data-role="map-bg"]', { opacity: 0, scale: 0.85 });
      gsap.set('[data-role="map-label"]', { opacity: 0, scale: 0.8 });
    },
    { scope },
  );

  useScrollTimeline(
    scope,
    (tl) => {
      tl.to('[data-role="map-bg"]', {
        opacity: 1,
        scale: 1,
        duration: 0.4,
        ease: EASE.enter,
      })
        .to(
          '[data-role="map-label"]',
          {
            opacity: 1,
            scale: 1,
            duration: 0.3,
            stagger: 0.22,
            ease: EASE.enter,
          },
          ">0.1",
        )
        .to(
          '[data-role="compass"]',
          {
            rotate: 15,
            duration: 0.4,
            ease: EASE.snap,
          },
          ">0.1",
        );
    },
    { runway: "short" },
  );
}
