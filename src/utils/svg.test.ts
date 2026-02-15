import { describe, expect, it } from 'vitest';
import { getSvgDimensions, getSvgFileSizeKB } from './svg';

describe('getSvgDimensions', () => {
  it('extracts width/height from attributes', () => {
    const svg = '<svg width="400" height="300" xmlns="http://www.w3.org/2000/svg"></svg>';
    expect(getSvgDimensions(svg)).toEqual({ width: 400, height: 300 });
  });

  it('extracts dimensions from viewBox when no width/height', () => {
    const svg = '<svg viewBox="0 0 800 600" xmlns="http://www.w3.org/2000/svg"></svg>';
    expect(getSvgDimensions(svg)).toEqual({ width: 800, height: 600 });
  });

  it('prefers width/height over viewBox', () => {
    const svg =
      '<svg width="100" height="50" viewBox="0 0 800 600" xmlns="http://www.w3.org/2000/svg"></svg>';
    expect(getSvgDimensions(svg)).toEqual({ width: 100, height: 50 });
  });

  it('handles viewBox with commas', () => {
    const svg = '<svg viewBox="0,0,200,150" xmlns="http://www.w3.org/2000/svg"></svg>';
    expect(getSvgDimensions(svg)).toEqual({ width: 200, height: 150 });
  });

  it('returns default dimensions when none found', () => {
    const svg = '<svg xmlns="http://www.w3.org/2000/svg"></svg>';
    expect(getSvgDimensions(svg)).toEqual({ width: 800, height: 600 });
  });

  it('returns default for invalid width/height', () => {
    const svg = '<svg width="0" height="0" xmlns="http://www.w3.org/2000/svg"></svg>';
    expect(getSvgDimensions(svg)).toEqual({ width: 800, height: 600 });
  });
});

describe('getSvgFileSizeKB', () => {
  it('returns file size in KB as formatted string', () => {
    const svg = '<svg xmlns="http://www.w3.org/2000/svg"></svg>';
    const result = getSvgFileSizeKB(svg);
    expect(result).toMatch(/^\d+\.\d$/);
  });

  it('returns larger size for larger SVG', () => {
    const smallSvg = '<svg xmlns="http://www.w3.org/2000/svg"></svg>';
    const largeSvg = `<svg xmlns="http://www.w3.org/2000/svg">${'<rect width="100" height="100"/>'.repeat(100)}</svg>`;
    const smallSize = parseFloat(getSvgFileSizeKB(smallSvg));
    const largeSize = parseFloat(getSvgFileSizeKB(largeSvg));
    expect(largeSize).toBeGreaterThan(smallSize);
  });
});
