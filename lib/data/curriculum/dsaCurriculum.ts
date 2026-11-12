import { CurriculumSubject } from "./types";

export const dsaCurriculum: CurriculumSubject = {
  id: "dsa",
  name: "Data Structures & Algorithms",
  shortName: "DSA",
  category: "algorithms",
  description: "Connect abstract data structures to physical memory: contiguous array locality, amortized doubling, hash collisions, tree rotations, and dynamic programming.",
  longDescription: "Learn how data layout in memory and algorithmic decisions govern practical execution speed, cache locality, and asymptotic scaling across 18 specialized modules.",
  accentColor: "#F59E0B",
  borderColor: "rgba(245, 158, 11, 0.3)",
  badgeBg: "rgba(245, 158, 11, 0.1)",
  iconName: "BinaryTree",
  coreQuestion: "Why does array access execute in strict O(1) time while linked list traversal incurs repeated cache misses?",
  prerequisites: ["Programming Fundamentals", "Basic Discrete Mathematics", "Binary & Bitwise Operations"],
  learningOutcomes: [
    "Analyze algorithmic complexity using Big-O, Big-Omega, Big-Theta, Master Theorem, and Amortized Analysis.",
    "Master high-frequency problem-solving patterns: Two Pointers, Sliding Window, Monotonic Stack, and Binary Search on Answer.",
    "Implement balanced binary search trees, binary heaps, tries, disjoint set union (DSU), and segment trees from scratch.",
    "Formulate graph traversal, shortest path (Dijkstra, Bellman-Ford), and topological sorting algorithms with cycle detection.",
    "Deconstruct Dynamic Programming problems across 1D, 2D grid, Knapsack, LIS, Interval, and Tree DP state transitions.",
    "Connect abstract time complexities to physical hardware constraints including CPU cache lines and spatial memory locality."
  ],
  keyMechanisms: [
    "Contiguous Memory Pointer Math: base + index * sizeof(T)",
    "Amortized Resizing Proof via Aggregate & Accounting Methods",
    "Balanced Search Tree Balancing Rotations (AVL & Red-Black)",
    "Hash Collision Resolution: Chaining vs Open Addressing",
    "Dynamic Programming State Space Reduction & Memoization"
  ],
  modules: [
    {
      id: "dsa-mod-1",
      order: 1,
      title: "Complexity Analysis, Mathematics & Amortized Proofs",
      shortDescription: "Asymptotic notation, Master Theorem, and aggregate/accounting amortized analysis.",
      detailedOverview: "Establish mathematical rigor for algorithm evaluation. Master Big-O, Big-Omega, Big-Theta definitions, recursion tree analysis, the Master Theorem, and amortized complexity using aggregate, accounting, and potential methods.",
      difficulty: "Foundation",
      interviewBenchmark: "Prove mathematically why geometric doubling yields amortized O(1) appends while fixed increment allocation yields O(n).",
      topics: [
        {
          id: "dsa-t-1-1",
          title: "Asymptotic Notations & Master Theorem",
          description: "Big-O upper bounds, Big-Omega lower bounds, and divide-and-conquer recurrences.",
          difficulty: "Foundation",
          learningObjectives: ["Differentiate O, Ω, and Θ", "Solve recurrences using Master Theorem"],
          subtopics: [
            {
              id: "dsa-st-1-1-1",
              title: "Asymptotic Bounds (O, Ω, Θ) & Big-O Fallacies",
              description: "Strict mathematical definitions of asymptotic growth rates.",
              difficulty: "Foundation",
              keyTakeaways: [
                "Big-O gives an asymptotic upper bound: f(n) = O(g(n)) if 0 <= f(n) <= c * g(n) for all n >= n0.",
                "Big-Theta gives a tight bound (both upper and lower). Saying QuickSort is O(N log N) is an average-case statement; worst-case is O(N^2)."
              ],
              concepts: ["Big-O", "Big-Omega", "Big-Theta", "Tight Bounds", "Worst-case vs Average-case"],
              questions: [
                {
                  id: "dsa-q-1",
                  statement: "Is it mathematically correct to state that a function running in O(N) time also runs in O(N^2) time?",
                  type: "Conceptual",
                  difficulty: "Foundation",
                  explanation: "Yes, because Big-O is an asymptotic upper bound. A linear function is bounded from above by a quadratic curve. However, it is not a tight bound (Theta)."
                }
              ]
            },
            {
              id: "dsa-st-1-1-2",
              title: "Amortized Analysis: Aggregate & Accounting Methods",
              description: "Proving average cost per operation over a worst-case sequence of operations.",
              difficulty: "Intermediate",
              keyTakeaways: [
                "Amortized analysis guarantees the average performance of each operation in the worst-case sequence, unlike average-case analysis which assumes probability distributions.",
                "For dynamic array doubling: N insertions require N + (1 + 2 + 4 + ... + N/2) = N + (N - 1) ≈ 2N work = O(1) amortized."
              ],
              concepts: ["Aggregate Method", "Accounting / Banker's Method", "Potential Function", "Geometric Series"],
              questions: [
                {
                  id: "dsa-q-2",
                  statement: "Why does allocating +100 elements whenever an array is full degrade append time to O(N) instead of O(1)?",
                  type: "Analytical",
                  difficulty: "Intermediate",
                  explanation: "Because an array of size N will trigger N/100 resizes. Total copy work: 100 + 200 + 300 + ... + (N/100)*100 ≈ (N^2)/(200) = O(N^2) total work, making the average cost per append O(N^2)/N = O(N)."
                }
              ]
            }
          ]
        }
      ]
    },
    {
      id: "dsa-mod-2",
      order: 2,
      title: "Arrays, Strings & Contiguous Memory Locality",
      shortDescription: "Contiguous layout, pointer arithmetic, string representations, and cache lines.",
      detailedOverview: "Examine contiguous data structures from the memory hardware perspective. Study pointer arithmetic, row-major vs column-major array traversal, string immutability, and 64-byte CPU cache line spatial locality.",
      difficulty: "Foundation",
      interviewBenchmark: "Explain why traversing a 2D matrix row-wise runs 10x faster than column-wise on modern x86/ARM processors.",
      topics: [
        {
          id: "dsa-t-2-1",
          title: "Contiguous Memory & Cache Locality",
          description: "Pointer arithmetic, cache lines, and multi-dimensional array memory mapping.",
          difficulty: "Foundation",
          learningObjectives: ["Calculate array element memory addresses", "Optimize 2D traversals for CPU cache lines"],
          subtopics: [
            {
              id: "dsa-st-2-1-1",
              title: "Contiguous Array Addressing & 64-Byte Cache Lines",
              description: "Why arrays provide strict O(1) random access in hardware.",
              difficulty: "Foundation",
              keyTakeaways: [
                "Array random access is calculated by: `address = base_address + index * sizeof(element)`. This executes in a single CPU instruction.",
                "Accessing `array[0]` loads an entire 64-byte cache line into L1 cache, prefetching subsequent elements and yielding 1-cycle reads."
              ],
              concepts: ["Contiguous Memory", "Pointer Arithmetic", "Spatial Locality", "Cache Lines", "Row-Major Order"],
              questions: [
                {
                  id: "dsa-q-3",
                  statement: "Why does accessing an element in an array of 1,000,000 integers take identical time to accessing an element in an array of 10 integers?",
                  type: "Conceptual",
                  difficulty: "Foundation",
                  explanation: "Because the hardware calculates the physical address directly using base offset addition and multiplication by 4 bytes. It does not scan through previous elements, executing in O(1) cycles."
                }
              ]
            }
          ]
        }
      ]
    },
    {
      id: "dsa-mod-3",
      order: 3,
      title: "Searching & Sorting Algorithms",
      shortDescription: "Binary search, Merge sort, Quick sort, Heap sort, Counting sort, and Radix sort.",
      detailedOverview: "Master sorting and searching algorithms. Study comparison-based lower bounds (Omega(N log N)), in-place vs out-of-place sorting, stability, pivot selection in QuickSort, and non-comparison O(N) integer sorts (Counting, Radix).",
      difficulty: "Foundation",
      interviewBenchmark: "Implement in-place QuickSort with 3-way partitioning to handle duplicate elements in O(N) time.",
      topics: [
        {
          id: "dsa-t-3-1",
          title: "Comparison-Based Sorting Algorithms",
          description: "Merge Sort, Quick Sort (Lomuto vs Hoare vs 3-way), and Heap Sort.",
          difficulty: "Intermediate",
          learningObjectives: ["Prove Omega(N log N) sorting lower bound", "Implement 3-way QuickSort"],
          subtopics: [
            {
              id: "dsa-st-3-1-1",
              title: "QuickSort Partitioning & Worst-Case Defenses",
              description: "Hoare partition, randomized pivot selection, and handling duplicate keys.",
              difficulty: "Intermediate",
              keyTakeaways: [
                "QuickSort average time is O(N log N) with low constant factors due to cache-friendly in-place partitioning.",
                "Worst-case O(N^2) occurs on already sorted arrays or duplicate keys with fixed pivot. Mitigated by randomized pivots or Dutch National Flag 3-way partitioning."
              ],
              concepts: ["QuickSort", "Lomuto Partition", "Hoare Partition", "Dutch National Flag", "Stability"],
              questions: [
                {
                  id: "dsa-q-4",
                  statement: "Why is MergeSort preferred over QuickSort for sorting linked lists while QuickSort is preferred for arrays?",
                  type: "Interview",
                  difficulty: "Intermediate",
                  explanation: "Arrays benefit from QuickSort's in-place partitioning and high CPU cache line locality without allocating O(N) auxiliary memory. Linked lists can be merged by rewiring pointers without allocating extra memory, and linked lists cannot perform fast random pivot indexing needed by QuickSort."
                }
              ]
            }
          ]
        }
      ]
    },
    {
      id: "dsa-mod-4",
      order: 4,
      title: "Linked Lists & Pointer Manipulation",
      shortDescription: "Singly, doubly, and circular linked lists, dummy sentinels, and fast/slow pointer cycles.",
      detailedOverview: "Understand node-based data structures. Master pointer manipulation, dummy head sentinels to eliminate null checks, reverse linked list algorithms, and Floyd's Cycle Detection (Fast & Slow Pointers).",
      difficulty: "Foundation",
      interviewBenchmark: "Detect and locate the entry node of a cycle in a linked list in O(N) time and O(1) space using Floyd's Tortoise and Hare.",
      topics: [
        {
          id: "dsa-t-4-1",
          title: "Pointer Mechanics & Cycle Detection",
          description: "Reversal in-place, dummy sentinels, and Floyd's Tortoise and Hare algorithm.",
          difficulty: "Foundation",
          learningObjectives: ["Reverse a linked list iteratively and recursively", "Prove Floyd's cycle detection math"],
          subtopics: [
            {
              id: "dsa-st-4-1-1",
              title: "Floyd's Tortoise & Hare Cycle Detection",
              description: "Detecting cycles and mathematically proving the start node of the loop.",
              difficulty: "Intermediate",
              keyTakeaways: [
                "Slow pointer moves 1 step; fast pointer moves 2 steps. If a cycle exists, they must collide in at most N steps.",
                "After collision, moving slow back to head and advancing both 1 step at a time guarantees collision at the exact start node of the cycle (distance math: L = kC - X)."
              ],
              concepts: ["Fast & Slow Pointers", "Floyd's Algorithm", "Cycle Entry Point", "Dummy Head Sentinel"],
              questions: [
                {
                  id: "dsa-q-5",
                  statement: "Why do sentinel dummy nodes simplify linked list insertions and deletions?",
                  type: "Conceptual",
                  difficulty: "Foundation",
                  explanation: "They eliminate special-case edge handling for operations on the head node or an empty list, allowing uniform pointer manipulation without `if (head == null)` checks."
                }
              ]
            }
          ]
        }
      ]
    },
    {
      id: "dsa-mod-5",
      order: 5,
      title: "Stacks, Queues & Monotonic Structures",
      shortDescription: "LIFO stacks, FIFO queues, circular buffers, monotonic stacks, and monotonic queues.",
      detailedOverview: "Study restricted-access linear data structures. Learn array circular buffers for queues, and master advanced Monotonic Stack and Monotonic Queue patterns for Next Greater Element and Sliding Window Maximum problems.",
      difficulty: "Intermediate",
      interviewBenchmark: "Solve the Largest Rectangle in Histogram problem in O(N) time using a Monotonic Increasing Stack.",
      topics: [
        {
          id: "dsa-t-5-1",
          title: "Monotonic Stacks & Queues",
          description: "Next Greater Element, Trapping Rain Water, and Sliding Window Maximum in O(N).",
          difficulty: "Intermediate",
          learningObjectives: ["Apply Monotonic Stack template", "Solve Sliding Window Maximum with Monotonic Deque"],
          subtopics: [
            {
              id: "dsa-st-5-1-1",
              title: "Monotonic Stack Pattern & Next Greater Element",
              description: "Maintaining elements in monotonic order to eliminate nested loops from O(N^2) to O(N).",
              difficulty: "Intermediate",
              keyTakeaways: [
                "A monotonic stack maintains elements in strictly increasing or decreasing order.",
                "When a new element violates the monotonicity, popping previous elements resolves their 'next greater/smaller' neighbor in O(1) amortized time."
              ],
              concepts: ["Monotonic Stack", "Next Greater Element", "Trapping Rain Water", "Histogram Largest Rectangle"],
              questions: [
                {
                  id: "dsa-q-6",
                  statement: "Why does the Monotonic Stack algorithm run in O(N) total time despite having a nested while loop inside the for loop?",
                  type: "Analytical",
                  difficulty: "Intermediate",
                  explanation: "Because each element in the array is pushed onto the stack exactly once and popped at most once across the entire algorithm. The total number of stack operations is at most 2N, giving strict O(N) time."
                }
              ]
            }
          ]
        }
      ]
    },
    {
      id: "dsa-mod-6",
      order: 6,
      title: "Hashing & Hash Table Collision Resolution",
      shortDescription: "Hash functions, load factor, separate chaining, open addressing, and Robin Hood hashing.",
      detailedOverview: "Deconstruct hash tables. Learn hash function design, load factor thresholds, separate chaining with balanced trees, open addressing (linear probing, quadratic probing, double hashing), and Robin Hood hashing.",
      difficulty: "Intermediate",
      interviewBenchmark: "Design an LRU Cache from scratch with strict O(1) get() and put() using a Hash Map and Doubly Linked List.",
      topics: [
        {
          id: "dsa-t-6-1",
          title: "Hash Tables & Collision Resolution",
          description: "Chaining vs Open Addressing, probe sequences, and load factor rehashing.",
          difficulty: "Intermediate",
          learningObjectives: ["Compare Separate Chaining vs Open Addressing", "Implement O(1) LRU Cache"],
          subtopics: [
            {
              id: "dsa-st-6-1-1",
              title: "Separate Chaining vs Open Addressing Probing",
              description: "Pointer-based chains vs in-place contiguous array probe sequences.",
              difficulty: "Intermediate",
              keyTakeaways: [
                "Separate Chaining stores collisions in linked lists or red-black trees outside the table; load factor can exceed 1.0.",
                "Open Addressing stores all keys directly in the table array using probe sequences; load factor cannot exceed 1.0 (typically rehashes at 0.7).",
                "Open Addressing provides superior CPU cache locality but suffers from clustering."
              ],
              concepts: ["Separate Chaining", "Linear Probing", "Quadratic Probing", "Clustering", "Load Factor Rehashing"],
              questions: [
                {
                  id: "dsa-q-7",
                  statement: "What is primary clustering in open addressing with linear probing, and how does double hashing resolve it?",
                  type: "Interview",
                  difficulty: "Intermediate",
                  explanation: "Primary clustering occurs when occupied slots group into contiguous blocks. Any collision in a cluster extends the block, causing probe lengths to balloon. Double hashing resolves this by computing probe step size using a second independent hash function `step = hash2(key)`, dispersing keys across the table."
                }
              ]
            }
          ]
        }
      ]
    },
    {
      id: "dsa-mod-7",
      order: 7,
      title: "Recursion & Backtracking Algorithms",
      shortDescription: "Call stack recursion trees, state spaces, permutations, combinations, and N-Queens.",
      detailedOverview: "Master recursive problem solving and backtracking. Study recursion tree execution stacks, state restoration templates, pruning branch conditions, and classic problems: N-Queens, Sudoku Solver, Subsets, and Word Search.",
      difficulty: "Intermediate",
      interviewBenchmark: "Solve the N-Queens problem using a backtracking template with bitmasks for O(1) diagonal conflict checks.",
      topics: [
        {
          id: "dsa-t-7-1",
          title: "Backtracking Templates & State Pruning",
          description: "Explore-Choose-Unchoose pattern and branch pruning.",
          difficulty: "Intermediate",
          learningObjectives: ["Master the Backtracking template", "Prune search spaces using bitmasks"],
          subtopics: [
            {
              id: "dsa-st-7-1-1",
              title: "The Backtracking Template: Choose, Explore, Unchoose",
              description: "Systematic state tree exploration with state rollback.",
              difficulty: "Intermediate",
              keyTakeaways: [
                "Backtracking builds solution candidates incrementally and abandons ('backtracks') a candidate as soon as it determines it cannot yield a valid solution.",
                "Always undo state modifications after the recursive call returns to restore invariants for sibling branches."
              ],
              concepts: ["Recursion Tree", "State Restoration", "Branch Pruning", "Permutations vs Combinations"],
              questions: [
                {
                  id: "dsa-q-8",
                  statement: "In combinatorial backtracking, how do you prevent duplicate combinations when the input array contains duplicate values?",
                  type: "Interview",
                  difficulty: "Intermediate",
                  explanation: "Sort the input array first. Inside the iteration loop, skip identical elements at the same recursion depth using `if (i > start && nums[i] == nums[i-1]) continue;`. This ensures only the first occurrence at any position is explored."
                }
              ]
            }
          ]
        }
      ]
    },
    {
      id: "dsa-mod-8",
      order: 8,
      title: "Binary Trees & Hierarchical Traversals",
      shortDescription: "Pre/In/Post-order DFS, Level-Order BFS, diameter, LCA, and Morris traversal.",
      detailedOverview: "Explore hierarchical tree structures. Study recursive and iterative tree traversals (Pre-order, In-order, Post-order), Level-Order BFS with queues, Lowest Common Ancestor (LCA), and space-optimized Morris Traversal using threaded trees.",
      difficulty: "Foundation",
      interviewBenchmark: "Find the Lowest Common Ancestor (LCA) of two nodes in a binary tree in O(N) time and O(H) space.",
      topics: [
        {
          id: "dsa-t-8-1",
          title: "Tree Traversals & Structural Properties",
          description: "Recursive and iterative DFS, level-order BFS, and Lowest Common Ancestor.",
          difficulty: "Foundation",
          learningObjectives: ["Implement iterative DFS with stacks", "Compute tree diameter and LCA"],
          subtopics: [
            {
              id: "dsa-st-8-1-1",
              title: "Morris Traversal: O(1) Auxiliary Space Tree Traversal",
              description: "Using threaded binary trees (predecessor right pointers) to traverse without call stacks.",
              difficulty: "Advanced",
              keyTakeaways: [
                "Standard DFS takes O(H) stack space. Morris traversal temporarily links the in-order predecessor's right child to the current node.",
                "Allows in-order traversal in O(N) time and strictly O(1) auxiliary space, restoring the tree pointers before returning."
              ],
              concepts: ["Morris Traversal", "Threaded Binary Tree", "In-Order Predecessor", "O(1) Space Traversal"],
              questions: [
                {
                  id: "dsa-q-9",
                  statement: "How does Morris Traversal achieve in-order traversal in O(1) auxiliary space without modifying the permanent structure of the tree?",
                  type: "Interview",
                  difficulty: "Advanced",
                  explanation: "By temporarily modifying the right child of the in-order predecessor node to point back to the current root node (creating a return thread). When the algorithm visits the predecessor the second time, it detects the existing thread, breaks it, and moves to the right child, restoring original tree pointers."
                }
              ]
            }
          ]
        }
      ]
    },
    {
      id: "dsa-mod-9",
      order: 9,
      title: "Binary Search Trees & Balanced Trees (AVL & Red-Black)",
      shortDescription: "BST invariants, insertion/deletion, AVL rotations, and Red-Black properties.",
      detailedOverview: "Master ordered tree structures. Learn BST invariant properties, node deletion edge cases (predecessor/successor replacement), AVL height-balancing rotations (LL, RR, LR, RL), and Red-Black tree color-flipping properties.",
      difficulty: "Intermediate",
      interviewBenchmark: "Implement BST node deletion handling 0, 1, and 2 children, and explain the 4 balancing rotations in AVL trees.",
      topics: [
        {
          id: "dsa-t-9-1",
          title: "Balanced Search Tree Rotations",
          description: "AVL balance factors and Red-Black tree coloring rules.",
          difficulty: "Intermediate",
          learningObjectives: ["Perform AVL tree single and double rotations", "Explain Red-Black tree height bounds"],
          subtopics: [
            {
              id: "dsa-st-9-1-1",
              title: "AVL Tree Rotations: Left, Right, and Double Rotations",
              description: "Restoring balance factor |left_height - right_height| <= 1 in O(1) pointer updates.",
              difficulty: "Intermediate",
              keyTakeaways: [
                "Unbalanced insertions require rotations: Left-Left requires a Right rotation; Left-Right requires Left rotation on child then Right rotation on root.",
                "AVL trees are more strictly balanced than Red-Black trees, providing faster lookups but slower insertions/deletions."
              ],
              concepts: ["Balance Factor", "Right Rotation", "Left Rotation", "Red-Black Tree Properties"],
              questions: [
                {
                  id: "dsa-q-10",
                  statement: "Why does the C++ standard library (`std::map`, `std::set`) and Linux CFS use Red-Black trees rather than AVL trees?",
                  type: "Interview",
                  difficulty: "Intermediate",
                  explanation: "Because Red-Black trees allow slightly looser height bounds (max height 2 * log(N+1)), requiring at most 2 rotations on insertion and 3 rotations on deletion. AVL trees are strictly balanced, requiring frequent costly tree rotations during write-heavy workloads."
                }
              ]
            }
          ]
        }
      ]
    },
    {
      id: "dsa-mod-10",
      order: 10,
      title: "Heaps & Priority Queues",
      shortDescription: "Binary heap array representation, heapify in O(N), Top-K, and two-heap median.",
      detailedOverview: "Study complete binary trees stored in contiguous arrays. Master parent/child index math (`2*i + 1`, `2*i + 2`), bubble-up and bubble-down, building a heap in linear O(N) time, and two-heap streaming architectures.",
      difficulty: "Intermediate",
      interviewBenchmark: "Find the running Median from a Data Stream in O(1) findMedian() and O(log N) addNum() using two heaps.",
      topics: [
        {
          id: "dsa-t-10-1",
          title: "Heap Mechanics & Priority Queue Patterns",
          description: "O(N) build-heap proof, Kth largest element, and running median.",
          difficulty: "Intermediate",
          learningObjectives: ["Prove O(N) heapify complexity mathematically", "Implement Two-Heap pattern"],
          subtopics: [
            {
              id: "dsa-st-10-1-1",
              title: "Linear O(N) Heapify Proof",
              description: "Why building a binary heap bottom-up takes O(N) time instead of O(N log N).",
              difficulty: "Intermediate",
              keyTakeaways: [
                "Inserting N elements one by one takes O(N log N). Building a heap bottom-up with `heapify()` takes O(N).",
                "Mathematical proof: Most nodes reside at the bottom where height is 0 (costing 0 shifts). The sum is: $\\sum_{h=0}^{\\log N} \\frac{N}{2^{h+1}} O(h) = O(N)$."
              ],
              concepts: ["Binary Heap", "Heapify", "O(N) Build-Heap", "Two-Heap Pattern"],
              questions: [
                {
                  id: "dsa-q-11",
                  statement: "Why does bottom-up heapify take O(N) time while top-down repeated insertion takes O(N log N)?",
                  type: "Analytical",
                  difficulty: "Intermediate",
                  explanation: "Because in a complete binary tree, roughly 50% of nodes are leaves (height 0) and do 0 work in bottom-up heapify. Only the single root node can travel the full height log(N). Top-down insertion does the most work (log N) on the 50% of leaf nodes, multiplying N/2 * log N = O(N log N)."
                }
              ]
            }
          ]
        }
      ]
    },
    {
      id: "dsa-mod-11",
      order: 11,
      title: "Greedy Algorithms",
      shortDescription: "Greedy choice property, optimal substructure, interval scheduling, and Huffman coding.",
      detailedOverview: "Examine problems where locally optimal choices lead to a globally optimal solution. Study the greedy choice property, exchange arguments, interval scheduling, minimum coin change, and Huffman data compression.",
      difficulty: "Intermediate",
      interviewBenchmark: "Solve the Interval Scheduling Maximization problem and prove optimality using a greedy exchange argument.",
      topics: [
        {
          id: "dsa-t-11-1",
          title: "Greedy Choice Property & Interval Problems",
          description: "Greedy exchange arguments, non-overlapping intervals, and meeting rooms.",
          difficulty: "Intermediate",
          learningObjectives: ["Prove greedy optimality using exchange arguments", "Solve interval merge problems"],
          subtopics: [
            {
              id: "dsa-st-11-1-1",
              title: "Interval Scheduling & Greedy Proofs",
              description: "Sorting intervals by end time to maximize non-overlapping selections.",
              difficulty: "Intermediate",
              keyTakeaways: [
                "Sorting intervals by earliest finish time leaves the maximum possible remaining time for future intervals.",
                "To prove a greedy choice optimal, use an 'exchange argument': show that any hypothetical optimal solution can swap its first element for the greedy choice without degrading quality."
              ],
              concepts: ["Greedy Choice Property", "Optimal Substructure", "Exchange Argument", "Interval Scheduling"],
              questions: [
                {
                  id: "dsa-q-12",
                  statement: "Why does the standard greedy approach for the 0/1 Knapsack problem fail while succeeding for the Fractional Knapsack problem?",
                  type: "Conceptual",
                  difficulty: "Intermediate",
                  explanation: "Fractional Knapsack allows taking partial fractions of items, so sorting by value-to-weight ratio guarantees maximum value density. 0/1 Knapsack forces taking an entire item or nothing; picking the highest ratio item can leave unused weight capacity that cannot be filled, missing superior combinations."
                }
              ]
            }
          ]
        }
      ]
    },
    {
      id: "dsa-mod-12",
      order: 12,
      title: "Binary Search Patterns (Search on Answer Space)",
      shortDescription: "Lower/upper bounds, rotated arrays, and binary search on monotonic answer spaces.",
      detailedOverview: "Extend binary search beyond sorted arrays. Master exact boundary conditions (`low <= high` vs `low < high`), lower bound / upper bound, and binary search on monotonic predicate answer spaces (e.g. Koko Eating Bananas, Capacity to Ship Packages).",
      difficulty: "Intermediate",
      interviewBenchmark: "Solve the 'Capacity to Ship Packages within D Days' problem using Binary Search on the monotonic answer space.",
      topics: [
        {
          id: "dsa-t-12-1",
          title: "Binary Search on Monotonic Answer Spaces",
          description: "Transforming optimization problems into binary decision functions.",
          difficulty: "Intermediate",
          learningObjectives: ["Identify monotonic answer spaces", "Implement clean binary search boundary templates"],
          subtopics: [
            {
              id: "dsa-st-12-1-1",
              title: "Binary Search on Answer Pattern",
              description: "Searching range [min_possible, max_possible] using a monotonic boolean check function `isValid(mid)`.",
              difficulty: "Intermediate",
              keyTakeaways: [
                "Recognize this pattern when the problem asks for: 'minimum X such that condition holds' or 'maximum X that satisfies condition'.",
                "If `isValid(x)` is monotonic (False, False, ..., True, True), binary search finds the exact transition point in O(log(range) * cost_of_check)."
              ],
              concepts: ["Monotonic Predicate", "Search on Answer", "Lower Bound Template", "Koko Eating Bananas"],
              questions: [
                {
                  id: "dsa-q-13",
                  statement: "How do you identify whether an optimization problem can be solved via Binary Search on Answer?",
                  type: "Interview",
                  difficulty: "Intermediate",
                  explanation: "Check for monotonicity: if an answer X is valid, does that guarantee all values greater than X are also valid (or vice-versa)? If the feasibility function `canAchieve(X)` is monotonic, the problem can be solved by binary searching over the numeric range of possible answers."
                }
              ]
            }
          ]
        }
      ]
    },
    {
      id: "dsa-mod-13",
      order: 13,
      title: "Graphs & Graph Algorithms",
      shortDescription: "BFS, DFS, cycle detection, topological sort, Dijkstra, Bellman-Ford, and Floyd-Warshall.",
      detailedOverview: "Master graph representations and algorithms. Study Adjacency Lists vs Matrices, BFS shortest paths in unweighted graphs, DFS cycle detection, Kahn's algorithm for Topological Sort, Dijkstra with min-heaps, Bellman-Ford negative cycle detection, and MSTs (Prim, Kruskal).",
      difficulty: "Intermediate",
      interviewBenchmark: "Detect cycles in a directed graph using both Kahn's algorithm (indegree BFS) and DFS 3-color states.",
      topics: [
        {
          id: "dsa-t-13-1",
          title: "Traversals, Cycle Detection & Topological Sort",
          description: "BFS/DFS, Kahn's algorithm, and directed vs undirected cycle detection.",
          difficulty: "Intermediate",
          learningObjectives: ["Implement Kahn's Topological Sort", "Detect cycles in directed and undirected graphs"],
          subtopics: [
            {
              id: "dsa-st-13-1-1",
              title: "Kahn's Algorithm (BFS Indegree Topological Sort)",
              description: "Queue-based topological sorting and cycle detection in Directed Acyclic Graphs (DAGs).",
              difficulty: "Intermediate",
              keyTakeaways: [
                "Compute indegree for all nodes. Push all nodes with indegree 0 into a BFS queue.",
                "Pop a node, append to result, decrement indegree of neighbors. If a neighbor reaches indegree 0, push to queue.",
                "If result contains fewer than N nodes, the directed graph contains a cycle."
              ],
              concepts: ["Topological Sort", "Indegree", "Kahn's Algorithm", "Directed Cycle Detection"],
              questions: [
                {
                  id: "dsa-q-14",
                  statement: "Why does Dijkstra's algorithm fail to produce correct shortest paths on graphs with negative edge weights?",
                  type: "Interview",
                  difficulty: "Intermediate",
                  explanation: "Dijkstra is greedy: once a node is popped from the min-heap, its shortest path is considered finalized and marked visited. A negative edge encountered later could provide a cheaper path to an already finalized node, which Dijkstra will never re-evaluate. Bellman-Ford must be used instead."
                }
              ]
            }
          ]
        }
      ]
    },
    {
      id: "dsa-mod-14",
      order: 14,
      title: "Dynamic Programming: Foundations to Advanced Patterns",
      shortDescription: "Memoization, tabulation, 1D/2D DP, Knapsack, LIS, Interval DP, and Tree DP.",
      detailedOverview: "Master Dynamic Programming through systematic state reduction. Study overlapping subproblems, optimal substructure, 1D DP, 2D Grid DP, 0/1 Knapsack, Unbounded Knapsack, Longest Increasing Subsequence (LIS in O(N log N)), Interval DP, and Tree DP.",
      difficulty: "Advanced",
      interviewBenchmark: "Solve the Longest Increasing Subsequence (LIS) problem in O(N log N) time using Patience Sorting / Binary Search.",
      topics: [
        {
          id: "dsa-t-14-1",
          title: "DP State Formulations & Knapsack Patterns",
          description: "State definitions, recurrence transitions, and space optimization from O(N) to O(1).",
          difficulty: "Advanced",
          learningObjectives: ["Identify optimal substructure", "Implement 0/1 Knapsack with space optimization"],
          subtopics: [
            {
              id: "dsa-st-14-1-1",
              title: "0/1 Knapsack vs Unbounded Knapsack Patterns",
              description: "Choosing whether items can be used once or infinitely many times.",
              difficulty: "Advanced",
              keyTakeaways: [
                "0/1 Knapsack: `dp[i][w] = max(dp[i-1][w], val[i] + dp[i-1][w - weight[i]])`. Traverses space backward when 1D optimized to prevent reusing the same item.",
                "Unbounded Knapsack: traverses space forward, allowing the current item to be selected multiple times."
              ],
              concepts: ["0/1 Knapsack", "Unbounded Knapsack", "State Space Reduction", "Backward Traversal"],
              questions: [
                {
                  id: "dsa-q-15",
                  statement: "Why must the 1D space-optimized array for 0/1 Knapsack be iterated from capacity W down to 0 instead of 0 up to W?",
                  type: "Interview",
                  difficulty: "Advanced",
                  explanation: "Because `dp[w]` depends on values from the PREVIOUS item iteration `dp[w - weight]`. If we iterated forward, `dp[w - weight]` would already be overwritten with the CURRENT item's result, inadvertently reusing the same item multiple times (turning it into Unbounded Knapsack)."
                }
              ]
            }
          ]
        }
      ]
    },
    {
      id: "dsa-mod-15",
      order: 15,
      title: "Tries & Prefix Trees",
      shortDescription: "Trie nodes, prefix lookups, autocomplete, and bitwise maximum XOR.",
      detailedOverview: "Study prefix tree retrieval structures. Master 26-ary Trie node construction, word insertion, prefix searches, wildcard search with backtracking, and bitwise binary Tries to solve Maximum XOR of Two Numbers in O(N).",
      difficulty: "Intermediate",
      interviewBenchmark: "Implement a Prefix Tree (Trie) supporting insert, search, and startsWith operations in O(L) time where L is word length.",
      topics: [
        {
          id: "dsa-t-15-1",
          title: "Trie Implementations & Bitwise Applications",
          description: "Word dictionaries, prefix autocomplete, and bitwise XOR tries.",
          difficulty: "Intermediate",
          learningObjectives: ["Implement Trie in O(L) time", "Find Maximum XOR pair using Binary Trie"],
          subtopics: [
            {
              id: "dsa-st-15-1-1",
              title: "Prefix Trees & Maximum XOR Binary Tries",
              description: "Using binary bitwise tries to find opposite bits greedily for XOR maximization.",
              difficulty: "Advanced",
              keyTakeaways: [
                "A standard Trie stores character branches for prefix matching in O(word_length) time.",
                "A 0/1 Binary Trie inserts 32-bit integer binary representations. To maximize XOR, query bits greedily from MSB to LSB by picking the opposite bit branch if it exists."
              ],
              concepts: ["Trie", "startsWith", "Bitwise Trie", "Maximum XOR"],
              questions: [
                {
                  id: "dsa-q-16",
                  statement: "Why is a Trie superior to a Hash Set for implementing an autocomplete search query prefix suggestion system?",
                  type: "Interview",
                  difficulty: "Intermediate",
                  explanation: "A Hash Set can only check exact string equality in O(L); finding all words starting with prefix 'app' requires scanning all N keys (O(N * L)). A Trie traverses down the prefix 'app' in O(prefix_length) and immediately has subtree access to all matching completions."
                }
              ]
            }
          ]
        }
      ]
    },
    {
      id: "dsa-mod-16",
      order: 16,
      title: "Disjoint Set Union (DSU / Union-Find)",
      shortDescription: "Union by rank, path compression, connected components, and Kruskal's MST.",
      detailedOverview: "Master partition tracking across disjoint dynamic sets. Study path compression, union by rank/size, almost-constant inverse Ackermann time complexity Alpha(N), Kruskal's Minimum Spanning Tree, and dynamic graph connectivity.",
      difficulty: "Intermediate",
      interviewBenchmark: "Implement DSU with both Path Compression and Union by Rank, and prove why operations execute in nearly O(1) time.",
      topics: [
        {
          id: "dsa-t-16-1",
          title: "Union-Find with Path Compression & Rank",
          description: "Nearly constant time Alpha(N) disjoint set operations and Kruskal's MST.",
          difficulty: "Intermediate",
          learningObjectives: ["Implement Path Compression and Union by Rank", "Run Kruskal's MST algorithm"],
          subtopics: [
            {
              id: "dsa-st-16-1-1",
              title: "Path Compression & Union by Rank Optimization",
              description: "Flattening the tree on every find() call to achieve inverse Ackermann Alpha(N) time.",
              difficulty: "Intermediate",
              keyTakeaways: [
                "Union by Rank attaches the shorter tree beneath the taller tree's root, bounding height to O(log N).",
                "Path Compression makes every node point directly to the representative root during `find()`, flattening the tree so future lookups take strict O(1)."
              ],
              concepts: ["DSU", "Path Compression", "Union by Rank", "Inverse Ackermann", "Kruskal's Algorithm"],
              questions: [
                {
                  id: "dsa-q-17",
                  statement: "What is the time complexity of N Union and Find operations when both Path Compression and Union by Rank are used?",
                  type: "Analytical",
                  difficulty: "Intermediate",
                  explanation: "O(N * Alpha(N)), where Alpha is the Inverse Ackermann function. Because Alpha(N) < 5 for all practical universe inputs (up to 2^65536), DSU operations run in amortized constant O(1) time in practice."
                }
              ]
            }
          ]
        }
      ]
    },
    {
      id: "dsa-mod-17",
      order: 17,
      title: "Advanced Data Structures (Segment Trees & Fenwick)",
      shortDescription: "Segment trees, lazy propagation, Binary Indexed Trees (Fenwick), and range queries.",
      detailedOverview: "Study advanced range query structures. Learn Segment Trees for range minimum/sum queries with O(log N) updates, Lazy Propagation for range updates, and Binary Indexed Trees (Fenwick Trees) for low-overhead prefix sums.",
      difficulty: "Advanced",
      interviewBenchmark: "Implement a Segment Tree with Lazy Propagation supporting range addition and range sum queries in O(log N) time.",
      topics: [
        {
          id: "dsa-t-17-1",
          title: "Range Query Structures",
          description: "Segment Trees, Lazy Propagation, and Binary Indexed Trees.",
          difficulty: "Advanced",
          learningObjectives: ["Build a Segment Tree in O(N)", "Implement Fenwick Tree prefix updates"],
          subtopics: [
            {
              id: "dsa-st-17-1-1",
              title: "Segment Trees with Lazy Propagation",
              description: "Deferring range updates to child nodes until child values are specifically queried.",
              difficulty: "Advanced",
              keyTakeaways: [
                "A standard Segment Tree handles point updates in O(log N). Updating an entire range [L, R] naively costs O(N log N).",
                "Lazy Propagation stores deferred updates in a `lazy` array, applying changes to children only when traversing down, maintaining O(log N) range updates."
              ],
              concepts: ["Segment Tree", "Lazy Propagation", "Fenwick Tree", "Range Sum Query"],
              questions: [
                {
                  id: "dsa-q-18",
                  statement: "When should a software engineer choose a Fenwick Tree (Binary Indexed Tree) over a Segment Tree?",
                  type: "Interview",
                  difficulty: "Advanced",
                  explanation: "Choose a Fenwick Tree when operations are limited to point updates and prefix/range queries on invertible associative operations (like sum or XOR). Fenwick trees use 1x memory (vs 4x for Segment Trees), require fewer lines of code, and have lower constant factors."
                }
              ]
            }
          ]
        }
      ]
    },
    {
      id: "dsa-mod-18",
      order: 18,
      title: "High-Frequency Problem Solving Patterns",
      shortDescription: "Two Pointers, Sliding Window, Prefix Sum, Difference Arrays, and Sweep Line.",
      detailedOverview: "Synthesize problem-solving patterns that appear in Tier-1 technical interviews. Master Two Pointers (converging & fast-slow), Sliding Window (fixed & dynamic), Prefix Sums, Difference Arrays, Sweep Line, and Meet-in-the-Middle.",
      difficulty: "Intermediate",
      interviewBenchmark: "Solve Minimum Window Substring in O(N) time and O(K) space using the Dynamic Sliding Window pattern.",
      topics: [
        {
          id: "dsa-t-18-1",
          title: "Sliding Window & Two Pointer Patterns",
          description: "Fixed vs variable sliding windows and pointer convergence templates.",
          difficulty: "Intermediate",
          learningObjectives: ["Identify Sliding Window preconditions", "Formulate Difference Array range additions"],
          subtopics: [
            {
              id: "dsa-st-18-1-1",
              title: "Dynamic Sliding Window Pattern Template",
              description: "Expanding `right` pointer to achieve validity and shrinking `left` pointer to optimize.",
              difficulty: "Intermediate",
              keyTakeaways: [
                "Recognize Sliding Window when: looking for subarrays or substrings satisfying a condition where adding elements increases monotonic validity.",
                "Expand `right` until valid, then shrink `left` while maintaining validity to find minimal window (or vice versa for maximal window)."
              ],
              concepts: ["Sliding Window", "Two Pointers", "Prefix Sum", "Difference Array", "Sweep Line"],
              questions: [
                {
                  id: "dsa-q-19",
                  statement: "How does a Difference Array allow updating multiple ranges [L, R] with value V in O(1) time per query?",
                  type: "Analytical",
                  difficulty: "Intermediate",
                  explanation: "By defining `diff[i] = A[i] - A[i-1]`. To add V to range [L, R], increment `diff[L] += V` and decrement `diff[R+1] -= V` in O(1) time. After all queries, taking the running prefix sum of `diff` reconstructs the final modified array in a single O(N) pass."
                }
              ]
            }
          ]
        }
      ]
    }
  ]
};

