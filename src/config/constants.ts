/** The display name of the application. */
export const APP_NAME = 'SVGR';

/** The primary domain for the SVGR web application. */
export const APP_DOMAIN = 'svgr.app';

/** The name of the company that publishes SVGR. */
export const COMPANY_NAME = 'Sudobility Inc.';

/** Minimum allowed quality value for image conversion (1 = lowest quality). */
export const QUALITY_MIN = 1;

/** Maximum allowed quality value for image conversion (10 = highest quality). */
export const QUALITY_MAX = 10;

/** Default quality value for image conversion. */
export const QUALITY_DEFAULT = 5;

/**
 * The list of MIME types accepted for image conversion.
 *
 * Currently supports: PNG, JPEG, WebP, BMP, and GIF.
 * Adding a new type requires updating this array and the validation logic.
 */
export const SUPPORTED_IMAGE_TYPES = [
  'image/png',
  'image/jpeg',
  'image/webp',
  'image/bmp',
  'image/gif',
] as const;

/** Maximum dimension (width or height) for images sent to the server. */
export const MAX_IMAGE_DIMENSION = 1024;

/** A union type of all supported image MIME types. */
export type SupportedImageType = (typeof SUPPORTED_IMAGE_TYPES)[number];
