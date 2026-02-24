import { describe, expect, it } from 'vitest';
import {
  CONVERSION_PRESETS,
  DEFAULT_PRESET_ID,
  getDefaultPreset,
  getPresetById,
} from './presets';
import { QUALITY_DEFAULT, QUALITY_MAX, QUALITY_MIN } from './constants';

describe('CONVERSION_PRESETS', () => {
  it('has at least one preset', () => {
    expect(CONVERSION_PRESETS.length).toBeGreaterThan(0);
  });

  it('has unique IDs', () => {
    const ids = CONVERSION_PRESETS.map(p => p.id);
    const uniqueIds = new Set(ids);
    expect(uniqueIds.size).toBe(ids.length);
  });

  it('has unique names', () => {
    const names = CONVERSION_PRESETS.map(p => p.name);
    const uniqueNames = new Set(names);
    expect(uniqueNames.size).toBe(names.length);
  });

  it('all presets have required fields', () => {
    for (const preset of CONVERSION_PRESETS) {
      expect(preset.id).toBeTruthy();
      expect(preset.name).toBeTruthy();
      expect(preset.description).toBeTruthy();
      expect(typeof preset.quality).toBe('number');
      expect(typeof preset.transparentBg).toBe('boolean');
    }
  });

  it('all preset quality values are within valid range', () => {
    for (const preset of CONVERSION_PRESETS) {
      expect(preset.quality).toBeGreaterThanOrEqual(QUALITY_MIN);
      expect(preset.quality).toBeLessThanOrEqual(QUALITY_MAX);
    }
  });

  it('includes a balanced preset with default quality', () => {
    const balanced = CONVERSION_PRESETS.find(p => p.id === 'balanced');
    expect(balanced).toBeDefined();
    expect(balanced?.quality).toBe(QUALITY_DEFAULT);
  });

  it('includes a transparent preset with transparentBg enabled', () => {
    const transparent = CONVERSION_PRESETS.find(p => p.id === 'transparent');
    expect(transparent).toBeDefined();
    expect(transparent?.transparentBg).toBe(true);
  });

  it('fast preset has lower quality than quality preset', () => {
    const fast = CONVERSION_PRESETS.find(p => p.id === 'fast');
    const quality = CONVERSION_PRESETS.find(p => p.id === 'quality');
    expect(fast).toBeDefined();
    expect(quality).toBeDefined();
    expect(fast!.quality).toBeLessThan(quality!.quality);
  });
});

describe('DEFAULT_PRESET_ID', () => {
  it('references an existing preset', () => {
    const preset = CONVERSION_PRESETS.find(p => p.id === DEFAULT_PRESET_ID);
    expect(preset).toBeDefined();
  });

  it('is "balanced"', () => {
    expect(DEFAULT_PRESET_ID).toBe('balanced');
  });
});

describe('getPresetById', () => {
  it('returns the correct preset for a valid ID', () => {
    const preset = getPresetById('fast');
    expect(preset).toBeDefined();
    expect(preset?.id).toBe('fast');
    expect(preset?.name).toBe('Fast');
  });

  it('returns undefined for an invalid ID', () => {
    expect(getPresetById('nonexistent')).toBeUndefined();
    expect(getPresetById('')).toBeUndefined();
  });

  it('can retrieve all presets by their IDs', () => {
    for (const preset of CONVERSION_PRESETS) {
      const found = getPresetById(preset.id);
      expect(found).toEqual(preset);
    }
  });
});

describe('getDefaultPreset', () => {
  it('returns the balanced preset', () => {
    const preset = getDefaultPreset();
    expect(preset.id).toBe('balanced');
    expect(preset.quality).toBe(QUALITY_DEFAULT);
  });

  it('returns a complete preset object', () => {
    const preset = getDefaultPreset();
    expect(preset.id).toBeTruthy();
    expect(preset.name).toBeTruthy();
    expect(preset.description).toBeTruthy();
    expect(typeof preset.quality).toBe('number');
    expect(typeof preset.transparentBg).toBe('boolean');
  });
});
