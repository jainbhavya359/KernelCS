export interface InterviewQuestion {
  id: string;
  question: string;
  subject: string;
  subjectId: string;
  difficulty: "Easy" | "Medium" | "Hard";
  frequencyScore: number; // 1-100
  companies: string[];
  firstPrinciplesAnswer: {
    summary: string;
    keyPoints: string[];
    technicalDetail: string;
  };
  interviewerSignals: string[];
  redFlagsToAvoid: string[];
  followUpQuestions: string[];
  asciiDiagram?: string;
}

export const INTERVIEW_QUESTIONS_DATA: InterviewQuestion[] = [
  {
    id: "url-browser",
    question: "What actually happens when you enter a URL in your browser?",
    subject: "Computer Networks & Systems",
    subjectId: "cn",
    difficulty: "Medium",
    frequencyScore: 98,
    companies: ["Google", "Meta", "Amazon", "Stripe", "Apple"],
    firstPrinciplesAnswer: {
      summary:
        "The request undergoes a 5-layer traversal: URL parsing -> DNS resolution hierarchy -> TCP 3-way handshake -> TLS 1.3 cryptographic key exchange -> HTTP/2 multiplexed GET -> Server response -> Browser DOM/CSSOM tree rendering pipeline.",
      keyPoints: [
        "1. DNS Lookup: Browser checks local cache -> OS hosts/cache -> Router -> Recursive Resolver -> Root Server -> TLD Server -> Authoritative Nameserver (IP resolved).",
        "2. Socket & Transport: OS opens a TCP socket. A 3-way handshake (SYN, SYN-ACK, ACK) establishes reliable ordered byte delivery.",
        "3. Cryptographic Layer: TLS 1.3 establishes symmetric encryption using Diffie-Hellman ephemeral key exchange in just 1 RTT.",
        "4. Application Protocol: HTTP/2 frames the request with HPACK header compression. Server processes through reverse proxy -> application server -> storage.",
        "5. Rendering Pipeline: Browser parses HTML to DOM, CSS to CSSOM, computes Render Tree, calculates Layout (reflow), and Paints pixels to GPU compositor.",
      ],
      technicalDetail:
        "Top candidates distinguish between socket system calls, TLS 1.3 vs 1.2 RTT overhead, and GPU compositing layers vs CPU main thread repaints.",
    },
    interviewerSignals: [
      "Does the candidate jump straight to HTTP, or do they understand the OS socket, routing table, and ARP table?",
      "Do they explain why TLS 1.3 is faster (1 RTT) than TLS 1.2 (2 RTT)?",
      "Do they know the difference between layout reflow and GPU composite repaint?",
    ],
    redFlagsToAvoid: [
      "Saying 'The browser requests the page from DNS' — DNS only resolves domain names to IP addresses; it does not serve web pages.",
      "Forgetting that HTTPS requires a TLS handshake on top of TCP.",
      "Omitting the browser rendering engine (DOM, CSSOM, Layout, Paint).",
    ],
    followUpQuestions: [
      "What happens if the DNS response is an anycast IP?",
      "How does HTTP/2 multiplexing eliminate Head-of-Line (HoL) blocking at layer 7?",
      "How does QUIC / HTTP/3 solve HoL blocking at layer 4 over UDP?",
    ],
    asciiDiagram: `[Browser] 
   |-- 1. DNS Query (UDP 53) --------> [DNS Resolver] (IP: 198.51.100.42)
   |-- 2. TCP Handshake (SYN/ACK) ---> [Edge Load Balancer]
   |-- 3. TLS 1.3 Key Exchange ------> [TLS Session Established]
   |-- 4. HTTP/2 GET /index.html ----> [Web Server -> App -> DB]
   |<-- 5. 200 OK + Payload Stream --|
   v
[Render Engine]: HTML -> DOM + CSS -> CSSOM -> Layout -> GPU Paint`,
  },
  {
    id: "process-thread",
    question: "What is the true difference between a process and a thread at the OS kernel level?",
    subject: "Operating Systems",
    subjectId: "os",
    difficulty: "Medium",
    frequencyScore: 96,
    companies: ["Microsoft", "Amazon", "Apple", "Uber", "Bloomberg"],
    firstPrinciplesAnswer: {
      summary:
        "A process is an isolated execution environment with its own private virtual address space, file descriptor table, and security context. A thread is an execution unit inside a process that shares the same virtual address space, heap, and open files, but possesses its own private stack, program counter (PC), and CPU register set.",
      keyPoints: [
        "1. Address Space: Processes have isolated Page Tables managed by the MMU. Threads in the same process share the identical page table, making communication zero-copy via shared heap memory.",
        "2. Context Switch Overhead: Switching processes requires invalidating or swapping the MMU page table (CR3 register in x86), which flushes the Translation Lookaside Buffer (TLB), causing subsequent memory cache misses. Switching threads within the same process leaves the page table and TLB intact.",
        "3. Synchronization & Safety: Threads share heap memory, creating race conditions requiring mutexes/spinlocks. Process crash is isolated; thread crash typically terminates the entire process.",
        "4. Linux Implementation: In Linux, both are created via the clone() syscall. A thread is simply a task_struct where flags CLONE_VM, CLONE_FS, and CLONE_FILES are set.",
      ],
      technicalDetail:
        "In Linux, the kernel does not differentiate between threads and processes internally; both are represented by `task_struct`. What makes a thread a thread is whether `CLONE_VM` was passed to share the `mm_struct`.",
    },
    interviewerSignals: [
      "Mentions TLB flushing and page directory pointer (CR3) switching as the true hardware cost of process context switching.",
      "Understands that threads share the heap and data segment but own their individual execution stack.",
      "Knows the Linux `clone()` syscall abstraction.",
    ],
    redFlagsToAvoid: [
      "Saying threads don't have their own memory — each thread MUST have its own execution stack and stack pointer.",
      "Claiming threads run concurrently on a single core without preemption or time-slicing.",
      "Failing to articulate why multi-process communication requires IPC (pipes, shared memory, sockets).",
    ],
    followUpQuestions: [
      "Why is a context switch between threads of different processes more expensive than threads of the same process?",
      "What is a goroutine / green thread, and how does it avoid kernel context switching overhead?",
      "How does Copy-On-Write (COW) make `fork()` efficient despite duplicating the process?",
    ],
    asciiDiagram: `Process Address Space (MMU Page Table: CR3)
+-------------------------------------------------------+
| Code (Text) | Initialized Data | Heap (Shared Memory) |
+-------------------------------------------------------+
| Shared File Descriptors, Sockets, Environment Vars    |
+-------------------------------------------------------+
| Thread 1: Stack [RSP_1] | Thread 2: Stack [RSP_2]     |
| Thread 1: Registers/PC  | Thread 2: Registers/PC      |
+-------------------------------------------------------+`,
  },
  {
    id: "db-indexing-b-tree",
    question: "Why is a B+ Tree preferred over a Hash Table or BST for database indexing?",
    subject: "Database Management Systems",
    subjectId: "dbms",
    difficulty: "Hard",
    frequencyScore: 94,
    companies: ["Oracle", "Meta", "Amazon", "Postgres Core", "Snowflake"],
    firstPrinciplesAnswer: {
      summary:
        "Database storage engines are bottlenecked by physical disk I/O (block reads), not CPU cycles. B+ Trees have a high branching factor (fanout of 100-1000), reducing tree height to 3-4 levels for millions of records, requiring at most 3-4 disk page reads. Furthermore, B+ Tree leaf nodes are linked sequentially in a doubly linked list, enabling O(log N + K) range scans, which Hash Tables cannot do at all.",
      keyPoints: [
        "1. Fanout & Disk Seeks: A Binary Search Tree has a fanout of 2, requiring ~20-30 pointer dereferences for 1M keys. If stored on disk, that's 20-30 random disk reads. A B+ Tree node matches the disk page size (typically 4KB-16KB), fitting hundreds of keys per node, keeping tree depth at 3-4.",
        "2. Range Queries: Hash Tables have O(1) point lookups, but are completely useless for range queries (`WHERE age BETWEEN 20 AND 30`) or sorting (`ORDER BY`). B+ Trees keep all actual record pointers in leaf nodes linked horizontally.",
        "3. Internal vs Leaf Distinction: Unlike standard B-Trees, B+ Trees store data pointers ONLY in leaf nodes. Internal nodes only store router keys, allowing much higher fanout per 4KB page.",
        "4. Cache Friendliness: Sequential scanning across linked leaf pages takes advantage of disk prefetching and sequential read throughput (gigabytes/sec vs random read megabytes/sec).",
      ],
      technicalDetail:
        "A typical InnoDB B+ Tree with 16KB pages and 100-byte keys can index over 20 million rows with a depth of just 3. The root and level 1 are kept in RAM (Buffer Pool), meaning only 1 physical disk read is needed for any point lookup.",
    },
    interviewerSignals: [
      "Recognizes that disk I/O / block size (4KB-16KB) is the primary physical constraint, not Big-O CPU comparisons.",
      "Explains that Hash Tables fail completely at range queries and sorting.",
      "Explains why B+ Trees are superior to standard B-Trees (leaf-only data enables higher fanout in routing nodes).",
    ],
    redFlagsToAvoid: [
      "Saying 'B+ Trees have O(1) time complexity' — they are O(log_B N), but with a massive base B.",
      "Ignoring physical disk block architecture and treating memory as an abstract infinite tape.",
      "Claiming Hash Tables are universally worse without acknowledging they are faster for strict point equality when memory-resident.",
    ],
    followUpQuestions: [
      "When would an LSM Tree (Log-Structured Merge Tree) be preferred over a B+ Tree?",
      "What is a clustered index vs secondary index in MySQL InnoDB?",
      "How does write amplification in B+ Trees compare to LSM Trees during write-heavy workloads?",
    ],
    asciiDiagram: `[Root Node: Fanout = 1000] (Page 0x1000 in RAM)
       /          |          \\
 [Internal Node] [Internal Node] [Internal Node] (Level 1 in RAM)
    /    \\         /     \\          /     \\
[Leaf] <-> [Leaf] <-> [Leaf] <-> [Leaf] <-> [Leaf] (Data Rows on SSD)
 ^------------------- Doubly Linked List for Range Scans ------------^`,
  },
  {
    id: "tcp-handshake",
    question: "Why does TCP require a 3-Way Handshake instead of a 2-Way Handshake?",
    subject: "Computer Networks",
    subjectId: "cn",
    difficulty: "Medium",
    frequencyScore: 92,
    companies: ["Cisco", "Cloudflare", "Netflix", "Google", "Amazon"],
    firstPrinciplesAnswer: {
      summary:
        "The fundamental reason is the two-army problem across an unreliable network: both parties must reliably synchronize their Initial Sequence Numbers (ISNs) and confirm bidirectional communication readiness. A 2-way handshake fails to prevent duplicate, delayed connection requests from resurrecting phantom connections on the server.",
      keyPoints: [
        "1. Synchronizing Sequence Numbers: TCP is a full-duplex byte stream. Both Client and Server maintain independent sequence numbers to detect loss, reorder packets, and discard duplicates.",
        "2. The Delayed Duplicate Packet Hazard: In a 2-way handshake, if an old SYN packet delayed in the network arrives at the server after the original connection died, the server would send ACK and immediately open a connection, allocating memory buffers for a dead client that never asked for it.",
        "3. Verification of Bidirectional Path: The 3rd packet (ACK from client) proves to the server that the client is indeed alive, received the server's SYN-ACK, and is ready to transmit data.",
        "4. SYN Flood Vulnerability & SYN Cookies: Handshake state allocation makes servers vulnerable to SYN floods, solved by SYN cookies which encode state into the server's initial sequence number.",
      ],
      technicalDetail:
        "ISNs are not initialized to 0 to prevent confusion with old incarnations of the same socket pair (IP:Port tuple); RFC 6528 uses a cryptographic pseudo-random clock function.",
    },
    interviewerSignals: [
      "Explains the delayed SYN duplicate packet scenario and server resource exhaustion.",
      "Mentions sequence number synchronization for both directions (Client -> Server and Server -> Client).",
      "Brings up SYN flood attacks and how SYN Cookies defer TCB state allocation until the 3rd ACK.",
    ],
    redFlagsToAvoid: [
      "Saying '3 is just safer than 2' without mathematical justification of duplicate packets.",
      "Thinking the handshake sends the application payload before connection establishment.",
    ],
    followUpQuestions: [
      "How does TCP Fast Open (TFO) allow data transfer in the initial SYN packet safely?",
      "Why does connection termination require a 4-Way Handshake (FIN-ACK)?",
      "What is the purpose of the 2MSL TIME_WAIT state on the client?",
    ],
    asciiDiagram: `Client                               Server
  |                                    |
  |--- 1. SYN (Seq = X) -------------->| (Server hears Client)
  |                                    |
  |<-- 2. SYN (Seq = Y), ACK = X + 1 --| (Client verifies Server heard it)
  |                                    |
  |--- 3. ACK = Y + 1 ---------------->| (Server verifies Client is alive)
  |                                    |
[Connection ESTABLISHED - Full Duplex Safe Byte Stream Active]`,
  },
  {
    id: "url-shortener-design",
    question: "How would you design a distributed URL Shortener handling 100k writes/sec?",
    subject: "System Design",
    subjectId: "sysdesign",
    difficulty: "Hard",
    frequencyScore: 95,
    companies: ["Meta", "Google", "Amazon", "Uber", "Twitter/X"],
    firstPrinciplesAnswer: {
      summary:
        "A distributed URL shortener requires high write throughput, ultra-low read latency, and zero ID collisions. The optimal architecture uses a distributed Unique ID Generator (Snowflake or Token Range Service) combined with Base62 encoding, backed by a NoSQL distributed key-value store (Cassandra/DynamoDB) and an edge Redis cache layer.",
      keyPoints: [
        "1. ID Generation Strategy: Hashing MD5/SHA256 of the URL requires collision checks against the DB (expensive). Instead, generate a unique 64-bit integer using a centralized Range Allocator (Zookeeper dispensing 1M ID blocks to app servers) and encode into Base62 [a-z, A-Z, 0-9]. 7 chars gives 62^7 = 3.5 trillion URLs.",
        "2. Database Choice: High write throughput (100k writes/sec) and simple primary-key lookups (`short_url -> long_url`) makes a distributed NoSQL store (Cassandra or DynamoDB) vastly superior to relational databases due to LSM-tree append-only writes.",
        "3. Caching & 80/20 Rule: 20% of trending links generate 80% of read traffic. Place Redis clusters with LRU eviction behind the API. Set HTTP 302 (Found) instead of 301 (Moved Permanently) if real-time click analytics are required.",
        "4. Rate Limiting: Deploy Token Bucket rate limiters at the edge API gateway to prevent denial-of-service and URL squatting.",
      ],
      technicalDetail:
        "Returning HTTP 301 caches the redirect in the user's browser, eliminating server load for repeated clicks, but sacrifices click analytics. HTTP 302 forces requests to hit the server every time.",
    },
    interviewerSignals: [
      "Avoids calculating MD5 hash + collision lookup loop, opting for distributed counter + Base62.",
      "Explains the tradeoff between HTTP 301 (Permanent, client-cached) and HTTP 302 (Temporary, enables telemetry).",
      "Performs back-of-the-envelope calculations: storage needs, bandwidth, and cache sizing.",
    ],
    redFlagsToAvoid: [
      "Using auto-incrementing integer in a single SQL database (single point of failure and bottleneck at 100k writes/sec).",
      "Generating random 7-character strings and querying the database to see if it already exists (disastrous under high load).",
    ],
    followUpQuestions: [
      "How would you handle URL expiration and automated TTL cleanup across billions of rows?",
      "How do you prevent malicious phishing URLs from being shortened?",
      "What happens if a Zookeeper node dispensing ID ranges crashes?",
    ],
    asciiDiagram: `[User Request] 
      |
[API Gateway + Rate Limiter] 
      |
[App Servers] <--- [Zookeeper ID Range Dispenser: Allocates 1M block]
      |
+-----+-----+
|           |
[Redis Cache] (20% Hot URLs)
|           |
+-----+-----+
      | (Cache Miss)
[Cassandra Distributed DB] (LSM-Tree Partition Key: short_hash)`,
  },
  {
    id: "oop-four-pillars",
    question: "Explain the four pillars of OOP and their exact runtime cost in modern languages.",
    subject: "Object-Oriented Programming",
    subjectId: "oop",
    difficulty: "Medium",
    frequencyScore: 90,
    companies: ["Microsoft", "Adobe", "Salesforce", "Electronic Arts"],
    firstPrinciplesAnswer: {
      summary:
        "The four pillars are Encapsulation (data hiding and invariant protection), Abstraction (hiding implementation complexity behind contracts), Inheritance (code reuse and hierarchical modeling), and Polymorphism (ability of different classes to respond to the same interface via dynamic dispatch).",
      keyPoints: [
        "1. Encapsulation: Bundles state and methods while restricting direct field mutation, enforcing class invariants.",
        "2. Abstraction: Defines clean public contracts (interfaces) while concealing internal mechanics (e.g. `List.sort()` doesn't reveal Timsort internals).",
        "3. Inheritance vs Composition: Inheritance creates tight coupling and the fragile base class problem. Modern software architecture strictly prefers composition ('has-a') over inheritance ('is-a').",
        "4. Polymorphism & vtable Runtime Cost: In languages like C++, dynamic polymorphism introduces an 8-byte `vptr` in every object pointing to a virtual table (`vtable`). Calling a virtual function requires an extra pointer dereference and prevents compiler inlining, introducing branch predictor penalties.",
      ],
      technicalDetail:
        "Virtual calls cannot be inlined by standard compilers without Devirtualization analysis. In performance-critical game loops or low-latency trading, virtual methods are replaced with static polymorphism (templates, CRTP).",
    },
    interviewerSignals: [
      "Distinguishes between compile-time (overloading, generics) and runtime (virtual methods, interfaces) polymorphism.",
      "Explains the physical cost of virtual tables: memory overhead of vptr and prevention of function inlining.",
      "Champions composition over inheritance and cites Liskov Substitution Principle.",
    ],
    redFlagsToAvoid: [
      "Reciting memorized textbook definitions without explaining how they prevent bugs or what they cost at runtime.",
      "Advocating deep inheritance hierarchies (e.g. 5 levels deep) which are notorious anti-patterns.",
    ],
    followUpQuestions: [
      "How does the JVM JIT compiler use Monomorphic Inline Caching to optimize virtual method calls?",
      "What is the Fragile Base Class problem?",
      "Explain the Liskov Substitution Principle with an example of where inheritance breaks.",
    ],
    asciiDiagram: `Object in Memory:
[vptr (8 bytes)] ---> [vtable in read-only data segment]
[field_x (4 bytes)]    |-- index 0: &Derived::render()
[field_y (4 bytes)]    |-- index 1: &Derived::calculate()
                       |-- index 2: &Derived::destroy()

Call: object->render() executes: *(object->vptr[0])(object)`,
  },
];

