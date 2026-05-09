import { MAX_PIXELS } from '../config/constants';

/**
 * Scale a base64-encoded image so total pixels (width × height) does not
 * exceed maxPixels. Uses the Canvas API (web environments). Returns the
 * original base64 unchanged if the image is already within bounds.
 *
 * @param base64 - Raw base64 image data (no data URL prefix)
 * @param maxPixels - Maximum allowed total pixels (width × height)
 * @returns Scaled base64 string (no data URL prefix)
 */
export async function scaleImageWeb(
  base64: string,
  maxPixels: number = MAX_PIXELS
): Promise<string> {
  return new Promise<string>((resolve, reject) => {
    const img = new Image();
    img.onload = () => {
      const { naturalWidth: w, naturalHeight: h } = img;
      const pixels = w * h;

      // Already within bounds
      if (pixels <= maxPixels) {
        resolve(base64);
        return;
      }

      const scale = Math.sqrt(maxPixels / pixels);
      const newW = Math.max(1, Math.round(w * scale));
      const newH = Math.max(1, Math.round(h * scale));

      const canvas = document.createElement('canvas');
      canvas.width = newW;
      canvas.height = newH;
      const ctx = canvas.getContext('2d');
      if (!ctx) {
        resolve(base64);
        return;
      }

      ctx.drawImage(img, 0, 0, newW, newH);
      // Export as PNG to preserve quality
      const dataUrl = canvas.toDataURL('image/png');
      resolve(dataUrl.split(',')[1]);
    };
    img.onerror = () => reject(new Error('Failed to load image for scaling'));
    img.src = `data:image/png;base64,${base64}`;
  });
}
