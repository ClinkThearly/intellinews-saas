'use client';

import { useState, useEffect } from 'react';
import { ArrowUpRight, BarChart, Shield, Clock, Search, ChevronRight, ExternalLink } from 'lucide-react';

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
        
        {/* What's on deck section */}
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
            
            <div className="p-4">
              <div className="flex items-start">
                <span className="inline-block text-sm font-medium text-orange-600 min-w-[60px] mr-2">Business:</span>
                <p className="text-gray-700 text-sm">
                  Activist investor has taken a significant stake in one of the sector's largest players.
                </p>
              </div>
            </div>
          </div>
        </div>
        
        {/* Competitive intelligence */}
        <div className="mb-6">
          <h6 className="uppercase text-xs font-bold tracking-wider text-gray-500 mb-3">COMPETITIVE INTELLIGENCE</h6>
          
          <div className="border border-gray-200 rounded-lg divide-y divide-gray-200">
            <div className="p-4">
              <div className="flex items-center justify-between mb-1">
                <span className="text-gray-900 font-medium">Market Leaders</span>
                <div className="flex items-center text-xs">
                  <span className="text-red-500 mr-1">●</span>
                  <span className="text-gray-500">Critical</span>
                </div>
              </div>
              <p className="text-gray-700 text-sm mb-2">
                Top 3 competitors announced strategic partnerships targeting core customer segments.
              </p>
              <div className="flex items-center text-xs text-gray-500">
                <Clock size={12} className="mr-1" />
                <span>2 days ago</span>
              </div>
            </div>
            
            <div className="p-4">
              <div className="flex items-center justify-between mb-1">
                <span className="text-gray-900 font-medium">Regulatory Alert</span>
                <div className="flex items-center text-xs">
                  <span className="text-yellow-500 mr-1">●</span>
                  <span className="text-gray-500">Monitor</span>
                </div>
              </div>
              <p className="text-gray-700 text-sm mb-2">
                New compliance requirements will affect all {data.industry} companies with a Q3 deadline.
              </p>
              <div className="flex items-center text-xs text-gray-500">
                <Search size={12} className="mr-1" />
                <span>Multiple sources</span>
              </div>
            </div>
          </div>
        </div>
        
        {/* Bottom line */}
        <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 mb-4">
          <h6 className="font-bold text-gray-900 mb-2">Bottom Line</h6>
          <p className="text-gray-700 text-sm">
            Despite market volatility, the {data.industry} sector continues to show resilience with strong fundamentals. Opportunities in emerging markets and AI integration remain key growth drivers for forward-looking companies.
          </p>
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
