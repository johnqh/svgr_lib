export type { ValidationResult } from './validation';
export {
  isValidImageType,
  getBaseName,
  getImageTypeDisplayName,
  getSupportedFormatsDisplay,
  validateImageFile,
  getAcceptedFileExtensions,
  MAX_FILE_SIZE_BYTES,
  MAX_FILE_SIZE_MB,
} from './validation';
export type { SvgDimensions } from './svg';
export { getSvgDimensions, getSvgFileSize, getSvgFileSizeKB } from './svg';
