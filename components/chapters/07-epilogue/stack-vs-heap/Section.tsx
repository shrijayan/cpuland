"use client";

import { useRef } from "react";
import { ChapterSection } from "@/components/shared/ChapterSection";
import { Caption } from "@/components/shared/Caption";
import { CaptionLayer } from "@/components/shared/CaptionLayer";
import { StackVsHeapDiagram } from "./Diagram";
import { useStackVsHeapAnimation } from "./useAnimation";

export function StackVsHeapSection() {
  const scope = useRef<HTMLElement>(null);
  useStackVsHeapAnimation(scope);

  return (
    <ChapterSection ref={scope} className="bg-circuit">
      <StackVsHeapDiagram />
      <CaptionLayer>
        <Caption>The stack grows down. The heap grows on request.</Caption>
      </CaptionLayer>
    </ChapterSection>
  );
}
