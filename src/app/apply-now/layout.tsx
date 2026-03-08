import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Register Now',
    description: 'Register for the Smart Star Competition. Fill out the application form for your child to participate in our premier Maths and English exams.',
    openGraph: {
        title: 'Register Now | Smart Star',
        description: 'Challenge your child with Smart Star. Register now for our upcoming Maths and English competitions.',
        url: '/apply-now',
        type: 'website',
        images: ['/logo.png'],
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Register Now | Smart Star',
        description: 'Challenge your child with Smart Star. Register now for our upcoming Maths and English competitions.',
        images: ['/logo.png'],
    },
};

export default function ApplyNowLayout({ children }: { children: React.ReactNode }) {
    return <>{children}</>;
}
