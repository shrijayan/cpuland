import type { RefObject } from "react";
import { gsap, useGSAP } from "@/lib/motion/gsap";
import { useScrollTimeline } from "@/lib/motion/useScrollTimeline";

/**
 * The parent box never moves. Inside the child box, "child" crossfades
 * into "new program" in place (same grid-stack trick as binary-to-asm) —
 * execve() replacing the child process's image, not spawning a third box.
 */
export function useForkExecPatternAnimation(scope: RefObject<HTMLElement | null>) {
  useGSAP(
    () => {
      gsap.set('[data-role="child-after"]', { opacity: 0 });
    },
    { scope },
  );

  useScrollTimeline(
    scope,
    (tl) => {
      tl.to('[data-role="child-before"]', { opacity: 0, duration: 0.6 }).to(
        '[data-role="child-after"]',
        { opacity: 1, duration: 0.6 },
        "<",
      );
    },
    { runway: "short" },
  );
}
