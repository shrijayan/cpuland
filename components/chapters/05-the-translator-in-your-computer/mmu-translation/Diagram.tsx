const BOX_BASE_CLASS =
  "flex items-center justify-center rounded-lg border bg-surface-raised px-6 py-8 font-mono sm:px-10 sm:py-10";

const BOX_LABEL_CLASS = "text-xs tracking-[0.2em] uppercase sm:text-sm";

/**
 * Fixed px gap between every adjacent box in the row. Also doubles as the
 * exact distance `[data-role="pulse"]` travels: it's anchored to the MMU
 * box's right edge, so sliding it this far lands it flush on the RAM box's
 * left edge — no separate "travel distance" number to keep in sync.
 */
export const MMU_TO_RAM_GAP = 48;

/**
 * CPU -> MMU -> RAM, three boxes in a row. The MMU box is the only one with
 * anything moving inside it: a virtual/physical address pair stacked in the
 * exact same spot (same grid trick as binary-to-asm) so useMmuTranslationAnimation
 * can crossfade one into the other in place, plus a small read-pulse dot
 * anchored to its right edge that later slides over to RAM.
 */
export function MmuTranslationDiagram() {
  return (
    <div className="flex h-full w-full items-center justify-center">
      <div className="flex items-center" style={{ gap: MMU_TO_RAM_GAP }}>
        <div className={`${BOX_BASE_CLASS} border-ink-faint`}>
          <span className={`${BOX_LABEL_CLASS} text-ink-dim`}>CPU</span>
        </div>

        <div className={`${BOX_BASE_CLASS} border-kernel relative flex-col gap-4`}>
          <span className={`${BOX_LABEL_CLASS} text-kernel`}>MMU</span>

          <div className="grid *:col-start-1 *:row-start-1">
            <span data-role="virtual-addr" className="text-user text-sm sm:text-base">
              0xfffaf548
            </span>
            <span data-role="physical-addr" className="text-kernel text-sm sm:text-base">
              0x53a4b64a
            </span>
          </div>

          <span
            data-role="pulse"
            aria-hidden
            className="bg-signal shadow-[0_0_10px_2px_var(--color-signal)] absolute top-1/2 left-full h-2.5 w-2.5 -translate-y-1/2 rounded-full"
          />
        </div>

        <div data-role="ram-box" className={`${BOX_BASE_CLASS} border-ink-faint`}>
          <span className={`${BOX_LABEL_CLASS} text-ink-dim`}>RAM</span>
        </div>
      </div>
    </div>
  );
}
