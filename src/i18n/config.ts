/**
 * Describes a supported language in the SVGR application.
 *
 * Contains both the internal language code used for routing and translation
 * lookups, and the standard hreflang value used for SEO purposes.
 */
export interface LanguageInfo {
  /** Internal language code used for translations and routing (e.g., `'en'`, `'zh-hant'`). */
  code: string;
  /** English name of the language (e.g., `'Japanese'`). */
  name: string;
  /** Native name of the language (e.g., `'日本語'`). */
  nativeName: string;
  /** Standard hreflang attribute value for SEO (e.g., `'zh-Hant'`). May differ from `code`. */
  hreflang: string;
}

/** All 16 languages supported by the SVGR application. */
export const SUPPORTED_LANGUAGES: LanguageInfo[] = [
  { code: 'en', name: 'English', nativeName: 'English', hreflang: 'en' },
  {
    code: 'zh',
    name: 'Chinese (Simplified)',
    nativeName: '\u4e2d\u6587(\u7b80\u4f53)',
    hreflang: 'zh-Hans',
  },
  {
    code: 'zh-hant',
    name: 'Chinese (Traditional)',
    nativeName: '\u4e2d\u6587(\u7e41\u9ad4)',
    hreflang: 'zh-Hant',
  },
  {
    code: 'ja',
    name: 'Japanese',
    nativeName: '\u65e5\u672c\u8a9e',
    hreflang: 'ja',
  },
  {
    code: 'ko',
    name: 'Korean',
    nativeName: '\ud55c\uad6d\uc5b4',
    hreflang: 'ko',
  },
  {
    code: 'es',
    name: 'Spanish',
    nativeName: 'Espa\u00f1ol',
    hreflang: 'es',
  },
  {
    code: 'fr',
    name: 'French',
    nativeName: 'Fran\u00e7ais',
    hreflang: 'fr',
  },
  { code: 'de', name: 'German', nativeName: 'Deutsch', hreflang: 'de' },
  {
    code: 'it',
    name: 'Italian',
    nativeName: 'Italiano',
    hreflang: 'it',
  },
  {
    code: 'pt',
    name: 'Portuguese',
    nativeName: 'Portugu\u00eas',
    hreflang: 'pt',
  },
  {
    code: 'ru',
    name: 'Russian',
    nativeName: '\u0420\u0443\u0441\u0441\u043a\u0438\u0439',
    hreflang: 'ru',
  },
  {
    code: 'ar',
    name: 'Arabic',
    nativeName: '\u0627\u0644\u0639\u0631\u0628\u064a\u0629',
    hreflang: 'ar',
  },
  {
    code: 'sv',
    name: 'Swedish',
    nativeName: 'Svenska',
    hreflang: 'sv',
  },
  {
    code: 'th',
    name: 'Thai',
    nativeName: '\u0e44\u0e17\u0e22',
    hreflang: 'th',
  },
  {
    code: 'uk',
    name: 'Ukrainian',
    nativeName: '\u0423\u043a\u0440\u0430\u0457\u043d\u0441\u044c\u043a\u0430',
    hreflang: 'uk',
  },
  {
    code: 'vi',
    name: 'Vietnamese',
    nativeName: 'Ti\u1ebfng Vi\u1ec7t',
    hreflang: 'vi',
  },
];

/** Array of all supported language codes, derived from {@link SUPPORTED_LANGUAGES}. */
export const SUPPORTED_LANGUAGE_CODES = SUPPORTED_LANGUAGES.map(l => l.code);

/** The default/fallback language code used when no language preference is set. */
export const DEFAULT_LANGUAGE = 'en';

/** The translation namespaces used by the i18n system. */
export const I18N_NAMESPACES = ['svgr', 'auth'] as const;

/** The default translation namespace. */
export const DEFAULT_NAMESPACE = 'svgr';

/**
 * Maps internal language codes to their corresponding hreflang attribute values.
 *
 * This mapping is critical for SEO in the web app. Internal codes (e.g., `'zh-hant'`)
 * may differ from the standard hreflang values (e.g., `'zh-Hant'`).
 */
export const LANGUAGE_HREFLANG_MAP: Record<string, string> = Object.fromEntries(
  SUPPORTED_LANGUAGES.map(l => [l.code, l.hreflang])
);
