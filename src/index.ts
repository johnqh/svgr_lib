// Config
export type { SvgrAppConfig, FirebaseConfig, RevenueCatConfig } from './config';
export {
  APP_NAME,
  APP_DOMAIN,
  COMPANY_NAME,
  QUALITY_MIN,
  QUALITY_MAX,
  QUALITY_DEFAULT,
  SUPPORTED_IMAGE_TYPES,
  MAX_IMAGE_DIMENSION,
} from './config';
export type { SupportedImageType } from './config';
export type { ConversionPreset } from './config';
export {
  CONVERSION_PRESETS,
  DEFAULT_PRESET_ID,
  getPresetById,
  getDefaultPreset,
} from './config';

// i18n
export type { LanguageInfo } from './i18n';
export {
  SUPPORTED_LANGUAGES,
  SUPPORTED_LANGUAGE_CODES,
  DEFAULT_LANGUAGE,
  I18N_NAMESPACES,
  DEFAULT_NAMESPACE,
  LANGUAGE_HREFLANG_MAP,
} from './i18n';

// Utils
export type { ValidationResult } from './utils';
export {
  isValidImageType,
  getBaseName,
  getImageTypeDisplayName,
  getSupportedFormatsDisplay,
  validateImageFile,
  getAcceptedFileExtensions,
  MAX_FILE_SIZE_BYTES,
  MAX_FILE_SIZE_MB,
} from './utils';
export type { SvgDimensions } from './utils';
export { getSvgDimensions, getSvgFileSize, getSvgFileSizeKB } from './utils';
export { scaleImageWeb } from './utils';

// Hooks
export type {
  ImageConverterState,
  UseImageConverterReturn,
  ScaleImageFn,
} from './hooks';
export { useImageConverter } from './hooks';

// Re-export image type from svgr_types for convenience
export type { ImageType } from '@sudobility/svgr_types';
export { IMAGE_TYPES } from '@sudobility/svgr_types';
