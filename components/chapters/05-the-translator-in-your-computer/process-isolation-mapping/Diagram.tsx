export const PROCESS_COUNT = 2;
const PROCESS_INDICES = Array.from({ length: PROCESS_COUNT }, (_, i) => i);
const PROCESS_LABELS = ["Process A", "Process B"] as const;

/**
 * The virtual address both processes use — identical on purpose, straight
 * from the source article's own example (devxdocs/content/raw/
 * 05-the-translator-in-your-computer.md): "process A can have its code and
 * data at 0x400000, and process B can access its code and data from the
 * very same address."
 */
const VIRTUAL_ADDRESS = "0x400000";

const VIEWBOX = { width: 520, height: 300 };

const PROCESS_BOX = { width: 130, height: 66 };
const PROCESS_BOX_Y = 22;
const PROCESS_BOX_GAP = 20;
const PROCESS_BOX_BOTTOM_Y = PROCESS_BOX_Y + PROCESS_BOX.height;
const PROCESS_BOX_CENTER_Y = PROCESS_BOX_Y + PROCESS_BOX.height / 2;
const PROCESS_LABEL_Y = PROCESS_BOX_CENTER_Y - 11;
const PROCESS_ADDRESS_Y = PROCESS_BOX_CENTER_Y + 15;

/** The pair sits centered as one unit, close together, so they read as
 * "both claiming the same address" before anything else happens. */
const PROCESS_PAIR_WIDTH =
  PROCESS_COUNT * PROCESS_BOX.width + (PROCESS_COUNT - 1) * PROCESS_BOX_GAP;
const PROCESS_PAIR_START_X = (VIEWBOX.width - PROCESS_PAIR_WIDTH) / 2;

function processBoxX(index: number) {
  return PROCESS_PAIR_START_X + index * (PROCESS_BOX.width + PROCESS_BOX_GAP);
}

function processBoxCenterX(index: number) {
  return processBoxX(index) + PROCESS_BOX.width / 2;
}

/**
 * Physical memory: a row of small cells, the same visual language as the
 * shared MemoryTape primitive, but drawn inline here (not reused) so its
 * cells share one coordinate space with the process boxes above and the
 * map-arrow paths between them.
 */
export const STRIP_CELL_COUNT = 10;
const STRIP_CELL_INDICES = Array.from({ length: STRIP_CELL_COUNT }, (_, i) => i);
const STRIP_CELL = { width: 38, height: 40 };
const STRIP_GAP = 8;
const STRIP_STEP = STRIP_CELL.width + STRIP_GAP;
const STRIP_WIDTH = STRIP_CELL_COUNT * STRIP_CELL.width + (STRIP_CELL_COUNT - 1) * STRIP_GAP;
const STRIP_X = (VIEWBOX.width - STRIP_WIDTH) / 2;
const STRIP_Y = 232;
const STRIP_LABEL_Y = STRIP_Y - 14;

function stripCellX(index: number) {
  return STRIP_X + index * STRIP_STEP;
}

function stripCellCenterX(index: number) {
  return stripCellX(index) + STRIP_CELL.width / 2;
}

/**
 * Which physical cell each process's identical virtual address actually
 * resolves to — deliberately far apart, so the two map-arrows visibly
 * diverge instead of landing on top of each other.
 */
export const MAP_TARGET_CELL_INDEX = [2, 7] as const;

/** How far sideways each map-arrow's curve bulges away from a straight
 * line — in the same direction it's already travelling, so the pair reads
 * as fanning apart rather than as two parallel drops. */
const ARROW_CURVE_BULGE = 26;

function round(value: number) {
  return Math.round(value * 1000) / 1000;
}

/** A gently curved connector from a process box's bottom edge down to the
 * top edge of its mapped strip cell. */
function mapArrowPath(processIndex: number) {
  const fromX = processBoxCenterX(processIndex);
  const fromY = PROCESS_BOX_BOTTOM_Y;
  const toX = stripCellCenterX(MAP_TARGET_CELL_INDEX[processIndex]);
  const toY = STRIP_Y;

  const midY = round((fromY + toY) / 2);
  const bulge = Math.sign(toX - fromX) * ARROW_CURVE_BULGE;
  const controlX = round((fromX + toX) / 2 + bulge);

  return `M${fromX},${fromY} Q${controlX},${midY} ${toX},${toY}`;
}

/**
 * Two identical-looking process boxes both claim virtual address
 * `0x400000` — straight from the source article's own example. Below
 * them, one physical-memory strip stands in for all of RAM. A
 * `data-role="map-arrow"` path per process (index-matched) curves down
 * from its box to a different `data-role="strip-cell"`, so useAnimation
 * can draw each one with DrawSVG and light up only the cell it actually
 * lands on — the same address, resolved to two very different places.
 */
export function ProcessIsolationMappingDiagram() {
  return (
    <div className="flex h-full w-full items-center justify-center">
      <svg
        viewBox={`0 0 ${VIEWBOX.width} ${VIEWBOX.height}`}
        className="h-[80vmin] w-full max-w-2xl"
        aria-hidden
      >
        {PROCESS_INDICES.map((index) => {
          const x = processBoxX(index);
          const centerX = processBoxCenterX(index);

          return (
            <g key={index} data-role="process-box" data-index={index}>
              <rect
                x={x}
                y={PROCESS_BOX_Y}
                width={PROCESS_BOX.width}
                height={PROCESS_BOX.height}
                rx="12"
                className="fill-surface-raised stroke-ink-faint"
                strokeWidth="1.5"
              />
              <text
                x={centerX}
                y={PROCESS_LABEL_Y}
                textAnchor="middle"
                className="fill-ink-dim font-mono text-[11px] tracking-wide"
              >
                {PROCESS_LABELS[index]}
              </text>
              <text
                x={centerX}
                y={PROCESS_ADDRESS_Y}
                textAnchor="middle"
                className="fill-user font-mono text-sm"
              >
                {VIRTUAL_ADDRESS}
              </text>
            </g>
          );
        })}

        <text
          x={VIEWBOX.width / 2}
          y={STRIP_LABEL_Y}
          textAnchor="middle"
          className="fill-ink-dim font-mono text-[11px] tracking-wide"
        >
          PHYSICAL MEMORY
        </text>

        {STRIP_CELL_INDICES.map((index) => (
          <g key={index} data-role="strip-cell" data-index={index}>
            <rect
              x={stripCellX(index)}
              y={STRIP_Y}
              width={STRIP_CELL.width}
              height={STRIP_CELL.height}
              rx="6"
              className="fill-surface-raised stroke-ink-faint"
              strokeWidth="1.5"
            />
          </g>
        ))}

        {PROCESS_INDICES.map((index) => (
          <path
            key={index}
            data-role="map-arrow"
            data-index={index}
            d={mapArrowPath(index)}
            className="stroke-signal"
            strokeWidth="2"
            fill="none"
          />
        ))}
      </svg>
    </div>
  );
}
