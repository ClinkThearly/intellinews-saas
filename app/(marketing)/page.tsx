// app/(marketing)/page.tsx  – SERVER component (no "use client")
import { useState } from 'react';             // types only, not executed server-side
import SentenceForm        from './components/SentenceForm';
import NewsletterPreview   from './components/NewsletterPreview';
import Badge               from './components/Badge';
import FeatureItem         from './components/FeatureItem';
import { ArrowUpRight, BarChart, Shield, Search } from 'lucide-react';

export default function MarketingHome() {
  /* ---- form state lives only while the visitor is on the page ---- */
  const [form, setForm] = useState({
    role:     'Competitive Intelligence Lead',
    industry: 'FinTech'
  });

  return (
    <main className="min-h-screen flex flex-col">
      {/* ---------- HERO ---------- */}
      <header className="flex-1 flex flex-col items-center justify-center">
        {/* copy of the hero section you pasted earlier, shortened for brevity */}
        {/* ... BADGES ... SENTENCE-FORM & PREVIEW IN GRID ... */}
      </header>

      {/* ---------- FEATURES ---------- */}
      <section id="features" className="py-24 px-6 max-w-7xl mx-auto">
        <h2 className="text-4xl font-bold text-center mb-16">
          Intelligence that drives decisions
        </h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          <FeatureItem
            icon={<Search   size={24} className="text-purple-400" />}
            title="Comprehensive coverage"
            description="500 000+ sources scanned every day so you never miss a signal."
          />
          <FeatureItem
            icon={<BarChart size={24} className="text-purple-400" />}
            title="Actionable insights"
            description="Every story arrives with a summary and first-draft commentary."
          />
          <FeatureItem
            icon={<Shield   size={24} className="text-purple-400" />}
            title="Privacy first"
            description="Your prompts never leave our encrypted store."
          />
        </div>
      </section>

      {/* ---------- CTA ---------- */}
      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto bg-purple-900/20 border border-purple-500/20 backdrop-blur-md rounded-2xl p-12 text-center">
          <h3 className="text-3xl font-bold mb-4">Ready to try IntelliNews?</h3>
          <p className="text-gray-300 mb-8">
            Join strategy teams already saving hours every week.
          </p>
          <button className="bg-gradient-to-r from-purple-600 to-indigo-600 px-8 py-3 rounded-full font-medium hover:scale-105 transition">
            Start free trial <ArrowUpRight size={16} className="inline ml-1" />
          </button>
        </div>
      </section>

      <footer className="border-t border-white/10 py-10 text-sm text-gray-400 text-center">
        © {new Date().getFullYear()} IntelliNews Inc.
      </footer>
    </main>
  );
}
