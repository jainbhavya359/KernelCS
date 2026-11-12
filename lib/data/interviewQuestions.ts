export interface InterviewQuestion {
  id: string;
  question: string;
  subject: string;
  subjectId: string;
  difficulty: "Easy" | "Medium" | "Hard";
  frequencyScore: number;
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
    id: "os-process-state-context-switch",
    question: "A process switches from running to waiting and then becomes ready again. Explain what happens to its execution state and why a context switch may occur.",
    subject: "Operating Systems",
    subjectId: "os",
    difficulty: "Medium",
    frequencyScore: 96,
    companies: ["Microsoft", "Google", "Amazon", "Apple", "Uber"],
    firstPrinciplesAnswer: {
      summary:
        "When a running process initiates a blocking operation (such as disk I/O or waiting on a mutex), it cannot make forward progress on the CPU. The operating system transitions it to the Waiting (Blocked) state, saves its execution context into its Process Control Block (PCB), and schedules another Ready process via a context switch. Once the hardware interrupt signals I/O completion, the kernel moves the process back to the Ready queue.",
      keyPoints: [
        "1. Transition to Waiting: The process executes a blocking system call (e.g. read()). The kernel updates the process state in the PCB from RUNNING to WAITING and moves it from the CPU runqueue into the appropriate device wait queue.",
        "2. Context Save: The CPU registers—Program Counter (PC/RIP), Stack Pointer (RSP), general-purpose registers, flags, and floating-point registers—are pushed to the process kernel stack and recorded into the PCB.",
        "3. CPU Dispatch: The scheduler selects the next Ready process. The CPU switches memory spaces by loading the new process's page table root address into the CR3 register (on x86-64), which invalidates non-global entries in the Translation Lookaside Buffer (TLB).",
        "4. Transition back to Ready: When disk I/O finishes, the hardware controller fires an interrupt. The kernel's Interrupt Service Routine (ISR) identifies the completed request and moves the original process from WAITING to READY in the scheduler's runqueue.",
      ],
      technicalDetail:
        "Context switching incurs direct CPU overhead (saving/restoring ~100–500 nanoseconds of registers) and indirect hardware overhead (TLB invalidation and CPU L1/L2 cache pollution), causing high memory latency on subsequent instructions.",
    },
    interviewerSignals: [
      "Distinguishes between Waiting (blocked on an external event) and Ready (runnable, waiting only for CPU allocation).",
      "Identifies that an I/O completion is initiated by an asynchronous hardware interrupt handled by an ISR.",
      "Explains that process context switching requires page table swapping (CR3 register) and causes TLB cache invalidation.",
      "Mentions why switching between threads of the same process is cheaper: threads share the same page directory, avoiding TLB flushes.",
    ],
    redFlagsToAvoid: [
      "Thinking a waiting process switches directly back to running without going through the ready queue first.",
      "Claiming context switching is instantaneous and has zero hardware performance impact.",
      "Confusing user mode stack pointers with kernel mode execution contexts.",
    ],
    followUpQuestions: [
      "What exact fields are stored in the Process Control Block (PCB)?",
      "Why is context switching considered pure overhead from the perspective of system throughput?",
      "How does a context switch between two threads of the same process differ from a switch between two separate processes?",
    ],
    asciiDiagram: `[NEW] ---> [READY Queue] <====== (Timer Quantum Expired) ======+
                 |                                                 |
            (Scheduler Dispatch)                                   |
                 v                                                 |
             [RUNNING] --------------------------------------------+
                 |
          (Blocking I/O or Lock)
                 v
             [WAITING] ---> (Hardware Interrupt: I/O Complete) ---> [READY]`,
  },
  {
    id: "os-virtual-memory-page-fault",
    question: "What happens at the hardware and operating system level when a thread accesses a virtual memory address that is currently not resident in physical RAM?",
    subject: "Operating Systems",
    subjectId: "os",
    difficulty: "Hard",
    frequencyScore: 92,
    companies: ["Apple", "Google", "Meta", "Bloomberg", "NVIDIA"],
    firstPrinciplesAnswer: {
      summary:
        "The Memory Management Unit (MMU) attempts to translate the virtual address via the page table, observes that the valid/present bit is 0, and triggers a hardware page fault exception (interrupt 14 on x86). The CPU transitions from user mode to kernel mode, where the page fault handler allocates a physical page frame, reads the missing data from disk swap or backing file into RAM, updates the page table present bit, and restarts the faulting instruction.",
      keyPoints: [
        "1. MMU Translation Failure: The MMU walks the multi-level page table using the virtual address. In the leaf Page Table Entry (PTE), it reads `present = 0`, generating a hardware page fault trap.",
        "2. Hardware State Preservation: The CPU saves the faulting virtual address into register CR2, pushes the faulting instruction pointer (RIP) and error code onto the kernel stack, and switches to Ring 0.",
        "3. Kernel Evaluation: The OS page fault handler checks whether the address is valid in the process's Virtual Memory Area (VMA). If invalid, a SIGSEGV is raised. If valid, demand paging begins.",
        "4. Disk I/O & Page Allocation: The OS selects a free physical frame (or evicts an existing page via LRU/Clock if memory is full). It initiates an asynchronous disk read to load the 4KB page.",
        "5. PTE Update & Instruction Restart: Once the disk read completes, the kernel updates the PTE with the physical frame number, sets `present = 1`, flushes the relevant TLB entry via `invlpg`, and returns from the trap (`iretq`), re-executing the original memory access transparently.",
      ],
      technicalDetail:
        "A page fault transforms a nanosecond memory reference into a millisecond disk read—a latency penalty of roughly 100,000x. Systems minimize this through read-ahead prefetching and maintaining a pool of zeroed free frames.",
    },
    interviewerSignals: [
      "Mentions the MMU checking the 'present/valid' bit in the Page Table Entry (PTE).",
      "Recognizes that the CPU automatically switches to kernel mode and stores the faulting address in CR2.",
      "Differentiates between a valid page fault (demand paging) and an invalid one (segmentation fault / SIGSEGV).",
      "Notes that the faulting instruction must be re-executed, not skipped.",
    ],
    redFlagsToAvoid: [
      "Assuming page faults are software errors that crash the program (demand paging is normal OS behavior).",
      "Confusing a TLB miss (handled quickly by MMU hardware walk) with a page fault (disk I/O handled by kernel software).",
    ],
    followUpQuestions: [
      "What is the difference between a minor (soft) page fault and a major (hard) page fault?",
      "How does the OS handle page replacement when all physical frames are full (thrashing)?",
      "Why do 64-bit architectures use 4-level or 5-level page tables instead of a single flat table?",
    ],
    asciiDiagram: `Virtual Address: [VPN Level 4 | VPN 3 | VPN 2 | VPN 1 | Offset]
       |
       v (MMU Walks Page Table)
Page Table Entry (PTE): [Frame Address | Present Bit = 0]
       |
       v (Hardware Exception Trap: Interrupt 14)
[CPU Ring 0 Kernel Mode: Page Fault Handler]
       |-- Check VMA validity in mm_struct
       |-- Allocate physical RAM frame (4KB)
       |-- Issue Disk Read (Swap/File Backing)
       |-- Update PTE: [Physical Frame # | Present Bit = 1]
       v
Return from Interrupt (iretq) -> CPU Re-executes original instruction`,
  },
  {
    id: "dbms-email-indexing-tradeoffs",
    question: "An application frequently queries users by email address (SELECT * FROM users WHERE email = ?). How would you optimize this query, and what trade-offs would an index introduce?",
    subject: "Database Management Systems",
    subjectId: "dbms",
    difficulty: "Medium",
    frequencyScore: 94,
    companies: ["Stripe", "Amazon", "Shopify", "Meta", "LinkedIn"],
    firstPrinciplesAnswer: {
      summary:
        "To optimize this point query from an O(N) full table scan to an O(log N) indexed lookup, create a unique B+ Tree secondary index on the `email` column (`CREATE UNIQUE INDEX idx_users_email ON users(email);`). While this reduces read disk page accesses from thousands to 2–3, it introduces write amplification on INSERT/DELETE/UPDATE operations and consumes additional disk and RAM buffer pool space.",
      keyPoints: [
        "1. Full Table Scan Baseline: Without an index, the database engine must sequentially read every data page from disk into the buffer pool to inspect each row's email field—costing O(N) disk I/O.",
        "2. Secondary B+ Tree Mechanism: A secondary index creates a separate B+ Tree where keys are email strings and leaf node pointers are either physical row IDs (PostgreSQL heap tuple IDs) or primary keys (MySQL InnoDB clustered index keys).",
        "3. Read Path Optimization: The database traverses root -> internal node -> leaf node (typically 2–3 page reads), finds the primary key, and performs a secondary lookup on the clustered table to fetch `*`.",
        "4. Write Amplification Tradeoff: Every new user insertion requires not only appending to the clustered table/WAL, but also traversing and inserting a node into the secondary B+ Tree, potentially triggering leaf page splits.",
        "5. Memory Footprint: The index pages must reside in the database buffer pool cache in RAM to remain fast, competing for cache space with data pages.",
      ],
      technicalDetail:
        "If the query only requested `SELECT id FROM users WHERE email = ?` and the secondary index leaf stored the clustered primary key `id`, the engine could execute an 'index-only scan' (covering index), eliminating the secondary clustered table lookup entirely.",
    },
    interviewerSignals: [
      "Distinguishes between clustered index lookup (data stored directly with key) and secondary index lookup (requires secondary fetch).",
      "Explains write amplification and leaf page splits during INSERT/UPDATE operations.",
      "Mentions covering indexes / index-only scans as an additional optimization.",
      "Acknowledges that email strings have variable length, meaning prefix compression or hash indexes could be considered.",
    ],
    redFlagsToAvoid: [
      "Stating that indexes make all database operations faster without mentioning the write penalty.",
      "Failing to understand that a secondary index in MySQL InnoDB points to the primary key, not the raw disk offset.",
    ],
    followUpQuestions: [
      "What is a covering index, and how would it eliminate the clustered index lookup?",
      "Why would a B+ Tree index be preferred over a Hash index for this column if range lookups are not needed?",
      "What happens to the secondary index when a user updates their email address?",
    ],
    asciiDiagram: `Query: SELECT * FROM users WHERE email = 'alice@kernelcs.org'
1. Search Secondary Index (B+ Tree on email):
   [Root] -> [Internal] -> [Leaf: 'alice@kernelcs.org' => PK: 1042] (2-3 page reads)
2. Clustered Table Lookup (Primary Key B+ Tree):
   [Root] -> [Internal] -> [Leaf: PK 1042 => Full Row Data] (1-2 page reads)
Result: Total ~4 page reads vs Scanning all 100,000 data pages.`,
  },
  {
    id: "dbms-b-tree-vs-hash-bst",
    question: "Why is a B+ Tree preferred over a Hash Table or balanced Binary Search Tree for database storage engines?",
    subject: "Database Management Systems",
    subjectId: "dbms",
    difficulty: "Hard",
    frequencyScore: 95,
    companies: ["Oracle", "Postgres Core", "Snowflake", "Amazon", "Google"],
    firstPrinciplesAnswer: {
      summary:
        "Database storage engines are bottlenecked by physical disk I/O (block reads), not CPU comparisons. A B+ Tree node matches the physical disk page size (typically 4KB–16KB), giving it a high branching factor (fanout of 100–1000) that bounds tree depth to 3–4 levels even for billions of rows. Furthermore, all data pointers reside strictly in leaf nodes linked in a doubly linked list, enabling efficient O(log N + K) range scans, which Hash Tables cannot do.",
      keyPoints: [
        "1. Block-Oriented I/O: Disks read data in fixed blocks (pages), not individual bytes. A Binary Search Tree has a fanout of 2, requiring ~30 random disk reads for 1 billion keys. A B+ Tree node packs hundreds of keys into one 16KB page, keeping height to 3–4.",
        "2. Range Scans and Sorting: Hash Tables offer O(1) point lookups, but hash functions destroy key ordering. Queries like `WHERE age BETWEEN 25 AND 35` or `ORDER BY created_at` require a full table scan on a Hash Table. In a B+ Tree, finding the range start takes O(log N), followed by sequential traversal across linked leaf pages.",
        "3. Leaf-Only Data Pointers: Unlike standard B-Trees where every node stores data records, B+ Trees store data records exclusively in leaf nodes. Internal routing nodes only contain delimiter keys and child page pointers, maximizing the fanout per page.",
        "4. Cache Locality: Because the root and level-1 nodes are frequently cached in the database buffer pool in RAM, most B+ Tree lookups require only 1 physical disk read.",
      ],
      technicalDetail:
        "With a 16KB page size and 100-byte key/pointer pairs, fanout is ~160. A 3-level B+ Tree can index 160^3 = ~4.1 million leaf pages, storing over 40 million records while requiring at most 1–2 physical disk reads.",
    },
    interviewerSignals: [
      "Frames the question around disk hardware physics (page block transfers) rather than abstract Big-O CPU math.",
      "Explains why Hash Tables fail completely for range queries (`BETWEEN`, `<`, `>`) and ordered scans (`ORDER BY`).",
      "Articulates the difference between standard B-Trees and B+ Trees (leaf-only data enables higher routing fanout).",
      "Mentions buffer pool caching of upper tree levels.",
    ],
    redFlagsToAvoid: [
      "Claiming B+ Trees have O(1) search time—they are O(log_B N), but the base B is massive.",
      "Forgetting that Hash Tables can be faster for strictly memory-resident point equality lookups.",
    ],
    followUpQuestions: [
      "When is an LSM-Tree (Log-Structured Merge Tree) preferred over a B+ Tree?",
      "How does page fill factor (e.g. 70% fill) prevent immediate page splits on consecutive inserts?",
      "What is write amplification, and why is it higher in B+ Trees than in append-only storage engines?",
    ],
    asciiDiagram: `[Root Node: Page 0x01 in RAM Buffer Pool]
         /                 |                 \\
[Internal: Page 0x08] [Internal: Page 0x09] [Internal: Page 0x0A]
       /        \\            /        \\            /        \\
  [Leaf A] <-> [Leaf B] <-> [Leaf C] <-> [Leaf D] <-> [Leaf E] <-> [Leaf F]
  ^---------------- Doubly Linked List for Fast Range Scans ----------------^`,
  },
  {
    id: "dbms-concurrency-booking-conflict",
    question: "Two concurrent transactions attempt to book the last available flight seat. How does the database prevent double-booking, and what is the difference between pessimistic locking and optimistic concurrency control (OCC)?",
    subject: "Database Management Systems",
    subjectId: "dbms",
    difficulty: "Hard",
    frequencyScore: 91,
    companies: ["Airbnb", "Uber", "Stripe", "Booking.com", "Amazon"],
    firstPrinciplesAnswer: {
      summary:
        "Double-booking occurs when two transactions read `available_seats = 1` simultaneously and both issue updates decrementing the count to 0, resulting in an unrepeatable read or lost update anomaly. Databases prevent this using serializable transaction isolation, explicit row-level locking (Pessimistic Locking via SELECT FOR UPDATE), or version checking (Optimistic Concurrency Control with atomic conditional writes).",
      keyPoints: [
        "1. The Lost Update Hazard: Under default Read Committed isolation, Transaction A reads seat count 1. Transaction B also reads seat count 1. Transaction A sets count to 0 and commits. Transaction B overwrites count to 0 and commits. Both users believe they booked the seat.",
        "2. Pessimistic Locking (SELECT FOR UPDATE): Transaction A acquires an exclusive (X) row lock immediately: `SELECT * FROM flights WHERE id = 42 FOR UPDATE;`. Transaction B attempts to execute the same query and blocks until Transaction A commits or rolls back.",
        "3. Optimistic Concurrency Control (OCC): Transactions proceed without locking. Each row has a `version_number`. At commit time, the transaction checks: `UPDATE flights SET available_seats = 0, version = version + 1 WHERE id = 42 AND version = 5;`. If another transaction already bumped the version, rows affected is 0, and the transaction aborts and retries.",
        "4. Tradeoff Profile: Pessimistic locking prevents wasted work under high contention but causes thread blocking, latency spikes, and potential deadlocks. OCC eliminates lock overhead under low contention but incurs high rollback and retry costs under high contention.",
      ],
      technicalDetail:
        "Under Multi-Version Concurrency Control (MVCC) with Snapshot Isolation, a 'first-committer-wins' rule aborts the concurrent transaction with a serialization failure (`could not serialize access due to concurrent update`).",
    },
    interviewerSignals: [
      "Explains the exact race condition (Lost Update) with concurrent read-modify-write cycles.",
      "Provides exact SQL syntax for pessimistic locking (`SELECT ... FOR UPDATE`) and OCC (`UPDATE ... WHERE version = ?`).",
      "Articulates the workload conditions favoring each approach (high contention -> pessimistic; low contention -> optimistic).",
      "Mentions deadlock risks with multi-resource pessimistic locks and ordering strategies.",
    ],
    redFlagsToAvoid: [
      "Assuming database transactions automatically prevent race conditions without specifying isolation levels or lock semantics.",
      "Suggesting distributed locks in Redis before considering standard database row-level locking.",
    ],
    followUpQuestions: [
      "How does Two-Phase Locking (2PL) guarantee conflict serializability?",
      "How can two transactions executing SELECT FOR UPDATE on different tables cause a deadlock, and how does the DBMS detect it?",
      "In a distributed microservice architecture, how would you handle seat reservations using the Saga pattern?",
    ],
    asciiDiagram: `Pessimistic Locking:
Tx 1: SELECT seat FROM flights FOR UPDATE; ---> [Acquires Row Lock]
Tx 2: SELECT seat FROM flights FOR UPDATE; ---> [BLOCKS in Lock Manager Wait Queue]
Tx 1: UPDATE flights SET booked = TRUE; COMMIT; -> [Releases Row Lock]
Tx 2: [Unblocks] -> Reads seat is already booked -> Aborts safely.

Optimistic Concurrency Control (OCC):
Tx 1: Reads seat version = 5
Tx 2: Reads seat version = 5
Tx 1: UPDATE ... WHERE version = 5; (Rows affected: 1) -> SUCCESS (version becomes 6)
Tx 2: UPDATE ... WHERE version = 5; (Rows affected: 0) -> ABORT & RETRY`,
  },
  {
    id: "cn-url-lifecycle",
    question: "Explain the complete lifecycle of entering a URL into a browser address bar until the first content renders on screen.",
    subject: "Computer Networks",
    subjectId: "cn",
    difficulty: "Medium",
    frequencyScore: 98,
    companies: ["Google", "Meta", "Amazon", "Stripe", "Apple"],
    firstPrinciplesAnswer: {
      summary:
        "The browser parses the URL, performs hierarchical DNS resolution to map the domain to an IP address, initiates an OS socket to establish a TCP 3-way handshake, negotiates TLS 1.3 encryption, dispatches an HTTP/2 GET request, receives the payload stream, and executes the critical rendering path (DOM -> CSSOM -> Render Tree -> Layout -> GPU Paint).",
      keyPoints: [
        "1. URL Parsing & HSTS: The browser parses the protocol, domain, and path. It checks the HSTS (HTTP Strict Transport Security) list to enforce HTTPS without redirect delays.",
        "2. DNS Resolution: Browser cache -> OS resolver cache -> local router -> recursive DNS resolver (e.g. 1.1.1.1). The recursive resolver queries Root server (for .org) -> TLD server -> Authoritative Nameserver, returning an A/AAAA record (IP address).",
        "3. TCP Handshake: OS network stack sends SYN packet to target IP on port 443. Server replies with SYN-ACK; client sends ACK, completing the 3-way handshake (1 RTT).",
        "4. TLS 1.3 Handshake: Client sends ClientHello with supported ciphers and ECDHE public key share. Server replies with ServerHello, certificate, and its key share. Both derive symmetric encryption keys in 1 RTT.",
        "5. HTTP/2 Transmission: The browser sends a binary HEADERS frame with compressed headers (HPACK). Server routes request through reverse proxy -> web server -> database, streaming back HTTP 200 with HTML chunks.",
        "6. Critical Rendering Path: HTML parser builds Document Object Model (DOM). CSS parser builds CSSOM. Together they form the Render Tree. The engine calculates geometry (Layout/Reflow) and issues raster calls to the GPU compositor (Paint).",
      ],
      technicalDetail:
        "Modern TLS 1.3 combines key exchange with cipher negotiation, reducing connection setup from 2 RTTs (in TLS 1.2) to 1 RTT. If TLS 1.3 session resumption (0-RTT) is enabled, early data can be sent immediately with ClientHello.",
    },
    interviewerSignals: [
      "Understands the multi-step DNS resolution hierarchy instead of saying 'browser asks DNS for the page'.",
      "Explicitly covers the transport layer (TCP 3-way handshake) and cryptographic layer (TLS 1.3).",
      "Mentions HTTP/2 binary framing and multiplexing over a single connection.",
      "Describes the browser rendering engine pipeline (DOM, CSSOM, Render Tree, Layout, Paint).",
    ],
    redFlagsToAvoid: [
      "Stating DNS returns the web page content.",
      "Omitting TLS when the prompt specifies an HTTPS URL.",
      "Stopping at the network packet arrival without explaining browser parsing and layout.",
    ],
    followUpQuestions: [
      "What happens if the authoritative nameserver IP is an anycast address?",
      "How does HTTP/2 multiplexing eliminate application head-of-line blocking, and why can layer-4 TCP head-of-line blocking still occur?",
      "How does QUIC (HTTP/3) over UDP eliminate transport head-of-line blocking?",
    ],
    asciiDiagram: `[User hits Enter]
  |
  +--> 1. DNS: Browser -> Resolver -> Root -> TLD -> Authoritative (Returns IP: 198.51.100.42)
  |
  +--> 2. TCP 3-Way Handshake: SYN -> SYN-ACK -> ACK (1 RTT)
  |
  +--> 3. TLS 1.3 Handshake: ClientHello + Key Share <-> ServerHello + Cert (1 RTT)
  |
  +--> 4. HTTP/2 GET Request: HEADERS frame (Stream 1) -> Response 200 OK
  |
  +--> 5. Browser Engine: HTML -> DOM  \\
                          CSS  -> CSSOM -+-> Render Tree -> Layout (Reflow) -> GPU Paint`,
  },
  {
    id: "cn-tcp-handshake",
    question: "Why does TCP require a 3-Way Handshake instead of a 2-Way Handshake, and how does it prevent delayed duplicate connections?",
    subject: "Computer Networks",
    subjectId: "cn",
    difficulty: "Medium",
    frequencyScore: 94,
    companies: ["Cisco", "Cloudflare", "Netflix", "Google", "Amazon"],
    firstPrinciplesAnswer: {
      summary:
        "TCP provides full-duplex, reliable byte streams over an unreliable network. Both client and server must reliably establish and synchronize their respective Initial Sequence Numbers (ISNs) and confirm bidirectional communication. A 2-way handshake fails because delayed duplicate SYN packets roaming in the network would cause the server to allocate resources and open phantom connections without client confirmation.",
      keyPoints: [
        "1. Bidirectional Sequence Synchronization: TCP is full-duplex. Client sends its initial sequence number X in SYN. Server acknowledges receipt (ACK = X + 1) and proposes its own initial sequence number Y (SYN). Client must acknowledge Y (ACK = Y + 1) so the server knows the client can hear it.",
        "2. The Delayed Duplicate Hazard: Imagine client sends SYN (Seq = X), which gets delayed in a congested router. Client times out and opens another connection. Later, the old duplicate SYN arrives at the server. Under a 2-way handshake, the server would send ACK and assume the connection is OPEN, allocating memory buffers for a dead client. With a 3-way handshake, the server waits for ACK from the client. The client, seeing an unexpected SYN-ACK, issues a RST (Reset) packet.",
        "3. Random Initial Sequence Numbers (ISNs): ISNs are not set to 0. RFC 6528 uses a time-dependent pseudorandom function to prevent collision with late-arriving segments from prior incarnations of the same 4-tuple (SrcIP, SrcPort, DstIP, DstPort) and to prevent TCP sequence prediction attacks.",
        "4. SYN Flood Defense (SYN Cookies): Malicious clients can send thousands of SYN packets and never send the 3rd ACK, exhausting the server's Transmission Control Block (TCB) memory. Servers mitigate this using SYN Cookies, encoding connection state into the server's ISN without allocating memory until the valid 3rd ACK arrives.",
      ],
      technicalDetail:
        "TCP Fast Open (TFO) allows clients that have previously connected to include data in the initial SYN packet using a cryptographic cookie, saving 1 RTT for subsequent connections without reintroducing duplicate packet hazards.",
    },
    interviewerSignals: [
      "Clearly articulates the delayed duplicate SYN packet scenario that breaks 2-way handshakes.",
      "Explains that full-duplex transmission requires independent sequence number synchronization in both directions.",
      "Mentions SYN Cookies as a defense against half-open connection table exhaustion.",
      "Explains why Initial Sequence Numbers are randomized rather than initialized to 0.",
    ],
    redFlagsToAvoid: [
      "Saying '3 is just more secure than 2' without mathematical justification of network loss and duplicate packet arrival.",
      "Believing data payload cannot be sent until several round trips after the handshake.",
    ],
    followUpQuestions: [
      "Why does connection termination require 4 packets (4-way handshake) instead of 3?",
      "What is the purpose of the 2MSL TIME_WAIT state on the initiating endpoint?",
      "What is the difference between TCP flow control (rwnd) and TCP congestion control (cwnd)?",
    ],
    asciiDiagram: `Client                                            Server
  |                                                  |
  |--- 1. SYN (Seq = X) ---------------------------->| (Client State: SYN_SENT)
  |                                                  | (Server State: SYN_RCVD, verifies Client -> Server)
  |                                                  |
  |<-- 2. SYN (Seq = Y), ACK = X + 1 ----------------| (Client State: ESTABLISHED, verifies Server -> Client)
  |                                                  |
  |--- 3. ACK = Y + 1 ------------------------------>| (Server State: ESTABLISHED, verifies Client is alive)
  |                                                  |
[Connection Active: Full-Duplex Ordered Byte Stream]`,
  },
  {
    id: "oop-dynamic-dispatch-vtable",
    question: "How does the runtime execute a polymorphic method call on an interface or abstract base class, and what is the runtime overhead compared to a direct function call?",
    subject: "Object-Oriented Programming",
    subjectId: "oop",
    difficulty: "Hard",
    frequencyScore: 89,
    companies: ["Microsoft", "Adobe", "Apple", "Electronic Arts", "Epic Games"],
    firstPrinciplesAnswer: {
      summary:
        "In compiled object-oriented languages like C++, runtime polymorphism is implemented using Virtual Method Tables (vtables). Every class containing virtual functions has a static vtable containing function pointers. Every object instance has an implicit pointer (*vptr) at offset 0 pointing to its class's vtable. A polymorphic call resolves via double pointer indirection (`*(object->vptr[slot])(object, args)`), which incurs latency and prevents compiler inlining.",
      keyPoints: [
        "1. Static vs Dynamic Dispatch: Non-virtual function calls use static dispatch: the compiler emits a direct `call <function_symbol>` instruction whose target address is resolved at compile or link time. Virtual calls use dynamic dispatch: the target address is resolved at runtime via the object's runtime type.",
        "2. Memory Layout of Object: When a class defines virtual methods, the compiler adds a pointer field (`vptr`, 8 bytes on 64-bit systems) to the object's memory layout, typically at byte offset 0.",
        "3. Execution Trace: When executing `shape->draw()`: (1) Dereference `shape` to find `vptr`, (2) Index into the vtable at the fixed slot for `draw()` (e.g. `vptr[2]`), (3) Execute indirect call instruction to the retrieved function pointer.",
        "4. Performance Penalties: (a) Memory footprint: +8 bytes per object and static vtable per class. (b) Pointer indirection: extra memory load. (c) Branch Prediction: indirect calls are harder for the CPU Branch Target Buffer (BTB) to predict. (d) Inlining prevention: compilers cannot inline virtual calls without whole-program devirtualization analysis.",
      ],
      technicalDetail:
        "In Java, JVM Just-In-Time (JIT) compilers use Monomorphic Inline Caching. If profiling shows that 99% of calls at a call site invoke the exact same concrete class, the JIT emits a direct comparison followed by an inlined direct call, falling back to vtable/itable lookup only if the class changes.",
    },
    interviewerSignals: [
      "Accurately diagrams object memory layout containing the implicit `vptr`.",
      "Explains that function inlining prevention is often a much bigger performance cost than the single pointer dereference itself.",
      "Distinguishes between C++ single-inheritance vtables and Java interface dispatch (`itable`).",
      "Mentions JIT devirtualization or inline caching as compiler mitigation techniques.",
    ],
    redFlagsToAvoid: [
      "Thinking polymorphism has zero runtime cost.",
      "Confusing compile-time function overloading (name mangling) with runtime overriding (vtable dispatch).",
    ],
    followUpQuestions: [
      "What is the Curiously Recurring Template Pattern (CRTP) in C++, and how does it achieve static polymorphism without vtables?",
      "What happens during object slicing when a derived class object is assigned by value to a base class variable?",
      "Why should a base class destructor always be declared virtual?",
    ],
    asciiDiagram: `Object Instance in Memory (Heap/Stack):
+-----------------------------------+
| *vptr (8 bytes)                   | -------> [Vtable in Read-Only Data Segment (.rodata)]
+-----------------------------------+          | Slot 0: &Circle::~Circle() (Destructor)
| field: radius (8 bytes)           |          | Slot 1: &Circle::draw()
+-----------------------------------+          | Slot 2: &Circle::area()
| field: color (4 bytes) + 4 pad    |
+-----------------------------------+

Assembly Call for shape->draw():
mov rax, [rdi]        ; rax = object->vptr
call [rax + 8]        ; call function pointer at slot 1`,
  },
  {
    id: "oop-solid-liskov-substitution",
    question: "Explain the Liskov Substitution Principle with a concrete engineering example where inheritance fails, and why composition is preferred over inheritance.",
    subject: "Object-Oriented Programming",
    subjectId: "oop",
    difficulty: "Medium",
    frequencyScore: 92,
    companies: ["Amazon", "Salesforce", "Target", "Capital One", "Uber"],
    firstPrinciplesAnswer: {
      summary:
        "The Liskov Substitution Principle (LSP) states that objects of a superclass should be replaceable with objects of a subclass without altering the correctness or invariant guarantees of the program. Inheritance fails when a subclass weakens preconditions or strengthens postconditions. The classic Square-extends-Rectangle example demonstrates how an intuitive mathematical 'is-a' relationship breaks behavioral subtyping, proving why composition should be preferred.",
      keyPoints: [
        "1. Formal Rule: If S is a subtype of T, any property provable about objects of T should also hold for objects of S. Subtypes must honor the behavioral contract of the supertype.",
        "2. The Square / Rectangle Failure: A Rectangle class has `setWidth(w)` and `setHeight(h)`. Mathematically, a Square is a rectangle. If `Square extends Rectangle`, its `setWidth(w)` must also set height to maintain squareness (`width == height`).",
        "3. Broken Invariant in Client Code: Consider a function `resize(Rectangle r) { r.setWidth(5); r.setHeight(10); assert(r.getArea() == 50); }`. If passed a `Square`, setting height to 10 also changes width to 10, resulting in area = 100 and failing the assertion. Square cannot safely substitute Rectangle.",
        "4. The Fragile Base Class Problem: Deep inheritance hierarchies couple subclasses to internal base class implementation details. Modifying a base class method can silently break invariants in subclasses across the codebase.",
        "5. Composition Solution: Instead of inheritance ('is-a'), favor composition ('has-a'). A class holds a reference to an interface and delegates responsibilities, enabling independent evolution and testing without shared mutable state.",
      ],
      technicalDetail:
        "In terms of Design by Contract (Bertrand Meyer), a subtype method may not require more (preconditions cannot be strengthened) and may not deliver less (postconditions cannot be weakened).",
    },
    interviewerSignals: [
      "Explains that LSP is about behavioral subtyping and contracts, not just method signature matching.",
      "Uses the Rectangle/Square example to show how client code invariants break.",
      "Articulates why mathematical relationships ('a square is a rectangle') do not automatically translate to object-oriented inheritance.",
      "Explains how composition avoids fragile base class coupling.",
    ],
    redFlagsToAvoid: [
      "Defining LSP only as 'subclasses can override methods' without discussing contract preservation.",
      "Advocating throwing `NotSupportedException` in overridden methods as an acceptable substitution.",
    ],
    followUpQuestions: [
      "How does the Interface Segregation Principle (ISP) prevent LSP violations?",
      "What is the Open-Closed Principle, and how does Strategy pattern help achieve it?",
      "In modern programming languages like Rust or Go, why is classical class inheritance omitted entirely in favor of traits/interfaces and composition?",
    ],
    asciiDiagram: `Flawed Inheritance ('is-a'):
[Rectangle] (Invariant: width and height can vary independently)
    ^
    | (extends) -- VIOLATES BEHAVIORAL CONTRACT!
[Square] (Invariant: width MUST EQUAL height)

Correct Composition ('has-a'):
[Shape2D] (Interface: double getArea())
    ^                    ^
    |                    |
[Rectangle]           [Square]
(fields: w, h)        (field: side)`,
  },
  {
    id: "dsa-dynamic-array-amortized-doubling",
    question: "Why does appending to a dynamic array take amortized O(1) time when capacity doubles geometrically, and what would happen if capacity grew by a fixed constant?",
    subject: "Data Structures & Algorithms",
    subjectId: "dsa",
    difficulty: "Medium",
    frequencyScore: 95,
    companies: ["Google", "Meta", "Amazon", "Microsoft", "Palantir"],
    firstPrinciplesAnswer: {
      summary:
        "A dynamic array allocates a contiguous block of memory. When full, appending an element requires allocating a new memory buffer of double capacity, copying all N existing elements to the new buffer, freeing the old buffer, and inserting the new element. Although this single resize costs O(N) operations, it occurs exponentially less frequently as the array grows, distributing the cost so that N consecutive appends take O(N) total time, or amortized O(1) per append.",
      keyPoints: [
        "1. Contiguous Memory Requirement: Arrays require contiguous memory addresses so index access `A[i]` translates directly to `base_address + i * element_size` in O(1) CPU cycles. Because contiguous memory cannot simply expand in-place if adjacent memory is occupied, reallocation is mandatory.",
        "2. Geometric Doubling Math (Aggregate Method): Starting from capacity 1, resizing occurs at sizes 1, 2, 4, 8, ..., N. The total element copy operations during N appends sum to: 1 + 2 + 4 + 8 + ... + N/2 = N - 1. Total work for N appends = N (new insertions) + (N - 1) (copies) = 2N - 1 = O(N). Average work per append = (2N - 1) / N ≈ 2 = O(1).",
        "3. Accounting (Banker's) Method: Charge 3 tokens per append: 1 token pays for the immediate insertion, 1 token pays for moving this element when the array resizes, and 1 token pays for moving an older element that has already exhausted its token. The credit balance never drops below zero.",
        "4. Failure of Fixed Constant Growth: If capacity grew by a fixed constant K (e.g. +100 elements), an array of size N would trigger N/K resizes. Total copy work: K + 2K + 3K + ... + (N/K)K ≈ K * (N/K)^2 / 2 = O(N^2). Average append cost becomes O(N) instead of O(1), destroying performance.",
      ],
      technicalDetail:
        "Different implementations choose different growth factors: C++ `std::vector` typically uses 2.0 (GCC/Clang) or 1.5 (MSVC). A factor of 1.5 or 1.618 (golden ratio) allows reusing previously freed memory chunks during subsequent reallocations, reducing heap fragmentation.",
    },
    interviewerSignals: [
      "Explains why arrays must be contiguous in memory (O(1) random pointer arithmetic).",
      "Proves amortized complexity mathematically using the geometric series sum formula.",
      "Explains why linear/constant growth degrades performance to O(N) per operation (O(N^2) total).",
      "Mentions memory overhead tradeoffs (50% to 100% unused allocated capacity).",
    ],
    redFlagsToAvoid: [
      "Stating that appending to a dynamic array is strictly O(1) in the worst case (the worst-case single append is O(N)).",
      "Failing to explain the geometric series sum.",
    ],
    followUpQuestions: [
      "Why do some runtimes choose a growth factor of 1.5 instead of 2.0?",
      "How does a dynamic array compare to a linked list in terms of memory overhead and hardware cache lines?",
      "What is the difference between size and capacity?",
    ],
    asciiDiagram: `Geometric Doubling Progression (Capacity: 1 -> 2 -> 4 -> 8):
Appends:
#1: [X]                       (Insert: 1)
#2: [X][X]                    (Resize to 2: Copy 1 + Insert 1)
#3: [X][X][X][ ]              (Resize to 4: Copy 2 + Insert 1)
#4: [X][X][X][X]              (Insert 1)
#5: [X][X][X][X][X][ ][ ][ ]  (Resize to 8: Copy 4 + Insert 1)

Total copies for N = 8: 1 + 2 + 4 = 7 copies. Total inserts = 8.
Total operations = 15 < 2N -> Amortized O(1).`,
  },
  {
    id: "dsa-lru-cache-design",
    question: "How do you design a Least Recently Used (LRU) Cache where both get(key) and put(key, value) operate in strict O(1) time?",
    subject: "Data Structures & Algorithms",
    subjectId: "dsa",
    difficulty: "Medium",
    frequencyScore: 97,
    companies: ["Amazon", "Google", "Meta", "Apple", "Microsoft"],
    firstPrinciplesAnswer: {
      summary:
        "An LRU cache requires two operations in O(1) time: fast key lookup and fast reordering/eviction of elements by recency. A Hash Map alone provides O(1) lookup but cannot track access order. An Array provides order but requires O(N) shifts on eviction. The optimal solution combines a Hash Map with a Doubly Linked List: the hash map maps keys to list node pointers for O(1) access, while the doubly linked list allows O(1) node removal and insertion at the head (Most Recently Used).",
      keyPoints: [
        "1. Hash Map Role: Stores `key -> Node*`. Enables O(1) lookup to find the node in memory without scanning the list.",
        "2. Doubly Linked List Role: Maintains access order. The head node represents Most Recently Used (MRU); the tail node represents Least Recently Used (LRU). Because it is doubly linked, any node can detach itself in O(1) time: `node->prev->next = node->next; node->next->prev = node->prev;`.",
        "3. Sentinel Dummy Nodes: Using dummy `head` and `tail` sentinel nodes avoids edge-case checks for empty lists or updating global pointers when removing the first/last element.",
        "4. get(key) Flow: Look up key in Hash Map. If absent, return -1. If present, extract `Node*`, splice it out of its current list position, insert it directly after the dummy `head` (marking it MRU), and return its value.",
        "5. put(key, value) Flow: If key exists in map, update value and move node to head. If key does not exist: if size == capacity, remove `tail->prev` (the LRU node), erase its key from the hash map, create new node, insert after `head`, and add to map.",
      ],
      technicalDetail:
        "In a concurrent multithreaded environment, wrapping the entire structure in a single mutex creates a bottleneck. Production caches like Caffeine or Redis use striping, lock-free read rings, and batched eviction logs to avoid locking the data structure on every read.",
    },
    interviewerSignals: [
      "Immediately identifies why combining Hash Map + Doubly Linked List solves the conflicting constraints.",
      "Explains why a doubly linked list is necessary instead of a singly linked list (singly linked cannot remove a node in O(1) without reference to previous node).",
      "Uses dummy head/tail sentinel nodes to eliminate null pointer checks.",
      "Stores the key inside the list node so the map entry can be deleted when evicting from the tail.",
    ],
    redFlagsToAvoid: [
      "Using a queue or array for access order (incurs O(N) removal on lookup).",
      "Forgetting to store the key in the linked list node (making it impossible to remove from the hash map on tail eviction).",
    ],
    followUpQuestions: [
      "Why must the linked list node store both key and value instead of value alone?",
      "How would you make this LRU cache thread-safe?",
      "What is the difference between LRU, LFU (Least Frequently Used), and ARC (Adaptive Replacement Cache)?",
    ],
    asciiDiagram: `Hash Map:
[Key: 'user:1'] ---> [Node Pointer: 0x40]
[Key: 'user:2'] ---> [Node Pointer: 0x80]

Doubly Linked List:
[Dummy HEAD] <=====> [Node: user:1 | val: Alice] <=====> [Node: user:2 | val: Bob] <=====> [Dummy TAIL]
  (MRU End)               (Most Recent)                     (Least Recent / Evict)        (LRU End)`,
  },
  {
    id: "sysdesign-url-shortener-100k-writes",
    question: "How would you design a distributed URL Shortener handling 100,000 writes per second without database ID collisions?",
    subject: "System Design",
    subjectId: "sysdesign",
    difficulty: "Hard",
    frequencyScore: 96,
    companies: ["Google", "Meta", "Amazon", "Twitter/X", "Uber"],
    firstPrinciplesAnswer: {
      summary:
        "Handling 100,000 writes/sec requires high write throughput, sub-10ms read redirects, and guaranteed collision-free unique short keys. The optimal architecture uses a distributed range-based ID generator (coordinated by Apache ZooKeeper/etcd) to allocate unique 64-bit integer blocks to app servers, which encode IDs into Base62 strings. State is stored in a partitioned NoSQL key-value store (Cassandra or DynamoDB) and cached in an edge Redis layer.",
      keyPoints: [
        "1. Unique ID Generation Strategy: Hashing MD5/SHA256 of the URL produces long strings that must be truncated to 7 characters, causing hash collisions that require costly database checks (`SELECT ... WHERE short_url = ?`). Instead, assign a monotonically increasing 64-bit integer to each URL. 7 Base62 characters ([a-z, A-Z, 0-9]) can represent 62^7 ≈ 3.5 trillion unique URLs.",
        "2. Distributed Token Range Allocation: Centralized single-database auto-increments become a bottleneck and single point of failure at 100k writes/sec. Instead, use ZooKeeper to dispense non-overlapping ID blocks (e.g. Server 1 gets 1–1,000,000; Server 2 gets 1,000,001–2,000,000). App servers increment locally in memory with zero network coordination for 1 million requests.",
        "3. Storage Engine Choice: High write throughput (100k writes/sec) and simple primary-key lookups (`short_url -> long_url`) make distributed NoSQL stores with LSM-trees (Cassandra or DynamoDB) far superior to relational databases due to sequential append-only writes.",
        "4. Caching & 80/20 Rule: 20% of trending links generate 80% of read traffic. Place Redis clusters with LRU eviction behind the API gateway. Return HTTP 302 (Found) instead of 301 (Moved Permanently) if real-time click telemetry and analytics are required.",
        "5. Edge Rate Limiting: Deploy Token Bucket rate limiters at the edge API gateway to prevent denial-of-service and malicious link harvesting.",
      ],
      technicalDetail:
        "Returning HTTP 301 prompts browsers to cache the redirect permanently, eliminating server load for repeated clicks, but prevents the service from recording click counts. HTTP 302 ensures every request hits the server for accurate analytics.",
    },
    interviewerSignals: [
      "Rejects MD5/SHA256 hash truncation due to collision loops, selecting distributed range ID allocation + Base62.",
      "Performs back-of-the-envelope capacity estimations: 100k writes/sec * 86,400s ≈ 8.64 billion URLs/day ≈ 500 bytes/URL ≈ 4.3 TB/day.",
      "Explains the tradeoff between HTTP 301 (browser-cached) and HTTP 302 (server-mediated for telemetry).",
      "Designs for high-write workloads using LSM-tree append storage instead of B+ Tree in-place page writes.",
    ],
    redFlagsToAvoid: [
      "Using auto-incrementing IDs in a single MySQL instance without sharding (bottleneck at ~5,000 writes/sec).",
      "Generating random 7-character strings and checking the database in a loop until an unused string is found.",
    ],
    followUpQuestions: [
      "How would you handle custom short alias URLs (e.g. `kernelcs.org/my-talk`) without collisions?",
      "How do you implement URL expiration and purge cold expired records efficiently?",
      "What happens if an app server holding an allocated ID block crashes?",
    ],
    asciiDiagram: `[User Request: 100k writes/sec]
        |
[Edge API Gateway + Token Bucket Rate Limiter]
        |
[App Server Fleet] <--- [ZooKeeper / etcd: Dispenses 1M Range Blocks: e.g. 10M - 11M]
  (Encodes ID -> Base62: 10425892 -> "aB3k9")
        |
  +-----+-----+
  |           |
[Redis Cache] (Hot URLs)
  |           |
  +-----+-----+
        | (Cache Miss on Read / Write-Through)
[Distributed NoSQL: Cassandra / DynamoDB] (Partition Key: short_hash)`,
  },
  {
    id: "sysdesign-consistent-hashing",
    question: "How do you distribute cache keys across 100 cache nodes without rehashing all keys when nodes are added or removed?",
    subject: "System Design",
    subjectId: "sysdesign",
    difficulty: "Hard",
    frequencyScore: 93,
    companies: ["Amazon", "Google", "Discord", "Netflix", "Akamai"],
    firstPrinciplesAnswer: {
      summary:
        "Traditional hash partitioning uses `server = hash(key) % N`. When the number of nodes N changes from 100 to 101, almost all keys map to a different server (N / (N + 1) ≈ 99% key migration), triggering a catastrophic cache stampede on the primary database. Consistent Hashing maps both servers and keys onto a circular hash ring [0, 2^32 - 1]. A key is assigned to the first server encountered clockwise. Adding or removing a node only migrates keys belonging to the adjacent node (an average of K / N keys).",
      keyPoints: [
        "1. The Modulo Hashing Failure: In `hash(key) % N`, every time N changes, nearly 100% of keys rehash to different nodes. All cache lookups miss simultaneously, overwhelming downstream databases.",
        "2. The Consistent Hash Ring: Map the hash space [0, 2^32 - 1] to a circle. Hash the server IP/name to place nodes on the ring. Hash the cache key to place keys on the ring. Walk clockwise to find the first node with hash >= key hash.",
        "3. Adding/Removing Nodes: If node C is added between nodes A and B, only keys that previously mapped to B with hash <= C move to C. All other 99 nodes retain their assigned keys unchanged.",
        "4. Non-Uniform Distribution Problem: With only 100 physical nodes on the ring, hashing may cluster nodes unevenly, causing hot spots where one server holds 40% of the keys.",
        "5. Virtual Nodes Solution: Assign each physical node multiple virtual positions on the ring (e.g. 150–200 virtual nodes per server: `Server1#1`, `Server1#2`). This spreads the load uniformly across the keyspace and ensures that when a server fails, its keys are distributed evenly across all remaining servers rather than overloading a single neighbor.",
      ],
      technicalDetail:
        "Looking up the responsible node on the ring is implemented using a binary search (such as `std::upper_bound` or Java `TreeMap.ceilingEntry`) over the sorted list of virtual node hashes, executing in O(log(V * N)) time where V is virtual nodes per server.",
    },
    interviewerSignals: [
      "Explains why standard modulo hashing `hash(key) % N` causes a cache avalanche when scaling.",
      "Diagrams the circular hash ring and clockwise traversal.",
      "Identifies the hotspot problem with physical nodes and explains virtual nodes as the mathematical solution.",
      "Mentions replication strategies (copying keys to the next M distinct physical nodes clockwise).",
    ],
    redFlagsToAvoid: [
      "Explaining standard hash tables instead of distributed consistent hashing rings.",
      "Omitting virtual nodes and assuming physical nodes distribute uniformly by chance.",
    ],
    followUpQuestions: [
      "How does consistent hashing support replication for fault tolerance?",
      "How do distributed systems like Amazon DynamoDB or Apache Cassandra detect network partitions on the ring?",
      "What is the memory and lookup overhead of storing 200 virtual nodes per server for a 1,000-node cluster?",
    ],
    asciiDiagram: `Consistent Hash Ring [0 to 2^32 - 1]:
           Node A (Hash: 0x1000)
             /                \\
     Key 1 (0x2000)             Node C#1 (Virtual: 0xE000)
          |                       |
     Node B (0x5000)            Key 3 (0xD000)
             \\                /
           Node A#1 (Virtual: 0x9000)

Rule: Key traverses clockwise to find first server.
When Node B is removed: Only Key 1 moves to Node A#1. Key 3 is untouched.`,
  },
  {
    id: "git-merge-vs-rebase",
    question: "What is the mathematical difference between git merge and git rebase in the commit DAG, and how does Git compute a 3-way merge base?",
    subject: "Git & Version Control",
    subjectId: "git",
    difficulty: "Medium",
    frequencyScore: 90,
    companies: ["GitHub", "GitLab", "Atlassian", "Google", "Shopify"],
    firstPrinciplesAnswer: {
      summary:
        "Git represents repository history as a content-addressable Directed Acyclic Graph (DAG) of immutable commit objects. A `git merge` creates a new merge commit with two parent pointers, preserving the exact historical topology and branching points. In contrast, `git rebase` replays commits from the current branch onto the tip of another branch by computing diffs and creating brand new commit objects with different parent pointers and new SHA-1 hashes, creating a linear history.",
      keyPoints: [
        "1. Git Commits are Immutable: A commit object's SHA hash is calculated from its tree hash, author, timestamp, commit message, and parent commit hashes. Because a parent hash is embedded in the commit identity, you cannot alter a commit's parent without generating a completely new SHA hash.",
        "2. Three-Way Merge Algorithm: When merging feature into main, Git finds the Lowest Common Ancestor (LCA) in the DAG—the merge base. It compares three trees: (B) Merge Base, (M) Main tip, and (F) Feature tip. If a file changed in F but not M relative to B, Git takes F. If it changed in M but not F, Git takes M. If it changed in both, Git raises a merge conflict.",
        "3. Fast-Forward Merge: If the current branch tip is itself the ancestor of the target branch (no divergent commits exist on main), Git simply moves the branch pointer forward without creating a new commit.",
        "4. Rebase Mechanics: Git identifies all commits on the feature branch since the merge base, saves their patch diffs, resets the feature branch pointer to the target branch tip, and applies each patch sequentially as a new commit with a new SHA.",
        "5. The Golden Rule of Rebasing: Never rebase commits that have been pushed to a public, shared remote repository. Rebasing changes commit hashes, forcing collaborators who branched off old commits into painful merge conflicts and duplicated history.",
      ],
      technicalDetail:
        "If a commit DAG has cross-merges, multiple common ancestors may exist. Git's default `recursive` and modern `ort` (Ostensibly Recursive's Twin) merge strategies handle this by creating a virtual merge base from the recursive merge of all candidate common ancestors.",
    },
    interviewerSignals: [
      "Explains that commits are immutable and that changing a parent fundamentally creates a new SHA hash.",
      "Accurately explains the 3 trees in a 3-way merge: Merge Base (common ancestor), Our Tree, and Their Tree.",
      "Explains why rebasing shared public branches causes divergence for collaborators.",
      "Mentions git reflog as the recovery mechanism when a rebase goes wrong.",
    ],
    redFlagsToAvoid: [
      "Claiming rebase 'moves' commits (commits are immutable; it copies them with new hashes and abandons the old ones).",
      "Thinking git merge only looks at the two branch heads without referencing the common ancestor.",
    ],
    followUpQuestions: [
      "How does Git Reflog preserve commits that are no longer reachable in the commit DAG after an interactive rebase?",
      "What is git cherry-pick, and how does it relate to git rebase?",
      "What is the difference between git reset --soft, git reset --mixed, and git reset --hard?",
    ],
    asciiDiagram: `Merge (Preserves branching topology with 2 parents):
Base(B) ---> C1 ---> C2 (main)
  \\                   \\
   +-------> F1 ---> F2 ---> Merge Commit M (Parents: C2, F2)

Rebase (Replays commits linearly with brand new SHAs):
Base(B) ---> C1 ---> C2 (main) ---> F1' ---> F2' (feature)
  \\
   +-------> F1 ---> F2 (Original commits become dangling, collected by gc)`,
  },
];
