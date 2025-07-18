'use client';

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import router from 'next/router';

export default function NavBar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isBoardsOpen, setIsBoardsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const hamburgerRef = useRef<HTMLDivElement>(null);
  const boardsRef = useRef<HTMLDivElement>(null);

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
        !hamburgerRef.current.contains(event.target as Node) &&
        (!boardsRef.current || !boardsRef.current.contains(event.target as Node))
      ) {
        setIsMenuOpen(false);
        setIsBoardsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const toggleBoards = () => {
    setIsBoardsOpen((prev) => !prev);
  };

  return (
    <div className="navbar-outer">
      <nav className="navbar pill-navbar shadow-navbar">
        <div className="logo-container">
          <Link href="/">
            <div className="logo-image">
              <Image
                src="/logo.png"
                alt="BAS Rocketry Logo"
                width={48}
                height={48}
                className="logo-img"
                priority
              />
            </div>
          </Link>
        </div>
        <div ref={menuRef} className={`nav-links ${isMenuOpen ? 'active' : ''}`}>
          <Link href="/" className="nav-link active">Home</Link>
          <Link href="/about-us" className="nav-link">About</Link>
          <Link href="/team" className="nav-link">Team</Link>
          <Link href="/sponsors" className="nav-link">Sponsors</Link>

          <div
            className={`nav-link boards-dropdown${isBoardsOpen ? ' open' : ''}`}
            ref={boardsRef}
            onMouseEnter={() => setIsBoardsOpen(true)}
            onMouseLeave={() => setIsBoardsOpen(false)}
            onClick={() => router.push('/sponsorship-tiers')}
            tabIndex={0}
            style={{ position: 'relative' }}
          >
            Sponsorships <span style={{ fontSize: '0.8em', marginLeft: 4 }}>▼</span>
            {isBoardsOpen && (
              <div className="dropdown-menu">
                <Link href="/sponsorship-tiers" className="dropdown-item">Learn More</Link>
                <Link href="/donate" className="dropdown-item">Donate Now</Link>
              </div>
            )}
          </div>

        </div>
        <div ref={hamburgerRef} className={`hamburger ${isMenuOpen ? 'active' : ''}`} onClick={toggleMenu}>
          <span></span>
          <span></span>
          <span></span>
        </div>
      </nav>
    </div>
  );
} 
