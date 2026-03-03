'use client';

import { Target, Eye, Gem, ArrowRight } from 'lucide-react';
import { useScrollAnimation, useStaggeredAnimation } from '@/lib/useScrollAnimation';
import styles from './page.module.css';

const MISSIONS = [
    {
        icon: Target,
        title: 'Our Mission',
        description: 'To provide outstanding educational support that empowers every student to achieve their academic potential and develop confidence for lifelong learning.',
    },
    {
        icon: Eye,
        title: 'Our Vision',
        description: "To be the leading educational institute recognised for transforming students' lives through innovative teaching, personalised care, and a commitment to excellence.",
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
                            Smart Star was founded with a simple but powerful belief: that every child
                            has the potential to achieve great things when given the right support and
                            encouragement. What started as a small tutoring initiative in Harrow has
                            grown into a thriving educational institute serving hundreds of students
                            from diverse backgrounds.
                        </p>
                        <p>
                            Over the years, we have helped countless students achieve outstanding results
                            in their exams, gain admission to top schools, and develop the confidence and
                            skills they need to succeed in life. Our dedicated team of experienced educators
                            continues to innovate and adapt, ensuring that every student receives the
                            personalised attention they deserve.
                        </p>
                        <p>
                            Today, Smart Star stands as a beacon of academic excellence in the community,
                            driven by our unwavering commitment to quality education and our passion for
                            making a difference in young lives.
                        </p>
                    </div>
                </section>
            </div>
        </div>
    );
}
