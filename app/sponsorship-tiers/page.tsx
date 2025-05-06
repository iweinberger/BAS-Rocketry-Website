'use client';

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

const gold =     [true, 'Large', 'Large', "Large logo + Name + 3 pieces of merch", "All", "Yes - 1 minute", true, true];
const silver =   [true, 'Regular', "Medium", "Logo + 2 pieces of merch", "All", "Yes - 30 seconds", true, "-"];
const bronze =   [true, 'Regular', "Small", "Name Only", "Relevant Posts Only", "-", "Name Only", "-"];

const individualFeatures = [
  '',
  '',
  'Name on rocket',
  'Exclusive updates',
];

const individualPlus = [true, true, true, "Frequent Photos + Videos"];
const individual = ["-", "-", "-", "Monthly Email Updates"];

export default function SponsorshipTiers() {
  return (
    <main className={styles.sponsorshipTiersPage}>
      <NavBar />
      <section className={styles.corporateSection}>
        <h2>Corporate Sponsorship</h2>
        <div className={styles.tiersTableWrapper}>
          <div className={styles.podiumTable}>
            <div className={styles.podiumCol} id={styles.goldCol}>
              <div className={styles.podiumHeader + ' ' + styles.goldHeader}>
                <div>Gold</div>
                <div className={styles.tierPrice}>$10,000</div>
              </div>
            </div>
            <div className={styles.podiumCol} id={styles.silverCol}>
              <div className={styles.podiumHeader + ' ' + styles.silverHeader}>
                <div>Silver</div>
                <div className={styles.tierPrice}>$5,000</div>
              </div>
            </div>
            <div className={styles.podiumCol} id={styles.bronzeCol}>
              <div className={styles.podiumHeader + ' ' + styles.bronzeHeader}>
                <div>Bronze</div>
                <div className={styles.tierPrice}>$3,000</div>
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

      <div className={styles.donateButtonContainer}>
        <Link href="/donate" className={styles.donateButton}>
          Donate Now
        </Link>
      </div>
    </main>
  );
}