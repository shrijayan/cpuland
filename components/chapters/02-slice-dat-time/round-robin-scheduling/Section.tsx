"use client";

import { useRef } from "react";
import { ChapterSection } from "@/components/shared/ChapterSection";
import { Caption } from "@/components/shared/Caption";
import { CaptionLayer } from "@/components/shared/CaptionLayer";
import { RoundRobinDiagram } from "./Diagram";
import { useRoundRobinAnimation } from "./useAnimation";

export function RoundRobinSection() {
  const scope = useRef<HTMLElement>(null);
  useRoundRobinAnimation(scope);

  return (
    <ChapterSection ref={scope} className="bg-circuit">
      <RoundRobinDiagram />
      <CaptionLayer>
        <Caption>Everyone gets a slice of time.</Caption>
      </CaptionLayer>
    </ChapterSection>
  );
}
