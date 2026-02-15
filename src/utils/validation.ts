import { SUPPORTED_IMAGE_TYPES } from '../config/constants';

export function isValidImageType(mimeType: string): boolean {
  return (SUPPORTED_IMAGE_TYPES as readonly string[]).includes(mimeType);
}

export function getBaseName(filename?: string): string {
  return filename ? filename.replace(/\.[^.]+$/, '') : 'converted';
}
