'use client';

import Link from 'next/link';
import styles from './SponsorshipTiers.module.css';

export default function SponsorshipTiers() {
  return (
    <main className={styles.sponsorshipTiers}>
      <section className={styles.organizationTiers}>
        <div className={styles.tier} id="silver">
          <h2>Silver</h2>
          <p>  • Your logo on our website in the Silver section.</p>
        </div>
        <div className={styles.tier} id="platinum">
          <h2>Platinum</h2>
          <p>  • Your logo on our website in the Platinum section.</p>
          <p>  • Your logo on our rockets (in big).</p>
          <p>  • Your logo on our merch (in big).</p>
          <p>  • Promotional video / shoutout on our Instagram & LinkedIn</p>
        </div>
        <div className={styles.tier} id="gold">
          <h2>Gold</h2>
          <p>  • Your logo on our website in the Gold section.</p>
          <p>  • Your logo on our rockets.</p>
          <p>  • Your logo on our merch.</p>
          <p>  • Shoutout on our Instagram & LinkedIn</p>
        </div>
      </section>

      <section className={styles.individualTiers}>
        <div className={styles.tier} id="individual">
          <h2>Individual</h2>
          <p>Support us as an individual and get a thank-you email.</p>
        </div>
        <div className={styles.tier} id="individualPlus">
          <h2>Individual+</h2>
          <p>Support us as an individual and get a thank-you email and a shoutout on social media.</p>
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