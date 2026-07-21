import type { RefObject } from "react";
import { gsap, useGSAP } from "@/lib/motion/gsap";
import { useScrollTimeline } from "@/lib/motion/useScrollTimeline";
import { themeColor } from "@/lib/motion/theme";
import { COPIED_MEMORY_END, COPIED_MEMORY_START } from "./Diagram";

const LINE_DRAW_DURATION = 0.6;
const LINE_STAGGER_OVERLAP = 0.15;
const WRITE_ICON_FADE_DURATION = 0.3;
const FAULT_FLASH_DURATION = 0.12;
const FAULT_FLASH_REPEAT = 3;
const COPY_SLIDE_DURATION = 0.7;
const LOCK_FADE_DURATION = 0.4;

/**
 * Three beats, one label each. First both boxes' ownership lines draw in to
 * the still-locked shared page. Then the child writes: its pen icon fades
 * in and the shared page flashes danger — standing in for the page fault a
 * real write to a read-only COW page raises. Finally the private copy
 * slides out from under the original (an `attr` tween on x/y, since it
 * starts stacked exactly on top of it — see COPIED_MEMORY_START/END) while
 * the padlock fades away, now that each side owns its own writable page.
 */
export function useCopyOnWriteAnimation(scope: RefObject<HTMLElement | null>) {
  useGSAP(
    () => {
      gsap.set('[data-role="ownership-line"]', { drawSVG: "0%" });
      gsap.set('[data-role="write-icon"]', { opacity: 0 });
      gsap.set('[data-role="copied-memory"]', {
        opacity: 0,
        attr: { x: COPIED_MEMORY_START.x, y: COPIED_MEMORY_START.y },
      });
    },
    { scope },
  );

  useScrollTimeline(
    scope,
    (tl) => {
      const danger = themeColor("--color-danger");

      tl.addLabel("shared")
        .to(
          '[data-role="ownership-line"][data-index="0"]',
          { drawSVG: "100%", duration: LINE_DRAW_DURATION, ease: "none" },
          "shared",
        )
        .to(
          '[data-role="ownership-line"][data-index="1"]',
          { drawSVG: "100%", duration: LINE_DRAW_DURATION, ease: "none" },
          `shared+=${LINE_STAGGER_OVERLAP}`,
        )

        .addLabel("write")
        .to('[data-role="write-icon"]', { opacity: 1, duration: WRITE_ICON_FADE_DURATION }, "write")
        .to(
          '[data-role="shared-memory"]',
          {
            fill: danger,
            stroke: danger,
            duration: FAULT_FLASH_DURATION,
            yoyo: true,
            repeat: FAULT_FLASH_REPEAT,
          },
          "write+=0.2",
        )

        .addLabel("copy")
        .to(
          '[data-role="copied-memory"]',
          {
            opacity: 1,
            attr: { x: COPIED_MEMORY_END.x, y: COPIED_MEMORY_END.y },
            duration: COPY_SLIDE_DURATION,
            ease: "power2.out",
          },
          "copy",
        )
        .to('[data-role="lock-icon"]', { opacity: 0, duration: LOCK_FADE_DURATION }, "copy");
    },
    { runway: "long" },
  );
}
