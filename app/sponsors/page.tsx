'use client';

import Image from 'next/image';

const sponsors = [
  {
    name: "Bnei Akiva Schools",
    logo: "/sponsors/alpha.png",
    description: "Our school"
  },
  {
    name: "Sponsor 2",
    logo: "/sponsors/alpha.png",
    description: "Coming soon"
  },
  {
    name: "Sponsor 3",
    logo: "/sponsors/alpha.png",
    description: "Coming soon"
  },
  {
    name: "Sponsor 4",
    logo: "/sponsors/alpha.png",
    description: "Coming soon"
  },
  {
    name: "Sponsor 5",
    logo: "/sponsors/alpha.png",
    description: "Coming soon"
  }
];

export default function Sponsors() {
  return (
    <main>
      <section className="sponsors-hero">
        <h1>Our Sponsors</h1>
        <p>Thank you to all our amazing sponsors who make our projects possible!</p>
      </section>

      <section className="sponsors-grid">
        <div className="sponsors-row">
          {sponsors.map((sponsor, index) => (
            <div key={index} className="sponsor-card">
              <div className="sponsor-logo">
                <div className="sponsor-logo-placeholder">
                  {sponsor.name.charAt(0)}
                </div>
                <Image
                  src={sponsor.logo}
                  alt={`${sponsor.name} logo`}
                  width={180}
                  height={180}
                  className="sponsor-img"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.style.display = 'none';
                    target.parentElement?.querySelector('.sponsor-logo-placeholder')?.classList.add('visible');
                  }}
                  priority={index === 0}
                />
              </div>
              <h2>{sponsor.name}</h2>
              <p>{sponsor.description}</p>
            </div>
          ))}
        </div>
        <a href="/#contact" className="contact-button">Contact Us</a>
      </section>
    </main>
  );
} 