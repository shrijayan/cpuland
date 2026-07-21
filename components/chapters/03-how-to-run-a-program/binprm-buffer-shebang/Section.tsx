"use client";

import { useRef } from "react";
import { ChapterSection } from "@/components/shared/ChapterSection";
import { Caption } from "@/components/shared/Caption";
import { CaptionLayer } from "@/components/shared/CaptionLayer";
import { BinprmBufferShebangDiagram } from "./Diagram";
import { useBinprmBufferShebangAnimation } from "./useAnimation";

export function BinprmBufferShebangSection() {
  const scope = useRef<HTMLElement>(null);
  useBinprmBufferShebangAnimation(scope);

  return (
    <ChapterSection ref={scope} className="bg-circuit">
      <BinprmBufferShebangDiagram />
      <CaptionLayer>
        <Caption>Only the first 256 bytes matter here.</Caption>
      </CaptionLayer>
    </ChapterSection>
  );
}
