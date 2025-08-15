'use client';

import Link from 'next/link';
import NavBar from './components/NavBar';

export default function NotFound() {
  return (
    <main>
      <NavBar />
      <section className="hero error-hero">
        <div className="error-content">
          <div className="error-animation">
            <div className="rocket-container">
              <i className="fas fa-rocket"></i>
              <div className="smoke">
                {[...Array(5)].map((_, i) => (
                  <span key={i} className="smoke-particle"></span>
                ))}
              </div>
            </div>
            <div className="stars">
              {[...Array(20)].map((_, i) => (
                <div key={i} className="star" style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  animationDelay: `${Math.random() * 3}s`
                }}></div>
              ))}
            </div>
          </div>
          <div className="error-text">
            <h1>Houston, We Have a Problem!</h1>
            <div className="error-details">
              <div className="error-code">
                <span>ERROR</span>
                <h2>404</h2>
              </div>
              <p>Mission Control reports that this page has gone off course and entered deep space.</p>
            </div>
            <div className="mission-status">
              <div className="status-item">
                <i className="fas fa-satellite"></i>
                <span>Signal Lost</span>
              </div>
              <div className="status-item">
                <i className="fas fa-broadcast-tower"></i>
                <span>Page Not Found</span>
              </div>
            </div>
            <div className="action-buttons">
              <Link href="/" className="primary-button">
                <i className="fas fa-arrow-left"></i>
                Return to Launch Site
              </Link>
              <Link href="/projects" className="secondary-button">
                <i className="fas fa-rocket"></i>
                View Active Missions
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
} 