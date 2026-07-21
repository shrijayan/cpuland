import type { RefObject } from "react";
import { gsap, useGSAP } from "@/lib/motion/gsap";
import { useScrollTimeline } from "@/lib/motion/useScrollTimeline";
import { themeColor } from "@/lib/motion/theme";

/**
 * The timer chip ticks (its icon pulses) on its own schedule, then fires —
 * yanking the mode-dot straight from ring 3 down into ring 0, no matter what
 * the program was doing. Unlike a syscall, nothing asked for this: the
 * hardware interrupt forces the switch to kernel mode.
 */
export function useHardwareInterruptTimerAnimation(scope: RefObject<HTMLElement | null>) {
  useGSAP(
    () => {
      gsap.set('[data-role="mode-dot"]', {
        attr: { cx: 200, cy: 40 },
        fill: themeColor("--color-user"),
      });
      gsap.set('[data-role="timer-icon"]', { scale: 1, transformOrigin: "50% 50%" });
    },
    { scope },
  );

  useScrollTimeline(
    scope,
    (tl) => {
      const kernel = themeColor("--color-kernel");

      tl.to('[data-role="timer-icon"]', {
        scale: 1.25,
        duration: 0.15,
        repeat: 3,
        yoyo: true,
        ease: "power1.inOut",
      })
        .addLabel("interrupt")
        .to('[data-role="mode-dot"]', {
          attr: { cy: 150 },
          fill: kernel,
          duration: 0.35,
          ease: "power4.in",
        });
    },
    { runway: "medium" },
  );
}
