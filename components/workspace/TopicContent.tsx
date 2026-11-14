"use client";

import React, { useState } from "react";
import {
  CurriculumSubject,
  CurriculumModule,
  CurriculumTopic,
  CurriculumSubtopic,
  CurriculumQuestion,
  CurriculumLesson,
  LessonSection,
  LessonCheckpoint,
} from "@/lib/data/curriculum/types";
import { SelectedTopic } from "./WorkspaceShell";
import { WorkspaceTab } from "./WorkspaceNav";
import {
  ChevronLeft,
  ChevronRight,
  ChevronDown,
  ChevronUp,
  FlaskConical,
  ExternalLink,
  Code2,
  Calculator,
  AlertTriangle,
  Bookmark,
  CheckCircle2,
  Layers,
  ArrowRight,
} from "lucide-react";
import Link from "next/link";
import { idToSlug } from "@/lib/data/subjectSlugs";

interface TopicContentProps {
  subject: CurriculumSubject;
  selectedTopic: SelectedTopic;
  activeTab: WorkspaceTab;
  prevTopic: SelectedTopic | null;
  nextTopic: SelectedTopic | null;
  onNavigate: (module: CurriculumModule, topic: CurriculumTopic, lesson?: CurriculumLesson) => void;
  onToggleCompleteLesson?: (lessonId: string) => void;
  isLessonCompleted?: boolean;
}

const DIFFICULTY_BADGE: Record<string, string> = {
  Foundation: "text-emerald-400 border-emerald-800/40 bg-emerald-950/20",
  Intermediate: "text-amber-400 border-amber-800/40 bg-amber-950/20",
  Advanced: "text-red-400 border-red-800/40 bg-red-950/20",
};

// Map subject ID to the lab ID in InteractiveDemos and the homepage anchor
const SUBJECT_LAB_ID: Record<string, { labId: string; label: string }> = {
  os: { labId: "cpu-scheduling", label: "CPU Scheduling Simulator" },
  dbms: { labId: "db-indexing", label: "B+ Tree Indexing Simulator" },
  cn: { labId: "network-flow", label: "Network Packet Trace" },
  dsa: { labId: "dynamic-array", label: "Dynamic Array Resizing" },
  architecture: { labId: "cpu-datapath", label: "CPU Datapath Simulator" },
};

function QuestionItem({ q }: { q: CurriculumQuestion }) {
  const [expanded, setExpanded] = useState(false);

  const diffColor =
    q.difficulty === "Foundation"
      ? "text-emerald-400"
      : q.difficulty === "Intermediate"
      ? "text-amber-400"
      : "text-red-400";

  return (
    <div className="border border-zinc-800 rounded-lg overflow-hidden bg-[#0A0D14]">
      <button
        onClick={() => setExpanded((v) => !v)}
        className="w-full flex items-start justify-between gap-3 p-4 text-left hover:bg-zinc-900/40 transition-colors"
      >
        <div className="flex items-start gap-2.5 min-w-0">
          <span className={`text-[10px] font-mono flex-shrink-0 mt-0.5 px-1.5 py-0.5 rounded border border-zinc-800 bg-zinc-950 ${diffColor}`}>
            {q.type}
          </span>
          <span className="text-sm font-sans text-zinc-200 leading-snug">{q.statement}</span>
        </div>
        {expanded ? (
          <ChevronUp className="w-4 h-4 text-zinc-500 flex-shrink-0 mt-0.5" />
        ) : (
          <ChevronDown className="w-4 h-4 text-zinc-500 flex-shrink-0 mt-0.5" />
        )}
      </button>

      {expanded && (
        <div className="px-4 pb-5 pt-2 bg-[#06080D] border-t border-zinc-800/80 space-y-4">
          <div>
            <div className="text-[10px] font-mono text-amber-400 uppercase tracking-wider mb-2">
              First-Principles Explanation &amp; Solution:
            </div>
            <p className="text-sm text-zinc-300 font-sans leading-relaxed whitespace-pre-line">
              {q.explanation}
            </p>
          </div>

          {q.codeSnippet && (
            <div className="p-3 bg-zinc-950 border border-zinc-800/90 rounded text-xs font-mono text-zinc-300 overflow-x-auto whitespace-pre">
              {q.codeSnippet}
            </div>
          )}

          {q.hints && q.hints.length > 0 && (
            <div className="p-3 bg-zinc-900/40 border border-zinc-800/60 rounded">
              <div className="text-[10px] font-mono text-zinc-500 uppercase tracking-wider mb-1.5">
                Analytical Hints:
              </div>
              <ul className="space-y-1">
                {q.hints.map((h, i) => (
                  <li key={i} className="text-xs text-zinc-400 font-sans flex items-start gap-1.5">
                    <span className="text-amber-400/70 flex-shrink-0">→</span>
                    <span>{h}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {q.expectedOutcome && (
            <div className="text-xs font-mono text-emerald-400/90 bg-emerald-950/20 border border-emerald-900/30 p-2.5 rounded">
              <span className="text-emerald-500 font-bold uppercase tracking-wider text-[10px] mr-2">Evaluation Benchmark:</span>
              {q.expectedOutcome}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

function SubtopicSection({ sub }: { sub: CurriculumSubtopic }) {
  return (
    <div className="space-y-5">
      {/* Header */}
      <div className="flex items-center gap-2 flex-wrap">
        <span className="text-amber-400 font-mono text-xs">↳</span>
        <h3 className="text-lg font-serif text-white font-normal">{sub.title}</h3>
        <span className={`text-[10px] font-mono px-2 py-0.5 rounded border ${DIFFICULTY_BADGE[sub.difficulty]}`}>
          {sub.difficulty}
        </span>
      </div>

      {/* Primary Overview Description */}
      <p className="text-sm text-zinc-300 font-sans leading-relaxed">{sub.description}</p>

      {/* Detailed Technical Explanation (if present) */}
      {sub.detailedExplanation && (
        <div className="text-sm text-zinc-300 font-sans leading-relaxed space-y-3 whitespace-pre-line bg-[#080B10] p-4 rounded-md border border-zinc-800/70">
          {sub.detailedExplanation}
        </div>
      )}

      {/* Monospace Architecture Diagram (if present) */}
      {sub.architectureDiagram && (
        <div className="p-4 bg-[#05070B] border border-zinc-800 rounded-md font-mono text-xs space-y-2">
          <div className="flex items-center justify-between text-[10px] text-zinc-500 uppercase tracking-wider">
            <span className="text-amber-400 font-semibold">{sub.architectureDiagram.title}</span>
            <span>Architectural Schematic</span>
          </div>
          {sub.architectureDiagram.asciiArt && (
            <pre className="p-3 bg-black/60 rounded text-cyan-300/90 text-[11px] leading-tight overflow-x-auto border border-zinc-900">
              {sub.architectureDiagram.asciiArt}
            </pre>
          )}
          <p className="text-[11px] text-zinc-400 font-sans italic pt-1">
            {sub.architectureDiagram.caption}
          </p>
        </div>
      )}

      {/* Step-by-Step First Principles Mechanism (if present) */}
      {sub.firstPrinciplesStepByStep && sub.firstPrinciplesStepByStep.length > 0 && (
        <div className="space-y-2.5 p-4 bg-[#090C12] border border-zinc-800/80 rounded-md">
          <div className="text-[10px] font-mono text-amber-400 uppercase tracking-wider mb-1">
            Internal Mechanism — Step-by-Step Execution:
          </div>
          <ol className="space-y-2">
            {sub.firstPrinciplesStepByStep.map((step, sIdx) => (
              <li key={sIdx} className="flex items-start gap-2.5 text-xs text-zinc-300 font-sans leading-relaxed">
                <span className="text-[11px] font-mono text-amber-400/80 font-bold bg-amber-950/40 px-1.5 py-0.5 rounded border border-amber-800/30 flex-shrink-0">
                  {String(sIdx + 1).padStart(2, "0")}
                </span>
                <span className="pt-0.5">{step}</span>
              </li>
            ))}
          </ol>
        </div>
      )}

      {/* Numerical Example / Calculation Walkthrough (if present) */}
      {sub.numericalExample && (
        <div className="p-4 bg-[#070A0F] border border-zinc-800/90 rounded-md space-y-3">
          <div className="flex items-center gap-2 text-xs font-mono text-amber-400">
            <Calculator className="w-3.5 h-3.5" />
            <span className="font-semibold uppercase tracking-wider text-[11px]">
              Numerical Walkthrough: {sub.numericalExample.title}
            </span>
          </div>
          <p className="text-xs text-zinc-300 font-sans leading-relaxed">
            <strong className="text-zinc-200">Problem Scenario:</strong> {sub.numericalExample.scenario}
          </p>
          <div className="space-y-1.5 font-mono text-xs pl-2 border-l border-zinc-800">
            {sub.numericalExample.steps.map((st, i) => (
              <div key={i} className="text-zinc-400 text-[11px] leading-relaxed">
                <span className="text-amber-500/80 mr-1.5">•</span>
                {st}
              </div>
            ))}
          </div>
          <div className="p-2.5 bg-zinc-950 rounded border border-zinc-800/80 text-xs font-mono text-emerald-400">
            <span className="text-zinc-500 uppercase text-[10px] mr-2">Result:</span>
            {sub.numericalExample.conclusion}
          </div>
        </div>
      )}

      {/* Comparison Table (if present) */}
      {sub.comparisonTable && (
        <div className="p-4 bg-[#080B10] border border-zinc-800 rounded-md space-y-2.5">
          <div className="text-[10px] font-mono text-amber-400 uppercase tracking-wider">
            {sub.comparisonTable.title}
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs font-sans border-collapse">
              <thead>
                <tr className="border-b border-zinc-800 bg-zinc-900/60 font-mono text-[11px] text-zinc-400">
                  {sub.comparisonTable.headers.map((h, i) => (
                    <th key={i} className="p-2">
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-900">
                {sub.comparisonTable.rows.map((row, rIdx) => (
                  <tr key={rIdx} className="hover:bg-zinc-900/30">
                    {row.map((cell, cIdx) => (
                      <td key={cIdx} className="p-2 text-zinc-300 font-mono text-[11px]">
                        {cell}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Code Snippet (if present) */}
      {sub.codeSnippet && (
        <div className="p-4 bg-[#05070B] border border-zinc-800 rounded-md space-y-2">
          <div className="flex items-center justify-between text-xs font-mono text-zinc-500">
            <div className="flex items-center gap-1.5 text-zinc-300">
              <Code2 className="w-3.5 h-3.5 text-amber-400" />
              <span className="text-[11px] uppercase tracking-wider font-semibold">
                Kernel / Systems Implementation ({sub.codeSnippet.language})
              </span>
            </div>
          </div>
          <pre className="p-3 bg-zinc-950 rounded text-amber-200/90 font-mono text-xs overflow-x-auto border border-zinc-900 leading-relaxed">
            {sub.codeSnippet.code}
          </pre>
          <p className="text-xs text-zinc-400 font-sans leading-relaxed pt-1">
            {sub.codeSnippet.explanation}
          </p>
        </div>
      )}

      {/* Common Misconceptions Callout (if present) */}
      {sub.misconceptions && sub.misconceptions.length > 0 && (
        <div className="p-4 bg-red-950/15 border-l-2 border-red-500/70 rounded-r-md space-y-2">
          <div className="flex items-center gap-1.5 text-xs font-mono text-red-400 font-semibold">
            <AlertTriangle className="w-3.5 h-3.5 text-red-400" />
            <span className="uppercase tracking-wider text-[10px]">Common Engineering Misconceptions vs Reality:</span>
          </div>
          <ul className="space-y-1.5">
            {sub.misconceptions.map((m, i) => (
              <li key={i} className="text-xs text-zinc-300 font-sans leading-relaxed flex items-start gap-2">
                <span className="text-red-400/80 flex-shrink-0 mt-0.5">✕</span>
                <span>{m}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Real-World Engineering Context & Tradeoffs */}
      {(sub.engineeringContext || sub.realWorldImpact || sub.tradeoffs) && (
        <div className="p-3.5 bg-zinc-900/40 border border-zinc-800/70 rounded-md text-xs font-sans space-y-2">
          {sub.engineeringContext && (
            <p className="text-zinc-400 leading-relaxed">
              <span className="font-mono text-zinc-500 uppercase text-[10px] tracking-wider mr-2">Production Context:</span>
              {sub.engineeringContext}
            </p>
          )}
          {sub.realWorldImpact && (
            <p className="text-zinc-400 leading-relaxed">
              <span className="font-mono text-amber-400/80 uppercase text-[10px] tracking-wider mr-2">Real-World System:</span>
              {sub.realWorldImpact}
            </p>
          )}
          {sub.tradeoffs && (
            <p className="text-zinc-400 leading-relaxed">
              <span className="font-mono text-cyan-400/80 uppercase text-[10px] tracking-wider mr-2">Engineering Trade-offs:</span>
              {sub.tradeoffs}
            </p>
          )}
        </div>
      )}

      {/* Concept Tags */}
      {sub.concepts.length > 0 && (
        <div className="flex flex-wrap gap-1.5 pt-1">
          {sub.concepts.map((c) => (
            <span key={c} className="px-2 py-0.5 rounded text-[10px] font-mono text-zinc-400 bg-zinc-900 border border-zinc-800">
              {c}
            </span>
          ))}
        </div>
      )}

      {/* Key Takeaways */}
      {sub.keyTakeaways.length > 0 && (
        <div className="p-4 bg-[#080A0E] border-l-2 border-amber-400/60 rounded-r-md">
          <div className="text-[10px] font-mono text-amber-400/90 uppercase tracking-wider mb-2">
            Key Architectural Takeaways:
          </div>
          <ul className="space-y-2">
            {sub.keyTakeaways.map((t, i) => (
              <li key={i} className="text-xs sm:text-sm text-zinc-200 font-sans leading-relaxed flex items-start gap-2">
                <span className="text-amber-400 flex-shrink-0 mt-0.5">•</span>
                <span>{t}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}


function CheckpointItem({ cp }: { cp: LessonCheckpoint }) {
  const [revealed, setRevealed] = useState(false);

  return (
    <div className="p-4 bg-[#0A0D14] border border-zinc-800 rounded-lg space-y-3">
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-start gap-2">
          <span className="text-[10px] font-mono uppercase tracking-wider px-1.5 py-0.5 rounded border border-cyan-800/40 bg-cyan-950/20 text-cyan-400 flex-shrink-0 mt-0.5">
            Checkpoint
          </span>
          <span className="text-xs sm:text-sm font-sans font-medium text-zinc-200 leading-snug">
            {cp.question}
          </span>
        </div>
        <button
          onClick={() => setRevealed((v) => !v)}
          className="text-[11px] font-mono text-amber-400 hover:text-amber-300 flex-shrink-0 underline decoration-amber-400/40 underline-offset-2 transition-colors"
        >
          {revealed ? "Hide Answer" : "Reveal Answer"}
        </button>
      </div>

      {cp.hint && !revealed && (
        <p className="text-xs font-sans text-zinc-500 italic pl-1">
          💡 Hint: {cp.hint}
        </p>
      )}

      {revealed && (
        <div className="pt-3 border-t border-zinc-800/80 text-xs sm:text-sm text-zinc-300 font-sans leading-relaxed whitespace-pre-line bg-[#06080D] p-3 rounded">
          {cp.answer}
        </div>
      )}
    </div>
  );
}

function LessonSectionRenderer({ sec }: { sec: LessonSection }) {
  const typeBadge: Record<string, { label: string; color: string }> = {
    motivation: { label: "Why This Matters", color: "text-amber-400 border-amber-800/40 bg-amber-950/20" },
    prerequisite: { label: "Prerequisite Bridge", color: "text-zinc-400 border-zinc-800 bg-zinc-900" },
    intuition: { label: "Intuition & Mental Model", color: "text-cyan-400 border-cyan-800/40 bg-cyan-950/20" },
    definition: { label: "Formal Invariants", color: "text-blue-400 border-blue-800/40 bg-blue-950/20" },
    mechanism: { label: "Execution Mechanism", color: "text-emerald-400 border-emerald-800/40 bg-emerald-950/20" },
    example: { label: "Worked Example", color: "text-amber-400 border-amber-800/40 bg-amber-950/20" },
    diagram: { label: "Architecture Layout", color: "text-purple-400 border-purple-800/40 bg-purple-950/20" },
    system: { label: "Production OS Implementation", color: "text-emerald-400 border-emerald-800/40 bg-emerald-950/20" },
    tradeoffs: { label: "Trade-offs & Misconceptions", color: "text-red-400 border-red-800/40 bg-red-950/20" },
    checkpoint: { label: "Understanding Check", color: "text-amber-400 border-amber-800/40 bg-amber-950/20" },
  };

  const badge = sec.type && typeBadge[sec.type] ? typeBadge[sec.type] : null;

  return (
    <div className="space-y-4">
      {badge && (
        <div className="flex items-center gap-2">
          <span className={`text-[10px] font-mono px-2 py-0.5 rounded border ${badge.color}`}>
            {badge.label}
          </span>
          {sec.title && (
            <h3 className="text-base sm:text-lg font-serif text-white font-normal">
              {sec.title}
            </h3>
          )}
        </div>
      )}
      {!badge && sec.title && (
        <h3 className="text-base sm:text-lg font-serif text-white font-normal">
          {sec.title}
        </h3>
      )}

      {sec.content && (
        <div className="text-sm text-zinc-300 font-sans leading-relaxed whitespace-pre-line space-y-3">
          {sec.content}
        </div>
      )}

      {sec.architectureDiagram && (
        <div className="p-4 bg-[#05070B] border border-zinc-800 rounded-md space-y-2">
          <div className="flex items-center justify-between text-xs font-mono text-zinc-500">
            <div className="flex items-center gap-1.5 text-zinc-300">
              <Layers className="w-3.5 h-3.5 text-amber-400" />
              <span className="text-[11px] uppercase tracking-wider font-semibold">
                {sec.architectureDiagram.title}
              </span>
            </div>
          </div>
          {sec.architectureDiagram.asciiArt && (
            <pre className="p-3 bg-zinc-950 rounded text-emerald-400 font-mono text-xs overflow-x-auto border border-zinc-900 leading-relaxed">
              {sec.architectureDiagram.asciiArt}
            </pre>
          )}
          <p className="text-xs text-zinc-400 font-sans leading-relaxed italic">
            {sec.architectureDiagram.caption}
          </p>
        </div>
      )}

      {sec.numericalExample && (
        <div className="p-4 bg-[#0A0D14] border border-amber-400/20 rounded-md space-y-3">
          <div className="flex items-center gap-1.5 text-amber-400 text-xs font-mono font-semibold">
            <Calculator className="w-3.5 h-3.5" />
            <span className="uppercase tracking-wider">{sec.numericalExample.title}</span>
          </div>
          <p className="text-xs text-zinc-300 font-sans leading-relaxed">
            {sec.numericalExample.scenario}
          </p>
          <div className="space-y-1.5 pl-3 border-l border-amber-400/30">
            {sec.numericalExample.steps.map((st, i) => (
              <p key={i} className="text-xs font-mono text-zinc-300 leading-relaxed">
                {st}
              </p>
            ))}
          </div>
          <div className="p-2.5 bg-zinc-950/80 rounded border border-zinc-800 text-xs font-sans text-amber-300/90 font-medium">
            Conclusion: {sec.numericalExample.conclusion}
          </div>
        </div>
      )}

      {sec.codeSnippet && (
        <div className="p-4 bg-[#05070B] border border-zinc-800 rounded-md space-y-2">
          <div className="flex items-center justify-between text-xs font-mono text-zinc-500">
            <div className="flex items-center gap-1.5 text-zinc-300">
              <Code2 className="w-3.5 h-3.5 text-amber-400" />
              <span className="text-[11px] uppercase tracking-wider font-semibold">
                Systems Implementation ({sec.codeSnippet.language})
              </span>
            </div>
          </div>
          <pre className="p-3 bg-zinc-950 rounded text-amber-200/90 font-mono text-xs overflow-x-auto border border-zinc-900 leading-relaxed">
            {sec.codeSnippet.code}
          </pre>
          <p className="text-xs text-zinc-400 font-sans leading-relaxed pt-1">
            {sec.codeSnippet.explanation}
          </p>
        </div>
      )}

      {sec.comparisonTable && (
        <div className="p-4 bg-[#080A0E] border border-zinc-800 rounded-md space-y-3 overflow-x-auto">
          <div className="text-[11px] font-mono text-zinc-400 uppercase tracking-wider">
            {sec.comparisonTable.title}
          </div>
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="border-b border-zinc-800 text-zinc-500 font-mono text-[10px] uppercase">
                {sec.comparisonTable.headers.map((h, i) => (
                  <th key={i} className="p-2 pb-2.5 font-normal">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-900">
              {sec.comparisonTable.rows.map((row, rIdx) => (
                <tr key={rIdx} className="hover:bg-zinc-900/30">
                  {row.map((cell, cIdx) => (
                    <td key={cIdx} className="p-2 text-zinc-300 font-mono text-[11px]">
                      {cell}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {sec.misconceptions && sec.misconceptions.length > 0 && (
        <div className="p-4 bg-red-950/15 border-l-2 border-red-500/70 rounded-r-md space-y-2">
          <div className="flex items-center gap-1.5 text-xs font-mono text-red-400 font-semibold">
            <AlertTriangle className="w-3.5 h-3.5 text-red-400" />
            <span className="uppercase tracking-wider text-[10px]">Common Engineering Misconceptions vs Reality:</span>
          </div>
          <ul className="space-y-1.5">
            {sec.misconceptions.map((m, i) => (
              <li key={i} className="text-xs text-zinc-300 font-sans leading-relaxed flex items-start gap-2">
                <span className="text-red-400/80 flex-shrink-0 mt-0.5">✕</span>
                <span>{m}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {sec.keyTakeaways && sec.keyTakeaways.length > 0 && (
        <div className="p-4 bg-[#080A0E] border-l-2 border-amber-400/60 rounded-r-md">
          <div className="text-[10px] font-mono text-amber-400/90 uppercase tracking-wider mb-2">
            Key Architectural Takeaways:
          </div>
          <ul className="space-y-2">
            {sec.keyTakeaways.map((t, i) => (
              <li key={i} className="text-xs sm:text-sm text-zinc-200 font-sans leading-relaxed flex items-start gap-2">
                <span className="text-amber-400 flex-shrink-0 mt-0.5">•</span>
                <span>{t}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

interface LessonViewProps {
  subject: CurriculumSubject;
  module: CurriculumModule;
  topic: CurriculumTopic;
  lesson: CurriculumLesson;
  activeTab: WorkspaceTab;
  prevTopic: SelectedTopic | null;
  nextTopic: SelectedTopic | null;
  onNavigate: (module: CurriculumModule, topic: CurriculumTopic, lesson?: CurriculumLesson) => void;
  onToggleCompleteLesson?: (lessonId: string) => void;
  isLessonCompleted?: boolean;
}

function LessonView({
  subject,
  module: mod,
  topic,
  lesson,
  activeTab,
  prevTopic,
  nextTopic,
  onNavigate,
  onToggleCompleteLesson,
  isLessonCompleted,
}: LessonViewProps) {
  const lab = lesson.labRef
    ? { labId: lesson.labRef.labId, label: lesson.labRef.label, goal: lesson.labRef.experimentGoal }
    : topic.labRef
    ? { labId: topic.labRef.labId, label: topic.labRef.label, goal: topic.labRef.experimentGoal }
    : SUBJECT_LAB_ID[subject.id]
    ? { ...SUBJECT_LAB_ID[subject.id], goal: `Experiment with interactive parameters and observe state changes.` }
    : null;

  const questions = lesson.questions ?? [];
  const practiceQuestions = questions.filter((q) => q.type !== "Interview");
  const interviewQuestions = questions.filter((q) => q.type === "Interview");

  return (
    <div className="max-w-3xl mx-auto px-5 sm:px-8 py-8 space-y-10">
      {/* ── Breadcrumb ── */}
      <div className="text-xs font-mono text-zinc-600 flex items-center gap-1.5 flex-wrap">
        <span className="text-amber-400">{subject.shortName}</span>
        <ChevronRight className="w-3 h-3" />
        <span className="text-zinc-500">{mod.title}</span>
        <ChevronRight className="w-3 h-3" />
        <span className="text-zinc-500">{topic.title}</span>
        <ChevronRight className="w-3 h-3" />
        <span className="text-zinc-300 font-medium">{lesson.title}</span>
      </div>

      {/* ── Lesson header ── */}
      <div className="space-y-4">
        <div className="flex items-center justify-between gap-3 flex-wrap">
          <div className="flex items-center gap-2">
            <span className={`text-[11px] font-mono px-2 py-0.5 rounded border ${DIFFICULTY_BADGE[lesson.difficulty]}`}>
              {lesson.difficulty}
            </span>
            {lesson.estimatedMinutes && (
              <span className="text-[11px] font-mono text-zinc-500">
                ~{lesson.estimatedMinutes} min study
              </span>
            )}
            {isLessonCompleted && (
              <span className="text-[11px] font-mono text-emerald-400 px-2 py-0.5 rounded border border-emerald-800/40 bg-emerald-950/20 flex items-center gap-1">
                <CheckCircle2 className="w-3 h-3" /> Completed
              </span>
            )}
          </div>

          {onToggleCompleteLesson && (
            <button
              onClick={() => onToggleCompleteLesson(lesson.id)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded text-xs font-mono transition-all border ${
                isLessonCompleted
                  ? "bg-emerald-950/40 text-emerald-300 border-emerald-700/60 hover:bg-emerald-950/60"
                  : "bg-zinc-900 text-zinc-300 border-zinc-700 hover:text-white hover:border-amber-400/50"
              }`}
            >
              <CheckCircle2 className={`w-3.5 h-3.5 ${isLessonCompleted ? "text-emerald-400" : "text-zinc-500"}`} />
              <span>{isLessonCompleted ? "Completed (Click to Reset)" : "Mark as Complete"}</span>
            </button>
          )}
        </div>

        <h1 className="text-2xl sm:text-4xl font-serif text-white font-normal leading-tight">
          {lesson.title}
        </h1>
        {lesson.shortDescription && (
          <p className="text-sm sm:text-base text-zinc-400 font-sans leading-relaxed">
            {lesson.shortDescription}
          </p>
        )}
      </div>

      {/* ── Tab: LEARN ── */}
      {activeTab === "learn" && (
        <div className="space-y-10">
          {/* Detailed Explanation / Narrative */}
          {lesson.detailedExplanation && (
            <div className="text-sm text-zinc-300 font-sans leading-relaxed whitespace-pre-line space-y-4">
              {lesson.detailedExplanation}
            </div>
          )}

          {/* First Principles Step-by-Step */}
          {lesson.firstPrinciplesStepByStep && lesson.firstPrinciplesStepByStep.length > 0 && (
            <div className="p-4 bg-[#090C12] border border-zinc-800 rounded-md space-y-3">
              <div className="text-[10px] font-mono text-amber-400 uppercase tracking-wider">
                First-Principles Execution Trace:
              </div>
              <ol className="space-y-2">
                {lesson.firstPrinciplesStepByStep.map((step, i) => (
                  <li key={i} className="flex items-start gap-2.5 text-xs sm:text-sm text-zinc-300 font-sans leading-relaxed">
                    <span className="text-amber-400 font-mono text-xs flex-shrink-0 mt-0.5">
                      {String(i + 1).padStart(2, "0")}.
                    </span>
                    <span>{step}</span>
                  </li>
                ))}
              </ol>
            </div>
          )}

          {/* Sections (Structured 10-step progression) */}
          {lesson.sections && lesson.sections.length > 0 && (
            <div className="space-y-8">
              {lesson.sections.map((sec, idx) => (
                <div key={idx} className="pt-6 border-t border-zinc-800/60 first:border-t-0 first:pt-0">
                  <LessonSectionRenderer sec={sec} />
                </div>
              ))}
            </div>
          )}

          {/* Direct Diagrams */}
          {lesson.architectureDiagram && (
            <div className="p-4 bg-[#05070B] border border-zinc-800 rounded-md space-y-2">
              <div className="flex items-center gap-1.5 text-zinc-300 text-xs font-mono">
                <Layers className="w-3.5 h-3.5 text-amber-400" />
                <span className="text-[11px] uppercase tracking-wider font-semibold">
                  {lesson.architectureDiagram.title}
                </span>
              </div>
              {lesson.architectureDiagram.asciiArt && (
                <pre className="p-3 bg-zinc-950 rounded text-emerald-400 font-mono text-xs overflow-x-auto border border-zinc-900 leading-relaxed">
                  {lesson.architectureDiagram.asciiArt}
                </pre>
              )}
              <p className="text-xs text-zinc-400 font-sans leading-relaxed italic">
                {lesson.architectureDiagram.caption}
              </p>
            </div>
          )}

          {/* Direct Numerical Examples */}
          {lesson.numericalExample && (
            <div className="p-4 bg-[#0A0D14] border border-amber-400/20 rounded-md space-y-3">
              <div className="flex items-center gap-1.5 text-amber-400 text-xs font-mono font-semibold">
                <Calculator className="w-3.5 h-3.5" />
                <span className="uppercase tracking-wider">{lesson.numericalExample.title}</span>
              </div>
              <p className="text-xs text-zinc-300 font-sans leading-relaxed">
                {lesson.numericalExample.scenario}
              </p>
              <div className="space-y-1.5 pl-3 border-l border-amber-400/30">
                {lesson.numericalExample.steps.map((st, i) => (
                  <p key={i} className="text-xs font-mono text-zinc-300 leading-relaxed">
                    {st}
                  </p>
                ))}
              </div>
              <div className="p-2.5 bg-zinc-950/80 rounded border border-zinc-800 text-xs font-sans text-amber-300/90 font-medium">
                Conclusion: {lesson.numericalExample.conclusion}
              </div>
            </div>
          )}

          {/* Direct Code Snippet */}
          {lesson.codeSnippet && (
            <div className="p-4 bg-[#05070B] border border-zinc-800 rounded-md space-y-2">
              <div className="flex items-center gap-1.5 text-zinc-300 text-xs font-mono">
                <Code2 className="w-3.5 h-3.5 text-amber-400" />
                <span className="text-[11px] uppercase tracking-wider font-semibold">
                  Systems Implementation ({lesson.codeSnippet.language})
                </span>
              </div>
              <pre className="p-3 bg-zinc-950 rounded text-amber-200/90 font-mono text-xs overflow-x-auto border border-zinc-900 leading-relaxed">
                {lesson.codeSnippet.code}
              </pre>
              <p className="text-xs text-zinc-400 font-sans leading-relaxed pt-1">
                {lesson.codeSnippet.explanation}
              </p>
            </div>
          )}

          {/* Direct Comparison Table */}
          {lesson.comparisonTable && (
            <div className="p-4 bg-[#080A0E] border border-zinc-800 rounded-md space-y-3 overflow-x-auto">
              <div className="text-[11px] font-mono text-zinc-400 uppercase tracking-wider">
                {lesson.comparisonTable.title}
              </div>
              <table className="w-full text-left border-collapse text-xs">
                <thead>
                  <tr className="border-b border-zinc-800 text-zinc-500 font-mono text-[10px] uppercase">
                    {lesson.comparisonTable.headers.map((h, i) => (
                      <th key={i} className="p-2 pb-2.5 font-normal">
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-zinc-900">
                  {lesson.comparisonTable.rows.map((row, rIdx) => (
                    <tr key={rIdx} className="hover:bg-zinc-900/30">
                      {row.map((cell, cIdx) => (
                        <td key={cIdx} className="p-2 text-zinc-300 font-mono text-[11px]">
                          {cell}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {/* Common Misconceptions */}
          {lesson.misconceptions && lesson.misconceptions.length > 0 && (
            <div className="p-4 bg-red-950/15 border-l-2 border-red-500/70 rounded-r-md space-y-2">
              <div className="flex items-center gap-1.5 text-xs font-mono text-red-400 font-semibold">
                <AlertTriangle className="w-3.5 h-3.5 text-red-400" />
                <span className="uppercase tracking-wider text-[10px]">Common Engineering Misconceptions vs Reality:</span>
              </div>
              <ul className="space-y-1.5">
                {lesson.misconceptions.map((m, i) => (
                  <li key={i} className="text-xs text-zinc-300 font-sans leading-relaxed flex items-start gap-2">
                    <span className="text-red-400/80 flex-shrink-0 mt-0.5">✕</span>
                    <span>{m}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Key Takeaways */}
          {lesson.keyTakeaways && lesson.keyTakeaways.length > 0 && (
            <div className="p-4 bg-[#080A0E] border-l-2 border-amber-400/60 rounded-r-md">
              <div className="text-[10px] font-mono text-amber-400/90 uppercase tracking-wider mb-2">
                Key Architectural Takeaways:
              </div>
              <ul className="space-y-2">
                {lesson.keyTakeaways.map((t, i) => (
                  <li key={i} className="text-xs sm:text-sm text-zinc-200 font-sans leading-relaxed flex items-start gap-2">
                    <span className="text-amber-400 flex-shrink-0 mt-0.5">•</span>
                    <span>{t}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Understanding Checkpoints */}
          {lesson.checkpoints && lesson.checkpoints.length > 0 && (
            <div className="space-y-4 pt-4 border-t border-zinc-800/80">
              <div className="text-xs font-mono text-amber-400 uppercase tracking-wider flex items-center gap-2">
                <span>Self-Assessment Checkpoints</span>
                <span className="text-zinc-600">({lesson.checkpoints.length})</span>
              </div>
              <div className="space-y-3">
                {lesson.checkpoints.map((cp, idx) => (
                  <CheckpointItem key={idx} cp={cp} />
                ))}
              </div>
            </div>
          )}

          {/* Mapped Questions in Learn tab */}
          {questions.length > 0 && (
            <div className="space-y-4 pt-4 border-t border-zinc-800/80">
              <div className="text-xs font-mono text-amber-400 uppercase tracking-wider flex items-center justify-between">
                <span>Associated Mastery Questions</span>
                <span className="text-zinc-600">({questions.length})</span>
              </div>
              <div className="space-y-3">
                {questions.map((q) => (
                  <QuestionItem key={q.id} q={q} />
                ))}
              </div>
            </div>
          )}

          {/* Interactive Lab Banner */}
          {lab && (
            <div className="p-5 bg-[#0E1117] border border-amber-400/20 rounded-lg flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="space-y-1">
                <div className="text-[10px] font-mono text-amber-400 uppercase tracking-wider flex items-center gap-1.5">
                  <FlaskConical className="w-3.5 h-3.5" />
                  Interactive Laboratory Active
                </div>
                <p className="text-sm font-sans font-medium text-white">{lab.label}</p>
                <p className="text-xs text-zinc-400 font-sans">{lab.goal}</p>
              </div>
              <Link
                href={`/#lab-${lab.labId}`}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded text-xs font-mono text-amber-400 bg-amber-950/20 border border-amber-400/30 hover:bg-amber-950/40 transition-colors flex-shrink-0"
              >
                <span>Launch Interactive Demo</span>
                <ExternalLink className="w-3 h-3" />
              </Link>
            </div>
          )}
        </div>
      )}

      {/* ── Tab: PRACTICE ── */}
      {activeTab === "practice" && (
        <div className="space-y-6">
          <div>
            <h2 className="text-lg font-serif text-white font-normal mb-1">
              Practice Questions
            </h2>
            <p className="text-xs text-zinc-400 font-sans">
              Test your foundational and problem-solving understanding of {lesson.title}.
            </p>
          </div>
          {practiceQuestions.length > 0 ? (
            <div className="space-y-4">
              {practiceQuestions.map((q) => (
                <QuestionItem key={q.id} q={q} />
              ))}
            </div>
          ) : (
            <div className="p-6 text-center border border-dashed border-zinc-800 rounded-lg text-xs font-mono text-zinc-600">
              Practice questions are mapped in the comprehensive exam bank.
            </div>
          )}
        </div>
      )}

      {/* ── Tab: INTERVIEW ── */}
      {activeTab === "interview" && (
        <div className="space-y-6">
          <div>
            <h2 className="text-lg font-serif text-white font-normal mb-1">
              Interview Questions
            </h2>
            <p className="text-xs text-zinc-400 font-sans">
              High-frequency systems design and kernel architecture interview questions.
            </p>
          </div>
          {interviewQuestions.length > 0 ? (
            <div className="space-y-4">
              {interviewQuestions.map((q) => (
                <QuestionItem key={q.id} q={q} />
              ))}
            </div>
          ) : (
            <div className="p-6 text-center border border-dashed border-zinc-800 rounded-lg text-xs font-mono text-zinc-600">
              General systems interview questions available in the top navigation.
            </div>
          )}
        </div>
      )}

      {/* ── Tab: LAB ── */}
      {activeTab === "lab" && (
        <div className="space-y-6">
          <div>
            <h2 className="text-lg font-serif text-white font-normal mb-1">
              Interactive Lab
            </h2>
            <p className="text-xs text-zinc-400 font-sans">
              Live hands-on verification and visualization for {lesson.title}.
            </p>
          </div>
          {lab ? (
            <div className="p-6 bg-[#0E1117] border border-zinc-800 rounded-lg space-y-4">
              <div className="flex items-center gap-2">
                <FlaskConical className="w-4 h-4 text-amber-400" />
                <span className="text-sm font-sans font-medium text-white">{lab.label}</span>
              </div>
              <p className="text-xs text-zinc-400 font-sans leading-relaxed">{lab.goal}</p>
              <Link
                href={`/#lab-${lab.labId}`}
                className="inline-flex items-center gap-2 px-4 py-2 rounded text-xs font-mono text-zinc-950 bg-amber-400 hover:bg-amber-300 font-medium transition-colors"
              >
                <span>Open Fullscreen Lab Workbench</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          ) : (
            <div className="p-6 text-center border border-dashed border-zinc-800 rounded-lg text-xs font-mono text-zinc-600">
              No interactive lab assigned to this specific lesson yet.
            </div>
          )}
        </div>
      )}

      {/* ── Tab: REVISION ── */}
      {activeTab === "revision" && (
        <div className="space-y-6">
          <div>
            <h2 className="text-lg font-serif text-white font-normal mb-1">
              Rapid Revision Sheet
            </h2>
            <p className="text-xs text-zinc-400 font-sans">
              High-yield memory anchors and core invariant review for {lesson.title}.
            </p>
          </div>
          {lesson.keyTakeaways && lesson.keyTakeaways.length > 0 && (
            <div className="p-4 bg-[#080A0E] border-l-2 border-amber-400/60 rounded-r-md space-y-2">
              <div className="text-[10px] font-mono text-amber-400 uppercase tracking-wider">
                Core Invariants:
              </div>
              <ul className="space-y-1.5">
                {lesson.keyTakeaways.map((t, i) => (
                  <li key={i} className="text-xs text-zinc-200 font-sans leading-relaxed flex items-start gap-2">
                    <span className="text-amber-400 flex-shrink-0">•</span>
                    <span>{t}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
          {lesson.concepts && lesson.concepts.length > 0 && (
            <div className="p-4 bg-zinc-900/40 border border-zinc-800 rounded-lg space-y-2">
              <div className="text-[10px] font-mono text-zinc-500 uppercase tracking-wider">
                Vocabulary &amp; Primitives:
              </div>
              <div className="flex flex-wrap gap-1.5">
                {lesson.concepts.map((c) => (
                  <span key={c} className="px-2 py-0.5 rounded text-[11px] font-mono text-zinc-300 bg-zinc-950 border border-zinc-800">
                    {c}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {/* ── Prev / Next Navigation ── */}
      <div className="pt-8 border-t border-zinc-800 flex items-center justify-between gap-4">
        {prevTopic ? (
          <button
            onClick={() => onNavigate(prevTopic.module, prevTopic.topic, prevTopic.lesson)}
            className="flex items-start gap-2 p-3 rounded border border-zinc-800 hover:border-zinc-700 hover:bg-zinc-900/40 transition-all text-left max-w-xs"
          >
            <ChevronLeft className="w-4 h-4 text-zinc-500 mt-0.5 flex-shrink-0" />
            <div>
              <div className="text-[10px] font-mono text-zinc-600 uppercase tracking-wider mb-0.5">Previous</div>
              <div className="text-xs font-sans text-zinc-300 leading-snug line-clamp-1">
                {prevTopic.lesson ? prevTopic.lesson.title : prevTopic.topic.title}
              </div>
            </div>
          </button>
        ) : (
          <div />
        )}

        {/* Center: Mark complete and proceed */}
        {nextTopic && onToggleCompleteLesson && !isLessonCompleted && (
          <button
            onClick={() => {
              onToggleCompleteLesson(lesson.id);
              onNavigate(nextTopic.module, nextTopic.topic, nextTopic.lesson);
            }}
            className="hidden sm:flex items-center gap-2 px-4 py-2 bg-amber-400 hover:bg-amber-300 text-zinc-950 font-mono text-xs font-medium rounded transition-colors"
          >
            <span>Complete &amp; Next</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        )}

        {nextTopic ? (
          <button
            onClick={() => onNavigate(nextTopic.module, nextTopic.topic, nextTopic.lesson)}
            className="flex items-start gap-2 p-3 rounded border border-zinc-800 hover:border-zinc-700 hover:bg-zinc-900/40 transition-all text-right max-w-xs ml-auto"
          >
            <div>
              <div className="text-[10px] font-mono text-zinc-600 uppercase tracking-wider mb-0.5">Next</div>
              <div className="text-xs font-sans text-zinc-300 leading-snug line-clamp-1">
                {nextTopic.lesson ? nextTopic.lesson.title : nextTopic.topic.title}
              </div>
            </div>
            <ChevronRight className="w-4 h-4 text-zinc-500 mt-0.5 flex-shrink-0" />
          </button>
        ) : (
          <div />
        )}
      </div>
    </div>
  );
}

export const TopicContent: React.FC<TopicContentProps> = ({
  onToggleCompleteLesson,
  isLessonCompleted,
  subject,
  selectedTopic,
  activeTab,
  prevTopic,
  nextTopic,
  onNavigate,
}) => {
  const { module: mod, topic } = selectedTopic;

  if (selectedTopic.lesson) {
    return (
      <LessonView
        subject={subject}
        module={mod}
        topic={topic}
        lesson={selectedTopic.lesson}
        activeTab={activeTab}
        prevTopic={prevTopic}
        nextTopic={nextTopic}
        onNavigate={onNavigate}
        onToggleCompleteLesson={onToggleCompleteLesson}
        isLessonCompleted={isLessonCompleted}
      />
    );
  }
  const allQuestions = topic.subtopics.flatMap((s) => s.questions);
  const lab = topic.labRef
    ? { labId: topic.labRef.labId, label: topic.labRef.label, goal: topic.labRef.experimentGoal }
    : SUBJECT_LAB_ID[subject.id]
    ? { ...SUBJECT_LAB_ID[subject.id], goal: `Experiment with interactive parameters and observe state changes.` }
    : null;

  return (
    <div className="max-w-3xl mx-auto px-5 sm:px-8 py-8 space-y-10">

      {/* ── Breadcrumb ── */}
      <div className="text-xs font-mono text-zinc-600 flex items-center gap-1.5 flex-wrap">
        <span className="text-amber-400">{subject.shortName}</span>
        <ChevronRight className="w-3 h-3" />
        <span className="text-zinc-500">{mod.title}</span>
        <ChevronRight className="w-3 h-3" />
        <span className="text-zinc-300">{topic.title}</span>
      </div>

      {/* ── Topic header ── */}
      <div className="space-y-3">
        <div className="flex items-center gap-2 flex-wrap">
          <span className={`text-[11px] font-mono px-2 py-0.5 rounded border ${DIFFICULTY_BADGE[topic.difficulty]}`}>
            {topic.difficulty}
          </span>
          {topic.estimatedHours && (
            <span className="text-[11px] font-mono text-zinc-500">
              ~{topic.estimatedHours}h deep study
            </span>
          )}
        </div>
        <h1 className="text-2xl sm:text-4xl font-serif text-white font-normal leading-tight">
          {topic.title}
        </h1>
        <p className="text-sm text-zinc-400 font-sans leading-relaxed">
          {topic.description}
        </p>
      </div>

      {/* ── Tab: LEARN ── */}
      {activeTab === "learn" && (
        <div className="space-y-10">

          {/* Learning objectives */}
          {topic.learningObjectives.length > 0 && (
            <div className="p-4 bg-[#090C12] border border-zinc-800 rounded-md">
              <div className="text-[10px] font-mono text-zinc-500 uppercase tracking-wider mb-3">
                Learning Objectives
              </div>
              <ul className="space-y-2">
                {topic.learningObjectives.map((obj, i) => (
                  <li key={i} className="flex items-start gap-2 text-xs sm:text-sm text-zinc-300 font-sans leading-relaxed">
                    <span className="text-amber-400 font-mono text-xs flex-shrink-0 mt-0.5">
                      {String(i + 1).padStart(2, "0")}.
                    </span>
                    <span>{obj}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Prerequisites for this topic */}
          {topic.prerequisites && topic.prerequisites.length > 0 && (
            <div className="p-3 bg-[#0E1117] border border-zinc-800 rounded text-xs font-mono text-zinc-400">
              <span className="text-zinc-500 uppercase tracking-wider mr-2">Prerequisites:</span>
              {topic.prerequisites.join(" · ")}
            </div>
          )}

          {/* Subtopics */}
          <div className="space-y-12">
            {topic.subtopics.map((sub) => (
              <div key={sub.id} className="pt-6 border-t border-zinc-800/60">
                <SubtopicSection sub={sub} />
              </div>
            ))}
          </div>

          {/* Interview benchmark for this module */}
          {mod.interviewBenchmark && (
            <div className="p-5 bg-[#0E1117] border border-zinc-800 rounded-lg space-y-2">
              <div className="text-[10px] font-mono text-amber-400 uppercase tracking-wider">
                Module Synthesis Benchmark:
              </div>
              <p className="text-sm font-serif italic text-zinc-200 leading-relaxed">
                &ldquo;{mod.interviewBenchmark}&rdquo;
              </p>
            </div>
          )}

          {/* Lab teaser */}
          {lab && (
            <div className="p-5 bg-[#0E1117] border border-amber-400/20 rounded-lg flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="space-y-1">
                <div className="text-[10px] font-mono text-amber-400 uppercase tracking-wider flex items-center gap-1.5">
                  <FlaskConical className="w-3.5 h-3.5" />
                  Interactive Laboratory Active
                </div>
                <p className="text-sm font-sans font-medium text-white">{lab.label}</p>
                <p className="text-xs text-zinc-400 font-sans">{lab.goal}</p>
              </div>
              <a
                href="/#demonstrations"
                className="flex-shrink-0 inline-flex items-center gap-1.5 px-4 py-2 text-xs font-mono text-amber-300 border border-amber-400/40 rounded bg-amber-950/20 hover:bg-amber-900/30 transition-colors"
              >
                <span>Launch Simulator</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          )}
        </div>
      )}

      {/* ── Tab: LAB ── */}
      {activeTab === "lab" && (
        <div className="space-y-6">
          {lab ? (
            <div className="space-y-6">
              <div className="text-[11px] font-mono text-zinc-500 uppercase tracking-wider">
                Interactive Technical Laboratory
              </div>
              <div className="p-8 bg-[#0E1117] border border-zinc-800 rounded-lg text-center space-y-4">
                <FlaskConical className="w-10 h-10 text-amber-400 mx-auto" />
                <div className="space-y-2">
                  <h3 className="text-xl font-serif text-white">{lab.label}</h3>
                  <p className="text-sm text-zinc-400 font-sans leading-relaxed max-w-lg mx-auto">
                    {lab.goal}
                  </p>
                </div>
                <div className="pt-2">
                  <a
                    href="/#demonstrations"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-6 py-2.5 bg-amber-400 hover:bg-amber-300 text-zinc-950 font-semibold text-sm rounded transition-colors font-sans"
                  >
                    <span>Open Laboratory Instrument</span>
                    <ExternalLink className="w-4 h-4" />
                  </a>
                </div>
                <p className="text-[11px] font-mono text-zinc-500 pt-2">
                  The simulator runs live on the hardware workbench. Opens in a dedicated viewport for side-by-side study.
                </p>
              </div>
            </div>
          ) : (
            <div className="p-8 text-center bg-[#0E1117] border border-zinc-800 rounded-lg">
              <FlaskConical className="w-8 h-8 text-zinc-700 mx-auto mb-3" />
              <p className="text-sm text-zinc-500 font-sans">
                An interactive simulator for {topic.title} is currently mapped in curriculum engineering.
              </p>
            </div>
          )}
        </div>
      )}

      {/* ── Tab: PRACTICE ── */}
      {activeTab === "practice" && (
        <div className="space-y-6">
          <div className="flex items-center justify-between pb-2 border-b border-zinc-800">
            <div className="text-[11px] font-mono text-zinc-500 uppercase tracking-wider">
              Practice Questions &amp; Analytical Problems ({allQuestions.length})
            </div>
            <span className="text-xs font-mono text-zinc-500">Topic: {topic.title}</span>
          </div>

          {allQuestions.length === 0 ? (
            <p className="text-sm text-zinc-500 font-sans py-8 text-center bg-[#0E1117] rounded border border-zinc-800">
              No practice questions for this topic yet.
            </p>
          ) : (
            <div className="space-y-4">
              {allQuestions.map((q) => (
                <QuestionItem key={q.id} q={q} />
              ))}
            </div>
          )}
        </div>
      )}

      {/* ── Tab: INTERVIEW ── */}
      {activeTab === "interview" && (
        <div className="space-y-6">
          <div className="flex items-center justify-between pb-2 border-b border-zinc-800">
            <div className="text-[11px] font-mono text-zinc-500 uppercase tracking-wider">
              Technical Interview Questions &amp; Synthesis
            </div>
            <span className="text-xs font-mono text-zinc-500">{topic.title}</span>
          </div>

          {/* Module benchmark */}
          {mod.interviewBenchmark && (
            <div className="p-5 bg-[#0C0F17] border border-amber-400/25 rounded-lg space-y-2">
              <div className="text-[10px] font-mono text-amber-400 uppercase tracking-wider">
                Module Core Interview Benchmark:
              </div>
              <p className="text-sm font-serif italic text-zinc-100 leading-relaxed">
                &ldquo;{mod.interviewBenchmark}&rdquo;
              </p>
            </div>
          )}

          {/* Filter for Interview/FollowUp/Analytical type */}
          {(() => {
            const iqQuestions = allQuestions.filter(
              (q) => q.type === "Interview" || q.type === "FollowUp" || q.type === "Analytical"
            );
            if (iqQuestions.length === 0) {
              return (
                <div className="p-8 text-center bg-[#0E1117] border border-zinc-800 rounded-lg">
                  <p className="text-sm text-zinc-400 font-sans">
                    All foundational questions for this topic are available under the Practice tab.
                  </p>
                </div>
              );
            }
            return (
              <div className="space-y-4">
                {iqQuestions.map((q) => (
                  <QuestionItem key={q.id} q={q} />
                ))}
              </div>
            );
          })()}
        </div>
      )}

      {/* ── Tab: REVISION ── */}
      {activeTab === "revision" && (
        <div className="space-y-8">
          <div className="flex items-center justify-between pb-2 border-b border-zinc-800">
            <div className="text-[11px] font-mono text-zinc-500 uppercase tracking-wider">
              Executive Revision &amp; High-Yield Formulas
            </div>
            <span className="text-xs font-mono text-amber-400">{topic.title}</span>
          </div>

          {topic.revision ? (
            <div className="space-y-6">
              {/* Executive Summary */}
              <div className="p-5 bg-[#0A0D14] border border-zinc-800 rounded-lg space-y-2">
                <div className="text-[10px] font-mono text-amber-400 uppercase tracking-wider">
                  Executive Concept Summary:
                </div>
                <p className="text-sm text-zinc-200 font-sans leading-relaxed">
                  {topic.revision.summary}
                </p>
              </div>

              {/* Formulas & Rules */}
              {topic.revision.keyFormulasAndRules && topic.revision.keyFormulasAndRules.length > 0 && (
                <div className="p-5 bg-[#070A0F] border border-zinc-800 rounded-lg space-y-3">
                  <div className="text-[10px] font-mono text-cyan-400 uppercase tracking-wider">
                    Core Mathematical Formulas &amp; System Invariants:
                  </div>
                  <ul className="space-y-2 font-mono text-xs text-zinc-300">
                    {topic.revision.keyFormulasAndRules.map((rule, rIdx) => (
                      <li key={rIdx} className="p-2.5 bg-black/50 border border-zinc-800/80 rounded flex items-start gap-2">
                        <span className="text-cyan-400 font-bold">#</span>
                        <span className="leading-relaxed">{rule}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Comparison Table */}
              {topic.revision.comparisonTable && (
                <div className="p-5 bg-[#080B10] border border-zinc-800 rounded-lg space-y-3">
                  <div className="text-[10px] font-mono text-amber-400 uppercase tracking-wider">
                    {topic.revision.comparisonTable.title}
                  </div>
                  <div className="overflow-x-auto">
                    <table className="w-full text-left text-xs font-sans border-collapse">
                      <thead>
                        <tr className="border-b border-zinc-800 bg-zinc-900/60 font-mono text-[11px] text-zinc-400">
                          {topic.revision.comparisonTable.headers.map((h, i) => (
                            <th key={i} className="p-2.5">
                              {h}
                            </th>
                          ))}
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-zinc-900">
                        {topic.revision.comparisonTable.rows.map((row, rIdx) => (
                          <tr key={rIdx} className="hover:bg-zinc-900/30">
                            {row.map((cell, cIdx) => (
                              <td key={cIdx} className="p-2.5 text-zinc-300 font-mono text-[11px]">
                                {cell}
                              </td>
                            ))}
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

              {/* High-Yield Points */}
              {topic.revision.highYieldPoints.length > 0 && (
                <div className="p-5 bg-[#090C12] border border-zinc-800 rounded-lg space-y-3">
                  <div className="text-[10px] font-mono text-emerald-400 uppercase tracking-wider">
                    High-Yield Exam &amp; Interview Invariants:
                  </div>
                  <ul className="space-y-2">
                    {topic.revision.highYieldPoints.map((pt, pIdx) => (
                      <li key={pIdx} className="flex items-start gap-2 text-xs sm:text-sm text-zinc-200 font-sans leading-relaxed">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0 mt-0.5" />
                        <span>{pt}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Common Pitfalls */}
              {topic.revision.commonPitfalls && topic.revision.commonPitfalls.length > 0 && (
                <div className="p-5 bg-red-950/15 border border-red-900/40 rounded-lg space-y-3">
                  <div className="text-[10px] font-mono text-red-400 uppercase tracking-wider flex items-center gap-1.5">
                    <AlertTriangle className="w-3.5 h-3.5 text-red-400" />
                    <span>Common Interview Traps &amp; Pitfalls:</span>
                  </div>
                  <ul className="space-y-2">
                    {topic.revision.commonPitfalls.map((pit, pitIdx) => (
                      <li key={pitIdx} className="flex items-start gap-2 text-xs text-zinc-300 font-sans leading-relaxed">
                        <span className="text-red-400 flex-shrink-0 mt-0.5">⚠️</span>
                        <span>{pit}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          ) : (
            /* Fallback dynamic revision synthesis from subtopic takeaways and concepts */
            <div className="space-y-6">
              <div className="p-5 bg-[#0A0D14] border border-zinc-800 rounded-lg space-y-2">
                <div className="text-[10px] font-mono text-amber-400 uppercase tracking-wider">
                  Topic Core Invariant:
                </div>
                <p className="text-sm text-zinc-200 font-sans leading-relaxed">
                  {topic.description}
                </p>
              </div>

              <div className="p-5 bg-[#080A0E] border-l-2 border-amber-400/60 rounded-r-lg space-y-3">
                <div className="text-[10px] font-mono text-amber-400 uppercase tracking-wider">
                  High-Yield Takeaways:
                </div>
                <ul className="space-y-2">
                  {topic.subtopics.flatMap((s) => s.keyTakeaways).map((t, i) => (
                    <li key={i} className="text-xs sm:text-sm text-zinc-300 font-sans leading-relaxed flex items-start gap-2">
                      <span className="text-amber-400 flex-shrink-0">•</span>
                      <span>{t}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="p-4 bg-zinc-900/40 border border-zinc-800 rounded-lg space-y-2">
                <div className="text-[10px] font-mono text-zinc-500 uppercase tracking-wider">
                  Associated System Primitives:
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {Array.from(new Set(topic.subtopics.flatMap((s) => s.concepts))).map((c) => (
                    <span key={c} className="px-2 py-0.5 rounded text-[11px] font-mono text-zinc-300 bg-zinc-950 border border-zinc-800">
                      {c}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* ── Prev / Next Navigation ── */}
      <div className="pt-6 border-t border-zinc-800 flex items-stretch justify-between gap-4">
        {prevTopic ? (
          <button
            onClick={() => onNavigate(prevTopic.module, prevTopic.topic, prevTopic.lesson)}
            className="flex items-start gap-2 p-3 rounded border border-zinc-800 hover:border-zinc-700 hover:bg-zinc-900/40 transition-all text-left max-w-xs"
          >
            <ChevronLeft className="w-4 h-4 text-zinc-500 mt-0.5 flex-shrink-0" />
            <div>
              <div className="text-[10px] font-mono text-zinc-600 uppercase tracking-wider mb-0.5">Previous</div>
              <div className="text-xs font-sans text-zinc-300 leading-snug">{prevTopic.topic.title}</div>
            </div>
          </button>
        ) : (
          <div />
        )}

        {nextTopic ? (
          <button
            onClick={() => onNavigate(nextTopic.module, nextTopic.topic, nextTopic.lesson)}
            className="flex items-start gap-2 p-3 rounded border border-zinc-800 hover:border-zinc-700 hover:bg-zinc-900/40 transition-all text-right max-w-xs ml-auto"
          >
            <div>
              <div className="text-[10px] font-mono text-zinc-600 uppercase tracking-wider mb-0.5">Next</div>
              <div className="text-xs font-sans text-zinc-300 leading-snug">{nextTopic.topic.title}</div>
            </div>
            <ChevronRight className="w-4 h-4 text-zinc-500 mt-0.5 flex-shrink-0" />
          </button>
        ) : (
          <div />
        )}
      </div>

    </div>
  );
};
