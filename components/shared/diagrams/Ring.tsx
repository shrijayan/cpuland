interface RingProps {
  className?: string;
}

/**
 * The two-privilege-ring primitive (ring 3 / user mode outer, ring 0 / kernel
 * mode inner) reused anywhere the story needs to show a mode switch: syscalls
 * (Ch.1), hardware interrupts (Ch.2), and the higher-half kernel split (Ch.5).
 *
 * `data-role="mode-dot"` is the CPU's current privilege level — animate its
 * cx/cy to move it between rings, and its fill between the user/kernel theme
 * colors, from the scene's useAnimation hook.
 */
export function Ring({ className = "" }: RingProps) {
  return (
    <svg viewBox="0 0 400 400" className={className} fill="none" aria-hidden>
      <circle cx="200" cy="200" r="160" className="stroke-ink-faint" strokeWidth="1.5" />
      <circle cx="200" cy="200" r="86" className="stroke-ink-faint" strokeWidth="1.5" />

      <g data-role="guarded-core">
        <circle cx="200" cy="200" r="86" className="fill-kernel" fillOpacity="0.08" />
        <rect
          x="182"
          y="192"
          width="36"
          height="26"
          rx="4"
          className="stroke-kernel"
          strokeWidth="2"
        />
        <path
          d="M190 192v-9a10 10 0 0 1 20 0v9"
          className="stroke-kernel"
          strokeWidth="2"
          fill="none"
        />
      </g>

      <text
        x="200"
        y="18"
        textAnchor="middle"
        className="fill-ink-dim font-mono text-[13px] tracking-wide"
      >
        RING 3 · USER MODE
      </text>
      <text
        x="200"
        y="310"
        textAnchor="middle"
        className="fill-kernel font-mono text-[11px] tracking-wide"
      >
        RING 0
      </text>

      <circle data-role="mode-dot" cx="200" cy="40" r="9" className="fill-user" />
    </svg>
  );
}
