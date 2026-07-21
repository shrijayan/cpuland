import type { RefObject } from "react";
import { gsap, useGSAP } from "@/lib/motion/gsap";
import { useScrollTimeline } from "@/lib/motion/useScrollTimeline";

/**
 * How far chips 1-3 slide right — roughly the width the two new-chip
 * elements need to land, so the row reads as one contiguous array once the
 * slide finishes, instead of a chip landing on top of another.
 */
const SHIFT_RIGHT_X = 168;

/** How far off-screen (to the left) the new chips start before sliding in. */
const SLIDE_IN_FROM_X = -96;

/**
 * `./script` (argv[0]) fades and shrinks away first — that's the kernel
 * discarding it, per `binfmt_script`'s rewrite rule. The interpreter path
 * and its flag then slide in from off-screen to take its place, while the
 * script's real arguments (A, B, C) shift right to make room — landing as
 * one contiguous, rewritten argv array.
 */
export function useShebangArgvRewriteAnimation(scope: RefObject<HTMLElement | null>) {
  useGSAP(
    () => {
      gsap.set('[data-role="argv-chip"][data-index="0"]', { transformOrigin: "50% 50%" });
      gsap.set('[data-role="new-chip"]', { opacity: 0, x: SLIDE_IN_FROM_X });
    },
    { scope },
  );

  useScrollTimeline(
    scope,
    (tl) => {
      tl.to('[data-role="argv-chip"][data-index="0"]', { opacity: 0, scale: 0.6, duration: 0.4 })
        .to(
          '[data-role="argv-chip"][data-index="1"], [data-role="argv-chip"][data-index="2"], [data-role="argv-chip"][data-index="3"]',
          { x: SHIFT_RIGHT_X, duration: 0.5, stagger: 0.06 },
          "<",
        )
        .to('[data-role="new-chip"]', { opacity: 1, x: 0, duration: 0.5, stagger: 0.08 }, "<0.1");
    },
    { runway: "short" },
  );
}
