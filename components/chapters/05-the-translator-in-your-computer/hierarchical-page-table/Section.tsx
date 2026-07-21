"use client";

import { useRef } from "react";
import { ChapterSection } from "@/components/shared/ChapterSection";
import { Caption } from "@/components/shared/Caption";
import { CaptionLayer } from "@/components/shared/CaptionLayer";
import { HierarchicalPageTableDiagram } from "./Diagram";
import { useHierarchicalPageTableAnimation } from "./useAnimation";

export function HierarchicalPageTableSection() {
  const scope = useRef<HTMLElement>(null);
  useHierarchicalPageTableAnimation(scope);

  return (
    <ChapterSection ref={scope} className="flex items-center justify-center bg-circuit">
      <HierarchicalPageTableDiagram />
      <CaptionLayer>
        <Caption>A 4-level tree, so empty memory costs nothing.</Caption>
      </CaptionLayer>
    </ChapterSection>
  );
}
