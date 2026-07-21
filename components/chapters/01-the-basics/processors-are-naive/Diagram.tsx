import { MemoryTape } from "@/components/shared/diagrams/MemoryTape";

export const NAIVE_BYTE_COUNT = 9;

export function ProcessorsAreNaiveDiagram() {
  return (
    <div className="relative flex h-full w-full items-center justify-center">
      <div
        data-role="process-ghost"
        className="border-kernel/50 text-kernel absolute rounded-lg border border-dashed px-10 py-6 font-mono text-xs tracking-[0.3em] uppercase"
      >
        &ldquo;process&rdquo;
      </div>
      <MemoryTape byteCount={NAIVE_BYTE_COUNT} className="w-[88%] max-w-3xl" />
    </div>
  );
}
