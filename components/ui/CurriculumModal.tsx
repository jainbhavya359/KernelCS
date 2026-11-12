"use client";

import React, { useState, useMemo } from "react";
import { Subject } from "@/lib/data/subjects";
import { LEARNING_PATHWAYS, LearningPathway } from "@/lib/data/curriculum";
import {
  X,
  Layers,
  Compass,
  HelpCircle,
  ChevronDown,
  ChevronRight,
  Search,
  CheckCircle2,
  Cpu,
  BookOpen,
  Filter
} from "lucide-react";

interface CurriculumModalProps {
  subject: Subject | null;
  isOpen: boolean;
  onClose: () => void;
}

type ModalTab = "syllabus" | "pathways" | "questions";

export const CurriculumModal: React.FC<CurriculumModalProps> = ({
  subject,
  isOpen,
  onClose,
}) => {
  const [activeTab, setActiveTab] = useState<ModalTab>("syllabus");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [expandedModuleId, setExpandedModuleId] = useState<string | null>(null);
  const [expandedQuestionId, setExpandedQuestionId] = useState<string | null>(null);
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>("all");
  const [selectedType, setSelectedType] = useState<string>("all");

  // Reset state when modal opens or subject changes
  React.useEffect(() => {
    if (isOpen && subject && subject.modules.length > 0) {
      setExpandedModuleId(subject.modules[0].id);
      setSearchQuery("");
      setExpandedQuestionId(null);
    }
  }, [isOpen, subject]);

  // Aggregate all questions belonging to this subject
  const allSubjectQuestions = useMemo(() => {
    if (!subject) return [];
    const questions: {
      id: string;
      statement: string;
      type: string;
      difficulty: string;
      explanation: string;
      moduleTitle: string;
      topicTitle: string;
    }[] = [];

    const modules = subject.richModules || subject.modules;
    for (const mod of modules) {
      const topics = (mod as any).topics || [];
      for (const top of topics) {
        const subtopics = top.subtopics || [];
        for (const sub of subtopics) {
          const qs = sub.questions || [];
          for (const q of qs) {
            questions.push({
              id: q.id,
              statement: q.statement || q.question,
              type: q.type,
              difficulty: q.difficulty,
              explanation: q.explanation || (q.keyAnswerPoints ? q.keyAnswerPoints.join(" ") : ""),
              moduleTitle: (mod as any).title,
              topicTitle: top.title,
            });
          }
        }
      }
    }
    return questions;
  }, [subject]);

  // Filtered questions based on search & filters
  const filteredQuestions = useMemo(() => {
    return allSubjectQuestions.filter((q) => {
      const matchesSearch =
        searchQuery === "" ||
        q.statement.toLowerCase().includes(searchQuery.toLowerCase()) ||
        q.explanation.toLowerCase().includes(searchQuery.toLowerCase()) ||
        q.topicTitle.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesDiff =
        selectedDifficulty === "all" ||
        q.difficulty.toLowerCase() === selectedDifficulty.toLowerCase();

      const matchesType =
        selectedType === "all" ||
        q.type.toLowerCase() === selectedType.toLowerCase();

      return matchesSearch && matchesDiff && matchesType;
    });
  }, [allSubjectQuestions, searchQuery, selectedDifficulty, selectedType]);

  // Matching learning pathways containing this subject
  const matchingPathways = useMemo(() => {
    if (!subject) return [];
    return LEARNING_PATHWAYS.filter((p) =>
      p.steps.some((s) => s.subjectId === subject.id)
    );
  }, [subject]);

  if (!isOpen || !subject) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/85 backdrop-blur-sm animate-fadeIn">
      <div className="fixed inset-0" onClick={onClose} />

      <div className="relative w-full max-w-4xl bg-[#0E1117] border border-zinc-800 rounded-lg shadow-2xl overflow-hidden flex flex-col max-h-[90vh] z-10 technical-schematic-grid">
        
        {/* Header */}
        <div className="p-5 sm:p-6 border-b border-zinc-800 bg-[#080A0E] flex items-start justify-between">
          <div className="pr-4">
            <div className="flex flex-wrap items-center gap-2 mb-2 text-xs font-mono text-zinc-500">
              <span className="text-amber-400 font-bold tracking-wider">{subject.shortName.toUpperCase()}</span>
              <span>•</span>
              <span>{subject.modulesCount} MODULES</span>
              <span>•</span>
              <span>{subject.topicsCount} TOPICS</span>
              <span>•</span>
              <span>{allSubjectQuestions.length || subject.interviewQuestionsCount} TECHNICAL BREAKDOWNS</span>
            </div>
            <h3 className="text-2xl sm:text-3xl font-serif text-white font-normal tracking-tight">
              {subject.name}
            </h3>
            <p className="text-xs sm:text-sm text-zinc-400 mt-1 max-w-2xl font-sans leading-relaxed">
              {subject.longDescription}
            </p>
          </div>
          <button
            onClick={onClose}
            aria-label="Close Inspector"
            className="p-1.5 text-zinc-400 hover:text-white bg-zinc-900 border border-zinc-800 rounded transition-colors flex-shrink-0"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Core First Principle Quote Callout */}
        <div className="px-5 sm:px-6 py-3 bg-[#0A0C10] border-b border-zinc-800 flex items-center gap-3 text-xs">
          <span className="text-amber-400 font-mono text-sm leading-none">•</span>
          <div className="font-sans">
            <span className="text-zinc-500 font-mono text-[11px] uppercase mr-2 tracking-wider">
              Core First Principle:
            </span>
            <span className="text-zinc-200 font-serif italic text-xs sm:text-sm">
              &ldquo;{subject.coreQuestion}&rdquo;
            </span>
          </div>
        </div>

        {/* Interactive Tab Bar & Search */}
        <div className="px-5 sm:px-6 py-2.5 bg-[#080A0E] border-b border-zinc-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-2 font-mono text-xs">
            <button
              onClick={() => setActiveTab("syllabus")}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded transition-all ${
                activeTab === "syllabus"
                  ? "bg-[#141822] text-amber-400 border border-amber-400/30 font-semibold"
                  : "text-zinc-400 hover:text-zinc-200 hover:bg-zinc-900/60"
              }`}
            >
              <Layers className="w-3.5 h-3.5" />
              <span>Syllabus Hierarchy ({subject.modulesCount})</span>
            </button>

            <button
              onClick={() => setActiveTab("pathways")}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded transition-all ${
                activeTab === "pathways"
                  ? "bg-[#141822] text-amber-400 border border-amber-400/30 font-semibold"
                  : "text-zinc-400 hover:text-zinc-200 hover:bg-zinc-900/60"
              }`}
            >
              <Compass className="w-3.5 h-3.5" />
              <span>Learning Pathways ({matchingPathways.length})</span>
            </button>

            <button
              onClick={() => setActiveTab("questions")}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded transition-all ${
                activeTab === "questions"
                  ? "bg-[#141822] text-amber-400 border border-amber-400/30 font-semibold"
                  : "text-zinc-400 hover:text-zinc-200 hover:bg-zinc-900/60"
              }`}
            >
              <HelpCircle className="w-3.5 h-3.5" />
              <span>Question Bank ({allSubjectQuestions.length || subject.interviewQuestionsCount})</span>
            </button>
          </div>

          {/* Quick Search */}
          <div className="relative w-full sm:w-64">
            <Search className="w-3.5 h-3.5 absolute left-2.5 top-1/2 -translate-y-1/2 text-zinc-500" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Filter topics & concepts..."
              className="w-full pl-8 pr-3 py-1 bg-zinc-950/80 border border-zinc-800 rounded text-xs text-zinc-200 placeholder-zinc-500 font-mono focus:outline-none focus:border-amber-400/50"
            />
          </div>
        </div>

        {/* Modal Body */}
        <div className="overflow-y-auto p-5 sm:p-6 space-y-4 flex-1">
          
          {/* TAB 1: SYLLABUS HIERARCHY */}
          {activeTab === "syllabus" && (
            <div className="space-y-3">
              {subject.modules.map((mod, idx) => {
                const isExpanded = expandedModuleId === mod.id;
                const richTopics = (mod as any).topics || [];
                
                // Filter topics if search query is active
                const filteredTopics = searchQuery
                  ? richTopics.filter(
                      (t: any) =>
                        t.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                        t.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                        (t.subtopics &&
                          t.subtopics.some(
                            (s: any) =>
                              s.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                              (s.concepts &&
                                s.concepts.some((c: string) =>
                                  c.toLowerCase().includes(searchQuery.toLowerCase())
                                ))
                          ))
                    )
                  : richTopics;

                if (searchQuery && filteredTopics.length === 0 && !mod.title.toLowerCase().includes(searchQuery.toLowerCase())) {
                  return null;
                }

                return (
                  <div
                    key={mod.id}
                    className="rounded border border-zinc-800 bg-[#080A0E] transition-colors overflow-hidden"
                  >
                    {/* Module Accordion Header */}
                    <div
                      onClick={() => setExpandedModuleId(isExpanded ? null : mod.id)}
                      className="p-4 cursor-pointer hover:bg-zinc-900/40 flex items-center justify-between gap-3 transition-colors"
                    >
                      <div className="flex items-start gap-3">
                        <span className="text-xs font-mono text-amber-400 font-bold pt-0.5">
                          {idx + 1 < 10 ? `0${idx + 1}` : idx + 1}.
                        </span>
                        <div>
                          <div className="flex items-center gap-2">
                            <h4 className="text-sm font-semibold text-zinc-100 font-sans">
                              {mod.title}
                            </h4>
                            {(mod as any).difficulty && (
                              <span
                                className={`text-[10px] font-mono px-1.5 py-0.2 rounded border ${
                                  (mod as any).difficulty === "Foundation"
                                    ? "bg-emerald-950/40 text-emerald-400 border-emerald-800/40"
                                    : (mod as any).difficulty === "Intermediate"
                                    ? "bg-amber-950/40 text-amber-400 border-amber-800/40"
                                    : "bg-red-950/40 text-red-400 border-red-800/40"
                                }`}
                              >
                                {(mod as any).difficulty}
                              </span>
                            )}
                          </div>
                          <p className="text-xs text-zinc-400 font-sans mt-0.5 line-clamp-1">
                            {(mod as any).shortDescription || mod.interviewBenchmark}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center gap-3 text-xs font-mono text-zinc-500 flex-shrink-0">
                        <span>{mod.topicsCount} Topics</span>
                        <ChevronDown
                          className={`w-4 h-4 text-zinc-400 transition-transform ${
                            isExpanded ? "rotate-180 text-amber-400" : ""
                          }`}
                        />
                      </div>
                    </div>

                    {/* Module Details & Progressive Hierarchy */}
                    {isExpanded && (
                      <div className="p-4 pt-1 border-t border-zinc-800/70 bg-[#0B0D12] space-y-3">
                        {/* Detailed Overview */}
                        {(mod as any).detailedOverview && (
                          <p className="text-xs text-zinc-400 font-sans leading-relaxed pt-2 pb-1">
                            {(mod as any).detailedOverview}
                          </p>
                        )}

                        {/* Topics List */}
                        {filteredTopics.length > 0 ? (
                          <div className="space-y-2 pt-1">
                            <div className="text-[11px] font-mono uppercase tracking-wider text-zinc-500">
                              Core Topics &amp; Concept Architecture:
                            </div>
                            {filteredTopics.map((topic: any, tIdx: number) => (
                              <div
                                key={topic.id || tIdx}
                                className="p-3 rounded bg-zinc-950/70 border border-zinc-800/60 space-y-2"
                              >
                                <div className="flex items-start justify-between gap-2">
                                  <div className="flex items-center gap-2">
                                    <span className="text-[11px] font-mono text-amber-400 font-medium">
                                      T{tIdx + 1}.
                                    </span>
                                    <h5 className="text-xs font-semibold text-zinc-200 font-sans">
                                      {topic.title}
                                    </h5>
                                  </div>
                                  {topic.difficulty && (
                                    <span className="text-[10px] font-mono text-zinc-400">
                                      {topic.difficulty}
                                    </span>
                                  )}
                                </div>
                                <p className="text-[11px] text-zinc-400 font-sans">
                                  {topic.description}
                                </p>

                                {/* Subtopics & Concept Tags */}
                                {topic.subtopics && topic.subtopics.length > 0 && (
                                  <div className="space-y-1.5 pt-1 border-t border-zinc-900">
                                    {topic.subtopics.map((sub: any) => (
                                      <div key={sub.id} className="text-[11px] font-sans">
                                        <div className="flex items-center gap-1.5 text-zinc-300 font-medium">
                                          <span className="text-amber-400/80 text-[10px]">↳</span>
                                          <span>{sub.title}</span>
                                        </div>
                                        {sub.concepts && (
                                          <div className="flex flex-wrap gap-1 mt-1 pl-3 font-mono text-[10px]">
                                            {sub.concepts.map((c: string) => (
                                              <span
                                                key={c}
                                                className="px-1.5 py-0.2 rounded bg-zinc-900 text-zinc-400 border border-zinc-800/80"
                                              >
                                                {c}
                                              </span>
                                            ))}
                                          </div>
                                        )}
                                        {sub.keyTakeaways && sub.keyTakeaways.length > 0 && (
                                          <div className="pl-3 mt-1 text-[11px] text-zinc-400 italic font-sans">
                                            &ldquo;{sub.keyTakeaways[0]}&rdquo;
                                          </div>
                                        )}
                                      </div>
                                    ))}
                                  </div>
                                )}
                              </div>
                            ))}
                          </div>
                        ) : (
                          /* Fallback to concepts list if rich topics not populated */
                          <div className="flex flex-wrap gap-1.5 my-2 font-mono text-[11px]">
                            {mod.concepts.map((concept) => (
                              <span
                                key={concept}
                                className="px-2 py-0.5 rounded bg-zinc-900 text-zinc-400 border border-zinc-800"
                              >
                                {concept}
                              </span>
                            ))}
                          </div>
                        )}

                        {/* Interview Benchmark Callout */}
                        <div className="mt-3 pt-2.5 border-t border-zinc-800/80 flex items-start gap-2 text-xs">
                          <span className="text-amber-400 font-mono text-sm leading-none">→</span>
                          <div className="font-mono text-[11px]">
                            <span className="text-zinc-500 mr-1.5 uppercase">Interview Benchmark:</span>
                            <span className="text-zinc-300 font-sans">{mod.interviewBenchmark}</span>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          )}

          {/* TAB 2: LEARNING PATHWAYS */}
          {activeTab === "pathways" && (
            <div className="space-y-4">
              <div className="text-xs text-zinc-400 font-sans">
                This discipline is integrated into the following structured career and academic curriculum tracks:
              </div>

              {matchingPathways.map((pathway) => {
                const relevantStep = pathway.steps.find((s) => s.subjectId === subject.id);
                return (
                  <div
                    key={pathway.id}
                    className="p-4 rounded border border-zinc-800 bg-[#080A0E] space-y-3"
                  >
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <div className="flex items-center gap-2">
                        <span className="px-2 py-0.5 rounded bg-amber-950/40 text-amber-400 border border-amber-800/40 text-[11px] font-mono">
                          {pathway.badge}
                        </span>
                        <h4 className="text-sm font-semibold text-zinc-100 font-sans">
                          {pathway.title}
                        </h4>
                      </div>
                      <span className="text-xs font-mono text-zinc-500">
                        {pathway.estimatedWeeks} Weeks Total
                      </span>
                    </div>

                    <p className="text-xs text-zinc-400 font-sans">
                      {pathway.tagline}
                    </p>

                    {relevantStep && (
                      <div className="p-3 rounded bg-zinc-950 border border-zinc-800/80 text-xs font-sans space-y-2">
                        <div className="flex items-center justify-between font-mono text-[11px] text-zinc-400">
                          <span className="text-amber-400 font-semibold">
                            STAGE {relevantStep.stepNumber} :: {relevantStep.subjectName.toUpperCase()}
                          </span>
                          <span>{relevantStep.moduleIds.length} Modules Assigned</span>
                        </div>
                        <p className="text-zinc-300">
                          {relevantStep.focus}
                        </p>
                        <div className="pt-2 border-t border-zinc-900 flex items-start gap-2">
                          <span className="text-amber-400 font-mono text-xs">★</span>
                          <div>
                            <span className="text-zinc-500 font-mono text-[11px] uppercase mr-1">
                              Milestone Project:
                            </span>
                            <span className="text-zinc-200 font-medium">
                              {relevantStep.milestoneProject}
                            </span>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          )}

          {/* TAB 3: TOPIC QUESTION BANK */}
          {activeTab === "questions" && (
            <div className="space-y-3">
              {/* Filter controls */}
              <div className="flex flex-wrap items-center justify-between gap-2 pb-2 border-b border-zinc-800 text-xs font-mono">
                <div className="flex items-center gap-2">
                  <Filter className="w-3.5 h-3.5 text-zinc-500" />
                  <span className="text-zinc-500">Difficulty:</span>
                  {["all", "Foundation", "Intermediate", "Advanced"].map((lvl) => (
                    <button
                      key={lvl}
                      onClick={() => setSelectedDifficulty(lvl)}
                      className={`px-2 py-0.5 rounded text-[11px] transition-colors ${
                        selectedDifficulty.toLowerCase() === lvl.toLowerCase()
                          ? "bg-amber-400/20 text-amber-300 border border-amber-400/40"
                          : "text-zinc-400 hover:text-zinc-200"
                      }`}
                    >
                      {lvl}
                    </button>
                  ))}
                </div>

                <div className="flex items-center gap-2">
                  <span className="text-zinc-500">Type:</span>
                  {["all", "Interview", "Conceptual", "Analytical", "Application"].map((t) => (
                    <button
                      key={t}
                      onClick={() => setSelectedType(t)}
                      className={`px-2 py-0.5 rounded text-[11px] transition-colors ${
                        selectedType.toLowerCase() === t.toLowerCase()
                          ? "bg-amber-400/20 text-amber-300 border border-amber-400/40"
                          : "text-zinc-400 hover:text-zinc-200"
                      }`}
                    >
                      {t}
                    </button>
                  ))}
                </div>
              </div>

              {/* Questions List */}
              {filteredQuestions.length > 0 ? (
                <div className="space-y-2.5">
                  {filteredQuestions.map((q, qIdx) => {
                    const isExpanded = expandedQuestionId === q.id;
                    return (
                      <div
                        key={q.id || qIdx}
                        className="p-3.5 rounded bg-[#080A0E] border border-zinc-800 space-y-2 transition-colors"
                      >
                        <div
                          onClick={() => setExpandedQuestionId(isExpanded ? null : q.id)}
                          className="cursor-pointer flex items-start justify-between gap-3"
                        >
                          <div className="space-y-1">
                            <div className="flex flex-wrap items-center gap-2 font-mono text-[10px]">
                              <span className="text-amber-400 font-bold">
                                Q{qIdx + 1}
                              </span>
                              <span className="px-1.5 py-0.2 rounded bg-zinc-900 text-zinc-400 border border-zinc-800">
                                {q.type}
                              </span>
                              <span
                                className={`px-1.5 py-0.2 rounded border ${
                                  q.difficulty === "Foundation"
                                    ? "bg-emerald-950/40 text-emerald-400 border-emerald-800/40"
                                    : q.difficulty === "Intermediate"
                                    ? "bg-amber-950/40 text-amber-400 border-amber-800/40"
                                    : "bg-red-950/40 text-red-400 border-red-800/40"
                                }`}
                              >
                                {q.difficulty}
                              </span>
                              <span className="text-zinc-500">
                                {q.topicTitle}
                              </span>
                            </div>
                            <h5 className="text-xs sm:text-sm font-medium text-zinc-100 font-sans leading-relaxed pt-0.5">
                              {q.statement}
                            </h5>
                          </div>

                          <ChevronDown
                            className={`w-4 h-4 text-zinc-400 transition-transform flex-shrink-0 mt-1 ${
                              isExpanded ? "rotate-180 text-amber-400" : ""
                            }`}
                          />
                        </div>

                        {/* Explanation & Technical Breakdown */}
                        {isExpanded && (
                          <div className="pt-2 mt-2 border-t border-zinc-800/80 bg-zinc-950/60 p-3 rounded text-xs font-sans text-zinc-300 leading-relaxed space-y-2">
                            <div className="font-mono text-[11px] text-amber-400 uppercase tracking-wider">
                              Technical Breakdown &amp; Invariants:
                            </div>
                            <p>{q.explanation}</p>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              ) : (
                <div className="text-center py-12 text-zinc-500 font-mono text-xs">
                  No questions match your current search and filter criteria.
                </div>
              )}
            </div>
          )}

          {/* Key Mechanisms Bottom Bar */}
          <div className="p-4 rounded bg-[#080A0E] border border-zinc-800 text-xs font-sans mt-4">
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
            {subject.topicsCount} topics • {allSubjectQuestions.length || subject.interviewQuestionsCount} benchmark questions verified
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
