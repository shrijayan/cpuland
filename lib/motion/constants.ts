/**
 * Single source of truth for scroll/animation timing across the whole site.
 * No raw numbers for scroll distance, easing, or durations should appear
 * inline in component code — import them from here instead, so pacing can
 * be tuned globally in one place.
 */

/**
 * How much *extra* scroll distance (relative to the pinned section's own
 * height) a scene needs before it releases to the next one. Longer runway
 * means more sub-steps can play out in the same animation before it ends.
 */
export const SCROLL_RUNWAY = {
  short: "+=60%",
  medium: "+=140%",
  long: "+=260%",
} as const;

export type ScrollRunway = keyof typeof SCROLL_RUNWAY;

/**
 * Seconds of "catch up" lag ScrollTrigger's scrub applies between scroll
 * position and timeline progress. 0 = rigid/instant, ~0.5-1 = fluid and
 * premium-feeling without feeling disconnected from the scroll itself.
 */
export const SCRUB_SMOOTHING = 0.6;

/** Named GSAP easing curves. Keep every animation's ease referencing one of these. */
export const EASE = {
  standard: "power2.inOut",
  enter: "power3.out",
  exit: "power3.in",
  snap: "back.out(1.7)",
} as const;
