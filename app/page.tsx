'use client';

import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRocket, faUsers, faTrophy } from '@fortawesome/free-solid-svg-icons';
import { faInstagram, faTiktok, faYoutube, faDiscord } from '@fortawesome/free-brands-svg-icons';

export default function Home() {
  return (
    <main>
      <nav className="navbar">
        <div className="logo-container">
          <div className="logo-image">
            <img src="https://cdn-icons-png.flaticon.com/512/1995/1995572.png" alt="BAS Rocketry Logo" className="logo-img" />
          </div>
          <div className="logo">BAS Rocketry</div>
        </div>
        <div className="nav-links">
          <Link href="/">Home</Link>
          <Link href="/#about">About</Link>
          <Link href="/team">Team</Link>
          <Link href="/#projects">Projects</Link>
          <Link href="/#contact">Contact</Link>
        </div>
        <div className="hamburger">
          <span></span>
          <span></span>
          <span></span>
        </div>
      </nav>

      <section id="home" className="hero">
        <div className="hero-content">
          <h1>Welcome to BAS Rocketry</h1>
          <p>Building the future of space exploration, one rocket at a time! 🚀</p>
          <Link href="/#about" className="cta-button">Join Our Mission</Link>
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
              <FontAwesomeIcon icon={faRocket} />
              <h3>10+</h3>
              <p>Epic Launches</p>
            </div>
            <div className="stat">
              <FontAwesomeIcon icon={faUsers} />
              <h3>20+</h3>
              <p>Awesome Team Members</p>
            </div>
            <div className="stat">
              <FontAwesomeIcon icon={faTrophy} />
              <h3>5+</h3>
              <p>Cool Awards</p>
            </div>
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
          <form className="contact-form">
            <input type="text" placeholder="Your Name" required />
            <input type="email" placeholder="Your Email" required />
            <textarea placeholder="Your Message" required></textarea>
            <button type="submit" className="submit-button">Send Message</button>
          </form>
          <div className="contact-info">
            <div className="info-item">
              <i className="fas fa-envelope"></i>
              <p>basrocketry@gmail.com</p>
            </div>
            <div className="info-item">
              <i className="fas fa-map-marker-alt"></i>
              <p>High School Campus, Space City</p>
            </div>
            <div className="social-links">
              <a href="#"><FontAwesomeIcon icon={faInstagram} /></a>
              <a href="#"><FontAwesomeIcon icon={faTiktok} /></a>
              <a href="#"><FontAwesomeIcon icon={faYoutube} /></a>
              <a href="#"><FontAwesomeIcon icon={faDiscord} /></a>
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
            <Link href="/">Home</Link>
            <Link href="/#about">About</Link>
            <Link href="/team">Team</Link>
            <Link href="/#projects">Projects</Link>
            <Link href="/#contact">Contact</Link>
          </div>
        </div>
        <div className="footer-bottom">
          <p>&copy; 2024 BAS Rocketry. All rights reserved.</p>
        </div>
      </footer>
    </main>
  );
} 