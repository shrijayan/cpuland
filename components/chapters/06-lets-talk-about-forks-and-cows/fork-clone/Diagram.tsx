const BOX_SIZE = "h-28 w-40 sm:h-36 sm:w-52";
const BOX_STYLE = `border-ink-faint bg-surface-raised flex items-center justify-center rounded-2xl border font-mono text-sm text-ink sm:text-base ${BOX_SIZE}`;

const BADGE_STYLE =
  "border-ink-faint bg-surface text-user rounded-full border px-4 py-1.5 font-mono text-xs sm:px-5 sm:py-2 sm:text-sm";

/**
 * The parent column (`process-box` + `parent-badge`) and the child column
 * (`child-box` + `child-badge`) are stacked in the same CSS grid cell — the
 * same overlay trick `CaptionLayer`/`binary-to-asm` use — so the child
 * column starts exactly on top of the parent one from layout alone, no
 * animation math required. `useForkCloneAnimation` only has to slide
 * `child-box` sideways and reveal the two badges. Box size matches
 * `fork-exec-pattern` (the next scene in this chapter) for continuity.
 */
export function ForkCloneDiagram() {
  return (
    <div className="flex h-full w-full items-center justify-center">
      <div className="grid *:col-start-1 *:row-start-1">
        <div className="flex flex-col items-center gap-5">
          <div data-role="process-box" className={BOX_STYLE}>
            process
          </div>
          <div data-role="parent-badge" className={BADGE_STYLE}>
            PID 1234
          </div>
        </div>

        <div className="flex flex-col items-center gap-5">
          <div data-role="child-box" className={BOX_STYLE}>
            process
          </div>
          <div data-role="child-badge" className={BADGE_STYLE}>
            0
          </div>
        </div>
      </div>
    </div>
  );
}
