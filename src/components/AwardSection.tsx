'use client';

import { Trophy, Award } from 'lucide-react';
import styles from './AwardSection.module.css';
export default function AwardsSection() {
    return (
        <section className={styles.section}>
            <div className={styles.container}>

                <span className={styles.label}>Recognition</span>

                <h2 className={styles.heading}>🏆 Awards & Recognition</h2>

                <p className={styles.subtitle}>
                    Children who excel in the competition and exam will be honoured with special awards to celebrate their achievements.
                </p>

                <div className={styles.grid}>

                    <div className={styles.card}>
                        <div className={styles.iconWrap}>
                            <Trophy size={32} strokeWidth={1.8} />
                        </div>
                        <h3>🏆 Trophy</h3>
                        <p>
                            A symbol of outstanding achievement awarded to students who perform exceptionally well.
                        </p>
                    </div>

                    <div className={styles.card}>
                        <div className={styles.iconWrap}>
                            <Award size={32} strokeWidth={1.8} />
                        </div>
                        <h3>📜 Certificate</h3>
                        <p>
                            A certificate celebrating their hard work, dedication, and success in the competition.
                        </p>
                    </div>

                </div>

                <p className={styles.closingText}>
                    Let’s celebrate your child’s achievements, both academically and creatively, and inspire them to reach for the stars! ✨
                </p>
                <p className={styles.highlightText}>
                    💫 Join us for an inspiring experience that helps children shine academically, creatively, and with confidence!
                </p>

                <section className={styles.quoteSection}>
                    <div className={styles.quoteBox}>

                        <h2 className={styles.quoteHeading}>
                            “ஜக்கிய இராச்சியத்தில் முதல் முறையாக கணிதம், ஆங்கிலம் ஆகிய பாடங்களை
                            ஒருங்கினைத்து நடாத்தப்படும் ஒரே ஓரு சிறப்புத் தேர்வு இதுவாகும்.”
                        </h2>

                    </div>
                </section>
            </div>
        </section>
    );
}