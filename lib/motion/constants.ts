/**
 * Single source of truth for scroll/animation timing across the whole site.
 * No raw numbers for scroll distance, easing, or durations should appear
 * inline in component code — import them from here instead, so pacing can
 * be tuned globally in one place.
 */

/**
 * Total scroll distance (as a percentage of the pinned section's own height)
 * for which a scene stays pinned before releasing to the next one. Longer
 * runway means more sub-steps can play out in the same animation.
 *
 * IMPORTANT: because `useScrollTimeline` uses a string `start: "top top"`,
 * GSAP's ScrollTrigger resolves a relative `end: "+=X%"` as `X% of the
 * trigger's own height` ADDED TO the start scroll position — it does NOT
 * implicitly add the trigger's own 100% height first. So these values must
 * already include that base 100% (100% = "just as long as the section is
 * tall, no extra pin time") or the pin will release far too early while the
 * spacer (sized for start + this same distance) still reserves the full
 * amount, leaving a dead gap where content has already frozen but the next
 * scene hasn't started yet.
 */
export const SCROLL_RUNWAY = {
  short: "+=160%",
  medium: "+=240%",
  long: "+=360%",
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
