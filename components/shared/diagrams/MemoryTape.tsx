interface MemoryTapeProps {
  byteCount?: number;
  className?: string;
}

const CELL = 56;
const GAP = 10;
const STEP = CELL + GAP;

/**
 * A horizontal strip of RAM byte-boxes with one instruction-pointer arrow,
 * the primitive behind the fetch-execute loop (Ch.1). Reused (zoomed/cropped
 * differently) for ELF segment loading (Ch.4) and page-table lookups (Ch.5).
 *
 * Each byte is `data-role="byte" data-index={i}` and the arrow is
 * `data-role="pointer"` — a scene's useAnimation hook selects these to
 * highlight a byte and slide the pointer across.
 */
export function MemoryTape({ byteCount = 6, className = "" }: MemoryTapeProps) {
  const width = byteCount * STEP - GAP;

  return (
    <svg viewBox={`0 0 ${width} 110`} className={className} aria-hidden>
      {Array.from({ length: byteCount }).map((_, i) => (
        <g key={i} data-role="byte" data-index={i} transform={`translate(${i * STEP}, 34)`}>
          <rect
            width={CELL}
            height={CELL}
            rx="8"
            className="fill-surface-raised stroke-ink-faint"
            strokeWidth="1.5"
          />
        </g>
      ))}

      <g data-role="pointer" transform={`translate(${CELL / 2}, 18)`}>
        <path d="M0 10 L-9 -6 L9 -6 Z" className="fill-signal" />
      </g>
    </svg>
  );
}

export const MEMORY_TAPE_STEP = STEP;
export const MEMORY_TAPE_CELL = CELL;
