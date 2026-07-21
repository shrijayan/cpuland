import { CpuChip } from "@/components/shared/diagrams/CpuChip";

/**
 * Ordering matches the `data-index` useClosingAnimation reveals them in —
 * one credits line fading in after the other.
 */
const CREDITS_LINES = [
  'Putting the "You" in CPU — Lexi Mattick & Hack Club',
  "Animated retelling",
] as const;

/**
 * The CPU chip that opened the whole story (Ch.0's hook) makes its last
 * appearance here, large and centered exactly as the hook left it — see
 * useClosingAnimation for the reverse zoom that pulls it back out before
 * the credits beneath it fade in.
 */
export function ClosingDiagram() {
  return (
    <div className="flex h-full w-full flex-col items-center justify-center gap-8">
      <CpuChip className="h-40 w-40 sm:h-56 sm:w-56" />

      <div className="flex flex-col items-center gap-1.5 text-center">
        {CREDITS_LINES.map((line, index) => (
          <p
            key={line}
            data-role="credits-line"
            data-index={index}
            className="font-mono text-xs text-ink-dim sm:text-sm"
          >
            {line}
          </p>
        ))}
      </div>
    </div>
  );
}
