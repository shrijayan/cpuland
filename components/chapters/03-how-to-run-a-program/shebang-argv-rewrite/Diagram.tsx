const ARGV_CHIPS = [
  { index: 0, label: "./script" },
  { index: 1, label: "A" },
  { index: 2, label: "B" },
  { index: 3, label: "C" },
] as const;

const NEW_CHIPS = [
  { index: 0, label: "/usr/bin/node" },
  { index: 1, label: "--flag" },
] as const;

const CHIP_CLASS =
  "border-ink-faint bg-surface-raised whitespace-nowrap rounded-full border px-5 py-2.5 font-mono text-sm sm:px-6 sm:py-3 sm:text-lg";

/**
 * The original argv array `[./script, A, B, C]` sits in normal flex flow.
 * The two `new-chip` elements (interpreter path + flag) are absolutely
 * positioned over the start of that row — same "stack things in the same
 * spot" trick CaptionLayer uses — so useShebangArgvRewriteAnimation can
 * slide them in from off-screen without disturbing anything else's layout,
 * while chip 0 fades out and chips 1-3 slide right to make room for them.
 */
export function ShebangArgvRewriteDiagram() {
  return (
    <div className="flex h-full w-full items-center justify-center">
      <div className="relative flex items-center gap-3 sm:gap-4">
        <div className="absolute inset-y-0 left-0 flex items-center gap-3 sm:gap-4">
          {NEW_CHIPS.map((chip) => (
            <span
              key={chip.label}
              data-role="new-chip"
              data-index={chip.index}
              className={`${CHIP_CLASS} text-signal`}
            >
              {chip.label}
            </span>
          ))}
        </div>

        {ARGV_CHIPS.map((chip) => (
          <span
            key={chip.label}
            data-role="argv-chip"
            data-index={chip.index}
            className={`${CHIP_CLASS} text-user`}
          >
            {chip.label}
          </span>
        ))}
      </div>
    </div>
  );
}
