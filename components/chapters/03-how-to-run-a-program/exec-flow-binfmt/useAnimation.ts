import type { RefObject } from "react";
import { gsap, useGSAP } from "@/lib/motion/gsap";
import { useScrollTimeline } from "@/lib/motion/useScrollTimeline";
import { themeColor } from "@/lib/motion/theme";
import { BINFMT_KEYS, BINFMT_SUCCESS_INDEX, keyTravelDistance } from "./Diagram";

/**
 * How far a failing handler travels toward the lock before bouncing back.
 * Kept below 1 so only the handler that actually fits (BINFMT_SUCCESS_INDEX)
 * visibly reaches the lock — the failed attempts read as "reaching for it",
 * not "touching it".
 */
const FAIL_REACH_FRACTION = 0.7;

function chipSelector(index: number) {
  return `[data-role="binfmt-key"][data-index="${index}"] rect, [data-role="binfmt-key"][data-index="${index}"] text`;
}

function chipRectSelector(index: number) {
  return `[data-role="binfmt-key"][data-index="${index}"] rect`;
}

/**
 * One straight syscall trace draws user space into kernel space, then the
 * kernel tries each binfmt handler in turn: the same chip slides toward the
 * lock and bounces back on every failed match, so every failure reads as
 * one mechanism retried — not three unrelated animations. Only the last
 * handler (elf) actually reaches the lock and stays there; it's the lock
 * itself that flashes success, since it's the format check that "accepts"
 * the match, not the handler that changes.
 */
export function useExecFlowBinfmtAnimation(scope: RefObject<HTMLElement | null>) {
  useGSAP(
    () => {
      gsap.set('[data-role="syscall-trace"]', { drawSVG: "0%" });
    },
    { scope },
  );

  useScrollTimeline(
    scope,
    (tl) => {
      const danger = themeColor("--color-danger");
      const success = themeColor("--color-success");

      tl.to('[data-role="syscall-trace"]', { drawSVG: "100%", duration: 0.6, ease: "none" });

      BINFMT_KEYS.forEach((name, index) => {
        const isMatch = index === BINFMT_SUCCESS_INDEX;
        const travel = keyTravelDistance(index) * (isMatch ? 1 : FAIL_REACH_FRACTION);

        tl.addLabel(`try-${name}`).to(chipSelector(index), {
          attr: { y: `+=${travel}` },
          duration: 0.35,
          ease: "power2.in",
        });

        if (isMatch) {
          tl.to('[data-role="lock"]', {
            scale: 1.15,
            transformOrigin: "50% 50%",
            duration: 0.15,
            yoyo: true,
            repeat: 1,
          }).to('[data-role="lock"]', { fill: success, duration: 0.3 }, "<");
        } else {
          tl.to(chipRectSelector(index), {
            stroke: danger,
            duration: 0.15,
            yoyo: true,
            repeat: 1,
          }).to(chipSelector(index), {
            attr: { y: `-=${travel}` },
            duration: 0.35,
            ease: "power2.out",
          });
        }
      });
    },
    { runway: "long" },
  );
}
