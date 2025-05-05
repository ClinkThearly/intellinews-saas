/* ---------- app/marketing/layout.tsx (replace whole file) ---------- */
import '@/app/globals.css';          // Tailwind base & fonts
import AnimatedBackground from './components/AnimatedBackground';

export const metadata = {
  title: 'IntelliNews • Competitive-intelligence briefings',
};

export default function MarketingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth antialiased">
      {/* Full-page dark base colour so translucent blacks show correctly */}
      <body className="relative min-h-screen bg-black text-white">
        {/* Gradient / grid / blurred lights – covers the whole viewport */}
        <AnimatedBackground />

        {/* Actual page content */}
        <main className="relative z-10">{children}</main>
      </body>
    </html>
  );
}
/* ------------------------------------------------------------------- */
