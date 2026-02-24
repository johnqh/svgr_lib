import {
  SUPPORTED_IMAGE_TYPES,
  type SupportedImageType,
} from '../config/constants';

/** Maximum file size allowed for image uploads, in bytes (10 MB). */
export const MAX_FILE_SIZE_BYTES = 10 * 1024 * 1024;

/** Maximum file size allowed for image uploads, in megabytes. */
export const MAX_FILE_SIZE_MB = 10;

/**
 * Validation result returned by {@link validateImageFile}.
 *
 * Contains a boolean indicating whether the file is valid and,
 * if invalid, a user-friendly error message describing the issue.
 */
export interface ValidationResult {
  /** Whether the file passed all validation checks. */
  valid: boolean;
  /** A user-friendly error message if validation failed, or null if valid. */
  error: string | null;
}

/**
 * Checks whether the given MIME type is a supported image format.
 *
 * Validates against the {@link SUPPORTED_IMAGE_TYPES} constant, which
 * includes: PNG, JPEG, WebP, BMP, and GIF.
 *
 * @param mimeType - The MIME type string to validate (e.g., `'image/png'`).
 * @returns `true` if the MIME type is supported, `false` otherwise.
 *
 * @example
 * ```ts
 * isValidImageType('image/png');  // true
 * isValidImageType('image/tiff'); // false
 * ```
 */
export function isValidImageType(mimeType: string): boolean {
  return (SUPPORTED_IMAGE_TYPES as readonly string[]).includes(mimeType);
}

/**
 * Extracts the base name from a filename by removing the file extension.
 *
 * Returns `'converted'` as a default name when no filename is provided.
 *
 * @param filename - The filename to extract the base name from.
 * @returns The filename without its extension, or `'converted'` if no filename is given.
 *
 * @example
 * ```ts
 * getBaseName('photo.png');      // 'photo'
 * getBaseName('file.name.svg');  // 'file.name'
 * getBaseName(undefined);        // 'converted'
 * ```
 */
export function getBaseName(filename?: string): string {
  return filename ? filename.replace(/\.[^.]+$/, '') : 'converted';
}

/**
 * Returns a user-friendly display name for a supported MIME type.
 *
 * Extracts the subtype from the MIME type and converts it to uppercase.
 * For unsupported types, returns `'Unknown'`.
 *
 * @param mimeType - The MIME type string (e.g., `'image/png'`).
 * @returns A display name for the MIME type (e.g., `'PNG'`).
 *
 * @example
 * ```ts
 * getImageTypeDisplayName('image/png');  // 'PNG'
 * getImageTypeDisplayName('image/jpeg'); // 'JPEG'
 * getImageTypeDisplayName('text/plain'); // 'Unknown'
 * ```
 */
export function getImageTypeDisplayName(mimeType: string): string {
  if (!isValidImageType(mimeType)) {
    return 'Unknown';
  }
  const subtype = mimeType.split('/')[1];
  return subtype.toUpperCase();
}

/**
 * Returns the list of supported image MIME types as a human-readable string.
 *
 * Useful for displaying supported formats to users in error messages or UI.
 *
 * @returns A comma-separated string of supported format names (e.g., `'PNG, JPEG, WEBP, BMP, GIF'`).
 *
 * @example
 * ```ts
 * getSupportedFormatsDisplay(); // 'PNG, JPEG, WEBP, BMP, GIF'
 * ```
 */
export function getSupportedFormatsDisplay(): string {
  return SUPPORTED_IMAGE_TYPES.map(type =>
    type.split('/')[1].toUpperCase()
  ).join(', ');
}

/**
 * Validates an image file's MIME type and size before upload.
 *
 * Checks that:
 * 1. The MIME type is one of the supported image formats ({@link SUPPORTED_IMAGE_TYPES}).
 * 2. The file size does not exceed the maximum allowed size ({@link MAX_FILE_SIZE_BYTES}).
 *
 * Returns a {@link ValidationResult} with a user-friendly error message if validation fails.
 *
 * @param mimeType - The MIME type of the file to validate (e.g., `'image/png'`).
 * @param fileSize - The size of the file in bytes.
 * @returns A {@link ValidationResult} indicating whether the file is valid.
 *
 * @example
 * ```ts
 * const result = validateImageFile('image/png', 1024);
 * if (!result.valid) {
 *   console.error(result.error);
 * }
 *
 * const invalid = validateImageFile('image/tiff', 1024);
 * // { valid: false, error: 'Unsupported file format "TIFF". Supported formats: PNG, JPEG, WEBP, BMP, GIF.' }
 *
 * const tooLarge = validateImageFile('image/png', 20 * 1024 * 1024);
 * // { valid: false, error: 'File size exceeds the maximum allowed size of 10 MB.' }
 * ```
 */
export function validateImageFile(
  mimeType: string,
  fileSize: number
): ValidationResult {
  if (!isValidImageType(mimeType)) {
    const typeName = mimeType.includes('/')
      ? mimeType.split('/')[1].toUpperCase()
      : mimeType || 'empty';
    return {
      valid: false,
      error: `Unsupported file format "${typeName}". Supported formats: ${getSupportedFormatsDisplay()}.`,
    };
  }

  if (fileSize <= 0) {
    return {
      valid: false,
      error: 'File is empty.',
    };
  }

  if (fileSize > MAX_FILE_SIZE_BYTES) {
    const sizeMB = (fileSize / (1024 * 1024)).toFixed(1);
    return {
      valid: false,
      error: `File size (${sizeMB} MB) exceeds the maximum allowed size of ${MAX_FILE_SIZE_MB} MB.`,
    };
  }

  return { valid: true, error: null };
}

/**
 * Returns the list of file extensions accepted by file input elements.
 *
 * Generates an accept string compatible with HTML `<input type="file" accept="...">` elements.
 * Maps each supported MIME type to its common file extension.
 *
 * @returns A comma-separated string of file extensions (e.g., `'.png,.jpg,.jpeg,.webp,.bmp,.gif'`).
 */
export function getAcceptedFileExtensions(): string {
  const extensionMap: Record<SupportedImageType, string[]> = {
    'image/png': ['.png'],
    'image/jpeg': ['.jpg', '.jpeg'],
    'image/webp': ['.webp'],
    'image/bmp': ['.bmp'],
    'image/gif': ['.gif'],
  };
  return SUPPORTED_IMAGE_TYPES.flatMap(type => extensionMap[type]).join(',');
}
