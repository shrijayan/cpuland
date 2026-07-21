"use client";

import type { RefObject } from "react";
import { gsap, useGSAP } from "@/lib/motion/gsap";
import { useScrollTimeline } from "@/lib/motion/useScrollTimeline";
import { FIRST_GENERATION_COUNT, SECOND_GENERATION_COUNT } from "./Diagram";

const ROOT_POP_DURATION = 0.5;
const EDGE_DRAW_DURATION = 0.4;
const NODE_FADE_DURATION = 0.35;

/** A child node starts fading in this many seconds before its own edge finishes drawing. */
const NODE_FADE_OVERLAP = 0.05;
/** The next sibling's edge starts this many seconds before the previous one's node finishes fading in — the "staggered" cascade across one generation. */
const SIBLING_STAGGER_OVERLAP = 0.15;

interface GenerationLink {
  edgeIndex: number;
  nodeIndex: number;
}

/** `Diagram.tsx` builds every edge so `nodeIndex` is always `edgeIndex + 1` — see its comment. */
function buildGeneration(startEdgeIndex: number, count: number): GenerationLink[] {
  return Array.from({ length: count }, (_, i) => ({
    edgeIndex: startEdgeIndex + i,
    nodeIndex: startEdgeIndex + i + 1,
  }));
}

const FIRST_GENERATION = buildGeneration(0, FIRST_GENERATION_COUNT);
const SECOND_GENERATION = buildGeneration(FIRST_GENERATION_COUNT, SECOND_GENERATION_COUNT);

/**
 * Reveals one generation of the tree: for each link, its edge draws
 * (DrawSVG) and its node fades in right after, overlapping slightly for
 * continuity. Successive siblings overlap each other too (SIBLING_STAGGER_OVERLAP),
 * so a generation cascades in rather than ticking through one strict step
 * at a time. The first link of the generation stays sequential (`">"`) with
 * whatever came right before it, so generations themselves never blur
 * together.
 */
function revealGeneration(timeline: gsap.core.Timeline, generation: readonly GenerationLink[]) {
  generation.forEach(({ edgeIndex, nodeIndex }, i) => {
    timeline
      .to(
        `[data-role="tree-edge"][data-index="${edgeIndex}"]`,
        { drawSVG: "100%", duration: EDGE_DRAW_DURATION, ease: "none" },
        i === 0 ? ">" : `>-${SIBLING_STAGGER_OVERLAP}`,
      )
      .to(
        `[data-role="tree-node"][data-index="${nodeIndex}"]`,
        { opacity: 1, duration: NODE_FADE_DURATION, ease: "power2.out" },
        `>-${NODE_FADE_OVERLAP}`,
      );
  });
}

/**
 * Grows the init process tree top-down as you scroll: the root ("init")
 * pops in first, then its 3 children cascade in (edge draws, child fades in
 * right after, staggered across the 3), then the 2 grandchildren under one
 * of those children do the same — showing the tree keeps branching past the
 * first generation.
 */
export function useInitProcessTreeAnimation(scope: RefObject<HTMLElement | null>) {
  useGSAP(
    () => {
      gsap.set('[data-role="tree-node"]', { opacity: 0 });
      gsap.set('[data-role="tree-node"][data-index="0"]', {
        scale: 0.5,
        transformOrigin: "50% 50%",
      });
      gsap.set('[data-role="tree-edge"]', { drawSVG: "0%" });
    },
    { scope },
  );

  useScrollTimeline(
    scope,
    (tl) => {
      tl.to('[data-role="tree-node"][data-index="0"]', {
        opacity: 1,
        scale: 1,
        duration: ROOT_POP_DURATION,
        ease: "back.out(1.7)",
      });

      revealGeneration(tl, FIRST_GENERATION);
      revealGeneration(tl, SECOND_GENERATION);
    },
    { runway: "medium" },
  );
}
