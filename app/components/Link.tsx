'use client';

import NextLink from 'next/link';

interface CustomLinkProps {
  href: string;
  children: React.ReactNode;
  className?: string;
  target?: string;
  rel?: string;
}

export default function CustomLink({
  href,
  children,
  className = '',
  target,
  rel,
}: CustomLinkProps) {
  const isExternal = href.startsWith('http');

  if (isExternal) {
    return (
      <a
        href={href}
        className={`link external-link ${className}`}
        target={target || '_blank'}
        rel={rel || 'noopener noreferrer'}
      >
        {children}
      </a>
    );
  }

  return (
    <NextLink href={href} className={`link internal-link ${className}`}>
      {children}
    </NextLink>
  );
} 