import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'About Us',
    description: 'Learn about the Smart Star Competition. Discover our passion for challenging young minds in Maths and English, our mission, vision, and core values.',
    openGraph: {
        title: 'About Us | Smart Star',
        description: 'Discover our passion for challenging young minds in Maths and English. Learn about our mission and vision.',
        url: '/about-us',
        type: 'website',
        images: ['/logo.png'],
    },
    twitter: {
        card: 'summary_large_image',
        title: 'About Us | Smart Star',
        description: 'Discover our passion for challenging young minds in Maths and English.',
        images: ['/logo.png'],
    },
};

export default function AboutUsLayout({ children }: { children: React.ReactNode }) {
    return <>{children}</>;
}
