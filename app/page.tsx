/**
 * I see you're a future engineer too! 
 * Email us at rocketry@bastoronto.org to talk or work with us!
 */

'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Head from 'next/head';
import ImageGallery from './components/ImageGallery';

export default function Home() {
  const [formStatus, setFormStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [formMessage, setFormMessage] = useState('');
  const [selectedProject, setSelectedProject] = useState<number | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showHiddenMessage, setShowHiddenMessage] = useState(false);
  const [typedText, setTypedText] = useState('');
  const [showDevPopup, setShowDevPopup] = useState(false);
  const [showGallery, setShowGallery] = useState(false);
  const [showJournal, setShowJournal] = useState(false);
  const [loadedImages, setLoadedImages] = useState<{[key: string]: boolean}>({});
  const [journalEntries, setJournalEntries] = useState<Array<{date: string, type: string, entry: string}>>([]);
  const loadJournalData = async (journalFile: string) => {
    try {
      const response = await fetch(`/journals/${journalFile}`);
      const text = await response.text();
      const entries = text.split('\n')
        .filter(line => line.trim())  // Remove empty lines
        .map(line => {
          const [date, type, entry] = line.split('|').map(part => part.trim());
          return {
            date,
            type,
            entry
          };
        })
        .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()); // Sort newest first
      setJournalEntries(entries);
    } catch (error) {
      console.error('Failed to load journal data:', error);
      setJournalEntries([]);
    }
  };

  const getEntryTypeStyle = (type: string) => {
    const styles = {
      milestone: { color: '#2ecc71', borderColor: '#2ecc71', icon: 'flag' },
      update: { color: '#3498db', borderColor: '#3498db', icon: 'info-circle' },
      challenge: { color: '#e74c3c', borderColor: '#e74c3c', icon: 'exclamation-circle' },
      planning: { color: '#f1c40f', borderColor: '#f1c40f', icon: 'calendar' }
    };
    return styles[type as keyof typeof styles] || styles.update;
  };

  useEffect(() => {
    const hasVisited = localStorage.getItem('hasVisited');
    if (!hasVisited) {
      setShowDevPopup(true);
      document.body.style.overflow = 'hidden';
      localStorage.setItem('hasVisited', 'true');
    }
  }, []);

  // Handle dev popup body scroll prevention
  useEffect(() => {
    if (showDevPopup) {
      document.body.style.overflow = 'hidden';
    } else {
      // Only restore scrolling if no other modals are open
      if (!isModalOpen && !showHiddenMessage) {
        document.body.style.overflow = 'unset';
      }
    }
  }, [showDevPopup, isModalOpen, showHiddenMessage]);

  // Handle hidden message body scroll prevention
  useEffect(() => {
    if (showHiddenMessage) {
      document.body.style.overflow = 'hidden';
    } else {
      // Only restore scrolling if no other modals are open
      if (!isModalOpen && !showDevPopup) {
        document.body.style.overflow = 'unset';
      }
    }
  }, [showHiddenMessage, isModalOpen, showDevPopup]);

  // Cleanup body overflow on unmount
  useEffect(() => {
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, []);

  const projects = [
    {
      title: "Horizon Flight Computer Development",
      description: "Designing, soldering, and testing our very own avionics board from scratch.",
      eta: "Q3 2025",
      progress: 80,
      image: "https://www.horizonavionics.org/horizonlogo.svg",
      journalFile: "horizon.txt",
      gallery: [
        {
          src: "/projects/galleries/horizon/avionics ad.png",
          alt: "Flight Computer Schematic Poster",
          width: 800,
          height: 600
        }
      ],
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
      journalFile: "fluid.txt",
      gallery: [
        {
          src: "/projects/galleries/fluid/design.jpg",
          alt: "Engine Design",
          width: 800,
          height: 600
        },
        {
          src: "/projects/galleries/fluid/prototype.jpg",
          alt: "First Prototype",
          width: 800,
          height: 600
        },
        {
          src: "/projects/galleries/fluid/testing.jpg",
          alt: "Test Setup",
          width: 800,
          height: 600
        }
      ],
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
      journalFile: "endgame.txt",
      comingSoon: true,
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
    // Prevent background scrolling
    document.body.style.overflow = 'hidden';
  };

  const closeProjectModal = () => {
    setIsModalOpen(false);
    setSelectedProject(null);
    setShowGallery(false);
    setShowJournal(false);
    setJournalEntries([]);
    // Re-enable background scrolling
    document.body.style.overflow = 'unset';
  };



  const toggleJournal = () => {
    if (!showJournal && selectedProject !== null) {
      loadJournalData(projects[selectedProject].journalFile);
    }
    setShowJournal(!showJournal);
    
    // Auto-scroll to journal section and then to bottom after content loads
    if (!showJournal) {
      setTimeout(() => {
        const journalSection = document.querySelector('.journal-section');
        if (journalSection) {
          journalSection.scrollIntoView({ 
            behavior: 'smooth', 
            block: 'start'
          });
          
          // Scroll to bottom of journal entries after another brief delay
          setTimeout(() => {
            const journalEntries = document.querySelector('.journal-entries');
            if (journalEntries) {
              journalEntries.scrollTop = journalEntries.scrollHeight;
            }
          }, 300);
        }
      }, 100);
    }
  };


  const closeHiddenMessage = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      setShowHiddenMessage(false);
    }
  };

  const closeDevPopup = () => {
    setShowDevPopup(false);
    // Only restore scrolling if no other modals are open
    if (!isModalOpen && !showHiddenMessage) {
      document.body.style.overflow = 'unset';
    }
  };

  const closeHiddenMessageDirectly = () => {
    setShowHiddenMessage(false);
    // Only restore scrolling if no other modals are open
    if (!isModalOpen && !showDevPopup) {
      document.body.style.overflow = 'unset';
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
        <div className="dev-popup" onClick={closeDevPopup}>
          <div className="dev-popup-content" onClick={e => e.stopPropagation()}>
            <button className="close-popup" onClick={closeDevPopup}>&times;</button>
            <h3>Website Under Development</h3>
            <p>This website is still under development. Please ignore any issues as they are being actively fixed.</p>
          </div>
        </div>
      )}
      {showHiddenMessage && (
        <div className="hidden-message" onClick={closeHiddenMessage}>
          <div className="hidden-message-content">
            <button className="close-hidden-message" onClick={closeHiddenMessageDirectly}>&times;</button>
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
                className={`member-img ${loadedImages['ilan-home'] ? 'loaded' : 'loading'}`}
                onLoadingComplete={() => setLoadedImages(prev => ({ ...prev, 'ilan-home': true }))}
                priority
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
                className={`member-img ${loadedImages['noam-home'] ? 'loaded' : 'loading'}`}
                onLoadingComplete={() => setLoadedImages(prev => ({ ...prev, 'noam-home': true }))}
                priority
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
                className={`member-img ${loadedImages['ben-home'] ? 'loaded' : 'loading'}`}
                onLoadingComplete={() => setLoadedImages(prev => ({ ...prev, 'ben-home': true }))}
                priority
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
            <div 
                          key={index} 
                          className={`project-card ${project.comingSoon ? 'coming-soon' : ''}`} 
                          onClick={() => !project.comingSoon && openProjectModal(index)}
                        >
                          {project.comingSoon ? (
                            <div className="coming-soon-content">
                              <div className="coming-soon-icon">
                                <i className="fas fa-rocket"></i>
                              </div>
                              <div className="coming-soon-text">Coming Soon</div>
                            </div>
                          ) : (
                            <>
                              <div className="project-image">
                                <Image
                                  src={project.image}
                                  alt={project.title}
                                  width={400}
                                  height={200}
                                  className={`project-img ${loadedImages[`project-${index}`] ? 'loaded' : 'loading'}`}
                                  onLoadingComplete={() => setLoadedImages(prev => ({ ...prev, [`project-${index}`]: true }))}
                                  priority
                                />
                              </div>
                              <p>{project.description}</p>
                              <div className="project-title">{project.title}</div>
                              <div className="project-eta">ETA: {project.eta}</div>
                              <div className="progress-bar">
                                <div className="progress" style={{ width: `${project.progress}%` }}></div>
                              </div>
                              <div className="card-actions">
                                {project.gallery && project.gallery.length > 0 && (
                                  <button 
                                    className="action-button gallery-button"
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      openProjectModal(index);
                                      setShowJournal(false);  // Close journal when opening gallery
                                      setShowGallery(true);
                                      setTimeout(() => {
                                        const el = document.getElementById('modal-gallery-section');
                                        if (el) {
                                          el.scrollIntoView({ behavior: 'smooth', block: 'end' });
                                          // Auto scroll to bottom of the modal content after gallery loads
                                          setTimeout(() => {
                                            const modalContent = document.querySelector('.modal-content');
                                            if (modalContent) {
                                              modalContent.scrollTo({
                                                top: modalContent.scrollHeight,
                                                behavior: 'smooth'
                                              });
                                            }
                                          }, 300);
                                        }
                                      }, 200);
                                    }}
                                  >
                                    <i className="fas fa-images"></i>
                                    Gallery
                                  </button>
                                )}
                                {project.journalFile && (
                                  <button 
                                    className="action-button journal-button"
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      openProjectModal(index);
                                      setShowGallery(false);  // Close gallery when opening journal
                                      loadJournalData(project.journalFile);
                                      setShowJournal(true);
                                      setShowGallery(false);  // Close gallery when opening journal
                                    }}
                                  >
                                    <i className="fas fa-book"></i>
                                    Journal
                                  </button>
                                )}
                              </div>
                            </>
                          )}
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
              <div className="modal-actions">
                {projects[selectedProject].gallery && (
                  <button 
                    className={`action-button gallery-button ${showGallery ? 'active' : ''}`}
                    onClick={() => {
                      if (showGallery) {
                        setShowGallery(false);
                      } else {
                        setShowGallery(true);
                        setShowJournal(false); // Close journal when opening gallery
                      }
                    }}
                  >
                    <i className="fas fa-images"></i>
                    {showGallery ? 'Hide Gallery' : 'View Gallery'}
                  </button>
                )}

              </div>
              <div className="journal-section">
                <button className={`action-button journal-button journal-button1 ${showJournal ? 'active' : ''}`} onClick={toggleJournal}>
                  <i className={`fas ${showJournal ? 'fa-book-open' : 'fa-book'}`}></i>
                  {showJournal ? 'Hide Journal' : 'View Journal'}
                </button>
                
                {showGallery && projects[selectedProject].gallery && (
                  <div className="project-section project-gallery-section" id="modal-gallery-section">
                    <h3>Project Gallery</h3>
                    <ImageGallery 
                      images={projects[selectedProject].gallery}
                      projectName={projects[selectedProject].title}
                    />
                  </div>
                )}
                
                {showJournal && (
                  <div className="project-journal">
                    <h3>Development Journal</h3>
                    <div className="journal-entries">
                      {journalEntries.length > 0 ? (
                        journalEntries.map((entry, idx) => {
                          const typeStyle = getEntryTypeStyle(entry.type);
                          return (
                            <div 
                              key={idx} 
                              className="journal-entry"
                              style={{ borderLeftColor: typeStyle.borderColor }}
                            >
                              <div 
                                className="journal-date"
                                style={{ color: typeStyle.color }}
                              >
                                <i className={`fas fa-${typeStyle.icon} entry-icon`} style={{ color: typeStyle.color }}></i>
                                {entry.date}
                                <span className="entry-type" style={{ 
                                  color: typeStyle.color,
                                  backgroundColor: `${typeStyle.color}20`,
                                  borderColor: typeStyle.color
                                }}>
                                  {entry.type.charAt(0).toUpperCase() + entry.type.slice(1)}
                                </span>
                              </div>
                              <div className="journal-content">{entry.entry}</div>
                            </div>
                          );
                        })
                      ) : (
                        <div className="no-entries">No journal entries available.</div>
                      )}
                    </div>
                  </div>
                )}
              </div>
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
