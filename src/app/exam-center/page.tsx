'use client';

import styles from './page.module.css';

export default function ExamCenterPage() {
    return (
        <section className={styles.mapSection}>

            <div className={styles.container}>

                <span className={styles.label}>Exam Center</span>

                <h2 className={styles.title}>📍 Alperton, London</h2>

                <p className={styles.subtitle}>
                    Smart Star Competition official exam center located in Alperton, London.
                </p>

                <div className={styles.mapWrapper}>
                   <iframe
  src="https://maps.google.com/maps?q=Alperton,London&z=15&output=embed"
  width="100%"
  height="450"
  style={{ border: 0 }}
  loading="lazy"
/>
                </div>

            </div>

        </section>
    );
}