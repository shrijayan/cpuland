"use client";

import { useRef } from "react";
import { ChapterSection } from "@/components/shared/ChapterSection";
import { Caption } from "@/components/shared/Caption";
import { CaptionLayer } from "@/components/shared/CaptionLayer";
import { SectionHeaderMapDiagram } from "./Diagram";
import { useSectionHeaderMapAnimation } from "./useAnimation";

export function SectionHeaderMapSection() {
  const scope = useRef<HTMLElement>(null);
  useSectionHeaderMapAnimation(scope);

  return (
    <ChapterSection ref={scope} className="bg-circuit">
      <SectionHeaderMapDiagram />
      <CaptionLayer>
        <Caption>The section table is a map, mostly for debuggers.</Caption>
      </CaptionLayer>
    </ChapterSection>
  );
}
