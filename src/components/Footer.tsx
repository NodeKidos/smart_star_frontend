'use client';

import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { MapPin, Mail, Phone, Clock } from 'lucide-react';
import { FacebookIcon, InstagramIcon, TikTokIcon } from './BrandIcons';
import styles from './Footer.module.css';

export default function Footer() {
    const pathname = usePathname();

    if (pathname?.startsWith('/admin')) {
        return null;
    }
    const currentYear = new Date().getFullYear();

    return (
        <footer className={styles.footer}>
            <div className={styles.footerInner}>
                <div className={styles.footerGrid}>
                    {/* Brand */}
                    <div className={styles.footerBrand}>
                        <div className={styles.footerLogo}>
                            <Image
                                src="/logo.png"
                                alt="Smart Star"
                                width={42}
                                height={42}
                                className={styles.footerLogoImg}
                            />
                            <span className={styles.footerLogoText}>Smart Star</span>
                        </div>
                        <p>
                            Empowering young minds with challenging competitions, expert assessment,
                            and a motivating environment. Every child is a star
                            waiting to shine.
                        </p>
                        <div className={styles.socialLinks}>
                            <a href="https://www.facebook.com/smartstarcompetition" target="_blank" rel="noopener noreferrer" className={styles.socialLink} aria-label="Facebook">
                                <FacebookIcon size={20} />
                            </a>
                            <a href="https://www.instagram.com/smartstarcompetition/" target="_blank" rel="noopener noreferrer" className={styles.socialLink} aria-label="Instagram">
                                <InstagramIcon size={20} />
                            </a>
                            <a href="https://www.tiktok.com/@smartstarcompetition" target="_blank" rel="noopener noreferrer" className={styles.socialLink} aria-label="TikTok">
                                <TikTokIcon size={20} />
                            </a>
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div className={styles.footerSection}>
                        <h4>Quick Links</h4>
                        <ul className={styles.footerLinks}>
                            <li><Link href="/">Home</Link></li>
                            <li><Link href="/about-us">About Us</Link></li>
                            <li><Link href="/apply-now">Apply Now</Link></li>
                            <li><Link href="/exam-results">Exam Results</Link></li>
                            <li><Link href="/gallery">Gallery</Link></li>
                        </ul>
                    </div>

                    {/* Support */}
                    <div className={styles.footerSection}>
                        <h4>Support</h4>
                        <ul className={styles.footerLinks}>
                            <li><Link href="/contact-us">Contact Us</Link></li>
                            <li><Link href="/apply-now">Register</Link></li>
                            <li><Link href="/">FAQ</Link></li>
                            <li><Link href="/privacy-policy">Privacy Policy</Link></li>
                        </ul>
                    </div>

                    {/* Contact Info */}
                    <div className={styles.footerSection}>
                        <h4>Contact Us</h4>
                        <div className={styles.contactItem}>
                            <MapPin size={16} className={styles.contactIcon} />
                            <span className={styles.contactText}>
                                The Compasses<br />
                                26-28 London Street<br />
                                Chertsey<br />
                                KT16 8AA<br />
                            </span>
                        </div>
                        <div className={styles.contactItem}>
                            <Mail size={16} className={styles.contactIcon} />
                            <span className={styles.contactText}>
                                <a href="mailto:info@smartstar.uk">info@smartstar.uk</a>
                            </span>
                        </div>
                        <div className={styles.contactItem}>
                            <Phone size={16} className={styles.contactIcon} />
                            <span className={styles.contactText}>
                                <a href="tel:+447438640391">+44 7438 640391</a>
                            </span>
                        </div>
                        <div className={styles.contactItem}>
                            <Clock size={16} className={styles.contactIcon} />
                            <span className={styles.contactText}>
                                Mon - Sat: 9:00 AM - 6:00 PM
                            </span>
                        </div>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className={styles.footerBottom}>
                    <div className={styles.footerCopyright}>
                        © {currentYear} <span>Smart Star</span>. All rights reserved.
                        Nurturing bright futures, one student at a time.
                    </div>
                    <div className={styles.poweredBy}>
                        Powered by <a href="https://nodekidos.com/" target="_blank" rel="noopener noreferrer">NodeKidos</a>
                    </div>
                </div>
            </div>
        </footer>
    );
}
