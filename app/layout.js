import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import Provider from './provider';
import SmoothScroll from './components/SmoothScroll';
import CustomCursor from './components/CustomCursor';
import { Toaster } from '@/components/ui/sonner';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata = {
  title: 'The Trigger: Enter the Paradox',
  description:
    'An extraordinary intellectual challenge with mind-bending puzzles and thrilling mysteries.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <CustomCursor />
        <SmoothScroll />
        <Provider>{children}</Provider>
        <Toaster position="top-right" richColors />
      </body>
    </html>
  );
}
