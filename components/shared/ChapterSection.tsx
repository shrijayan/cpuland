"use client";

import type { ReactNode, Ref } from "react";

interface ChapterSectionProps {
  ref?: Ref<HTMLElement>;
  children: ReactNode;
  className?: string;
}

/**
 * Full-viewport pin target for one scroll-scrubbed scene. `useScrollTimeline`
 * pins exactly this element and inserts the scroll runway after it — this
 * component just needs to stay exactly one screen tall with no margin.
 */
export function ChapterSection({ ref, children, className = "" }: ChapterSectionProps) {
  return (
    <section
      ref={ref}
      className={`relative h-screen w-full overflow-hidden bg-void ${className}`}
    >
      {children}
    </section>
  );
}
