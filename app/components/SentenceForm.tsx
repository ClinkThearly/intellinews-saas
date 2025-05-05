/* app/components/SentenceForm.tsx */
"use client";
import { useState } from "react";
import { ArrowUpRight, ChevronDown, Check } from "lucide-react";

/* ─── static options ────────────────────────────────────────────── */
const roles = ["Competitive Intelligence Lead", "VP of Strategy"];
const industries = ["FinTech", "Healthcare"];

/* ─── types ─────────────────────────────────────────────────────── */
export interface FormValues {
  role: string;
  industry: string;
  company: string;
  competitors: string;
  frequency: string;
  trends: string;
}

interface SentenceFormProps {
  initialValues: FormValues;
  onSubmit: (vals: FormValues) => void;
}

/* ─── dropdown helper ───────────────────────────────────────────── */
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
        onClick={() => setOpen(!open)}
        className="px-3 py-1.5 rounded-md bg-white bg-opacity-5 border border-white border-opacity-10 hover:bg-opacity-10 inline-flex items-center"
      >
        {value}
        <ChevronDown size={14} className="ml-1 opacity-60" />
      </button>

      {open && (
        <div className="absolute z-40 mt-1 bg-gray-900 border border-gray-800 rounded-md shadow-xl backdrop-blur-lg">
          {options.map((opt) => (
            <div
              key={opt}
              onClick={() => {
                setValue(opt);
                setOpen(false);
              }}
              className={`px-3 py-2 cursor-pointer text-sm ${
                opt === value
                  ? "text-purple-400"
                  : "text-gray-300 hover:text-white"
              }`}
            >
              {opt === value && <Check size={12} className="inline mr-1" />}
              {opt}
            </div>
          ))}
        </div>
      )}
    </span>
  );
}

/* ─── main component ────────────────────────────────────────────── */
export default function SentenceForm({
  onSubmit,
  initialValues,
}: SentenceFormProps) {
  const [role, setRole] = useState(initialValues.role);
  const [industry, setIndustry] = useState(initialValues.industry);

  const handleGenerate = () =>
    onSubmit({ ...initialValues, role, industry });

  return (
    <div className="backdrop-blur-md bg-black bg-opacity-30 rounded-xl border border-white border-opacity-10 p-8">
      <p className="text-lg md:text-xl mb-6 leading-relaxed">
        I am a{" "}
        <Dropdown value={role} setValue={setRole} options={roles} /> working in
        the{" "}
        <Dropdown
          value={industry}
          setValue={setIndustry}
          options={industries}
        />{" "}
        industry.
      </p>

      <button
        onClick={handleGenerate}
        className="inline-flex items-center bg-gradient-to-r from-purple-600 to-indigo-600 text-white px-6 py-3 rounded-full hover:from-purple-700 hover:to-indigo-700 transform hover:scale-105 shadow-lg transition"
      >
        <span className="mr-2">Generate my preview</span>
        <ArrowUpRight size={18} />
      </button>
    </div>
  );
}
