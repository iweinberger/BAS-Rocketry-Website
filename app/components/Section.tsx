'use client';

interface SectionProps {
  id?: string;
  title: string;
  description: string;
  children: React.ReactNode;
  className?: string;
}

export default function Section({ id, title, description, children, className = '' }: SectionProps) {
  return (
    <section id={id} className={`section ${className}`}>
      <div className="container">
        <h2>{title}</h2>
        <p>{description}</p>
        {children}
      </div>
    </section>
  );
} 