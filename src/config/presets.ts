import { QUALITY_DEFAULT, QUALITY_MAX, QUALITY_MIN } from './constants';

/**
 * A named preset for image conversion settings.
 *
 * Presets provide quick-select configurations for common
 * quality and transparency combinations.
 */
export interface ConversionPreset {
  /** Unique identifier for the preset (e.g., `'fast'`, `'balanced'`, `'quality'`). */
  id: string;
  /** Human-readable display name for the preset (e.g., `'Fast'`, `'Balanced'`). */
  name: string;
  /** A brief description of the preset's intended use case. */
  description: string;
  /** The quality setting for this preset (1-10). */
  quality: number;
  /** Whether the SVG output should have a transparent background. */
  transparentBg: boolean;
}

/**
 * Built-in conversion presets for common use cases.
 *
 * Provides four presets:
 * - **Fast**: Low quality for quick previews.
 * - **Balanced**: Default settings for general use.
 * - **Quality**: High quality for final output.
 * - **Transparent**: High quality with transparent background, ideal for logos/icons.
 */
export const CONVERSION_PRESETS: readonly ConversionPreset[] = [
  {
    id: 'fast',
    name: 'Fast',
    description: 'Low quality for quick previews',
    quality: QUALITY_MIN + 1,
    transparentBg: false,
  },
  {
    id: 'balanced',
    name: 'Balanced',
    description: 'Default settings for general use',
    quality: QUALITY_DEFAULT,
    transparentBg: false,
  },
  {
    id: 'quality',
    name: 'Quality',
    description: 'High quality for final output',
    quality: QUALITY_MAX - 1,
    transparentBg: false,
  },
  {
    id: 'transparent',
    name: 'Transparent',
    description: 'High quality with transparent background',
    quality: QUALITY_MAX - 1,
    transparentBg: true,
  },
] as const;

/** The default preset ID used when no preset is explicitly selected. */
export const DEFAULT_PRESET_ID = 'balanced';

/**
 * Retrieves a conversion preset by its ID.
 *
 * @param id - The unique identifier of the preset to find.
 * @returns The matching {@link ConversionPreset}, or `undefined` if no preset matches.
 *
 * @example
 * ```ts
 * const preset = getPresetById('quality');
 * if (preset) {
 *   converter.setQuality(preset.quality);
 *   converter.setTransparentBg(preset.transparentBg);
 * }
 * ```
 */
export function getPresetById(id: string): ConversionPreset | undefined {
  return CONVERSION_PRESETS.find(p => p.id === id);
}

/**
 * Returns the default conversion preset.
 *
 * @returns The default {@link ConversionPreset} (the `'balanced'` preset).
 */
export function getDefaultPreset(): ConversionPreset {
  const preset = getPresetById(DEFAULT_PRESET_ID);
  // The default preset always exists in CONVERSION_PRESETS
  return preset as ConversionPreset;
}
