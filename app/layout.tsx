import type { Metadata, Viewport } from 'next';
import { Manrope } from 'next/font/google';
import { getUser, getTeamForUser } from '@/lib/db/queries';
import { SWRConfig } from 'swr';
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

export default async function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  // We can safely use 'await' here because this is a Server Component
  // This will not block rendering of other parts of the page
  let userData;
  try {
    userData = await getUser();
  } catch (error) {
    console.error('Error getting user data:', error);
    userData = null;
  }

  return (
    <html lang="en">
      <body className={`${manrope.className} min-h-screen antialiased`}>
        <SWRConfig 
          value={{
            fetcher: (url: string) => fetch(url).then(res => res.json()),
            revalidateOnFocus: false
          }}
        >
          {children}
        </SWRConfig>
      </body>
    </html>
  );
}
