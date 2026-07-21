"use client";

import { useRef } from "react";
import { ChapterSection } from "@/components/shared/ChapterSection";
import { Caption } from "@/components/shared/Caption";
import { CaptionLayer } from "@/components/shared/CaptionLayer";
import { ExecFlowBinfmtDiagram } from "./Diagram";
import { useExecFlowBinfmtAnimation } from "./useAnimation";

export function ExecFlowBinfmtSection() {
  const scope = useRef<HTMLElement>(null);
  useExecFlowBinfmtAnimation(scope);

  return (
    <ChapterSection ref={scope} className="flex items-center justify-center bg-circuit">
      <ExecFlowBinfmtDiagram />
      <CaptionLayer>
        <Caption>The kernel tries format after format until one fits.</Caption>
      </CaptionLayer>
    </ChapterSection>
  );
}
