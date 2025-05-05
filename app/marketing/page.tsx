'use client';

import React, { useState } from 'react';
import {
  ArrowUpRight,
  ChevronDown,
  Check,
  Copy,
  BarChart,
  Shield,
  Search,
  Clock,
  Code,
} from 'lucide-react';

import AnimatedBackground from './components/AnimatedBackground';
import Badge from './components/Badge';
import FeatureItem from './components/FeatureItem';
import CustomDropdown from './components/CustomDropdown';

/* ---------- 1 · Helper types ---------- */

type Values = {
  industry: string;
  role: string;
  company: string;
  competitors: string;
  frequency: string;
  trends: string;
  trackCompetitors: boolean;
  trackMarket: boolean;
  trackRegulations: boolean;
};

/* ---------- 2 · One-sentence form ---------- */

function SentenceForm({
  initialValues,
  onSubmit,
}: {
  initialValues: Values;
  onSubmit: (v: Values) => void;
}) {
  const roles = ['Competitive Intelligence Lead', 'VP of Strategy'];
  const industries = ['FinTech', 'Healthcare'];

  /* null-safe defaults */
  const [role, setRole] = useState(initialValues?.role ?? roles[0]);
  const [industry, setIndustry] = useState(
    initialValues?.industry ?? industries[0],
  );

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        /* only send role + industry back to parent */
        onSubmit({ ...initialValues, role, industry });
      }}
      className="backdrop-blur-md bg-black/30 border border-white/10 rounded-xl p-8 space-y-8 max-w-md"
    >
      {/* NOTE: <div> instead of <p> to avoid div-inside-p hydration error */}
      <div className="text-lg leading-relaxed">
        I am a&nbsp;
        <span className="inline-block">
          <CustomDropdown
            options={roles}
            defaultValue={role}
            onChange={setRole}
          />
        </span>
        &nbsp;working in the&nbsp;
        <span className="inline-block">
          <CustomDropdown
            options={industries}
            defaultValue={industry}
            onChange={setIndustry}
          />
        </span>
        &nbsp;industry.
      </div>

      <button
        type="submit"
        className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 px-6 py-3 rounded-full flex items-center text-sm font-medium"
      >
        Generate my preview <ArrowUpRight size={16} className="ml-2" />
      </button>
    </form>
  );
}

/* ---------- 3 · Newsletter preview block ---------- */

function NewsletterPreview({ data }: { data: Values }) {
  return (
    <div className="relative backdrop-blur-md bg-black/40 rounded-xl border border-white/10 overflow-hidden flex flex-col">
      <div className="border-b border-white/10 p-6">
        <h3 className="text-lg font-semibold">Preview for {data.role}</h3>
      </div>
      <div className="flex-1 flex items-center justify-center text-gray-500 text-sm p-6">
        Newsletter mock-up
      </div>
    </div>
  );
}

/* ---------- 4 · Main page ---------- */

export default function MarketingPage() {
  const [formValues, setFormValues] = useState<Values>({
    industry: 'Financial Services',
    role: 'VP of Strategy',
    company: '',
    competitors: '',
    frequency: 'Weekly',
    trends: '',
    trackCompetitors: true,
    trackMarket: true,
    trackRegulations: false,
  });

  return (
    <div className="relative min-h-screen pb-24">
      <AnimatedBackground />

      {/* ---------- HERO ---------- */}
      <header className="relative z-10 max-w-5xl mx-auto text-center py-24 px-6">
        <h1 className="text-5xl md:text-6xl font-extrabold tracking-tight mb-6 leading-tight">
          <span>Your competitive edge,</span>
          <br />
          <span className="bg-gradient-to-r from-purple-400 to-indigo-400 bg-clip-text text-transparent">
            delivered weekly
          </span>
        </h1>
        <p className="text-gray-300 text-lg md:text-xl max-w-2xl mx-auto">
          AI-powered competitive-intelligence briefings tailored to your company
          and delivered to your inbox.
        </p>
      </header>

      {/* ---------- FORM + PREVIEW ---------- */}
      <section className="relative z-10 max-w-6xl mx-auto grid md:grid-cols-2 gap-12 px-6">
        <SentenceForm
          initialValues={formValues}
          onSubmit={(v) => setFormValues({ ...formValues, ...v })}
        />
        <NewsletterPreview data={formValues} />
      </section>

      {/* ---------- FEATURES ---------- */}
      <section className="relative z-10 py-28 px-6 max-w-7xl mx-auto">
        <h2 className="text-4xl font-bold text-center mb-16">
          Why strategy teams choose IntelliNews
        </h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          <FeatureItem
            icon={<Search size={24} className="text-purple-400" />}
            title="Comprehensive coverage"
            description="500 k+ sources scanned every day so you never miss a signal."
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

      {/* ---------- CTA ---------- */}
      <section className="relative z-10 py-24 px-6">
        <div className="max-w-4xl mx-auto bg-purple-900/20 border border-purple-500/20 backdrop-blur-md rounded-2xl p-12 text-center">
          <h3 className="text-3xl font-bold mb-4">
            Ready to try IntelliNews?
          </h3>
          <p className="text-gray-300 mb-8">
            Join strategy teams already saving hours every week.
          </p>
          <button className="bg-gradient-to-r from-purple-600 to-indigo-600 px-8 py-3 rounded-full font-medium hover:scale-105 transition">
            Start free trial <ArrowUpRight size={16} className="inline ml-1" />
          </button>
        </div>
      </section>
    </div>
  );
}
