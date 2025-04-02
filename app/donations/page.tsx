'use client';

import { useEffect } from 'react';
import Image from 'next/image';

export default function Donations() {
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
        <div className="nav-links">
          <a href="/">Home</a>
          <a href="/#about">About</a>
          <a href="/#team">Team</a>
          <a href="/#projects">Projects</a>
          <a href="/#contact">Contact</a>
          <a href="/donations">Donate</a>
        </div>
      </nav>

      <section className="donations">
        <h1>Support BAS Rocketry</h1>
        <div className="donations-content">
          <div className="donations-text">
            <p>Your support helps us build amazing rockets and push the boundaries of what's possible in high school rocketry! Every donation goes directly towards:</p>
            <ul>
              <li>Building materials and components</li>
              <li>Safety equipment and testing facilities</li>
              <li>Competition entry fees</li>
              <li>Team travel expenses</li>
              <li>Educational resources and workshops</li>
            </ul>
            <p>Thank you for helping us reach new heights! 🚀</p>
          </div>
          <div className="donations-iframe">
            <iframe 
              src="https://hcb.hackclub.com/donations/start/bas-rocketry" 
              style={{border: 'none'}} 
              name="donateFrame" 
              scrolling="yes" 
              frameBorder="0" 
              marginHeight="0px" 
              marginWidth="0px" 
              height="512px" 
              width="512px" 
              allowFullScreen
            ></iframe>
          </div>
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
          </div>
        </div>
        <div className="footer-bottom">
          <p>&copy; 2024 BAS Rocketry. All rights reserved.</p>
        </div>
      </footer>
    </main>
  );
} 