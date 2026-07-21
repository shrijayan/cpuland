"use client";

import { useRef } from "react";
import { ChapterSection } from "@/components/shared/ChapterSection";
import { Caption } from "@/components/shared/Caption";
import { CaptionLayer } from "@/components/shared/CaptionLayer";
import { MmuTranslationDiagram } from "./Diagram";
import { useMmuTranslationAnimation } from "./useAnimation";

export function MmuTranslationSection() {
  const scope = useRef<HTMLElement>(null);
  useMmuTranslationAnimation(scope);

  return (
    <ChapterSection ref={scope} className="bg-circuit">
      <MmuTranslationDiagram />
      <CaptionLayer>
        <Caption>Every address you use is a lie the MMU tells.</Caption>
      </CaptionLayer>
    </ChapterSection>
  );
}
