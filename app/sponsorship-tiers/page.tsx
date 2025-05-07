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

const gold = [true, 'Large', 'Large', "Large logo + Name + 3 pieces of merch", "All", "Yes - 1 minute", true, true];
const silver = [true, 'Regular', "Medium", "Logo + 2 pieces of merch", "All", "Yes - 30 seconds", true, "-"];
const bronze = [true, 'Regular', "Small", "Name Only", "Relevant Posts Only", "-", "Name Only", "-"];

const individualFeatures = [
  '',
  '',
  'Name on rocket',
  'Exclusive updates',
];

const individualPlus = [true, true, true, "Frequent Photos + Videos"];
const individual = ["-", "-", "-", "Monthly Email Updates"];

export default function SponsorshipTiers() {
  const [selectedTier, setSelectedTier] = useState<string | null>('platinum'); // Set 'platinum' as the default

  const handleTierClick = (tier: string) => {
    setSelectedTier(tier);
  };

  return (
    <main className={styles.sponsorshipTiersPage}>
      <NavBar />

      {/* Tier Selection Section */}
      <section className={styles.tierSelection}>
      <h1 className={styles.corpotateTitle}>Corporate Sponsorships</h1>
      <br></br>
        <div className={styles.corporateTiers}>
          <div
            className={`${styles.tierCard} ${selectedTier === 'gold' ? styles.selectedGold : ''} ${styles.goldCard}`}
            onClick={() => handleTierClick('gold')}
          >
            <h3>Gold</h3>
            <p>$5000</p>
          </div>
          <div
            className={`${styles.tierCard} ${selectedTier === 'platinum' ? styles.selectedPlatinum : ''} ${styles.platinumCard}`}
            onClick={() => handleTierClick('platinum')}
          >
            <h3>Platinum</h3>
            <p>$10,000+</p>
          </div>
          <div
            className={`${styles.tierCard} ${selectedTier === 'quartz' ? styles.selectedQuartz : ''} ${styles.quartzCard}`}
            onClick={() => handleTierClick('quartz')}
          >
            <h3>Quartz</h3>
            <p>Less Than $3,000</p>
          </div>
        </div>
        <p>All terms are open to negotiation. If you would like a modification of one of these sponsorships please <a className={styles.sublink} href='/#contact'>contact us</a>.</p>

        <br></br>

        <div className={styles.individualTiers}>
          <h1 className={styles.indTitle}>Individual Sponsorships</h1>
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
        <br></br>
        <p>All terms are open to negotiation. If you would like a modification of one of these sponsorships please <a className={styles.sublink} href='/#contact'>contact us</a>.</p>
      </section>

      {/* Corporate Sponsorship Section */}
      <section className={styles.corporateSection}>
        <h2>Corporate Sponsorship</h2>
        <div className={styles.tiersTableWrapper}>
          <div className={styles.podiumTable}>
            <div className={styles.podiumCol} id={styles.goldCol}>
              <div className={styles.podiumHeader + ' ' + styles.goldHeader}>
                <div>Platinum</div>
                <div className={styles.tierPrice}>$10,000</div>
              </div>
            </div>
            <div className={styles.podiumCol} id={styles.silverCol}>
              <div className={styles.podiumHeader + ' ' + styles.silverHeader}>
                <div>Gold</div>
                <div className={styles.tierPrice}>$5,000</div>
              </div>
            </div>
            <div className={styles.podiumCol} id={styles.bronzeCol}>
              <div className={styles.podiumHeader + ' ' + styles.bronzeHeader}>
                <div>Quartz</div>
                <div className={styles.tierPrice}>$1,000</div>
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

      {/* Individual Support Section */}
      <section className={styles.individualSection}>
        <h2>Individual Support</h2>
        <div className={styles.tiersTableWrapper}>
          <table className={styles.tiersTable}>
            <thead>
              <tr>
                <th className={styles.featureHeader}></th>
                <th className={styles.individualPlusHeader}>
                  <div>Individual+</div>
                  <div className={styles.tierPrice}>$180</div>
                </th>
                <th className={styles.individualHeader}>
                  <div>Individual</div>
                  <div className={styles.tierPrice}>$50</div>
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