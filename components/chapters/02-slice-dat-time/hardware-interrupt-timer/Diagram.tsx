import { Ring } from "@/components/shared/diagrams/Ring";

export function HardwareInterruptTimerDiagram() {
  return (
    <div className="flex h-full w-full flex-col items-center justify-center gap-6">
      <svg data-role="timer-icon" viewBox="0 0 48 48" className="h-14 w-14" aria-hidden>
        <circle cx="24" cy="24" r="18" className="fill-ink-faint stroke-signal" strokeWidth="2" />
        <line
          x1="24"
          y1="24"
          x2="24"
          y2="11"
          className="stroke-signal"
          strokeWidth="2"
          strokeLinecap="round"
        />
        <line
          x1="24"
          y1="24"
          x2="34"
          y2="24"
          className="stroke-signal"
          strokeWidth="2"
          strokeLinecap="round"
        />
        <circle cx="24" cy="24" r="2" className="fill-signal" />
      </svg>

      <Ring className="h-[70vmin] w-[70vmin]" />
    </div>
  );
}
