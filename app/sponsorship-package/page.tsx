'use client';

import { useState } from 'react';
import NavBar from '../components/NavBar';
import styles from './SponsorshipPackage.module.css';

export default function SponsorshipPackage() {
  const [isDownloading, setIsDownloading] = useState(false);

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

  const stemData = [
    { letter: 'S', phrase: 'Student-led aerospace innovation' },
    { letter: 'T', phrase: 'Technology advancing education' },
    { letter: 'E', phrase: 'Engineering excellence in rocketry' },
    { letter: 'M', phrase: 'Modern STEM inspiration' }
  ];

  return (
    <main className={styles.sponsorshipPackagePage}>
      <NavBar />
      
      <div className={styles.pageContent}>
        <section className={styles.heroSection}>
          <h1>Partnership Opportunities</h1>
          <p>Support student-led aerospace innovation at BAS Rocketry</p>
        </section>

        <section className={styles.contentSection}>
          <div className={styles.stemGrid}>
            <h2>Why Partner With BAS?</h2>
            <div className={styles.stemItems}>
              {stemData.map((item, index) => (
                <div key={index} className={styles.stemItem}>
                  <span className={styles.letter}>{item.letter}</span>
                  <span className={styles.phrase}>{item.phrase}</span>
                </div>
              ))}
            </div>
          </div>

          <div className={styles.downloadSection}>
            <h3>Complete Sponsorship Package</h3>
            <div className={styles.downloadCard}>
              <div className={styles.pdfInfo}>
                <i className="fas fa-file-pdf"></i>
                <div>
                  <h4>BAS Rocketry Partnership Guide</h4>
                  <span>PDF • 2.3 MB</span>
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
                    Download
                  </>
                )}
              </button>
            </div>
          </div>

          <div className={styles.contactSection}>
            <h3>Questions?</h3>
            <div className={styles.contactItems}>
              <a href="mailto:partnerships@basrocketry.com">
                <i className="fas fa-envelope"></i>
                partnerships@basrocketry.com
              </a>
              <span>
                <i className="fas fa-phone"></i>
                (416) 555-ROCKET
              </span>
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
