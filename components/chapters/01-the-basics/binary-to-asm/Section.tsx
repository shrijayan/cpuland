"use client";

import { useRef } from "react";
import { ChapterSection } from "@/components/shared/ChapterSection";
import { Caption } from "@/components/shared/Caption";
import { CaptionLayer } from "@/components/shared/CaptionLayer";
import { BinaryToAsmDiagram } from "./Diagram";
import { useBinaryToAsmAnimation } from "./useAnimation";

export function BinaryToAsmSection() {
  const scope = useRef<HTMLElement>(null);
  useBinaryToAsmAnimation(scope);

  return (
    <ChapterSection ref={scope} className="flex items-center justify-center bg-circuit">
      <BinaryToAsmDiagram />
      <CaptionLayer>
        <Caption>Machine code is just bytes. Assembly is bytes you can read.</Caption>
      </CaptionLayer>
    </ChapterSection>
  );
}
