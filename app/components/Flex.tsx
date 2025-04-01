'use client';

interface FlexProps {
  children: React.ReactNode;
  className?: string;
  direction?: 'row' | 'column';
  wrap?: 'nowrap' | 'wrap' | 'wrap-reverse';
  gap?: 'none' | 'small' | 'medium' | 'large';
  align?: 'start' | 'center' | 'end' | 'stretch' | 'baseline';
  justify?: 'start' | 'center' | 'end' | 'between' | 'around' | 'evenly';
}

export default function Flex({
  children,
  className = '',
  direction = 'row',
  wrap = 'nowrap',
  gap = 'none',
  align = 'start',
  justify = 'start',
}: FlexProps) {
  const baseClasses = 'flex';
  const directionClasses = {
    row: 'flex-row',
    column: 'flex-col',
  };
  const wrapClasses = {
    nowrap: 'flex-nowrap',
    wrap: 'flex-wrap',
    'wrap-reverse': 'flex-wrap-reverse',
  };
  const gapClasses = {
    none: 'gap-none',
    small: 'gap-small',
    medium: 'gap-medium',
    large: 'gap-large',
  };
  const alignClasses = {
    start: 'items-start',
    center: 'items-center',
    end: 'items-end',
    stretch: 'items-stretch',
    baseline: 'items-baseline',
  };
  const justifyClasses = {
    start: 'justify-start',
    center: 'justify-center',
    end: 'justify-end',
    between: 'justify-between',
    around: 'justify-around',
    evenly: 'justify-evenly',
  };

  return (
    <div
      className={`${baseClasses} ${directionClasses[direction]} ${wrapClasses[wrap]} ${gapClasses[gap]} ${alignClasses[align]} ${justifyClasses[justify]} ${className}`}
    >
      {children}
    </div>
  );
} 