'use client';

import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, Sparkles, Users, TrendingUp, Clock, Award } from 'lucide-react';
import { useScrollAnimation, useStaggeredAnimation } from '@/lib/useScrollAnimation';
import Counter from '@/components/Counter';
import styles from './Hero.module.css';

const STATS = [
    { icon: Users, target: 500, suffix: '+', label: 'Participants' },
    { icon: TrendingUp, target: 95, suffix: '%', label: 'Success Rate' },
    { icon: Clock, target: 10, suffix: '+', label: 'Years Running' },
    { icon: Award, target: 50, suffix: '+', label: 'Award Winners' },
];

export default function Hero() {
    const [statsRef, statsVisible] = useScrollAnimation<HTMLDivElement>({ threshold: 0.2 });
    const staggered = useStaggeredAnimation(STATS.length, statsVisible, 150);

    return (
        <>
            <section className={styles.hero}>
                {/* Decorative elements */}
                <div className={styles.heroBgOrb1} aria-hidden="true" />
                <div className={styles.heroBgOrb2} aria-hidden="true" />
                <div className={styles.heroBgGrid} aria-hidden="true" />

                <div className={styles.heroInner}>
                    <div className={styles.heroContent}>
                        <div className={styles.heroBadge}>
                            <Sparkles size={15} />
                            <span>Now Accepting Applications</span>
                        </div>
                        <h1 className={styles.heroTitle}>
                            Unlock Your Child&apos;s{' '}
                            <span className={styles.heroTitleAccent}>Brightest Potential</span>
                        </h1>
                        <p className={styles.heroDescription}>
                            Smart Star is a premier Maths and English competition dedicated to challenging
                            young minds with excellence, creativity, and confidence.
                            Give your child the academic head start they deserve.
                        </p>
                        <div className={styles.heroActions}>
                            <Link href="/apply-now" className={styles.btnPrimary}>
                                Apply Now <ArrowRight size={18} />
                            </Link>
                            <Link href="/about-us" className={styles.btnGhost}>
                                Learn More
                            </Link>
                        </div>
                    </div>
                    <div className={styles.heroVisual}>
                        <div className={styles.heroImageWrapper}>
                            <div className={styles.heroRing} aria-hidden="true" />
                            <div className={styles.heroRing2} aria-hidden="true" />
                            <div className={styles.heroImageInner}>
                                <Image
                                    src="/logo.png"
                                    alt="Smart Star Mascot"
                                    fill
                                    style={{ objectFit: 'contain' }}
                                    priority
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Stats Bar */}
            <div className={styles.statsBar} ref={statsRef}>
                <div className={styles.statsGrid}>
                    {STATS.map((stat, i) => (
                        <div
                            key={stat.label}
                            className={`${styles.statItem} ${staggered[i] ? styles.statVisible : ''}`}
                        >
                            <stat.icon size={28} className={styles.statIcon} strokeWidth={1.5} />
                            <div className={styles.statNumber}>
                                <Counter target={stat.target} suffix={stat.suffix} visible={statsVisible} />
                            </div>
                            <div className={styles.statLabel}>{stat.label}</div>
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
}
