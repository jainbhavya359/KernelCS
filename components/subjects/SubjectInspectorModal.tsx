"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { X, ArrowRight, BookOpen, Layers, FlaskConical } from "lucide-react";
import { CurriculumSubject } from "@/lib/data/curriculum/types";
import { idToSlug } from "@/lib/data/subjectSlugs";

interface SubjectInspectorModalProps {
  subject: CurriculumSubject | null;
  isOpen: boolean;
  onClose: () => void;
}

const DIFFICULTY_COLOR: Record<string, string> = {
  Foundation: "text-emerald-400 border-emerald-800/40 bg-emerald-950/30",
  Intermediate: "text-amber-400 border-amber-800/40 bg-amber-950/30",
  Advanced: "text-red-400 border-red-800/40 bg-red-950/30",
};

export const SubjectInspectorModal: React.FC<SubjectInspectorModalProps> = ({
  subject,
  isOpen,
  onClose,
}) => {
  const router = useRouter();

  if (!isOpen || !subject) return null;

  const slug = idToSlug(subject.id);
  const totalTopics = subject.modules.reduce((sum, m) => sum + m.topics.length, 0);
  const totalLabs = Math.ceil(totalTopics / 2);

  const handleEnterWorkspace = () => {
    if (slug) {
      onClose();
      router.push(`/subjects/${slug}`);
    }
  };

  // Example concepts: first 5 from keyMechanisms
  const exampleConcepts = subject.keyMechanisms.slice(0, 5);
  // Learning outcomes: first 4
  const outcomes = subject.learningOutcomes.slice(0, 4);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
      {/* Backdrop */}
      <div className="fixed inset-0" onClick={onClose} aria-hidden />

      {/* Modal */}
      <div className="relative w-full max-w-lg bg-[#0E1117] border border-zinc-800 rounded-lg shadow-2xl overflow-hidden z-10 technical-schematic-grid">

        {/* Header */}
        <div className="p-5 sm:p-6 border-b border-zinc-800 bg-[#080A0E] flex items-start justify-between gap-3">
          <div>
            <div className="text-[11px] font-mono text-amber-400 uppercase tracking-widest mb-1.5">
              {subject.shortName} · Subject Introduction
            </div>
            <h2 className="text-2xl sm:text-3xl font-serif text-white font-normal tracking-tight leading-tight">
              {subject.name}
            </h2>
          </div>
          <button
            onClick={onClose}
            aria-label="Close"
            className="p-1.5 text-zinc-500 hover:text-white bg-zinc-900 border border-zinc-800 rounded transition-colors flex-shrink-0 mt-0.5"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="p-5 sm:p-6 space-y-6 overflow-y-auto max-h-[70vh]">

          {/* Description */}
          <p className="text-sm text-zinc-300 font-sans leading-relaxed">
            {subject.description}
          </p>

          {/* Stats Row */}
          <div className="flex items-center gap-4 font-mono text-xs">
            <div className="flex items-center gap-1.5 text-zinc-400">
              <Layers className="w-3.5 h-3.5 text-zinc-500" />
              <span className="text-white font-semibold">{subject.modules.length}</span>
              <span>modules</span>
            </div>
            <span className="text-zinc-700">·</span>
            <div className="flex items-center gap-1.5 text-zinc-400">
              <BookOpen className="w-3.5 h-3.5 text-zinc-500" />
              <span className="text-white font-semibold">{totalTopics}</span>
              <span>topics</span>
            </div>
            <span className="text-zinc-700">·</span>
            <div className="flex items-center gap-1.5 text-zinc-400">
              <FlaskConical className="w-3.5 h-3.5 text-zinc-500" />
              <span className="text-white font-semibold">{totalLabs}</span>
              <span>labs</span>
            </div>
          </div>

          {/* What you'll learn */}
          <div>
            <div className="text-[11px] font-mono text-zinc-500 uppercase tracking-wider mb-2.5">
              What you&apos;ll learn
            </div>
            <ul className="space-y-2">
              {outcomes.map((outcome, i) => (
                <li key={i} className="flex items-start gap-2 text-xs text-zinc-300 font-sans leading-relaxed">
                  <span className="text-amber-400 font-mono text-[11px] mt-0.5 flex-shrink-0">→</span>
                  <span>{outcome}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Example concepts */}
          <div>
            <div className="text-[11px] font-mono text-zinc-500 uppercase tracking-wider mb-2.5">
              Core mechanisms
            </div>
            <div className="flex flex-wrap gap-1.5">
              {exampleConcepts.map((concept) => (
                <span
                  key={concept}
                  className="px-2 py-1 rounded text-[11px] font-mono text-zinc-300 bg-zinc-900 border border-zinc-800"
                >
                  {concept}
                </span>
              ))}
            </div>
          </div>

          {/* Core question */}
          <div className="p-3.5 bg-[#080A0E] border border-zinc-800/80 rounded">
            <div className="text-[10px] font-mono text-zinc-500 uppercase tracking-wider mb-1.5">
              Central question
            </div>
            <p className="text-xs font-serif italic text-zinc-200 leading-relaxed">
              &ldquo;{subject.coreQuestion}&rdquo;
            </p>
          </div>

        </div>

        {/* Footer CTA */}
        <div className="px-5 sm:px-6 py-4 border-t border-zinc-800 bg-[#080A0E] flex items-center justify-between gap-4">
          <span className="text-[11px] font-mono text-zinc-500">
            {subject.modules.length} modules · Start anytime
          </span>
          <button
            onClick={handleEnterWorkspace}
            className="flex items-center gap-2 px-5 py-2.5 bg-amber-400 hover:bg-amber-300 text-zinc-950 font-semibold text-sm rounded transition-colors font-sans"
          >
            <span>Enter Learning Workspace</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

      </div>
    </div>
  );
};

