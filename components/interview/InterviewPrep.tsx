"use client";

import React, { useState } from "react";
import { INTERVIEW_QUESTIONS_DATA } from "@/lib/data/interviewQuestions";
import { 
  ChevronLeft, 
  ChevronRight, 
  ChevronDown, 
  ChevronUp, 
  Building2, 
  CheckCircle2, 
  AlertTriangle,
  ArrowRight
} from "lucide-react";

export const InterviewPrep: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnswerExpanded, setIsAnswerExpanded] = useState(false);
  const [showSignals, setShowSignals] = useState(false);

  const currentQ = INTERVIEW_QUESTIONS_DATA[currentIndex];

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % INTERVIEW_QUESTIONS_DATA.length);
    setIsAnswerExpanded(false);
    setShowSignals(false);
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + INTERVIEW_QUESTIONS_DATA.length) % INTERVIEW_QUESTIONS_DATA.length);
    setIsAnswerExpanded(false);
    setShowSignals(false);
  };

  return (
    <section id="interview-prep" className="py-24 sm:py-32 relative border-b border-zinc-800/80 bg-[#0A0C10]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Editorial Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-8 mb-12 border-b border-zinc-800">
          <div>
            <div className="text-xs font-mono text-zinc-500 uppercase tracking-widest mb-2">
              Interview Readiness :: 06 / Verbal Defense
            </div>
            <h2 className="text-3xl sm:text-5xl font-serif text-white tracking-tight font-normal">
              Can you explain it in an interview?
            </h2>
          </div>
          <p className="text-sm text-zinc-400 font-sans max-w-md leading-relaxed">
            Staff and Principal engineers don&apos;t evaluate memorized definitions. They test whether you understand the fundamental tradeoffs when systems fail under pressure.
          </p>
        </div>

        {/* Featured Interview Question Chamber */}
        <div className="bg-[#0E1117] border border-zinc-800 rounded-lg p-6 sm:p-10 technical-schematic-grid shadow-2xl relative max-w-5xl mx-auto">
          
          {/* Top Metadata Rail */}
          <div className="flex flex-wrap items-center justify-between gap-3 pb-4 mb-6 border-b border-zinc-800 text-xs font-mono text-zinc-500">
            <div className="flex items-center gap-3">
              <span className="text-amber-400 font-semibold">{currentQ.subject.toUpperCase()}</span>
              <span>•</span>
              <span className="px-2 py-0.5 rounded bg-zinc-900 border border-zinc-800 text-zinc-300">
                LEVEL: {currentQ.difficulty.toUpperCase()}
              </span>
            </div>

            <div className="flex items-center gap-2 text-zinc-400">
              <Building2 className="w-3.5 h-3.5" />
              <span>FREQUENT AT: {currentQ.companies.slice(0, 4).join(", ")}</span>
            </div>
          </div>

          {/* Headline Question in Serif Typography */}
          <div className="mb-8">
            <span className="text-[11px] font-mono text-zinc-500 uppercase tracking-wider block mb-2">
              Oral Defense Prompt:
            </span>
            <h3 className="text-2xl sm:text-4xl font-serif text-white leading-tight font-normal">
              &ldquo;{currentQ.question}&rdquo;
            </h3>
          </div>

          {/* Reveal First-Principles Answer Action */}
          <div className="space-y-4">
            <button
              onClick={() => setIsAnswerExpanded(!isAnswerExpanded)}
              className="px-5 py-2.5 rounded bg-zinc-800 hover:bg-zinc-700 text-white text-xs font-mono transition-colors flex items-center gap-2"
            >
              <span>{isAnswerExpanded ? "Hide Explanation Framework" : "Deconstruct First-Principles Answer"}</span>
              {isAnswerExpanded ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
            </button>

            {isAnswerExpanded && (
              <div className="p-5 sm:p-6 rounded bg-[#080A0E] border border-zinc-800 text-xs font-sans space-y-5 animate-fadeIn">
                <div>
                  <span className="text-[10px] font-mono text-amber-400 uppercase tracking-wider block mb-1">
                    Structured 30-Second Opening Framework:
                  </span>
                  <p className="text-sm text-zinc-200 leading-relaxed font-sans">
                    {currentQ.firstPrinciplesAnswer.summary}
                  </p>
                </div>

                <div className="space-y-2 pt-2 border-t border-zinc-800/80">
                  <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-wider block mb-2">
                    Step-by-Step Technical Progression:
                  </span>
                  {currentQ.firstPrinciplesAnswer.keyPoints.map((pt, i) => (
                    <div key={i} className="p-3 bg-zinc-900/60 border border-zinc-800/80 rounded text-zinc-300 font-mono text-xs leading-relaxed">
                      {pt}
                    </div>
                  ))}
                </div>

                {/* Secret Interviewer Grading Rubric Toggle */}
                <div className="pt-3 border-t border-zinc-800/80">
                  <button
                    onClick={() => setShowSignals(!showSignals)}
                    className="text-xs text-zinc-400 hover:text-white flex items-center gap-1.5 font-mono transition-colors"
                  >
                    <span>{showSignals ? "Hide" : "Inspect"} What Staff Interviewers Are Secretly Grading</span>
                    {showSignals ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
                  </button>

                  {showSignals && (
                    <div className="mt-4 space-y-2">
                      {currentQ.interviewerSignals.map((signal, i) => (
                        <div key={i} className="flex items-start gap-2.5 text-xs text-zinc-300">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0 mt-0.5" />
                          <span>{signal}</span>
                        </div>
                      ))}

                      <div className="pt-3">
                        <span className="text-[10px] font-mono text-rose-400 uppercase tracking-wider block mb-1">
                          Fatal Red Flags (Auto-Rejection Traps):
                        </span>
                        <div className="space-y-1 text-zinc-400 text-xs">
                          {currentQ.redFlagsToAvoid.map((flag, i) => (
                            <div key={i} className="flex items-start gap-2">
                              <span className="text-rose-400 font-mono">✗</span>
                              <span>{flag}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Stepper Pagination */}
          <div className="flex items-center justify-between pt-6 mt-8 border-t border-zinc-800 text-xs font-mono text-zinc-500">
            <button
              onClick={handlePrev}
              className="flex items-center gap-1 text-zinc-400 hover:text-white transition-colors"
            >
              <ChevronLeft className="w-4 h-4" />
              <span>Previous Question</span>
            </button>

            <span>
              PROBLEM {currentIndex + 1} OF {INTERVIEW_QUESTIONS_DATA.length}
            </span>

            <button
              onClick={handleNext}
              className="flex items-center gap-1 text-zinc-400 hover:text-white transition-colors"
            >
              <span>Next Question</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

        </div>

      </div>
    </section>
  );
};
