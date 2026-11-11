"use client";

import React from "react";
import { Subject } from "@/lib/data/subjects";
import { X, Layers, CheckCircle2, Zap } from "lucide-react";

interface CurriculumModalProps {
  subject: Subject | null;
  isOpen: boolean;
  onClose: () => void;
}

export const CurriculumModal: React.FC<CurriculumModalProps> = ({
  subject,
  isOpen,
  onClose,
}) => {
  if (!isOpen || !subject) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-sm animate-fadeIn">
      <div className="fixed inset-0" onClick={onClose} />

      <div className="relative w-full max-w-3xl bg-[#0E1117] border border-zinc-800 rounded-lg shadow-2xl overflow-hidden flex flex-col max-h-[85vh] z-10 technical-schematic-grid">
        
        {/* Header */}
        <div className="p-6 border-b border-zinc-800 flex items-start justify-between bg-[#080A0E]">
          <div>
            <div className="flex items-center gap-2 mb-2 text-xs font-mono text-zinc-500">
              <span className="text-amber-400 font-bold">{subject.shortName}</span>
              <span>•</span>
              <span>{subject.modulesCount} MODULES • {subject.topicsCount} TOPICS • {subject.labsCount} LABS</span>
            </div>
            <h3 className="text-2xl sm:text-3xl font-serif text-white font-normal">{subject.name}</h3>
            <p className="text-xs sm:text-sm text-zinc-400 mt-1 max-w-xl font-sans leading-relaxed">
              {subject.longDescription}
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-zinc-400 hover:text-white bg-zinc-900 border border-zinc-800 rounded transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Core Foundational Question Callout */}
        <div className="px-6 py-3.5 bg-[#0A0C10] border-b border-zinc-800 flex items-center gap-3 text-xs">
          <span className="text-amber-400 font-mono text-sm leading-none">•</span>
          <div className="font-sans">
            <span className="text-zinc-500 font-mono text-[11px] uppercase mr-2">Core First Principle:</span>
            <span className="text-zinc-200 font-serif italic text-sm">&ldquo;{subject.coreQuestion}&rdquo;</span>
          </div>
        </div>

        {/* Modules Breakdown */}
        <div className="overflow-y-auto p-6 space-y-4">
          <div className="text-xs font-mono uppercase tracking-wider text-zinc-500 flex items-center gap-2">
            <span>Syllabus Modules &amp; Benchmark Milestones</span>
          </div>

          <div className="space-y-3">
            {subject.modules.map((mod, idx) => (
              <div
                key={mod.id}
                className="p-4 rounded bg-[#080A0E] border border-zinc-800/80 transition-colors"
              >
                <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-mono text-amber-400 font-bold">
                      0{idx + 1}.
                    </span>
                    <h4 className="text-sm font-semibold text-zinc-100 font-sans">{mod.title}</h4>
                  </div>
                  <div className="flex items-center gap-2 text-xs font-mono text-zinc-500">
                    <span className="text-zinc-400">{mod.interactiveLabs} Labs</span>
                    <span>•</span>
                    <span>{mod.topicsCount} Topics</span>
                  </div>
                </div>

                {/* Concept Chips */}
                <div className="flex flex-wrap gap-1.5 my-2.5 font-mono text-[11px]">
                  {mod.concepts.map((concept) => (
                    <span
                      key={concept}
                      className="px-2 py-0.5 rounded bg-zinc-900 text-zinc-400 border border-zinc-800"
                    >
                      {concept}
                    </span>
                  ))}
                </div>

                {/* Benchmark Interview Problem */}
                <div className="mt-2.5 pt-2.5 border-t border-zinc-800/60 flex items-start gap-2 text-xs">
                  <span className="text-amber-400 font-mono">→</span>
                  <div className="font-mono text-[11px]">
                    <span className="text-zinc-500 mr-1.5">Interview Benchmark:</span>
                    <span className="text-zinc-300 font-sans">{mod.interviewBenchmark}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Key Mechanisms Bar */}
          <div className="p-4 rounded bg-[#080A0E] border border-zinc-800 text-xs font-sans">
            <span className="text-[11px] font-mono uppercase text-zinc-500 block mb-2">
              Physical &amp; Hardware Mechanisms Under Study:
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {subject.keyMechanisms.map((mech) => (
                <div key={mech} className="flex items-center gap-2 text-zinc-300 font-mono text-[11px]">
                  <span className="text-amber-400">•</span>
                  <span>{mech}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-zinc-800 bg-[#080A0E] flex items-center justify-between text-xs font-mono">
          <span className="text-zinc-500">
            {subject.interviewQuestionsCount} vetted interview solutions attached
          </span>
          <button
            onClick={onClose}
            className="px-4 py-1.5 rounded bg-zinc-800 hover:bg-zinc-700 text-white transition-colors"
          >
            Close Inspector
          </button>
        </div>

      </div>
    </div>
  );
};
