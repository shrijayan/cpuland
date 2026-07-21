"use client";

import { useRef } from "react";
import { ChapterSection } from "@/components/shared/ChapterSection";
import { Caption } from "@/components/shared/Caption";
import { CaptionLayer } from "@/components/shared/CaptionLayer";
import { PreemptionLoopDiagram } from "./Diagram";
import { usePreemptionLoopAnimation } from "./useAnimation";

export function PreemptionLoopSection() {
  const scope = useRef<HTMLElement>(null);
  usePreemptionLoopAnimation(scope);

  return (
    <ChapterSection ref={scope} className="flex items-center justify-center bg-circuit">
      <PreemptionLoopDiagram />
      <CaptionLayer>
        <Caption>Interrupt. Save. Switch. Resume.</Caption>
      </CaptionLayer>
    </ChapterSection>
  );
}
