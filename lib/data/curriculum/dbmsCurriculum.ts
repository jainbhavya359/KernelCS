import { CurriculumSubject } from "./types";

export const dbmsCurriculum: CurriculumSubject = {
  id: "dbms",
  name: "Database Management Systems",
  shortName: "DBMS",
  category: "infrastructure",
  description: "Examine relational algebra, normalization anomalies, B+ Tree indexing, query optimization, ACID transaction guarantees, and concurrency control.",
  longDescription: "Learn how relational databases structure persistent data on disk, execute declarative SQL queries with cost-based optimizers, and preserve consistency under concurrent updates.",
  accentColor: "#8B5CF6",
  borderColor: "rgba(139, 92, 246, 0.3)",
  badgeBg: "rgba(139, 92, 246, 0.1)",
  iconName: "Database",
  coreQuestion: "Why is a B+ Tree structured around disk block fanout, and how does MVCC guarantee non-blocking reads during concurrent writes?",
  prerequisites: ["Data Structures (Trees & Hash Maps)", "Basic Operating Systems (Disk I/O & File Systems)", "Discrete Mathematics"],
  learningOutcomes: [
    "Design normalized relational schemas (1NF, 2NF, 3NF, BCNF) eliminating update, insertion, and deletion anomalies.",
    "Formulate complex SQL queries using Common Table Expressions (CTEs), window functions, correlated subqueries, and multi-table joins.",
    "Inspect physical storage engine layouts including slotted pages, buffer pool eviction, and write-ahead logging (WAL).",
    "Analyze B+ Tree indexing performance, clustered vs secondary index lookups, covering indexes, and write amplification.",
    "Diagnose and optimize slow SQL queries using EXPLAIN execution plans and join selection heuristics.",
    "Evaluate transaction isolation levels (Read Committed, Repeatable Read, Serializable) and explain how MVCC avoids read locks."
  ],
  keyMechanisms: [
    "B+ Tree Fanout & Sequential Disk I/O",
    "Slotted Page File Organization",
    "Write-Ahead Logging (WAL) & ARIES Recovery",
    "Multi-Version Concurrency Control (MVCC)",
    "Strict Two-Phase Locking (SS2PL)"
  ],
  modules: [
    {
      id: "dbms-mod-1",
      order: 1,
      title: "Database Fundamentals & Three-Schema Architecture",
      shortDescription: "DBMS vs file systems, data independence, and relational engines.",
      detailedOverview: "Understand why databases exist. Contrast ad-hoc file storage with relational database engines, examine the ANSI/SPARC 3-schema architecture, and study logical and physical data independence.",
      difficulty: "Foundation",
      interviewBenchmark: "Explain the difference between logical and physical data independence with a schema migration example.",
      topics: [
        {
          id: "dbms-t-1-1",
          title: "Database Architecture & Data Independence",
          description: "Physical, conceptual, and external schema levels.",
          difficulty: "Foundation",
          learningObjectives: ["Contrast DBMS with raw file systems", "Explain ANSI-SPARC 3-schema architecture"],
          subtopics: [
            {
              id: "dbms-st-1-1-1",
              title: "DBMS vs File Systems: Integrity, Concurrency & Recovery",
              description: "Why raw files fail for multi-user transactional workloads.",
              difficulty: "Foundation",
              keyTakeaways: [
                "File systems lack native atomicity (crashes leave partial writes), concurrency control (file locks are coarse-grained), and declarative querying.",
                "A DBMS provides schema enforcement, fine-grained row-level locking, automated crash recovery, and query optimization."
              ],
              concepts: ["Data Redundancy", "Data Inconsistency", "Concurrent Access Anomaly", "Data Independence"],
              questions: [
                {
                  id: "dbms-q-1",
                  statement: "Why is storing application records in raw JSON or CSV files unsuitable for concurrent transactional banking applications?",
                  type: "Conceptual",
                  difficulty: "Foundation",
                  explanation: "Because file systems cannot provide row-level atomicity, isolation, or automated crash recovery. If a crash occurs during a write, the file becomes corrupted, and concurrent writes by multiple processes overwrite each other without transactional isolation."
                }
              ]
            }
          ]
        }
      ]
    },
    {
      id: "dbms-mod-2",
      order: 2,
      title: "Relational Model & Relational Algebra",
      shortDescription: "Relations, tuples, integrity constraints, and formal relational operators.",
      detailedOverview: "Master the mathematical foundation of relational databases. Study relations, tuples, primary/foreign key constraints, and formal relational algebra operations (Select, Project, Cartesian Product, Join, Division).",
      difficulty: "Foundation",
      interviewBenchmark: "Translate complex declarative SQL queries into relational algebra expressions and explain operator trees.",
      topics: [
        {
          id: "dbms-t-2-1",
          title: "Relational Algebra Operators",
          description: "Selection (σ), Projection (π), Cross Product (×), Joins (⋈), and Set Operations.",
          difficulty: "Foundation",
          learningObjectives: ["Write relational algebra queries", "Verify foreign key referential integrity"],
          subtopics: [
            {
              id: "dbms-st-2-1-1",
              title: "Fundamental Operators: Selection, Projection & Join",
              description: "How procedural relational algebra forms the basis of declarative SQL optimization.",
              difficulty: "Foundation",
              keyTakeaways: [
                "Selection (σ) filters rows; Projection (π) selects columns; Natural Join (⋈) combines relations based on common attribute equality.",
                "Query optimizers convert SQL into relational algebra trees and apply algebraic equivalence rules (e.g. pushing selections down) to minimize intermediate row counts."
              ],
              concepts: ["Selection (σ)", "Projection (π)", "Natural Join", "Equivalence Rules", "Pushdown Predicates"],
              questions: [
                {
                  id: "dbms-q-2",
                  statement: "Why do SQL query optimizers push Selection (σ) operators down below Join (⋈) operators in relational algebra trees?",
                  type: "Analytical",
                  difficulty: "Intermediate",
                  explanation: "Applying Selection first filters out non-matching rows early, drastically shrinking the size of the intermediate relations being joined, which minimizes CPU comparisons, memory footprint, and disk I/O."
                }
              ]
            }
          ]
        }
      ]
    },
    {
      id: "dbms-mod-3",
      order: 3,
      title: "ER Modeling & Schema Design",
      shortDescription: "Entities, attributes, cardinality, and mapping ER diagrams to SQL tables.",
      detailedOverview: "Learn how to model real-world business domains. Design Entity-Relationship (ER) diagrams with proper cardinality constraints (1:1, 1:N, M:N), weak entities, and map them cleanly to relational DDL schemas.",
      difficulty: "Foundation",
      interviewBenchmark: "Map an M:N relationship with relationship attributes into relational tables with composite foreign keys.",
      topics: [
        {
          id: "dbms-t-3-1",
          title: "Entity-Relationship Modeling & Mapping",
          description: "Cardinality, participation constraints, and junction tables.",
          difficulty: "Foundation",
          learningObjectives: ["Design ER schemas", "Convert M:N relationships into junction tables"],
          subtopics: [
            {
              id: "dbms-st-3-1-1",
              title: "Mapping Many-to-Many (M:N) Relationships",
              description: "Why M:N relationships require an associative junction table with composite keys.",
              difficulty: "Foundation",
              keyTakeaways: [
                "An M:N relationship cannot be represented with foreign keys directly in either entity table without violating 1NF.",
                "It must be resolved into an associative junction table whose primary key is a composite of the foreign keys of both entities."
              ],
              concepts: ["Junction Table", "Composite Key", "Foreign Key Constraints", "Referential Integrity"],
              questions: [
                {
                  id: "dbms-q-3",
                  statement: "In an e-commerce schema with Orders and Products, how is the Many-to-Many relationship structured in SQL tables?",
                  type: "Application",
                  difficulty: "Foundation",
                  explanation: "Create an associative table `order_items` with columns `order_id` (FK referencing orders), `product_id` (FK referencing products), `quantity`, and `unit_price`, with a composite primary key `(order_id, product_id)`."
                }
              ]
            }
          ]
        }
      ]
    },
    {
      id: "dbms-mod-4",
      order: 4,
      title: "Functional Dependencies & Normalization",
      shortDescription: "Anomalies, Armstrong's Axioms, 1NF, 2NF, 3NF, BCNF, and lossless decomposition.",
      detailedOverview: "Master the mathematical theory of database normalization. Identify insertion, update, and deletion anomalies, compute attribute closures, evaluate candidate keys, and decompose schemas into 3NF and BCNF.",
      difficulty: "Intermediate",
      interviewBenchmark: "Given a relation R(A, B, C, D, E) and functional dependencies, find all candidate keys, identify the highest normal form, and perform BCNF decomposition.",
      topics: [
        {
          id: "dbms-t-4-1",
          title: "Functional Dependencies & Attribute Closure",
          description: "Armstrong's axioms and finding minimal cover and candidate keys.",
          difficulty: "Intermediate",
          learningObjectives: ["Compute attribute closure X+", "Determine all candidate keys of a relation"],
          subtopics: [
            {
              id: "dbms-st-4-1-1",
              title: "Attribute Closures & Candidate Key Derivation",
              description: "Using Armstrong's axioms (reflexivity, augmentation, transitivity) to find keys.",
              difficulty: "Intermediate",
              keyTakeaways: [
                "A functional dependency X -> Y means attribute set X uniquely determines Y.",
                "The closure X+ is the set of all attributes functionally determined by X. If X+ contains all attributes of R, X is a superkey; if minimal, a candidate key."
              ],
              concepts: ["Functional Dependency", "Attribute Closure", "Superkey", "Candidate Key", "Armstrong's Axioms"],
              questions: [
                {
                  id: "dbms-q-4",
                  statement: "Given R(A, B, C, D) with FDs: {A -> B, B -> C, C -> D}, find all candidate keys.",
                  type: "Analytical",
                  difficulty: "Intermediate",
                  explanation: "Compute closure of A: A+ = {A, B, C, D}. Since A+ contains all attributes and no proper subset does, A is the unique candidate key."
                }
              ]
            }
          ]
        },
        {
          id: "dbms-t-4-2",
          title: "Normal Forms (1NF through BCNF)",
          description: "Anomalies, partial dependencies (2NF), transitive dependencies (3NF), and BCNF.",
          difficulty: "Intermediate",
          learningObjectives: ["Deconstruct 1NF, 2NF, 3NF, BCNF", "Prove lossless-join decomposition"],
          subtopics: [
            {
              id: "dbms-st-4-2-1",
              title: "3NF vs BCNF & Modification Anomalies",
              description: "Why Boyce-Codd Normal Form is stricter than 3NF and dependency preservation trade-offs.",
              difficulty: "Intermediate",
              keyTakeaways: [
                "1NF requires atomic values. 2NF removes partial dependencies on composite keys. 3NF removes transitive dependencies (X -> Y requires X is superkey OR Y is prime attribute).",
                "BCNF requires that for EVERY non-trivial FD X -> Y, X must be a superkey. BCNF guarantees zero redundancy from FDs, but may not preserve dependencies."
              ],
              concepts: ["1NF", "2NF", "3NF", "BCNF", "Lossless Join", "Dependency Preservation"],
              questions: [
                {
                  id: "dbms-q-5",
                  statement: "What is an update anomaly in an unnormalized table, and how does 3NF eliminate it?",
                  type: "Interview",
                  difficulty: "Intermediate",
                  explanation: "An update anomaly occurs when redundant data is stored across multiple rows (e.g. employee department head duplicated in every employee row). If the department head changes, updating one row but missing another leaves the database in an inconsistent state. 3NF isolates departments into a separate table referenced by foreign key."
                }
              ]
            }
          ]
        }
      ]
    },
    {
      id: "dbms-mod-5",
      order: 5,
      title: "SQL Fundamentals & Relational Querying",
      shortDescription: "DDL, DML, DQL, constraints, aggregation, grouping, and multi-table joins.",
      detailedOverview: "Build complete fluency in SQL. Study query logical execution order (FROM -> WHERE -> GROUP BY -> HAVING -> SELECT -> ORDER BY), join types (INNER, LEFT, RIGHT, FULL OUTER), and integrity constraints.",
      difficulty: "Foundation",
      interviewBenchmark: "Write SQL queries joining multiple tables with aggregation and explain why WHERE cannot filter aggregate functions directly.",
      topics: [
        {
          id: "dbms-t-5-1",
          title: "SQL Clauses & Logical Execution Order",
          description: "Logical query processing pipeline and aggregation rules.",
          difficulty: "Foundation",
          learningObjectives: ["Master logical SQL processing order", "Use GROUP BY with HAVING"],
          subtopics: [
            {
              id: "dbms-st-5-1-1",
              title: "Logical Query Processing Order",
              description: "Why SQL executes in the order: FROM -> WHERE -> GROUP BY -> HAVING -> SELECT -> ORDER BY -> LIMIT.",
              difficulty: "Foundation",
              keyTakeaways: [
                "SQL syntax is written starting with SELECT, but logical processing begins with FROM and WHERE.",
                "Column aliases created in SELECT cannot be used in WHERE because WHERE executes before SELECT evaluates column expressions."
              ],
              concepts: ["Logical Query Order", "WHERE vs HAVING", "GROUP BY", "Aggregate Functions"],
              questions: [
                {
                  id: "dbms-q-6",
                  statement: "Why can you not use an aggregate function like SUM(amount) in a WHERE clause?",
                  type: "Conceptual",
                  difficulty: "Foundation",
                  explanation: "Because WHERE filters individual input rows before grouping occurs. Aggregates like SUM() operate on groups of rows, which are formed during GROUP BY and filtered afterward in HAVING."
                }
              ]
            }
          ]
        }
      ]
    },
    {
      id: "dbms-mod-6",
      order: 6,
      title: "Advanced SQL, Window Functions & CTEs",
      shortDescription: "Common Table Expressions, Window functions, correlated subqueries, and views.",
      detailedOverview: "Master complex analytical SQL. Study Common Table Expressions (WITH / recursive CTEs), window functions (ROW_NUMBER, RANK, DENSE_RANK, LAG/LEAD), correlated subqueries, and materialized views.",
      difficulty: "Intermediate",
      interviewBenchmark: "Write a query finding the top 3 highest-earning employees in each department using DENSE_RANK() and handle ties correctly.",
      topics: [
        {
          id: "dbms-t-6-1",
          title: "Window Functions & Analytical Querying",
          description: "OVER (PARTITION BY ... ORDER BY ...), ranking, and lead/lag operations.",
          difficulty: "Intermediate",
          learningObjectives: ["Use ROW_NUMBER, RANK, and DENSE_RANK", "Write recursive CTEs for hierarchical data"],
          subtopics: [
            {
              id: "dbms-st-6-1-1",
              title: "Window Functions vs GROUP BY",
              description: "Performing calculations across rows while preserving individual row identity.",
              difficulty: "Intermediate",
              keyTakeaways: [
                "GROUP BY collapses multiple rows into a single summary row. Window functions calculate values over a window of rows while retaining individual row records.",
                "DENSE_RANK() does not skip rank numbers after ties (1, 2, 2, 3), whereas RANK() skips (1, 2, 2, 4)."
              ],
              concepts: ["PARTITION BY", "ORDER BY Frame", "DENSE_RANK", "LAG & LEAD", "Running Total"],
              questions: [
                {
                  id: "dbms-q-7",
                  statement: "What is the difference between RANK() and DENSE_RANK() when two rows have equal scores?",
                  type: "Interview",
                  difficulty: "Intermediate",
                  explanation: "RANK() leaves gaps in ranking numbers after duplicate values (e.g. ranks 1, 2, 2, 4). DENSE_RANK() produces consecutive rank numbers without gaps (e.g. ranks 1, 2, 2, 3)."
                }
              ]
            }
          ]
        }
      ]
    },
    {
      id: "dbms-mod-7",
      order: 7,
      title: "Storage Engines & File Organization",
      shortDescription: "Slotted pages, tuple headers, buffer pool management, and dirty page flushing.",
      detailedOverview: "Examine how database engines physically persist rows on disk blocks. Study slotted page architectures, variable-length field offsets, buffer pool frame management, and dirty page flushing heuristics.",
      difficulty: "Intermediate",
      interviewBenchmark: "Diagram a slotted page layout showing slot directory pointers, free space gap, and variable-length tuple offsets.",
      topics: [
        {
          id: "dbms-t-7-1",
          title: "Physical Page Layout & Buffer Pool Management",
          description: "Slotted page architecture and buffer pool eviction policies.",
          difficulty: "Intermediate",
          learningObjectives: ["Diagram slotted page format", "Understand buffer pool clock sweep"],
          subtopics: [
            {
              id: "dbms-st-7-1-1",
              title: "Slotted Page Architecture",
              description: "Why slotted pages use a slot directory growing forward and tuple data growing backward.",
              difficulty: "Intermediate",
              keyTakeaways: [
                "A slotted page header contains a slot directory array growing from the top down; actual tuple data grows from the bottom up.",
                "External references (Record IDs / RIDs) point to `(PageID, SlotNumber)`. Tuples can be moved or compacted within the page without invalidating external index pointers."
              ],
              concepts: ["Slotted Page", "Tuple ID / RID", "Slot Directory", "Page Compaction", "Buffer Pool"],
              questions: [
                {
                  id: "dbms-q-8",
                  statement: "Why do database storage engines use a slotted page format instead of storing rows at fixed byte offsets?",
                  type: "Interview",
                  difficulty: "Intermediate",
                  explanation: "Because variable-length attributes (VARCHAR, JSON, BLOB) make fixed offsets impossible. The slotted page format allows rows of arbitrary length and enables internal defragmentation without changing external row pointer IDs (PageID, SlotID)."
                }
              ]
            }
          ]
        }
      ]
    },
    {
      id: "dbms-mod-8",
      order: 8,
      title: "Indexing & Search Structures (B+ Trees & LSM-Trees)",
      shortDescription: "B+ Tree fanout, node splits/merges, clustered vs secondary indexes, and LSM-Trees.",
      detailedOverview: "Investigate database indexing from the disk hardware perspective. Study B+ Tree high fanout, leaf doubly linked lists, clustered vs secondary index lookups, composite index leftmost prefix rule, and LSM-Trees.",
      difficulty: "Intermediate",
      interviewBenchmark: "Explain why a B+ Tree leaf doubly linked list enables fast range queries, and analyze the write penalty of adding secondary indexes.",
      topics: [
        {
          id: "dbms-t-8-1",
          title: "B+ Tree Index Architecture",
          description: "Node fanout, disk page alignment, search, split, and sequential range scans.",
          difficulty: "Intermediate",
          learningObjectives: ["Calculate B+ tree fanout and height", "Trace node split operations"],
          subtopics: [
            {
              id: "dbms-st-8-1-1",
              title: "B+ Tree Fanout & Sequential Disk I/O",
              description: "Why B+ Trees minimize disk head movements compared to Binary Search Trees.",
              difficulty: "Intermediate",
              keyTakeaways: [
                "A B+ Tree node matches the disk page size (typically 4KB-16KB), fitting hundreds of routing keys per node (fanout 100-1000).",
                "Tree depth stays small (3-4 levels) even for millions of rows. Leaves are linked sequentially for O(log N + K) range scans."
              ],
              concepts: ["B+ Tree", "Fanout", "Page Splits", "Range Queries", "Leaf Linked List"],
              questions: [
                {
                  id: "dbms-q-9",
                  statement: "Why is a B+ Tree vastly superior to a balanced Binary Search Tree (like AVL or Red-Black) for disk-resident database storage?",
                  type: "Interview",
                  difficulty: "Intermediate",
                  explanation: "A binary tree has a fanout of 2, requiring ~20-30 pointer dereferences (random disk reads) to search 1M keys. A B+ Tree node matches disk block size, packing hundreds of keys per node, keeping tree depth at 3-4 and requiring at most 3-4 disk page transfers."
                }
              ]
            },
            {
              id: "dbms-st-8-1-2",
              title: "Clustered vs Secondary Indexes & Covering Indexes",
              description: "Index organization in MySQL InnoDB and PostgreSQL, and index-only scans.",
              difficulty: "Advanced",
              keyTakeaways: [
                "A clustered index stores actual row data directly in its leaf pages (table is sorted by clustered key).",
                "A secondary index leaf contains the secondary key and a pointer to the clustered key/RID, requiring a secondary lookup (double seek) unless the query is satisfied entirely by the index (Covering Index)."
              ],
              concepts: ["Clustered Index", "Secondary Index", "Covering Index", "Index-Only Scan", "Leftmost Prefix Rule"],
              questions: [
                {
                  id: "dbms-q-10",
                  statement: "Given a composite index on (department_id, salary), will the database use this index for a query with `WHERE salary > 50000` without department_id?",
                  type: "Interview",
                  difficulty: "Intermediate",
                  explanation: "Generally no, due to the Leftmost Prefix rule. The B+ Tree is sorted primary by department_id and secondary by salary within each department. A query filtering only on salary cannot jump directly to a single contiguous range in the index."
                }
              ]
            }
          ]
        }
      ]
    },
    {
      id: "dbms-mod-9",
      order: 9,
      title: "Query Processing & Optimization",
      shortDescription: "SQL parser, logical plans, cost-based optimizer, join algorithms, and EXPLAIN plans.",
      detailedOverview: "Follow the execution of an SQL string from raw text to disk I/O. Study query compilation, AST generation, cost-based statistics (histograms), and join algorithms (Nested Loop, Hash Join, Sort-Merge Join).",
      difficulty: "Advanced",
      interviewBenchmark: "Compare Nested Loop Join, Hash Join, and Sort-Merge Join in terms of time complexity, memory footprint, and index requirements.",
      topics: [
        {
          id: "dbms-t-9-1",
          title: "Physical Join Algorithms",
          description: "Nested Loop, Block Nested Loop, Hash Join, and Sort-Merge Join.",
          difficulty: "Advanced",
          learningObjectives: ["Analyze join algorithm computational complexity", "Select optimal join types based on data size"],
          subtopics: [
            {
              id: "dbms-st-9-1-1",
              title: "Nested Loop vs Hash Join vs Sort-Merge Join",
              description: "When each join algorithm is chosen by the query optimizer.",
              difficulty: "Advanced",
              keyTakeaways: [
                "Nested Loop Join is optimal when the outer relation is small and the inner relation has an index on the join key (O(M * log N)).",
                "Hash Join builds an in-memory hash table on the smaller relation and probes it with the larger relation; optimal for large unindexed equijoins (O(M + N)).",
                "Sort-Merge Join sorts both inputs on the join key and merges them; optimal when inputs are already sorted (e.g. from an index) or for range joins."
              ],
              concepts: ["Nested Loop Join", "Hash Join", "Sort-Merge Join", "Cost-Based Optimizer", "EXPLAIN ANALYZE"],
              questions: [
                {
                  id: "dbms-q-11",
                  statement: "Under what conditions would a database optimizer choose a Hash Join over a Nested Loop Join?",
                  type: "Interview",
                  difficulty: "Advanced",
                  explanation: "When joining two large tables on an equality condition where neither table has an index on the join key. A nested loop would require an O(M * N) full scan, whereas a hash join builds an in-memory hash table on the smaller relation and scans the larger relation in O(M + N) time."
                }
              ]
            }
          ]
        }
      ]
    },
    {
      id: "dbms-mod-10",
      order: 10,
      title: "Transactions & ACID Guarantees",
      shortDescription: "Atomicity, consistency, isolation levels, durability, and read anomalies.",
      detailedOverview: "Examine transactional invariants that guarantee correct state under concurrency and failure. Study ACID definitions, read anomalies (Dirty Read, Non-Repeatable Read, Phantom Read), and standard SQL isolation levels.",
      difficulty: "Intermediate",
      interviewBenchmark: "Explain the difference between Repeatable Read and Serializable isolation and give a concrete example of a Phantom Read.",
      topics: [
        {
          id: "dbms-t-10-1",
          title: "ACID Properties & Transaction Anomalies",
          description: "Dirty reads, non-repeatable reads, phantom reads, and write skew.",
          difficulty: "Intermediate",
          learningObjectives: ["Define all 4 ACID properties", "Identify transaction isolation anomalies"],
          subtopics: [
            {
              id: "dbms-st-10-1-1",
              title: "Transaction Isolation Levels & Read Anomalies",
              description: "Read Uncommitted, Read Committed, Repeatable Read, and Serializable.",
              difficulty: "Intermediate",
              keyTakeaways: [
                "Dirty Read: Reading uncommitted data from another transaction.",
                "Non-Repeatable Read: Re-reading the same row within a transaction returns different values because another transaction updated and committed it.",
                "Phantom Read: Re-executing a range query returns newly inserted rows matching the predicate.",
                "Serializable isolation prevents all anomalies, including Write Skew."
              ],
              concepts: ["ACID", "Dirty Read", "Non-Repeatable Read", "Phantom Read", "Write Skew", "Isolation Levels"],
              questions: [
                {
                  id: "dbms-q-12",
                  statement: "What is Write Skew, and why does Snapshot Isolation fail to prevent it while Serializability succeeds?",
                  type: "Interview",
                  difficulty: "Advanced",
                  explanation: "Write skew occurs when two concurrent transactions read overlapping data, verify an invariant (e.g. at least one doctor must be on call), and write to disjoint rows (Doctor A goes off call; Doctor B goes off call simultaneously). Both succeed under Snapshot Isolation because their write sets do not overlap, yet the business invariant is violated."
                }
              ]
            }
          ]
        }
      ]
    },
    {
      id: "dbms-mod-11",
      order: 11,
      title: "Concurrency Control & Lock Protocols",
      shortDescription: "Conflict serializability, Two-Phase Locking (2PL), MVCC, and snapshot isolation.",
      detailedOverview: "Study the mechanisms databases use to interleave transactions correctly. Compare pessimistic locking protocols (Strict 2PL) with optimistic and multi-version concurrency control (MVCC).",
      difficulty: "Advanced",
      interviewBenchmark: "Explain how PostgreSQL or MySQL InnoDB implements MVCC using transaction IDs and undo logs to provide non-blocking reads.",
      topics: [
        {
          id: "dbms-t-11-1",
          title: "Two-Phase Locking & MVCC",
          description: "Shared and exclusive locks, 2PL growing/shrinking phases, and row versioning.",
          difficulty: "Advanced",
          learningObjectives: ["Trace Two-Phase Locking (2PL)", "Understand MVCC snapshot creation"],
          subtopics: [
            {
              id: "dbms-st-11-1-1",
              title: "Multi-Version Concurrency Control (MVCC) Mechanics",
              description: "How MVCC guarantees readers never block writers and writers never block readers.",
              difficulty: "Advanced",
              keyTakeaways: [
                "In MVCC, updating a row does not overwrite it in-place; it creates a new version tagged with the creating transaction ID.",
                "Read transactions see a consistent snapshot of versions committed before their snapshot timestamp, reading without acquiring shared locks."
              ],
              concepts: ["MVCC", "Snapshot Isolation", "Undo Log", "Row Versions", "Garbage Collection / Vacuum"],
              questions: [
                {
                  id: "dbms-q-13",
                  statement: "How does MVCC achieve non-blocking reads during concurrent row updates?",
                  type: "Interview",
                  difficulty: "Advanced",
                  explanation: "When a transaction updates a row, the storage engine appends a new row version while keeping older versions intact in the undo log. Reading transactions inspect the snapshot timestamp and read the older committed version, completely avoiding shared read locks and never blocking on concurrent write locks."
                }
              ]
            }
          ]
        }
      ]
    },
    {
      id: "dbms-mod-12",
      order: 12,
      title: "Database Recovery & Logging (WAL / ARIES)",
      shortDescription: "Write-Ahead Logging, steal/no-steal, force/no-force, and ARIES recovery.",
      detailedOverview: "Understand how database engines guarantee durability (D in ACID) after power failures or operating system crashes. Study the Write-Ahead Logging (WAL) protocol, checkpointing, and the ARIES recovery algorithm.",
      difficulty: "Advanced",
      interviewBenchmark: "Walk through the 3 phases of the ARIES recovery algorithm (Analysis, Redo, Undo) after an unexpected database crash.",
      topics: [
        {
          id: "dbms-t-12-1",
          title: "Write-Ahead Logging & ARIES Protocol",
          description: "Log Sequence Numbers (LSN), dirty page table, and crash recovery.",
          difficulty: "Advanced",
          learningObjectives: ["Explain Write-Ahead Logging rule", "Trace ARIES Analysis, Redo, and Undo phases"],
          subtopics: [
            {
              id: "dbms-st-12-1-1",
              title: "Write-Ahead Logging (WAL) Rule & ARIES Recovery",
              description: "Why log records must hit physical disk before corresponding data pages are flushed.",
              difficulty: "Advanced",
              keyTakeaways: [
                "The WAL rule mandates that log records describing a change must be flushed to non-volatile storage (`fsync`) BEFORE the modified data page is written to disk.",
                "ARIES crash recovery executes 3 phases: (1) Analysis (reconstructs active transactions and dirty pages), (2) Redo (repeats history to restore state), (3) Undo (rolls back uncommitted transactions)."
              ],
              concepts: ["WAL Protocol", "LSN", "fsync()", "ARIES Algorithm", "Checkpointing"],
              questions: [
                {
                  id: "dbms-q-14",
                  statement: "Why does Write-Ahead Logging (WAL) write sequential log records instead of directly updating the table data pages on disk upon commit?",
                  type: "Interview",
                  difficulty: "Advanced",
                  explanation: "Directly writing data pages requires multiple random disk seeks across the database file, which is slow and vulnerable to partial page write corruption during a crash. Writing an append-only WAL record is fast sequential I/O, guaranteeing durability with minimal commit latency."
                }
              ]
            }
          ]
        }
      ]
    },
    {
      id: "dbms-mod-13",
      order: 13,
      title: "Distributed Databases, Replication & Sharding",
      shortDescription: "Primary-replica replication, horizontal sharding, and two-phase commit (2PC).",
      detailedOverview: "Scale databases beyond a single machine. Study primary-replica replication, replication lag, horizontal sharding keys, range vs hash partitioning, and distributed transactions via Two-Phase Commit (2PC).",
      difficulty: "Advanced",
      interviewBenchmark: "Explain how Two-Phase Commit (2PC) guarantees atomic transactions across distributed database shards and analyze its blocking coordinator failure mode.",
      topics: [
        {
          id: "dbms-t-13-1",
          title: "Replication & Sharding Strategies",
          description: "Read replicas, replication lag, sharding keys, and distributed joins.",
          difficulty: "Advanced",
          learningObjectives: ["Evaluate primary-replica replication", "Design horizontal sharding schemes"],
          subtopics: [
            {
              id: "dbms-st-13-1-1",
              title: "Horizontal Sharding & Partition Key Selection",
              description: "Distributing tables across multiple database nodes based on shard keys.",
              difficulty: "Advanced",
              keyTakeaways: [
                "Horizontal sharding partitions rows across multiple distinct database instances based on a shard key.",
                "A poor shard key causes hot-spotting (one node receives 90% of traffic) and requires expensive cross-shard scatter-gather joins."
              ],
              concepts: ["Sharding Key", "Hash Partitioning", "Range Partitioning", "Scatter-Gather Join", "Cross-Shard Transactions"],
              questions: [
                {
                  id: "dbms-q-15",
                  statement: "What is the primary risk of using an auto-incrementing integer or timestamp as a database sharding key?",
                  type: "Interview",
                  difficulty: "Advanced",
                  explanation: "It causes hot spotting. All new write operations cluster onto the single shard responsible for the latest time range or highest integer range, rendering all other shards idle for writes and negating the benefits of horizontal scaling."
                }
              ]
            }
          ]
        }
      ]
    },
    {
      id: "dbms-mod-14",
      order: 14,
      title: "Database Security, Maintenance & Administration",
      shortDescription: "SQL injection mitigation, connection pooling, indexing maintenance, and vacuuming.",
      detailedOverview: "Learn production database engineering and operations. Study parameterized queries to prevent SQL injection, database connection pool sizing (HikariCP), index bloat, and PostgreSQL VACUUM mechanics.",
      difficulty: "Intermediate",
      interviewBenchmark: "Explain why parameterized queries / prepared statements completely prevent SQL injection at the compiler level.",
      topics: [
        {
          id: "dbms-t-14-1",
          title: "Security & Operational Performance",
          description: "Prepared statements, connection pool sizing, and table bloat.",
          difficulty: "Intermediate",
          learningObjectives: ["Defend against SQL injection", "Calculate optimal connection pool size"],
          subtopics: [
            {
              id: "dbms-st-14-1-1",
              title: "SQL Injection Mitigation via Prepared Statements",
              description: "How prepared statements separate query structure from user data.",
              difficulty: "Foundation",
              keyTakeaways: [
                "Prepared statements compile the SQL command into an execution plan first, with parameters treated strictly as literal data values.",
                "No user input can alter the Abstract Syntax Tree (AST) or grammatical structure of the compiled query."
              ],
              concepts: ["SQL Injection", "Prepared Statements", "AST Separation", "Connection Pooling"],
              questions: [
                {
                  id: "dbms-q-16",
                  statement: "Why does string escaping sometimes fail to prevent SQL injection while prepared statements are 100% immune?",
                  type: "Interview",
                  difficulty: "Intermediate",
                  explanation: "String escaping relies on character-by-character pattern matching and can fail due to multi-byte encoding mismatches (e.g. GBK/Big5 character sets). Prepared statements compile the query AST before binding parameters; user inputs are transmitted in a separate binary protocol as pure literal data values, making structural query manipulation impossible."
                }
              ]
            }
          ]
        }
      ]
    }
  ]
};

