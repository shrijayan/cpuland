import { CpuChip } from "@/components/shared/diagrams/CpuChip";

/**
 * A blinking terminal prompt that gives way to the CPU chip icon — see
 * useHookAnimation for the actual scroll-driven zoom/fade choreography.
 */
export function HookDiagram() {
  return (
    <div className="relative flex h-full w-full items-center justify-center">
      <div
        data-role="terminal"
        className="absolute flex items-center font-mono text-2xl text-ink sm:text-3xl"
      >
        <span>$ ./program</span>
        <span
          data-role="terminal-cursor"
          className="bg-user ml-1 inline-block h-[1em] w-[0.5em] translate-y-[2px]"
        />
      </div>

      <CpuChip className="h-40 w-40 sm:h-56 sm:w-56" />
    </div>
  );
}
