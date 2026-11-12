"use client";

import React from "react";
import { CurriculumSubject, CurriculumModule, CurriculumTopic } from "@/lib/data/curriculum/types";
import { ArrowRight, BookOpen, FlaskConical, ChevronRight, RotateCcw } from "lucide-react";

interface SubjectOverviewProps {
  subject: CurriculumSubject;
  isReturning: boolean;
  lastTopicInfo: { module: CurriculumModule; topic: CurriculumTopic } | null;
  onSelectFirstTopic: () => void;
  onResume: () => void;
  onSelectTopic: (module: CurriculumModule, topic: CurriculumTopic) => void;
}

const DIFFICULTY_BADGE: Record<string, string> = {
  Foundation: "text-emerald-400 border-emerald-800/40 bg-emerald-950/20",
  Intermediate: "text-amber-400 border-amber-800/40 bg-amber-950/20",
  Advanced: "text-red-400 border-red-800/40 bg-red-950/20",
};

const STAGE_ORDER = ["Foundation", "Intermediate", "Advanced"];

export const SubjectOverview: React.FC<SubjectOverviewProps> = ({
  subject,
  isReturning,
  lastTopicInfo,
  onSelectFirstTopic,
  onResume,
  onSelectTopic,
}) => {
  const totalTopics = subject.modules.reduce((s, m) => s + m.topics.length, 0);
  const totalLabs = Math.ceil(totalTopics / 2);

  // Group modules by difficulty stage
  const stages = STAGE_ORDER.map((stage) => ({
    stage,
    modules: subject.modules.filter((m) => m.difficulty === stage),
  })).filter((s) => s.modules.length > 0);

  // First topic of first module
  const firstModule = subject.modules[0];
  const firstTopic = firstModule?.topics[0];

  return (
    <div className="max-w-4xl mx-auto px-6 py-10 space-y-10">

      {/* ── Hero ── */}
      <div className="space-y-4">
        <div className="text-[11px] font-mono text-amber-400 uppercase tracking-widest">
          {subject.shortName} · Subject Overview
        </div>
        <h1 className="text-3xl sm:text-4xl font-serif text-white font-normal leading-tight">
          {subject.name}
        </h1>
        <p className="text-sm text-zinc-400 font-sans leading-relaxed max-w-2xl">
          {subject.description}
        </p>

        {/* Stats row */}
        <div className="flex flex-wrap gap-5 font-mono text-xs pt-1">
          <div className="flex items-center gap-1.5 text-zinc-400">
            <span className="text-white font-semibold">{subject.modules.length}</span> modules
          </div>
          <span className="text-zinc-700">·</span>
          <div className="flex items-center gap-1.5 text-zinc-400">
            <BookOpen className="w-3.5 h-3.5 text-zinc-600" />
            <span className="text-white font-semibold">{totalTopics}</span> topics
          </div>
          <span className="text-zinc-700">·</span>
          <div className="flex items-center gap-1.5 text-zinc-400">
            <FlaskConical className="w-3.5 h-3.5 text-zinc-600" />
            <span className="text-white font-semibold">{totalLabs}</span> labs
          </div>
        </div>
      </div>

      {/* ── Core question ── */}
      <div className="p-5 bg-[#0E1117] border border-zinc-800 rounded-lg">
        <div className="text-[10px] font-mono text-zinc-500 uppercase tracking-wider mb-2">
          Central question this subject answers:
        </div>
        <p className="text-base font-serif italic text-zinc-100 leading-relaxed">
          &ldquo;{subject.coreQuestion}&rdquo;
        </p>
      </div>

      {/* ── Returning student OR first-visit CTA ── */}
      {isReturning && lastTopicInfo ? (
        <div className="p-5 bg-[#0E1117] border border-amber-400/20 rounded-lg flex items-center justify-between gap-4">
          <div className="min-w-0">
            <div className="text-[10px] font-mono text-amber-400 uppercase tracking-wider mb-1">
              Continue where you left off
            </div>
            <p className="text-sm font-sans text-white truncate">{lastTopicInfo.topic.title}</p>
            <p className="text-xs font-mono text-zinc-500 mt-0.5">{lastTopicInfo.module.title}</p>
          </div>
          <button
            onClick={onResume}
            className="flex-shrink-0 flex items-center gap-2 px-4 py-2 bg-amber-400 hover:bg-amber-300 text-zinc-950 font-semibold text-xs rounded transition-colors font-sans"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Continue Learning</span>
          </button>
        </div>
      ) : firstTopic ? (
        <div className="flex items-center gap-4">
          <button
            onClick={onSelectFirstTopic}
            className="flex items-center gap-2 px-5 py-2.5 bg-amber-400 hover:bg-amber-300 text-zinc-950 font-semibold text-sm rounded transition-colors font-sans"
          >
            <span>Start with: {firstTopic.title}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
          <span className="text-xs font-mono text-zinc-600">Begin with the first foundation topic</span>
        </div>
      ) : null}

      {/* ── Learning outcomes ── */}
      {subject.learningOutcomes.length > 0 && (
        <div>
          <div className="text-[11px] font-mono text-zinc-500 uppercase tracking-wider mb-4">
            What you&apos;ll be able to do
          </div>
          <ul className="space-y-3">
            {subject.learningOutcomes.map((outcome, i) => (
              <li key={i} className="flex items-start gap-3 text-sm text-zinc-300 font-sans leading-relaxed">
                <span className="text-amber-400 font-mono text-xs mt-0.5 flex-shrink-0">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span>{outcome}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* ── Module roadmap ── */}
      <div>
        <div className="text-[11px] font-mono text-zinc-500 uppercase tracking-wider mb-4">
          Module roadmap — recommended learning order
        </div>

        {/* Progression stages */}
        <div className="flex items-center gap-2 mb-5 font-mono text-[11px] flex-wrap">
          {STAGE_ORDER.map((stage, i) => (
            <React.Fragment key={stage}>
              <span className={`px-2 py-1 rounded border ${DIFFICULTY_BADGE[stage]}`}>
                {stage}
              </span>
              {i < STAGE_ORDER.length - 1 && (
                <ChevronRight className="w-3.5 h-3.5 text-zinc-700" />
              )}
            </React.Fragment>
          ))}
          <ChevronRight className="w-3.5 h-3.5 text-zinc-700" />
          <span className="px-2 py-1 rounded border text-purple-400 border-purple-800/40 bg-purple-950/20">
            Interview Readiness
          </span>
        </div>

        {/* Module cards */}
        <div className="space-y-3">
          {subject.modules.map((mod, idx) => (
            <div
              key={mod.id}
              className="p-4 bg-[#0E1117] border border-zinc-800 rounded-lg hover:border-zinc-700 transition-colors"
            >
              <div className="flex items-start justify-between gap-3 mb-2">
                <div className="flex items-start gap-3 min-w-0">
                  <span className="text-[11px] font-mono text-amber-400 font-bold flex-shrink-0 mt-0.5">
                    {String(idx + 1).padStart(2, "0")}
                  </span>
                  <div className="min-w-0">
                    <h3 className="text-sm font-sans text-white font-medium leading-snug">{mod.title}</h3>
                    <p className="text-xs text-zinc-500 font-sans mt-0.5 leading-relaxed">
                      {mod.shortDescription}
                    </p>
                  </div>
                </div>
                <span
                  className={`flex-shrink-0 text-[10px] font-mono px-2 py-0.5 rounded border ${
                    DIFFICULTY_BADGE[mod.difficulty]
                  }`}
                >
                  {mod.difficulty}
                </span>
              </div>

              {/* Topic list as clickable pills */}
              <div className="flex flex-wrap gap-1.5 mt-3">
                {mod.topics.map((topic) => (
                  <button
                    key={topic.id}
                    onClick={() => onSelectTopic(mod, topic)}
                    className="px-2 py-1 rounded text-[11px] font-mono text-zinc-400 bg-zinc-900 border border-zinc-800 hover:border-amber-400/40 hover:text-amber-300 transition-colors"
                  >
                    {topic.title}
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── Prerequisites ── */}
      {subject.prerequisites.length > 0 && (
        <div className="p-4 bg-[#0E1117] border border-zinc-800 rounded-lg">
          <div className="text-[10px] font-mono text-zinc-500 uppercase tracking-wider mb-2.5">
            Prerequisites
          </div>
          <div className="flex flex-wrap gap-2">
            {subject.prerequisites.map((p) => (
              <span key={p} className="px-2 py-1 rounded text-xs font-mono text-zinc-400 bg-zinc-900 border border-zinc-800">
                {p}
              </span>
            ))}
          </div>
        </div>
      )}

    </div>
  );
};

