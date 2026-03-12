'use client';

import { useState, FormEvent } from 'react';
import { MapPin, Mail, Phone, Clock, Send, CheckCircle, AlertCircle } from 'lucide-react';
import { FacebookIcon, InstagramIcon } from '@/components/BrandIcons';
import { useScrollAnimation, useStaggeredAnimation } from '@/lib/useScrollAnimation';
import { sendContactMessage } from '@/lib/api';
import styles from './page.module.css';

export default function ContactUsPage() {
    const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });
    const [isSent, setIsSent] = useState(false);
    const [isSending, setIsSending] = useState(false);
    const [error, setError] = useState('');

    const [headerRef, headerVisible] = useScrollAnimation<HTMLDivElement>({ threshold: 0.2 });
    const [infoRef, infoVisible] = useScrollAnimation<HTMLDivElement>({ threshold: 0.15 });
    const [formRef, formVisible] = useScrollAnimation<HTMLDivElement>({ threshold: 0.1 });

    const INFO_CARDS = [
        { icon: MapPin, title: 'Visit Us', text: '26-28 London St, Chertsey KT16 8AA, UK' },
        { icon: Mail, title: 'Email Us', text: 'info@smartstar.uk', href: 'mailto:info@smartstar.uk' },
        { icon: Phone, title: 'Call Us', text: '+44 7438 640391', href: 'tel:+447438 640391' },
        { icon: Clock, title: 'Opening Hours', text: 'Mon - Sat: 9:00 AM - 6:00 PM' },
    ];

    const cardStagger = useStaggeredAnimation(INFO_CARDS.length, infoVisible, 120);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        setIsSending(true);
        setError('');
        try {
            await sendContactMessage(formData);
            setIsSent(true);
            setFormData({ name: '', email: '', subject: '', message: '' });
        } catch (err) {
            setError('Failed to send message. Please try again later.');
        } finally {
            setIsSending(false);
        }
    };

    return (
        <div className={styles.contactPage}>
            <div
                className={`${styles.pageHeader} ${headerVisible ? styles.headerVisible : ''}`}
                ref={headerRef}
            >
                <div className={styles.headerContent}>
                    <h1>Contact Us</h1>
                    <p>We&apos;d love to hear from you. Get in touch with Smart Star today.</p>
                </div>
            </div>

            <div className={styles.container}>
                <div className={styles.contactGrid}>
                    {/* Contact Info */}
                    <div
                        className={`${styles.contactInfo} ${infoVisible ? styles.infoVisible : ''}`}
                        ref={infoRef}
                    >
                        <h2>Get In Touch</h2>
                        <p className={styles.infoDesc}>
                            Have questions about admissions, courses, or exam schedules?
                            Our team is here to help.
                        </p>

                        <div className={styles.infoCards}>
                            {INFO_CARDS.map((card, i) => (
                                <div
                                    key={card.title}
                                    className={`${styles.infoCard} ${cardStagger[i] ? styles.cardRevealed : ''}`}
                                >
                                    <div className={styles.infoIconWrap}>
                                        <card.icon size={20} strokeWidth={1.8} />
                                    </div>
                                    <div>
                                        <h4>{card.title}</h4>
                                        {card.href ? (
                                            <p><a href={card.href}>{card.text}</a></p>
                                        ) : (
                                            <p>{card.text.split('\n').map((t, i) => (
                                                <span key={i}>{t}{i === 0 && <br />}</span>
                                            ))}</p>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className={styles.socialFollow}>
                            <h3>Follow Us</h3>
                            <div className={styles.socialIcons}>
                                <a href="https://www.facebook.com/smartstarcompetition" target="_blank" rel="noopener noreferrer" className={styles.socialIcon} aria-label="Facebook">
                                    <FacebookIcon size={24} />
                                </a>
                                <a href="https://www.instagram.com/smartstarcompetition/" target="_blank" rel="noopener noreferrer" className={styles.socialIcon} aria-label="Instagram">
                                    <InstagramIcon size={24} />
                                </a>
                            </div>
                        </div>
                    </div>

                    {/* Contact Form */}
                    <div
                        className={`${styles.contactForm} ${formVisible ? styles.formVisible : ''}`}
                        ref={formRef}
                    >
                        {isSent ? (
                            <div className={styles.successMsg}>
                                <CheckCircle size={48} strokeWidth={1.5} className={styles.successIcon} />
                                <h3>Message Sent!</h3>
                                <p>Thank you for reaching out. We&apos;ll get back to you shortly.</p>
                                <button
                                    className="btn btn-primary"
                                    onClick={() => {
                                        setIsSent(false);
                                    }}
                                >
                                    Send Another
                                </button>
                            </div>
                        ) : (
                            <form onSubmit={handleSubmit}>
                                <h3>Send Us a Message</h3>
                                {error && (
                                    <div className={styles.errorMsg}>
                                        <AlertCircle size={18} />
                                        {error}
                                    </div>
                                )}
                                <div className={styles.formGroup}>
                                    <label htmlFor="contact-name">Your Name</label>
                                    <input type="text" id="contact-name" name="name" placeholder="Full name" value={formData.name} onChange={handleChange} required />
                                </div>
                                <div className={styles.formGroup}>
                                    <label htmlFor="contact-email">Email Address</label>
                                    <input type="email" id="contact-email" name="email" placeholder="you@example.com" value={formData.email} onChange={handleChange} required />
                                </div>
                                <div className={styles.formGroup}>
                                    <label htmlFor="contact-subject">Subject</label>
                                    <input type="text" id="contact-subject" name="subject" placeholder="What is this regarding?" value={formData.subject} onChange={handleChange} required />
                                </div>
                                <div className={styles.formGroup}>
                                    <label htmlFor="contact-message">Message</label>
                                    <textarea id="contact-message" name="message" rows={5} placeholder="Type your message here..." value={formData.message} onChange={handleChange} required />
                                </div>
                                <button type="submit" className={styles.submitBtn} disabled={isSending}>
                                    <Send size={18} />
                                    {isSending ? 'Sending...' : 'Send Message'}
                                </button>
                            </form>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
