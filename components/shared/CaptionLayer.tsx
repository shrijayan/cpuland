import type { ReactNode } from "react";

/**
 * Positions one or more <Caption> beats so they all occupy the exact same
 * spot (via a shared grid-area), letting a scene cross-fade between them
 * with opacity alone — no layout shift when the text changes mid-scroll.
 */
export function CaptionLayer({ children }: { children: ReactNode }) {
  return (
    <div className="pointer-events-none absolute inset-x-0 bottom-0 z-10 p-6 sm:p-10 md:p-14">
      <div className="grid *:col-start-1 *:row-start-1">{children}</div>
    </div>
  );
}
