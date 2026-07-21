interface LoopNode {
  label: string;
  angleDeg: number;
}

/**
 * The four steps of the preemption cycle, placed clockwise starting at the
 * top so their index order (0 -> 1 -> 2 -> 3) matches the direction
 * `loop-path` below draws in: set timer, run program, timer fires, switch.
 */
export const LOOP_NODES: readonly LoopNode[] = [
  { label: "Set Timer", angleDeg: 270 },
  { label: "Run Program", angleDeg: 0 },
  { label: "Timer Fires", angleDeg: 90 },
  { label: "Switch", angleDeg: 180 },
];

export const LOOP_CENTER = { x: 160, y: 160 };
export const LOOP_RADIUS = 110;
const NODE_RADIUS = 34;
const NODE_LABEL_LINE_HEIGHT = 12;

function round(value: number) {
  return Math.round(value * 1000) / 1000;
}

function pointOnLoop(angleDeg: number) {
  const angleRad = (angleDeg * Math.PI) / 180;
  return {
    x: round(LOOP_CENTER.x + LOOP_RADIUS * Math.cos(angleRad)),
    y: round(LOOP_CENTER.y + LOOP_RADIUS * Math.sin(angleRad)),
  };
}

/**
 * One full circle traced as two semicircle arcs, starting at the top node
 * so the draw sweeps clockwise through node 0 -> 1 -> 2 -> 3 and back to
 * node 0 — the same order the timer/run/fire/switch story happens in.
 */
function buildLoopPath() {
  const top = pointOnLoop(270);
  const bottom = pointOnLoop(90);
  return [
    `M${top.x},${top.y}`,
    `A${LOOP_RADIUS},${LOOP_RADIUS} 0 1 1 ${bottom.x},${bottom.y}`,
    `A${LOOP_RADIUS},${LOOP_RADIUS} 0 1 1 ${top.x},${top.y}`,
  ].join(" ");
}

export function PreemptionLoopDiagram() {
  return (
    <svg viewBox="0 0 320 320" className="h-[80vmin] w-full max-w-3xl" aria-hidden>
      <path
        data-role="loop-path"
        d={buildLoopPath()}
        className="stroke-signal"
        strokeWidth="2.5"
        fill="none"
      />
      {LOOP_NODES.map((node, i) => {
        const { x, y } = pointOnLoop(node.angleDeg);
        const words = node.label.split(" ");

        return (
          <g key={node.label} data-role="loop-node" data-index={i}>
            <circle
              cx={x}
              cy={y}
              r={NODE_RADIUS}
              className="fill-surface-raised stroke-ink-faint"
              strokeWidth="1.5"
            />
            <text
              x={x}
              y={y}
              textAnchor="middle"
              className="fill-ink font-mono text-[10px] tracking-wide"
            >
              {words.map((word, lineIndex) => (
                <tspan
                  key={word}
                  x={x}
                  dy={lineIndex === 0 ? -((words.length - 1) * NODE_LABEL_LINE_HEIGHT) / 2 : NODE_LABEL_LINE_HEIGHT}
                >
                  {word}
                </tspan>
              ))}
            </text>
          </g>
        );
      })}
    </svg>
  );
}
