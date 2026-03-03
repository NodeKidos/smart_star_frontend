'use client';

import { useState, FormEvent } from 'react';
import { MapPin, Mail, Phone, Clock, Send, CheckCircle } from 'lucide-react';
import styles from './page.module.css';

export default function ContactUsPage() {
    const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });
    const [isSent, setIsSent] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        setIsSent(true);
    };

    const INFO_CARDS = [
        { icon: MapPin, title: 'Visit Us', text: 'Harrow, London\nUnited Kingdom' },
        { icon: Mail, title: 'Email Us', text: 'info@smartstar.co.uk', href: 'mailto:info@smartstar.co.uk' },
        { icon: Phone, title: 'Call Us', text: '+44 XXX XXXX XXX', href: 'tel:+44XXXXXXXXXX' },
        { icon: Clock, title: 'Opening Hours', text: 'Mon - Sat: 9:00 AM - 6:00 PM' },
    ];

    return (
        <div className={styles.contactPage}>
            <div className={styles.pageHeader}>
                <div className={styles.headerContent}>
                    <h1>Contact Us</h1>
                    <p>We&apos;d love to hear from you. Get in touch with Smart Star today.</p>
                </div>
            </div>

            <div className={styles.container}>
                <div className={styles.contactGrid}>
                    {/* Contact Info */}
                    <div className={styles.contactInfo}>
                        <h2>Get In Touch</h2>
                        <p className={styles.infoDesc}>
                            Have questions about admissions, courses, or exam schedules?
                            Our team is here to help.
                        </p>

                        <div className={styles.infoCards}>
                            {INFO_CARDS.map((card) => (
                                <div key={card.title} className={styles.infoCard}>
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
                    </div>

                    {/* Contact Form */}
                    <div className={styles.contactForm}>
                        {isSent ? (
                            <div className={styles.successMsg}>
                                <CheckCircle size={48} strokeWidth={1.5} className={styles.successIcon} />
                                <h3>Message Sent!</h3>
                                <p>Thank you for reaching out. We&apos;ll get back to you shortly.</p>
                                <button
                                    className="btn btn-primary"
                                    onClick={() => {
                                        setIsSent(false);
                                        setFormData({ name: '', email: '', subject: '', message: '' });
                                    }}
                                >
                                    Send Another
                                </button>
                            </div>
                        ) : (
                            <form onSubmit={handleSubmit}>
                                <h3>Send Us a Message</h3>
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
                                <button type="submit" className={styles.submitBtn}>
                                    <Send size={18} />
                                    Send Message
                                </button>
                            </form>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
