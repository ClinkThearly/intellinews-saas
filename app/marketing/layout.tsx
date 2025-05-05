/* app/marketing/layout.tsx – FULL FILE */
import '../globals.css';
import AnimatedBackground from './components/AnimatedBackground';

export const metadata = {
  title: 'IntelliNews • Competitive-Intelligence, weekly',
};

export default function MarketingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  /*  suppressHydrationWarning prevents the dark-vs-light body-class
      mismatch you were seeing */
  return (
    <html
      suppressHydrationWarning
      lang="en"
      className="scroll-smooth antialiased"
    >
      <body
        suppressHydrationWarning
        className="relative min-h-screen bg-neutral-950 text-white"
      >
        <AnimatedBackground />
        <div className="relative z-10">{children}</div>
      </body>
    </html>
  );
}
