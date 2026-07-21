import type { RefObject } from "react";
import { gsap, useGSAP } from "@/lib/motion/gsap";
import { useScrollTimeline } from "@/lib/motion/useScrollTimeline";
import { themeColor } from "@/lib/motion/theme";
import { MMU_TO_RAM_GAP } from "./Diagram";

/**
 * Two beats. First the translation: the virtual address the CPU asked for
 * flips out while the real physical address flips in underneath it, in the
 * exact same spot (same rotateX + crossfade technique as binary-to-asm) —
 * that swap *is* the lie the caption is talking about. Then the read: a
 * small pulse launches off the MMU box's right edge and slides the fixed
 * MMU_TO_RAM_GAP distance into RAM, standing in for the CPU actually
 * fetching from the address the MMU handed it.
 */
export function useMmuTranslationAnimation(scope: RefObject<HTMLElement | null>) {
  useGSAP(
    () => {
      gsap.set('[data-role="virtual-addr"]', { transformOrigin: "50% 50%" });
      gsap.set('[data-role="physical-addr"]', {
        opacity: 0,
        rotateX: -90,
        transformOrigin: "50% 50%",
      });
      gsap.set('[data-role="pulse"]', { x: 0, opacity: 0, scale: 1 });
    },
    { scope },
  );

  useScrollTimeline(
    scope,
    (tl) => {
      const arrived = themeColor("--color-signal");
      const idle = themeColor("--color-ink-faint");

      tl.addLabel("translate")
        .to('[data-role="virtual-addr"]', { opacity: 0, rotateX: 90, duration: 0.6 })
        .to('[data-role="physical-addr"]', { opacity: 1, rotateX: 0, duration: 0.6 }, "<")

        .addLabel("read")
        .to('[data-role="pulse"]', { opacity: 1, duration: 0.15 })
        .to(
          '[data-role="pulse"]',
          { x: MMU_TO_RAM_GAP, duration: 0.6, ease: "power2.inOut" },
          "<",
        )

        .addLabel("arrive")
        .to('[data-role="ram-box"]', { borderColor: arrived, duration: 0.15 })
        .to('[data-role="pulse"]', { scale: 1.8, duration: 0.15, yoyo: true, repeat: 1 }, "<")
        .to('[data-role="ram-box"]', { borderColor: idle, duration: 0.3 })
        .to('[data-role="pulse"]', { opacity: 0, duration: 0.2 }, "<");
    },
    { runway: "medium" },
  );
}
