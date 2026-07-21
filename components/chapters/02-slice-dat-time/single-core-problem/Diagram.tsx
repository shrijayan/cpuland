import { CpuChip } from "@/components/shared/diagrams/CpuChip";

const QUEUED_PROGRAMS = ["A", "B", "C"] as const;

/**
 * One CPU chip, and beside it a small queue of programs all waiting for
 * their turn on it. useSingleCoreProblemAnimation makes the queue jostle
 * impatiently in place — the chip itself stays put, since the point of
 * this scene is that there's only one of it.
 */
export function SingleCoreProblemDiagram() {
  return (
    <div className="flex h-full w-full items-center justify-center gap-10 sm:gap-16">
      <CpuChip className="w-36 sm:w-52" />
      <div className="flex flex-col gap-4">
        {QUEUED_PROGRAMS.map((label, i) => (
          <div
            key={label}
            data-role="queued-program"
            data-index={i}
            className="border-ink-faint bg-surface text-ink flex h-12 w-12 items-center justify-center rounded-lg border font-mono text-lg sm:h-14 sm:w-14 sm:text-xl"
          >
            {label}
          </div>
        ))}
      </div>
    </div>
  );
}
