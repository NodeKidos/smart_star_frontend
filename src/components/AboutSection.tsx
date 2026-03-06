'use client';

import { BookOpen, Target, Trophy, Lightbulb, Star } from 'lucide-react';
import { useScrollAnimation, useStaggeredAnimation } from '@/lib/useScrollAnimation';
import styles from './AboutSection.module.css';

const FEATURES = [
    { icon: Star, text: 'Engaging Competitions' },
    { icon: Target, text: 'Skill Development' },
    { icon: Trophy, text: 'Awards & Recognition' },
];

const EXAM_DETAILS = [
    {
        icon: BookOpen,
        title: 'One Combined Exam Paper',
        description: 'Students will complete one special exam paper that includes both Maths and English questions.',
    },
    {
        icon: Target,
        title: '15 Maths + 15 English Questions',
        description: 'The exam consists of 15 Maths questions and 15 English questions to test both analytical and language skills.',
    },
    {
        icon: Trophy,
        title: '1 Hour Duration',
        description: 'Students will complete the full paper within 1 hour, helping them develop strong time management skills.',
    },
    {
        icon: Lightbulb,
        title: 'Why This Exam?',
        description:
            'This exam builds confidence in academic abilities, strengthens problem-solving and English skills, develops time management, and reduces exam nerves from a young age.',
    },
];

export default function AboutSection() {
    const [aboutRef, aboutVisible] = useScrollAnimation<HTMLElement>({ threshold: 0.1 });
    const [featRef, featVisible] = useScrollAnimation<HTMLDivElement>({ threshold: 0.2 });
    const featStagger = useStaggeredAnimation(FEATURES.length, featVisible, 120);

    const [examRef, examVisible] = useScrollAnimation<HTMLElement>({ threshold: 0.1 });
    const examStagger = useStaggeredAnimation(EXAM_DETAILS.length, examVisible, 180);

    return (
        <>
            {/* About Section */}
            <section className={styles.about} id="about" ref={aboutRef}>
                <div className={styles.aboutInner}>
                    <div className={styles.aboutGrid}>
                        
                        {/* Left Visual */}
                        <div className={`${styles.aboutVisual} ${aboutVisible ? styles.revealed : ''}`}>
                            <div className={styles.aboutVisualCard}>
                                <div className={styles.visualAccent} aria-hidden="true" />
                                <Star size={56} strokeWidth={1.2} className={styles.visualIcon} />

                                <span className={styles.visualText}>
                                    Inspiring Young Minds <br /> to Shine
                                </span>

                                <div className={styles.visualBadge}>Smart Star</div>
                            </div>
                        </div>

                        {/* Right Content */}
                        <div className={`${styles.aboutContent} ${aboutVisible ? styles.revealed : ''}`}>
                            <span className={styles.sectionLabel}>About Us</span>

                            <h2 className={styles.sectionHeading}>
                                Inspiring Young Minds Through Competition
                            </h2>

                            <p>
                                Smart Star is an exciting educational competition designed to
                                inspire and motivate young learners aged 6–11. The competition
                                encourages children to challenge themselves, explore their talents,
                                and build confidence in their academic abilities.
                            </p>

                            <p>
                                We believe every child has the potential to shine. Through engaging
                                competitions and meaningful recognition, Smart Star helps students
                                strengthen their Maths and English skills while developing a love
                                for learning from an early age.
                            </p>

                            {/* Features */}
                            <div className={styles.features} ref={featRef}>
                                {FEATURES.map((feat, i) => (
                                    <div
                                        key={feat.text}
                                        className={`${styles.featureItem} ${
                                            featStagger[i] ? styles.featureVisible : ''
                                        }`}
                                    >
                                        <div className={styles.featureIconWrap}>
                                            <feat.icon size={20} strokeWidth={2} />
                                        </div>
                                        <span className={styles.featureText}>{feat.text}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Combined Maths & English Exam Section */}
            <section className={styles.whyUs} ref={examRef}>
                <div className={styles.whyUsInner}>
                    <span className={`${styles.sectionLabel} ${styles.sectionLabelCenter}`}>
                        Exam Details
                    </span>

                    <h2 className="section-title">📝 Combined Maths & English Exam</h2>

                    <p className="section-subtitle">
                        A specially designed exam to strengthen both analytical and language skills
                    </p>

                    <div className={styles.whyUsGrid}>
                        {EXAM_DETAILS.map((item, i) => (
                            <div
                                key={item.title}
                                className={`${styles.whyUsCard} ${
                                    examStagger[i] ? styles.cardVisible : ''
                                }`}
                            >
                                <div className={styles.whyUsIconWrap}>
                                    <item.icon size={32} strokeWidth={1.5} />
                                </div>

                                <h3>{item.title}</h3>
                                <p>{item.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </>
    );
}