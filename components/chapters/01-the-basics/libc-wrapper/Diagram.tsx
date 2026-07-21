/**
 * A friendly `exit(1)` call drops into a "libc" box, which then fires the
 * same INT → IRET mechanism from the syscall-interrupt scene in miniature —
 * making the point that libc doesn't replace the mechanism, it just hides it.
 */
export function LibcWrapperDiagram() {
  return (
    <div className="flex h-full w-full flex-col items-center justify-center gap-5">
      <div
        data-role="call"
        className="border-user text-user rounded-full border px-6 py-3 font-mono text-lg sm:text-2xl"
      >
        exit(1)
      </div>

      <svg width="2" height="36" aria-hidden>
        <line x1="1" y1="0" x2="1" y2="36" className="stroke-ink-faint" strokeWidth="2" />
      </svg>

      <div
        data-role="libc-box"
        className="border-ink-faint bg-surface flex flex-col items-center gap-4 rounded-2xl border px-10 py-8"
      >
        <span className="text-ink-dim font-mono text-xs tracking-[0.3em] uppercase">libc</span>
        <div className="flex items-center gap-3">
          <span data-role="mini-user" className="bg-user h-3 w-3 rounded-full" />
          <svg width="64" height="12" aria-hidden>
            <line
              data-role="mini-trace"
              x1="0"
              y1="6"
              x2="64"
              y2="6"
              className="stroke-ink-faint"
              strokeWidth="2"
            />
          </svg>
          <span data-role="mini-kernel" className="bg-kernel h-3 w-3 rounded-full" />
        </div>
        <span className="text-ink-dim font-mono text-[11px]">INT 0x80 &rarr; IRET</span>
      </div>
    </div>
  );
}
