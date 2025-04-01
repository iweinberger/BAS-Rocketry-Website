'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';

export default function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <nav className={`navbar ${isScrolled ? 'scrolled' : ''}`}>
      <div className="logo-container">
        <div className="logo-image">
          <img src="https://cdn-icons-png.flaticon.com/512/1995/1995572.png" alt="BAS Rocketry Logo" className="logo-img" />
        </div>
        <div className="logo">BAS Rocketry</div>
      </div>
      <div className={`nav-links ${isMobileMenuOpen ? 'active' : ''}`}>
        <Link href="/" onClick={() => setIsMobileMenuOpen(false)}>Home</Link>
        <Link href="/#about" onClick={() => setIsMobileMenuOpen(false)}>About</Link>
        <Link href="/team" onClick={() => setIsMobileMenuOpen(false)}>Team</Link>
        <Link href="/#projects" onClick={() => setIsMobileMenuOpen(false)}>Projects</Link>
        <Link href="/#contact" onClick={() => setIsMobileMenuOpen(false)}>Contact</Link>
      </div>
      <div className={`hamburger ${isMobileMenuOpen ? 'active' : ''}`} onClick={toggleMobileMenu}>
        <span></span>
        <span></span>
        <span></span>
      </div>
    </nav>
  );
} 