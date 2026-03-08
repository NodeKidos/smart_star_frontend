import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Privacy Policy',
    description: 'Learn how Smart Star collects, uses, and protects your personal information. Read our comprehensive Privacy Policy.',
    openGraph: {
        title: 'Privacy Policy | Smart Star',
        description: 'Learn how Smart Star collects, uses, and protects your personal information.',
        url: '/privacy-policy',
        type: 'website',
    },
    twitter: {
        card: 'summary',
        title: 'Privacy Policy | Smart Star',
        description: 'Learn how Smart Star collects, uses, and protects your personal information.',
    },
};

export default function PrivacyPolicyLayout({ children }: { children: React.ReactNode }) {
    return <>{children}</>;
}
