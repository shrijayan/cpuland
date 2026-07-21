import type { RefObject } from "react";
import { gsap, useGSAP } from "@/lib/motion/gsap";
import { useScrollTimeline } from "@/lib/motion/useScrollTimeline";

/**
 * Static linking reveals first: both `foo` chips scale/fade into their
 * program boxes together, showing the library's code duplicated in place
 * (beat="static" caption visible throughout). The scene then hands off to
 * dynamic linking at the "dynamic" label — name-tags fade in, the two
 * reference arrows draw themselves (DrawSVG) toward one shared `foo`, which
 * pops in — while the caption crossfades to beat="dynamic" at that same
 * label, so the words land exactly when the sharing becomes visible.
 */
export function useStaticVsDynamicLinkingAnimation(scope: RefObject<HTMLElement | null>) {
  useGSAP(
    () => {
      gsap.set('[data-role="static-foo"]', { opacity: 0, scale: 0.6 });
      gsap.set('[data-role="dynamic-tag"]', { opacity: 0 });
      gsap.set('[data-role="dynamic-arrow"]', { drawSVG: "0%" });
      gsap.set('[data-role="shared-foo"]', {
        opacity: 0,
        scale: 0.6,
        transformOrigin: "50% 50%",
      });
      gsap.set('[data-beat="dynamic"]', { opacity: 0 });
    },
    { scope },
  );

  useScrollTimeline(
    scope,
    (tl) => {
      tl.to('[data-role="static-foo"]', { opacity: 1, scale: 1, duration: 0.5 }).addLabel(
        "dynamic",
      );

      tl.to('[data-beat="static"]', { opacity: 0, duration: 0.3 }, "dynamic")
        .to('[data-beat="dynamic"]', { opacity: 1, duration: 0.3 }, "dynamic")
        .to('[data-role="dynamic-tag"]', { opacity: 1, duration: 0.4 }, "dynamic")
        .to('[data-role="dynamic-arrow"]', { drawSVG: "100%", duration: 0.5, ease: "none" })
        .to('[data-role="shared-foo"]', {
          opacity: 1,
          scale: 1,
          duration: 0.4,
          ease: "back.out(1.7)",
        });
    },
    { runway: "medium" },
  );
}
