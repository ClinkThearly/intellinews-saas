import { useState } from 'react';
import { ArrowUpRight, Search, BarChart, Shield } from 'lucide-react';
import AnimatedBackground from './components/AnimatedBackground';
import SentenceForm, { Values } from './components/SentenceForm';
import NewsletterPreview from './components/NewsletterPreview';
import FeatureItem from './components/FeatureItem';
import Badge from './components/Badge';

export default function Marketing() {
  // ---------------- default values -------------
  const [form, setForm] = useState<Values>({
    role: 'VP of Strategy',
    industry: 'Healthcare',
  });

  return (
    <main className="relative min-h-screen font-sans text-white">
      <AnimatedBackground />

      {/* ------------ HERO ------------- */}
      <header className="relative z-10 text-center px-6 pt-24 pb-12">
        <h1 className="text-4xl md:text-6xl font-extrabold leading-tight mb-4">
          Your competitive edge,{' '}
          <span className="bg-gradient-to-r from-purple-400 to-indigo-400 bg-clip-text text-transparent">
            delivered weekly
          </span>
        </h1>
        <p className="text-gray-300 max-w-2xl mx-auto mb-10">
          AI-powered competitive-intelligence briefings tailored to your
          company and delivered to your inbox.
        </p>

        {/* ↓ social proof – truthful only */}
        <div className="flex flex-wrap justify-center gap-2 mb-12">
          <Badge text="Private beta" />
          <Badge text="Made with ❤️ in NYC" />
        </div>

        {/* ---------- two-column form + preview ---------- */}
        <div className="grid lg:grid-cols-2 gap-10 max-w-6xl mx-auto">
          <SentenceForm initialValues={form} onSubmit={setForm} />
          <NewsletterPreview data={form} />
        </div>
      </header>

      {/* ------------ FEATURES ------------- */}
      <section id="features" className="relative z-10 py-24 px-6 max-w-7xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-16">
          Intelligence that drives decisions
        </h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          <FeatureItem
            icon={<Search size={24} className="text-purple-400" />}
            title="Comprehensive coverage"
            description="500 k+ sources scanned daily so you never miss a signal."
          />
          <FeatureItem
            icon={<BarChart size={24} className="text-purple-400" />}
            title="Actionable insights"
            description="Stories arrive with summaries and first-draft commentary."
          />
          <FeatureItem
            icon={<Shield size={24} className="text-purple-400" />}
            title="Privacy first"
            description="Your prompts stay in our encrypted store – never shared."
          />
        </div>
      </section>

      {/* ------------ CTA ------------- */}
      <section className="relative z-10 py-20 px-6">
        <div className="max-w-4xl mx-auto bg-purple-900/20 border border-purple-500/20 backdrop-blur-md rounded-2xl p-12 text-center">
          <h3 className="text-3xl font-bold mb-4">
            Ready to try&nbsp;IntelliNews?
          </h3>
          <p className="text-gray-300 mb-8">
            Join strategy teams already saving hours every week.
          </p>
          <button className="bg-gradient-to-r from-purple-600 to-indigo-600 px-8 py-3 rounded-full font-medium hover:scale-105 transition inline-flex items-center">
            Start free trial <ArrowUpRight size={16} className="ml-1" />
          </button>
        </div>
      </section>
    </main>
  );
}
