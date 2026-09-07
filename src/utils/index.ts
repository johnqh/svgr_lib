export type { ValidationResult } from './validation.js';
export {
  isValidImageType,
  getBaseName,
  getImageTypeDisplayName,
  getSupportedFormatsDisplay,
  validateImageFile,
  getAcceptedFileExtensions,
  MAX_FILE_SIZE_BYTES,
  MAX_FILE_SIZE_MB,
} from './validation.js';
export type { SvgDimensions } from './svg.js';
export { getSvgDimensions, getSvgFileSize, getSvgFileSizeKB } from './svg.js';
export { scaleImageWeb } from './scale-image.js';
