"use client";

import { useRef } from "react";
import { ChapterSection } from "@/components/shared/ChapterSection";
import { Caption } from "@/components/shared/Caption";
import { CaptionLayer } from "@/components/shared/CaptionLayer";
import { ForkExecPatternDiagram } from "./Diagram";
import { useForkExecPatternAnimation } from "./useAnimation";

export function ForkExecPatternSection() {
  const scope = useRef<HTMLElement>(null);
  useForkExecPatternAnimation(scope);

  return (
    <ChapterSection ref={scope} className="flex items-center justify-center bg-circuit">
      <ForkExecPatternDiagram />
      <CaptionLayer>
        <Caption>Clone yourself. Then become someone else.</Caption>
      </CaptionLayer>
    </ChapterSection>
  );
}
