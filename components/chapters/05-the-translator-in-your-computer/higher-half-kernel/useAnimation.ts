import type { RefObject } from "react";
import { gsap, useGSAP } from "@/lib/motion/gsap";
import { useScrollTimeline } from "@/lib/motion/useScrollTimeline";
import { themeColor } from "@/lib/motion/theme";
import { DOT_RADIUS, DOT_START, MIDPOINT_X } from "./Diagram";

/**
 * How far right the dot travels so its edge just reaches the user/kernel
 * boundary — not past it. The whole point of this scene is that it never
 * actually gets in.
 */
const APPROACH_X = MIDPOINT_X - DOT_RADIUS - DOT_START.cx;

const APPROACH_DURATION = 0.4;
const FLASH_DURATION = 0.12;
const SHAKE_DISTANCE = 8;
const SHAKE_DURATION = 0.08;
const RETURN_DURATION = 0.5;

/**
 * The mode-dot — a stand-in for any memory access — makes a quick run at
 * the shared edge between the two halves. The instant it touches the
 * line, the kernel half's border flashes danger-red and the dot shakes in
 * place, then gets bounced straight back to user space: half the address
 * space is off limits no matter how an access gets there (same "blocked
 * from entering a protected region" shape as rings-kernel-user).
 */
export function useHigherHalfKernelAnimation(scope: RefObject<HTMLElement | null>) {
  useGSAP(
    () => {
      gsap.set('[data-role="mode-dot"]', {
        attr: { cx: DOT_START.cx, cy: DOT_START.cy },
        x: 0,
        fill: themeColor("--color-user"),
      });
    },
    { scope },
  );

  useScrollTimeline(
    scope,
    (tl) => {
      const danger = themeColor("--color-danger");

      tl.to('[data-role="mode-dot"]', {
        x: APPROACH_X,
        duration: APPROACH_DURATION,
        ease: "power1.in",
      })
        .addLabel("contact")
        .to(
          '[data-role="kernel-half"]',
          { stroke: danger, duration: FLASH_DURATION, repeat: 3, yoyo: true },
          "contact",
        )
        .to(
          '[data-role="mode-dot"]',
          { x: `-=${SHAKE_DISTANCE}`, duration: SHAKE_DURATION, repeat: 5, yoyo: true },
          "contact",
        )
        .to('[data-role="mode-dot"]', {
          x: 0,
          duration: RETURN_DURATION,
          ease: "power1.out",
        });
    },
    { runway: "short" },
  );
}
