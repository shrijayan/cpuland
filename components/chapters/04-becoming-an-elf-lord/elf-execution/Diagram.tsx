import { MemoryTape } from "@/components/shared/diagrams/MemoryTape";

/** Same byte count MemoryTape renders — reused below to size the chip grid. */
export const ELF_EXECUTION_BYTE_COUNT = 6;

interface Segment {
  index: number;
  label: string;
  /** Byte cell (0-indexed, matches MemoryTape's own `data-index`) this segment lands on. */
  landingByte: number;
}

/**
 * `.text`, `.data`, `.bss` land on every other cell (1, 3, 5) — the gaps at
 * 0, 2, 4 read like the page-alignment padding real segments get between
 * each other in memory.
 */
const SEGMENTS: Segment[] = [
  { index: 0, label: ".text", landingByte: 1 },
  { index: 1, label: ".data", landingByte: 3 },
  { index: 2, label: ".bss", landingByte: 5 },
];

/** The entry point lives inside `.text` — the same byte cell it lands on. */
export const ENTRY_POINT_BYTE = SEGMENTS[0].landingByte;

const CHIP_CLASS =
  "border-ink-faint bg-surface-raised text-signal justify-self-center rounded-md border px-3 py-1.5 font-mono text-xs sm:px-4 sm:py-2 sm:text-sm";

/**
 * Three PT_LOAD segment chips sit above a 6-byte MemoryTape (reused as-is
 * from Ch.1). The chip row is a grid with the *same* column count as
 * MemoryTape has bytes, so each chip already lines up with its landing byte
 * through plain layout — useElfExecutionAnimation only has to drop each one
 * straight down (y + opacity), no x math required. MemoryTape's own pointer
 * then slides onto the `.text` cell (the entry point) to show the
 * fetch-execute loop (Ch.1) picking back up.
 */
export function ElfExecutionDiagram() {
  return (
    <div className="flex h-full w-full flex-col items-center justify-center gap-8 sm:gap-12">
      <div
        className="grid w-[85%] max-w-2xl"
        style={{ gridTemplateColumns: `repeat(${ELF_EXECUTION_BYTE_COUNT}, 1fr)` }}
      >
        {SEGMENTS.map((segment) => (
          <span
            key={segment.label}
            data-role="segment-chip"
            data-index={segment.index}
            style={{ gridColumnStart: segment.landingByte + 1 }}
            className={CHIP_CLASS}
          >
            {segment.label}
          </span>
        ))}
      </div>

      <MemoryTape byteCount={ELF_EXECUTION_BYTE_COUNT} className="w-[85%] max-w-2xl" />
    </div>
  );
}
