const ELF_BLOCK_LABELS = [
  "ELF Header",
  "Program Header Table",
  "Section Header Table",
  "Data",
] as const;

export const ELF_BLOCK_COUNT = ELF_BLOCK_LABELS.length;
const DATA_BLOCK_INDEX = ELF_BLOCK_COUNT - 1;

/** PHT (1) and SHT (2) are the two blocks whose entries point into Data. */
const POINTER_SOURCE_INDICES = [1, 2] as const;
export const POINTER_ARROW_COUNT = POINTER_SOURCE_INDICES.length;

const VIEWBOX_WIDTH = 600;
const VIEWBOX_HEIGHT = 260;

const MARGIN_X = 24;
const GAP = 14;
const ROW_Y = 70;
const ROW_HEIGHT = 90;
const ROW_BOTTOM = ROW_Y + ROW_HEIGHT;

/** Data holds the actual bytes, so its column is drawn far wider than the 3 header blocks. */
const WIDTH_RATIOS = [1, 1, 1, 2.4];

const LABEL_LINE_HEIGHT = 12;

/** How far below the row each pointer arrow dips before rising back into Data. */
const ARROW_DIP = 84;
/** Where each pointer lands, as a fraction of the Data block's width from its left edge. */
const ARROW_TARGET_FRACTIONS = [0.22, 0.55] as const;

function round(value: number) {
  return Math.round(value * 1000) / 1000;
}

interface ElfBlock {
  index: number;
  label: string;
  x: number;
  width: number;
  centerX: number;
}

/**
 * Lays the 4 blocks out left-to-right from `WIDTH_RATIOS`, computed (not
 * hand-placed per block) so the geometry stays correct if a label or ratio
 * ever changes — same approach as round-robin-scheduling's `buildSegments`.
 */
function buildBlocks(): ElfBlock[] {
  const totalRatio = WIDTH_RATIOS.reduce((sum, ratio) => sum + ratio, 0);
  const totalGap = GAP * (ELF_BLOCK_COUNT - 1);
  const unitWidth = (VIEWBOX_WIDTH - MARGIN_X * 2 - totalGap) / totalRatio;

  let x = MARGIN_X;
  return ELF_BLOCK_LABELS.map((label, index) => {
    const width = round(WIDTH_RATIOS[index] * unitWidth);
    const block: ElfBlock = { index, label, x: round(x), width, centerX: round(x + width / 2) };
    x += width + GAP;
    return block;
  });
}

const BLOCKS = buildBlocks();
const DATA_BLOCK = BLOCKS[DATA_BLOCK_INDEX];

/**
 * A pointer arrow ducks below the row and rises back up into the Data
 * block — an "exploded view" of what the header table entry (`fromX`)
 * actually references inside the file's raw bytes (`toX`).
 */
function pointerPath(fromX: number, toX: number) {
  const midX = round((fromX + toX) / 2);
  return `M${fromX},${ROW_BOTTOM} Q${midX},${ROW_BOTTOM + ARROW_DIP} ${toX},${ROW_BOTTOM}`;
}

const POINTER_PATHS = POINTER_SOURCE_INDICES.map((sourceIndex, arrowIndex) =>
  pointerPath(
    BLOCKS[sourceIndex].centerX,
    round(DATA_BLOCK.x + DATA_BLOCK.width * ARROW_TARGET_FRACTIONS[arrowIndex]),
  ),
);

/**
 * The chapter's key diagram: every ELF binary boils down to the same 4
 * building blocks laid out back to back — a small ELF Header, a Program
 * Header Table and a Section Header Table (both just arrays of entries),
 * and a much wider Data block holding the actual bytes those entries
 * describe. Each block is a `<g data-role="elf-block">` (rect + label) so
 * useAnimation can fade+scale the whole unit in one tween. The two pointer
 * arrows are pre-drawn here as fixed geometry (`d` never changes) and are
 * only revealed later via DrawSVG in useAnimation.
 */
export function ElfFileStructureDiagram() {
  return (
    <svg
      viewBox={`0 0 ${VIEWBOX_WIDTH} ${VIEWBOX_HEIGHT}`}
      className="w-full max-w-2xl"
      aria-hidden
    >
      {BLOCKS.map((block) => {
        const isData = block.index === DATA_BLOCK_INDEX;
        const words = block.label.split(" ");

        return (
          <g key={block.index} data-role="elf-block" data-index={block.index}>
            <rect
              x={block.x}
              y={ROW_Y}
              width={block.width}
              height={ROW_HEIGHT}
              rx="8"
              className={isData ? "fill-user stroke-user" : "fill-surface-raised stroke-ink-faint"}
              fillOpacity={isData ? "0.12" : undefined}
              strokeWidth="1.5"
            />
            <text
              x={block.centerX}
              y={ROW_Y + ROW_HEIGHT / 2}
              textAnchor="middle"
              className="fill-ink font-mono text-[11px] tracking-wide"
            >
              {words.map((word, lineIndex) => (
                <tspan
                  key={word}
                  x={block.centerX}
                  dy={lineIndex === 0 ? -((words.length - 1) * LABEL_LINE_HEIGHT) / 2 : LABEL_LINE_HEIGHT}
                >
                  {word}
                </tspan>
              ))}
            </text>
          </g>
        );
      })}

      {POINTER_PATHS.map((d, i) => (
        <path
          key={`pointer-${i}`}
          data-role="pointer-arrow"
          data-index={i}
          d={d}
          className="stroke-signal"
          strokeWidth="2"
          fill="none"
        />
      ))}
    </svg>
  );
}
