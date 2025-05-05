import '@/app/globals.css';
import AnimatedBackground from './components/AnimatedBackground';

export const metadata = {
  title: 'IntelliNews — Competitive-Intelligence, delivered weekly',
};

export default function MarketingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth antialiased">
      {/* animated dark backdrop */}
      <body className="relative min-h-screen text-white bg-black">
        <AnimatedBackground />
        {/* keep all real content above the background */}
        <main className="relative z-10">{children}</main>
      </body>
    </html>
  );
}
