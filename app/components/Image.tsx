'use client';

import { useState } from 'react';
import Image from 'next/image';

interface CustomImageProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  className?: string;
}

export default function CustomImage({ src, alt, width, height, className = '' }: CustomImageProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);

  const handleLoad = () => {
    setIsLoading(false);
  };

  const handleError = () => {
    setIsLoading(false);
    setError(true);
  };

  if (error) {
    return (
      <div className={`image-error ${className}`}>
        <span>Failed to load image</span>
      </div>
    );
  }

  return (
    <div className={`image-container ${className}`}>
      {isLoading && <div className="image-loading">Loading...</div>}
      <Image
        src={src}
        alt={alt}
        width={width}
        height={height}
        onLoad={handleLoad}
        onError={handleError}
        className={`image ${isLoading ? 'loading' : 'loaded'}`}
      />
    </div>
  );
} 