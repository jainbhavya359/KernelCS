import { CurriculumSubject } from "./types";

export const architectureCurriculum: CurriculumSubject = {
  id: "architecture",
  name: "Computer Architecture & Systems Engineering",
  shortName: "Computer Architecture",
  category: "architecture-tools",
  description:
    "From silicon gates to superscalar out-of-order execution: understand digital logic, ISA design, pipelining hazards, cache hierarchies, and multicore memory coherence.",
  longDescription:
    "Software does not execute in an abstract mathematical realm — it runs on physical silicon governed by gate propagation delays, instruction pipelining, cache hierarchies, and memory bus bandwidth. This curriculum bridges computer engineering and software performance: how combinational and sequential logic construct ALUs and registers; how RISC and CISC ISAs structure machine code; how 5-stage pipelines resolve structural, data, and control hazards; how branch predictors and Tomasulo's reorder buffer achieve superscalar out-of-order execution; and how multi-level caches and the MESI coherence protocol dictate multicore concurrency performance.",
  accentColor: "#EAB308",
  borderColor: "rgba(234, 179, 8, 0.3)",
  badgeBg: "rgba(234, 179, 8, 0.1)",
  iconName: "Cpu",
  coreQuestion:
    "How do hardware pipelining, multi-level cache hierarchies, and superscalar out-of-order execution transform sequential machine instructions into gigahertz-scale parallel computation, and why must software understand hardware cache lines to achieve peak throughput?",
  prerequisites: [
    "Basic programming in C or C++ (pointers, memory addresses, bitwise operators)",
    "High school physics (voltage, basic electrical circuit concepts)",
    "Fundamental discrete mathematics (Boolean logic, truth tables)"
  ],
  learningOutcomes: [
    "Calculate two's complement overflow, fixed-point precision, and IEEE 754 floating-point representations.",
    "Design combinational logic (Adders, Multiplexers, Decoders) and sequential elements (Latches, Flip-Flops) adhering to setup and hold constraints.",
    "Compare RISC (ARM, RISC-V) and CISC (x86-64) instruction set architectures and analyze caller-saved vs. callee-saved ABI conventions.",
    "Trace instruction execution through the classic 5-stage RISC datapath (IF, ID, EX, MEM, WB).",
    "Identify and resolve structural, data (RAW, WAR, WAW), and control hazards using data forwarding, stalling, and branch prediction.",
    "Calculate cache index, tag, and offset bit-splits for N-way set associative caches and calculate cache hit/miss penalties.",
    "Analyze multicore cache coherence protocols (MESI) and write software that avoids false sharing and cache line bouncing.",
    "Understand superscalar execution, branch target buffers, register renaming, and the Reorder Buffer (ROB) in modern out-of-order CPUs."
  ],
  keyMechanisms: [
    "Fetch-Decode-Execute CPU Datapath",
    "5-Stage Instruction Pipelining & Hazard Forwarding",
    "Branch Target Buffer & 2-Bit Dynamic Branch Prediction",
    "64-Byte Cache Lines & Spatial Locality",
    "MESI Multicore Cache Coherence Protocol"
  ],
  modules: [
    {
      id: "arch-mod-1",
      order: 1,
      title: "Number Systems & Data Representation",
      shortDescription: "Two's complement arithmetic, IEEE 754 floating-point standard, endianness, and memory alignment.",
      detailedOverview: "Examine how physical hardware encodes numbers and data structures. Master two's complement arithmetic and overflow detection, IEEE 754 single and double precision floating-point representations, byte endianness, and compiler structure padding.",
      difficulty: "Foundation",
      interviewBenchmark: "Explain why 0.1 + 0.2 != 0.3 in IEEE 754 floating-point arithmetic and calculate compiler structure padding for mixed-type structs.",
      topics: [
        {
          id: "arch-t-1-1",
          title: "Two's Complement & Binary Arithmetic",
          description: "Signed integer representation, negation, and ALU overflow detection.",
          difficulty: "Foundation",
          learningObjectives: ["Compute two's complement values", "Differentiate carry vs overflow flags"],
          subtopics: [
            {
              id: "arch-st-1-1-1",
              title: "Two's Complement Mathematics & Range Asymmetry",
              description: "Why the negative range exceeds the positive range by 1.",
              difficulty: "Foundation",
              keyTakeaways: [
                "Range of N-bit signed integer is [-2^(N-1), 2^(N-1) - 1].",
                "Negation rule: Invert all bits and add 1.",
                "In 8-bit integers, -128 has no positive equivalent, causing undefined behavior when calling abs(INT_MIN)."
              ],
              concepts: ["Two's Complement", "Range Asymmetry", "Carry Flag", "Signed Overflow (V) Flag"],
              questions: [
                {
                  id: "arch-q-1",
                  statement: "How does an ALU detect signed integer overflow during binary addition, and how does this differ from the carry flag?",
                  type: "Interview",
                  difficulty: "Foundation",
                  explanation: "The carry flag indicates unsigned overflow (carry out of the MSB). Signed overflow occurs when adding two numbers of the same sign produces an opposite sign result. Hardware computes this as the XOR of the carry-in and carry-out of the most significant bit: V = C_in XOR C_out."
                }
              ]
            }
          ]
        },
        {
          id: "arch-t-1-2",
          title: "IEEE 754 Floating-Point Standard",
          description: "Sign, biased exponent, mantissa, denormals, and precision limits.",
          difficulty: "Intermediate",
          learningObjectives: ["Deconstruct 32-bit and 64-bit float formats", "Explain subnormals and NaN"],
          subtopics: [
            {
              id: "arch-st-1-2-1",
              title: "Floating-Point Format Decomposition & Rounding",
              description: "Why base-10 decimals produce repeating binary fractions.",
              difficulty: "Intermediate",
              keyTakeaways: [
                "32-bit float: 1 sign, 8 exponent (bias 127), 23 fraction bits.",
                "In base-2, only fractions whose denominator is a power of 2 terminate; 0.1 becomes an infinite binary fraction, leading to rounding inaccuracies."
              ],
              concepts: ["Biased Exponent", "Significand / Mantissa", "Subnormal Numbers", "Rounding Errors"],
              questions: [
                {
                  id: "arch-q-2",
                  statement: "Why is 0.1 not precisely representable in IEEE 754 binary floating-point format?",
                  type: "Conceptual",
                  difficulty: "Foundation",
                  explanation: "In binary, a fraction terminates only if its denominator is a power of 2. 0.1 (1/10) factors into 2 and 5, generating an infinitely repeating binary pattern (0.0001100110011...). Truncating it to 23 or 52 bits causes minute rounding discrepancies."
                }
              ]
            }
          ]
        },
        {
          id: "arch-t-1-3",
          title: "Endianness & Memory Alignment",
          description: "Little-endian vs big-endian byte order and compiler struct padding.",
          difficulty: "Intermediate",
          learningObjectives: ["Analyze Little-Endian byte storage", "Calculate struct alignment padding"],
          subtopics: [
            {
              id: "arch-st-1-3-1",
              title: "Struct Padding & Bus Alignment Constraints",
              description: "Why structs consume more memory than the sum of their member sizes.",
              difficulty: "Intermediate",
              keyTakeaways: [
                "CPUs fetch memory in word-aligned chunks (4 or 8 bytes) to avoid split multi-cycle bus transactions.",
                "Compilers insert padding bytes so each member aligns to a multiple of its own byte size."
              ],
              concepts: ["Little-Endian", "Big-Endian", "Natural Alignment", "Struct Padding"],
              questions: [
                {
                  id: "arch-q-3",
                  statement: "Why does a C struct containing char (1B), int (4B), and char (1B) occupy 12 bytes instead of 6 bytes on a 64-bit machine?",
                  type: "Interview",
                  difficulty: "Intermediate",
                  explanation: "The int requires a 4-byte aligned address, forcing 3 padding bytes after the first char. The struct's total size must also be a multiple of its largest member alignment (4 bytes), forcing 3 trailing padding bytes after the second char (1 + 3 + 4 + 1 + 3 = 12 bytes)."
                }
              ]
            }
          ]
        }
      ]
    },
    {
      id: "arch-mod-2",
      order: 2,
      title: "Boolean Algebra & Logic Gates",
      shortDescription: "Axioms, De Morgan's laws, universal gates, K-Maps minimization, and timing hazards.",
      detailedOverview: "Construct digital logic from first principles. Master Boolean postulates, De Morgan's laws, universal NAND/NOR logic, Karnaugh Map (K-Map) gate minimization, and timing glitch hazard prevention.",
      difficulty: "Foundation",
      interviewBenchmark: "Prove why NAND is a universal logic gate and design an XOR function using exclusively 4 NAND gates.",
      topics: [
        {
          id: "arch-t-2-1",
          title: "Boolean Axioms & Universal Logic",
          description: "Truth tables, De Morgan's laws, and CMOS universal gate implementations.",
          difficulty: "Foundation",
          learningObjectives: ["Apply De Morgan's theorems", "Synthesize logic using universal gates"],
          subtopics: [
            {
              id: "arch-st-2-1-1",
              title: "De Morgan's Laws & CMOS NAND Universality",
              description: "Why silicon favors NAND gates over AND gates.",
              difficulty: "Foundation",
              keyTakeaways: [
                "De Morgan's laws: !(A & B) == !A | !B and !(A | B) == !A & !B.",
                "In CMOS silicon, a NAND gate requires only 4 transistors, whereas an AND gate requires a NAND plus an inverter (6 transistors), making NAND smaller and faster."
              ],
              concepts: ["De Morgan's Laws", "Universal Gates (NAND/NOR)", "CMOS Transistor Counts", "Logic Equivalence"],
              questions: [
                {
                  id: "arch-q-4",
                  statement: "Why are NAND and NOR gates called universal gates, and why does CMOS favor NAND gates in physical silicon?",
                  type: "Conceptual",
                  difficulty: "Foundation",
                  explanation: "NAND/NOR are universal because networks of either gate alone can synthesize any Boolean operation (NOT, AND, OR, XOR). In CMOS technology, an inverting NAND gate uses only 4 transistors, while a non-inverting AND gate requires 6 transistors, making NAND faster and more power-efficient."
                }
              ]
            }
          ]
        },
        {
          id: "arch-t-2-2",
          title: "Karnaugh Maps & Glitch Hazards",
          description: "Minimizing combinational circuits and eliminating timing glitches.",
          difficulty: "Intermediate",
          learningObjectives: ["Minimize Boolean expressions with K-Maps", "Identify static-1 hazards"],
          subtopics: [
            {
              id: "arch-st-2-2-1",
              title: "K-Map Minimization & Timing Glitches",
              description: "Eliminating transient false pulses caused by unequal gate propagation delays.",
              difficulty: "Intermediate",
              keyTakeaways: [
                "K-Maps group adjacent 1s in powers of 2 using Gray code ordering to yield minimal Sum-of-Products (SOP) circuits.",
                "Static-1 hazards occur when transitioning between adjacent non-overlapping implicants, generating momentary 0 glitches."
              ],
              concepts: ["Gray Code", "Prime Implicants", "Static-1 Hazards", "Consensus Terms"],
              questions: [
                {
                  id: "arch-q-5",
                  statement: "What causes a static-1 hazard in combinational logic, and how is it resolved?",
                  type: "Analytical",
                  difficulty: "Intermediate",
                  explanation: "A static-1 hazard occurs when an input transition should keep the output at 1, but unequal propagation delays across internal gates cause a momentary drop to 0. It is resolved by adding a redundant consensus term covering the boundary adjacent cells in the K-Map."
                }
              ]
            }
          ]
        }
      ]
    },
    {
      id: "arch-mod-3",
      order: 3,
      title: "Combinational & Sequential Circuits",
      shortDescription: "Adders, multiplexers, flip-flops, clock skew, setup/hold constraints, and metastability.",
      detailedOverview: "Build computational blocks and memory elements. Design Carry-Lookahead Adders and multiplexers, compare transparent latches with edge-triggered D flip-flops, and analyze setup time, hold time, and metastability in synchronous systems.",
      difficulty: "Intermediate",
      interviewBenchmark: "Explain the setup and hold time constraints of an edge-triggered D flip-flop and describe what happens during a metastability failure.",
      topics: [
        {
          id: "arch-t-3-1",
          title: "Adders & Multiplexers as Data Steering Blocks",
          description: "Ripple-carry vs carry-lookahead adders and MUX routing.",
          difficulty: "Intermediate",
          learningObjectives: ["Contrast Ripple-Carry and Carry-Lookahead adders", "Synthesize multiplexer networks"],
          subtopics: [
            {
              id: "arch-st-3-1-1",
              title: "Carry-Lookahead Adders (CLA) vs. Ripple-Carry",
              description: "Reducing addition gate latency from O(N) to O(log N).",
              difficulty: "Intermediate",
              keyTakeaways: [
                "Ripple-carry adders pass carry bits sequentially, creating linear O(N) delay.",
                "Carry-lookahead adders precompute carry generate (G = A & B) and propagate (P = A ^ B) signals, computing all carries in parallel in O(log N) time."
              ],
              concepts: ["Full Adder", "Ripple Carry Delay", "Generate & Propagate Logic", "Carry Lookahead"],
              questions: [
                {
                  id: "arch-q-6",
                  statement: "Why does a 64-bit Carry-Lookahead Adder (CLA) outperform a Ripple-Carry Adder in clock frequency?",
                  type: "Analytical",
                  difficulty: "Intermediate",
                  explanation: "In a Ripple-Carry Adder, each bit stage must wait for the carry-out of the preceding bit, creating an O(N) delay. CLA calculates carry generate and propagate terms directly from inputs, determining all carries in parallel via tree logic in O(log N) gate delays."
                }
              ]
            }
          ]
        },
        {
          id: "arch-t-3-2",
          title: "Sequential Logic, Clock Constraints & Metastability",
          description: "Latches vs Flip-Flops, setup/hold times, and dual-stage synchronizers.",
          difficulty: "Intermediate",
          learningObjectives: ["Calculate maximum clock frequency from setup time", "Mitigate metastability"],
          subtopics: [
            {
              id: "arch-st-3-2-1",
              title: "Setup/Hold Constraints & Metastability",
              description: "Timing rules that prevent indeterminate transistor states.",
              difficulty: "Intermediate",
              keyTakeaways: [
                "Setup time (t_setup): Data must be stable BEFORE clock edge.",
                "Hold time (t_hold): Data must remain stable AFTER clock edge.",
                "Violating timing constraints triggers metastability, where output hangs at an indeterminate mid-voltage state."
              ],
              concepts: ["Edge-Triggered D Flip-Flop", "Setup Time (t_setup)", "Hold Time (t_hold)", "Metastability", "Dual-Stage Synchronizer"],
              questions: [
                {
                  id: "arch-q-7",
                  statement: "What is metastability in digital flip-flops and how do engineers protect against it?",
                  type: "Interview",
                  difficulty: "Intermediate",
                  explanation: "Metastability occurs when an input signal transitions within the setup or hold window of a flip-flop, trapping internal transistors at an indeterminate voltage. Multi-stage synchronizers (two flip-flops in series) give the signal additional clock cycles to exponentially resolve before sampling."
                }
              ]
            }
          ]
        }
      ]
    },
    {
      id: "arch-mod-4",
      order: 4,
      title: "Registers, ALU & CPU Buses",
      shortDescription: "Register files, ALU design, processor status flags, system buses, and tri-state drivers.",
      detailedOverview: "Examine core CPU internal building blocks. Study multi-port register file design, ALU condition code flags (Z, N, C, V), data/address/control buses, and tri-state buffer arbitration.",
      difficulty: "Intermediate",
      interviewBenchmark: "Why does a 5-stage RISC processor register file require at least two read ports and one write port, and how do tri-state buffers prevent bus short circuits?",
      topics: [
        {
          id: "arch-t-4-1",
          title: "The Multi-Port Register File & ALU",
          description: "Dual-read single-write register files and status flag evaluation.",
          difficulty: "Intermediate",
          learningObjectives: ["Design multi-port register files", "Decode ALU status flags"],
          subtopics: [
            {
              id: "arch-st-4-1-1",
              title: "Register File Ports & Condition Code Flags",
              description: "Simultaneous operand reading and result writeback.",
              difficulty: "Intermediate",
              keyTakeaways: [
                "Two read ports and one write port allow simultaneous reading of two operands and retirement of a result in a single cycle.",
                "ALU condition code flags (Z, N, C, V) allow conditional branch instructions to evaluate inequalities without recomputing arithmetic."
              ],
              concepts: ["Multi-Port Register File", "Zero Flag (Z)", "Negative Flag (N)", "Overflow Flag (V)", "Carry Flag (C)"],
              questions: [
                {
                  id: "arch-q-8",
                  statement: "Why does a 5-stage RISC processor register file require at least two read ports and one write port?",
                  type: "Application",
                  difficulty: "Intermediate",
                  explanation: "Binary arithmetic instructions (ADD R1, R2, R3) require two source operands simultaneously in the Decode stage. Concurrently, the Writeback stage of an earlier instruction must write its result to a destination register. Two read ports and one write port avoid structural stalls."
                }
              ]
            }
          ]
        },
        {
          id: "arch-t-4-2",
          title: "System Bus Topology & Arbitration",
          description: "Data, address, and control buses, and high-impedance (Hi-Z) states.",
          difficulty: "Intermediate",
          learningObjectives: ["Calculate addressable memory from bus width", "Explain tri-state arbitration"],
          subtopics: [
            {
              id: "arch-st-4-2-1",
              title: "Tri-State Buffers & Bus Contention Prevention",
              description: "Why only one device can drive a bus line at any instant.",
              difficulty: "Intermediate",
              keyTakeaways: [
                "Address bus width N defines physical addressable space (2^N bytes).",
                "Tri-state buffers provide a high-impedance (Hi-Z) disconnected state, ensuring inactive devices do not cause short circuits on shared bus wires."
              ],
              concepts: ["Address Bus", "Data Bus", "Control Bus", "High-Impedance (Hi-Z)", "Bus Arbitration"],
              questions: [
                {
                  id: "arch-q-9",
                  statement: "What is the purpose of the high-impedance (Hi-Z) state in digital bus transceivers?",
                  type: "Conceptual",
                  difficulty: "Foundation",
                  explanation: "When multiple chips share common bus lines, if two devices simultaneously drive opposing voltages (0 and 1), a short circuit occurs, damaging the silicon. Hi-Z electrically disconnects inactive devices from the bus."
                }
              ]
            }
          ]
        }
      ]
    },
    {
      id: "arch-mod-5",
      order: 5,
      title: "Instruction Set Architecture (ISA) & Machine Code",
      shortDescription: "RISC vs CISC, instruction formats, addressing modes, assembly encoding, and the Application Binary Interface (ABI).",
      detailedOverview: "Explore the software-hardware interface. Compare RISC (ARM, RISC-V) and CISC (x86-64) philosophies, analyze load-store constraints, examine addressing modes, and study ABI conventions (caller-saved vs callee-saved registers and stack frames).",
      difficulty: "Intermediate",
      interviewBenchmark: "Differentiate between caller-saved and callee-saved registers in the System V AMD64 ABI and explain how stack frames are allocated and deallocated.",
      topics: [
        {
          id: "arch-t-5-1",
          title: "RISC vs. CISC Architectures",
          description: "x86-64 variable length vs ARM/RISC-V fixed length load-store models.",
          difficulty: "Intermediate",
          learningObjectives: ["Contrast RISC and CISC design trade-offs", "Explain load-store architecture"],
          subtopics: [
            {
              id: "arch-st-5-1-1",
              title: "Load-Store Architecture vs. Memory Operands",
              description: "Decoupling memory latency from ALU execution.",
              difficulty: "Intermediate",
              keyTakeaways: [
                "In a load-store architecture, arithmetic operations occur strictly between registers; memory access is isolated to explicit LOAD and STORE instructions.",
                "x86 CISC allows direct memory operands, requiring internal microcode decoding into RISC-like micro-ops (uops)."
              ],
              concepts: ["Load-Store Architecture", "RISC Fixed-Width Encoding", "CISC Variable Length", "Micro-Ops (uops)"],
              questions: [
                {
                  id: "arch-q-10",
                  statement: "What is a load-store architecture and why do modern RISC processors enforce it strictly?",
                  type: "Interview",
                  difficulty: "Intermediate",
                  explanation: "In a load-store architecture, arithmetic and logic instructions execute solely between CPU registers. Memory access is restricted to explicit LOAD and STORE instructions. This decouples variable memory access latencies from the ALU pipeline, keeping clock cycles uniform."
                }
              ]
            }
          ]
        },
        {
          id: "arch-t-5-2",
          title: "Addressing Modes & ABI Calling Conventions",
          description: "PC-relative addressing and caller-saved vs callee-saved register conventions.",
          difficulty: "Intermediate",
          learningObjectives: ["Analyze ABI register conventions", "Explain position-independent code (PIC)"],
          subtopics: [
            {
              id: "arch-st-5-2-1",
              title: "Caller-Saved vs. Callee-Saved Registers",
              description: "Contractual register management across function boundaries.",
              difficulty: "Intermediate",
              keyTakeaways: [
                "Caller-saved (volatile) registers can be overwritten by the callee; the caller must save them to its stack frame if needed later.",
                "Callee-saved (non-volatile) registers must be preserved across calls; the callee must back them up before use and restore them before returning."
              ],
              concepts: ["AMD64 ABI", "Caller-Saved Registers", "Callee-Saved Registers", "PC-Relative Addressing", "Stack Frame"],
              questions: [
                {
                  id: "arch-q-11",
                  statement: "Explain the distinction between caller-saved and callee-saved registers in a C/C++ ABI.",
                  type: "Interview",
                  difficulty: "Intermediate",
                  explanation: "Caller-saved registers can be overwritten by called functions; the caller is responsible for saving them if their values are needed across the call. Callee-saved registers must be preserved; if the called function modifies them, it must push them to the stack and restore them before returning."
                }
              ]
            }
          ]
        }
      ]
    },
    {
      id: "arch-mod-6",
      order: 6,
      title: "CPU Datapath & Instruction Execution Cycle",
      shortDescription: "The classic 5-stage RISC pipeline (IF, ID, EX, MEM, WB), pipeline registers, and control unit design.",
      detailedOverview: "Trace machine code execution through the silicon datapath. Deconstruct the classic 5-stage RISC pipeline: Instruction Fetch (IF), Instruction Decode (ID), Execute (EX), Memory Access (MEM), and Write Back (WB). Examine pipeline isolation registers and hardwired vs microprogrammed control units.",
      difficulty: "Intermediate",
      interviewBenchmark: "Trace an instruction through all 5 stages of the RISC datapath and explain why the destination register number must be propagated through pipeline registers until the Writeback stage.",
      topics: [
        {
          id: "arch-t-6-1",
          title: "The Classic 5-Stage RISC Pipeline",
          description: "IF, ID, EX, MEM, WB stages and pipeline register propagation.",
          difficulty: "Intermediate",
          learningObjectives: ["Trace instruction flow through 5 stages", "Explain pipeline register buffering"],
          subtopics: [
            {
              id: "arch-st-6-1-1",
              title: "Five Pipeline Stages & Destination Register Propagation",
              description: "Why register write addresses must travel through pipeline registers.",
              difficulty: "Intermediate",
              keyTakeaways: [
                "Pipelining divides the instruction cycle into 5 balanced stages, executing 5 instructions concurrently in different phases.",
                "The destination register number (Rd) must travel along pipeline registers to Writeback; otherwise, the WB stage would overwrite the destination of whatever instruction is currently in Decode."
              ],
              concepts: ["Instruction Fetch (IF)", "Instruction Decode (ID)", "Execute (EX)", "Memory Access (MEM)", "Write Back (WB)", "Pipeline Registers"],
              questions: [
                {
                  id: "arch-q-12",
                  statement: "Why does an instruction need to carry its destination register number (Rd) through all pipeline registers until Writeback?",
                  type: "Analytical",
                  difficulty: "Intermediate",
                  explanation: "An instruction's destination register is decoded in Stage 2 (ID), but writing occurs 3 cycles later in Stage 5 (WB). By the time Instruction 1 reaches WB, Stage 2 is already decoding Instruction 4. Without carrying Rd forward in pipeline registers, WB would corrupt Instruction 4's destination register."
                }
              ]
            }
          ]
        },
        {
          id: "arch-t-6-2",
          title: "Control Unit Design: Hardwired vs. Microprogrammed",
          description: "Generating control lines via combinational logic vs ROM microcode.",
          difficulty: "Intermediate",
          learningObjectives: ["Contrast hardwired and microprogrammed control units"],
          subtopics: [
            {
              id: "arch-st-6-2-1",
              title: "Hardwired Decoders vs. Microcode ROM",
              description: "Speed vs flexibility in CPU control logic.",
              difficulty: "Intermediate",
              keyTakeaways: [
                "Hardwired control units generate control signals directly through combinational logic gates for maximum clock frequency.",
                "Microprogrammed control units fetch micro-instructions from a ROM, providing flexibility to support complex CISC instructions and patch CPU errata."
              ],
              concepts: ["Hardwired Control", "Microprogrammed Control", "Control Store ROM", "RegWrite / MemRead / MemWrite Signals"],
              questions: [
                {
                  id: "arch-q-13",
                  statement: "Contrast hardwired control units with microprogrammed control units in terms of performance and flexibility.",
                  type: "Conceptual",
                  difficulty: "Intermediate",
                  explanation: "Hardwired units use combinational logic; they operate at maximum clock frequencies with zero microcode fetch delay, but cannot be changed after fabrication. Microprogrammed units execute micro-routines from an on-chip ROM; they are slower but allow implementing complex CISC instructions and patching CPU bugs via firmware."
                }
              ]
            }
          ]
        }
      ]
    },
    {
      id: "arch-mod-7",
      order: 7,
      title: "Pipelining & Hazard Resolution",
      shortDescription: "Throughput math, structural hazards, data hazards (RAW, WAR, WAW), data forwarding, stalls, and control hazards.",
      detailedOverview: "Overcome pipeline hazards that degrade throughput. Analyze structural resource contention, data hazards (Read-After-Write) resolved via hardware data forwarding/bypassing, load-use stall bubbles, and control hazard penalties.",
      difficulty: "Intermediate",
      interviewBenchmark: "Explain why hardware data forwarding can resolve an ALU-to-ALU hazard without stalling, but cannot eliminate a stall following a LOAD instruction.",
      topics: [
        {
          id: "arch-t-7-1",
          title: "Data Hazards & Hardware Data Forwarding",
          description: "RAW dependencies, forwarding multiplexers, and load-use pipeline stalls.",
          difficulty: "Intermediate",
          learningObjectives: ["Resolve RAW hazards via forwarding", "Detect load-use hazard stalls"],
          subtopics: [
            {
              id: "arch-st-7-1-1",
              title: "Data Forwarding (Bypassing) vs. Load-Use Stalls",
              description: "Routing ALU outputs directly to downstream ALU inputs.",
              difficulty: "Intermediate",
              keyTakeaways: [
                "Data forwarding routes ALU results from EX/MEM or MEM/WB pipeline registers directly back to ALU inputs, eliminating bubbles between back-to-back arithmetic instructions.",
                "A LOAD instruction only retrieves data at the end of MEM; an immediate dependent instruction requires data at the start of EX, forcing a 1-cycle hardware bubble."
              ],
              concepts: ["Read-After-Write (RAW)", "Data Forwarding / Bypassing", "Load-Use Hazard", "Pipeline Bubble"],
              questions: [
                {
                  id: "arch-q-14",
                  statement: "Why can data forwarding eliminate stalls between back-to-back ADD instructions, but CANNOT eliminate a stall between a LOAD and an immediately dependent instruction?",
                  type: "Interview",
                  difficulty: "Intermediate",
                  explanation: "An ADD instruction computes its result at the end of EX (cycle 3) and can forward it to the EX stage of the next instruction (cycle 4). A LOAD instruction only retrieves data from cache at the end of MEM (cycle 4). The dependent instruction needs it at the start of EX (cycle 4), which would require sending data backwards in time, forcing a 1-cycle stall bubble."
                }
              ]
            }
          ]
        },
        {
          id: "arch-t-7-2",
          title: "Structural & Control Hazards",
          description: "Harvard L1 cache splits and branch penalty bubbles.",
          difficulty: "Intermediate",
          learningObjectives: ["Eliminate structural hazards via Harvard cache split", "Calculate branch penalty cycles"],
          subtopics: [
            {
              id: "arch-st-7-2-1",
              title: "Harvard Cache Splits & Branch Penalty Bubbles",
              description: "Splitting L1 cache into instruction and data to eliminate memory contention.",
              difficulty: "Intermediate",
              keyTakeaways: [
                "Modern CPUs split L1 cache into L1-Instruction (L1-I) and L1-Data (L1-D) to eliminate structural hazards between instruction fetch and memory access.",
                "Unpredicted branches flush instructions fetched in error, wasting 2–3 clock cycles per branch."
              ],
              concepts: ["Structural Hazard", "Harvard L1-I / L1-D Split", "Control Hazard", "Pipeline Flush"],
              questions: [
                {
                  id: "arch-q-15",
                  statement: "How do modern processors eliminate the structural hazard of fetching an instruction while simultaneously reading data from memory?",
                  type: "Conceptual",
                  difficulty: "Foundation",
                  explanation: "They adopt a modified Harvard architecture at the L1 cache level, physically splitting L1 cache into an L1 Instruction Cache (L1-I) and an L1 Data Cache (L1-D), each with independent address and data bus connections."
                }
              ]
            }
          ]
        }
      ]
    },
    {
      id: "arch-mod-8",
      order: 8,
      title: "Branch Prediction & Out-of-Order Execution",
      shortDescription: "Dynamic branch predictors, Branch Target Buffers (BTB), speculative execution, Tomasulo's algorithm, and the Reorder Buffer (ROB).",
      detailedOverview: "Unlock modern superscalar performance. Master 2-bit saturating counter branch predictors, Branch Target Buffers (BTB), speculative execution, register renaming (eliminating WAR/WAW hazards), Tomasulo's algorithm, and in-order retirement via the Reorder Buffer (ROB).",
      difficulty: "Advanced",
      interviewBenchmark: "Why does sorting an array before filtering dramatically increase loop throughput on modern CPUs? How does the Reorder Buffer (ROB) guarantee precise exceptions during out-of-order execution?",
      topics: [
        {
          id: "arch-t-8-1",
          title: "Dynamic Branch Prediction & The BTB",
          description: "2-bit saturating counters, Branch Target Buffers, and branch misprediction penalties.",
          difficulty: "Intermediate",
          learningObjectives: ["Analyze 2-bit saturating counter FSMs", "Trace Branch Target Buffer lookups"],
          subtopics: [
            {
              id: "arch-st-8-1-1",
              title: "2-Bit Saturating Counters & Array Sorting Speedup",
              description: "Why unpredictable branches incur 15–20 cycle pipeline flush penalties.",
              difficulty: "Intermediate",
              keyTakeaways: [
                "2-bit counters require two consecutive mispredictions to change state, preventing loop exit anomalies from flipping predictions.",
                "On sorted data, branch conditions become predictable (>99% accuracy), avoiding costly 15–20 cycle pipeline flushes."
              ],
              concepts: ["2-Bit Saturating Counter", "Strongly/Weakly Taken", "Branch Target Buffer (BTB)", "Speculative Execution"],
              questions: [
                {
                  id: "arch-q-16",
                  statement: "Why does sorting an array before filtering elements in a loop dramatically speed up execution time in C/C++ or Java?",
                  type: "Interview",
                  difficulty: "Intermediate",
                  explanation: "In an unsorted array, the condition if (data[c] >= 128) is unpredictable (50/50 probability), causing frequent CPU branch mispredictions. Each misprediction flushes the execution pipeline, incurring a 15–20 cycle penalty. In a sorted array, the condition is consistently false then consistently true; the branch predictor achieves ~99% accuracy."
                }
              ]
            }
          ]
        },
        {
          id: "arch-t-8-2",
          title: "Superscalar & Out-of-Order Execution (OoO)",
          description: "Tomasulo's algorithm, register renaming, Reservation Stations, and the Reorder Buffer (ROB).",
          difficulty: "Advanced",
          learningObjectives: ["Eliminate WAR/WAW hazards via register renaming", "Explain in-order retirement via ROB"],
          subtopics: [
            {
              id: "arch-st-8-2-1",
              title: "Register Renaming & The Reorder Buffer (ROB)",
              description: "Executing out of order while committing strictly in program order.",
              difficulty: "Advanced",
              keyTakeaways: [
                "Register renaming maps architectural registers to physical registers, eliminating false Write-After-Read (WAR) and Write-After-Write (WAW) dependencies.",
                "Instructions execute out of order as operands become ready, but write their speculative results to the Reorder Buffer (ROB) and commit strictly in program order."
              ],
              concepts: ["Tomasulo's Algorithm", "Reservation Stations", "Register Renaming", "Reorder Buffer (ROB)", "Precise Exceptions"],
              questions: [
                {
                  id: "arch-q-17",
                  statement: "How does the Reorder Buffer (ROB) maintain the illusion of sequential, in-order execution in an out-of-order processor?",
                  type: "Analytical",
                  difficulty: "Advanced",
                  explanation: "The ROB allocates a FIFO queue entry for every instruction in program order during Dispatch. Instructions execute out-of-order and write speculative results to their assigned ROB slot. Results commit to the architectural register file strictly at the head of the ROB in original program order. If an exception occurs, all subsequent speculative entries are cleanly purged."
                }
              ]
            }
          ]
        }
      ]
    },
    {
      id: "arch-mod-9",
      order: 9,
      title: "Memory Hierarchy, Caches & Cache Coherence",
      shortDescription: "Locality of reference, cache mapping (Direct, Set-Associative), write policies, cache miss types, MESI protocol, and false sharing.",
      detailedOverview: "Study memory latency scaling. Master spatial and temporal locality, calculate tag/index/offset address bit splits for set-associative caches, analyze write-back vs write-through policies, examine the 3 C's of cache misses, and analyze multicore cache coherence (MESI) and software false sharing.",
      difficulty: "Advanced",
      interviewBenchmark: "Calculate Tag, Index, and Offset bits for a 32-bit address in a 32 KiB 4-way set-associative cache with 64-byte lines. What is false sharing and how does cache-line padding solve it?",
      topics: [
        {
          id: "arch-t-9-1",
          title: "Cache Architecture & Address Decoding",
          description: "Tag, Index, and Offset address partitioning and N-way set associativity.",
          difficulty: "Intermediate",
          learningObjectives: ["Calculate Tag, Index, and Offset bits", "Contrast cache miss categories"],
          subtopics: [
            {
              id: "arch-st-9-1-1",
              title: "Tag, Index & Offset Bit Math & The 3 C's",
              description: "How hardware locates data in N-way set-associative caches.",
              difficulty: "Intermediate",
              keyTakeaways: [
                "Offset bits = log2(line size). Index bits = log2(number of sets). Tag bits = remaining address bits.",
                "The 3 C's of misses: Compulsory (cold miss), Capacity (working set exceeds cache), and Conflict (multiple lines map to the same set)."
              ],
              concepts: ["Spatial & Temporal Locality", "64-Byte Cache Lines", "N-Way Set Associative", "Tag / Index / Offset Math", "The 3 C's of Misses"],
              questions: [
                {
                  id: "arch-q-18",
                  statement: "Calculate the Tag, Index, and Offset bits for a 32-bit memory address in a 32 KiB 4-way set-associative cache with 64-byte cache lines.",
                  type: "Analytical",
                  difficulty: "Intermediate",
                  explanation: "Offset: 64 bytes = 2^6 bytes -> 6 offset bits. Sets: 32 KiB total = 32,768 bytes. Each set holds 4 lines * 64 bytes = 256 bytes. Sets = 32,768 / 256 = 128 sets = 2^7 -> 7 index bits. Tag: Remaining bits = 32 - 7 - 6 = 19 tag bits."
                }
              ]
            }
          ]
        },
        {
          id: "arch-t-9-2",
          title: "Multicore Cache Coherence & False Sharing",
          description: "The MESI protocol state machine and mitigating software false sharing.",
          difficulty: "Advanced",
          learningObjectives: ["Trace MESI coherence transitions", "Prevent false sharing in concurrent software"],
          subtopics: [
            {
              id: "arch-st-9-2-1",
              title: "The MESI Protocol & False Sharing Mitigation",
              description: "Why threads updating independent variables on the same cache line destroy multicore scaling.",
              difficulty: "Advanced",
              keyTakeaways: [
                "MESI states: Modified (dirty, core private), Exclusive (clean, core private), Shared (clean, multi-core), Invalid (stale).",
                "False sharing occurs when threads on different cores update independent variables residing within the same 64-byte cache line, causing constant cache line bouncing and invalidations."
              ],
              concepts: ["MESI Protocol (Modified, Exclusive, Shared, Invalid)", "Bus Snooping", "False Sharing", "Cache Line Bouncing", "Cache Line Padding"],
              questions: [
                {
                  id: "arch-q-19",
                  statement: "What is false sharing in multicore concurrent programming, and how do you prevent it in high-performance C++ or Java code?",
                  type: "Interview",
                  difficulty: "Advanced",
                  explanation: "False sharing occurs when threads on different cores write to independent variables located on the same 64-byte cache line. The MESI coherence protocol invalidates the entire line across core caches, bouncing the line between cores. Prevention: Pad variables with dummy bytes or use alignment directives (e.g. alignas(64) in C++ or @Contended in Java) to isolate variables on distinct cache lines."
                }
              ]
            }
          ]
        }
      ]
    },
    {
      id: "arch-mod-10",
      order: 10,
      title: "Hardware Virtual Memory & Parallelism",
      shortDescription: "MMU hardware paging, multi-level page tables, TLB datapath, SIMD vector processing, and SMT / Hyper-Threading.",
      detailedOverview: "Connect microarchitecture to modern systems software. Examine hardware page table walks in the Memory Management Unit (MMU), Translation Lookaside Buffer (TLB) hits and shootdowns, SIMD data parallelism (AVX-512, NEON), and Simultaneous Multithreading (SMT / Hyper-Threading).",
      difficulty: "Advanced",
      interviewBenchmark: "Walk through physical address translation via the MMU and TLB for a 4-level page table, and explain why Hyper-Threading does not double compute performance for ALU-bound workloads.",
      topics: [
        {
          id: "arch-t-10-1",
          title: "The MMU & Translation Lookaside Buffer (TLB)",
          description: "Hardware page table walks, multi-level paging, and TLB reach.",
          difficulty: "Advanced",
          learningObjectives: ["Trace MMU virtual-to-physical address translation", "Calculate TLB reach"],
          subtopics: [
            {
              id: "arch-st-10-1-1",
              title: "Multi-Level Page Tables & TLB Hit Datapath",
              description: "How hardware translates virtual addresses without petabyte-sized linear tables.",
              difficulty: "Advanced",
              keyTakeaways: [
                "Multi-level page tables create a tree structure where unmapped sparse memory regions require zero directory pages in physical RAM.",
                "The TLB caches recent virtual-to-physical translations; huge pages (2 MiB / 1 GiB) drastically increase TLB reach, eliminating page walk stalls."
              ],
              concepts: ["Memory Management Unit (MMU)", "Multi-Level Paging", "TLB Hit / Miss", "Huge Pages", "TLB Reach"],
              questions: [
                {
                  id: "arch-q-20",
                  statement: "Why does a 64-bit architecture use a 4-level page table instead of a single contiguous page table array?",
                  type: "Conceptual",
                  difficulty: "Intermediate",
                  explanation: "A single linear page table for a 64-bit address space with 4 KiB pages would require 2^52 entries, consuming petabytes of RAM simply to store translations. A multi-level table creates a tree where unmapped intermediate directories are never allocated in RAM."
                }
              ]
            }
          ]
        },
        {
          id: "arch-t-10-2",
          title: "Hardware Parallelism: SIMD & Hyper-Threading",
          description: "Data-parallel SIMD vector execution and Simultaneous Multithreading (SMT).",
          difficulty: "Advanced",
          learningObjectives: ["Accelerate data loops via SIMD vector registers", "Explain SMT hardware resource sharing"],
          subtopics: [
            {
              id: "arch-st-10-2-1",
              title: "SIMD Vector Execution & Hyper-Threading Mechanics",
              description: "Vector registers (AVX/NEON) and sharing execution units across hardware threads.",
              difficulty: "Advanced",
              keyTakeaways: [
                "SIMD (AVX, NEON) applies a single instruction to wide vector registers (256/512-bit), processing multiple numbers simultaneously in one cycle.",
                "Hyper-Threading duplicates only architectural registers and the PC, sharing execution units and caches; it hides memory latency but does not double compute performance."
              ],
              concepts: ["SIMD Vector Registers", "AVX-512 / ARM NEON", "Simultaneous Multithreading (SMT)", "Architectural vs Physical State"],
              questions: [
                {
                  id: "arch-q-21",
                  statement: "What is Simultaneous Multithreading (Hyper-Threading) at the hardware level, and why does a 2-thread core not yield 2x performance on CPU-bound arithmetic?",
                  type: "Interview",
                  difficulty: "Advanced",
                  explanation: "SMT duplicates only the architectural register set and program counter; it does NOT duplicate ALUs, FPUs, or caches. It improves throughput by utilizing execution unit idle slots when one thread stalls on memory. If both threads are compute-bound and saturate the ALUs simultaneously, they contend for the same physical execution units, yielding modest (15-30%) speedup."
                }
              ]
            }
          ]
        }
      ]
    }
  ]
};
