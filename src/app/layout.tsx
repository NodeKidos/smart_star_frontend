import type { Metadata } from 'next';
import './globals.css';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export const metadata: Metadata = {
  title: {
    default: 'Smart Star Institute | Nurturing Bright Futures',
    template: '%s | Smart Star Institute',
  },
  description:
    'Smart Star is a premier educational institute in Harrow, London dedicated to nurturing young minds with excellence, creativity, and confidence. Apply now for admissions.',
  keywords: [
    'Smart Star',
    'educational institute',
    'Harrow',
    'London',
    'tutoring',
    'exam preparation',
    'student admissions',
    'academic excellence',
  ],
  openGraph: {
    title: 'Smart Star Institute | Nurturing Bright Futures',
    description:
      'Premier educational institute dedicated to nurturing young minds. Expert tutors, proven results, and personalised learning.',
    type: 'website',
    locale: 'en_GB',
    siteName: 'Smart Star Institute',
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
              name: 'Smart Star Institute',
              description:
                'Premier educational institute dedicated to nurturing young minds with excellence.',
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
