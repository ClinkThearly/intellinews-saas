'use client';
import { useState } from 'react';
import { ChevronDown, Check } from 'lucide-react';

export default function Dropdown({
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
        <span>{value}</span>
        <ChevronDown size={14} className="opacity-60" />
      </button>

      {open && (
        <div className="absolute z-50 mt-1 w-max bg-white border border-gray-200 rounded-md shadow-lg">
          {options.map((o) => (
            <div
              key={o}
              onClick={() => {
                setValue(o);
                setOpen(false);
              }}
              className="px-4 py-2 text-sm hover:bg-gray-50 cursor-pointer flex items-center gap-2 text-gray-700"
            >
              {o === value && <Check size={14} className="text-blue-600" />}
              <span>{o === value ? '' : <span className="w-[14px] inline-block"></span>}{o}</span>
            </div>
          ))}
        </div>
      )}
    </span>
  );
}
