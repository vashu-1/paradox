import HeroSection from './_components/HeroSection';
import Navbar from './_components/Navbar';
import About from './_components/About';
import EventFlow from './_components/EventFlow';
import Footer from './_components/Footer';

export const metadata = {
  title: 'ChiperX: The Hunt Beyond Logic',
  description: 'A Next.js app directory template with Tailwind CSS.',
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
