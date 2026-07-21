const HEADER_TYPES = [
  { title: "PT_LOAD", subtitle: "load into memory" },
  { title: "PT_NOTE", subtitle: "freeform text" },
  { title: "PT_DYNAMIC", subtitle: "linking info" },
  { title: "PT_INTERP", subtitle: "interpreter path" },
] as const;

/**
 * Four program header table entry types laid out as a row of cards. Each
 * card pops in left-to-right (see useProgramHeaderTypesAnimation) so the
 * table reads as if it's revealing its entry types one at a time.
 */
export function ProgramHeaderTypesDiagram() {
  return (
    <div className="flex flex-wrap items-stretch justify-center gap-4 sm:gap-6">
      {HEADER_TYPES.map((type, i) => (
        <div
          key={type.title}
          data-role="header-card"
          data-index={i}
          className="border-ink-faint bg-surface-raised flex w-36 flex-col items-center gap-2 rounded-2xl border px-4 py-6 text-center sm:w-44 sm:px-6 sm:py-8"
        >
          <span className="text-user font-mono text-sm font-semibold sm:text-lg">
            {type.title}
          </span>
          <span className="text-ink-dim font-mono text-xs sm:text-sm">{type.subtitle}</span>
        </div>
      ))}
    </div>
  );
}
