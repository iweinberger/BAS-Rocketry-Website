'use client';

import Link from 'next/link';

export default function Footer() {
  return (
    <footer>
      <div className="footer-content">
        <div className="footer-section">
          <h3>BAS Rocketry</h3>
          <p>Building the future, one launch at a time! 🚀</p>
        </div>
        <div className="footer-section">
          <h3>Quick Links</h3>
          <Link href="/">Home</Link>
          <Link href="/#about">About</Link>
          <Link href="/team">Team</Link>
          <Link href="/#projects">Projects</Link>
          <Link href="/#contact">Contact</Link>
        </div>
      </div>
      <div className="footer-bottom">
        <p>&copy; 2024 BAS Rocketry. All rights reserved.</p>
      </div>
    </footer>
  );
} 