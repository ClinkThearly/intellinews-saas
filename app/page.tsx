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
type Values = { 
  role: string; 
  industry: string; 
  company?: string;
  topics?: string[];
  geographies?: string[];
  companies?: string[];
  useCases?: string[];
  step: number;
};

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
function MultiSelectTag({
  options,
  selectedValues,
  onToggle,
}: {
  options: string[];
  selectedValues: string[];
  onToggle: (value: string) => void;
}) {
  return (
    <div className="flex flex-wrap gap-2 mt-2">
      {options.map((option) => {
        const isSelected = selectedValues.includes(option);
        return (
          <button
            key={option}
            type="button"
            onClick={() => onToggle(option)}
            className={`py-1 px-3 text-xs font-medium rounded-full transition-colors ${
              isSelected 
                ? 'bg-blue-100 text-blue-700 border border-blue-200' 
                : 'bg-gray-100 text-gray-700 border border-gray-200 hover:bg-gray-200'
            }`}
          >
            {isSelected && (
              <Check className="inline-block mr-1" size={12} />
            )}
            {option}
          </button>
        );
      })}
    </div>
  );
}

function StepIndicator({ currentStep, totalSteps }: { currentStep: number; totalSteps: number }) {
  return (
    <div className="flex items-center justify-between w-full mb-6">
      {Array.from({ length: totalSteps }, (_, i) => (
        <div key={i} className="flex items-center flex-1">
          <div className={`relative flex items-center justify-center w-8 h-8 rounded-full ${
            i + 1 === currentStep
              ? 'bg-blue-600 text-white'
              : i + 1 < currentStep
                ? 'bg-blue-100 text-blue-700'
                : 'bg-gray-100 text-gray-400'
          }`}>
            {i + 1 < currentStep ? (
              <Check size={16} />
            ) : (
              <span className="text-sm font-semibold">{i + 1}</span>
            )}
          </div>
          {i < totalSteps - 1 && (
            <div className={`flex-1 h-1 mx-2 ${
              i + 1 < currentStep ? 'bg-blue-200' : 'bg-gray-200'
            }`} />
          )}
        </div>
      ))}
    </div>
  );
}

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

  const topicOptions = [
    "Market Trends",
    "Competitor Updates",
    "Regulatory Changes",
    "Technology Innovation",
    "Investment Activity",
    "M&A Deals",
    "Product Launches"
  ];

  const geographyOptions = [
    "North America",
    "Europe",
    "Asia-Pacific",
    "Latin America",
    "Middle East & Africa"
  ];

  const companyOptions = [
    "Fortune 500",
    "Tech Giants",
    "Startups",
    "Unicorns",
    "Public Companies",
    "Private Equity Backed"
  ];

  const useCaseOptions = [
    "Stay Informed",
    "Shape Strategy",
    "Identify Threats",
    "Discover Opportunities",
    "Benchmark Performance",
    "Monitor Competitors"
  ];

  const [formValues, setFormValues] = useState({
    ...initialValues,
    company: initialValues.company || "",
    topics: initialValues.topics || [],
    geographies: initialValues.geographies || [],
    companies: initialValues.companies || [],
    useCases: initialValues.useCases || [],
    step: initialValues.step || 1
  });

  const handleNext = () => {
    if (formValues.step < 3) {
      setFormValues({...formValues, step: formValues.step + 1});
    } else {
      // Submit form when on final step
      onSubmit(formValues);
    }
  };

  const handleBack = () => {
    if (formValues.step > 1) {
      setFormValues({...formValues, step: formValues.step - 1});
    }
  };

  const toggleArrayValue = (array: string[], value: string) => {
    return array.includes(value)
      ? array.filter(item => item !== value)
      : [...array, value];
  };

  return (
    <div className="bg-white rounded-xl border border-gray-200 shadow-md p-6 h-full">
      <div className="text-center mb-4">
        <h3 className="text-xl font-bold text-gray-900 mb-2">Customize Your Intelligence Brief</h3>
        <p className="text-gray-600 text-sm">Tailor your competitive intelligence to your specific needs</p>
      </div>
      
      <StepIndicator currentStep={formValues.step} totalSteps={3} />
      
      <form 
        onSubmit={(e) => {
          e.preventDefault();
          handleNext();
        }}
        className="flex flex-col h-[calc(100%-150px)]"
      >
        <div className="flex-grow">
          {/* Step 1: About You */}
          {formValues.step === 1 && (
            <div className="space-y-6">
              <div className="bg-blue-50 border border-blue-100 rounded-lg px-4 py-3 mb-5">
                <h4 className="font-semibold text-blue-800 mb-1 flex items-center">
                  <span className="bg-blue-100 text-blue-700 w-5 h-5 rounded-full flex items-center justify-center mr-2 text-xs font-bold">1</span>
                  About You
                </h4>
                <p className="text-sm text-blue-700">Tell us about your role and company</p>
              </div>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Your Role</label>
                  <Dropdown
                    value={formValues.role}
                    setValue={(role) => setFormValues({...formValues, role})}
                    options={roleOptions}
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Your Industry</label>
                  <Dropdown
                    value={formValues.industry}
                    setValue={(industry) => setFormValues({...formValues, industry})}
                    options={industryOptions}
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Company Name (Optional)</label>
                  <input
                    type="text"
                    value={formValues.company}
                    onChange={(e) => setFormValues({...formValues, company: e.target.value})}
                    placeholder="e.g., Acme Corp"
                    className="w-full px-3 py-2 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-800"
                  />
                </div>
              </div>
            </div>
          )}
          
          {/* Step 2: Intelligence Focus */}
          {formValues.step === 2 && (
            <div className="space-y-6">
              <div className="bg-blue-50 border border-blue-100 rounded-lg px-4 py-3 mb-5">
                <h4 className="font-semibold text-blue-800 mb-1 flex items-center">
                  <span className="bg-blue-100 text-blue-700 w-5 h-5 rounded-full flex items-center justify-center mr-2 text-xs font-bold">2</span>
                  Intelligence Focus
                </h4>
                <p className="text-sm text-blue-700">Select topics, regions, and companies you want to monitor</p>
              </div>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Topics (Select all that apply)</label>
                  <MultiSelectTag 
                    options={topicOptions}
                    selectedValues={formValues.topics || []}
                    onToggle={(topic) => setFormValues({
                      ...formValues, 
                      topics: toggleArrayValue(formValues.topics || [], topic)
                    })}
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Geographic Focus</label>
                  <MultiSelectTag 
                    options={geographyOptions}
                    selectedValues={formValues.geographies || []}
                    onToggle={(geography) => setFormValues({
                      ...formValues, 
                      geographies: toggleArrayValue(formValues.geographies || [], geography)
                    })}
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Company Types to Monitor</label>
                  <MultiSelectTag 
                    options={companyOptions}
                    selectedValues={formValues.companies || []}
                    onToggle={(company) => setFormValues({
                      ...formValues, 
                      companies: toggleArrayValue(formValues.companies || [], company)
                    })}
                  />
                </div>
              </div>
            </div>
          )}
          
          {/* Step 3: Use Cases */}
          {formValues.step === 3 && (
            <div className="space-y-6">
              <div className="bg-blue-50 border border-blue-100 rounded-lg px-4 py-3 mb-5">
                <h4 className="font-semibold text-blue-800 mb-1 flex items-center">
                  <span className="bg-blue-100 text-blue-700 w-5 h-5 rounded-full flex items-center justify-center mr-2 text-xs font-bold">3</span>
                  Research Goals
                </h4>
                <p className="text-sm text-blue-700">How will you use this intelligence in your work?</p>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Select Your Goals (Choose all that apply)</label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-2">
                  {useCaseOptions.map((useCase) => {
                    const isSelected = (formValues.useCases || []).includes(useCase);
                    return (
                      <div 
                        key={useCase}
                        onClick={() => setFormValues({
                          ...formValues,
                          useCases: toggleArrayValue(formValues.useCases || [], useCase)
                        })}
                        className={`cursor-pointer rounded-lg p-3 border transition-all ${
                          isSelected
                            ? 'border-blue-200 bg-blue-50'
                            : 'border-gray-200 bg-white hover:bg-gray-50'
                        }`}
                      >
                        <div className="flex items-start">
                          <div className={`mt-0.5 h-5 w-5 flex-shrink-0 rounded-full border ${
                            isSelected ? 'border-blue-600 bg-blue-600' : 'border-gray-300'
                          } flex items-center justify-center`}>
                            {isSelected && <Check size={12} className="text-white" />}
                          </div>
                          <div className="ml-3">
                            <h5 className={`font-medium ${isSelected ? 'text-blue-700' : 'text-gray-700'}`}>{useCase}</h5>
                            <p className="text-xs text-gray-500 mt-1">
                              {useCase === "Stay Informed" && "Get regular updates on industry developments"}
                              {useCase === "Shape Strategy" && "Use insights to inform strategic decisions"}
                              {useCase === "Identify Threats" && "Spot emerging competitive threats early"}
                              {useCase === "Discover Opportunities" && "Find new market opportunities"}
                              {useCase === "Benchmark Performance" && "Compare against industry standards"}
                              {useCase === "Monitor Competitors" && "Track competitor moves and announcements"}
                            </p>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
              
              <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 mt-4">
                <h4 className="text-sm font-medium text-gray-900 mb-2">What you'll receive:</h4>
                <ul className="space-y-2 text-sm text-gray-700">
                  <li className="flex items-start">
                    <div className="text-blue-600 mr-2 mt-0.5 flex-shrink-0">
                      <Check size={16} />
                    </div>
                    <span>Weekly competitive intelligence tailored to {formValues.industry}</span>
                  </li>
                  <li className="flex items-start">
                    <div className="text-blue-600 mr-2 mt-0.5 flex-shrink-0">
                      <Check size={16} />
                    </div>
                    <span>Curated market insights relevant to your role as {formValues.role}</span>
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
          )}
        </div>
        
        <div className="mt-6 flex justify-between items-center">
          {formValues.step > 1 ? (
            <button 
              type="button" 
              onClick={handleBack}
              className="text-gray-600 px-4 py-2 border border-gray-300 rounded-md text-sm font-medium hover:bg-gray-50"
            >
              Back
            </button>
          ) : (
            <div></div> // Empty div to maintain flex layout
          )}
          
          <button
            type="submit"
            className={`inline-flex items-center ${
              formValues.step === 3 
                ? 'bg-blue-600 hover:bg-blue-700' 
                : 'bg-blue-600 hover:bg-blue-700'
            } text-white px-5 py-2.5 rounded-md text-sm font-medium transition-all`}
          >
            {formValues.step === 3 ? 'Generate my preview' : 'Continue'}
            <ArrowUpRight size={16} className="ml-2" />
          </button>
        </div>
        <p className="mt-3 text-gray-500 text-xs text-center">No credit card required</p>
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
    step: 1,
    topics: [],
    geographies: [],
    companies: [],
    useCases: []
  });

  return (
    <main className="relative min-h-screen font-sans text-gray-900">
      <LightBackground />

      {/* Hero Section */}
      <header className="relative z-10 py-16 md:py-20 text-center px-6">
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
        
        <p className="text-gray-700 text-lg md:text-xl max-w-3xl mx-auto mb-12">
          AI-powered competitive-intelligence briefings tailored to your company
          and delivered to your inbox.
        </p>

        <div className="grid lg:grid-cols-2 gap-10 max-w-6xl mx-auto">
          <SentenceForm initialValues={form} onSubmit={setForm} />
          <NewsletterPreview data={form} />
        </div>
      </header>
      
      {/* How It Works Section */}
      <section className="py-20 px-6 bg-gray-50 border-y border-gray-200">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-12">How IntelliNews Works</h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm transition-all hover:shadow-md relative">
              <div className="absolute -top-4 left-6 w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center text-white font-bold">1</div>
              <div className="pt-3">
                <h3 className="text-gray-900 text-xl font-bold mb-3">Tell us about yourself</h3>
                <p className="text-gray-700">Share your role, industry, and company details so we can tailor intelligence to your specific situation.</p>
                <div className="mt-5 bg-blue-50 rounded-lg p-3 border border-blue-100">
                  <p className="text-sm text-blue-700 font-medium">We personalize for:</p>
                  <ul className="mt-2 space-y-1">
                    <li className="text-sm text-gray-700 flex items-start">
                      <div className="text-blue-600 mr-2 mt-0.5 flex-shrink-0">
                        <Check size={14} />
                      </div>
                      <span>Job function & responsibilities</span>
                    </li>
                    <li className="text-sm text-gray-700 flex items-start">
                      <div className="text-blue-600 mr-2 mt-0.5 flex-shrink-0">
                        <Check size={14} />
                      </div>
                      <span>Industry-specific challenges</span>
                    </li>
                    <li className="text-sm text-gray-700 flex items-start">
                      <div className="text-blue-600 mr-2 mt-0.5 flex-shrink-0">
                        <Check size={14} />
                      </div>
                      <span>Company size & market position</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            
            <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm transition-all hover:shadow-md relative">
              <div className="absolute -top-4 left-6 w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center text-white font-bold">2</div>
              <div className="pt-3">
                <h3 className="text-gray-900 text-xl font-bold mb-3">Set your intelligence focus</h3>
                <p className="text-gray-700">Choose the topics, geographies, and companies most relevant to your strategic priorities.</p>
                <div className="mt-5 flex flex-wrap gap-2">
                  <span className="inline-block py-1 px-3 text-xs font-medium bg-blue-100 text-blue-700 rounded-full">Market Trends</span>
                  <span className="inline-block py-1 px-3 text-xs font-medium bg-blue-100 text-blue-700 rounded-full">Competitor Updates</span>
                  <span className="inline-block py-1 px-3 text-xs font-medium bg-blue-100 text-blue-700 rounded-full">North America</span>
                  <span className="inline-block py-1 px-3 text-xs font-medium bg-blue-100 text-blue-700 rounded-full">Europe</span>
                  <span className="inline-block py-1 px-3 text-xs font-medium bg-blue-100 text-blue-700 rounded-full">Tech Giants</span>
                  <span className="inline-block py-1 px-3 text-xs font-medium bg-blue-100 text-blue-700 rounded-full">Startups</span>
                  <span className="inline-block py-1 px-3 text-xs font-medium bg-gray-100 text-gray-500 rounded-full">+more</span>
                </div>
              </div>
            </div>
            
            <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm transition-all hover:shadow-md relative">
              <div className="absolute -top-4 left-6 w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center text-white font-bold">3</div>
              <div className="pt-3">
                <h3 className="text-gray-900 text-xl font-bold mb-3">Define your goals</h3>
                <p className="text-gray-700">Specify how you'll use the intelligence – from staying informed to shaping strategy and identifying opportunities.</p>
                <div className="mt-5 space-y-2">
                  <div className="flex items-center p-2 bg-blue-50 rounded-md">
                    <div className="h-4 w-4 bg-blue-600 rounded-full flex items-center justify-center mr-2">
                      <Check size={10} className="text-white" />
                    </div>
                    <span className="text-sm text-blue-700">Shape Strategy</span>
                  </div>
                  <div className="flex items-center p-2 bg-blue-50 rounded-md">
                    <div className="h-4 w-4 bg-blue-600 rounded-full flex items-center justify-center mr-2">
                      <Check size={10} className="text-white" />
                    </div>
                    <span className="text-sm text-blue-700">Monitor Competitors</span>
                  </div>
                  <div className="flex items-center p-2 bg-blue-50 rounded-md">
                    <div className="h-4 w-4 bg-blue-600 rounded-full flex items-center justify-center mr-2">
                      <Check size={10} className="text-white" />
                    </div>
                    <span className="text-sm text-blue-700">Discover Opportunities</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Features Section */}
      <section className="py-20 px-6 max-w-6xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-4">Intelligence that drives decisions</h2>
        <p className="text-center text-gray-700 max-w-3xl mx-auto mb-16">Our AI-powered platform delivers actionable insights that help you stay ahead of market changes and competitive threats.</p>
        
        <div className="grid md:grid-cols-3 gap-8">
          <div className="bg-white rounded-lg p-6 border border-gray-200 shadow-sm transition-all hover:shadow-md">
            <div className="inline-block p-3 bg-blue-50 rounded-lg mb-4">
              <Search size={24} className="text-blue-600" />
            </div>
            <h3 className="text-gray-900 text-lg font-bold mb-2">Comprehensive coverage</h3>
            <p className="text-gray-700 leading-relaxed">500k+ sources scanned every day so you never miss a signal or emerging trend in your market.</p>
          </div>
          
          <div className="bg-white rounded-lg p-6 border border-gray-200 shadow-sm transition-all hover:shadow-md">
            <div className="inline-block p-3 bg-blue-50 rounded-lg mb-4">
              <BarChart size={24} className="text-blue-600" />
            </div>
            <h3 className="text-gray-900 text-lg font-bold mb-2">Actionable insights</h3>
            <p className="text-gray-700 leading-relaxed">Each story arrives with summary and first-draft commentary to help inform strategic decisions.</p>
          </div>
          
          <div className="bg-white rounded-lg p-6 border border-gray-200 shadow-sm transition-all hover:shadow-md">
            <div className="inline-block p-3 bg-blue-50 rounded-lg mb-4">
              <Shield size={24} className="text-blue-600" />
            </div>
            <h3 className="text-gray-900 text-lg font-bold mb-2">Privacy first</h3>
            <p className="text-gray-700 leading-relaxed">Your prompts never leave our encrypted store, ensuring your competitive strategy remains confidential.</p>
          </div>
        </div>
      </section>
      
      {/* Testimonials Section */}
      <section className="py-20 px-6 bg-gray-50 border-t border-gray-200">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-16">Trusted by strategy leaders</h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
              <div className="flex items-center mb-4">
                <div className="h-10 w-10 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center font-bold mr-3">JD</div>
                <div>
                  <h4 className="font-bold text-gray-900">James Davis</h4>
                  <p className="text-sm text-gray-600">VP of Strategy, FinTech Co.</p>
                </div>
              </div>
              <p className="text-gray-700">"IntelliNews has cut my research time in half. The weekly briefings highlight exactly what I need to know about our competitors and market trends."</p>
            </div>
            
            <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
              <div className="flex items-center mb-4">
                <div className="h-10 w-10 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center font-bold mr-3">SR</div>
                <div>
                  <h4 className="font-bold text-gray-900">Sarah Rodriguez</h4>
                  <p className="text-sm text-gray-600">CSO, Healthcare Innovation</p>
                </div>
              </div>
              <p className="text-gray-700">"The personalization is impressive. Every report feels like it was created specifically for our team's strategic priorities and challenges."</p>
            </div>
            
            <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
              <div className="flex items-center mb-4">
                <div className="h-10 w-10 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center font-bold mr-3">MK</div>
                <div>
                  <h4 className="font-bold text-gray-900">Michael Kim</h4>
                  <p className="text-sm text-gray-600">Competitive Intel Lead, Tech Group</p>
                </div>
              </div>
              <p className="text-gray-700">"We spotted a major market opportunity through IntelliNews that our internal research had missed. The ROI has been incredible."</p>
            </div>
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto bg-blue-600 rounded-xl p-8 md:p-12 text-center shadow-lg">
          <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">Ready to gain your competitive edge?</h3>
          <p className="text-blue-100 mb-8">Join strategy teams already saving hours every week with personalized intelligence briefings.</p>
          <button className="bg-white text-blue-700 hover:bg-blue-50 px-8 py-4 rounded-lg font-bold text-lg transition-colors">
            Get started free <ArrowUpRight size={20} className="inline ml-2" />
          </button>
          <p className="mt-4 text-blue-200 text-sm">No credit card required. Free 14-day trial.</p>
        </div>
      </section>
      
      {/* Footer */}
      <footer className="border-t border-gray-200 py-10 text-sm text-gray-600 text-center">
        © {new Date().getFullYear()} IntelliNews Inc.
      </footer>
    </main>
  );
}
