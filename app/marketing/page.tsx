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

/* ------------------------------------------------------------------ */
/* ----------------------  DECORATIVE BACKGROUND  ------------------- */
/* ------------------------------------------------------------------ */
const AnimatedBackground = () => (
  <div className="absolute inset-0 overflow-hidden">
    <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-black to-gray-900" />
    <div
      className="absolute inset-0 opacity-20"
      style={{
        background:
          'linear-gradient(125deg,#121212 0%,#2d1b69 25%,#121212 50%,#1a0b2e 75%,#121212 100%)',
        backgroundSize: '400% 400%',
        animation: 'gradient 15s ease infinite',
      }}
    />
    <div
      className="absolute inset-0 opacity-10"
      style={{
        backgroundImage:
          'radial-gradient(rgba(255,255,255,0.1) 1px,transparent 1px)',
        backgroundSize: '30px 30px',
      }}
    />
    <div className="absolute top-1/4 left-1/4 w-32 h-32 rounded-full bg-purple-600 opacity-10 blur-3xl" />
    <div className="absolute bottom-1/3 right-1/4 w-64 h-64 rounded-full bg-blue-600 opacity-5 blur-3xl" />
  </div>
);

/* ------------------------------------------------------------------ */
/* --------------------------  UTILITIES  --------------------------- */
/* ------------------------------------------------------------------ */
const Tooltip = ({ children, tooltip }) => (
  <div className="relative inline-block group">
    {children}
    <div className="absolute z-50 -top-8 left-1/2 -translate-x-1/2 px-2 py-1 text-xs bg-gray-900 text-white rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
      {tooltip}
    </div>
  </div>
);

const CustomDropdown = ({
  options,
  defaultValue,
  onChange,
  width = 'auto',
  variant = 'standard',
}) => {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(defaultValue);

  const variants = {
    pill: 'px-4 py-2 rounded-full bg-white/5 border border-white/10 hover:bg-opacity-10',
    borderless: 'px-2 text-gray-400 hover:text-white',
    standard: 'px-3 py-1.5 rounded-md bg-white/5 border border-white/10 hover:bg-opacity-10',
  };

  const select = (v) => {
    setValue(v);
    setOpen(false);
    onChange(v);
  };

  return (
    <div className="relative inline-block mx-1" style={{ minWidth: width }}>
      <button
        className={`flex items-center justify-between text-white transition-all ${variants[variant]}`}
        onClick={() => setOpen(!open)}
        type="button"
      >
        {value}
        <ChevronDown size={16} className="ml-2 opacity-60" />
      </button>

      {open && (
        <div className="absolute z-40 mt-1 w-full bg-gray-900 border border-gray-800 rounded-md shadow-xl max-h-60 overflow-auto backdrop-blur-lg">
          {options.map((o) => (
            <div
              key={o}
              onClick={() => select(o)}
              className="px-3 py-2 hover:bg-gray-800 cursor-pointer text-gray-300 hover:text-white transition-colors"
            >
              {o === value && <Check size={14} className="inline-block mr-2 text-purple-400" />}
              {o}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

/* ------------------------------------------------------------------ */
/* ----------------------  CUSTOMISATION FORM  ---------------------- */
/* ------------------------------------------------------------------ */
const CustomizationForm = ({ onSubmit, initialValues }) => {
  const [vals, setVals] = useState(initialValues);

  const set = (f, v) => setVals({ ...vals, [f]: v });

  const industry = [
    'Financial Services',
    'Technology',
    'Healthcare',
    'Retail',
    'Manufacturing',
    'Energy',
    'Media',
  ];
  const roles = [
    'Competitive Intelligence Lead',
    'VP of Strategy',
    'Chief Strategy Officer',
    'Market Intelligence Analyst',
    'Product Strategy Manager',
  ];
  const freq = ['Daily', 'Weekly', 'Bi-weekly', 'Monthly'];
  const focus = [
    'Top 3 Competitors',
    'Market Leaders',
    'Regional Players',
    'Startups',
    'Global Enterprises',
  ];
  const trends = [
    'AI/ML Adoption',
    'Digital Transformation',
    'Market Consolidation',
    'Regulatory Changes',
    'Emerging Technologies',
  ];

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        onSubmit(vals);
      }}
      className="backdrop-blur-md bg-black/30 rounded-xl border border-white/10 p-8"
    >
      {/* ─── Industry pills ─────────────────────────────── */}
      <label className="block text-gray-400 mb-2 text-sm">I work in</label>
      <div className="flex flex-wrap gap-2 mb-6">
        {industry.map((i) => (
          <button
            key={i}
            type="button"
            onClick={() => set('industry', i)}
            className={`px-4 py-2 rounded-full text-sm transition-all ${
              vals.industry === i
                ? 'bg-purple-600 text-white'
                : 'bg-white/5 text-gray-300 hover:bg-opacity-10'
            }`}
          >
            {i}
          </button>
        ))}
      </div>

      {/* ─── Role & Company ─────────────────────────────── */}
      <div className="grid md:grid-cols-2 gap-6 mb-6">
        <div>
          <label className="block text-gray-400 mb-2 text-sm">My role</label>
          <CustomDropdown
            options={roles}
            defaultValue={vals.role}
            onChange={(v) => set('role', v)}
            width="100%"
          />
        </div>

        <div>
          <label className="block text-gray-400 mb-2 text-sm">My company</label>
          <input
            className="w-full px-3 py-1.5 rounded-md bg-white/5 border border-white/10 text-white focus:outline-none focus:ring-1 focus:ring-purple-500"
            value={vals.company}
            onChange={(e) => set('company', e.target.value)}
            placeholder="Company name"
          />
        </div>
      </div>

      {/* ─── Check-boxes ─────────────────────────────── */}
      <label className="block text-gray-400 mb-2 text-sm">I want to track</label>
      <div className="grid md:grid-cols-3 gap-3 mb-6">
        {[
          { id: 'trackCompetitors', label: 'Competitors' },
          { id: 'trackMarket', label: 'Market Trends' },
          { id: 'trackRegulations', label: 'Regulatory Updates' },
        ].map(({ id, label }) => (
          <label key={id} className="flex items-center space-x-2">
            <input
              type="checkbox"
              checked={vals[id]}
              onChange={(e) => set(id, e.target.checked)}
              className="w-4 h-4 accent-purple-600"
            />
            <span className="text-white">{label}</span>
          </label>
        ))}
      </div>

      {/* ─── Focus & Frequency ─────────────────────────── */}
      <div className="grid md:grid-cols-2 gap-6 mb-6">
        <div>
          <label className="block text-gray-400 mb-2 text-sm">Focus on</label>
          <CustomDropdown
            options={focus}
            defaultValue={vals.competitors}
            onChange={(v) => set('competitors', v)}
            width="100%"
          />
        </div>
        <div>
          <label className="block text-gray-400 mb-2 text-sm">Delivery frequency</label>
          <CustomDropdown
            options={freq}
            defaultValue={vals.frequency}
            onChange={(v) => set('frequency', v)}
            width="100%"
          />
        </div>
      </div>

      {/* ─── Trends pills ─────────────────────────────── */}
      <label className="block text-gray-400 mb-2 text-sm">Key trends to monitor</label>
      <div className="flex flex-wrap gap-2 mb-8">
        {trends.map((t) => (
          <button
            key={t}
            type="button"
            onClick={() => set('trends', t)}
            className={`px-4 py-2 rounded-full text-sm transition-all ${
              vals.trends === t
                ? 'bg-purple-600 text-white'
                : 'bg-white/5 text-gray-300 hover:bg-opacity-10'
            }`}
          >
            {t}
          </button>
        ))}
      </div>

      {/* ─── Submit ─────────────────────────────── */}
      <div className="text-center">
        <button
          type="submit"
          className="inline-flex items-center bg-gradient-to-r from-purple-600 to-indigo-600 text-white px-6 py-3 rounded-full transition-all hover:from-purple-700 hover:to-indigo-700 transform hover:scale-105 shadow-lg"
        >
          Generate My Newsletter <ArrowUpRight size={18} className="ml-2" />
        </button>
        <p className="mt-4 text-gray-400 text-sm">Free 14-day trial • No credit card required</p>
      </div>
    </form>
  );
};

/* ------------------------------------------------------------------ */
/* ------------------------  NEWSLETTER PREVIEW --------------------- */
/* ------------------------------------------------------------------ */
const NewsletterPreview = ({ data }) => (
  <div className="relative backdrop-blur-md bg-black/40 rounded-xl border border-white/10 overflow-hidden">
    {/* Header */}
    <div className="border-b border-white/10 p-6 flex justify-between items-center">
      <div>
        <h3 className="text-xl font-medium text-white">Weekly Intelligence Briefing</h3>
        <p className="text-gray-400 text-sm">Delivered every Monday at 08:00 AM</p>
      </div>
      <div className="flex space-x-3">
        <Tooltip tooltip="Copy to clipboard">
          <button className="p-2 rounded-full bg-white/5 hover:bg-opacity-10">
            <Copy size={16} className="text-gray-400" />
          </button>
        </Tooltip>
        <Tooltip tooltip="Export as PDF">
          <button className="p-2 rounded-full bg-white/5 hover:bg-opacity-10">
            <Code size={16} className="text-gray-400" />
          </button>
        </Tooltip>
      </div>
    </div>

    {/* Personalisation bar */}
    <div className="bg-purple-900/20 px-6 py-3 flex justify-between items-center">
      <span className="text-purple-300 text-sm">
        Personalised for {data.role} at {data.company}
      </span>
      <span className="px-3 py-1 bg-purple-800/30 rounded-full text-purple-100 text-xs">
        {data.industry}
      </span>
    </div>

    {/* (content truncated for brevity – unchanged from original) */}
    {/* ... keep the Market Movements & Competitive Intelligence blocks ... */}

    {/* Footer */}
    <div className="border-t border-white/10 p-6 text-center">
      <button className="inline-flex items-center text-white bg-purple-600 hover:bg-purple-700 px-4 py-2 rounded-md transition-colors">
        View Full Newsletter <ArrowUpRight size={16} className="ml-2" />
      </button>
    </div>
  </div>
);

/* ------------------------------------------------------------------ */
/* --------------------------  BADGE CHIP  -------------------------- */
/* ------------------------------------------------------------------ */
const Badge = ({ text }) => (
  <span className="px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs">
    {text}
  </span>
);

/* ------------------------------------------------------------------ */
/* ---------------------  LANDING PAGE COMPONENT -------------------- */
/* ------------------------------------------------------------------ */
export default function PersonalizedNewsletter() {
  const [form, setForm] = useState({
    industry: 'Financial Services',
    role: 'VP of Strategy',
    company: 'Goldman Sachs',
    competitors: 'Top 3 Competitors',
    frequency: 'Weekly',
    trends: 'AI/ML Adoption',
    trackCompetitors: true,
    trackMarket: true,
    trackRegulations: false,
  });

  return (
    <div className="relative min-h-screen overflow-hidden font-sans text-white">
      <AnimatedBackground />

      {/* ─── NAV ───────────────────────────────────────── */}
      <nav className="relative z-10 py-6 px-8">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="text-2xl font-bold tracking-tight">IntelliNews</div>
          <button className="hidden md:block bg-white/10 px-4 py-2 rounded-md text-sm">
            Start Free Trial
          </button>
        </div>
      </nav>

      {/* ─── HERO ─────────────────────────────────────── */}
      <section className="relative z-10 py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <header className="text-center max-w-3xl mx-auto mb-12">
            <span className="inline-flex items-center mb-3 px-3 py-1 bg-white/5 border border-white/10 rounded-full text-xs">
              NEW&nbsp;&nbsp;Personalised AI-driven intelligence
            </span>
            <h1 className="text-5xl md:text-6xl font-extrabold tracking-tight mb-6 leading-tight">
              Your competitive edge,
              <br />
              <span className="bg-gradient-to-r from-purple-400 to-indigo-400 bg-clip-text text-transparent">
                delivered weekly
              </span>
            </h1>
            <p className="text-xl text-gray-300 leading-relaxed mb-8">
              Stay ahead with AI-powered competitive-intelligence newsletters,
              customised to your exact needs and delivered straight to your inbox.
            </p>

            {/* factual badges */}
            <div className="flex flex-wrap justify-center gap-3 mb-6">
              <Badge text="Private beta" />
              <Badge text="SOC-2 ready" />
              <Badge text="Made with ❤️" />
            </div>
          </header>

          {/* ─── FORM & PREVIEW ────────────────────────── */}
          <div className="grid lg:grid-cols-2 gap-10">
            <CustomizationForm initialValues={form} onSubmit={setForm} />
            <NewsletterPreview data={form} />
          </div>
        </div>
      </section>

      {/* (Features, CTA, Footer unchanged – keep your original blocks) */}
    </div>
  );
}
