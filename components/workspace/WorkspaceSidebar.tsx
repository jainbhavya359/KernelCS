"use client";

import React, { useState, useMemo } from "react";
import { CurriculumSubject, CurriculumModule, CurriculumTopic } from "@/lib/data/curriculum/types";
import { ChevronDown, ChevronRight, Search, X } from "lucide-react";

interface WorkspaceSidebarProps {
  subject: CurriculumSubject;
  selectedTopicId: string | null;
  onSelectTopic: (module: CurriculumModule, topic: CurriculumTopic) => void;
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
  onSelectTopic,
  onCloseMobile,
}) => {
  const [searchQuery, setSearchQuery] = useState("");
  // Only the first module open by default
  const [expandedModuleIds, setExpandedModuleIds] = useState<Set<string>>(
    () => new Set(subject.modules.length > 0 ? [subject.modules[0].id] : [])
  );

  const toggleModule = (id: string) => {
    setExpandedModuleIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  // Calculate total topics for progress (placeholder: 0% unless a topic is selected)
  const allTopics = useMemo(
    () => subject.modules.flatMap((m) => m.topics),
    [subject.modules]
  );
  const totalTopics = allTopics.length;
  const selectedIdx = selectedTopicId
    ? allTopics.findIndex((t) => t.id === selectedTopicId)
    : -1;
  const progressPct = selectedIdx >= 0 ? Math.round(((selectedIdx + 1) / totalTopics) * 100) : 0;

  // Filter modules/topics by search
  const filteredModules = useMemo(() => {
    if (!searchQuery.trim()) return subject.modules;
    const q = searchQuery.toLowerCase();
    return subject.modules
      .map((mod) => ({
        ...mod,
        topics: mod.topics.filter(
          (t) =>
            t.title.toLowerCase().includes(q) ||
            t.description.toLowerCase().includes(q) ||
            t.subtopics.some(
              (s) =>
                s.title.toLowerCase().includes(q) ||
                s.concepts.some((c) => c.toLowerCase().includes(q))
            )
        ),
      }))
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
          <div className="text-[10px] font-mono text-zinc-600">
            {totalTopics} topics total
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
            placeholder="Search topics..."
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

      {/* Module/Topic tree */}
      <div className="flex-1 overflow-y-auto py-2">
        {filteredModules.length === 0 && (
          <p className="px-4 py-6 text-xs text-zinc-600 font-mono text-center">
            No topics match &ldquo;{searchQuery}&rdquo;
          </p>
        )}

        {filteredModules.map((mod, modIdx) => {
          const isExpanded = searchQuery ? true : expandedModuleIds.has(mod.id);

          return (
            <div key={mod.id} className="mb-1">
              {/* Module header */}
              <button
                onClick={() => toggleModule(mod.id)}
                className="w-full flex items-center gap-2 px-4 py-2.5 text-left hover:bg-zinc-900/50 transition-colors group"
              >
                <span className="text-[10px] font-mono text-zinc-600 flex-shrink-0 w-4">
                  {String(modIdx + 1).padStart(2, "0")}
                </span>
                <span className="flex-1 text-xs font-sans text-zinc-400 group-hover:text-zinc-200 transition-colors leading-snug">
                  {mod.title}
                </span>
                <span className="flex-shrink-0 text-zinc-600">
                  {isExpanded ? (
                    <ChevronDown className="w-3.5 h-3.5" />
                  ) : (
                    <ChevronRight className="w-3.5 h-3.5" />
                  )}
                </span>
              </button>

              {/* Topics */}
              {isExpanded && (
                <div className="pb-1">
                  {mod.topics.map((topic) => {
                    const isActive = topic.id === selectedTopicId;
                    const dot = DIFFICULTY_DOT[topic.difficulty] ?? "bg-zinc-600";

                    return (
                      <button
                        key={topic.id}
                        onClick={() => onSelectTopic(mod, topic)}
                        className={`w-full flex items-start gap-2.5 pl-9 pr-4 py-2 text-left transition-all group ${
                          isActive
                            ? "border-l-2 border-amber-400 bg-amber-950/10 pl-8"
                            : "border-l-2 border-transparent hover:bg-zinc-900/40 hover:border-zinc-700"
                        }`}
                      >
                        {/* Difficulty dot */}
                        <span className={`mt-1.5 w-1.5 h-1.5 rounded-full flex-shrink-0 ${dot}`} />
                        <span
                          className={`text-xs leading-snug font-sans ${
                            isActive ? "text-white font-medium" : "text-zinc-500 group-hover:text-zinc-300"
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

