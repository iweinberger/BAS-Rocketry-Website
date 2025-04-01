'use client';

import Image from 'next/image';

interface AvatarProps {
  src?: string;
  alt?: string;
  size?: 'small' | 'medium' | 'large' | 'xlarge';
  fallback?: string;
  className?: string;
}

export default function Avatar({
  src,
  alt = '',
  size = 'medium',
  fallback,
  className = '',
}: AvatarProps) {
  const sizeClasses = {
    small: 'avatar-small',
    medium: 'avatar-medium',
    large: 'avatar-large',
    xlarge: 'avatar-xlarge',
  };

  if (src) {
    return (
      <div className={`avatar ${sizeClasses[size]} ${className}`}>
        <Image
          src={src}
          alt={alt}
          width={100}
          height={100}
          className="avatar-image"
        />
      </div>
    );
  }

  if (fallback) {
    return (
      <div className={`avatar ${sizeClasses[size]} avatar-fallback ${className}`}>
        <span className="avatar-fallback-text">
          {fallback
            .split(' ')
            .map((n) => n[0])
            .join('')
            .toUpperCase()}
        </span>
      </div>
    );
  }

  return (
    <div className={`avatar ${sizeClasses[size]} avatar-placeholder ${className}`}>
      <span className="avatar-placeholder-icon">?</span>
    </div>
  );
} 