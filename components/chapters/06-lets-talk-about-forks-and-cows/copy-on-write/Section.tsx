"use client";

import { useRef } from "react";
import { ChapterSection } from "@/components/shared/ChapterSection";
import { Caption } from "@/components/shared/Caption";
import { CaptionLayer } from "@/components/shared/CaptionLayer";
import { CopyOnWriteDiagram } from "./Diagram";
import { useCopyOnWriteAnimation } from "./useAnimation";

export function CopyOnWriteSection() {
  const scope = useRef<HTMLElement>(null);
  useCopyOnWriteAnimation(scope);

  return (
    <ChapterSection ref={scope} className="flex items-center justify-center bg-circuit">
      <CopyOnWriteDiagram />
      <CaptionLayer>
        <Caption>Both share memory... until either one writes.</Caption>
      </CaptionLayer>
    </ChapterSection>
  );
}
