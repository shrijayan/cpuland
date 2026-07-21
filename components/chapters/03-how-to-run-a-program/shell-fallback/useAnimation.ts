import type { RefObject } from "react";
import { gsap, useGSAP } from "@/lib/motion/gsap";
import { useScrollTimeline } from "@/lib/motion/useScrollTimeline";
import { themeColor } from "@/lib/motion/theme";

/**
 * execve() fails loudly first (ENOEXEC) — the box flashes red border/text
 * and the status dot lights up red right alongside it. The shell shrugs the
 * failure off with a quick rotation wobble, then retries and succeeds — the
 * same status dot just recolors green, since it's one shell doing one retry,
 * not a second attempt appearing from nowhere.
 */
export function useShellFallbackAnimation(scope: RefObject<HTMLElement | null>) {
  useGSAP(
    () => {
      gsap.set('[data-role="status-mark"]', { opacity: 0 });
    },
    { scope },
  );

  useScrollTimeline(
    scope,
    (tl) => {
      const danger = themeColor("--color-danger");
      const success = themeColor("--color-success");

      tl.to('[data-role="execve-box"]', {
        color: danger,
        borderColor: danger,
        duration: 0.15,
        repeat: 3,
        yoyo: true,
      })
        .to(
          '[data-role="status-mark"]',
          { opacity: 1, borderColor: danger, backgroundColor: danger, duration: 0.2 },
          "<",
        )
        .to('[data-role="shell-box"]', {
          rotate: -6,
          duration: 0.12,
          repeat: 3,
          yoyo: true,
          transformOrigin: "50% 50%",
        })
        .to('[data-role="status-mark"]', {
          borderColor: success,
          backgroundColor: success,
          duration: 0.3,
        });
    },
    { runway: "short" },
  );
}
