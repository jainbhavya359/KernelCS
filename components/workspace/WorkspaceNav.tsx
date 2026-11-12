"use client";

import React from "react";
import { BookOpen, FlaskConical, HelpCircle, MessageSquare, Bookmark } from "lucide-react";

export type WorkspaceTab = "learn" | "lab" | "practice" | "interview" | "revision";

// Labs that exist for each subject ID
const SUBJECT_LAB_MAP: Record<string, boolean> = {
  os: true,
  dbms: true,
  cn: true,
  dsa: true,
  architecture: true,
  oop: false,
  sysdesign: false,
  git: false,
};

interface WorkspaceNavProps {
  activeTab: WorkspaceTab;
  onChangeTab: (tab: WorkspaceTab) => void;
  hasSelectedTopic: boolean;
  subjectId: string;
}

interface TabDef {
  id: WorkspaceTab;
  label: string;
  icon: React.ReactNode;
  available: (subjectId: string) => boolean;
  disabledLabel?: string;
}

const TABS: TabDef[] = [
  {
    id: "learn",
    label: "Learn",
    icon: <BookOpen className="w-3.5 h-3.5" />,
    available: () => true,
  },
  {
    id: "lab",
    label: "Laboratory",
    icon: <FlaskConical className="w-3.5 h-3.5" />,
    available: (id) => !!SUBJECT_LAB_MAP[id],
    disabledLabel: "Lab coming soon",
  },
  {
    id: "practice",
    label: "Practice",
    icon: <HelpCircle className="w-3.5 h-3.5" />,
    available: () => true,
  },
  {
    id: "interview",
    label: "Interview",
    icon: <MessageSquare className="w-3.5 h-3.5" />,
    available: () => true,
  },
  {
    id: "revision",
    label: "Revision",
    icon: <Bookmark className="w-3.5 h-3.5" />,
    available: () => false,
    disabledLabel: "Coming soon",
  },
];

export const WorkspaceNav: React.FC<WorkspaceNavProps> = ({
  activeTab,
  onChangeTab,
  hasSelectedTopic,
  subjectId,
}) => {
  return (
    <nav className="flex items-center gap-0.5 overflow-x-auto">
      {TABS.map((tab) => {
        const isAvailable = tab.available(subjectId);
        const isActive = activeTab === tab.id;

        if (!isAvailable) {
          return (
            <div
              key={tab.id}
              title={tab.disabledLabel}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded text-xs font-mono text-zinc-700 cursor-not-allowed select-none whitespace-nowrap"
            >
              {tab.icon}
              <span className="hidden sm:inline">{tab.label}</span>
              <span className="hidden sm:inline text-[9px] text-zinc-700 font-mono uppercase tracking-wider">
                · soon
              </span>
            </div>
          );
        }

        return (
          <button
            key={tab.id}
            onClick={() => onChangeTab(tab.id)}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded text-xs font-mono transition-all whitespace-nowrap ${
              isActive
                ? "bg-[#141822] text-amber-400 border border-amber-400/20"
                : "text-zinc-500 hover:text-zinc-200 hover:bg-zinc-900/60"
            }`}
          >
            {tab.icon}
            <span className="hidden sm:inline">{tab.label}</span>
          </button>
        );
      })}
    </nav>
  );
};

