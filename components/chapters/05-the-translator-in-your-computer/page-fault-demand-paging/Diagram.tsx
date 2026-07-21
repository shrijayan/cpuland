import type { ReactNode } from "react";

const BOX_BASE_CLASS =
  "flex items-center justify-center rounded-lg border bg-surface-raised px-4 py-5 font-mono sm:px-6 sm:py-6";

const BOX_LABEL_CLASS = "text-[10px] tracking-[0.2em] uppercase sm:text-xs";

const PANEL_CLASS =
  "flex flex-1 flex-col items-center justify-center gap-5 rounded-xl border border-ink-faint bg-surface p-4 sm:gap-6 sm:p-8";

const PANEL_TITLE_CLASS = "font-mono text-[10px] tracking-[0.3em] text-ink-dim uppercase sm:text-xs";

type BoxVariant = "neutral" | "kernel";

const BOX_VARIANT_CLASS: Record<BoxVariant, { border: string; label: string }> = {
  neutral: { border: "border-ink-faint", label: "text-ink-dim" },
  kernel: { border: "border-kernel", label: "text-kernel" },
};

/** One CPU/MMU/Disk/RAM box. Same visual language as the mmu-translation scene. */
function ComponentBox({ label, variant = "neutral" }: { label: string; variant?: BoxVariant }) {
  const { border, label: labelClass } = BOX_VARIANT_CLASS[variant];
  return (
    <div className={`${BOX_BASE_CLASS} ${border}`}>
      <span className={`${BOX_LABEL_CLASS} ${labelClass}`}>{label}</span>
    </div>
  );
}

/** One comic panel: a titled, bordered frame holding a beat of the story. */
function Panel({ index, title, children }: { index: 0 | 1 | 2; title: string; children: ReactNode }) {
  return (
    <div data-role="panel" data-index={index} className={PANEL_CLASS}>
      <span className={PANEL_TITLE_CLASS}>{title}</span>
      <div className="flex flex-1 flex-col items-center justify-center gap-5 sm:gap-6">
        {children}
      </div>
    </div>
  );
}

/**
 * Three panels, side by side, telling one story left to right: the CPU asks
 * the MMU for a page that isn't resident (fault), the OS pulls it off disk
 * into RAM (fetch), then the MMU hands the now-resident page back to the
 * CPU (retry succeeds). Every box is visible from the start — only the one
 * "reveal" element per panel (bolt / arrow / checkmark) is hidden until
 * useAnimation shows it, so scrolling plays the story out panel by panel.
 */
export function PageFaultDemandPagingDiagram() {
  return (
    <div className="flex h-full w-full items-center justify-center px-4 sm:px-10">
      <div className="flex w-full max-w-5xl gap-4 sm:gap-6">
        <Panel index={0} title="Fault">
          <div className="flex items-center gap-3 sm:gap-5">
            <ComponentBox label="CPU" />
            <div className="relative">
              <ComponentBox label="MMU" variant="kernel" />
              <span
                aria-hidden
                className="border-danger text-danger bg-surface absolute -top-3 -right-3 flex h-6 w-6 items-center justify-center rounded-full border font-mono text-sm font-bold sm:h-7 sm:w-7"
              >
                ?
              </span>
            </div>
          </div>
          <span data-role="fault-bolt" aria-hidden className="text-danger text-3xl leading-none sm:text-4xl">
            ⚡
          </span>
        </Panel>

        <Panel index={1} title="Fetch">
          <div className="flex items-center gap-2 sm:gap-4">
            <ComponentBox label="Disk" />
            <span
              data-role="load-arrow"
              aria-hidden
              className="text-signal text-2xl leading-none sm:text-3xl"
            >
              →
            </span>
            <ComponentBox label="RAM" />
          </div>
        </Panel>

        <Panel index={2} title="Retry">
          <div className="flex items-center gap-3 sm:gap-5">
            <ComponentBox label="MMU" variant="kernel" />
            <ComponentBox label="CPU" />
          </div>
          <div data-role="success-mark" className="flex flex-col items-center gap-1">
            <span aria-hidden className="text-2xl leading-none sm:text-3xl">
              ✓
            </span>
            <span className="font-mono text-[10px] tracking-[0.15em] uppercase sm:text-xs">
              here&apos;s your memory
            </span>
          </div>
        </Panel>
      </div>
    </div>
  );
}
