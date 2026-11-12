"use client";

import React, { useState } from "react";
import { Play, RotateCcw, ArrowRight, CornerDownRight } from "lucide-react";

export const Hero: React.FC = () => {
  // Datapath Pipeline Stage: 0: FETCH, 1: DECODE, 2: EXECUTE, 3: WRITEBACK
  const [stage, setStage] = useState<number>(0);

  const stages = [
    {
      name: "FETCH",
      pc: "0x0100",
      ir: "[Fetching...]",
      alu: "IDLE",
      bus: "ADDR BUS: 0x0100 → Memory | CTRL: MEM_READ asserted",
      note: "The CPU places the Program Counter (0x0100) on the address bus to fetch the 16-bit instruction word from memory into the Instruction Register.",
    },
    {
      name: "DECODE",
      pc: "0x0102",
      ir: "0x1440 (LOAD R1, [0x0040])",
      alu: "IDLE",
      bus: "CTRL BUS: Opcode 0x1 (LOAD) decoded → Target: R1, Addr: 0x0040",
      note: "The Control Unit decodes opcode bits: identifies a memory load into register R1 from effective memory address 0x0040. The PC increments by 2 bytes to 0x0102.",
    },
    {
      name: "EXECUTE",
      pc: "0x0102",
      ir: "0x1440 (LOAD R1, [0x0040])",
      alu: "PASS_ADDR",
      bus: "ADDR BUS: 0x0040 → Memory | DATA BUS: Memory outputs 0x002A (42)",
      note: "Address 0x0040 is asserted on the address bus. The memory controller reads the 16-bit word (value 42) and places it onto the data bus.",
    },
    {
      name: "WRITEBACK",
      pc: "0x0102",
      ir: "0x1440 (LOAD R1, [0x0040])",
      alu: "DONE",
      bus: "REGISTER BUS: Latching 0x002A into Register R1 (R1 ← 42)",
      note: "On the rising clock edge, the data bus value is latched into general-purpose register R1. The instruction cycle completes in 4 clock ticks.",
    },
  ];

  const current = stages[stage];

  const handlePulse = () => {
    setStage((prev) => (prev + 1) % stages.length);
  };

  const handleReset = () => {
    setStage(0);
  };

  return (
    <section className="relative pt-28 sm:pt-36 pb-20 sm:pb-28 border-b border-zinc-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Editorial Headline & Purpose */}
          <div className="lg:col-span-6 lg:pr-6">
            <div className="flex items-center gap-2 mb-6 text-xs font-mono text-zinc-500 uppercase tracking-widest">
              <span className="w-1.5 h-1.5 bg-amber-400 rounded-full" />
              <span>Curriculum :: First-Principles Computer Science</span>
            </div>

            <h1 className="text-4xl sm:text-6xl font-serif text-white tracking-tight leading-[1.08] font-normal mb-6">
              Don&apos;t memorize <br />
              <span className="italic text-amber-200/90">Computer Science.</span> <br />
              Understand it.
            </h1>

            <p className="text-base text-zinc-400 font-sans leading-relaxed max-w-xl mb-8">
              KernelCS is a first-principles Computer Science learning platform. Instead of memorizing syntax rules and interview trivia, you explore how memory, operating systems, storage engines, and network protocols actually work. Step through CPU datapath cycles, observe memory reallocation, simulate CPU scheduling algorithms, and examine engineering-grade interview breakdowns grounded in real systems.
            </p>

            {/* Actions: Bold, tactile, restrained */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 mb-10">
              <a
                href="#demonstrations"
                className="px-6 py-3 rounded-md bg-[#F1F5F9] hover:bg-white text-zinc-950 font-semibold text-xs tracking-wide transition-all shadow-sm flex items-center gap-2"
              >
                <span>Explore Interactive Laboratories</span>
                <ArrowRight className="w-3.5 h-3.5 text-zinc-950" />
              </a>

              <a
                href="#subjects"
                className="text-xs font-mono text-zinc-400 hover:text-white transition-colors flex items-center gap-1.5 py-2"
              >
                <CornerDownRight className="w-3.5 h-3.5 text-amber-400" />
                <span>Explore Subject Syllabi ↓</span>
              </a>
            </div>

            {/* Technical Substrate Annotation */}
            <div className="pt-6 border-t border-zinc-800/80 flex items-center gap-4 text-[11px] font-mono text-zinc-500">
              <span>DISCIPLINES: 8 CORE AREAS</span>
              <span>•</span>
              <span>LABORATORY: DETERMINISTIC SIMULATIONS</span>
              <span>•</span>
              <span className="text-zinc-400">FOCUS: MECHANISMS &amp; TRADEOFFS</span>
            </div>
          </div>

          {/* Right Column: Architectural Datapath Blueprint */}
          <div className="lg:col-span-6">
            <div className="bg-[#0E1117] border border-zinc-800 rounded-lg p-5 sm:p-6 technical-schematic-grid relative overflow-hidden shadow-2xl">
              
              {/* Header coordinate rail */}
              <div className="flex items-center justify-between pb-4 mb-4 border-b border-zinc-800 text-[11px] font-mono text-zinc-500">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 border border-amber-400 bg-amber-400/20" />
                  <span className="text-zinc-300 font-medium">SCHEMATIC :: 16-BIT CPU DATAPATH &amp; BUS</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-amber-400 font-bold">CYCLE STAGE: {current.name}</span>
                </div>
              </div>

              {/* Physical CPU Datapath Blueprint */}
              <div className="space-y-4">
                {/* Registers Matrix */}
                <div className="grid grid-cols-3 gap-2 text-xs font-mono">
                  <div className="p-3 bg-[#080A0E] border border-zinc-800 rounded">
                    <span className="text-[10px] text-zinc-500 block">PROGRAM COUNTER (PC)</span>
                    <span className="text-zinc-200 font-bold">{current.pc}</span>
                  </div>
                  <div className="p-3 bg-[#080A0E] border border-zinc-800 rounded">
                    <span className="text-[10px] text-zinc-500 block">INSTRUCTION REG (IR)</span>
                    <span className="text-amber-300 font-bold truncate block">{current.ir}</span>
                  </div>
                  <div className="p-3 bg-[#080A0E] border border-zinc-800 rounded">
                    <span className="text-[10px] text-zinc-500 block">ALU STATUS</span>
                    <span className="text-emerald-400 font-bold">{current.alu}</span>
                  </div>
                </div>

                {/* Micro-Architecture Bus Trace */}
                <div className="p-3.5 bg-[#080A0E] border border-zinc-800 rounded text-xs font-mono">
                  <div className="text-[10px] text-zinc-500 mb-1 flex items-center justify-between">
                    <span>SYSTEM BUS ACTIVITY</span>
                    <span className="text-amber-400">EDGE: SYNCHRONOUS</span>
                  </div>
                  <div className="text-zinc-300 font-medium text-xs break-all">{current.bus}</div>
                </div>

                {/* Datapath Stages Stepper */}
                <div className="grid grid-cols-4 gap-1.5 text-center text-xs font-mono">
                  {stages.map((st, i) => (
                    <div
                      key={st.name}
                      onClick={() => setStage(i)}
                      className={`py-2 px-1 rounded cursor-pointer border transition-all ${
                        stage === i
                          ? "bg-amber-500/15 border-amber-500/60 text-amber-300 font-bold"
                          : "bg-zinc-900/50 border-zinc-800/80 text-zinc-500 hover:text-zinc-300"
                      }`}
                    >
                      <div className="text-[9px] opacity-75">T{i}</div>
                      <div className="text-[11px]">{st.name}</div>
                    </div>
                  ))}
                </div>

                {/* Explanation Footnote */}
                <div className="p-3 bg-zinc-900/60 border border-zinc-800/80 rounded text-xs text-zinc-400 font-sans flex items-start justify-between gap-3">
                  <p className="leading-relaxed">{current.note}</p>
                </div>

                {/* Instrument Controls */}
                <div className="pt-2 flex items-center justify-between text-xs font-mono">
                  <button
                    onClick={handlePulse}
                    className="px-3.5 py-1.5 bg-zinc-800 hover:bg-zinc-700 text-zinc-200 border border-zinc-700 rounded text-xs font-mono flex items-center gap-1.5 transition-colors"
                  >
                    <Play className="w-3 h-3 fill-current text-amber-400" />
                    <span>Advance Cycle (T{stage} → T{(stage + 1) % 4})</span>
                  </button>

                  <button
                    onClick={handleReset}
                    className="p-1.5 text-zinc-500 hover:text-zinc-300 rounded"
                    title="Reset Datapath"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
