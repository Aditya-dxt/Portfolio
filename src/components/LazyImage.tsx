import { useState } from 'react';

interface LazyImageProps {
  src: string;
  alt: string;
  className?: string;
  /** Skip blur placeholder — use for hero portraits */
  sharp?: boolean;
  /** Load immediately for above-the-fold images */
  eager?: boolean;
}

export function LazyImage({
  src,
  alt,
  className = '',
  sharp = false,
  eager = false,
}: LazyImageProps) {
  const [loaded, setLoaded] = useState(false);

  return (
    <img
      src={src}
      alt={alt}
      loading={eager ? 'eager' : 'lazy'}
      decoding="async"
      fetchPriority={eager ? 'high' : undefined}
      data-loaded={sharp ? true : loaded}
      onLoad={() => setLoaded(true)}
      className={`${sharp ? '' : 'lazy-img'} ${className}`}
      style={
        sharp
          ? {
              imageRendering: 'auto',
              WebkitFontSmoothing: 'antialiased',
            }
          : undefined
      }
    />
  );
}
