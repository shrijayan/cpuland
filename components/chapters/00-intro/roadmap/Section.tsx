"use client";

import { useRef } from "react";
import { ChapterSection } from "@/components/shared/ChapterSection";
import { Caption } from "@/components/shared/Caption";
import { CaptionLayer } from "@/components/shared/CaptionLayer";
import { RoadmapDiagram } from "./Diagram";
import { useRoadmapAnimation } from "./useAnimation";

export function RoadmapSection() {
  const scope = useRef<HTMLElement>(null);
  useRoadmapAnimation(scope);

  return (
    <ChapterSection ref={scope} className="flex items-center justify-center bg-circuit">
      <RoadmapDiagram />
      <CaptionLayer>
        <Caption>8 chapters. One rabbit hole.</Caption>
      </CaptionLayer>
    </ChapterSection>
  );
}
