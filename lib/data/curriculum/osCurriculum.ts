import { CurriculumSubject } from "./types";

export const osCurriculum: CurriculumSubject = {
  id: "os",
  name: "Operating Systems",
  shortName: "OS",
  category: "core-systems",
  description: "Understand how the operating system coordinates hardware resources: privilege levels, process lifecycles, CPU scheduling, concurrency primitives, and virtual memory.",
  longDescription: "Explore how the operating system kernel provides safe, isolated execution for applications while multiplexing hardware CPU cores, physical memory, and I/O devices.",
  accentColor: "#10B981",
  borderColor: "rgba(16, 185, 129, 0.3)",
  badgeBg: "rgba(16, 185, 129, 0.1)",
  iconName: "Cpu",
  coreQuestion: "How does the OS multiplex finite CPU cores and memory while enforcing memory isolation between mutually untrusted processes?",
  prerequisites: ["Computer Architecture Fundamentals", "C / C++ or Systems Programming Basics", "Basic Data Structures"],
  learningOutcomes: [
    "Differentiate user mode (Ring 3) from kernel mode (Ring 0) and trace trap execution through the system call dispatch table.",
    "Model process state lifecycles and measure context switch costs (register save/restore, CR3 reload, TLB invalidation).",
    "Analyze CPU scheduling policies (FCFS, SJF/SRTF, Round Robin, Multi-Level Feedback Queues, Linux CFS) using Turnaround and Waiting times.",
    "Implement race-free synchronization using mutexes, spinlocks, semaphores, and condition variables, avoiding Coffman deadlocks.",
    "Trace hardware virtual-to-physical address translation across multi-level page tables, handling TLB misses and page fault traps.",
    "Evaluate file system disk layouts (inodes, extents, superblocks) and compare synchronous I/O with modern event polling (epoll, io_uring)."
  ],
  keyMechanisms: [
    "Dual-Mode CPU Execution (Rings 0 & 3)",
    "Process Control Block (PCB) & Context Save",
    "Multi-Level Paging & Hardware TLB Translation",
    "Timer Interrupt Preemptive Scheduling",
    "Write-Ahead File System Journaling"
  ],
  modules: [
    {
      id: "os-mod-1",
      order: 1,
      title: "OS Fundamentals & Kernel Architecture",
      shortDescription: "Privilege rings, system calls, trap dispatching, and the system boot sequence.",
      detailedOverview: "Examine how operating systems abstract raw hardware. Study the architectural separation between user space and kernel space, the hardware mechanics of dual-mode execution, software traps, and system call dispatching.",
      difficulty: "Foundation",
      interviewBenchmark: "Explain the exact CPU execution steps of a read() system call from user-space libc to kernel execution and return.",
      topics: [
        {
          id: "os-t-1-1",
          title: "Introduction to Operating Systems",
          description: "Core responsibilities of an OS as an extended machine and resource coordinator.",
          difficulty: "Foundation",
          learningObjectives: ["Define OS responsibilities", "Contrast monolithic and microkernel models"],
          subtopics: [
            {
              id: "os-st-1-1-1",
              title: "OS Roles: Resource Manager & Hardware Abstraction",
              description: "How the operating system multiplexes CPU, memory, and devices while isolating programs.",
              difficulty: "Foundation",
              keyTakeaways: [
                "The OS acts as a resource manager (time and space multiplexing) and an extended machine providing clean abstractions.",
                "Without an OS, applications would require custom device drivers and could overwrite each other's memory."
              ],
              concepts: ["Resource Allocation", "Virtualization", "Isolation", "Hardware Abstraction Layer (HAL)"],
              questions: [
                {
                  id: "os-q-1",
                  statement: "Why is the operating system described as both a resource manager and an extended virtual machine?",
                  type: "Conceptual",
                  difficulty: "Foundation",
                  explanation: "As a resource manager, it arbitrates CPU time, memory space, and I/O access among competing processes. As an extended machine, it hides raw hardware complexity behind convenient abstractions like files, sockets, and virtual memory."
                },
                {
                  id: "os-q-2",
                  statement: "What catastrophic failure would occur in a multi-tenant system if applications had raw, unmediated access to physical memory?",
                  type: "Application",
                  difficulty: "Foundation",
                  explanation: "Any process could read confidential data (passwords, keys) belonging to other processes or corrupt the kernel's code segment, crashing the machine."
                }
              ]
            },
            {
              id: "os-st-1-1-2",
              title: "Monolithic Kernels vs Microkernels",
              description: "Architectural comparison of Linux/FreeBSD monolithic design versus Mach/L4 microkernels.",
              difficulty: "Intermediate",
              keyTakeaways: [
                "Monolithic kernels run all core services (VFS, IPC, drivers, networking) in the same supervisor address space for raw speed.",
                "Microkernels run only minimal primitives (IPC, basic scheduling, virtual memory) in Ring 0, pushing drivers and file systems to user space for fault isolation."
              ],
              concepts: ["Monolithic Kernel", "Microkernel", "Hybrid Kernel", "IPC Performance Overhead"],
              questions: [
                {
                  id: "os-q-3",
                  statement: "Why do monolithic kernels generally achieve higher I/O throughput than microkernels?",
                  type: "Analytical",
                  difficulty: "Intermediate",
                  explanation: "Microkernels require expensive Inter-Process Communication (IPC) and multiple user-to-kernel context switches whenever a driver communicates with a file system service, whereas monolithic kernels execute in-memory function calls within the same address space."
                }
              ]
            }
          ]
        },
        {
          id: "os-t-1-2",
          title: "Kernel Privilege Levels & System Calls",
          description: "Dual-mode hardware operation, trap instructions, and system call execution flow.",
          difficulty: "Intermediate",
          learningObjectives: ["Trace trap handling and register saves", "Understand CPU privilege rings"],
          subtopics: [
            {
              id: "os-st-1-2-1",
              title: "User Mode (Ring 3) vs Kernel Mode (Ring 0)",
              description: "Hardware privilege enforcement via CPU status registers and descriptor tables.",
              difficulty: "Foundation",
              keyTakeaways: [
                "CPUs enforce privilege levels (e.g. Ring 0 vs Ring 3 in x86). Ring 0 grants access to privileged instructions (e.g., CLI, STI, MOV CR3, IN/OUT).",
                "Executing a privileged instruction in Ring 3 causes a general protection fault (#GP)."
              ],
              concepts: ["Privilege Rings", "Status Register", "Privileged Instructions", "Fault Handling"],
              questions: [
                {
                  id: "os-q-4",
                  statement: "What hardware mechanism prevents a user program from executing the x86 'CLI' (clear interrupts) instruction?",
                  type: "Interview",
                  difficulty: "Intermediate",
                  explanation: "The CPU checks the Current Privilege Level (CPL) stored in the lowest bits of the CS register. If CPL > 0, the CPU refuses to execute 'CLI' and fires a General Protection Exception (#GP), jumping to the kernel's fault handler."
                }
              ]
            },
            {
              id: "os-st-1-2-2",
              title: "System Call Dispatch Table & Software Traps",
              description: "How 'syscall' or 'int 0x80' switches modes and indexes into the kernel sys_call_table.",
              difficulty: "Intermediate",
              keyTakeaways: [
                "A system call initiates a controlled transition from user mode to kernel mode using a software trap instruction (e.g. 'syscall' on x86-64).",
                "The kernel looks up the system call number in a dispatch table (`sys_call_table`), validates user arguments, executes the kernel routine, and returns via 'sysretq'."
              ],
              concepts: ["Trap Instruction", "System Call Number", "sys_call_table", "Argument Validation", "sysretq"],
              questions: [
                {
                  id: "os-q-5",
                  statement: "Why must the kernel strictly copy and validate all user-space pointers passed in system call arguments before dereferencing them?",
                  type: "Interview",
                  difficulty: "Intermediate",
                  explanation: "To prevent Time-of-Check to Time-of-Use (TOCTOU) exploits and kernel memory overwrite attacks, where a malicious user thread modifies the memory pointer concurrently or passes an address pointing into kernel memory space."
                }
              ]
            }
          ]
        },
        {
          id: "os-t-1-3",
          title: "System Boot Sequence",
          description: "From firmware execution (BIOS/UEFI) to kernel bootstrapping and PID 1 initialization.",
          difficulty: "Intermediate",
          learningObjectives: ["Understand BIOS/UEFI handoff", "Trace initramfs and PID 1 initialization"],
          subtopics: [
            {
              id: "os-st-1-3-1",
              title: "Firmware, Bootloader & Kernel Handoff",
              description: "Power-on self-test, Master Boot Record / EFI System Partition, GRUB, and kernel entry.",
              difficulty: "Intermediate",
              keyTakeaways: [
                "Firmware (BIOS/UEFI) runs POST, identifies the boot drive, loads the bootloader (e.g. GRUB) into RAM, and jumps to it.",
                "The bootloader loads the compressed kernel image (vmlinuz) and initial ramdisk (initramfs) into memory, enables protected/long mode, and transfers control to the kernel start address."
              ],
              concepts: ["POST", "UEFI / ESP", "GRUB", "vmlinuz", "initramfs", "systemd / PID 1"],
              questions: [
                {
                  id: "os-q-6",
                  statement: "What is the primary purpose of the initial RAM filesystem (initramfs) during Linux booting?",
                  type: "Conceptual",
                  difficulty: "Intermediate",
                  explanation: "It provides a temporary root filesystem containing the modular device drivers (e.g. NVMe, RAID, LVM, encryption modules) needed to mount the actual permanent root storage partition."
                }
              ]
            }
          ]
        }
      ]
    },
    {
      id: "os-mod-2",
      order: 2,
      title: "Processes, Threads & Concurrency Models",
      shortDescription: "Process lifecycles, Process Control Blocks, context switching, and thread models.",
      detailedOverview: "Investigate how the operating system encapsulates running code. Compare process memory isolation with shared-memory multithreading, examine hardware context switching, and study copy-on-write fork semantics.",
      difficulty: "Foundation",
      interviewBenchmark: "Explain what happens to CPU registers and memory page tables when switching between threads of the same process versus threads of different processes.",
      topics: [
        {
          id: "os-t-2-1",
          title: "Process Model & Process Control Block",
          description: "Process execution state, PCB structure, and lifecycle transitions.",
          difficulty: "Foundation",
          learningObjectives: ["Describe the 5-state process model", "Inspect the PCB structure"],
          subtopics: [
            {
              id: "os-st-2-1-1",
              title: "Process States & Lifecycle Transitions",
              description: "New, Ready, Running, Waiting (Blocked), and Terminated state machine.",
              difficulty: "Foundation",
              keyTakeaways: [
                "A process transitions through Ready, Running, and Waiting. A process only leaves Running via preemption (timer interrupt), yielding, or blocking on I/O.",
                "A blocked process never switches directly to Running; it enters the Ready queue once its event completes."
              ],
              concepts: ["5-State Model", "Ready Queue", "Blocked State", "Zombie Process", "Orphan Process"],
              questions: [
                {
                  id: "os-q-7",
                  statement: "What is a zombie process in Unix-like systems, and how is its memory reclaimed?",
                  type: "Interview",
                  difficulty: "Intermediate",
                  explanation: "A zombie process has terminated execution, but its exit status remains in its PCB so its parent can read it via wait() or waitpid(). Once the parent calls wait() (or init reaps it if orphaned), the kernel frees the PCB."
                }
              ]
            },
            {
              id: "os-st-2-1-2",
              title: "Process Control Block (PCB) & Context Switching",
              description: "Anatomy of task_struct, register dumps, and hardware overhead of context switches.",
              difficulty: "Intermediate",
              keyTakeaways: [
                "The PCB stores PID, Program Counter, CPU registers, memory management info (page table pointer), open file descriptors, and scheduling priority.",
                "Context switching saves the current CPU registers onto the kernel stack, updates the PCB, switches memory address space (reloading CR3), and restores the new process context."
              ],
              concepts: ["PCB", "task_struct", "CR3 Reload", "TLB Invalidation", "Cache Pollution"],
              questions: [
                {
                  id: "os-q-8",
                  statement: "Why is context switching between threads of the same process significantly cheaper than switching between two separate processes?",
                  type: "Interview",
                  difficulty: "Intermediate",
                  explanation: "Threads of the same process share the same virtual address space (identical page tables). Therefore, the CPU does not need to reload the page directory register (CR3), avoiding the costly invalidation of the Translation Lookaside Buffer (TLB)."
                }
              ]
            }
          ]
        },
        {
          id: "os-t-2-2",
          title: "Threads & Multithreading Architecture",
          description: "User-level threads vs kernel-level threads, 1:1 vs M:N mapping, and Thread-Local Storage.",
          difficulty: "Intermediate",
          learningObjectives: ["Evaluate 1:1 vs M:N threading", "Understand thread memory layout"],
          subtopics: [
            {
              id: "os-st-2-2-1",
              title: "Thread Memory Layout: Private Stack vs Shared Heap",
              description: "What threads share (code, global data, open files) and what is private (stack, PC, registers).",
              difficulty: "Foundation",
              keyTakeaways: [
                "Each thread has its own private execution stack and register set (including RSP and PC).",
                "Threads share the text segment, initialized data, heap, and open file descriptor table, enabling fast communication but introducing race conditions."
              ],
              concepts: ["Thread Stack", "Shared Heap", "Thread-Local Storage (TLS)", "Stack Overflow Isolation"],
              questions: [
                {
                  id: "os-q-9",
                  statement: "If Thread A has a pointer to a local variable on Thread B's stack, can Thread A legally read it?",
                  type: "Analytical",
                  difficulty: "Intermediate",
                  explanation: "Yes, at the hardware and virtual memory level, all thread stacks in the same process reside in the same virtual address space. However, doing so is highly unsafe and violates scoping invariants."
                }
              ]
            },
            {
              id: "os-st-2-2-2",
              title: "User-Level Threads (ULT) vs Kernel-Level Threads (KLT)",
              description: "1:1 threading (NPTL) vs M:N green threads (Go goroutines, Java virtual threads).",
              difficulty: "Intermediate",
              keyTakeaways: [
                "1:1 Kernel-Level Threads are scheduled directly by the OS kernel; a blocking syscall only blocks that single thread, but context switching requires kernel transitions.",
                "M:N User-Level Threads (green threads) run inside a user-space runtime; they achieve lightweight context switching (saving ~10 registers) but require non-blocking runtime I/O multiplexing."
              ],
              concepts: ["1:1 Model", "M:N Model", "Green Threads", "Scheduler Activation", "Goroutines"],
              questions: [
                {
                  id: "os-q-10",
                  statement: "What problem arises when a pure user-level thread (ULT) executes a blocking synchronous I/O system call?",
                  type: "Interview",
                  difficulty: "Intermediate",
                  explanation: "Because the kernel is unaware of individual user threads, it sees the entire process making a blocking call and moves the entire process to the Waiting state, starving all other runnable user threads."
                }
              ]
            }
          ]
        }
      ]
    },
    {
      id: "os-mod-3",
      order: 3,
      title: "CPU Scheduling Algorithms",
      shortDescription: "FCFS, SJF, SRTF, Round Robin, Priority Scheduling, and Linux Completely Fair Scheduler.",
      detailedOverview: "Analyze how operating systems multiplex CPU cores across competing processes. Master scheduling criteria (Turnaround, Waiting, Response times) and evaluate algorithmic trade-offs between throughput and interactive latency.",
      difficulty: "Intermediate",
      interviewBenchmark: "Calculate Waiting Time and Turnaround Time across FCFS, SJF, and Round Robin for a given process arrival trace and explain the Convoy Effect.",
      topics: [
        {
          id: "os-t-3-1",
          title: "Scheduling Criteria & Non-Preemptive Algorithms",
          description: "FCFS, SJF, and fundamental scheduling performance metrics.",
          difficulty: "Foundation",
          learningObjectives: ["Calculate TAT and WT metrics", "Analyze the Convoy Effect in FCFS"],
          subtopics: [
            {
              id: "os-st-3-1-1",
              title: "Scheduling Metrics & First-Come, First-Served (FCFS)",
              description: "Turnaround Time (CT - AT), Waiting Time (TAT - BT), and the Convoy Effect.",
              difficulty: "Foundation",
              keyTakeaways: [
                "Turnaround Time = Completion Time - Arrival Time. Waiting Time = Turnaround Time - Burst Time.",
                "FCFS suffers from the Convoy Effect: short CPU-bound and I/O-bound processes wait behind long CPU-bound jobs, resulting in poor average waiting time."
              ],
              concepts: ["Turnaround Time", "Waiting Time", "Response Time", "Convoy Effect", "Throughput"],
              questions: [
                {
                  id: "os-q-11",
                  statement: "Given P1 (BT=24, AT=0), P2 (BT=3, AT=0), P3 (BT=3, AT=0), calculate average waiting time under FCFS.",
                  type: "Analytical",
                  difficulty: "Foundation",
                  explanation: "Execution order: P1 [0-24], P2 [24-27], P3 [27-30]. Waiting times: P1=0, P2=24, P3=27. Average WT = (0 + 24 + 27) / 3 = 17ms. If scheduled in order P2, P3, P1, average WT drops to (0 + 3 + 6) / 3 = 3ms."
                }
              ]
            },
            {
              id: "os-st-3-1-2",
              title: "Shortest Job First (SJF) & Shortest Remaining Time First (SRTF)",
              description: "Optimal average waiting time and starvation risks for long bursts.",
              difficulty: "Intermediate",
              keyTakeaways: [
                "SJF gives the provably minimum average waiting time for a given set of processes.",
                "Preemptive SJF (SRTF) preempts the currently running job if a new job arrives with a shorter remaining burst.",
                "SJF is impractical for general-purpose OS schedulers because future CPU burst length cannot be predicted with certainty."
              ],
              concepts: ["SJF Optimality", "SRTF Preemption", "Starvation", "Exponential Burst Averaging"],
              questions: [
                {
                  id: "os-q-12",
                  statement: "Why is Shortest Job First (SJF) considered theoretically optimal but rarely implemented in general-purpose operating systems?",
                  type: "Interview",
                  difficulty: "Intermediate",
                  explanation: "Because an operating system kernel cannot know the exact duration of a future CPU burst before running it. Real kernels can only approximate it using exponential moving averages of previous bursts."
                }
              ]
            }
          ]
        },
        {
          id: "os-t-3-2",
          title: "Preemptive & Multi-Level Schedulers",
          description: "Round Robin time quantum selection, Priority Inversion, and Linux Completely Fair Scheduler (CFS).",
          difficulty: "Intermediate",
          learningObjectives: ["Evaluate Round Robin quantum trade-offs", "Understand CFS red-black tree dispatch"],
          subtopics: [
            {
              id: "os-st-3-2-1",
              title: "Round Robin (RR) Scheduling & Time Quantum Sizing",
              description: "Time-slicing via timer interrupts and the trade-off between responsiveness and context switch overhead.",
              difficulty: "Intermediate",
              keyTakeaways: [
                "Round Robin cycles through the ready queue, granting each process a time slice (quantum q).",
                "If q is too small, context switch overhead dominates CPU execution. If q is too large, Round Robin degenerates into FCFS."
              ],
              concepts: ["Time Quantum", "Timer Interrupt", "Preemption Overhead", "Interactive Latency"],
              questions: [
                {
                  id: "os-q-13",
                  statement: "What is the consequence of setting the Round Robin time quantum to 1 microsecond when context switching takes 2 microseconds?",
                  type: "Analytical",
                  difficulty: "Intermediate",
                  explanation: "The CPU would spend 66% of its total time executing context switches and only 33% running actual user code, resulting in catastrophic system throughput degradation."
                }
              ]
            },
            {
              id: "os-st-3-2-2",
              title: "Priority Inversion & Priority Inheritance Protocol",
              description: "When a low-priority process blocks a high-priority process, and how priority inheritance resolves it.",
              difficulty: "Advanced",
              keyTakeaways: [
                "Priority Inversion occurs when a low-priority task holds a lock needed by a high-priority task, and a medium-priority task preempts the low-priority task, indefinitely delaying the high-priority task (Mars Pathfinder bug).",
                "Priority Inheritance Protocol temporarily elevates the priority of the lock-holding task to match the highest priority waiting task until the lock is released."
              ],
              concepts: ["Priority Inversion", "Priority Inheritance", "Mars Pathfinder Bug", "Real-Time Scheduling"],
              questions: [
                {
                  id: "os-q-14",
                  statement: "Explain how Priority Inversion nearly caused the loss of the NASA Mars Pathfinder mission and how Priority Inheritance solved it.",
                  type: "Interview",
                  difficulty: "Advanced",
                  explanation: "A low-priority meteorological task held an information bus mutex. A medium-priority communications task preempted it. The high-priority attitude control task blocked waiting for the mutex. The watchdog timer observed the high-priority task hung and repeatedly reset the computer. Enabling priority inheritance on the mutex allowed the low-priority task to run at high priority and release the lock immediately."
                }
              ]
            },
            {
              id: "os-st-3-2-3",
              title: "Linux Completely Fair Scheduler (CFS)",
              description: "Virtual runtime (vruntime), Red-Black tree queue, and nice values.",
              difficulty: "Advanced",
              keyTakeaways: [
                "Linux CFS does not use fixed time slices; it tracks `vruntime` (virtual runtime).",
                "Runnable tasks are stored in a Red-Black tree ordered by `vruntime`. The scheduler always picks the leftmost node (task with the least CPU time spent)."
              ],
              concepts: ["vruntime", "Red-Black Tree", "Nice Values", "CFS Latency Tuning"],
              questions: [
                {
                  id: "os-q-15",
                  statement: "Why does the Linux Completely Fair Scheduler (CFS) store runnable tasks in a Red-Black tree instead of a standard FIFO queue?",
                  type: "Interview",
                  difficulty: "Advanced",
                  explanation: "CFS needs O(1) retrieval of the leftmost task (minimum vruntime) and O(log N) insertion/rebalancing when a task's vruntime updates after executing, ensuring fair CPU time distribution regardless of dynamic workload variations."
                }
              ]
            }
          ]
        }
      ]
    },
    {
      id: "os-mod-4",
      order: 4,
      title: "Process Synchronization & Concurrency",
      shortDescription: "Race conditions, critical sections, mutexes, spinlocks, semaphores, and condition variables.",
      detailedOverview: "Master concurrency primitives at both hardware and software levels. Understand atomic instructions (Test-and-Set, Compare-and-Swap), critical section requirements, semaphores, and classic synchronization challenges.",
      difficulty: "Intermediate",
      interviewBenchmark: "Implement a thread-safe bounded blocking queue using mutexes and condition variables without busy waiting.",
      topics: [
        {
          id: "os-t-4-1",
          title: "Critical Section Problem & Hardware Atomics",
          description: "Race conditions, mutual exclusion requirements, and test-and-set / CAS instructions.",
          difficulty: "Intermediate",
          learningObjectives: ["Define the three critical section requirements", "Trace Compare-and-Swap (CAS)"],
          subtopics: [
            {
              id: "os-st-4-1-1",
              title: "The Critical Section Problem & 3 Mandatory Rules",
              description: "Mutual Exclusion, Progress, and Bounded Waiting invariants.",
              difficulty: "Foundation",
              keyTakeaways: [
                "A critical section is a code block accessing shared mutable state.",
                "Any valid solution must guarantee: (1) Mutual Exclusion, (2) Progress (no deadlock in acquiring), (3) Bounded Waiting (no starvation)."
              ],
              concepts: ["Mutual Exclusion", "Progress", "Bounded Waiting", "Race Condition"],
              questions: [
                {
                  id: "os-q-16",
                  statement: "What is the difference between a race condition and a data race?",
                  type: "Conceptual",
                  difficulty: "Intermediate",
                  explanation: "A data race occurs when two threads concurrently access the same memory location, at least one is a write, and there is no synchronization. A race condition is a broader semantic bug where the correctness of program output depends on non-deterministic thread interleaving."
                }
              ]
            },
            {
              id: "os-st-4-1-2",
              title: "Hardware Primitives: Test-And-Set & Compare-And-Swap (CAS)",
              description: "Bus locking, atomic instructions, and memory barriers.",
              difficulty: "Advanced",
              keyTakeaways: [
                "Software solutions like Peterson's algorithm fail on modern out-of-order CPUs without hardware memory barriers.",
                "Modern architectures provide atomic Read-Modify-Write instructions (e.g. `CMPXCHG` on x86, `LL/SC` on ARM) to build spinlocks and lock-free data structures."
              ],
              concepts: ["CAS", "Test-and-Set", "CMPXCHG", "Memory Barriers", "Lock-Free Programming"],
              questions: [
                {
                  id: "os-q-17",
                  statement: "Explain the ABA problem in lock-free data structures using Compare-And-Swap (CAS) and how it is resolved.",
                  type: "Interview",
                  difficulty: "Advanced",
                  explanation: "Thread 1 reads pointer A. Thread 2 preempts, changes A to B, frees A, and allocates a new node coincidentally at address A. Thread 1 resumes and checks `CAS(address, A, new_val)`. The addresses match, so CAS succeeds, even though the internal state changed. Resolved via tagged pointers or hazard pointers."
                }
              ]
            }
          ]
        },
        {
          id: "os-t-4-2",
          title: "Synchronization Primitives",
          description: "Mutexes vs Spinlocks, Semaphores, Condition Variables, and Monitors.",
          difficulty: "Intermediate",
          learningObjectives: ["Contrast Mutex with Spinlock", "Implement Bounded Buffer with Semaphores"],
          subtopics: [
            {
              id: "os-st-4-2-1",
              title: "Mutexes vs Spinlocks",
              description: "When to sleep (blocking mutex via futex) versus when to spin (busy waiting on multicore).",
              difficulty: "Intermediate",
              keyTakeaways: [
                "Spinlocks repeatedly execute atomic test loops (busy waiting); they are optimal only when lock hold time is less than context switch latency on multi-core systems.",
                "Mutexes put the calling thread to sleep (descheduling it into a wait queue) if the lock is held, freeing the CPU core for other work."
              ],
              concepts: ["Spinlock", "Sleeping Mutex", "Futex (Fast Userspace Mutex)", "Busy Waiting"],
              questions: [
                {
                  id: "os-q-18",
                  statement: "Why is a spinlock completely useless and actively harmful on a single-core uniprocessor system?",
                  type: "Interview",
                  difficulty: "Intermediate",
                  explanation: "If a thread spins waiting for a lock held by another thread, the spinning thread prevents the lock-holding thread from ever being scheduled to release the lock, wasting CPU until its quantum expires."
                }
              ]
            },
            {
              id: "os-st-4-2-2",
              title: "Counting & Binary Semaphores",
              description: "Dijkstra's wait() / signal() (P and V) operations and resource counting.",
              difficulty: "Intermediate",
              keyTakeaways: [
                "A semaphore is an integer variable accessed via atomic wait (P) and signal (V) operations.",
                "Binary semaphores act like mutexes (but lack thread ownership constraints); counting semaphores manage finite pools of interchangeable resources."
              ],
              concepts: ["Semaphore", "P & V Operations", "Counting Semaphore", "Resource Pooling"],
              questions: [
                {
                  id: "os-q-19",
                  statement: "Why can a binary semaphore NOT be safely substituted for a mutex when priority inheritance is required?",
                  type: "Interview",
                  difficulty: "Advanced",
                  explanation: "A mutex has the concept of 'ownership': only the thread that locked the mutex may unlock it. A semaphore has no owner (Thread A can wait and Thread B can signal). Without ownership, the OS cannot know which thread's priority to elevate during Priority Inversion."
                }
              ]
            },
            {
              id: "os-st-4-2-3",
              title: "Classic Synchronization Problems",
              description: "Producer-Consumer (Bounded Buffer), Readers-Writers, and Dining Philosophers.",
              difficulty: "Advanced",
              keyTakeaways: [
                "Producer-Consumer coordinates buffer boundaries using counting semaphores (`empty_slots`, `full_slots`) and a mutex.",
                "Readers-Writers balances read concurrency against writer starvation.",
                "Dining Philosophers illustrates circular wait deadlock and resource hierarchy solutions."
              ],
              concepts: ["Producer-Consumer", "Readers-Writers", "Dining Philosophers", "Starvation Defense"],
              questions: [
                {
                  id: "os-q-20",
                  statement: "In the Dining Philosophers problem, how does enforcing an asymmetric rule (e.g. odd philosophers pick left fork first; even pick right) prevent deadlock?",
                  type: "Analytical",
                  difficulty: "Intermediate",
                  explanation: "It breaks Coffman's Circular Wait condition. If every philosopher attempts to pick forks in the same cyclical direction, all can hold their left fork simultaneously. Asymmetry guarantees at least one philosopher competes for the same fork first, preventing a circular wait cycle."
                }
              ]
            }
          ]
        }
      ]
    },
    {
      id: "os-mod-5",
      order: 5,
      title: "Deadlocks",
      shortDescription: "Coffman conditions, Banker's Algorithm, deadlock prevention, detection, and recovery.",
      detailedOverview: "Examine the mathematical and algorithmic nature of deadlocks in multi-threaded and distributed environments. Study the 4 Coffman conditions, resource allocation graphs, and recovery strategies.",
      difficulty: "Intermediate",
      interviewBenchmark: "Walk through Banker's Algorithm safety check with a multi-resource matrix to verify if a state is safe or unsafe.",
      topics: [
        {
          id: "os-t-5-1",
          title: "Deadlock Characterization & Prevention",
          description: "The 4 Coffman conditions and architectural strategies to prevent them.",
          difficulty: "Intermediate",
          learningObjectives: ["Memorize and evaluate Coffman conditions", "Design lock ordering rules"],
          subtopics: [
            {
              id: "os-st-5-1-1",
              title: "The 4 Coffman Conditions",
              description: "Mutual Exclusion, Hold and Wait, No Preemption, Circular Wait.",
              difficulty: "Foundation",
              keyTakeaways: [
                "A deadlock can occur if and only if all four Coffman conditions hold simultaneously: (1) Mutual Exclusion, (2) Hold and Wait, (3) No Preemption, (4) Circular Wait.",
                "Eliminating even one condition provably prevents deadlocks."
              ],
              concepts: ["Coffman Conditions", "Resource Allocation Graph (RAG)", "Cycle Detection"],
              questions: [
                {
                  id: "os-q-21",
                  statement: "How does strict global lock ordering eliminate the possibility of a deadlock?",
                  type: "Interview",
                  difficulty: "Intermediate",
                  explanation: "By assigning a global integer rank to every lock and mandating that threads acquire locks in strictly increasing order, it is mathematically impossible to form a circular wait cycle (a thread holding lock N can never request lock M where M < N)."
                }
              ]
            }
          ]
        },
        {
          id: "os-t-5-2",
          title: "Deadlock Avoidance & Detection",
          description: "Banker's Algorithm, Safe vs Unsafe States, and Wait-For Graphs.",
          difficulty: "Advanced",
          learningObjectives: ["Trace Banker's Algorithm", "Differentiate unsafe states from deadlocks"],
          subtopics: [
            {
              id: "os-st-5-2-1",
              title: "Banker's Algorithm & Safe States",
              description: "Dijkstra's resource-allocation safety verification.",
              difficulty: "Advanced",
              keyTakeaways: [
                "A state is 'safe' if there exists an execution sequence allowing all processes to finish without deadlock.",
                "An unsafe state is NOT necessarily a deadlock; it is a state that could lead to deadlock under worst-case resource requests.",
                "Banker's Algorithm dynamically tests whether granting a request leaves the system in a safe state."
              ],
              concepts: ["Banker's Algorithm", "Safe Sequence", "Allocation Matrix", "Need Matrix", "Available Vector"],
              questions: [
                {
                  id: "os-q-22",
                  statement: "Why do modern consumer and server operating systems (Windows, Linux, macOS) ignore deadlock avoidance algorithms and adopt the 'Ostrich algorithm'?",
                  type: "Conceptual",
                  difficulty: "Intermediate",
                  explanation: "Because Banker's algorithm requires processes to declare their maximum resource needs in advance (impossible for dynamic programs) and incurs excessive computational overhead on every resource allocation. It is cheaper to let deadlocks occur rarely and reboot or let developers debug them."
                }
              ]
            }
          ]
        }
      ]
    },
    {
      id: "os-mod-6",
      order: 6,
      title: "Memory Management & Paging",
      shortDescription: "Logical vs physical addresses, internal/external fragmentation, and paging hardware.",
      detailedOverview: "Explore how computers organize physical RAM. Trace the historical transition from contiguous allocation and segmentation to fixed-size paging, page directories, and offset arithmetic.",
      difficulty: "Foundation",
      interviewBenchmark: "Calculate page number and byte offset for a given virtual address with 4KB page size and describe internal fragmentation.",
      topics: [
        {
          id: "os-t-6-1",
          title: "Address Binding & Memory Allocation",
          description: "Compile-time vs load-time vs execution-time binding and contiguous allocation.",
          difficulty: "Foundation",
          learningObjectives: ["Contrast logical and physical addresses", "Explain fragmentation types"],
          subtopics: [
            {
              id: "os-st-6-1-1",
              title: "Logical vs Physical Address Spaces & MMU",
              description: "Role of the Memory Management Unit (MMU) and base/limit registers.",
              difficulty: "Foundation",
              keyTakeaways: [
                "CPU generates logical (virtual) addresses; physical memory hardware responds only to physical addresses.",
                "The MMU dynamically translates logical addresses to physical addresses at runtime using relocation registers or page tables."
              ],
              concepts: ["Logical Address", "Physical Address", "MMU", "Base & Limit Registers"],
              questions: [
                {
                  id: "os-q-23",
                  statement: "What is the difference between internal fragmentation and external fragmentation?",
                  type: "Conceptual",
                  difficulty: "Foundation",
                  explanation: "External fragmentation occurs when total free memory is sufficient to satisfy a request, but it is divided into non-contiguous scattered holes. Internal fragmentation occurs when memory is allocated in fixed-size blocks (e.g. 4KB pages) and a process requests less than the block size, leaving wasted space inside the block."
                }
              ]
            }
          ]
        },
        {
          id: "os-t-6-2",
          title: "Paging Fundamentals",
          description: "Fixed-size frames, page tables, and virtual address bit splitting.",
          difficulty: "Intermediate",
          learningObjectives: ["Split virtual addresses into VPN and Offset", "Inspect Page Table Entries (PTEs)"],
          subtopics: [
            {
              id: "os-st-6-2-1",
              title: "Page Number & Offset Address Translation",
              description: "Mathematical bit splitting: Virtual Address = [ Page Number (VPN) | Page Offset ].",
              difficulty: "Intermediate",
              keyTakeaways: [
                "Physical memory is divided into fixed-size frames; virtual memory into identical-size pages (typically 4KB).",
                "With a 4KB (2^12 bytes) page size, the lowest 12 bits represent the page offset and pass unchanged to the physical address. The upper bits index into the page table."
              ],
              concepts: ["VPN", "Page Frame Number (PFN)", "Page Offset", "Page Table Entry"],
              questions: [
                {
                  id: "os-q-24",
                  statement: "In a 32-bit system with 4KB pages, calculate the number of bits allocated to the page offset and the maximum number of entries in a single flat page table.",
                  type: "Analytical",
                  difficulty: "Intermediate",
                  explanation: "4KB = 2^12 bytes, so 12 bits are allocated to the offset. The remaining 32 - 12 = 20 bits index pages, allowing 2^20 = 1,048,576 entries in a flat page table (consuming 4MB per process)."
                }
              ]
            }
          ]
        }
      ]
    },
    {
      id: "os-mod-7",
      order: 7,
      title: "Virtual Memory & Page Replacement",
      shortDescription: "Demand paging, page fault exceptions, multi-level page tables, TLB, and LRU/Clock algorithms.",
      detailedOverview: "Dive deep into modern virtual memory systems. Understand hardware TLB caches, multi-level page table traversals (PML4/PML5), page fault handlers, copy-on-write, and page eviction heuristics.",
      difficulty: "Advanced",
      interviewBenchmark: "Walk through physical address translation on x86-64 with a 4-level page table and calculate the effective memory access time with TLB hit rates.",
      topics: [
        {
          id: "os-t-7-1",
          title: "Demand Paging & Page Fault Traps",
          description: "Present bit checks, hardware interrupt 14, and disk swap transfers.",
          difficulty: "Intermediate",
          learningObjectives: ["Trace hardware page fault exception flow", "Distinguish major vs minor page faults"],
          subtopics: [
            {
              id: "os-st-7-1-1",
              title: "Page Fault Exception Handling Sequence",
              description: "What occurs when the MMU reads `present = 0` in a Page Table Entry.",
              difficulty: "Intermediate",
              keyTakeaways: [
                "When a virtual address with `present = 0` is accessed, the MMU fires a page fault exception (x86 Interrupt 14).",
                "The kernel checks validity in `mm_struct`: if valid, it allocates a physical frame, reads the page from disk/swap, updates the PTE, sets `present = 1`, and restarts the faulting instruction."
              ],
              concepts: ["Present Bit", "Page Fault Trap", "CR2 Register", "Minor vs Major Page Fault", "Demand Paging"],
              questions: [
                {
                  id: "os-q-25",
                  statement: "What is the difference between a minor (soft) page fault and a major (hard) page fault?",
                  type: "Interview",
                  difficulty: "Intermediate",
                  explanation: "A minor page fault occurs when the page is already in physical memory (e.g. shared library loaded by another process or reclaimed from the page cache); it requires only updating page table mappings. A major page fault requires a physical disk read to load the page from swap or file backing."
                }
              ]
            }
          ]
        },
        {
          id: "os-t-7-2",
          title: "Multi-Level Page Tables & TLB",
          description: "Why flat page tables fail on 64-bit architectures, and hardware TLB caching.",
          difficulty: "Advanced",
          learningObjectives: ["Calculate 4-level page table space savings", "Analyze Effective Memory Access Time (EMAT)"],
          subtopics: [
            {
              id: "os-st-7-2-1",
              title: "Hierarchical Multi-Level Page Tables (PML4)",
              description: "Breaking virtual addresses into indices across multiple directory levels.",
              difficulty: "Advanced",
              keyTakeaways: [
                "A flat page table for a 64-bit space would consume gigabytes per process. Multi-level tables only allocate page directory pages for active virtual memory regions.",
                "On x86-64 (48-bit canonical addressing), translation walks 4 levels: PML4 -> PDPT -> PD -> PT -> Frame."
              ],
              concepts: ["PML4", "Sparse Memory Layout", "Tree Walk", "CR3 Register"],
              questions: [
                {
                  id: "os-q-26",
                  statement: "Why do 64-bit operating systems use 4-level or 5-level page tables instead of a single flat table?",
                  type: "Interview",
                  difficulty: "Advanced",
                  explanation: "A flat page table for a 64-bit address space would require 2^52 entries (petabytes of RAM per process). Multi-level paging creates a tree where only branches corresponding to allocated virtual memory regions are actually instantiated, reducing per-process overhead to a few kilobytes for sparse programs."
                }
              ]
            },
            {
              id: "os-st-7-2-2",
              title: "Translation Lookaside Buffer (TLB)",
              description: "Hardware associative cache for virtual-to-physical translations and TLB shootdown.",
              difficulty: "Advanced",
              keyTakeaways: [
                "Walking a 4-level page table requires 4 memory accesses for a single memory load. The MMU caches recent translations in a fast hardware associative cache called the TLB.",
                "TLB Hit rate (~99%) brings Effective Memory Access Time (EMAT) close to L1 cache speed. Modifying a page table requires a 'TLB shootdown' across all CPU cores."
              ],
              concepts: ["TLB Hit/Miss", "EMAT Calculation", "TLB Flush", "TLB Shootdown", "PCID / ASID"],
              questions: [
                {
                  id: "os-q-27",
                  statement: "Given TLB access time = 1ns, memory access time = 50ns, and TLB hit rate = 98%, calculate the Effective Memory Access Time (EMAT) with a 4-level page table.",
                  type: "Analytical",
                  difficulty: "Advanced",
                  explanation: "On TLB Hit (98%): 1ns (TLB) + 50ns (Data Read) = 51ns. On TLB Miss (2%): 1ns (TLB) + 4 * 50ns (4-level page walk) + 50ns (Data Read) = 251ns. EMAT = (0.98 * 51ns) + (0.02 * 251ns) = 49.98ns + 5.02ns = 55ns."
                }
              ]
            }
          ]
        },
        {
          id: "os-t-7-3",
          title: "Page Replacement Algorithms",
          description: "LRU, Clock / Second-Chance, Belady's Anomaly, and Working Set model.",
          difficulty: "Intermediate",
          learningObjectives: ["Simulate Clock (Second Chance) algorithm", "Explain Belady's Anomaly"],
          subtopics: [
            {
              id: "os-st-7-3-1",
              title: "Page Replacement Policies: FIFO, LRU & Clock (Second Chance)",
              description: "Selecting victim frames under memory pressure.",
              difficulty: "Intermediate",
              keyTakeaways: [
                "Optimal Replacement (MIN/OPT) evicts the page not needed for the longest future time (theoretical benchmark).",
                "True LRU requires expensive timestamp updates on every memory access. Modern kernels approximate LRU using the Clock (Second-Chance) algorithm with reference bits."
              ],
              concepts: ["Clock Algorithm", "Reference Bit", "Dirty Bit", "Belady's Anomaly", "Thrashing"],
              questions: [
                {
                  id: "os-q-28",
                  statement: "What is Belady's Anomaly, and which page replacement algorithm famously exhibits it?",
                  type: "Conceptual",
                  difficulty: "Intermediate",
                  explanation: "Belady's Anomaly is the counter-intuitive phenomenon where allocating more physical page frames causes the number of page faults to increase for a given reference string. FIFO exhibits Belady's Anomaly; stack-based algorithms like LRU are mathematically immune."
                }
              ]
            }
          ]
        }
      ]
    },
    {
      id: "os-mod-8",
      order: 8,
      title: "File Systems & Storage Management",
      shortDescription: "Inodes, directory structures, block allocation, journaling, and crash consistency.",
      detailedOverview: "Analyze how operating systems persist files across system reboots. Study inode architectures, directory hashing, file allocation methods, file system consistency, and Write-Ahead Journaling.",
      difficulty: "Intermediate",
      interviewBenchmark: "Explain how Linux ext4 uses inodes, extent trees, and journaling to recover file system consistency after a sudden power loss.",
      topics: [
        {
          id: "os-t-8-1",
          title: "File System Structures & Inodes",
          description: "Superblocks, inodes, directory entries (dentry), and file descriptors.",
          difficulty: "Intermediate",
          learningObjectives: ["Inspect Unix inode anatomy", "Understand hard links vs symbolic links"],
          subtopics: [
            {
              id: "os-st-8-1-1",
              title: "Unix Inodes & File Metadata",
              description: "Why filenames are stored in directory tables rather than inside the file inode.",
              difficulty: "Intermediate",
              keyTakeaways: [
                "An inode stores file metadata (permissions, owner, size, timestamps, block pointers). Filenames are stored in directory entries mapped to inode numbers.",
                "Hard links point directly to an existing inode number; soft (symbolic) links store the path string to the target file."
              ],
              concepts: ["Inode", "Superblock", "Hard Link", "Soft Link", "Reference Count"],
              questions: [
                {
                  id: "os-q-29",
                  statement: "Why does deleting a file in Unix ('rm filename') not immediately delete the data if another hard link exists?",
                  type: "Interview",
                  difficulty: "Intermediate",
                  explanation: "The 'rm' command calls the `unlink()` syscall, which decrements the inode's hard link reference counter. The kernel only deallocates the disk data blocks when the link count reaches 0 AND no running process has an open file descriptor referencing that inode."
                }
              ]
            }
          ]
        },
        {
          id: "os-t-8-2",
          title: "Journaling & Crash Consistency",
          description: "Write-Ahead Logging (WAL) in ext4/XFS, fsck, and metadata journaling.",
          difficulty: "Advanced",
          learningObjectives: ["Explain fsck limitations", "Trace journaling transaction commit"],
          subtopics: [
            {
              id: "os-st-8-2-1",
              title: "Write-Ahead Journaling in Modern File Systems",
              description: "Journal commit records, checkpointing, and fast crash recovery.",
              difficulty: "Advanced",
              keyTakeaways: [
                "Without journaling, an unexpected power failure mid-write causes dangling pointers or lost blocks, requiring a lengthy full-disk `fsck` scan.",
                "Journaling writes changes to an append-only log first. Upon reboot, the file system replays committed journal transactions in seconds."
              ],
              concepts: ["Journal Commit", "Ordered Mode", "Data Journaling", "Crash Consistency", "fsck"],
              questions: [
                {
                  id: "os-q-30",
                  statement: "What is the difference between 'metadata journaling' and 'full data journaling' in file systems like ext4?",
                  type: "Analytical",
                  difficulty: "Advanced",
                  explanation: "Metadata journaling logs only file system structural changes (inodes, allocation bitmaps) to the journal while writing payload data directly to file blocks. Full data journaling logs both file payload and metadata to the journal, providing maximum consistency at the cost of double write amplification."
                }
              ]
            }
          ]
        }
      ]
    },
    {
      id: "os-mod-9",
      order: 9,
      title: "I/O Systems & Device Management",
      shortDescription: "Interrupt-driven I/O, Direct Memory Access (DMA), disk scheduling, and buffering.",
      detailedOverview: "Examine how the kernel talks to hardware devices. Study device controllers, memory-mapped I/O, DMA engines, disk scheduling algorithms, and asynchronous I/O architectures.",
      difficulty: "Intermediate",
      interviewBenchmark: "Explain how Direct Memory Access (DMA) prevents the CPU from being saturated by high-throughput network packet processing.",
      topics: [
        {
          id: "os-t-9-1",
          title: "I/O Hardware & DMA",
          description: "Polling vs interrupts, device controllers, and Direct Memory Access.",
          difficulty: "Intermediate",
          learningObjectives: ["Compare Polling and Interrupts", "Trace DMA data transfers"],
          subtopics: [
            {
              id: "os-st-9-1-1",
              title: "Direct Memory Access (DMA) Architecture",
              description: "Offloading byte-by-byte memory transfers from the CPU to dedicated hardware controllers.",
              difficulty: "Intermediate",
              keyTakeaways: [
                "Without DMA, the CPU must read every byte from a device register and write it to RAM (Programmed I/O), pinning the CPU core.",
                "With DMA, the CPU initializes the DMA controller with buffer address and length; the DMA chip transfers entire blocks directly into RAM and fires a single interrupt upon completion."
              ],
              concepts: ["Programmed I/O", "Interrupt-Driven I/O", "DMA Controller", "Ring Buffers"],
              questions: [
                {
                  id: "os-q-31",
                  statement: "Why does high-speed networking (e.g. 100GbE) use NAPI polling instead of per-packet hardware interrupts?",
                  type: "Interview",
                  difficulty: "Advanced",
                  explanation: "At 100Gbps, millions of packets arrive per second. Firing a hardware interrupt for every packet triggers 'interrupt storm' / livelock, where the CPU spends 100% of its time servicing ISRs and cannot process payloads. Hybrid polling (NAPI) turns off interrupts during high load and polls the ring buffer."
                }
              ]
            }
          ]
        }
      ]
    },
    {
      id: "os-mod-10",
      order: 10,
      title: "Protection, Security & Access Control",
      shortDescription: "Principle of least privilege, Access Control Lists, capabilities, and memory protection.",
      detailedOverview: "Understand how the operating system safeguards system integrity against malicious software and privilege escalation. Study hardware NX bits, ASLR, POSIX permissions, and sandboxing.",
      difficulty: "Intermediate",
      interviewBenchmark: "Explain how Address Space Layout Randomization (ASLR) and the Non-Executable (NX) stack bit defend against buffer overflow attacks.",
      topics: [
        {
          id: "os-t-10-1",
          title: "Memory Protection & Exploit Mitigation",
          description: "Buffer overflows, the NX/W^X bit, and Address Space Layout Randomization (ASLR).",
          difficulty: "Intermediate",
          learningObjectives: ["Analyze buffer overflow attacks", "Explain ASLR and NX bit defenses"],
          subtopics: [
            {
              id: "os-st-10-1-1",
              title: "Hardware Execution Prevention (NX Bit) & ASLR",
              description: "Ensuring memory pages are either writable or executable, never both (W^X).",
              difficulty: "Intermediate",
              keyTakeaways: [
                "The NX (No-Execute) bit marks memory pages (such as the stack and heap) as non-executable, preventing code injection attacks.",
                "ASLR randomizes the base addresses of the stack, heap, and shared libraries on every execution, making hardcoded return address exploits fail."
              ],
              concepts: ["NX / XD Bit", "W^X Invariant", "ASLR", "Return-Oriented Programming (ROP)"],
              questions: [
                {
                  id: "os-q-32",
                  statement: "How does Return-Oriented Programming (ROP) bypass the hardware NX (No-Execute) stack protection?",
                  type: "Interview",
                  difficulty: "Advanced",
                  explanation: "ROP does not inject new code onto the non-executable stack. Instead, it chains together small snippets of existing legitimate code ('gadgets') already residing in executable memory pages, ending in 'ret' instructions, executing malicious operations using existing code."
                }
              ]
            }
          ]
        }
      ]
    },
    {
      id: "os-mod-11",
      order: 11,
      title: "Advanced OS Concepts & Modern High-Performance I/O",
      shortDescription: "epoll, io_uring, eBPF, zero-copy networking, and real-time kernels.",
      detailedOverview: "Examine bleeding-edge operating system innovations that power modern cloud backends. Learn how Linux scales to millions of concurrent connections using epoll and io_uring, inspect kernel execution with eBPF, and study zero-copy syscalls.",
      difficulty: "Advanced",
      interviewBenchmark: "Explain the C10K problem, why select/poll scales O(N) while epoll scales O(1), and how io_uring achieves zero-syscall asynchronous I/O.",
      topics: [
        {
          id: "os-t-11-1",
          title: "Scalable Event Demultiplexing & Async I/O",
          description: "From select/poll to epoll, kqueue, and the io_uring ring-buffer model.",
          difficulty: "Advanced",
          learningObjectives: ["Contrast select vs epoll", "Understand io_uring submission/completion queues"],
          subtopics: [
            {
              id: "os-st-11-1-1",
              title: "epoll vs select & The C10K Problem",
              description: "Edge-triggered vs level-triggered epoll and kernel event notification queues.",
              difficulty: "Advanced",
              keyTakeaways: [
                "`select` and `poll` require passing the entire file descriptor set from user space to kernel on every call (O(N) copy and scan).",
                "`epoll` creates an in-kernel Red-Black tree of watched descriptors and a ready list (O(1) event notification), resolving the C10K problem."
              ],
              concepts: ["C10K Problem", "select/poll O(N)", "epoll O(1)", "Edge vs Level Triggering"],
              questions: [
                {
                  id: "os-q-33",
                  statement: "Why does epoll dramatically outperform select/poll when monitoring 100,000 connections with only 50 active at any moment?",
                  type: "Interview",
                  difficulty: "Advanced",
                  explanation: "Select requires copying a 100,000-FD array into the kernel and scanning every descriptor to see if it is ready (O(N) overhead). Epoll maintains an in-kernel wait list; when a socket receives data, the NIC ISR appends it to epoll's ready list. `epoll_wait()` only returns the 50 ready descriptors in O(1) time."
                }
              ]
            },
            {
              id: "os-st-11-1-2",
              title: "io_uring: Zero-Syscall Asynchronous I/O",
              description: "Shared ring buffers between user space and kernel for high-throughput batching.",
              difficulty: "Advanced",
              keyTakeaways: [
                "`io_uring` uses two lock-free ring buffers (Submission Queue and Completion Queue) shared between user space and kernel via mmap.",
                "Applications can submit and complete thousands of I/O operations without executing a single context-switching system call."
              ],
              concepts: ["io_uring", "Submission Queue (SQ)", "Completion Queue (CQ)", "Zero-Copy", "Kernel Polling"],
              questions: [
                {
                  id: "os-q-34",
                  statement: "How does Linux io_uring eliminate system call overhead for high-frequency disk and network operations?",
                  type: "Interview",
                  difficulty: "Advanced",
                  explanation: "By sharing two lock-free circular ring buffers (SQ and CQ) between user space and kernel via mapped memory. The application writes I/O requests into the SQ and kernel worker threads consume them without context switching into kernel mode."
                }
              ]
            }
          ]
        }
      ]
    }
  ]
};

