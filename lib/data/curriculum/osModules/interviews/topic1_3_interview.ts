import { LessonInterviewData } from "../../types";

export const topic1_3_interview: Record<string, LessonInterviewData> = {
  "os-les-1-3-1": {
    lessonId: "os-les-1-3-1",
    topicId: "os-topic-1-3",
    quickExplanation: {
      whatItIs: "Process and CPU management is the OS subsystem responsible for creating, scheduling, synchronizing, and terminating processes and threads across physical CPU cores.",
      whyItExists: "Computers have fewer CPU cores than running applications. The OS must fairly and preemptively share CPU cycles while preserving execution state between switches.",
      howItWorks: "The kernel maintains a Process Control Block (`task_struct` in Linux) for each process. A hardware timer interrupt periodically triggers the scheduler, which chooses the next task and executes a context switch.",
      criticalMechanism: "Context Switching: saving architectural registers (program counter, stack pointer, general-purpose registers) and updating memory context (CR3 register).",
      realWorldConnection: "Linux CFS (Completely Fair Scheduler) uses a Red-Black tree to schedule thousands of server threads with sub-microsecond lookup overhead.",
      misconceptions: [
        "Thinking a process and a thread are identical (processes have private address spaces; threads share the process address space).",
        "Believing context switches are free (they cost thousands of CPU cycles in pipeline flushes and cache misses)."
      ]
    },
    visual: {
      title: "Process State Machine & CPU Scheduling",
      caption: "Transitions between Ready, Running, and Waiting states.",
      visualType: "ascii",
      asciiArt: `           [ NEW ]
              |
              v (Admitted to Runqueue)
+--------> [ READY ] <---------------------+
|             |                            |
|             v (Scheduler Dispatch)       | (Timer Quantum Preempt)
|          [ RUNNING ]                     |
|             |                            |
|             +------------+               |
|                          | (Blocking I/O)|
|                          v               |
|                     [ WAITING ] ---------+
|                     (Event Wait)  (I/O Complete)
v (Process Exit)
[ TERMINATED ] (Zombie until reaped)`,
      keyInsights: [
        "Only one thread per CPU core can be in the RUNNING state at any instant.",
        "Blocking I/O moves the process to WAITING, yielding the CPU to other READY tasks.",
        "Context switching restores the saved CPU register state seamlessly."
      ]
    },
    questions: [
      {
        id: "os-int-1-3-1-q1",
        question: "What is a Process Control Block (PCB) and what essential information does it store?",
        difficulty: "Foundation",
        conciseAnswer: "The PCB is the kernel data structure that encapsulates all execution metadata for a process: Process ID (PID), process state (Ready/Running/Waiting), CPU register context (PC, SP, registers), memory management pointers (page table base), open file descriptor tables, and scheduling priority.",
        inDepthExplanation: "In Linux, the PCB is represented by `struct task_struct`. When the OS switches away from a process, the hardware register values must be preserved; otherwise, when the process resumes, its execution state would be corrupted. The PCB stores these saved registers, alongside credentials (UID, GID), signal masks, parent/child pointers, resource limits, and CPU accounting statistics.",
        executionTraceOrExample: "During a timer interrupt: the CPU pushes registers onto the per-thread kernel stack; the scheduler saves the stack pointer `%rsp` into `task_struct->thread.sp`, and loads the new task's stack pointer to restore its registers.",
        followUps: [
          "Interviewer: 'What is a zombie process in Unix?' -> Candidate: 'A zombie is a process that has terminated execution (`exit()`), but its PCB remains in memory so its parent can read its exit status code via `wait()`. Once reaped, its PCB is freed.'"
        ]
      },
      {
        id: "os-int-1-3-1-q2",
        question: "Why is context switching between two threads of the same process faster than switching between two distinct processes?",
        difficulty: "Intermediate",
        conciseAnswer: "Because threads in the same process share the same virtual address space. Switching between them only requires saving and restoring CPU registers and stack pointers, without reloading the page table base register (CR3) or flushing the Translation Lookaside Buffer (TLB).",
        inDepthExplanation: "A process context switch requires two major steps: (1) Switching architectural register state, and (2) Switching the memory management context by loading a new page directory address into register CR3 (or TTBR0). Loading CR3 invalidates non-global entries in the Translation Lookaside Buffer (TLB). Subsequent memory accesses suffer severe TLB misses until the translation cache warms up. Thread switching within the same process avoids reloading CR3, preserving warm TLB entries and avoiding memory translation penalties.",
        executionTraceOrExample: "Process switch: ~1,000–3,000ns + high cache/TLB miss penalty. Thread switch: ~500–1,000ns with warm TLB and shared data cache.",
        followUps: [
          "Interviewer: 'How does Process-Context Identifiers (PCID) optimize process context switches on x86?' -> Candidate: 'PCID tags TLB entries with an address space ID (0..4095), allowing the CPU to switch CR3 without flushing TLB entries belonging to other processes.'"
        ]
      }
    ]
  },
  "os-les-1-3-2": {
    lessonId: "os-les-1-3-2",
    topicId: "os-topic-1-3",
    quickExplanation: {
      whatItIs: "Main memory management is the OS subsystem that manages physical RAM, translates virtual addresses to physical frames, allocates heap memory, and protects address spaces.",
      whyItExists: "Physical RAM is a finite resource shared by hundreds of programs. The OS must provide contiguous virtual address spaces while eliminating external fragmentation and preventing unauthorized access.",
      howItWorks: "The OS divides physical memory into fixed-size frames (typically 4 KB) and configures multi-level page tables. The hardware MMU translates virtual addresses to physical frames during instruction execution.",
      criticalMechanism: "Demand Paging and Page Faults: allocating physical frames on-demand and swapping cold pages to secondary storage when RAM is exhausted.",
      realWorldConnection: "The Linux Buddy Allocator manages physical page frames in power-of-two blocks (orders 0 to 10), while the SLUB allocator manages fine-grained kernel object allocations.",
      misconceptions: [
        "Thinking `malloc()` directly calls the kernel for every allocation (glibc manages user heap arenas, only calling `brk`/`mmap` when arenas run dry).",
        "Believing virtual memory allows infinite memory usage (limited by physical RAM plus swap partition space)."
      ]
    },
    visual: {
      title: "Virtual Memory Paging Hierarchy",
      caption: "Translation of virtual addresses to physical RAM frames.",
      visualType: "ascii",
      asciiArt: `VIRTUAL ADDRESS (e.g. 0x00401A20)
[ Page Number: 0x00401 ] | [ Offset: 0xA20 ]
            |                      |
            v                      |
+----------------------+           |
| PAGE TABLE ENTRY     |           |
| Physical Frame: 0x8F |           |
+----------------------+           |
            |                      |
            v                      v
PHYSICAL RAM: [ Frame: 0x8F ] + [ Offset: 0xA20 ] = Physical Address 0x8FA20`,
      keyInsights: [
        "Paging completely eliminates external fragmentation by using fixed 4 KB blocks.",
        "Non-contiguous physical page frames appear completely contiguous in virtual space.",
        "The page offset is preserved unchanged during virtual-to-physical translation."
      ]
    },
    questions: [
      {
        id: "os-int-1-3-2-q1",
        question: "Explain the difference between internal and external memory fragmentation.",
        difficulty: "Foundation",
        conciseAnswer: "Internal fragmentation occurs when allocated memory blocks are larger than the requested size, leaving wasted, unusable space inside the allocated block (e.g., allocating a 4 KB page for a 200-byte structure). External fragmentation occurs when total free memory is sufficient to satisfy a request, but the free space is broken into small, non-contiguous blocks, making contiguous allocation impossible.",
        inDepthExplanation: "Paging solves external fragmentation because any free 4 KB physical frame can be assigned anywhere in virtual space; memory does not need to be physically contiguous. However, paging suffers from internal fragmentation in the final page of an allocation (on average, half a page = 2 KB wasted per allocation). Variable-size partition schemes (like early segmentation or bare-metal dynamic allocators) suffer from external fragmentation as programs allocate and free memory chunks of varying sizes.",
        executionTraceOrExample: "Process requests 4,200 bytes. The OS allocates two 4 KB pages (8,192 bytes total). Wasted space = 8,192 - 4,200 = 3,992 bytes of internal fragmentation.",
        followUps: [
          "Interviewer: 'How does the Linux SLAB/SLUB allocator combat internal fragmentation for small kernel objects?' -> Candidate: 'SLUB carves full 4 KB pages into pre-sized object caches (e.g., 32-byte, 64-byte, 128-byte slots) matching exact kernel struct sizes like `task_struct` and `inode`.'"
        ]
      },
      {
        id: "os-int-1-3-2-q2",
        question: "What is a Page Fault, and what are the detailed steps the kernel takes to handle a minor page fault versus a major page fault?",
        difficulty: "Intermediate",
        conciseAnswer: "A Page Fault (#PF) is a CPU hardware exception raised when an instruction accesses a virtual address whose Page Table Entry has Present bit = 0. A minor (soft) fault is resolved in RAM without disk I/O (e.g., allocating a zeroed page or resolving Copy-On-Write). A major (hard) fault requires fetching page data from persistent disk storage (swap space or executable file).",
        inDepthExplanation: "When a page fault occurs: 1. CPU saves `%rip`, pushes error code, and stores faulting address in register CR2. 2. CPU jumps to kernel `do_page_fault()`. 3. Kernel verifies if address is valid within process `vm_area_struct`. 4. If address is invalid -> send SIGSEGV. 5. If valid and minor fault: allocate a free physical page frame from the buddy allocator, update PTE Present=1, flush local TLB. 6. If valid and major fault: issue block I/O request to read 4 KB from disk, put process into WAITING state. 7. When disk interrupt arrives, update PTE and move process to READY. 8. Execute `iretq` to restart faulting instruction.",
        executionTraceOrExample: "Major page fault latency: ~5–10 milliseconds (SSD/disk read) vs Minor page fault latency: ~2–5 microseconds (pure DRAM pointer manipulation).",
        followUps: [
          "Interviewer: 'Why must the CPU support instruction restart during a page fault?' -> Candidate: 'Because the fault occurs mid-instruction (e.g., during operand fetch). The instruction did not complete, so the OS must return to the exact `%rip` of the faulting instruction to re-execute it once the page is in RAM.'"
        ]
      }
    ]
  },
  "os-les-1-3-3": {
    lessonId: "os-les-1-3-3",
    topicId: "os-topic-1-3",
    quickExplanation: {
      whatItIs: "File and secondary-storage management is the OS subsystem that organizes persistent, non-volatile storage media (SSDs, HDDs) into structured files, directories, and access permissions.",
      whyItExists: "Raw storage media consist of unstructured physical blocks or flash erase blocks. Applications need persistent, named, hierarchical data storage with access control and crash consistency.",
      howItWorks: "The filesystem creates an index of metadata (Inodes) containing file sizes, permissions, and disk block pointers, decoupled from human-readable file names (Dentries).",
      criticalMechanism: "Journaling (Write-Ahead Logging): logging filesystem metadata changes to a dedicated journal before updating on-disk structures, guaranteeing crash consistency.",
      realWorldConnection: "The Linux ext4 and Btrfs filesystems utilize the kernel Page Cache (`struct address_space`), automatically using unused RAM to cache recently read disk blocks for instant sub-microsecond reads.",
      misconceptions: [
        "Thinking a file's name is stored inside its inode (file names are stored in directory data blocks; inodes only store metadata and block pointers).",
        "Believing deleting a file immediately erases its data from disk (deletion unlinks directory entries; blocks are freed only when the hard link count drops to zero and all file descriptors are closed)."
      ]
    },
    visual: {
      title: "File System Metadata Architecture (Inode & Dentry)",
      caption: "Decoupling of directory names, metadata inodes, and data blocks.",
      visualType: "ascii",
      asciiArt: `DIRECTORY BLOCK (e.g. /home/user)
+-------------------------------+
| Name: "report.txt" -> Inode 42|
| Name: "backup.txt" -> Inode 42|  <--- (Hard links point to same Inode!)
+-------------------------------+
                |
                v
INODE 42 (Metadata)
+-------------------------------------------------------------+
| File Size: 8192 bytes | Permissions: 0644 | Hardlinks: 2    |
| Direct Block Pointers: [ Block 1024, Block 1025 ]           |
+-------------------------------------------------------------+
         |                                |
         v                                v
[ Physical Block 1024 ]          [ Physical Block 1025 ]`,
      keyInsights: [
        "Multiple directory entries (hard links) can point to the same physical Inode.",
        "A file is only deleted when its hard link count is 0 AND no open file descriptors exist.",
        "The Page Cache unifies storage block reading with virtual memory pages."
      ]
    },
    questions: [
      {
        id: "os-int-1-3-3-q1",
        question: "Why does deleting a file in Linux ('rm file.txt') not immediately reclaim disk space if another process has the file open?",
        difficulty: "Intermediate",
        conciseAnswer: "Because `rm` calls the `unlink()` system call, which only removes the directory entry and decrements the inode's hard link count (`i_nlink`). The kernel only frees physical disk blocks when `i_nlink == 0` AND the inode's open file reference count (`i_count`) drops to zero.",
        inDepthExplanation: "In UNIX-like systems, a file's lifecycle is governed by two reference counts: (1) `i_nlink`: the number of directory entries pointing to the inode, and (2) `i_count`: the number of active `struct file` objects referencing the inode across running processes. When you execute `rm`, the directory entry is removed and `i_nlink` becomes 0. However, if Process A holds an open file descriptor to it, `i_count > 0`. The process can continue reading and writing to the file normally. Only when Process A calls `close()` (or terminates) does `i_count` reach 0, triggering the filesystem driver to deallocate data blocks and the inode.",
        executionTraceOrExample: "A log file grows to 50 GB. Admin runs `rm app.log`. `df -h` still shows 100% disk usage because the running Java server holds the file descriptor open. Once Java restarts, disk space is instantly reclaimed.",
        followUps: [
          "Interviewer: 'How can you find processes holding deleted files open in Linux?' -> Candidate: 'Run `lsof | grep deleted`, which inspects `/proc/*/fd` to identify open file handles referencing unlinked inodes.'"
        ]
      },
      {
        id: "os-int-1-3-3-q2",
        question: "What is Journaling in file systems, and how does it prevent file system corruption after a sudden power loss?",
        difficulty: "Intermediate",
        conciseAnswer: "Journaling writes metadata modifications to a dedicated circular disk log (the journal) before applying changes to the actual file system structures. If power fails mid-operation, the kernel reads the journal upon reboot, replaying completed transactions and discarding incomplete ones in seconds without scanning the entire disk.",
        inDepthExplanation: "Creating a file requires multiple separate disk writes: allocating an inode, adding a directory entry, and updating the free block bitmap. On a non-journaled filesystem (like ext2), a power cut between step 2 and step 3 leaves metadata in an inconsistent state, requiring a full disk scan (`fsck`) taking hours. Journaling filesystems (ext4, NTFS) use Write-Ahead Logging: the complete operation is written to the journal with a commit checksum. On reboot, the recovery routine checks the journal: if committed, it replays the writes; if uncommitted, it rolls back, guaranteeing consistency in milliseconds.",
        executionTraceOrExample: "Power cut during append: Journal shows uncommitted transaction -> kernel ignores transaction -> filesystem mounts cleanly in 200ms without corrupted metadata.",
        followUps: [
          "Interviewer: 'What is the difference between metadata journaling and full data journaling?' -> Candidate: 'Metadata journaling logs only filesystem structures (fast, but file contents may contain stale data after a crash); data journaling logs both file contents and metadata (crash-safe, but cuts write throughput in half).'"
        ]
      }
    ]
  },
  "os-les-1-3-4": {
    lessonId: "os-les-1-3-4",
    topicId: "os-topic-1-3",
    quickExplanation: {
      whatItIs: "I/O and device management is the OS subsystem that manages communication between CPU/RAM and heterogeneous peripheral hardware (disks, network cards, GPUs, USB devices).",
      whyItExists: "Peripheral devices operate asynchronously, have wildly varying speeds (nanoseconds for RAM to milliseconds for disks), and use proprietary bus protocols. The OS provides uniform device abstractions and efficient data transfer.",
      howItWorks: "The kernel uses Device Drivers, Interrupt Handlers, Direct Memory Access (DMA), and uniform character/block device interfaces.",
      criticalMechanism: "Direct Memory Access (DMA): hardware controllers transfer data directly between peripheral devices and physical RAM without involving the CPU, freeing the processor to execute user code.",
      realWorldConnection: "NVMe over PCIe uses DMA ring buffers (Submission and Completion Queues) capable of millions of IOPS with less than 1% CPU utilization.",
      misconceptions: [
        "Believing the CPU manually copies every byte from the hard drive or network card into RAM (DMA hardware performs the copy).",
        "Assuming polling is always inferior to interrupts (under ultra-high packet rates, interrupts cause 'interrupt livelock', making polling via NAPI or DPDK vastly superior)."
      ]
    },
    visual: {
      title: "Direct Memory Access (DMA) vs Programmed I/O",
      caption: "Offloading bulk data transfer from CPU to DMA controller.",
      visualType: "ascii",
      asciiArt: `PROGRAMMED I/O (CPU Bottleneck)
[ DISK ] ---> Byte by byte ---> [ CPU REGISTERS ] ---> Byte by byte ---> [ RAM ]
(CPU is 100% pegged copying memory in a tight loop!)

DIRECT MEMORY ACCESS (DMA - Zero CPU Copy)
1. CPU programs DMA Controller: "Copy 64 KB from Disk Sector 40 to RAM 0x7A000"
2. CPU returns to running user applications!
3. [ DISK ] =================== DMA BUS ===================> [ RAM ]
4. DMA Controller asserts IRQ line -> CPU is notified: "Transfer Complete!"`,
      keyInsights: [
        "DMA frees the CPU to execute user applications while bulk data transfers occur.",
        "The CPU initiates the transfer and receives an interrupt only upon completion.",
        "Scatter-Gather DMA transfers data to non-contiguous physical memory pages in a single operation."
      ]
    },
    questions: [
      {
        id: "os-int-1-3-4-q1",
        question: "Explain the role of Direct Memory Access (DMA) in modern I/O and how it prevents CPU starvation.",
        difficulty: "Foundation",
        conciseAnswer: "DMA allows peripheral hardware controllers to transfer data directly to and from physical RAM over the system bus without routing bytes through CPU registers. The CPU merely configures the transfer (source, destination, size) and is interrupted only when the entire transfer finishes, allowing the processor to execute user code concurrently.",
        inDepthExplanation: "Under Programmed I/O (PIO), the CPU must execute an assembly loop reading a byte from an I/O port register and writing it to RAM, consuming 100% of CPU cycles during I/O. With DMA, the OS kernel sets up a DMA descriptor in RAM with physical memory addresses and issues a command to the device controller. The device's integrated DMA engine masters the PCIe bus, streaming data directly into DRAM. When finished, the device generates a hardware interrupt. CPU utilization drops from 100% to near 0%.",
        executionTraceOrExample: "Transferring a 1 GB file over a 10GbE network card: With PIO, the CPU core is pegged at 100% for seconds. With DMA, the CPU consumes <2% utilization, primarily processing packet header metadata.",
        followUps: [
          "Interviewer: 'What is Scatter-Gather DMA?' -> Candidate: 'Scatter-gather allows DMA controllers to read from or write to multiple disjoint physical memory frames in a single transfer, eliminating the need to copy data into contiguous physical buffers.'"
        ]
      },
      {
        id: "os-int-1-3-4-q2",
        question: "What is 'Interrupt Livelock', and how do high-performance operating systems prevent it?",
        difficulty: "Advanced",
        conciseAnswer: "Interrupt Livelock is a catastrophic condition where an avalanche of incoming hardware interrupts (e.g., 100 Gbps network packets) completely monopolizes the CPU. The processor spends 100% of its time executing Interrupt Service Routines (ISRs) and context switching, leaving zero CPU cycles to actually process the data packets, resulting in 100% packet drop.",
        inDepthExplanation: "Under low traffic, interrupts provide minimal latency: when a packet arrives, the NIC raises an interrupt, and the CPU processes it immediately. However, at 10 million packets per second, the overhead of interrupt handling, context switching, and cache flushing overwhelms the CPU. The OS gets trapped in an endless loop servicing ISRs. Modern operating systems prevent this using hybrid polling mechanisms (such as Linux NAPI): when packet rate exceeds a threshold, the driver disables hardware interrupts and switches to a polling loop running in a SoftIRQ thread, processing packets in batches until the queue clears.",
        executionTraceOrExample: "Under 100GbE packet flood: Pure interrupts -> 0 Mbps processed, 100% packet loss (livelock). NAPI hybrid polling -> 95 Gbps sustained throughput with predictable batching.",
        followUps: [
          "Interviewer: 'What is kernel-bypass DPDK?' -> Candidate: 'DPDK runs pure user-space polling on dedicated CPU cores, completely eliminating kernel interrupts, context switches, and socket buffers for ultra-low microsecond networking.'"
        ]
      }
    ]
  },
  "os-les-1-3-5": {
    lessonId: "os-les-1-3-5",
    topicId: "os-topic-1-3",
    quickExplanation: {
      whatItIs: "Protection and security is the OS subsystem that controls access to system resources, enforces authentication and authorization, and isolates processes and users from each other.",
      whyItExists: "Computers execute code from multiple users and external networks. The OS must enforce security boundaries to prevent unauthorized inspection, tampering, or destruction of resources.",
      howItWorks: "The kernel enforces hardware rings (privilege separation), virtual memory protection bits, Discretionary Access Control (UID/GID permissions), and Mandatory Access Control (SELinux/AppArmor).",
      criticalMechanism: "Hardware Ring Protection and POSIX Capabilities: replacing all-or-nothing root privileges with fine-grained capability bitmasks (`CAP_NET_BIND_SERVICE`, `CAP_SYS_ADMIN`).",
      realWorldConnection: "Linux namespaces (PID, Mount, Network) combined with cgroups and seccomp system-call filters form the fundamental isolation sandbox of Docker containers.",
      misconceptions: [
        "Confusing Protection with Security (Protection is the internal system mechanism that controls access; Security is the overarching defense against external threats and policy violations).",
        "Assuming running as a non-root user prevents all attacks (privilege escalation exploits target kernel vulnerabilities to gain Ring 0 access)."
      ]
    },
    visual: {
      title: "Operating System Protection Layers",
      caption: "Concentric defense layers from silicon to container sandboxes.",
      visualType: "ascii",
      asciiArt: `+-------------------------------------------------------------+
| CONTAINER SANDBOX (Namespaces, cgroups, seccomp filters)    |
+-------------------------------------------------------------+
                            |
+-------------------------------------------------------------+
| MANDATORY ACCESS CONTROL (SELinux Type Enforcement)         |
+-------------------------------------------------------------+
                            |
+-------------------------------------------------------------+
| DISCRETIONARY ACCESS CONTROL (POSIX File Permissions / ACLs)|
+-------------------------------------------------------------+
                            |
================= HARDWARE PRIVILEGE BOUNDARY =================
+-------------------------------------------------------------+
| CPU PRIVILEGE RINGS & MMU PAGE PERMISSIONS (Ring 0 vs 3)    |
+-------------------------------------------------------------+`,
      keyInsights: [
        "Security is layered: hardware enforces ring boundaries, while the OS enforces file and network rules.",
        "Containers are not VMs: they are sandboxed Linux processes sharing the same Ring 0 kernel.",
        "Seccomp restricts which system calls a compromised user process can invoke."
      ]
    },
    questions: [
      {
        id: "os-int-1-3-5-q1",
        question: "What is the difference between Discretionary Access Control (DAC) and Mandatory Access Control (MAC)?",
        difficulty: "Intermediate",
        conciseAnswer: "Under Discretionary Access Control (DAC), the owner of a resource determines who has access permissions (e.g., standard Unix `chmod 777 file`). Under Mandatory Access Control (MAC), access rules are enforced globally by a central system security policy that users and owners cannot override (e.g., SELinux labels).",
        inDepthExplanation: "DAC is vulnerable to compromised user applications: if a web server running as user `www-data` is exploited via a remote code execution vulnerability, the attacker gains full read/write access to every file owned by `www-data`. Under MAC (such as SELinux), every process and file has a security context label (e.g., `httpd_t` and `httpd_sys_content_t`). Even if the web server process runs as root, SELinux policy blocks it from reading `/etc/shadow` or executing `/bin/bash` because the security rules forbid `httpd_t` from transitioning to administrative domains.",
        executionTraceOrExample: "DAC: User runs `chmod 777 secret.key` -> anyone can read it. MAC: SELinux policy enforces `secret.key` type `secret_t` -> Apache process (`httpd_t`) gets 'Permission Denied' even if file is 777.",
        followUps: [
          "Interviewer: 'What are Linux Capabilities?' -> Candidate: 'Capabilities split traditional monolithic root (UID 0) power into ~40 discrete privileges (e.g., `CAP_NET_BIND_SERVICE` allows binding port 80 without granting raw disk access or reboot capabilities).'"
        ]
      },
      {
        id: "os-int-1-3-5-q2",
        question: "How does Linux seccomp (Secure Computing Mode) protect the operating system from compromised containerized processes?",
        difficulty: "Advanced",
        conciseAnswer: "Seccomp uses Berkeley Packet Filter (BPF) programs to intercept system calls made by a process. If the process invokes a system call that is not explicitly allowed in the whitelist, the kernel immediately terminates the process with SIGSYS or returns EPERM, preventing attackers from exploiting kernel attack surfaces.",
        inDepthExplanation: "The Linux kernel exports over 450 system calls. Most user applications (like a web server or database) only require ~40 system calls (e.g., `read`, `write`, `epoll_wait`). The remaining 400 system calls (like `ptrace`, `bpf`, `mount`, `reboot`) contain legacy code and complex subsystems that could harbor privilege escalation vulnerabilities. Seccomp profiles (such as the default Docker seccomp filter) block dangerous system calls, neutralizing zero-day kernel exploits even if the container user is root.",
        executionTraceOrExample: "Attacker gains shell inside container and attempts `reboot()` or `ptrace()`. Seccomp BPF filter intercepts syscall -> kernel sends SIGSYS -> process killed instantly.",
        followUps: [
          "Interviewer: 'Why are containers considered less isolated than virtual machines?' -> Candidate: 'Because all containers share the same monolithic Linux kernel in Ring 0; a single unmitigated kernel privilege escalation vulnerability compromises the entire host, whereas VMs execute isolated kernels on top of a hypervisor.'"
        ]
      }
    ]
  },
  "os-les-1-3-6": {
    lessonId: "os-les-1-3-6",
    topicId: "os-topic-1-3",
    quickExplanation: {
      whatItIs: "User interface and system services are the user-space software layer of an OS that provides command interpreters, graphical environments, and system daemons for administration.",
      whyItExists: "The kernel exports only raw binary system calls. Humans and services require ergonomic command shells, service supervisors, logging engines, and graphical window compositors to operate the machine.",
      howItWorks: "User interfaces execute as unprivileged processes in Ring 3. They communicate with kernel services via system calls, Unix domain sockets (`/run/systemd/private`), and IPC protocols (D-Bus, Wayland).",
      criticalMechanism: "Standard I/O Streams and Pipelines: connecting the stdout file descriptor of Process A to the stdin file descriptor of Process B via kernel IPC pipes (`pipe()`).",
      realWorldConnection: "The Linux `systemd` suite acts as PID 1, managing parallel service startup, socket activation, hardware event handling (`udevd`), and system journal logging (`journald`).",
      misconceptions: [
        "Believing a GUI terminal window is part of the kernel (terminal emulators like `alacritty` or `gnome-terminal` are regular OpenGL/Wayland user applications).",
        "Thinking system daemons have special CPU execution modes (daemons execute in User Mode Ring 3, but run under the `root` UID)."
      ]
    },
    visual: {
      title: "User Interface & System Services Hierarchy",
      caption: "From user input through system services to kernel.",
      visualType: "ascii",
      asciiArt: `HUMAN INTERACTION
  [ Graphical Desktop: GNOME / Wayland ]     [ CLI Shell: bash / zsh ]
               |                                           |
               v                                           v
SYSTEM SERVICES & DAEMONS (User Space - Ring 3)
  [ systemd (PID 1) ] <---> [ D-Bus ] <---> [ udevd / NetworkManager ]
               |
               v (System Call API: pipe, socket, ioctl, poll)
======================= PRIVILEGE BOUNDARY =====================
OPERATING SYSTEM KERNEL (Ring 0)
  [ Virtual File System ]   [ TTY Subsystem ]   [ Network Protocol Stack ]`,
      keyInsights: [
        "The shell is a standard user program that runs `fork()` and `execve()` in a loop.",
        "System daemons run continuously in the background detached from controlling terminals.",
        "The kernel TTY subsystem handles terminal line discipline (converting Enter to newline, echoing characters)."
      ]
    },
    questions: [
      {
        id: "os-int-1-3-6-q1",
        question: "How does the Unix shell implement the pipe operator ('ls | grep txt') using kernel primitives?",
        difficulty: "Intermediate",
        conciseAnswer: "1. The shell calls `pipe(fd)`, creating a unidirectional kernel buffer with read (`fd[0]`) and write (`fd[1]`) descriptors. 2. Shell forks child 1 (`ls`), which calls `dup2(fd[1], STDOUT_FILENO)` and executes `ls`. 3. Shell forks child 2 (`grep`), which calls `dup2(fd[0], STDIN_FILENO)` and executes `grep`. 4. The shell closes its copies of the pipe and waits for both children to terminate.",
        inDepthExplanation: "The pipe operation illustrates the elegance of Unix file descriptor redirection. A pipe is a circular memory buffer in kernel RAM. When `ls` writes to standard output (FD 1), it writes into the pipe buffer. When `grep` reads from standard input (FD 0), it reads from the pipe. If the pipe buffer is full, the kernel puts `ls` into the WAITING state. If the pipe is empty, `grep` blocks until data arrives. When `ls` terminates, its write descriptor closes; `grep` receives EOF (0 bytes) and exits.",
        executionTraceOrExample: "Kernel code: `pipe(pipefd)` -> `fork()` -> child 1: `close(pipefd[0]); dup2(pipefd[1], 1); execve(\"/bin/ls\")` -> child 2: `close(pipefd[1]); dup2(pipefd[0], 0); execve(\"/bin/grep\")`.",
        followUps: [
          "Interviewer: 'What happens if the reader process dies while the writer is still writing to a pipe?' -> Candidate: 'The kernel delivers a SIGPIPE signal to the writer process, terminating it by default, and `write()` returns error EPIPE (Broken pipe).'"
        ]
      },
      {
        id: "os-int-1-3-6-q2",
        question: "What is the purpose of systemd socket activation, and how does it optimize Linux service startup?",
        difficulty: "Intermediate",
        conciseAnswer: "Socket activation allows `systemd` to create and listen on listening network/IPC sockets on behalf of services before the services even start. When the first incoming connection packet arrives, `systemd` launches the service daemon and hands over the already-open socket file descriptor.",
        inDepthExplanation: "In traditional Unix initialization, services must start in strict sequential order (e.g., the database must finish loading before the web server can launch). With socket activation, `systemd` creates the listening sockets for all daemons simultaneously during early boot. Dependent clients can connect immediately; their requests buffer in the kernel socket buffer. The services start in parallel. This eliminates ordering dependencies, accelerates boot time, and enables on-demand daemon instantiation (daemons only consume RAM when actual requests arrive).",
        executionTraceOrExample: "Client connects to port 22: kernel wakes `systemd` listening on socket -> `systemd` forks `sshd`, passes socket FD 3 -> `sshd` handles SSH handshake.",
        followUps: [
          "Interviewer: 'What is a daemon in Linux, and how does it detach from a terminal?' -> Candidate: 'A daemon is a background process. It detaches by calling `fork()`, having the parent exit, calling `setsid()` to create a new session without a controlling terminal, and redirecting stdin/stdout/stderr to `/dev/null`.'"
        ]
      }
    ]
  },
  "os-les-1-3-7": {
    lessonId: "os-les-1-3-7",
    topicId: "os-topic-1-3",
    quickExplanation: {
      whatItIs: "Resource accounting and error handling is the OS subsystem that monitors system telemetry, records CPU/memory usage, enforces resource quotas, and safely catches and recovers from hardware and software faults.",
      whyItExists: "In multi-tenant environments, administrators need billing and monitoring metrics. Furthermore, hardware glitches and buggy applications must be contained without crashing the entire system.",
      howItWorks: "The kernel updates per-process accounting metrics on every timer tick, exposes telemetry via `/proc` and `/sys`, and uses structured exception handlers to isolate faults.",
      criticalMechanism: "Hardware Exception Handling: translating CPU fault vectors (divide-by-zero, page fault, alignment check) into POSIX signals (`SIGFPE`, `SIGSEGV`, `SIGBUS`) delivered to the offending process.",
      realWorldConnection: "The Linux Kernel Panic handler captures CPU register dumps (`oops`), logs backtraces via `klogd`/`pstore`, and executes `kdump` (spawning a secondary crash kernel) to preserve physical RAM state for post-mortem debugging.",
      misconceptions: [
        "Believing a segmentation fault is caused by the compiler (it is a CPU hardware page fault raised because the MMU rejected the memory address).",
        "Assuming error codes are returned only via function return values (system call errors are returned as negative integers in register RAX, translated by libc into `errno`)."
      ]
    },
    visual: {
      title: "Fault Isolation and Error Propagation Flow",
      caption: "From hardware exception to user-space signal delivery.",
      visualType: "ascii",
      asciiArt: `1. APPLICATION BUG (Ring 3) ---> Dereferences NULL: *(int*)0 = 100;
                                      |
2. CPU HARDWARE EXCEPTION   ---> MMU detects unmapped address (CR2 = 0)
                                 Raises Vector 14: Page Fault (#PF)
                                 Elevates to Ring 0 & executes IDT handler
                                      |
3. KERNEL FAULT HANDLER     ---> do_page_fault() validates address against vma
                                 Address 0 is completely unmapped!
                                 Prepares SIGSEGV signal in process task_struct
                                      |
4. RETURN TO USER SPACE     ---> Modifies user stack to execute signal handler
                                 (or executes default action: core dump & kill!)`,
      keyInsights: [
        "A user-space fault never halts the physical CPU.",
        "The kernel isolates the offending process, preventing peer corruption.",
        "Resource accounting metrics in /proc/stat are updated on every timer tick."
      ]
    },
    questions: [
      {
        id: "os-int-1-3-7-q1",
        question: "What actually happens under the hood when a C program triggers a 'Segmentation Fault'?",
        difficulty: "Foundation",
        conciseAnswer: "The CPU attempts to translate a virtual address that has no valid mapping in the process page table (or violates permissions). The MMU raises a hardware Page Fault exception (#PF, Vector 14). The kernel's page fault handler verifies that the address is invalid, constructs a `SIGSEGV` signal, and terminates the offending process with a core dump.",
        inDepthExplanation: "When a program attempts to dereference a null or garbage pointer, the CPU MMU walks the page tables. If the Present bit is 0 and the address does not fall within any allocated `vm_area_struct` (or if it attempts to write to a read-only code page), the CPU pushes an error code and jumps to the kernel's Page Fault Interrupt Service Routine. The kernel checks whether the fault can be resolved (e.g., demand paging or stack growth). If not, the kernel writes a crash record, sends `SIGSEGV` to the process, and dumps the process memory state to a `core` file.",
        executionTraceOrExample: "Code: `int* p = NULL; *p = 5;`. 1. CPU encounters address 0. 2. Hardware raises #PF. 3. Kernel `do_page_fault()` detects NULL. 4. Kernel invokes `force_sig_fault(SIGSEGV, ...)`. 5. Shell reports 'Segmentation fault (core dumped)'.",
        followUps: [
          "Interviewer: 'What is a Bus Error (SIGBUS) compared to a Segmentation Fault (SIGSEGV)?' -> Candidate: 'SIGSEGV occurs when accessing an unmapped or protected virtual address. SIGBUS occurs when the hardware physically cannot complete the memory access, such as accessing unaligned memory on architectures requiring strict alignment, or reading an `mmap` region beyond the actual disk file length.'"
        ]
      },
      {
        id: "os-int-1-3-7-q2",
        question: "What is a Kernel Oops versus a Kernel Panic in Linux?",
        difficulty: "Intermediate",
        conciseAnswer: "A Kernel Oops is a non-fatal kernel error (such as a null pointer dereference in an isolated device driver thread) where the kernel terminates the faulting thread, prints a register dump and stack trace to dmesg, and attempts to continue running. A Kernel Panic is a fatal, unrecoverable error in core kernel code (such as corruption of scheduler runqueues or a crash of PID 1) where the kernel halts the CPU entirely to prevent physical data destruction.",
        inDepthExplanation: "When kernel code encounters an unexpected fault, it invokes `oops_enter()`. If the fault occurred in a non-essential background worker or driver, the kernel kills that kernel thread, drops locks, and logs a detailed stack trace to the system log. However, if the error occurs in an interrupt handler, holds critical spinlocks, occurs inside core memory subsystems, or if `panic_on_oops` is set, the kernel immediately transitions to `panic()`. In a panic, the kernel blinks keyboard LEDs, writes crash dumps to NVRAM/pstore, triggers `kdump`, and enters an infinite CPU halt loop (`for (;;) hlt;`).",
        executionTraceOrExample: "Oops: Fault in USB mouse driver -> mouse stops working, but server stays online. Panic: `init` (PID 1) crashes -> `Kernel panic - not syncing: Attempted to kill init!` -> machine completely halts.",
        followUps: [
          "Interviewer: 'How does kdump work during a kernel panic?' -> Candidate: '`kdump` uses `kexec` to boot a secondary, pre-reserved lightweight Linux crash kernel directly from memory without going through BIOS/UEFI firmware, capturing a full physical memory dump (`vmcore`) to disk for offline analysis with GDB.'"
        ]
      }
    ]
  }
};
