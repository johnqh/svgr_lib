import { describe, expect, it } from 'vitest';
import {
  APP_NAME,
  COMPANY_NAME,
  QUALITY_DEFAULT,
  QUALITY_MAX,
  QUALITY_MIN,
  SUPPORTED_IMAGE_TYPES,
} from './constants';

describe('constants', () => {
  it('has correct app name', () => {
    expect(APP_NAME).toBe('SVGR');
  });

  it('has correct company name', () => {
    expect(COMPANY_NAME).toBe('Sudobility Inc.');
  });

  it('has valid quality range', () => {
    expect(QUALITY_MIN).toBeLessThan(QUALITY_MAX);
    expect(QUALITY_DEFAULT).toBeGreaterThanOrEqual(QUALITY_MIN);
    expect(QUALITY_DEFAULT).toBeLessThanOrEqual(QUALITY_MAX);
  });

  it('has supported image types', () => {
    expect(SUPPORTED_IMAGE_TYPES).toContain('image/png');
    expect(SUPPORTED_IMAGE_TYPES).toContain('image/jpeg');
    expect(SUPPORTED_IMAGE_TYPES).toContain('image/webp');
    expect(SUPPORTED_IMAGE_TYPES.length).toBeGreaterThan(0);
  });
});
