"use client";

import { useRef } from "react";
import { ChapterSection } from "@/components/shared/ChapterSection";
import { Caption } from "@/components/shared/Caption";
import { CaptionLayer } from "@/components/shared/CaptionLayer";
import { ProgramHeaderTypesDiagram } from "./Diagram";
import { useProgramHeaderTypesAnimation } from "./useAnimation";

export function ProgramHeaderTypesSection() {
  const scope = useRef<HTMLElement>(null);
  useProgramHeaderTypesAnimation(scope);

  return (
    <ChapterSection ref={scope} className="flex items-center justify-center bg-circuit">
      <ProgramHeaderTypesDiagram />
      <CaptionLayer>
        <Caption>The header table says what to load, and where.</Caption>
      </CaptionLayer>
    </ChapterSection>
  );
}
