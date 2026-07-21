import type { RefObject } from "react";
import { gsap, useGSAP } from "@/lib/motion/gsap";
import { useScrollTimeline } from "@/lib/motion/useScrollTimeline";
import { themeColor } from "@/lib/motion/theme";
import { IVT_PANEL, MATCHED_ROW_INDEX, RING_CENTER, RING_OUTER_R, rowCenterY } from "./Diagram";

const matchedRowY = rowCenterY(MATCHED_ROW_INDEX);
const ring3Point = { cx: RING_CENTER.x, cy: RING_CENTER.y - RING_OUTER_R };
const ivtPoint = { cx: IVT_PANEL.x, cy: matchedRowY };
const corePoint = { cx: RING_CENTER.x, cy: RING_CENTER.y };

/**
 * The full INT → IVT lookup → kernel jump → IRET round trip. The trace
 * lines "draw themselves" (DrawSVG) at the same time the dot slides along
 * their same straight-line endpoints, so line and dot move together as one
 * signal, then the matched IVT row highlights only while it's relevant.
 */
export function useSyscallAnimation(scope: RefObject<HTMLElement | null>) {
  useGSAP(
    () => {
      gsap.set('[data-role="int-trace"], [data-role="jump-trace"], [data-role="iret-trace"]', {
        drawSVG: "0%",
      });
      gsap.set('[data-role="mode-dot"]', { attr: ring3Point, fill: themeColor("--color-user") });
    },
    { scope },
  );

  useScrollTimeline(
    scope,
    (tl) => {
      const kernel = themeColor("--color-kernel");
      const user = themeColor("--color-user");
      const signal = themeColor("--color-signal");
      const idle = themeColor("--color-ink-faint");

      tl.to('[data-role="int-trace"]', { drawSVG: "100%", duration: 0.6, ease: "none" })
        .to('[data-role="mode-dot"]', { attr: ivtPoint, duration: 0.6, ease: "none" }, "<")
        .addLabel("atIvt")
        .to(
          `[data-role="ivt-row"][data-index="${MATCHED_ROW_INDEX}"] rect`,
          { stroke: signal, duration: 0.25 },
          "atIvt",
        )
        .to('[data-role="jump-trace"]', { drawSVG: "100%", duration: 0.5, ease: "none" })
        .to(
          '[data-role="mode-dot"]',
          { attr: corePoint, fill: kernel, duration: 0.5, ease: "none" },
          "<",
        )
        .addLabel("inKernel")
        .to('[data-role="mode-dot"]', {
          scale: 1.35,
          transformOrigin: "50% 50%",
          duration: 0.2,
          repeat: 3,
          yoyo: true,
        })
        .to(
          `[data-role="ivt-row"][data-index="${MATCHED_ROW_INDEX}"] rect`,
          { stroke: idle, duration: 0.25 },
          "inKernel",
        )
        .to('[data-role="iret-trace"]', { drawSVG: "100%", duration: 0.5, ease: "none" })
        .to(
          '[data-role="mode-dot"]',
          { attr: ring3Point, fill: user, duration: 0.5, ease: "none" },
          "<",
        );
    },
    { runway: "long" },
  );
}
