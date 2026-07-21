"use client";

import { useRef } from "react";
import { ChapterSection } from "@/components/shared/ChapterSection";
import { Caption } from "@/components/shared/Caption";
import { CaptionLayer } from "@/components/shared/CaptionLayer";
import { ElfFileStructureDiagram } from "./Diagram";
import { useElfFileStructureAnimation } from "./useAnimation";

export function ElfFileStructureSection() {
  const scope = useRef<HTMLElement>(null);
  useElfFileStructureAnimation(scope);

  return (
    <ChapterSection ref={scope} className="flex items-center justify-center bg-circuit">
      <ElfFileStructureDiagram />
      <CaptionLayer>
        <Caption>Every binary has the same 4 building blocks.</Caption>
      </CaptionLayer>
    </ChapterSection>
  );
}
