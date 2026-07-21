"use client";

import type { RefObject } from "react";
import { gsap, useGSAP } from "./gsap";
import { SCROLL_RUNWAY, SCRUB_SMOOTHING, type ScrollRunway } from "./constants";

interface UseScrollTimelineOptions {
  /** How much scroll runway this scene gets. Defaults to "medium". */
  runway?: ScrollRunway;
  /** Whether the section pins while scrubbing. Defaults to true. */
  pin?: boolean;
  /** Extra deps to re-run the animation setup on (rare — most scenes want []). */
  deps?: unknown[];
}

/**
 * Builds a single GSAP timeline whose progress is driven 1:1 by scroll
 * position within `scope`'s pinned runway. Every animation step AND every
 * caption fade must be added to the timeline passed into `build`, so the
 * diagram and the text stay perfectly synced off one mechanism — never
 * animate captions on a separate timer.
 *
 * Selector strings inside `build` (e.g. gsap.to(".pointer", ...)) are
 * automatically scoped to `scope`'s subtree, so Diagram components only
 * need semantic class names — no ref-per-element plumbing required.
 */
export function useScrollTimeline(
  scope: RefObject<HTMLElement | null>,
  build: (timeline: gsap.core.Timeline) => void,
  { runway = "medium", pin = true, deps = [] }: UseScrollTimelineOptions = {},
) {
  useGSAP(
    () => {
      if (!scope.current) {
        throw new Error("useScrollTimeline: scope ref must be attached before mount");
      }

      const timeline = gsap.timeline({
        scrollTrigger: {
          trigger: scope.current,
          start: "top top",
          end: SCROLL_RUNWAY[runway],
          scrub: SCRUB_SMOOTHING,
          pin,
          anticipatePin: 1,
        },
      });

      build(timeline);
    },
    { scope, dependencies: deps },
  );
}
