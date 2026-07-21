interface MapIsland {
  label: string;
  cx: number;
  cy: number;
}

/**
 * The four sections a debugger actually cares about, drawn as "islands" on
 * a treasure map. Order matches data-index 0..3, which useAnimation reveals
 * one at a time.
 */
const MAP_ISLANDS: MapIsland[] = [
  { label: ".text", cx: 120, cy: 95 },
  { label: ".data", cx: 350, cy: 78 },
  { label: ".bss", cx: 150, cy: 218 },
  { label: ".shstrtab", cx: 335, cy: 222 },
];

const COMPASS_X = 425;
const COMPASS_Y = 240;
const COMPASS_R = 15;
const COMPASS_TICK_INNER = COMPASS_R - 6;
const COMPASS_TICK_OUTER = COMPASS_R + 6;

/**
 * The ELF section header table, reimagined as a treasure map: each section
 * name is an island to be found, and the compass rose is just flavor — a
 * debugger reads this table the same way a pirate reads a map, by name.
 */
export function SectionHeaderMapDiagram() {
  return (
    <div className="flex h-full w-full items-center justify-center">
      <svg viewBox="0 0 500 300" className="w-[85%] max-w-2xl" aria-hidden>
        <g data-role="map-bg">
          <rect
            x="30"
            y="25"
            width="440"
            height="250"
            rx="20"
            className="fill-surface stroke-ink-faint"
            strokeWidth="2"
            strokeDasharray="10 6"
          />

          <g data-role="compass">
            <circle
              cx={COMPASS_X}
              cy={COMPASS_Y}
              r={COMPASS_R}
              className="fill-surface stroke-ink-faint"
              strokeWidth="1.5"
            />
            <line
              x1={COMPASS_X}
              y1={COMPASS_Y - COMPASS_TICK_OUTER}
              x2={COMPASS_X}
              y2={COMPASS_Y - COMPASS_TICK_INNER}
              className="stroke-ink-dim"
              strokeWidth="2"
              strokeLinecap="round"
            />
            <line
              x1={COMPASS_X}
              y1={COMPASS_Y + COMPASS_TICK_INNER}
              x2={COMPASS_X}
              y2={COMPASS_Y + COMPASS_TICK_OUTER}
              className="stroke-ink-dim"
              strokeWidth="2"
              strokeLinecap="round"
            />
            <line
              x1={COMPASS_X - COMPASS_TICK_OUTER}
              y1={COMPASS_Y}
              x2={COMPASS_X - COMPASS_TICK_INNER}
              y2={COMPASS_Y}
              className="stroke-ink-dim"
              strokeWidth="2"
              strokeLinecap="round"
            />
            <line
              x1={COMPASS_X + COMPASS_TICK_INNER}
              y1={COMPASS_Y}
              x2={COMPASS_X + COMPASS_TICK_OUTER}
              y2={COMPASS_Y}
              className="stroke-ink-dim"
              strokeWidth="2"
              strokeLinecap="round"
            />
          </g>
        </g>

        {MAP_ISLANDS.map((island, index) => (
          <g key={island.label} data-role="map-label" data-index={index}>
            <ellipse
              cx={island.cx}
              cy={island.cy}
              rx="38"
              ry="20"
              className="fill-surface-raised stroke-ink-faint"
              strokeWidth="1.5"
            />
            <text
              x={island.cx}
              y={island.cy}
              textAnchor="middle"
              dominantBaseline="middle"
              className="fill-ink-dim font-mono text-[11px]"
            >
              {island.label}
            </text>
          </g>
        ))}
      </svg>
    </div>
  );
}
