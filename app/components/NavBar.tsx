'use client';

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function NavBar() {
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDonateDropdownOpen, setIsDonateDropdownOpen] = useState(false);
  const [isAboutDropdownOpen, setIsAboutDropdownOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const hamburgerRef = useRef<HTMLDivElement>(null);
  const donateDropdownRef = useRef<HTMLDivElement>(null);
  const aboutDropdownRef = useRef<HTMLDivElement>(null);

  const isActive = (path: string) => {
    if (path.startsWith('/#')) {
      const hash = path.split('#')[1];
      if (pathname === '/') {
        // Only match the specific hash on home page
        if (typeof window !== 'undefined') {
          return window.location.hash === '#' + hash;
        }
      }
      return false;
    }
    return pathname === path;
  };

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
      
      if (
        donateDropdownRef.current &&
        !donateDropdownRef.current.contains(event.target as Node)
      ) {
        setIsDonateDropdownOpen(false);
      }

      if (
        aboutDropdownRef.current &&
        !aboutDropdownRef.current.contains(event.target as Node)
      ) {
        setIsAboutDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const toggleDonateDropdown = () => {
    setIsDonateDropdownOpen(!isDonateDropdownOpen);
  };

  const toggleAboutDropdown = () => {
    setIsAboutDropdownOpen(!isAboutDropdownOpen);
  };

  return (
    <nav className="navbar-wrapper">
      <div className="navbar">
        <div className="logo-container">
          <Link href="/">
            <div className="logo-image">
              <Image
                src="/logo.png"
                alt="BAS Rocketry Logo"
                width={50}
                height={50}
                className="logo-img"
                priority
              />
            </div>
          </Link>
        </div>
        <div ref={menuRef} className={`nav-links ${isMenuOpen ? 'active' : ''}`}>
          <div 
            ref={aboutDropdownRef}
            className="nav-item dropdown"
            onMouseEnter={() => setIsAboutDropdownOpen(true)}
            onMouseLeave={() => setIsAboutDropdownOpen(false)}
          >
            About
            <svg className="dropdown-arrow" width="12" height="8" viewBox="0 0 12 8" fill="none">
              <path d="M1 1.5L6 6.5L11 1.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            <div className={`dropdown-menu ${isAboutDropdownOpen ? 'active' : ''}`}>
              <Link href="/#about" className={`dropdown-item ${isActive('/#about') ? 'active' : ''}`}>About Us</Link>
              <Link href="/team" className={`dropdown-item ${isActive('/team') ? 'active' : ''}`}>Team</Link>
              <Link href="/#contact" className={`dropdown-item ${isActive('/#contact') ? 'active' : ''}`}>Contact</Link>
            </div>
          </div>
          <Link href="/projects" className={`nav-item ${isActive('/projects') ? 'active' : ''}`}>Projects</Link>
          <Link href="/sponsors" className={`nav-item ${isActive('/sponsors') ? 'active' : ''}`}>Sponsors</Link>
          <div 
            ref={donateDropdownRef}
            className="nav-item dropdown donate-button"
            onMouseEnter={() => setIsDonateDropdownOpen(true)}
            onMouseLeave={() => setIsDonateDropdownOpen(false)}
          >
            Donate
            <svg className="dropdown-arrow" width="12" height="8" viewBox="0 0 12 8" fill="none">
              <path d="M1 1.5L6 6.5L11 1.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            <div className={`dropdown-menu ${isDonateDropdownOpen ? 'active' : ''}`}>
              <Link href="/donate" className={`dropdown-item ${isActive('/donate') ? 'active' : ''}`}>Donate Now</Link>
              <Link href="/sponsorship-tiers" className={`dropdown-item ${isActive('/sponsorship-tiers') ? 'active' : ''}`}>Sponsorship Tiers</Link>
              <Link href="/sponsors" className={`dropdown-item ${isActive('/sponsors') ? 'active' : ''}`}>Sponsorship Package</Link>
            </div>
          </div>
        </div>
        <div ref={hamburgerRef} className={`hamburger ${isMenuOpen ? 'active' : ''}`} onClick={toggleMenu}>
          <span></span>
          <span></span>
          <span></span>
        </div>
      </div>
    </nav>
  );
} 
