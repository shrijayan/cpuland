"use client";

import { useRef } from "react";
import { ChapterSection } from "@/components/shared/ChapterSection";
import { Caption } from "@/components/shared/Caption";
import { CaptionLayer } from "@/components/shared/CaptionLayer";
import { PageFaultDemandPagingDiagram } from "./Diagram";
import { usePageFaultDemandPagingAnimation } from "./useAnimation";

export function PageFaultDemandPagingSection() {
  const scope = useRef<HTMLElement>(null);
  usePageFaultDemandPagingAnimation(scope);

  return (
    <ChapterSection ref={scope}>
      <PageFaultDemandPagingDiagram />
      <CaptionLayer>
        <Caption>Missing memory? Fault, fetch, retry.</Caption>
      </CaptionLayer>
    </ChapterSection>
  );
}
