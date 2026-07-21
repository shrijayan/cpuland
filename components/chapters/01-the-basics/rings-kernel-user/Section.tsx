"use client";

import { useRef } from "react";
import { ChapterSection } from "@/components/shared/ChapterSection";
import { Caption } from "@/components/shared/Caption";
import { CaptionLayer } from "@/components/shared/CaptionLayer";
import { RingsDiagram } from "./Diagram";
import { useRingsAnimation } from "./useAnimation";

export function RingsSection() {
  const scope = useRef<HTMLElement>(null);
  useRingsAnimation(scope);

  return (
    <ChapterSection ref={scope} className="bg-circuit">
      <RingsDiagram />
      <CaptionLayer>
        <Caption>Ring 0 can touch anything. Ring 3 can&rsquo;t touch much.</Caption>
      </CaptionLayer>
    </ChapterSection>
  );
}
