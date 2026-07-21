import type { RefObject } from "react";
import { gsap, useGSAP } from "@/lib/motion/gsap";
import { useScrollTimeline } from "@/lib/motion/useScrollTimeline";

/**
 * Each hex/asm pair flips in place (rotateX + crossfade) as you scroll, and
 * — because this is a scrubbed timeline — scrolling back up flips it right
 * back to raw bytes. Staggered per pair so it reads left-to-right.
 */
export function useBinaryToAsmAnimation(scope: RefObject<HTMLElement | null>) {
  useGSAP(
    () => {
      gsap.set('[data-role="asm"]', { opacity: 0, rotateX: -90, transformOrigin: "50% 50%" });
      gsap.set('[data-role="hex"]', { transformOrigin: "50% 50%" });
    },
    { scope },
  );

  useScrollTimeline(
    scope,
    (tl) => {
      tl.to('[data-role="hex"]', { opacity: 0, rotateX: 90, stagger: 0.2, duration: 0.6 }).to(
        '[data-role="asm"]',
        { opacity: 1, rotateX: 0, stagger: 0.2, duration: 0.6 },
        "<",
      );
    },
    { runway: "short" },
  );
}
