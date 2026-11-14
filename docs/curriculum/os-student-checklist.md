# KernelCS — Operating Systems Student Checklist

> **Purpose:** A student-facing progress checklist for the approved OS curriculum. Use it alongside `os-blueprint.md` for the full lesson design and explanations.
>
> **Completion rule:** Tick a topic only after studying its lesson and being able to explain the main idea in your own words. Tick individual learning units as you master them. Use the question trackers to check practice and interview readiness.

## How to use this checklist

- `[ ]` Not yet completed.
- `[x]` Completed and understood.
- For a topic with multiple learning units, complete the child items as well as the parent topic.
- Do not mark a lesson complete just because you have read it once. Try to explain it without notes and work through its example or exercise.
- The list includes the original supplied OS topics plus clearly marked supplementary concepts from the approved blueprint.

## Progress overview

- [ ] Module 01 — OS Fundamentals & Kernel Architecture
- [ ] Module 02 — Processes & Process Management
- [ ] Module 03 — Threads & Multithreading
- [ ] Module 04 — CPU Scheduling
- [ ] Module 05 — Process Synchronization & Concurrency
- [ ] Module 06 — Deadlocks
- [ ] Module 07 — Memory Management
- [ ] Module 08 — Virtual Memory & Page Replacement
- [ ] Module 09 — File Systems & Storage
- [ ] Module 10 — I/O Systems & Device Management
- [ ] Module 11 — OS Protection, Security & Access Control
- [ ] Module 12 — Advanced OS & Modern Systems

---

## Module 01 — OS Fundamentals & Kernel Architecture

### [ ] Topic 1.1 — Why Do We Need an Operating System?

- [ ] What a computer looks like without an OS.
- [ ] Applications, hardware and the problem of sharing resources.
- [ ] Why programs should not directly control every device.
- [ ] Isolation: why one program must not freely overwrite another program's memory.
- [ ] The OS as a mediator between applications and hardware.

### [ ] Topic 1.2 — What Is an Operating System?

- [ ] Definition and purpose of an OS.
- [ ] OS as a resource manager.
- [ ] OS as an extended/virtual machine.
- [ ] Kernel versus the complete operating-system environment.
- [ ] Examples of OS responsibilities in an ordinary application launch.

### [ ] Topic 1.3 — Functions of an Operating System

- [ ] Process and CPU management.
- [ ] Main-memory management.
- [ ] File and secondary-storage management.
- [ ] I/O and device management.
- [ ] Protection and security.
- [ ] User interface and system services.
- [ ] Resource accounting and error handling.

### [ ] Topic 1.4 — Types of Operating Systems

- [ ] Batch Operating System.
- [ ] Multiprogramming Operating System.
- [ ] Multitasking Operating System.
- [ ] Multiprocessing Operating System.
- [ ] Time-sharing Operating System.
- [ ] Distributed Operating System.

### [ ] Topic 1.5 — Kernel and Shell

- [ ] What is the kernel?
- [ ] What is a shell?
- [ ] Kernel responsibilities and privilege.
- [ ] Command interpreter versus graphical shell.
- [ ] How a shell request reaches an OS service.
- [ ] User space and kernel space at a high level.

### [ ] Topic 1.6 — User Mode vs Kernel Mode

- [ ] Why privilege separation is necessary.
- [ ] User mode and kernel mode.
- [ ] Privileged and unprivileged instructions.
- [ ] Hardware-enforced protection boundaries.
- [ ] x86 privilege rings as an architecture-specific example.
- [ ] What happens when user code attempts a privileged operation.

### [ ] Topic 1.7 — System Calls

- [ ] Why applications need system calls.
- [ ] System call versus ordinary function call.
- [ ] Library/API wrapper versus kernel system-call interface.
- [ ] System-call number and argument passing.
- [ ] Entry into the kernel, service execution and return to user space.
- [ ] Examples: `read`, `write`, `open`, `close`, `fork` and `exec` (platform context must be stated).
- [ ] User-pointer validation and safe data transfer.

### [ ] Topic 1.8 — Interrupts, Exceptions and Traps

- [ ] Why CPUs need asynchronous events.
- [ ] Hardware interrupt.
- [ ] Exception/fault.
- [ ] Software trap and system-call entry.
- [ ] Interrupt vector/descriptor and handler at a conceptual level.
- [ ] Saving execution state and returning from an event.
- [ ] Difference between interrupt, exception, trap and system call.

### [ ] Topic 1.9 — Monolithic, Microkernel and Hybrid Architectures

- [ ] What belongs inside a kernel?
- [ ] Monolithic kernel architecture.
- [ ] Microkernel architecture.
- [ ] Hybrid kernel design.
- [ ] IPC and privilege-boundary costs.
- [ ] Reliability, fault isolation, performance and maintainability trade-offs.
- [ ] Examples: Linux, Mach-derived systems and Windows NT architecture, with precise caveats.

### [ ] Topic 1.10 — The Booting Process

- [ ] What happens when a computer powers on?
- [ ] Firmware and POST.
- [ ] BIOS versus UEFI.
- [ ] Boot device selection and bootloader.
- [ ] MBR versus EFI System Partition (ESP), where relevant.
- [ ] Bootloader-to-kernel handoff.
- [ ] Kernel initialization.
- [ ] initramfs/initrd and mounting the real root filesystem.
- [ ] PID 1 and user-space initialization (Linux-specific path).

**Module interview benchmark**

- [ ] Trace a `read()` request from an application/library wrapper through system-call entry, kernel validation, file/device layers and return to user space. State the platform assumptions and distinguish the generic path from Linux/x86-64 details.

**Module mastery check**

- [ ] I can explain the module’s main ideas without reading the lesson.
- [ ] I can connect its topics to earlier modules.
- [ ] I have completed the mapped practice questions.
- [ ] I can answer the module interview benchmark aloud.

---

## Module 02 — Processes & Process Management

### [ ] Topic 2.1 — What Is a Process?

- [ ] Program versus process.
- [ ] Process as an execution instance.
- [ ] Process address space and execution context.
- [ ] Resources associated with a process.
- [ ] Multiple instances of the same program.
- [ ] A simple application-launch walkthrough.

### [ ] Topic 2.2 — Process Memory Layout

- [ ] Text/code segment.
- [ ] Initialized and uninitialized data.
- [ ] Heap.
- [ ] Stack.
- [ ] Memory-mapped regions and shared libraries (introductory).
- [ ] How the layout relates to a process's virtual address space.

### [ ] Topic 2.3 — Process Control Block (PCB)

- [ ] Why the OS needs process metadata.
- [ ] Process identifier and state.
- [ ] Program counter and register context.
- [ ] Scheduling information.
- [ ] Memory-management information.
- [ ] Open files and I/O/accounting information.
- [ ] OS-specific representation such as Linux `task_struct` (supplementary, implementation-specific).

### [ ] Topic 2.4 — Process States

- [ ] New.
- [ ] Ready.
- [ ] Running.
- [ ] Waiting/Blocked.
- [ ] Terminated.
- [ ] Suspended states as an optional extension.

### [ ] Topic 2.5 — Process State Transition Diagram

- [ ] Ready → Running.
- [ ] Running → Ready through preemption.
- [ ] Running → Waiting through a blocking event.
- [ ] Waiting → Ready after event completion.
- [ ] Exit and termination.
- [ ] Events that cause each transition.
- [ ] Trace realistic process timelines.

### [ ] Topic 2.6 — Process Creation and Termination

- [ ] Why processes create other processes.
- [ ] Process creation model.
- [ ] `fork()` and `exec()` in Unix-like systems.
- [ ] Parent-child relationship.
- [ ] Exit status and `wait()`/`waitpid()`.
- [ ] Graceful termination versus abnormal termination.
- [ ] Copy-on-write connection (cross-link to Module 08).

### [ ] Topic 2.7 — Context Switching

- [ ] Why a CPU switches execution contexts.
- [ ] Timer interrupt, blocking and preemption as triggers.
- [ ] What state must be saved and restored.
- [ ] Kernel stack and process/thread context.
- [ ] Switching between threads of one process versus different processes.
- [ ] Address-space changes, TLB implications and cache effects.
- [ ] Why a context switch is overhead rather than useful application work.

### [ ] Topic 2.8 — Process Scheduling: Queues and Schedulers

- [ ] Ready and waiting queues.
- [ ] Long-term, medium-term and short-term scheduler concepts.
- [ ] Dispatcher and context switch relationship.
- [ ] Scheduling decision points.
- [ ] Link to Module 04 for algorithms and numerical problems.

### [ ] Topic 2.9 — Parent and Child Processes

- [ ] Process hierarchy.
- [ ] Parent-child creation.
- [ ] Inheritance of selected resources/attributes.
- [ ] Waiting and exit-status collection.
- [ ] Orphan and zombie distinction.

### [ ] Topic 2.10 — Orphan Processes

- [ ] What makes a process orphaned.
- [ ] Parent termination before child termination.
- [ ] Re-parenting/reaping behavior in Unix-like systems.
- [ ] Why an orphan is not necessarily a malfunction.

### [ ] Topic 2.11 — Zombie Processes

- [ ] Process has exited but has not yet been reaped.
- [ ] Why exit status must remain available.
- [ ] Role of `wait()`/`waitpid()`.
- [ ] What resources are released and what minimal process-table information remains.
- [ ] How zombies are reaped.

### [ ] Topic 2.12 — Inter-Process Communication (IPC)

- [ ] Why processes need to communicate.
- [ ] Data exchange and synchronization requirements.
- [ ] Shared-memory model.
- [ ] Message-passing model.
- [ ] Local versus network IPC.

### [ ] Topic 2.13 — Shared Memory

- [ ] Creating and attaching a shared region.
- [ ] How processes access the same physical backing.
- [ ] Synchronization requirements and race conditions.
- [ ] Benefits and risks.

### [ ] Topic 2.14 — Message Passing

- [ ] Send/receive model.
- [ ] Direct and indirect communication.
- [ ] Blocking and non-blocking operations.
- [ ] Buffering and message queues.
- [ ] Shared memory versus message passing.

### [ ] Topic 2.15 — Pipes

- [ ] Anonymous pipe concept.
- [ ] Producer/consumer byte stream.
- [ ] File descriptors and parent-child use.
- [ ] Unidirectional/bidirectional platform caveats.
- [ ] EOF and blocking behavior.

### [ ] Topic 2.16 — Named Pipes (FIFOs)

- [ ] Why a named pipe is needed.
- [ ] Filesystem name and FIFO semantics.
- [ ] Communication between unrelated processes.
- [ ] Opening and blocking behavior.
- [ ] Anonymous pipe versus FIFO.

### [ ] Topic 2.17 — Signals

- [ ] What a signal represents.
- [ ] Signal generation and delivery.
- [ ] Default dispositions and handlers.
- [ ] Blocking and pending signals.
- [ ] Safe handling and async-signal-safety caveat.
- [ ] Examples such as termination and child-status notification.

### [ ] Topic 2.18 — Sockets as IPC

- [ ] What a socket is.
- [ ] Unix-domain sockets.
- [ ] Network sockets.
- [ ] Client/server communication model.
- [ ] Stream versus datagram semantics.
- [ ] How sockets relate to the networking subject.

**Module interview benchmark**

- [ ] Compare process creation, termination and context switching. Explain which state is preserved, which resources are shared or distinct, and how a parent collects a child's exit status.

**Module mastery check**

- [ ] I can explain the module’s main ideas without reading the lesson.
- [ ] I can connect its topics to earlier modules.
- [ ] I have completed the mapped practice questions.
- [ ] I can answer the module interview benchmark aloud.

---

## Module 03 — Threads & Multithreading

### [ ] Topic 3.1 — What Is a Thread?

- [ ] Thread as an execution unit.
- [ ] Thread ID and execution state.
- [ ] Registers, program counter and stack.
- [ ] Relationship between a thread and its process.

### [ ] Topic 3.2 — Process vs Thread

- [ ] Address-space ownership.
- [ ] Resource sharing.
- [ ] Creation and switching costs (qualified, not universal absolutes).
- [ ] Isolation and failure implications.
- [ ] Communication mechanisms.
- [ ] Practical examples.

### [ ] Topic 3.3 — User-Level Threads

- [ ] Thread management in user space.
- [ ] Runtime/library scheduler.
- [ ] Advantages and constraints.
- [ ] Blocking system-call implications under many-to-one models.

### [ ] Topic 3.4 — Kernel-Level Threads

- [ ] Kernel visibility and scheduling.
- [ ] Blocking behavior.
- [ ] Kernel scheduling overhead.
- [ ] User threads versus kernel threads.

### [ ] Topic 3.5 — Thread Mapping Models

- [ ] Many-to-one.
- [ ] One-to-one.
- [ ] Many-to-many.
- [ ] Trade-offs and examples.
- [ ] Green threads, goroutines and Java virtual threads as supplementary runtime examples; explain that their implementation details differ.

### [ ] Topic 3.6 — Multithreading

- [ ] Why programs use multiple threads.
- [ ] Concurrency versus parallel execution.
- [ ] Independent and cooperating threads.
- [ ] Thread creation and joining at a conceptual level.

### [ ] Topic 3.7 — Multicore Processing

- [ ] Single-core concurrency versus multicore parallelism.
- [ ] Hardware cores and software threads.
- [ ] Scheduling threads across cores.
- [ ] Shared-memory implications.

### [ ] Topic 3.8 — Benefits of Multithreading

- [ ] Responsiveness.
- [ ] Resource sharing.
- [ ] Economy.
- [ ] Scalability and parallel speedup.
- [ ] Limits such as contention and serialization.

### [ ] Topic 3.9 — Thread Lifecycle

- [ ] New/created.
- [ ] Runnable/ready.
- [ ] Running.
- [ ] Blocked/waiting.
- [ ] Terminated.
- [ ] Lifecycle model differs by language/runtime; label examples.

### [ ] Topic 3.10 — Thread Synchronization: Why It Is Needed

- [ ] Shared mutable state.
- [ ] Interleaving.
- [ ] Race conditions.
- [ ] Atomicity and visibility at a high level.
- [ ] Link to Module 05 for full synchronization mechanisms.

### [ ] Topic 3.11 — Race Conditions

- [ ] Lost update example.
- [ ] Non-deterministic interleavings.
- [ ] Correctness depending on timing.
- [ ] Race condition versus data race.

### [ ] Topic 3.12 — Thread Safety

- [ ] What thread-safe behavior means.
- [ ] Shared-state protection.
- [ ] Immutability and confinement.
- [ ] Synchronization and atomic operations.
- [ ] Common thread-safety mistakes.

### [ ] Topic 3.13 — Critical Section: Introductory View

- [ ] Shared resource and critical code region.
- [ ] Why simultaneous access can break invariants.
- [ ] Preview of mutual exclusion, progress and bounded waiting.
- [ ] Link to Module 05 for formal treatment.

### [ ] Topic 3.14 — Reentrant Code

- [ ] Meaning of reentrancy.
- [ ] Local state versus shared mutable state.
- [ ] Reentrant versus merely thread-safe code.
- [ ] Recursive calls, interrupts and signal-handler contexts.
- [ ] Practical examples and pitfalls.

**Module interview benchmark**

- [ ] Explain concurrency versus parallelism, compare processes and threads, and analyze what happens when two threads update the same shared variable without synchronization.

**Module mastery check**

- [ ] I can explain the module’s main ideas without reading the lesson.
- [ ] I can connect its topics to earlier modules.
- [ ] I have completed the mapped practice questions.
- [ ] I can answer the module interview benchmark aloud.

---

## Module 04 — CPU Scheduling

### [ ] Topic 4.1 — Why CPU Scheduling Is Needed

- [ ] Ready processes and CPU contention.
- [ ] CPU-bound and I/O-bound behavior.
- [ ] Scheduler role.
- [ ] Scheduling decision points.

### [ ] Topic 4.2 — Preemptive vs Non-Preemptive Scheduling

- [ ] Voluntary release and blocking.
- [ ] Timer-based preemption.
- [ ] Responsiveness, fairness and overhead.
- [ ] Example timelines.

### [ ] Topic 4.3 — Scheduling Criteria and Metrics

- [ ] CPU utilization.
- [ ] Throughput.
- [ ] Turnaround time.
- [ ] Waiting time.
- [ ] Response time.
- [ ] Completion time, arrival time and burst time.
- [ ] Average metrics and how to calculate them.

### [ ] Topic 4.4 — First Come First Served (FCFS)

- [ ] Ready-queue ordering.
- [ ] Non-preemptive execution.
- [ ] Gantt chart construction.
- [ ] Waiting/turnaround calculations.
- [ ] Convoy effect.

### [ ] Topic 4.5 — Shortest Job First (SJF)

- [ ] Selection by next CPU-burst length.
- [ ] Non-preemptive SJF.
- [ ] Why it minimizes average waiting time under standard assumptions.
- [ ] Burst-time prediction challenge.
- [ ] Starvation risk.

### [ ] Topic 4.6 — Shortest Remaining Time First (SRTF)

- [ ] Preemptive form of SJF.
- [ ] Arrival of a shorter job.
- [ ] Remaining-burst calculation.
- [ ] Gantt chart and metrics.
- [ ] Starvation and prediction limitations.

### [ ] Topic 4.7 — Priority Scheduling

- [ ] Priority assignment.
- [ ] Preemptive and non-preemptive forms.
- [ ] Tie-breaking.
- [ ] Starvation.
- [ ] Aging as a remedy.
- [ ] Priority inversion cross-link to synchronization.

### [ ] Topic 4.8 — Round Robin (RR)

- [ ] Time quantum.
- [ ] Circular ready queue.
- [ ] Timer interrupt and preemption.
- [ ] Gantt chart and calculations.
- [ ] Quantum too small versus too large.
- [ ] Context-switch overhead.

### [ ] Topic 4.9 — Multilevel Queue Scheduling

- [ ] Multiple ready queues.
- [ ] Queue assignment.
- [ ] Inter-queue scheduling.
- [ ] Fixed priority versus time sharing among queues.
- [ ] Strengths and weaknesses.

### [ ] Topic 4.10 — Multilevel Feedback Queue (MLFQ)

- [ ] Dynamic queue movement.
- [ ] CPU-burst behavior and priorities.
- [ ] Aging/boosting.
- [ ] Configuration trade-offs.
- [ ] Worked scheduling trace.

### [ ] Topic 4.11 — Convoy Effect

- [ ] Long process delaying short/I/O-bound processes.
- [ ] Why FCFS can cause it.
- [ ] Impact on waiting time and device utilization.
- [ ] Example.

### [ ] Topic 4.12 — Starvation and Aging

- [ ] Indefinite postponement.
- [ ] Difference from deadlock.
- [ ] Priority-based starvation.
- [ ] Aging and other mitigation.

### [ ] Topic 4.13 — Scheduling Numerical Practice

- [ ] Given arrival and burst times, construct Gantt charts.
- [ ] Calculate CT, TAT, WT and RT.
- [ ] Compare FCFS, SJF, SRTF, Priority and RR.
- [ ] State assumptions and tie-breaking rules.
- [ ] Explain why answers differ when assumptions differ.

### Supplementary extensions

- [ ] Linux scheduler evolution and CFS concepts.
- [ ] `vruntime`, nice weights and run-queue structures.
- [ ] Real-time scheduling basics.
- [ ] Priority inversion and priority inheritance (cross-link to Module 05).

**Module interview benchmark**

- [ ] Given a process arrival/burst-time table, calculate waiting and turnaround times under FCFS, SJF/SRTF and Round Robin, then explain the trade-offs and starvation risks.

**Module mastery check**

- [ ] I can explain the module’s main ideas without reading the lesson.
- [ ] I can connect its topics to earlier modules.
- [ ] I have completed the mapped practice questions.
- [ ] I can answer the module interview benchmark aloud.

---

## Module 05 — Process Synchronization & Concurrency

### [ ] Topic 5.1 — Why Synchronization Is Needed

- [ ] Interleaving and shared mutable state.
- [ ] Lost update and inconsistent state examples.
- [ ] Atomicity, visibility and ordering.
- [ ] Race condition versus data race.

### [ ] Topic 5.2 — Critical Section Problem

- [ ] Entry, critical, exit and remainder sections.
- [ ] Shared-resource invariant.
- [ ] Correctness requirements.

### [ ] Topic 5.3 — Mutual Exclusion

- [ ] What mutual exclusion guarantees.
- [ ] Lock ownership.
- [ ] Why mutual exclusion alone does not guarantee progress or fairness.

### [ ] Topic 5.4 — Progress

- [ ] Definition in the critical-section problem.
- [ ] Avoiding unnecessary indefinite postponement of entry.
- [ ] Difference from system-wide progress claims.

### [ ] Topic 5.5 — Bounded Waiting

- [ ] Bounded waiting meaning.
- [ ] Starvation prevention.
- [ ] Relationship to fairness.

### [ ] Topic 5.6 — Peterson's Algorithm

- [ ] Two-process assumptions.
- [ ] `flag` and `turn` variables.
- [ ] Entry/exit logic.
- [ ] Step-by-step interleaving.
- [ ] Why modern memory models and compiler/CPU reordering require care; do not present the textbook algorithm as a production lock.

### [ ] Topic 5.7 — Mutex Locks

- [ ] Lock/unlock model.
- [ ] Ownership.
- [ ] Blocking versus spinning implementation possibilities.
- [ ] Correct critical-section usage.

### [ ] Topic 5.8 — Semaphores

- [ ] Semaphore abstraction.
- [ ] Atomic wait/signal operations.
- [ ] Counting versus binary semaphore.
- [ ] Resource counting and synchronization.

### [ ] Topic 5.9 — Binary Semaphore

- [ ] Values and operations.
- [ ] Signaling semantics.
- [ ] Difference from an ownership-enforcing mutex.

### [ ] Topic 5.10 — Counting Semaphore

- [ ] Resource-pool example.
- [ ] Initial count.
- [ ] Acquiring and releasing permits.
- [ ] Invariants and common mistakes.

### [ ] Topic 5.11 — Monitors

- [ ] Encapsulated shared state.
- [ ] Mutual exclusion through monitor entry.
- [ ] Condition synchronization.
- [ ] Relationship to language constructs.

### [ ] Topic 5.12 — Condition Variables

- [ ] Wait and signal/broadcast.
- [ ] Atomic release-and-wait behavior.
- [ ] Predicate loops and spurious wakeups.
- [ ] Bounded-buffer example.

### [ ] Topic 5.13 — Spinlocks

- [ ] Busy waiting.
- [ ] Atomic test-and-set/CAS basis.
- [ ] When spinning can be appropriate.
- [ ] Why long critical sections and single-core scheduling can make spinning harmful.

### [ ] Topic 5.14 — Hardware Atomic Instructions

- [ ] Atomic read-modify-write.
- [ ] Test-and-Set.
- [ ] Compare-and-Swap (CAS).
- [ ] LL/SC concept.
- [ ] Memory barriers and memory ordering.
- [ ] ABA problem and mitigation such as tagged pointers/hazard pointers (advanced).

### [ ] Topic 5.15 — Producer-Consumer Problem

- [ ] Bounded buffer.
- [ ] Empty/full counts.
- [ ] Mutex protection.
- [ ] Correct semaphore ordering.
- [ ] Complete execution trace.

### [ ] Topic 5.16 — Readers-Writers Problem

- [ ] Concurrent readers and exclusive writers.
- [ ] Reader preference, writer preference and fairness.
- [ ] Starvation possibilities.

### [ ] Topic 5.17 — Dining Philosophers Problem

- [ ] Resource competition.
- [ ] Deadlock and starvation.
- [ ] Asymmetric pickup, resource ordering and waiter solutions.

### [ ] Topic 5.18 — Mutex vs Semaphore

- [ ] Ownership.
- [ ] Counting semantics.
- [ ] Signaling across threads.
- [ ] Priority inheritance and platform-specific behavior.
- [ ] When each abstraction is appropriate.

### [ ] Topic 5.19 — Deadlock vs Starvation

- [ ] Circular waiting versus indefinite postponement.
- [ ] Examples.
- [ ] How each is detected or mitigated.
- [ ] Link to Module 06.

### Supplementary extensions

- [ ] Priority inversion and priority inheritance.
- [ ] Futex concept and user-space fast path/kernel wait path.
- [ ] Lock-free versus wait-free terminology.

**Module interview benchmark**

- [ ] Design a bounded blocking queue using a mutex and condition variables. Explain the invariants, wait predicates, wake-up behavior and how busy waiting is avoided.

**Module mastery check**

- [ ] I can explain the module’s main ideas without reading the lesson.
- [ ] I can connect its topics to earlier modules.
- [ ] I have completed the mapped practice questions.
- [ ] I can answer the module interview benchmark aloud.

---

## Module 06 — Deadlocks

### [ ] Topic 6.1 — What Is a Deadlock?

- [ ] Resource contention.
- [ ] Waiting cycles.
- [ ] Simple two-process/two-lock scenario.
- [ ] Deadlock versus indefinite delay.

### [ ] Topic 6.2 — Four Necessary Conditions (Coffman Conditions)

- [ ] Mutual Exclusion.
- [ ] Hold and Wait.
- [ ] No Preemption.
- [ ] Circular Wait.

### [ ] Topic 6.3 — Resource Allocation Graph (RAG)

- [ ] Process and resource nodes.
- [ ] Request and assignment edges.
- [ ] Detecting cycles.
- [ ] Single-instance versus multiple-instance nuance.

### [ ] Topic 6.4 — Deadlock Prevention

- [ ] Breaking one necessary condition.
- [ ] Resource ordering.
- [ ] Request-all-at-once and preemption strategies.
- [ ] Practical costs.

### [ ] Topic 6.5 — Deadlock Avoidance

- [ ] Safe-state concept.
- [ ] Need for advance resource information.
- [ ] Safe versus unsafe state.
- [ ] Avoidance versus prevention.

### [ ] Topic 6.6 — Banker's Algorithm

- [ ] Available, Max, Allocation and Need.
- [ ] Safety algorithm.
- [ ] Finding a safe sequence.
- [ ] Resource-request algorithm.
- [ ] Complete matrix walkthroughs.

### [ ] Topic 6.7 — Deadlock Detection

- [ ] Single-instance wait-for graph.
- [ ] Multiple-instance detection approach.
- [ ] Detection frequency and overhead.

### [ ] Topic 6.8 — Deadlock Recovery

- [ ] Process termination strategies.
- [ ] Resource preemption.
- [ ] Rollback and recovery.
- [ ] Victim selection and starvation risk.

### [ ] Topic 6.9 — Safe State vs Unsafe State

- [ ] Formal meaning.
- [ ] Unsafe does not necessarily mean already deadlocked.
- [ ] Worked examples.

### Supplementary extensions

- [ ] Deadlock handling strategies in general-purpose OSs.
- [ ] Ostrich approach and its trade-offs.
- [ ] Can a single-threaded process deadlock? Explain resource and dependency cycles, rather than assuming multiple threads are always necessary.
- [ ] Global lock-ordering design.

**Module interview benchmark**

- [ ] Given a multi-resource allocation matrix, execute Banker's Algorithm, find a safe sequence if one exists, and explain why an unsafe state is not necessarily a current deadlock.

**Module mastery check**

- [ ] I can explain the module’s main ideas without reading the lesson.
- [ ] I can connect its topics to earlier modules.
- [ ] I have completed the mapped practice questions.
- [ ] I can answer the module interview benchmark aloud.

---

## Module 07 — Memory Management

### [ ] Topic 7.1 — Why Memory Management Is Needed

- [ ] Multiple programs competing for RAM.
- [ ] Isolation and relocation.
- [ ] Allocation and reclamation.
- [ ] Physical memory constraints.

### [ ] Topic 7.2 — Logical vs Physical Address

- [ ] CPU-generated address.
- [ ] Physical RAM address.
- [ ] Address-space abstraction.
- [ ] MMU's role.

### [ ] Topic 7.3 — Address Binding

- [ ] Compile-time binding.
- [ ] Load-time binding.
- [ ] Execution-time binding.
- [ ] Relocation and dynamic address translation.

### [ ] Topic 7.4 — Contiguous Memory Allocation

- [ ] Single and multiple partitions.
- [ ] Fixed partitioning.
- [ ] Variable partitioning.
- [ ] Allocation/deallocation.

### [ ] Topic 7.5 — Fixed and Variable Partitioning

- [ ] Partition layout.
- [ ] Fragmentation effects.
- [ ] Allocation constraints.
- [ ] Worked memory-map examples.

### [ ] Topic 7.6 — Internal Fragmentation

- [ ] Wasted space inside an allocated block.
- [ ] Fixed-size allocation example.
- [ ] Measurement.

### [ ] Topic 7.7 — External Fragmentation

- [ ] Free memory split into non-contiguous holes.
- [ ] Why total free space may still be insufficient for a contiguous request.
- [ ] Example memory map.

### [ ] Topic 7.8 — Compaction

- [ ] Moving allocations to combine free space.
- [ ] Relocation requirements.
- [ ] Cost and limitations.

### [ ] Topic 7.9 — Memory Allocation Strategies

- [ ] First Fit.
- [ ] Best Fit.
- [ ] Worst Fit.
- [ ] Worked allocation traces and comparison.

### [ ] Topic 7.10 — Paging Fundamentals

- [ ] Pages and frames.
- [ ] Equal page/frame size.
- [ ] Page table overview.
- [ ] Logical address split into page number and offset.
- [ ] Address translation examples.

### [ ] Topic 7.11 — Page Tables

- [ ] Page-table entry.
- [ ] Frame mapping.
- [ ] Valid/present and protection bits at a conceptual level.
- [ ] Page-table storage overhead.

### [ ] Topic 7.12 — Multilevel Paging

- [ ] Why flat page tables can be large.
- [ ] Hierarchical page-table structure.
- [ ] Address indices at each level.
- [ ] Sparse address-space benefit.

### [ ] Topic 7.13 — Segmentation

- [ ] Logical segments.
- [ ] Segment table.
- [ ] Base and limit.
- [ ] Protection/sharing.
- [ ] External fragmentation.

### [ ] Topic 7.14 — Paging vs Segmentation

- [ ] Fixed-size versus logical variable-sized units.
- [ ] Address translation.
- [ ] Fragmentation.
- [ ] Protection and sharing.

**Module mastery check**

- [ ] I can explain the module’s main ideas without reading the lesson.
- [ ] I can connect its topics to earlier modules.
- [ ] I have completed the mapped practice questions.
- [ ] I can answer the module interview benchmark aloud.

---

## Module 08 — Virtual Memory & Page Replacement

### [ ] Topic 8.1 — What Is Virtual Memory?

- [ ] Why physical memory need not equal the process address space.
- [ ] Per-process virtual address spaces.
- [ ] Isolation and address translation.
- [ ] Demand loading and backing storage.
- [ ] Virtual memory is not synonymous with swap.

### [ ] Topic 8.2 — Demand Paging

- [ ] Loading pages when first needed.
- [ ] Present/resident state.
- [ ] Lazy allocation/loading.
- [ ] Benefits and costs.

### [ ] Topic 8.3 — Page Fault

- [ ] What triggers a page fault.
- [ ] Valid but non-resident versus invalid/protection-violating access.
- [ ] Fault versus program error.
- [ ] Minor and major fault terminology.

### [ ] Topic 8.4 — Page Fault Handling Sequence

- [ ] CPU/MMU detects translation/protection condition.
- [ ] Trap into kernel.
- [ ] Identify faulting virtual address and access type.
- [ ] Validate mapping and permissions.
- [ ] Obtain or allocate a frame.
- [ ] Read backing data if needed.
- [ ] Update page tables and TLB state as required.
- [ ] Restart instruction or deliver a fault to the process.

### [ ] Topic 8.5 — Page Replacement: Why It Is Needed

- [ ] No free frame available.
- [ ] Choosing a victim page.
- [ ] Dirty and reference bits.
- [ ] Cost of eviction and reload.

### [ ] Topic 8.6 — FIFO Page Replacement

- [ ] Queue-based policy.
- [ ] Reference-string walkthrough.
- [ ] Page-fault counting.
- [ ] Belady's anomaly connection.

### [ ] Topic 8.7 — LRU Page Replacement

- [ ] Recency of use.
- [ ] Stack/recency model.
- [ ] Manual simulation.
- [ ] Implementation cost and approximation in real systems.

### [ ] Topic 8.8 — Optimal Page Replacement

- [ ] Future knowledge assumption.
- [ ] Why it is a theoretical benchmark.
- [ ] Worked reference-string example.

### [ ] Topic 8.9 — LFU Page Replacement

- [ ] Frequency counts.
- [ ] Aging/tie-breaking choices.
- [ ] When frequency can mislead.

### [ ] Topic 8.10 — Belady's Anomaly

- [ ] More frames can sometimes produce more FIFO faults.
- [ ] Reference-string example.
- [ ] Stack algorithms and the inclusion property.

### [ ] Topic 8.11 — Thrashing

- [ ] Excessive paging activity.
- [ ] Working-set pressure.
- [ ] CPU utilization feedback.
- [ ] Mitigation through working-set or page-fault-frequency ideas.

### [ ] Topic 8.12 — Working Set Model

- [ ] Locality of reference.
- [ ] Working-set window.
- [ ] Estimating active pages.
- [ ] Allocation and thrashing relationship.

### [ ] Topic 8.13 — Copy-on-Write (COW)

- [ ] Shared pages after process creation.
- [ ] Read sharing.
- [ ] Write-triggered protection fault and copy.
- [ ] Benefits and costs.

### [ ] Topic 8.14 — Translation Lookaside Buffer (TLB)

- [ ] Why page-table walks are costly.
- [ ] Cached address translations.
- [ ] TLB hit and miss.
- [ ] Address-space identifiers/process context tags where supported.
- [ ] TLB invalidation and shootdown concept.

### [ ] Topic 8.15 — Multi-Level Page-Table Walks

- [ ] Address split into level indices and offset.
- [ ] Page-table walk stages.
- [ ] x86-64 four-/five-level paging as architecture-specific examples.
- [ ] Canonical-address and page-size assumptions.

### [ ] Topic 8.16 — Effective Memory Access Time (EMAT)

- [ ] TLB lookup and hit path.
- [ ] Miss path and page-table walk cost.
- [ ] Formula under stated assumptions.
- [ ] Fully worked examples.
- [ ] Distinguish page-table walk from a page fault.

**Module mastery check**

- [ ] I can explain the module’s main ideas without reading the lesson.
- [ ] I can connect its topics to earlier modules.
- [ ] I have completed the mapped practice questions.
- [ ] I can answer the module interview benchmark aloud.

---

## Module 09 — File Systems & Storage

### [ ] Topic 9.1 — Why File Systems Are Needed

- [ ] Persistent data versus volatile memory.
- [ ] Naming and organization.
- [ ] Storage abstraction.
- [ ] File-system responsibilities.

### [ ] Topic 9.2 — File Attributes and Operations

- [ ] Name, identifier, type, location, size, protection and timestamps.
- [ ] Create, open, read, write, seek, close, delete and truncate.
- [ ] File handles/descriptors.

### [ ] Topic 9.3 — File-System Structures

- [ ] On-disk versus in-memory structures.
- [ ] Boot block, superblock, metadata and data blocks.
- [ ] Mounting.
- [ ] VFS concept as supplementary.

### [ ] Topic 9.4 — File Allocation Methods

- [ ] Contiguous allocation.
- [ ] Linked allocation.
- [ ] Indexed allocation.
- [ ] Extent-based allocation as supplementary.

### [ ] Topic 9.5 — Directory Structures

- [ ] Single-level and two-level directories.
- [ ] Tree-structured directories.
- [ ] Acyclic/general graphs.
- [ ] Pathnames and directory entries.

### [ ] Topic 9.6 — Inodes

- [ ] Metadata versus filename.
- [ ] Inode number and directory entry relationship.
- [ ] Data block/extent mapping.
- [ ] Link count.
- [ ] Hard links and symbolic links.

### [ ] Topic 9.7 — File Permissions

- [ ] Owner, group and others.
- [ ] Read, write and execute.
- [ ] Permission bits.
- [ ] Directory permission semantics.
- [ ] POSIX examples.

### [ ] Topic 9.8 — Disk Scheduling Fundamentals

- [ ] Seek time, rotational latency and transfer time (HDD context).
- [ ] Request queue.
- [ ] Why scheduling matters.
- [ ] SSD caveat: classic seek-optimization algorithms do not translate directly to SSDs.

### [ ] Topic 9.9 — FCFS Disk Scheduling

- [ ] Request order.
- [ ] Head movement calculation.
- [ ] Worked example.

### [ ] Topic 9.10 — SSTF Disk Scheduling

- [ ] Nearest-request selection.
- [ ] Head movement calculation.
- [ ] Starvation/fairness considerations.

### [ ] Topic 9.11 — SCAN and C-SCAN

- [ ] Elevator analogy.
- [ ] Direction and boundary assumptions.
- [ ] Total head movement calculation.
- [ ] Compare SCAN and C-SCAN.

### [ ] Topic 9.12 — RAID Fundamentals

- [ ] Redundancy and performance goals.
- [ ] Striping, mirroring and parity.
- [ ] Common RAID levels (0, 1, 5, 6, 10).
- [ ] Capacity, fault tolerance and rebuild trade-offs.

### [ ] Topic 9.13 — Buffering and Caching

- [ ] Buffer versus cache.
- [ ] Read-ahead and write buffering.
- [ ] Page cache.
- [ ] Cache consistency and write-back/write-through concepts.

### Supplementary extensions

- [ ] Superblocks and extents.
- [ ] Directory-entry cache/dentry.
- [ ] Journaling and crash consistency.
- [ ] Metadata journaling versus data journaling.
- [ ] Write-ahead logging concepts and ext4 mode distinctions.
- [ ] `fsync` and durability semantics.

**Module mastery check**

- [ ] I can explain the module’s main ideas without reading the lesson.
- [ ] I can connect its topics to earlier modules.
- [ ] I have completed the mapped practice questions.
- [ ] I can answer the module interview benchmark aloud.

---

## Module 10 — I/O Systems & Device Management

### [ ] Topic 10.1 — I/O Hardware and Device Controllers

- [ ] Device and controller roles.
- [ ] Registers and command/status interface.
- [ ] Memory-mapped I/O versus port-mapped I/O (architecture-dependent).
- [ ] Device-driver responsibility.

### [ ] Topic 10.2 — Programmed I/O and Polling

- [ ] CPU checks device status.
- [ ] Data transfer through CPU instructions.
- [ ] Busy waiting and its cost.

### [ ] Topic 10.3 — Interrupt-Driven I/O

- [ ] Device signals completion/event.
- [ ] Interrupt handler/ISR concept.
- [ ] Deferred work.
- [ ] Interrupt overhead and interrupt storms.

### [ ] Topic 10.4 — Direct Memory Access (DMA)

- [ ] Why CPU-mediated byte-by-byte transfer is inefficient.
- [ ] DMA descriptor/buffer setup.
- [ ] Device transfer to/from memory.
- [ ] Completion notification.
- [ ] Cache coherency and IOMMU considerations as advanced, platform-specific details.

### [ ] Topic 10.5 — Buffering and Ring Buffers

- [ ] Temporary staging.
- [ ] Producer-consumer ring.
- [ ] Head and tail pointers.
- [ ] Full/empty conditions.
- [ ] Device/network I/O examples.

### [ ] Topic 10.6 — Synchronous vs Asynchronous I/O

- [ ] Blocking and non-blocking behavior.
- [ ] Completion notification.
- [ ] Async request model.
- [ ] Distinguish asynchronous I/O from merely non-blocking polling.

### [ ] Topic 10.7 — Scalable Event Notification

- [ ] `select`.
- [ ] `poll`.
- [ ] `epoll`.
- [ ] Edge-triggered versus level-triggered behavior.
- [ ] `kqueue` as a cross-platform supplementary comparison.

### [ ] Topic 10.8 — Linux NAPI

- [ ] Interrupt moderation and polling.
- [ ] Why high packet rates can make per-packet interrupts expensive.
- [ ] NAPI scheduling and budget concept.
- [ ] Network-driver context.

### [ ] Topic 10.9 — io_uring

- [ ] Submission and completion queues.
- [ ] Shared ring structures.
- [ ] Batching and reduced syscall overhead.
- [ ] Registered buffers/files and advanced options.
- [ ] Explain that io_uring does not make every operation “zero syscall” or guarantee zero-copy; capabilities depend on operation and configuration.

**Module mastery check**

- [ ] I can explain the module’s main ideas without reading the lesson.
- [ ] I can connect its topics to earlier modules.
- [ ] I have completed the mapped practice questions.
- [ ] I can answer the module interview benchmark aloud.

---

## Module 11 — OS Protection, Security & Access Control

### [ ] Topic 11.1 — Protection Fundamentals

- [ ] Protection domains.
- [ ] Isolation boundaries.
- [ ] Least privilege.
- [ ] Why protection is needed even on multi-user systems.

### [ ] Topic 11.2 — Access Control Lists (ACLs)

- [ ] Subjects and objects.
- [ ] Permissions.
- [ ] ACL entries.
- [ ] ACL versus simple owner/group/other mode bits.

### [ ] Topic 11.3 — Capability-Based Access Control

- [ ] Capability as unforgeable authority (conceptual model).
- [ ] Object reference plus rights.
- [ ] Capability versus ACL.
- [ ] Revocation and delegation challenges.

### [ ] Topic 11.4 — Memory Protection

- [ ] Page-level permissions.
- [ ] User/kernel access separation.
- [ ] Read/write/execute permissions.
- [ ] Protection fault.

### [ ] Topic 11.5 — NX/XD Bit and W^X

- [ ] Non-executable memory.
- [ ] Writable versus executable pages.
- [ ] How NX limits injected-code attacks.
- [ ] W^X policy and its caveats.

### [ ] Topic 11.6 — Address Space Layout Randomization (ASLR)

- [ ] Address predictability.
- [ ] Randomized mapping locations.
- [ ] Entropy and limitations.
- [ ] Interaction with other mitigations.

### [ ] Topic 11.7 — Buffer Overflows and Return-Oriented Programming

- [ ] Memory corruption at a conceptual level.
- [ ] Stack-buffer overflow.
- [ ] Why NX alone is insufficient.
- [ ] ROP gadget-chain concept.
- [ ] Defensive mitigations and layered security.

### [ ] Topic 11.8 — Sandboxing and Isolation

- [ ] Process isolation.
- [ ] Namespaces/cgroups as Linux supplementary topics.
- [ ] Seccomp and capability reduction.
- [ ] Filesystem/network restrictions.

### [ ] Topic 11.9 — Privilege Escalation Fundamentals

- [ ] User versus privileged identity.
- [ ] Misconfiguration and vulnerable privileged components.
- [ ] Least privilege and defense in depth.
- [ ] Safe defensive examples only.

**Module mastery check**

- [ ] I can explain the module’s main ideas without reading the lesson.
- [ ] I can connect its topics to earlier modules.
- [ ] I have completed the mapped practice questions.
- [ ] I can answer the module interview benchmark aloud.

---

## Module 12 — Advanced OS & Modern Systems

### [ ] Topic 12.1 — Stack vs Heap

- [ ] Lifetime and allocation model.
- [ ] Call frames and automatic storage.
- [ ] Dynamic allocation.
- [ ] Growth, limits and ownership.
- [ ] Language/runtime caveats.

### [ ] Topic 12.2 — Memory Leaks

- [ ] Allocated memory becoming unreachable or unreleased.
- [ ] Leak versus cache and intentional retention.
- [ ] Symptoms and debugging tools.
- [ ] Resource leaks beyond memory.

### [ ] Topic 12.3 — Kernel Threads

- [ ] Kernel execution threads.
- [ ] Relationship to user tasks.
- [ ] Work queues and kernel workers (supplementary).

### [ ] Topic 12.4 — System Calls vs Library Calls

- [ ] Function call within a process.
- [ ] Library wrapper.
- [ ] Actual kernel transition.
- [ ] Why not every library function invokes a system call.

### [ ] Topic 12.5 — Page Cache

- [ ] Caching file contents in memory.
- [ ] Read path and write-back basics.
- [ ] Interaction with filesystem and I/O.

### [ ] Topic 12.6 — Virtualization Fundamentals

- [ ] Host and guest.
- [ ] Hypervisor role.
- [ ] Type 1 versus Type 2 hypervisors.
- [ ] CPU, memory and device virtualization.

### [ ] Topic 12.7 — Containers vs Virtual Machines

- [ ] Shared host kernel versus guest kernel.
- [ ] Namespaces and cgroups (Linux context).
- [ ] Isolation boundaries.
- [ ] Startup, resource and security trade-offs.

### [ ] Topic 12.8 — NUMA Basics

- [ ] Non-uniform memory access.
- [ ] Local versus remote memory.
- [ ] CPU/memory affinity.
- [ ] Performance implications.

### [ ] Topic 12.9 — CPU Cache and Cache Coherence

- [ ] Cache hierarchy recap.
- [ ] Cache lines and locality.
- [ ] False sharing.
- [ ] Cache coherence motivation.
- [ ] MESI-style protocol as a supplementary example.
- [ ] Relationship to memory consistency; do not conflate the two.

### [ ] Topic 12.10 — Modern High-Performance I/O Review

- [ ] `select`/`poll`/`epoll` recap.
- [ ] `io_uring` recap.
- [ ] NAPI and interrupt moderation.
- [ ] Zero-copy concepts.
- [ ] eBPF observability and programmable hooks.
- [ ] C10K problem and modern connection handling.

### [ ] Topic 12.11 — Real-Time Operating Systems

- [ ] Hard versus soft real-time.
- [ ] Deadline and deterministic response.
- [ ] Real-time scheduling basics.
- [ ] Priority inversion and inheritance cross-link.
- [ ] Examples and limitations.

**Module mastery check**

- [ ] I can explain the module’s main ideas without reading the lesson.
- [ ] I can connect its topics to earlier modules.
- [ ] I have completed the mapped practice questions.
- [ ] I can answer the module interview benchmark aloud.

---

## Original supplied practice-question tracker

> These are the 34 questions from the original KernelCS OS source manifest. Preserve their wording and IDs in the website question bank. The full question explanations belong in the learning workspace; this section is a completion tracker.

- [ ] `os-q-1` — Why is the operating system described as both a resource manager and an extended virtual machine?
- [ ] `os-q-2` — What catastrophic failure would occur in a multi-tenant system if applications had raw, unmediated access to physical memory?
- [ ] `os-q-3` — Why do monolithic kernels generally achieve higher I/O throughput than microkernels?
- [ ] `os-q-4` — What hardware mechanism prevents a user program from executing the x86 'CLI' (clear interrupts) instruction?
- [ ] `os-q-5` — Why must the kernel strictly copy and validate all user-space pointers passed in system call arguments before dereferencing them?
- [ ] `os-q-6` — What is the primary purpose of the initial RAM filesystem (initramfs) during Linux booting?
- [ ] `os-q-7` — What is a zombie process in Unix-like systems, and how is its memory reclaimed?
- [ ] `os-q-8` — Why is context switching between threads of the same process significantly cheaper than switching between two separate processes?
- [ ] `os-q-9` — If Thread A has a pointer to a local variable on Thread B's stack, can Thread A legally read it?
- [ ] `os-q-10` — What problem arises when a pure user-level thread (ULT) executes a blocking synchronous I/O system call?
- [ ] `os-q-11` — Given P1 (BT=24, AT=0), P2 (BT=3, AT=0), P3 (BT=3, AT=0), calculate average waiting time under FCFS.
- [ ] `os-q-12` — Why is Shortest Job First (SJF) considered theoretically optimal but rarely implemented in general-purpose operating systems?
- [ ] `os-q-13` — What is the consequence of setting the Round Robin time quantum to 1 microsecond when context switching takes 2 microseconds?
- [ ] `os-q-14` — Explain how Priority Inversion nearly caused the loss of the NASA Mars Pathfinder mission and how Priority Inheritance solved it.
- [ ] `os-q-15` — Why does the Linux Completely Fair Scheduler (CFS) store runnable tasks in a Red-Black tree instead of a standard FIFO queue?
- [ ] `os-q-16` — What is the difference between a race condition and a data race?
- [ ] `os-q-17` — Explain the ABA problem in lock-free data structures using Compare-And-Swap (CAS) and how it is resolved.
- [ ] `os-q-18` — Why is a spinlock completely useless and actively harmful on a single-core uniprocessor system?
- [ ] `os-q-19` — Why can a binary semaphore NOT be safely substituted for a mutex when priority inheritance is required?
- [ ] `os-q-20` — In the Dining Philosophers problem, how does enforcing an asymmetric rule (e.g. odd philosophers pick left fork first; even pick right) prevent deadlock?
- [ ] `os-q-21` — How does strict global lock ordering eliminate the possibility of a deadlock?
- [ ] `os-q-22` — Why do modern consumer and server operating systems (Windows, Linux, macOS) ignore deadlock avoidance algorithms and adopt the 'Ostrich algorithm'?
- [ ] `os-q-23` — What is the difference between internal fragmentation and external fragmentation?
- [ ] `os-q-24` — In a 32-bit system with 4KB pages, calculate the number of bits allocated to the page offset and the maximum number of entries in a single flat page table.
- [ ] `os-q-25` — What is the difference between a minor (soft) page fault and a major (hard) page fault?
- [ ] `os-q-26` — Why do 64-bit operating systems use 4-level or 5-level page tables instead of a single flat table?
- [ ] `os-q-27` — Given TLB access time = 1ns, memory access time = 50ns, and TLB hit rate = 98%, calculate the Effective Memory Access Time (EMAT) with a 4-level page table.
- [ ] `os-q-28` — What is Belady's Anomaly, and which page replacement algorithm famously exhibits it?
- [ ] `os-q-29` — Why does deleting a file in Unix ('rm filename') not immediately delete the data if another hard link exists?
- [ ] `os-q-30` — What is the difference between 'metadata journaling' and 'full data journaling' in file systems like ext4?
- [ ] `os-q-31` — Why does high-speed networking (e.g. 100GbE) use NAPI polling instead of per-packet hardware interrupts?
- [ ] `os-q-32` — How does Return-Oriented Programming (ROP) bypass the hardware NX (No-Execute) stack protection?
- [ ] `os-q-33` — Why does epoll dramatically outperform select/poll when monitoring 100,000 connections with only 50 active at any moment?
- [ ] `os-q-34` — How does Linux io_uring eliminate system call overhead for high-frequency disk and network operations?

## Original must-know interview question tracker

> These eight questions were separately supplied in the original student checklist. Keep them as distinct interview-bank entries even when they overlap with practice questions.

- [ ] 1. What happens during a context switch?
- [ ] 2. Why are threads lighter than processes?
- [ ] 3. Can a single-threaded process have a deadlock?
- [ ] 4. What happens when a page fault occurs?
- [ ] 5. Why is virtual memory required?
- [ ] 6. How does a mutex differ from a semaphore?
- [ ] 7. What happens when multiple threads update a shared variable?
- [ ] 8. What is the difference between concurrency and parallelism?

## Original module-level interview benchmark tracker

> These 11 benchmark prompts come from the original source manifest. Preserve each prompt as its own interview-bank entry, even where it overlaps with a module-level benchmark elsewhere in the blueprint.

- [ ] `os-mod-1` — Explain the exact CPU execution steps of a `read()` system call from user-space libc to kernel execution and return. (Module 01)
- [ ] `os-mod-2` — Explain what happens to CPU registers and memory page tables when switching between threads of the same process versus threads of different processes. (Modules 02–03)
- [ ] `os-mod-3` — Calculate Waiting Time and Turnaround Time across FCFS, SJF and Round Robin for a given process arrival trace and explain the Convoy Effect. (Module 04)
- [ ] `os-mod-4` — Implement a thread-safe bounded blocking queue using mutexes and condition variables without busy waiting. (Module 05)
- [ ] `os-mod-5` — Walk through Banker's Algorithm safety check with a multi-resource matrix to verify whether a state is safe or unsafe. (Module 06)
- [ ] `os-mod-6` — Calculate page number and byte offset for a given virtual address with 4KB page size and describe internal fragmentation. (Module 07)
- [ ] `os-mod-7` — Walk through physical address translation on x86-64 with a 4-level page table and calculate effective memory access time with TLB hit rates. (Module 08)
- [ ] `os-mod-8` — Explain how Linux ext4 uses inodes, extent trees and journaling to recover file-system consistency after sudden power loss. (Module 09)
- [ ] `os-mod-9` — Explain how Direct Memory Access (DMA) prevents the CPU from being saturated by high-throughput network packet processing. (Module 10)
- [ ] `os-mod-10` — Explain how Address Space Layout Randomization (ASLR) and the NX stack bit defend against buffer-overflow attacks. (Module 11)
- [ ] `os-mod-11` — Explain the C10K problem, compare `select`/`poll` with `epoll`, and explain how `io_uring` reduces system-call overhead. (Modules 10–12)

## Interactive laboratory checklist

> Tick only after the lab is implemented, works correctly and explains the mechanism being studied.

- [ ] **Module 01:** System-call path explorer; user/kernel mode transition; boot-sequence timeline
- [ ] **Module 02:** Process-state transition simulator; process creation tree; IPC comparison playground
- [ ] **Module 03:** Process/thread memory-sharing visualizer; concurrency timeline
- [ ] **Module 04:** CPU scheduling simulator for FCFS, SJF, SRTF, Priority and Round Robin, with Gantt chart and metrics
- [ ] **Module 05:** Race-condition interleaving playground; mutex/semaphore/condition-variable simulator; bounded buffer and dining philosophers
- [ ] **Module 06:** Resource-allocation graph and Banker's Algorithm simulator
- [ ] **Module 07:** Contiguous memory allocation and paging address-translation visualizer
- [ ] **Module 08:** Page-fault walkthrough; FIFO/LRU/Optimal/LFU simulator; TLB/EMAT calculator
- [ ] **Module 09:** File-allocation visualizer; inode/directory explorer; disk-scheduling simulator
- [ ] **Module 10:** Interrupt vs polling vs DMA demonstration; ring-buffer and event-notification simulator
- [ ] **Module 11:** Page-permission and ASLR/NX conceptual sandbox (safe, non-exploitative)
- [ ] **Module 12:** Container vs VM architecture explorer; NUMA/cache-locality visualization; modern I/O comparison

## Original syllabus coverage cross-check

> This is a traceability cross-check against the original student checklist sections 4.1–4.9. It is not a second study-progress list. Use the main 12-module checklist above to track actual learning. These boxes are for confirming that every original source item is represented in the blueprint and website.

### Original section 4.1 — OS Fundamentals

- [ ] What is an Operating System? — Module 01, Topic 1.2
- [ ] Functions of OS — Module 01, Topic 1.3
- [ ] Types of Operating Systems — Module 01, Topic 1.4
- [ ] Batch OS — Module 01, Topic 1.4
- [ ] Multiprogramming OS — Module 01, Topic 1.4
- [ ] Multitasking OS — Module 01, Topic 1.4
- [ ] Multiprocessing OS — Module 01, Topic 1.4
- [ ] Time-sharing OS — Module 01, Topic 1.4
- [ ] Distributed OS — Module 01, Topic 1.4
- [ ] Kernel and Shell — Module 01, Topic 1.5
- [ ] User Mode vs Kernel Mode — Module 01, Topic 1.6
- [ ] System Calls — Module 01, Topic 1.7
- [ ] Interrupts and Traps — Module 01, Topic 1.8
- [ ] Monolithic vs Microkernel — Module 01, Topic 1.9
- [ ] Booting Process — Module 01, Topic 1.10

### Original section 4.2 — Processes

- [ ] What is a Process? — Module 02, Topic 2.1
- [ ] Process Control Block (PCB) — Module 02, Topic 2.3
- [ ] Process States — Module 02, Topic 2.4
- [ ] Process State Transition Diagram — Module 02, Topic 2.5
- [ ] Process Creation and Termination — Module 02, Topic 2.6
- [ ] Context Switching — Module 02, Topic 2.7
- [ ] Process Scheduling — Module 02, Topic 2.8; algorithms in Module 04
- [ ] Parent and Child Processes — Module 02, Topic 2.9
- [ ] Orphan Process — Module 02, Topic 2.10
- [ ] Zombie Process — Module 02, Topic 2.11
- [ ] Inter-Process Communication (IPC) — Module 02, Topic 2.12
- [ ] Shared Memory — Module 02, Topic 2.13
- [ ] Message Passing — Module 02, Topic 2.14
- [ ] Pipes — Module 02, Topic 2.15
- [ ] Named Pipes — Module 02, Topic 2.16
- [ ] Signals — Module 02, Topic 2.17
- [ ] Sockets — Module 02, Topic 2.18

### Original section 4.3 — Threads and Multithreading

- [ ] What is a Thread? — Module 03, Topic 3.1
- [ ] Process vs Thread — Module 03, Topic 3.2
- [ ] User-Level Threads — Module 03, Topic 3.3
- [ ] Kernel-Level Threads — Module 03, Topic 3.4 and Module 12, Topic 12.3
- [ ] Multithreading — Module 03, Topic 3.6
- [ ] Multicore Processing — Module 03, Topic 3.7
- [ ] Benefits of Multithreading — Module 03, Topic 3.8
- [ ] Thread Lifecycle — Module 03, Topic 3.9
- [ ] Thread Synchronisation — Module 03, Topic 3.10 and Module 05
- [ ] Race Conditions — Module 03, Topic 3.11
- [ ] Thread Safety — Module 03, Topic 3.12
- [ ] Critical Section Problem — Module 03, Topic 3.13 and Module 05, Topic 5.2
- [ ] Reentrant Code — Module 03, Topic 3.14

### Original section 4.4 — CPU Scheduling

- [ ] Preemptive vs Non-preemptive Scheduling — Module 04, Topic 4.2
- [ ] First Come First Serve (FCFS) — Module 04, Topic 4.4
- [ ] Shortest Job First (SJF) — Module 04, Topic 4.5
- [ ] Shortest Remaining Time First (SRTF) — Module 04, Topic 4.6
- [ ] Priority Scheduling — Module 04, Topic 4.7
- [ ] Round Robin — Module 04, Topic 4.8
- [ ] Multilevel Queue Scheduling — Module 04, Topic 4.9
- [ ] Multilevel Feedback Queue — Module 04, Topic 4.10
- [ ] Convoy Effect — Module 04, Topic 4.11
- [ ] Starvation — Module 04, Topic 4.12
- [ ] Aging — Module 04, Topic 4.12
- [ ] CPU Utilisation — Module 04, Topic 4.3
- [ ] Throughput — Module 04, Topic 4.3
- [ ] Turnaround Time — Module 04, Topic 4.3
- [ ] Waiting Time — Module 04, Topic 4.3
- [ ] Response Time — Module 04, Topic 4.3
- [ ] Gantt-chart and average waiting/turnaround-time numerical practice — Module 04, Topic 4.13

### Original section 4.5 — Process Synchronisation

- [ ] Critical Section — Module 05, Topic 5.2
- [ ] Mutual Exclusion — Module 05, Topic 5.3
- [ ] Progress — Module 05, Topic 5.4
- [ ] Bounded Waiting — Module 05, Topic 5.5
- [ ] Peterson's Algorithm — Module 05, Topic 5.6
- [ ] Mutex Locks — Module 05, Topic 5.7
- [ ] Semaphores — Module 05, Topic 5.8
- [ ] Binary Semaphore — Module 05, Topic 5.9
- [ ] Counting Semaphore — Module 05, Topic 5.10
- [ ] Monitors — Module 05, Topic 5.11
- [ ] Condition Variables — Module 05, Topic 5.12
- [ ] Spinlocks — Module 05, Topic 5.13
- [ ] Producer-Consumer Problem — Module 05, Topic 5.15
- [ ] Readers-Writers Problem — Module 05, Topic 5.16
- [ ] Dining Philosophers Problem — Module 05, Topic 5.17
- [ ] Mutex vs Semaphore — Module 05, Topic 5.18
- [ ] Deadlock vs Starvation — Module 05, Topic 5.19

### Original section 4.6 — Deadlocks

- [ ] What is a Deadlock? — Module 06, Topic 6.1
- [ ] Four Necessary Conditions — Module 06, Topic 6.2
- [ ] Mutual Exclusion — Module 06, Topic 6.2
- [ ] Hold and Wait — Module 06, Topic 6.2
- [ ] No Preemption — Module 06, Topic 6.2
- [ ] Circular Wait — Module 06, Topic 6.2
- [ ] Resource Allocation Graph — Module 06, Topic 6.3
- [ ] Deadlock Prevention — Module 06, Topic 6.4
- [ ] Deadlock Avoidance — Module 06, Topic 6.5
- [ ] Banker's Algorithm — Module 06, Topic 6.6
- [ ] Deadlock Detection — Module 06, Topic 6.7
- [ ] Deadlock Recovery — Module 06, Topic 6.8
- [ ] Safe State vs Unsafe State — Module 06, Topic 6.9

### Original section 4.7 — Memory Management

- [ ] Logical vs Physical Address — Module 07, Topic 7.2
- [ ] Address Binding — Module 07, Topic 7.3
- [ ] Contiguous Memory Allocation — Module 07, Topic 7.4
- [ ] Fixed and Variable Partitioning — Module 07, Topic 7.5
- [ ] Internal Fragmentation — Module 07, Topic 7.6
- [ ] External Fragmentation — Module 07, Topic 7.7
- [ ] Compaction — Module 07, Topic 7.8
- [ ] Paging — Module 07, Topic 7.10
- [ ] Segmentation — Module 07, Topic 7.13
- [ ] Page Tables — Module 07, Topic 7.11
- [ ] Multilevel Paging — Module 07, Topic 7.12
- [ ] TLB (Translation Lookaside Buffer) — Module 08, Topic 8.14
- [ ] Virtual Memory — Module 08, Topic 8.1
- [ ] Demand Paging — Module 08, Topic 8.2
- [ ] Page Fault — Module 08, Topics 8.3–8.4
- [ ] FIFO Page Replacement — Module 08, Topic 8.6
- [ ] LRU Page Replacement — Module 08, Topic 8.7
- [ ] Optimal Page Replacement — Module 08, Topic 8.8
- [ ] LFU Page Replacement — Module 08, Topic 8.9
- [ ] Thrashing — Module 08, Topic 8.11
- [ ] Working Set Model — Module 08, Topic 8.12
- [ ] Copy-on-Write — Module 08, Topic 8.13
- [ ] First Fit, Best Fit and Worst Fit — Module 07, Topic 7.9

### Original section 4.8 — File Systems and Storage (P2)

- [ ] File Attributes and Operations — Module 09, Topic 9.2
- [ ] File Allocation Methods — Module 09, Topic 9.4
- [ ] Contiguous Allocation — Module 09, Topic 9.4
- [ ] Linked Allocation — Module 09, Topic 9.4
- [ ] Indexed Allocation — Module 09, Topic 9.4
- [ ] Directory Structures — Module 09, Topic 9.5
- [ ] Inodes — Module 09, Topic 9.6
- [ ] File Permissions — Module 09, Topic 9.7
- [ ] Disk Scheduling — Module 09, Topic 9.8
- [ ] FCFS Disk Scheduling — Module 09, Topic 9.9
- [ ] SSTF Disk Scheduling — Module 09, Topic 9.10
- [ ] SCAN — Module 09, Topic 9.11
- [ ] C-SCAN — Module 09, Topic 9.11
- [ ] RAID Fundamentals — Module 09, Topic 9.12
- [ ] Buffering and Caching — Module 09, Topic 9.13

### Original section 4.9 — Advanced OS Concepts

- [ ] Memory Leak — Module 12, Topic 12.2
- [ ] Stack vs Heap — Module 12, Topic 12.1
- [ ] Kernel Threads — Module 12, Topic 12.3
- [ ] System Calls vs Library Calls — Module 12, Topic 12.4
- [ ] Interrupt Handling — Module 01, Topic 1.8 and Module 10
- [ ] DMA — Module 10, Topic 10.4
- [ ] Page Cache — Module 12, Topic 12.5
- [ ] Virtualisation — Module 12, Topic 12.6
- [ ] Containers vs Virtual Machines — Module 12, Topic 12.7
- [ ] NUMA Basics — Module 12, Topic 12.8
- [ ] CPU Cache and Cache Coherence — Module 12, Topic 12.9

## Final subject readiness

- [ ] I completed all 12 modules.
- [ ] I can explain the core concepts without relying on memorized definitions.
- [ ] I completed the original 34 practice questions.
- [ ] I completed all eight must-know interview questions.
- [ ] I can solve scheduling, deadlock, paging, page-replacement and disk-scheduling problems where applicable.
- [ ] I completed the available interactive laboratories.
- [ ] I can explain how processes, threads, scheduling, synchronization and memory management connect.
- [ ] I can trace a system call, a context switch and a page fault at the level taught in the curriculum.
- [ ] I can describe the trade-offs behind core OS design choices.

## Notes and weak areas

- Topics I need to revisit:
- Questions I got wrong:
- Concepts I cannot yet explain clearly:
- Labs to repeat:

## Implementation note for KernelCS

This checklist is a student-facing progress artifact. The canonical lesson content, exact topic hierarchy, source IDs, supplied answer bases, technical caveats and module mapping remain in `os-blueprint.md` and `source-of-truth.md`. The website should derive progress from lesson/topic completion, not from manually hardcoded percentages. Do not treat this checklist as permission to omit blueprint material.
