"use client";

import { useRef } from "react";
import { ChapterSection } from "@/components/shared/ChapterSection";
import { Caption } from "@/components/shared/Caption";
import { CaptionLayer } from "@/components/shared/CaptionLayer";
import { SingleCoreProblemDiagram } from "./Diagram";
import { useSingleCoreProblemAnimation } from "./useAnimation";

export function SingleCoreProblemSection() {
  const scope = useRef<HTMLElement>(null);
  useSingleCoreProblemAnimation(scope);

  return (
    <ChapterSection ref={scope} className="flex items-center justify-center bg-circuit">
      <SingleCoreProblemDiagram />
      <CaptionLayer>
        <Caption>One CPU core. Many programs. A trick is needed.</Caption>
      </CaptionLayer>
    </ChapterSection>
  );
}
