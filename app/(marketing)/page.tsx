'use client';

import { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import {
  ArrowUpRight, Search, BarChart, Shield,
} from 'lucide-react';

import AnimatedBackground  from './components/AnimatedBackground';
import SentenceForm        from './components/SentenceForm';
import NewsletterPreview   from './components/NewsletterPreview';
import FeatureItem         from './components/FeatureItem';
import Badge               from './components/Badge';

export default function Landing() {
  const [form, setForm] = useState({
    role: 'Competitive Intelligence Lead',
    industry: 'FinTech',
  });

  return (
    <main>
      {/* ---- NAVBAR ---- */}
      <nav className="px-8 py-6 flex justify-between items-center max-w-7xl mx-auto">
        <span className="font-bold text-2xl">IntelliNews</span>
        <button className="md:hidden"><ChevronDown /></button>
        <div className="hidden md:flex space-x-8 text-sm text-gray-300">
          <a href="#features" className="hover:text-white">Features</a>
          <a href="#pricing"  className="hover:text-white">Pricing</a>
        </div>
      </nav>

      {/* ---- HERO BLOCK ---- */}
      <header className="py-20 text-center px-6">
        <div className="inline-flex items-center mb-5 px-3 py-1 bg-white/5 border border-white/10 rounded-full">
          <span className="text-purple-400 text-xs mr-2 font-medium">NEW</span>
          <span className="text-gray-300 text-xs">Personalised AI-driven intelligence</span>
        </div>

        <h1 className="text-5xl md:text-6xl font-extrabold tracking-tight mb-6 leading-tight">
          <span>Your competitive edge,</span><br/>
          <span className="bg-gradient-to-r from-purple-400 to-indigo-400 bg-clip-text text-transparent">
            delivered weekly
          </span>
        </h1>

        <p className="text-gray-300 text-lg md:text-xl max-w-3xl mx-auto mb-10">
          Stay ahead with AI-powered competitive-intelligence newsletters, customised to your exact needs.
        </p>

        <div className="flex flex-wrap justify-center gap-3 mb-16">
          <Badge text="Private beta" />
          <Badge text="SOC-2 ready" />
          <Badge text="Made with ❤️" />
        </div>

        <div className="grid lg:grid-cols-2 gap-10 max-w-7xl mx-auto">
          <SentenceForm initialValues={form} onSubmit={setForm} />
          <NewsletterPreview data={form} />
        </div>
      </header>

      {/* ---- FEATURES ---- */}
      <section id="features" className="py-24 px-6 max-w-7xl mx-auto">
        <h2 className="text-4xl font-bold text-center mb-16">Intelligence that drives decisions</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          <FeatureItem icon={<Search   size={24} className="text-purple-400" />} title="Comprehensive coverage" description="500k+ sources scanned every day so you never miss a signal."/>
          <FeatureItem icon={<BarChart size={24} className="text-purple-400" />} title="Actionable insights"   description="Each story arrives with summary and first-draft commentary."/>
          <FeatureItem icon={<Shield   size={24} className="text-purple-400" />} title="Privacy first"        description="Your prompts never leave our encrypted store."/>
        </div>
      </section>

      {/* ---- CTA ---- */}
      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto bg-purple-900/20 border border-purple-500/20 backdrop-blur-md rounded-2xl p-12 text-center">
          <h3 className="text-3xl font-bold mb-4">Ready to try IntelliNews?</h3>
          <p className="text-gray-300 mb-8">Join strategy teams already saving hours every week.</p>
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
