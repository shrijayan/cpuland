"use client";

import { useRef } from "react";
import { ChapterSection } from "@/components/shared/ChapterSection";
import { Caption } from "@/components/shared/Caption";
import { CaptionLayer } from "@/components/shared/CaptionLayer";
import { StaticVsDynamicLinkingDiagram } from "./Diagram";
import { useStaticVsDynamicLinkingAnimation } from "./useAnimation";

export function StaticVsDynamicLinkingSection() {
  const scope = useRef<HTMLElement>(null);
  useStaticVsDynamicLinkingAnimation(scope);

  return (
    <ChapterSection ref={scope} className="bg-circuit">
      <StaticVsDynamicLinkingDiagram />
      <CaptionLayer>
        <Caption beat="static">Copy the library in...</Caption>
        <Caption beat="dynamic">...or borrow it live.</Caption>
      </CaptionLayer>
    </ChapterSection>
  );
}
