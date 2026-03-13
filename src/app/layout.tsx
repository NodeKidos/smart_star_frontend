import type { Metadata } from 'next';
import './globals.css';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export const metadata: Metadata = {
  metadataBase: new URL('https://smartstar.uk'),
  title: {
    default: 'Smart Star Competitions',
    template: '%s | Smart Star',
  },
  description:
    'Smart Star is a premier Maths and English competition in Harrow, London dedicated to challenging young minds. Register now for our upcoming exams.',
  keywords: [
    'Smart Star',
    'Maths Olympiad',
    'English Competition',
    '11+ Exams',
    'School competitions UK',
    'Smart Star competition',
    'Harrow',
    'London',
    'student competitions',
    'academic excellence',
  ],
  openGraph: {
    title: 'Smart Star | Nurturing Bright Futures',
    description:
      'Premier Maths and English competition dedicated to challenging young minds. Join the Olympiad.',
    url: '/',
    type: 'website',
    locale: 'en_GB',
    siteName: 'Smart Star',
    images: [
      {
        url: '/logo.png',
        width: 800,
        height: 600,
        alt: 'Smart Star Institute Mascot',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Smart Star | Maths and English Competitions',
    description: 'Premier Maths and English competition dedicated to challenging young minds.',
    images: ['/logo.png'],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.ico" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'EducationalOrganization',
              name: 'Smart Star',
              description:
                'Premier Maths and English competition dedicated to challenging young minds.',
              address: {
                '@type': 'PostalAddress',
                addressLocality: 'Harrow',
                addressRegion: 'London',
                addressCountry: 'GB',
              },
            }),
          }}
        />
      </head>
      <body>
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
