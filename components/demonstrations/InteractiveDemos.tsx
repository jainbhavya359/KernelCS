"use client";

import React, { useState, useMemo } from "react";
import { 
  Play, 
  RotateCcw, 
  Plus, 
  Minus, 
  ChevronRight, 
  ArrowRight,
  Terminal,
  Activity,
  Layers,
  Cpu,
  Database,
  Network,
  CheckCircle2,
  Clock,
  ArrowDown
} from "lucide-react";

type LabId = "cpu-datapath" | "dynamic-array" | "cpu-scheduling" | "db-indexing" | "network-flow";

export const InteractiveDemos: React.FC = () => {
  const [activeLab, setActiveLab] = useState<LabId>("cpu-datapath");

  // ==========================================
  // INSTRUMENT 1: CPU DATAPATH STATE
  // ==========================================
  const [cpuCycle, setCpuCycle] = useState<number>(0);
  const cpuStages = [
    {
      phase: "FETCH",
      pc: "0x0100",
      ir: "0x1440",
      instruction: "LOAD R1, [0x0040]",
      alu: "IDLE",
      bus: "ADDR BUS: 0x0100 → Memory | CTRL: MEM_READ asserted",
      registers: { R0: 5, R1: 0, R2: 0, R3: 0 },
      memoryWord: "0x002A (42) at 0x0040",
      explanation: "Program Counter (0x0100) is placed on the address bus. Memory read control line is asserted. The 16-bit instruction word 0x1440 is latched into the Instruction Register (IR). PC increments to 0x0102.",
    },
    {
      phase: "DECODE",
      pc: "0x0102",
      ir: "0x1440",
      instruction: "LOAD R1, [0x0040]",
      alu: "IDLE",
      bus: "CTRL BUS: Opcode 0x1 (LOAD) → Destination: R1, Memory Addr: 0x0040",
      registers: { R0: 5, R1: 0, R2: 0, R3: 0 },
      memoryWord: "0x002A (42) at 0x0040",
      explanation: "The Control Unit decodes the 16-bit instruction: Opcode 0x1 denotes a memory load. Register destination decoder selects R1. Memory address bus multiplexer is routed to address 0x0040.",
    },
    {
      phase: "EXECUTE",
      pc: "0x0102",
      ir: "0x1440",
      instruction: "LOAD R1, [0x0040]",
      alu: "PASS_ADDR",
      bus: "ADDR BUS: 0x0040 → Memory | DATA BUS: Memory outputs 0x002A (42)",
      registers: { R0: 5, R1: 0, R2: 0, R3: 0 },
      memoryWord: "0x002A (42) at 0x0040",
      explanation: "Memory address 0x0040 is asserted. The memory controller reads the 16-bit word (0x002A, decimal 42) and drives it onto the system data bus toward the register file.",
    },
    {
      phase: "WRITEBACK",
      pc: "0x0102",
      ir: "0x1440",
      instruction: "LOAD R1, [0x0040]",
      alu: "DONE",
      bus: "REG BUS: Latching 0x002A into Register R1 | R1 ← 42",
      registers: { R0: 5, R1: 42, R2: 0, R3: 0 },
      memoryWord: "0x002A (42) at 0x0040",
      explanation: "On the rising clock edge, the value 42 on the data bus is latched into general-purpose register R1. The instruction cycle completes in 4 clock ticks.",
    },
  ];
  const currentCpu = cpuStages[cpuCycle];

  // ==========================================
  // INSTRUMENT 2: DYNAMIC ARRAY STATE
  // ==========================================
  const [arrayElements, setArrayElements] = useState<number[]>([12, 45]);
  const [arrayCapacity, setArrayCapacity] = useState<number>(2);
  const [arrayLog, setArrayLog] = useState<string>(
    "Initial array initialized with capacity 2 and size 2 at base address 0x2000."
  );
  const [resizeHappened, setResizeHappened] = useState<boolean>(false);

  const handleAppend = () => {
    if (arrayElements.length >= 8) {
      setArrayLog("Maximum simulation boundary (8 elements) reached. Reset to inspect again.");
      return;
    }
    const nextVal = (arrayElements.length + 1) * 17;
    if (arrayElements.length === arrayCapacity) {
      const newCap = arrayCapacity * 2;
      const copiesCount = arrayElements.length;
      setArrayCapacity(newCap);
      setArrayElements([...arrayElements, nextVal]);
      setResizeHappened(true);
      setArrayLog(
        `Array Full! Resizing: allocated new buffer of capacity ${newCap} at 0x${(0x2000 + newCap * 16).toString(16).toUpperCase()}. Copied ${copiesCount} elements + appended ${nextVal}.`
      );
    } else {
      setArrayElements([...arrayElements, nextVal]);
      setResizeHappened(false);
      setArrayLog(
        `Appended ${nextVal} directly into contiguous slot index ${arrayElements.length} (offset +${arrayElements.length * 4} bytes). O(1) direct write.`
      );
    }
  };

  const handleResetArray = () => {
    setArrayElements([12, 45]);
    setArrayCapacity(2);
    setResizeHappened(false);
    setArrayLog("Reset array to initial capacity 2 with 2 elements.");
  };

  // ==========================================
  // INSTRUMENT 3: CPU SCHEDULING STATE
  // ==========================================
  const [schedAlgo, setSchedAlgo] = useState<"rr" | "fcfs" | "sjf">("rr");
  const [timeQuantum, setTimeQuantum] = useState<number>(2);

  // Deterministic 4-process trace:
  const schedProcesses = [
    { id: "P1", name: "Process 1 (Compiler)", arrival: 0, burst: 4, color: "#F59E0B" },
    { id: "P2", name: "Process 2 (Database)", arrival: 1, burst: 3, color: "#3B82F6" },
    { id: "P3", name: "Process 3 (Editor)", arrival: 2, burst: 1, color: "#10B981" },
    { id: "P4", name: "Process 4 (Renderer)", arrival: 3, burst: 2, color: "#EC4899" },
  ];

  // Mathematical scheduling computation
  const { ganttSlices, processMetrics, avgTat, avgWt } = useMemo(() => {
    interface Slice {
      pid: string;
      start: number;
      end: number;
      color: string;
    }
    const slices: Slice[] = [];
    const procs = schedProcesses.map((p) => ({ ...p, remaining: p.burst, finish: 0 }));

    if (schedAlgo === "fcfs") {
      let time = 0;
      const sorted = [...procs].sort((a, b) => a.arrival - b.arrival);
      for (const p of sorted) {
        if (time < p.arrival) time = p.arrival;
        const start = time;
        time += p.burst;
        p.finish = time;
        slices.push({ pid: p.id, start, end: time, color: p.color });
      }
    } else if (schedAlgo === "sjf") {
      let time = 0;
      let completed = 0;
      while (completed < procs.length) {
        const available = procs.filter((p) => p.arrival <= time && p.remaining > 0);
        if (available.length === 0) {
          time++;
          continue;
        }
        available.sort((a, b) => a.remaining - b.remaining);
        const p = available[0];
        const start = time;
        time += p.remaining;
        p.remaining = 0;
        p.finish = time;
        completed++;
        slices.push({ pid: p.id, start, end: time, color: p.color });
      }
    } else {
      // Round Robin with Quantum
      let time = 0;
      const queue: typeof procs = [];
      const visited = new Set<string>();

      const checkArrivals = (currentTime: number) => {
        procs.forEach((p) => {
          if (p.arrival <= currentTime && !visited.has(p.id)) {
            queue.push(p);
            visited.add(p.id);
          }
        });
      };

      checkArrivals(time);

      while (queue.length > 0 || visited.size < procs.length) {
        if (queue.length === 0) {
          time++;
          checkArrivals(time);
          continue;
        }

        const current = queue.shift()!;
        const start = time;
        const runTime = Math.min(current.remaining, timeQuantum);
        time += runTime;
        current.remaining -= runTime;

        slices.push({ pid: current.id, start, end: time, color: current.color });
        checkArrivals(time);

        if (current.remaining > 0) {
          queue.push(current);
        } else {
          current.finish = time;
        }
      }
    }

    const metrics = procs.map((p) => {
      const turnaround = p.finish - p.arrival;
      const waiting = turnaround - p.burst;
      return {
        id: p.id,
        name: p.name,
        arrival: p.arrival,
        burst: p.burst,
        completion: p.finish,
        turnaround,
        waiting,
        color: p.color,
      };
    });

    const totalTat = metrics.reduce((acc, m) => acc + m.turnaround, 0);
    const totalWt = metrics.reduce((acc, m) => acc + m.waiting, 0);

    return {
      ganttSlices: slices,
      processMetrics: metrics,
      avgTat: (totalTat / metrics.length).toFixed(2),
      avgWt: (totalWt / metrics.length).toFixed(2),
    };
  }, [schedAlgo, timeQuantum]);

  // ==========================================
  // INSTRUMENT 4: DATABASE INDEXING STATE
  // ==========================================
  const [searchKey, setSearchKey] = useState<number>(7);
  const [indexSearchActive, setIndexSearchActive] = useState<boolean>(true);

  // Table schema & rows partitioned into 3 disk pages (4 rows/page)
  const dbPages = [
    { pageId: "Page 0x10", rows: [1, 2, 3, 4] },
    { pageId: "Page 0x20", rows: [5, 6, 7, 8] },
    { pageId: "Page 0x30", rows: [9, 10, 11, 12] },
  ];

  // B+ Tree leaves correspond to pages:
  // Root: [5, 9] -> Leaf 1 (<5), Leaf 2 (5-8), Leaf 3 (>=9)
  const dbIndexStats = useMemo(() => {
    // Full Table Scan
    let fullScanPages = 0;
    let fullScanRows = 0;
    let foundPageFull = "";
    for (const page of dbPages) {
      fullScanPages++;
      for (const row of page.rows) {
        fullScanRows++;
        if (row === searchKey) {
          foundPageFull = page.pageId;
          break;
        }
      }
      if (foundPageFull) break;
    }

    // B+ Tree Index Search
    // Traversal: 1 Root page read + 1 Leaf page read + 1 Data page read = 3 page reads
    let btreeLeafPage = "";
    let dataPageBtree = "";
    if (searchKey < 5) {
      btreeLeafPage = "Leaf Page 0x02 (< 5)";
      dataPageBtree = "Page 0x10";
    } else if (searchKey < 9) {
      btreeLeafPage = "Leaf Page 0x03 (5 ≤ key < 9)";
      dataPageBtree = "Page 0x20";
    } else {
      btreeLeafPage = "Leaf Page 0x04 (key ≥ 9)";
      dataPageBtree = "Page 0x30";
    }

    return {
      fullScanPages,
      fullScanRows,
      foundPageFull,
      btreePages: 2, // 1 internal root + 1 leaf
      btreeDataPage: dataPageBtree,
      btreeLeafPage,
    };
  }, [searchKey]);

  // ==========================================
  // INSTRUMENT 5: NETWORK REQUEST FLOW STATE
  // ==========================================
  const [netStep, setNetStep] = useState<number>(0);
  const networkSteps = [
    {
      title: "1. Recursive DNS Resolution",
      layer: "Application Layer (DNS) over UDP Layer 4",
      wire: "UDP 192.168.1.50:53210 → 1.1.1.1:53 | QUERY: A api.kernelcs.org → 198.51.100.42",
      rtt: "12ms (1 Round Trip)",
      mechanism:
        "The OS queries the local recursive resolver. The resolver traverses the DNS hierarchy: Root (.) → TLD (.org) → Authoritative Nameserver, returning the 32-bit IPv4 address 198.51.100.42.",
    },
    {
      title: "2. TCP 3-Way Handshake",
      layer: "Transport Layer (TCP / RFC 793)",
      wire: "SYN (Seq=1000) → SYN-ACK (Seq=5000, Ack=1001) → ACK (Seq=1001, Ack=5001)",
      rtt: "24ms (1 RTT)",
      mechanism:
        "Synchronizes Initial Sequence Numbers (ISNs) in both directions. Protects against delayed duplicate connection requests and establishes reliable, ordered byte delivery.",
    },
    {
      title: "3. TLS 1.3 Cryptographic Handshake",
      layer: "Security Layer (TLS 1.3 / RFC 8446)",
      wire: "ClientHello (KeyShare: ECDHE X25519) ⇄ ServerHello + Cipher: TLS_AES_256_GCM_SHA384",
      rtt: "24ms (1 RTT)",
      mechanism:
        "Client and server exchange ephemeral Diffie-Hellman public keys in 1 round trip, deriving symmetric AES-256 session keys with forward secrecy before any application data is sent.",
    },
    {
      title: "4. HTTP/2 Multiplexed Request",
      layer: "Application Layer (HTTP/2 / RFC 7540)",
      wire: "HEADERS frame (Stream ID: 1, END_STREAM) → HTTP/2 200 OK + DATA frame (application/json)",
      rtt: "16ms",
      mechanism:
        "Binary framing and HPACK header compression multiplex the API request over the single established TCP socket, avoiding application-layer head-of-line blocking.",
    },
    {
      title: "5. Browser Rendering Pipeline",
      layer: "Host Application Runtime (Browser Engine)",
      wire: "JSON Response Payload → Construct Object Tree → Layout Geometry → GPU Compositor Paint",
      rtt: "4ms",
      mechanism:
        "The browser engine parses the payload, updates view state, recalculates layout reflow geometry, and emits rasterized draw calls to the GPU compositor thread.",
    },
  ];

  return (
    <section id="demonstrations" className="py-24 sm:py-32 relative border-b border-zinc-800/80 bg-[#0A0C10]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Editorial Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-8 mb-12 border-b border-zinc-800">
          <div>
            <div className="text-xs font-mono text-zinc-500 uppercase tracking-widest mb-2">
              Laboratory :: 03 / Interactive Systems
            </div>
            <h2 className="text-3xl sm:text-5xl font-serif text-white tracking-tight font-normal">
              Inspect the machine mechanisms
            </h2>
          </div>
          <p className="text-sm text-zinc-400 font-sans max-w-md leading-relaxed">
            Theoretical definitions are easily forgotten. True understanding comes from stepping through hardware datapath cycles, memory reallocation, scheduling algorithms, and wire protocol flights.
          </p>
        </div>

        {/* Instrument Rail Selector */}
        <div className="flex items-center gap-2 mb-8 overflow-x-auto pb-2 text-xs font-mono">
          {[
            { id: "cpu-datapath", label: "01. CPU Datapath Cycle" },
            { id: "dynamic-array", label: "02. Dynamic Array Resizing" },
            { id: "cpu-scheduling", label: "03. CPU Scheduling Gantt" },
            { id: "db-indexing", label: "04. Database B+ Tree Indexing" },
            { id: "network-flow", label: "05. Wire Protocol Flight" },
          ].map((inst) => (
            <button
              key={inst.id}
              onClick={() => setActiveLab(inst.id as LabId)}
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
          
          {/* ======================================================== */}
          {/* INSTRUMENT 1: CPU DATAPATH & INSTRUCTION CYCLE           */}
          {/* ======================================================== */}
          {activeLab === "cpu-datapath" && (
            <div className="space-y-6">
              <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-zinc-800 text-xs font-mono text-zinc-500">
                <span className="text-amber-400 font-bold">INSTRUMENT: 16-BIT VON NEUMANN DATAPATH</span>
                <span>INSTRUCTION: {currentCpu.instruction} • PHASE: {currentCpu.phase}</span>
              </div>

              {/* Datapath Visual Layout */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                
                {/* Registers & Internal State (7 cols) */}
                <div className="lg:col-span-7 space-y-4">
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs font-mono">
                    <div className="p-3 bg-[#080A0E] border border-zinc-800 rounded">
                      <span className="text-[10px] text-zinc-500 block">PROGRAM COUNTER</span>
                      <span className="text-zinc-100 font-bold">{currentCpu.pc}</span>
                    </div>
                    <div className="p-3 bg-[#080A0E] border border-zinc-800 rounded">
                      <span className="text-[10px] text-zinc-500 block">INSTRUCTION REG</span>
                      <span className="text-amber-300 font-bold truncate block">{currentCpu.ir}</span>
                    </div>
                    <div className="p-3 bg-[#080A0E] border border-zinc-800 rounded">
                      <span className="text-[10px] text-zinc-500 block">ALU STATUS</span>
                      <span className="text-emerald-400 font-bold">{currentCpu.alu}</span>
                    </div>
                    <div className="p-3 bg-[#080A0E] border border-zinc-800 rounded">
                      <span className="text-[10px] text-zinc-500 block">CYCLE TICK</span>
                      <span className="text-cyan-400 font-bold">T{cpuCycle} / T3</span>
                    </div>
                  </div>

                  {/* General-Purpose Register File */}
                  <div className="p-4 bg-[#080A0E] border border-zinc-800 rounded font-mono text-xs">
                    <div className="text-[10px] text-zinc-500 uppercase tracking-wider mb-2 flex justify-between">
                      <span>General-Purpose Register File (16-Bit)</span>
                      <span>Clock: Synchronous Edge</span>
                    </div>
                    <div className="grid grid-cols-4 gap-2 text-center">
                      {Object.entries(currentCpu.registers).map(([reg, val]) => (
                        <div
                          key={reg}
                          className={`p-2 rounded border ${
                            reg === "R1" && currentCpu.phase === "WRITEBACK"
                              ? "bg-amber-500/20 border-amber-400 text-amber-200"
                              : "bg-zinc-900 border-zinc-800 text-zinc-300"
                          }`}
                        >
                          <div className="text-[10px] text-zinc-500">{reg}</div>
                          <div className="text-sm font-bold">{val}</div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Bus Activity */}
                  <div className="p-3.5 bg-[#080A0E] border border-zinc-800 rounded font-mono text-xs">
                    <span className="text-[10px] text-zinc-500 uppercase block mb-1">Active Bus Signals:</span>
                    <p className="text-zinc-200 font-medium break-all">{currentCpu.bus}</p>
                  </div>
                </div>

                {/* Stepper Controls & Mechanism Explanation (5 cols) */}
                <div className="lg:col-span-5 space-y-4">
                  {/* Stepper buttons */}
                  <div className="grid grid-cols-4 gap-1.5 text-center text-xs font-mono">
                    {cpuStages.map((st, i) => (
                      <div
                        key={st.phase}
                        onClick={() => setCpuCycle(i)}
                        className={`p-2 rounded cursor-pointer border transition-all ${
                          cpuCycle === i
                            ? "bg-amber-500/20 border-amber-400 text-amber-300 font-bold"
                            : "bg-zinc-900/60 border-zinc-800 text-zinc-500 hover:text-zinc-300"
                        }`}
                      >
                        <div className="text-[10px] opacity-75">T{i}</div>
                        <div>{st.phase}</div>
                      </div>
                    ))}
                  </div>

                  <div className="p-4 bg-[#080A0E] border border-zinc-800 rounded text-xs space-y-2">
                    <span className="text-[10px] font-mono text-amber-400 uppercase tracking-wider block">
                      Mechanical Execution Trace:
                    </span>
                    <p className="text-zinc-300 font-sans leading-relaxed">
                      {currentCpu.explanation}
                    </p>
                  </div>

                  <div className="flex items-center justify-between text-xs font-mono pt-2">
                    <button
                      onClick={() => setCpuCycle((prev) => (prev + 1) % cpuStages.length)}
                      className="px-4 py-2 bg-zinc-800 hover:bg-zinc-700 text-white rounded border border-zinc-700 flex items-center gap-1.5 transition-colors"
                    >
                      <Play className="w-3.5 h-3.5 fill-current text-amber-400" />
                      <span>Advance Tick (T{cpuCycle} → T{(cpuCycle + 1) % 4})</span>
                    </button>
                    <button
                      onClick={() => setCpuCycle(0)}
                      className="p-2 text-zinc-500 hover:text-zinc-300 rounded"
                      title="Reset"
                    >
                      <RotateCcw className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  <div className="p-3 bg-zinc-900/40 border border-zinc-800/80 rounded text-[11px] text-zinc-400 font-sans leading-relaxed">
                    <strong>Architectural Assumption:</strong> A single-cycle RISC datapath where memory reads complete within the execute stage and register writeback commits synchronously on the rising clock edge.
                  </div>
                </div>

              </div>
            </div>
          )}

          {/* ======================================================== */}
          {/* INSTRUMENT 2: DYNAMIC ARRAY RESIZING & AMORTIZED PROOF   */}
          {/* ======================================================== */}
          {activeLab === "dynamic-array" && (
            <div className="space-y-6">
              <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-zinc-800 text-xs font-mono text-zinc-500">
                <span className="text-amber-400 font-bold">INSTRUMENT: DYNAMIC ARRAY CONTIGUOUS MEMORY ALLOCATOR</span>
                <span>SIZE: {arrayElements.length} • CAPACITY: {arrayCapacity} • LOAD: {((arrayElements.length / arrayCapacity) * 100).toFixed(0)}%</span>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                
                {/* Visual Memory Blocks (7 cols) */}
                <div className="lg:col-span-7 space-y-4">
                  <div className="p-4 bg-[#080A0E] border border-zinc-800 rounded font-mono text-xs">
                    <div className="text-[10px] text-zinc-500 uppercase tracking-wider mb-3 flex items-center justify-between">
                      <span>Physical Memory Layout (4 Bytes per Slot)</span>
                      <span className={resizeHappened ? "text-amber-400 font-bold animate-pulse" : "text-zinc-500"}>
                        {resizeHappened ? "★ BUFFER REALLOCATED & COPIED" : "BUFFER STABLE"}
                      </span>
                    </div>

                    {/* Contiguous slots */}
                    <div className="grid grid-cols-4 sm:grid-cols-8 gap-2">
                      {Array.from({ length: arrayCapacity }).map((_, idx) => {
                        const hasVal = idx < arrayElements.length;
                        const addr = "0x" + (0x2000 + idx * 4).toString(16).toUpperCase();
                        return (
                          <div
                            key={idx}
                            className={`p-2.5 rounded border text-center transition-all ${
                              hasVal
                                ? "bg-amber-500/15 border-amber-400 text-white"
                                : "bg-zinc-900/50 border-zinc-800/80 text-zinc-600"
                            }`}
                          >
                            <div className="text-[9px] font-mono text-zinc-500">{addr}</div>
                            <div className="text-sm font-bold font-mono my-1">
                              {hasVal ? arrayElements[idx] : "—"}
                            </div>
                            <div className="text-[9px] text-zinc-500">[{idx}]</div>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* Operation Trace */}
                  <div className="p-3.5 bg-[#080A0E] border border-zinc-800 rounded font-mono text-xs">
                    <span className="text-[10px] text-zinc-500 uppercase block mb-1">Memory Allocation Trace:</span>
                    <p className="text-zinc-300 font-sans leading-relaxed">{arrayLog}</p>
                  </div>
                </div>

                {/* Controls & Mathematical Proof (5 cols) */}
                <div className="lg:col-span-5 space-y-4">
                  <div className="flex gap-2">
                    <button
                      onClick={handleAppend}
                      disabled={arrayElements.length >= 8}
                      className="flex-1 py-2.5 px-3 bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 border border-amber-500/40 rounded text-xs font-mono font-bold flex items-center justify-center gap-1.5 transition-all disabled:opacity-40"
                    >
                      <Plus className="w-3.5 h-3.5" />
                      <span>Append Element</span>
                    </button>
                    <button
                      onClick={handleResetArray}
                      className="py-2.5 px-3 bg-zinc-800 hover:bg-zinc-700 text-zinc-300 border border-zinc-700 rounded text-xs font-mono flex items-center justify-center gap-1.5 transition-all"
                    >
                      <RotateCcw className="w-3.5 h-3.5" />
                      <span>Reset</span>
                    </button>
                  </div>

                  {/* Amortized Analysis Proof */}
                  <div className="p-4 bg-[#080A0E] border border-zinc-800 rounded font-sans text-xs space-y-2">
                    <span className="text-[10px] font-mono text-amber-400 uppercase tracking-wider block">
                      First-Principles Amortized Proof:
                    </span>
                    <p className="text-zinc-300 leading-relaxed">
                      Why does geometric doubling guarantee amortized O(1)?
                    </p>
                    <div className="p-2.5 bg-zinc-950 border border-zinc-800 rounded font-mono text-[11px] text-zinc-300 space-y-1">
                      <div>Total copies for N elements:</div>
                      <div className="text-amber-300">1 + 2 + 4 + ... + N/2 = N - 1 copies</div>
                      <div>Total operations = N inserts + (N - 1) copies ≈ 2N</div>
                      <div className="text-emerald-400 font-bold">Average cost per append = 2N / N = 2 ops = O(1)</div>
                    </div>
                    <p className="text-zinc-400 text-[11px] leading-relaxed pt-1">
                      If capacity grew by a fixed constant +K instead, resizing would trigger N/K times, costing O(N²) total work or <strong>O(N) per append</strong>.
                    </p>
                  </div>
                </div>

              </div>
            </div>
          )}

          {/* ======================================================== */}
          {/* INSTRUMENT 3: CPU SCHEDULING GANTT OSCILLOSCOPE          */}
          {/* ======================================================== */}
          {activeLab === "cpu-scheduling" && (
            <div className="space-y-6">
              <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-zinc-800 text-xs font-mono text-zinc-500">
                <span className="text-blue-400 font-bold">INSTRUMENT: CPU PREEMPTIVE GANTT TIMELINE</span>
                <span>
                  ALGORITHM: {schedAlgo.toUpperCase()} {schedAlgo === "rr" ? `(QUANTUM = ${timeQuantum}ms)` : ""}
                </span>
              </div>

              {/* Controls bar */}
              <div className="flex flex-wrap items-center justify-between gap-4 p-4 bg-[#080A0E] border border-zinc-800 rounded text-xs font-mono">
                <div className="flex items-center gap-2">
                  <span className="text-zinc-500">Algorithm:</span>
                  {(["rr", "fcfs", "sjf"] as const).map((algo) => (
                    <button
                      key={algo}
                      onClick={() => setSchedAlgo(algo)}
                      className={`px-3 py-1.5 rounded border transition-all ${
                        schedAlgo === algo
                          ? "bg-blue-500/20 border-blue-400 text-blue-300 font-bold"
                          : "bg-zinc-900 border-zinc-800 text-zinc-400 hover:text-zinc-200"
                      }`}
                    >
                      {algo === "rr" ? "Round Robin" : algo === "fcfs" ? "FCFS" : "Shortest Job First"}
                    </button>
                  ))}
                </div>

                {schedAlgo === "rr" && (
                  <div className="flex items-center gap-2">
                    <span className="text-zinc-500">Quantum:</span>
                    {[1, 2, 3, 4].map((q) => (
                      <button
                        key={q}
                        onClick={() => setTimeQuantum(q)}
                        className={`px-2.5 py-1 rounded border text-xs ${
                          timeQuantum === q
                            ? "bg-amber-500/20 border-amber-400 text-amber-300 font-bold"
                            : "bg-zinc-900 border-zinc-800 text-zinc-400"
                        }`}
                      >
                        {q}ms
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Gantt Chart Bar */}
              <div className="p-5 bg-[#080A0E] border border-zinc-800 rounded space-y-2">
                <div className="text-[10px] font-mono text-zinc-500 flex justify-between">
                  <span>EXECUTION TIMELINE (GANTT CHART)</span>
                  <span className="text-amber-400">Total Makespan: {ganttSlices[ganttSlices.length - 1]?.end || 0}ms</span>
                </div>

                <div className="h-14 bg-zinc-950 border border-zinc-800 rounded p-1 flex gap-1 overflow-x-auto">
                  {ganttSlices.map((s, idx) => {
                    const span = s.end - s.start;
                    return (
                      <div
                        key={idx}
                        className="rounded flex flex-col items-center justify-center font-mono text-xs font-bold border transition-all"
                        style={{
                          flex: span,
                          minWidth: `${span * 32}px`,
                          backgroundColor: `${s.color}25`,
                          borderColor: `${s.color}60`,
                          color: s.color,
                        }}
                      >
                        <span>{s.pid}</span>
                        <span className="text-[10px] opacity-80 font-normal">
                          {s.start}–{s.end}ms
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Calculated Mathematical Metrics Table */}
              <div className="overflow-x-auto">
                <table className="w-full text-left font-mono text-xs border border-zinc-800 rounded">
                  <thead className="bg-[#080A0E] text-zinc-500 text-[11px] border-b border-zinc-800">
                    <tr>
                      <th className="p-3">Process</th>
                      <th className="p-3">Arrival Time (AT)</th>
                      <th className="p-3">Burst Time (BT)</th>
                      <th className="p-3">Completion (CT)</th>
                      <th className="p-3 text-cyan-400">Turnaround (TAT = CT - AT)</th>
                      <th className="p-3 text-emerald-400">Waiting (WT = TAT - BT)</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-zinc-800/80 bg-zinc-950">
                    {processMetrics.map((p) => (
                      <tr key={p.id} className="hover:bg-zinc-900/40">
                        <td className="p-3 font-bold" style={{ color: p.color }}>
                          {p.id} ({p.name.split(" ")[2].replace(")", "")})
                        </td>
                        <td className="p-3 text-zinc-400">{p.arrival}ms</td>
                        <td className="p-3 text-zinc-400">{p.burst}ms</td>
                        <td className="p-3 text-zinc-300 font-bold">{p.completion}ms</td>
                        <td className="p-3 text-cyan-300 font-bold">{p.turnaround}ms</td>
                        <td className="p-3 text-emerald-300 font-bold">{p.waiting}ms</td>
                      </tr>
                    ))}
                  </tbody>
                  <tfoot className="bg-[#080A0E] font-bold border-t border-zinc-800 text-[11px]">
                    <tr>
                      <td colSpan={4} className="p-3 text-zinc-400">
                        Averages across 4 processes:
                      </td>
                      <td className="p-3 text-cyan-400">Avg TAT: {avgTat}ms</td>
                      <td className="p-3 text-emerald-400">Avg WT: {avgWt}ms</td>
                    </tr>
                  </tfoot>
                </table>
              </div>

              <div className="p-3 bg-zinc-900/40 border border-zinc-800/80 rounded text-xs text-zinc-400 font-sans leading-relaxed">
                <strong>Architectural Tradeoff:</strong> Round Robin avoids starvation and optimizes interactive response time, but incurs context-switch overhead every time the CPU swaps the register context and invalidates TLB entries. SJF minimizes average waiting time but requires prior knowledge of job burst duration.
              </div>
            </div>
          )}

          {/* ======================================================== */}
          {/* INSTRUMENT 4: DATABASE B+ TREE INDEXING                  */}
          {/* ======================================================== */}
          {activeLab === "db-indexing" && (
            <div className="space-y-6">
              <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-zinc-800 text-xs font-mono text-zinc-500">
                <span className="text-purple-400 font-bold">INSTRUMENT: DATABASE B+ TREE VS TABLE SCAN EXPLORER</span>
                <span>QUERY: SELECT * FROM users WHERE id = {searchKey}</span>
              </div>

              {/* Target Key Picker */}
              <div className="flex items-center gap-2 p-3 bg-[#080A0E] border border-zinc-800 rounded text-xs font-mono">
                <span className="text-zinc-400">Select User ID to Search:</span>
                {[2, 4, 7, 10, 12].map((id) => (
                  <button
                    key={id}
                    onClick={() => setSearchKey(id)}
                    className={`px-3 py-1.5 rounded border ${
                      searchKey === id
                        ? "bg-purple-500/20 border-purple-400 text-purple-300 font-bold"
                        : "bg-zinc-900 border-zinc-800 text-zinc-400 hover:text-zinc-200"
                    }`}
                  >
                    ID #{id}
                  </button>
                ))}
              </div>

              {/* Side-by-Side Comparison */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                
                {/* Mode A: Full Table Scan (No Index) */}
                <div className="p-5 bg-[#080A0E] border border-zinc-800 rounded space-y-4">
                  <div className="flex items-center justify-between border-b border-zinc-800 pb-2 text-xs font-mono">
                    <span className="text-rose-400 font-bold">1. Full Table Scan (No Index)</span>
                    <span className="text-zinc-500">O(N) Complexity</span>
                  </div>

                  <p className="text-xs text-zinc-400 font-sans leading-relaxed">
                    The storage engine reads every 4KB data page sequentially from disk into the buffer pool, inspecting rows one by one.
                  </p>

                  <div className="space-y-2">
                    {dbPages.map((p, idx) => {
                      const isRead = idx < dbIndexStats.fullScanPages;
                      return (
                        <div
                          key={p.pageId}
                          className={`p-2.5 rounded border font-mono text-xs transition-all ${
                            isRead
                              ? p.pageId === dbIndexStats.foundPageFull
                                ? "bg-emerald-500/15 border-emerald-400 text-emerald-300"
                                : "bg-zinc-900 border-zinc-700 text-zinc-300"
                              : "bg-zinc-950/40 border-zinc-800 text-zinc-600"
                          }`}
                        >
                          <div className="flex items-center justify-between text-[10px] text-zinc-500 mb-1">
                            <span>{p.pageId}</span>
                            <span>{isRead ? "DISK PAGE READ" : "UNREAD"}</span>
                          </div>
                          <div className="flex gap-2">
                            {p.rows.map((r) => (
                              <span
                                key={r}
                                className={`px-2 py-0.5 rounded text-[11px] ${
                                  r === searchKey
                                    ? "bg-emerald-400 text-zinc-950 font-bold"
                                    : "bg-zinc-800 text-zinc-400"
                                }`}
                              >
                                ID:{r}
                              </span>
                            ))}
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  <div className="p-3 bg-zinc-950 border border-zinc-800 rounded font-mono text-xs text-zinc-300 space-y-1">
                    <div>Disk Pages Read: <strong className="text-rose-400">{dbIndexStats.fullScanPages} / 3 pages</strong></div>
                    <div>Row Comparisons: <strong className="text-rose-400">{dbIndexStats.fullScanRows} row checks</strong></div>
                  </div>
                </div>

                {/* Mode B: B+ Tree Index Search */}
                <div className="p-5 bg-[#080A0E] border border-zinc-800 rounded space-y-4">
                  <div className="flex items-center justify-between border-b border-zinc-800 pb-2 text-xs font-mono">
                    <span className="text-emerald-400 font-bold">2. B+ Tree Index Traversal</span>
                    <span className="text-zinc-500">O(log_B N) Complexity</span>
                  </div>

                  <p className="text-xs text-zinc-400 font-sans leading-relaxed">
                    The engine traverses internal routing nodes by key delimiter, reading only the targeted leaf page and fetching the specific data row.
                  </p>

                  <div className="space-y-2 font-mono text-xs">
                    {/* Root Page */}
                    <div className="p-2.5 rounded border bg-purple-500/15 border-purple-400 text-purple-200">
                      <div className="text-[10px] text-zinc-400 mb-0.5">STEP 1: Root Node (Page 0x01)</div>
                      <div className="font-bold">Keys: [5 | 9] → Router Evaluated</div>
                    </div>

                    {/* Leaf Page */}
                    <div className="p-2.5 rounded border bg-amber-500/15 border-amber-400 text-amber-200">
                      <div className="text-[10px] text-zinc-400 mb-0.5">STEP 2: {dbIndexStats.btreeLeafPage}</div>
                      <div className="font-bold">Binary Search ID {searchKey} → Found Record Pointer</div>
                    </div>

                    {/* Data Page */}
                    <div className="p-2.5 rounded border bg-emerald-500/15 border-emerald-400 text-emerald-200">
                      <div className="text-[10px] text-zinc-400 mb-0.5">STEP 3: Clustered Fetch ({dbIndexStats.btreeDataPage})</div>
                      <div className="font-bold">Direct Tuple Offset Fetch (1 Row Read)</div>
                    </div>
                  </div>

                  <div className="p-3 bg-zinc-950 border border-zinc-800 rounded font-mono text-xs text-zinc-300 space-y-1">
                    <div>Index Node Reads: <strong className="text-emerald-400">2 pages (Root + Leaf)</strong></div>
                    <div>Data Page Read: <strong className="text-emerald-400">1 page ({dbIndexStats.btreeDataPage})</strong></div>
                  </div>
                </div>

              </div>

              <div className="p-3 bg-zinc-900/40 border border-zinc-800/80 rounded text-xs text-zinc-400 font-sans leading-relaxed">
                <strong>Illustrative vs Real-World Distinction:</strong> This demonstration models physical disk block page accesses. In production database engines (PostgreSQL/InnoDB), upper B+ Tree levels are resident in the RAM Buffer Pool, so point queries typically cost only 1 physical disk read or 0 when fully cached.
              </div>
            </div>
          )}

          {/* ======================================================== */}
          {/* INSTRUMENT 5: NETWORK REQUEST FLOW                       */}
          {/* ======================================================== */}
          {activeLab === "network-flow" && (
            <div className="space-y-6">
              <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-zinc-800 text-xs font-mono text-zinc-500">
                <span className="text-cyan-400 font-bold">INSTRUMENT: WIRE PROTOCOL FLIGHT OSCILLOSCOPE</span>
                <span>HOP {netStep + 1} OF {networkSteps.length} • {networkSteps[netStep].layer}</span>
              </div>

              {/* Protocol Pipeline Step Ribbon */}
              <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 text-xs font-mono">
                {networkSteps.map((h, i) => (
                  <div
                    key={h.title}
                    onClick={() => setNetStep(i)}
                    className={`p-3 rounded border cursor-pointer transition-all ${
                      i === netStep
                        ? "bg-cyan-500/15 border-cyan-400 text-cyan-300 font-bold"
                        : i < netStep
                        ? "bg-zinc-900 border-zinc-700 text-zinc-300"
                        : "bg-zinc-900/30 border-zinc-800/60 text-zinc-600"
                    }`}
                  >
                    <div className="text-[10px] opacity-75">Hop 0{i + 1}</div>
                    <div className="text-xs truncate mt-0.5">{h.title.split(". ")[1]}</div>
                  </div>
                ))}
              </div>

              {/* Detailed Packet Breakdown */}
              <div className="p-5 bg-[#080A0E] border border-zinc-800 rounded font-mono text-xs space-y-3">
                <div className="text-[10px] text-zinc-500 flex items-center justify-between">
                  <span>RAW WIRE PACKET TRANSMISSION TRACE:</span>
                  <span className="text-cyan-400 font-bold">LATENCY: {networkSteps[netStep].rtt}</span>
                </div>

                <div className="p-3 bg-zinc-950 border border-zinc-800 text-cyan-300 rounded font-mono text-xs overflow-x-auto break-all">
                  {networkSteps[netStep].wire}
                </div>

                <div className="pt-2">
                  <span className="text-[10px] text-zinc-500 uppercase block mb-1">Underlying Protocol Mechanism:</span>
                  <p className="text-xs text-zinc-300 font-sans leading-relaxed">
                    {networkSteps[netStep].mechanism}
                  </p>
                </div>
              </div>

              {/* Navigation */}
              <div className="flex items-center justify-between text-xs font-mono">
                <span className="text-zinc-500">Step through protocol layers:</span>
                <button
                  onClick={() => setNetStep((prev) => (prev + 1) % networkSteps.length)}
                  className="px-4 py-2 bg-zinc-800 hover:bg-zinc-700 text-white rounded border border-zinc-700 flex items-center gap-1.5 transition-colors"
                >
                  <ArrowRight className="w-3.5 h-3.5 text-cyan-400" />
                  <span>Next Packet Hop (Hop {netStep + 1} → Hop {((netStep + 1) % networkSteps.length) + 1})</span>
                </button>
              </div>

              <div className="p-3 bg-zinc-900/40 border border-zinc-800/80 rounded text-[11px] text-zinc-400 font-sans leading-relaxed">
                <strong>Stated Simplifications:</strong> This trace models an ideal network connection with zero packet drops. In production, transport flows include TCP Slow Start congestion window sizing (`cwnd`), TCP Selective Acknowledgments (SACK), and TLS 1.3 OCSP stapling.
              </div>
            </div>
          )}

        </div>

      </div>
    </section>
  );
};
