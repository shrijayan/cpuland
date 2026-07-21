"use client";

import type { RefObject } from "react";
import { gsap, useGSAP } from "@/lib/motion/gsap";
import { useScrollTimeline } from "@/lib/motion/useScrollTimeline";

/**
 * Terminal cursor blinks forever, independent of scroll. Then, scroll drives
 * the actual story beat: the terminal fades as the CPU chip zooms in and
 * settles into a steady pulse — the visual anchor Ch.1 picks up from.
 */
export function useHookAnimation(scope: RefObject<HTMLElement | null>) {
  useGSAP(
    () => {
      gsap.to('[data-role="terminal-cursor"]', {
        opacity: 0,
        duration: 0.5,
        repeat: -1,
        yoyo: true,
        ease: "steps(1)",
      });

      gsap.set('[data-role="chip"]', { opacity: 0, scale: 0.55, transformOrigin: "50% 50%" });
    },
    { scope },
  );

  useScrollTimeline(
    scope,
    (tl) => {
      tl.to('[data-role="terminal"]', { opacity: 0, duration: 1 })
        .to(
          '[data-role="chip"]',
          { opacity: 1, scale: 1, duration: 1.4, ease: "power2.out" },
          "<",
        )
        .to('[data-role="chip-outline"]', {
          opacity: 0.45,
          repeat: 1,
          yoyo: true,
          duration: 0.5,
        });
    },
    { runway: "short" },
  );
}
