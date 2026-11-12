export interface RoadmapMilestone {
  step: number;
  title: string;
  duration: string;
  description: string;
  skills: string[];
  labTitle: string;
  interviewBenchmark: string;
  status: "available" | "in-progress" | "locked";
  prerequisites?: string[];
}

export interface Roadmap {
  id: string;
  title: string;
  badge: string;
  tagline: string;
  targetAudience: string;
  estimatedWeeks: number;
  totalModules: number;
  iconName: string;
  accentColor: string;
  milestones: RoadmapMilestone[];
}

export const ROADMAPS_DATA: Roadmap[] = [
  {
    id: "cs-fundamentals",
    title: "Core Computer Science Systems",
    badge: "First-Principles Track",
    tagline: "A sequential progression from physical memory addressing and CPU cycles to distributed consensus.",
    targetAudience: "Engineers and students who want to build genuine bottom-up mental models of how computers execute software.",
    estimatedWeeks: 12,
    totalModules: 5,
    iconName: "Binary",
    accentColor: "#10B981",
    milestones: [
      {
        step: 1,
        title: "Hardware Substrates & Binary Representation",
        duration: "Weeks 1 — 2",
        description: "How physical memory addresses work, two's complement integer arithmetic, pointer offsets, stack frames, and struct padding.",
        skills: ["Two's Complement Math", "Pointer Dereferencing", "Stack Frame Anatomy (RSP/RBP)", "Memory Alignment & Padding"],
        labTitle: "CPU Datapath & Memory Addressing Simulator",
        interviewBenchmark: "Explain memory alignment rules and why struct field ordering affects memory size.",
        status: "available",
      },
      {
        step: 2,
        title: "Algorithmic Complexity & Data Layout",
        duration: "Weeks 3 — 5",
        description: "How memory layout governs speed: contiguous arrays, amortized doubling math, hash collision strategies, and balanced search trees.",
        skills: ["Amortized Resizing Proof", "Cache Line Spatial Locality", "Hash Collision Resolution", "Tree Balancing Rotations"],
        labTitle: "Dynamic Array Resizing & Amortized Complexity Lab",
        interviewBenchmark: "Prove mathematically why geometric doubling yields amortized O(1) appends while fixed increment allocation yields O(n).",
        status: "available",
        prerequisites: ["Hardware Substrates & Binary Representation"],
      },
      {
        step: 3,
        title: "Operating Systems & Concurrency",
        duration: "Weeks 6 — 8",
        description: "Dual-mode CPU execution, system calls, process scheduling, virtual memory multi-level page tables, and thread synchronization primitives.",
        skills: ["Dual-Mode (Ring 0 vs 3)", "Context Switching (PCB & CR3)", "Round Robin vs FCFS Scheduling", "Multi-Level Paging & TLB", "Mutexes vs Spinlocks"],
        labTitle: "Preemptive CPU Scheduler & Gantt Chart Lab",
        interviewBenchmark: "Explain what happens during a page fault and why thread context switching is cheaper than process switching.",
        status: "available",
        prerequisites: ["Algorithmic Complexity & Data Layout"],
      },
      {
        step: 4,
        title: "Network Architecture & Wire Protocols",
        duration: "Weeks 9 — 10",
        description: "The layered network stack, IP routing and subnetting, TCP 3-way handshake reliability, TLS 1.3 cryptographic key exchange, and HTTP/2 framing.",
        skills: ["Ethernet & ARP", "CIDR Subnetting", "TCP Sequence Synchronization", "Sliding Window Flow Control", "TLS 1.3 Key Exchange"],
        labTitle: "Network Packet Flight & Protocol Inspector",
        interviewBenchmark: "Trace step-by-step what happens when entering a URL into a browser until the page renders.",
        status: "available",
        prerequisites: ["Operating Systems & Concurrency"],
      },
      {
        step: 5,
        title: "Storage Engines & Distributed Systems",
        duration: "Weeks 11 — 12",
        description: "How databases store data on disk pages, B+ Tree indexing fanout, Write-Ahead Logging (WAL) for durability, and consistent hashing rings.",
        skills: ["Slotted Pages & Disk I/O", "B+ Tree Leaf Traversal", "Write-Ahead Logging (fsync)", "Consistent Hashing with Virtual Nodes", "CAP Theorem"],
        labTitle: "B+ Tree Indexing & Disk Block Access Simulator",
        interviewBenchmark: "Design an in-memory or disk-backed key-value store with durability and range query support.",
        status: "available",
        prerequisites: ["Network Architecture & Wire Protocols"],
      },
    ],
  },
  {
    id: "sde-interview",
    title: "Systems & Technical Interview Track",
    badge: "Core Engineering Concepts",
    tagline: "High-yield conceptual preparation focusing on systems tradeoffs, algorithmic mechanics, and clear oral explanations.",
    targetAudience: "Engineers preparing for rigorous technical interviews who want to demonstrate conceptual depth rather than memorized solutions.",
    estimatedWeeks: 8,
    totalModules: 4,
    iconName: "Target",
    accentColor: "#F59E0B",
    milestones: [
      {
        step: 1,
        title: "Memory Invariants & Linear Patterns",
        duration: "Weeks 1 — 2",
        description: "Two pointers, sliding window, monotonic stacks, dynamic array growth, and cache-friendly data structures.",
        skills: ["Monotonic Stack Transitions", "Sliding Window Bounds", "Amortized Doubling", "O(1) LRU Cache Design"],
        labTitle: "Dynamic Array Resizing & Cache Invalidation Lab",
        interviewBenchmark: "Implement an O(1) thread-safe LRU Cache from scratch with a Hash Map and Doubly Linked List.",
        status: "available",
      },
      {
        step: 2,
        title: "Trees, Graphs & State Space Search",
        duration: "Weeks 3 — 4",
        description: "BST invariants, topological sorting, Dijkstra's algorithm with priority queues, and dynamic programming state transitions.",
        skills: ["Binary Search on Answer Spaces", "Kahn's Topological Sort", "Dijkstra Priority Queue", "DP Recurrence Relations"],
        labTitle: "B+ Tree Indexing & Node Splitting Lab",
        interviewBenchmark: "Solve course scheduling dependency problems using topological cycle detection.",
        status: "available",
        prerequisites: ["Memory Invariants & Linear Patterns"],
      },
      {
        step: 3,
        title: "Operating Systems, Networking & DBMS Verbal Defense",
        duration: "Weeks 5 — 6",
        description: "Clear verbal articulation of core mechanisms: process vs thread context switching, TCP handshake failure modes, and B+ tree fanout.",
        skills: ["PCB & Context Switch Overhead", "TCP Delayed Duplicate Protection", "B+ Tree Disk Seek Reductions", "MVCC Isolation Levels"],
        labTitle: "Preemptive CPU Scheduler & Gantt Chart Lab",
        interviewBenchmark: "Explain why TCP requires a 3-way handshake and why B+ trees are preferred over hash tables for database indexes.",
        status: "available",
        prerequisites: ["Trees, Graphs & State Space Search"],
      },
      {
        step: 4,
        title: "Distributed System Design & Scalability",
        duration: "Weeks 7 — 8",
        description: "Designing real systems with concrete constraints: distributed URL shortener, consistent hash ring, cache invalidation, and rate limiters.",
        skills: ["Consistent Hashing with Virtual Nodes", "Token Bucket Rate Limiting", "Cache-Aside & Thundering Herd", "NoSQL vs RDBMS Tradeoffs"],
        labTitle: "Consistent Hash Ring & Partitioning Lab",
        interviewBenchmark: "Design a distributed URL shortener handling 100k writes/sec with high availability and collision-free IDs.",
        status: "available",
        prerequisites: ["Operating Systems, Networking & DBMS Verbal Defense"],
      },
    ],
  },
  {
    id: "system-design",
    title: "Distributed Systems Architecture",
    badge: "Scale & Reliability Track",
    tagline: "Build distributed architectures that survive node failures, network partitions, and high write concurrency.",
    targetAudience: "Engineers designing scalable backends and preparing for High-Level Design (HLD) interviews.",
    estimatedWeeks: 6,
    totalModules: 4,
    iconName: "Server",
    accentColor: "#38BDF8",
    milestones: [
      {
        step: 1,
        title: "Load Balancing, Caching & Partitioning",
        duration: "Weeks 1 — 2",
        description: "Layer 4 vs Layer 7 routing, cache eviction policies, thundering herd mitigation, and consistent hashing with virtual nodes.",
        skills: ["Consistent Hash Ring", "L4 vs L7 Routing", "Cache-Aside vs Write-Through", "Thundering Herd Mitigation"],
        labTitle: "Consistent Hashing Ring & Virtual Node Lab",
        interviewBenchmark: "Design an in-memory distributed cache cluster with bounded key rebalancing upon node failure.",
        status: "available",
      },
      {
        step: 2,
        title: "Data Replication, Sharding & CAP Theorem",
        duration: "Weeks 3",
        description: "Horizontal database sharding, primary-replica replication lag, quorum consistency (R + W > N), and PACELC trade-offs.",
        skills: ["Sharding Key Selection", "Quorum Reads and Writes", "SSTables & LSM-Trees", "Write-Ahead Logging (WAL)"],
        labTitle: "Database Indexing & Page Access Lab",
        interviewBenchmark: "Explain how quorum reads and writes prevent stale data and how network partitions force a choice between consistency and availability.",
        status: "available",
        prerequisites: ["Load Balancing, Caching & Partitioning"],
      },
      {
        step: 3,
        title: "Fault Tolerance, Rate Limiting & Consensus",
        duration: "Weeks 4 — 5",
        description: "Token bucket rate limiting, circuit breaker patterns, message brokers (Kafka vs RabbitMQ), and the Raft consensus protocol.",
        skills: ["Token Bucket Algorithm", "Circuit Breakers & Retries", "Kafka Log Partitions", "Raft Leader Election & Heartbeats"],
        labTitle: "Network Packet Flight & Wire Protocol Inspector",
        interviewBenchmark: "Design a multi-region distributed rate limiter with low cross-datacenter latency overhead.",
        status: "available",
        prerequisites: ["Data Replication, Sharding & CAP Theorem"],
      },
      {
        step: 4,
        title: "End-to-End System Design Case Studies",
        duration: "Week 6",
        description: "Architectural blueprints for realistic engineering scenarios: distributed URL shortener, notification service, and payment processing with idempotency.",
        skills: ["Distributed Unique ID Allocation", "Idempotency Keys", "Dead Letter Queues", "Disaster Recovery"],
        labTitle: "CPU Datapath & Memory Addressing Simulator",
        interviewBenchmark: "Design a fault-tolerant payment processing system guaranteeing exactly-once transaction execution.",
        status: "available",
        prerequisites: ["Fault Tolerance, Rate Limiting & Consensus"],
      },
    ],
  },
];
