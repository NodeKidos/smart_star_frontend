'use client';

import { BookOpen, Target, Users, Trophy, GraduationCap, BarChart3, Lightbulb, Star } from 'lucide-react';
import { useScrollAnimation, useStaggeredAnimation } from '@/lib/useScrollAnimation';
import styles from './AboutSection.module.css';

const FEATURES = [
    { icon: BookOpen, text: 'Expert Tutors' },
    { icon: Target, text: 'Proven Results' },
    { icon: Users, text: 'Small Class Sizes' },
    { icon: Trophy, text: 'Award Winning' },
];

const WHY_US = [
    {
        icon: GraduationCap,
        title: 'Qualified Teachers',
        description: 'Our team of highly qualified and experienced educators are passionate about helping students succeed in their academic journey.',
    },
    {
        icon: BarChart3,
        title: 'Structured Curriculum',
        description: 'Our carefully designed curriculum aligns with national standards while incorporating innovative teaching approaches.',
    },
    {
        icon: Lightbulb,
        title: 'Individual Attention',
        description: 'With small class sizes, every student receives personalised guidance and support tailored to their unique learning needs.',
    },
];

export default function AboutSection() {
    const [aboutRef, aboutVisible] = useScrollAnimation<HTMLElement>({ threshold: 0.1 });
    const [featRef, featVisible] = useScrollAnimation<HTMLDivElement>({ threshold: 0.2 });
    const featStagger = useStaggeredAnimation(FEATURES.length, featVisible, 120);

    const [whyRef, whyVisible] = useScrollAnimation<HTMLElement>({ threshold: 0.1 });
    const whyStagger = useStaggeredAnimation(WHY_US.length, whyVisible, 180);

    return (
        <>
            {/* About Section */}
            <section className={styles.about} id="about" ref={aboutRef}>
                <div className={styles.aboutInner}>
                    <div className={styles.aboutGrid}>
                        <div className={`${styles.aboutVisual} ${aboutVisible ? styles.revealed : ''}`}>
                            <div className={styles.aboutVisualCard}>
                                <div className={styles.visualAccent} aria-hidden="true" />
                                <Star size={56} strokeWidth={1.2} className={styles.visualIcon} />
                                <span className={styles.visualText}>
                                    Empowering Students<br />Since Day One
                                </span>
                                <div className={styles.visualBadge}>Est. 2014</div>
                            </div>
                        </div>
                        <div className={`${styles.aboutContent} ${aboutVisible ? styles.revealed : ''}`}>
                            <span className={styles.sectionLabel}>About Us</span>
                            <h2 className={styles.sectionHeading}>Shaping Future Leaders with Excellence</h2>
                            <p>
                                Smart Star is a leading educational institute committed to providing
                                high-quality learning experiences that empower students to achieve
                                their academic goals. Our dedicated team of experienced educators
                                creates a supportive and stimulating environment where every child
                                can thrive.
                            </p>
                            <p>
                                We believe that every child has the potential to be a star. Through
                                our carefully designed curriculum, personalised attention, and
                                innovative teaching methods, we help students build strong
                                foundations for lifelong success.
                            </p>
                            <div className={styles.features} ref={featRef}>
                                {FEATURES.map((feat, i) => (
                                    <div
                                        key={feat.text}
                                        className={`${styles.featureItem} ${featStagger[i] ? styles.featureVisible : ''}`}
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

            {/* Why Choose Us */}
            <section className={styles.whyUs} ref={whyRef}>
                <div className={styles.whyUsInner}>
                    <span className={`${styles.sectionLabel} ${styles.sectionLabelCenter}`}>Why Smart Star</span>
                    <h2 className="section-title">Why Choose Smart Star?</h2>
                    <p className="section-subtitle">
                        We go beyond traditional teaching to ensure every student reaches their full potential
                    </p>
                    <div className={styles.whyUsGrid}>
                        {WHY_US.map((item, i) => (
                            <div
                                key={item.title}
                                className={`${styles.whyUsCard} ${whyStagger[i] ? styles.cardVisible : ''}`}
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
