const LINK_INSTANCE_COUNT = 2;
const LINK_INDICES = Array.from({ length: LINK_INSTANCE_COUNT }, (_, i) => i);

const VIEWBOX = { width: 260, height: 220 };

const PROGRAM_BOX = { x: 18, width: 110, height: 70 };
const PROGRAM_BOX_TOP_Y = 14;
const PROGRAM_BOX_GAP = 52;

const TAG = { width: 56, height: 28 };
const SHARED_FOO = { x: 168, width: 86, height: 64 };

/** Top-left y of the Nth stacked program box (index 0 above index 1). */
function programBoxY(index: number) {
  return PROGRAM_BOX_TOP_Y + index * (PROGRAM_BOX.height + PROGRAM_BOX_GAP);
}

function programBoxCenterY(index: number) {
  return programBoxY(index) + PROGRAM_BOX.height / 2;
}

/** Shared foo sits vertically centered between the two program boxes. */
const SHARED_FOO_CENTER_Y = (programBoxCenterY(0) + programBoxCenterY(1)) / 2;
const SHARED_FOO_Y = SHARED_FOO_CENTER_Y - SHARED_FOO.height / 2;

/** The name-tag chip is centered inside its program box. */
function tagRect(index: number) {
  return {
    x: PROGRAM_BOX.x + (PROGRAM_BOX.width - TAG.width) / 2,
    y: programBoxCenterY(index) - TAG.height / 2,
  };
}

/** Straight reference line from a program box's edge to shared-foo's edge. */
function arrowLine(index: number) {
  return {
    x1: PROGRAM_BOX.x + PROGRAM_BOX.width,
    y1: programBoxCenterY(index),
    x2: SHARED_FOO.x,
    y2: SHARED_FOO_CENTER_Y,
  };
}

/**
 * Split screen, redrawn straight from the source diagram
 * (devxdocs/content/raw/04-becoming-an-elf-lord.md): static linking copies
 * `foo`'s real code into every program that needs it (left); dynamic
 * linking gives each program only a name-tag pointing at one shared `foo`
 * living on the computer (right). Left half is plain HTML boxes/chips —
 * right half is one inline SVG so the reference arrows can be exact lines
 * between box and shared-foo coordinates, DrawSVG-able by useAnimation.
 */
export function StaticVsDynamicLinkingDiagram() {
  return (
    <div className="flex h-full w-full items-center justify-center gap-8 px-6 sm:gap-16 sm:px-12">
      <div
        data-role="static-side"
        className="flex flex-1 flex-col items-center justify-center gap-6 sm:gap-8"
      >
        {LINK_INDICES.map((i) => (
          <div
            key={i}
            className="border-ink-faint bg-surface-raised flex h-20 w-full max-w-[180px] items-center justify-center rounded-2xl border sm:h-24 sm:max-w-[220px]"
          >
            <span
              data-role="static-foo"
              data-index={i}
              className="border-ink-faint bg-surface text-user rounded-full border px-5 py-2 font-mono text-sm sm:text-base"
            >
              foo
            </span>
          </div>
        ))}
      </div>

      <div data-role="dynamic-side" className="flex flex-1 items-center justify-center">
        <svg
          viewBox={`0 0 ${VIEWBOX.width} ${VIEWBOX.height}`}
          className="h-full max-h-[62vmin] w-full max-w-[300px]"
          aria-hidden
        >
          {LINK_INDICES.map((i) => {
            const tag = tagRect(i);
            const arrow = arrowLine(i);

            return (
              <g key={i}>
                <rect
                  x={PROGRAM_BOX.x}
                  y={programBoxY(i)}
                  width={PROGRAM_BOX.width}
                  height={PROGRAM_BOX.height}
                  rx="12"
                  className="fill-surface-raised stroke-ink-faint"
                  strokeWidth="1.5"
                />
                <line
                  data-role="dynamic-arrow"
                  data-index={i}
                  x1={arrow.x1}
                  y1={arrow.y1}
                  x2={arrow.x2}
                  y2={arrow.y2}
                  className="stroke-signal"
                  strokeWidth="2"
                />
                <g data-role="dynamic-tag" data-index={i}>
                  <rect
                    x={tag.x}
                    y={tag.y}
                    width={TAG.width}
                    height={TAG.height}
                    rx={TAG.height / 2}
                    className="fill-surface stroke-ink-faint"
                    strokeWidth="1.5"
                  />
                  <text
                    x={tag.x + TAG.width / 2}
                    y={tag.y + TAG.height / 2}
                    textAnchor="middle"
                    dominantBaseline="middle"
                    className="fill-ink-dim font-mono text-[13px]"
                  >
                    foo
                  </text>
                </g>
              </g>
            );
          })}

          <g data-role="shared-foo">
            <rect
              x={SHARED_FOO.x}
              y={SHARED_FOO_Y}
              width={SHARED_FOO.width}
              height={SHARED_FOO.height}
              rx="14"
              className="fill-surface-raised stroke-user"
              strokeWidth="2"
            />
            <text
              x={SHARED_FOO.x + SHARED_FOO.width / 2}
              y={SHARED_FOO_Y + SHARED_FOO.height / 2}
              textAnchor="middle"
              dominantBaseline="middle"
              className="fill-user font-mono text-base"
            >
              foo
            </text>
          </g>
        </svg>
      </div>
    </div>
  );
}
