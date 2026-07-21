const BOX_SIZE = "h-28 w-40 sm:h-36 sm:w-52";
const BOX_STYLE = `border-ink-faint bg-surface-raised rounded-2xl border ${BOX_SIZE}`;

/**
 * Parent + child boxes side by side, continuing from `fork-clone`. The
 * child box is a grid-stacked pair (same trick as binary-to-asm) of
 * "child" and "new program" labels sharing one cell, so execve() reads as
 * the child process replacing itself in place rather than a new box
 * appearing next to it. The parent box is untouched by useAnimation.
 */
export function ForkExecPatternDiagram() {
  return (
    <div className="flex items-center justify-center gap-10 sm:gap-20">
      <div data-role="parent-box" className={`flex items-center justify-center ${BOX_STYLE}`}>
        <span className="text-user font-mono text-lg sm:text-xl">parent</span>
      </div>

      <div
        data-role="child-box"
        className={`grid place-items-center *:col-start-1 *:row-start-1 ${BOX_STYLE}`}
      >
        <span data-role="child-before" className="text-user font-mono text-lg sm:text-xl">
          child
        </span>
        <span data-role="child-after" className="text-signal px-3 text-center font-mono text-base sm:text-lg">
          new program
        </span>
      </div>
    </div>
  );
}
