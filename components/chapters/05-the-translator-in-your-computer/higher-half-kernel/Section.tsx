"use client";

import { useRef } from "react";
import { ChapterSection } from "@/components/shared/ChapterSection";
import { Caption } from "@/components/shared/Caption";
import { CaptionLayer } from "@/components/shared/CaptionLayer";
import { HigherHalfKernelDiagram } from "./Diagram";
import { useHigherHalfKernelAnimation } from "./useAnimation";

export function HigherHalfKernelSection() {
  const scope = useRef<HTMLElement>(null);
  useHigherHalfKernelAnimation(scope);

  return (
    <ChapterSection ref={scope} className="bg-circuit">
      <HigherHalfKernelDiagram />
      <CaptionLayer>
        <Caption>Half the address space always belongs to the kernel.</Caption>
      </CaptionLayer>
    </ChapterSection>
  );
}
