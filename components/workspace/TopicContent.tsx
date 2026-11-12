"use client";

import React, { useState } from "react";
import {
  CurriculumSubject,
  CurriculumModule,
  CurriculumTopic,
  CurriculumSubtopic,
  CurriculumQuestion,
} from "@/lib/data/curriculum/types";
import { SelectedTopic } from "./WorkspaceShell";
import { WorkspaceTab } from "./WorkspaceNav";
import { ChevronLeft, ChevronRight, ChevronDown, ChevronUp, FlaskConical, ExternalLink } from "lucide-react";
import Link from "next/link";
import { idToSlug } from "@/lib/data/subjectSlugs";

interface TopicContentProps {
  subject: CurriculumSubject;
  selectedTopic: SelectedTopic;
  activeTab: WorkspaceTab;
  prevTopic: SelectedTopic | null;
  nextTopic: SelectedTopic | null;
  onNavigate: (module: CurriculumModule, topic: CurriculumTopic) => void;
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
    <div className="border border-zinc-800 rounded-lg overflow-hidden">
      <button
        onClick={() => setExpanded((v) => !v)}
        className="w-full flex items-start justify-between gap-3 p-4 text-left hover:bg-zinc-900/40 transition-colors"
      >
        <div className="flex items-start gap-2 min-w-0">
          <span className={`text-[10px] font-mono flex-shrink-0 mt-0.5 ${diffColor}`}>
            [{q.type}]
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
        <div className="px-4 pb-4 pt-1 bg-[#080A0E] border-t border-zinc-800">
          <div className="text-[10px] font-mono text-zinc-500 uppercase tracking-wider mb-2">
            First-Principles Explanation:
          </div>
          <p className="text-sm text-zinc-300 font-sans leading-relaxed">{q.explanation}</p>
          {q.hints && q.hints.length > 0 && (
            <div className="mt-3">
              <div className="text-[10px] font-mono text-zinc-600 uppercase tracking-wider mb-1.5">Hints:</div>
              <ul className="space-y-1">
                {q.hints.map((h, i) => (
                  <li key={i} className="text-xs text-zinc-500 font-sans flex items-start gap-1.5">
                    <span className="text-amber-400/60 flex-shrink-0">→</span>
                    <span>{h}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

function SubtopicSection({ sub }: { sub: CurriculumSubtopic }) {
  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <span className="text-amber-400 font-mono text-xs">↳</span>
        <h3 className="text-base font-serif text-white font-normal">{sub.title}</h3>
        <span className={`text-[10px] font-mono px-1.5 py-0.5 rounded border ${DIFFICULTY_BADGE[sub.difficulty]}`}>
          {sub.difficulty}
        </span>
      </div>

      <p className="text-sm text-zinc-400 font-sans leading-relaxed">{sub.description}</p>

      {/* Concept tags */}
      {sub.concepts.length > 0 && (
        <div className="flex flex-wrap gap-1.5">
          {sub.concepts.map((c) => (
            <span key={c} className="px-2 py-1 rounded text-[11px] font-mono text-zinc-400 bg-zinc-900 border border-zinc-800">
              {c}
            </span>
          ))}
        </div>
      )}

      {/* Key takeaways */}
      {sub.keyTakeaways.length > 0 && (
        <div className="p-4 bg-[#080A0E] border-l-2 border-amber-400/40 rounded-r-lg">
          <div className="text-[10px] font-mono text-amber-400/70 uppercase tracking-wider mb-2">
            Key Takeaways:
          </div>
          <ul className="space-y-2">
            {sub.keyTakeaways.map((t, i) => (
              <li key={i} className="text-sm text-zinc-300 font-sans leading-relaxed flex items-start gap-2">
                <span className="text-amber-400/60 flex-shrink-0 mt-0.5">•</span>
                <span>{t}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Engineering context */}
      {sub.engineeringContext && (
        <div className="p-3 bg-zinc-900/50 border border-zinc-800 rounded text-xs text-zinc-500 font-sans leading-relaxed">
          <span className="font-mono text-zinc-600 uppercase text-[10px] tracking-wider mr-2">Engineering context:</span>
          {sub.engineeringContext}
        </div>
      )}
    </div>
  );
}

export const TopicContent: React.FC<TopicContentProps> = ({
  subject,
  selectedTopic,
  activeTab,
  prevTopic,
  nextTopic,
  onNavigate,
}) => {
  const { module: mod, topic } = selectedTopic;
  const allQuestions = topic.subtopics.flatMap((s) => s.questions);
  const lab = SUBJECT_LAB_ID[subject.id];
  const slug = idToSlug(subject.id);

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
            <span className="text-[11px] font-mono text-zinc-600">
              ~{topic.estimatedHours}h to study
            </span>
          )}
        </div>
        <h1 className="text-2xl sm:text-3xl font-serif text-white font-normal leading-tight">
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
            <div>
              <div className="text-[11px] font-mono text-zinc-500 uppercase tracking-wider mb-3">
                Learning objectives
              </div>
              <ul className="space-y-2">
                {topic.learningObjectives.map((obj, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-zinc-300 font-sans leading-relaxed">
                    <span className="text-amber-400 font-mono text-xs flex-shrink-0 mt-0.5">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span>{obj}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Prerequisites for this topic */}
          {topic.prerequisites && topic.prerequisites.length > 0 && (
            <div className="p-3 bg-[#0E1117] border border-zinc-800 rounded text-xs font-mono text-zinc-500">
              <span className="text-zinc-600 uppercase tracking-wider mr-2">Prerequisites:</span>
              {topic.prerequisites.join(" · ")}
            </div>
          )}

          {/* Subtopics */}
          <div className="space-y-10">
            {topic.subtopics.map((sub) => (
              <div key={sub.id} className="pt-2 border-t border-zinc-800/50">
                <SubtopicSection sub={sub} />
              </div>
            ))}
          </div>

          {/* Interview benchmark for this module */}
          {mod.interviewBenchmark && (
            <div className="p-4 bg-[#0E1117] border border-zinc-800 rounded-lg">
              <div className="text-[10px] font-mono text-zinc-500 uppercase tracking-wider mb-2">
                Interview benchmark for this module:
              </div>
              <p className="text-sm font-serif italic text-zinc-200 leading-relaxed">
                &ldquo;{mod.interviewBenchmark}&rdquo;
              </p>
            </div>
          )}

          {/* Lab teaser */}
          {lab && (
            <div className="p-4 bg-[#0E1117] border border-amber-400/15 rounded-lg flex items-center justify-between gap-4">
              <div>
                <div className="text-[10px] font-mono text-amber-400/70 uppercase tracking-wider mb-1 flex items-center gap-1.5">
                  <FlaskConical className="w-3 h-3" />
                  Interactive Laboratory Available
                </div>
                <p className="text-sm font-sans text-zinc-300">{lab.label}</p>
              </div>
              <a
                href="/#demonstrations"
                className="flex-shrink-0 flex items-center gap-1.5 px-3 py-1.5 text-xs font-mono text-amber-400 border border-amber-400/30 rounded hover:bg-amber-950/20 transition-colors"
              >
                Open Lab
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          )}
        </div>
      )}

      {/* ── Tab: LAB ── */}
      {activeTab === "lab" && (
        <div className="space-y-6">
          {lab ? (
            <div className="space-y-4">
              <div className="text-[11px] font-mono text-zinc-500 uppercase tracking-wider">
                Interactive Laboratory
              </div>
              <div className="p-6 bg-[#0E1117] border border-zinc-800 rounded-lg text-center space-y-4">
                <FlaskConical className="w-8 h-8 text-amber-400/60 mx-auto" />
                <div>
                  <h3 className="text-base font-serif text-white mb-2">{lab.label}</h3>
                  <p className="text-sm text-zinc-500 font-sans leading-relaxed max-w-md mx-auto">
                    The interactive simulator lives on the main page. Open it in a new view to experiment while reading.
                  </p>
                </div>
                <a
                  href="/#demonstrations"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-2.5 bg-amber-400 hover:bg-amber-300 text-zinc-950 font-semibold text-sm rounded transition-colors font-sans"
                >
                  Open {lab.label}
                  <ExternalLink className="w-4 h-4" />
                </a>
              </div>
            </div>
          ) : (
            <div className="p-8 text-center bg-[#0E1117] border border-zinc-800 rounded-lg">
              <FlaskConical className="w-8 h-8 text-zinc-700 mx-auto mb-3" />
              <p className="text-sm text-zinc-600 font-sans">
                An interactive lab for {subject.name} is on the roadmap.
              </p>
            </div>
          )}
        </div>
      )}

      {/* ── Tab: PRACTICE ── */}
      {activeTab === "practice" && (
        <div className="space-y-4">
          <div className="text-[11px] font-mono text-zinc-500 uppercase tracking-wider">
            Practice questions — {topic.title}
          </div>

          {allQuestions.length === 0 ? (
            <p className="text-sm text-zinc-600 font-sans py-6 text-center">
              No practice questions for this topic yet.
            </p>
          ) : (
            <div className="space-y-3">
              {allQuestions.map((q) => (
                <QuestionItem key={q.id} q={q} />
              ))}
            </div>
          )}
        </div>
      )}

      {/* ── Tab: INTERVIEW ── */}
      {activeTab === "interview" && (
        <div className="space-y-4">
          <div className="text-[11px] font-mono text-zinc-500 uppercase tracking-wider">
            Interview questions — {topic.title}
          </div>

          {/* Filter for Interview/FollowUp type */}
          {(() => {
            const iqQuestions = allQuestions.filter(
              (q) => q.type === "Interview" || q.type === "FollowUp" || q.type === "Analytical"
            );
            if (iqQuestions.length === 0) {
              return (
                <div className="p-6 text-center bg-[#0E1117] border border-zinc-800 rounded-lg">
                  <p className="text-sm text-zinc-600 font-sans">
                    No interview-specific questions for this topic. Check the Practice tab for conceptual questions.
                  </p>
                </div>
              );
            }
            return (
              <div className="space-y-3">
                {iqQuestions.map((q) => (
                  <QuestionItem key={q.id} q={q} />
                ))}
              </div>
            );
          })()}

          {/* Interview benchmark */}
          {mod.interviewBenchmark && (
            <div className="mt-6 p-4 bg-[#0E1117] border border-zinc-800 rounded-lg">
              <div className="text-[10px] font-mono text-zinc-500 uppercase tracking-wider mb-2">
                Module interview benchmark
              </div>
              <p className="text-sm font-serif italic text-zinc-200 leading-relaxed">
                &ldquo;{mod.interviewBenchmark}&rdquo;
              </p>
            </div>
          )}
        </div>
      )}

      {/* ── Prev / Next Navigation ── */}
      <div className="pt-6 border-t border-zinc-800 flex items-stretch justify-between gap-4">
        {prevTopic ? (
          <button
            onClick={() => onNavigate(prevTopic.module, prevTopic.topic)}
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
            onClick={() => onNavigate(nextTopic.module, nextTopic.topic)}
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

