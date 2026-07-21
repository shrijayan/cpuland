interface CpuChipProps {
  className?: string;
}

/**
 * The CPU die icon that recurs across the story — first seen zoomed into
 * during the Ch.0 hook, then "running" continuously in Ch.1. Everything
 * inside is grouped under `data-role="chip"` so a scene can scale/fade the
 * whole icon in one tween, while `data-role="chip-outline"` lets a scene
 * pulse just the border (e.g. to suggest activity).
 */
export function CpuChip({ className = "" }: CpuChipProps) {
  return (
    <svg viewBox="0 0 200 200" className={className} aria-hidden>
      <g data-role="chip">
        {Array.from({ length: 6 }).map((_, i) => (
          <g key={i} className="fill-ink-faint">
            <rect x={40 + i * 22} y="0" width="10" height="22" />
            <rect x={40 + i * 22} y="178" width="10" height="22" />
            <rect x="0" y={40 + i * 22} width="22" height="10" />
            <rect x="178" y={40 + i * 22} width="22" height="10" />
          </g>
        ))}
        <rect
          x="26"
          y="26"
          width="148"
          height="148"
          rx="14"
          data-role="chip-outline"
          className="fill-surface stroke-user"
          strokeWidth="2"
        />
        <text
          x="100"
          y="107"
          textAnchor="middle"
          dominantBaseline="middle"
          className="fill-user font-mono text-2xl tracking-[0.2em]"
        >
          CPU
        </text>
      </g>
    </svg>
  );
}
