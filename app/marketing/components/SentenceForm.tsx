'use client';

import { useState } from 'react';
import { ArrowRight } from 'lucide-react';

// Dropdown component with improved styling
const Dropdown = ({ 
  options, 
  value, 
  onChange, 
  className = "" 
}: { 
  options: string[]; 
  value: string; 
  onChange: (value: string) => void; 
  className?: string;
}) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className={`relative inline-block ${className}`}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="inline-flex items-center justify-center bg-blue-50 border border-blue-200 px-3 py-1 rounded-md text-blue-700 font-medium"
      >
        {value}
        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>
      
      {isOpen && (
        <div className="absolute z-10 mt-1 rounded-md bg-white border border-gray-200 shadow-lg w-full min-w-[180px]">
          <div className="py-1 max-h-60 overflow-auto">
            {options.map((option) => (
              <button
                key={option}
                type="button"
                className={`block w-full text-left px-4 py-2 text-sm ${
                  option === value 
                    ? 'bg-blue-50 text-blue-700' 
                    : 'text-gray-700 hover:bg-gray-50'
                }`}
                onClick={() => {
                  onChange(option);
                  setIsOpen(false);
                }}
              >
                {option}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

// Main component
export default function SentenceForm({ 
  initialValues = { role: "VP of Strategy", industry: "FinTech" },
  onSubmit 
}: {
  initialValues?: { role: string; industry: string };
  onSubmit: (values: { role: string; industry: string }) => void;
}) {
  const [values, setValues] = useState(initialValues);
  
  // Options for dropdowns
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
    "Renewable Energy",
    "Automotive",
    "Telecommunications"
  ];
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(values);
  };

  return (
    <div className="bg-white rounded-xl border border-gray-200 shadow-md p-6 h-full">
      <div className="text-center mb-6">
        <h3 className="text-xl font-bold text-gray-900 mb-2">Customize Your Intelligence Brief</h3>
        <p className="text-gray-600 text-sm">Tailor your competitive intelligence to your specific needs</p>
      </div>
      
      <form onSubmit={handleSubmit} className="flex flex-col h-[calc(100%-100px)]">
        <div className="space-y-6 flex-grow">
          <div className="text-center text-lg text-gray-800">
            <p className="leading-relaxed mb-4">
              I am a{" "}
              <Dropdown
                options={roleOptions}
                value={values.role}
                onChange={(role) => setValues({ ...values, role })}
                className="mx-1"
              />
              {" "}working in the{" "}
              <Dropdown
                options={industryOptions}
                value={values.industry}
                onChange={(industry) => setValues({ ...values, industry })}
                className="mx-1"
              />
              {" "}industry.
            </p>
          </div>
          
          <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
            <h4 className="text-sm font-medium text-gray-900 mb-2">What you'll receive:</h4>
            <ul className="space-y-2 text-sm text-gray-700">
              <li className="flex items-start">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-600 mr-2 mt-0.5 flex-shrink-0" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span>Weekly competitive intelligence tailored to {values.industry}</span>
              </li>
              <li className="flex items-start">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-600 mr-2 mt-0.5 flex-shrink-0" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span>Curated market insights relevant to your role as {values.role}</span>
              </li>
              <li className="flex items-start">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-600 mr-2 mt-0.5 flex-shrink-0" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
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
            <ArrowRight size={16} className="ml-2" />
          </button>
          <p className="mt-3 text-gray-500 text-xs">No credit card required</p>
        </div>
      </form>
    </div>
  );
}
