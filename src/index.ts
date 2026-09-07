// Config
export type {
  SvgrAppConfig,
  FirebaseConfig,
  RevenueCatConfig,
} from './config/index.js';
export {
  APP_NAME,
  APP_DOMAIN,
  COMPANY_NAME,
  QUALITY_MIN,
  QUALITY_MAX,
  QUALITY_DEFAULT,
  SUPPORTED_IMAGE_TYPES,
  MAX_PIXELS,
} from './config/index.js';
export type { SupportedImageType } from './config/index.js';
export type { ConversionPreset } from './config/index.js';
export {
  CONVERSION_PRESETS,
  DEFAULT_PRESET_ID,
  getPresetById,
  getDefaultPreset,
} from './config/index.js';

// i18n
export type { LanguageInfo } from './i18n/index.js';
export {
  SUPPORTED_LANGUAGES,
  SUPPORTED_LANGUAGE_CODES,
  DEFAULT_LANGUAGE,
  I18N_NAMESPACES,
  DEFAULT_NAMESPACE,
  LANGUAGE_HREFLANG_MAP,
} from './i18n/index.js';

// Utils
export type { ValidationResult } from './utils/index.js';
export {
  isValidImageType,
  getBaseName,
  getImageTypeDisplayName,
  getSupportedFormatsDisplay,
  validateImageFile,
  getAcceptedFileExtensions,
  MAX_FILE_SIZE_BYTES,
  MAX_FILE_SIZE_MB,
} from './utils/index.js';
export type { SvgDimensions } from './utils/index.js';
export {
  getSvgDimensions,
  getSvgFileSize,
  getSvgFileSizeKB,
} from './utils/index.js';
export { scaleImageWeb } from './utils/index.js';

// Hooks
export type {
  ImageConverterState,
  UseImageConverterReturn,
  ScaleImageFn,
  UseCommunitiesReturn,
} from './hooks/index.js';
export {
  useImageConverter,
  useCommunities,
  OCR_SUPPORTED_IMAGE_TYPES,
  TRANSPARENT_BG_SUPPORTED_IMAGE_TYPES,
  supportsOcrOption,
  supportsTransparentBgOption,
} from './hooks/index.js';

// Re-export types from svgr_types/svgr_client for convenience
export type {
  ImageType,
  Community,
  CommunityPlatform,
} from '@sudobility/svgr_types';
export { IMAGE_TYPES, COMMUNITY_PLATFORMS } from '@sudobility/svgr_types';
