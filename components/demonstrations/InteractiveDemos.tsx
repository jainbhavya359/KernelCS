"use client";

import React, { useState } from "react";
import { 
  Play, 
  RotateCcw, 
  Plus, 
  Minus, 
  ChevronDown, 
  ChevronUp, 
  Send, 
  Terminal,
  Activity,
  Layers
} from "lucide-react";

interface StackFrame {
  id: string;
  name: string;
  address: string;
  bytes: number;
}

const DEFAULT_STACK: StackFrame[] = [
  { id: "1", name: "main()", address: "0x7FFF0020", bytes: 8 },
  { id: "2", name: "tokenize()", address: "0x7FFF0018", bytes: 8 },
  { id: "3", name: "evaluate()", address: "0x7FFF0010", bytes: 8 },
];

export const InteractiveDemos: React.FC = () => {
  const [activeLab, setActiveLab] = useState<"stack" | "cpu" | "network">("stack");

  // Stack State
  const [stack, setStack] = useState<StackFrame[]>(DEFAULT_STACK);
  const [stackLog, setStackLog] = useState<string>(
    "Stack initialized. Stack Pointer (RSP) set to top frame at address 0x7FFF0010."
  );

  // CPU Scheduling State
  const [cpuAlgo, setCpuAlgo] = useState<"rr" | "fcfs">("rr");
  const [cpuStep, setCpuStep] = useState<number>(2);

  // Network State
  const [netStep, setNetStep] = useState<number>(0);

  // Stack operations
  const handlePush = () => {
    if (stack.length >= 5) {
      setStackLog("Stack capacity reached for this simulation (Max 5 frames). Pop a frame first.");
      return;
    }
    const names = ["hash_lookup()", "verify_jwt()", "render_view()", "alloc_page()"];
    const name = names[stack.length % names.length];
    const newAddr = "0x" + (0x7fff0020 - stack.length * 8).toString(16).toUpperCase();
    const newFrame = { id: Math.random().toString(), name, address: newAddr, bytes: 8 };
    setStack([newFrame, ...stack]);
    setStackLog(`Executed: sub rsp, 8 ; mov [rsp], "${name}". RSP moved to ${newAddr}.`);
  };

  const handlePop = () => {
    if (stack.length === 0) {
      setStackLog("Stack underflow: Cannot pop from empty frame boundary.");
      return;
    }
    const popped = stack[0];
    const nextStack = stack.slice(1);
    setStack(nextStack);
    const nextAddr = nextStack.length > 0 ? nextStack[0].address : "0x7FFF0028";
    setStackLog(`Executed: add rsp, 8. Frame "${popped.name}" deallocated. RSP moved up to ${nextAddr}.`);
  };

  // CPU Slices
  const cpuSlices = cpuAlgo === "rr"
    ? [
        { proc: "P1 (Editor)", range: "0 - 2ms", color: "#F59E0B" },
        { proc: "P2 (DB Read)", range: "2 - 4ms", color: "#3B82F6" },
        { proc: "P1 (Editor)", range: "4 - 6ms", color: "#F59E0B" },
        { proc: "P3 (Render)", range: "6 - 8ms", color: "#10B981" },
      ]
    : [
        { proc: "P1 (Editor)", range: "0 - 4ms", color: "#F59E0B" },
        { proc: "P2 (DB Read)", range: "4 - 6ms", color: "#3B82F6" },
        { proc: "P3 (Render)", range: "6 - 8ms", color: "#10B981" },
      ];

  // Network hops
  const netHops = [
    {
      title: "1. Local Cache & Recursive DNS",
      wire: "UDP 192.168.1.100:53 → 1.1.1.1:53 | QUERY: A api.kernelcs.org → 198.51.100.42",
      rtt: "8ms",
      desc: "Resolves human-readable domain to a 32-bit anycast IPv4 address.",
    },
    {
      title: "2. TCP 3-Way Handshake",
      wire: "TCP SYN (Seq=100) → SYN-ACK (Seq=500, Ack=101) → ACK (Ack=501)",
      rtt: "22ms (1 RTT)",
      desc: "Synchronizes bidirectional Initial Sequence Numbers (ISNs) to guarantee ordered byte delivery.",
    },
    {
      title: "3. TLS 1.3 Key Exchange",
      wire: "ClientHello (ECDHE X25519) ⇄ ServerHello + Cipher: TLS_AES_256_GCM",
      rtt: "24ms (1 RTT)",
      desc: "Derives symmetric session keys in 1 round trip without transmitting secret keys over the wire.",
    },
    {
      title: "4. HTTP/2 Request & 200 OK",
      wire: "HEADERS frame + DATA frame (Stream ID: 1) → HTTP/2 200 OK (application/json)",
      rtt: "14ms",
      desc: "Multiplexes requests over the single TCP socket without application Head-of-Line blocking.",
    },
  ];

  return (
    <section id="demonstrations" className="py-24 sm:py-32 relative border-b border-zinc-800/80 bg-[#0A0C10]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Editorial Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-8 mb-12 border-b border-zinc-800">
          <div>
            <div className="text-xs font-mono text-zinc-500 uppercase tracking-widest mb-2">
              Laboratory :: 03 / State &amp; Time
            </div>
            <h2 className="text-3xl sm:text-5xl font-serif text-white tracking-tight font-normal">
              Learn by seeing it happen
            </h2>
          </div>
          <p className="text-sm text-zinc-400 font-sans max-w-md leading-relaxed">
            Static diagrams lie. Real comprehension comes from stepping through state transitions, memory allocations, and network latency live.
          </p>
        </div>

        {/* Instrument Rail Selector */}
        <div className="flex items-center gap-2 mb-8 overflow-x-auto pb-2 text-xs font-mono">
          {[
            { id: "stack", label: "Instrument 01: Memory Stack (LIFO)" },
            { id: "cpu", label: "Instrument 02: Preemptive CPU Scheduler" },
            { id: "network", label: "Instrument 03: Wire Protocol Flight" },
          ].map((inst) => (
            <button
              key={inst.id}
              onClick={() => setActiveLab(inst.id as any)}
              className={`px-4 py-2.5 rounded border transition-all text-nowrap ${
                activeLab === inst.id
                  ? "bg-[#141822] border-amber-400/80 text-white font-semibold shadow-sm"
                  : "bg-[#0E1117] border-zinc-800 text-zinc-400 hover:text-zinc-200 hover:border-zinc-700"
              }`}
            >
              {inst.label}
            </button>
          ))}
        </div>

        {/* Workbench Chamber */}
        <div className="bg-[#0E1117] border border-zinc-800 rounded-lg p-6 sm:p-8 technical-schematic-grid shadow-2xl relative">
          
          {/* ================= STACK INSTRUMENT ================= */}
          {activeLab === "stack" && (
            <div className="space-y-6">
              <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-zinc-800 text-xs font-mono text-zinc-500">
                <span className="text-amber-400 font-bold">ACTIVE INSTRUMENT: PHYSICAL STACK MEMORY REGION</span>
                <span>FRAMES: {stack.length} / 5 • RSP: {stack.length > 0 ? stack[0].address : "0x7FFF0028"}</span>
              </div>

              {/* Memory Layout Split */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                
                {/* Physical Memory Column (7 Cols) */}
                <div className="lg:col-span-7 bg-[#080A0E] border border-zinc-800 rounded p-5 min-h-[260px] flex flex-col justify-end">
                  <div className="text-[11px] font-mono text-zinc-500 pb-2 mb-4 border-b border-zinc-800 flex items-center justify-between">
                    <span>LOW MEMORY (0x0000) ↑ STACK GROWS DOWNWARD</span>
                    <span>HIGH MEMORY (0x7FFF)</span>
                  </div>

                  <div className="space-y-2">
                    {stack.length === 0 ? (
                      <div className="py-12 text-center text-xs font-mono text-zinc-600">
                        [ Empty Stack Boundary — Push a frame below to begin execution ]
                      </div>
                    ) : (
                      stack.map((frame, idx) => {
                        const isTop = idx === 0;
                        return (
                          <div
                            key={frame.id}
                            className={`p-3 rounded border font-mono text-xs flex items-center justify-between transition-all ${
                              isTop
                                ? "bg-amber-500/15 border-amber-400 text-white shadow-sm"
                                : "bg-zinc-900/60 border-zinc-800 text-zinc-400"
                            }`}
                          >
                            <div className="flex items-center gap-3">
                              {isTop ? (
                                <span className="px-1.5 py-0.5 rounded bg-amber-400 text-zinc-950 font-bold text-[10px]">
                                  RSP → TOP
                                </span>
                              ) : (
                                <span className="text-[10px] text-zinc-500">Frame #{stack.length - idx}</span>
                              )}
                              <span className="font-semibold text-zinc-100">{frame.name}</span>
                            </div>

                            <div className="flex items-center gap-3 text-[11px] text-zinc-500">
                              <span>{frame.address}</span>
                              <span className="opacity-75">8 Bytes</span>
                            </div>
                          </div>
                        );
                      })
                    )}
                  </div>
                </div>

                {/* Controls & Mechanical Inspection (5 Cols) */}
                <div className="lg:col-span-5 space-y-4">
                  <div>
                    <span className="text-[11px] font-mono text-zinc-500 uppercase tracking-wider block mb-2">
                      Stack Operations (Strict O(1)):
                    </span>
                    <div className="flex gap-2">
                      <button
                        onClick={handlePush}
                        disabled={stack.length >= 5}
                        className="flex-1 py-2.5 px-3 bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 border border-amber-500/40 rounded text-xs font-mono font-bold flex items-center justify-center gap-1.5 transition-all disabled:opacity-40"
                      >
                        <Plus className="w-3.5 h-3.5" />
                        <span>Push Frame</span>
                      </button>

                      <button
                        onClick={handlePop}
                        disabled={stack.length === 0}
                        className="flex-1 py-2.5 px-3 bg-zinc-800 hover:bg-zinc-700 text-zinc-200 border border-zinc-700 rounded text-xs font-mono font-bold flex items-center justify-center gap-1.5 transition-all disabled:opacity-40"
                      >
                        <Minus className="w-3.5 h-3.5" />
                        <span>Pop Frame</span>
                      </button>
                    </div>
                  </div>

                  {/* Mechanical Log */}
                  <div className="p-3.5 bg-[#080A0E] border border-zinc-800 rounded font-mono text-xs">
                    <span className="text-[10px] text-zinc-500 block mb-1">HARDWARE INSTRUCTION TRACE:</span>
                    <p className="text-zinc-300 leading-relaxed">{stackLog}</p>
                  </div>

                  {/* Architectural Axiom */}
                  <div className="p-3 bg-zinc-900/40 border border-zinc-800/80 rounded text-xs text-zinc-400 font-sans leading-relaxed">
                    <strong>First-Principles Law:</strong> The CPU never &quot;wipes&quot; deallocated memory upon a pop operation. It merely adjusts the 64-bit <code>RSP</code> register pointer up by 8 bytes. Future function pushes simply overwrite the abandoned memory.
                  </div>
                </div>

              </div>
            </div>
          )}

          {/* ================= CPU SCHEDULING INSTRUMENT ================= */}
          {activeLab === "cpu" && (
            <div className="space-y-6">
              <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-zinc-800 text-xs font-mono text-zinc-500">
                <span className="text-blue-400 font-bold">ACTIVE INSTRUMENT: CPU GANTT TIMING OSCILLOSCOPE</span>
                <span>POLICY: {cpuAlgo === "rr" ? "ROUND ROBIN (QUANTUM = 2ms)" : "FIRST-COME, FIRST-SERVED (FCFS)"}</span>
              </div>

              {/* Timing Oscilloscope Bar */}
              <div className="bg-[#080A0E] border border-zinc-800 rounded p-6">
                <div className="text-[11px] font-mono text-zinc-500 mb-3 flex items-center justify-between">
                  <span>TIME SLICE EXECUTION</span>
                  <span className="text-amber-400 font-bold">ELAPSED: {cpuStep * 2}ms / 8ms</span>
                </div>

                <div className="h-14 bg-zinc-900 rounded p-1.5 flex gap-2 border border-zinc-800 overflow-hidden">
                  {cpuSlices.map((s, i) => {
                    const isExecuted = i < cpuStep;
                    return (
                      <div
                        key={i}
                        className={`flex-1 rounded flex flex-col items-center justify-center font-mono text-xs font-bold transition-all ${
                          isExecuted ? "text-white" : "opacity-25 bg-zinc-800 text-zinc-500"
                        }`}
                        style={{
                          backgroundColor: isExecuted ? `${s.color}25` : undefined,
                          border: isExecuted ? `1px solid ${s.color}60` : "1px solid transparent",
                          color: isExecuted ? s.color : undefined,
                        }}
                      >
                        <span>{s.proc}</span>
                        <span className="text-[10px] font-normal opacity-75">{s.range}</span>
                      </div>
                    );
                  })}
                </div>

                <div className="flex justify-between text-[11px] font-mono text-zinc-500 mt-2 px-1">
                  <span>0ms</span>
                  <span>2ms</span>
                  <span>4ms</span>
                  <span>6ms</span>
                  <span>8ms</span>
                </div>
              </div>

              {/* Controls */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-mono text-zinc-400">Policy:</span>
                  <button
                    onClick={() => {
                      setCpuAlgo("rr");
                      setCpuStep(1);
                    }}
                    className={`px-3 py-1.5 rounded text-xs font-mono border transition-all ${
                      cpuAlgo === "rr" ? "bg-blue-500/20 border-blue-400 text-blue-300 font-bold" : "bg-zinc-900 border-zinc-800 text-zinc-400"
                    }`}
                  >
                    Round Robin (Fair Preemption)
                  </button>
                  <button
                    onClick={() => {
                      setCpuAlgo("fcfs");
                      setCpuStep(1);
                    }}
                    className={`px-3 py-1.5 rounded text-xs font-mono border transition-all ${
                      cpuAlgo === "fcfs" ? "bg-blue-500/20 border-blue-400 text-blue-300 font-bold" : "bg-zinc-900 border-zinc-800 text-zinc-400"
                    }`}
                  >
                    FCFS (Convoy Effect)
                  </button>
                </div>

                <div className="flex items-center justify-end gap-2 text-xs font-mono">
                  <button
                    onClick={() => setCpuStep((prev) => (prev >= cpuSlices.length ? 1 : prev + 1))}
                    className="px-4 py-2 bg-zinc-800 hover:bg-zinc-700 text-white rounded border border-zinc-700 flex items-center gap-1.5"
                  >
                    <Play className="w-3.5 h-3.5 text-amber-400 fill-current" />
                    <span>Run Next Quantum (+2ms)</span>
                  </button>
                  <button
                    onClick={() => setCpuStep(1)}
                    className="p-2 text-zinc-500 hover:text-zinc-300 rounded"
                    title="Reset"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              <div className="p-3 bg-zinc-900/40 border border-zinc-800/80 rounded text-xs text-zinc-400 font-sans">
                <strong>Architectural Tradeoff:</strong> Round Robin avoids thread starvation by forcibly preempting long jobs via timer interrupts, but incurs a ~2 microsecond context switch overhead every time the MMU swaps the page table register (CR3) and flushes the TLB.
              </div>
            </div>
          )}

          {/* ================= NETWORK PROTOCOL INSTRUMENT ================= */}
          {activeLab === "network" && (
            <div className="space-y-6">
              <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-zinc-800 text-xs font-mono text-zinc-500">
                <span className="text-emerald-400 font-bold">ACTIVE INSTRUMENT: WIRE PROTOCOL FLIGHT OSCILLOSCOPE</span>
                <span>HOP {netStep + 1} OF {netHops.length} • LATENCY: {netHops[netStep].rtt}</span>
              </div>

              {/* Protocol Pipeline */}
              <div className="grid grid-cols-4 gap-2 text-center text-xs font-mono">
                {netHops.map((h, i) => (
                  <div
                    key={h.title}
                    onClick={() => setNetStep(i)}
                    className={`p-3 rounded border cursor-pointer transition-all ${
                      i === netStep
                        ? "bg-emerald-500/15 border-emerald-400 text-emerald-300 font-bold"
                        : i < netStep
                        ? "bg-zinc-900 border-zinc-700 text-zinc-300"
                        : "bg-zinc-900/30 border-zinc-800/60 text-zinc-600"
                    }`}
                  >
                    <div className="text-[10px] opacity-75">Hop {i + 1}</div>
                    <div className="text-xs truncate mt-0.5">{h.title.split(". ")[1]}</div>
                  </div>
                ))}
              </div>

              {/* Wire Frame Hex & Protocol Info */}
              <div className="p-4 bg-[#080A0E] border border-zinc-800 rounded font-mono text-xs space-y-2">
                <div className="text-[10px] text-zinc-500 flex items-center justify-between">
                  <span>RAW WIRE FRAME TRANSMISSION:</span>
                  <span className="text-emerald-400">{netHops[netStep].rtt}</span>
                </div>
                <div className="p-2.5 bg-zinc-950 border border-zinc-800 text-emerald-300/90 rounded text-xs font-mono overflow-x-auto">
                  {netHops[netStep].wire}
                </div>
                <p className="text-xs text-zinc-400 font-sans leading-relaxed pt-1">
                  {netHops[netStep].desc}
                </p>
              </div>

              <div className="flex items-center justify-between text-xs font-mono">
                <span className="text-zinc-500">Step through the packet flight:</span>
                <button
                  onClick={() => setNetStep((prev) => (prev + 1) % netHops.length)}
                  className="px-4 py-2 bg-zinc-800 hover:bg-zinc-700 text-white rounded border border-zinc-700 flex items-center gap-1.5"
                >
                  <Send className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Next Packet Hop</span>
                </button>
              </div>
            </div>
          )}

        </div>

      </div>
    </section>
  );
};
