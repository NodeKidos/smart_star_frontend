import { Camera, PartyPopper, BookOpen, Medal } from 'lucide-react';
import styles from '../exam-results/page.module.css';

export const metadata = {
    title: 'Gallery',
    description: 'Browse photos and videos from Smart Star Institute events, classes, and celebrations.',
};

export default function GalleryPage() {
    const CHIPS = [
        { icon: PartyPopper, label: 'Events' },
        { icon: BookOpen, label: 'Classes' },
        { icon: Medal, label: 'Award Ceremonies' },
    ];

    return (
        <div className={styles.placeholderPage}>
            <div className={styles.pageHeader}>
                <div className={styles.headerContent}>
                    <h1>Gallery</h1>
                    <p>Moments captured from our classes, events, and celebrations</p>
                </div>
            </div>
            <div className={styles.container}>
                <div className={styles.comingSoon}>
                    <div className={styles.comingSoonIconWrap}>
                        <Camera size={48} strokeWidth={1.3} />
                    </div>
                    <h2>Gallery Coming Soon</h2>
                    <p>
                        We are curating the best photos and videos from Smart Star events
                        and activities. Check back soon to browse our gallery.
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
