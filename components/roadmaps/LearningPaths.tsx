"use client";

import React, { useState } from "react";
import { ArrowRight, Terminal, CheckCircle2, ChevronRight, Zap } from "lucide-react";

export const LearningPaths: React.FC = () => {
  const [activePhaseIndex, setActivePhaseIndex] = useState<number>(0);

  const phases = [
    {
      index: "01",
      title: "Silicon & Representation",
      duration: "Weeks 1 — 3",
      tagline: "How physical matter computes mathematical truth",
      competencies: [
        "Transistors, Boolean Logic Gates & Two's Complement",
        "Stack vs Heap Memory Addressing & Physical Alignment",
        "Endianness, Bitmasks & Raw Assembly Registers",
      ],
      lab: "Interactive Memory Visualizer: Stack Pointer vs Heap Allocation",
      benchmark: "Explain memory struct alignment and 64-bit padding rules.",
    },
    {
      index: "02",
      title: "Memory & Spacetime",
      duration: "Weeks 4 — 6",
      tagline: "Organizing data structures to optimize hardware cache lines",
      competencies: [
        "Contiguous Arrays & Amortized Doubling Math",
        "Hash Tables: Open Addressing vs Separate Chaining",
        "Balanced Search Trees (AVL, Red-Black) & Tries",
      ],
      lab: "Interactive Hash Collision & Tree Balancing Rotation Simulator",
      benchmark: "Implement an O(1) thread-safe LRU Cache from scratch.",
    },
    {
      index: "03",
      title: "Kernel & Concurrency",
      duration: "Weeks 7 — 9",
      tagline: "Multiplexing finite CPU cores and isolating address spaces",
      competencies: [
        "Virtual Memory, Multi-level Page Tables & MMU Translation",
        "Preemptive CPU Scheduling: CFS Red-Black Trees vs Round Robin",
        "Thread Synchronization, Mutexes, Spinlocks & Deadlock Conditions",
      ],
      lab: "Interactive CPU Scheduling Gantt & Virtual Memory Page Walk",
      benchmark: "Solve the dining philosophers deadlock using Coffman analysis.",
    },
    {
      index: "04",
      title: "Distributed Consensus",
      duration: "Weeks 10 — 12",
      tagline: "Building resilient systems that survive hardware failure and network partitions",
      competencies: [
        "Consistent Hashing with Virtual Nodes",
        "Storage Engines: B+ Trees vs LSM-Trees & Write-Ahead Logs",
        "CAP Theorem, Quorum Consensus & Raft Leader Election",
      ],
      lab: "Interactive Consistent Hash Ring & Raft Log Replication Sandbox",
      benchmark: "Design a fault-tolerant distributed key-value store.",
    },
  ];

  const currentPhase = phases[activePhaseIndex];

  return (
    <section id="roadmaps" className="py-24 sm:py-32 relative border-b border-zinc-800/80 bg-[#0A0C10]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Editorial Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-8 mb-12 border-b border-zinc-800">
          <div>
            <div className="text-xs font-mono text-zinc-500 uppercase tracking-widest mb-2">
              Roadmap :: 04 / The Engineering Conduit
            </div>
            <h2 className="text-3xl sm:text-5xl font-serif text-white tracking-tight font-normal">
              From Silicon to Scale
            </h2>
          </div>
          <p className="text-sm text-zinc-400 font-sans max-w-md leading-relaxed">
            No fragmented tutorials or guesswork. A continuous progression that transforms fundamentals into interview readiness.
          </p>
        </div>

        {/* The Continuous Horizontal Conduit Line */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-2 mb-8">
          {phases.map((p, idx) => {
            const isSelected = activePhaseIndex === idx;
            return (
              <div
                key={p.index}
                onClick={() => setActivePhaseIndex(idx)}
                className={`p-4 rounded border cursor-pointer transition-all flex flex-col justify-between ${
                  isSelected
                    ? "bg-[#141822] border-amber-400/80 text-white shadow-sm"
                    : "bg-[#0E1117] border-zinc-800 text-zinc-400 hover:text-zinc-200 hover:border-zinc-700"
                }`}
              >
                <div>
                  <div className="flex items-center justify-between text-xs font-mono mb-2">
                    <span className={isSelected ? "text-amber-400 font-bold" : "text-zinc-500"}>
                      Phase {p.index}
                    </span>
                    <span className="text-[11px] text-zinc-500">{p.duration}</span>
                  </div>

                  <h3 className="text-sm font-semibold font-sans mb-1 text-zinc-200">
                    {p.title}
                  </h3>

                  <p className="text-xs text-zinc-500 line-clamp-2 font-sans">
                    {p.tagline}
                  </p>
                </div>

                <div className="pt-3 mt-3 border-t border-zinc-800/80 flex items-center justify-between text-[11px] font-mono">
                  <span className={isSelected ? "text-amber-400 font-medium" : "text-zinc-600"}>
                    {isSelected ? "Inspecting" : "Select Phase"}
                  </span>
                  <ChevronRight className={`w-3.5 h-3.5 ${isSelected ? "text-amber-400" : "text-zinc-600"}`} />
                </div>
              </div>
            );
          })}
        </div>

        {/* Detailed Conduit Inspection Blueprint */}
        <div className="bg-[#0E1117] border border-zinc-800 rounded-lg p-6 sm:p-8 technical-schematic-grid shadow-xl">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 mb-6 border-b border-zinc-800 text-xs font-mono text-zinc-500">
            <span className="text-amber-400 font-bold">
              PHASE {currentPhase.index} BLUEPRINT :: {currentPhase.title.toUpperCase()}
            </span>
            <span>DURATION: {currentPhase.duration}</span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Left: Competencies (7 cols) */}
            <div className="lg:col-span-7 space-y-4">
              <span className="text-[11px] font-mono text-zinc-500 uppercase tracking-wider block">
                First-Principles Invariants Mastered:
              </span>

              <div className="space-y-2.5">
                {currentPhase.competencies.map((comp) => (
                  <div
                    key={comp}
                    className="p-3 bg-[#080A0E] border border-zinc-800 rounded flex items-start gap-3 text-xs font-sans text-zinc-200"
                  >
                    <span className="text-amber-400 font-mono text-sm leading-none mt-0.5">•</span>
                    <span>{comp}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Right: Lab & Benchmark (5 cols) */}
            <div className="lg:col-span-5 space-y-4">
              <div className="p-4 bg-[#080A0E] border border-zinc-800 rounded space-y-1.5 text-xs">
                <span className="text-[10px] font-mono text-cyan-400 uppercase tracking-wider block">
                  Interactive Checkpoint Lab
                </span>
                <p className="font-semibold text-zinc-200 font-mono">{currentPhase.lab}</p>
              </div>

              <div className="p-4 bg-[#080A0E] border border-zinc-800 rounded space-y-1.5 text-xs">
                <span className="text-[10px] font-mono text-amber-400 uppercase tracking-wider block">
                  Interview Benchmark Problem
                </span>
                <p className="font-semibold text-zinc-200 font-mono">{currentPhase.benchmark}</p>
              </div>

              <a
                href="#subjects"
                className="w-full py-2.5 px-4 bg-zinc-800 hover:bg-zinc-700 text-white rounded text-xs font-mono transition-colors flex items-center justify-between"
              >
                <span>Explore Phase {currentPhase.index} Curriculum</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
