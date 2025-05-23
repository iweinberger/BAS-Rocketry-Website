'use client';

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';

export default function NavBar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const hamburgerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      const navbar = document.querySelector('.navbar');
      if (window.scrollY > 50) {
        navbar?.classList.add('scrolled');
      } else {
        navbar?.classList.remove('scrolled');
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        menuRef.current &&
        hamburgerRef.current &&
        !menuRef.current.contains(event.target as Node) &&
        !hamburgerRef.current.contains(event.target as Node)
      ) {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="navbar">
      <div className="logo-container">
        <Link href="/">
          <div className="logo-image">
            <Image
              src="/logo.png"
              alt="BAS Rocketry Logo"
              width={60}
              height={60}
              className="logo-img"
              priority
            />
          </div>
        </Link>
        <Link href="/" className="logo">Rocketry</Link>
      </div>
      <div ref={menuRef} className={`nav-links ${isMenuOpen ? 'active' : ''}`}>
        <Link href="/">Home</Link>
        <Link href="/#about">About</Link>
        <Link href="/team">Team</Link>
        <Link href="/projects">Projects</Link>
        <Link href="/#contact">Contact</Link>
        <Link href="/sponsors">Sponsors</Link>
      </div>
      <Link className='donate-button' href="/sponsorship-tiers">Donate Now</Link>
      <div ref={hamburgerRef} className={`hamburger ${isMenuOpen ? 'active' : ''}`} onClick={toggleMenu}>
        <span></span>
        <span></span>
        <span></span>
      </div>
    </nav>
  );
} 
