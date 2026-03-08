import { BarChart3, TrendingUp, Trophy, ClipboardList } from 'lucide-react';
import styles from './page.module.css';

export const metadata = {
    title: 'Exam Results',
    description: 'View the latest exam results from Smart Star. Track student performance and achievements.',
    openGraph: {
        title: 'Exam Results | Smart Star',
        description: 'View the latest exam results and track student performance and achievements.',
        url: '/exam-results',
        type: 'website',
        images: ['/logo.png'],
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Exam Results | Smart Star',
        description: 'View the latest exam results and track student performance and achievements.',
        images: ['/logo.png'],
    },
};

export default function ExamResultsPage() {
    const CHIPS = [
        { icon: ClipboardList, label: 'Individual Results' },
        { icon: TrendingUp, label: 'Performance Tracking' },
        { icon: Trophy, label: 'Achievements' },
    ];

    return (
        <div className={styles.placeholderPage}>
            <div className={styles.pageHeader}>
                <div className={styles.headerContent}>
                    <h1>Exam Results</h1>
                    <p>Track student performance and achievements</p>
                </div>
            </div>
            <div className={styles.container}>
                <div className={styles.comingSoon}>
                    <div className={styles.comingSoonIconWrap}>
                        <BarChart3 size={48} strokeWidth={1.3} />
                    </div>
                    <h2>Exam Results Coming Soon</h2>
                    <p>
                        We are working on bringing you a comprehensive exam results portal.
                        Check back soon to view student results and performance analytics.
                    </p>
                    <div className={styles.features}>
                        {CHIPS.map((chip) => (
                            <div key={chip.label} className={styles.featureChip}>
                                <chip.icon size={16} strokeWidth={2} />
                                {chip.label}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
