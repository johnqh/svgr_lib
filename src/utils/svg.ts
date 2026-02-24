/**
 * Represents the width and height dimensions of an SVG element.
 */
export interface SvgDimensions {
  /** The width of the SVG in pixels. */
  width: number;
  /** The height of the SVG in pixels. */
  height: number;
}

/** Default dimensions returned when an SVG has no explicit width/height or viewBox. */
const DEFAULT_DIMENSIONS: SvgDimensions = { width: 800, height: 600 };

/**
 * Parses an SVG string to extract its dimensions.
 *
 * Attempts to read dimensions in the following order:
 * 1. `width` and `height` attributes on the `<svg>` element.
 * 2. The `viewBox` attribute on the `<svg>` element (uses the 3rd and 4th values).
 * 3. Falls back to default dimensions (800x600) if neither is found or valid.
 *
 * @param svgString - A string containing SVG markup.
 * @returns The parsed {@link SvgDimensions}, or default dimensions (800x600) if parsing fails.
 *
 * @example
 * ```ts
 * getSvgDimensions('<svg width="400" height="300"></svg>');
 * // { width: 400, height: 300 }
 *
 * getSvgDimensions('<svg viewBox="0 0 800 600"></svg>');
 * // { width: 800, height: 600 }
 * ```
 */
export function getSvgDimensions(svgString: string): SvgDimensions {
  // Try width/height attributes first
  const widthMatch = svgString.match(/<svg[^>]*\bwidth=["']([^"']+)["']/);
  const heightMatch = svgString.match(/<svg[^>]*\bheight=["']([^"']+)["']/);

  if (widthMatch && heightMatch) {
    const width = parseFloat(widthMatch[1]);
    const height = parseFloat(heightMatch[1]);
    if (width > 0 && height > 0) {
      return { width, height };
    }
  }

  // Fall back to viewBox
  const viewBoxMatch = svgString.match(/<svg[^>]*\bviewBox=["']([^"']+)["']/);
  if (viewBoxMatch) {
    const parts = viewBoxMatch[1].split(/[\s,]+/).map(Number);
    if (parts.length === 4 && parts[2] > 0 && parts[3] > 0) {
      return { width: parts[2], height: parts[3] };
    }
  }

  return DEFAULT_DIMENSIONS;
}

/**
 * Calculates the byte size of an SVG string using UTF-8 encoding.
 *
 * @param svgString - The SVG string to measure.
 * @returns The size of the SVG string in bytes.
 */
export function getSvgFileSize(svgString: string): number {
  return new TextEncoder().encode(svgString).byteLength;
}

/**
 * Calculates the size of an SVG string in kilobytes, formatted to one decimal place.
 *
 * @param svgString - The SVG string to measure.
 * @returns The size in KB as a formatted string (e.g., `'2.4'`).
 *
 * @example
 * ```ts
 * getSvgFileSizeKB('<svg>...</svg>'); // '0.1'
 * ```
 */
export function getSvgFileSizeKB(svgString: string): string {
  return (getSvgFileSize(svgString) / 1024).toFixed(1);
}
