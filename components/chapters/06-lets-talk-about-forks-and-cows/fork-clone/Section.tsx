"use client";

import { useRef } from "react";
import { ChapterSection } from "@/components/shared/ChapterSection";
import { Caption } from "@/components/shared/Caption";
import { CaptionLayer } from "@/components/shared/CaptionLayer";
import { ForkCloneDiagram } from "./Diagram";
import { useForkCloneAnimation } from "./useAnimation";

export function ForkCloneSection() {
  const scope = useRef<HTMLElement>(null);
  useForkCloneAnimation(scope);

  return (
    <ChapterSection ref={scope} className="bg-circuit">
      <ForkCloneDiagram />
      <CaptionLayer>
        <Caption>fork() clones a process. Now there are two.</Caption>
      </CaptionLayer>
    </ChapterSection>
  );
}
