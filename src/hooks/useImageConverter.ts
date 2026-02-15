import { useCallback, useState } from 'react';
import { useConvert } from '@sudobility/svgr_client';
import type { SvgrClient } from '@sudobility/svgr_client';
import { QUALITY_DEFAULT } from '../config/constants';

export interface ImageConverterState {
  quality: number;
  transparentBg: boolean;
  svgResult: string | null;
  error: string | null;
  isConverting: boolean;
}

export interface UseImageConverterReturn extends ImageConverterState {
  setQuality: (q: number) => void;
  setTransparentBg: (v: boolean) => void;
  convert: (base64: string, filename: string) => void;
  reset: () => void;
}

export function useImageConverter(client: SvgrClient): UseImageConverterReturn {
  const convertMutation = useConvert(client);

  const [quality, setQuality] = useState(QUALITY_DEFAULT);
  const [transparentBg, setTransparentBg] = useState(false);
  const [svgResult, setSvgResult] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const convert = useCallback(
    (base64: string, filename: string) => {
      setError(null);
      convertMutation.mutate(
        { original: base64, filename, quality, transparentBg },
        {
          onSuccess: response => {
            if (response.success && response.data) {
              setSvgResult(response.data.svg);
            } else {
              setError(
                (response as { error?: string }).error || 'Conversion failed'
              );
            }
          },
          onError: err => {
            setError(err instanceof Error ? err.message : 'Conversion failed');
          },
        }
      );
    },
    [convertMutation, quality, transparentBg]
  );

  const reset = useCallback(() => {
    setSvgResult(null);
    setError(null);
  }, []);

  return {
    quality,
    transparentBg,
    svgResult,
    error,
    isConverting: convertMutation.isPending,
    setQuality,
    setTransparentBg,
    convert,
    reset,
  };
}
