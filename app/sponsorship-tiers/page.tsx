'use client';

import { useState } from 'react';
import Link from 'next/link';
import styles from './SponsorshipTiers.module.css';
import NavBar from '../components/NavBar';

const features = [
  'Everyting included in Individual+',
  'Logo on website',
  'Logo on rockets',
  'Merch',
  'Shoutout on social media',
  'Promotional video',
  'Recognition at all events',
  'Collaboration on Rocket Design',
];

const gold = [true, 'Large + On Homepage', 'Large', "Large logo + Name + 3 pieces of merch", "All posts + Logo in the video", "Yes - 1 minute", true, true];
const silver = [true, 'Regular', "Medium", "Logo + 2 pieces of merch", "All posts - Description only", "Yes - 30 seconds", true, "-"];
const bronze = [true, 'Regular', "Small", "Name Only", "Relevant Posts Only", "-", "Name Only", "-"];

const individualFeatures = [
  'Name on rocket',
  'Exclusive updates',
];

const individualPlus = ["Launch Canada Rocket", "Frequent Photos + Videos"];
const individual = ["One preliminary rocket", "Monthly Email Updates"];

const tierDetails = {
  diamond: {
    title: "Diamond Tier",
    price: "$10,000+",
    benefits: [
      "Premium logo placement on website homepage",
      "Large logo placement on all rockets",
      "Custom merchandise package with company branding",
      "Featured in all social media content with custom hashtags",
      "1-minute promotional video feature",
      "VIP recognition at all events",
      "Direct collaboration on rocket design",
      "Exclusive access to launch events and testing"
    ]
  },
  platinum: {
    title: "Platinum Tier",
    price: "$5,000+",
    benefits: [
      "Prominent website logo placement",
      "Medium-sized logo on rockets",
      "Premium merchandise package",
      "Regular social media features",
      "30-second promotional feature",
      "Recognition at major events",
      "Regular progress updates",
      "Launch event invitations"
    ]
  },
  gold: {
    title: "Gold Tier",
    price: "$3,000+",
    benefits: [
      "Website logo placement",
      "Small logo on rockets",
      "Basic merchandise package",
      "Social media mentions",
      "Recognition at events",
      "Monthly updates",
      "Event attendance opportunities"
    ]
  },
  individualPlus: {
    title: "Individual+ Sponsor",
    price: "$200+",
    benefits: [
      "Name on Launch Canada competition rocket",
      "Frequent photo and video updates",
      "Access to exclusive content",
      "Personal thank you message",
      "Certificate of appreciation"
    ]
  },
  individual: {
    title: "Individual Sponsor",
    price: "Less than $200",
    benefits: [
      "Name on preliminary rocket",
      "Monthly email updates",
      "Access to public updates",
      "Personal thank you message"
    ]
  }
};

export default function SponsorshipTiers() {
  const [selectedTier, setSelectedTier] = useState<string | null>('diamond');

  const handleTierClick = (tier: string) => {
    setSelectedTier(tier);
  };

  return (
    <main className={styles.sponsorshipTiersPage}>
      <NavBar />

      <section className={styles.tierSelection}>
        <div className={styles.sponsorshipGrid}>
          <div className={styles.corporateSection}>
            <h1 className={styles.corpotateTitle}>Corporate Sponsorships</h1>
            <div className={styles.corporateTiers}>
              <div
                className={`${styles.tierCard} ${selectedTier === 'platinum' ? styles.selectedGold : ''} ${styles.goldCard}`}
                onClick={() => handleTierClick('platinum')}
              >
                <h3>Platinum</h3>
                <p>$5,000+</p>
              </div>
              <div
                className={`${styles.tierCard} ${selectedTier === 'diamond' ? styles.selectedPlatinum : ''} ${styles.platinumCard}`}
                onClick={() => handleTierClick('diamond')}
              >
                <h3>Diamond</h3>
                <p>$10,000+</p>
              </div>
              <div
                className={`${styles.tierCard} ${selectedTier === 'gold' ? styles.selectedQuartz : ''} ${styles.quartzCard}`}
                onClick={() => handleTierClick('gold')}
              >
                <h3>Gold</h3>
                <p>$3,000+</p>
              </div>
            </div>
          </div>

          <div className={styles.individualSection}>
            <h1 className={styles.indTitle}>Individual Sponsorships</h1>
            <div className={styles.individualTiers}>
              <div
                className={`${styles.tierCard} ${selectedTier === 'individualPlus' ? styles.selectedIndividualPlus : ''} ${styles.indCard}`}
                onClick={() => handleTierClick('individualPlus')}
              >
                <h3>Individual+</h3>
                <p>$200+</p>
              </div>
              <div
                className={`${styles.tierCard} ${selectedTier === 'individual' ? styles.selectedIndividual : ''} ${styles.indPlusCard}`}
                onClick={() => handleTierClick('individual')}
              >
                <h3>Individual</h3>
                <p>Less Than $200</p>
              </div>
            </div>
          </div>
        </div>

        <p>Learn More <a className={styles.sublink} href='#tiersTable' onClick={(e) => {
          e.preventDefault();
          document.getElementById('tiersTable')?.scrollIntoView({ behavior: 'smooth' });
        }}><i className="fas fa-arrow-down"></i></a></p>
      
      <div className={styles.donateButtonContainer + ' ' + styles.compareButton}>
        <Link href="#compareCorporate" className={styles.donateButton}>
          Compare All
        </Link>
      </div>


        {selectedTier && tierDetails[selectedTier as keyof typeof tierDetails] && (
          <div className={styles.tierDetails}>
            <h3>
              {tierDetails[selectedTier as keyof typeof tierDetails].title}
              <span>{tierDetails[selectedTier as keyof typeof tierDetails].price}</span>
            </h3>
            <ul>
              {tierDetails[selectedTier as keyof typeof tierDetails].benefits.map((benefit, index) => (
                <li key={`benefit-${selectedTier}-${index}`}>{benefit}</li>
              ))}
            </ul>
          </div>
        )}

      </section>

      {/* Corporate Sponsorship Section */}
      <section className={styles.corporateSection} id='compareCorporate'>
        <br></br><br></br><br></br><br></br>
        <h2>Corporate Sponsorship</h2>
        <div className={styles.tiersTableWrapper}>
          <div className={styles.podiumTable}>
            <div className={styles.podiumCol} id={styles.goldCol}>
              <div className={styles.podiumHeader + ' ' + styles.bronzeHeader}>
                <div>Diamond</div>
                <div className={styles.tierPrice}>$10,000+</div>
              </div>
            </div>
            <div className={styles.podiumCol} id={styles.silverCol}>
              <div className={styles.podiumHeader + ' ' + styles.goldHeader}>
                <div>Platinum</div>
                <div className={styles.tierPrice}>$5,000+</div>
              </div>
            </div>
            <div className={styles.podiumCol} id={styles.bronzeCol}>
              <div className={styles.podiumHeader + ' ' + styles.silverHeader}>
                <div>Gold</div>
                <div className={styles.tierPrice}>$3,000+</div>
              </div>
            </div>
          </div>
          <table className={styles.tiersTable}>
            <thead>
              <tr>
                <th className={styles.featureHeader}></th>
                <th className={styles.goldHeader}></th>
                <th className={styles.silverHeader}></th>
                <th className={styles.bronzeHeader}></th>
              </tr>
            </thead>
            <tbody>
          {features.map((feature, i) => (
              <tr key={feature}>
                <td className={styles.featureName}>{feature}</td>
                <td>{gold[i] === true ? 'Yes' : gold[i]}</td>
                <td>{silver[i] === true ? 'Yes' : silver[i]}</td>
                <td>{bronze[i] === true ? 'Yes' : bronze[i]}</td>
              </tr>
            ))}
          </tbody>
          </table>
        </div>
      </section>
      <p className={styles.negotiation}>All terms are open to negotiation. If you would like a modification of one of these sponsorships please <a className={styles.sublink} href='mailto:rocketry@bastoronto.org'>email us</a>.</p>

      {/* Individual Support Section */}
      <section className={styles.individualSection}>
        <br></br><br></br><br></br><br></br>
        <h2>Individual Support</h2>
        <div className={styles.tiersTableWrapper}>
          <table className={styles.tiersTable}>
            <thead>
              <tr>
                <th className={styles.featureHeader}></th>
                <th className={styles.individualPlusHeader}>
                  <div>Individual+</div>
                  <div className={styles.tierPrice}>$200+</div>
                </th>
                <th className={styles.individualHeader}>
                  <div>Individual</div>
                  <div className={styles.tierPrice}>Less Than $200</div>
                </th>
              </tr>
            </thead>
            <tbody>
            {individualFeatures.map((feature, i) => (
                <tr key={feature}>
                  <td className={styles.featureName}>{feature}</td>
                  <td>{individualPlus[i]}</td>
                  <td>{individual[i]}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
      <p className={styles.negotiation}>All terms are open to negotiation. If you would like a modification of one of these sponsorships please <a className={styles.sublink} href='mailto:rocketry@bastoronto.org'>email us</a>.</p>

      {/* Donate Button */}
      <div className={styles.donateButtonContainer}>
        <Link href="/donate" className={styles.donateButton}>
          Donate Now
        </Link>
      </div>

      <footer className={styles.foot}>
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