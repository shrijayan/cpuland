"use client";

import { useRef } from "react";
import { ChapterSection } from "@/components/shared/ChapterSection";
import { Caption } from "@/components/shared/Caption";
import { CaptionLayer } from "@/components/shared/CaptionLayer";
import { ElfExecutionDiagram } from "./Diagram";
import { useElfExecutionAnimation } from "./useAnimation";

export function ElfExecutionSection() {
  const scope = useRef<HTMLElement>(null);
  useElfExecutionAnimation(scope);

  return (
    <ChapterSection ref={scope} className="bg-circuit">
      <ElfExecutionDiagram />
      <CaptionLayer>
        <Caption>Load the segments into memory. Jump. Go.</Caption>
      </CaptionLayer>
    </ChapterSection>
  );
}
