/**
 * I see you're a future engineer too! 
 * Email us at rocketry@bastoronto.org to talk or work with us!
 */

'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Head from 'next/head';

export default function Home() {
  const [formStatus, setFormStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [formMessage, setFormMessage] = useState('');
  const [selectedProject, setSelectedProject] = useState<number | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showHiddenMessage, setShowHiddenMessage] = useState(false);
  const [typedText, setTypedText] = useState('');
  const [showDevPopup, setShowDevPopup] = useState(false);

  useEffect(() => {
    const hasVisited = localStorage.getItem('hasVisited');
    if (!hasVisited) {
      setShowDevPopup(true);
      localStorage.setItem('hasVisited', 'true');
    }
  }, []);

  const projects = [
    {
      title: "Initial Rocket",
      description: "Our first ever solid engine rocket with TVC",
      eta: "Q3 2025",
      progress: 15,
      image: "/logo.png",
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
      image: "/logo.png",
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
      image: "/logo.png",
      keyPoints: [
        "Custom liquid propellant motor design",
        "Thrust vector control system",
        "Fully designed avionics package",
        "Custom auto-landing system"
      ]
    }
  ];

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
      {showDevPopup && (
        <div className="dev-popup" onClick={() => setShowDevPopup(false)}>
          <div className="dev-popup-content" onClick={e => e.stopPropagation()}>
            <button className="close-popup" onClick={() => setShowDevPopup(false)}>&times;</button>
            <h3>Website Under Development</h3>
            <p>This website is still under development. Please ignore any issues as they are being actively fixed.</p>
          </div>
        </div>
      )}
      {showHiddenMessage && (
        <div className="hidden-message" onClick={closeHiddenMessage}>
          <div className="hidden-message-content">
            <button className="close-hidden-message" onClick={() => setShowHiddenMessage(false)}>&times;</button>
            <h3>Welcome to the club!</h3>
            <p>Email us at <a href="mailto:rocketry@bastoronto.org">rocketry@bastoronto.org</a>, we would love to hear and work with you!</p>
          </div>
        </div>
      )}

      <section id="home" className="hero">
        <div className="hero-content">
          <h1>Welcome to BAS Rocketry</h1>
          <p>Don't over think it - we already did.</p>
          <a href="#about" className="cta-button">Learn More</a>
        </div>
      </section>

      <section id="about" className="about">
        <h2>About Us</h2>
        <div className="about-content">
          <div className="about-text">
            <p>BAS Rocketry is a team of ambitious high school students united by a passion for aerospace engineering and innovation. Our diverse and talented members are committed to pushing the boundaries of student-led rocketry, with plans to design, build, and successfully launch multiple rockets in the near future.</p>
          </div>
          <div className="about-stats">
            <div className="stat" onClick={() => { window.location.href = '#team'; }}>
              <i className="fas fa-users"></i>
              <h3>40</h3>
              <p>Team Members</p>
            </div>
            <div className="stat" onClick={() => { window.location.href = '/sponsors'; }}>
              <i className="fas fa-sack-dollar"></i>
              <h3>1</h3>
              <p>Sponsors</p>
            </div>
          </div>
        </div>
      </section>

      <section id="team" className="team">
        <h2>Meet Our Team</h2>
        <div className="team-grid">
          <div className="team-member">
            <h3>Executive Director</h3>
            <div className="member-image ilan">
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
            <h3>Propulsion Lead</h3>
            <div className="member-image noam">
              <Image
                src="https://noam-photo.pages.dev/IMG_3988.jpg"
                alt="Noam Wolfe"
                width={200}
                height={200}
                className="member-img"
              />
            </div>
            <p>Noam Wolfe</p>
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
        </div>
        <div className="more-team" onClick={() => { window.location.href = '/team'; }}>
          <h1>See More<i className="fas fa-arrow-right"></i></h1>
        </div>
      </section>

      <section id="projects" className="projects">
        <h2>Our Rocketry Plans</h2>
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
              <p>info@basrocketry.com</p>
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
              <a href="#about">About</a>
              <a href="/team">Team</a>
              <a href="/projects">Projects</a>
              <a href="#contact">Contact</a>
              <a href="/sponsors">Sponsors</a>
            </div>
          </div>
        </div>
      </footer>
    </main>
  );
} 
