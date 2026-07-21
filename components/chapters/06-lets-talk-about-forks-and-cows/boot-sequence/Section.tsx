"use client";

import { useRef } from "react";
import { ChapterSection } from "@/components/shared/ChapterSection";
import { Caption } from "@/components/shared/Caption";
import { CaptionLayer } from "@/components/shared/CaptionLayer";
import { BootSequenceDiagram } from "./Diagram";
import { useBootSequenceAnimation } from "./useAnimation";

export function BootSequenceSection() {
  const scope = useRef<HTMLElement>(null);
  useBootSequenceAnimation(scope);

  return (
    <ChapterSection ref={scope} className="flex items-center justify-center bg-circuit">
      <BootSequenceDiagram />
      <CaptionLayer>
        <Caption>Firmware, bootloader, kernel, then you.</Caption>
      </CaptionLayer>
    </ChapterSection>
  );
}
