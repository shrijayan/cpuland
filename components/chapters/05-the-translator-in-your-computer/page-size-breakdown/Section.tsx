"use client";

import { useRef } from "react";
import { ChapterSection } from "@/components/shared/ChapterSection";
import { Caption } from "@/components/shared/Caption";
import { CaptionLayer } from "@/components/shared/CaptionLayer";
import { PageSizeBreakdownDiagram } from "./Diagram";
import { usePageSizeBreakdownAnimation } from "./useAnimation";

export function PageSizeBreakdownSection() {
  const scope = useRef<HTMLElement>(null);
  usePageSizeBreakdownAnimation(scope);

  return (
    <ChapterSection ref={scope} className="flex items-center justify-center bg-circuit">
      <PageSizeBreakdownDiagram />
      <CaptionLayer>
        <Caption>Only the top bits get translated. The rest stay put.</Caption>
      </CaptionLayer>
    </ChapterSection>
  );
}
