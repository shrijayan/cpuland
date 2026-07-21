import type { RefObject } from "react";
import { gsap, useGSAP } from "@/lib/motion/gsap";
import { useScrollTimeline } from "@/lib/motion/useScrollTimeline";
import { themeColor } from "@/lib/motion/theme";

/** Forward-back-forward: two full pulses that land back on kernel color, not the neutral start. */
const TRANSLATE_PULSE_REPEATS = 2;
const TRANSLATE_PULSE_DURATION = 0.22;

/**
 * `translated-bits` pulses neutral -> kernel-purple -> neutral -> kernel a
 * couple of times and settles on kernel — standing in for the address
 * bouncing through the MMU and coming out translated. `offset-bits` is
 * never targeted by this timeline at all: it was already lit steady
 * user-teal in the initial `gsap.set`, and stays exactly that color the
 * whole scene, because the bottom 12 bits never move. Once the pulse
 * settles, both segment brace labels slide/fade in to name what happened.
 */
export function usePageSizeBreakdownAnimation(scope: RefObject<HTMLElement | null>) {
  useGSAP(
    () => {
      gsap.set('[data-role="translated-bits"]', {
        fill: themeColor("--color-surface-raised"),
        stroke: themeColor("--color-ink-faint"),
      });
      gsap.set('[data-role="offset-bits"]', {
        fill: themeColor("--color-user"),
        stroke: themeColor("--color-user"),
      });
      gsap.set('[data-role="segment-label"]', { opacity: 0, y: 6 });
    },
    { scope },
  );

  useScrollTimeline(
    scope,
    (tl) => {
      const kernel = themeColor("--color-kernel");

      tl.to('[data-role="translated-bits"]', {
        fill: kernel,
        stroke: kernel,
        duration: TRANSLATE_PULSE_DURATION,
        repeat: TRANSLATE_PULSE_REPEATS,
        yoyo: true,
      })
        .addLabel("translated")
        .to(
          '[data-role="segment-label"]',
          { opacity: 1, y: 0, duration: 0.35, stagger: 0.15 },
          "<0.1",
        );
    },
    { runway: "short" },
  );
}
