import { Shield } from 'lucide-react';
import styles from './page.module.css';

export default function PrivacyPolicyPage() {
    return (
        <div className={styles.privacyPage}>
            <div className={styles.pageHeader}>
                <div className={styles.headerContent}>
                    <h1>Privacy Policy</h1>
                    <p>Last updated: {new Date().toLocaleDateString('en-GB')}</p>
                </div>
            </div>

            <div className={styles.container}>
                <div className={styles.contentCard}>
                    <div className={styles.iconWrap}>
                        <Shield size={40} className={styles.icon} strokeWidth={1.5} />
                    </div>

                    <div className={styles.prose}>
                        <p>
                            At <strong>Smart Star</strong>, we take your privacy seriously. This Privacy Policy outlines
                            how we collect, use, and protect the personal information of our participants, parents, and website visitors.
                        </p>

                        <h2>1. Information We Collect</h2>
                        <p>We may collect the following types of information when you interact with our website or register for a competition:</p>
                        <ul>
                            <li><strong>Personal Identification Information:</strong> Parent/Guardian name, email address, phone number, and physical address.</li>
                            <li><strong>Student Information:</strong> Name, date of birth, gender, and school year for registration and examination purposes.</li>
                            <li><strong>Technical Data:</strong> IP addresses, browser types, operating systems, and website usage statistics via cookies.</li>
                        </ul>

                        <h2>2. How We Use Your Information</h2>
                        <p>The information we collect is used in the following ways:</p>
                        <ul>
                            <li>To process competition registrations and manage exam logistics.</li>
                            <li>To communicate important updates regarding exam schedules, venues, and results.</li>
                            <li>To respond to your inquiries and provide customer support.</li>
                            <li>To improve our website functionality and user experience.</li>
                            <li>To comply with legal obligations and protect against fraudulent activity.</li>
                        </ul>

                        <h2>3. Data Protection and Security</h2>
                        <p>
                            We implement a variety of security measures to maintain the safety of your personal
                            information. Your data is stored on secure networks and is only accessible by a limited
                            number of personnel who have special access rights to such systems and are required to
                            keep the information confidential. We do not sell, trade, or otherwise transfer your
                            personally identifiable information to outside parties without your consent.
                        </p>

                        <h2>4. Cookies</h2>
                        <p>
                            Our website uses "cookies" to enhance your experience. Cookies are small files that a site
                            or its service provider transfers to your computer's hard drive through your Web browser
                            (if you allow) that enables the site's or service provider's systems to recognize your
                            browser and capture and remember certain information. You can choose to disable cookies
                            through your browser settings.
                        </p>

                        <h2>5. Third-Party Services</h2>
                        <p>
                            We may occasionally use third-party service providers to help us operate our business and the
                            website or administer activities on our behalf, such as sending out newsletters or processing
                            payments. We may share your information with these third parties for those limited purposes
                            provided that you have given us your permission.
                        </p>

                        <h2>6. Your Rights</h2>
                        <p>
                            Under applicable data protection laws, you have the right to access, rectify, or erase your
                            personal data. You may also have the right to restrict or object to certain processing of
                            your data. If you wish to exercise any of these rights, please contact us using the details
                            provided below.
                        </p>

                        <h2>7. Changes to this Privacy Policy</h2>
                        <p>
                            We reserve the right to update or modify this Privacy Policy at any time. Any changes will be
                            posted on this page with an updated revision date. We encourage you to review this policy
                            periodically.
                        </p>

                        <h2>8. Contact Us</h2>
                        <p>
                            If you have any questions regarding this Privacy Policy or our data practices, please contact us:
                        </p>
                        <p>
                            <strong>Email:</strong> info@smartstar.uk<br />
                            <strong>Phone:</strong> +44 7438 640391<br />
                            <strong>Address:</strong> The Compasses, 26-28 London Street, Chertsey, KT16 8AA, UK
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
