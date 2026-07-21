/**
 * Reads a color straight from the CSS custom properties defined in
 * `app/globals.css` (the single source of truth for the theme palette), so
 * GSAP animations that need to tween a color (e.g. a dot recoloring from
 * user-mode to kernel-mode) never hardcode a hex value of their own.
 *
 * Throws immediately if the variable doesn't exist — a typo'd token should
 * fail loudly, not silently animate to black.
 */
export function themeColor(variableName: `--color-${string}`): string {
  if (typeof window === "undefined") {
    throw new Error("themeColor() can only be called in the browser");
  }

  const value = getComputedStyle(document.documentElement)
    .getPropertyValue(variableName)
    .trim();

  if (!value) {
    throw new Error(
      `themeColor(): "${variableName}" is not defined in app/globals.css`,
    );
  }

  return value;
}
