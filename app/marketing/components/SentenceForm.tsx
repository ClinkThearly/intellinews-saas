'use client';

import { useState } from 'react';
import { ArrowUpRight } from 'lucide-react';
import Dropdown from './Dropdown';      // make sure the Dropdown you already have exports default

export type Values = {
  role: string;
  industry: string;
};

export default function SentenceForm({
  initialValues,
  onSubmit,
}: {
  initialValues?: Values;              // <- optional so dev build never crashes
  onSubmit: (v: Values) => void;
}) {
  // ------------- local state -----------------
  const roles = ['Competitive Intelligence Lead', 'VP of Strategy'];
  const industries = ['FinTech', 'Healthcare'];

  const [role, setRole] = useState(initialValues?.role ?? roles[0]);
  const [industry, setIndustry] = useState(initialValues?.industry ?? industries[0]);

  // ------------- render -----------------
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        onSubmit({ role, industry });
      }}
      className="backdrop-blur-md bg-black/30 border border-white/10 rounded-xl p-8 space-y-6"
    >
      {/* NOTE: <div> instead of <p>, and every child is inline */}
      <div className="text-lg md:text-xl leading-relaxed">
        I am a&nbsp;
        <span className="inline-block">
          <Dropdown value={role} setValue={setRole} options={roles} />
        </span>
        &nbsp;working in the&nbsp;
        <span className="inline-block">
          <Dropdown value={industry} setValue={setIndustry} options={industries} />
        </span>
        &nbsp;industry.
      </div>

      <button
        type="submit"
        className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white px-6 py-3 rounded-full inline-flex items-center"
      >
        Generate my preview <ArrowUpRight size={16} className="ml-2" />
      </button>
    </form>
  );
}
