'use client';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IconDefinition } from '@fortawesome/free-solid-svg-icons';

interface IconProps {
  icon: IconDefinition;
  className?: string;
  size?: 'xs' | 'sm' | 'lg' | '1x' | '2x' | '3x' | '4x' | '5x' | '6x' | '7x' | '8x' | '9x' | '10x';
  color?: string;
}

export default function Icon({ icon, className = '', size = '1x', color }: IconProps) {
  return (
    <FontAwesomeIcon
      icon={icon}
      className={`icon icon-${size} ${className}`}
      style={color ? { color } : undefined}
    />
  );
} 