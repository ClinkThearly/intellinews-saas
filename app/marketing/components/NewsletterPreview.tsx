'use client';

import { useState, useEffect } from 'react';
import { ArrowUpRight, BarChart, Shield, Clock, Search } from 'lucide-react';

export default function NewsletterPreview({ data = { role: "VP of Strategy", industry: "FinTech" } }) {
  const [loading, setLoading] = useState(true);

  // Simulate loading on data change
  useEffect(() => {
    setLoading(true);
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1500);
    return () => clearTimeout(timer);
  }, [data]);

  if (loading) {
    return (
      <div className="relative backdrop-blur-md bg-black bg-opacity-40 rounded-xl border border-white border-opacity-10 overflow-hidden p-8 flex flex-col justify-center items-center h-full min-h-[400px]">
        <div className="animate-pulse space-y-4 w-full">
          <div className="h-6 bg-white bg-opacity-10 rounded w-3/4 mx-auto"></div>
          <div className="h-4 bg-white bg-opacity-10 rounded w-1/2 mx-auto"></div>
          <div className="h-32 bg-white bg-opacity-10 rounded w-full mx-auto mt-8"></div>
          <div className="h-24 bg-white bg-opacity-10 rounded w-full mx-auto"></div>
          <div className="h-24 bg-white bg-opacity-10 rounded w-full mx-auto"></div>
        </div>
        <div className="mt-4 text-gray-400">Generating preview...</div>
      </div>
    );
  }

  return (
    <div className="relative backdrop-blur-md bg-black bg-opacity-40 rounded-xl border border-white border-opacity-10 overflow-hidden">
      {/* Preview header */}
      <div className="border-b border-white border-opacity-10 p-6">
        <div className="flex justify-between items-center">
          <div>
            <h3 className="text-xl font-medium text-white">Weekly Intelligence Briefing</h3>
            <p className="text-gray-400 text-sm">Delivered every Monday at 8:00 AM</p>
          </div>
        </div>
      </div>
      
      {/* Personalization bar */}
      <div className="bg-purple-900 bg-opacity-20 px-6 py-3">
        <div className="text-purple-300 text-sm">
          Personalized for {data.role} in {data.industry}
        </div>
      </div>
      
      {/* Content preview */}
      <div className="p-6 space-y-6">
        {/* Executive summary */}
        <div>
          <h4 className="text-lg font-medium text-white mb-3">Executive Summary</h4>
          <p className="text-gray-300 text-sm leading-relaxed">
            This week we explore the latest developments in {data.industry}, with a focus on how they might impact your strategic position. Key highlights include emerging technologies, competitor movements, and potential opportunities.
          </p>
        </div>
        
        {/* Market movements */}
        <div>
          <h4 className="text-lg font-medium text-white mb-3">Market Movements</h4>
          <div className="space-y-3">
            <div className="border border-white border-opacity-5 rounded-lg p-4 bg-white bg-opacity-5">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center">
                  <BarChart size={16} className="text-green-400 mr-2" />
                  <span className="text-white font-medium">Industry Growth</span>
                </div>
                <span className="text-xs text-gray-400">This week</span>
              </div>
              <p className="text-gray-300 text-sm">
                {data.industry} sector shows increased activity with several new developments and investments
              </p>
            </div>
            
            <div className="border border-white border-opacity-5 rounded-lg p-4 bg-white bg-opacity-5">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center">
                  <Shield size={16} className="text-yellow-400 mr-2" />
                  <span className="text-white font-medium">Regulatory Updates</span>
                </div>
                <span className="text-xs text-gray-400">Recent</span>
              </div>
              <p className="text-gray-300 text-sm">
                New compliance requirements that could affect {data.industry} companies are being discussed
              </p>
            </div>
          </div>
        </div>
        
        {/* Competitive intelligence */}
        <div>
          <h4 className="text-lg font-medium text-white mb-3">Competitive Intelligence</h4>
          <div className="border border-white border-opacity-5 rounded-lg p-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-white font-medium">Market Leaders</span>
              <div className="flex items-center text-xs">
                <span className="text-yellow-400 mr-1">●</span>
                <span className="text-gray-400">Moderate Impact</span>
              </div>
            </div>
            <p className="text-gray-300 text-sm mb-2">
              Top companies in {data.industry} are focusing on innovation and expansion
            </p>
            <div className="flex items-center text-xs text-gray-400">
              <Search size={12} className="mr-1" />
              <span>Multiple industry sources</span>
            </div>
          </div>
        </div>
      </div>
      
      {/* Preview footer */}
      <div className="border-t border-white border-opacity-10 p-6 text-center">
        <button className="inline-flex items-center text-white bg-purple-600 hover:bg-purple-700 px-4 py-2 rounded-md transition-colors">
          <span>View full newsletter</span>
          <ArrowUpRight size={16} className="ml-2" />
        </button>
      </div>
      
      {/* Preview label */}
      <div className="absolute top-4 right-4 px-3 py-1 bg-purple-600 bg-opacity-20 rounded-full text-purple-300 text-xs border border-purple-500 border-opacity-30">
        Preview
      </div>
    </div>
  );
}
