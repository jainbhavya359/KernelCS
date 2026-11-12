# KernelCS — Computer Science Curriculum Research Source Register

This register documents the academic curricula, industry standards, official documentation, and technical interview frameworks analyzed to design the comprehensive KernelCS Computer Science curriculum.

---

## 1. Operating Systems (OS)

| Source Name | Institution / Authority | Source URL / Reference | Topics Validated & Integrated | Influence on Curriculum |
|---|---|---|---|---|
| **CS 162: Operating Systems and System Programming** | UC Berkeley | [https://cs162.org/](https://cs162.org/) | Dual-mode execution, trap mechanisms, syscall dispatch, Pintos kernel labs, process address spaces, condition variables, multi-level paging, page faults, demand paging, Pintos file system buffer cache | Established the rigorous 11-module breakdown from hardware traps and kernel privilege rings to virtual memory and asynchronous I/O. |
| **6.S081: Operating System Engineering** | MIT OpenCourseWare | [https://pdos.csail.mit.edu/6.828/](https://pdos.csail.mit.edu/6.828/) | xv6 RISC-V implementation, page table walks, trapframe mechanics, context switching (`swtch.S`), copy-on-write (`fork`), sleep/wakeup channel synchronization | Guided the exact register-level and address-translation mechanics in Module 1, 2, and 7. |
| **Operating Systems: Three Easy Pieces (OSTEP)** | Remzi & Andrea Arpaci-Dusseau (Univ. of Wisconsin) | [https://pages.cs.wisc.edu/~remzi/OSTEP/](https://pages.cs.wisc.edu/~remzi/OSTEP/) | Virtualization (CPU & Memory), Concurrency (Threads, Locks, Semaphores, Condition Variables), Persistence (I/O, Disks, File Systems, Crash Consistency, ARIES/Journaling) | Provided the foundational pedagogical flow: Virtualization -> Concurrency -> Persistence. |
| **Linux Kernel Documentation & Man Pages** | Linux Foundation | [https://www.kernel.org/doc/html/latest/](https://www.kernel.org/doc/html/latest/), `man 2 syscalls`, `man 2 clone`, `man 7 epoll` | `task_struct`, `mm_struct`, clone flags (`CLONE_VM`, `CLONE_FILES`), completely fair scheduler (CFS), futex, epoll edge vs level triggering | Differentiates generic OS theory from actual Linux production implementations. |
| **CS 140: Operating Systems** | Stanford University | [https://web.stanford.edu/~ouster/cgi-bin/cs140-spring14/](https://web.stanford.edu/~ouster/cgi-bin/cs140-spring14/) | CPU scheduling metrics, Deadlock Coffman conditions, Bankers algorithm, paging and TLB shootdown, file systems (inodes, directory blocks) | Validated the scheduling algorithms, deadlock recovery, and memory hierarchy. |

---

## 2. Database Management Systems (DBMS)

| Source Name | Institution / Authority | Source URL / Reference | Topics Validated & Integrated | Influence on Curriculum |
|---|---|---|---|---|
| **15-445/645: Database Systems** | Carnegie Mellon University (CMU) | [https://15445.courses.cs.cmu.edu/](https://15445.courses.cs.cmu.edu/) (Prof. Andy Pavlo) | Slotted pages, buffer pool management, B+ Tree split/merge mechanics, hash indexes, query execution (Volcano iterator model), join algorithms (Nested loop, Grace hash join, Sort-merge join), 2PL, MVCC, Write-Ahead Logging (WAL), ARIES | Formed the modern storage engine, query execution, and transaction architecture syllabus (Modules 7–12). |
| **Database System Concepts (Silberschatz, Korth, Sudarshan)** | Academic Textbook (7th Ed.) | [https://db-book.com/](https://db-book.com/) | Relational model, relational algebra, ER diagrams, functional dependencies, Armstrong's axioms, Normal forms (1NF, 2NF, 3NF, BCNF), conflict serializability | Structured the foundational relational algebra, normalization, and serializability modules (Modules 1–4, 10–11). |
| **PostgreSQL Official Documentation** | PostgreSQL Global Development Group | [https://www.postgresql.org/docs/current/](https://www.postgresql.org/docs/current/) | MVCC implementation (`xmin`, `xmax`, vacuuming), write-ahead logging (WAL), table bloat, EXPLAIN ANALYZE, composite indexes, B-Tree, GIN, GiST indexes, CTEs, Window functions | Grounded the SQL querying modules (Modules 5–6) and practical storage engine trade-offs. |
| **MySQL 8.0 Reference Manual (InnoDB Storage Engine)** | Oracle Corporation | [https://dev.mysql.com/doc/refman/8.0/en/innodb-storage-engine.html](https://dev.mysql.com/doc/refman/8.0/en/innodb-storage-engine.html) | Clustered index (primary key) vs secondary index lookup, undo log segments, redo log buffer, gap locks, next-key locking, phantom read defense | Shaped the interview questions on index write amplification and isolation level anomalies. |
| **Designing Data-Intensive Applications (DDIA)** | Martin Kleppmann | [https://dataintensive.net/](https://dataintensive.net/) | B-Trees vs LSM-Trees (SSTables, Bloom filters, compaction), ACID vs BASE, transaction isolation levels, distributed transactions (2PC) | Guided the distributed database module (Module 13) and LSM-Tree comparisons. |

---

## 3. Computer Networks

| Source Name | Institution / Authority | Source URL / Reference | Topics Validated & Integrated | Influence on Curriculum |
|---|---|---|---|---|
| **Computer Networking: A Top-Down Approach (Kurose & Ross)** | Academic Textbook (8th Ed.) | [https://www.pearson.com/en-us/subject-catalog/p/computer-networking-a-top-down-approach/P200000003303](https://www.pearson.com/en-us/subject-catalog/p/computer-networking-a-top-down-approach/P200000003303) | 5-layer Internet architecture, application layer (HTTP, DNS), transport layer (TCP, UDP, reliable transfer, flow & congestion control), network layer (IPv4/IPv6, routing algorithms), link layer (Ethernet, ARP) | Structured the 13-module progression from link frames to modern transport and application protocols. |
| **CS 144: Introduction to Computer Networking** | Stanford University | [https://cs144.github.io/](https://cs144.github.io/) | TCP state machine, sponge TCP implementation, sliding window buffers, sequence number wraparound, retransmission timers, packet sniffing (Wireshark) | Guided the exact packet header mechanics, sequence/acknowledgement numbers, and socket state lifecycles. |
| **RFC 793, RFC 6528, RFC 8446, RFC 7540, RFC 9000** | Internet Engineering Task Force (IETF) | [https://datatracker.ietf.org/](https://datatracker.ietf.org/) | TCP specification (RFC 793), ISN generation (RFC 6528), TLS 1.3 protocol (RFC 8446), HTTP/2 binary framing (RFC 7540), QUIC transport over UDP (RFC 9000) | Ensured cryptographic and wire protocol accuracy in Modules 8, 9, 11, and 12. |
| **High Performance Browser Networking** | Ilya Grigorik | [https://hpbn.co/](https://hpbn.co/) | TCP handshakes, head-of-line blocking, TCP slow start, TLS 1.3 0-RTT resumption, HTTP/2 multiplexing, HPACK header compression, WebSockets | Informs real-world web latency, browser connection lifecycles, and modern networking. |

---

## 4. Object-Oriented Programming (OOP) & Low-Level Design (LLD)

| Source Name | Institution / Authority | Source URL / Reference | Topics Validated & Integrated | Influence on Curriculum |
|---|---|---|---|---|
| **Design Patterns: Elements of Reusable Object-Oriented Software** | Gang of Four (Gamma, Helm, Johnson, Vlissides) | Addison-Wesley | Creational (Factory, Abstract Factory, Builder, Singleton, Prototype), Structural (Adapter, Decorator, Facade, Composite, Proxy), Behavioral (Strategy, Observer, Command, Iterator, State, Template Method) | Structured the 10-module OOP curriculum and design patterns module (Module 9). |
| **Clean Architecture & Agile Software Development (Robert C. Martin)** | Prentice Hall | [https://blog.cleancoder.com/](https://blog.cleancoder.com/) | SOLID principles: SRP, OCP, LSP, ISP, DIP; coupling vs cohesion, dependency injection, interface segregation | Grounded the SOLID principles module (Module 8) with practical code refactoring scenarios. |
| **C++ Core Guidelines & Standard Reference** | Bjarne Stroustrup & Herb Sutter | [https://isocpp.github.io/CppCoreGuidelines/CppCoreGuidelines](https://isocpp.github.io/CppCoreGuidelines/CppCoreGuidelines) | Object memory layout, virtual tables (`vtable`), virtual pointer (`*vptr`), dynamic dispatch assembly, object slicing, RAII, rule of three/five/zero | Shaped the deep machine-level OOP modules (Modules 2, 5, 6, 7). |
| **Head First Design Patterns** | Eric Freeman & Elisabeth Robson | O'Reilly Media | Real-world problem scenarios, composition over inheritance, loose coupling, behavioral pattern interactions | Informs the practical application and interview questions for LLD. |

---

## 5. Data Structures & Algorithms (DSA)

| Source Name | Institution / Authority | Source URL / Reference | Topics Validated & Integrated | Influence on Curriculum |
|---|---|---|---|---|
| **Introduction to Algorithms (CLRS)** | MIT Press (Cormen, Leiserson, Rivest, Stein) | [https://mitpress.mit.edu/9780262046305/introduction-to-algorithms/](https://mitpress.mit.edu/9780262046305/introduction-to-algorithms/) | Asymptotic notation, divide and conquer, Master theorem, heapsort, quicksort, red-black trees, dynamic programming (matrix chain multiplication, LCS), greedy algorithms (Huffman, MST), amortized analysis, graph algorithms (BFS, DFS, Dijkstra, Bellman-Ford, Floyd-Warshall), DSU | Established the academic foundation and 18-module structure for DSA. |
| **takeUforward (Striver's A2Z DSA Sheet)** | takeUforward / Raj Vikramaditya | [https://takeuforward.org/strivers-a2z-dsa-course/strivers-a2z-dsa-course-sheet-2/](https://takeuforward.org/strivers-a2z-dsa-course/strivers-a2z-dsa-course-sheet-2/) | Two Pointers, Sliding Window, Monotonic Stack, Monotonic Queue, Binary Search on Answer, Tree Traversals, Graph Kahn's algorithm, DP on Subsequences, DP on Grids, LIS, Disjoint Set Union by Rank | Guided the problem-solving patterns and high-yield interview question breakdown in Modules 11–18. |
| **NeetCode 150 / Roadmap** | NeetCode | [https://neetcode.io/roadmap](https://neetcode.io/roadmap) | Core pattern categorization: Arrays & Hashing, Two Pointers, Sliding Window, Stack, Binary Search, Linked List, Trees, Tries, Heap, Backtracking, Graphs, 1D/2D DP, Greedy, Interval | Cross-validated the essential topic dependencies and interview benchmark problems. |
| **Tech Interview Handbook** | Yangshun Tay | [https://www.techinterviewhandbook.org/](https://www.techinterviewhandbook.org/) | Algorithmic patterns, corner cases, space/time complexity trade-offs, coding interview rubric | Informs the question rubrics, edge cases, and red-flag avoidance points. |

---

## 6. System Design & Distributed Systems

| Source Name | Institution / Authority | Source URL / Reference | Topics Validated & Integrated | Influence on Curriculum |
|---|---|---|---|---|
| **System Design Primer** | Donne Martin | [https://github.com/donnemartin/system-design-primer](https://github.com/donnemartin/system-design-primer) | Horizontal scaling, Layer 4 vs Layer 7 load balancers, reverse proxies, caching (cache-aside, write-through, write-back), asynchronous processing, message queues, consistent hashing, database sharding, replication | Structured the 10 modules from foundational building blocks to distributed system design case studies. |
| **Designing Data-Intensive Applications** | Martin Kleppmann | O'Reilly Media | CAP theorem, PACELC, linearizability vs serializability, quorum consensus ($R + W > N$), multi-leader replication, log-structured storage, stream processing (Kafka) | Provides the theoretical rigor behind consensus, replication, and distributed storage. |
| **In Search of an Understandable Consensus Algorithm (Raft)** | Diego Ongaro & John Ousterhout (Stanford) | [https://raft.github.io/](https://raft.github.io/) | Leader election, heartbeat timeouts, log replication, safety invariants, joint consensus | Forms the core of the distributed consensus module (Module 7). |
| **ByteByteGo / System Design Interview** | Alex Xu | [https://bytebytego.com/](https://bytebytego.com/) | Back-of-the-envelope calculations, rate limiters (Token bucket, Leaky bucket), distributed unique ID generator (Snowflake), URL shortener, notification system, chat service | Shaped the practical engineering case studies and quantitative estimation frameworks (Module 10). |

---

## 7. Git & Version Control Internals

| Source Name | Institution / Authority | Source URL / Reference | Topics Validated & Integrated | Influence on Curriculum |
|---|---|---|---|---|
| **Pro Git Book** | Scott Chacon & Ben Straub | [https://git-scm.com/book/en/v2](https://git-scm.com/book/en/v2) | Git object model (blobs, trees, commits, tags), SHA hashing, `.git` anatomy, index/staging area, branch pointers, 3-way merge algorithm, interactive rebase, reflog, packfiles | Provided the 10-module syllabus tracing Git as a content-addressable DAG. |
| **Git Official Documentation & Source Code** | Linus Torvalds, Junio C Hamano | [https://git-scm.com/docs](https://git-scm.com/docs) | `git hash-object`, `cat-file`, `write-tree`, `commit-tree`, merge-base computation (LCA), plumbing vs porcelain commands | Grounded the terminal exercises and object format specifications. |

---

## 8. Computer Architecture

| Source Name | Institution / Authority | Source URL / Reference | Topics Validated & Integrated | Influence on Curriculum |
|---|---|---|---|---|
| **Computer Organization and Design: RISC-V Edition** | David Patterson & John Hennessy | Morgan Kaufmann | Instruction Set Architecture (ISA), arithmetic for computers, processor datapath & control, 5-stage classic RISC pipelining, pipeline hazards & forwarding, branch prediction, memory hierarchy, cache mapping, virtual memory HW | Structured the 10 modules covering CPU execution, pipelining, caches, and memory hierarchy. |
| **CS 61C: Great Ideas in Computer Architecture** | UC Berkeley | [https://cs61c.org/](https://cs61c.org/) | C memory management, RISC-V assembly, digital logic design, CPU datapath, caches (direct mapped, set associative), cache miss taxonomy (3 Cs: compulsory, capacity, conflict), SIMD, false sharing | Validated cache line locality, cache coherence, and hardware-software interface topics. |
| **Computer Systems: A Programmer's Perspective (CS:APP)** | Randal Bryant & David O'Hallaron (CMU) | [https://csapp.cs.cmu.edu/](https://csapp.cs.cmu.edu/) | Integer/floating-point representation, machine-level representation of programs, processor architecture, optimizing program performance, memory hierarchy, virtual memory | Informs the practical software engineering performance implications of CPU and memory architecture. |

---

## Summary of Curriculum Architecture Decisions

1. **Hierarchy Depth**: Replaced superficial module keyword lists with a strict 4-level hierarchy: `Subject` $\rightarrow$ `Module` $\rightarrow$ `Topic` $\rightarrow$ `Subtopic` $\rightarrow$ `Concepts & Questions`.
2. **Pedagogical Progression**: Every topic is mapped to one of three difficulty tiers: **Foundation (Level 1)**, **Intermediate (Level 2)**, or **Advanced (Level 3)** with explicit prerequisite chains.
3. **First-Class Questions**: Each subtopic includes a balanced question portfolio (Conceptual, Application, Analytical, Interview, Follow-Up, Practical).
4. **Separation of Concerns**: Academic invariants are distinguished from language- or engine-specific implementations (e.g. C++ vs Java vtables, MySQL vs Postgres MVCC, theory vs Linux kernel reality).

