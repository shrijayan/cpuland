"use client";

import { useRef } from "react";
import { ChapterSection } from "@/components/shared/ChapterSection";
import { Caption } from "@/components/shared/Caption";
import { CaptionLayer } from "@/components/shared/CaptionLayer";
import { ProcessorsAreNaiveDiagram } from "./Diagram";
import { useProcessorsAreNaiveAnimation } from "./useAnimation";

export function ProcessorsAreNaiveSection() {
  const scope = useRef<HTMLElement>(null);
  useProcessorsAreNaiveAnimation(scope);

  return (
    <ChapterSection ref={scope} className="bg-circuit">
      <ProcessorsAreNaiveDiagram />
      <CaptionLayer>
        <Caption>The CPU only knows the next instruction. &ldquo;Processes&rdquo; don&rsquo;t exist to it.</Caption>
      </CaptionLayer>
    </ChapterSection>
  );
}
