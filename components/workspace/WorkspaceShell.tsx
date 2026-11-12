"use client";

import React, { useState, useEffect, useCallback } from "react";
import { CurriculumSubject, CurriculumModule, CurriculumTopic } from "@/lib/data/curriculum/types";
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
}

function getStorageKey(subjectId: string) {
  return `kernelcs_last_${subjectId}`;
}

export const WorkspaceShell: React.FC<WorkspaceShellProps> = ({ subject }) => {
  const [selectedTopic, setSelectedTopic] = useState<SelectedTopic | null>(null);
  const [activeTab, setActiveTab] = useState<WorkspaceTab>("learn");
  const [rightPanelOpen, setRightPanelOpen] = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState(false); // mobile drawer
  const [isReturning, setIsReturning] = useState(false);
  const [lastTopicStored, setLastTopicStored] = useState<{ moduleId: string; topicId: string } | null>(null);

  // On mount: check localStorage for returning student
  useEffect(() => {
    try {
      const stored = localStorage.getItem(getStorageKey(subject.id));
      if (stored) {
        const { moduleId, topicId } = JSON.parse(stored);
        setLastTopicStored({ moduleId, topicId });
        setIsReturning(true);
      }
    } catch {
      // ignore
    }
    // On narrow screens close right panel by default
    if (typeof window !== "undefined" && window.innerWidth < 1280) {
      setRightPanelOpen(false);
    }
  }, [subject.id]);

  // Persist last visited topic
  const handleSelectTopic = useCallback((module: CurriculumModule, topic: CurriculumTopic) => {
    setSelectedTopic({ module, topic });
    setActiveTab("learn");
    setSidebarOpen(false);
    try {
      localStorage.setItem(
        getStorageKey(subject.id),
        JSON.stringify({ moduleId: module.id, topicId: topic.id })
      );
    } catch {
      // ignore
    }
  }, [subject.id]);

  // Resume from last topic
  const handleResume = useCallback(() => {
    if (!lastTopicStored) return;
    for (const mod of subject.modules) {
      if (mod.id === lastTopicStored.moduleId) {
        const topic = mod.topics.find((t) => t.id === lastTopicStored.topicId);
        if (topic) {
          handleSelectTopic(mod, topic);
          return;
        }
      }
    }
  }, [lastTopicStored, subject.modules, handleSelectTopic]);

  // Navigate prev/next topic
  const allTopics: SelectedTopic[] = subject.modules.flatMap((mod) =>
    mod.topics.map((topic) => ({ module: mod, topic }))
  );
  const currentIdx = selectedTopic
    ? allTopics.findIndex(
        (t) => t.topic.id === selectedTopic.topic.id
      )
    : -1;
  const prevTopic = currentIdx > 0 ? allTopics[currentIdx - 1] : null;
  const nextTopic = currentIdx >= 0 && currentIdx < allTopics.length - 1 ? allTopics[currentIdx + 1] : null;

  // Last topic info for overview card
  const lastTopicInfo = lastTopicStored
    ? (() => {
        for (const mod of subject.modules) {
          if (mod.id === lastTopicStored.moduleId) {
            const topic = mod.topics.find((t) => t.id === lastTopicStored.topicId);
            if (topic) return { module: mod, topic };
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
                const first = allTopics[0];
                if (first) handleSelectTopic(first.module, first.topic);
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

