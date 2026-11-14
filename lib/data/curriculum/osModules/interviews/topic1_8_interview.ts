import { LessonInterviewData } from "../../types";

export const topic1_8_interview: Record<string, LessonInterviewData> = {
  "os-les-1-8-1": {
    lessonId: "os-les-1-8-1",
    topicId: "os-topic-1-8",
    quickExplanation: {
      whatItIs: "Asynchronous events are electrical signals generated outside the CPU's instruction pipeline (by timers, network cards, keyboards, disks) that demand immediate processor attention.",
      whyItExists: "Without asynchronous events, the CPU would have to spend 99% of its clock cycles constantly polling hardware status registers in busy loops, destroying throughput and battery life.",
      howItWorks: "Peripherals assert an Interrupt Request (IRQ) line. The Interrupt Controller (APIC) prioritizes the signal and signals the CPU. Between instruction execution cycles, the CPU suspends the current program and vectors to an Interrupt Service Routine (ISR).",
      criticalMechanism: "Hardware Interrupt Line & APIC (Advanced Programmable Interrupt Controller): multiplexing and routing external electrical IRQs to specific CPU cores.",
      realWorldConnection: "When an Ethernet card finishes receiving a 1.5 KB packet over fiber, it asserts an IRQ line to wake the CPU from sleep or pause user code to process the TCP packet.",
      misconceptions: [
        "Thinking interrupts occur at fixed clock intervals (hardware interrupts are completely unpredictable and asynchronous).",
        "Assuming interrupts can be triggered mid-instruction (the CPU finishes retiring the currently executing instruction before jumping to the ISR, except during faults)."
      ]
    },
    visual: {
      title: "Polling Waste vs Asynchronous Interrupt Efficiency",
      caption: "Comparing busy-wait polling against hardware interrupt notification.",
      visualType: "ascii",
      asciiArt: `POLLING (Continuous CPU Waste)
CPU: "Data ready?" -> NO
CPU: "Data ready?" -> NO  <--- (CPU pegged at 100%, burns power, starves tasks!)
CPU: "Data ready?" -> YES! -> Processes 1 byte

ASYNCHRONOUS INTERRUPT (Zero Overhead Until Event Occurs)
CPU: Executes user code (Matrix multiply, compilation, games) at 100% speed!
PERIPHERAL: Finishes reading sector -> Asserts hardware IRQ line!
INTERRUPT CONTROLLER (APIC): Signals CPU core
CPU: Saves state -> Jumps to ISR -> Reads data -> Resumes user code!`,
      keyInsights: [
        "Interrupts allow the CPU to sleep (hlt) or run other tasks until events occur.",
        "The APIC prioritizes interrupts and routes them across multi-core systems.",
        "Asynchronous events are completely decoupled from program instruction execution."
      ]
    },
    questions: [
      {
        id: "os-int-1-8-1-q1",
        question: "Why is interrupt-driven I/O vastly superior to polling for low-to-medium frequency peripheral devices?",
        difficulty: "Foundation",
        conciseAnswer: "Because polling forces the CPU to burn millions of clock cycles in busy-wait loops repeatedly checking hardware status registers, preventing other tasks from running and consuming unnecessary electrical power. Interrupts allow the CPU to execute user code (or sleep in a low-power C-state) and wake up only when hardware actually requires service.",
        inDepthExplanation: "A human typing on a keyboard strikes a key approximately once every 100 milliseconds. If the CPU polled the keyboard controller at 3 GHz, it would execute 300 million status checks between every single keystroke, achieving 0.0000003% efficiency. Under interrupt-driven I/O, the keyboard controller asserts an IRQ only when a physical key is pressed. The CPU spends 0 cycles on the keyboard while idle, waking up for 2 microseconds to process the keystroke and immediately returning to user computation.",
        executionTraceOrExample: "Keyboard poll: 300,000,000 instructions executed per second. Keyboard interrupt: exactly 1 interrupt per keypress taking 500 nanoseconds.",
        followUps: [
          "Interviewer: 'When is polling actually PREFERRED over interrupts in modern systems?' -> Candidate: 'For ultra-high-throughput devices (like 100 Gbps network cards or NVMe SSDs running millions of IOPS), where handling millions of hardware interrupts per second causes interrupt livelock and cache thrashing; polling via NAPI or DPDK in batches eliminates context-switch overhead.'"
        ]
      },
      {
        id: "os-int-1-8-1-q2",
        question: "What is an Advanced Programmable Interrupt Controller (APIC) and what is its role in multi-core systems?",
        difficulty: "Intermediate",
        conciseAnswer: "The APIC is a hardware interrupt routing subsystem consisting of an I/O APIC (on the motherboard) and Local APICs (LAPIC, one inside each CPU core). The I/O APIC receives physical IRQ lines from peripherals and distributes them across the LAPICs of multi-core processors based on priority and core affinity rules.",
        inDepthExplanation: "In legacy uniprocessor systems, a single 8259 PIC routed interrupts to one CPU. In modern multi-core SMP architectures, the APIC solves the problem of distributing interrupts across dozens of cores. The I/O APIC collects external device interrupts (PCIe, USB, storage) and routes them over the system bus to specific Local APICs. Each LAPIC also contains its own internal high-resolution timer (the LAPIC timer used for OS preemption scheduling) and can generate Inter-Processor Interrupts (IPIs) to signal other CPU cores.",
        executionTraceOrExample: "Network packet arrives on NIC -> I/O APIC receives IRQ -> routes interrupt to LAPIC of Core 2 -> Core 2 pauses user thread and runs driver ISR.",
        followUps: [
          "Interviewer: 'What is an Inter-Processor Interrupt (IPI)?' -> Candidate: 'An IPI is an interrupt sent by one CPU core to another CPU core via the LAPIC; it is essential for multi-core synchronization, such as TLB shootdowns (forcing other cores to invalidate stale page translations) and remote thread preemption.'"
        ]
      }
    ]
  },
  "os-les-1-8-2": {
    lessonId: "os-les-1-8-2",
    topicId: "os-topic-1-8",
    quickExplanation: {
      whatItIs: "A Hardware Interrupt is an asynchronous electrical signal generated by an external physical device (timer, keyboard, disk controller, NIC) that temporarily suspends CPU execution.",
      whyItExists: "Physical peripherals operate independently of CPU clock cycles; they require an unignorable mechanism to signal that data is ready, a transfer is complete, or an error has occurred.",
      howItWorks: "Device asserts IRQ -> APIC translates to an interrupt vector number (32..255) -> CPU finishes current instruction -> pushes register context to kernel stack -> looks up IDT entry -> executes Interrupt Service Routine (ISR) -> runs `iretq` to resume.",
      criticalMechanism: "Interrupt Descriptor Table (IDT): a 256-entry array in supervisor memory storing gate descriptors and function pointers to the kernel's interrupt handlers.",
      realWorldConnection: "The timer interrupt (firing at 100 Hz to 1000 Hz, defined by `CONFIG_HZ` in Linux) is the heartbeat of the operating system that drives process scheduling and clock updates.",
      misconceptions: [
        "Believing hardware interrupts are synchronous with code execution (they can arrive at any nanosecond between any two assembly instructions).",
        "Thinking all interrupts can be disabled with `cli` (Non-Maskable Interrupts like NMI for hardware memory parity failure cannot be disabled)."
      ]
    },
    visual: {
      title: "Hardware Interrupt Delivery Pipeline",
      caption: "From physical device electrical signal to kernel ISR execution.",
      visualType: "ascii",
      asciiArt: `[ PHYSICAL DEVICE: NVMe Controller ]
                |
                v (Asserts electrical line / sends PCIe MSI-X message)
[ I/O APIC (Motherboard Chipset) ]
                |
                v (Routes vector 42 to Core 1 LAPIC)
[ CPU CORE 1 (Local APIC) ]
  - Checks Interrupt Flag (IF) in EFLAGS: Is IF == 1?
  - YES! Completes current instruction.
  - Switches to Kernel Stack (RSP0 from TSS).
  - Pushes user SS, RSP, RFLAGS, CS, and RIP.
  - Clears IF flag (disables interrupts during entry).
  - Fetches IDT[42] -> Jumps to nvme_irq_handler().
  - Executes device driver code.
  - Executes 'iretq' -> Restores user state and resumes user program!`,
      keyInsights: [
        "Interrupt Flag (IF = 0) masks standard hardware interrupts during critical sections.",
        "Non-Maskable Interrupts (NMI, Vector 2) bypass the IF flag for catastrophic hardware errors.",
        "Modern systems use PCIe MSI-X (Message Signaled Interrupts) writing directly to LAPIC memory."
      ]
    },
    questions: [
      {
        id: "os-int-1-8-2-q1",
        question: "What is the difference between a Maskable Interrupt and a Non-Maskable Interrupt (NMI)?",
        difficulty: "Intermediate",
        conciseAnswer: "A Maskable Interrupt can be temporarily delayed or disabled by the CPU when the Interrupt Flag (IF) in EFLAGS is cleared using the `cli` instruction. A Non-Maskable Interrupt (NMI, Vector 2) bypasses the Interrupt Flag entirely; the CPU must service an NMI immediately, regardless of what code is executing.",
        inDepthExplanation: "Standard peripheral interrupts (timer ticks, network packets, keystrokes) are maskable. The kernel disables them (`cli` / `local_irq_disable()`) during spinlock critical sections to prevent deadlock. Non-Maskable Interrupts are reserved for catastrophic, unignorable hardware emergencies: uncorrectable ECC memory bus parity errors, thermal overheating alerts, hardware watchdog timers (detecting that a CPU core has completely frozen), and performance profiling.",
        executionTraceOrExample: "Kernel holds spinlock with `cli` (IF=0). Disk interrupt arrives -> held pending by APIC. NMI arrives -> CPU immediately vectors to `nmi_handler()` in IDT Vector 2.",
        followUps: [
          "Interviewer: 'How does the Linux 'hard lockup detector' use NMIs?' -> Candidate: 'A periodic hardware watchdog timer fires an NMI across all cores. The NMI handler checks whether each core has processed its regular timer interrupts. If a core has spent >10 seconds with interrupts disabled, the NMI handler detects a hard lockup and triggers a kernel panic with backtrace.'"
        ]
      },
      {
        id: "os-int-1-8-2-q2",
        question: "Why do modern high-speed peripherals use PCIe MSI-X (Message Signaled Interrupts) instead of traditional physical IRQ pin lines?",
        difficulty: "Advanced",
        conciseAnswer: "Traditional physical IRQ pins (like INTx) are shared electrical wires on the motherboard, requiring multiple devices to share an interrupt line and forcing the CPU to poll all shared drivers. MSI-X sends interrupts as direct, in-band PCIe memory write transactions with dedicated message vectors, supporting thousands of independent interrupt vectors routed directly to specific CPU cores.",
        inDepthExplanation: "Legacy PCI had only 4 physical interrupt pins (INTA, INTB, INTC, INTD). If 10 devices shared INTA, whenever an interrupt fired, the kernel had to execute the ISR of every driver on that line to see who owned it, causing severe latency. With MSI-X (Message Signaled Interrupts eXtended), there are no physical interrupt wires. When a high-speed NVMe drive or 100GbE NIC has an event, it writes a small 32-bit value directly to the Local APIC's memory-mapped address space via a PCIe memory write. MSI-X supports up to 2,048 distinct interrupt vectors per device, allowing multi-queue network cards to assign dedicated interrupt vectors directly to separate CPU cores for zero-contention parallel processing.",
        executionTraceOrExample: "100GbE NIC has 64 RX queues -> assigns Queue 0 MSI-X vector to Core 0, Queue 1 to Core 1, ..., Queue 63 to Core 63. Maximum parallel throughput without lock contention.",
        followUps: [
          "Interviewer: 'What is Interrupt Affinity in Linux?' -> Candidate: 'Configured via `/proc/irq/<num>/smp_affinity`, it tells the APIC which specific CPU cores are permitted to service a particular hardware interrupt vector, optimizing cache locality.'"
        ]
      }
    ]
  },
  "os-les-1-8-3": {
    lessonId: "os-les-1-8-3",
    topicId: "os-topic-1-8",
    quickExplanation: {
      whatItIs: "An Exception (or Fault) is a synchronous event generated internally by the CPU execution unit itself when it encounters an error or exceptional condition while attempting to execute an instruction.",
      whyItExists: "Hardware cannot execute mathematically or architecturally impossible instructions (divide by zero, unmapped memory access, undefined opcodes). The CPU must notify the supervisor kernel.",
      howItWorks: "The instruction execution unit aborts instruction retirement, pushes an architectural error code, and vectors to a dedicated exception vector in the IDT (e.g., Vector 0 for Divide Error, Vector 14 for Page Fault).",
      criticalMechanism: "Synchronous Execution Coupling: exceptions are synchronous because they occur at the exact instruction that caused them and are completely reproducible with the same inputs.",
      realWorldConnection: "Dereferencing a NULL pointer in C produces an unmapped address `0x0`, causing the MMU to fire Vector 14 (Page Fault), which the Linux kernel translates into signal 11 (`SIGSEGV`).",
      misconceptions: [
        "Confusing a Hardware Exception with a Hardware Interrupt (Interrupts are asynchronous external electrical events from devices; Exceptions are synchronous internal CPU instruction events).",
        "Believing all exceptions terminate the program (Page Faults are routinely resolved by the kernel to load memory from disk and resume the program transparently)."
      ]
    },
    visual: {
      title: "Asynchronous Interrupt vs Synchronous Exception",
      caption: "Comparing external device signals against internal instruction faults.",
      visualType: "ascii",
      asciiArt: `HARDWARE INTERRUPT (Asynchronous)
  Instruction 1 -> Instruction 2 -> Instruction 3 -> Instruction 4
                                         ^
                                         | (NIC packet arrives at arbitrary time!)
  [ Origin: External physical hardware | Timing: Unpredictable ]

HARDWARE EXCEPTION (Synchronous)
  Instruction 1 -> Instruction 2: (div eax, 0)
                                         |
                                         v (CPU detects zero divisor!)
  [ Origin: Internal CPU execution ALU  | Timing: Exact, deterministic instruction ]`,
      keyInsights: [
        "Exceptions are 100% reproducible: executing the same code with the same data faults again.",
        "Interrupts are non-deterministic: timing depends on external physics and network packets.",
        "Both use the Interrupt Descriptor Table (IDT) to enter the kernel."
      ]
    },
    questions: [
      {
        id: "os-int-1-8-3-q1",
        question: "Why are CPU exceptions described as 'synchronous' while hardware interrupts are described as 'asynchronous'?",
        difficulty: "Foundation",
        conciseAnswer: "Exceptions are synchronous because they are triggered directly by the execution of a specific CPU instruction (e.g., dividing by zero or dereferencing an invalid pointer) and occur at an exact, predictable instruction boundary. Interrupts are asynchronous because they are generated by external hardware devices (timers, network cards) and can arrive at any arbitrary nanosecond, completely independent of the instructions the CPU is currently executing.",
        inDepthExplanation: "If you execute a program with an integer divide by zero 1,000 times, the CPU will generate a Divide Error exception (Vector 0) at the exact same Program Counter (`%rip`) 1,000 times out of 1,000. It is synchronized with the processor clock and instruction pipeline. Conversely, an Ethernet card receives a packet based on network physics; it might assert an IRQ while the CPU is executing instruction 4, or instruction 400, or instruction 4,000,000. The interrupt is completely decoupled from the instruction stream.",
        executionTraceOrExample: "Exception: `idiv eax` with divisor 0 -> Exception 0 raised *synchronously* by the ALU. Interrupt: APIC asserts IRQ line *asynchronously* while user calculates fibonacci.",
        followUps: [
          "Interviewer: 'Can an interrupt ever be synchronous?' -> Candidate: 'No, by definition hardware interrupts are asynchronous. Software interrupts (like `int 0x80`) are synchronous, but they are technically classified as software traps rather than hardware interrupts.'"
        ]
      },
      {
        id: "os-int-1-8-3-q2",
        question: "Explain the three classes of CPU exceptions: Faults, Traps, and Aborts, with concrete examples.",
        difficulty: "Intermediate",
        conciseAnswer: "1. **Fault**: Correctable exception reported before instruction execution; saved `%rip` points to the faulting instruction so it can be restarted after resolution (e.g., Page Fault #PF). 2. **Trap**: Reported immediately after instruction execution; saved `%rip` points to the following instruction (e.g., Debugger Breakpoint `int3`). 3. **Abort**: Unrecoverable hardware catastrophe; instruction cannot be restarted and process/system must be terminated (e.g., Machine Check Exception #MC).",
        inDepthExplanation: "The distinction lies in what is stored in the saved `%rip` on the kernel stack: (1) A Page Fault is a Fault: the instruction `mov eax, [rbx]` failed because `rbx` was paged out to disk. The kernel loads the page into RAM and executes `iretq`. Because `%rip` points to the `mov` instruction, the CPU re-executes it and succeeds. (2) A debugger breakpoint is a Trap: the programmer hits a breakpoint at instruction A. The debugger resumes execution at instruction B. (3) A Machine Check (Vector 18) is an Abort: a physical memory bus detected an uncorrectable bit flip or motherboard bus parity error; the hardware state is corrupted and the system enters Kernel Panic.",
        executionTraceOrExample: "Fault: `%rip = 0x401000`. Kernel fixes page. Returns to `0x401000` (re-runs). Trap: `%rip = 0x401000`. Kernel logs debug event. Returns to `0x401004` (runs next).",
        followUps: [
          "Interviewer: 'What happens if a Fault occurs while the kernel is trying to service another Fault?' -> Candidate: 'If an exception occurs while handling an earlier exception and cannot be resolved, the CPU raises a Double Fault (#DF, Vector 8). If the Double Fault handler itself faults, the CPU enters an unrecoverable Triple Fault, pulling the physical hardware reset line and rebooting the machine immediately.'"
        ]
      }
    ]
  },
  "os-les-1-8-4": {
    lessonId: "os-les-1-8-4",
    topicId: "os-topic-1-8",
    quickExplanation: {
      whatItIs: "A Software Trap is an intentional, software-generated CPU exception triggered by an executing program (via instructions like `syscall`, `sysenter`, or `int 0x80`) to request kernel services.",
      whyItExists: "User applications lack privilege to touch hardware directly. Traps provide an intentional, synchronous gateway to safely cross into Ring 0.",
      howItWorks: "The program executes a trap instruction. The CPU atomically elevates CPL to 0, saves user state, and vectors to the kernel's registered entry point.",
      criticalMechanism: "Hardware Gate Descriptors: the CPU validates that the calling code has permission to invoke the trap gate (DPL >= CPL).",
      realWorldConnection: "Debuggers like GDB implement breakpoints by overwriting the target instruction's first byte with the 1-byte opcode `0xCC` (`int3`), causing the CPU to trap into the kernel and notify GDB.",
      misconceptions: [
        "Thinking a trap is an accidental error (a trap is an intentional software instruction executed on purpose).",
        "Believing `int3` causes a crash (it traps into the kernel, which sends `SIGTRAP` to allow the debugger to inspect variables)."
      ]
    },
    visual: {
      title: "Software Trap as an Intentional Gateway",
      caption: "Crossing from user execution to kernel debugger or service.",
      visualType: "ascii",
      asciiArt: `USER APPLICATION
  - Desires kernel service or reaches debugger breakpoint:
  - Executes: 'syscall' (Opcode 0x0F 0x05) OR 'int3' (Opcode 0xCC)
                        |
                        v (Synchronous CPU Trap)
+-------------------------------------------------------------+
| CPU EXECUTION HARDWARE                                      |
|  - Elevates CPL to 0 (Supervisor Mode)                      |
|  - Saves User %rip and %rflags                              |
|  - Loads target %rip from MSR_LSTAR or IDT[3]               |
+-------------------------------------------------------------+
                        |
                        v
KERNEL TRAP HANDLER (Ring 0)
  - Syscall: Validates arguments -> dispatches service
  - Breakpoint: Suspends thread -> sends SIGTRAP to GDB`,
      keyInsights: [
        "Traps are completely intentional software instructions.",
        "GDB breakpoints replace application opcodes with the 1-byte trap instruction 0xCC.",
        "System calls are the most frequent software traps executed in computing."
      ]
    },
    questions: [
      {
        id: "os-int-1-8-4-q1",
        question: "How do software debuggers like GDB implement breakpoints using CPU software traps?",
        difficulty: "Intermediate",
        conciseAnswer: "GDB uses the `ptrace()` system call to overwrite the first byte of the target instruction in the application's memory with the 1-byte opcode `0xCC`, which corresponds to the x86 `int3` software trap instruction. When the CPU reaches that address, it executes `int3`, elevating to Ring 0 and raising Exception 3 (`#BP`). The kernel sends `SIGTRAP` to the process, pausing it and allowing GDB to inspect registers.",
        inDepthExplanation: "To set a breakpoint at `0x401050`: 1. GDB reads the original instruction byte at `0x401050` (e.g., `0x55` for `push rbp`) and saves it. 2. GDB writes `0xCC` (`int3`) to `0x401050`. 3. When the program executes, the CPU hits `0xCC`, traps into the kernel IDT Vector 3, and stops the process. 4. GDB is notified, displays the source line to the developer. 5. When the user types 'continue', GDB restores the original byte `0x55`, single-steps the CPU, writes `0xCC` back, and resumes normal execution.",
        executionTraceOrExample: "Original: `55 48 89 e5` (push rbp; mov rbp, rsp). Breakpoint set: `CC 48 89 e5`. CPU hits `CC` -> traps to GDB.",
        followUps: [
          "Interviewer: 'Why is int3 designed as a 1-byte opcode (0xCC) instead of the standard 2-byte opcode `int 3` (0xCD 0x03)?' -> Candidate: 'Because in variable-length instruction architectures like x86, replacing a 1-byte instruction (like `nop` or `inc eax`) with a 2-byte instruction would overwrite part of the neighboring instruction, corrupting code if execution jumped around it.'"
        ]
      },
      {
        id: "os-int-1-8-4-q2",
        question: "What is the Descriptor Privilege Level (DPL) in an IDT gate descriptor, and how does it prevent rogue user code from executing software interrupts?",
        difficulty: "Advanced",
        conciseAnswer: "The Descriptor Privilege Level (DPL, bits 45-46) specifies the minimum privilege level an application must possess to invoke that gate descriptor via software instructions like `int N`. For system call and breakpoint gates, DPL is set to 3 (allowing user invocation). For hardware interrupt gates, DPL is set to 0; if a user-space program executes `int 14` (Page Fault) or `int 32` (Timer), the CPU checks `CPL (3) > DPL (0)` and triggers a General Protection Fault (#GP) instead.",
        inDepthExplanation: "Without DPL checks, a malicious user process could simulate any hardware interrupt or exception by executing software interrupt opcodes (e.g., running `int 0` to trigger a fake divide error or `int 32` to hijack the timer). In x86, when a software `int N` instruction executes, the CPU microcode verifies that the Current Privilege Level (`CPL <= DPL`). The kernel sets DPL = 3 only on intentional trap gates (like `int3` for debuggers or legacy `int 0x80` for syscalls). For all hardware interrupt gates, the kernel sets DPL = 0. If user code attempts to execute `int 32`, the CPU refuses and generates a #GP.",
        executionTraceOrExample: "User executes `asm(\"int 32\");` in Ring 3: CPU checks `CPL (3) <= IDT[32].DPL (0)` -> False! -> Raises General Protection Fault (Vector 13).",
        followUps: [
          "Interviewer: 'Does hardware IRQ delivery check the DPL?' -> Candidate: 'No. External hardware interrupts generated by the APIC bypass the software DPL check completely, because hardware pins are physical electrical signals outside user software control.'"
        ]
      }
    ]
  },
  "os-les-1-8-5": {
    lessonId: "os-les-1-8-5",
    topicId: "os-topic-1-8",
    quickExplanation: {
      whatItIs: "The Interrupt Descriptor Table (IDT) is a 256-entry array in privileged memory that maps each interrupt vector number (0 to 255) to its corresponding kernel Interrupt Service Routine (ISR) address.",
      whyItExists: "The CPU needs a fast, direct hardware lookup table to determine which kernel function pointer to execute when an exception, trap, or hardware interrupt occurs.",
      howItWorks: "The kernel configures the table during boot and informs the CPU of its physical address using the `lidt` instruction. When vector N arrives, the CPU reads entry N, checks permissions, switches stacks, and jumps to the handler.",
      criticalMechanism: "The `lidt` (Load IDT) Instruction and IDTR Register: holding the 64-bit base address and 16-bit limit of the IDT in CPU registers.",
      realWorldConnection: "Vectors 0–31 are reserved by Intel/AMD for architectural CPU exceptions (Page Fault, Double Fault, Divide Error); vectors 32–255 are assigned by the Linux kernel for hardware IRQs and software traps.",
      misconceptions: [
        "Thinking the IDT can be modified by user programs (the IDT resides in supervisor memory; modifying it requires Ring 0).",
        "Believing each CPU core shares a single IDT register (while they typically share the table data, each core has its own internal IDTR register)."
      ]
    },
    visual: {
      title: "Interrupt Descriptor Table (IDT) Memory Layout",
      caption: "Vector indexing from 0 to 255 pointing to 64-bit ISR entry addresses.",
      visualType: "ascii",
      asciiArt: `IDTR REGISTER (Loaded via 'lidt')
[ Base: 0xFFFFFFFF81E00000 ] | [ Limit: 0x0FFF (256 * 16 bytes = 4096 bytes) ]
                              |
                              v
INTERRUPT DESCRIPTOR TABLE (256 Entries x 16 Bytes on x86-64)
+-----------------------------------------------------------------------------+
| Vector 0:  Divide-by-Zero Exception       -> Handler: divide_error()        |
| Vector 1:  Debug Trap                     -> Handler: debug()               |
| Vector 2:  Non-Maskable Interrupt (NMI)   -> Handler: nmi()                 |
| Vector 8:  Double Fault                   -> Handler: double_fault()        |
| Vector 13: General Protection Fault (#GP) -> Handler: general_protection()  |
| Vector 14: Page Fault (#PF)               -> Handler: page_fault()          |
| ...                                                                         |
| Vector 32: Timer Interrupt (IRQ 0)        -> Handler: apic_timer_interrupt()|
| Vector 33: Keyboard Interrupt (IRQ 1)     -> Handler: keyboard_interrupt()  |
| Vector 128: Legacy Syscall (int 0x80)     -> Handler: entry_INT80_compat()  |
+-----------------------------------------------------------------------------+`,
      keyInsights: [
        "Vectors 0–31 are permanently defined by processor silicon architects.",
        "Vectors 32–255 are dynamically allocated by the operating system kernel.",
        "Each 16-byte IDT entry contains segment selectors, gate types, DPL, and handler offsets."
      ]
    },
    questions: [
      {
        id: "os-int-1-8-5-q1",
        question: "How are the 256 interrupt vectors in the x86 Interrupt Descriptor Table partitioned between hardware architecture and the operating system?",
        difficulty: "Foundation",
        conciseAnswer: "Vectors 0 through 31 are permanently reserved by the CPU architecture (Intel/AMD) for processor-defined exceptions and faults (e.g., Vector 0 for Divide by Zero, 14 for Page Fault). Vectors 32 through 255 are user-defined and available for the operating system kernel to assign to hardware peripheral interrupts (APIC IRQs), inter-processor interrupts (IPIs), and software traps.",
        inDepthExplanation: "CPU hardware enforces strict semantic meaning on vectors 0..31: whenever the ALU divides by zero, the microcode automatically vectors to 0; when a page fault occurs, it vectors to 14. An operating system cannot reassign these vectors. Vectors 32 through 255 are unassigned in silicon. During early boot, the Linux kernel programs the APIC to map hardware IRQs starting at vector 32 (`0x20`): timer on 32, keyboard on 33, disk controllers on subsequent vectors. Vector 128 (`0x80`) was famously assigned by Linux for legacy 32-bit system calls.",
        executionTraceOrExample: "Vector 0: #DE, Vector 6: #UD (Invalid Opcode), Vector 8: #DF (Double Fault), Vector 13: #GP (General Protection), Vector 14: #PF (Page Fault), Vector 32: Timer.",
        followUps: [
          "Interviewer: 'What is an Interrupt Gate vs a Trap Gate in the IDT?' -> Candidate: 'An Interrupt Gate automatically clears the Interrupt Flag (IF = 0) in EFLAGS upon entry to prevent nested interrupts from corrupting the handler; a Trap Gate leaves the Interrupt Flag unchanged, allowing other interrupts to nest immediately.'"
        ]
      },
      {
        id: "os-int-1-8-5-q2",
        question: "What is the Interrupt Stack Table (IST) in 64-bit x86, and why is it essential for handling Double Faults?",
        difficulty: "Advanced",
        conciseAnswer: "The IST is an array of 7 independent, dedicated kernel stack pointers stored in the 64-bit Task State Segment (TSS). It allows catastrophic exceptions (like Double Faults or NMIs) to switch to a guaranteed clean, uncorrupted stack, preventing an unrecoverable Triple Fault if the regular kernel stack has overflowed.",
        inDepthExplanation: "In legacy 32-bit systems, when an interrupt occurred, the CPU used the regular kernel stack (`RSP0`). However, suppose a kernel thread experiences a kernel stack overflow (e.g., deep recursion in the VFS). When the stack grows into an unmapped guard page, the CPU raises a Page Fault. The CPU attempts to push the page fault frame onto the current kernel stack, but because the stack is unmapped, that push fails! The CPU raises a Double Fault (#DF). If the Double Fault handler attempts to push to the same broken stack, it fails again, triggering an immediate Triple Fault and hard machine reboot. On x86-64, the IDT entry can specify an IST index (1..7). When #DF fires, the hardware automatically switches `%rsp` to a dedicated, pre-allocated 4 KB emergency stack from `TSS->IST[1]`, guaranteeing the double fault handler can execute and log a crash backtrace.",
        executionTraceOrExample: "IDT Entry 8 (Double Fault) specifies `IST = 1`. CPU encounters broken stack -> switches to `TSS.IST[1]` -> executes `double_fault` handler safely.",
        followUps: [
          "Interviewer: 'Which handlers use the IST in Linux?' -> Candidate: 'Double Fault (#DF), Non-Maskable Interrupt (NMI), Machine Check Exception (#MC), and Debug Exception (#DB).'"
        ]
      }
    ]
  },
  "os-les-1-8-6": {
    lessonId: "os-les-1-8-6",
    topicId: "os-topic-1-8",
    quickExplanation: {
      whatItIs: "Context saving and event return is the precise mechanism by which the CPU and OS preserve the interrupted thread's exact hardware register state and seamlessly restore it using the `iretq` instruction.",
      whyItExists: "Interrupts arrive at arbitrary nanoseconds. If an interrupt handler modified even a single register (like `%rax` or flags) without restoring it, the interrupted program would produce corrupted calculations or crash.",
      howItWorks: "1. Hardware pushes `%ss`, `%rsp`, `%rflags`, `%cs`, `%rip`. 2. Kernel assembly pushes remaining general-purpose registers (`pt_regs`). 3. ISR executes. 4. Assembly pops general-purpose registers. 5. `iretq` atomically restores the 5 hardware registers and drops privilege.",
      criticalMechanism: "The `iretq` (Interrupt Return 64-bit) Instruction: atomically popping the 5 hardware registers from the kernel stack, restoring the User Program Counter and flags, and transitioning CPL from 0 to 3.",
      realWorldConnection: "The Linux bottom-half architecture (SoftIRQs, Tasklets, Workqueues) splits interrupt processing: saving state and acknowledging hardware in microsecond top-halves, deferring heavy computation to background worker threads.",
      misconceptions: [
        "Believing `ret` and `iretq` are interchangeable (standard `ret` only pops `%rip`; `iretq` pops `%rip`, `%cs`, `%rflags`, `%rsp`, and `%ss`, and alters CPU privilege rings).",
        "Thinking the hardware saves all general-purpose registers (hardware only saves 5 registers; software assembly must save RAX, RBX, RCX, RDX, etc.)."
      ]
    },
    visual: {
      title: "Interrupt Stack Frame and Restoration via iretq",
      caption: "Kernel stack layout before and after iretq execution.",
      visualType: "ascii",
      asciiArt: `KERNEL STACK DURING ISR EXECUTION (struct pt_regs)
+-------------------------------------------------------------+
| SS (User Stack Segment)      <- Pushed automatically by CPU |
| RSP (User Stack Pointer)     <- Pushed automatically by CPU |
| RFLAGS (CPU Arithmetic Flags)<- Pushed automatically by CPU |
| CS (User Code Segment: CPL 3)<- Pushed automatically by CPU |
| RIP (User Return Address)    <- Pushed automatically by CPU |
| [ Error Code - if applicable]<- Pushed automatically by CPU |
+-------------------------------------------------------------+
| RAX, RBX, RCX, RDX, RSI, RDI <- Pushed by kernel assembly   |
| RBP, R8, R9, R10, R11..R15   <- Pushed by kernel assembly   |
+-------------------------------------------------------------+
                              |
                              v (pop general registers -> iretq)
USER EXECUTION RESUMES AS IF NOTHING EVER HAPPENED!`,
      keyInsights: [
        "The interrupted thread cannot detect that an interrupt ever occurred.",
        "iretq restores user flags and stack atomically.",
        "Top-half ISRs must execute in microseconds to prevent system latency spikes."
      ]
    },
    questions: [
      {
        id: "os-int-1-8-6-q1",
        question: "Why does the Linux kernel split interrupt processing into a 'Top Half' (HardIRQ) and a 'Bottom Half' (SoftIRQ / Workqueue)?",
        difficulty: "Intermediate",
        conciseAnswer: "To minimize interrupt latency and prevent dropped hardware events. The Top Half runs immediately with local interrupts disabled: it performs only time-critical actions (acknowledging hardware, reading device status, queuing data) and exits in microseconds. The Bottom Half runs later with interrupts enabled to process the heavy data (e.g., parsing TCP/IP packets, filesystem updates) without blocking incoming hardware interrupts.",
        inDepthExplanation: "If an interrupt service routine spent 5 milliseconds parsing a network packet with interrupts disabled, the CPU would miss timer ticks and subsequent network packets would overflow the NIC's hardware FIFO buffers, causing massive packet loss. Linux splits handlers: (1) **Top Half** (HardIRQ): executes in interrupt context with IRQs disabled, copies data from device into RAM buffer, acknowledges the hardware controller, schedules the bottom half, and exits. (2) **Bottom Half**: executes asynchronously via SoftIRQs, Tasklets, or kernel worker threads (`ksoftirqd`), with interrupts re-enabled so new hardware events can be serviced immediately.",
        executionTraceOrExample: "Packet arrives: Top Half (NIC ISR) runs in 2μs -> puts packet into `sk_buff` ring -> raises `NET_RX_SOFTIRQ`. Bottom Half (`ksoftirqd`) runs TCP checksum, routing, and socket delivery in 50μs with interrupts enabled.",
        followUps: [
          "Interviewer: 'What is the difference between a SoftIRQ and a Workqueue in Linux?' -> Candidate: 'SoftIRQs execute in atomic interrupt context and CANNOT sleep or block on locks; Workqueues execute in kernel thread context (`kworker`) and CAN sleep, allocate memory, and block on mutexes.'"
        ]
      },
      {
        id: "os-int-1-8-6-q2",
        question: "What is the difference between the CPU instructions 'ret', 'sysretq', and 'iretq'?",
        difficulty: "Advanced",
        conciseAnswer: "`ret` is an ordinary function return within the same privilege ring that pops only `%rip` from the current stack. `sysretq` is the fast return from a system call that loads `%rip` from `%rcx` and `%rflags` from `%r11` while demoting CPL to 3, without popping stack values. `iretq` is the interrupt return instruction that pops 5 distinct registers (`%rip`, `%cs`, `%rflags`, `%rsp`, `%ss`) from the kernel stack, restoring user flags and stack atomically.",
        inDepthExplanation: "Understanding these opcodes separates novice programmers from systems engineers: (1) `ret`: simple near-return used in standard C functions. (2) `sysretq`: designed specifically to complement `syscall`. It does not touch memory; it restores Program Counter from register `%rcx` and flags from `%r11`, making system call exits extraordinarily fast. (3) `iretq`: required for returning from hardware interrupts and CPU exceptions. Because an interrupt can strike at any time, it must restore the exact processor flags (`%rflags`), code segment (`%cs`), and stack pointer (`%rsp`). `iretq` pops all five 64-bit values from the stack in an atomic hardware micro-operation, transitioning the CPU from Ring 0 to Ring 3.",
        executionTraceOrExample: "Standard function: `call` -> `ret`. Fast syscall: `syscall` -> `sysretq`. Hardware interrupt / exception: hardware trap -> `iretq`.",
        followUps: [
          "Interviewer: 'Why can't `sysretq` be used to return from a Page Fault exception?' -> Candidate: 'Because `sysretq` does not restore `%rsp` from the stack (it expects user `%rsp` to already be set in register), and it destroys registers `%rcx` and `%r11`; returning from an arbitrary interrupt requires `iretq` to preserve all register invariants.'"
        ]
      }
    ]
  },
  "os-les-1-8-7": {
    lessonId: "os-les-1-8-7",
    topicId: "os-topic-1-8",
    quickExplanation: {
      whatItIs: "A comprehensive synthesis distinguishing the four primary asynchronous and synchronous CPU events: Hardware Interrupts, Exceptions/Faults, Software Traps, and System Calls.",
      whyItExists: "These four terms are frequently conflated by candidates in technical interviews; mastering their precise technical differences demonstrates rigorous first-principles systems comprehension.",
      howItWorks: "Interrupts are asynchronous external hardware signals. Exceptions are synchronous internal instruction errors. Traps are synchronous intentional software instructions. System calls are specialized traps used to request OS services.",
      criticalMechanism: "Origin and Timing Taxonomy: External vs Internal origin; Asynchronous vs Synchronous timing; Intentional vs Error intent.",
      realWorldConnection: "During a single web browsing session, your CPU handles millions of timer interrupts (Interrupt), page allocations (Exception), GDB breakpoints (Trap), and socket reads (System Call).",
      misconceptions: [
        "Calling a system call an 'interrupt' (it is a synchronous software trap, not an asynchronous hardware interrupt).",
        "Believing exceptions and traps are identical (traps are intentional; exceptions are error conditions)."
      ]
    },
    visual: {
      title: "Systems Event Taxonomy Comparison Matrix",
      caption: "Origin, synchronicity, and intentionality of CPU control transfer events.",
      visualType: "ascii",
      asciiArt: `+------------------+---------------+---------------+--------------------+
| EVENT TYPE       | ORIGIN        | SYNCHRONICITY | INTENTIONALITY     |
+------------------+---------------+---------------+--------------------+
| Hardware         | External      | Asynchronous  | Unintentional      |
| Interrupt        | Peripherals   | (Any nanosec) | (Driven by devices)|
+------------------+---------------+---------------+--------------------+
| CPU Exception /  | Internal CPU  | Synchronous   | Unintentional      |
| Fault            | Execution ALU | (At faulting  | (Caused by error   |
|                  |               |  instruction) |  e.g. div-by-zero) |
+------------------+---------------+---------------+--------------------+
| Software Trap    | Internal      | Synchronous   | Intentional        |
|                  | Instruction   | (At trap      | (Caused by app     |
|                  |               |  instruction) |  e.g. int3 debug)  |
+------------------+---------------+---------------+--------------------+
| System Call      | Software      | Synchronous   | Intentional        |
| (syscall)        | Instruction   | (At syscall   | (Requests kernel   |
|                  |               |  instruction) |  service)          |
+------------------+---------------+---------------+--------------------+`,
      keyInsights: [
        "Hardware interrupts are the ONLY asynchronous events on the CPU.",
        "System calls are a specialized subcategory of intentional software traps.",
        "All four events elevate privilege to Ring 0 and enter the kernel."
      ]
    },
    questions: [
      {
        id: "os-int-1-8-7-q1",
        question: "What is the key technical difference between an interrupt and a trap?",
        difficulty: "Foundation",
        conciseAnswer: "An interrupt is an ASYNCHRONOUS event triggered by external hardware outside the CPU (like a timer or network card) at unpredictable times. A trap is a SYNCHRONOUS event triggered intentionally by the executing program itself via a specific software instruction (like `syscall` or `int3`) at a known, deterministic point in the code.",
        inDepthExplanation: "This question preserves source question `os-q-6` (as listed in original source bank questions). The fundamental dividing line is causality and synchronicity: (1) **Interrupt**: Causality is external to the instruction pipeline. When an interrupt occurs, the CPU finishes the current instruction, saves context, runs the ISR, and resumes. The executing software did nothing to cause it. (2) **Trap**: Causality is internal. The executing software explicitly executed an opcode whose purpose is to transfer control to the supervisor (e.g., to request a file read or trigger a breakpoint). If you re-run the thread, the trap occurs at the exact same instruction every time.",
        executionTraceOrExample: "Timer tick: Interrupt arrives while calculating `x = a + b` (Asynchronous). System call: Program deliberately executes `syscall` to write to disk (Synchronous Trap).",
        followUps: [
          "Interviewer: 'How does the saved Program Counter (%rip) differ between an interrupt, a fault, and a trap?' -> Candidate: 'For an interrupt, `%rip` points to the next instruction to be executed. For a fault (like a page fault), `%rip` points to the *faulting* instruction so it can be restarted. For a trap (like a breakpoint or syscall), `%rip` points to the *next* instruction following the trap.'"
        ]
      },
      {
        id: "os-int-1-8-7-q2",
        question: "Classify each of the following scenarios as an Interrupt, Fault, Trap, or System Call: (A) A timer quantum expires. (B) A process dereferences a NULL pointer. (C) An application calls write(). (D) GDB hits a breakpoint.",
        difficulty: "Intermediate",
        conciseAnswer: "(A) Timer quantum expiration is a **Hardware Interrupt** (asynchronous external APIC signal). (B) NULL pointer dereference is a **Fault / Exception** (synchronous unmapped memory violation, Vector 14). (C) Calling write() is a **System Call** (synchronous intentional service request). (D) Hitting a GDB breakpoint is a **Software Trap** (synchronous intentional `int3` execution).",
        inDepthExplanation: "This rapid-fire classification tests whether a systems engineer can instantly map real-world software events to architectural primitives: (A) Timer: The APIC timer decrements to zero and pulls the CPU IRQ pin; completely asynchronous to user code. (B) NULL Pointer: CPU ALU attempts to resolve virtual address `0x0`, MMU detects missing Present bit, raises Page Fault exception synchronously before instruction retirement. (C) `write()`: glibc wrapper sets RAX=1 and executes `syscall` instruction to request kernel VFS service. (D) Breakpoint: CPU executes the `0xCC` opcode intentionally placed by GDB, trapping into the debugger handler.",
        executionTraceOrExample: "A = Asynchronous Hardware Interrupt, B = Synchronous Instruction Fault (#PF), C = Synchronous System Call (`syscall`), D = Synchronous Software Trap (`int3`).",
        followUps: [
          "Interviewer: 'What is a spurious interrupt?' -> Candidate: 'A hardware interrupt generated when an electrical glitch or signal noise temporarily triggers an IRQ line, but by the time the CPU acknowledges it, the line has de-asserted; the APIC handles this by returning a designated spurious vector (Vector 255 on x86) which the kernel safely ignores.'"
        ]
      }
    ]
  }
};
