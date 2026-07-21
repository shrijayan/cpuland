import type { RefObject } from "react";
import { gsap, useGSAP } from "@/lib/motion/gsap";
import { useScrollTimeline } from "@/lib/motion/useScrollTimeline";

/**
 * The call drops into libc, which then fires one miniature INT/IRET
 * round-trip (the user/kernel dots swap emphasis, a small trace draws and
 * un-draws) — the same mechanism as syscall-interrupt, just shown wrapped.
 */
export function useLibcWrapperAnimation(scope: RefObject<HTMLElement | null>) {
  useGSAP(
    () => {
      gsap.set('[data-role="mini-kernel"]', { opacity: 0.3 });
      gsap.set('[data-role="mini-trace"]', { drawSVG: "0%" });
    },
    { scope },
  );

  useScrollTimeline(
    scope,
    (tl) => {
      tl.to('[data-role="call"]', { y: 26, opacity: 0, duration: 0.6 })
        .to(
          '[data-role="libc-box"]',
          { scale: 1.03, duration: 0.2, yoyo: true, repeat: 1, transformOrigin: "50% 50%" },
          "<0.3",
        )
        .to('[data-role="mini-trace"]', { drawSVG: "100%", duration: 0.4 })
        .to('[data-role="mini-user"]', { opacity: 0.3, duration: 0.3 }, "<")
        .to('[data-role="mini-kernel"]', { opacity: 1, duration: 0.3 }, "<")
        .to('[data-role="mini-kernel"]', { opacity: 0.3, duration: 0.3 }, ">0.3")
        .to('[data-role="mini-user"]', { opacity: 1, duration: 0.3 }, "<")
        .to('[data-role="mini-trace"]', { drawSVG: "0%", duration: 0.3 }, "<");
    },
    { runway: "short" },
  );
}
