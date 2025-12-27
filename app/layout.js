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
  title: 'CipherX: The Hunt Beyond Logic',
  description:
    'An extraordinary intellectual challenge with mind-bending puzzles and thrilling mysteries.',
  keywords: [
    'sandhaan',
    'model club',
    'cipherx',
    'BIT Sindri',
    'model club event',
    'Trigger',
    'puzzle hunt',
    'TOY 2026',
  ],
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
