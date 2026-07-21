import type { ReactNode } from "react";

export const STACK_FRAME_COUNT = 4;
export const HEAP_TILE_COUNT = 4;

const stackFrameIndices = Array.from({ length: STACK_FRAME_COUNT }, (_, index) => index);
const heapTileIndices = Array.from({ length: HEAP_TILE_COUNT }, (_, index) => index);

const FRAME_CLASSNAME = "h-9 w-full rounded-sm border border-ink-faint bg-surface-raised sm:h-10";

interface MemoryPanelProps {
  label: string;
  /** Which edge of the panel the column of blocks is pinned to. */
  justify: "start" | "end";
  children: ReactNode;
}

/**
 * Shared chrome for one half of the split screen: a small-caps label above
 * a column pinned to either the top (stack) or bottom (heap) of the
 * available height, leaving the rest of the panel as the "room to grow
 * into" that the diagram is illustrating.
 */
function MemoryPanel({ label, justify, children }: MemoryPanelProps) {
  return (
    <div className="flex h-full w-full max-w-40 flex-col items-center gap-3">
      <span className="font-mono text-xs tracking-[0.2em] text-user uppercase">{label}</span>
      <div
        className={`flex w-full flex-1 flex-col ${justify === "start" ? "justify-start" : "justify-end"}`}
      >
        {children}
      </div>
    </div>
  );
}

/**
 * Split-screen memory layout: the stack is anchored at the top of its
 * panel and its frames are indexed top-to-bottom (frame 0 is the initial,
 * always-present frame). The heap is anchored at the bottom of its panel,
 * right above its "libc" baseline, and its tiles are indexed bottom-to-top
 * (tile 0 is the initial arena, already carved out by libc). `useAnimation`
 * owns revealing frames/tiles 1..N and the mmap/sbrk callout — this
 * component only lays out the (already-mounted) slots.
 */
export function StackVsHeapDiagram() {
  return (
    <div className="flex h-full w-full items-stretch justify-center gap-10 px-8 py-14 sm:gap-20 sm:px-16">
      <MemoryPanel label="Stack" justify="start">
        <div className="flex flex-col gap-2">
          {stackFrameIndices.map((index) => (
            <div
              key={index}
              data-role="stack-frame"
              data-index={index}
              className={`origin-top ${FRAME_CLASSNAME}`}
            />
          ))}
        </div>
      </MemoryPanel>

      <div className="w-px self-stretch bg-ink-faint/40" />

      <MemoryPanel label="Heap" justify="end">
        <div className="relative flex flex-col-reverse gap-2">
          <div
            data-role="heap-syscall-arrow"
            className="absolute inset-x-0 -top-10 flex flex-col items-center gap-0.5"
          >
            <span aria-hidden className="text-sm leading-none text-ink-dim">
              ↑
            </span>
            <span className="font-mono text-[9px] tracking-wide text-ink-dim uppercase">
              mmap/sbrk
            </span>
          </div>
          {heapTileIndices.map((index) => (
            <div
              key={index}
              data-role="heap-tile"
              data-index={index}
              className={`origin-bottom ${FRAME_CLASSNAME}`}
            />
          ))}
        </div>
        <span className="mt-3 font-mono text-[10px] tracking-widest text-ink-dim uppercase">
          libc
        </span>
      </MemoryPanel>
    </div>
  );
}
