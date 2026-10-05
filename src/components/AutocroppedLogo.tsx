import React, { useState, useEffect, useRef } from 'react';
import { getOptimizedImageUrl } from '../utils/imageUtils';

interface AutocroppedLogoProps {
  src: string;
  alt: string;
  className?: string;
  onClick?: () => void;
  id?: string;
  style?: React.CSSProperties;
  fallbackSrc?: string;
}

export function AutocroppedLogo({ src, alt, className = '', onClick, id, style, fallbackSrc }: AutocroppedLogoProps) {
  const initialSrc = getOptimizedImageUrl(src) || fallbackSrc || '';
  const [displaySrc, setDisplaySrc] = useState<string>(initialSrc);
  const [hasError, setHasError] = useState<boolean>(false);
  const isMountedRef = useRef<boolean>(true);

  useEffect(() => {
    isMountedRef.current = true;
    const targetSrc = getOptimizedImageUrl(src) || fallbackSrc;
    if (!targetSrc) {
      setDisplaySrc('');
      return;
    }

    setHasError(false);
    setDisplaySrc(targetSrc);

    // Try canvas auto-cropping in background without blocking current display
    const img = new Image();
    if (targetSrc.startsWith('http://') || targetSrc.startsWith('https://')) {
      img.crossOrigin = 'anonymous';
    }
    img.src = targetSrc;

    img.onload = () => {
      if (!isMountedRef.current) return;
      try {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        const width = img.naturalWidth || img.width;
        const height = img.naturalHeight || img.height;
        if (!width || !height) return;

        canvas.width = width;
        canvas.height = height;
        ctx.drawImage(img, 0, 0);

        const imgData = ctx.getImageData(0, 0, width, height);
        const data = imgData.data;

        let minX = width;
        let maxX = 0;
        let minY = height;
        let maxY = 0;
        let hasContent = false;

        for (let y = 0; y < height; y++) {
          for (let x = 0; x < width; x++) {
            const index = (y * width + x) * 4;
            const r = data[index];
            const g = data[index + 1];
            const b = data[index + 2];
            const a = data[index + 3];

            const isTransparent = a < 15;
            const isWhite = r > 240 && g > 240 && b > 240;

            if (!isTransparent && !isWhite) {
              hasContent = true;
              if (x < minX) minX = x;
              if (x > maxX) maxX = x;
              if (y < minY) minY = y;
              if (y > maxY) maxY = y;

              // Recolor logo to brand-wine burgundy (#A85967)
              data[index] = 168;
              data[index + 1] = 89;
              data[index + 2] = 103;
            } else {
              data[index + 3] = 0;
            }
          }
        }

        ctx.putImageData(imgData, 0, 0);

        if (!hasContent || maxX < minX || maxY < minY) {
          return;
        }

        const margin = 8;
        const cropX = Math.max(0, minX - margin);
        const cropY = Math.max(0, minY - margin);
        const cropW = Math.min(width - cropX, (maxX - minX) + margin * 2);
        const cropH = Math.min(height - cropY, (maxY - minY) + margin * 2);

        const cropCanvas = document.createElement('canvas');
        cropCanvas.width = cropW;
        cropCanvas.height = cropH;
        const cropCtx = cropCanvas.getContext('2d');
        if (!cropCtx) return;

        cropCtx.drawImage(canvas, cropX, cropY, cropW, cropH, 0, 0, cropW, cropH);

        if (isMountedRef.current) {
          const croppedDataUrl = cropCanvas.toDataURL('image/png');
          setDisplaySrc(croppedDataUrl);
        }
      } catch (err) {
        // If Canvas CORS is restricted by browser security policies, keep displaying the raw target image safely
        if (isMountedRef.current) {
          setDisplaySrc(targetSrc);
        }
      }
    };

    img.onerror = () => {
      if (isMountedRef.current && fallbackSrc) {
        setHasError(true);
        setDisplaySrc(fallbackSrc);
      }
    };

    return () => {
      isMountedRef.current = false;
    };
  }, [src, fallbackSrc]);

  if (!displaySrc && !fallbackSrc) return null;

  const activeSrc = hasError && fallbackSrc ? fallbackSrc : (displaySrc || fallbackSrc || '');

  return (
    <img
      src={activeSrc}
      alt={alt}
      className={className}
      onClick={onClick}
      id={id}
      style={style}
      referrerPolicy="no-referrer"
      loading="eager"
      onError={() => {
        if (!hasError && fallbackSrc && activeSrc !== fallbackSrc) {
          setHasError(true);
          setDisplaySrc(fallbackSrc);
        }
      }}
    />
  );
}
