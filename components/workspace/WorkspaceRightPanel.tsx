"use client";

import React from "react";
import { CurriculumSubject } from "@/lib/data/curriculum/types";
import { SelectedTopic } from "./WorkspaceShell";
import { X } from "lucide-react";

interface WorkspaceRightPanelProps {
  subject: CurriculumSubject;
  selectedTopic: SelectedTopic;
  onClose: () => void;
}

export const WorkspaceRightPanel: React.FC<WorkspaceRightPanelProps> = ({
  subject,
  selectedTopic,
  onClose,
}) => {
  const { module: mod, topic, lesson } = selectedTopic;

  // Aggregate concepts from lesson or subtopics
  const concepts = (lesson?.concepts && lesson.concepts.length > 0)
    ? lesson.concepts
    : Array.from(new Set(topic.subtopics.flatMap((s) => s.concepts))).slice(0, 10);

  // Prerequisites for this topic
  const prerequisites = topic.prerequisites ?? [];

  // Key takeaways from lesson or subtopics
  const takeaways = (lesson?.keyTakeaways && lesson.keyTakeaways.length > 0)
    ? lesson.keyTakeaways
    : topic.subtopics.flatMap((s) => s.keyTakeaways).slice(0, 6);

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="px-4 py-3 border-b border-zinc-800 flex items-center justify-between flex-shrink-0">
        <span className="text-[11px] font-mono text-zinc-500 uppercase tracking-wider">Context</span>
        <button
          onClick={onClose}
          className="p-1 text-zinc-600 hover:text-zinc-300 transition-colors"
          aria-label="Close panel"
        >
          <X className="w-3.5 h-3.5" />
        </button>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-6">

        {/* Key terminology / concepts */}
        {concepts.length > 0 && (
          <div>
            <div className="text-[10px] font-mono text-zinc-600 uppercase tracking-wider mb-2.5">
              Key concepts
            </div>
            <div className="flex flex-wrap gap-1.5">
              {concepts.map((c) => (
                <span
                  key={c}
                  className="px-2 py-1 rounded text-[10px] font-mono text-zinc-400 bg-zinc-900 border border-zinc-800"
                >
                  {c}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Prerequisites */}
        {prerequisites.length > 0 && (
          <div>
            <div className="text-[10px] font-mono text-zinc-600 uppercase tracking-wider mb-2.5">
              Prerequisites
            </div>
            <ul className="space-y-1.5">
              {prerequisites.map((p, i) => (
                <li key={i} className="flex items-start gap-1.5 text-xs font-sans text-zinc-500">
                  <span className="text-zinc-700 flex-shrink-0 mt-0.5">→</span>
                  <span>{p}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Subject prerequisites */}
        {subject.prerequisites.length > 0 && prerequisites.length === 0 && (
          <div>
            <div className="text-[10px] font-mono text-zinc-600 uppercase tracking-wider mb-2.5">
              Subject prerequisites
            </div>
            <ul className="space-y-1.5">
              {subject.prerequisites.map((p) => (
                <li key={p} className="flex items-start gap-1.5 text-xs font-sans text-zinc-500">
                  <span className="text-zinc-700 flex-shrink-0 mt-0.5">→</span>
                  <span>{p}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Key takeaways (compact) */}
        {takeaways.length > 0 && (
          <div>
            <div className="text-[10px] font-mono text-zinc-600 uppercase tracking-wider mb-2.5">
              Key takeaways
            </div>
            <ul className="space-y-2">
              {takeaways.map((t, i) => (
                <li key={i} className="text-xs text-zinc-500 font-sans leading-relaxed flex items-start gap-1.5">
                  <span className="text-amber-400/50 flex-shrink-0 mt-0.5">•</span>
                  <span>{t}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Interview relevance */}
        {mod.interviewBenchmark && (
          <div className="p-3 bg-[#0E1117] border border-zinc-800 rounded">
            <div className="text-[10px] font-mono text-zinc-600 uppercase tracking-wider mb-1.5">
              Interview relevance
            </div>
            <p className="text-xs font-sans text-zinc-500 leading-relaxed italic">
              &ldquo;{mod.interviewBenchmark}&rdquo;
            </p>
          </div>
        )}

        {/* Subject key mechanisms */}
        <div>
          <div className="text-[10px] font-mono text-zinc-600 uppercase tracking-wider mb-2.5">
            Core mechanisms in {subject.shortName}
          </div>
          <ul className="space-y-1.5">
            {subject.keyMechanisms.slice(0, 5).map((m) => (
              <li key={m} className="text-[10px] font-mono text-zinc-600 flex items-start gap-1.5">
                <span className="text-zinc-700 flex-shrink-0">·</span>
                <span>{m}</span>
              </li>
            ))}
          </ul>
        </div>

      </div>
    </div>
  );
};

