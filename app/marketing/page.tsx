'use client';

import { useState } from 'react';
import { ArrowUpRight, BarChart, Search, Shield } from 'lucide-react';
import AnimatedBackground from './components/AnimatedBackground';

// Custom dropdown component
const CustomDropdown = ({ options, defaultValue, onChange, width = "auto" }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState(defaultValue);
  
  const handleSelect = (option) => {
    setSelectedOption(option);
    setIsOpen(false);
    if (onChange) onChange(option);
  };
  
  return (
    <div className="relative inline-block mx-1" style={{ minWidth: width }}>
      <button 
        className="flex items-center justify-between text-white transition-all px-3 py-1.5 rounded-md bg-white bg-opacity-5 border border-white border-opacity-10 hover:bg-opacity-10"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span>{selectedOption}</span>
        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-2 opacity-60" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>
      
      {isOpen && (
        <div className="absolute z-40 mt-1 w-full bg-gray-900 border border-gray-800 rounded-md shadow-xl max-h-60 overflow-auto backdrop-blur-lg">
          {options.map((option, index) => (
            <div 
              key={index}
              className="px-3 py-2 hover:bg-gray-800 cursor-pointer text-gray-300 hover:text-white transition-colors"
              onClick={() => handleSelect(option)}
            >
              {option === selectedOption && (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 inline-block mr-2 text-purple-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              )}
              {option}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

// Newsletter customization form
const SentenceForm = ({ onSubmit, initialValues = { role: "VP of Strategy", industry: "FinTech" } }) => {
  const [values, setValues] = useState(initialValues);
  
  const handleChange = (field, value) => {
    setValues({
      ...values,
      [field]: value
    });
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(values);
  };

  // Options for dropdowns
  const industryOptions = ["Financial Services", "Technology", "Healthcare", "FinTech", "Manufacturing", "Energy", "Media"];
  const roleOptions = ["Competitive Intelligence Lead", "VP of Strategy", "Chief Strategy Officer", "Market Intelligence Analyst", "Product Strategy Manager"];
  
  return (
    <form onSubmit={handleSubmit} className="backdrop-blur-md bg-black bg-opacity-30 rounded-xl border border-white border-opacity-10 p-8">
      <div className="space-y-4">
        <div className="text-center mb-6">
          <h3 className="text-xl font-medium text-white">Customize Your Intelligence Brief</h3>
          <p className="text-gray-400">Tell us about your needs</p>
        </div>
        
        <div className="flex items-center justify-center text-center">
          <div className="inline-block">
            I am a {" "}
            <CustomDropdown 
              options={roleOptions} 
              defaultValue={values.role} 
              onChange={(val) => handleChange('role', val)} 
            />
            {" "} working in the {" "}
            <CustomDropdown 
              options={industryOptions} 
              defaultValue={values.industry} 
              onChange={(val) => handleChange('industry', val)} 
            />
            {" "} industry.
          </div>
        </div>
      </div>
      
      <div className="mt-8 text-center">
        <button 
          type="submit"
          className="inline-flex items-center justify-center bg-gradient-to-r from-purple-600 to-indigo-600 text-white px-6 py-3 rounded-full transition-all hover:from-purple-700 hover:to-indigo-700 transform hover:scale-105"
        >
          Generate my preview
          <ArrowUpRight size={16} className="ml-2" />
        </button>
      </div>
    </form>
  );
};

// Newsletter preview component
const NewsletterPreview = ({ data = { role: "VP of Strategy", industry: "FinTech" } }) => {
  return (
    <div className="relative backdrop-blur-md bg-black bg-opacity-40 rounded-xl border border-white border-opacity-10 overflow-hidden p-6 flex flex-col justify-center items-center h-full">
      <p className="text-gray-400 mb-4 text-center">Preview for {data.role}</p>
      <div className="w-full h-64 bg-white bg-opacity-5 rounded-lg border border-white border-opacity-10 flex items-center justify-center">
        <p className="text-gray-500">Newsletter preview will appear here</p>
      </div>
      <div className="absolute top-4 right-4 px-3 py-1 bg-purple-600 bg-opacity-20 rounded-full text-purple-300 text-xs border border-purple-500 border-opacity-30">
        Preview
      </div>
    </div>
  );
};

// Feature item component
const FeatureItem = ({ icon, title, description }) => {
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

// Badge component
const Badge = ({ text }) => {
  return (
    <div className="inline-flex items-center px-3 py-1 rounded-full bg-white/5 border border-white/10">
      <span className="text-gray-300 text-xs">{text}</span>
    </div>
  );
};

export default function MarketingHome() {
  const [form, setForm] = useState({
    role: 'VP of Strategy',
    industry: 'FinTech',
  });

  return (
    <main>
      {/* Hero section */}
      <header className="py-20 text-center px-6">
        <div className="inline-flex items-center mb-5 px-3 py-1 bg-white/5 border border-white/10 rounded-full">
          <span className="text-purple-400 text-xs mr-2 font-medium">NEW</span>
          <span className="text-gray-300 text-xs">Personalised AI-driven intelligence</span>
        </div>

        <h1 className="text-5xl md:text-6xl font-extrabold tracking-tight mb-6 leading-tight">
          <span>Your competitive edge,</span><br />
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

      {/* Features section */}
      <section id="features" className="py-24 px-6 max-w-7xl mx-auto">
        <h2 className="text-4xl font-bold text-center mb-16">Intelligence that drives decisions</h2>
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
      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto bg-purple-900/20 border border-purple-500/20 backdrop-blur-md rounded-2xl p-12 text-center">
          <h3 className="text-3xl font-bold mb-4">Ready to try IntelliNews?</h3>
          <p className="text-gray-300 mb-8">Join strategy teams already saving hours every week.</p>
          <button className="bg-gradient-to-r from-purple-600 to-indigo-600 px-8 py-3 rounded-full font-medium hover:scale-105 transition">
            Start free trial <ArrowUpRight size={16} className="inline ml-1" />
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/10 py-10 text-sm text-gray-400 text-center">
        © {new Date().getFullYear()} IntelliNews Inc.
      </footer>
    </main>
  );
}
