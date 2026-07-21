import type { RefObject } from "react";
import { gsap, useGSAP } from "@/lib/motion/gsap";
import { useScrollTimeline } from "@/lib/motion/useScrollTimeline";
import { themeColor } from "@/lib/motion/theme";

/**
 * The privilege-level dot starts in ring 0 (processors boot into kernel
 * mode), gets pushed out to ring 3 to run a program, then tries to reach
 * back into the guarded kernel core and bounces off — visualizing why user
 * mode "can't touch much."
 */
export function useRingsAnimation(scope: RefObject<HTMLElement | null>) {
  useGSAP(
    () => {
      gsap.set('[data-role="mode-dot"]', {
        attr: { cx: 200, cy: 114 },
        fill: themeColor("--color-kernel"),
      });
    },
    { scope },
  );

  useScrollTimeline(
    scope,
    (tl) => {
      const user = themeColor("--color-user");
      const danger = themeColor("--color-danger");

      tl.to('[data-role="mode-dot"]', {
        attr: { cx: 200, cy: 40 },
        fill: user,
        duration: 0.8,
        ease: "power2.out",
      })
        .addLabel("inUserMode")
        .to('[data-role="mode-dot"]', { attr: { cy: 150 }, duration: 0.5, ease: "power1.in" })
        .to(
          '[data-role="guarded-core"] rect',
          { stroke: danger, duration: 0.12, repeat: 3, yoyo: true },
          "<",
        )
        .to('[data-role="mode-dot"]', { x: "+=8", duration: 0.08, repeat: 5, yoyo: true }, "<")
        .to('[data-role="mode-dot"]', {
          attr: { cy: 40 },
          x: 0,
          duration: 0.5,
          ease: "power1.out",
        });
    },
    { runway: "medium" },
  );
}
