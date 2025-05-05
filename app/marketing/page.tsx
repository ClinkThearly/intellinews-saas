'use client';

import { useState } from 'react';
import { ArrowUpRight, Search, BarChart, Shield } from 'lucide-react';
import SentenceForm from './components/SentenceForm';
import NewsletterPreview from './components/NewsletterPreview';
import AnimatedBackground from './components/AnimatedBackground';

// Badge component
const Badge = ({ text }: { text: string }) => {
  return (
    <div className="inline-flex items-center px-3 py-1 rounded-full bg-white/5 border border-white/10">
      <span className="text-gray-300 text-xs">{text}</span>
    </div>
  );
};

// Feature item component
const FeatureItem = ({ 
  icon, 
  title, 
  description 
}: { 
  icon: React.ReactNode; 
  title: string; 
  description: string;
}) => {
  return (
    <div className="backdrop-blur-md bg-white bg-opacity-5 rounded-lg p-6 border border-white border-opacity-5 transition-all hover:bg-opacity-10">
      <div className="inline-block p-3 bg-purple-900 bg-opacity-30 rounded-lg mb-4">
        {icon}
      </div>
      <h3 className="text-white text-lg font-medium mb-2">{title}</h3>
      <p className="text-gray-400 leading-relaxed">{description}</p>
    </div>
  );
};

export default function MarketingHome() {
  const [form, setForm] = useState({
    role: 'VP of Strategy',
    industry: 'FinTech',
  });

  return (
    <>
      <AnimatedBackground />
      <main className="relative z-10">
        {/* Header/Hero section */}
        <header className="py-16 md:py-24 text-center px-6">
          <div className="inline-flex items-center mb-5 px-3 py-1 bg-white/5 border border-white/10 rounded-full">
            <span className="text-purple-400 text-xs mr-2 font-medium">NEW</span>
            <span className="text-gray-300 text-xs">Personalised AI-driven intelligence</span>
          </div>

          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight mb-6 leading-tight">
            <span className="block text-white">Your competitive edge,</span>
            <span className="bg-gradient-to-r from-purple-400 to-indigo-400 bg-clip-text text-transparent">
              delivered weekly
            </span>
          </h1>

          <p className="text-gray-300 text-lg md:text-xl max-w-3xl mx-auto mb-10">
            AI-powered competitive-intelligence briefings tailored to your company and delivered to your inbox.
          </p>

          <div className="flex flex-wrap justify-center gap-3 mb-12">
            <Badge text="Private beta" />
            <Badge text="SOC-2 ready" />
            <Badge text="Made with ❤️" />
          </div>

          <div className="grid lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
            <SentenceForm initialValues={form} onSubmit={setForm} />
            <NewsletterPreview data={form} />
          </div>
        </header>

        {/* Features section */}
        <section id="features" className="py-20 md:py-28 px-6 max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-white mb-16">Intelligence that drives decisions</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <FeatureItem 
              icon={<Search size={24} className="text-purple-400" />} 
              title="Comprehensive coverage" 
              description="500k+ sources scanned every day so you never miss a signal." 
            />
            <FeatureItem 
              icon={<BarChart size={24} className="text-purple-400" />} 
              title="Actionable insights" 
              description="Each story arrives with summary and first-draft commentary." 
            />
            <FeatureItem 
              icon={<Shield size={24} className="text-purple-400" />} 
              title="Privacy first" 
              description="Your prompts never leave our encrypted store." 
            />
          </div>
        </section>

        {/* CTA section */}
        <section className="py-16 md:py-20 px-6">
          <div className="max-w-4xl mx-auto backdrop-blur-md bg-purple-900/20 border border-purple-500/20 rounded-2xl p-8 md:p-12 text-center">
            <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">Ready to try IntelliNews?</h3>
            <p className="text-gray-300 mb-8">Join strategy teams already saving hours every week.</p>
            <button className="bg-gradient-to-r from-purple-600 to-indigo-600 px-6 py-3 rounded-md font-medium hover:from-purple-700 hover:to-indigo-700 transition text-white">
              Start free trial <ArrowUpRight size={16} className="inline ml-1" />
            </button>
          </div>
        </section>

        {/* Footer */}
        <footer className="border-t border-white/10 py-10 text-sm text-gray-400 text-center">
          © {new Date().getFullYear()} IntelliNews Inc.
        </footer>
      </main>
    </>
  );
}
