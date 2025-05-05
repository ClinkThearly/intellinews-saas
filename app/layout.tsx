import type { Metadata, Viewport } from 'next';
import { Manrope } from 'next/font/google';
import './globals.css';

const manrope = Manrope({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'IntelliNews - Your Competitive Edge',
  description: 'AI-powered competitive intelligence briefings tailored to your company and delivered to your inbox.',
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
};

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${manrope.className} min-h-screen antialiased`}>
        {children}
      </body>
    </html>
  );
}
