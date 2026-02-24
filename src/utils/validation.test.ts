import { describe, expect, it } from 'vitest';
import {
  getAcceptedFileExtensions,
  getBaseName,
  getImageTypeDisplayName,
  getSupportedFormatsDisplay,
  isValidImageType,
  MAX_FILE_SIZE_BYTES,
  MAX_FILE_SIZE_MB,
  validateImageFile,
} from './validation';

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

  it('is case-sensitive', () => {
    expect(isValidImageType('IMAGE/PNG')).toBe(false);
    expect(isValidImageType('Image/Png')).toBe(false);
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

describe('getImageTypeDisplayName', () => {
  it('returns uppercase format name for supported types', () => {
    expect(getImageTypeDisplayName('image/png')).toBe('PNG');
    expect(getImageTypeDisplayName('image/jpeg')).toBe('JPEG');
    expect(getImageTypeDisplayName('image/webp')).toBe('WEBP');
    expect(getImageTypeDisplayName('image/bmp')).toBe('BMP');
    expect(getImageTypeDisplayName('image/gif')).toBe('GIF');
  });

  it('returns "Unknown" for unsupported types', () => {
    expect(getImageTypeDisplayName('image/tiff')).toBe('Unknown');
    expect(getImageTypeDisplayName('application/pdf')).toBe('Unknown');
    expect(getImageTypeDisplayName('')).toBe('Unknown');
  });
});

describe('getSupportedFormatsDisplay', () => {
  it('returns comma-separated uppercase format names', () => {
    const result = getSupportedFormatsDisplay();
    expect(result).toBe('PNG, JPEG, WEBP, BMP, GIF');
  });

  it('includes all 5 supported formats', () => {
    const result = getSupportedFormatsDisplay();
    const formats = result.split(', ');
    expect(formats).toHaveLength(5);
  });
});

describe('validateImageFile', () => {
  it('validates a supported image type with valid size', () => {
    const result = validateImageFile('image/png', 1024);
    expect(result).toEqual({ valid: true, error: null });
  });

  it('rejects unsupported MIME types with a helpful message', () => {
    const result = validateImageFile('image/tiff', 1024);
    expect(result.valid).toBe(false);
    expect(result.error).toContain('TIFF');
    expect(result.error).toContain('Supported formats');
  });

  it('rejects non-image MIME types', () => {
    const result = validateImageFile('application/pdf', 1024);
    expect(result.valid).toBe(false);
    expect(result.error).toContain('PDF');
  });

  it('handles empty MIME type', () => {
    const result = validateImageFile('', 1024);
    expect(result.valid).toBe(false);
    expect(result.error).toContain('empty');
  });

  it('rejects empty files (size 0)', () => {
    const result = validateImageFile('image/png', 0);
    expect(result.valid).toBe(false);
    expect(result.error).toContain('empty');
  });

  it('rejects negative file sizes', () => {
    const result = validateImageFile('image/png', -1);
    expect(result.valid).toBe(false);
    expect(result.error).toContain('empty');
  });

  it('rejects files exceeding maximum size', () => {
    const result = validateImageFile('image/png', MAX_FILE_SIZE_BYTES + 1);
    expect(result.valid).toBe(false);
    expect(result.error).toContain(`${MAX_FILE_SIZE_MB} MB`);
  });

  it('accepts files at exactly the maximum size', () => {
    const result = validateImageFile('image/png', MAX_FILE_SIZE_BYTES);
    expect(result).toEqual({ valid: true, error: null });
  });

  it('includes actual file size in error for oversized files', () => {
    const result = validateImageFile('image/png', 15 * 1024 * 1024);
    expect(result.valid).toBe(false);
    expect(result.error).toContain('15.0 MB');
  });

  it('checks MIME type before file size', () => {
    // Even with an oversized file, the MIME type error should come first
    const result = validateImageFile('image/tiff', MAX_FILE_SIZE_BYTES + 1);
    expect(result.valid).toBe(false);
    expect(result.error).toContain('TIFF');
  });

  it('validates all supported types', () => {
    const supportedTypes = [
      'image/png',
      'image/jpeg',
      'image/webp',
      'image/bmp',
      'image/gif',
    ];
    for (const type of supportedTypes) {
      const result = validateImageFile(type, 1024);
      expect(result.valid).toBe(true);
      expect(result.error).toBeNull();
    }
  });
});

describe('MAX_FILE_SIZE constants', () => {
  it('MAX_FILE_SIZE_BYTES is 10 MB', () => {
    expect(MAX_FILE_SIZE_BYTES).toBe(10 * 1024 * 1024);
  });

  it('MAX_FILE_SIZE_MB matches MAX_FILE_SIZE_BYTES', () => {
    expect(MAX_FILE_SIZE_MB).toBe(MAX_FILE_SIZE_BYTES / (1024 * 1024));
  });
});

describe('getAcceptedFileExtensions', () => {
  it('returns comma-separated file extensions', () => {
    const result = getAcceptedFileExtensions();
    expect(result).toContain('.png');
    expect(result).toContain('.jpg');
    expect(result).toContain('.jpeg');
    expect(result).toContain('.webp');
    expect(result).toContain('.bmp');
    expect(result).toContain('.gif');
  });

  it('returns a string usable in HTML file input accept attribute', () => {
    const result = getAcceptedFileExtensions();
    // Should be comma-separated with no spaces
    const extensions = result.split(',');
    for (const ext of extensions) {
      expect(ext).toMatch(/^\.\w+$/);
    }
  });

  it('includes both .jpg and .jpeg for JPEG', () => {
    const result = getAcceptedFileExtensions();
    const extensions = result.split(',');
    expect(extensions).toContain('.jpg');
    expect(extensions).toContain('.jpeg');
  });
});
