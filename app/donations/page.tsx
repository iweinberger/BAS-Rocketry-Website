'use client';

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';

export default function Donations() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const hamburgerRef = useRef<HTMLDivElement>(null);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

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

  return (
    <main>
      <nav className="navbar">
        <div className="logo-container">
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
          <div className="logo">BAS Rocketry</div>
        </div>
        <div ref={menuRef} className={`nav-links ${isMenuOpen ? 'active' : ''}`}>
          <a href="/">Home</a>
          <a href="/#about">About</a>
          <a href="/#team">Team</a>
          <a href="/#projects">Projects</a>
          <a href="/#contact">Contact</a>
          <a href="/donations" className="active">Donate</a>
        </div>
        <div ref={hamburgerRef} className={`hamburger ${isMenuOpen ? 'active' : ''}`} onClick={toggleMenu}>
          <span></span>
          <span></span>
          <span></span>
        </div>
      </nav>

      <section className="donations">
        <h1>Support BAS Rocketry</h1>
        <p>I don't know what to put here. Your donation will x y and z.</p>
        <div className="donation-container">
          <iframe 
            src="https://hcb.hackclub.com/donations/start/bas-rocketry" 
            style={{border: 'none'}} 
            name="donateFrame" 
            scrolling="yes" 
            frameBorder={0} 
            marginHeight={0} 
            marginWidth={0} 
            height={512} 
            width={512} 
            allowFullScreen
          ></iframe>
        </div>
      </section>

      <footer>
        <div className="footer-content">
          <div className="footer-section">
            <h3>BAS Rocketry</h3>
            <p>Building the future, one launch at a time! 🚀</p>
          </div>
          <div className="footer-section">
            <h3>Quick Links</h3>
            <a href="/">Home</a>
            <a href="/#about">About</a>
            <a href="/#team">Team</a>
            <a href="/#projects">Projects</a>
            <a href="/#contact">Contact</a>
            <a href="/donations">Donate</a>
          </div>
        </div>
      </footer>
    </main>
  );
} 