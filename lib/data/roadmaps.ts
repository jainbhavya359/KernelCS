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
  totalLabs: number;
  iconName: string;
  accentColor: string;
  milestones: RoadmapMilestone[];
}

export const ROADMAPS_DATA: Roadmap[] = [
  {
    id: "cs-fundamentals",
    title: "Complete Computer Science Fundamentals",
    badge: "Foundations to Mastery",
    tagline: "The definitive curriculum covering everything from transistors and memory addresses to distributed consensus.",
    targetAudience: "Students, self-taught engineers, and boot camp grads seeking rock-solid engineering depth.",
    estimatedWeeks: 12,
    totalModules: 32,
    totalLabs: 84,
    iconName: "Binary",
    accentColor: "#10B981",
    milestones: [
      {
        step: 1,
        title: "Silicon, Bits & Memory Layout",
        duration: "Week 1 - 2",
        description: "How binary representation works, memory addressing, stack vs heap allocation, and pointer arithmetic.",
        skills: ["Two's Complement", "Pointers & References", "Stack Frame Anatomy", "Endianness"],
        labTitle: "Interactive Memory Visualizer: Stack vs Heap allocation",
        interviewBenchmark: "Explain memory alignment and padding in struct definitions",
        status: "available",
      },
      {
        step: 2,
        title: "Algorithmic Complexity & Core Data Structures",
        duration: "Week 3 - 5",
        description: "Contiguous arrays, hash tables with collision resolution, balanced search trees, and heap-based priority queues.",
        skills: ["Amortized Analysis", "Open Addressing vs Chaining", "Red-Black Tree Invariants", "Two Pointers"],
        labTitle: "Interactive Hash Table Collision Simulator",
        interviewBenchmark: "Implement a thread-safe LRU Cache from scratch in O(1)",
        status: "available",
        prerequisites: ["Silicon, Bits & Memory Layout"],
      },
      {
        step: 3,
        title: "Operating System Kernel & Concurrency",
        duration: "Week 6 - 8",
        description: "Process management, virtual memory page tables, thread synchronization primitives, and deadlocks.",
        skills: ["Virtual Addresses & MMU", "Mutex vs Semaphore vs Futex", "CFS CPU Scheduling", "epoll Async I/O"],
        labTitle: "Interactive Gantt Chart: CPU Preemptive Scheduler",
        interviewBenchmark: "Detect and resolve deadlocks using Coffman conditions",
        status: "available",
        prerequisites: ["Algorithmic Complexity & Core Data Structures"],
      },
      {
        step: 4,
        title: "Network Architecture & Wire Protocols",
        duration: "Week 9 - 10",
        description: "The full OSI stack, TCP 3-way handshake, sliding window congestion control, DNS, and TLS 1.3 handshake.",
        skills: ["TCP/IP Stack", "Socket Programming", "TLS 1.3 Handshake", "HTTP/2 & HTTP/3"],
        labTitle: "Interactive Packet Flight: Browser Keystroke to 200 OK",
        interviewBenchmark: "Trace step-by-step what happens when entering a URL",
        status: "available",
        prerequisites: ["Operating System Kernel & Concurrency"],
      },
      {
        step: 5,
        title: "Storage Engines & Distributed Systems",
        duration: "Week 11 - 12",
        description: "B+ Tree indexes, ACID transactions, Write-Ahead Logging, consistent hashing, and consensus protocols.",
        skills: ["B+ Tree Splits", "WAL & fsync()", "Consistent Hashing Ring", "CAP Theorem"],
        labTitle: "Interactive B+ Tree Search & Node Split Simulator",
        interviewBenchmark: "Design a fault-tolerant distributed key-value store",
        status: "available",
        prerequisites: ["Network Architecture & Wire Protocols"],
      },
    ],
  },
  {
    id: "sde-interview",
    title: "SDE Technical Interview Fast-Track",
    badge: "High-Yield FAANG / Tier-1",
    tagline: "Curated roadmap focusing exclusively on high-frequency interview patterns and first-principles explanations.",
    targetAudience: "Candidates interviewing for Software Engineer (SDE I & SDE II) roles at top product companies.",
    estimatedWeeks: 8,
    totalModules: 24,
    totalLabs: 65,
    iconName: "Target",
    accentColor: "#F59E0B",
    milestones: [
      {
        step: 1,
        title: "High-Frequency Data Structure Patterns",
        duration: "Week 1 - 2",
        description: "Sliding window, monotonic stacks, fast & slow pointers, tree serialization, and prefix sums.",
        skills: ["Monotonic Stack", "Sliding Window", "Trie Prefix Search", "Union Find"],
        labTitle: "Interactive Monotonic Stack & Next Greater Element Engine",
        interviewBenchmark: "Trapping Rain Water & Sliding Window Maximum",
        status: "available",
      },
      {
        step: 2,
        title: "Core Graph & Dynamic Programming Patterns",
        duration: "Week 3 - 4",
        description: "Topological sorting, Dijkstra shortest paths, interval DP, 0/1 knapsack, and state compression.",
        skills: ["Kahn's Topological Sort", "Dijkstra Priority Queue", "DP State Transitions", "Bitmask Memoization"],
        labTitle: "Interactive Dijkstra Shortest Path Explorer",
        interviewBenchmark: "Alien Dictionary & Course Schedule III",
        status: "available",
        prerequisites: ["High-Frequency Data Structure Patterns"],
      },
      {
        step: 3,
        title: "System Design for SDE II",
        duration: "Week 5 - 6",
        description: "Scaling databases, caching strategies, rate limiters, message queues, and back-of-the-envelope calculations.",
        skills: ["Consistent Hashing", "Token Bucket Algorithm", "Read/Write Replicas", "Cache-Aside Pattern"],
        labTitle: "Interactive Distributed Rate Limiter Simulation",
        interviewBenchmark: "Design a Global Scalable URL Shortener with Analytics",
        status: "available",
        prerequisites: ["Core Graph & Dynamic Programming Patterns"],
      },
      {
        step: 4,
        title: "Core CS Verbal Defense (OS, Networks & DBMS)",
        duration: "Week 7 - 8",
        description: "Master articulate verbal answers to deep questions: processes vs threads, indexing tradeoffs, and TCP vs UDP.",
        skills: ["Context Switching Cost", "MVCC Snapshot Isolation", "B+ Tree Disk Seeks", "TCP Congestion"],
        labTitle: "Interactive Interview Simulator with Verbal Rubric",
        interviewBenchmark: "Explain the C10K problem and event-driven I/O architectures",
        status: "available",
        prerequisites: ["System Design for SDE II"],
      },
    ],
  },
  {
    id: "system-design",
    title: "System Design from Scratch to Scale",
    badge: "Mid-Level to Staff",
    tagline: "Build distributed architectures that survive hardware failures, traffic spikes, and network partitions.",
    targetAudience: "Engineers preparing for Low-Level Design (LLD) and High-Level Design (HLD) interviews.",
    estimatedWeeks: 6,
    totalModules: 18,
    totalLabs: 48,
    iconName: "Server",
    accentColor: "#38BDF8",
    milestones: [
      {
        step: 1,
        title: "Foundations: Hashing, Caching & Load Balancing",
        duration: "Week 1",
        description: "Layer 4 vs Layer 7 balancers, cache eviction policies, thundering herd mitigation, and consistent hashing.",
        skills: ["Consistent Hash Ring", "L4 vs L7 Routing", "Cache Invalidation", "Thundering Herd"],
        labTitle: "Interactive Consistent Hashing with Virtual Nodes",
        interviewBenchmark: "Design an in-memory distributed cache like Redis cluster",
        status: "available",
      },
      {
        step: 2,
        title: "Data Partitioning & Replication",
        duration: "Week 2 - 3",
        description: "Horizontal sharding, master-slave vs multi-leader replication, split-brain scenario, and quorum reads/writes.",
        skills: ["Sharding Keys", "Quorum Reads (R + W > N)", "SSTables & LSM Trees", "Write-Ahead Logging"],
        labTitle: "Interactive Quorum Consensus and Split-Brain Simulator",
        interviewBenchmark: "Design a distributed metrics telemetry aggregator",
        status: "available",
        prerequisites: ["Foundations: Hashing, Caching & Load Balancing"],
      },
      {
        step: 3,
        title: "Consensus, Asynchrony & Streaming",
        duration: "Week 4 - 5",
        description: "Raft consensus protocol, event streaming with Apache Kafka, message deduplication, and exactly-once semantics.",
        skills: ["Raft Leader Election", "Log Replication", "Kafka Partition Offsets", "Distributed Locks with Redis/Zookeeper"],
        labTitle: "Interactive Raft Leader Election & Heartbeat Lab",
        interviewBenchmark: "Design a Real-Time Distributed Chat Service (Slack/Discord)",
        status: "available",
        prerequisites: ["Data Partitioning & Replication"],
      },
      {
        step: 4,
        title: "Comprehensive End-to-End Architectures",
        duration: "Week 6",
        description: "Full architectural blueprints: payment processing with idempotency, video transcoding, and live location tracking.",
        skills: ["Idempotency Keys", "Geo-Hashing & QuadTrees", "Eventual Consistency", "Disaster Recovery"],
        labTitle: "Interactive Uber/Lyft Driver Matching QuadTree Simulator",
        interviewBenchmark: "Design a ride-sharing driver matching backend with sub-second latency",
        status: "available",
        prerequisites: ["Consensus, Asynchrony & Streaming"],
      },
    ],
  },
];

