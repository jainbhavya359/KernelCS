"use client";

import React, { useState, useEffect, useCallback, useMemo } from "react";
import {
  CurriculumSubject,
  CurriculumModule,
  CurriculumTopic,
  CurriculumLesson,
} from "@/lib/data/curriculum/types";
import { WorkspaceSidebar } from "./WorkspaceSidebar";
import { SubjectOverview } from "./SubjectOverview";
import { TopicContent } from "./TopicContent";
import { WorkspaceRightPanel } from "./WorkspaceRightPanel";
import { WorkspaceNav, WorkspaceTab } from "./WorkspaceNav";
import { PanelRight, Menu, X } from "lucide-react";

interface WorkspaceShellProps {
  subject: CurriculumSubject;
}

export interface SelectedTopic {
  module: CurriculumModule;
  topic: CurriculumTopic;
  lesson?: CurriculumLesson;
}

function getStorageKey(subjectId: string) {
  return `kernelcs_last_${subjectId}`;
}

function getCompletedStorageKey(subjectId: string) {
  return `kernelcs_completed_${subjectId}`;
}

export const WorkspaceShell: React.FC<WorkspaceShellProps> = ({ subject }) => {
  const [selectedTopic, setSelectedTopic] = useState<SelectedTopic | null>(null);
  const [activeTab, setActiveTab] = useState<WorkspaceTab>("learn");
  const [rightPanelOpen, setRightPanelOpen] = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState(false); // mobile drawer
  const [isReturning, setIsReturning] = useState(false);
  const [lastTopicStored, setLastTopicStored] = useState<{
    moduleId: string;
    topicId: string;
    lessonId?: string;
  } | null>(null);
  const [completedLessonIds, setCompletedLessonIds] = useState<Set<string>>(() => new Set());

  // On mount: check localStorage for returning student and completed lessons
  useEffect(() => {
    try {
      const stored = localStorage.getItem(getStorageKey(subject.id));
      if (stored) {
        const parsed = JSON.parse(stored);
        setLastTopicStored(parsed);
        setIsReturning(true);
      }
    } catch {
      // ignore
    }

    try {
      const completedStored = localStorage.getItem(getCompletedStorageKey(subject.id));
      if (completedStored) {
        setCompletedLessonIds(new Set(JSON.parse(completedStored)));
      }
    } catch {
      // ignore
    }

    // On narrow screens close right panel by default
    if (typeof window !== "undefined" && window.innerWidth < 1280) {
      setRightPanelOpen(false);
    }
  }, [subject.id]);

  // Persist completed lessons
  const handleToggleCompleteLesson = useCallback(
    (lessonId: string) => {
      setCompletedLessonIds((prev) => {
        const next = new Set(prev);
        if (next.has(lessonId)) {
          next.delete(lessonId);
        } else {
          next.add(lessonId);
        }
        try {
          localStorage.setItem(
            getCompletedStorageKey(subject.id),
            JSON.stringify(Array.from(next))
          );
        } catch {
          // ignore
        }
        return next;
      });
    },
    [subject.id]
  );

  // Persist last visited topic/lesson
  const handleSelectTopic = useCallback(
    (
      module: CurriculumModule,
      topic: CurriculumTopic,
      lesson?: CurriculumLesson
    ) => {
      const chosenLesson =
        lesson ??
        (topic.lessons && topic.lessons.length > 0 ? topic.lessons[0] : undefined);

      setSelectedTopic({ module, topic, lesson: chosenLesson });
      setActiveTab("learn");
      setSidebarOpen(false);
      try {
        localStorage.setItem(
          getStorageKey(subject.id),
          JSON.stringify({
            moduleId: module.id,
            topicId: topic.id,
            lessonId: chosenLesson?.id,
          })
        );
      } catch {
        // ignore
      }
    },
    [subject.id]
  );

  // Resume from last topic/lesson
  const handleResume = useCallback(() => {
    if (!lastTopicStored) return;
    for (const mod of subject.modules) {
      if (mod.id === lastTopicStored.moduleId) {
        const topic = mod.topics.find((t) => t.id === lastTopicStored.topicId);
        if (topic) {
          const lesson =
            lastTopicStored.lessonId && topic.lessons
              ? topic.lessons.find((l) => l.id === lastTopicStored.lessonId)
              : undefined;
          handleSelectTopic(mod, topic, lesson);
          return;
        }
      }
    }
  }, [lastTopicStored, subject.modules, handleSelectTopic]);

  // Flattened navigation units (each lesson is a distinct step; if no lessons, topic is the step)
  const navUnits: SelectedTopic[] = useMemo(() => {
    const units: SelectedTopic[] = [];
    subject.modules.forEach((mod) => {
      mod.topics.forEach((top) => {
        if (top.lessons && top.lessons.length > 0) {
          top.lessons.forEach((les) => {
            units.push({ module: mod, topic: top, lesson: les });
          });
        } else {
          units.push({ module: mod, topic: top });
        }
      });
    });
    return units;
  }, [subject.modules]);

  const currentIdx = selectedTopic
    ? navUnits.findIndex((u) => {
        if (u.lesson && selectedTopic.lesson) {
          return u.lesson.id === selectedTopic.lesson.id;
        }
        return u.topic.id === selectedTopic.topic.id;
      })
    : -1;

  const prevTopic = currentIdx > 0 ? navUnits[currentIdx - 1] : null;
  const nextTopic =
    currentIdx >= 0 && currentIdx < navUnits.length - 1
      ? navUnits[currentIdx + 1]
      : null;

  // Last topic info for overview card
  const lastTopicInfo = lastTopicStored
    ? (() => {
        for (const mod of subject.modules) {
          if (mod.id === lastTopicStored.moduleId) {
            const topic = mod.topics.find((t) => t.id === lastTopicStored.topicId);
            if (topic) {
              const lesson =
                lastTopicStored.lessonId && topic.lessons
                  ? topic.lessons.find((l) => l.id === lastTopicStored.lessonId)
                  : undefined;
              return { module: mod, topic, lesson };
            }
          }
        }
        return null;
      })()
    : null;

  return (
    <div className="flex h-[calc(100vh-3rem)] overflow-hidden">
      {/* Mobile sidebar overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/60 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* LEFT SIDEBAR */}
      <aside
        className={`
          fixed lg:static inset-y-0 left-0 z-50 lg:z-auto
          w-72 flex-shrink-0 h-full lg:h-auto
          bg-[#0A0C10] border-r border-zinc-800
          transition-transform duration-300
          ${sidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
          flex flex-col
        `}
        style={{ top: "3rem" }}
      >
        <WorkspaceSidebar
          subject={subject}
          selectedTopicId={selectedTopic?.topic.id ?? null}
          selectedLessonId={selectedTopic?.lesson?.id ?? null}
          completedLessonIds={completedLessonIds}
          onSelectTopic={handleSelectTopic}
          onCloseMobile={() => setSidebarOpen(false)}
        />
      </aside>

      {/* MAIN CONTENT AREA */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Top bar: mobile sidebar toggle + tab nav + right panel toggle */}
        <div className="flex items-center gap-2 px-4 py-2 border-b border-zinc-800 bg-[#0A0C10] flex-shrink-0">
          {/* Mobile hamburger */}
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="lg:hidden p-1.5 text-zinc-400 hover:text-white rounded border border-zinc-800 bg-zinc-900"
            aria-label="Toggle sidebar"
          >
            {sidebarOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
          </button>

          {/* Tab navigation */}
          <div className="flex-1">
            <WorkspaceNav
              activeTab={activeTab}
              onChangeTab={setActiveTab}
              hasSelectedTopic={!!selectedTopic}
              subjectId={subject.id}
            />
          </div>

          {/* Right panel toggle */}
          {selectedTopic && (
            <button
              onClick={() => setRightPanelOpen((v) => !v)}
              className={`flex-shrink-0 p-1.5 rounded border transition-colors ${
                rightPanelOpen
                  ? "text-amber-400 border-amber-400/30 bg-amber-950/20"
                  : "text-zinc-500 border-zinc-800 hover:text-zinc-300 bg-zinc-900"
              }`}
              title={rightPanelOpen ? "Hide context panel" : "Show context panel"}
            >
              <PanelRight className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Scrollable main content */}
        <div className="flex-1 overflow-y-auto">
          {!selectedTopic ? (
            <SubjectOverview
              subject={subject}
              isReturning={isReturning}
              lastTopicInfo={lastTopicInfo}
              onSelectFirstTopic={() => {
                const first = navUnits[0];
                if (first) handleSelectTopic(first.module, first.topic, first.lesson);
              }}
              onResume={handleResume}
              onSelectTopic={handleSelectTopic}
            />
          ) : (
            <TopicContent
              subject={subject}
              selectedTopic={selectedTopic}
              activeTab={activeTab}
              prevTopic={prevTopic}
              nextTopic={nextTopic}
              onNavigate={handleSelectTopic}
              onToggleCompleteLesson={handleToggleCompleteLesson}
              isLessonCompleted={Boolean(
                selectedTopic.lesson && completedLessonIds.has(selectedTopic.lesson.id)
              )}
            />
          )}
        </div>
      </div>

      {/* RIGHT PANEL */}
      {selectedTopic && rightPanelOpen && (
        <aside className="hidden xl:flex flex-col w-64 flex-shrink-0 border-l border-zinc-800 bg-[#0A0C10] overflow-y-auto">
          <WorkspaceRightPanel
            subject={subject}
            selectedTopic={selectedTopic}
            onClose={() => setRightPanelOpen(false)}
          />
        </aside>
      )}
    </div>
  );
};
