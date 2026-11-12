"use client";

import React, { useState } from "react";
import { ArrowRight, ChevronRight } from "lucide-react";

export const LearningPaths: React.FC = () => {
  const [activePhaseIndex, setActivePhaseIndex] = useState<number>(0);

  const phases = [
    {
      index: "01",
      title: "Hardware Representation & Memory Addressing",
      duration: "Weeks 1 — 3",
      tagline: "Binary representations, pointer offsets, and physical memory alignment rules",
      competencies: [
        "Two's complement integer arithmetic and bitwise masking",
        "Stack vs heap allocation, stack frames, and the RSP/RBP registers",
        "Physical memory alignment, struct padding, and endianness",
        "Instruction cycle: fetch, decode, execute, and writeback",
      ],
      lab: "CPU Datapath & Memory Addressing Simulator",
      benchmark: "Explain 64-bit struct memory alignment rules and calculate struct byte padding.",
    },
    {
      index: "02",
      title: "Data Structures & Memory Layout",
      duration: "Weeks 4 — 6",
      tagline: "Contiguous arrays, cache line locality, and balanced search trees",
      competencies: [
        "Contiguous array pointer math: base + index * sizeof(T)",
        "Dynamic array geometric doubling and amortized O(1) mathematical proof",
        "Hash tables: load factors, separate chaining, and open addressing probing",
        "Balanced search trees (AVL & Red-Black rotations) and binary heaps",
      ],
      lab: "Dynamic Array Resizing & Amortized Doubling Lab",
      benchmark: "Prove why geometric doubling yields amortized O(1) appends while fixed increment allocation yields O(n).",
    },
    {
      index: "03",
      title: "Operating Systems & Concurrency",
      duration: "Weeks 7 — 9",
      tagline: "Process scheduling, virtual memory page tables, and thread synchronization",
      competencies: [
        "Dual-mode execution (Ring 0 vs 3), system calls, and trap instructions",
        "Process states, PCB state saving, and context switch costs",
        "CPU scheduling: Round Robin quantum sizing vs FCFS convoy effect",
        "Virtual memory multi-level page tables, TLB hits/misses, and page fault traps",
        "Synchronization primitives: mutexes, spinlocks, semaphores, and Coffman deadlock conditions",
      ],
      lab: "Preemptive CPU Scheduling Gantt & Context Switch Lab",
      benchmark: "Walk through the hardware and OS execution sequence of a page fault exception.",
    },
    {
      index: "04",
      title: "Storage Engines & Distributed Systems",
      duration: "Weeks 10 — 12",
      tagline: "B+ Tree page fanout, Write-Ahead Logging, and consistent hashing rings",
      competencies: [
        "Database storage engines: slotted pages and sequential I/O",
        "B+ Tree index fanout, node splits, and doubly linked leaf range scans",
        "ACID guarantees, Write-Ahead Logging (WAL), and ARIES crash recovery",
        "Consistent hashing with virtual nodes to prevent hot spots",
        "CAP theorem, quorum reads/writes (R + W > N), and the Raft consensus protocol",
      ],
      lab: "Database B+ Tree Indexing & Disk Block Access Lab",
      benchmark: "Design a fault-tolerant distributed key-value store with bounded key rebalancing upon node failure.",
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
              Roadmap :: 04 / Structured Progressions
            </div>
            <h2 className="text-3xl sm:text-5xl font-serif text-white tracking-tight font-normal">
              From Silicon to Scale
            </h2>
          </div>
          <p className="text-sm text-zinc-400 font-sans max-w-md leading-relaxed">
            A structured bottom-up progression. Connect low-level memory addressing to operating system scheduling, storage engines, and distributed systems architecture.
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
                Foundational Mechanisms &amp; Invariants:
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
                <span>Inspect Subject Modules</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
