"use client";

import React, { useState } from "react";
import { ArrowRight, ChevronRight, Terminal, Eye, Lightbulb, FlaskConical, Code2, MessageSquare } from "lucide-react";

interface CyclePhase {
  id: string;
  step: string;
  title: string;
  thesis: string;
  explanation: string;
  concreteExample: string;
  visualSnippet: React.ReactNode;
}

export const LearningCycle: React.FC = () => {
  const [activeStep, setActiveStep] = useState<number>(1); // Default to Visualize

  const phases: CyclePhase[] = [
    {
      id: "understand",
      step: "01",
      title: "Deconstruct",
      thesis: "Software abstractions exist to solve concrete hardware and concurrency constraints.",
      explanation:
        "Every concept begins with the problem that motivated it: Why does an array require contiguous RAM? Why does a page fault trigger a CPU hardware exception? When you understand what would fail without the abstraction, you no longer need to memorize its behavior.",
      concreteExample: "Tracing Virtual Memory address translation through the physical MMU hardware.",
      visualSnippet: (
        <div className="p-4 bg-[#080A0E] border border-zinc-800 rounded font-mono text-xs space-y-2">
          <div className="text-[10px] text-zinc-500 uppercase">Hardware Layer Translation</div>
          <div className="flex items-center justify-between text-zinc-300">
            <span>High-Level Code</span>
            <span>→</span>
            <span className="text-amber-400">Assembly Registers</span>
            <span>→</span>
            <span className="text-emerald-400">Physical DRAM Frame</span>
          </div>
          <div className="text-[10px] text-zinc-500">Axiomatic explanation without hand-waving</div>
        </div>
      ),
    },
    {
      id: "visualize",
      step: "02",
      title: "Visualize",
      thesis: "State transitions and data layouts become obvious when you see them mutate over time.",
      explanation:
        "Static code on a whiteboard fails to capture runtime state. We trace data structures, register changes, and wire packets step-by-step so you observe exactly when pointers move, buffers reallocate, and locks acquire.",
      concreteExample: "Watching dynamic array doubling copy 4 elements and update the memory pointer live.",
      visualSnippet: (
        <div className="p-4 bg-[#080A0E] border border-zinc-800 rounded font-mono text-xs space-y-2">
          <div className="text-[10px] text-zinc-500 uppercase">Active State Mutator</div>
          <div className="grid grid-cols-4 gap-1 text-center">
            <span className="p-1 bg-amber-500/20 text-amber-300 border border-amber-500/40 rounded">Slot 0: 42</span>
            <span className="p-1 bg-amber-500/20 text-amber-300 border border-amber-500/40 rounded">Slot 1: 88</span>
            <span className="p-1 bg-blue-500/20 text-blue-300 border border-blue-500/40 rounded">Slot 2: NEW</span>
            <span className="p-1 bg-zinc-900 border border-zinc-800 text-zinc-600 rounded">Empty</span>
          </div>
          <div className="text-[10px] text-zinc-500">Live visual state transitions</div>
        </div>
      ),
    },
    {
      id: "experiment",
      step: "03",
      title: "Stress-Test",
      thesis: "Stress-testing edge cases and failure modes reveals why safety invariants exist.",
      explanation:
        "Deliberately introduce boundary conditions: starve long jobs by altering quantum length in Round Robin, cause race conditions by omitting memory barriers, or drop packets to observe TCP retransmission and exponential backoff.",
      concreteExample: "Changing Round Robin quantum size from 2ms to 20ms and measuring context switch overhead.",
      visualSnippet: (
        <div className="p-4 bg-[#080A0E] border border-zinc-800 rounded font-mono text-xs space-y-2">
          <div className="text-[10px] text-zinc-500 uppercase">Fault Injection Simulator</div>
          <div className="flex items-center justify-between text-zinc-300">
            <span>Quantum: 2ms</span>
            <span className="text-zinc-500">⇄</span>
            <span className="text-rose-400">Context Switches: +12</span>
            <span className="text-zinc-500">⇄</span>
            <span className="text-emerald-400">Zero Starvation</span>
          </div>
          <div className="text-[10px] text-zinc-500">Stress-testing invariants with custom parameters</div>
        </div>
      ),
    },
    {
      id: "practice",
      step: "04",
      title: "Implement",
      thesis: "Writing minimal, working implementations from scratch proves genuine comprehension.",
      explanation:
        "Build working implementations from first principles: an O(1) LRU Cache with a doubly-linked hash map, a bounded blocking queue with condition variables, or a B+ Tree node split algorithm.",
      concreteExample: "Implementing an O(1) thread-safe blocking queue using mutexes and condition variables.",
      visualSnippet: (
        <div className="p-4 bg-[#080A0E] border border-zinc-800 rounded font-mono text-xs space-y-2">
          <div className="text-[10px] text-zinc-500 uppercase">First-Principles Verification</div>
          <div className="text-emerald-300">✓ Test 1: Concurrency stress (100 threads) — PASSED</div>
          <div className="text-emerald-300">✓ Test 2: Deadlock safety (Coffman conditions) — VERIFIED</div>
          <div className="text-[10px] text-zinc-500">Code that implements the machine mechanism</div>
        </div>
      ),
    },
    {
      id: "explain",
      step: "05",
      title: "Defend",
      thesis: "Technical interviews evaluate your ability to reason about tradeoffs under ambiguous constraints.",
      explanation:
        "Staff engineers don't want recited definitions. They look for structured reasoning: state the physical problem constraints, explain the underlying mechanism, and evaluate trade-offs (latency vs throughput, memory vs CPU, read vs write amplification).",
      concreteExample: "Explaining why a B+ Tree outperforms Hash Tables for range queries using disk seek physics.",
      visualSnippet: (
        <div className="p-4 bg-[#080A0E] border border-zinc-800 rounded font-mono text-xs space-y-2">
          <div className="text-[10px] text-zinc-500 uppercase">Verbal Defense Rubric</div>
          <div className="text-zinc-300">1. Constraint: &quot;Physical disks read in 4KB/16KB page blocks...&quot;</div>
          <div className="text-zinc-300">2. Mechanism: &quot;Fanout of 500 fits in page, tree height is 3...&quot;</div>
          <div className="text-[10px] text-zinc-500">What technical interviewers look for during system design</div>
        </div>
      ),
    },
  ];

  const current = phases[activeStep];

  return (
    <section id="learning-cycle" className="py-24 sm:py-32 relative border-b border-zinc-800/80 bg-[#0A0C10]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Editorial Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-8 mb-12 border-b border-zinc-800">
          <div>
            <div className="text-xs font-mono text-zinc-500 uppercase tracking-widest mb-2">
              Pedagogy :: 05 / The Learning Process
            </div>
            <h2 className="text-3xl sm:text-5xl font-serif text-white tracking-tight font-normal">
              How Understanding Forms
            </h2>
          </div>
          <p className="text-sm text-zinc-400 font-sans max-w-md leading-relaxed">
            Rote memorization collapses when interviewers introduce ambiguous edge cases. Our five-stage process anchors concepts in hardware reality and system trade-offs.
          </p>
        </div>

        {/* Step Selector Ribbon */}
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 mb-8">
          {phases.map((p, idx) => {
            const isSelected = activeStep === idx;
            return (
              <button
                key={p.id}
                onClick={() => setActiveStep(idx)}
                className={`p-3.5 rounded border text-left transition-all ${
                  isSelected
                    ? "bg-[#141822] border-amber-400 text-white shadow-sm font-semibold"
                    : "bg-[#0E1117] border-zinc-800 text-zinc-400 hover:text-zinc-200 hover:border-zinc-700"
                }`}
              >
                <div className="text-[10px] font-mono text-zinc-500 mb-1">{p.step}.</div>
                <div className="text-xs font-sans font-medium">{p.title}</div>
              </button>
            );
          })}
        </div>

        {/* Focused Pedagogical Stage Chamber */}
        <div className="bg-[#0E1117] border border-zinc-800 rounded-lg p-6 sm:p-8 technical-schematic-grid shadow-xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* Left: Thesis & Explanation (7 cols) */}
            <div className="lg:col-span-7 space-y-4">
              <div className="flex items-center gap-2 text-xs font-mono text-amber-400">
                <span>PHASE {current.step} OF 05</span>
                <span>•</span>
                <span className="uppercase">{current.title}</span>
              </div>

              <h3 className="text-2xl sm:text-3xl font-serif text-white font-normal leading-snug">
                &ldquo;{current.thesis}&rdquo;
              </h3>

              <p className="text-xs sm:text-sm text-zinc-400 font-sans leading-relaxed">
                {current.explanation}
              </p>

              <div className="pt-2 text-xs font-mono text-zinc-300">
                <span className="text-zinc-500">Concrete Example: </span>
                {current.concreteExample}
              </div>
            </div>

            {/* Right: Visual Demonstration (5 cols) */}
            <div className="lg:col-span-5">
              {current.visualSnippet}
            </div>

          </div>

          <div className="pt-6 mt-6 border-t border-zinc-800 flex items-center justify-between text-xs font-mono">
            <span className="text-zinc-500">
              Applied consistently across all core Computer Science disciplines
            </span>

            <button
              onClick={() => setActiveStep((prev) => (prev + 1) % phases.length)}
              className="text-amber-400 hover:text-amber-300 flex items-center gap-1.5 transition-colors"
            >
              <span>Next Phase ({phases[(activeStep + 1) % phases.length].title})</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

      </div>
    </section>
  );
};
