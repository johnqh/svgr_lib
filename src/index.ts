// Config
export type {
  SvgrAppConfig,
  FirebaseConfig,
  RevenueCatConfig,
} from './config';
export {
  APP_NAME,
  APP_DOMAIN,
  COMPANY_NAME,
  DEFAULT_API_URL,
  QUALITY_MIN,
  QUALITY_MAX,
  QUALITY_DEFAULT,
  SUPPORTED_IMAGE_TYPES,
} from './config';
export type { SupportedImageType } from './config';

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
export { isValidImageType, getBaseName } from './utils';
export type { SvgDimensions } from './utils';
export { getSvgDimensions, getSvgFileSize, getSvgFileSizeKB } from './utils';

// Hooks
export type {
  ImageConverterState,
  UseImageConverterReturn,
} from './hooks';
export { useImageConverter } from './hooks';
