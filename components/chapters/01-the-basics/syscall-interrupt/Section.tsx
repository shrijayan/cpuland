"use client";

import { useRef } from "react";
import { ChapterSection } from "@/components/shared/ChapterSection";
import { Caption } from "@/components/shared/Caption";
import { CaptionLayer } from "@/components/shared/CaptionLayer";
import { SyscallDiagram } from "./Diagram";
import { useSyscallAnimation } from "./useAnimation";

export function SyscallSection() {
  const scope = useRef<HTMLElement>(null);
  useSyscallAnimation(scope);

  return (
    <ChapterSection ref={scope} className="flex items-center justify-center bg-circuit">
      <SyscallDiagram />
      <CaptionLayer>
        <Caption>Need the kernel? Knock with an interrupt.</Caption>
      </CaptionLayer>
    </ChapterSection>
  );
}
