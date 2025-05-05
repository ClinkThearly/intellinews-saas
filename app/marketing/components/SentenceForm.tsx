'use client';
import { useState } from 'react';
import { ArrowUpRight } from 'lucide-react';
import CustomDropdown from './CustomDropdown';

type Values = { role:string; industry:string };
export default function SentenceForm({ initialValues, onSubmit }:
  { initialValues:Values; onSubmit:(v:Values)=>void }) {

  const roles      = ['Competitive Intelligence Lead','VP of Strategy'];
  const industries = ['FinTech','Healthcare'];
  const [role,     setRole]     = useState(initialValues.role);
  const [industry, setIndustry] = useState(initialValues.industry);

  return (
    <form onSubmit={e=>{e.preventDefault(); onSubmit({role, industry});}}
          className="border border-white/20 rounded-xl p-6 space-y-6 backdrop-blur-md bg-black/40">
      <p className="text-lg">
        I am a&nbsp;
        <CustomDropdown options={roles} defaultValue={role} onChange={setRole} />
        &nbsp;working in the&nbsp;
        <CustomDropdown options={industries} defaultValue={industry} onChange={setIndustry} />
        &nbsp;industry.
      </p>
      <button className="bg-purple-600 hover:bg-purple-700 px-5 py-2 rounded-full flex items-center">
        Generate my preview <ArrowUpRight size={16} className="ml-2" />
      </button>
    </form>
  );
}
