'use client';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInstagram, faTiktok, faYoutube, faDiscord } from '@fortawesome/free-brands-svg-icons';

interface SocialLink {
  icon: any;
  url: string;
  label: string;
}

const socialLinks: SocialLink[] = [
  {
    icon: faInstagram,
    url: 'https://instagram.com/basrocketry',
    label: 'Instagram'
  },
  {
    icon: faTiktok,
    url: 'https://tiktok.com/@basrocketry',
    label: 'TikTok'
  },
  {
    icon: faYoutube,
    url: 'https://youtube.com/basrocketry',
    label: 'YouTube'
  },
  {
    icon: faDiscord,
    url: 'https://discord.gg/basrocketry',
    label: 'Discord'
  }
];

export default function SocialLinks() {
  return (
    <div className="social-links">
      {socialLinks.map((link, index) => (
        <a
          key={index}
          href={link.url}
          target="_blank"
          rel="noopener noreferrer"
          className="social-link"
          aria-label={link.label}
        >
          <FontAwesomeIcon icon={link.icon} />
        </a>
      ))}
    </div>
  );
} 