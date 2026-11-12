import { LearningPathway } from "./types";

export const LEARNING_PATHWAYS: LearningPathway[] = [
  {
    id: "complete-cs-fundamentals",
    title: "Complete Computer Science Curriculum",
    badge: "Academic Foundation",
    tagline: "First-principles journey from physical silicon gates to planetary-scale distributed consensus.",
    targetAudience: "Computer Science students, self-taught engineers seeking foundational depth, and practitioners closing theoretical gaps.",
    estimatedWeeks: 36,
    steps: [
      {
        stepNumber: 1,
        subjectId: "architecture",
        subjectName: "Computer Architecture",
        moduleIds: ["arch-mod-1", "arch-mod-2", "arch-mod-3", "arch-mod-4", "arch-mod-5", "arch-mod-6"],
        moduleTitles: [
          "Number Systems & Data Representation",
          "Boolean Algebra & Logic Gates",
          "Combinational & Sequential Circuits",
          "Registers, ALU & CPU Buses",
          "Instruction Set Architecture (ISA) & Machine Code",
          "CPU Datapath & Instruction Execution Cycle"
        ],
        focus: "Hardware foundations: Boolean logic, ALU design, instruction set architectures, and the 5-stage RISC datapath.",
        milestoneProject: "Build an ALU and 5-stage RISC simulator in C or Python tracing register states through instruction cycles."
      },
      {
        stepNumber: 2,
        subjectId: "architecture",
        subjectName: "Computer Architecture",
        moduleIds: ["arch-mod-7", "arch-mod-8", "arch-mod-9", "arch-mod-10"],
        moduleTitles: [
          "Pipelining & Hazard Resolution",
          "Branch Prediction & Out-of-Order Execution",
          "Memory Hierarchy, Caches & Cache Coherence",
          "Hardware Virtual Memory & Parallelism"
        ],
        focus: "Microarchitecture performance: hazard forwarding, branch prediction, set-associative cache mathematics, and MESI coherence.",
        milestoneProject: "Implement a set-associative cache simulator tracking Tag/Index/Offset bit splits and calculating compulsory vs conflict misses."
      },
      {
        stepNumber: 3,
        subjectId: "os",
        subjectName: "Operating Systems",
        moduleIds: ["os-mod-1", "os-mod-2", "os-mod-3", "os-mod-4", "os-mod-6", "os-mod-7", "os-mod-11"],
        moduleTitles: [
          "OS Fundamentals & Kernel Architecture",
          "Processes, Threads & Execution Contexts",
          "CPU Scheduling Algorithms",
          "Synchronization & Concurrency Primitives",
          "Memory Management & Virtual Memory Architecture",
          "Paging Algorithms & Physical Memory Allocation",
          "Modern Asynchronous I/O & Event Loops"
        ],
        focus: "Bridging hardware and software: user vs kernel mode, context switching, CPU scheduling, thread synchronization, and virtual memory.",
        milestoneProject: "Implement a concurrent thread-safe bounded buffer queue with condition variables and a user-space round-robin cooperative scheduler."
      },
      {
        stepNumber: 4,
        subjectId: "dsa",
        subjectName: "Data Structures & Algorithms",
        moduleIds: [
          "dsa-mod-1", "dsa-mod-2", "dsa-mod-3", "dsa-mod-4", "dsa-mod-5", "dsa-mod-6",
          "dsa-mod-8", "dsa-mod-9", "dsa-mod-10", "dsa-mod-13", "dsa-mod-14"
        ],
        moduleTitles: [
          "Complexity Analysis & Mathematical Foundations",
          "Contiguous Memory & Array Locality",
          "Searching, Sorting & Divide and Conquer",
          "Pointer Chains: Singly & Doubly Linked Lists",
          "LIFO/FIFO Structures: Stacks, Queues & Deques",
          "Hash Tables & Hash-Based Associative Structures",
          "Binary Trees & Hierarchical Node Structures",
          "Binary Search Trees & Balanced Search Trees",
          "Priority Queues, Binary Heaps & Heap Sort",
          "Graph Representations & Graph Traversal",
          "Dynamic Programming Foundations"
        ],
        focus: "Master algorithmic time-space complexity, memory locality, balanced search trees, dynamic programming, and graph traversals.",
        milestoneProject: "Implement a persistent balanced AVL tree and a high-performance open-addressing robin-hood hash table."
      },
      {
        stepNumber: 5,
        subjectId: "dbms",
        subjectName: "Database Management Systems",
        moduleIds: ["dbms-mod-1", "dbms-mod-2", "dbms-mod-4", "dbms-mod-5", "dbms-mod-6", "dbms-mod-7", "dbms-mod-8", "dbms-mod-10", "dbms-mod-11", "dbms-mod-12"],
        moduleTitles: [
          "Database Fundamentals & Three-Schema Architecture",
          "Relational Model & Formal Relational Algebra",
          "Functional Dependencies & Schema Normalization",
          "SQL Fundamentals & Declarative Querying",
          "Advanced SQL Analytics & Query Processing",
          "Physical Storage Engines & Slotted Page Organization",
          "Index Architecture: B+ Trees & Disk Access Patterns",
          "ACID Guarantees & Transaction Processing",
          "Concurrency Control: 2PL & MVCC",
          "Crash Recovery: Write-Ahead Logging & ARIES"
        ],
        focus: "Relational storage engines: slotted page disk organization, B+ Tree indexing, SQL query plans, MVCC, and WAL crash recovery.",
        milestoneProject: "Build a disk-backed mini-storage engine with slotted page serialization, binary page headers, and B+ Tree indexing."
      },
      {
        stepNumber: 6,
        subjectId: "cn",
        subjectName: "Computer Networks",
        moduleIds: ["cn-mod-1", "cn-mod-2", "cn-mod-3", "cn-mod-4", "cn-mod-5", "cn-mod-6", "cn-mod-7", "cn-mod-8", "cn-mod-9", "cn-mod-11", "cn-mod-12"],
        moduleTitles: [
          "Network Foundations, Bandwidth & Latency Scaling",
          "Layered Architecture: OSI & TCP/IP Models",
          "Physical & Link Layer: Framing, CRC & Ethernet",
          "Link Layer Switching, MAC Learning & ARP",
          "Network Layer: IP Addressing, CIDR & Subnetting",
          "IP Routing Protocols: OSPF, BGP & Forwarding Tables",
          "Transport Layer Fundamentals: UDP vs TCP Demultiplexing",
          "TCP Internals: Handshake, Flow Control & Congestion Control",
          "Modern Transport: QUIC & HTTP/3 Packet Mechanics",
          "DNS Architecture & HTTP/1.1 vs HTTP/2",
          "Transport Layer Security: TLS 1.3 Cryptographic Handshake"
        ],
        focus: "The Internet stack: Ethernet, IP subnetting, BGP routing, TCP congestion control algorithms (CUBIC/BBR), QUIC/HTTP/3, and TLS 1.3.",
        milestoneProject: "Implement a user-space reliable packet transport protocol over UDP with sliding-window flow control and retransmissions."
      },
      {
        stepNumber: 7,
        subjectId: "oop",
        subjectName: "OOP & Low-Level Design",
        moduleIds: ["oop-mod-1", "oop-mod-2", "oop-mod-3", "oop-mod-4", "oop-mod-5", "oop-mod-6", "oop-mod-7", "oop-mod-8"],
        moduleTitles: [
          "Paradigms & First Principles: Encapsulation & State Invariants",
          "Memory Layout, Struct Alignment & Object Representation",
          "Abstraction, Interfaces & Contractual Programming",
          "Inheritance Hierarchies & The Diamond Problem",
          "Polymorphism & Dynamic Dispatch Internals (vtables & vptr)",
          "Object Lifecycle: Construction, Destruction & RAII",
          "Composition over Inheritance & Flexible Component Design",
          "SOLID Principles: Mathematical & Behavioral Foundations"
        ],
        focus: "Object-oriented mechanics: struct layout, vtable dynamic dispatch, RAII memory management, and SOLID principles.",
        milestoneProject: "Design and implement a clean, extensible machine coding system (Elevator Controller or Parking Lot) applying SOLID patterns."
      },
      {
        stepNumber: 8,
        subjectId: "sysdesign",
        subjectName: "System Design & Distributed Systems",
        moduleIds: ["sys-mod-1", "sys-mod-2", "sys-mod-3", "sys-mod-4", "sys-mod-5", "sys-mod-6", "sys-mod-7", "sys-mod-8", "sys-mod-9", "sys-mod-10"],
        moduleTitles: [
          "Distributed Foundations & API Architecture",
          "Load Balancing & Reverse Proxies (L4 vs L7)",
          "Caching Strategies & Memory Caching Architecture",
          "Data Partitioning, Sharding & Consistent Hashing",
          "Distributed Consensus: CAP Theorem & PACELC",
          "Asynchronous Message Queues & Event-Driven Architecture",
          "Raft Consensus & Distributed Leader Election",
          "Distributed Rate Limiting & Fault Tolerance",
          "Distributed Transactions: 2PC vs Saga Pattern",
          "System Design Case Studies: Scalable System Architectures"
        ],
        focus: "Planetary-scale systems: capacity estimation, consistent hashing, Raft consensus, Kafka stream processing, and distributed transactions.",
        milestoneProject: "Design a fault-tolerant, horizontally partitioned URL Shortener and distributed rate limiter supporting 100k QPS."
      }
    ]
  },
  {
    id: "sde-interview-track",
    title: "SDE Interview Preparation (Fast-Track)",
    badge: "Interview High-Yield",
    tagline: "Targeted mastery of the highest-frequency topics tested in FAANG and tier-1 engineering interviews.",
    targetAudience: "Engineers preparing for software engineering technical rounds (SDE-1, SDE-2, and Senior Software Engineer).",
    estimatedWeeks: 14,
    steps: [
      {
        stepNumber: 1,
        subjectId: "dsa",
        subjectName: "Data Structures & Algorithms",
        moduleIds: ["dsa-mod-1", "dsa-mod-2", "dsa-mod-5", "dsa-mod-6", "dsa-mod-8", "dsa-mod-9", "dsa-mod-10", "dsa-mod-12", "dsa-mod-13", "dsa-mod-14", "dsa-mod-18"],
        moduleTitles: [
          "Complexity Analysis & Mathematical Foundations",
          "Contiguous Memory & Array Locality",
          "LIFO/FIFO Structures: Stacks, Queues & Deques",
          "Hash Tables & Hash-Based Associative Structures",
          "Binary Trees & Hierarchical Node Structures",
          "Binary Search Trees & Balanced Search Trees",
          "Priority Queues, Binary Heaps & Heap Sort",
          "Advanced Binary Search & Predicate Search Spaces",
          "Graph Representations & Graph Traversal",
          "Dynamic Programming Foundations",
          "High-Frequency Interview Problem Patterns"
        ],
        focus: "Master high-frequency patterns: Two Pointers, Sliding Window, Monotonic Stacks, Binary Search on Answer, Graph BFS/DFS, and 1D/2D DP.",
        milestoneProject: "Solve 75 curated high-frequency benchmark problems across the primary interview patterns."
      },
      {
        stepNumber: 2,
        subjectId: "os",
        subjectName: "Operating Systems & Core Systems",
        moduleIds: ["os-mod-2", "os-mod-4", "os-mod-6", "os-mod-7", "dbms-mod-7", "dbms-mod-8", "dbms-mod-10", "dbms-mod-11", "cn-mod-7", "cn-mod-8"],
        moduleTitles: [
          "Processes, Threads & Execution Contexts",
          "Synchronization & Concurrency Primitives",
          "Memory Management & Virtual Memory Architecture",
          "Paging Algorithms & Physical Memory Allocation",
          "Index Architecture: B+ Trees & Disk Access Patterns",
          "Query Optimization & Execution Plans",
          "ACID Guarantees & Transaction Processing",
          "Concurrency Control: 2PL & MVCC",
          "Transport Layer Fundamentals: UDP vs TCP Demultiplexing",
          "TCP Internals: Handshake, Flow Control & Congestion Control"
        ],
        focus: "Systems fundamentals frequently tested in SDE interviews: Process vs Thread, Mutex vs Semaphore, Paging/TLB, B+ Trees vs LSM Trees, ACID & MVCC, and TCP 3-way handshake.",
        milestoneProject: "Pass the Systems Core technical benchmark questionnaire with zero conceptual flaws."
      },
      {
        stepNumber: 3,
        subjectId: "oop",
        subjectName: "OOP & Low-Level Design (LLD)",
        moduleIds: ["oop-mod-5", "oop-mod-7", "oop-mod-8", "oop-mod-9", "oop-mod-10"],
        moduleTitles: [
          "Polymorphism & Dynamic Dispatch Internals (vtables & vptr)",
          "Composition over Inheritance & Flexible Component Design",
          "SOLID Principles: Mathematical & Behavioral Foundations",
          "Creational, Structural & Behavioral Design Patterns",
          "Low-Level Design (LLD) Case Studies & Machine Coding"
        ],
        focus: "Low-level system architecture: SOLID principles, Strategy, Observer, Factory patterns, and machine coding problems.",
        milestoneProject: "Complete 2 timed 90-minute machine coding implementations (Elevator Control System and Parking Lot Management)."
      },
      {
        stepNumber: 4,
        subjectId: "sysdesign",
        subjectName: "High-Level System Design (HLD)",
        moduleIds: ["sys-mod-1", "sys-mod-2", "sys-mod-3", "sys-mod-4", "sys-mod-6", "sys-mod-8", "sys-mod-10"],
        moduleTitles: [
          "Distributed Foundations & API Architecture",
          "Load Balancing & Reverse Proxies (L4 vs L7)",
          "Caching Strategies & Memory Caching Architecture",
          "Data Partitioning, Sharding & Consistent Hashing",
          "Asynchronous Message Queues & Event-Driven Architecture",
          "Distributed Rate Limiting & Fault Tolerance",
          "System Design Case Studies: Scalable System Architectures"
        ],
        focus: "Structure 45-minute architectural interviews: Capacity calculations, load balancers, caching, sharding, message queues, rate limiters, and end-to-end design walkthroughs.",
        milestoneProject: "Deliver a structured end-to-end architectural design for a Distributed Rate Limiter and Real-Time Chat System."
      }
    ]
  },
  {
    id: "backend-distributed-track",
    title: "Backend & Distributed Systems Track",
    badge: "Cloud & Infrastructure",
    tagline: "Master asynchronous network I/O, database internals, transaction isolation, and event stream processing.",
    targetAudience: "Backend developers, distributed systems engineers, and cloud platform architects.",
    estimatedWeeks: 20,
    steps: [
      {
        stepNumber: 1,
        subjectId: "os",
        subjectName: "Operating Systems & Networking",
        moduleIds: ["os-mod-2", "os-mod-4", "os-mod-11", "cn-mod-7", "cn-mod-8", "cn-mod-9", "cn-mod-10"],
        moduleTitles: [
          "Processes, Threads & Execution Contexts",
          "Synchronization & Concurrency Primitives",
          "Modern Asynchronous I/O & Event Loops",
          "Transport Layer Fundamentals: UDP vs TCP Demultiplexing",
          "TCP Internals: Handshake, Flow Control & Congestion Control",
          "Modern Transport: QUIC & HTTP/3 Packet Mechanics",
          "Socket Programming Architecture & Non-Blocking I/O"
        ],
        focus: "Kernel I/O mechanics: non-blocking sockets, event polling with epoll, io_uring, and TCP congestion control.",
        milestoneProject: "Build an asynchronous TCP echo and HTTP server using raw epoll system calls."
      },
      {
        stepNumber: 2,
        subjectId: "dbms",
        subjectName: "Database Management Systems",
        moduleIds: ["dbms-mod-5", "dbms-mod-6", "dbms-mod-7", "dbms-mod-8", "dbms-mod-10", "dbms-mod-11", "dbms-mod-12", "dbms-mod-13"],
        moduleTitles: [
          "SQL Fundamentals & Declarative Querying",
          "Advanced SQL Analytics & Query Processing",
          "Physical Storage Engines & Slotted Page Organization",
          "Index Architecture: B+ Trees & Disk Access Patterns",
          "ACID Guarantees & Transaction Processing",
          "Concurrency Control: 2PL & MVCC",
          "Crash Recovery: Write-Ahead Logging & ARIES",
          "Distributed Databases: Sharding, Replication & CAP"
        ],
        focus: "Database internals: B+ Tree fanout, EXPLAIN plans, transaction isolation levels, MVCC, and write-ahead logging (WAL).",
        milestoneProject: "Analyze and optimize slow production SQL queries with composite indexes and CTEs, and write a crash-recovery log replay test."
      },
      {
        stepNumber: 3,
        subjectId: "sysdesign",
        subjectName: "Distributed Systems Architecture",
        moduleIds: ["sys-mod-3", "sys-mod-4", "sys-mod-5", "sys-mod-6", "sys-mod-7", "sys-mod-8", "sys-mod-9", "sys-mod-10"],
        moduleTitles: [
          "Caching Strategies & Memory Caching Architecture",
          "Data Partitioning, Sharding & Consistent Hashing",
          "Distributed Consensus: CAP Theorem & PACELC",
          "Asynchronous Message Queues & Event-Driven Architecture",
          "Raft Consensus & Distributed Leader Election",
          "Distributed Rate Limiting & Fault Tolerance",
          "Distributed Transactions: 2PC vs Saga Pattern",
          "System Design Case Studies: Scalable System Architectures"
        ],
        focus: "Distributed scale: consistent hashing, Kafka event streaming, Raft consensus, distributed sagas, and sliding-window rate limiters.",
        milestoneProject: "Implement a Raft leader election state machine in Go or Python."
      }
    ]
  },
  {
    id: "systems-lowlevel-track",
    title: "Systems Engineering & Low-Level Programming",
    badge: "Hardware & Kernels",
    tagline: "From CPU datapath hazards and cache coherence to kernel virtual memory and Git DAG internals.",
    targetAudience: "Systems programmers, C/C++/Rust engineers, Linux kernel contributors, and performance engineers.",
    estimatedWeeks: 22,
    steps: [
      {
        stepNumber: 1,
        subjectId: "architecture",
        subjectName: "Computer Architecture",
        moduleIds: ["arch-mod-1", "arch-mod-2", "arch-mod-3", "arch-mod-4", "arch-mod-5", "arch-mod-6"],
        moduleTitles: [
          "Number Systems & Data Representation",
          "Boolean Algebra & Logic Gates",
          "Combinational & Sequential Circuits",
          "Registers, ALU & CPU Buses",
          "Instruction Set Architecture (ISA) & Machine Code",
          "CPU Datapath & Instruction Execution Cycle"
        ],
        focus: "Two's complement overflow, combinational adders, edge-triggered flip-flops, RISC load-store ISAs, and CPU bus arbitration.",
        milestoneProject: "Write a cycle-accurate 5-stage CPU datapath simulator executing basic RISC machine code."
      },
      {
        stepNumber: 2,
        subjectId: "architecture",
        subjectName: "Computer Architecture & Microarchitecture",
        moduleIds: ["arch-mod-7", "arch-mod-8", "arch-mod-9", "arch-mod-10"],
        moduleTitles: [
          "Pipelining & Hazard Resolution",
          "Branch Prediction & Out-of-Order Execution",
          "Memory Hierarchy, Caches & Cache Coherence",
          "Hardware Virtual Memory & Parallelism"
        ],
        focus: "Data forwarding, dynamic branch prediction, set-associative cache line calculations, MESI coherence, and false sharing.",
        milestoneProject: "Benchmark and eliminate false sharing in a multithreaded C++ program using alignas(64) cache-line padding."
      },
      {
        stepNumber: 3,
        subjectId: "os",
        subjectName: "Operating Systems",
        moduleIds: ["os-mod-1", "os-mod-2", "os-mod-3", "os-mod-4", "os-mod-6", "os-mod-7", "os-mod-11"],
        moduleTitles: [
          "OS Fundamentals & Kernel Architecture",
          "Processes, Threads & Execution Contexts",
          "CPU Scheduling Algorithms",
          "Synchronization & Concurrency Primitives",
          "Memory Management & Virtual Memory Architecture",
          "Paging Algorithms & Physical Memory Allocation",
          "Modern Asynchronous I/O & Event Loops"
        ],
        focus: "Privilege rings, traps, context switching register saves, Linux CFS scheduling, page tables, TLB misses, and epoll/io_uring.",
        milestoneProject: "Write a simple Linux kernel module or custom system call with /proc or /sys debugging entries."
      },
      {
        stepNumber: 4,
        subjectId: "git",
        subjectName: "Git Internals & Plumbing",
        moduleIds: ["git-mod-1", "git-mod-2", "git-mod-3", "git-mod-5", "git-mod-8", "git-mod-10"],
        moduleTitles: [
          "VCS Fundamentals & The Directed Acyclic Graph (DAG)",
          "Git Object Database Internals",
          "The Three Trees: Working Tree, Index & HEAD",
          "Branching, Merging & Graph Topology",
          "Recovery Internals & The Reflog",
          "Advanced Internals: Packfiles, Plumbing & Garbage Collection"
        ],
        focus: "Content-addressable storage, loose objects, .git/index binary format, Lowest Common Ancestor (LCA) merges, reflogs, and plumbing commands.",
        milestoneProject: "Author a complete commit, tree, and branch pointer from scratch using exclusively Git plumbing commands."
      }
    ]
  },
  {
    id: "dsa-mastery-track",
    title: "DSA & Algorithmic Problem Solving Mastery",
    badge: "Algorithms & Math",
    tagline: "Rigorous algorithmic mastery from asymptotic doubling math and cache locality to segment trees and graph theory.",
    targetAudience: "Students, competitive programmers, and engineers preparing for rigorous algorithmic evaluations.",
    estimatedWeeks: 16,
    steps: [
      {
        stepNumber: 1,
        subjectId: "dsa",
        subjectName: "Data Structures & Algorithms",
        moduleIds: ["dsa-mod-1", "dsa-mod-2", "dsa-mod-3", "dsa-mod-4", "dsa-mod-5"],
        moduleTitles: [
          "Complexity Analysis & Mathematical Foundations",
          "Contiguous Memory & Array Locality",
          "Searching, Sorting & Divide and Conquer",
          "Pointer Chains: Singly & Doubly Linked Lists",
          "LIFO/FIFO Structures: Stacks, Queues & Deques"
        ],
        focus: "Asymptotic complexity, amortized doubling math, spatial cache locality in arrays, two pointers, binary search, and monotonic stacks.",
        milestoneProject: "Implement a dynamic circular buffer queue and a monotonic stack solving the Largest Rectangle in Histogram problem."
      },
      {
        stepNumber: 2,
        subjectId: "dsa",
        subjectName: "Data Structures & Algorithms",
        moduleIds: ["dsa-mod-6", "dsa-mod-7", "dsa-mod-8", "dsa-mod-9", "dsa-mod-10"],
        moduleTitles: [
          "Hash Tables & Hash-Based Associative Structures",
          "Recursion Trees & Backtracking Search Spaces",
          "Binary Trees & Hierarchical Node Structures",
          "Binary Search Trees & Balanced Search Trees",
          "Priority Queues, Binary Heaps & Heap Sort"
        ],
        focus: "Hash collision resolution, recursion tree state spaces, tree traversals (morris traversal), balanced BST rotations (AVL/Red-Black), and min-max heaps.",
        milestoneProject: "Implement a median-maintenance data structure using two balanced heaps supporting O(log N) insertion and O(1) median queries."
      },
      {
        stepNumber: 3,
        subjectId: "dsa",
        subjectName: "Data Structures & Algorithms",
        moduleIds: ["dsa-mod-11", "dsa-mod-12", "dsa-mod-13"],
        moduleTitles: [
          "Greedy Strategy & Greedy Choice Property",
          "Advanced Binary Search & Predicate Search Spaces",
          "Graph Representations & Graph Traversal"
        ],
        focus: "Greedy interval scheduling, Binary Search on Answer search spaces, Kahn's topological sort, Dijkstra's shortest path, and Bellman-Ford.",
        milestoneProject: "Implement Dijkstra's shortest path with an indexed binary heap and solve the Capacity to Ship Packages Within D Days problem."
      },
      {
        stepNumber: 4,
        subjectId: "dsa",
        subjectName: "Data Structures & Algorithms",
        moduleIds: ["dsa-mod-14", "dsa-mod-15", "dsa-mod-16", "dsa-mod-17", "dsa-mod-18"],
        moduleTitles: [
          "Dynamic Programming Foundations",
          "Advanced Dynamic Programming Patterns",
          "String Algorithms & Trie Structures",
          "Disjoint Set Union (DSU) & Minimum Spanning Trees",
          "Advanced Trees: Segment Trees & Fenwick Trees"
        ],
        focus: "1D/2D DP, 0/1 Knapsack, LIS, prefix Tries, DSU with union by rank and path compression, and Segment Trees with range updates.",
        milestoneProject: "Implement a Segment Tree with lazy propagation supporting O(log N) range sum queries and range additions."
      }
    ]
  }
];
