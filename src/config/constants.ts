export const APP_NAME = 'SVGR';
export const APP_DOMAIN = 'svgr.app';
export const COMPANY_NAME = 'Sudobility Inc.';

export const DEFAULT_API_URL = 'https://api.svgr.app';

export const QUALITY_MIN = 1;
export const QUALITY_MAX = 10;
export const QUALITY_DEFAULT = 5;

export const SUPPORTED_IMAGE_TYPES = [
  'image/png',
  'image/jpeg',
  'image/webp',
  'image/bmp',
  'image/gif',
] as const;

export type SupportedImageType = (typeof SUPPORTED_IMAGE_TYPES)[number];
