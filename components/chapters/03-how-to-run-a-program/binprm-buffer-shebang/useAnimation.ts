import type { RefObject } from "react";
import { gsap, useGSAP } from "@/lib/motion/gsap";
import { useScrollTimeline } from "@/lib/motion/useScrollTimeline";
import { themeColor } from "@/lib/motion/theme";

/**
 * The first ten boxes (the kernel's 256-byte `bprm_buf`) glow one after
 * another and hold — that's the entire window binfmt detection ever reads.
 * The trailing boxes simultaneously dim, slide a little further right and
 * down as if sliding off the edge, and the "ignored" label fades in beside
 * them, so the 256-byte cutoff reads as a place, not just a number.
 */
export function useBinprmBufferShebangAnimation(scope: RefObject<HTMLElement | null>) {
  useGSAP(
    () => {
      gsap.set('[data-role="overflow-label"]', { opacity: 0 });
    },
    { scope },
  );

  useScrollTimeline(
    scope,
    (tl) => {
      const signal = themeColor("--color-signal");

      tl.to('[data-role="buf-byte"] rect', {
        stroke: signal,
        duration: 0.5,
        stagger: 0.05,
      })
        .to(
          '[data-role="overflow-byte"]',
          {
            x: "+=10",
            y: "+=16",
            opacity: 0.3,
            duration: 0.5,
            stagger: 0.05,
          },
          "<",
        )
        .to('[data-role="overflow-label"]', { opacity: 1, duration: 0.4 }, "<0.2");
    },
    { runway: "short" },
  );
}
