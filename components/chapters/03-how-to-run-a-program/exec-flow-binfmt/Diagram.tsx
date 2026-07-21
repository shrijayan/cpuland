export const BINFMT_KEYS = ["script", "flat", "elf"] as const;
export const BINFMT_SUCCESS_INDEX = BINFMT_KEYS.length - 1;

const DIVIDER_X = 250;

const USER_BOX = { x: 40, y: 118, width: 170, height: 110 };
const USER_BOX_CENTER_X = USER_BOX.x + USER_BOX.width / 2;
const USER_BOX_CENTER_Y = USER_BOX.y + USER_BOX.height / 2;

const KEY_WIDTH = 130;
const KEY_HEIGHT = 40;
const KEY_X = 340;
const KEY_GAP = 20;
const KEY_START_Y = 66;
const KEY_CENTER_X = KEY_X + KEY_WIDTH / 2;

const LOCK_WIDTH = 70;
const LOCK_HEIGHT = 50;
const LOCK_X = KEY_X + (KEY_WIDTH - LOCK_WIDTH) / 2;
const LOCK_Y = KEY_START_Y + BINFMT_KEYS.length * (KEY_HEIGHT + KEY_GAP);

/** Top-left y of the Nth handler chip (script → flat → elf, stacked top to bottom). */
function keyY(index: number) {
  return KEY_START_Y + index * (KEY_HEIGHT + KEY_GAP);
}

/** Vertical gap between a handler's resting position and the lock it's tried against. */
export function keyTravelDistance(index: number) {
  return LOCK_Y - (keyY(index) + KEY_HEIGHT);
}

/**
 * Self-contained diagram (same approach as syscall-interrupt): one <svg>
 * holds the whole scene so the DrawSVG trace and the attr-tweened handler
 * chips can all be reached by plain data-role selectors, no per-element
 * refs. Handlers are stacked in try-order with the lock directly beneath
 * them, so "elf" (the one that fits) is already the closest to it.
 */
export function ExecFlowBinfmtDiagram() {
  return (
    <svg viewBox="0 0 560 320" className="h-[80vmin] w-full max-w-3xl" aria-hidden>
      {/* user space / kernel space divider */}
      <line
        x1={DIVIDER_X}
        y1="16"
        x2={DIVIDER_X}
        y2="304"
        className="stroke-ink-faint"
        strokeWidth="1.5"
        strokeDasharray="4 4"
      />
      <text
        x={USER_BOX_CENTER_X}
        y="30"
        textAnchor="middle"
        className="fill-ink-dim font-mono text-[11px] tracking-wide"
      >
        USER SPACE
      </text>
      <text
        x={KEY_CENTER_X}
        y="30"
        textAnchor="middle"
        className="fill-ink-dim font-mono text-[11px] tracking-wide"
      >
        KERNEL SPACE
      </text>

      {/* user space: the file, about to become a process */}
      <rect
        x={USER_BOX.x}
        y={USER_BOX.y}
        width={USER_BOX.width}
        height={USER_BOX.height}
        rx="12"
        className="fill-surface-raised stroke-ink-faint"
        strokeWidth="1.5"
      />
      <text
        x={USER_BOX_CENTER_X}
        y={USER_BOX.y + 40}
        textAnchor="middle"
        className="fill-ink-dim font-mono text-[13px]"
      >
        ./file.bin
      </text>
      <text
        x={USER_BOX_CENTER_X}
        y={USER_BOX.y + 76}
        textAnchor="middle"
        className="fill-user font-mono text-[15px]"
      >
        execve()
      </text>

      {/* the syscall crossing from user space into the kernel */}
      <line
        data-role="syscall-trace"
        x1={USER_BOX.x + USER_BOX.width}
        y1={USER_BOX_CENTER_Y}
        x2={KEY_X}
        y2={USER_BOX_CENTER_Y}
        className="stroke-signal"
        strokeWidth="2"
      />

      {/* kernel space: binfmt handlers, tried top to bottom in this order */}
      {BINFMT_KEYS.map((label, i) => (
        <g key={label} data-role="binfmt-key" data-index={i}>
          <rect
            x={KEY_X}
            y={keyY(i)}
            width={KEY_WIDTH}
            height={KEY_HEIGHT}
            rx="8"
            className="fill-surface-raised stroke-ink-faint"
            strokeWidth="1.5"
          />
          <text
            x={KEY_CENTER_X}
            y={keyY(i) + KEY_HEIGHT / 2 + 5}
            textAnchor="middle"
            className="fill-ink font-mono text-[13px]"
          >
            {label}
          </text>
        </g>
      ))}

      {/* the lock every handler is tried against */}
      <rect
        data-role="lock"
        x={LOCK_X}
        y={LOCK_Y}
        width={LOCK_WIDTH}
        height={LOCK_HEIGHT}
        rx="6"
        className="fill-surface-raised stroke-ink-faint"
        strokeWidth="1.5"
      />
    </svg>
  );
}
