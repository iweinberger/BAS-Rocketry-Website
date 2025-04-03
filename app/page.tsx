'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';

export default function Home() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [formStatus, setFormStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [formMessage, setFormMessage] = useState('');

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setFormStatus('loading');
    setFormMessage('');

    const formData = new FormData(e.currentTarget);
    const data = {
      name: formData.get('name'),
      email: formData.get('email'),
      message: formData.get('message'),
    };

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (result.success) {
        setFormStatus('success');
        setFormMessage('Message sent successfully! We\'ll get back to you soon.');
        e.currentTarget.reset();
      } else {
        throw new Error(result.error || 'Failed to send message');
      }
    } catch (error) {
      setFormStatus('error');
      setFormMessage('Failed to send message. Please try again later.');
    }
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
        <div className={`nav-links ${isMenuOpen ? 'active' : ''}`}>
          <a href="#home">Home</a>
          <a href="#about">About</a>
          <a href="#team">Team</a>
          <a href="#projects">Projects</a>
          <a href="#contact">Contact</a>
          <a href="/donations">Donate</a>
        </div>
        <div className="hamburger" onClick={toggleMenu}>
          <span></span>
          <span></span>
          <span></span>
        </div>
      </nav>

      <section id="home" className="hero">
        <div className="hero-content">
          <h1>Welcome to BAS Rocketry</h1>
          <p>Building the future of space exploration, one rocket at a time! 🚀</p>
          <a href="#about" className="cta-button">Learn More</a>
        </div>
      </section>

      <section id="about" className="about">
        <h2>About Us</h2>
        <div className="about-content">
          <div className="about-text">
            <p>We're a team of passionate high school students who love building rockets! At BAS Rocketry, we combine our creativity and engineering skills to design, build, and launch amazing rockets. Whether you're a rocket science expert or just starting out, there's a place for you on our team!</p>
          </div>
          <div className="about-stats">
            <div className="stat">
              <i className="fas fa-rocket"></i>
              <h3>10+</h3>
              <p>Epic Launches</p>
            </div>
            <div className="stat">
              <i className="fas fa-users"></i>
              <h3>20+</h3>
              <p>Awesome Team Members</p>
            </div>
            <div className="stat">
              <i className="fas fa-trophy"></i>
              <h3>5+</h3>
              <p>Cool Awards</p>
            </div>
          </div>
        </div>
      </section>

      <section id="team" className="team">
        <h2>Meet Our Team Leads</h2>
        <div className="team-grid">
          <div className="team-member">
            <div className="member-image"></div>
            <h3>Ilan Weinberger - Team Captain</h3>
            <p>Leading the Mission</p>
          </div>
          <div className="team-member">
            <div className="member-image"></div>
            <h3>Noam Wolfe - Propulsion Lead</h3>
            <p>Making the "Boom" in the Rocket possible</p>
          </div>
          <div className="team-member">
            <div className="member-image"></div>
            <h3>Yekutiel Yunger - Avionics Lead</h3>
            <p>Making sure we don't encounter a "Huston, we have a problem"</p>
          </div>
          <div className="team-member">
            <div className="member-image"></div>
            <h3>Sammy Simon - Recovery Lead</h3>
            <p>Landing the Rocket in One Piece</p>
          </div>
          <div className="team-member">
            <div className="member-image"></div>
            <h3>Benjamin Dahari - Financial Lead</h3>
            <p>Keeping the Money Flowing</p>
          </div>
        </div>
      </section>

      <section id="projects" className="projects">
        <h2>Our Awesome Projects</h2>
        <div className="project-grid">
          <div className="project-card">
            <div className="project-image"></div>
            <h3>Project Alpha</h3>
            <p>Our first high-altitude rocket with cool telemetry</p>
          </div>
          <div className="project-card">
            <div className="project-image"></div>
            <h3>Project Beta</h3>
            <p>Making our recovery system super reliable</p>
          </div>
          <div className="project-card">
            <div className="project-image"></div>
            <h3>Project Gamma</h3>
            <p>Building a powerful propulsion system</p>
          </div>
        </div>
      </section>

      <section id="contact" className="contact">
        <h2>Get in Touch!</h2>
        <div className="contact-content">
          <form className="contact-form" onSubmit={handleSubmit}>
            <input type="text" name="name" placeholder="Your Name" required />
            <input type="email" name="email" placeholder="Your Email" required />
            <textarea name="message" placeholder="Your Message" required></textarea>
            <button 
              type="submit" 
              className={`submit-button ${formStatus === 'loading' ? 'loading' : ''}`}
            >
              {formStatus === 'loading' ? 'Sending...' : 'Send Message'}
            </button>
            {formMessage && (
              <div className={`form-message ${formStatus}`}>
                {formMessage}
              </div>
            )}
          </form>
          <div className="contact-info">
            <div className="info-item">
              <i className="fas fa-envelope"></i>
              <p>rocketry@bastoronto.org</p>
            </div>
            <div className="info-item">
              <i className="fas fa-map-marker-alt"></i>
              <p>High School Campus, Space City</p>
            </div>
            <div className="social-links">
              <a href="#"><i className="fab fa-instagram"></i></a>
              <a href="#"><i className="fab fa-tiktok"></i></a>
              <a href="#"><i className="fab fa-youtube"></i></a>
              <a href="#"><i className="fab fa-discord"></i></a>
            </div>
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
            <a href="#home">Home</a>
            <a href="#about">About</a>
            <a href="#team">Team</a>
            <a href="#projects">Projects</a>
            <a href="#contact">Contact</a>
          </div>
        </div>
        <div className="footer-bottom">
          <p>&copy; 2024 BAS Rocketry. All rights reserved.</p>
        </div>
      </footer>
    </main>
  );
} 
