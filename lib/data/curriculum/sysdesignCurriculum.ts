import { CurriculumSubject } from "./types";

export const sysdesignCurriculum: CurriculumSubject = {
  id: "sysdesign",
  name: "System Design & Distributed Systems",
  shortName: "System Design",
  category: "infrastructure",
  description: "Design resilient systems handling millions of queries: consistent hashing, CAP theorem, message queues, rate limiters, and distributed consensus.",
  longDescription: "Learn to navigate real engineering tradeoffs: availability vs consistency, latency vs throughput, and horizontal scaling strategies across 10 specialized architecture modules.",
  accentColor: "#38BDF8",
  borderColor: "rgba(56, 189, 248, 0.3)",
  badgeBg: "rgba(56, 189, 248, 0.1)",
  iconName: "Server",
  coreQuestion: "How do you partition data across 100 cache nodes without rehashing everything on node failure?",
  prerequisites: ["Computer Networks (TCP/IP & HTTP)", "Database Management Systems (Indexing & ACID)", "Operating Systems (Concurrency)"],
  learningOutcomes: [
    "Perform quantitative back-of-the-envelope capacity estimations for storage, QPS, and network bandwidth.",
    "Architect multi-tier load-balanced web services using Layer 4 vs Layer 7 routing and reverse proxies.",
    "Formulate caching topologies (Cache-Aside, Write-Through) and mitigate Thundering Herd / Cache Stampede failures.",
    "Design consistent hashing rings with virtual nodes ensuring bounded, uniform key rebalancing upon node joins or failures.",
    "Evaluate distributed trade-offs using the CAP theorem, PACELC, and quorum consensus ($R + W > N$).",
    "Complete end-to-end architectures for realistic engineering systems: URL Shortener, Rate Limiter, Notification System, and Real-Time Chat."
  ],
  keyMechanisms: [
    "Consistent Hash Ring with Virtual Nodes",
    "Raft Distributed Consensus & Log Replication",
    "Token Bucket & Sliding Window Rate Limiting",
    "Quorum Read/Write Consistency (R + W > N)",
    "Distributed Idempotency Keys"
  ],
  modules: [
    {
      id: "sys-mod-1",
      order: 1,
      title: "Distributed Foundations & API Architecture",
      shortDescription: "Client-server model, REST vs gRPC/Protobuf, WebSockets, and stateless services.",
      detailedOverview: "Examine foundational distributed computing principles. Compare synchronous REST (JSON) over HTTP/1.1 with binary gRPC (Protocol Buffers) over HTTP/2 and stateful WebSockets, and learn how stateless services enable effortless horizontal scaling.",
      difficulty: "Foundation",
      interviewBenchmark: "Perform back-of-the-envelope calculations estimating daily storage and write throughput for 50M active users posting 2 photos/day.",
      topics: [
        {
          id: "sys-t-1-1",
          title: "API Protocols & Capacity Estimation",
          description: "REST vs gRPC vs WebSockets and back-of-the-envelope math.",
          difficulty: "Foundation",
          learningObjectives: ["Contrast REST with gRPC", "Perform back-of-the-envelope estimates"],
          subtopics: [
            {
              id: "sys-st-1-1-1",
              title: "Back-of-the-Envelope Capacity Estimations",
              description: "Estimating QPS, storage requirements, and bandwidth.",
              difficulty: "Foundation",
              keyTakeaways: [
                "1 million seconds ≈ 11.5 days; 1 day = 86,400 seconds ≈ 10^5 seconds.",
                "100 million requests/day ≈ 100M / 10^5 s = 1,000 QPS average (peak ~2,000–3,000 QPS).",
                "Storage sizing: 100M writes/day * 500 bytes/write = 50 GB/day ≈ 18 TB/year."
              ],
              concepts: ["QPS Calculation", "Peak vs Average Traffic", "Storage Growth", "Bandwidth Requirements"],
              questions: [
                {
                  id: "sys-q-1",
                  statement: "Calculate the average and peak QPS for a system receiving 86.4 million read requests in a 24-hour day.",
                  type: "Analytical",
                  difficulty: "Foundation",
                  explanation: "A day has 86,400 seconds. Average QPS = 86,400,000 / 86,400 = 1,000 requests/sec. As a standard engineering rule of thumb, peak traffic is estimated at 2x to 3x average traffic, giving 2,000 to 3,000 peak QPS."
                }
              ]
            }
          ]
        }
      ]
    },
    {
      id: "sys-mod-2",
      order: 2,
      title: "Networking, Reverse Proxies & Load Balancing",
      shortDescription: "Layer 4 vs Layer 7 load balancers, SSL termination, and reverse proxies.",
      detailedOverview: "Study traffic ingress and distribution. Compare Layer 4 transport-level load balancers (IP/Port hashing, NVGRE) with Layer 7 application load balancers (URL routing, cookie affinity), SSL termination, and reverse proxies (Nginx, Envoy).",
      difficulty: "Foundation",
      interviewBenchmark: "Explain the technical differences and trade-offs between Layer 4 (Transport) and Layer 7 (Application) load balancing.",
      topics: [
        {
          id: "sys-t-2-1",
          title: "Load Balancing Architecture",
          description: "L4 vs L7 routing algorithms, health checks, and SSL termination.",
          difficulty: "Foundation",
          learningObjectives: ["Compare Layer 4 vs Layer 7 load balancers", "Explain SSL termination benefits"],
          subtopics: [
            {
              id: "sys-st-2-1-1",
              title: "Layer 4 vs Layer 7 Load Balancing",
              description: "Packet forwarding at IP/TCP level versus application payload inspection.",
              difficulty: "Foundation",
              keyTakeaways: [
                "L4 load balancing routes traffic based on IP address and TCP port without decrypting or inspecting application payloads (high packet throughput, low CPU cost).",
                "L7 load balancing terminates TLS and inspects HTTP headers, URLs, and cookies, enabling content-based routing and rate limiting at higher CPU cost."
              ],
              concepts: ["L4 Load Balancer", "L7 Load Balancer", "SSL Termination", "Reverse Proxy"],
              questions: [
                {
                  id: "sys-q-2",
                  statement: "Why would an engineering team place a Layer 4 load balancer in front of multiple Layer 7 load balancers?",
                  type: "Interview",
                  difficulty: "Intermediate",
                  explanation: "To achieve massive horizontal scalability. Layer 4 load balancers execute ultra-fast packet-level NAT forwarding in hardware (millions of packets/sec). They distribute raw traffic across a cluster of Layer 7 load balancers that perform expensive TLS decryption, HTTP header parsing, and intelligent path routing."
                }
              ]
            }
          ]
        }
      ]
    },
    {
      id: "sys-mod-3",
      order: 3,
      title: "Distributed Caching & Eviction Policies",
      shortDescription: "Cache-Aside, Write-Through, Write-Back, Thundering Herd, and Redis.",
      detailedOverview: "Accelerate reads and protect downstream databases. Study caching patterns (Cache-Aside, Read-Through, Write-Through, Write-Back), cache eviction policies (LRU, LFU), and mitigation strategies for Cache Stampede (Thundering Herd) and Cache Penetration.",
      difficulty: "Intermediate",
      interviewBenchmark: "Explain how a Distributed Mutex or Probabilistic Early Expiration mitigates the Thundering Herd (Cache Stampede) problem.",
      topics: [
        {
          id: "sys-t-3-1",
          title: "Caching Topologies & Stampede Mitigation",
          description: "Cache patterns and protecting databases during hot-key expiration.",
          difficulty: "Intermediate",
          learningObjectives: ["Contrast Cache-Aside vs Write-Through", "Mitigate Cache Stampede"],
          subtopics: [
            {
              id: "sys-st-3-1-1",
              title: "Cache Stampede (Thundering Herd) Mitigation",
              description: "What happens when a hot cache key expires and 10,000 concurrent requests hit the database.",
              difficulty: "Intermediate",
              keyTakeaways: [
                "When a high-traffic cache key expires, thousands of concurrent threads experience cache misses simultaneously and query the database in parallel, causing database collapse.",
                "Mitigated by: (1) Distributed Mutex locking (only 1 thread recomputes the key while others wait), (2) Background pre-warming, or (3) Probabilistic early expiration (XFetch algorithm)."
              ],
              concepts: ["Cache-Aside", "Write-Through", "Thundering Herd", "Cache Stampede", "Distributed Lock"],
              questions: [
                {
                  id: "sys-q-3",
                  statement: "What is the difference between Cache Penetration and Cache Breakdown?",
                  type: "Interview",
                  difficulty: "Intermediate",
                  explanation: "Cache Breakdown occurs when a single hot key expires, causing a flood of traffic to hit the database for that key (solved by mutexes). Cache Penetration occurs when queries request non-existent keys that never exist in cache or database, bypassing the cache every time (solved by caching null values or using Bloom Filters)."
                }
              ]
            }
          ]
        }
      ]
    },
    {
      id: "sys-mod-4",
      order: 4,
      title: "Data Partitioning, Sharding & Consistent Hashing",
      shortDescription: "Consistent hash rings, virtual nodes, horizontal database sharding, and rebalancing.",
      detailedOverview: "Master state partitioning across clusters. Learn why modulo hashing `hash(key) % N` causes catastrophic cache invalidation, and master the circular Consistent Hash Ring with virtual nodes to guarantee bounded, uniform rebalancing.",
      difficulty: "Advanced",
      interviewBenchmark: "Design a Consistent Hash Ring with 150 virtual nodes per server and explain what happens when a server node fails.",
      topics: [
        {
          id: "sys-t-4-1",
          title: "Consistent Hashing & Virtual Nodes",
          description: "Circular hash space [0, 2^32 - 1] and mitigating hot spots with virtual nodes.",
          difficulty: "Advanced",
          learningObjectives: ["Diagram Consistent Hash Ring", "Explain virtual nodes for uniform load"],
          subtopics: [
            {
              id: "sys-st-4-1-1",
              title: "Consistent Hash Ring Mechanics",
              description: "Why adding or removing a node migrates only K/N keys.",
              difficulty: "Advanced",
              keyTakeaways: [
                "In modulo hashing `hash(key) % N`, changing N causes ~99% of keys to migrate.",
                "In consistent hashing, keys and servers map to a circle [0, 2^32 - 1]. A key is assigned to the first server clockwise. Adding or removing a server affects only keys belonging to adjacent neighbors.",
                "Virtual nodes (100–200 positions per physical server) ensure uniform distribution and prevent hot-spotting."
              ],
              concepts: ["Consistent Hashing", "Virtual Nodes", "Key Migration", "Hotspot Prevention"],
              questions: [
                {
                  id: "sys-q-4",
                  statement: "Why are virtual nodes mathematically necessary in a production consistent hashing implementation?",
                  type: "Interview",
                  difficulty: "Advanced",
                  explanation: "With only physical nodes, random hash placement causes non-uniform distribution where one node may own 40% of the ring while another owns 5%. Furthermore, when a node fails, all of its keys would dump onto a single neighboring node. Virtual nodes interleave positions, spreading the load evenly across all remaining servers."
                }
              ]
            }
          ]
        }
      ]
    },
    {
      id: "sys-mod-5",
      order: 5,
      title: "Distributed Reliability: CAP Theorem & PACELC",
      shortDescription: "Consistency vs Availability, Network Partitions, and Quorum Consensus (R + W > N).",
      detailedOverview: "Understand fundamental physical boundaries in distributed systems. Deconstruct Brewer's CAP Theorem, the PACELC extension for normal latency trade-offs, and Quorum Consensus mathematics ensuring strong consistency.",
      difficulty: "Advanced",
      interviewBenchmark: "Explain why network partitions cannot be avoided in distributed systems and prove how Quorum Consensus (R + W > N) guarantees reading the latest write.",
      topics: [
        {
          id: "sys-t-5-1",
          title: "CAP Theorem & Quorum Consensus",
          description: "Consistency vs Availability during network partitions, and quorum math.",
          difficulty: "Advanced",
          learningObjectives: ["Analyze CAP theorem trade-offs", "Formulate Quorum Consensus (R + W > N)"],
          subtopics: [
            {
              id: "sys-st-5-1-1",
              title: "Quorum Consensus: R + W > N",
              description: "Pigeonhole principle guaranteeing read-write overlap in distributed replicas.",
              difficulty: "Advanced",
              keyTakeaways: [
                "With N total replicas, a write succeeds if acknowledged by W nodes; a read succeeds if verified by R nodes.",
                "If R + W > N, the read set and write set must overlap by at least one node by the pigeonhole principle, guaranteeing that at least one read node holds the latest version."
              ],
              concepts: ["CAP Theorem", "PACELC", "Quorum Reads/Writes", "Eventual Consistency", "Network Partition"],
              questions: [
                {
                  id: "sys-q-5",
                  statement: "Why is the CAP theorem frequently misunderstood as 'choose any 2 out of 3' (Consistency, Availability, Partition Tolerance)?",
                  type: "Interview",
                  difficulty: "Advanced",
                  explanation: "Because Partition Tolerance (P) is not an optional configuration choice; physical networks inevitably experience packet drops, fiber cuts, and split-brains. Therefore, the real choice is: in the event of a network partition (P), do you choose Consistency (refuse requests to avoid stale data) or Availability (accept requests and return potentially stale data)?"
                }
              ]
            }
          ]
        }
      ]
    },
    {
      id: "sys-mod-6",
      order: 6,
      title: "Asynchronous Messaging & Event-Driven Architecture",
      shortDescription: "Kafka partitioned logs vs RabbitMQ push queues, consumer groups, and backpressure.",
      detailedOverview: "Decouple microservices through asynchronous message brokers. Compare log-based append-only streaming systems (Apache Kafka) with traditional push-based message brokers (RabbitMQ), consumer groups, partition rebalancing, and dead-letter queues.",
      difficulty: "Intermediate",
      interviewBenchmark: "Contrast Apache Kafka's partitioned pull log model with RabbitMQ's push broker queue model in terms of throughput, ordering, and retention.",
      topics: [
        {
          id: "sys-t-6-1",
          title: "Message Brokers & Streaming Architectures",
          description: "Kafka append-only partitions, consumer group offsets, and message deduplication.",
          difficulty: "Intermediate",
          learningObjectives: ["Contrast Kafka with RabbitMQ", "Manage consumer group offset commits"],
          subtopics: [
            {
              id: "sys-st-6-1-1",
              title: "Kafka Partitioned Log Architecture",
              description: "Why append-only sequential disk logs achieve millions of messages per second.",
              difficulty: "Intermediate",
              keyTakeaways: [
                "Kafka topics are divided into partitions; each partition is an immutable, append-only sequential log written via sequential disk I/O.",
                "Consumers pull messages by tracking their offset position, enabling historical message replay, zero broker state tracking per consumer, and horizontal consumer group scaling."
              ],
              concepts: ["Kafka Partitions", "Consumer Groups", "Offset Commits", "At-Least-Once", "Dead Letter Queue"],
              questions: [
                {
                  id: "sys-q-6",
                  statement: "How does Apache Kafka guarantee strict message ordering while still scaling horizontally across multiple consumer servers?",
                  type: "Interview",
                  difficulty: "Intermediate",
                  explanation: "Kafka guarantees strict ordering ONLY within a single partition. Messages with the same partition key (e.g. `user_id`) are always hashed to the same partition. Within a consumer group, each partition is consumed exclusively by a single consumer thread, ensuring sequential, in-order processing."
                }
              ]
            }
          ]
        }
      ]
    },
    {
      id: "sys-mod-7",
      order: 7,
      title: "Distributed Consensus: Raft & Leader Election",
      shortDescription: "The consensus problem, Raft leader election, heartbeats, and log replication.",
      detailedOverview: "Master how distributed nodes agree on a single source of truth without a single point of failure. Study the Raft consensus protocol, randomized election timeouts, split votes, log replication safety invariants, and leader failure recovery.",
      difficulty: "Advanced",
      interviewBenchmark: "Walk through the Raft leader election sequence, explain how randomized timeouts prevent split votes, and describe log commitment invariants.",
      topics: [
        {
          id: "sys-t-7-1",
          title: "Raft Consensus Protocol",
          description: "Leader election, terms, heartbeat RPCs, and log matching property.",
          difficulty: "Advanced",
          learningObjectives: ["Trace Raft leader election", "Explain the Log Matching Property"],
          subtopics: [
            {
              id: "sys-st-7-1-1",
              title: "Raft Leader Election & Term Invariants",
              description: "How randomized election timeouts prevent perpetual split-vote deadlocks.",
              difficulty: "Advanced",
              keyTakeaways: [
                "Nodes start as Followers. If heartbeat timer expires, a node increments term, transitions to Candidate, votes for itself, and broadcasts RequestVote RPCs.",
                "A candidate becomes Leader if it receives votes from a majority (quorom > N/2) of nodes.",
                "Randomized election timeouts (e.g. 150ms–300ms) ensure one follower times out first, avoiding perpetual split votes."
              ],
              concepts: ["Raft Consensus", "Leader Election", "Log Replication", "Heartbeat RPC", "Split Vote"],
              questions: [
                {
                  id: "sys-q-7",
                  statement: "In Raft, why can a follower vote for a candidate ONLY if the candidate's log is at least as up-to-date as its own?",
                  type: "Interview",
                  difficulty: "Advanced",
                  explanation: "To preserve the Leader Completeness property: a newly elected leader must contain all committed log entries from prior terms. By refusing votes to candidates with older logs, Raft guarantees that committed entries are never overwritten or lost."
                }
              ]
            }
          ]
        }
      ]
    },
    {
      id: "sys-mod-8",
      order: 8,
      title: "Rate Limiting, Fault Tolerance & Resiliency",
      shortDescription: "Token Bucket, Leaky Bucket, Circuit Breakers, Exponential Backoff, and Idempotency.",
      detailedOverview: "Design resilient systems that survive overload and downstream dependency failures. Master rate limiting algorithms (Token Bucket, Leaky Bucket, Sliding Window Log), the Circuit Breaker pattern, and Idempotency Keys in payment processing.",
      difficulty: "Intermediate",
      interviewBenchmark: "Design an API rate limiter supporting 10,000 requests per second per customer using Redis and the Token Bucket algorithm.",
      topics: [
        {
          id: "sys-t-8-1",
          title: "Rate Limiting & Resiliency Patterns",
          description: "Token bucket, circuit breakers, and idempotency key architectures.",
          difficulty: "Intermediate",
          learningObjectives: ["Implement Token Bucket rate limiting", "Apply Circuit Breaker pattern with exponential backoff"],
          subtopics: [
            {
              id: "sys-st-8-1-1",
              title: "Token Bucket vs Leaky Bucket Rate Limiting",
              description: "Allowing bursts of traffic vs enforcing smooth constant-rate output.",
              difficulty: "Intermediate",
              keyTakeaways: [
                "Token Bucket adds tokens to a bucket at a fixed rate up to capacity; requests consume tokens. It allows bursts of traffic up to bucket capacity.",
                "Leaky Bucket processes incoming requests at a smooth, constant outflow rate, buffering bursts in a queue and dropping overflow."
              ],
              concepts: ["Token Bucket", "Leaky Bucket", "Sliding Window Counter", "Circuit Breaker", "Idempotency Key"],
              questions: [
                {
                  id: "sys-q-8",
                  statement: "How does an Idempotency Key guarantee that a network timeout during a credit card payment does not result in double charging?",
                  type: "Interview",
                  difficulty: "Intermediate",
                  explanation: "The client generates a unique UUID `Idempotency-Key` and transmits it with the payment request. The payment service checks a database/cache: if the key exists, it returns the previously cached response without re-executing the financial charge. If new, it executes the payment and saves the result under that key atomically."
                }
              ]
            }
          ]
        }
      ]
    },
    {
      id: "sys-mod-9",
      order: 9,
      title: "Distributed Transactions: 2PC vs Saga Pattern",
      shortDescription: "Two-Phase Commit (2PC) blocking coordinator problem vs choreographed Saga pattern.",
      detailedOverview: "Solve consistency across microservice database boundaries. Contrast synchronous Two-Phase Commit (2PC) and its coordinator blocking vulnerability with asynchronous Sagas (Choreography vs Orchestration) and compensating transactions.",
      difficulty: "Advanced",
      interviewBenchmark: "Contrast Two-Phase Commit (2PC) with the Saga pattern for a multi-service order checkout flow.",
      topics: [
        {
          id: "sys-t-9-1",
          title: "Distributed Transaction Coordination",
          description: "2PC prepare/commit phases vs Saga compensating transactions.",
          difficulty: "Advanced",
          learningObjectives: ["Explain 2PC coordinator failure modes", "Design a Saga with compensating transactions"],
          subtopics: [
            {
              id: "sys-st-9-1-1",
              title: "Two-Phase Commit (2PC) vs Saga Pattern",
              description: "Why microservice architectures favor Sagas over 2PC.",
              difficulty: "Advanced",
              keyTakeaways: [
                "2PC holds locks across all participating databases across network round-trips. If the coordinator crashes after Prepare, participants block indefinitely, holding locks.",
                "Sagas execute local transactions sequentially. If Step 3 fails, the Saga triggers compensating transactions (e.g. `refundPayment()`) to semantically undo earlier steps without distributed locks."
              ],
              concepts: ["Two-Phase Commit (2PC)", "Saga Pattern", "Compensating Transaction", "Orchestration vs Choreography"],
              questions: [
                {
                  id: "sys-q-9",
                  statement: "Why is Two-Phase Commit (2PC) rarely used across modern cloud microservices?",
                  type: "Interview",
                  difficulty: "Advanced",
                  explanation: "Because 2PC is a blocking protocol. All participating databases must hold row locks during both prepare and commit phases. A slow network link or coordinator crash stalls all databases, destroying system throughput and availability."
                }
              ]
            }
          ]
        }
      ]
    },
    {
      id: "sys-mod-10",
      order: 10,
      title: "High-Frequency System Design Case Studies",
      shortDescription: "Architectures for URL Shortener, Notification System, Real-Time Chat, and Video Streaming.",
      detailedOverview: "Apply the complete systems engineering toolkit to design real-world products. Structure full designs covering Functional & Non-Functional requirements, capacity estimations, high-level architecture diagrams, data models, bottlenecks, and failure modes.",
      difficulty: "Advanced",
      interviewBenchmark: "Design an end-to-end distributed URL Shortener handling 100,000 writes per second with collision-free unique IDs and sub-10ms redirects.",
      topics: [
        {
          id: "sys-t-10-1",
          title: "Production System Architectures",
          description: "Complete blueprints for URL Shorteners, Chat Systems, and Rate Limiters.",
          difficulty: "Advanced",
          learningObjectives: ["Structure an end-to-end system design interview response", "Identify bottlenecks and single points of failure"],
          subtopics: [
            {
              id: "sys-st-10-1-1",
              title: "Case Study: Distributed URL Shortener (100k Writes/Sec)",
              description: "Range token allocation, Base62 encoding, and LSM-tree key-value storage.",
              difficulty: "Advanced",
              keyTakeaways: [
                "Avoid MD5/SHA256 hash truncation due to collision check overhead. Use centralized Range Token Dispensers (ZooKeeper) dispensing 1M ID blocks to app servers, encoding 64-bit integers to 7-character Base62.",
                "Store in partitioned NoSQL (Cassandra/DynamoDB) with Redis edge caching (20% hot links). Return HTTP 302 for telemetry or HTTP 301 for browser caching."
              ],
              concepts: ["Base62 Encoding", "Range Token Dispenser", "HTTP 301 vs 302", "Cassandra LSM-Tree"],
              questions: [
                {
                  id: "sys-q-10",
                  statement: "In designing a URL Shortener, why is returning HTTP 302 (Found) preferred over HTTP 301 (Moved Permanently) if click analytics are required?",
                  type: "Interview",
                  difficulty: "Intermediate",
                  explanation: "HTTP 301 prompts browsers to cache the redirect locally; subsequent clicks bypass the URL shortener backend entirely, making click tracking impossible. HTTP 302 forces browsers to hit the shortener backend on every click, allowing the service to increment analytics counters before redirecting."
                }
              ]
            }
          ]
        }
      ]
    }
  ]
};

