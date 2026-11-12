"use client";

import React, { useState } from "react";
import { INTERVIEW_QUESTIONS_DATA } from "@/lib/data/interviewQuestions";
import { 
  ChevronLeft, 
  ChevronRight, 
  ChevronDown, 
  ChevronUp, 
  CheckCircle2, 
  HelpCircle,
  Terminal
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
              Interview Readiness :: 06 / Technical Reasoning
            </div>
            <h2 className="text-3xl sm:text-5xl font-serif text-white tracking-tight font-normal">
              Can you explain it in an interview?
            </h2>
          </div>
          <p className="text-sm text-zinc-400 font-sans max-w-md leading-relaxed">
            Technical interviewers evaluate conceptual depth and engineering judgment, not memorized flashcards. Explore how to deconstruct complex systems problems from first principles.
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
                DIFFICULTY: {currentQ.difficulty.toUpperCase()}
              </span>
            </div>

            <div className="flex items-center gap-2 text-zinc-400">
              <span>FREQUENT IN: Systems &amp; Backend Engineering Rounds</span>
            </div>
          </div>

          {/* Headline Question in Serif Typography */}
          <div className="mb-8">
            <span className="text-[11px] font-mono text-zinc-500 uppercase tracking-wider block mb-2">
              Technical Problem Prompt:
            </span>
            <h3 className="text-2xl sm:text-3xl font-serif text-white leading-snug font-normal">
              &ldquo;{currentQ.question}&rdquo;
            </h3>
          </div>

          {/* Reveal First-Principles Answer Action */}
          <div className="space-y-4">
            <button
              onClick={() => setIsAnswerExpanded(!isAnswerExpanded)}
              className="px-5 py-2.5 rounded bg-zinc-800 hover:bg-zinc-700 text-white text-xs font-mono transition-colors flex items-center gap-2"
            >
              <span>{isAnswerExpanded ? "Hide Technical Deconstruction" : "Deconstruct First-Principles Solution"}</span>
              {isAnswerExpanded ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
            </button>

            {isAnswerExpanded && (
              <div className="p-5 sm:p-6 rounded bg-[#080A0E] border border-zinc-800 text-xs font-sans space-y-6 animate-fadeIn">
                
                {/* 30-Second Summary */}
                <div>
                  <span className="text-[10px] font-mono text-amber-400 uppercase tracking-wider block mb-1.5">
                    Concise Engineering Summary:
                  </span>
                  <p className="text-sm text-zinc-200 leading-relaxed font-sans">
                    {currentQ.firstPrinciplesAnswer.summary}
                  </p>
                </div>

                {/* ASCII Diagram if available */}
                {currentQ.asciiDiagram && (
                  <div className="space-y-1.5 pt-2 border-t border-zinc-800/80">
                    <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-wider block">
                      Architectural Execution Schematic:
                    </span>
                    <pre className="p-3.5 bg-zinc-950 border border-zinc-800/80 rounded text-amber-200/90 font-mono text-[11px] overflow-x-auto leading-relaxed">
                      {currentQ.asciiDiagram}
                    </pre>
                  </div>
                )}

                {/* Step by step progression */}
                <div className="space-y-2 pt-2 border-t border-zinc-800/80">
                  <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-wider block mb-2">
                    Mechanism Breakdown &amp; Trade-offs:
                  </span>
                  {currentQ.firstPrinciplesAnswer.keyPoints.map((pt, i) => (
                    <div key={i} className="p-3 bg-zinc-900/60 border border-zinc-800/80 rounded text-zinc-300 font-mono text-xs leading-relaxed">
                      {pt}
                    </div>
                  ))}
                </div>

                {/* Follow-up questions */}
                {currentQ.followUpQuestions && currentQ.followUpQuestions.length > 0 && (
                  <div className="pt-3 border-t border-zinc-800/80 space-y-2">
                    <span className="text-[10px] font-mono text-cyan-400 uppercase tracking-wider block">
                      Typical Interview Follow-Up Probes:
                    </span>
                    <div className="space-y-1.5">
                      {currentQ.followUpQuestions.map((f, i) => (
                        <div key={i} className="flex items-start gap-2 text-zinc-300 font-sans text-xs">
                          <HelpCircle className="w-3.5 h-3.5 text-cyan-400 flex-shrink-0 mt-0.5" />
                          <span>{f}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Interviewer signals toggle */}
                <div className="pt-3 border-t border-zinc-800/80">
                  <button
                    onClick={() => setShowSignals(!showSignals)}
                    className="text-xs text-zinc-400 hover:text-white flex items-center gap-1.5 font-mono transition-colors"
                  >
                    <span>{showSignals ? "Hide" : "Inspect"} What Interviewers Look For &amp; Common Pitfalls</span>
                    {showSignals ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
                  </button>

                  {showSignals && (
                    <div className="mt-4 space-y-4">
                      <div>
                        <span className="text-[10px] font-mono text-emerald-400 uppercase tracking-wider block mb-2">
                          Strong Conceptual Signals:
                        </span>
                        <div className="space-y-2">
                          {currentQ.interviewerSignals.map((signal, i) => (
                            <div key={i} className="flex items-start gap-2.5 text-xs text-zinc-300">
                              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0 mt-0.5" />
                              <span>{signal}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div className="pt-2 border-t border-zinc-800/60">
                        <span className="text-[10px] font-mono text-rose-400 uppercase tracking-wider block mb-2">
                          Common Misconceptions to Avoid:
                        </span>
                        <div className="space-y-1.5 text-zinc-400 text-xs">
                          {currentQ.redFlagsToAvoid.map((flag, i) => (
                            <div key={i} className="flex items-start gap-2">
                              <span className="text-rose-400 font-mono font-bold">✗</span>
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
