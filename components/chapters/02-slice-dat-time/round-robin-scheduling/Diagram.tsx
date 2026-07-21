export const ROUND_ROBIN_PROCESS_COUNT = 3;

const VIEWBOX_WIDTH = 640;
const VIEWBOX_HEIGHT = 160;

const MARGIN_X = 20;
const ROW_Y = 24;
const ROW_HEIGHT = 40;
const SLIVER_WIDTH = 18;
const BLOCK_WIDTH =
  (VIEWBOX_WIDTH - MARGIN_X * 2 - ROUND_ROBIN_PROCESS_COUNT * SLIVER_WIDTH) /
  ROUND_ROBIN_PROCESS_COUNT;

/** Right edge of the last sliver — where the cycle repeats back to process 1. */
const ROW_END = MARGIN_X + ROUND_ROBIN_PROCESS_COUNT * (BLOCK_WIDTH + SLIVER_WIDTH);

const BRACKET_TICK = 6;
const TIMESLICE_BRACKET_Y = 80;
const TIMESLICE_TEXT_Y = 96;
const LATENCY_BRACKET_Y = 118;
const LATENCY_TEXT_Y = 138;

interface Segment {
  role: "run-block" | "sliver";
  index: number;
  x: number;
  width: number;
}

/**
 * Lays out one full scheduling cycle left-to-right: process-turn, scheduler
 * sliver, repeat — three times. Computed (not hardcoded per-rect) so the
 * geometry stays correct if `ROUND_ROBIN_PROCESS_COUNT` ever changes.
 */
function buildSegments(): Segment[] {
  const segments: Segment[] = [];
  let x = MARGIN_X;

  for (let i = 0; i < ROUND_ROBIN_PROCESS_COUNT; i++) {
    segments.push({ role: "run-block", index: i, x, width: BLOCK_WIDTH });
    x += BLOCK_WIDTH;
    segments.push({ role: "sliver", index: i, x, width: SLIVER_WIDTH });
    x += SLIVER_WIDTH;
  }

  return segments;
}

/** A "⊔"-shaped dimension bracket spanning [x1, x2], hanging just under `y`. */
function bracketPath(x1: number, x2: number, y: number) {
  return `M${x1},${y - BRACKET_TICK} L${x1},${y} L${x2},${y} L${x2},${y - BRACKET_TICK}`;
}

const SEGMENTS = buildSegments();

/**
 * The chapter's key diagram: a Gantt-style timeline of round-robin
 * scheduling. Three wide process run-blocks (`fill-user`) take turns
 * running, each handoff marked by a thin kernel-scheduler sliver
 * (`fill-ink-faint`). Two dimension brackets underneath name the durations
 * the article cares about — one process's timeslice, and the target
 * latency the full three-process cycle adds up to.
 */
export function RoundRobinDiagram() {
  return (
    <div className="flex h-full w-full items-center justify-center">
      <svg
        viewBox={`0 0 ${VIEWBOX_WIDTH} ${VIEWBOX_HEIGHT}`}
        className="w-[85%] max-w-2xl"
        aria-hidden
      >
        {SEGMENTS.map((segment) => (
          <rect
            key={`${segment.role}-${segment.index}`}
            data-role={segment.role}
            data-index={segment.index}
            x={segment.x}
            y={ROW_Y}
            width={segment.width}
            height={ROW_HEIGHT}
            rx="4"
            className={segment.role === "run-block" ? "fill-user" : "fill-ink-faint"}
          />
        ))}

        {SEGMENTS.filter((segment) => segment.role === "run-block").map((segment) => (
          <text
            key={`label-${segment.index}`}
            data-role="run-block-label"
            data-index={segment.index}
            x={segment.x + segment.width / 2}
            y={ROW_Y + ROW_HEIGHT / 2}
            textAnchor="middle"
            dominantBaseline="middle"
            className="fill-void font-mono text-[13px] font-bold"
          >
            P{segment.index + 1}
          </text>
        ))}

        <g data-role="timeslice-label">
          <path
            d={bracketPath(MARGIN_X, MARGIN_X + BLOCK_WIDTH, TIMESLICE_BRACKET_Y)}
            className="stroke-ink-faint"
            strokeWidth="1.5"
            fill="none"
          />
          <text
            x={MARGIN_X + BLOCK_WIDTH / 2}
            y={TIMESLICE_TEXT_Y}
            textAnchor="middle"
            className="fill-ink-dim font-mono text-[11px] tracking-wide"
          >
            timeslice (2ms)
          </text>
        </g>

        <g data-role="latency-label">
          <path
            d={bracketPath(MARGIN_X, ROW_END, LATENCY_BRACKET_Y)}
            className="stroke-ink-faint"
            strokeWidth="1.5"
            fill="none"
          />
          <text
            x={(MARGIN_X + ROW_END) / 2}
            y={LATENCY_TEXT_Y}
            textAnchor="middle"
            className="fill-ink-dim font-mono text-[11px] tracking-wide"
          >
            target latency (6ms)
          </text>
        </g>
      </svg>
    </div>
  );
}
