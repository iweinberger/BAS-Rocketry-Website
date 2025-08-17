'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import NavBar from '../components/NavBar';
import styles from './SponsorshipPackage.module.css';

export default function SponsorshipPackage() {
  const [isDownloading, setIsDownloading] = useState(false);
  const [currentStatIndex, setCurrentStatIndex] = useState(0);

  const handleDownload = () => {
    setIsDownloading(true);
    const link = document.createElement('a');
    link.href = '/downloads/BAS-Rocketry-Sponsorship-Package.pdf';
    link.download = 'BAS-Rocketry-Sponsorship-Package.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    setTimeout(() => {
      setIsDownloading(false);
    }, 2000);
  };

  const stats = [
    { number: '50+', label: 'Student Engineers', icon: 'fas fa-users' },
    { number: '3', label: 'Active Projects', icon: 'fas fa-rocket' },
    { number: '10K+', label: 'Social Media Reach', icon: 'fas fa-chart-line' },
  ];

  const benefits = [
    {
      icon: 'fas fa-chart-line',
      title: 'Brand Visibility',
      description: 'Logo placement on rockets, website, and merchandise with exposure to aerospace enthusiasts'
    },
    {
      icon: 'fa-solid fa-rocket',
      title: 'Supporting Youth',
      description: 'Support the next generation of aerospace engineers.'
    },
    {
      icon: 'fas fa-users',
      title: 'Community Impact',
      description: 'Support youth in STEM through ...'
    }
  ];

  const impactMetrics = [
    {
      title: 'Student Development',
      items: [
        '40+ students',
        '...',
        '...'
      ]
    },
    {
      title: 'Technical Achievement',
      items: [
        '...',
        'Advanced Avionics Board',
        '...'
      ]
    },
    {
      title: 'Community Outreach',
      items: [
        '...',
        '...',
        '...'
      ]
    }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentStatIndex((prevIndex) => (prevIndex + 1) % stats.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const stemData = [
    { letter: 'S', phrase: 'Student-led aerospace innovation' },
    { letter: 'T', phrase: 'Technology advancing education' },
    { letter: 'E', phrase: 'Engineering excellence in rocketry' },
    { letter: 'M', phrase: 'Making future leaders in STEM' }
  ];

  return (
    <main className={styles.sponsorshipPackagePage}>
      <NavBar />
      
      <div className={styles.pageContent}>
        {/* Hero Section */}
        <section className={styles.heroSection}>
          <div className={styles.heroContent}>
            <h1>Partner With the Future of Aerospace</h1>
            <p>Join BAS Rocketry in shaping the next generation of aerospace engineers and pushing the boundaries of student-led innovation</p>
            <div className={styles.heroStats}>
              {stats.map((stat, index) => (
                <div 
                  key={index} 
                  className={`${styles.statCard} ${index === currentStatIndex ? styles.highlighted : ''}`}
                >
                  <i className={stat.icon}></i>
                  <span className={styles.statNumber}>{stat.number}</span>
                  <span className={styles.statLabel}>{stat.label}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Benefits Section */}
        <section className={styles.benefitsSection}>
          <h2>Why Partner With BAS Rocketry?</h2>
          <div className={styles.benefitsGrid}>
            {benefits.map((benefit, index) => (
              <div key={index} className={styles.benefitCard}>
                <div className={styles.benefitIcon}>
                  <i className={benefit.icon}></i>
                </div>
                <h3>{benefit.title}</h3>
                <p>{benefit.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Impact Metrics */}
        <section className={styles.impactSection}>
          <h2>Our Impact</h2>
          <div className={styles.impactGrid}>
            {impactMetrics.map((metric, index) => (
              <div key={index} className={styles.impactCard}>
                <h3>{metric.title}</h3>
                <ul>
                  {metric.items.map((item, itemIndex) => (
                    <li key={itemIndex}>
                      <i className="fas fa-check"></i>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        {/* STEM Mission */}
        <section className={styles.stemSection}>
          <div className={styles.stemGrid}>
            <div className={styles.stemContent}>
              <h2>Our Mission</h2>
              <div className={styles.stemItems}>
                {stemData.map((item, index) => (
                  <div key={index} className={styles.stemItem}>
                    <span className={styles.letter}>{item.letter}</span>
                    <span className={styles.phrase}>{item.phrase}</span>
                  </div>
                ))}
              </div>
            </div>
            
            <div className={styles.ctaSection}>
              <h3>Ready to Make an Impact?</h3>
              <p>Download our comprehensive sponsorship package to learn about partnership opportunities and benefits.</p>
              
              <div className={styles.downloadCard}>
                <div className={styles.pdfInfo}>
                  <i className="fas fa-file-pdf"></i>
                  <div>
                    <h4>BAS Rocketry Partnership Guide</h4>
                    <span>Complete sponsorship package • PDF • 2.3 MB</span>
                  </div>
                </div>
                <button 
                  className={`${styles.downloadButton} ${isDownloading ? styles.downloading : ''}`}
                  onClick={handleDownload}
                  disabled={isDownloading}
                >
                  {isDownloading ? (
                    <>
                      <i className="fas fa-spinner fa-spin"></i>
                      Downloading...
                    </>
                  ) : (
                    <>
                      <i className="fas fa-download"></i>
                      Download Sponsorship Package
                    </>
                  )}
                </button>
              </div>

              <div className={styles.alternativeActions}>
                <Link href="/sponsorship-tiers" className={styles.tiersLink}>
                  <i className="fas fa-layer-group"></i>
                  View Sponsorship Tiers
                </Link>
                <a href="mailto:partnerships@basrocketry.com" className={styles.contactLink}>
                  <i className="fas fa-envelope"></i>
                  Contact Us Directly
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section className={styles.contactSection}>
          <div className={styles.contactContent}>
            <div className={styles.contactInfo}>
              <h3>Let's Build the Future Together</h3>
              <p>Ready to support the next generation of aerospace engineers? We'd love to discuss how your organization can partner with BAS Rocketry.</p>
              
              <div className={styles.contactDetails}>
                <div className={styles.contactItem}>
                  <i className="fas fa-envelope"></i>
                  <div>
                    <span className={styles.contactLabel}>Partnership Inquiries</span>
                    <a href="mailto:partnerships@basrocketry.com">partnerships@basrocketry.com</a>
                  </div>
                </div>
            </div>
          </div>
            
            <div className={styles.sponsorshipCTA}>
              <h4>Interested in Sponsoring?</h4>
              <p>Join our community of forward-thinking organizations supporting aerospace education.</p>
              <Link href="/sponsors" className={styles.viewSponsorsLink}>
                View Current Sponsors
                <i className="fas fa-arrow-right"></i>
              </Link>
            </div>
          </div>
        </section>
      </div>

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
              <a href="/#contact">Contact</a>
              <a href="/sponsors">Sponsors</a>
            </div>
          </div>
        </div>
      </footer>
    </main>
  );
}
