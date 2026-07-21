const IVT_ROWS = ["0x00", "0x01", "\u22EF", "0x80"] as const;
export const MATCHED_ROW_INDEX = 3;

export const RING_CENTER = { x: 160, y: 190 };
export const RING_OUTER_R = 130;
const RING_INNER_R = 68;

export const IVT_PANEL = { x: 380, y: 70, width: 150, height: 220 };
const ROW_HEIGHT = 50;

export function rowCenterY(index: number) {
  return IVT_PANEL.y + index * ROW_HEIGHT + ROW_HEIGHT / 2 - 6;
}

/**
 * Self-contained diagram (not composed from the shared <Ring>, deliberately
 * — this scene needs exact coordinates for the interrupt trace lines, so
 * the ring geometry is redrawn inline at a scale that matches). Reused
 * visual language: same ring-and-guarded-core motif as rings-kernel-user.
 */
export function SyscallDiagram() {
  const matchedRowY = rowCenterY(MATCHED_ROW_INDEX);

  return (
    <svg viewBox="0 0 560 380" className="h-[80vmin] w-full max-w-3xl" aria-hidden>
      {/* privilege rings */}
      <circle
        cx={RING_CENTER.x}
        cy={RING_CENTER.y}
        r={RING_OUTER_R}
        className="stroke-ink-faint"
        strokeWidth="1.5"
        fill="none"
      />
      <circle
        cx={RING_CENTER.x}
        cy={RING_CENTER.y}
        r={RING_INNER_R}
        className="stroke-ink-faint"
        strokeWidth="1.5"
        fill="none"
      />
      <g data-role="guarded-core">
        <circle
          cx={RING_CENTER.x}
          cy={RING_CENTER.y}
          r={RING_INNER_R}
          className="fill-kernel"
          fillOpacity="0.08"
        />
      </g>
      <text
        x={RING_CENTER.x}
        y={RING_CENTER.y - RING_OUTER_R - 14}
        textAnchor="middle"
        className="fill-ink-dim font-mono text-[12px] tracking-wide"
      >
        RING 3
      </text>
      <text
        x={RING_CENTER.x}
        y={RING_CENTER.y + RING_INNER_R + 20}
        textAnchor="middle"
        className="fill-kernel font-mono text-[11px] tracking-wide"
      >
        RING 0
      </text>

      {/* interrupt vector table */}
      <rect
        x={IVT_PANEL.x}
        y={IVT_PANEL.y}
        width={IVT_PANEL.width}
        height={IVT_PANEL.height}
        rx="10"
        className="fill-surface stroke-ink-faint"
        strokeWidth="1.5"
      />
      <text
        x={IVT_PANEL.x + IVT_PANEL.width / 2}
        y={IVT_PANEL.y - 12}
        textAnchor="middle"
        className="fill-ink-dim font-mono text-[11px] tracking-wide"
      >
        INTERRUPT VECTOR TABLE
      </text>
      {IVT_ROWS.map((label, i) => (
        <g key={label} data-role="ivt-row" data-index={i}>
          <rect
            x={IVT_PANEL.x + 8}
            y={IVT_PANEL.y + i * ROW_HEIGHT + 6}
            width={IVT_PANEL.width - 16}
            height={ROW_HEIGHT - 12}
            rx="6"
            className="fill-surface-raised stroke-ink-faint"
            strokeWidth="1"
          />
          <text
            x={IVT_PANEL.x + 22}
            y={rowCenterY(i) + 6}
            className="fill-ink font-mono text-[13px]"
          >
            {label}
          </text>
        </g>
      ))}

      {/* traces: INT (dot -> matched row), jump (row -> kernel core), IRET (core -> ring 3) */}
      <path
        data-role="int-trace"
        d={`M${RING_CENTER.x},${RING_CENTER.y - RING_OUTER_R} Q ${IVT_PANEL.x - 60},${matchedRowY - 80} ${IVT_PANEL.x},${matchedRowY}`}
        className="stroke-signal"
        strokeWidth="2"
        fill="none"
      />
      <path
        data-role="jump-trace"
        d={`M${IVT_PANEL.x},${matchedRowY} Q ${RING_CENTER.x + 90},${RING_CENTER.y + 40} ${RING_CENTER.x},${RING_CENTER.y}`}
        className="stroke-kernel"
        strokeWidth="2"
        fill="none"
      />
      <path
        data-role="iret-trace"
        d={`M${RING_CENTER.x},${RING_CENTER.y} L${RING_CENTER.x},${RING_CENTER.y - RING_OUTER_R}`}
        className="stroke-user"
        strokeWidth="2"
        fill="none"
      />

      <circle
        data-role="mode-dot"
        cx={RING_CENTER.x}
        cy={RING_CENTER.y - RING_OUTER_R}
        r="9"
        className="fill-user"
      />
    </svg>
  );
}
