'use client';

interface HeroProps {
  title: string;
  subtitle: string;
  buttonText?: string;
  buttonLink?: string;
}

export default function Hero({ title, subtitle, buttonText, buttonLink }: HeroProps) {
  return (
    <section className="hero">
      <div className="hero-content">
        <h1>{title}</h1>
        <p>{subtitle}</p>
        {buttonText && buttonLink && (
          <a href={buttonLink} className="cta-button">
            {buttonText}
          </a>
        )}
      </div>
    </section>
  );
} 