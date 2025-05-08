/**
 * I see you're a future engineer too! 
 * Email us at rocketry@bastoronto.org to talk or work with us!
 */

'use client';

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import NavBar from '../components/NavBar'
import Head from 'next/head';

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
    <main>
      <Head>
        <meta name="robots" content="noindex, noimageindex, nofollow" />
        <meta name="googlebot" content="noindex, noimageindex, nofollow" />
        <meta name="googlebot-image" content="noindex, noimageindex, nofollow" />
      </Head>
      {showHiddenMessage && (
        <div className="hidden-message" onClick={closeHiddenMessage}>
          <div className="hidden-message-content">
            <button className="close-hidden-message" onClick={() => setShowHiddenMessage(false)}>&times;</button>
            <h3>Welcome to the club!</h3>
            <p>Email us at <a href="mailto:rocketry@bastoronto.org">rocketry@bastoronto.org</a>, we would love to hear and work with you!</p>
          </div>
        </div>
      )}
      <NavBar />
      <section className="sponsors-hero">
        <h1>Meet Our Team</h1>
      </section>

      <section className="team">
        <div className="team-grid">
          <div className="team-member">
            <h3>Executive Director</h3>
            <div className="member-image">
              <Image
                src="https://ilans-website.pages.dev/IMG_3988.png"
                alt="Ilan Weinberger"
                width={200}
                height={200}
                className="member-img"
              />
            </div>
            <p>Ilan Weinberger</p>
          </div>
          <div className="team-member">
            <h3>Chief Financial Officer</h3>
            <div className="member-image benjamin">
              <Image
                src="https://ben-photo.pages.dev/IMG_3988.png"
                alt="Benjamin Dahari"
                width={200}
                height={200}
                className="member-img"
              />
            </div>
            <p>Benjamin Dahari</p>
          </div>
          <div className="team-member">
            <h3>Propulsion Lead</h3>
            <div className="member-image">
              <Image
                src="/team/placeholder.png"
                alt="Noam Wolfe"
                width={200}
                height={200}
                className="member-img"
              />
            </div> 
            <p>Noam Wolfe</p>
          </div>
          <div className="team-member">
            <h3>Avionics Lead</h3>
            <div className="member-image">
              <Image
                src="/logo.png"
                alt="Yekutiel Yunger"
                width={200}
                height={200}
                className="member-img"
              />
            </div>
            <p>Yekutiel Yunger</p>
          </div>
          <div className="team-member">
            <h3>Media & Outreach Manager</h3>
            <div className="member-image">
              <Image
                src="https://ori-photo.pages.dev/IMG_3988.png"
                alt="Ori Barda"
                width={200}
                height={200}
                className="member-img"
              />
            </div>
            <p>Ori Barda</p>
          </div>
          <div className="team-member">
            <h3>Recovery Lead</h3>
            <div className="member-image">
              <Image
                src="https://sammy-photo.pages.dev/IMG_3988.png"
                alt="Sammy Simon"
                width={200}
                height={200}
                className="member-img"
              />
            </div>
            <p>Sammy Simon</p>
          </div>
          <div className="team-member">
            <h3>Chief Safety Officer</h3>
            <div className="member-image benjamin">
              <Image
                src="https://raphi-photos-rocketry.pages.dev/IMG_3988.png"
                alt="Raphie Sayegh"
                width={200}
                height={200}
                className="member-img"
              />
            </div>
            <p>Raphie Sayegh</p>
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
  );
} 
