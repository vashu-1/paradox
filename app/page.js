import HeroSection from './_components/HeroSection';
import Navbar from './_components/Navbar';
import About from './_components/About';
import EventFlow from './_components/EventFlow';
import Footer from './_components/Footer';

export const metadata = {
  title:
    'CipherX: The Hunt Beyond Logic - Online Treasure Hunt | Model Club BIT Sindri',
  description:
    'Experience CipherX - an extraordinary online treasure hunt where you solve clues, crack codes, and follow hidden trails across 3 challenging rounds. Organized by Model Club, BIT Sindri. December 28, 2025 at 6:00 PM IST.',
  keywords: [
    'CipherX',
    'online treasure hunt',
    'Model Club BIT Sindri',
    'cryptography challenge',
    'logic puzzles',
    'brain teasers',
    'coding competition',
    'BIT Sindri events',
    'college fest',
    'cipher challenges',
    'riddles and puzzles',
    'problem solving contest',
  ],
  openGraph: {
    title: 'CipherX: The Hunt Beyond Logic',
    description:
      'Join an extraordinary online treasure hunt! 3 rounds of mind-bending puzzles, codes, and challenges. Solo competition. December 28, 2025.',
    url: 'https://sandhaan-modelclub.in',
    siteName: 'CipherX - Model Club BIT Sindri',
    type: 'website',
    locale: 'en_IN',
    images: [
      {
        url: 'https://d33609liqwio9r.cloudfront.net/2025-12-27T10:06:36.086Z-WhatsApp_Image_2025-08-30_at_22.53.24_e64e50f8-removebg-preview.png',
        width: 1200,
        height: 630,
        alt: 'CipherX: The Hunt Beyond Logic - Model Club BIT Sindri',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'CipherX: The Hunt Beyond Logic',
    description:
      'Solve clues, crack codes, follow hidden trails. 3 rounds of challenges await. Model Club BIT Sindri - Dec 28, 2025.',
    images: [
      'https://d33609liqwio9r.cloudfront.net/2025-12-27T10:06:36.086Z-WhatsApp_Image_2025-08-30_at_22.53.24_e64e50f8-removebg-preview.png',
    ],
    creator: '@modelclubbit',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function Home() {
  return (
    <main className="min-h-screen">
      <Navbar />
      <HeroSection />
      <About />
      <EventFlow />
      <Footer />
    </main>
  );
}
