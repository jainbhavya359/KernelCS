"use client";

import React, { useState } from "react";
import {
  TopicInterviewData,
  InterviewQuestionItem,
  DifficultyLevel,
} from "@/lib/data/curriculum/types";
import {
  HelpCircle,
  Layers,
  ChevronDown,
  ChevronUp,
  AlertTriangle,
  Lightbulb,
  CheckCircle2,
  Copy,
  Check,
  MessageSquare,
  Sparkles,
  ArrowRight,
  ExternalLink,
  ShieldCheck,
} from "lucide-react";
import { InlineText, RichContentRenderer } from "@/components/ui/RichContentRenderer";

interface InterviewTabProps {
  topicTitle: string;
  interviewData: TopicInterviewData | null;
  lessonTitle?: string;
}

const DIFFICULTY_BADGES: Record<DifficultyLevel, { label: string; className: string }> = {
  Foundation: {
    label: "Foundation",
    className: "text-emerald-400 border-emerald-800/40 bg-emerald-950/20",
  },
  Intermediate: {
    label: "Intermediate",
    className: "text-amber-400 border-amber-800/40 bg-amber-950/20",
  },
  Advanced: {
    label: "Advanced",
    className: "text-red-400 border-red-800/40 bg-red-950/20",
  },
};

export const InterviewTab: React.FC<InterviewTabProps> = ({
  topicTitle,
  interviewData,
  lessonTitle,
}) => {
  const [expandedQuestions, setExpandedQuestions] = useState<Record<string, boolean>>({
    // Expand first question by default
    ...(interviewData?.questions?.[0] ? { [interviewData.questions[0].id]: true } : {}),
  });
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const toggleExpand = (id: string) => {
    setExpandedQuestions((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const handleCopyAnswer = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  if (!interviewData) {
    return (
      <div className="p-10 text-center bg-[#070A0F] border border-dashed border-zinc-800 rounded-xl space-y-3 max-w-3xl mx-auto">
        <MessageSquare className="w-8 h-8 text-zinc-700 mx-auto" />
        <h3 className="text-base font-serif text-white">Interview Synthesis in Progress</h3>
        <p className="text-xs font-sans text-zinc-400 max-w-md mx-auto">
          High-yield interview revision questions and whiteboard diagrams for {topicTitle} are currently being indexed.
        </p>
      </div>
    );
  }

  const { quickExplanation, visual, questions } = interviewData;

  return (
    <div className="space-y-10 max-w-4xl mx-auto">
      {/* ── Section Header ── */}
      <div className="p-5 bg-[#0A0D14] border border-zinc-800 rounded-xl space-y-2">
        <div className="text-[11px] font-mono text-amber-400 uppercase tracking-wider flex items-center gap-1.5">
          <Sparkles className="w-3.5 h-3.5" />
          <span>SDE Systems Interview Revision Sheet</span>
        </div>
        <h2 className="text-xl sm:text-2xl font-serif text-white font-normal">
          Interview Defense: {topicTitle}
        </h2>
        {lessonTitle && (
          <p className="text-xs text-zinc-400 font-sans">
            Context: <span className="text-zinc-200">{lessonTitle}</span>
          </p>
        )}
        <p className="text-xs text-zinc-400 font-sans leading-relaxed pt-1">
          Designed for rapid verbal articulation, whiteboard diagramming, and counter-probing in high-stakes systems engineering interviews.
        </p>
      </div>

      {/* ── A. Quick Explanation (Revision Sheet) ── */}
      <div className="space-y-4">
        <div className="flex items-center gap-2 border-b border-zinc-800 pb-2">
          <span className="text-[11px] font-mono text-amber-400 font-bold bg-amber-950/40 px-2 py-0.5 rounded border border-amber-800/40">
            PART A
          </span>
          <h3 className="text-lg font-serif text-white font-normal">
            Quick Technical Revision Sheet
          </h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* What it is */}
          <div className="p-4 bg-[#080B10] border border-zinc-800 rounded-lg space-y-1.5">
            <div className="text-[10px] font-mono text-amber-400 uppercase tracking-wider font-semibold">
              1. What It Is (Crisp Definition)
            </div>
            <p className="text-xs sm:text-sm font-sans text-zinc-200 leading-relaxed">
              <InlineText text={quickExplanation.whatItIs} />
            </p>
          </div>

          {/* Why it exists */}
          <div className="p-4 bg-[#080B10] border border-zinc-800 rounded-lg space-y-1.5">
            <div className="text-[10px] font-mono text-amber-400 uppercase tracking-wider font-semibold">
              2. Why It Exists (First-Principles Motivation)
            </div>
            <p className="text-xs sm:text-sm font-sans text-zinc-200 leading-relaxed">
              <InlineText text={quickExplanation.whyItExists} />
            </p>
          </div>

          {/* How it works */}
          <div className="p-4 bg-[#080B10] border border-zinc-800 rounded-lg space-y-1.5">
            <div className="text-[10px] font-mono text-amber-400 uppercase tracking-wider font-semibold">
              3. How It Works (Internal Execution Flow)
            </div>
            <p className="text-xs sm:text-sm font-sans text-zinc-200 leading-relaxed">
              <InlineText text={quickExplanation.howItWorks} />
            </p>
          </div>

          {/* Critical Mechanism */}
          <div className="p-4 bg-amber-950/15 border-l-2 border-amber-400/80 rounded-r-lg space-y-1.5">
            <div className="text-[10px] font-mono text-amber-300 uppercase tracking-wider font-semibold">
              4. Critical Internal Mechanism &amp; Invariant
            </div>
            <p className="text-xs sm:text-sm font-sans text-zinc-100 font-medium leading-relaxed">
              <InlineText text={quickExplanation.criticalMechanism} />
            </p>
          </div>
        </div>

        {/* Real-World Connection */}
        <div className="p-4 bg-[#06080D] border border-zinc-800/80 rounded-lg space-y-1.5">
          <div className="text-[10px] font-mono text-emerald-400 uppercase tracking-wider font-semibold flex items-center gap-1.5">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>5. Real-World Systems Connection (Linux / Production)</span>
          </div>
          <p className="text-xs sm:text-sm font-sans text-zinc-300 leading-relaxed">
            <InlineText text={quickExplanation.realWorldConnection} />
          </p>
        </div>

        {/* Common Misconceptions to Avoid */}
        {quickExplanation.misconceptions && quickExplanation.misconceptions.length > 0 && (
          <div className="p-4 bg-red-950/15 border-l-2 border-red-500/70 rounded-r-lg space-y-2">
            <div className="flex items-center gap-1.5 text-xs font-mono text-red-400 font-semibold">
              <AlertTriangle className="w-3.5 h-3.5 text-red-400" />
              <span className="uppercase tracking-wider text-[10px]">
                High-Frequency Candidate Pitfalls (What NOT to Say):
              </span>
            </div>
            <ul className="space-y-1.5">
              {quickExplanation.misconceptions.map((m, i) => (
                <li key={i} className="text-xs text-zinc-300 font-sans leading-relaxed flex items-start gap-2">
                  <span className="text-red-400 flex-shrink-0 mt-0.5">✕</span>
                  <span><InlineText text={m} /></span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      {/* ── B. Visual Explanation (Whiteboard Schematic) ── */}
      <div className="space-y-4">
        <div className="flex items-center gap-2 border-b border-zinc-800 pb-2">
          <span className="text-[11px] font-mono text-amber-400 font-bold bg-amber-950/40 px-2 py-0.5 rounded border border-amber-800/40">
            PART B
          </span>
          <h3 className="text-lg font-serif text-white font-normal">
            Visual Whiteboard Explanation
          </h3>
        </div>

        <div className="p-5 bg-[#06080D] border border-zinc-800 rounded-xl space-y-4">
          <div className="flex items-center justify-between gap-2 flex-wrap">
            <div className="flex items-center gap-2 text-xs font-mono text-zinc-300">
              <Layers className="w-4 h-4 text-amber-400" />
              <span className="font-semibold text-white uppercase tracking-wider">
                {visual.title}
              </span>
            </div>
            <span className="text-[10px] font-mono text-zinc-500 bg-zinc-900 px-2 py-0.5 rounded border border-zinc-800">
              Whiteboard Anchor
            </span>
          </div>

          {/* ASCII Diagram Canvas */}
          {visual.asciiArt && (
            <pre className="p-4 bg-black/70 rounded-lg text-cyan-300/90 font-mono text-xs leading-tight overflow-x-auto border border-zinc-900 selection:bg-cyan-500/20">
              {visual.asciiArt}
            </pre>
          )}

          <p className="text-xs text-zinc-400 font-sans leading-relaxed italic border-l border-zinc-800 pl-3">
            {visual.caption}
          </p>

          {/* Key Insights to Verbally State */}
          {visual.keyInsights && visual.keyInsights.length > 0 && (
            <div className="p-3.5 bg-zinc-900/40 border border-zinc-800/70 rounded-lg space-y-2">
              <div className="text-[10px] font-mono text-amber-400 uppercase tracking-wider font-semibold">
                What to Emphasize Aloud While Sketching:
              </div>
              <ul className="space-y-1.5">
                {visual.keyInsights.map((insight, idx) => (
                  <li key={idx} className="text-xs text-zinc-300 font-sans flex items-start gap-2">
                    <span className="text-amber-400 font-mono text-xs flex-shrink-0 mt-0.5">→</span>
                    <span><InlineText text={insight} /></span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>

      {/* ── C. Curated Interview Questions ── */}
      <div className="space-y-4">
        <div className="flex items-center justify-between border-b border-zinc-800 pb-2">
          <div className="flex items-center gap-2">
            <span className="text-[11px] font-mono text-amber-400 font-bold bg-amber-950/40 px-2 py-0.5 rounded border border-amber-800/40">
              PART C
            </span>
            <h3 className="text-lg font-serif text-white font-normal">
              High-Yield SDE Interview Questions ({questions.length})
            </h3>
          </div>
          <span className="text-xs font-mono text-zinc-500">Expand for 4-Part Defense</span>
        </div>

        <div className="space-y-5">
          {questions.map((q, qIdx) => {
            const isExpanded = Boolean(expandedQuestions[q.id]);
            const diffStyle = DIFFICULTY_BADGES[q.difficulty] || DIFFICULTY_BADGES.Intermediate;

            return (
              <div
                key={q.id}
                className="rounded-xl border border-zinc-800 bg-[#0A0D14] overflow-hidden transition-all hover:border-zinc-700/80 shadow-sm"
              >
                {/* Header Accordion Button */}
                <button
                  onClick={() => toggleExpand(q.id)}
                  className="w-full p-5 text-left flex items-start justify-between gap-4 bg-[#080B10] hover:bg-zinc-900/40 transition-colors"
                >
                  <div className="space-y-2 min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="text-[11px] font-mono text-amber-400 font-bold bg-amber-950/40 px-2 py-0.5 rounded border border-amber-800/40">
                        Q{qIdx + 1}
                      </span>
                      <span className={`text-[10px] font-mono px-2 py-0.5 rounded border ${diffStyle.className}`}>
                        {diffStyle.label}
                      </span>
                      <span className="text-[10px] font-mono text-zinc-500">
                        FAANG / Core Systems
                      </span>
                    </div>
                    <h4 className="text-sm sm:text-base font-sans text-white font-medium leading-snug">
                      <InlineText text={q.question} />
                    </h4>
                  </div>

                  <div className="flex items-center gap-2 flex-shrink-0 mt-1">
                    {isExpanded ? (
                      <ChevronUp className="w-4 h-4 text-zinc-400" />
                    ) : (
                      <ChevronDown className="w-4 h-4 text-zinc-400" />
                    )}
                  </div>
                </button>

                {/* Expanded Answer Content */}
                {isExpanded && (
                  <div className="p-5 pt-3 bg-[#06080D] border-t border-zinc-800/80 space-y-5">
                    {/* 1. Concise Interview-Ready Answer */}
                    <div className="p-4 bg-amber-950/20 border-l-2 border-amber-400 rounded-r-lg space-y-2">
                      <div className="flex items-center justify-between">
                        <div className="text-[10px] font-mono text-amber-300 uppercase tracking-wider font-semibold flex items-center gap-1.5">
                          <MessageSquare className="w-3.5 h-3.5" />
                          <span>1. Concise 30-Second Answer (State This First)</span>
                        </div>
                        <button
                          onClick={() => handleCopyAnswer(q.id, q.conciseAnswer)}
                          className="text-[10px] font-mono text-zinc-400 hover:text-white flex items-center gap-1 transition-colors"
                          title="Copy answer"
                        >
                          {copiedId === q.id ? (
                            <>
                              <Check className="w-3 h-3 text-emerald-400" />
                              <span className="text-emerald-400">Copied</span>
                            </>
                          ) : (
                            <>
                              <Copy className="w-3 h-3 text-zinc-500" />
                              <span>Copy</span>
                            </>
                          )}
                        </button>
                      </div>
                      <p className="text-xs sm:text-sm font-sans text-zinc-100 font-medium leading-relaxed">
                        <InlineText text={q.conciseAnswer} />
                      </p>
                    </div>

                    {/* 2. Deeper Technical Explanation */}
                    <div className="space-y-2">
                      <div className="text-[10px] font-mono text-zinc-400 uppercase tracking-wider font-semibold">
                        2. Deep Technical Reasoning (Systems Mechanism &amp; Invariants)
                      </div>
                      <div className="text-xs sm:text-sm text-zinc-300 font-sans leading-relaxed">
                        <RichContentRenderer content={q.inDepthExplanation} />
                      </div>
                    </div>

                    {/* 3. Practical Example / Execution Sequence */}
                    {q.executionTraceOrExample && (
                      <div className="p-4 bg-[#080B10] border border-zinc-800/90 rounded-lg space-y-2">
                        <div className="text-[10px] font-mono text-emerald-400 uppercase tracking-wider font-semibold">
                          3. Concrete Example / Execution Sequence
                        </div>
                        <div className="text-xs sm:text-sm text-zinc-300 font-sans leading-relaxed">
                          <RichContentRenderer content={q.executionTraceOrExample} />
                        </div>
                      </div>
                    )}

                    {/* 4. Common Follow-Up Questions & Counter-Probes */}
                    {q.followUps && q.followUps.length > 0 && (
                      <div className="p-4 bg-zinc-900/40 border border-zinc-800/80 rounded-lg space-y-2.5">
                        <div className="text-[10px] font-mono text-amber-400/90 uppercase tracking-wider font-semibold flex items-center gap-1.5">
                          <Lightbulb className="w-3.5 h-3.5 text-amber-400" />
                          <span>4. Anticipated Interviewer Follow-Ups &amp; Counter-Defenses</span>
                        </div>
                        <ul className="space-y-2">
                          {q.followUps.map((f, i) => (
                            <li key={i} className="text-xs font-sans text-zinc-300 leading-relaxed pl-2 border-l border-amber-400/40">
                              <RichContentRenderer content={f} />
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
