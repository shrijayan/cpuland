const BUF_BYTE_COUNT = 10;
const OVERFLOW_BYTE_COUNT = 6;

const CELL = 40;
const GAP = 8;
const STEP = CELL + GAP;

const WIDTH = (BUF_BYTE_COUNT + OVERFLOW_BYTE_COUNT) * STEP - GAP;
const CELL_Y = 60;
const BOUNDARY_X = BUF_BYTE_COUNT * STEP - GAP / 2;

/**
 * A longer byte-strip than MemoryTape (16 boxes, standing in for a whole
 * file) split into two labeled groups: `buf-byte` (the kernel's 256-byte
 * `bprm_buf`, indices 0-9) and `overflow-byte` (everything past it, indices
 * 0-5). useBinprmBufferShebangAnimation lights up only the first group and
 * pushes the second toward the edge, so the 256-byte cutoff reads visually
 * without either group needing per-byte text.
 */
export function BinprmBufferShebangDiagram() {
  return (
    <div className="flex h-full w-full items-center justify-center">
      <svg viewBox={`0 0 ${WIDTH} 150`} className="w-[92%] max-w-4xl" aria-hidden>
        <line
          x1={BOUNDARY_X}
          y1={CELL_Y - 10}
          x2={BOUNDARY_X}
          y2={CELL_Y + CELL + 10}
          className="stroke-ink-faint"
          strokeWidth="1.5"
          strokeDasharray="4 4"
        />

        {Array.from({ length: BUF_BYTE_COUNT }).map((_, i) => (
          <g
            key={`buf-${i}`}
            data-role="buf-byte"
            data-index={i}
            transform={`translate(${i * STEP}, ${CELL_Y})`}
          >
            <rect
              width={CELL}
              height={CELL}
              rx="6"
              className="fill-surface-raised stroke-ink-faint"
              strokeWidth="1.5"
            />
          </g>
        ))}

        {Array.from({ length: OVERFLOW_BYTE_COUNT }).map((_, i) => (
          <g
            key={`overflow-${i}`}
            data-role="overflow-byte"
            data-index={i}
            transform={`translate(${(BUF_BYTE_COUNT + i) * STEP}, ${CELL_Y})`}
          >
            <rect
              width={CELL}
              height={CELL}
              rx="6"
              className="fill-surface-raised stroke-ink-faint"
              strokeWidth="1.5"
            />
          </g>
        ))}

        <text
          x={(BUF_BYTE_COUNT * STEP - GAP) / 2}
          y={30}
          textAnchor="middle"
          className="fill-ink-dim font-mono text-[13px] tracking-[0.2em] uppercase"
        >
          buf
        </text>

        <text
          data-role="overflow-label"
          x={BUF_BYTE_COUNT * STEP + (OVERFLOW_BYTE_COUNT * STEP - GAP) / 2}
          y={132}
          textAnchor="middle"
          className="fill-ink-faint font-mono text-[11px] tracking-[0.1em] uppercase"
        >
          ignored, past 256 bytes
        </text>
      </svg>
    </div>
  );
}
