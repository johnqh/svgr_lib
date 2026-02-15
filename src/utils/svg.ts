export interface SvgDimensions {
  width: number;
  height: number;
}

const DEFAULT_DIMENSIONS: SvgDimensions = { width: 800, height: 600 };

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
  const viewBoxMatch = svgString.match(
    /<svg[^>]*\bviewBox=["']([^"']+)["']/
  );
  if (viewBoxMatch) {
    const parts = viewBoxMatch[1].split(/[\s,]+/).map(Number);
    if (parts.length === 4 && parts[2] > 0 && parts[3] > 0) {
      return { width: parts[2], height: parts[3] };
    }
  }

  return DEFAULT_DIMENSIONS;
}

export function getSvgFileSize(svgString: string): number {
  return new TextEncoder().encode(svgString).byteLength;
}

export function getSvgFileSizeKB(svgString: string): string {
  return (getSvgFileSize(svgString) / 1024).toFixed(1);
}
