'use client';

import { useState, useEffect } from 'react';
import {
  ArrowUpRight,
  ChevronDown,
  Check,
  BarChart,
  Shield,
  Search,
  Clock,
  ExternalLink,
  ChevronRight
} from 'lucide-react';

/* ---------- 1. Types ---------- */
type Values = { role: string; industry: string };

/* ---------- 2. Dropdown Component ---------- */
function Dropdown({
  value,
  setValue,
  options,
}: {
  value: string;
  setValue: (v: string) => void;
  options: string[];
}) {
  const [open, setOpen] = useState(false);
  return (
    <span className="relative inline-block">
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="px-3 py-1.5 bg-blue-50 border border-blue-200 rounded-md inline-flex items-center gap-1 text-blue-700 font-medium"
      >
        {value}
        <ChevronDown size={14} className="opacity-60" />
      </button>

      {open && (
        <div className="absolute z-50 mt-1 w-full bg-white border border-gray-200 rounded shadow-lg max-h-60 overflow-auto">
          {options.map((opt) => (
            <div
              key={opt}
              onClick={() => {
                setValue(opt);
                setOpen(false);
              }}
              className="px-3 py-2 cursor-pointer text-sm hover:bg-gray-50 flex items-center gap-2 text-gray-700"
            >
              {opt === value && <Check size={14} className="text-blue-600" />}
              {opt}
            </div>
          ))}
        </div>
      )}
    </span>
  );
}

/* ---------- 3. Light Theme Background ---------- */
function LightBackground() {
  return (
    <div className="absolute inset-0 -z-10 bg-gray-50">
      <div className="absolute inset-0 bg-gradient-to-br from-white via-gray-50 to-white" />
      <div
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage:
            'radial-gradient(rgba(0,0,0,0.03) 1px, transparent 1px)',
          backgroundSize: '30px 30px',
        }}
      />
      <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-blue-200 opacity-10 blur-3xl rounded-full" />
      <div className="absolute bottom-1/3 right-1/4 w-64 h-64 bg-blue-100 opacity-20 blur-3xl rounded-full" />
    </div>
  );
}

/* ---------- 4. One-sentence form ---------- */
function SentenceForm({
  initialValues,
  onSubmit,
}: {
  initialValues: Values;
  onSubmit: (v: Values) => void;
}) {
  const roleOptions = [
    "VP of Strategy",
    "Chief Strategy Officer", 
    "Competitive Intelligence Lead", 
    "Market Intelligence Analyst", 
    "Product Strategy Manager"
  ];
  
  const industryOptions = [
    "FinTech",
    "Healthcare",
    "E-commerce",
    "SaaS",
    "Cybersecurity",
    "Renewable Energy"
  ];

  const [role, setRole] = useState(initialValues.role);
  const [industry, setIndustry] = useState(initialValues.industry);

  return (
    <div className="bg-white rounded-xl border border-gray-200 shadow-md p-6 h-full">
      <div className="text-center mb-6">
        <h3 className="text-xl font-bold text-gray-900 mb-2">Customize Your Intelligence Brief</h3>
        <p className="text-gray-600 text-sm">Tailor your competitive intelligence to your specific needs</p>
      </div>
      
      <form
        onSubmit={(e) => {
          e.preventDefault();
          onSubmit({ role, industry });
        }}
        className="flex flex-col h-[calc(100%-100px)]"
      >
        <div className="space-y-6 flex-grow">
          <div className="text-center text-lg text-gray-800">
            <p className="leading-relaxed mb-4">
              I am a{" "}
              <Dropdown
                value={role}
                setValue={setRole}
                options={roleOptions}
              />
              {" "}working in the{" "}
              <Dropdown
                value={industry}
                setValue={setIndustry}
                options={industryOptions}
              />
              {" "}industry.
            </p>
          </div>
          
          <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
            <h4 className="text-sm font-medium text-gray-900 mb-2">What you'll receive:</h4>
            <ul className="space-y-2 text-sm text-gray-700">
              <li className="flex items-start">
                <div className="text-blue-600 mr-2 mt-0.5 flex-shrink-0">
                  <Check size={16} />
                </div>
                <span>Weekly competitive intelligence tailored to {industry}</span>
              </li>
              <li className="flex items-start">
                <div className="text-blue-600 mr-2 mt-0.5 flex-shrink-0">
                  <Check size={16} />
                </div>
                <span>Curated market insights relevant to your role as {role}</span>
              </li>
              <li className="flex items-start">
                <div className="text-blue-600 mr-2 mt-0.5 flex-shrink-0">
                  <Check size={16} />
                </div>
                <span>AI-powered analysis with actionable recommendations</span>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="mt-6 text-center">
          <button
            type="submit"
            className="inline-flex items-center bg-blue-600 text-white px-5 py-2.5 rounded-md text-sm font-medium transition-all hover:bg-blue-700"
          >
            Generate my preview
            <ArrowUpRight size={16} className="ml-2" />
          </button>
          <p className="mt-3 text-gray-500 text-xs">No credit card required</p>
        </div>
      </form>
    </div>
  );
}

/* ---------- 5. Newsletter Preview Component ---------- */
function NewsletterPreview({ data }: { data: Values }) {
  const [loading, setLoading] = useState(true);
  const today = new Date();
  const formattedDate = today.toLocaleDateString('en-US', { weekday: 'long', month: 'short', day: 'numeric' });

  // Simulate loading on data change
  useEffect(() => {
    setLoading(true);
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, [data]);

  if (loading) {
    return (
      <div className="relative bg-white rounded-xl border border-gray-200 shadow-md overflow-hidden p-8 flex flex-col justify-center items-center h-full min-h-[500px]">
        <div className="animate-pulse space-y-4 w-full">
          <div className="h-6 bg-gray-200 rounded w-3/4 mx-auto"></div>
          <div className="h-4 bg-gray-200 rounded w-1/2 mx-auto"></div>
          <div className="h-32 bg-gray-200 rounded w-full mx-auto mt-8"></div>
          <div className="h-24 bg-gray-200 rounded w-full mx-auto"></div>
          <div className="h-24 bg-gray-200 rounded w-full mx-auto"></div>
        </div>
        <div className="mt-4 text-gray-500">Generating preview...</div>
      </div>
    );
  }

  return (
    <div className="relative bg-white rounded-xl border border-gray-200 shadow-md overflow-hidden h-full">
      {/* Header */}
      <div className="border-b border-gray-200 p-5">
        <div className="flex justify-between items-center">
          <div>
            <h3 className="text-xl font-bold text-gray-900">IntelliNews Briefing</h3>
            <p className="text-gray-500 text-sm">{formattedDate} • 5 min read</p>
          </div>
          <div className="text-sm text-blue-600 flex items-center">
            <ExternalLink size={14} className="mr-1" />
            <span>View in browser</span>
          </div>
        </div>
      </div>
      
      {/* Personalization bar */}
      <div className="bg-blue-50 px-5 py-2 flex items-center justify-between border-b border-blue-100">
        <div className="text-blue-700 text-xs font-medium">
          PERSONALIZED FOR {data.role.toUpperCase()} • {data.industry.toUpperCase()}
        </div>
      </div>
      
      {/* Main content */}
      <div className="p-5">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">This week in {data.industry}</h1>
        <p className="text-gray-700 mb-6">
          Market leaders continue to invest in AI capabilities, regulatory challenges emerge for cross-border operations, and three key opportunities open for strategic positioning.
        </p>
        
        {/* Section divider */}
        <div className="border-b border-gray-200 mb-5"></div>
        
        {/* The big story section */}
        <div className="mb-6">
          <h6 className="uppercase text-xs font-bold tracking-wider text-gray-500 mb-3">THE BIG STORY</h6>
          <h2 className="text-xl font-bold text-gray-900 mb-2">Q3 Results Signal Strong {data.industry} Growth</h2>
          <p className="text-gray-700 mb-3">
            Quarterly results from major {data.industry} players are exceeding analyst expectations, with an average revenue growth of 12.4% year-over-year. This follows significant investments in technology and market expansion strategies.
          </p>
          <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 mb-4">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center">
                <BarChart size={16} className="text-green-600 mr-2" />
                <span className="text-gray-900 font-medium">Market Performance</span>
              </div>
              <span className="text-xs text-gray-500">{formattedDate}</span>
            </div>
            <p className="text-gray-700 text-sm mb-2">
              {data.industry} sector outperforming broader market by 3.2% YTD
            </p>
            <div className="w-full bg-gray-200 rounded-full h-2 mb-1">
              <div className="bg-green-500 h-2 rounded-full" style={{ width: '72%' }}></div>
            </div>
            <div className="flex justify-between text-xs">
              <span className="text-gray-500">Industry average: +8.9%</span>
              <span className="text-green-600">{data.industry}: +12.1%</span>
            </div>
          </div>
        </div>
        
        {/* What's on deck section - abbreviated for space */}
        <div className="mb-6">
          <h6 className="uppercase text-xs font-bold tracking-wider text-gray-500 mb-3">WHAT'S ON DECK</h6>
          
          <div className="border border-gray-200 rounded-lg divide-y divide-gray-200 mb-4">
            <div className="p-4">
              <div className="flex items-start">
                <span className="inline-block text-sm font-medium text-blue-600 min-w-[60px] mr-2">Markets:</span>
                <p className="text-gray-700 text-sm">
                  The top {data.industry} startups worth keeping an eye on, according to leading VCs.
                </p>
              </div>
            </div>
            
            <div className="p-4">
              <div className="flex items-start">
                <span className="inline-block text-sm font-medium text-purple-600 min-w-[60px] mr-2">Tech:</span>
                <p className="text-gray-700 text-sm">
                  Major platform updates announced that will impact all {data.industry} companies operating internationally.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Footer */}
      <div className="border-t border-gray-200 p-4 text-center">
        <button className="inline-flex items-center text-white bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-md text-sm font-medium transition-colors">
          <span>Read full briefing</span>
          <ChevronRight size={16} className="ml-1" />
        </button>
      </div>
      
      {/* Preview label */}
      <div className="absolute top-4 right-4 px-3 py-1 bg-blue-100 rounded-full text-blue-700 text-xs border border-blue-200">
        Preview
      </div>
    </div>
  );
}

/* ---------- 6. Main Page ---------- */
export default function HomePage() {
  const [form, setForm] = useState<Values>({
    role: 'VP of Strategy',
    industry: 'FinTech',
  });

  return (
    <main className="relative min-h-screen font-sans text-gray-900">
      <LightBackground />

      {/* Hero Section */}
      <header className="relative z-10 py-20 text-center px-6">
        <div className="inline-flex items-center mb-5 px-3 py-1 bg-blue-50 border border-blue-100 rounded-full">
          <span className="text-blue-700 text-xs mr-2 font-medium">NEW</span>
          <span className="text-gray-700 text-xs">Personalised AI-driven intelligence</span>
        </div>

        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6 leading-tight">
          <span className="block text-gray-900">Your competitive edge,</span>
          <span className="text-blue-600">
            delivered weekly
          </span>
        </h1>
        
        <p className="text-gray-700 text-lg md:text-xl max-w-3xl mx-auto mb-16">
          AI-powered competitive-intelligence briefings tailored to your company
          and delivered to your inbox.
        </p>

        <div className="grid lg:grid-cols-2 gap-10 max-w-6xl mx-auto">
          <SentenceForm initialValues={form} onSubmit={setForm} />
          <NewsletterPreview data={form} />
        </div>
      </header>
      
      {/* Features Section */}
      <section className="py-20 px-6 max-w-6xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-16">Intelligence that drives decisions</h2>
        <div className="grid md:grid-cols-3 gap-8">
          <div className="bg-white rounded-lg p-6 border border-gray-200 shadow-sm transition-all hover:shadow-md">
            <div className="inline-block p-3 bg-blue-50 rounded-lg mb-4">
              <Search size={24} className="text-blue-600" />
            </div>
            <h3 className="text-gray-900 text-lg font-bold mb-2">Comprehensive coverage</h3>
            <p className="text-gray-700 leading-relaxed">500k+ sources scanned every day so you never miss a signal.</p>
          </div>
          
          <div className="bg-white rounded-lg p-6 border border-gray-200 shadow-sm transition-all hover:shadow-md">
            <div className="inline-block p-3 bg-blue-50 rounded-lg mb-4">
              <BarChart size={24} className="text-blue-600" />
            </div>
            <h3 className="text-gray-900 text-lg font-bold mb-2">Actionable insights</h3>
            <p className="text-gray-700 leading-relaxed">Each story arrives with summary and first-draft commentary.</p>
          </div>
          
          <div className="bg-white rounded-lg p-6 border border-gray-200 shadow-sm transition-all hover:shadow-md">
            <div className="inline-block p-3 bg-blue-50 rounded-lg mb-4">
              <Shield size={24} className="text-blue-600" />
            </div>
            <h3 className="text-gray-900 text-lg font-bold mb-2">Privacy first</h3>
            <p className="text-gray-700 leading-relaxed">Your prompts never leave our encrypted store.</p>
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-16 px-6 mb-16">
        <div className="max-w-4xl mx-auto bg-blue-50 border border-blue-100 rounded-xl p-8 md:p-12 text-center">
          <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">Ready to try IntelliNews?</h3>
          <p className="text-gray-700 mb-8">Join strategy teams already saving hours every week.</p>
          <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-md font-medium transition">
            Start free trial <ArrowUpRight size={16} className="inline ml-1" />
          </button>
        </div>
      </section>
      
      {/* Footer */}
      <footer className="border-t border-gray-200 py-10 text-sm text-gray-600 text-center">
        © {new Date().getFullYear()} IntelliNews Inc.
      </footer>
    </main>
  );
}
