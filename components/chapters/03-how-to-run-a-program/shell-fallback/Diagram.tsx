/**
 * execve() on top, the shell below it, and a single status dot between them
 * that carries the outcome — one dot that turns red then green, not two
 * separate icons, so the diagram reads as "same attempt, different result"
 * rather than a fail case swapped out for a success case.
 */
export function ShellFallbackDiagram() {
  return (
    <div className="flex h-full w-full flex-col items-center justify-center gap-6">
      <div
        data-role="execve-box"
        className="border-ink-faint bg-surface-raised text-ink rounded-2xl border px-8 py-4 font-mono text-xl sm:text-2xl"
      >
        execve()
      </div>

      <svg width="2" height="28" aria-hidden>
        <line x1="1" y1="0" x2="1" y2="28" className="stroke-ink-faint" strokeWidth="2" />
      </svg>

      <div className="flex items-center gap-5">
        <div
          data-role="shell-box"
          className="border-ink-faint bg-surface-raised text-ink rounded-lg border px-6 py-3 font-mono text-lg sm:text-xl"
        >
          &gt;_
        </div>
        <span
          data-role="status-mark"
          aria-hidden
          className="border-ink-faint h-5 w-5 rounded-full border-2"
        />
      </div>
    </div>
  );
}
