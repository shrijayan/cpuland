const PAIRS = [
  { hex: "83", asm: "add" },
  { hex: "C3", asm: "ebx," },
  { hex: "0A", asm: "10" },
] as const;

/**
 * Three byte↔word pairs stacked in place (grid trick, same as CaptionLayer)
 * so the scroll-driven crossfade in useBinaryToAsmAnimation reads as one
 * token flipping from hex to assembly, not two separate rows of text.
 */
export function BinaryToAsmDiagram() {
  return (
    <div className="flex items-center gap-8 font-mono text-4xl text-ink sm:gap-12 sm:text-6xl">
      {PAIRS.map((pair, i) => (
        <div key={pair.hex} data-role="pair" data-index={i} className="grid *:col-start-1 *:row-start-1">
          <span data-role="hex" className="text-user">
            {pair.hex}
          </span>
          <span data-role="asm" className="text-signal">
            {pair.asm}
          </span>
        </div>
      ))}
    </div>
  );
}
