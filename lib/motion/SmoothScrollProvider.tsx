"use client";

import { useLayoutEffect, type ReactNode } from "react";
import Lenis from "lenis";
import { gsap, ScrollTrigger } from "./gsap";

/**
 * Wires up Lenis (smooth scroll feel) and GSAP's ScrollTrigger so they share
 * one clock (gsap.ticker) instead of racing on separate requestAnimationFrame
 * loops. This is the only place Lenis is instantiated — every chapter scene
 * just uses useScrollTimeline and stays unaware smooth-scroll exists at all.
 */
export function SmoothScrollProvider({ children }: { children: ReactNode }) {
  useLayoutEffect(() => {
    const lenis = new Lenis({ autoRaf: false });

    lenis.on("scroll", ScrollTrigger.update);

    const tick = (time: number) => {
      lenis.raf(time * 1000);
    };
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(tick);
      lenis.destroy();
    };
  }, []);

  return children;
}
