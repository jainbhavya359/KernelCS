"use client";

import React, { useState } from "react";
import { SUBJECTS_DATA, Subject } from "@/lib/data/subjects";
import { CurriculumModal } from "@/components/ui/CurriculumModal";
import { ArrowRight, ChevronRight, Terminal, BookOpen } from "lucide-react";

export const ExploreSubjects: React.FC = () => {
  const [selectedSubjectId, setSelectedSubjectId] = useState<string>("os");
  const [activeCurriculumSubject, setActiveCurriculumSubject] = useState<Subject | null>(null);

  const activeSubject = SUBJECTS_DATA.find((s) => s.id === selectedSubjectId) || SUBJECTS_DATA[1];

  const directoryGroups = [
    {
      group: "Systems & Silicon",
      subjects: ["os", "cn", "architecture"],
    },
    {
      group: "Foundations & Complexity",
      subjects: ["dsa", "oop"],
    },
    {
      group: "Storage & Distributed Scale",
      subjects: ["dbms", "sysdesign", "git"],
    },
  ];

  return (
    <section id="subjects" className="py-24 sm:py-32 relative border-b border-zinc-800/80 bg-[#0A0C10]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Title: Editorial Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-8 mb-12 border-b border-zinc-800">
          <div>
            <div className="text-xs font-mono text-zinc-500 uppercase tracking-widest mb-2">
              Directory :: 02 / The Disciplines
            </div>
            <h2 className="text-3xl sm:text-5xl font-serif text-white tracking-tight font-normal">
              The Architecture of Computation
            </h2>
          </div>
          <p className="text-sm text-zinc-400 font-sans max-w-md leading-relaxed">
            Every core discipline explored from first principles. Select an area to inspect its foundational mechanisms and syllabus.
          </p>
        </div>

        {/* Asymmetric Technical Directory: Left Index, Right Blueprint */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Structured Editorial Index (5 Cols) */}
          <div className="lg:col-span-5 space-y-8">
            {directoryGroups.map((group, groupIdx) => (
              <div key={group.group} className="space-y-2">
                <div className="text-[11px] font-mono uppercase tracking-wider text-zinc-500 pb-1 border-b border-zinc-800/60">
                  {group.group}
                </div>

                <div className="space-y-1">
                  {group.subjects.map((subjId) => {
                    const subj = SUBJECTS_DATA.find((s) => s.id === subjId);
                    if (!subj) return null;
                    const isSelected = selectedSubjectId === subj.id;

                    return (
                      <div
                        key={subj.id}
                        onClick={() => setSelectedSubjectId(subj.id)}
                        className={`p-3 rounded-md cursor-pointer transition-all flex items-center justify-between text-xs font-mono ${
                          isSelected
                            ? "bg-[#141822] text-white border-l-2 border-amber-400 pl-4 font-semibold"
                            : "text-zinc-400 hover:text-zinc-200 hover:bg-zinc-900/50 pl-3 border-l-2 border-transparent"
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <span className="text-zinc-500 text-[11px]">{subj.shortName}</span>
                          <span className="text-sm font-sans font-medium text-zinc-200">{subj.name}</span>
                        </div>

                        <div className="flex items-center gap-2 text-[11px] text-zinc-500">
                          <span>{subj.modulesCount} modules</span>
                          <ChevronRight className={`w-3.5 h-3.5 transition-transform ${isSelected ? "text-amber-400 translate-x-0.5" : "text-zinc-600"}`} />
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>

          {/* Right Column: Deep Architectural Mechanism Inspector (7 Cols) */}
          <div className="lg:col-span-7 bg-[#0E1117] border border-zinc-800 rounded-lg p-6 sm:p-8 technical-schematic-grid shadow-xl relative">
            
            {/* Header info */}
            <div className="flex items-center justify-between pb-4 mb-6 border-b border-zinc-800 text-xs font-mono text-zinc-500">
              <span className="text-amber-400 font-semibold">DISCIPLINE :: {activeSubject.name.toUpperCase()}</span>
              <span>{activeSubject.topicsCount} TOPICS • {activeSubject.labsCount} LABS</span>
            </div>

            {/* Foundational Axiomatic Question */}
            <div className="mb-6">
              <span className="text-[11px] font-mono text-zinc-500 uppercase tracking-wider block mb-1">
                The Foundational Mechanism Under Study:
              </span>
              <h3 className="text-xl sm:text-2xl font-serif text-white leading-snug font-normal">
                &ldquo;{activeSubject.coreQuestion}&rdquo;
              </h3>
            </div>

            {/* Editorial Description */}
            <p className="text-xs sm:text-sm text-zinc-400 font-sans leading-relaxed mb-6">
              {activeSubject.longDescription}
            </p>

            {/* Custom Technical Visual Diagram per Subject */}
            <div className="p-4 bg-[#080A0E] border border-zinc-800 rounded-md mb-6 font-mono text-xs">
              <div className="text-[10px] text-zinc-500 mb-2 uppercase tracking-wider">
                Architectural Schematic:
              </div>

              {activeSubject.id === "os" && (
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-[11px] text-zinc-400">
                    <span>Virtual Address (0x7FFF0042)</span>
                    <span className="text-emerald-400">MMU Page Table Walk</span>
                    <span>Physical Frame (#84)</span>
                  </div>
                  <div className="h-2 bg-zinc-800 rounded-full overflow-hidden flex">
                    <div className="w-1/3 bg-amber-400/80" />
                    <div className="w-1/3 bg-emerald-400/80" />
                    <div className="w-1/3 bg-cyan-400/80" />
                  </div>
                  <div className="text-[10px] text-zinc-500 text-center">
                    Preemptive time-slicing via timer interrupts and CR3 register invalidation
                  </div>
                </div>
              )}

              {activeSubject.id === "dbms" && (
                <div className="space-y-2">
                  <div className="p-2 bg-zinc-900 border border-zinc-800 text-center text-amber-300 font-bold rounded">
                    B+ TREE ROOT [Key 100 | Key 500] (Fanout: 500 Keys/Page)
                  </div>
                  <div className="grid grid-cols-3 gap-2 text-[11px] text-center">
                    <div className="p-1.5 bg-zinc-900 border border-zinc-800 rounded">[Leaf &lt; 100]</div>
                    <div className="p-1.5 bg-zinc-900 border border-zinc-800 rounded">[100 &le; Leaf &lt; 500]</div>
                    <div className="p-1.5 bg-zinc-900 border border-zinc-800 rounded">[Leaf &ge; 500]</div>
                  </div>
                  <div className="text-[10px] text-zinc-500 text-center">
                    Depth of 3 levels indexes 20M+ rows with 1 physical disk read
                  </div>
                </div>
              )}

              {activeSubject.id === "cn" && (
                <div className="space-y-2">
                  <div className="grid grid-cols-3 gap-1.5 text-center text-[11px]">
                    <div className="p-1.5 bg-zinc-900 border border-zinc-800 rounded text-cyan-300">1. SYN (Seq=X)</div>
                    <div className="p-1.5 bg-zinc-900 border border-zinc-800 rounded text-emerald-300">2. SYN-ACK</div>
                    <div className="p-1.5 bg-zinc-900 border border-zinc-800 rounded text-amber-300">3. ACK (Ack=Y+1)</div>
                  </div>
                  <div className="text-[10px] text-zinc-500 text-center">
                    TCP full-duplex sequence synchronization over unreliable physical mediums
                  </div>
                </div>
              )}

              {activeSubject.id === "dsa" && (
                <div className="space-y-2">
                  <div className="grid grid-cols-4 gap-1 text-center text-[11px]">
                    <div className="p-1.5 bg-amber-500/20 text-amber-300 border border-amber-500/40 rounded">base + 0</div>
                    <div className="p-1.5 bg-zinc-900 border border-zinc-800 rounded">base + 4</div>
                    <div className="p-1.5 bg-zinc-900 border border-zinc-800 rounded">base + 8</div>
                    <div className="p-1.5 bg-zinc-900 border border-zinc-800 rounded">base + 12</div>
                  </div>
                  <div className="text-[10px] text-zinc-500 text-center">
                    Contiguous RAM locality allows direct pointer math in strict O(1) CPU cycles
                  </div>
                </div>
              )}

              {activeSubject.id === "sysdesign" && (
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-[11px] text-zinc-300">
                    <span>Client</span>
                    <span>→</span>
                    <span className="text-cyan-400">L4 Load Balancer</span>
                    <span>→</span>
                    <span className="text-amber-400">Consistent Hash Ring</span>
                    <span>→</span>
                    <span>DB Shard</span>
                  </div>
                  <div className="text-[10px] text-zinc-500 text-center">
                    Virtual node partitioning ensures bounded rebalancing on node failure
                  </div>
                </div>
              )}

              {activeSubject.id === "git" && (
                <div className="space-y-2">
                  <div className="flex items-center justify-center gap-2 text-[11px]">
                    <span className="p-1 bg-zinc-900 border border-zinc-800 rounded">Commit A</span>
                    <span>→</span>
                    <span className="p-1 bg-amber-500/20 text-amber-300 border border-amber-500/40 rounded">Commit B</span>
                    <span>→</span>
                    <span className="p-1 bg-zinc-900 border border-zinc-800 rounded text-emerald-400">HEAD (C)</span>
                  </div>
                  <div className="text-[10px] text-zinc-500 text-center">
                    Content-addressable SHA-1 Directed Acyclic Graph (DAG) with merge-base ancestry
                  </div>
                </div>
              )}

              {activeSubject.id === "architecture" && (
                <div className="space-y-2">
                  <div className="grid grid-cols-3 gap-1.5 text-center text-[11px]">
                    <div className="p-1.5 bg-zinc-900 border border-zinc-800 text-amber-300 rounded">L1 Cache (1ns)</div>
                    <div className="p-1.5 bg-zinc-900 border border-zinc-800 rounded">L2 Cache (4ns)</div>
                    <div className="p-1.5 bg-zinc-900 border border-zinc-800 rounded">DRAM (60ns)</div>
                  </div>
                  <div className="text-[10px] text-zinc-500 text-center">
                    64-byte cache line fills dictate real software throughput over Big-O theory
                  </div>
                </div>
              )}

              {activeSubject.id === "oop" && (
                <div className="space-y-2">
                  <div className="p-2 bg-zinc-900 border border-zinc-800 text-center text-pink-300 rounded text-[11px]">
                    *vptr (8 Bytes) → Virtual Method Table [ &amp;Class::execute() ]
                  </div>
                  <div className="text-[10px] text-zinc-500 text-center">
                    Dynamic dispatch resolves polymorphic calls at runtime via pointer dereference
                  </div>
                </div>
              )}
            </div>

            {/* Bottom Actions */}
            <div className="pt-4 border-t border-zinc-800 flex items-center justify-between">
              <span className="text-xs font-mono text-zinc-500">
                Includes {activeSubject.interviewQuestionsCount} verified interview solutions
              </span>

              <button
                onClick={() => setActiveCurriculumSubject(activeSubject)}
                className="px-4 py-2 bg-zinc-800 hover:bg-zinc-700 text-white rounded text-xs font-mono transition-colors flex items-center gap-2"
              >
                <span>Inspect Syllabus</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

        </div>
      </div>

      {/* Curriculum Modal */}
      <CurriculumModal
        subject={activeCurriculumSubject}
        isOpen={!!activeCurriculumSubject}
        onClose={() => setActiveCurriculumSubject(null)}
      />
    </section>
  );
};
