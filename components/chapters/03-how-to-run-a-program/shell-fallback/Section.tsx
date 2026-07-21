"use client";

import { useRef } from "react";
import { ChapterSection } from "@/components/shared/ChapterSection";
import { Caption } from "@/components/shared/Caption";
import { CaptionLayer } from "@/components/shared/CaptionLayer";
import { ShellFallbackDiagram } from "./Diagram";
import { useShellFallbackAnimation } from "./useAnimation";

export function ShellFallbackSection() {
  const scope = useRef<HTMLElement>(null);
  useShellFallbackAnimation(scope);

  return (
    <ChapterSection ref={scope} className="bg-circuit">
      <ShellFallbackDiagram />
      <CaptionLayer>
        <Caption>No shebang? Your shell just guesses: &ldquo;it&apos;s a script.&rdquo;</Caption>
      </CaptionLayer>
    </ChapterSection>
  );
}
