"use client";

import { useRef } from "react";
import { ChapterSection } from "@/components/shared/ChapterSection";
import { Caption } from "@/components/shared/Caption";
import { CaptionLayer } from "@/components/shared/CaptionLayer";
import { ShebangArgvRewriteDiagram } from "./Diagram";
import { useShebangArgvRewriteAnimation } from "./useAnimation";

export function ShebangArgvRewriteSection() {
  const scope = useRef<HTMLElement>(null);
  useShebangArgvRewriteAnimation(scope);

  return (
    <ChapterSection ref={scope} className="bg-circuit">
      <ShebangArgvRewriteDiagram />
      <CaptionLayer>
        <Caption>Scripts quietly rewrite their own arguments.</Caption>
      </CaptionLayer>
    </ChapterSection>
  );
}
