'use client';

import { useState, useEffect } from 'react';
import { ArrowUpRight, BarChart, Shield, Clock, Search, ChevronRight } from 'lucide-react';

export default function NewsletterPreview({ data = { role: "VP of Strategy", industry: "FinTech" } }) {
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
      <div className="relative backdrop-blur-md bg-black bg-opacity-40 rounded-xl border border-white border-opacity-10 overflow-hidden p-8 flex flex-col justify-center items-center h-full min-h-[500px]">
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
    <div className="relative backdrop-blur-md bg-black bg-opacity-40 rounded-xl border border-white border-opacity-10 overflow-hidden h-full">
      {/* Preview header */}
      <div className="border-b border-white border-opacity-10 p-5">
        <div className="flex justify-between items-center">
          <div>
            <h3 className="text-xl font-medium text-white">IntelliNews Briefing</h3>
            <p className="text-gray-400 text-sm">{formattedDate}</p>
          </div>
          <div className="flex space-x-2">
            <span className="px-2 py-1 rounded-full text-xs bg-purple-600 bg-opacity-20 border border-purple-500 border-opacity-30 text-purple-300">Weekly Edition</span>
          </div>
        </div>
      </div>
      
      {/* Personalization bar */}
      <div className="bg-purple-900 bg-opacity-20 px-5 py-2 flex items-center justify-between">
        <div className="text-purple-300 text-xs font-medium">
          PERSONALIZED FOR {data.role.toUpperCase()} • {data.industry.toUpperCase()}
        </div>
        <div className="text-gray-400 text-xs">View in browser</div>
      </div>
      
      {/* Executive summary */}
      <div className="p-5 border-b border-white border-opacity-10">
        <h4 className="uppercase text-xs font-bold tracking-wider text-gray-400 mb-2">EXECUTIVE SUMMARY</h4>
        <p className="text-white text-sm">
          This week in {data.industry}: Market leaders continue to invest in AI capabilities, regulatory challenges emerge for cross-border operations, and three key opportunities open for strategic positioning.
        </p>
      </div>
      
      {/* Market movements */}
      <div className="p-5 border-b border-white border-opacity-10">
        <h4 className="uppercase text-xs font-bold tracking-wider text-gray-400 mb-3">MARKET MOVEMENTS</h4>
        
        <div className="bg-white bg-opacity-5 border border-white border-opacity-5 rounded-lg p-3 mb-3">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center">
              <BarChart size={16} className="text-green-400 mr-2" />
              <span className="text-white text-sm font-medium">Industry Growth</span>
            </div>
            <span className="text-xs text-gray-400">3 days ago</span>
          </div>
          <p className="text-gray-300 text-xs mb-2">
            {data.industry} market projected to grow by 14.2% CAGR through 2030, outpacing earlier predictions by 3%.
          </p>
          <div className="w-full bg-gray-800 rounded-full h-1 mb-1">
            <div className="bg-green-500 h-1 rounded-full" style={{ width: '72%' }}></div>
          </div>
          <div className="flex justify-between text-xs">
            <span className="text-gray-400">Previous: 11.8%</span>
            <span className="text-green-400">Current: 14.2%</span>
          </div>
        </div>
        
        <div className="bg-white bg-opacity-5 border border-white border-opacity-5 rounded-lg p-3">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center">
              <Shield size={16} className="text-yellow-400 mr-2" />
              <span className="text-white text-sm font-medium">Regulatory Alert</span>
            </div>
            <span className="text-xs text-gray-400">This week</span>
          </div>
          <p className="text-gray-300 text-xs mb-2">
            New compliance requirements announced that will affect all {data.industry} companies operating internationally.
          </p>
          <div className="flex flex-wrap gap-2">
            <span className="px-2 py-1 bg-yellow-900 bg-opacity-30 rounded-full text-yellow-300 text-xs">High Impact</span>
            <span className="px-2 py-1 bg-gray-800 rounded-full text-gray-300 text-xs">Q3 Deadline</span>
          </div>
        </div>
      </div>
      
      {/* Competitive intelligence */}
      <div className="p-5">
        <h4 className="uppercase text-xs font-bold tracking-wider text-gray-400 mb-3">COMPETITIVE INTELLIGENCE</h4>
        
        <div className="border border-white border-opacity-5 rounded-lg divide-y divide-white divide-opacity-5">
          <div className="p-3">
            <div className="flex items-center justify-between mb-1">
              <span className="text-white text-sm font-medium">Market Leaders</span>
              <div className="flex items-center text-xs">
                <span className="text-red-400 mr-1">●</span>
                <span className="text-gray-400">Critical</span>
              </div>
            </div>
            <p className="text-gray-300 text-xs mb-2">
              Top 3 competitors announced new strategic partnerships targeting your core customer segments.
            </p>
            <div className="flex items-center text-xs text-gray-400">
              <Clock size={12} className="mr-1" />
              <span>2 days ago</span>
            </div>
          </div>
          
          <div className="p-3">
            <div className="flex items-center justify-between mb-1">
              <span className="text-white text-sm font-medium">Emerging Players</span>
              <div className="flex items-center text-xs">
                <span className="text-yellow-400 mr-1">●</span>
                <span className="text-gray-400">Monitor</span>
              </div>
            </div>
            <p className="text-gray-300 text-xs mb-2">
              Startup funding in {data.industry} reached $1.2B this quarter, with 3 new unicorns emerging.
            </p>
            <div className="flex items-center text-xs text-gray-400">
              <Search size={12} className="mr-1" />
              <span>Multiple sources</span>
            </div>
          </div>
        </div>
      </div>
      
      {/* Bottom area with read more button */}
      <div className="border-t border-white border-opacity-10 p-4 text-center">
        <button className="inline-flex items-center text-white bg-purple-600 hover:bg-purple-700 px-4 py-2 rounded-md text-sm transition-colors">
          <span>Read full briefing</span>
          <ChevronRight size={16} className="ml-1" />
        </button>
      </div>
      
      {/* Preview label */}
      <div className="absolute top-4 right-4 px-3 py-1 bg-purple-600 bg-opacity-20 rounded-full text-purple-300 text-xs border border-purple-500 border-opacity-30">
        Preview
      </div>
    </div>
  );
}
