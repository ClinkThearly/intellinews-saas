/* ----------------------------------------------------------------
   Home page – self-contained demo
   ---------------------------------------------------------------- */
"use client";
import React, { useState } from "react";
import {
  ArrowUpRight,
  ChevronDown,
  Check,
  Copy,
  BarChart,
  Shield,
  Search,
  Clock,
  Code,
} from "lucide-react";

/* ---------- 1 · Animated background ---------- */
const AnimatedBackground = () => (
  <div className="absolute inset-0 overflow-hidden">
    <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-black to-gray-900" />
    <div
      className="absolute inset-0 opacity-20"
      style={{
        background:
          "linear-gradient(125deg, #121212 0%, #2d1b69 25%, #121212 50%, #1a0b2e 75%, #121212 100%)",
        backgroundSize: "400% 400%",
        animation: "gradient 15s ease infinite",
      }}
    />
    <div
      className="absolute inset-0 opacity-10"
      style={{
        backgroundImage:
          "radial-gradient(rgba(255,255,255,.1) 1px, transparent 1px)",
        backgroundSize: "30px 30px",
      }}
    />
    <div className="absolute top-1/4 left-1/4 w-32 h-32 rounded-full bg-purple-600 opacity-10 blur-3xl" />
    <div className="absolute bottom-1/3 right-1/4 w-64 h-64 rounded-full bg-blue-600 opacity-5 blur-3xl" />
  </div>
);

/* ---------- 2 · Tooltip ---------- */
const Tooltip = ({ children, tooltip }: any) => (
  <div className="relative inline-block group">
    {children}
    <div className="absolute z-50 -top-8 left-1/2 -translate-x-1/2 px-2 py-1 text-xs bg-gray-900 text-white rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
      {tooltip}
    </div>
  </div>
);

/* ---------- 3 · Tiny Dropdown (re-used) ---------- */
function Dropdown({
  value,
  setValue,
  options,
}: {
  value: string;
  setValue: (s: string) => void;
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
        <div className="absolute z-40 mt-1 bg-gray-900 border border-gray-800 rounded shadow-xl backdrop-blur-lg">
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

/* ---------- 4 · One-sentence form ---------- */
const roles = ["Competitive Intelligence Lead", "VP of Strategy"];
const industries = ["FinTech", "Healthcare"];

function SentenceForm({
  initial,
  onSubmit,
}: {
  initial: any;
  onSubmit: (vals: any) => void;
}) {
  const [role, setRole] = useState(initial.role);
  const [industry, setIndustry] = useState(initial.industry);

  return (
    <div className="backdrop-blur-md bg-black bg-opacity-30 rounded-xl border border-white border-opacity-10 p-8">
      <p className="text-lg md:text-xl mb-6 leading-relaxed">
        I am a <Dropdown value={role} setValue={setRole} options={roles} />{" "}
        working in the{" "}
        <Dropdown
          value={industry}
          setValue={setIndustry}
          options={industries}
        />{" "}
        industry.
      </p>

      <button
        onClick={() => onSubmit({ ...initial, role, industry })}
        className="inline-flex items-center bg-gradient-to-r from-purple-600 to-indigo-600 text-white px-6 py-3 rounded-full hover:from-purple-700 hover:to-indigo-700 transform hover:scale-105 shadow-lg transition"
      >
        <span className="mr-2">Generate my preview</span>
        <ArrowUpRight size={18} />
      </button>
    </div>
  );
}

/* ---------- 5 · NewsletterPreview (unchanged) ---------- */
const NewsletterPreview = ({ data }: any) => (
  <div className="relative backdrop-blur-md bg-black bg-opacity-40 rounded-xl border border-white border-opacity-10 overflow-hidden">
    {/* header / summary stripped for brevity – keep yours */}
    <div className="p-8 text-white text-center">Preview for {data.role}</div>
  </div>
);

/* ---------- 6 · Page component ---------- */
export default function HomePage() {
  const [vals, setVals] = useState({
    industry: "FinTech",
    role: "Competitive Intelligence Lead",
    company: "ACME Corp",
  });

  return (
    <div className="relative min-h-screen font-sans text-white">
      <AnimatedBackground />

      <main className="relative z-10 max-w-6xl mx-auto px-8 py-24 grid md:grid-cols-2 gap-12">
        <SentenceForm initial={vals} onSubmit={setVals} />
        <NewsletterPreview data={vals} />
      </main>
    </div>
  );
}
