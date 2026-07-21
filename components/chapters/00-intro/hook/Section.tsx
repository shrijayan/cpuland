"use client";

import { useRef } from "react";
import { ChapterSection } from "@/components/shared/ChapterSection";
import { Caption } from "@/components/shared/Caption";
import { CaptionLayer } from "@/components/shared/CaptionLayer";
import { HookDiagram } from "./Diagram";
import { useHookAnimation } from "./useAnimation";

export function HookSection() {
  const scope = useRef<HTMLElement>(null);
  useHookAnimation(scope);

  return (
    <ChapterSection ref={scope} className="bg-circuit">
      <HookDiagram />
      <CaptionLayer>
        <Caption>What actually happens when you press run?</Caption>
      </CaptionLayer>
    </ChapterSection>
  );
}
