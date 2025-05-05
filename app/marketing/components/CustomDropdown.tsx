'use client';
import { useState } from 'react';
import { ChevronDown, Check } from 'lucide-react';

type Props = { options:string[]; defaultValue:string; onChange:(v:string)=>void; width?:string };
export default function CustomDropdown({ options, defaultValue, onChange, width='auto' }:Props) {
  const [open, setOpen] = useState(false);
  const [sel,  setSel]  = useState(defaultValue);
  const choose = (v:string) => { setSel(v); setOpen(false); onChange(v); };
  return (
    <div className="relative inline-block" style={{minWidth:width}}>
      <button onClick={()=>setOpen(!open)}
              className="px-3 py-1.5 flex justify-between items-center bg-white/5 border border-white/10 rounded-md w-full">
        {sel} <ChevronDown size={14} className="ml-1 opacity-60" />
      </button>
      {open && (
        <div className="absolute z-50 mt-1 w-full bg-gray-900 border border-gray-800 rounded-md max-h-56 overflow-auto">
          {options.map(o=>(
            <div key={o} onClick={()=>choose(o)}
                 className="px-3 py-2 hover:bg-gray-800 cursor-pointer flex items-center">
              {o===sel && <Check size={14} className="text-purple-400 mr-2" />}{o}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
