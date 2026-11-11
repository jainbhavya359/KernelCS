export interface SearchResultItem {
  id: string;
  title: string;
  category: "Simulator" | "Subject" | "Roadmap" | "Interview Question" | "Core Concept";
  description: string;
  href: string;
  badge: string;
  tags: string[];
}

export const SEARCH_INDEX: SearchResultItem[] = [
  // Interactive Simulators
  {
    id: "sim-stack",
    title: "Stack Data Structure (LIFO) Visualizer",
    category: "Simulator",
    description: "Push, pop, and inspect raw physical memory addresses and stack pointer (RSP) register movements.",
    href: "#demonstrations",
    badge: "Interactive Lab",
    tags: ["stack", "lifo", "dsa", "memory", "push", "pop", "rsp"],
  },
  {
    id: "sim-cpu",
    title: "CPU Process Scheduling Gantt Explorer",
    category: "Simulator",
    description: "Compare Round Robin (RR), Shortest Job First (SJF), and FCFS with live turnaround and waiting times.",
    href: "#demonstrations",
    badge: "Interactive Lab",
    tags: ["cpu", "scheduling", "os", "gantt", "round robin", "sjf", "fcfs"],
  },
  {
    id: "sim-packet",
    title: "Network Packet Flight & Protocol Inspector",
    category: "Simulator",
    description: "Trace DNS lookup, TCP 3-way handshake, TLS 1.3 key exchange, and HTTP/2 payload delivery.",
    href: "#demonstrations",
    badge: "Interactive Lab",
    tags: ["networking", "tcp", "dns", "http", "tls", "packet", "handshake"],
  },
  {
    id: "sim-hero",
    title: "Computing Substrate Multiverse Explorer",
    category: "Simulator",
    description: "Interactive node graph connecting Virtual Memory, TCP Handshake, Array Reallocation, and Hash Rings.",
    href: "#hero-playground",
    badge: "Hero Lab",
    tags: ["hero", "interactive", "multiverse", "kernel", "nodes"],
  },

  // Subjects
  {
    id: "sub-dsa",
    title: "Data Structures & Algorithms (DSA)",
    category: "Subject",
    description: "Contiguous memory, trees, graphs, dynamic programming, and asymptotic complexity.",
    href: "#subjects",
    badge: "8 Modules • 42 Labs",
    tags: ["dsa", "trees", "graphs", "arrays", "dp", "sorting"],
  },
  {
    id: "sub-os",
    title: "Operating Systems (OS)",
    category: "Subject",
    description: "Process lifecycle, virtual memory page tables, thread synchronization, and deadlocks.",
    href: "#subjects",
    badge: "7 Modules • 36 Labs",
    tags: ["os", "operating systems", "paging", "threads", "locks", "virtual memory"],
  },
  {
    id: "sub-dbms",
    title: "Database Management Systems (DBMS)",
    category: "Subject",
    description: "Storage engines, B+ Trees, Write-Ahead Logging (WAL), ACID transactions, and MVCC.",
    href: "#subjects",
    badge: "6 Modules • 30 Labs",
    tags: ["dbms", "database", "b+ tree", "acid", "transactions", "sql", "indexing"],
  },
  {
    id: "sub-cn",
    title: "Computer Networks",
    category: "Subject",
    description: "The complete OSI stack, TCP/IP, flow control, DNS, TLS 1.3, and HTTP/3 QUIC.",
    href: "#subjects",
    badge: "7 Modules • 34 Labs",
    tags: ["networks", "tcp", "ip", "dns", "http", "osi", "tls", "quic"],
  },
  {
    id: "sub-oop",
    title: "Object-Oriented Programming (OOP)",
    category: "Subject",
    description: "vtable pointers, dynamic dispatch, composition vs inheritance, and SOLID principles.",
    href: "#subjects",
    badge: "5 Modules • 22 Labs",
    tags: ["oop", "solid", "vtable", "polymorphism", "inheritance", "design patterns"],
  },
  {
    id: "sub-sysdesign",
    title: "System Design & Distributed Systems",
    category: "Subject",
    description: "Consistent hashing, CAP theorem, message brokers, caching, and distributed consensus.",
    href: "#subjects",
    badge: "8 Modules • 38 Labs",
    tags: ["system design", "distributed systems", "hashing", "caching", "load balancer", "kafka"],
  },
  {
    id: "sub-git",
    title: "Git & Version Control Internals",
    category: "Subject",
    description: "Directed acyclic commit graphs (DAG), blobs, trees, three-way merge, and interactive rebase.",
    href: "#subjects",
    badge: "4 Modules • 24 Labs",
    tags: ["git", "github", "dag", "rebase", "merge", "commit", "reflog"],
  },
  {
    id: "sub-arch",
    title: "Computer Architecture",
    category: "Subject",
    description: "Instruction pipelines, L1/L2/L3 cache hierarchies, branch prediction, and memory alignment.",
    href: "#subjects",
    badge: "5 Modules • 26 Labs",
    tags: ["architecture", "cpu", "cache", "pipeline", "branch predictor", "ram"],
  },

  // Roadmaps
  {
    id: "road-cs",
    title: "Complete Computer Science Fundamentals Roadmap",
    category: "Roadmap",
    description: "12-week comprehensive journey from silicon transistors to distributed consensus.",
    href: "#roadmaps",
    badge: "12 Weeks • 84 Labs",
    tags: ["roadmap", "cs fundamentals", "curriculum", "beginner to advanced"],
  },
  {
    id: "road-sde",
    title: "SDE Technical Interview Fast-Track",
    category: "Roadmap",
    description: "8-week high-yield roadmap covering FAANG interview patterns and verbal defense.",
    href: "#roadmaps",
    badge: "8 Weeks • 65 Labs",
    tags: ["roadmap", "sde", "interview", "faang", "high yield"],
  },
  {
    id: "road-sysdesign",
    title: "System Design from Scratch to Scale",
    category: "Roadmap",
    description: "6-week path for Mid-to-Staff engineers building resilient distributed architectures.",
    href: "#roadmaps",
    badge: "6 Weeks • 48 Labs",
    tags: ["roadmap", "system design", "distributed", "scaling", "architecture"],
  },

  // Interview Questions
  {
    id: "iq-url",
    title: "What happens when you enter a URL in your browser?",
    category: "Interview Question",
    description: "Step-by-step breakdown across DNS, TCP, TLS 1.3, HTTP/2, and GPU rendering engine.",
    href: "#interview-prep",
    badge: "Medium • High Frequency",
    tags: ["url", "browser", "dns", "tcp", "tls", "interview"],
  },
  {
    id: "iq-process-thread",
    title: "Difference between Process and Thread at the OS Kernel Level",
    category: "Interview Question",
    description: "MMU page table isolation, CR3 register switching, TLB invalidation, and clone() syscall.",
    href: "#interview-prep",
    badge: "Medium • High Frequency",
    tags: ["process", "thread", "os", "kernel", "tlb", "context switch", "interview"],
  },
  {
    id: "iq-b-tree",
    title: "Why is B+ Tree preferred over Hash Table or BST for DB Indexing?",
    category: "Interview Question",
    description: "Disk seek latency, high fanout (1000+), and doubly-linked leaf range scan advantages.",
    href: "#interview-prep",
    badge: "Hard • High Frequency",
    tags: ["b+ tree", "database", "indexing", "disk", "range queries", "interview"],
  },
  {
    id: "iq-tcp-3way",
    title: "Why does TCP require a 3-Way Handshake instead of 2-Way?",
    category: "Interview Question",
    description: "The delayed duplicate SYN packet hazard and bidirectional sequence synchronization.",
    href: "#interview-prep",
    badge: "Medium • High Frequency",
    tags: ["tcp", "3-way handshake", "syn", "ack", "delayed packet", "interview"],
  },
  {
    id: "iq-url-shortener",
    title: "Design a distributed URL shortener handling 100k writes/sec",
    category: "Interview Question",
    description: "Base62 encoding, range ID allocator, Cassandra LSM storage, and Redis LRU caching.",
    href: "#interview-prep",
    badge: "Hard • High Frequency",
    tags: ["url shortener", "system design", "base62", "cassandra", "redis", "interview"],
  },
  {
    id: "iq-oop-pillars",
    title: "The Four Pillars of OOP and their exact runtime cost",
    category: "Interview Question",
    description: "Virtual method table (vtable), dynamic dispatch, memory slicing, and cache misses.",
    href: "#interview-prep",
    badge: "Medium • High Frequency",
    tags: ["oop", "polymorphism", "vtable", "encapsulation", "interview"],
  },
];

