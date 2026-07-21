import type { ReactNode } from "react";

interface CaptionProps {
  /**
   * Identifies this caption beat for GSAP targeting (e.g. `gsap.to('[data-beat="fetch"]', ...)`).
   * Omit only for a scene with a single, unchanging caption.
   */
  beat?: string;
  className?: string;
  children: ReactNode;
}

/**
 * The one-or-two-line caption used by every scene. A scene's useAnimation
 * hook owns showing/hiding it (opacity, targeted via data-beat) — this
 * component only owns consistent typography, so caption text never grows
 * into a paragraph by accident.
 */
export function Caption({ beat, className = "", children }: CaptionProps) {
  return (
    <p
      data-beat={beat}
      className={`max-w-[34ch] text-balance font-sans text-xl leading-snug font-medium text-ink sm:text-2xl ${className}`}
    >
      {children}
    </p>
  );
}
