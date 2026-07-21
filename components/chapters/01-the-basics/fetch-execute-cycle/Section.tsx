"use client";

import { useRef } from "react";
import { ChapterSection } from "@/components/shared/ChapterSection";
import { Caption } from "@/components/shared/Caption";
import { CaptionLayer } from "@/components/shared/CaptionLayer";
import { FetchExecuteDiagram } from "./Diagram";
import { useFetchExecuteAnimation } from "./useAnimation";

export function FetchExecuteSection() {
  const scope = useRef<HTMLElement>(null);
  useFetchExecuteAnimation(scope);

  return (
    <ChapterSection ref={scope} className="bg-circuit">
      <FetchExecuteDiagram />
      <CaptionLayer>
        <Caption beat="fetch">Fetch: read the next instruction.</Caption>
        <Caption beat="execute">Execute it. Then move on.</Caption>
        <Caption beat="repeat">Repeat. Forever.</Caption>
      </CaptionLayer>
    </ChapterSection>
  );
}
