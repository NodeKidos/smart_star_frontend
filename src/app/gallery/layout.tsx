import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Gallery',
    description: 'Explore the vibrant life at Smart Star. View our gallery showcasing competition events, student achievements, and awards.',
    openGraph: {
        title: 'Gallery | Smart Star',
        description: 'Capturing moments of growth, celebration, and achievement at Smart Star competitions.',
        url: '/gallery',
        type: 'website',
        images: ['/logo.png'],
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Gallery | Smart Star',
        description: 'Capturing moments of growth, celebration, and achievement at Smart Star competitions.',
        images: ['/logo.png'],
    },
};

export default function GalleryLayout({ children }: { children: React.ReactNode }) {
    return <>{children}</>;
}
