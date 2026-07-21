export const BOOT_STAGES = ["Firmware", "Bootloader", "Kernel", "Init"] as const;

const BOX_WIDTH = 128;
const BOX_HEIGHT = 76;
const STAGE_GAP = 52;
const MARGIN_X = 44;
const VIEWBOX_HEIGHT = 176;
const BOX_Y = 76;
const BOX_CENTER_Y = BOX_Y + BOX_HEIGHT / 2;
const BATON_RADIUS = 8;
/** How far above the box row the baton floats, so it reads as its own token
 * rather than overlapping the stage labels. */
const BATON_OFFSET_Y = 28;

const ARROW_COUNT = BOOT_STAGES.length - 1;

/**
 * Center-to-center distance between consecutive stages. Every stage box is
 * the same width and evenly spaced, so this one number both lays out the
 * boxes below AND doubles as useAnimation's per-hop GSAP `x` (translateX)
 * step for the baton — same trick MemoryTape's instruction pointer uses.
 */
export const BOOT_STAGE_SPACING = BOX_WIDTH + STAGE_GAP;

const VIEWBOX_WIDTH = BOOT_STAGES.length * BOX_WIDTH + ARROW_COUNT * STAGE_GAP + MARGIN_X * 2;

/** Left edge x of the Nth stage box. */
function stageX(index: number) {
  return MARGIN_X + index * BOOT_STAGE_SPACING;
}

/** Horizontal center of the Nth stage box — the baton's resting spot. */
function stageCenterX(index: number) {
  return stageX(index) + BOX_WIDTH / 2;
}

/**
 * Four stage boxes (firmware -> bootloader -> kernel -> init) connected by
 * 3 arrows, with a small "baton" dot resting above the first box. The baton
 * is placed via plain SVG attrs (cx/cy) at stage 0's center; useAnimation
 * never touches those attrs again — it only tweens GSAP `x` (translateX) in
 * BOOT_STAGE_SPACING-sized hops, exactly like MemoryTape's pointer.
 */
export function BootSequenceDiagram() {
  return (
    <svg
      viewBox={`0 0 ${VIEWBOX_WIDTH} ${VIEWBOX_HEIGHT}`}
      className="h-auto w-[92%] max-w-3xl"
      aria-hidden
    >
      {Array.from({ length: ARROW_COUNT }).map((_, i) => (
        <line
          key={`arrow-${i}`}
          data-role="boot-arrow"
          data-index={i}
          x1={stageX(i) + BOX_WIDTH}
          y1={BOX_CENTER_Y}
          x2={stageX(i + 1)}
          y2={BOX_CENTER_Y}
          className="stroke-ink-faint"
          strokeWidth="2"
        />
      ))}

      {BOOT_STAGES.map((label, i) => (
        <g
          key={label}
          data-role="boot-stage"
          data-index={i}
          transform={`translate(${stageX(i)}, ${BOX_Y})`}
        >
          <rect
            width={BOX_WIDTH}
            height={BOX_HEIGHT}
            rx="12"
            className="fill-surface-raised stroke-ink-faint"
            strokeWidth="1.5"
          />
          <text
            x={BOX_WIDTH / 2}
            y={BOX_HEIGHT / 2 + 5}
            textAnchor="middle"
            className="fill-ink font-mono text-[13px]"
          >
            {label}
          </text>
        </g>
      ))}

      <circle
        data-role="baton"
        cx={stageCenterX(0)}
        cy={BOX_Y - BATON_OFFSET_Y}
        r={BATON_RADIUS}
        className="fill-signal"
      />
    </svg>
  );
}
