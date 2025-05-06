'use client';

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

const gold =     [true, true, true, true, true, true, true];
const silver =   [true, false, false, true, false, false, false];
const bronze =   [true, false, false, false, false, false, false];

const individualFeatures = [
  'Thank-you email',
  'Shoutout on social media',
  'Name on website',
  'Exclusive updates',
];

const individualPlus = [true, true, true, true];
const individual = [true, false, true, false];

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
                <div className={styles.tierPrice}>$999</div>
              </div>
            </div>
            <div className={styles.podiumCol} id={styles.silverCol}>
              <div className={styles.podiumHeader + ' ' + styles.silverHeader}>
                <div>Silver</div>
                <div className={styles.tierPrice}>$499</div>
              </div>
            </div>
            <div className={styles.podiumCol} id={styles.bronzeCol}>
              <div className={styles.podiumHeader + ' ' + styles.bronzeHeader}>
                <div>Bronze</div>
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

      <div className={styles.donateButtonContainer}>
        <Link href="/donate" className={styles.donateButton}>
          Donate Now
        </Link>
      </div>
    </main>
  );
}