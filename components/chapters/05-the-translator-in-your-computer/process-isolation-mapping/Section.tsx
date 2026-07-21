"use client";

import { useRef } from "react";
import { ChapterSection } from "@/components/shared/ChapterSection";
import { Caption } from "@/components/shared/Caption";
import { CaptionLayer } from "@/components/shared/CaptionLayer";
import { ProcessIsolationMappingDiagram } from "./Diagram";
import { useProcessIsolationMappingAnimation } from "./useAnimation";

export function ProcessIsolationMappingSection() {
  const scope = useRef<HTMLElement>(null);
  useProcessIsolationMappingAnimation(scope);

  return (
    <ChapterSection ref={scope} className="bg-circuit">
      <ProcessIsolationMappingDiagram />
      <CaptionLayer>
        <Caption>Same address. Two processes. Different memory.</Caption>
      </CaptionLayer>
    </ChapterSection>
  );
}
