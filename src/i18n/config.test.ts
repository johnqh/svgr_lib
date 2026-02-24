import { describe, expect, it } from 'vitest';
import {
  DEFAULT_LANGUAGE,
  DEFAULT_NAMESPACE,
  I18N_NAMESPACES,
  LANGUAGE_HREFLANG_MAP,
  SUPPORTED_LANGUAGE_CODES,
  SUPPORTED_LANGUAGES,
} from './config';

describe('i18n config', () => {
  it('has English as default language', () => {
    expect(DEFAULT_LANGUAGE).toBe('en');
  });

  it('has svgr as default namespace', () => {
    expect(DEFAULT_NAMESPACE).toBe('svgr');
  });

  it('has expected namespaces', () => {
    expect(I18N_NAMESPACES).toContain('svgr');
    expect(I18N_NAMESPACES).toContain('auth');
  });

  it('has 16 supported languages', () => {
    expect(SUPPORTED_LANGUAGES).toHaveLength(16);
  });

  it('language codes match SUPPORTED_LANGUAGES', () => {
    expect(SUPPORTED_LANGUAGE_CODES).toEqual(
      SUPPORTED_LANGUAGES.map(l => l.code)
    );
  });

  it('includes English in supported languages', () => {
    expect(SUPPORTED_LANGUAGE_CODES).toContain('en');
  });

  it('hreflang map has entries for all languages', () => {
    for (const lang of SUPPORTED_LANGUAGES) {
      expect(LANGUAGE_HREFLANG_MAP[lang.code]).toBe(lang.hreflang);
    }
  });

  it('each language has required fields', () => {
    for (const lang of SUPPORTED_LANGUAGES) {
      expect(lang.code).toBeTruthy();
      expect(lang.name).toBeTruthy();
      expect(lang.nativeName).toBeTruthy();
      expect(lang.hreflang).toBeTruthy();
    }
  });
});

describe('i18n language completeness', () => {
  const expectedLanguageCodes = [
    'en',
    'zh',
    'zh-hant',
    'ja',
    'ko',
    'es',
    'fr',
    'de',
    'it',
    'pt',
    'ru',
    'ar',
    'sv',
    'th',
    'uk',
    'vi',
  ];

  it('includes all 16 expected languages', () => {
    for (const code of expectedLanguageCodes) {
      expect(SUPPORTED_LANGUAGE_CODES).toContain(code);
    }
  });

  it('has no duplicate language codes', () => {
    const uniqueCodes = new Set(SUPPORTED_LANGUAGE_CODES);
    expect(uniqueCodes.size).toBe(SUPPORTED_LANGUAGE_CODES.length);
  });

  it('has no duplicate hreflang values', () => {
    const hreflangs = SUPPORTED_LANGUAGES.map(l => l.hreflang);
    const uniqueHreflangs = new Set(hreflangs);
    expect(uniqueHreflangs.size).toBe(hreflangs.length);
  });

  it('has no duplicate native names', () => {
    const nativeNames = SUPPORTED_LANGUAGES.map(l => l.nativeName);
    const uniqueNames = new Set(nativeNames);
    expect(uniqueNames.size).toBe(nativeNames.length);
  });
});

describe('i18n hreflang mapping', () => {
  it('maps zh to zh-Hans (simplified Chinese)', () => {
    expect(LANGUAGE_HREFLANG_MAP['zh']).toBe('zh-Hans');
  });

  it('maps zh-hant to zh-Hant (traditional Chinese)', () => {
    expect(LANGUAGE_HREFLANG_MAP['zh-hant']).toBe('zh-Hant');
  });

  it('maps simple codes to themselves', () => {
    const simpleCodes = [
      'en',
      'ja',
      'ko',
      'es',
      'fr',
      'de',
      'it',
      'pt',
      'ru',
      'ar',
      'sv',
      'th',
      'uk',
      'vi',
    ];
    for (const code of simpleCodes) {
      expect(LANGUAGE_HREFLANG_MAP[code]).toBe(code);
    }
  });

  it('hreflang map has exactly as many entries as supported languages', () => {
    expect(Object.keys(LANGUAGE_HREFLANG_MAP)).toHaveLength(
      SUPPORTED_LANGUAGES.length
    );
  });
});

describe('default language', () => {
  it('default language exists in supported languages', () => {
    expect(SUPPORTED_LANGUAGE_CODES).toContain(DEFAULT_LANGUAGE);
  });

  it('default language is first in the list', () => {
    expect(SUPPORTED_LANGUAGES[0].code).toBe(DEFAULT_LANGUAGE);
  });
});

describe('namespace configuration', () => {
  it('default namespace is included in the namespace list', () => {
    expect(
      (I18N_NAMESPACES as readonly string[]).includes(DEFAULT_NAMESPACE)
    ).toBe(true);
  });

  it('has no duplicate namespaces', () => {
    const uniqueNamespaces = new Set(I18N_NAMESPACES);
    expect(uniqueNamespaces.size).toBe(I18N_NAMESPACES.length);
  });

  it('all namespace values are non-empty strings', () => {
    for (const ns of I18N_NAMESPACES) {
      expect(typeof ns).toBe('string');
      expect(ns.length).toBeGreaterThan(0);
    }
  });
});
