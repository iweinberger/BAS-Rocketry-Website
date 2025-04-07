/**
 * I see you're a future engineer too! 
 * Email us at rocketry@bastoronto.org to talk or work with us!
 */

'use client';

import { useState } from 'react';
import Image from 'next/image';

export default function Home() {
  const [formStatus, setFormStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [formMessage, setFormMessage] = useState('');
  const [selectedProject, setSelectedProject] = useState<number | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showHiddenMessage, setShowHiddenMessage] = useState(false);
  const [typedText, setTypedText] = useState('');

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
            <p>At BAS Rocketry, we are a team of passionate high school students who love innovating and building amazing projects! At BAS Rocketry, we are combining our creativity and engineering skills to design, build, and launch a few amazing rockets in the coming months and years!</p>
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
            <h3>Team Captain</h3>
            <div className="member-image ilan">
              <Image
                src="/team/placeholder.png"
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
            <div className="member-image yekutiel">
              <Image
                src="/team/placeholder.png"
                alt="Yekutiel Yunger"
                width={200}
                height={200}
                className="member-img"
              />
            </div>
            <p>Yekutiel Yunger</p>
          </div>
          <div className="team-member">
            <h3>Recovery Lead</h3>
            <div className="member-image sammy">
              <Image
                src="/team/placeholder.png"
                alt="Sammy Simon"
                width={200}
                height={200}
                className="member-img"
              />
            </div>
            <p>Sammy Simon</p>
          </div>
          <div className="team-member">
            <h3>Financial Lead</h3>
            <div className="member-image benjamin">
              <Image
                src="/team/placeholder.png"
                alt="Benjamin Dahari"
                width={200}
                height={200}
                className="member-img"
              />
            </div>
            <p>Benjamin Dahari</p>
          </div>
          <div className="team-member">
            <h3>Chief Safety Officer</h3>
            <div className="member-image raphie">
              <Image
                src="/Raphie.png"
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
              <p>rocketry@bastoronto.org</p>
            </div>
            <div className="social-links">
              <a href="#"><i className="fab fa-instagram"></i></a>
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
              <a href="#home">Home</a>
              <a href="/about">About</a>
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
