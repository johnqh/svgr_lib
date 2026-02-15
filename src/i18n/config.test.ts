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
