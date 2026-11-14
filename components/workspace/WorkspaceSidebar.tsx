"use client";

import React, { useState, useMemo, useEffect } from "react";
import {
  CurriculumSubject,
  CurriculumModule,
  CurriculumTopic,
  CurriculumLesson,
} from "@/lib/data/curriculum/types";
import { ChevronDown, ChevronRight, Search, X, CheckCircle2 } from "lucide-react";

interface WorkspaceSidebarProps {
  subject: CurriculumSubject;
  selectedTopicId: string | null;
  selectedLessonId?: string | null;
  completedLessonIds?: Set<string>;
  onSelectTopic: (module: CurriculumModule, topic: CurriculumTopic, lesson?: CurriculumLesson) => void;
  onCloseMobile?: () => void;
}

const DIFFICULTY_DOT: Record<string, string> = {
  Foundation: "bg-emerald-500",
  Intermediate: "bg-amber-400",
  Advanced: "bg-red-500",
};

export const WorkspaceSidebar: React.FC<WorkspaceSidebarProps> = ({
  subject,
  selectedTopicId,
  selectedLessonId,
  completedLessonIds,
  onSelectTopic,
  onCloseMobile,
}) => {
  const [searchQuery, setSearchQuery] = useState("");
  // Default first module open
  const [expandedModuleIds, setExpandedModuleIds] = useState<Set<string>>(
    () => new Set(subject.modules.length > 0 ? [subject.modules[0].id] : [])
  );
  // Track expanded topics (for topics that have child lessons)
  const [expandedTopicIds, setExpandedTopicIds] = useState<Set<string>>(
    () => new Set(selectedTopicId ? [selectedTopicId] : [])
  );

  // Auto-expand module and topic if selected topic changes
  useEffect(() => {
    if (selectedTopicId) {
      setExpandedTopicIds((prev) => {
        const next = new Set(prev);
        next.add(selectedTopicId);
        return next;
      });
      for (const mod of subject.modules) {
        if (mod.topics.some((t) => t.id === selectedTopicId)) {
          setExpandedModuleIds((prev) => {
            const next = new Set(prev);
            next.add(mod.id);
            return next;
          });
          break;
        }
      }
    }
  }, [selectedTopicId, subject.modules]);

  const toggleModule = (id: string) => {
    setExpandedModuleIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const toggleTopic = (id: string) => {
    setExpandedTopicIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  // Check if subject has lessons architecture (e.g. OS)
  const allLessons = useMemo(
    () => subject.modules.flatMap((m) => m.topics.flatMap((t) => t.lessons ?? [])),
    [subject.modules]
  );
  const hasLessons = allLessons.length > 0;

  // Calculate progress
  const allTopics = useMemo(
    () => subject.modules.flatMap((m) => m.topics),
    [subject.modules]
  );
  const totalTopics = allTopics.length;
  const totalLessons = allLessons.length;

  const totalProgressUnits = hasLessons ? totalLessons : totalTopics;
  const completedProgressUnits = useMemo(() => {
    if (hasLessons) {
      if (!completedLessonIds || completedLessonIds.size === 0) return 0;
      return allLessons.filter((l) => completedLessonIds.has(l.id)).length;
    }
    const selectedIdx = selectedTopicId
      ? allTopics.findIndex((t) => t.id === selectedTopicId)
      : -1;
    return selectedIdx >= 0 ? selectedIdx + 1 : 0;
  }, [hasLessons, completedLessonIds, allLessons, selectedTopicId, allTopics]);

  const progressPct =
    totalProgressUnits > 0
      ? Math.round((completedProgressUnits / totalProgressUnits) * 100)
      : 0;

  // Filter modules/topics/lessons by search
  const filteredModules = useMemo(() => {
    if (!searchQuery.trim()) return subject.modules;
    const q = searchQuery.toLowerCase();

    return subject.modules
      .map((mod) => {
        const matchingTopics = mod.topics
          .map((t) => {
            const topicMatches =
              t.title.toLowerCase().includes(q) ||
              t.description.toLowerCase().includes(q) ||
              t.subtopics.some(
                (s) =>
                  s.title.toLowerCase().includes(q) ||
                  s.concepts.some((c) => c.toLowerCase().includes(q))
              );

            const matchingLessons = (t.lessons ?? []).filter(
              (l) =>
                l.title.toLowerCase().includes(q) ||
                (l.shortDescription && l.shortDescription.toLowerCase().includes(q)) ||
                (l.concepts && l.concepts.some((c) => c.toLowerCase().includes(q)))
            );

            if (topicMatches || matchingLessons.length > 0) {
              return {
                ...t,
                lessons: matchingLessons.length > 0 ? matchingLessons : t.lessons,
              };
            }
            return null;
          })
          .filter(Boolean) as CurriculumTopic[];

        return {
          ...mod,
          topics: matchingTopics,
        };
      })
      .filter((mod) => mod.topics.length > 0 || mod.title.toLowerCase().includes(q));
  }, [subject.modules, searchQuery]);

  return (
    <div className="flex flex-col h-full">
      {/* Subject header */}
      <div className="px-4 py-4 border-b border-zinc-800 flex-shrink-0">
        <div className="flex items-center justify-between mb-3">
          <div>
            <div className="text-[10px] font-mono text-amber-400 uppercase tracking-widest mb-0.5">
              {subject.shortName}
            </div>
            <h2 className="text-sm font-serif text-white font-normal leading-snug">
              {subject.name}
            </h2>
          </div>
          {/* Mobile close */}
          {onCloseMobile && (
            <button
              onClick={onCloseMobile}
              className="lg:hidden p-1 text-zinc-500 hover:text-white"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Progress bar */}
        <div className="space-y-1">
          <div className="flex justify-between text-[10px] font-mono text-zinc-500">
            <span>Progress</span>
            <span>{progressPct}%</span>
          </div>
          <div className="h-1 bg-zinc-800 rounded-full overflow-hidden">
            <div
              className="h-full bg-amber-400 rounded-full transition-all duration-500"
              style={{ width: `${progressPct}%` }}
            />
          </div>
          <div className="text-[10px] font-mono text-zinc-600 flex justify-between">
            <span>
              {hasLessons
                ? `${completedProgressUnits} / ${totalLessons} lessons`
                : `${totalTopics} topics total`}
            </span>
            {hasLessons && completedProgressUnits > 0 && (
              <span className="text-emerald-400/80">
                {Math.round((completedProgressUnits / totalLessons) * 100)}% done
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Search */}
      <div className="px-4 py-3 border-b border-zinc-800 flex-shrink-0">
        <div className="relative">
          <Search className="w-3.5 h-3.5 absolute left-2.5 top-1/2 -translate-y-1/2 text-zinc-500" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={hasLessons ? "Search topics & lessons..." : "Search topics..."}
            className="w-full pl-8 pr-3 py-1.5 bg-zinc-900 border border-zinc-800 rounded text-xs text-zinc-200 placeholder-zinc-600 font-mono focus:outline-none focus:border-amber-400/40 transition-colors"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery("")}
              className="absolute right-2.5 top-1/2 -translate-y-1/2 text-zinc-500 hover:text-zinc-300"
            >
              <X className="w-3 h-3" />
            </button>
          )}
        </div>
      </div>

      {/* Module/Topic/Lesson tree */}
      <div className="flex-1 overflow-y-auto py-2">
        {filteredModules.length === 0 && (
          <p className="px-4 py-6 text-xs text-zinc-600 font-mono text-center">
            No items match &ldquo;{searchQuery}&rdquo;
          </p>
        )}

        {filteredModules.map((mod, modIdx) => {
          const isModExpanded = searchQuery ? true : expandedModuleIds.has(mod.id);

          return (
            <div key={mod.id} className="mb-1">
              {/* Module header */}
              <button
                onClick={() => toggleModule(mod.id)}
                className="w-full flex items-center gap-2 px-4 py-2 text-left hover:bg-zinc-900/50 transition-colors group"
              >
                <span className="text-[10px] font-mono text-zinc-600 flex-shrink-0 w-4">
                  {String(modIdx + 1).padStart(2, "0")}
                </span>
                <span className="flex-1 text-xs font-sans text-zinc-400 group-hover:text-zinc-200 transition-colors leading-snug">
                  {mod.title}
                </span>
                <span className="flex-shrink-0 text-zinc-600">
                  {isModExpanded ? (
                    <ChevronDown className="w-3.5 h-3.5" />
                  ) : (
                    <ChevronRight className="w-3.5 h-3.5" />
                  )}
                </span>
              </button>

              {/* Topics */}
              {isModExpanded && (
                <div className="pb-1">
                  {mod.topics.map((topic) => {
                    const isTopicLessons = Boolean(topic.lessons && topic.lessons.length > 0);
                    const isTopicActive = topic.id === selectedTopicId;
                    const isTopicExpanded =
                      searchQuery ? true : expandedTopicIds.has(topic.id) || isTopicActive;

                    if (isTopicLessons && topic.lessons) {
                      // Topic has child lessons
                      const completedCount = topic.lessons.filter(
                        (l) => completedLessonIds?.has(l.id)
                      ).length;
                      const allDone = completedCount === topic.lessons.length && topic.lessons.length > 0;

                      return (
                        <div key={topic.id} className="mb-0.5">
                          {/* Topic Toggle Row */}
                          <button
                            onClick={() => {
                              toggleTopic(topic.id);
                              // If closed and clicked, select the first lesson if no lesson is selected in this topic
                              if (!isTopicExpanded) {
                                onSelectTopic(mod, topic, topic.lessons![0]);
                              }
                            }}
                            className={`w-full flex items-center justify-between gap-1.5 pl-7 pr-3 py-1.5 text-left transition-colors group ${
                              isTopicActive
                                ? "bg-amber-950/20 text-amber-200 font-medium"
                                : "hover:bg-zinc-900/40 text-zinc-400 hover:text-zinc-200"
                            }`}
                          >
                            <div className="flex items-center gap-2 min-w-0">
                              <span className="text-zinc-600 group-hover:text-zinc-400 flex-shrink-0">
                                {isTopicExpanded ? (
                                  <ChevronDown className="w-3 h-3" />
                                ) : (
                                  <ChevronRight className="w-3 h-3" />
                                )}
                              </span>
                              <span className="text-xs font-sans truncate leading-snug">
                                {topic.title}
                              </span>
                            </div>
                            <span
                              className={`text-[9px] font-mono px-1.5 py-0.5 rounded border flex-shrink-0 ${
                                allDone
                                  ? "text-emerald-400 border-emerald-800/40 bg-emerald-950/20"
                                  : "text-zinc-500 border-zinc-800 bg-zinc-900"
                              }`}
                            >
                              {completedCount > 0
                                ? `${completedCount}/${topic.lessons.length}`
                                : `${topic.lessons.length}`}
                            </span>
                          </button>

                          {/* Indented Lessons List */}
                          {isTopicExpanded && (
                            <div className="pl-5 space-y-0.5 pt-0.5 pb-1 border-l border-zinc-800/60 ml-8">
                              {topic.lessons.map((lesson) => {
                                const isLessonActive =
                                  lesson.id === selectedLessonId;
                                const isCompleted = completedLessonIds?.has(lesson.id);
                                const dot =
                                  DIFFICULTY_DOT[lesson.difficulty] ?? "bg-zinc-600";

                                return (
                                  <button
                                    key={lesson.id}
                                    onClick={() => onSelectTopic(mod, topic, lesson)}
                                    className={`w-full flex items-start gap-2 pl-3 pr-3 py-1.5 text-left transition-all text-xs rounded-sm group ${
                                      isLessonActive
                                        ? "border-l-2 border-amber-400 bg-amber-950/30 text-white font-medium pl-2.5"
                                        : "hover:bg-zinc-900/60 text-zinc-400 hover:text-zinc-200"
                                    }`}
                                  >
                                    <span className="mt-1 flex-shrink-0">
                                      {isCompleted ? (
                                        <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                                      ) : (
                                        <span className={`block w-1.5 h-1.5 rounded-full ${dot}`} />
                                      )}
                                    </span>
                                    <span className="leading-snug text-[11.5px] truncate">
                                      {lesson.title}
                                    </span>
                                  </button>
                                );
                              })}
                            </div>
                          )}
                        </div>
                      );
                    }

                    // Backward-compatible Topic button for non-OS subjects
                    const dot = DIFFICULTY_DOT[topic.difficulty] ?? "bg-zinc-600";
                    return (
                      <button
                        key={topic.id}
                        onClick={() => onSelectTopic(mod, topic)}
                        className={`w-full flex items-start gap-2.5 pl-9 pr-4 py-2 text-left transition-all group ${
                          isTopicActive
                            ? "border-l-2 border-amber-400 bg-amber-950/10 pl-8"
                            : "border-l-2 border-transparent hover:bg-zinc-900/40 hover:border-zinc-700"
                        }`}
                      >
                        <span className={`mt-1.5 w-1.5 h-1.5 rounded-full flex-shrink-0 ${dot}`} />
                        <span
                          className={`text-xs leading-snug font-sans ${
                            isTopicActive
                              ? "text-white font-medium"
                              : "text-zinc-500 group-hover:text-zinc-300"
                          }`}
                        >
                          {topic.title}
                        </span>
                      </button>
                    );
                  })}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Difficulty legend */}
      <div className="px-4 py-3 border-t border-zinc-800 flex-shrink-0 flex items-center gap-4">
        <span className="text-[10px] font-mono text-zinc-600 uppercase tracking-wider">Level</span>
        {[
          { label: "Foundation", dot: "bg-emerald-500" },
          { label: "Intermediate", dot: "bg-amber-400" },
          { label: "Advanced", dot: "bg-red-500" },
        ].map((l) => (
          <div key={l.label} className="flex items-center gap-1">
            <span className={`w-1.5 h-1.5 rounded-full ${l.dot}`} />
            <span className="text-[10px] font-mono text-zinc-600">{l.label.slice(0, 3)}</span>
          </div>
        ))}
      </div>
    </div>
  );
};
