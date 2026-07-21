const VIEWBOX = { width: 560, height: 160 } as const;

/**
 * The bar is inset evenly from both viewBox edges, so its midpoint lands
 * exactly on the viewBox's own horizontal center — "split exactly at the
 * midpoint" falls out of the geometry instead of being a separately
 * chosen number.
 */
const BAR = { x: 20, y: 58, width: 520, height: 60 } as const;
const HALF_WIDTH = BAR.width / 2;
const BAR_CENTER_Y = BAR.y + BAR.height / 2;
const LABEL_Y = BAR.y - 18;

/** The one split point of the whole address space. */
export const MIDPOINT_X = BAR.x + HALF_WIDTH;

const USER_HALF_CENTER_X = BAR.x + HALF_WIDTH / 2;
const KERNEL_HALF_CENTER_X = MIDPOINT_X + HALF_WIDTH / 2;

export const DOT_RADIUS = 9;

/**
 * The dot starts dead center of user space — far enough from the
 * boundary that its later run at the kernel half reads as a real
 * approach, not a twitch.
 */
export const DOT_START = { cx: USER_HALF_CENTER_X, cy: BAR_CENTER_Y };

/**
 * One continuous address-space bar (no gap between its two rects, so it
 * reads as a single strip cut in half) — the left `data-role="user-half"`
 * and right `data-role="kernel-half"` share the same edge at
 * `MIDPOINT_X`. A `data-role="mode-dot"` (a stand-in for any memory
 * access) sits in user space; useAnimation sends it running at that
 * shared edge and bounces it back, and flashes the kernel half's border
 * danger-red at the instant of contact.
 */
export function HigherHalfKernelDiagram() {
  return (
    <div className="flex h-full w-full items-center justify-center">
      <svg
        viewBox={`0 0 ${VIEWBOX.width} ${VIEWBOX.height}`}
        className="w-[90%] max-w-2xl"
        aria-hidden
      >
        <rect
          data-role="user-half"
          x={BAR.x}
          y={BAR.y}
          width={HALF_WIDTH}
          height={BAR.height}
          className="fill-user stroke-ink-faint"
          strokeWidth="1.5"
          fillOpacity="0.12"
        />
        <rect
          data-role="kernel-half"
          x={MIDPOINT_X}
          y={BAR.y}
          width={HALF_WIDTH}
          height={BAR.height}
          className="fill-kernel stroke-ink-faint"
          strokeWidth="1.5"
          fillOpacity="0.12"
        />

        <text
          x={USER_HALF_CENTER_X}
          y={LABEL_Y}
          textAnchor="middle"
          className="fill-ink-dim font-mono text-[11px] tracking-wide"
        >
          USER SPACE
        </text>
        <text
          x={KERNEL_HALF_CENTER_X}
          y={LABEL_Y}
          textAnchor="middle"
          className="fill-ink-dim font-mono text-[11px] tracking-wide"
        >
          KERNEL SPACE
        </text>

        <circle
          data-role="mode-dot"
          cx={DOT_START.cx}
          cy={DOT_START.cy}
          r={DOT_RADIUS}
          className="fill-user"
        />
      </svg>
    </div>
  );
}
