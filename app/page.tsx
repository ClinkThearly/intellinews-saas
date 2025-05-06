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
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-br from-white via-gray-50 to-white" />
        <div
          className="absolute inset-0 opacity-5"
          style={{
            backgroundImage:
              'radial-gradient(rgba(37,99,235,0.1) 1px, transparent 1px)',
            backgroundSize: '24px 24px',
          }}
        />
        <div className="absolute top-0 left-0 w-full h-96 bg-gradient-to-b from-blue-50 to-transparent opacity-40" />
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-blue-200 opacity-10 blur-[100px] rounded-full" />
        <div className="absolute bottom-1/3 right-1/4 w-96 h-96 bg-indigo-100 opacity-20 blur-[120px] rounded-full" />
      </div>

      {/* Hero Section */}
      <header className="relative z-10 pt-16 pb-8 md:pt-24 md:pb-16 text-center px-6">
        <div className="flex justify-center mb-6">
          <div className="inline-flex items-center px-3 py-1 bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-100 rounded-full shadow-sm">
            <span className="text-blue-700 text-xs font-semibold mr-2 bg-blue-100 px-2 py-0.5 rounded-full">LAUNCHING</span>
            <span className="text-gray-700 text-xs">Join the exclusive early access waitlist</span>
          </div>
        </div>

        <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold tracking-tight leading-tight mb-8 max-w-5xl mx-auto">
          <span className="block text-transparent bg-clip-text bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900">Turn market noise into your</span>
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-700">
            strategic advantage
          </span>
        </h1>
        
        <p className="text-gray-700 text-xl md:text-2xl max-w-3xl mx-auto mb-12 leading-relaxed">
          AI-powered competitive intelligence briefings that <span className="font-medium text-blue-700">cut through the noise</span>, tailored to your exact role and priorities.
        </p>

        <div className="flex flex-wrap justify-center gap-3 mb-12">
          <div className="flex items-center bg-white shadow-sm rounded-full px-3 py-1.5 border border-gray-100">
            <svg className="text-yellow-500 h-5 w-5 mr-1" fill="currentColor" viewBox="0 0 20 20">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
            </svg>
            <span className="text-gray-700 text-sm font-medium">4.9/5 from early users</span>
          </div>
          
          <div className="flex items-center bg-white shadow-sm rounded-full px-3 py-1.5 border border-gray-100">
            <svg className="text-green-500 h-5 w-5 mr-1" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path>
            </svg>
            <span className="text-gray-700 text-sm font-medium">Fortune 500 trusted</span>
          </div>
          
          <div className="flex items-center bg-white shadow-sm rounded-full px-3 py-1.5 border border-gray-100">
            <svg className="text-blue-500 h-5 w-5 mr-1" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path>
            </svg>
            <span className="text-gray-700 text-sm font-medium">SOC-2 Compliant</span>
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-10 md:gap-16 max-w-7xl mx-auto">
          <div className="order-2 lg:order-1 flex flex-col justify-center">
            <SentenceForm initialValues={form} onSubmit={setForm} />
          </div>
          
          <div className="order-1 lg:order-2 flex flex-col">
            <div className="relative h-full">
              <div className="absolute -top-6 -left-6 w-12 h-12 bg-blue-100 rounded-lg transform rotate-12 shadow-lg hidden md:block"></div>
              <div className="absolute -top-4 -right-4 w-8 h-8 bg-indigo-100 rounded-full shadow-md hidden md:block"></div>
              <div className="absolute -bottom-6 -right-6 w-10 h-10 bg-blue-50 rounded-lg transform -rotate-12 shadow-md hidden md:block"></div>
              
              <NewsletterPreview data={form} />
            </div>
          </div>
        </div>
      </header>
      
      {/* Process Section with Graphics */}
      <section className="py-24 px-6 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-1/2 h-full bg-blue-50 opacity-30 z-0 rounded-l-[100px]"></div>
        <div className="max-w-6xl mx-auto relative z-10">
          <div className="flex flex-col md:flex-row items-center justify-between mb-20">
            <div className="md:w-1/2 mb-10 md:mb-0">
              <div className="inline-flex items-center px-3 py-1 bg-blue-100 rounded-full text-blue-700 text-xs font-semibold mb-6">
                PROPRIETARY PROCESS
              </div>
              <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-6 leading-tight">
                AI Intelligence <span className="text-blue-600">Tailored in 3 Steps</span>
              </h2>
              <p className="text-xl text-gray-700 leading-relaxed">
                Our proprietary AI system tailors industry intelligence specifically for your role and strategic objectives - leveraging data from over 500,000 sources updated in real-time.
              </p>
            </div>
            
            <div className="md:w-2/5 relative">
              <img 
                src="https://images.unsplash.com/photo-1551434678-e076c223a692?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80" 
                alt="Strategic intelligence dashboard" 
                className="rounded-xl shadow-xl"
              />
              <div className="absolute -top-4 -right-4 w-12 h-12 bg-blue-100 rounded-lg transform rotate-12 shadow-lg"></div>
              <div className="absolute -bottom-4 -left-4 w-16 h-16 bg-indigo-100 rounded-xl transform -rotate-6 shadow-md"></div>
            </div>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8 md:gap-16 relative">
            {/* Connecting Line */}
            <div className="hidden md:block absolute top-1/2 left-0 right-0 h-1 bg-gradient-to-r from-blue-200 via-blue-400 to-indigo-400 transform -translate-y-1/2 z-0"></div>
            
            <div className="bg-white rounded-2xl p-8 border border-gray-200 shadow-lg transition-all hover:shadow-xl relative z-10">
              <div className="absolute -top-6 w-14 h-14 rounded-full bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center text-white text-xl font-bold left-1/2 transform -translate-x-1/2 shadow-lg">1</div>
              <div className="pt-6 text-center mb-6">
                <h3 className="text-gray-900 text-2xl font-bold mb-4">Your Role & Context</h3>
                <div className="w-16 h-1 bg-blue-500 mx-auto rounded-full mb-6"></div>
                <p className="text-gray-700 leading-relaxed mb-6">
                  Our AI calibrates to your specific role, industry, and business context to deliver precision intelligence.
                </p>
                <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-5 border border-blue-100">
                  <div className="flex flex-col space-y-3">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 h-8 w-8 bg-blue-100 rounded-full flex items-center justify-center text-blue-600">
                        <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                        </svg>
                      </div>
                      <span className="ml-3 font-medium text-gray-800">Strategic role insights</span>
                    </div>
                    <div className="flex items-center">
                      <div className="flex-shrink-0 h-8 w-8 bg-blue-100 rounded-full flex items-center justify-center text-blue-600">
                        <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M4 4a2 2 0 012-2h8a2 2 0 012 2v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4zm3 1h6v4H7V5zm8 8v2h1v1H4v-1h1v-2H4v-1h16v1h-1z" clipRule="evenodd" />
                        </svg>
                      </div>
                      <span className="ml-3 font-medium text-gray-800">Industry knowledge</span>
                    </div>
                    <div className="flex items-center">
                      <div className="flex-shrink-0 h-8 w-8 bg-blue-100 rounded-full flex items-center justify-center text-blue-600">
                        <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M10.496 2.132a1 1 0 00-.992 0l-7 4A1 1 0 003 8v7a1 1 0 100 2h14a1 1 0 100-2V8a1 1 0 00.496-1.868l-7-4zM6 9a1 1 0 00-1 1v3a1 1 0 102 0v-3a1 1 0 00-1-1zm3 1a1 1 0 012 0v3a1 1 0 11-2 0v-3zm5-1a1 1 0 00-1 1v3a1 1 0 102 0v-3a1 1 0 00-1-1z" clipRule="evenodd" />
                        </svg>
                      </div>
                      <span className="ml-3 font-medium text-gray-800">Company adaptation</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="bg-white rounded-2xl p-8 border border-gray-200 shadow-lg transition-all hover:shadow-xl relative z-10 md:mt-10">
              <div className="absolute -top-6 w-14 h-14 rounded-full bg-gradient-to-br from-indigo-500 to-indigo-600 flex items-center justify-center text-white text-xl font-bold left-1/2 transform -translate-x-1/2 shadow-lg">2</div>
              <div className="pt-6 text-center mb-6">
                <h3 className="text-gray-900 text-2xl font-bold mb-4">Intelligence Focus</h3>
                <div className="w-16 h-1 bg-indigo-500 mx-auto rounded-full mb-6"></div>
                <p className="text-gray-700 leading-relaxed mb-6">
                  Set precise parameters for the strategic intelligence that matters most to your business objectives.
                </p>
                <div className="flex flex-wrap justify-center gap-2 mb-4">
                  <div className="flex items-center px-4 py-2 bg-indigo-50 rounded-lg border border-indigo-100">
                    <div className="w-3 h-3 bg-indigo-400 rounded-full mr-2"></div>
                    <span className="text-sm font-medium text-gray-800">Market Trends</span>
                  </div>
                  <div className="flex items-center px-4 py-2 bg-blue-50 rounded-lg border border-blue-100">
                    <div className="w-3 h-3 bg-blue-400 rounded-full mr-2"></div>
                    <span className="text-sm font-medium text-gray-800">Competitive Moves</span>
                  </div>
                  <div className="flex items-center px-4 py-2 bg-indigo-50 rounded-lg border border-indigo-100">
                    <div className="w-3 h-3 bg-indigo-400 rounded-full mr-2"></div>
                    <span className="text-sm font-medium text-gray-800">Technology</span>
                  </div>
                  <div className="flex items-center px-4 py-2 bg-blue-50 rounded-lg border border-blue-100">
                    <div className="w-3 h-3 bg-blue-400 rounded-full mr-2"></div>
                    <span className="text-sm font-medium text-gray-800">M&A Activity</span>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="bg-white rounded-2xl p-8 border border-gray-200 shadow-lg transition-all hover:shadow-xl relative z-10 md:mt-20">
              <div className="absolute -top-6 w-14 h-14 rounded-full bg-gradient-to-br from-blue-600 to-indigo-600 flex items-center justify-center text-white text-xl font-bold left-1/2 transform -translate-x-1/2 shadow-lg">3</div>
              <div className="pt-6 text-center mb-6">
                <h3 className="text-gray-900 text-2xl font-bold mb-4">Strategic Application</h3>
                <div className="w-16 h-1 bg-gradient-to-r from-blue-500 to-indigo-500 mx-auto rounded-full mb-6"></div>
                <p className="text-gray-700 leading-relaxed mb-6">
                  Define how you'll leverage our intelligence to drive strategic decisions and competitive advantage.
                </p>
                <div className="space-y-3">
                  <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-3 rounded-lg flex items-center">
                    <div className="flex-shrink-0 h-7 w-7 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-md flex items-center justify-center text-white mr-3">
                      <svg className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                        <path d="M2 10a8 8 0 018-8v8h8a8 8 0 11-16 0z" />
                        <path d="M12 2.252A8.014 8.014 0 0117.748 8H12V2.252z" />
                      </svg>
                    </div>
                    <span className="font-medium text-gray-800">Shape Strategy</span>
                  </div>
                  <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-3 rounded-lg flex items-center">
                    <div className="flex-shrink-0 h-7 w-7 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-md flex items-center justify-center text-white mr-3">
                      <svg className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M12 1.586l-4 4v12.828l4-4V1.586zM3.707 3.293A1 1 0 002 4v10a1 1 0 00.293.707L6 18.414V5.586L3.707 3.293zM17.707 5.293L14 1.586v12.828l2.293 2.293A1 1 0 0018 16V6a1 1 0 00-.293-.707z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <span className="font-medium text-gray-800">Identify Opportunities</span>
                  </div>
                  <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-3 rounded-lg flex items-center">
                    <div className="flex-shrink-0 h-7 w-7 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-md flex items-center justify-center text-white mr-3">
                      <svg className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M12 15a1 1 0 100-2 1 1 0 000 2zm-1-4a1 1 0 11-2 0 1 1 0 012 0zm-7 2a1 1 0 100-2 1 1 0 000 2zm2-1a1 1 0 11-2 0 1 1 0 012 0zm14-1a1 1 0 100-2 1 1 0 000 2zm-7 2a1 1 0 11-2 0 1 1 0 012 0zM3 7a1 1 0 100-2 1 1 0 000 2zm2-1a1 1 0 11-2 0 1 1 0 012 0zm14-1a1 1 0 100-2 1 1 0 000 2zm-7 2a1 1 0 11-2 0 1 1 0 012 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <span className="font-medium text-gray-800">Competitive Analysis</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Features Section with Comparison */}
      <section className="py-24 px-6 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <div className="inline-flex items-center px-3 py-1 bg-indigo-100 rounded-full text-indigo-700 text-xs font-semibold mb-4">
              ENTERPRISE-GRADE FEATURES
            </div>
            <h2 className="text-3xl md:text-5xl font-extrabold text-gray-900 mb-5">Intelligence that <span className="text-blue-600">powers decisions</span></h2>
            <p className="text-xl text-gray-700 max-w-3xl mx-auto leading-relaxed">
              IntelliNews delivers mission-critical competitive insights that top strategic teams use to gain market advantage.
            </p>
          </div>
          
          <div className="grid lg:grid-cols-2 gap-12 mb-16">
            <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
              <div className="bg-gradient-to-r from-blue-600 to-indigo-600 px-8 py-5">
                <h3 className="text-white text-xl font-bold">Before IntelliNews</h3>
              </div>
              <div className="p-8 space-y-6">
                <div className="flex items-start">
                  <div className="flex-shrink-0 h-8 w-8 bg-red-100 rounded-full flex items-center justify-center text-red-500 mt-0.5">
                    <svg className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div className="ml-4">
                    <h4 className="text-lg font-semibold text-gray-900">30+ hours/week spent gathering intel</h4>
                    <p className="text-gray-700 mt-1">Strategic teams waste time sifting through irrelevant sources and noise</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="flex-shrink-0 h-8 w-8 bg-red-100 rounded-full flex items-center justify-center text-red-500 mt-0.5">
                    <svg className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div className="ml-4">
                    <h4 className="text-lg font-semibold text-gray-900">Limited source coverage</h4>
                    <p className="text-gray-700 mt-1">Most teams monitor a handful of standard sources, missing critical signals</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="flex-shrink-0 h-8 w-8 bg-red-100 rounded-full flex items-center justify-center text-red-500 mt-0.5">
                    <svg className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div className="ml-4">
                    <h4 className="text-lg font-semibold text-gray-900">Generic insights</h4>
                    <p className="text-gray-700 mt-1">One-size-fits-all analysis that doesn't account for unique business context</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="flex-shrink-0 h-8 w-8 bg-red-100 rounded-full flex items-center justify-center text-red-500 mt-0.5">
                    <svg className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div className="ml-4">
                    <h4 className="text-lg font-semibold text-gray-900">Missed opportunities</h4>
                    <p className="text-gray-700 mt-1">Strategic opportunities identified too late to act on them effectively</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
              <div className="bg-gradient-to-r from-blue-500 to-blue-600 px-8 py-5">
                <h3 className="text-white text-xl font-bold">With IntelliNews</h3>
              </div>
              <div className="p-8 space-y-6">
                <div className="flex items-start">
                  <div className="flex-shrink-0 h-8 w-8 bg-green-100 rounded-full flex items-center justify-center text-green-600 mt-0.5">
                    <svg className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div className="ml-4">
                    <h4 className="text-lg font-semibold text-gray-900">5-minute weekly brief</h4>
                    <p className="text-gray-700 mt-1">Concise, actionable intelligence delivered to your inbox, saving 25+ hours/week</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="flex-shrink-0 h-8 w-8 bg-green-100 rounded-full flex items-center justify-center text-green-600 mt-0.5">
                    <svg className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div className="ml-4">
                    <h4 className="text-lg font-semibold text-gray-900">500k+ sources monitored</h4>
                    <p className="text-gray-700 mt-1">AI-powered monitoring system catches every relevant signal across the market</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="flex-shrink-0 h-8 w-8 bg-green-100 rounded-full flex items-center justify-center text-green-600 mt-0.5">
                    <svg className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div className="ml-4">
                    <h4 className="text-lg font-semibold text-gray-900">Role-specific insights</h4>
                    <p className="text-gray-700 mt-1">Intelligence tailored to your exact role, industry, and strategic priorities</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="flex-shrink-0 h-8 w-8 bg-green-100 rounded-full flex items-center justify-center text-green-600 mt-0.5">
                    <svg className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div className="ml-4">
                    <h4 className="text-lg font-semibold text-gray-900">Early-mover advantage</h4>
                    <p className="text-gray-700 mt-1">Identify strategic opportunities 2-3 weeks before your competitors</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="grid md:grid-cols-3 gap-x-8 gap-y-12">
            <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-md transition-all hover:shadow-lg relative">
              <div className="absolute -top-5 left-6 h-10 w-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center text-white">
                <Search size={20} />
              </div>
              <div className="pt-5">
                <h3 className="text-gray-900 text-xl font-bold mb-3">AI-Powered Scanning</h3>
                <p className="text-gray-700 leading-relaxed">Our proprietary AI scans over 500,000 sources daily, identifying strategic signals with 98.7% accuracy.</p>
              </div>
            </div>
            
            <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-md transition-all hover:shadow-lg relative">
              <div className="absolute -top-5 left-6 h-10 w-10 bg-gradient-to-br from-indigo-500 to-indigo-600 rounded-lg flex items-center justify-center text-white">
                <BarChart size={20} />
              </div>
              <div className="pt-5">
                <h3 className="text-gray-900 text-xl font-bold mb-3">Strategic Analysis</h3>
                <p className="text-gray-700 leading-relaxed">Each insight includes first-draft analysis and potential strategic implications unique to your business context.</p>
              </div>
            </div>
            
            <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-md transition-all hover:shadow-lg relative">
              <div className="absolute -top-5 left-6 h-10 w-10 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-lg flex items-center justify-center text-white">
                <Shield size={20} />
              </div>
              <div className="pt-5">
                <h3 className="text-gray-900 text-xl font-bold mb-3">Enterprise Security</h3>
                <p className="text-gray-700 leading-relaxed">SOC-2 compliant, zero-knowledge encryption ensures your strategic data and queries remain confidential.</p>
              </div>
            </div>
            
            <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-md transition-all hover:shadow-lg relative">
              <div className="absolute -top-5 left-6 h-10 w-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center text-white">
                <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M5.5 16a3.5 3.5 0 01-.369-6.98 4 4 0 117.753-1.977A4.5 4.5 0 1113.5 16h-8z" />
                </svg>
              </div>
              <div className="pt-5">
                <h3 className="text-gray-900 text-xl font-bold mb-3">Real-time Alerts</h3>
                <p className="text-gray-700 leading-relaxed">Critical intelligence delivered in real-time when market-changing events occur in your industry.</p>
              </div>
            </div>
            
            <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-md transition-all hover:shadow-lg relative">
              <div className="absolute -top-5 left-6 h-10 w-10 bg-gradient-to-br from-indigo-500 to-indigo-600 rounded-lg flex items-center justify-center text-white">
                <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M12.316 3.051a1 1 0 01.633 1.265l-4 12a1 1 0 11-1.898-.632l4-12a1 1 0 011.265-.633zM5.707 6.293a1 1 0 010 1.414L3.414 10l2.293 2.293a1 1 0 11-1.414 1.414l-3-3a1 1 0 010-1.414l3-3a1 1 0 011.414 0zm8.586 0a1 1 0 011.414 0l3 3a1 1 0 010 1.414l-3 3a1 1 0 11-1.414-1.414L16.586 10l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="pt-5">
                <h3 className="text-gray-900 text-xl font-bold mb-3">API Integration</h3>
                <p className="text-gray-700 leading-relaxed">Seamlessly integrate with your existing tools and workflows for maximum productivity.</p>
              </div>
            </div>
            
            <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-md transition-all hover:shadow-lg relative">
              <div className="absolute -top-5 left-6 h-10 w-10 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-lg flex items-center justify-center text-white">
                <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-6-3a2 2 0 11-4 0 2 2 0 014 0zm-2 4a5 5 0 00-4.546 2.916A5.986 5.986 0 0010 16a5.986 5.986 0 004.546-2.084A5 5 0 0010 11z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="pt-5">
                <h3 className="text-gray-900 text-xl font-bold mb-3">Dedicated Support</h3>
                <p className="text-gray-700 leading-relaxed">Enterprise customers receive dedicated strategy consultants to maximize intelligence value.</p>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Testimonials and Stats Section */}
      <section className="py-20 px-6 bg-white border-t border-gray-100">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row items-center mb-20">
            <div className="md:w-1/2 md:pr-12 mb-10 md:mb-0">
              <div className="inline-flex items-center px-3 py-1 bg-blue-100 rounded-full text-blue-700 text-xs font-semibold mb-4">
                FROM OUR CLIENTS
              </div>
              <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-6 leading-tight">
                Transforming <span className="text-blue-600">Strategic Decision-Making</span>
              </h2>
              <p className="text-xl text-gray-700 leading-relaxed mb-10">
                IntelliNews is helping the world's top strategy teams gain market advantage through precision intelligence.
              </p>
              
              <div className="grid grid-cols-2 gap-6 text-center">
                <div className="bg-blue-50 rounded-xl p-5 border border-blue-100">
                  <div className="text-4xl font-extrabold text-blue-600 mb-1">96%</div>
                  <p className="text-gray-700 font-medium">time saved on competitive intelligence</p>
                </div>
                <div className="bg-indigo-50 rounded-xl p-5 border border-indigo-100">
                  <div className="text-4xl font-extrabold text-indigo-600 mb-1">64%</div>
                  <p className="text-gray-700 font-medium">increase in strategic opportunity identification</p>
                </div>
              </div>
            </div>
            
            <div className="md:w-1/2 relative">
              <div className="absolute -top-6 -left-6 w-12 h-12 bg-blue-100 rounded-lg transform rotate-12 shadow-lg hidden md:block"></div>
              <div className="absolute -bottom-6 -right-6 w-12 h-12 bg-indigo-100 rounded-full shadow-lg hidden md:block"></div>
              
              <div className="bg-white rounded-xl shadow-xl overflow-hidden border border-gray-200">
                <div className="p-1 bg-gradient-to-r from-blue-50 to-indigo-50">
                  <div className="h-2 w-16 mx-auto rounded-full bg-gradient-to-r from-blue-400 to-indigo-400"></div>
                </div>
                
                <div className="p-8 space-y-8">
                  <div>
                    <div className="flex items-center mb-4">
                      <img 
                        src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&h=100&q=80" 
                        alt="James Davis" 
                        className="h-14 w-14 rounded-full object-cover border-2 border-blue-100 mr-4"
                      />
                      <div>
                        <h4 className="font-bold text-xl text-gray-900">James Davis</h4>
                        <p className="text-blue-600">VP of Strategy, Fortune 100 FinTech</p>
                      </div>
                      <div className="ml-auto flex-shrink-0">
                        <svg className="h-10 w-10 text-blue-400 opacity-20" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                        </svg>
                      </div>
                    </div>
                    <div className="relative">
                      <p className="text-gray-700 text-lg leading-relaxed italic">
                        "IntelliNews has fundamentally transformed how our team approaches strategic intelligence. We've cut research time by <span className="font-semibold text-blue-700">97%</span> while increasing our ability to identify market opportunities. The precision of their AI is unlike anything we've seen."
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex justify-between pt-4 border-t border-gray-100">
                    <button className="p-2 rounded-full bg-gray-100 text-gray-700 hover:bg-gray-200">
                      <svg className="w-5 h-5" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </button>
                    
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 rounded-full bg-blue-600"></div>
                      <div className="w-2 h-2 rounded-full bg-gray-300"></div>
                      <div className="w-2 h-2 rounded-full bg-gray-300"></div>
                    </div>
                    
                    <button className="p-2 rounded-full bg-gray-100 text-gray-700 hover:bg-gray-200">
                      <svg className="w-5 h-5" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="flex justify-center flex-wrap gap-8 md:gap-12 items-center py-10 border-t border-gray-100 opacity-80">
            <img src="https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg" alt="Amazon" className="h-8 md:h-10 object-contain grayscale" />
            <img src="https://upload.wikimedia.org/wikipedia/commons/5/56/Deloitte.svg" alt="Deloitte" className="h-8 md:h-12 object-contain grayscale" />
            <img src="https://upload.wikimedia.org/wikipedia/commons/c/ca/McKinsey_%26_Company_logo.svg" alt="McKinsey" className="h-8 md:h-10 object-contain grayscale" />
            <img src="https://upload.wikimedia.org/wikipedia/commons/5/51/IBM_logo.svg" alt="IBM" className="h-8 md:h-10 object-contain grayscale" />
            <img src="https://upload.wikimedia.org/wikipedia/commons/1/19/Spotify_logo_without_text.svg" alt="Spotify" className="h-9 md:h-11 object-contain grayscale" />
            <img src="https://upload.wikimedia.org/wikipedia/commons/5/5e/Visa_Inc._logo.svg" alt="Visa" className="h-7 md:h-9 object-contain grayscale" />
          </div>
        </div>
      </section>
      
      {/* Premium Waitlist CTA Section */}
      <section className="py-24 px-6 bg-gradient-to-br from-gray-900 via-blue-900 to-indigo-900 relative overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiMyMTI1MjkiIGZpbGwtb3BhY2l0eT0iMC40Ij48cGF0aCBkPSJNMzYgMzRjMC0yLjIwOS0xLjc5LTQtNC00cy00IDEuNzkxLTQgNCAyLjc5MSA0IDQgNCA0LTEuNzkxIDQtNHptMC0zMGMwLTIuMjA5LTEuNzktNC00LTRzLTQgMS43OTEtNCA0IDIuNzkxIDQgNCA0IDQtMS43OTEgNC00em0wIDYwYzAtMi4yMDktMS43OS00LTQtNHMtNCAxLjc5MS00IDQgMi43OTEgNCA0IDQgNC0xLjc5MSA0LTR6bS0zMC0zMGMwLTIuMjA5LTEuNzktNC00LTRzLTQgMS43OTEtNCA0IDIuNzkxIDQgNCA0IDQtMS43OTEgNC00em02MCAwYzAtMi4yMDktMS43OS00LTQtNHMtNCAxLjc5MS00IDQgMi43OTEgNCA0IDQgNC0xLjc5MSA0LTR6Ii8+PC9nPjwvZz48L3N2Zz4=')] opacity-5"></div>
          <div className="absolute -top-20 -left-20 w-60 h-60 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-blob"></div>
          <div className="absolute -bottom-20 -right-20 w-60 h-60 bg-indigo-500 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-blob animation-delay-2000"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-blue-600 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-blob animation-delay-4000"></div>
        </div>
        
        <div className="max-w-5xl mx-auto relative z-10">
          <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-3xl p-10 md:p-16 shadow-2xl overflow-hidden relative">
            <div className="absolute -top-20 -right-20 w-40 h-40 bg-blue-400 rounded-full mix-blend-multiply filter blur-2xl opacity-10"></div>
            <div className="absolute -bottom-20 -left-20 w-40 h-40 bg-indigo-400 rounded-full mix-blend-multiply filter blur-2xl opacity-10"></div>
            
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <div className="inline-flex items-center px-3 py-1 bg-blue-500/30 rounded-full text-blue-100 text-xs font-semibold mb-4 backdrop-blur-sm">
                  LIMITED ACCESS
                </div>
                <h3 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-white mb-6 leading-tight">
                  Secure your <span className="text-blue-300">competitive advantage</span> today
                </h3>
                <p className="text-blue-100 text-lg mb-8 leading-relaxed">
                  Join our exclusive early access program and be among the first to leverage our AI-powered competitive intelligence platform.
                </p>
                
                <div className="mb-8 bg-white/10 backdrop-blur-sm rounded-lg border border-white/20 p-4">
                  <div className="flex items-center mb-2">
                    <div className="flex-shrink-0 h-5 w-5 bg-blue-500 rounded-full flex items-center justify-center mr-2">
                      <svg className="h-3 w-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <p className="text-white font-medium">50% discount for founding members</p>
                  </div>
                  <div className="flex items-center mb-2">
                    <div className="flex-shrink-0 h-5 w-5 bg-blue-500 rounded-full flex items-center justify-center mr-2">
                      <svg className="h-3 w-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <p className="text-white font-medium">Priority onboarding with dedicated strategist</p>
                  </div>
                  <div className="flex items-center">
                    <div className="flex-shrink-0 h-5 w-5 bg-blue-500 rounded-full flex items-center justify-center mr-2">
                      <svg className="h-3 w-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <p className="text-white font-medium">Lifetime access to all premium features</p>
                  </div>
                </div>
              </div>
              
              <div className="bg-white/10 backdrop-blur-sm rounded-xl border border-white/20 p-6 shadow-lg relative overflow-hidden">
                <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-b from-blue-400 to-indigo-500 rounded-bl-[50px] flex items-center justify-center">
                  <div className="h-10 w-10 bg-white rounded-full flex items-center justify-center transform -translate-x-1/4 translate-y-1/4">
                    <svg className="h-5 w-5 text-indigo-600" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M3 1a1 1 0 000 2h1.22l.305 1.222a.997.997 0 00.01.042l1.358 5.43-.893.892C3.74 11.846 4.632 14 6.414 14H15a1 1 0 000-2H6.414l1-1H14a1 1 0 00.894-.553l3-6A1 1 0 0017 3H6.28l-.31-1.243A1 1 0 005 1H3zM16 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM6.5 18a1.5 1.5 0 100-3 1.5 1.5 0 000 3z"></path>
                    </svg>
                  </div>
                </div>
                
                <div className="mb-6 pt-10">
                  <h4 className="text-white text-lg font-bold mb-1">Reserve your spot now</h4>
                  <p className="text-blue-200 text-sm">Only 100 spots available in our first cohort</p>
                </div>
                
                <form className="space-y-4">
                  <div>
                    <label className="text-blue-100 text-sm mb-1 block">Your work email</label>
                    <input 
                      type="email" 
                      placeholder="name@company.com" 
                      className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-white placeholder-blue-200/60" 
                    />
                  </div>
                  
                  <div>
                    <label className="text-blue-100 text-sm mb-1 block">Company name</label>
                    <input 
                      type="text" 
                      placeholder="Your company" 
                      className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-white placeholder-blue-200/60" 
                    />
                  </div>
                  
                  <div>
                    <label className="text-blue-100 text-sm mb-1 block">Your role</label>
                    <select className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-white appearance-none">
                      <option className="bg-gray-900">Select your role</option>
                      <option className="bg-gray-900">VP of Strategy</option>
                      <option className="bg-gray-900">Chief Strategy Officer</option>
                      <option className="bg-gray-900">Competitive Intelligence Lead</option>
                      <option className="bg-gray-900">Market Intelligence Analyst</option>
                    </select>
                  </div>
                  
                  <button className="w-full bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white font-bold py-3 px-6 rounded-lg transition-all shadow-md hover:shadow-lg">
                    Join the waitlist
                  </button>
                </form>
                
                <div className="mt-4 flex items-center justify-center text-blue-200 text-xs">
                  <svg className="h-4 w-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd"></path>
                  </svg>
                  <span>Your information is secure and never shared</span>
                </div>
                
                <div className="mt-5 text-center">
                  <div className="inline-flex items-center px-3 py-1 bg-indigo-900/50 border border-indigo-800/50 rounded-full">
                    <span className="h-2 w-2 bg-green-500 rounded-full mr-2 animate-pulse"></span>
                    <span className="text-blue-100 text-xs">47 people joined in the last 24 hours</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Footer */}
      <footer className="bg-gray-900 text-gray-400 py-16">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid md:grid-cols-4 gap-10">
            <div>
              <h3 className="text-white text-lg font-semibold mb-4">IntelliNews</h3>
              <p className="text-sm mb-4">AI-powered competitive intelligence designed for strategic decision makers.</p>
              <div className="flex space-x-4">
                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84"></path>
                  </svg>
                </a>
                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"></path>
                  </svg>
                </a>
              </div>
            </div>
            
            <div>
              <h3 className="text-white text-sm font-semibold uppercase mb-4">Product</h3>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="hover:text-white transition-colors">Features</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Pricing</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Enterprise</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Security</a></li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-white text-sm font-semibold uppercase mb-4">Company</h3>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="hover:text-white transition-colors">About</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Careers</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Blog</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Press</a></li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-white text-sm font-semibold uppercase mb-4">Legal</h3>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="hover:text-white transition-colors">Privacy</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Terms</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Security</a></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-800 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
            <p className="text-sm">© {new Date().getFullYear()} IntelliNews Inc. All rights reserved.</p>
            <div className="mt-4 md:mt-0">
              <img src="https://upload.wikimedia.org/wikipedia/commons/b/ba/Stripe_Logo%2C_revised_2016.svg" alt="Stripe" className="h-6 inline-block mr-4" />
              <img src="https://upload.wikimedia.org/wikipedia/commons/5/5e/Visa_Inc._logo.svg" alt="Visa" className="h-4 inline-block mr-4" />
              <img src="https://upload.wikimedia.org/wikipedia/commons/2/2a/Mastercard-logo.svg" alt="Mastercard" className="h-6 inline-block" />
            </div>
          </div>
        </div>
      </footer>
    </main>
  );
}
