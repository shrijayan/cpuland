const VIEWBOX_WIDTH = 520;
const VIEWBOX_HEIGHT = 140;

const MARGIN_X = 16;
const BAR_Y = 26;
const BAR_HEIGHT = 46;
const BAR_WIDTH = VIEWBOX_WIDTH - MARGIN_X * 2;

/** A 4 KiB page needs 12 bits to index it, so that's how wide this slice is — everything else in the address is the (much wider) part the MMU rewrites. */
const OFFSET_WIDTH = 128;
const TRANSLATED_WIDTH = BAR_WIDTH - OFFSET_WIDTH;

const TRANSLATED_X = MARGIN_X;
const OFFSET_X = TRANSLATED_X + TRANSLATED_WIDTH;

const BRACKET_Y = BAR_Y + BAR_HEIGHT + 12;
const BRACKET_TICK = 6;
const LABEL_Y = BRACKET_Y + 16;
const LABEL_LINE_HEIGHT = 12;

interface Segment {
  role: "translated-bits" | "offset-bits";
  x: number;
  width: number;
  /** Pre-split so line breaks are chosen on purpose, not word-wrapped automatically. */
  lines: readonly string[];
}

const SEGMENTS: readonly Segment[] = [
  {
    role: "translated-bits",
    x: TRANSLATED_X,
    width: TRANSLATED_WIDTH,
    lines: ["translated by MMU"],
  },
  {
    role: "offset-bits",
    x: OFFSET_X,
    width: OFFSET_WIDTH,
    lines: ["page offset —", "12 bits, untouched"],
  },
];

/** A "⊔"-shaped dimension bracket spanning [x1, x2], hanging just under `y` (same shape as round-robin-scheduling's bracketPath). */
function bracketPath(x1: number, x2: number, y: number) {
  return `M${x1},${y - BRACKET_TICK} L${x1},${y} L${x2},${y} L${x2},${y - BRACKET_TICK}`;
}

/**
 * One continuous address bar (no gap between its two rects, so it reads as
 * a single strip of bits) sliced into the part the MMU rewrites and the
 * part it never touches. `translated-bits` is drawn as a plain neutral
 * block — useAnimation pulses its fill/stroke through kernel-purple to
 * show it passing through translation. `offset-bits` is drawn already
 * lit in steady user-teal, because those bottom 12 bits never change.
 * A small bracket + label sits under each segment, named to match.
 */
export function PageSizeBreakdownDiagram() {
  return (
    <div className="flex h-full w-full items-center justify-center">
      <svg
        viewBox={`0 0 ${VIEWBOX_WIDTH} ${VIEWBOX_HEIGHT}`}
        className="w-[90%] max-w-2xl"
        aria-hidden
      >
        <rect
          data-role="translated-bits"
          x={TRANSLATED_X}
          y={BAR_Y}
          width={TRANSLATED_WIDTH}
          height={BAR_HEIGHT}
          className="fill-surface-raised stroke-ink-faint"
          strokeWidth="1.5"
        />
        <rect
          data-role="offset-bits"
          x={OFFSET_X}
          y={BAR_Y}
          width={OFFSET_WIDTH}
          height={BAR_HEIGHT}
          className="fill-user stroke-user"
          strokeWidth="1.5"
          fillOpacity="0.18"
        />

        {SEGMENTS.map((segment, i) => {
          const x1 = segment.x;
          const x2 = segment.x + segment.width;
          const centerX = (x1 + x2) / 2;

          return (
            <g key={segment.role} data-role="segment-label" data-index={i}>
              <path
                d={bracketPath(x1, x2, BRACKET_Y)}
                className="stroke-ink-faint"
                strokeWidth="1.5"
                fill="none"
              />
              <text
                x={centerX}
                y={LABEL_Y}
                textAnchor="middle"
                className="fill-ink-dim font-mono text-[10px] tracking-wide"
              >
                {segment.lines.map((line, lineIndex) => (
                  <tspan key={line} x={centerX} dy={lineIndex === 0 ? 0 : LABEL_LINE_HEIGHT}>
                    {line}
                  </tspan>
                ))}
              </text>
            </g>
          );
        })}
      </svg>
    </div>
  );
}
