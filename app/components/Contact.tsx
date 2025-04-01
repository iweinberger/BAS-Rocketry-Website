'use client';

import ContactForm from './ContactForm';
import SocialLinks from './SocialLinks';

interface ContactProps {
  title: string;
  description: string;
  email: string;
  address: string;
}

export default function Contact({ title, description, email, address }: ContactProps) {
  return (
    <section id="contact" className="contact">
      <div className="container">
        <h2>{title}</h2>
        <p>{description}</p>
        <div className="contact-grid">
          <div className="contact-info">
            <div className="info-item">
              <h3>Email</h3>
              <a href={`mailto:${email}`}>{email}</a>
            </div>
            <div className="info-item">
              <h3>Address</h3>
              <p>{address}</p>
            </div>
            <div className="info-item">
              <h3>Follow Us</h3>
              <SocialLinks />
            </div>
          </div>
          <ContactForm />
        </div>
      </div>
    </section>
  );
} 