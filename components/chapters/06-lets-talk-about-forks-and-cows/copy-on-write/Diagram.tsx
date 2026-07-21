export const VIEWBOX = { width: 500, height: 320 };

const BOX_SIZE = { width: 130, height: 70 };
export const PARENT_BOX = { x: 60, y: 28, ...BOX_SIZE };
export const CHILD_BOX = { x: 310, y: 28, ...BOX_SIZE };

export const SHARED_MEMORY = { x: 170, y: 186, width: 160, height: 78 };

/**
 * Copy-on-write means the copy doesn't exist as its own block of memory
 * until the write actually happens — so it starts exactly stacked on top of
 * `SHARED_MEMORY` (invisible, opacity 0) and only slides out to its own
 * spot once useAnimation reveals it.
 */
export const COPIED_MEMORY_START = { x: SHARED_MEMORY.x, y: SHARED_MEMORY.y };
export const COPIED_MEMORY_END = { x: SHARED_MEMORY.x + 130, y: SHARED_MEMORY.y + 24 };

const LOCK_ICON_CENTER = { x: 250, y: 183 };
const WRITE_ICON_CENTER = {
  x: CHILD_BOX.x + CHILD_BOX.width + 20,
  y: CHILD_BOX.y + CHILD_BOX.height / 2,
};

function bottomCenter(box: { x: number; y: number; width: number; height: number }) {
  return { x: box.x + box.width / 2, y: box.y + box.height };
}

const SHARED_LEFT_ANCHOR = { x: SHARED_MEMORY.x + 40, y: SHARED_MEMORY.y };
const SHARED_RIGHT_ANCHOR = { x: SHARED_MEMORY.x + SHARED_MEMORY.width - 40, y: SHARED_MEMORY.y };

/** Both boxes "own" the same page — one converging line per box, index order matters for useAnimation's stagger. */
const OWNERSHIP_LINES = [
  { from: bottomCenter(PARENT_BOX), to: SHARED_LEFT_ANCHOR },
  { from: bottomCenter(CHILD_BOX), to: SHARED_RIGHT_ANCHOR },
] as const;

/**
 * Parent and child both point at one shared, locked page. useAnimation
 * draws that shared ownership in first, then a write from the child trips
 * the lock (a brief danger flash — standing in for the page-fault the CPU
 * actually raises on a write to a read-only COW page) and a private copy
 * peels off to sit beside the original, now unlocked on both sides.
 */
export function CopyOnWriteDiagram() {
  return (
    <svg
      viewBox={`0 0 ${VIEWBOX.width} ${VIEWBOX.height}`}
      className="h-auto w-[90%] max-w-2xl"
      aria-hidden
    >
      <rect
        data-role="parent-box"
        x={PARENT_BOX.x}
        y={PARENT_BOX.y}
        width={PARENT_BOX.width}
        height={PARENT_BOX.height}
        rx="12"
        className="fill-surface-raised stroke-ink-faint"
        strokeWidth="2"
      />
      <text
        x={PARENT_BOX.x + PARENT_BOX.width / 2}
        y={PARENT_BOX.y + PARENT_BOX.height / 2 + 5}
        textAnchor="middle"
        className="fill-ink font-mono text-[13px] tracking-wide"
      >
        parent
      </text>

      <rect
        data-role="child-box"
        x={CHILD_BOX.x}
        y={CHILD_BOX.y}
        width={CHILD_BOX.width}
        height={CHILD_BOX.height}
        rx="12"
        className="fill-surface-raised stroke-ink-faint"
        strokeWidth="2"
      />
      <text
        x={CHILD_BOX.x + CHILD_BOX.width / 2}
        y={CHILD_BOX.y + CHILD_BOX.height / 2 + 5}
        textAnchor="middle"
        className="fill-ink font-mono text-[13px] tracking-wide"
      >
        child
      </text>

      {OWNERSHIP_LINES.map((line, i) => (
        <line
          key={i}
          data-role="ownership-line"
          data-index={i}
          x1={line.from.x}
          y1={line.from.y}
          x2={line.to.x}
          y2={line.to.y}
          className="stroke-ink-dim"
          strokeWidth="2"
          strokeLinecap="round"
        />
      ))}

      <rect
        data-role="shared-memory"
        x={SHARED_MEMORY.x}
        y={SHARED_MEMORY.y}
        width={SHARED_MEMORY.width}
        height={SHARED_MEMORY.height}
        rx="10"
        className="fill-surface-raised stroke-ink-faint"
        strokeWidth="2"
      />
      <text
        x={SHARED_MEMORY.x + SHARED_MEMORY.width / 2}
        y={SHARED_MEMORY.y + SHARED_MEMORY.height / 2 + 5}
        textAnchor="middle"
        className="fill-ink-dim font-mono text-[11px] tracking-wide"
      >
        shared page
      </text>

      {/* Starts stacked exactly on shared-memory (opacity 0 via useAnimation's initial gsap.set) — see COPIED_MEMORY_START. */}
      <rect
        data-role="copied-memory"
        x={COPIED_MEMORY_START.x}
        y={COPIED_MEMORY_START.y}
        width={SHARED_MEMORY.width}
        height={SHARED_MEMORY.height}
        rx="10"
        className="fill-surface-raised stroke-user"
        strokeWidth="2"
      />
      <text
        x={COPIED_MEMORY_END.x + SHARED_MEMORY.width / 2}
        y={COPIED_MEMORY_END.y + SHARED_MEMORY.height / 2 + 5}
        textAnchor="middle"
        className="fill-user font-mono text-[11px] tracking-wide"
      >
        private copy
      </text>

      {/* Padlock: shackle (circle) half-hidden behind the body (rect) drawn on top of it. */}
      <g data-role="lock-icon" transform={`translate(${LOCK_ICON_CENTER.x} ${LOCK_ICON_CENTER.y})`}>
        <circle cx="0" cy="-5" r="6" fill="none" className="stroke-kernel" strokeWidth="3" />
        <rect x="-9" y="-2" width="18" height="13" rx="2" className="fill-kernel" />
        <circle cx="0" cy="4.5" r="1.6" className="fill-surface" />
      </g>

      {/* Pen: cap + shaft (rects) and a triangular nib (polygon), hidden initially via useAnimation. */}
      <g
        data-role="write-icon"
        transform={`translate(${WRITE_ICON_CENTER.x} ${WRITE_ICON_CENTER.y}) rotate(35)`}
      >
        <rect x="-5" y="-17" width="10" height="5" rx="1" className="fill-ink-dim" />
        <rect x="-4" y="-13" width="8" height="17" rx="1.5" className="fill-signal" />
        <polygon points="-4,4 4,4 0,13" className="fill-signal" />
      </g>
    </svg>
  );
}
