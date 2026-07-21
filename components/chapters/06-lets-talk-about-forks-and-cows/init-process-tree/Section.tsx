"use client";

import { useRef } from "react";
import { ChapterSection } from "@/components/shared/ChapterSection";
import { Caption } from "@/components/shared/Caption";
import { CaptionLayer } from "@/components/shared/CaptionLayer";
import { InitProcessTreeDiagram } from "./Diagram";
import { useInitProcessTreeAnimation } from "./useAnimation";

export function InitProcessTreeSection() {
  const scope = useRef<HTMLElement>(null);
  useInitProcessTreeAnimation(scope);

  return (
    <ChapterSection ref={scope} className="flex items-center justify-center bg-circuit">
      <InitProcessTreeDiagram />
      <CaptionLayer>
        <Caption>One process started it all: init.</Caption>
      </CaptionLayer>
    </ChapterSection>
  );
}
