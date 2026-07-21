"use client";

import { useRef } from "react";
import { ChapterSection } from "@/components/shared/ChapterSection";
import { Caption } from "@/components/shared/Caption";
import { CaptionLayer } from "@/components/shared/CaptionLayer";
import { ClosingDiagram } from "./Diagram";
import { useClosingAnimation } from "./useAnimation";

export function ClosingSection() {
  const scope = useRef<HTMLElement>(null);
  useClosingAnimation(scope);

  return (
    <ChapterSection ref={scope} className="bg-circuit">
      <ClosingDiagram />
      <CaptionLayer>
        <Caption>You now know what your computer is doing.</Caption>
      </CaptionLayer>
    </ChapterSection>
  );
}
