'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { Megaphone, Menu, X } from 'lucide-react';
import { fetchAnnouncements, Announcement } from '@/lib/api';
import styles from './Header.module.css';

const NAV_ITEMS = [
    { label: 'Home', href: '/' },
    { label: 'About Us', href: '/about-us' },
    { label: 'Exam Results', href: '/exam-results' },
    { label: 'Exam Center', href: '/exam-center' },
    { label: 'Gallery', href: '/gallery' },
    { label: 'Contact Us', href: '/contact-us' },
];

export default function Header({ isAdmin = false }: { isAdmin?: boolean }) {
    const pathname = usePathname();
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [announcements, setAnnouncements] = useState<Announcement[]>([]);
    const [isScrolled, setIsScrolled] = useState(false);

    useEffect(() => {
        async function load() {
            const data = await fetchAnnouncements();
            setAnnouncements(data);
        }
        load();
    }, []);

    useEffect(() => {
        const handleScroll = () => setIsScrolled(window.scrollY > 10);
        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
    const closeMenu = () => setIsMenuOpen(false);

    // Auto-hide main header on admin paths if not explicitly in isAdmin mode
    if (pathname?.startsWith('/admin') && !isAdmin) {
        return null;
    }

    return (
        <div className={styles.headerWrapper}>
            {/* Announcement Ticker */}
            {announcements.length > 0 && (
                <div className={styles.ticker} role="marquee" aria-live="polite" aria-label="Announcements">
                    <div className={styles.tickerTrack}>
                        {[...announcements, ...announcements].map((a, i) => (
                            <span key={`${a.id}-${i}`} className={styles.tickerItem}>
                                <Megaphone size={14} className={styles.tickerIcon} />
                                {a.message}
                            </span>
                        ))}
                    </div>
                </div>
            )}

            {/* Main Header (Only if not Admin) */}
            {!isAdmin && (
                <>
                    <header className={`${styles.header} ${isScrolled ? styles.headerScrolled : ''}`}>
                        <div className={styles.headerInner}>
                            <Link href="/" className={styles.logoLink} onClick={closeMenu}>
                                <Image
                                    src="/logo.png"
                                    alt="Smart Star Logo"
                                    width={50}
                                    height={50}
                                    className={styles.logoImage}
                                    priority
                                />
                                <div className={styles.logoText}>
                                    <span className={styles.logoTitle}>Smart Star</span>
                                    <span className={styles.logoSubtitle}>Competition</span>
                                </div>
                            </Link>

                            {/* Desktop Navigation */}
                            <nav aria-label="Main navigation">
                                <ul className={styles.nav}>
                                    {NAV_ITEMS.map((item) => (
                                        <li key={item.href}>
                                            <Link
                                                href={item.href}
                                                className={`${styles.navLink} ${pathname === item.href ? styles.navLinkActive : ''
                                                    }`}
                                            >
                                                {item.label}
                                            </Link>
                                        </li>
                                    ))}
                                    <li>
                                        <Link href="/apply-now" className={`${styles.navLink} ${styles.navLinkCta}`}>
                                            Apply Now
                                        </Link>
                                    </li>
                                </ul>
                            </nav>

                            {/* Mobile Menu Toggle */}
                            <button
                                className={styles.menuToggle}
                                onClick={toggleMenu}
                                aria-label="Toggle navigation menu"
                                aria-expanded={isMenuOpen}
                            >
                                {isMenuOpen ? <X size={24} color="#fff" /> : <Menu size={24} color="#fff" />}
                            </button>
                        </div>
                    </header>

                    {/* Mobile Navigation */}
                    <div className={`${styles.mobileNavOverlay} ${isMenuOpen ? styles.mobileNavOpen : ''}`}>
                        <ul className={styles.mobileNav}>
                            {NAV_ITEMS.map((item, i) => (
                                <li key={item.href} style={{ animationDelay: `${i * 60}ms` }} className={styles.mobileNavItem}>
                                    <Link
                                        href={item.href}
                                        className={styles.mobileNavLink}
                                        onClick={closeMenu}
                                    >
                                        {item.label}
                                    </Link>
                                </li>
                            ))}
                            <li className={styles.mobileNavItem} style={{ animationDelay: `${NAV_ITEMS.length * 60}ms` }}>
                                <Link
                                    href="/apply-now"
                                    className={`${styles.mobileNavLink} ${styles.mobileNavCta}`}
                                    onClick={closeMenu}
                                >
                                    Apply Now
                                </Link>
                            </li>
                        </ul>
                    </div>
                </>
            )}
        </div>
    );
}
