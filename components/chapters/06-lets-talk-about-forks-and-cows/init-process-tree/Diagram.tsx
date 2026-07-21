const VIEWBOX = { width: 560, height: 320 };

/** The one node with a label — every other process in the tree is unnamed, spawned by it. */
const ROOT_LABEL = "init";

// --- vertical rhythm: root, then children, then one child's own children ---
const ROOT_Y = 50;
const ROOT_RADIUS = 25;

const CHILD_ROW_Y = 165;
const CHILD_RADIUS = 18;

const GRANDCHILD_ROW_Y = 268;
const GRANDCHILD_RADIUS = 14;

// --- horizontal spread: 3 children under root, 2 grandchildren under the middle child ---
const CHILD_ROW_X = [110, VIEWBOX.width / 2, 450] as const;
const GRANDCHILD_ROW_X = [210, 350] as const;

/** Index (into NODES below) of the one child whose branch keeps growing. */
const BRANCHING_CHILD_INDEX = 2;

interface TreeNodeSpec {
  index: number;
  cx: number;
  cy: number;
  radius: number;
  label?: string;
}

/**
 * Every node in the tree: the root ("init"), its 3 direct children, and 2
 * grandchildren hanging off `BRANCHING_CHILD_INDEX` — enough to read as "the
 * tree keeps growing" without drawing a full, cluttered process tree.
 */
const NODES: readonly TreeNodeSpec[] = [
  { index: 0, cx: VIEWBOX.width / 2, cy: ROOT_Y, radius: ROOT_RADIUS, label: ROOT_LABEL },
  { index: 1, cx: CHILD_ROW_X[0], cy: CHILD_ROW_Y, radius: CHILD_RADIUS },
  { index: 2, cx: CHILD_ROW_X[1], cy: CHILD_ROW_Y, radius: CHILD_RADIUS },
  { index: 3, cx: CHILD_ROW_X[2], cy: CHILD_ROW_Y, radius: CHILD_RADIUS },
  { index: 4, cx: GRANDCHILD_ROW_X[0], cy: GRANDCHILD_ROW_Y, radius: GRANDCHILD_RADIUS },
  { index: 5, cx: GRANDCHILD_ROW_X[1], cy: GRANDCHILD_ROW_Y, radius: GRANDCHILD_RADIUS },
];

const NODE_BY_INDEX = new Map(NODES.map((node) => [node.index, node]));

function requireNode(index: number): TreeNodeSpec {
  const node = NODE_BY_INDEX.get(index);
  if (!node) {
    throw new Error(`init-process-tree: no node defined for index ${index}`);
  }
  return node;
}

interface TreeEdgeSpec {
  index: number;
  parentIndex: number;
  childIndex: number;
}

/**
 * Every parent -> child link, in draw order. `childIndex` is always
 * `edgeIndex + 1` by construction — root (0) fans out to children 1-3, then
 * the branching child (2) fans out again to grandchildren 4-5. useAnimation
 * relies on that same index math (FIRST_GENERATION_COUNT /
 * SECOND_GENERATION_COUNT) to know which edge reveals which node, so keep
 * new nodes/edges appended in this same order if the tree ever grows.
 */
const EDGES: readonly TreeEdgeSpec[] = [
  { index: 0, parentIndex: 0, childIndex: 1 },
  { index: 1, parentIndex: 0, childIndex: 2 },
  { index: 2, parentIndex: 0, childIndex: 3 },
  { index: 3, parentIndex: BRANCHING_CHILD_INDEX, childIndex: 4 },
  { index: 4, parentIndex: BRANCHING_CHILD_INDEX, childIndex: 5 },
];

/** How many of the root's direct children get revealed in the first wave. */
export const FIRST_GENERATION_COUNT = 3;
/** How many grandchildren get revealed in the second wave, right after. */
export const SECOND_GENERATION_COUNT = 2;

/**
 * A tiny init process tree: one root labeled "init", 3 unlabeled children
 * (every process is fork-exec'd by init or one of its descendants), and 2
 * more unlabeled grandchildren under one of those children — just enough
 * generations to show the tree keeps branching. useAnimation grows it
 * top-down: the root pops in, then each edge draws with its child fading in
 * right after, one generation at a time.
 */
export function InitProcessTreeDiagram() {
  return (
    <svg
      viewBox={`0 0 ${VIEWBOX.width} ${VIEWBOX.height}`}
      className="h-auto w-[92%] max-w-2xl"
      aria-hidden
    >
      {EDGES.map((edge) => {
        const parent = requireNode(edge.parentIndex);
        const child = requireNode(edge.childIndex);

        return (
          <line
            key={edge.index}
            data-role="tree-edge"
            data-index={edge.index}
            x1={parent.cx}
            y1={parent.cy}
            x2={child.cx}
            y2={child.cy}
            className="stroke-ink-faint"
            strokeWidth="2"
          />
        );
      })}

      {NODES.map((node) => (
        <g
          key={node.index}
          data-role="tree-node"
          data-index={node.index}
          transform={`translate(${node.cx}, ${node.cy})`}
        >
          <circle
            r={node.radius}
            className={node.label ? "fill-surface-raised stroke-user" : "fill-surface-raised stroke-ink-faint"}
            strokeWidth={node.label ? 2.5 : 1.5}
          />
          {node.label && (
            <text
              textAnchor="middle"
              dominantBaseline="middle"
              className="fill-user font-mono text-[11px] tracking-wide"
            >
              {node.label}
            </text>
          )}
        </g>
      ))}
    </svg>
  );
}
