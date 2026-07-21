const CHAPTERS = [
  { n: 0, label: "Intro" },
  { n: 1, label: "Basics" },
  { n: 2, label: "Multitask" },
  { n: 3, label: "Exec" },
  { n: 4, label: "ELF" },
  { n: 5, label: "Paging" },
  { n: 6, label: "Fork" },
  { n: 7, label: "Epilogue" },
] as const;

const NODE_GAP = 108;
const MARGIN = 44;
const WIDTH = (CHAPTERS.length - 1) * NODE_GAP + MARGIN * 2;

/**
 * The 8-chapter roadmap, drawn as a spine with a node per chapter. The spine
 * "draws itself" (stroke-dashoffset trick, see useRoadmapAnimation) and
 * chapter 1's node ends up highlighted as "what's next."
 */
export function RoadmapDiagram() {
  return (
    <svg viewBox={`0 0 ${WIDTH} 150`} className="h-auto w-[92%] max-w-4xl" aria-hidden>
      <line
        x1={MARGIN}
        y1={60}
        x2={WIDTH - MARGIN}
        y2={60}
        data-role="spine"
        className="stroke-ink-faint"
        strokeWidth="2"
      />

      {CHAPTERS.map((c, i) => (
        <g
          key={c.n}
          data-role="node"
          data-index={i}
          transform={`translate(${MARGIN + i * NODE_GAP}, 60)`}
        >
          <circle r="20" className="fill-surface-raised stroke-user" strokeWidth="2" />
          <text
            textAnchor="middle"
            dominantBaseline="middle"
            className="fill-ink font-mono text-sm"
          >
            {c.n}
          </text>
          <text y="42" textAnchor="middle" className="fill-ink-dim font-mono text-[10px]">
            {c.label}
          </text>
        </g>
      ))}
    </svg>
  );
}
