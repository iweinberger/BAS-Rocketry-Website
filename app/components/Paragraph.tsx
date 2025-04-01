'use client';

interface ParagraphProps {
  children: React.ReactNode;
  className?: string;
  size?: 'small' | 'medium' | 'large';
}

export default function Paragraph({ children, className = '', size = 'medium' }: ParagraphProps) {
  const baseClasses = 'paragraph';
  const sizeClasses = {
    small: 'paragraph-small',
    medium: 'paragraph-medium',
    large: 'paragraph-large',
  };

  return (
    <p className={`${baseClasses} ${sizeClasses[size]} ${className}`}>
      {children}
    </p>
  );
} 