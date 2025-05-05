
import AnimatedBackground from './components/AnimatedBackground';
export const metadata = { title: 'IntelliNews – Competitive intelligence, weekly' };

export default function MarketingLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="scroll-smooth antialiased">
      <body className="relative min-h-screen text-white">
        <AnimatedBackground />
        <div className="relative z-10">{children}</div>
      </body>
    </html>
  );
}
