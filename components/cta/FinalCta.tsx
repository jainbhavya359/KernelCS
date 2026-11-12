"use client";

import React, { useState } from "react";
import { ArrowRight, CheckCircle2 } from "lucide-react";

export const FinalCta: React.FC = () => {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      setSubmitted(true);
    }
  };

  return (
    <section className="py-24 sm:py-32 relative bg-[#07090D] border-b border-zinc-800/80">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        
        <div className="text-xs font-mono text-zinc-500 uppercase tracking-widest mb-4">
          Epilogue :: The First-Principles Approach
        </div>

        {/* Editorial Heading */}
        <h2 className="text-3xl sm:text-5xl font-serif text-white tracking-tight leading-[1.12] font-normal mb-5">
          Stop collecting resources. <br />
          <span className="italic text-amber-200/90">Start understanding Computer Science.</span>
        </h2>

        <p className="text-sm sm:text-base text-zinc-400 max-w-xl mx-auto font-sans leading-relaxed mb-8">
          Develop the foundational intuition that distinguishes exceptional software engineers. Explore hardware datapaths, memory management, operating system kernels, and distributed protocols through transparent, deterministic simulations.
        </p>

        {/* Tactile Rectangular Input & Action */}
        <div className="max-w-md mx-auto">
          {submitted ? (
            <div className="p-4 rounded bg-amber-500/10 border border-amber-500/30 text-amber-300 font-mono text-xs flex items-center justify-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-amber-400 flex-shrink-0" />
              <span>Invitation dispatched. Welcome to KernelCS.</span>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-2">
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="developer@domain.com"
                className="flex-1 px-4 py-2.5 rounded bg-[#0E1117] border border-zinc-700 text-sm text-zinc-100 placeholder-zinc-500 focus:outline-none focus:border-amber-400 font-mono"
              />
              <button
                type="submit"
                className="px-6 py-2.5 rounded bg-[#F1F5F9] hover:bg-white text-zinc-950 font-semibold text-xs tracking-wide transition-all flex items-center justify-center gap-2 flex-shrink-0"
              >
                <span>Start Learning</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </form>
          )}

          <p className="mt-3 text-[11px] text-zinc-500 font-mono">
            Open-access interactive laboratories • Deterministic simulations • Zero marketing spam
          </p>
        </div>

      </div>
    </section>
  );
};
