import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Contact Us',
    description: 'Get in touch with Smart Star. We are located in Harrow, London. Contact us for registration, or exam schedules.',
    openGraph: {
        title: 'Contact Us | Smart Star',
        description: 'Have questions about registration or exam schedules? Our team is here to help. Get in touch today.',
        url: '/contact-us',
        type: 'website',
        images: ['/logo.png'],
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Contact Us | Smart Star',
        description: 'Have questions about registration or exam schedules? Our team is here to help. Get in touch today.',
        images: ['/logo.png'],
    },
};

export default function ContactUsLayout({ children }: { children: React.ReactNode }) {
    return <>{children}</>;
}
