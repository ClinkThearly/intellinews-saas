'use client';

import React, { useState } from 'react';
import {
  ArrowUpRight,
  Search,
  BarChart,
  Shield,
  CalendarCheck,
  Cpu,
} from 'lucide-react';

import SentenceForm       from './components/SentenceForm';
import NewsletterPreview  from './components/NewsletterPreview';
import FeatureItem        from './components/FeatureItem';
import Badge              from './components/Badge';

/* ---------- 1 · Types ---------- */
type Values = {
  industry:           string;
  role:               string;
  company:            string;
  competitors:        string;
  frequency:          string;
  trends:             string;
  trackCompetitors:   boolean;
  trackMarket:        boolean;
  trackRegulations:   boolean;
};

/* ---------- 2 · Page ---------- */
export default function MarketingPage() {
  /* safe initial values to avoid “undefined role” error */
  const [form, setForm] = useState<Values>({
    industry:           'Financial Services',
    role:               'VP of Strategy',
    company:            '',
    competitors:        'Top 3 Competitors',
    frequency:          'Weekly',
    trends:             'AI/ML Adoption',
    trackCompetitors:   true,
    trackMarket:        true,
    trackRegulations:   false,
  });

  return (
    <main className="relative mx-auto max-w-7xl px-6 lg:px-8 text-white">
      {/* ---------- HERO ---------- */}
      <header className="py-24 md:py-32 text-center">
        <h1 className="text-4xl md:text-6xl font-extrabold leading-tight mb-6">
          <span>Your competitive edge,</span>{' '}
          <span className="block bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-indigo-400">
            delivered weekly
          </span>
        </h1>

        <p className="text-lg md:text-xl text-gray-300 mb-10 max-w-2xl mx-auto">
          AI-powered competitive-intelligence briefings tailored to your company and
          delivered straight to your inbox.
        </p>

        {/* Social proof */}
        <div className="flex justify-center flex-wrap gap-3 mb-16">
          <Badge image={<span className="text-xs">⚡️</span>} text="Fast, AI-generated" />
          <Badge image={<span className="text-xs">🔒</span>} text="SOC-2 Ready" />
          <Badge image={<span className="text-xs">❤️</span>} text="Private beta" />
        </div>

        {/* Form + Preview */}
        <div className="grid lg:grid-cols-2 gap-10 items-start">
          <SentenceForm initialValues={form} onSubmit={setForm} />
          <NewsletterPreview data={form} />
        </div>
      </header>

      {/* ---------- WHY INTELLINEWS ---------- */}
      <section id="why" className="py-24">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-16">
          Why strategy teams choose IntelliNews
        </h2>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          <FeatureItem
            icon={<Search size={24} className="text-purple-400" />}
            title="Comprehensive coverage"
            description="500 000+ sources scanned every day so you never miss a signal."
          />
          <FeatureItem
            icon={<BarChart size={24} className="text-purple-400" />}
            title="Actionable insights"
            description="Each story ships with an executive summary and draft commentary."
          />
          <FeatureItem
            icon={<Shield size={24} className="text-purple-400" />}
            title="Privacy first"
            description="Your prompts are encrypted at rest and never shared with LLM vendors."
          />
        </div>
      </section>

      {/* ---------- HOW IT WORKS ---------- */}
      <section id="how" className="py-24 border-t border-white/10">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-16">
          How it works
        </h2>

        <ol className="grid md:grid-cols-3 gap-10 text-gray-300 text-left">
          <li className="space-y-4">
            <div className="flex items-center gap-3">
              <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-purple-600">
                1
              </span>
              <span className="font-medium text-white">Tell us your focus</span>
            </div>
            <p>
              Use the sentence form to capture your role, industry and specific
              competitive interests.
            </p>
          </li>

          <li className="space-y-4">
            <div className="flex items-center gap-3">
              <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-purple-600">
                2
              </span>
              <span className="font-medium text-white">AI does the scanning</span>
            </div>
            <p>
              Our LLM pipeline &amp; rules engine sift through hundreds of thousands of
              sources, ranking stories by potential impact.
            </p>
          </li>

          <li className="space-y-4">
            <div className="flex items-center gap-3">
              <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-purple-600">
                3
              </span>
              <span className="font-medium text-white">Receive a briefing</span>
            </div>
            <p>
              Every Monday morning you get a concise, personalised PDF in your inbox—
              ready for your leadership update.
            </p>
          </li>
        </ol>
      </section>

      {/* ---------- CTA ---------- */}
      <section className="py-20">
        <div className="max-w-3xl mx-auto bg-purple-900/20 border border-purple-500/20 backdrop-blur-md rounded-2xl p-12 text-center">
          <h3 className="text-2xl md:text-3xl font-bold mb-4">
            Ready to see IntelliNews in action?
          </h3>
          <p className="text-gray-300 mb-8">
            Start a free 14-day trial. No credit-card. Cancel anytime.
          </p>
          <button className="bg-gradient-to-r from-purple-600 to-indigo-600 px-8 py-3 rounded-full font-medium hover:scale-105 transition flex items-center justify-center mx-auto">
            Start my trial <ArrowUpRight size={18} className="ml-2" />
          </button>
        </div>
      </section>
    </main>
  );
}
