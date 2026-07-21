import { MemoryTape } from "@/components/shared/diagrams/MemoryTape";

export const FETCH_EXECUTE_BYTE_COUNT = 5;

export function FetchExecuteDiagram() {
  return (
    <div className="flex h-full w-full items-center justify-center">
      <MemoryTape byteCount={FETCH_EXECUTE_BYTE_COUNT} className="w-[85%] max-w-2xl" />
    </div>
  );
}
