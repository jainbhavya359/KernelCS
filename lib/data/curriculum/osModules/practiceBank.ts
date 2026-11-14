import { CurriculumQuestion } from "../types";
import { module01Questions } from "./questions";

// High-yield practice question bank for Module 01
export const module01PracticeQuestions: CurriculumQuestion[] = [
  {
    "id": "os-prac-1-1-1",
    "statement": "On a 32-bit computing architecture without an operating system or virtual memory paging, 8 concurrent user programs each require 256 MB of contiguous physical RAM. Calculate the maximum number of such programs physical memory can hold, and explain how an OS with paging overcomes this physical limit.",
    "type": "Numerical",
    "category": "Numerical",
    "interactionType": "numerical",
    "difficulty": "Intermediate",
    "topicId": "os-topic-1-1",
    "lessonId": "os-les-1-1-2",
    "numericalAnswer": {
      "value": 16,
      "unit": "programs",
      "tolerance": 0,
      "formula": "Max Programs = Total Addressable Space (2^32 bytes = 4096 MB) / Memory per program (256 MB)",
      "solutionSteps": [
        "Step 1: Calculate total addressable physical memory for a 32-bit address bus: 2^32 bytes = 4,294,967,296 bytes = 4096 MB = 4 GB.",
        "Step 2: Divide total physical memory by program requirement: 4096 MB / 256 MB = 16 programs.",
        "Step 3: However, without an OS, physical memory suffers from external fragmentation: if programs allocate and terminate in arbitrary order, contiguous blocks of 256 MB quickly become unavailable even if 2 GB of total free RAM remains.",
        "Step 4: An OS with virtual memory paging divides memory into fixed-size 4 KB frames. Non-contiguous physical frames are mapped into a contiguous virtual address space, eliminating external fragmentation and enabling demand paging/swapping to disk, allowing multiprogramming beyond physical DRAM limits."
      ]
    },
    "hints": [
      "Calculate total bytes addressable by a 32-bit CPU (2^32).",
      "Convert bytes to Megabytes (1 MB = 2^20 bytes = 1,048,576 bytes).",
      "Recall why contiguous allocation fails in dynamic workloads (external fragmentation)."
    ],
    "explanation": "A 32-bit address bus directly addresses 2^32 bytes = 4 GB (4096 MB). Under static contiguous allocation, at most 4096 MB / 256 MB = 16 programs can reside in RAM simultaneously. In practice, without an operating system managing memory via page tables, external fragmentation makes loading even 8 programs difficult after memory churn. Virtual memory paging solves this by mapping non-contiguous physical page frames into contiguous virtual address spaces, while demand paging uses secondary storage as backing swap."
  },
  {
    "id": "os-prac-1-1-2",
    "statement": "What occurs if two independent programs running on bare metal without an operating system attempt to transmit data to the same printer hardware port simultaneously?",
    "type": "Conceptual",
    "category": "Scenario-based",
    "interactionType": "mcq",
    "difficulty": "Foundation",
    "topicId": "os-topic-1-1",
    "lessonId": "os-les-1-1-3",
    "options": [
      "The CPU hardware automatically pauses the second program until the first finishes.",
      "The printer memory serializes the jobs in a hardware FIFO queue.",
      "The output characters interleave uncontrollably, producing garbled gibberish because there is no arbitration or spooling layer.",
      "The printer driver triggers a hardware exception that resets the computer."
    ],
    "correctOptionIndex": 2,
    "hints": [
      "Bare-metal peripherals are dumb electrical registers without scheduling logic.",
      "Think about what happens when two threads write alternating bytes to the same I/O memory address."
    ],
    "explanation": "Without an operating system, hardware devices have no built-in arbitration mechanism. Both programs write raw byte streams to the same Memory-Mapped I/O (MMIO) registers or I/O ports. The resulting physical output is an unintelligible, interleaved mess of characters. The OS solves this by abstracting the printer behind a spooler daemon (such as CUPS) and kernel device drivers that serialize print requests into an atomic FIFO queue."
  },
  {
    "id": "os-prac-1-1-3",
    "statement": "Which of the following best exemplifies the foundational systems design principle: 'Separate Mechanism from Policy' in the context of operating systems?",
    "type": "Analytical",
    "category": "Analytical",
    "interactionType": "mcq",
    "difficulty": "Intermediate",
    "topicId": "os-topic-1-1",
    "lessonId": "os-les-1-1-4",
    "options": [
      "Storing user files on an NVMe SSD instead of a mechanical hard drive.",
      "The CPU timer interrupt and context-switching routine (mechanism) versus the Completely Fair Scheduler algorithm that chooses which process runs next (policy).",
      "Compiling the operating system with GCC instead of Clang.",
      "Using 64-bit registers instead of 32-bit registers for floating point arithmetic."
    ],
    "correctOptionIndex": 1,
    "hints": [
      "A mechanism dictates HOW something is technically executed; a policy dictates WHAT decision is made.",
      "Consider how context switching is hardware-bound while scheduling algorithms are policy choices that can be tuned."
    ],
    "explanation": "Separating Mechanism from Policy is a cornerstone of operating system architecture. The context-switch routine that saves registers and swaps page table pointers in CR3 is a low-level hardware *mechanism* (how a switch happens). The scheduling algorithm (such as Linux CFS, Round Robin, or Multi-Level Feedback Queue) is a *policy* (which process gets the CPU next, and for how long). Separating them allows the OS policy to be modified or tuned dynamically without rewriting hardware-level switching mechanisms."
  },
  {
    "id": "os-prac-1-2-1",
    "statement": "Which of the following software components executes strictly within the supervisor kernel space (Ring 0) in a standard monolithic Linux operating system?",
    "type": "Application",
    "category": "Application-based",
    "interactionType": "mcq",
    "difficulty": "Foundation",
    "topicId": "os-topic-1-2",
    "lessonId": "os-les-1-2-2",
    "options": [
      "The GNU C Library (glibc)",
      "The Virtual File System (VFS) and Page Cache manager",
      "The Bash command-line shell",
      "The systemd init service manager (PID 1)"
    ],
    "correctOptionIndex": 1,
    "hints": [
      "Consider which component directly manipulates page frames, inodes, and device buffers in supervisor mode.",
      "glibc, bash, and systemd are all user-space software executing in Ring 3."
    ],
    "explanation": "The Virtual File System (VFS) and Page Cache manager reside inside the kernel binary and execute in supervisor mode (Ring 0). In contrast, glibc is a user-space C library, Bash is an interactive user shell program, and systemd (PID 1) is the first user-space process; all three execute strictly in unprivileged User Mode (Ring 3)."
  },
  {
    "id": "os-prac-1-2-2",
    "statement": "Why can the same POSIX C program calling `int fd = open(\"data.txt\", O_RDONLY);` compile and execute successfully on both Linux and Apple macOS, despite the two kernels having radically different internal architectures (Linux monolithic vs macOS XNU hybrid)?",
    "type": "Analytical",
    "category": "Analytical",
    "interactionType": "short-answer",
    "difficulty": "Intermediate",
    "topicId": "os-topic-1-2",
    "lessonId": "os-les-1-2-3",
    "stepByStepSolution": [
      "1. POSIX (Portable Operating System Interface) is an API specification (IEEE standard), NOT an implementation.",
      "2. The open() function signature, flags (O_RDONLY), and return semantics (file descriptor integer or -1 on error with errno) are standardized by POSIX.",
      "3. Each operating system provides its own standard C library (glibc on Linux, libSystem on macOS) that implements the POSIX wrapper.",
      "4. Under the hood, glibc translates open() into the Linux x86-64 'syscall' opcode with rax=2, entering Linux VFS.",
      "5. On macOS, libSystem translates open() into Mach/BSD system call traps (syscall rax=0x2000005) entering XNU VFS.",
      "6. Because the user-visible API contract is identical, source code portability is preserved across completely divergent kernel internals."
    ],
    "hints": [
      "Distinguish between an Application Programming Interface (API) and an Application Binary Interface (ABI).",
      "Think about what POSIX guarantees to application developers."
    ],
    "explanation": "POSIX specifies an Application Programming Interface (API) standard, defining function signatures, arguments, and expected behavior. It does not dictate kernel implementation. Both Linux and macOS provide POSIX-compliant C runtime libraries (glibc and libSystem respectively). The application source code compiles against the standardized header `<fcntl.h>`, and the respective runtime libraries handle translating the call into each platform's proprietary system call ABI and kernel trap mechanisms."
  },
  {
    "id": "os-prac-1-2-3",
    "statement": "A user program enters an infinite allocation loop: `while(1) { malloc(1024 * 1024); }`. Compare the system response on bare metal with no OS versus a production Linux server.",
    "type": "Conceptual",
    "category": "Scenario-based",
    "interactionType": "scenario",
    "difficulty": "Intermediate",
    "topicId": "os-topic-1-2",
    "lessonId": "os-les-1-2-4",
    "stepByStepSolution": [
      "Bare-Metal Behavior: The allocation pointer advances past physical DRAM limits, overwriting peripheral memory-mapped registers, corrupting stack frames, and ultimately causing the CPU to hang, execute invalid opcodes, or trigger an unrecoverable hardware triple fault that reboots the computer.",
      "Linux OS Behavior: Linux isolates the process via virtual memory. The memory manager tracks allocated Virtual Memory Areas (VMAs). As physical RAM and swap space become exhausted, the kernel's Out-Of-Memory (OOM) Killer activates.",
      "OOM Resolution: The OOM Killer computes badness scores (`oom_score`) based on memory consumption, selects the rogue process, and terminates it with signal SIGKILL (9). The OS reclaims all physical frames; all other system processes continue running without downtime."
    ],
    "hints": [
      "On bare metal, memory bounds checking does not exist.",
      "In Linux, how does the kernel protect the rest of the system when physical memory is exhausted?"
    ],
    "explanation": "On bare metal, the program blindly increments its heap pointer until it corrupts memory-mapped device registers or unmapped address space, crashing the machine. In Linux, virtual memory isolates the process. When memory pressure threatens system stability, the kernel's OOM (Out-of-Memory) Killer algorithm identifies the offending process, sends an uncatchable SIGKILL (9), reclaims its physical memory frames, and logs the event to dmesg, keeping the server operational."
  },
  {
    "id": "os-prac-1-3-1",
    "statement": "An ext4 filesystem uses 4096-byte (4 KB) allocation blocks. An application creates 10,000 small log files, each containing exactly 200 bytes of data. Calculate the total payload data size, the total physical disk storage consumed (excluding inode metadata), and the percentage of storage lost to internal fragmentation.",
    "type": "Numerical",
    "category": "Numerical",
    "interactionType": "numerical",
    "difficulty": "Foundation",
    "topicId": "os-topic-1-3",
    "lessonId": "os-les-1-3-3",
    "numericalAnswer": {
      "value": 95.12,
      "unit": "%",
      "tolerance": 0.1,
      "formula": "Internal Fragmentation % = ((Disk Space Consumed - Payload Data Size) / Disk Space Consumed) * 100",
      "solutionSteps": [
        "Step 1: Calculate total payload data: 10,000 files * 200 bytes = 2,000,000 bytes ≈ 1.907 MB (or 2.0 MB decimal).",
        "Step 2: Filesystems allocate storage in discrete block units. Even though a file is only 200 bytes, ext4 must allocate at least 1 full 4096-byte block for each file.",
        "Step 3: Total disk space consumed = 10,000 * 4096 bytes = 40,960,000 bytes = 40.96 MB (or 39.06 MiB).",
        "Step 4: Wasted storage (internal fragmentation) per file = 4096 - 200 = 3896 bytes.",
        "Step 5: Total wasted storage = 10,000 * 3896 bytes = 38,960,000 bytes.",
        "Step 6: Percentage lost to internal fragmentation = (38,960,000 / 40,960,000) * 100 = 3896 / 4096 * 100 ≈ 95.117% ≈ 95.12%."
      ]
    },
    "hints": [
      "Recall that standard filesystems allocate whole blocks (4 KB), not fractions of blocks.",
      "Calculate: (Wasted bytes per block / Block size) * 100%."
    ],
    "explanation": "Because filesystems allocate storage in discrete 4096-byte blocks, each 200-byte file occupies an entire 4 KB block on disk, leaving 3,896 bytes of unused space inside that block. Total consumed disk space is 40.96 MB to store only 2 MB of data. The internal fragmentation percentage is (3896 / 4096) * 100 = 95.12%. Modern operating systems mitigate this through inline data storage inside the inode (ext4 inline_data feature) or sub-block allocation (Btrfs/ZFS)."
  },
  {
    "id": "os-prac-1-3-2",
    "statement": "Which operating system subsystem is directly responsible for translating high-level file operations like `read()` and `write()` into low-level block I/O requests (`struct bio`) and coordinating Direct Memory Access (DMA) transfers with the storage controller?",
    "type": "Application",
    "category": "Application-based",
    "interactionType": "mcq",
    "difficulty": "Intermediate",
    "topicId": "os-topic-1-3",
    "lessonId": "os-les-1-3-4",
    "options": [
      "The CPU Scheduler (CFS)",
      "The Virtual Memory Manager (Buddy Allocator)",
      "The Block I/O Layer and Device Driver Subsystem",
      "The Inter-Process Communication (IPC) Socket Layer"
    ],
    "correctOptionIndex": 2,
    "hints": [
      "Identify the layer that bridges filesystem inodes to physical disk sectors/LBAs.",
      "Think about where block request queues and NVMe/SATA drivers operate."
    ],
    "explanation": "The Block I/O Layer (together with storage device drivers like NVMe or AHCI) bridges high-level VFS filesystem operations to physical storage hardware. It merges adjacent I/O requests, schedules disk head movements/queue priorities, builds Scatter-Gather Lists (SGLs), and programs the storage controller's Direct Memory Access (DMA) engine to stream data into RAM without CPU intervention."
  },
  {
    "id": "os-prac-1-4-1",
    "statement": "Under a multiprogrammed operating system, suppose processes spend on average p = 0.60 (60%) of their time waiting for I/O. Using the probabilistic multiprogramming model (CPU Utilization = 1 - p^n), calculate the CPU utilization for n = 4 concurrent processes in memory.",
    "type": "Numerical",
    "category": "Numerical",
    "interactionType": "numerical",
    "difficulty": "Intermediate",
    "topicId": "os-topic-1-4",
    "lessonId": "os-les-1-4-2",
    "numericalAnswer": {
      "value": 87.04,
      "unit": "%",
      "tolerance": 0.1,
      "formula": "CPU Utilization = 1 - p^n = 1 - (0.60)^4",
      "solutionSteps": [
        "Step 1: Probability that a single process is waiting for I/O: p = 0.60.",
        "Step 2: Under independent execution assumptions, the probability that ALL n=4 processes are simultaneously waiting for I/O (leaving CPU completely idle) is p^n = (0.60)^4.",
        "Step 3: (0.60)^2 = 0.36; (0.36)^2 = 0.1296 (12.96% idle probability).",
        "Step 4: CPU utilization is the complement of all processes being idle: 1 - 0.1296 = 0.8704 = 87.04%."
      ]
    },
    "hints": [
      "Compute (0.6)^4 first.",
      "Subtract the result from 1.0, then multiply by 100 for percentage."
    ],
    "explanation": "Under the classical probabilistic multiprogramming model formulated by Andrew Tanenbaum, if each process spends a fraction p = 0.60 waiting for I/O, the probability that all 4 processes are stalled simultaneously is p^4 = 0.6^4 = 0.1296. Thus, the CPU is active 1 - 0.1296 = 0.8704 = 87.04% of the time, demonstrating how multiprogramming exponentially improves processor utilization over uniprogramming (which yielded only 40%)."
  },
  {
    "id": "os-prac-1-4-2",
    "statement": "In a Hard Real-Time Operating System (RTOS), a low-priority task holds a mutex on a shared sensor bus. A high-priority flight-control task preempts and blocks waiting for that mutex. Suddenly, an unrelated medium-priority telemetry task preempts the low-priority task. What classic hazard has occurred, and what kernel protocol permanently solves it?",
    "type": "Conceptual",
    "category": "Analytical",
    "interactionType": "mcq",
    "difficulty": "Advanced",
    "topicId": "os-topic-1-4",
    "lessonId": "os-les-1-4-4",
    "options": [
      "Deadlock; solved by Dijkstra's Banker's Algorithm.",
      "Priority Inversion; solved by Priority Inheritance Protocol (PIP).",
      "Belady's Anomaly; solved by the Working Set Model.",
      "Starvation; solved by Round-Robin time slicing."
    ],
    "correctOptionIndex": 1,
    "hints": [
      "This famous bug paralyzed the NASA Mars Pathfinder spacecraft on Mars in 1997.",
      "The medium-priority task indirectly delays the high-priority task because the low task cannot finish and release the lock."
    ],
    "explanation": "This is the classic **Priority Inversion** hazard. The medium-priority task does not even use the shared mutex, yet it prevents the low-priority task from finishing and releasing the mutex, thereby indefinitely delaying the high-priority task past its hard deadline. The kernel solution is **Priority Inheritance Protocol (PIP)**: whenever a high-priority task blocks on a mutex held by a low-priority task, the kernel temporarily boosts the low-priority task's priority to match the high-priority task, preventing intermediate tasks from preempting it until the mutex is released."
  },
  {
    "id": "os-prac-1-5-1",
    "statement": "Consider the following C code snippet executed in a Linux terminal: `int main() { fork(); fork(); fork(); return 0; }`. Assuming all system calls succeed, calculate the total number of child processes created by this program.",
    "type": "Numerical",
    "category": "Numerical",
    "interactionType": "numerical",
    "difficulty": "Foundation",
    "topicId": "os-topic-1-5",
    "lessonId": "os-les-1-5-3",
    "numericalAnswer": {
      "value": 7,
      "unit": "child processes",
      "tolerance": 0,
      "formula": "Total processes = 2^k; Child processes = 2^k - 1 (where k is number of fork calls = 3)",
      "solutionSteps": [
        "Step 1: Each fork() call doubles the number of active processes by duplicating the calling process's address space.",
        "Step 2: Before fork 1: 1 process. After fork 1: 2 processes.",
        "Step 3: After fork 2: 2 * 2 = 4 processes.",
        "Step 4: After fork 3: 4 * 2 = 8 total processes in the system.",
        "Step 5: The question asks for child processes created, excluding the initial parent process: 8 - 1 = 7 child processes."
      ]
    },
    "hints": [
      "Each fork splits every active process into parent and child.",
      "Remember to subtract the original parent process from the total process count."
    ],
    "explanation": "With k sequential fork() invocations, total processes created is 2^k = 2^3 = 8 processes. Since 1 of these is the original parent process that launched the program, the total number of new child processes created is 8 - 1 = 7."
  },
  {
    "id": "os-prac-1-5-2",
    "statement": "When a user executes the shell pipeline `cat data.txt | grep error`, how does the shell wire the output of the first process to the input of the second process?",
    "type": "Application",
    "category": "Scenario-based",
    "interactionType": "scenario",
    "difficulty": "Intermediate",
    "topicId": "os-topic-1-5",
    "lessonId": "os-les-1-5-4",
    "stepByStepSolution": [
      "1. The shell calls the `pipe(pipefd)` system call. The kernel allocates a unidirectional in-memory circular buffer (typically 64 KB) and returns two new file descriptors: `pipefd[0]` (read end) and `pipefd[1]` (write end).",
      "2. The shell calls `fork()` to create the child process for `cat`. Inside child 1: it calls `dup2(pipefd[1], STDOUT_FILENO)` (redirecting stdout descriptor 1 to the pipe's write end), closes unused `pipefd[0]`, and calls `execve(\"/bin/cat\", ...)`.",
      "3. The shell calls `fork()` again to create the child process for `grep`. Inside child 2: it calls `dup2(pipefd[0], STDIN_FILENO)` (redirecting stdin descriptor 0 to the pipe's read end), closes unused `pipefd[1]`, and calls `execve(\"/bin/grep\", ...)`.",
      "4. The parent shell closes both pipe ends (`pipefd[0]` and `pipefd[1]`) and calls `waitpid()` on both child PIDs.",
      "5. When `cat` writes bytes to stdout (fd 1), the kernel copies them into the ring buffer. When `grep` reads from stdin (fd 0), the kernel reads from the ring buffer. If the buffer fills, `cat` blocks; if it is empty, `grep` blocks."
    ],
    "hints": [
      "Recall the role of pipe(), fork(), and dup2() in UNIX IPC.",
      "Standard file descriptors: 0 is STDIN, 1 is STDOUT, 2 is STDERR."
    ],
    "explanation": "The shell coordinates UNIX pipelines using `pipe()`, `fork()`, and `dup2()`. It creates an in-memory kernel buffer with two descriptors via `pipe()`. In the child processes, `dup2()` replaces file descriptor 1 (STDOUT) of `cat` with the write end of the pipe, and replaces file descriptor 0 (STDIN) of `grep` with the read end of the pipe. The kernel handles synchronization: if the pipe buffer fills, the writer blocks; if the pipe is empty, the reader blocks."
  },
  {
    "id": "os-prac-1-6-1",
    "statement": "A programmer compiles and runs a user-space C program containing inline assembly: `asm volatile(\"cli\");` (Clear Interrupt Flag). What happens when the CPU attempts to execute this instruction in User Mode (Ring 3)?",
    "type": "Conceptual",
    "category": "Scenario-based",
    "interactionType": "mcq",
    "difficulty": "Foundation",
    "topicId": "os-topic-1-6",
    "lessonId": "os-les-1-6-3",
    "options": [
      "The CPU disables interrupts, freezing all hardware timers until the program exits.",
      "The CPU ignores the instruction as a no-op (NOP) and continues to the next instruction.",
      "The CPU hardware detects CPL=3, refuses execution, and raises a General Protection Fault (#GP, Vector 13), causing the kernel to terminate the process with SIGSEGV.",
      "The CPU reboots the motherboard into BIOS setup mode."
    ],
    "correctOptionIndex": 2,
    "hints": [
      "cli is a privileged instruction that controls the global interrupt flag (IF).",
      "Think about what hardware privilege violations produce in x86 silicon."
    ],
    "explanation": "`cli` is a strictly privileged instruction. The CPU hardware validates the Current Privilege Level (CPL). Because the code is executing in User Mode (CPL=3), the processor logic refuses to execute the opcode and automatically fires a General Protection Fault exception (`#GP`, Vector 13). The kernel's `#GP` trap handler catches the fault, checks that it originated from user space, generates a `SIGSEGV` (Segmentation Violation) signal, and kills the process, dumping core."
  },
  {
    "id": "os-prac-1-6-2",
    "statement": "On an x86-64 processor, where does the CPU hardware physically inspect whether it is currently executing in privileged Kernel Mode (Ring 0) versus unprivileged User Mode (Ring 3)?",
    "type": "Application",
    "category": "Analytical",
    "interactionType": "mcq",
    "difficulty": "Intermediate",
    "topicId": "os-topic-1-6",
    "lessonId": "os-les-1-6-2",
    "options": [
      "The highest bit of register RAX.",
      "The lowest 2 bits (bits 0 and 1) of the Code Segment selector register (CS), representing the Current Privilege Level (CPL).",
      "A flag bit inside the L1 CPU data cache.",
      "The CMOS battery voltage level."
    ],
    "correctOptionIndex": 1,
    "hints": [
      "Look up CPL and the x86 Segment Selector bit layout.",
      "00 indicates Ring 0; 11 indicates Ring 3."
    ],
    "explanation": "On x86 hardware, the Current Privilege Level (CPL) is stored in the least significant 2 bits (bits 0 and 1) of the Code Segment register (CS). When CS ends in `00` (binary 0), the CPU is in Ring 0 (Kernel Mode). When CS ends in `11` (binary 3), the CPU is in Ring 3 (User Mode). Because segment registers can only be modified via privileged instructions or hardware-validated trap gates, user code cannot forge this status."
  },
  {
    "id": "os-prac-1-6-3",
    "statement": "On a server with a CPU operating at 3.0 GHz (3 x 10^9 cycles/sec), a context switch takes 3,000 CPU clock cycles. If the OS scheduler performs 1,000 context switches per second, what fraction and percentage of the total CPU capacity is consumed purely by context-switch overhead?",
    "type": "Numerical",
    "category": "Numerical",
    "interactionType": "numerical",
    "difficulty": "Foundation",
    "topicId": "os-topic-1-6",
    "lessonId": "os-les-1-6-6",
    "numericalAnswer": {
      "value": 0.1,
      "unit": "%",
      "tolerance": 0.01,
      "formula": "Overhead % = ((Context Switches/sec * Cycles per switch) / CPU Frequency) * 100",
      "solutionSteps": [
        "Step 1: Total CPU cycles per second = 3.0 GHz = 3,000,000,000 cycles/sec.",
        "Step 2: Total cycles spent on context switches per second = 1,000 switches/sec * 3,000 cycles/switch = 3,000,000 cycles/sec.",
        "Step 3: Fraction of CPU consumed = 3,000,000 / 3,000,000,000 = 1 / 1,000 = 0.001.",
        "Step 4: Percentage = 0.001 * 100% = 0.10%."
      ]
    },
    "hints": [
      "Calculate total switch cycles per second first.",
      "Divide by clock speed in Hertz (3.0 * 10^9)."
    ],
    "explanation": "At 3.0 GHz, the CPU completes 3 billion cycles every second. 1,000 context switches at 3,000 cycles each consume 3,000,000 cycles per second. The overhead ratio is 3,000,000 / 3,000,000,000 = 0.001 = 0.10% of total CPU time. This demonstrates why modern OS schedulers can comfortably context-switch 1,000 times/sec while leaving 99.9% of CPU throughput for user instructions."
  },
  {
    "id": "os-prac-1-7-1",
    "statement": "What occurs inside the Linux kernel if a user-space application maliciously or accidentally passes a kernel-space memory address (e.g., 0xFFFF888000000000) as the destination buffer to `read(fd, bad_ptr, 1024)`?",
    "type": "Conceptual",
    "category": "Scenario-based",
    "interactionType": "mcq",
    "difficulty": "Intermediate",
    "topicId": "os-topic-1-7",
    "lessonId": "os-les-1-7-4",
    "options": [
      "The kernel overwrites its own code segment and panics immediately.",
      "The kernel validates the pointer using `access_ok()`, detects that the address falls above the user-space boundary (`TASK_SIZE`), and aborts the system call, returning `-EFAULT` (errno 14).",
      "The CPU triggers a hardware reboot.",
      "The read succeeds because the kernel runs in Ring 0 and has access to all memory."
    ],
    "correctOptionIndex": 1,
    "hints": [
      "Recall the access_ok() and copy_to_user() security invariants.",
      "EFAULT indicates a bad address."
    ],
    "explanation": "The kernel never trusts user-provided pointers. Before copying data to user space, the kernel invokes `access_ok(bad_ptr, 1024)`. This check verifies that the entire address range `[ptr, ptr + size)` lies strictly below the user-kernel split boundary (`TASK_SIZE`). Because `0xFFFF888000000000` is in supervisor memory, `access_ok()` returns false, and the system call safely terminates with return value `-EFAULT` (errno: Bad address), preventing kernel memory corruption."
  },
  {
    "id": "os-prac-1-7-2",
    "statement": "How does the Linux `vDSO` (virtual Dynamic Shared Object) mechanism allow system calls like `clock_gettime()` or `gettimeofday()` to achieve sub-nanosecond latencies compared to standard system calls?",
    "type": "Analytical",
    "category": "Analytical",
    "interactionType": "short-answer",
    "difficulty": "Advanced",
    "topicId": "os-topic-1-7",
    "lessonId": "os-les-1-7-6",
    "stepByStepSolution": [
      "1. A standard system call requires a CPU hardware trap (`syscall` instruction), forcing a privilege ring elevation (Ring 3 to Ring 0), stack swap, and register saving (~50-100 nanoseconds).",
      "2. For read-only timekeeping queries, this trap overhead is unnecessary if the data can be read safely.",
      "3. The Linux kernel maintains an in-memory page containing updated wall-clock time and hardware TSC (Time Stamp Counter) calibration parameters (`vvar` page).",
      "4. The kernel maps this memory page as READ-ONLY directly into every user process's virtual address space, alongside a small shared library called the `vDSO`.",
      "5. When the application calls `clock_gettime()`, glibc invokes the vDSO implementation, which reads the current CPU timestamp counter (`rdtsc`) and computes the exact time purely in User Space (Ring 3) using simple memory reads and arithmetic.",
      "6. Zero ring transitions, zero kernel stack switches, and zero CPU traps occur, reducing call latency from ~70ns to under ~3ns!"
    ],
    "hints": [
      "Think about read-only kernel data mapped into user space.",
      "Does reading the current time strictly require supervisor hardware privilege?"
    ],
    "explanation": "The vDSO (virtual Dynamic Shared Object) maps a small kernel page containing calibrated time parameters directly into user virtual memory with read-only permissions. When a program requests the current time, the vDSO code reads the CPU's TSC register and calculates the wall-clock time entirely in User Space (Ring 3). This avoids the expensive `syscall`/`sysret` hardware trap entirely, dropping latency from ~70 nanoseconds to under 3 nanoseconds."
  },
  {
    "id": "os-prac-1-8-1",
    "statement": "A 10-Gigabit Ethernet Network Interface Card (10 GbE) is receiving minimum-sized 64-byte Ethernet frames back-to-back at full line rate. The maximum packet arrival rate is 14.88 million packets per second. If the kernel handled each packet with a dedicated hardware interrupt requiring 5 microseconds of CPU time, what would happen, and how does the Linux NAPI (New API) polling architecture solve it?",
    "type": "Numerical",
    "category": "Numerical",
    "interactionType": "scenario",
    "difficulty": "Advanced",
    "topicId": "os-topic-1-8",
    "lessonId": "os-les-1-8-5",
    "stepByStepSolution": [
      "Step 1: At 14.88 million packets/second, an incoming packet arrives every 1 / (14.88 * 10^6) ≈ 67.2 nanoseconds.",
      "Step 2: If each interrupt takes 5 microseconds (5,000 ns) of CPU time, the CPU can handle at most 1 / (5 * 10^-6) = 200,000 interrupts per second.",
      "Step 3: The arrival rate (14.88M pkts/s) exceeds handling capacity by 74x! If interrupts were used, the CPU would spend 100% of its time servicing interrupt handlers without processing packet data, a pathological collapse known as 'Receive Livelock'.",
      "Step 4: Linux NAPI solution: On the first packet arrival, the NIC fires an interrupt. The kernel ISR immediately DISABLES interrupts on that NIC, schedules a softirq (ksoftirqd), and switches to POLLING mode.",
      "Step 5: The kernel driver polls the NIC's circular DMA ring buffer in batches (e.g., 64 packets at a time). Once the buffer is emptied, NAPI re-enables hardware interrupts, preventing receive livelock."
    ],
    "hints": [
      "Compare 67 nanoseconds arrival time with 5,000 nanoseconds interrupt processing time.",
      "Research 'Receive Livelock' and why high-speed networking switches from interrupt-driven to poll-driven I/O."
    ],
    "explanation": "At 14.88 million packets/sec, traditional interrupt-driven I/O would trigger an 'interrupt storm' and cause **Receive Livelock**—the CPU spends all its cycles acknowledging interrupts and never executes user network applications. Linux solves this with **NAPI (New API)**: the first packet triggers an interrupt, which disables subsequent NIC interrupts and switches the driver into a polling loop that drains packets from DMA ring buffers in batches. Interrupts are only re-enabled once the queue is clear."
  },
  {
    "id": "os-prac-1-8-2",
    "statement": "Classify the following four CPU events into either a Fault, a Trap, an Abort, or an Asynchronous Hardware Interrupt: (1) A thread executes a division by zero; (2) A debugger executes `int 3` breakpoint; (3) The CPU detects an uncorrectable ECC DRAM parity error; (4) The network card asserts a PCIe line upon packet DMA arrival.",
    "type": "Conceptual",
    "category": "Conceptual",
    "interactionType": "mcq",
    "difficulty": "Intermediate",
    "topicId": "os-topic-1-8",
    "lessonId": "os-les-1-8-2",
    "options": [
      "(1) Fault, (2) Trap, (3) Abort, (4) Hardware Interrupt",
      "(1) Trap, (2) Fault, (3) Hardware Interrupt, (4) Abort",
      "(1) Abort, (2) Trap, (3) Fault, (4) Hardware Interrupt",
      "(1) Fault, (2) Abort, (3) Trap, (4) Hardware Interrupt"
    ],
    "correctOptionIndex": 0,
    "hints": [
      "Faults save the RIP of the instruction that caused them so it can be retried.",
      "Traps save the RIP of the NEXT instruction.",
      "Aborts are unrecoverable hardware failures.",
      "Hardware interrupts are external and asynchronous."
    ],
    "explanation": "In x86 CPU architecture: (1) Division by zero is a **Fault** (Vector 0; RIP points to the div instruction); (2) `int 3` is a **Trap** (Vector 3; intentionally executed by debuggers, RIP points to next instruction); (3) Uncorrectable ECC failure is an **Abort** (Machine Check Exception `#MC`, Vector 18; unrecoverable hardware state); (4) Packet DMA arrival is an **Asynchronous Hardware Interrupt** (originating from the PCIe bus outside the CPU core)."
  },
  {
    "id": "os-prac-1-9-1",
    "statement": "In a monolithic kernel (Linux), a file write requires 1 system call transition (2 CPU ring switches, latency 0.15 microseconds). In a pure microkernel, a file write requires communicating between the application, the VFS server, the disk driver server, and the memory manager via IPC, requiring 8 ring transitions, 4 context switches, and 4 TLB flushes totaling 2.70 microseconds. Calculate the latency slowdown factor of the microkernel for this operation.",
    "type": "Numerical",
    "category": "Numerical",
    "interactionType": "numerical",
    "difficulty": "Foundation",
    "topicId": "os-topic-1-9",
    "lessonId": "os-les-1-9-4",
    "numericalAnswer": {
      "value": 18,
      "unit": "times slower",
      "tolerance": 0.5,
      "formula": "Slowdown Factor = Microkernel Latency (2.70 us) / Monolithic Latency (0.15 us)",
      "solutionSteps": [
        "Step 1: Monolithic execution latency = 0.15 us.",
        "Step 2: Microkernel execution latency = 2.70 us.",
        "Step 3: Slowdown factor = 2.70 / 0.15 = 18.0x."
      ]
    },
    "hints": [
      "Divide 2.70 by 0.15.",
      "Understand why microkernel IPC context switching introduces latency overhead."
    ],
    "explanation": "The microkernel takes 2.70 us compared to 0.15 us for the monolithic kernel, representing an 18x slowdown for this I/O path. This mathematically illustrates the central dilemma of the Tanenbaum-Torvalds debate: monolithic kernels achieve high I/O throughput because subsystems communicate via direct C function calls in Ring 0, whereas microkernels pay IPC, context switch, and TLB invalidation penalties to pass messages across isolated address spaces."
  },
  {
    "id": "os-prac-1-9-2",
    "statement": "A third-party Wi-Fi device driver contains a bug that triggers a NULL-pointer dereference. Compare the blast radius of this failure on a Monolithic Kernel (Linux) versus a formally verified Microkernel (seL4 / Minix 3).",
    "type": "Analytical",
    "category": "Scenario-based",
    "interactionType": "scenario",
    "difficulty": "Intermediate",
    "topicId": "os-topic-1-9",
    "lessonId": "os-les-1-9-3",
    "stepByStepSolution": [
      "Monolithic Kernel (Linux): The Wi-Fi driver executes inside supervisor Ring 0 sharing the kernel address space. When it dereferences NULL, it causes a kernel Page Fault inside Ring 0. Because the kernel cannot safely recover from a Ring 0 fault, it triggers a Kernel Panic / Oops. The entire computer immediately halts, dropping all active network connections and database transactions.",
      "Microkernel (seL4 / Minix 3): The Wi-Fi driver runs as an unprivileged user process in Ring 3. When it dereferences NULL, the microkernel catches the exception as an ordinary user segmentation fault. The microkernel terminates the rogue Wi-Fi process.",
      "Recovery: The microkernel's Reincarnation Server detects that the Wi-Fi driver crashed, re-initializes its hardware registers, and restarts the driver daemon in under 5 milliseconds. The core OS, filesystems, and unrelated user applications continue running with zero downtime."
    ],
    "hints": [
      "In monolithic kernels, all drivers share Ring 0 address space.",
      "In microkernels, drivers run in isolated user address spaces with minimal privileges."
    ],
    "explanation": "In Linux (monolithic), third-party drivers run in Ring 0; a driver crash triggers a kernel panic that brings down the entire physical server. In a microkernel (like Minix 3 or seL4), drivers run as isolated user processes in Ring 3. A crashed driver terminates like any user program; the operating system's process manager cleanly restarts the driver server without affecting other services or crashing the machine."
  },
  {
    "id": "os-prac-1-10-1",
    "statement": "On x86 power-on, the CPU initializes in 16-bit Real Mode with Code Segment CS = 0xF000 and Instruction Pointer IP = 0xFFF0. Using real-mode segment arithmetic: Physical Address = (CS * 16) + IP, calculate the exact physical memory address (in hexadecimal) of the Reset Vector.",
    "type": "Numerical",
    "category": "Numerical",
    "interactionType": "numerical",
    "difficulty": "Foundation",
    "topicId": "os-topic-1-10",
    "lessonId": "os-les-1-10-1",
    "numericalAnswer": {
      "value": 1048560,
      "unit": "decimal (0xFFFF0 hex)",
      "tolerance": 0,
      "formula": "Physical Address = (0xF000 * 16) + 0xFFF0 = 0xF0000 + 0xFFF0 = 0xFFFF0 (1,048,560 decimal)",
      "solutionSteps": [
        "Step 1: Multiply CS by 16 (shift left by 4 bits in binary): 0xF000 * 0x10 = 0xF0000.",
        "Step 2: Add IP offset: 0xF0000 + 0xFFF0 = 0xFFFF0.",
        "Step 3: Convert 0xFFFF0 to decimal: (15 * 16^4) + (15 * 16^3) + (15 * 16^2) + (15 * 16^1) + 0 = 983,040 + 61,440 + 3,840 + 240 = 1,048,560.",
        "Step 4: Notice that 1 MB is 2^20 = 1,048,576 bytes. The address 0xFFFF0 (1,048,560) is exactly 16 bytes below the 1MB physical boundary."
      ]
    },
    "hints": [
      "In hex, multiplying by 16 is appending a zero: 0xF000 becomes 0xF0000.",
      "Add 0xFFF0 to 0xF0000."
    ],
    "explanation": "In x86 real-mode segment addressing, Physical Address = (CS << 4) + IP = (0xF000 << 4) + 0xFFF0 = 0xF0000 + 0xFFF0 = 0xFFFF0 (decimal 1,048,560). This address sits exactly 16 bytes below the 1MB physical boundary, where motherboard hardware maps the non-volatile SPI flash ROM containing the initial jump into firmware."
  },
  {
    "id": "os-prac-1-10-2",
    "statement": "A Linux server boots past GRUB, begins kernel decompression, and abruptly halts with: `Kernel panic - not syncing: VFS: Unable to mount root fs on unknown-block(0,0)`. Which of the following is the most likely root cause?",
    "type": "Conceptual",
    "category": "Scenario-based",
    "interactionType": "mcq",
    "difficulty": "Intermediate",
    "topicId": "os-topic-1-10",
    "lessonId": "os-les-1-10-8",
    "options": [
      "The CPU's Level 1 data cache has failed its POST diagnostic test.",
      "The initramfs image is missing, corrupted, or lacks the necessary NVMe/storage controller driver required to access the root disk partition.",
      "The user typed an incorrect root password during login.",
      "The monitor display cable is disconnected from the GPU."
    ],
    "correctOptionIndex": 1,
    "hints": [
      "The kernel has booted, but VFS cannot mount the root filesystem.",
      "Recall the 'chicken-and-egg' storage problem solved by initramfs."
    ],
    "explanation": "This classic kernel panic occurs when the kernel cannot mount the root filesystem (`/`). In modern Linux, the root storage driver (such as `nvme.ko` or `ext4.ko`) is packaged inside the initial RAM filesystem (`initramfs`). If the initramfs is missing, corrupted, or if the kernel command line specifies an invalid root UUID (`root=UUID=...`), the kernel cannot access the block storage device and panics with `unknown-block(0,0)`."
  },
  {
    "id": "os-prac-1-10-3",
    "statement": "Why does the Master Boot Record (MBR) partitioning scheme fail to support hard drives larger than 2.2 Terabytes?",
    "type": "Analytical",
    "category": "Analytical",
    "interactionType": "mcq",
    "difficulty": "Foundation",
    "topicId": "os-topic-1-10",
    "lessonId": "os-les-1-10-5",
    "options": [
      "Because MBR cables only carry 32 watts of electrical power.",
      "Because MBR stores sector addresses as 32-bit integers; with standard 512-byte sectors, 2^32 * 512 bytes = 2.199 TB.",
      "Because BIOS can only count up to 1 million sectors.",
      "Because MBR partition entries are encrypted with 32-bit RSA keys."
    ],
    "correctOptionIndex": 1,
    "hints": [
      "Calculate 2^32 multiplied by 512 bytes.",
      "Recall that GPT replaces 32-bit LBA with 64-bit LBA."
    ],
    "explanation": "In MBR partition tables, starting sector addresses and sector counts are stored in 32-bit fields. With traditional 512-byte sectors: 2^32 sectors * 512 bytes/sector = 2,199,023,255,552 bytes ≈ 2.199 TB. Any disk space beyond this boundary cannot be addressed by 32-bit MBR pointers. GPT (GUID Partition Table) overcomes this by using 64-bit Logical Block Addressing (LBA), scaling maximum capacity to 9.4 Zettabytes."
  }
];

// Topic to Practice Question mapping
export const topicPracticeMap: Record<string, CurriculumQuestion[]> = {
  "os-topic-1-1": [
    module01Questions["os-q-1"],
    module01Questions["os-q-2"],
    module01PracticeQuestions[0],
    module01PracticeQuestions[1],
    module01PracticeQuestions[2],
  ],
  "os-topic-1-2": [
    module01Questions["os-q-4"],
    module01PracticeQuestions[3],
    module01PracticeQuestions[4],
    module01PracticeQuestions[5],
  ],
  "os-topic-1-3": [
    module01Questions["os-q-7"],
    module01Questions["os-q-8"],
    module01Questions["os-q-9"],
    module01PracticeQuestions[6],
    module01PracticeQuestions[7],
  ],
  "os-topic-1-4": [
    module01Questions["os-q-10"],
    module01Questions["os-q-11"],
    module01Questions["os-q-12"],
    module01PracticeQuestions[8],
    module01PracticeQuestions[9],
  ],
  "os-topic-1-5": [
    module01Questions["os-q-13"],
    module01Questions["os-q-16"],
    module01PracticeQuestions[10],
    module01PracticeQuestions[11],
  ],
  "os-topic-1-6": [
    module01Questions["os-q-5"],
    module01Questions["os-q-17"],
    module01Questions["os-q-18"],
    module01Questions["os-q-19"],
    module01Questions["os-q-20"],
    module01Questions["os-q-21"],
    module01PracticeQuestions[12],
    module01PracticeQuestions[13],
    module01PracticeQuestions[14],
  ],
  "os-topic-1-7": [
    module01Questions["os-q-24"],
    module01Questions["os-q-25"],
    module01Questions["os-q-26"],
    module01Questions["os-q-27"],
    module01PracticeQuestions[15],
    module01PracticeQuestions[16],
  ],
  "os-topic-1-8": [
    module01Questions["os-q-6"],
    module01Questions["os-q-28"],
    module01PracticeQuestions[17],
    module01PracticeQuestions[18],
  ],
  "os-topic-1-9": [
    module01Questions["os-q-3"],
    module01Questions["os-q-29"],
    module01PracticeQuestions[19],
    module01PracticeQuestions[20],
  ],
  "os-topic-1-10": [
    module01Questions["os-q-6"],
    module01Questions["os-q-31"],
    module01Questions["os-q-33"],
    module01Questions["os-q-34"],
    module01PracticeQuestions[21],
    module01PracticeQuestions[22],
    module01PracticeQuestions[23],
  ],
};

export function getPracticeQuestionsForTopic(
  topicId: string,
  lessonId?: string
): CurriculumQuestion[] {
  const allForTopic = topicPracticeMap[topicId] || [];
  if (!lessonId) return allForTopic;

  // Prioritize questions mapped to this lesson, but always ensure at least topic questions are visible
  const lessonSpecific = allForTopic.filter((q) => q.lessonId === lessonId);
  if (lessonSpecific.length > 0) return lessonSpecific;

  return allForTopic;
}
