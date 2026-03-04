'use client';

import { Star, Users, GraduationCap, Trophy } from 'lucide-react';
import styles from './WhyJoinSection.module.css';

const DATA = [
    {
        icon: Star,
        title: "Showcase Talents",
        description: "Give your child the opportunity to showcase their talents and creativity.",
    },
    {
        icon: Users,
        title: "Supportive Environment",
        description: "Participate in a fun, positive, and encouraging competition atmosphere.",
    },
    {
        icon: GraduationCap,
        title: "Learning & Growth",
        description: "A perfect blend of learning, performance, and personal development.",
    },
    {
        icon: Trophy,
        title: "Shine Bright",
        description: "Help your child shine academically and creatively with confidence.",
    },
];

export default function WhyJoinSection() {
    return (
        <section className={styles.section}>
            <div className={styles.container}>
                
                {/* Left Side */}
                <div className={styles.left}>
                    <h2 className={styles.heading}>
                        The Best Opportunity <br /> To Shine With Us
                    </h2>

                    {/* You can replace this image */}
                    <img 
                        src="/competition-illustration.png" 
                        alt="Competition Illustration" 
                        className={styles.illustration}
                    />
                </div>

                {/* Right Side Cards */}
                <div className={styles.right}>
                    {DATA.map((item) => (
                        <div key={item.title} className={styles.card}>
                            <div className={styles.iconWrap}>
                                <item.icon size={26} strokeWidth={1.8} />
                            </div>
                            <h3>{item.title}</h3>
                            <p>{item.description}</p>
                        </div>
                    ))}
                </div>

            </div>
        </section>
    );
}