'use client';

import { Target, Eye, Gem, ArrowRight } from 'lucide-react';
import { useScrollAnimation, useStaggeredAnimation } from '@/lib/useScrollAnimation';
import styles from './page.module.css';

const MISSIONS = [
    {
        icon: Target,
        title: 'Our Mission',
        description: 'To provide an outstanding competitive platform that empowers every student to test their academic potential and develop confidence for lifelong learning.',
    },
    {
        icon: Eye,
        title: 'Our Vision',
        description: "To be the leading maths and english competition recognised for transforming students' lives through challenging exams and a commitment to academic excellence.",
    },
    {
        icon: Gem,
        title: 'Our Values',
        description: 'Excellence, integrity, inclusivity, and innovation guide everything we do. We believe that every child deserves the opportunity to shine.',
    },
];

export default function AboutUsPage() {
    const [missionRef, missionVisible] = useScrollAnimation<HTMLDivElement>({ threshold: 0.15 });
    const missionStagger = useStaggeredAnimation(MISSIONS.length, missionVisible, 180);
    const [storyRef, storyVisible] = useScrollAnimation<HTMLElement>({ threshold: 0.1 });

    return (
        <div className={styles.aboutPage}>
            <div className={styles.pageHeader}>
                <div className={styles.headerContent}>
                    <h1>About Smart Star</h1>
                    <p>Discover our passion for nurturing young minds and building bright futures</p>
                </div>
            </div>

            <div className={styles.container}>
                <div className={styles.missionGrid} ref={missionRef}>
                    {MISSIONS.map((m, i) => (
                        <div
                            key={m.title}
                            className={`${styles.missionCard} ${missionStagger[i] ? styles.cardVisible : ''}`}
                        >
                            <div className={styles.missionIconWrap}>
                                <m.icon size={30} strokeWidth={1.5} />
                            </div>
                            <h3>{m.title}</h3>
                            <p>{m.description}</p>
                        </div>
                    ))}
                </div>

                <section
                    className={`${styles.storySection} ${storyVisible ? styles.storyRevealed : ''}`}
                    ref={storyRef}
                >
                    <span className={styles.sectionLabel}>Our Story</span>
                    <h2 className="section-title">How Smart Star Began</h2>
                    <div className={styles.storyContent}>
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
                    </div>
                </section>
            </div>
        </div>
    );
}
