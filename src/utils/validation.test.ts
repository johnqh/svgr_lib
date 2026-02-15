import { describe, expect, it } from 'vitest';
import { getBaseName, isValidImageType } from './validation';

describe('isValidImageType', () => {
  it('accepts supported image types', () => {
    expect(isValidImageType('image/png')).toBe(true);
    expect(isValidImageType('image/jpeg')).toBe(true);
    expect(isValidImageType('image/webp')).toBe(true);
    expect(isValidImageType('image/bmp')).toBe(true);
    expect(isValidImageType('image/gif')).toBe(true);
  });

  it('rejects unsupported types', () => {
    expect(isValidImageType('image/tiff')).toBe(false);
    expect(isValidImageType('application/pdf')).toBe(false);
    expect(isValidImageType('text/plain')).toBe(false);
    expect(isValidImageType('')).toBe(false);
  });
});

describe('getBaseName', () => {
  it('strips file extension', () => {
    expect(getBaseName('photo.png')).toBe('photo');
    expect(getBaseName('my-image.jpeg')).toBe('my-image');
    expect(getBaseName('file.name.with.dots.svg')).toBe(
      'file.name.with.dots'
    );
  });

  it('returns "converted" for undefined/empty', () => {
    expect(getBaseName()).toBe('converted');
    expect(getBaseName(undefined)).toBe('converted');
  });

  it('handles filenames without extension', () => {
    expect(getBaseName('noextension')).toBe('noextension');
  });
});
