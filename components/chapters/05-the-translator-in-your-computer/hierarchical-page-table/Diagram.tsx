const VIEWBOX = { width: 560, height: 400 };

/**
 * One entry per level of x86-64's 4-level page table tree, ordered top
 * (Level 4, indexed by the most-significant address bits) to bottom
 * (Level 1, right above the final 4 KiB page). Pairing each bit-group
 * label with its table-level label in one array — rather than two
 * separate label lists — makes it impossible for the top row and the
 * stack below it to drift out of sync in length.
 */
const LEVELS = [
  { bitGroupLabel: "L4 bits", tableLevelLabel: "Level 4" },
  { bitGroupLabel: "L3 bits", tableLevelLabel: "Level 3" },
  { bitGroupLabel: "L2 bits", tableLevelLabel: "Level 2" },
  { bitGroupLabel: "L1 bits", tableLevelLabel: "Level 1" },
] as const;

export const LEVEL_COUNT = LEVELS.length;
const LEVEL_INDICES = Array.from({ length: LEVEL_COUNT }, (_, i) => i);

/** One connector line between every *adjacent pair* of levels — always one fewer than the levels themselves. */
export const LEVEL_CONNECTOR_COUNT = LEVEL_COUNT - 1;
const LEVEL_CONNECTOR_INDICES = Array.from({ length: LEVEL_CONNECTOR_COUNT }, (_, i) => i);

// --- top row: the virtual address's bit groups, one per level ---
const ADDRESS_LABEL_Y = 14;
const BIT_GROUP_Y = 30;
const BIT_GROUP_HEIGHT = 32;
const BIT_GROUP_MARGIN_X = 30;
const BIT_GROUP_GAP = 20;
const BIT_GROUP_WIDTH =
  (VIEWBOX.width - BIT_GROUP_MARGIN_X * 2 - BIT_GROUP_GAP * (LEVEL_COUNT - 1)) / LEVEL_COUNT;
const BIT_GROUP_BOTTOM = BIT_GROUP_Y + BIT_GROUP_HEIGHT;

function bitGroupX(index: number) {
  return BIT_GROUP_MARGIN_X + index * (BIT_GROUP_WIDTH + BIT_GROUP_GAP);
}

function bitGroupCenterX(index: number) {
  return bitGroupX(index) + BIT_GROUP_WIDTH / 2;
}

// --- the tree itself: one box per level, stacked straight down the middle ---
const TABLE_LEVEL_WIDTH = 170;
const TABLE_LEVEL_HEIGHT = 40;
const TABLE_LEVEL_X = (VIEWBOX.width - TABLE_LEVEL_WIDTH) / 2;
const TABLE_LEVEL_CENTER_X = TABLE_LEVEL_X + TABLE_LEVEL_WIDTH / 2;

/** Gap between the bit-group row and the first table level — no connector is drawn here, it's just breathing room. */
const GAP_BEFORE_TABLE_STACK = 26;
const TABLE_LEVEL_START_Y = BIT_GROUP_BOTTOM + GAP_BEFORE_TABLE_STACK;

/** Vertical gap between one level and the next — exactly the length of that pair's connector line. */
const LEVEL_GAP = 26;
const LEVEL_STEP = TABLE_LEVEL_HEIGHT + LEVEL_GAP;

function tableLevelY(index: number) {
  return TABLE_LEVEL_START_Y + index * LEVEL_STEP;
}

function tableLevelCenterY(index: number) {
  return tableLevelY(index) + TABLE_LEVEL_HEIGHT / 2;
}

/** A straight vertical line from the bottom of one level to the top of the next. */
function levelConnectorPath(index: number) {
  const y1 = tableLevelY(index) + TABLE_LEVEL_HEIGHT;
  const y2 = tableLevelY(index + 1);
  return `M${TABLE_LEVEL_CENTER_X},${y1} L${TABLE_LEVEL_CENTER_X},${y2}`;
}

// --- the leaf: the actual 4 KiB page in RAM the whole tree resolves to ---
const RAM_PAGE_WIDTH = 130;
const RAM_PAGE_HEIGHT = 28;
const RAM_PAGE_X = (VIEWBOX.width - RAM_PAGE_WIDTH) / 2;
/** No connector line down to this one — it just pops into place once the tree's fully walked. */
const GAP_BEFORE_RAM_PAGE = 28;
const RAM_PAGE_Y = tableLevelY(LEVEL_COUNT - 1) + TABLE_LEVEL_HEIGHT + GAP_BEFORE_RAM_PAGE;
const RAM_PAGE_CENTER_Y = RAM_PAGE_Y + RAM_PAGE_HEIGHT / 2;

/**
 * x86-64's 4-level hierarchical page table, simplified to one box per
 * level: a row of 4 bit-group boxes stands in for the slices of a virtual
 * address (most-significant first, left to right), and below it the same
 * 4 levels stack top-to-bottom as single table boxes, joined by straight
 * connector lines, ending in one small "4 KiB page" box in RAM. useAnimation
 * walks down one level at a time — light the bit group that indexes it,
 * reveal its table box, draw the line to the next — so the tree appears to
 * grow exactly the way a real lookup would walk it.
 */
export function HierarchicalPageTableDiagram() {
  return (
    <div className="flex h-full w-full items-center justify-center">
      <svg
        viewBox={`0 0 ${VIEWBOX.width} ${VIEWBOX.height}`}
        className="h-[85vmin] w-full max-w-2xl"
        aria-hidden
      >
        <text
          x={VIEWBOX.width / 2}
          y={ADDRESS_LABEL_Y}
          textAnchor="middle"
          className="fill-ink-dim font-mono text-[11px] tracking-wide"
        >
          VIRTUAL ADDRESS
        </text>

        {LEVEL_INDICES.map((index) => (
          <g key={LEVELS[index].bitGroupLabel} data-role="bit-group" data-index={index}>
            <rect
              x={bitGroupX(index)}
              y={BIT_GROUP_Y}
              width={BIT_GROUP_WIDTH}
              height={BIT_GROUP_HEIGHT}
              rx="6"
              className="fill-surface-raised stroke-ink-faint"
              strokeWidth="1.5"
            />
            <text
              x={bitGroupCenterX(index)}
              y={BIT_GROUP_Y + BIT_GROUP_HEIGHT / 2 + 4}
              textAnchor="middle"
              className="fill-ink-dim font-mono text-[10px] tracking-wide"
            >
              {LEVELS[index].bitGroupLabel}
            </text>
          </g>
        ))}

        {LEVEL_CONNECTOR_INDICES.map((index) => (
          <path
            key={index}
            data-role="level-connector"
            data-index={index}
            d={levelConnectorPath(index)}
            className="stroke-signal"
            strokeWidth="2"
            fill="none"
          />
        ))}

        {LEVEL_INDICES.map((index) => (
          <g key={LEVELS[index].tableLevelLabel} data-role="table-level" data-index={index}>
            <rect
              x={TABLE_LEVEL_X}
              y={tableLevelY(index)}
              width={TABLE_LEVEL_WIDTH}
              height={TABLE_LEVEL_HEIGHT}
              rx="8"
              className="fill-surface-raised stroke-ink-faint"
              strokeWidth="1.5"
            />
            <text
              x={TABLE_LEVEL_CENTER_X}
              y={tableLevelCenterY(index) + 4}
              textAnchor="middle"
              className="fill-ink font-mono text-[13px] tracking-wide"
            >
              {LEVELS[index].tableLevelLabel}
            </text>
          </g>
        ))}

        <g data-role="ram-page">
          <rect
            x={RAM_PAGE_X}
            y={RAM_PAGE_Y}
            width={RAM_PAGE_WIDTH}
            height={RAM_PAGE_HEIGHT}
            rx="6"
            className="fill-surface-raised stroke-ink-faint"
            strokeWidth="1.5"
          />
          <text
            x={VIEWBOX.width / 2}
            y={RAM_PAGE_CENTER_Y + 4}
            textAnchor="middle"
            className="fill-ink-dim font-mono text-[10px] tracking-wide"
          >
            4 KiB page
          </text>
        </g>
      </svg>
    </div>
  );
}
