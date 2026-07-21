import type { RefObject } from "react";
import { gsap, useGSAP } from "@/lib/motion/gsap";
import { useScrollTimeline } from "@/lib/motion/useScrollTimeline";
import { themeColor } from "@/lib/motion/theme";

/**
 * Three beats, one per panel, addressed with one GSAP label each. First the
 * CPU's request comes back unresolved — the fault bolt flashes over the
 * confused MMU and fades again, since a fault is a momentary signal, not a
 * lasting state. Then the missing page gets pulled off disk into RAM — the
 * load arrow appears and stays, because that transfer is now a settled
 * fact. Finally the retried access succeeds — the checkmark scales/fades in
 * over the MMU/CPU pair. It's tinted success-green from the very start (set
 * once via themeColor, same idiom as the mode-dot fill in syscall-interrupt)
 * so only its opacity/scale need animating here.
 */
export function usePageFaultDemandPagingAnimation(scope: RefObject<HTMLElement | null>) {
  useGSAP(
    () => {
      gsap.set('[data-role="fault-bolt"]', { opacity: 0 });
      gsap.set('[data-role="load-arrow"]', { opacity: 0 });
      gsap.set('[data-role="success-mark"]', {
        opacity: 0,
        scale: 0,
        color: themeColor("--color-success"),
        transformOrigin: "50% 50%",
      });
    },
    { scope },
  );

  useScrollTimeline(
    scope,
    (tl) => {
      tl.addLabel("fault")
        .to('[data-role="fault-bolt"]', { opacity: 1, duration: 0.3 })
        .to('[data-role="fault-bolt"]', { opacity: 0, duration: 0.3 })

        .addLabel("fetch")
        .to('[data-role="load-arrow"]', { opacity: 1, duration: 0.4 })

        .addLabel("retry")
        .to('[data-role="success-mark"]', { opacity: 1, scale: 1, duration: 0.5 });
    },
    { runway: "medium" },
  );
}
