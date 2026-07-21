"use client";

import { useRef } from "react";
import { ChapterSection } from "@/components/shared/ChapterSection";
import { Caption } from "@/components/shared/Caption";
import { CaptionLayer } from "@/components/shared/CaptionLayer";
import { HardwareInterruptTimerDiagram } from "./Diagram";
import { useHardwareInterruptTimerAnimation } from "./useAnimation";

export function HardwareInterruptTimerSection() {
  const scope = useRef<HTMLElement>(null);
  useHardwareInterruptTimerAnimation(scope);

  return (
    <ChapterSection ref={scope} className="bg-circuit">
      <HardwareInterruptTimerDiagram />
      <CaptionLayer>
        <Caption>A timer chip interrupts, no matter what.</Caption>
      </CaptionLayer>
    </ChapterSection>
  );
}
