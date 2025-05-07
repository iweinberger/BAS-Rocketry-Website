'use client';

import { useState } from 'react';
import Link from 'next/link';
import styles from './SponsorshipTiers.module.css';
import NavBar from '../components/NavBar';

const features = [
  'Logo on website',
  'Logo on rockets',
  'Logo on merch',
  'Shoutout on social media',
  'Promotional video',
  'Priority booth at events',
  'Custom collaboration',
];

const gold = [true, true, true, true, true, true, true];
const silver = [true, false, false, true, false, false, false];
const bronze = [true, false, false, false, false, false, false];

const individualFeatures = [
  'Thank-you email',
  'Shoutout on social media',
  'Name on website',
  'Exclusive updates',
];

const individualPlus = [true, true, true, true];
const individual = [true, false, true, false];

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
            <p>$1000 — $5000</p>
          </div>
          <div
            className={`${styles.tierCard} ${selectedTier === 'platinum' ? styles.selectedPlatinum : ''} ${styles.platinumCard}`}
            onClick={() => handleTierClick('platinum')}
          >
            <h3>Platinum</h3>
            <p>$5000+</p>
          </div>
          <div
            className={`${styles.tierCard} ${selectedTier === 'quartz' ? styles.selectedQuartz : ''} ${styles.quartzCard}`}
            onClick={() => handleTierClick('quartz')}
          >
            <h3>Quartz</h3>
            <p>Less Than $1000</p>
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
                <div className={styles.tierPrice}>$999</div>
              </div>
            </div>
            <div className={styles.podiumCol} id={styles.silverCol}>
              <div className={styles.podiumHeader + ' ' + styles.silverHeader}>
                <div>Gold</div>
                <div className={styles.tierPrice}>$499</div>
              </div>
            </div>
            <div className={styles.podiumCol} id={styles.bronzeCol}>
              <div className={styles.podiumHeader + ' ' + styles.bronzeHeader}>
                <div>Quartz</div>
                <div className={styles.tierPrice}>$199</div>
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
                  <td>{gold[i] ? 'Yes' : '-'}</td>
                  <td>{silver[i] ? 'Yes' : '-'}</td>
                  <td>{bronze[i] ? 'Yes' : '-'}</td>
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
                  <div className={styles.tierPrice}>$99</div>
                </th>
                <th className={styles.individualHeader}>
                  <div>Individual</div>
                  <div className={styles.tierPrice}>$25</div>
                </th>
              </tr>
            </thead>
            <tbody>
              {individualFeatures.map((feature, i) => (
                <tr key={feature}>
                  <td className={styles.featureName}>{feature}</td>
                  <td>{individualPlus[i] ? 'Yes' : '-'}</td>
                  <td>{individual[i] ? 'Yes' : '-'}</td>
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