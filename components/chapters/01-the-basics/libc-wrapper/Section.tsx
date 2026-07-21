"use client";

import { useRef } from "react";
import { ChapterSection } from "@/components/shared/ChapterSection";
import { Caption } from "@/components/shared/Caption";
import { CaptionLayer } from "@/components/shared/CaptionLayer";
import { LibcWrapperDiagram } from "./Diagram";
import { useLibcWrapperAnimation } from "./useAnimation";

export function LibcWrapperSection() {
  const scope = useRef<HTMLElement>(null);
  useLibcWrapperAnimation(scope);

  return (
    <ChapterSection ref={scope} className="bg-circuit">
      <LibcWrapperDiagram />
      <CaptionLayer>
        <Caption>Libraries hide the knock for you.</Caption>
      </CaptionLayer>
    </ChapterSection>
  );
}
