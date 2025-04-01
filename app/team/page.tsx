'use client';

import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRocket, faUsers, faTrophy, faShieldAlt, faCogs, faChartLine } from '@fortawesome/free-solid-svg-icons';

const teamMembers = [
  {
    name: "Alex Johnson",
    role: "Team Captain",
    description: "Leading our mission to the stars!",
    image: "/images/team/alex.jpg"
  },
  {
    name: "Sarah Chen",
    role: "Rocket Designer",
    description: "Making our rockets fly higher and faster",
    image: "/images/team/sarah.jpg"
  },
  {
    name: "Mike Rodriguez",
    role: "Safety Officer",
    description: "Keeping our launches safe and successful",
    image: "/images/team/mike.jpg"
  },
  {
    name: "Emma Davis",
    role: "Propulsion Expert",
    description: "Powering our rockets to new heights",
    image: "/images/team/emma.jpg"
  },
  {
    name: "James Wilson",
    role: "Avionics Lead",
    description: "Making our rockets smarter",
    image: "/images/team/james.jpg"
  },
  {
    name: "Sophie Kim",
    role: "Recovery Specialist",
    description: "Bringing our rockets back safely",
    image: "/images/team/sophie.jpg"
  }
];

export default function Team() {
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

      <section className="team-hero">
        <div className="hero-content">
          <h1>Meet Our Team</h1>
          <p>The amazing students behind BAS Rocketry 🚀</p>
        </div>
      </section>

      <section className="team-grid">
        {teamMembers.map((member, index) => (
          <div key={index} className="team-member">
            <div className="member-image">
              <img src={member.image} alt={member.name} />
            </div>
            <h3>{member.name}</h3>
            <p className="role">{member.role}</p>
            <p className="description">{member.description}</p>
          </div>
        ))}
      </section>

      <section className="team-stats">
        <div className="stat">
          <FontAwesomeIcon icon={faUsers} />
          <h3>20+</h3>
          <p>Team Members</p>
        </div>
        <div className="stat">
          <FontAwesomeIcon icon={faRocket} />
          <h3>10+</h3>
          <p>Successful Launches</p>
        </div>
        <div className="stat">
          <FontAwesomeIcon icon={faTrophy} />
          <h3>5+</h3>
          <p>Awards Won</p>
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