# KernelCS — Operating Systems Curriculum Blueprint

> **Status:** Proposed human-authored blueprint for review and implementation.
>
> **Canonical subject ID:** `os`  
> **Route:** `/subjects/os`  
> **Priority:** P1 — Very important  
> **Curriculum baseline:** User-supplied OS checklist + `source-of-truth.md` manifest.  
> **Rule:** The supplied material is mandatory. The curriculum below reorganizes it for teachability; it does not authorize deleting source items.

---

## 0. How to use this blueprint

This file is the authoritative **OS teaching map** for KernelCS. Antigravity must implement this map rather than independently inventing or compressing the OS syllabus.

### Required hierarchy

`Operating Systems → Module → Topic → Lesson → Sections`

- **Module:** A coherent chapter of the subject.
- **Topic:** A small, recognizable concept that a student can select from the syllabus.
- **Lesson:** The full teaching experience for that topic. Most topics should have one substantial lesson. A genuinely broad topic may have multiple sequential lessons, but must not be compressed into a short summary.
- **Sections:** The narrative explanation, examples, diagrams, worked steps, misconceptions and checks inside a lesson.

A parent topic may group related child topics for navigation. It must not replace the child topics with a single combined explanation. Each supplied checklist item must remain independently discoverable as a topic, lesson or explicit child lesson.

### Source preservation rules

1. Preserve all original OS checklist items from sections 4.1–4.9 of the supplied student checklist.
2. Preserve the 34 source questions `os-q-1` through `os-q-34`, including their IDs, original wording, categories, difficulty labels and supplied answer basis in Section 15 below.
3. Preserve the eight separately supplied must-know interview questions in Section 16.
4. Preserve source-manifest module and topic IDs as legacy traceability metadata. New UI slugs may be added, but never overwrite or discard the source IDs.
5. Any newly introduced lesson or concept must be labelled **Supplementary** in the curriculum manifest.
6. Do not silently “correct” an original question's wording. Technical issues in its answer basis should be recorded in a correction note and corrected in the expanded teaching answer.

### Module order

The 12 modules below are a pedagogical reorganization of the supplied material:

1. OS Fundamentals & Kernel Architecture
2. Processes & Process Management
3. Threads & Multithreading
4. CPU Scheduling
5. Process Synchronization & Concurrency
6. Deadlocks
7. Memory Management
8. Virtual Memory & Page Replacement
9. File Systems & Storage
10. I/O Systems & Device Management
11. OS Protection & Security
12. Advanced OS & Modern Systems

This is intentionally a more granular structure than the initial source manifest's 11 modules. The original manifest modules map to the new modules in Section 14.

---

## 1. Subject definition and learning outcomes

### Central first-principles question

**How does an operating system coordinate limited hardware resources, provide useful abstractions to programs, and protect concurrently executing programs from interfering with one another?**

### Subject description

Study how an operating system turns raw hardware into a usable, shared and protected computing environment. Begin with why an OS is needed, then learn how programs become processes, how the CPU is shared, how concurrent execution is coordinated, how memory and files are managed, and how the OS communicates with devices. Finish with protection, virtualization and modern high-performance OS mechanisms.

### Prerequisites

- Basic computer architecture: CPU, registers, main memory and I/O devices.
- Basic programming in C or C++ is recommended for systems examples.
- Basic data structures: queues, linked lists, trees and graphs.
- Familiarity with compiling and running a simple program.

Prerequisites should guide recommendations, not block students from opening a lesson.

### Learning outcomes

By completing this subject, a student should be able to:

1. Explain why operating systems exist and distinguish their roles as resource managers and providers of abstractions.
2. Trace the lifecycle of processes and threads, including creation, scheduling, blocking, context switching and termination.
3. Calculate and compare CPU scheduling outcomes using Gantt charts and scheduling metrics.
4. Explain races, critical sections, synchronization primitives and classical concurrency problems.
5. Characterize, prevent, avoid, detect and recover from deadlocks, including solving Banker's Algorithm problems.
6. Explain address binding, allocation, paging, segmentation, virtual memory, page faults, page replacement and TLB-assisted address translation.
7. Describe file-system organization, allocation, inodes, permissions, disk scheduling and crash-consistency mechanisms.
8. Explain how interrupts, device drivers, DMA and asynchronous I/O allow the OS to interact efficiently with hardware.
9. Explain OS protection mechanisms and distinguish general principles from architecture- or OS-specific implementations.
10. Relate OS fundamentals to modern Linux, containers, virtualization, NUMA and scalable I/O.

### Core mechanisms

- Privileged CPU execution and controlled system-call entry.
- Process/thread state and context preservation.
- Preemptive scheduling using timer events.
- Synchronization through atomic operations and blocking primitives.
- Virtual-to-physical address translation through page tables and TLBs.
- Persistent storage through file-system metadata and journaling.
- Device interaction through interrupts, DMA and I/O queues.

---

# 2. Module 01 — OS Fundamentals & Kernel Architecture

**Level:** Foundation → Intermediate  
**Purpose:** Build the student's mental model of an operating system before introducing processes, scheduling and memory management.

### Topic 1.1 — Why Do We Need an Operating System?

**Lessons / learning units:**
- What a computer looks like without an OS.
- Applications, hardware and the problem of sharing resources.
- Why programs should not directly control every device.
- Isolation: why one program must not freely overwrite another program's memory.
- The OS as a mediator between applications and hardware.

**Teaching anchor:** Start with a relatable computer running several applications. Explain the conflicts that would arise if each application independently controlled the CPU, memory, disks and devices.

### Topic 1.2 — What Is an Operating System?

**Lessons / learning units:**
- Definition and purpose of an OS.
- OS as a resource manager.
- OS as an extended/virtual machine.
- Kernel versus the complete operating-system environment.
- Examples of OS responsibilities in an ordinary application launch.

### Topic 1.3 — Functions of an Operating System

**Lessons / learning units:**
- Process and CPU management.
- Main-memory management.
- File and secondary-storage management.
- I/O and device management.
- Protection and security.
- User interface and system services.
- Resource accounting and error handling.

Explain each function through a concrete task rather than giving a disconnected list.

### Topic 1.4 — Types of Operating Systems

Keep each named type independently discoverable:
- Batch Operating System.
- Multiprogramming Operating System.
- Multitasking Operating System.
- Multiprocessing Operating System.
- Time-sharing Operating System.
- Distributed Operating System.

For each type, teach its motivation, operating model, expected workload, advantages, limitations and a suitable example. Include a comparison showing how these categories differ; do not imply that all are mutually exclusive classifications.

### Topic 1.5 — Kernel and Shell

**Lessons / learning units:**
- What is the kernel?
- What is a shell?
- Kernel responsibilities and privilege.
- Command interpreter versus graphical shell.
- How a shell request reaches an OS service.
- User space and kernel space at a high level.

### Topic 1.6 — User Mode vs Kernel Mode

**Lessons / learning units:**
- Why privilege separation is necessary.
- User mode and kernel mode.
- Privileged and unprivileged instructions.
- Hardware-enforced protection boundaries.
- x86 privilege rings as an architecture-specific example.
- What happens when user code attempts a privileged operation.

Do not present Ring 0/Ring 3 as the universal model for every CPU architecture.

### Topic 1.7 — System Calls

**Lessons / learning units:**
- Why applications need system calls.
- System call versus ordinary function call.
- Library/API wrapper versus kernel system-call interface.
- System-call number and argument passing.
- Entry into the kernel, service execution and return to user space.
- Examples: `read`, `write`, `open`, `close`, `fork` and `exec` (platform context must be stated).
- User-pointer validation and safe data transfer.

### Topic 1.8 — Interrupts, Exceptions and Traps

**Lessons / learning units:**
- Why CPUs need asynchronous events.
- Hardware interrupt.
- Exception/fault.
- Software trap and system-call entry.
- Interrupt vector/descriptor and handler at a conceptual level.
- Saving execution state and returning from an event.
- Difference between interrupt, exception, trap and system call.

### Topic 1.9 — Monolithic, Microkernel and Hybrid Architectures

**Lessons / learning units:**
- What belongs inside a kernel?
- Monolithic kernel architecture.
- Microkernel architecture.
- Hybrid kernel design.
- IPC and privilege-boundary costs.
- Reliability, fault isolation, performance and maintainability trade-offs.
- Examples: Linux, Mach-derived systems and Windows NT architecture, with precise caveats.

### Topic 1.10 — The Booting Process

**Lessons / learning units:**
- What happens when a computer powers on?
- Firmware and POST.
- BIOS versus UEFI.
- Boot device selection and bootloader.
- MBR versus EFI System Partition (ESP), where relevant.
- Bootloader-to-kernel handoff.
- Kernel initialization.
- initramfs/initrd and mounting the real root filesystem.
- PID 1 and user-space initialization (Linux-specific path).

### Module 01 interview benchmark

Trace a `read()` request from an application/library wrapper through system-call entry, kernel validation, file/device layers and return to user space. State the platform assumptions and distinguish the generic path from Linux/x86-64 details.

---

# 3. Module 02 — Processes & Process Management

**Level:** Foundation → Intermediate  
**Purpose:** Explain how an executing program is represented, tracked, scheduled and terminated.

### Topic 2.1 — What Is a Process?

- Program versus process.
- Process as an execution instance.
- Process address space and execution context.
- Resources associated with a process.
- Multiple instances of the same program.
- A simple application-launch walkthrough.

### Topic 2.2 — Process Memory Layout

- Text/code segment.
- Initialized and uninitialized data.
- Heap.
- Stack.
- Memory-mapped regions and shared libraries (introductory).
- How the layout relates to a process's virtual address space.

### Topic 2.3 — Process Control Block (PCB)

- Why the OS needs process metadata.
- Process identifier and state.
- Program counter and register context.
- Scheduling information.
- Memory-management information.
- Open files and I/O/accounting information.
- OS-specific representation such as Linux `task_struct` (supplementary, implementation-specific).

### Topic 2.4 — Process States

- New.
- Ready.
- Running.
- Waiting/Blocked.
- Terminated.
- Suspended states as an optional extension.

### Topic 2.5 — Process State Transition Diagram

- Ready → Running.
- Running → Ready through preemption.
- Running → Waiting through a blocking event.
- Waiting → Ready after event completion.
- Exit and termination.
- Events that cause each transition.
- Trace realistic process timelines.

### Topic 2.6 — Process Creation and Termination

- Why processes create other processes.
- Process creation model.
- `fork()` and `exec()` in Unix-like systems.
- Parent-child relationship.
- Exit status and `wait()`/`waitpid()`.
- Graceful termination versus abnormal termination.
- Copy-on-write connection (cross-link to Module 08).

### Topic 2.7 — Context Switching

- Why a CPU switches execution contexts.
- Timer interrupt, blocking and preemption as triggers.
- What state must be saved and restored.
- Kernel stack and process/thread context.
- Switching between threads of one process versus different processes.
- Address-space changes, TLB implications and cache effects.
- Why a context switch is overhead rather than useful application work.

Explain architecture-dependent details carefully; do not claim every context switch necessarily reloads CR3 or fully flushes the TLB.

### Topic 2.8 — Process Scheduling: Queues and Schedulers

- Ready and waiting queues.
- Long-term, medium-term and short-term scheduler concepts.
- Dispatcher and context switch relationship.
- Scheduling decision points.
- Link to Module 04 for algorithms and numerical problems.

### Topic 2.9 — Parent and Child Processes

- Process hierarchy.
- Parent-child creation.
- Inheritance of selected resources/attributes.
- Waiting and exit-status collection.
- Orphan and zombie distinction.

### Topic 2.10 — Orphan Processes

- What makes a process orphaned.
- Parent termination before child termination.
- Re-parenting/reaping behavior in Unix-like systems.
- Why an orphan is not necessarily a malfunction.

### Topic 2.11 — Zombie Processes

- Process has exited but has not yet been reaped.
- Why exit status must remain available.
- Role of `wait()`/`waitpid()`.
- What resources are released and what minimal process-table information remains.
- How zombies are reaped.

### Topic 2.12 — Inter-Process Communication (IPC)

- Why processes need to communicate.
- Data exchange and synchronization requirements.
- Shared-memory model.
- Message-passing model.
- Local versus network IPC.

### Topic 2.13 — Shared Memory

- Creating and attaching a shared region.
- How processes access the same physical backing.
- Synchronization requirements and race conditions.
- Benefits and risks.

### Topic 2.14 — Message Passing

- Send/receive model.
- Direct and indirect communication.
- Blocking and non-blocking operations.
- Buffering and message queues.
- Shared memory versus message passing.

### Topic 2.15 — Pipes

- Anonymous pipe concept.
- Producer/consumer byte stream.
- File descriptors and parent-child use.
- Unidirectional/bidirectional platform caveats.
- EOF and blocking behavior.

### Topic 2.16 — Named Pipes (FIFOs)

- Why a named pipe is needed.
- Filesystem name and FIFO semantics.
- Communication between unrelated processes.
- Opening and blocking behavior.
- Anonymous pipe versus FIFO.

### Topic 2.17 — Signals

- What a signal represents.
- Signal generation and delivery.
- Default dispositions and handlers.
- Blocking and pending signals.
- Safe handling and async-signal-safety caveat.
- Examples such as termination and child-status notification.

### Topic 2.18 — Sockets as IPC

- What a socket is.
- Unix-domain sockets.
- Network sockets.
- Client/server communication model.
- Stream versus datagram semantics.
- How sockets relate to the networking subject.

### Module 02 interview benchmark

Compare process creation, termination and context switching. Explain which state is preserved, which resources are shared or distinct, and how a parent collects a child's exit status.

---

# 4. Module 03 — Threads & Multithreading

**Level:** Foundation → Intermediate  
**Purpose:** Show how multiple execution paths can exist within one process and what they share.

### Topic 3.1 — What Is a Thread?

- Thread as an execution unit.
- Thread ID and execution state.
- Registers, program counter and stack.
- Relationship between a thread and its process.

### Topic 3.2 — Process vs Thread

- Address-space ownership.
- Resource sharing.
- Creation and switching costs (qualified, not universal absolutes).
- Isolation and failure implications.
- Communication mechanisms.
- Practical examples.

### Topic 3.3 — User-Level Threads

- Thread management in user space.
- Runtime/library scheduler.
- Advantages and constraints.
- Blocking system-call implications under many-to-one models.

### Topic 3.4 — Kernel-Level Threads

- Kernel visibility and scheduling.
- Blocking behavior.
- Kernel scheduling overhead.
- User threads versus kernel threads.

### Topic 3.5 — Thread Mapping Models

- Many-to-one.
- One-to-one.
- Many-to-many.
- Trade-offs and examples.
- Green threads, goroutines and Java virtual threads as supplementary runtime examples; explain that their implementation details differ.

### Topic 3.6 — Multithreading

- Why programs use multiple threads.
- Concurrency versus parallel execution.
- Independent and cooperating threads.
- Thread creation and joining at a conceptual level.

### Topic 3.7 — Multicore Processing

- Single-core concurrency versus multicore parallelism.
- Hardware cores and software threads.
- Scheduling threads across cores.
- Shared-memory implications.

### Topic 3.8 — Benefits of Multithreading

- Responsiveness.
- Resource sharing.
- Economy.
- Scalability and parallel speedup.
- Limits such as contention and serialization.

### Topic 3.9 — Thread Lifecycle

- New/created.
- Runnable/ready.
- Running.
- Blocked/waiting.
- Terminated.
- Lifecycle model differs by language/runtime; label examples.

### Topic 3.10 — Thread Synchronization: Why It Is Needed

- Shared mutable state.
- Interleaving.
- Race conditions.
- Atomicity and visibility at a high level.
- Link to Module 05 for full synchronization mechanisms.

### Topic 3.11 — Race Conditions

- Lost update example.
- Non-deterministic interleavings.
- Correctness depending on timing.
- Race condition versus data race.

### Topic 3.12 — Thread Safety

- What thread-safe behavior means.
- Shared-state protection.
- Immutability and confinement.
- Synchronization and atomic operations.
- Common thread-safety mistakes.

### Topic 3.13 — Critical Section: Introductory View

- Shared resource and critical code region.
- Why simultaneous access can break invariants.
- Preview of mutual exclusion, progress and bounded waiting.
- Link to Module 05 for formal treatment.

### Topic 3.14 — Reentrant Code

- Meaning of reentrancy.
- Local state versus shared mutable state.
- Reentrant versus merely thread-safe code.
- Recursive calls, interrupts and signal-handler contexts.
- Practical examples and pitfalls.

### Module 03 interview benchmark

Explain concurrency versus parallelism, compare processes and threads, and analyze what happens when two threads update the same shared variable without synchronization.

---

# 5. Module 04 — CPU Scheduling

**Level:** Foundation → Advanced  
**Purpose:** Teach why the CPU must be shared, how scheduling policies work, and how to calculate their outcomes.

### Topic 4.1 — Why CPU Scheduling Is Needed

- Ready processes and CPU contention.
- CPU-bound and I/O-bound behavior.
- Scheduler role.
- Scheduling decision points.

### Topic 4.2 — Preemptive vs Non-Preemptive Scheduling

- Voluntary release and blocking.
- Timer-based preemption.
- Responsiveness, fairness and overhead.
- Example timelines.

### Topic 4.3 — Scheduling Criteria and Metrics

Keep each metric independently taught:
- CPU utilization.
- Throughput.
- Turnaround time.
- Waiting time.
- Response time.
- Completion time, arrival time and burst time.
- Average metrics and how to calculate them.

### Topic 4.4 — First Come First Served (FCFS)

- Ready-queue ordering.
- Non-preemptive execution.
- Gantt chart construction.
- Waiting/turnaround calculations.
- Convoy effect.

### Topic 4.5 — Shortest Job First (SJF)

- Selection by next CPU-burst length.
- Non-preemptive SJF.
- Why it minimizes average waiting time under standard assumptions.
- Burst-time prediction challenge.
- Starvation risk.

### Topic 4.6 — Shortest Remaining Time First (SRTF)

- Preemptive form of SJF.
- Arrival of a shorter job.
- Remaining-burst calculation.
- Gantt chart and metrics.
- Starvation and prediction limitations.

### Topic 4.7 — Priority Scheduling

- Priority assignment.
- Preemptive and non-preemptive forms.
- Tie-breaking.
- Starvation.
- Aging as a remedy.
- Priority inversion cross-link to synchronization.

### Topic 4.8 — Round Robin (RR)

- Time quantum.
- Circular ready queue.
- Timer interrupt and preemption.
- Gantt chart and calculations.
- Quantum too small versus too large.
- Context-switch overhead.

### Topic 4.9 — Multilevel Queue Scheduling

- Multiple ready queues.
- Queue assignment.
- Inter-queue scheduling.
- Fixed priority versus time sharing among queues.
- Strengths and weaknesses.

### Topic 4.10 — Multilevel Feedback Queue (MLFQ)

- Dynamic queue movement.
- CPU-burst behavior and priorities.
- Aging/boosting.
- Configuration trade-offs.
- Worked scheduling trace.

### Topic 4.11 — Convoy Effect

- Long process delaying short/I/O-bound processes.
- Why FCFS can cause it.
- Impact on waiting time and device utilization.
- Example.

### Topic 4.12 — Starvation and Aging

- Indefinite postponement.
- Difference from deadlock.
- Priority-based starvation.
- Aging and other mitigation.

### Topic 4.13 — Scheduling Numerical Practice

- Given arrival and burst times, construct Gantt charts.
- Calculate CT, TAT, WT and RT.
- Compare FCFS, SJF, SRTF, Priority and RR.
- State assumptions and tie-breaking rules.
- Explain why answers differ when assumptions differ.

### Supplementary advanced topics

- Linux scheduler evolution and CFS concepts.
- `vruntime`, nice weights and run-queue structures.
- Real-time scheduling basics.
- Priority inversion and priority inheritance (cross-link to Module 05).

### Module 04 interview benchmark

Given a process arrival/burst-time table, calculate waiting and turnaround times under FCFS, SJF/SRTF and Round Robin, then explain the trade-offs and starvation risks.

---

# 6. Module 05 — Process Synchronization & Concurrency

**Level:** Foundation → Advanced  
**Purpose:** Explain how concurrent execution preserves shared data invariants.

### Topic 5.1 — Why Synchronization Is Needed

- Interleaving and shared mutable state.
- Lost update and inconsistent state examples.
- Atomicity, visibility and ordering.
- Race condition versus data race.

### Topic 5.2 — Critical Section Problem

- Entry, critical, exit and remainder sections.
- Shared-resource invariant.
- Correctness requirements.

### Topic 5.3 — Mutual Exclusion

- What mutual exclusion guarantees.
- Lock ownership.
- Why mutual exclusion alone does not guarantee progress or fairness.

### Topic 5.4 — Progress

- Definition in the critical-section problem.
- Avoiding unnecessary indefinite postponement of entry.
- Difference from system-wide progress claims.

### Topic 5.5 — Bounded Waiting

- Bounded waiting meaning.
- Starvation prevention.
- Relationship to fairness.

### Topic 5.6 — Peterson's Algorithm

- Two-process assumptions.
- `flag` and `turn` variables.
- Entry/exit logic.
- Step-by-step interleaving.
- Why modern memory models and compiler/CPU reordering require care; do not present the textbook algorithm as a production lock.

### Topic 5.7 — Mutex Locks

- Lock/unlock model.
- Ownership.
- Blocking versus spinning implementation possibilities.
- Correct critical-section usage.

### Topic 5.8 — Semaphores

- Semaphore abstraction.
- Atomic wait/signal operations.
- Counting versus binary semaphore.
- Resource counting and synchronization.

### Topic 5.9 — Binary Semaphore

- Values and operations.
- Signaling semantics.
- Difference from an ownership-enforcing mutex.

### Topic 5.10 — Counting Semaphore

- Resource-pool example.
- Initial count.
- Acquiring and releasing permits.
- Invariants and common mistakes.

### Topic 5.11 — Monitors

- Encapsulated shared state.
- Mutual exclusion through monitor entry.
- Condition synchronization.
- Relationship to language constructs.

### Topic 5.12 — Condition Variables

- Wait and signal/broadcast.
- Atomic release-and-wait behavior.
- Predicate loops and spurious wakeups.
- Bounded-buffer example.

### Topic 5.13 — Spinlocks

- Busy waiting.
- Atomic test-and-set/CAS basis.
- When spinning can be appropriate.
- Why long critical sections and single-core scheduling can make spinning harmful.

### Topic 5.14 — Hardware Atomic Instructions

- Atomic read-modify-write.
- Test-and-Set.
- Compare-and-Swap (CAS).
- LL/SC concept.
- Memory barriers and memory ordering.
- ABA problem and mitigation such as tagged pointers/hazard pointers (advanced).

### Topic 5.15 — Producer-Consumer Problem

- Bounded buffer.
- Empty/full counts.
- Mutex protection.
- Correct semaphore ordering.
- Complete execution trace.

### Topic 5.16 — Readers-Writers Problem

- Concurrent readers and exclusive writers.
- Reader preference, writer preference and fairness.
- Starvation possibilities.

### Topic 5.17 — Dining Philosophers Problem

- Resource competition.
- Deadlock and starvation.
- Asymmetric pickup, resource ordering and waiter solutions.

### Topic 5.18 — Mutex vs Semaphore

- Ownership.
- Counting semantics.
- Signaling across threads.
- Priority inheritance and platform-specific behavior.
- When each abstraction is appropriate.

### Topic 5.19 — Deadlock vs Starvation

- Circular waiting versus indefinite postponement.
- Examples.
- How each is detected or mitigated.
- Link to Module 06.

### Supplementary topics

- Priority inversion and priority inheritance.
- Futex concept and user-space fast path/kernel wait path.
- Lock-free versus wait-free terminology.

### Module 05 interview benchmark

Design a bounded blocking queue using a mutex and condition variables. Explain the invariants, wait predicates, wake-up behavior and how busy waiting is avoided.

---

# 7. Module 06 — Deadlocks

**Level:** Foundation → Advanced  
**Purpose:** Understand how processes become permanently blocked while waiting for resources and how operating systems reason about such states.

### Topic 6.1 — What Is a Deadlock?

- Resource contention.
- Waiting cycles.
- Simple two-process/two-lock scenario.
- Deadlock versus indefinite delay.

### Topic 6.2 — Four Necessary Conditions (Coffman Conditions)

Teach each as an independently discoverable lesson:
- Mutual Exclusion.
- Hold and Wait.
- No Preemption.
- Circular Wait.

Explain why all four must hold for the classical deadlock model.

### Topic 6.3 — Resource Allocation Graph (RAG)

- Process and resource nodes.
- Request and assignment edges.
- Detecting cycles.
- Single-instance versus multiple-instance nuance.

### Topic 6.4 — Deadlock Prevention

- Breaking one necessary condition.
- Resource ordering.
- Request-all-at-once and preemption strategies.
- Practical costs.

### Topic 6.5 — Deadlock Avoidance

- Safe-state concept.
- Need for advance resource information.
- Safe versus unsafe state.
- Avoidance versus prevention.

### Topic 6.6 — Banker's Algorithm

- Available, Max, Allocation and Need.
- Safety algorithm.
- Finding a safe sequence.
- Resource-request algorithm.
- Complete matrix walkthroughs.

### Topic 6.7 — Deadlock Detection

- Single-instance wait-for graph.
- Multiple-instance detection approach.
- Detection frequency and overhead.

### Topic 6.8 — Deadlock Recovery

- Process termination strategies.
- Resource preemption.
- Rollback and recovery.
- Victim selection and starvation risk.

### Topic 6.9 — Safe State vs Unsafe State

- Formal meaning.
- Unsafe does not necessarily mean already deadlocked.
- Worked examples.

### Supplementary topics

- Deadlock handling strategies in general-purpose OSs.
- Ostrich approach and its trade-offs.
- Can a single-threaded process deadlock? Explain resource and dependency cycles, rather than assuming multiple threads are always necessary.
- Global lock-ordering design.

### Module 06 interview benchmark

Given a multi-resource allocation matrix, execute Banker's Algorithm, find a safe sequence if one exists, and explain why an unsafe state is not necessarily a current deadlock.

---

# 8. Module 07 — Memory Management

**Level:** Foundation → Intermediate  
**Purpose:** Explain how programs are placed in memory and how addresses and allocations are managed.

### Topic 7.1 — Why Memory Management Is Needed

- Multiple programs competing for RAM.
- Isolation and relocation.
- Allocation and reclamation.
- Physical memory constraints.

### Topic 7.2 — Logical vs Physical Address

- CPU-generated address.
- Physical RAM address.
- Address-space abstraction.
- MMU's role.

### Topic 7.3 — Address Binding

- Compile-time binding.
- Load-time binding.
- Execution-time binding.
- Relocation and dynamic address translation.

### Topic 7.4 — Contiguous Memory Allocation

- Single and multiple partitions.
- Fixed partitioning.
- Variable partitioning.
- Allocation/deallocation.

### Topic 7.5 — Fixed and Variable Partitioning

- Partition layout.
- Fragmentation effects.
- Allocation constraints.
- Worked memory-map examples.

### Topic 7.6 — Internal Fragmentation

- Wasted space inside an allocated block.
- Fixed-size allocation example.
- Measurement.

### Topic 7.7 — External Fragmentation

- Free memory split into non-contiguous holes.
- Why total free space may still be insufficient for a contiguous request.
- Example memory map.

### Topic 7.8 — Compaction

- Moving allocations to combine free space.
- Relocation requirements.
- Cost and limitations.

### Topic 7.9 — Memory Allocation Strategies

Keep each algorithm separately selectable:
- First Fit.
- Best Fit.
- Worst Fit.
- Worked allocation traces and comparison.

### Topic 7.10 — Paging Fundamentals

- Pages and frames.
- Equal page/frame size.
- Page table overview.
- Logical address split into page number and offset.
- Address translation examples.

### Topic 7.11 — Page Tables

- Page-table entry.
- Frame mapping.
- Valid/present and protection bits at a conceptual level.
- Page-table storage overhead.

### Topic 7.12 — Multilevel Paging

- Why flat page tables can be large.
- Hierarchical page-table structure.
- Address indices at each level.
- Sparse address-space benefit.

### Topic 7.13 — Segmentation

- Logical segments.
- Segment table.
- Base and limit.
- Protection/sharing.
- External fragmentation.

### Topic 7.14 — Paging vs Segmentation

- Fixed-size versus logical variable-sized units.
- Address translation.
- Fragmentation.
- Protection and sharing.

---

# 9. Module 08 — Virtual Memory & Page Replacement

**Level:** Intermediate → Advanced  
**Purpose:** Explain how processes use large protected virtual address spaces and how the OS handles pages that are not currently resident.

### Topic 8.1 — What Is Virtual Memory?

- Why physical memory need not equal the process address space.
- Per-process virtual address spaces.
- Isolation and address translation.
- Demand loading and backing storage.
- Virtual memory is not synonymous with swap.

### Topic 8.2 — Demand Paging

- Loading pages when first needed.
- Present/resident state.
- Lazy allocation/loading.
- Benefits and costs.

### Topic 8.3 — Page Fault

- What triggers a page fault.
- Valid but non-resident versus invalid/protection-violating access.
- Fault versus program error.
- Minor and major fault terminology.

### Topic 8.4 — Page Fault Handling Sequence

- CPU/MMU detects translation/protection condition.
- Trap into kernel.
- Identify faulting virtual address and access type.
- Validate mapping and permissions.
- Obtain or allocate a frame.
- Read backing data if needed.
- Update page tables and TLB state as required.
- Restart instruction or deliver a fault to the process.

### Topic 8.5 — Page Replacement: Why It Is Needed

- No free frame available.
- Choosing a victim page.
- Dirty and reference bits.
- Cost of eviction and reload.

### Topic 8.6 — FIFO Page Replacement

- Queue-based policy.
- Reference-string walkthrough.
- Page-fault counting.
- Belady's anomaly connection.

### Topic 8.7 — LRU Page Replacement

- Recency of use.
- Stack/recency model.
- Manual simulation.
- Implementation cost and approximation in real systems.

### Topic 8.8 — Optimal Page Replacement

- Future knowledge assumption.
- Why it is a theoretical benchmark.
- Worked reference-string example.

### Topic 8.9 — LFU Page Replacement

- Frequency counts.
- Aging/tie-breaking choices.
- When frequency can mislead.

### Topic 8.10 — Belady's Anomaly

- More frames can sometimes produce more FIFO faults.
- Reference-string example.
- Stack algorithms and the inclusion property.

### Topic 8.11 — Thrashing

- Excessive paging activity.
- Working-set pressure.
- CPU utilization feedback.
- Mitigation through working-set or page-fault-frequency ideas.

### Topic 8.12 — Working Set Model

- Locality of reference.
- Working-set window.
- Estimating active pages.
- Allocation and thrashing relationship.

### Topic 8.13 — Copy-on-Write (COW)

- Shared pages after process creation.
- Read sharing.
- Write-triggered protection fault and copy.
- Benefits and costs.

### Topic 8.14 — Translation Lookaside Buffer (TLB)

- Why page-table walks are costly.
- Cached address translations.
- TLB hit and miss.
- Address-space identifiers/process context tags where supported.
- TLB invalidation and shootdown concept.

### Topic 8.15 — Multi-Level Page-Table Walks

- Address split into level indices and offset.
- Page-table walk stages.
- x86-64 four-/five-level paging as architecture-specific examples.
- Canonical-address and page-size assumptions.

### Topic 8.16 — Effective Memory Access Time (EMAT)

- TLB lookup and hit path.
- Miss path and page-table walk cost.
- Formula under stated assumptions.
- Fully worked examples.
- Distinguish page-table walk from a page fault.

---

# 10. Module 09 — File Systems & Storage

**Level:** Foundation → Advanced  
**Purpose:** Explain how files and directories are represented, allocated, accessed and recovered after failures.

### Topic 9.1 — Why File Systems Are Needed

- Persistent data versus volatile memory.
- Naming and organization.
- Storage abstraction.
- File-system responsibilities.

### Topic 9.2 — File Attributes and Operations

- Name, identifier, type, location, size, protection and timestamps.
- Create, open, read, write, seek, close, delete and truncate.
- File handles/descriptors.

### Topic 9.3 — File-System Structures

- On-disk versus in-memory structures.
- Boot block, superblock, metadata and data blocks.
- Mounting.
- VFS concept as supplementary.

### Topic 9.4 — File Allocation Methods

Teach each separately:
- Contiguous allocation.
- Linked allocation.
- Indexed allocation.
- Extent-based allocation as supplementary.

Compare access performance, fragmentation and metadata overhead.

### Topic 9.5 — Directory Structures

- Single-level and two-level directories.
- Tree-structured directories.
- Acyclic/general graphs.
- Pathnames and directory entries.

### Topic 9.6 — Inodes

- Metadata versus filename.
- Inode number and directory entry relationship.
- Data block/extent mapping.
- Link count.
- Hard links and symbolic links.

### Topic 9.7 — File Permissions

- Owner, group and others.
- Read, write and execute.
- Permission bits.
- Directory permission semantics.
- POSIX examples.

### Topic 9.8 — Disk Scheduling Fundamentals

- Seek time, rotational latency and transfer time (HDD context).
- Request queue.
- Why scheduling matters.
- SSD caveat: classic seek-optimization algorithms do not translate directly to SSDs.

### Topic 9.9 — FCFS Disk Scheduling

- Request order.
- Head movement calculation.
- Worked example.

### Topic 9.10 — SSTF Disk Scheduling

- Nearest-request selection.
- Head movement calculation.
- Starvation/fairness considerations.

### Topic 9.11 — SCAN and C-SCAN

- Elevator analogy.
- Direction and boundary assumptions.
- Total head movement calculation.
- Compare SCAN and C-SCAN.

### Topic 9.12 — RAID Fundamentals

- Redundancy and performance goals.
- Striping, mirroring and parity.
- Common RAID levels (0, 1, 5, 6, 10).
- Capacity, fault tolerance and rebuild trade-offs.

### Topic 9.13 — Buffering and Caching

- Buffer versus cache.
- Read-ahead and write buffering.
- Page cache.
- Cache consistency and write-back/write-through concepts.

### Supplementary advanced topics

- Superblocks and extents.
- Directory-entry cache/dentry.
- Journaling and crash consistency.
- Metadata journaling versus data journaling.
- Write-ahead logging concepts and ext4 mode distinctions.
- `fsync` and durability semantics.

---

# 11. Module 10 — I/O Systems & Device Management

**Level:** Intermediate → Advanced  
**Purpose:** Explain how software communicates with physical devices without requiring the CPU to manage every low-level transfer manually.

### Topic 10.1 — I/O Hardware and Device Controllers

- Device and controller roles.
- Registers and command/status interface.
- Memory-mapped I/O versus port-mapped I/O (architecture-dependent).
- Device-driver responsibility.

### Topic 10.2 — Programmed I/O and Polling

- CPU checks device status.
- Data transfer through CPU instructions.
- Busy waiting and its cost.

### Topic 10.3 — Interrupt-Driven I/O

- Device signals completion/event.
- Interrupt handler/ISR concept.
- Deferred work.
- Interrupt overhead and interrupt storms.

### Topic 10.4 — Direct Memory Access (DMA)

- Why CPU-mediated byte-by-byte transfer is inefficient.
- DMA descriptor/buffer setup.
- Device transfer to/from memory.
- Completion notification.
- Cache coherency and IOMMU considerations as advanced, platform-specific details.

### Topic 10.5 — Buffering and Ring Buffers

- Temporary staging.
- Producer-consumer ring.
- Head and tail pointers.
- Full/empty conditions.
- Device/network I/O examples.

### Topic 10.6 — Synchronous vs Asynchronous I/O

- Blocking and non-blocking behavior.
- Completion notification.
- Async request model.
- Distinguish asynchronous I/O from merely non-blocking polling.

### Topic 10.7 — Scalable Event Notification

Keep each mechanism independently selectable:
- `select`.
- `poll`.
- `epoll`.
- Edge-triggered versus level-triggered behavior.
- `kqueue` as a cross-platform supplementary comparison.

Explain their APIs, readiness model and scaling characteristics precisely. Avoid absolute claims that `epoll` is O(1) in every aspect of the workload.

### Topic 10.8 — Linux NAPI

- Interrupt moderation and polling.
- Why high packet rates can make per-packet interrupts expensive.
- NAPI scheduling and budget concept.
- Network-driver context.

### Topic 10.9 — io_uring

- Submission and completion queues.
- Shared ring structures.
- Batching and reduced syscall overhead.
- Registered buffers/files and advanced options.
- Explain that io_uring does not make every operation “zero syscall” or guarantee zero-copy; capabilities depend on operation and configuration.

---

# 12. Module 11 — OS Protection, Security & Access Control

**Level:** Foundation → Advanced  
**Purpose:** Explain the OS mechanisms that protect programs, memory and system resources from misuse and attack.

### Topic 11.1 — Protection Fundamentals

- Protection domains.
- Isolation boundaries.
- Least privilege.
- Why protection is needed even on multi-user systems.

### Topic 11.2 — Access Control Lists (ACLs)

- Subjects and objects.
- Permissions.
- ACL entries.
- ACL versus simple owner/group/other mode bits.

### Topic 11.3 — Capability-Based Access Control

- Capability as unforgeable authority (conceptual model).
- Object reference plus rights.
- Capability versus ACL.
- Revocation and delegation challenges.

### Topic 11.4 — Memory Protection

- Page-level permissions.
- User/kernel access separation.
- Read/write/execute permissions.
- Protection fault.

### Topic 11.5 — NX/XD Bit and W^X

- Non-executable memory.
- Writable versus executable pages.
- How NX limits injected-code attacks.
- W^X policy and its caveats.

### Topic 11.6 — Address Space Layout Randomization (ASLR)

- Address predictability.
- Randomized mapping locations.
- Entropy and limitations.
- Interaction with other mitigations.

### Topic 11.7 — Buffer Overflows and Return-Oriented Programming

- Memory corruption at a conceptual level.
- Stack-buffer overflow.
- Why NX alone is insufficient.
- ROP gadget-chain concept.
- Defensive mitigations and layered security.

### Topic 11.8 — Sandboxing and Isolation

- Process isolation.
- Namespaces/cgroups as Linux supplementary topics.
- Seccomp and capability reduction.
- Filesystem/network restrictions.

### Topic 11.9 — Privilege Escalation Fundamentals

- User versus privileged identity.
- Misconfiguration and vulnerable privileged components.
- Least privilege and defense in depth.
- Safe defensive examples only.

---

# 13. Module 12 — Advanced OS & Modern Systems

**Level:** Intermediate → Advanced  
**Purpose:** Connect OS fundamentals to real systems, modern Linux and cloud infrastructure.

### Topic 12.1 — Stack vs Heap

- Lifetime and allocation model.
- Call frames and automatic storage.
- Dynamic allocation.
- Growth, limits and ownership.
- Language/runtime caveats.

### Topic 12.2 — Memory Leaks

- Allocated memory becoming unreachable or unreleased.
- Leak versus cache and intentional retention.
- Symptoms and debugging tools.
- Resource leaks beyond memory.

### Topic 12.3 — Kernel Threads

- Kernel execution threads.
- Relationship to user tasks.
- Work queues and kernel workers (supplementary).

### Topic 12.4 — System Calls vs Library Calls

- Function call within a process.
- Library wrapper.
- Actual kernel transition.
- Why not every library function invokes a system call.

### Topic 12.5 — Page Cache

- Caching file contents in memory.
- Read path and write-back basics.
- Interaction with filesystem and I/O.

### Topic 12.6 — Virtualization Fundamentals

- Host and guest.
- Hypervisor role.
- Type 1 versus Type 2 hypervisors.
- CPU, memory and device virtualization.

### Topic 12.7 — Containers vs Virtual Machines

- Shared host kernel versus guest kernel.
- Namespaces and cgroups (Linux context).
- Isolation boundaries.
- Startup, resource and security trade-offs.

### Topic 12.8 — NUMA Basics

- Non-uniform memory access.
- Local versus remote memory.
- CPU/memory affinity.
- Performance implications.

### Topic 12.9 — CPU Cache and Cache Coherence

- Cache hierarchy recap.
- Cache lines and locality.
- False sharing.
- Cache coherence motivation.
- MESI-style protocol as a supplementary example.
- Relationship to memory consistency; do not conflate the two.

### Topic 12.10 — Modern High-Performance I/O Review

- `select`/`poll`/`epoll` recap.
- `io_uring` recap.
- NAPI and interrupt moderation.
- Zero-copy concepts.
- eBPF observability and programmable hooks.
- C10K problem and modern connection handling.

### Topic 12.11 — Real-Time Operating Systems

- Hard versus soft real-time.
- Deadline and deterministic response.
- Real-time scheduling basics.
- Priority inversion and inheritance cross-link.
- Examples and limitations.

---

## 14. Source-to-blueprint traceability

### 14.1 Original student checklist sections

| Original source section | Blueprint destination |
|---|---|
| 4.1 OS Fundamentals | Module 01 |
| 4.2 Processes | Module 02 |
| 4.3 Threads and Multithreading | Module 03 |
| 4.4 CPU Scheduling | Module 04 |
| 4.5 Process Synchronisation | Module 05 |
| 4.6 Deadlocks | Module 06 |
| 4.7 Memory Management | Modules 07 and 08 |
| 4.8 File Systems and Storage | Module 09 |
| 4.9 Advanced OS Concepts | Modules 09–12, with explicit cross-links |

### 14.2 Original source-manifest module mapping

| Existing source module ID | Existing source module | New destination |
|---|---|---|
| `os-mod-1` | OS Fundamentals & Kernel Architecture | Module 01 |
| `os-mod-2` | Processes, Threads & Concurrency Models | Modules 02, 03 and 05 |
| `os-mod-3` | CPU Scheduling Algorithms | Module 04 |
| `os-mod-4` | Process Synchronization & Concurrency | Module 05 |
| `os-mod-5` | Deadlocks | Module 06 |
| `os-mod-6` | Memory Management & Paging | Module 07 |
| `os-mod-7` | Virtual Memory & Page Replacement | Module 08 |
| `os-mod-8` | File Systems & Storage Management | Module 09 |
| `os-mod-9` | I/O Systems & Device Management | Module 10 |
| `os-mod-10` | Protection, Security & Access Control | Module 11 |
| `os-mod-11` | Advanced OS Concepts & Modern High-Performance I/O | Modules 10 and 12 |

### 14.3 Original source topic/subtopic IDs

Preserve all `os-t-*` and `os-st-*` IDs from `source-of-truth.md` as aliases or source references. Map them to the new topic/lesson IDs in a machine-readable traceability file. Do not reuse an old ID for a different meaning.

---

## 15. Mandatory supplied OS practice questions (34)

**All questions below are mandatory.** Preserve the original ID, wording, category and difficulty. The supplied answer is the source answer basis, not necessarily the complete final lesson explanation. Verify technical details before expanding it; record any correction transparently.

### os-q-1 — Why is the operating system described as both a resource manager and an extended virtual machine?

- **Type:** Conceptual
- **Difficulty:** Foundation
- **Curriculum mapping:** Module 01 · Topic 1.2 — What Is an Operating System?
- **Supplied answer basis (preserve and verify):** As a resource manager, it arbitrates CPU time, memory space, and I/O access among competing processes. As an extended machine, it hides raw hardware complexity behind convenient abstractions like files, sockets, and virtual memory.
- **Authoring requirement:** Expand this into a thorough, student-friendly answer with reasoning, mechanism, a concrete example and caveats appropriate to the question. Do not merely restate the supplied answer.

### os-q-2 — What catastrophic failure would occur in a multi-tenant system if applications had raw, unmediated access to physical memory?

- **Type:** Application
- **Difficulty:** Foundation
- **Curriculum mapping:** Module 01 · Topic 1.1 / 1.6 — Why an OS and memory isolation
- **Supplied answer basis (preserve and verify):** Any process could read confidential data (passwords, keys) belonging to other processes or corrupt the kernel's code segment, crashing the machine.
- **Authoring requirement:** Expand this into a thorough, student-friendly answer with reasoning, mechanism, a concrete example and caveats appropriate to the question. Do not merely restate the supplied answer.

### os-q-3 — Why do monolithic kernels generally achieve higher I/O throughput than microkernels?

- **Type:** Analytical
- **Difficulty:** Intermediate
- **Curriculum mapping:** Module 01 · Topic 1.9 — Kernel architectures
- **Supplied answer basis (preserve and verify):** Microkernels require expensive Inter-Process Communication (IPC) and multiple user-to-kernel context switches whenever a driver communicates with a file system service, whereas monolithic kernels execute in-memory function calls within the same address space.
- **Authoring requirement:** Expand this into a thorough, student-friendly answer with reasoning, mechanism, a concrete example and caveats appropriate to the question. Do not merely restate the supplied answer.

### os-q-4 — What hardware mechanism prevents a user program from executing the x86 'CLI' (clear interrupts) instruction?

- **Type:** Interview
- **Difficulty:** Intermediate
- **Curriculum mapping:** Module 01 · Topic 1.6 — User mode versus kernel mode
- **Supplied answer basis (preserve and verify):** The CPU checks the Current Privilege Level (CPL) stored in the lowest bits of the CS register. If CPL > 0, the CPU refuses to execute 'CLI' and fires a General Protection Exception (#GP), jumping to the kernel's fault handler.
- **Authoring requirement:** Expand this into a thorough, student-friendly answer with reasoning, mechanism, a concrete example and caveats appropriate to the question. Do not merely restate the supplied answer.

### os-q-5 — Why must the kernel strictly copy and validate all user-space pointers passed in system call arguments before dereferencing them?

- **Type:** Interview
- **Difficulty:** Intermediate
- **Curriculum mapping:** Module 01 · Topic 1.7 — System calls and pointer validation
- **Supplied answer basis (preserve and verify):** To prevent Time-of-Check to Time-of-Use (TOCTOU) exploits and kernel memory overwrite attacks, where a malicious user thread modifies the memory pointer concurrently or passes an address pointing into kernel memory space.
- **Authoring requirement:** Expand this into a thorough, student-friendly answer with reasoning, mechanism, a concrete example and caveats appropriate to the question. Do not merely restate the supplied answer.

### os-q-6 — What is the primary purpose of the initial RAM filesystem (initramfs) during Linux booting?

- **Type:** Conceptual
- **Difficulty:** Intermediate
- **Curriculum mapping:** Module 01 · Topic 1.10 — Booting process and initramfs
- **Supplied answer basis (preserve and verify):** It provides a temporary root filesystem containing the modular device drivers (e.g. NVMe, RAID, LVM, encryption modules) needed to mount the actual permanent root storage partition.
- **Authoring requirement:** Expand this into a thorough, student-friendly answer with reasoning, mechanism, a concrete example and caveats appropriate to the question. Do not merely restate the supplied answer.

### os-q-7 — What is a zombie process in Unix-like systems, and how is its memory reclaimed?

- **Type:** Interview
- **Difficulty:** Intermediate
- **Curriculum mapping:** Module 02 · Topic 2.11 — Zombie processes
- **Supplied answer basis (preserve and verify):** A zombie process has terminated execution, but its exit status remains in its PCB so its parent can read it via wait() or waitpid(). Once the parent calls wait() (or init reaps it if orphaned), the kernel frees the PCB.
- **Authoring requirement:** Expand this into a thorough, student-friendly answer with reasoning, mechanism, a concrete example and caveats appropriate to the question. Do not merely restate the supplied answer.

### os-q-8 — Why is context switching between threads of the same process significantly cheaper than switching between two separate processes?

- **Type:** Interview
- **Difficulty:** Intermediate
- **Curriculum mapping:** Module 02 · Topic 2.7 / Module 03 · Topic 3.2 — Context switching and thread/process comparison
- **Supplied answer basis (preserve and verify):** Threads of the same process share the same virtual address space (identical page tables). Therefore, the CPU does not need to reload the page directory register (CR3), avoiding the costly invalidation of the Translation Lookaside Buffer (TLB).
- **Authoring requirement:** Expand this into a thorough, student-friendly answer with reasoning, mechanism, a concrete example and caveats appropriate to the question. Do not merely restate the supplied answer.

### os-q-9 — If Thread A has a pointer to a local variable on Thread B's stack, can Thread A legally read it?

- **Type:** Analytical
- **Difficulty:** Intermediate
- **Curriculum mapping:** Module 03 · Topic 3.2 — Shared process address space and thread stacks
- **Supplied answer basis (preserve and verify):** Yes, at the hardware and virtual memory level, all thread stacks in the same process reside in the same virtual address space. However, doing so is highly unsafe and violates scoping invariants.
- **Authoring requirement:** Expand this into a thorough, student-friendly answer with reasoning, mechanism, a concrete example and caveats appropriate to the question. Do not merely restate the supplied answer.

### os-q-10 — What problem arises when a pure user-level thread (ULT) executes a blocking synchronous I/O system call?

- **Type:** Interview
- **Difficulty:** Intermediate
- **Curriculum mapping:** Module 03 · Topic 3.3 — User-level threads and blocking calls
- **Supplied answer basis (preserve and verify):** Because the kernel is unaware of individual user threads, it sees the entire process making a blocking call and moves the entire process to the Waiting state, starving all other runnable user threads.
- **Authoring requirement:** Expand this into a thorough, student-friendly answer with reasoning, mechanism, a concrete example and caveats appropriate to the question. Do not merely restate the supplied answer.

### os-q-11 — Given P1 (BT=24, AT=0), P2 (BT=3, AT=0), P3 (BT=3, AT=0), calculate average waiting time under FCFS.

- **Type:** Analytical
- **Difficulty:** Foundation
- **Curriculum mapping:** Module 04 · Topic 4.4 — FCFS numerical practice
- **Supplied answer basis (preserve and verify):** Execution order: P1 [0-24], P2 [24-27], P3 [27-30]. Waiting times: P1=0, P2=24, P3=27. Average WT = (0 + 24 + 27) / 3 = 17ms. If scheduled in order P2, P3, P1, average WT drops to (0 + 3 + 6) / 3 = 3ms.
- **Authoring requirement:** Expand this into a thorough, student-friendly answer with reasoning, mechanism, a concrete example and caveats appropriate to the question. Do not merely restate the supplied answer.

### os-q-12 — Why is Shortest Job First (SJF) considered theoretically optimal but rarely implemented in general-purpose operating systems?

- **Type:** Interview
- **Difficulty:** Intermediate
- **Curriculum mapping:** Module 04 · Topic 4.5 — SJF
- **Supplied answer basis (preserve and verify):** Because an operating system kernel cannot know the exact duration of a future CPU burst before running it. Real kernels can only approximate it using exponential moving averages of previous bursts.
- **Authoring requirement:** Expand this into a thorough, student-friendly answer with reasoning, mechanism, a concrete example and caveats appropriate to the question. Do not merely restate the supplied answer.

### os-q-13 — What is the consequence of setting the Round Robin time quantum to 1 microsecond when context switching takes 2 microseconds?

- **Type:** Analytical
- **Difficulty:** Intermediate
- **Curriculum mapping:** Module 04 · Topic 4.8 — Round Robin quantum
- **Supplied answer basis (preserve and verify):** The CPU would spend 66% of its total time executing context switches and only 33% running actual user code, resulting in catastrophic system throughput degradation.
- **Authoring requirement:** Expand this into a thorough, student-friendly answer with reasoning, mechanism, a concrete example and caveats appropriate to the question. Do not merely restate the supplied answer.

### os-q-14 — Explain how Priority Inversion nearly caused the loss of the NASA Mars Pathfinder mission and how Priority Inheritance solved it.

- **Type:** Interview
- **Difficulty:** Advanced
- **Curriculum mapping:** Module 05 · Supplementary topic — Priority inversion and priority inheritance
- **Supplied answer basis (preserve and verify):** A low-priority meteorological task held an information bus mutex. A medium-priority communications task preempted it. The high-priority attitude control task blocked waiting for the mutex. The watchdog timer observed the high-priority task hung and repeatedly reset the computer. Enabling priority inheritance on the mutex allowed the low-priority task to run at high priority and release the lock immediately.
- **Authoring requirement:** Expand this into a thorough, student-friendly answer with reasoning, mechanism, a concrete example and caveats appropriate to the question. Do not merely restate the supplied answer.

### os-q-15 — Why does the Linux Completely Fair Scheduler (CFS) store runnable tasks in a Red-Black tree instead of a standard FIFO queue?

- **Type:** Interview
- **Difficulty:** Advanced
- **Curriculum mapping:** Module 04 · Supplementary topic — Linux CFS
- **Supplied answer basis (preserve and verify):** CFS needs O(1) retrieval of the leftmost task (minimum vruntime) and O(log N) insertion/rebalancing when a task's vruntime updates after executing, ensuring fair CPU time distribution regardless of dynamic workload variations.
- **Authoring requirement:** Expand this into a thorough, student-friendly answer with reasoning, mechanism, a concrete example and caveats appropriate to the question. Do not merely restate the supplied answer.

### os-q-16 — What is the difference between a race condition and a data race?

- **Type:** Conceptual
- **Difficulty:** Intermediate
- **Curriculum mapping:** Module 05 · Topic 5.1 — Race condition versus data race
- **Supplied answer basis (preserve and verify):** A data race occurs when two threads concurrently access the same memory location, at least one is a write, and there is no synchronization. A race condition is a broader semantic bug where the correctness of program output depends on non-deterministic thread interleaving.
- **Authoring requirement:** Expand this into a thorough, student-friendly answer with reasoning, mechanism, a concrete example and caveats appropriate to the question. Do not merely restate the supplied answer.

### os-q-17 — Explain the ABA problem in lock-free data structures using Compare-And-Swap (CAS) and how it is resolved.

- **Type:** Interview
- **Difficulty:** Advanced
- **Curriculum mapping:** Module 05 · Topic 5.14 — ABA problem and CAS
- **Supplied answer basis (preserve and verify):** Thread 1 reads pointer A. Thread 2 preempts, changes A to B, frees A, and allocates a new node coincidentally at address A. Thread 1 resumes and checks `CAS(address, A, new_val)`. The addresses match, so CAS succeeds, even though the internal state changed. Resolved via tagged pointers or hazard pointers.
- **Authoring requirement:** Expand this into a thorough, student-friendly answer with reasoning, mechanism, a concrete example and caveats appropriate to the question. Do not merely restate the supplied answer.

### os-q-18 — Why is a spinlock completely useless and actively harmful on a single-core uniprocessor system?

- **Type:** Interview
- **Difficulty:** Intermediate
- **Curriculum mapping:** Module 05 · Topic 5.13 — Spinlocks
- **Supplied answer basis (preserve and verify):** If a thread spins waiting for a lock held by another thread, the spinning thread prevents the lock-holding thread from ever being scheduled to release the lock, wasting CPU until its quantum expires.
- **Authoring requirement:** Expand this into a thorough, student-friendly answer with reasoning, mechanism, a concrete example and caveats appropriate to the question. Do not merely restate the supplied answer.

### os-q-19 — Why can a binary semaphore NOT be safely substituted for a mutex when priority inheritance is required?

- **Type:** Interview
- **Difficulty:** Advanced
- **Curriculum mapping:** Module 05 · Topic 5.18 — Mutex versus binary semaphore
- **Supplied answer basis (preserve and verify):** A mutex has the concept of 'ownership': only the thread that locked the mutex may unlock it. A semaphore has no owner (Thread A can wait and Thread B can signal). Without ownership, the OS cannot know which thread's priority to elevate during Priority Inversion.
- **Authoring requirement:** Expand this into a thorough, student-friendly answer with reasoning, mechanism, a concrete example and caveats appropriate to the question. Do not merely restate the supplied answer.

### os-q-20 — In the Dining Philosophers problem, how does enforcing an asymmetric rule (e.g. odd philosophers pick left fork first; even pick right) prevent deadlock?

- **Type:** Analytical
- **Difficulty:** Intermediate
- **Curriculum mapping:** Module 05 · Topic 5.17 — Dining Philosophers
- **Supplied answer basis (preserve and verify):** It breaks Coffman's Circular Wait condition. If every philosopher attempts to pick forks in the same cyclical direction, all can hold their left fork simultaneously. Asymmetry guarantees at least one philosopher competes for the same fork first, preventing a circular wait cycle.
- **Authoring requirement:** Expand this into a thorough, student-friendly answer with reasoning, mechanism, a concrete example and caveats appropriate to the question. Do not merely restate the supplied answer.

### os-q-21 — How does strict global lock ordering eliminate the possibility of a deadlock?

- **Type:** Interview
- **Difficulty:** Intermediate
- **Curriculum mapping:** Module 06 · Topic 6.4 — Global lock ordering
- **Supplied answer basis (preserve and verify):** By assigning a global integer rank to every lock and mandating that threads acquire locks in strictly increasing order, it is mathematically impossible to form a circular wait cycle (a thread holding lock N can never request lock M where M < N).
- **Authoring requirement:** Expand this into a thorough, student-friendly answer with reasoning, mechanism, a concrete example and caveats appropriate to the question. Do not merely restate the supplied answer.

### os-q-22 — Why do modern consumer and server operating systems (Windows, Linux, macOS) ignore deadlock avoidance algorithms and adopt the 'Ostrich algorithm'?

- **Type:** Conceptual
- **Difficulty:** Intermediate
- **Curriculum mapping:** Module 06 · Supplementary topic — Deadlock handling in general-purpose OSs
- **Supplied answer basis (preserve and verify):** Because Banker's algorithm requires processes to declare their maximum resource needs in advance (impossible for dynamic programs) and incurs excessive computational overhead on every resource allocation. It is cheaper to let deadlocks occur rarely and reboot or let developers debug them.
- **Authoring requirement:** Expand this into a thorough, student-friendly answer with reasoning, mechanism, a concrete example and caveats appropriate to the question. Do not merely restate the supplied answer.

### os-q-23 — What is the difference between internal fragmentation and external fragmentation?

- **Type:** Conceptual
- **Difficulty:** Foundation
- **Curriculum mapping:** Module 07 · Topics 7.6–7.7 — Fragmentation
- **Supplied answer basis (preserve and verify):** External fragmentation occurs when total free memory is sufficient to satisfy a request, but it is divided into non-contiguous scattered holes. Internal fragmentation occurs when memory is allocated in fixed-size blocks (e.g. 4KB pages) and a process requests less than the block size, leaving wasted space inside the block.
- **Authoring requirement:** Expand this into a thorough, student-friendly answer with reasoning, mechanism, a concrete example and caveats appropriate to the question. Do not merely restate the supplied answer.

### os-q-24 — In a 32-bit system with 4KB pages, calculate the number of bits allocated to the page offset and the maximum number of entries in a single flat page table.

- **Type:** Analytical
- **Difficulty:** Intermediate
- **Curriculum mapping:** Module 07 · Topic 7.10 — Paging address calculation
- **Supplied answer basis (preserve and verify):** 4KB = 2^12 bytes, so 12 bits are allocated to the offset. The remaining 32 - 12 = 20 bits index pages, allowing 2^20 = 1,048,576 entries in a flat page table (consuming 4MB per process).
- **Authoring requirement:** Expand this into a thorough, student-friendly answer with reasoning, mechanism, a concrete example and caveats appropriate to the question. Do not merely restate the supplied answer.

### os-q-25 — What is the difference between a minor (soft) page fault and a major (hard) page fault?

- **Type:** Interview
- **Difficulty:** Intermediate
- **Curriculum mapping:** Module 08 · Topic 8.3 — Minor versus major page faults
- **Supplied answer basis (preserve and verify):** A minor page fault occurs when the page is already in physical memory (e.g. shared library loaded by another process or reclaimed from the page cache); it requires only updating page table mappings. A major page fault requires a physical disk read to load the page from swap or file backing.
- **Authoring requirement:** Expand this into a thorough, student-friendly answer with reasoning, mechanism, a concrete example and caveats appropriate to the question. Do not merely restate the supplied answer.

### os-q-26 — Why do 64-bit operating systems use 4-level or 5-level page tables instead of a single flat table?

- **Type:** Interview
- **Difficulty:** Advanced
- **Curriculum mapping:** Module 08 · Topic 8.15 — Multilevel page tables
- **Supplied answer basis (preserve and verify):** A flat page table for a 64-bit address space would require 2^52 entries (petabytes of RAM per process). Multi-level paging creates a tree where only branches corresponding to allocated virtual memory regions are actually instantiated, reducing per-process overhead to a few kilobytes for sparse programs.
- **Authoring requirement:** Expand this into a thorough, student-friendly answer with reasoning, mechanism, a concrete example and caveats appropriate to the question. Do not merely restate the supplied answer.

### os-q-27 — Given TLB access time = 1ns, memory access time = 50ns, and TLB hit rate = 98%, calculate the Effective Memory Access Time (EMAT) with a 4-level page table.

- **Type:** Analytical
- **Difficulty:** Advanced
- **Curriculum mapping:** Module 08 · Topic 8.16 — EMAT
- **Supplied answer basis (preserve and verify):** On TLB Hit (98%): 1ns (TLB) + 50ns (Data Read) = 51ns. On TLB Miss (2%): 1ns (TLB) + 4 * 50ns (4-level page walk) + 50ns (Data Read) = 251ns. EMAT = (0.98 * 51ns) + (0.02 * 251ns) = 49.98ns + 5.02ns = 55ns.
- **Authoring requirement:** Expand this into a thorough, student-friendly answer with reasoning, mechanism, a concrete example and caveats appropriate to the question. Do not merely restate the supplied answer.

### os-q-28 — What is Belady's Anomaly, and which page replacement algorithm famously exhibits it?

- **Type:** Conceptual
- **Difficulty:** Intermediate
- **Curriculum mapping:** Module 08 · Topic 8.10 — Belady’s Anomaly
- **Supplied answer basis (preserve and verify):** Belady's Anomaly is the counter-intuitive phenomenon where allocating more physical page frames causes the number of page faults to increase for a given reference string. FIFO exhibits Belady's Anomaly; stack-based algorithms like LRU are mathematically immune.
- **Authoring requirement:** Expand this into a thorough, student-friendly answer with reasoning, mechanism, a concrete example and caveats appropriate to the question. Do not merely restate the supplied answer.

### os-q-29 — Why does deleting a file in Unix ('rm filename') not immediately delete the data if another hard link exists?

- **Type:** Interview
- **Difficulty:** Intermediate
- **Curriculum mapping:** Module 09 · Topic 9.6 — Inodes and hard links
- **Supplied answer basis (preserve and verify):** The 'rm' command calls the `unlink()` syscall, which decrements the inode's hard link reference counter. The kernel only deallocates the disk data blocks when the link count reaches 0 AND no running process has an open file descriptor referencing that inode.
- **Authoring requirement:** Expand this into a thorough, student-friendly answer with reasoning, mechanism, a concrete example and caveats appropriate to the question. Do not merely restate the supplied answer.

### os-q-30 — What is the difference between 'metadata journaling' and 'full data journaling' in file systems like ext4?

- **Type:** Analytical
- **Difficulty:** Advanced
- **Curriculum mapping:** Module 09 · Supplementary topic — Journaling and crash consistency
- **Supplied answer basis (preserve and verify):** Metadata journaling logs only file system structural changes (inodes, allocation bitmaps) to the journal while writing payload data directly to file blocks. Full data journaling logs both file payload and metadata to the journal, providing maximum consistency at the cost of double write amplification.
- **Authoring requirement:** Expand this into a thorough, student-friendly answer with reasoning, mechanism, a concrete example and caveats appropriate to the question. Do not merely restate the supplied answer.

### os-q-31 — Why does high-speed networking (e.g. 100GbE) use NAPI polling instead of per-packet hardware interrupts?

- **Type:** Interview
- **Difficulty:** Advanced
- **Curriculum mapping:** Module 10 · Topic 10.8 — Linux NAPI
- **Supplied answer basis (preserve and verify):** At 100Gbps, millions of packets arrive per second. Firing a hardware interrupt for every packet triggers 'interrupt storm' / livelock, where the CPU spends 100% of its time servicing ISRs and cannot process payloads. Hybrid polling (NAPI) turns off interrupts during high load and polls the ring buffer.
- **Authoring requirement:** Expand this into a thorough, student-friendly answer with reasoning, mechanism, a concrete example and caveats appropriate to the question. Do not merely restate the supplied answer.

### os-q-32 — How does Return-Oriented Programming (ROP) bypass the hardware NX (No-Execute) stack protection?

- **Type:** Interview
- **Difficulty:** Advanced
- **Curriculum mapping:** Module 11 · Topic 11.7 — ROP and NX protection
- **Supplied answer basis (preserve and verify):** ROP does not inject new code onto the non-executable stack. Instead, it chains together small snippets of existing legitimate code ('gadgets') already residing in executable memory pages, ending in 'ret' instructions, executing malicious operations using existing code.
- **Authoring requirement:** Expand this into a thorough, student-friendly answer with reasoning, mechanism, a concrete example and caveats appropriate to the question. Do not merely restate the supplied answer.

### os-q-33 — Why does epoll dramatically outperform select/poll when monitoring 100,000 connections with only 50 active at any moment?

- **Type:** Interview
- **Difficulty:** Advanced
- **Curriculum mapping:** Module 10 · Topic 10.7 — epoll versus select/poll
- **Supplied answer basis (preserve and verify):** Select requires copying a 100,000-FD array into the kernel and scanning every descriptor to see if it is ready (O(N) overhead). Epoll maintains an in-kernel wait list; when a socket receives data, the NIC ISR appends it to epoll's ready list. `epoll_wait()` only returns the 50 ready descriptors in O(1) time.
- **Authoring requirement:** Expand this into a thorough, student-friendly answer with reasoning, mechanism, a concrete example and caveats appropriate to the question. Do not merely restate the supplied answer.

### os-q-34 — How does Linux io_uring eliminate system call overhead for high-frequency disk and network operations?

- **Type:** Interview
- **Difficulty:** Advanced
- **Curriculum mapping:** Module 10 · Topic 10.9 — io_uring
- **Supplied answer basis (preserve and verify):** By sharing two lock-free circular ring buffers (SQ and CQ) between user space and kernel via mapped memory. The application writes I/O requests into the SQ and kernel worker threads consume them without context switching into kernel mode.
- **Authoring requirement:** Expand this into a thorough, student-friendly answer with reasoning, mechanism, a concrete example and caveats appropriate to the question. Do not merely restate the supplied answer.

## 16. Mandatory original must-know interview questions

These eight questions were supplied separately in the original OS checklist. Preserve them as independent interview-bank entries even when they overlap with `os-q-*` questions.

1. **What happens during a context switch?**  
   Mapping: Module 02, Topic 2.7. Expand with a step-by-step save/schedule/restore execution trace.
2. **Why are threads lighter than processes?**  
   Mapping: Module 03, Topic 3.2. Compare address spaces, resource sharing, creation and switching costs without claiming costs are universally fixed.
3. **Can a single-threaded process have a deadlock?**  
   Mapping: Module 06, Topic 6.1 and supplementary deadlock scenarios. Explain that classical resource deadlocks can involve processes/threads and resource dependencies; distinguish a process self-deadlock, blocking dependency and single-threaded program waiting on an external condition.
4. **What happens when a page fault occurs?**  
   Mapping: Module 08, Topics 8.3–8.4. Distinguish valid demand paging from invalid/protection faults.
5. **Why is virtual memory required?**  
   Mapping: Module 08, Topic 8.1. Explain isolation, abstraction, sparse address spaces and controlled mapping; do not reduce virtual memory to swap.
6. **How does a mutex differ from a semaphore?**  
   Mapping: Module 05, Topic 5.18. Explain ownership, signaling and counting semantics.
7. **What happens when multiple threads update a shared variable?**  
   Mapping: Module 03, Topic 3.11 and Module 05, Topic 5.1. Work through an interleaving and show the lost-update race.
8. **What is the difference between concurrency and parallelism?**  
   Mapping: Module 03, Topics 3.6–3.7. Use timeline diagrams for one-core interleaving and multi-core simultaneous execution.

Do not discard these because related questions already exist in the 34-question bank. They are separately supplied source items.

---

## 17. Module-level interview benchmarks from the source manifest

Preserve these benchmark prompts and map them to the corresponding modules. Expand the expected answer/rubric rather than replacing the prompt.

| Original source module | Supplied interview benchmark | New module |
|---|---|---|
| `os-mod-1` | Explain the exact CPU execution steps of a `read()` system call from user-space libc to kernel execution and return. | 01 |
| `os-mod-2` | Explain what happens to CPU registers and memory page tables when switching between threads of the same process versus threads of different processes. | 02–03 |
| `os-mod-3` | Calculate Waiting Time and Turnaround Time across FCFS, SJF and Round Robin for a given process arrival trace and explain the Convoy Effect. | 04 |
| `os-mod-4` | Implement a thread-safe bounded blocking queue using mutexes and condition variables without busy waiting. | 05 |
| `os-mod-5` | Walk through Banker's Algorithm safety check with a multi-resource matrix to verify whether a state is safe or unsafe. | 06 |
| `os-mod-6` | Calculate page number and byte offset for a given virtual address with 4KB page size and describe internal fragmentation. | 07 |
| `os-mod-7` | Walk through physical address translation on x86-64 with a 4-level page table and calculate effective memory access time with TLB hit rates. | 08 |
| `os-mod-8` | Explain how Linux ext4 uses inodes, extent trees and journaling to recover file-system consistency after sudden power loss. | 09 |
| `os-mod-9` | Explain how DMA prevents the CPU from being saturated by high-throughput network packet processing. | 10 |
| `os-mod-10` | Explain how ASLR and the NX stack bit defend against buffer-overflow attacks. | 11 |
| `os-mod-11` | Explain the C10K problem, compare select/poll with epoll, and explain how io_uring reduces syscall overhead. | 10–12 |

---

## 18. How every topic must be taught

### 18.1 The lesson must read like a connected textbook chapter

The student should feel guided through an idea, not presented with a pile of notes. Use coherent prose and transitions. Explain each new term before relying on it. Build a mental picture before introducing register names, flags, kernel structures or specialized implementation details.

### 18.2 Required teaching progression

Use these stages as a guide; adapt them to the concept rather than forcing every lesson into identical headings:

1. **Motivation:** Begin with a real problem, observation or question.
2. **Prerequisite bridge:** Recall only the background needed for this lesson.
3. **Intuition:** Build a simple mental model before formal terminology.
4. **Precise explanation:** Define the concept accurately and distinguish it from similar concepts.
5. **Mechanism:** Explain how it works internally, in correct sequence.
6. **Worked example:** Trace a concrete example from start to finish.
7. **Visualization:** Add a diagram, timeline, state machine, memory map or table when it makes relationships clearer.
8. **Real-system connection:** Explain where the concept appears in an OS or application.
9. **Trade-offs and misconceptions:** Explain limitations and common confusions.
10. **Understanding checkpoint:** Ask one or more questions that reveal whether the student has built the right mental model.
11. **Connections:** Link to the next lesson and relevant earlier concepts.

### 18.3 Depth rules

- Do not compress a major topic into a few lines.
- Do not add filler to meet an arbitrary word count.
- A small concept may need a concise lesson; a complex concept may need several substantial lessons.
- If a topic includes several distinct mechanisms, split them into separate lessons rather than listing them in one dense section.
- Keep each lesson focused on one important learning objective or a tightly related group of objectives.
- Use examples that grow in complexity: simple first, realistic second, edge case third.

### 18.4 Worked examples

Where applicable, include complete intermediate steps:
- Scheduling: arrivals, burst times, Gantt chart, completion time, turnaround time, waiting time, response time and averages.
- Paging: address bits, page number, offset, PTE lookup and physical address.
- Page replacement: frame state after each reference and total page faults.
- Banker's Algorithm: Available, Allocation, Max, Need, safe-sequence scan and conclusion.
- Synchronization: thread interleaving, lock state, semaphore count or condition-variable predicate.
- Disk scheduling: head movement at every step and total movement.
- Context switching: events in chronological order and what state is saved/restored.

State assumptions clearly. Do not skip arithmetic or unexplained transitions.

### 18.5 Diagrams and images

Use visuals when they teach a mechanism. Every image/diagram must be introduced and interpreted in the lesson. Do not use an image as a substitute for explanation. Verify that labels, arrows, states and terminology are correct. Prefer original diagrams and interactive visualizations; do not reproduce proprietary graphics from external learning sites.

### 18.6 Questions and answers

For conceptual questions, explain the reasoning, not only the final definition. For numerical questions, show the full solution. For analytical questions, state assumptions and compare alternatives. For interview questions, include a concise interview-ready response after the deep explanation. Keep all original questions unchanged and add supplementary questions separately.

---

## 19. Required question-answer presentation format

For each supplied or supplementary question, use this structure where relevant:

1. **Question:** Preserve the exact supplied wording for source questions.
2. **Direct answer:** A concise accurate response.
3. **Build intuition:** Explain the idea in plain language.
4. **Detailed reasoning/mechanism:** Work through why the answer is correct.
5. **Example or execution trace:** Use a concrete situation, calculation or diagram.
6. **Important nuance:** Explain assumptions, exceptions or implementation differences.
7. **Interview-ready answer:** A short version the student can explain aloud.

For numerical questions, replace generic sections with Given, Required, Formula/Method, Step-by-step solution, Result and interpretation.

The supplied answer basis in Section 15 must be preserved in the source record. If it is inaccurate, incomplete or too broad, add a correction note and publish a technically validated expanded answer; do not silently alter the baseline.

---

## 20. Laboratory mapping

These are suggested learning experiences. A lab is not “available” until implemented and tested.

| Module | Suggested laboratory |
|---|---|
| 01 | System-call path explorer; user/kernel mode transition demonstration; boot-sequence timeline |
| 02 | Process-state transition simulator; process creation tree; IPC comparison playground |
| 03 | Process/thread memory-sharing visualizer; concurrency timeline |
| 04 | CPU scheduling simulator supporting FCFS, SJF, SRTF, Priority and RR with Gantt chart and metrics |
| 05 | Race-condition interleaving playground; mutex/semaphore/condition-variable simulator; producer-consumer and dining philosophers |
| 06 | Resource-allocation graph and Banker's Algorithm simulator |
| 07 | Contiguous allocation and paging address-translation visualizer |
| 08 | Page-fault walkthrough; FIFO/LRU/Optimal/LFU simulator; TLB/EMAT calculator |
| 09 | File-allocation visualizer; inode/directory explorer; disk-scheduling simulator |
| 10 | Interrupt vs polling vs DMA demonstration; ring-buffer and event-notification simulator |
| 11 | Page-permission and ASLR/NX conceptual sandbox (safe, non-exploitative) |
| 12 | Container vs VM architecture explorer; NUMA/cache-locality visualization; epoll/io_uring conceptual comparison |

Use existing KernelCS demonstrations when suitable. Link a lab from the lesson it teaches. If a lab is missing, mark it as planned/unavailable; never display a fake working control.

---

## 21. Curriculum coverage checklist

Antigravity must create a machine-readable checklist and mark each item as `mapped`, `content-drafted`, `validated` or `implemented`. It must not use a single vague “complete” flag for an entire module.

### Original student checklist

- [ ] 4.1 OS Fundamentals — every listed item represented.
- [ ] 4.2 Processes — every listed item represented.
- [ ] 4.3 Threads and Multithreading — every listed item represented.
- [ ] 4.4 CPU Scheduling — every listed item and numerical practice represented.
- [ ] 4.5 Process Synchronisation — every listed item represented.
- [ ] 4.6 Deadlocks — every listed item represented.
- [ ] 4.7 Memory Management — every listed item represented.
- [ ] 4.8 File Systems and Storage — every listed item represented.
- [ ] 4.9 Advanced OS Concepts — every listed item represented.
- [ ] Eight original must-know interview questions preserved.

### Source manifest

- [ ] All 34 questions `os-q-1` through `os-q-34` preserved verbatim.
- [ ] All 34 supplied answer bases retained for traceability and technically reviewed.
- [ ] All 11 original source module IDs mapped.
- [ ] All original source topic IDs `os-t-*` mapped.
- [ ] All original source subtopic IDs `os-st-*` mapped.
- [ ] All 11 module interview benchmarks preserved.

### Additional validation

- [ ] No duplicate or orphan topic IDs.
- [ ] All lessons have a module and topic parent.
- [ ] All lesson prerequisites point to valid lessons/topics.
- [ ] All previous/next lesson links are correct.
- [ ] All practice questions map to relevant learning units.
- [ ] All lab links point to a real implementation or are labelled unavailable.
- [ ] Module/topic/lesson/question/lab counts are calculated from data.
- [ ] All supplementary content is labelled as supplementary.

---

## 22. Antigravity implementation contract

Antigravity must follow this sequence:

### Phase A — Blueprint validation only

1. Read this file and the permanent source-of-truth manifest.
2. Compare every original checklist item against the 12 modules.
3. Compare every question ID and wording against Section 15.
4. Report missing, ambiguous or incorrectly mapped items.
5. Do not generate lesson content or modify the UI in this phase.
6. Stop for owner review.

### Phase B — Schema and navigation

After approval, implement or extend the data model to support:

`Subject → Module → Topic → Lesson → Sections`

Preserve existing IDs as source aliases. Keep original source wording/question data available. Add progress at lesson level and calculate topic/module completion from child units. Do not generate all educational content yet.

Stop for review after schema and navigation work.

### Phase C — Module-by-module content generation

Generate **Module 01 only**. Complete every topic and lesson in that module. Include mapped source questions, expanded answers, learning checks and any implemented lab connections. Run the validation checklist, update the traceability manifest and show the work for review.

Stop. Do not start Module 02 until the owner explicitly approves Module 01.

Repeat this gate for each module. Never generate the whole OS subject in one massive unreviewed pass.

### Phase D — Subject-level audit

After all 12 modules are approved:

1. Reconcile the completed site against all original checklist items.
2. Reconcile every original question and answer.
3. Verify source module/topic/subtopic IDs are traceable.
4. Check technical accuracy and consistency.
5. Check navigation, progress, tabs and lab integrations.
6. Report any remaining gaps honestly.

Do not proceed to Computer Networks until OS is explicitly approved.

---

## 23. Content quality acceptance criteria

A lesson is ready only when:

- It teaches one focused concept or a tightly connected concept group.
- A student can understand the motivation and prerequisite ideas.
- Technical terms are explained before being used heavily.
- The internal mechanism is described accurately and in order.
- A concrete example or worked trace supports the explanation where useful.
- Visuals clarify rather than replace teaching.
- Important limitations and misconceptions are covered.
- It connects logically to adjacent lessons.
- Its question(s) test understanding, not just recall.
- It has been checked against authoritative technical material.

A topic heading, definition and a few bullet points do not constitute a completed lesson.

**Final teaching standard:** A student who is new to the topic should be able to read the lesson, construct a mental model of the mechanism, work through an example and explain the concept in their own words without needing to immediately leave KernelCS for a basic explanation.
