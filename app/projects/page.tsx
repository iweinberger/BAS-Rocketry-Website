/**
 * I see you're a future engineer too! 
 * Email us at rocketry@bastoronto.org to talk or work with us!
 */

'use client';

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';

export default function Home() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [formStatus, setFormStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [formMessage, setFormMessage] = useState('');
  const [selectedProject, setSelectedProject] = useState<number | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showHiddenMessage, setShowHiddenMessage] = useState(false);
  const [typedText, setTypedText] = useState('');
  const menuRef = useRef<HTMLDivElement>(null);
  const hamburgerRef = useRef<HTMLDivElement>(null);

  const projects = [
    {
      title: "Initial Rocket",
      description: "Our first ever solid engine rocket with TVC",
      eta: "Q3 2025",
      progress: 15,
      image: "/projects/alpha.png",
      keyPoints: [
        "Advanced telemetry system with real-time data transmission",
        "Target altitude: ~7,000 feet",
        "Working thrust vector control system",
        "Basic recovery system"
      ]
    },
    {
      title: "Project Fluid",
      description: "Making our first ever liquid engine rocket",
      eta: "Q2 2026",
      progress: 1,
      image: "/projects/beta.png",
      keyPoints: [
        "Custom liquid propellant motor design",
        "Basic Liquid Propellant Thrust Vector Control",
        "Advanced recovery system"
      ]
    },
    {
      title: "Project End Game",
      description: "Launching a custom propulsion system in our rocket",
      eta: "Q3 2026",
      progress: 1,
      image: "/projects/gamma.png",
      keyPoints: [
        "Custom liquid propellant motor design",
        "Thrust vector control system",
        "Fully designed avionics package",
        "Custom auto-landing system"
      ]
    }
  ];

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
      setFormStatus('success');
      setFormMessage('Message sent successfully! We\'ll get back to you soon.');
    }
  };

  const openProjectModal = (index: number) => {
    setSelectedProject(index);
    setIsModalOpen(true);
  };

  const closeProjectModal = () => {
    setIsModalOpen(false);
    setSelectedProject(null);
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
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      setTypedText(prev => {
        const newText = prev + e.key.toLowerCase();
        if (newText.includes('bas-rocketry')) {
          setShowHiddenMessage(true);
          return '';
        }
        return newText.slice(-20);
      });
    };

    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setShowHiddenMessage(false);
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    window.addEventListener('keydown', handleEscape);
    return () => {
      window.removeEventListener('keydown', handleKeyPress);
      window.removeEventListener('keydown', handleEscape);
    };
  }, []);

  const closeHiddenMessage = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      setShowHiddenMessage(false);
    }
  };

  return (
    <>
      <head>
        <link rel="icon" href="/logo.png" type="image/png" />
        <title>BAS Rocketry - Our Projects</title>
      </head>
      <main>
        {showHiddenMessage && (
          <div className="hidden-message" onClick={closeHiddenMessage}>
            <div className="hidden-message-content">
              <button className="close-hidden-message" onClick={() => setShowHiddenMessage(false)}>&times;</button>
              <h3>Welcome to the club!</h3>
              <p>Email us at <a href="mailto:rocketry@bastoronto.org">rocketry@bastoronto.org</a>, we would love to hear and work with you!</p>
            </div>
          </div>
        )}
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
            <a href="/team">Team</a>
            <a href="/projects">Projects</a>
            <a href="#contact">Contact</a>
            <a href="/sponsors">Sponsors</a>
          </div>
          <div ref={hamburgerRef} className={`hamburger ${isMenuOpen ? 'active' : ''}`} onClick={toggleMenu}>
            <span></span>
            <span></span>
            <span></span>
          </div>
        </nav>

        
        <section className="sponsors-hero">
          <h1>Our Rocketry Plans</h1>
        </section>

        <section id="projects" className="projects">
          <div className="project-grid">
            {projects.map((project, index) => (
              <div key={index} className="project-card" onClick={() => openProjectModal(index)}>
                <div className="project-image">
                  <Image
                    src={project.image}
                    alt={project.title}
                    width={400}
                    height={200}
                    className="project-img"
                  />
                </div>
                <p>{project.description}</p>
                <div className="project-title">{project.title}</div>
                <div className="project-eta">ETA: {project.eta}</div>
                <div className="progress-bar">
                  <div className="progress" style={{ width: `${project.progress}%` }}></div>
                </div>
              </div>
            ))}
          </div>

          {isModalOpen && selectedProject !== null && (
            <div className="project-modal" onClick={closeProjectModal}>
              <div className="modal-content" onClick={e => e.stopPropagation()}>
                <button className="close-modal" onClick={closeProjectModal}>&times;</button>
                <h2>{projects[selectedProject].title}</h2>
                <p>{projects[selectedProject].description}</p>
                <div className="modal-progress">
                  <h3>Development Progress</h3>
                  <div className="progress-bar">
                    <div className="progress" style={{ width: `${projects[selectedProject].progress}%` }}></div>
                  </div>
                  <span>{projects[selectedProject].progress}% Complete</span>
                </div>
                <div className="key-points">
                  <h3>Key Points</h3>
                  <ul>
                    {projects[selectedProject].keyPoints.map((point, idx) => (
                      <li key={idx}>{point}</li>
                    ))}
                  </ul>
                </div>
                <div className="eta">Estimated Completion: {projects[selectedProject].eta}</div>
              </div>
            </div>
          )}
        </section>

        <section id="contact" className="contact">
          <h2>Get in Touch</h2>
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
              <div className="social-links">
                <a href="https://www.instagram.com/bas_rocketry/"><i className="fab fa-instagram"></i></a>
                <a href="https://www.linkedin.com/company/bas-rocketry"><i className="fab fa-linkedin"></i></a>
                <a href="https://www.youtube.com/channel/UCHMS5iHjs30y3Pb7FNBcG4A"><i className="fab fa-youtube"></i></a>
              </div>
            </div>
          </div>
        </section>

        <footer>
          <div className="footer-content">
            <div className="footer-section">
              <h3>BAS ROCKETRY</h3>
              <p>Don't over think it - we already did</p>
            </div>
            <div className="footer-section">
              <h3>QUICK LINKS</h3>
              <div className="footer-links">
                <a href="/">Home</a>
                <a href="/#about">About</a>
                <a href="/team">Team</a>
                <a href="/projects">Projects</a>
                <a href="/contact">Contact</a>
                <a href="/sponsors">Sponsors</a>
              </div>
            </div>
          </div>
        </footer>
      </main>
    </>
  );
} 
