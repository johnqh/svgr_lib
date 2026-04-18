import { useCallback, useState } from 'react';
import { useConvert } from '@sudobility/svgr_client';
import type { ImageType, SvgrClient } from '@sudobility/svgr_client';
import { QUALITY_DEFAULT } from '../config/constants';

/**
 * Represents the current state of the image converter.
 *
 * Tracks quality settings, background transparency preference,
 * the resulting SVG output, any error that occurred, and whether
 * a conversion is currently in progress.
 */
export interface ImageConverterState {
  /** Conversion quality level (1-10, where 1 is lowest and 10 is highest). */
  quality: number;
  /** Whether the SVG output should have a transparent background. */
  transparentBg: boolean;
  /** Whether to run OCR text recognition on the image. */
  ocr: boolean;
  /** Whether to aggressively merge small/thin vector paths into neighbors. */
  mergePaths: boolean;
  /** Image type for preprocessing: 'auto', 'photo', or 'design'. */
  imageType: ImageType;
  /** The resulting SVG string after a successful conversion, or null if no conversion has completed. */
  svgResult: string | null;
  /** An error message if the last conversion failed, or null if no error occurred. */
  error: string | null;
  /** Whether a conversion is currently in progress. */
  isConverting: boolean;
}

/**
 * The return value of the {@link useImageConverter} hook.
 *
 * Extends {@link ImageConverterState} with actions to modify settings,
 * trigger conversions, and reset the converter state.
 */
export interface UseImageConverterReturn extends ImageConverterState {
  /** Sets the conversion quality level. Must be between QUALITY_MIN (1) and QUALITY_MAX (10). */
  setQuality: (q: number) => void;
  /** Sets whether the SVG output should have a transparent background. */
  setTransparentBg: (v: boolean) => void;
  /** Sets whether to run OCR text recognition. */
  setOcr: (v: boolean) => void;
  /** Sets whether to aggressively merge small/thin vector paths. */
  setMergePaths: (v: boolean) => void;
  /** Sets the image type for preprocessing. */
  setImageType: (v: ImageType) => void;
  /**
   * Triggers a conversion of the given base64-encoded image.
   * @param base64 - The base64-encoded image data to convert.
   * @param filename - The original filename of the image being converted.
   */
  convert: (base64: string, filename: string) => void;
  /** Resets the converter state, clearing the SVG result and any error. */
  reset: () => void;
}

/**
 * React hook that manages the image-to-SVG conversion workflow.
 *
 * This is the central abstraction for the SVGR conversion process, used by
 * both the web app (`svgr_app`) and the React Native app (`svgr_app_rn`).
 *
 * Manages local state for quality, transparent background preference,
 * the resulting SVG, and any errors. Delegates the actual API call
 * to `@sudobility/svgr_client`'s `useConvert` mutation hook.
 *
 * @param client - An initialized {@link SvgrClient} instance used to make API calls.
 * @returns An object containing the current converter state and actions to control it.
 *
 * @example
 * ```tsx
 * const converter = useImageConverter(client);
 *
 * // Adjust settings
 * converter.setQuality(8);
 * converter.setTransparentBg(true);
 *
 * // Convert an image
 * converter.convert(base64Data, 'photo.png');
 *
 * // Check results
 * if (converter.svgResult) {
 *   // Use the SVG output
 * }
 * if (converter.error) {
 *   // Handle the error
 * }
 *
 * // Reset for a new conversion
 * converter.reset();
 * ```
 */
export function useImageConverter(client: SvgrClient): UseImageConverterReturn {
  const convertMutation = useConvert(client);

  const [quality, setQuality] = useState(QUALITY_DEFAULT);
  const [transparentBg, setTransparentBg] = useState(false);
  const [ocr, setOcr] = useState(true);
  const [mergePaths, setMergePaths] = useState(false);
  const [imageType, setImageType] = useState<ImageType>('auto');
  const [svgResult, setSvgResult] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isFetchingSvg, setIsFetchingSvg] = useState(false);

  const convert = useCallback(
    async (base64: string, filename: string) => {
      setError(null);
      try {
        const response = await convertMutation.mutateAsync({
          original: base64,
          filename,
          quality,
          transparentBg,
          ocr,
          mergePaths,
          imageType,
        });
        if (response.success && response.data) {
          setIsFetchingSvg(true);
          try {
            const svg = await client.fetchSvg(response.data.cacheId);
            setSvgResult(svg);
          } finally {
            setIsFetchingSvg(false);
          }
        } else {
          setError(
            (response as { error?: string }).error || 'Conversion failed'
          );
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Conversion failed');
        setIsFetchingSvg(false);
      }
    },
    [
      convertMutation,
      client,
      quality,
      transparentBg,
      ocr,
      mergePaths,
      imageType,
    ]
  );

  const reset = useCallback(() => {
    setSvgResult(null);
    setError(null);
  }, []);

  return {
    quality,
    transparentBg,
    ocr,
    mergePaths,
    imageType,
    svgResult,
    error,
    isConverting: convertMutation.isPending || isFetchingSvg,
    setQuality,
    setTransparentBg,
    setOcr,
    setMergePaths,
    setImageType,
    convert,
    reset,
  };
}
