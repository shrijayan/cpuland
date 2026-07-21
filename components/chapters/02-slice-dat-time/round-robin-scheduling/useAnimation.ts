import type { RefObject } from "react";
import { gsap, useGSAP } from "@/lib/motion/gsap";
import { useScrollTimeline } from "@/lib/motion/useScrollTimeline";
import { ROUND_ROBIN_PROCESS_COUNT } from "./Diagram";

/**
 * The cycle builds itself one turn at a time, just like fetch-execute-cycle
 * steps through bytes with labels: each wide run-block grows in from the
 * left (a process gets the CPU), then a thin scheduler sliver flashes on
 * (the brief, cheap switch) before the next process's turn — three turns
 * in total. Only once the whole cycle is drawn do the timeslice and target
 * latency brackets fade in to name what was just shown.
 */
export function useRoundRobinAnimation(scope: RefObject<HTMLElement | null>) {
  useGSAP(
    () => {
      gsap.set('[data-role="run-block"]', { scaleX: 0, transformOrigin: "0% 50%" });
      gsap.set('[data-role="sliver"]', { opacity: 0 });
      gsap.set('[data-role="timeslice-label"], [data-role="latency-label"]', { opacity: 0 });
    },
    { scope },
  );

  useScrollTimeline(
    scope,
    (tl) => {
      for (let i = 0; i < ROUND_ROBIN_PROCESS_COUNT; i++) {
        tl.to(`[data-role="run-block"][data-index="${i}"]`, {
          scaleX: 1,
          duration: 0.5,
          ease: "power2.out",
        })
          .to(
            `[data-role="sliver"][data-index="${i}"]`,
            { opacity: 1, duration: 0.2 },
            "<0.3",
          )
          .addLabel(`turn${i}`);
      }

      tl.to('[data-role="timeslice-label"]', { opacity: 1, duration: 0.4 }).to(
        '[data-role="latency-label"]',
        { opacity: 1, duration: 0.4 },
        "<0.2",
      );
    },
    { runway: "long" },
  );
}
