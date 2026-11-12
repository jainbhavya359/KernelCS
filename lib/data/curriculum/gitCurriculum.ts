import { CurriculumSubject } from "./types";

export const gitCurriculum: CurriculumSubject = {
  id: "git",
  name: "Git & Version Control Internals",
  shortName: "Git Internals",
  category: "architecture-tools",
  description:
    "Master distributed version control through its content-addressable storage model, DAG commit graphs, 3-way merge algorithms, reflog recovery mechanics, and low-level plumbing architecture.",
  longDescription:
    "Git is frequently taught as a confusing collection of arbitrary CLI commands. In reality, Git is an elegant, content-addressable object store overlaid with a Directed Acyclic Graph (DAG) of immutable snapshots. This curriculum deconstructs Git from the filesystem level up: how SHA-1/SHA-256 hashes index zlib-compressed objects in .git/objects, how the index file bridges the working tree and the object store, how the lowest common ancestor (LCA) powers 3-way merges, how interactive rebasing replays commit deltas, and how the reflog enables deterministic disaster recovery.",
  accentColor: "#F97316",
  borderColor: "rgba(249, 115, 22, 0.3)",
  badgeBg: "rgba(249, 115, 22, 0.1)",
  iconName: "GitBranch",
  coreQuestion:
    "Why is Git not a delta-based difference tracker, and how does treating history as an immutable directed acyclic graph of tree snapshots enable atomic operations and distributed divergence reconciliation?",
  prerequisites: [
    "Basic command line proficiency (bash/zsh, filesystem navigation, shell I/O)",
    "Fundamental understanding of cryptographic hashing (SHA-1, collision resistance)",
    "Familiarity with Directed Acyclic Graphs (DAG) and tree data structures",
    "Understanding of file descriptors and filesystem inodes"
  ],
  learningOutcomes: [
    "Explain the content-addressable object database (.git/objects) and parse loose objects directly using zlib decompression.",
    "Differentiate between the Working Tree, the Index (Staging Area), and HEAD, and trace how git add and git commit update each layer.",
    "Compute merge bases using Lowest Common Ancestor (LCA) algorithms and resolve complex 3-way merge conflicts deterministically.",
    "Execute advanced history rewriting with interactive rebase, cherry-pick, and filter-repo without corrupting public history.",
    "Utilize the reference log (reflog) to recover orphaned commits, deleted branches, and catastrophic hard resets.",
    "Understand packfiles, thin packs, delta compression, and git gc optimization routines.",
    "Build arbitrary commits and branches from scratch using only Git plumbing commands (hash-object, write-tree, commit-tree, update-ref)."
  ],
  keyMechanisms: [
    "Content-Addressable Object Database (.git/objects)",
    "The Binary Index Cache (.git/index)",
    "Directed Acyclic Graph (DAG) Commit Lineage",
    "3-Way Merge Base (Lowest Common Ancestor - LCA)",
    "Reference Logs (.git/logs/refs) & Immutability"
  ],
  modules: [
    {
      id: "git-mod-1",
      order: 1,
      title: "VCS Fundamentals & The Directed Acyclic Graph (DAG)",
      shortDescription: "Contrast centralized delta-based architectures with Git's distributed snapshot-based DAG model.",
      detailedOverview: "Contrast centralized delta-based architectures (SVN, Perforce) with Git's distributed snapshot-based DAG model. Explore content addressing, Merkle DAG structures, and cryptographic immutability.",
      difficulty: "Foundation",
      interviewBenchmark: "Explain why Git history is a Merkle DAG and why it is mathematically impossible to introduce a cycle into Git commit history.",
      topics: [
        {
          id: "git-t-1-1",
          title: "Centralized vs. Distributed Version Control",
          description: "Architectural comparison of SVN/Perforce and Git.",
          difficulty: "Foundation",
          learningObjectives: ["Contrast centralized and distributed VCS", "Understand snapshot vs delta storage"],
          subtopics: [
            {
              id: "git-st-1-1-1",
              title: "Snapshot-Based vs. File-Delta Storage Models",
              description: "How Git models history as snapshots rather than diff chains.",
              difficulty: "Foundation",
              keyTakeaways: [
                "SVN stores a baseline file and chains of forward/reverse deltas. Checking out old versions requires walking the delta chain.",
                "Git stores a complete tree snapshot at every commit; unchanged files simply reuse existing SHA-1/SHA-256 blob pointers."
              ],
              concepts: ["Delta Chains", "Tree Snapshots", "Content Deduplication", "Local Clone Parity"],
              questions: [
                {
                  id: "git-q-1",
                  statement: "How does Git's snapshot model differ fundamentally from SVN's delta-based version control model?",
                  type: "Conceptual",
                  difficulty: "Foundation",
                  explanation: "SVN stores an initial file and a progressive sequence of forward or reverse diffs. Git captures a complete filesystem tree snapshot at every commit. Unchanged files are not copied; their parent tree objects reference the identical SHA-1 hash blob in the object database."
                }
              ]
            }
          ]
        },
        {
          id: "git-t-1-2",
          title: "The Directed Acyclic Graph (DAG) Model",
          description: "Formal representation of repository history as an immutable directed acyclic graph.",
          difficulty: "Intermediate",
          learningObjectives: ["Model commits as DAG nodes", "Explain cryptographic immutability"],
          subtopics: [
            {
              id: "git-st-1-2-1",
              title: "Nodes, Directed Edges & Invariant Properties",
              description: "Why commit edges point backwards towards parents.",
              difficulty: "Intermediate",
              keyTakeaways: [
                "Commit edges point backwards in time from children to parents, enabling O(1) parent lookups.",
                "A commit hash is computed from its tree, author, timestamp, and parent commit hashes, making cycles mathematically impossible."
              ],
              concepts: ["Merkle DAG", "Parent Pointers", "Preimage Resistance", "Cryptographic Immutability"],
              questions: [
                {
                  id: "git-q-2",
                  statement: "Why is it mathematically impossible for a Git commit graph to contain a cycle?",
                  type: "Analytical",
                  difficulty: "Intermediate",
                  explanation: "A commit's cryptographic hash is generated from its tree, author, timestamp, message, and its parent commit hashes. A commit must exist before its hash can be used as a parent in a subsequent commit. Creating a cycle would require predicting a future cryptographic hash, violating SHA-1/SHA-256 preimage resistance."
                }
              ]
            }
          ]
        }
      ]
    },
    {
      id: "git-mod-2",
      order: 2,
      title: "Git Object Database Internals",
      shortDescription: "Content-addressable storage: blobs, trees, commits, tags, and zlib loose objects.",
      detailedOverview: "Examine the inner workings of .git/objects. Study the four fundamental object types (blobs, trees, commits, annotated tags), the 2-character fan-out directory structure, and zlib deflate compression.",
      difficulty: "Intermediate",
      interviewBenchmark: "Walk through the byte layout of a Git blob object and explain how git hash-object derives its 40-character hexadecimal SHA-1 hash.",
      topics: [
        {
          id: "git-t-2-1",
          title: "The Four Fundamental Git Objects",
          description: "Blobs, trees, commits, and annotated tags format and encoding.",
          difficulty: "Intermediate",
          learningObjectives: ["Deconstruct blob, tree, commit, and tag headers", "Inspect raw objects using plumbing"],
          subtopics: [
            {
              id: "git-st-2-1-1",
              title: "Blob Objects: Pure Content Without Metadata",
              description: "How Git decouples file contents from filenames and permissions.",
              difficulty: "Intermediate",
              keyTakeaways: [
                "A blob stores only raw bytes preceded by the header: 'blob <size>\\0'.",
                "Filenames and POSIX permissions (100644, 100755) reside exclusively in tree objects, enabling deduplication of identical files across different paths."
              ],
              concepts: ["Blob Header", "Content-Addressable Storage", "SHA-1 Calculation", "Decoupled Filename Metadata"],
              questions: [
                {
                  id: "git-q-3",
                  statement: "Where are a file's name, modification date, and permissions stored in Git's object database?",
                  type: "Interview",
                  difficulty: "Intermediate",
                  explanation: "They are NOT stored in the blob object. The filename and POSIX file mode are stored in the parent tree object. Modification timestamps are kept in the index and working tree, while commit timestamps reside in commit objects."
                }
              ]
            },
            {
              id: "git-st-2-1-2",
              title: "Tree & Commit Objects Layout",
              description: "Serialization format of directory trees and commit context.",
              difficulty: "Intermediate",
              keyTakeaways: [
                "A tree object lists file modes, filenames, and 20-byte binary SHAs for each entry.",
                "A commit object contains pointers to the root tree, parent commit hashes, author/committer identities, Unix timestamps, and the commit message."
              ],
              concepts: ["Tree Serialization", "Root Tree Pointer", "Parent Hashes", "Author vs Committer"],
              questions: [
                {
                  id: "git-q-4",
                  statement: "What is the difference between the author and committer in a Git commit object?",
                  type: "Conceptual",
                  difficulty: "Intermediate",
                  explanation: "The author is the person who originally wrote the code changes. The committer is the person who applied or committed the change (e.g. during a rebase, cherry-pick, or patch application), with their own distinct timestamp."
                }
              ]
            }
          ]
        },
        {
          id: "git-t-2-2",
          title: "Storage Layout in .git/objects",
          description: "Filesystem fan-out, loose objects, and zlib compression.",
          difficulty: "Intermediate",
          learningObjectives: ["Explain 2-character fan-out directory architecture", "Decompress loose objects"],
          subtopics: [
            {
              id: "git-st-2-2-1",
              title: "Fan-Out Directory Architecture & zlib Compression",
              description: "Why Git splits 40-character hashes into a 2-char directory and 38-char filename.",
              difficulty: "Intermediate",
              keyTakeaways: [
                "Splitting 40 hex characters into a 2-character subfolder distributes files across 256 folders, preventing OS directory inode limits from crippling performance.",
                "All loose objects are compressed using zlib deflate and can be decompressed with standard stream tools."
              ],
              concepts: ["256-Way Fan-Out", "Inode Limits", "zlib Deflate", "Loose Objects"],
              questions: [
                {
                  id: "git-q-5",
                  statement: "Why does Git split 40-character SHA-1 hashes into a 2-character directory and a 38-character filename in .git/objects?",
                  type: "Conceptual",
                  difficulty: "Intermediate",
                  explanation: "Operating system filesystems experience significant performance penalties when a single directory contains tens of thousands of files. The 2-character hex prefix distributes objects evenly across 256 subdirectories."
                }
              ]
            }
          ]
        }
      ]
    },
    {
      id: "git-mod-3",
      order: 3,
      title: "The Three Trees: Working Tree, Index & HEAD",
      shortDescription: "The staging area, binary .git/index format, and differential state comparisons.",
      detailedOverview: "Demystify Git's three operational areas: the Working Directory, the Index (Staging Area), and HEAD. Inspect the binary .git/index file format, analyze git add mechanics, and master diff analysis across the three trees.",
      difficulty: "Foundation",
      interviewBenchmark: "Explain the exact binary contents of .git/index and trace what files and objects change when running git add followed by git commit.",
      topics: [
        {
          id: "git-t-3-1",
          title: "The Three Areas and git add Mechanics",
          description: "How files move between Working Tree, Index, and HEAD.",
          difficulty: "Foundation",
          learningObjectives: ["Trace git add across the object database and index", "Contrast the 3 areas"],
          subtopics: [
            {
              id: "git-st-3-1-1",
              title: "Underlying Mechanics of git add",
              description: "Writing blobs immediately upon staging.",
              difficulty: "Foundation",
              keyTakeaways: [
                "git add hashes the working tree file, writes a loose blob object to .git/objects, and updates the binary .git/index cache.",
                "The Index is not a list of file changes; it is a complete proposed tree cache of the upcoming commit."
              ],
              concepts: ["Working Tree", "Staging Area (Index)", "HEAD Commit", "Immediate Blob Creation"],
              questions: [
                {
                  id: "git-q-6",
                  statement: "What actually happens under the hood when a developer executes git add filename.txt?",
                  type: "Interview",
                  difficulty: "Foundation",
                  explanation: "Git hashes the file content preceded by the blob header, compresses it with zlib, writes a new loose blob into .git/objects/xx/yyyy..., and records the filename, permissions, stat metadata, and SHA in .git/index."
                }
              ]
            }
          ]
        },
        {
          id: "git-t-3-2",
          title: "Diff Analysis Across the Three Areas",
          description: "Understanding git diff, git diff --staged, and git diff HEAD.",
          difficulty: "Intermediate",
          learningObjectives: ["Contrast the three diff variations", "Inspect index stat cache"],
          subtopics: [
            {
              id: "git-st-3-2-1",
              title: "Comparing the Three Trees",
              description: "Differentiating unstaged, staged, and committed states.",
              difficulty: "Intermediate",
              keyTakeaways: [
                "git diff compares Working Tree modifications against the Index.",
                "git diff --staged compares the Index against the current HEAD commit.",
                "git diff HEAD compares the Working Tree directly against HEAD, bypassing staging."
              ],
              concepts: ["Unstaged Diffs", "Staged Diffs", "HEAD Comparisons", "Stat Cache Validation"],
              questions: [
                {
                  id: "git-q-7",
                  statement: "Explain the difference between git diff, git diff --staged, and git diff HEAD.",
                  type: "Interview",
                  difficulty: "Foundation",
                  explanation: "git diff compares unstaged modifications in the Working Tree against the Index. git diff --staged compares staged modifications in the Index against HEAD. git diff HEAD compares all modifications in the Working Tree directly against HEAD."
                }
              ]
            }
          ]
        }
      ]
    },
    {
      id: "git-mod-4",
      order: 4,
      title: "Commit Graph & History Navigation",
      shortDescription: "Commit lineage, multi-parent merges, topological sorting, and revision specifiers.",
      detailedOverview: "Navigate the commit graph. Master ancestry specifiers (~ and ^), topological vs chronological sorting in git log, symmetric differences (A...B), and commit reachability algorithms.",
      difficulty: "Intermediate",
      interviewBenchmark: "Differentiate HEAD~3 from HEAD^3 and explain when each is syntactically valid.",
      topics: [
        {
          id: "git-t-4-1",
          title: "Ancestry Navigation & Revision Specifiers",
          description: "Caret (^) vs Tilde (~) syntax and multi-parent traversals.",
          difficulty: "Intermediate",
          learningObjectives: ["Master ~ and ^ revision specifiers", "Traverse merge commit parents"],
          subtopics: [
            {
              id: "git-st-4-1-1",
              title: "Caret (^) vs. Tilde (~) Syntax",
              description: "Nth generation ancestor vs Nth parent of a merge.",
              difficulty: "Intermediate",
              keyTakeaways: [
                "HEAD~N navigates N generations back along the primary linear ancestor path.",
                "HEAD^N selects the Nth parent of a merge commit (HEAD^1 is parent 1, HEAD^2 is parent 2)."
              ],
              concepts: ["Linear Ancestry (~)", "Merge Parent Selection (^)", "Root Commits", "Octopus Merges"],
              questions: [
                {
                  id: "git-q-8",
                  statement: "What is the precise structural difference between HEAD~2 and HEAD^2 in Git?",
                  type: "Interview",
                  difficulty: "Intermediate",
                  explanation: "HEAD~2 navigates two generations back along the primary parent lineage (HEAD~1~1). HEAD^2 specifically selects the second parent of a merge commit (invalid on commits with only one parent)."
                }
              ]
            }
          ]
        },
        {
          id: "git-t-4-2",
          title: "Graph Traversal & Revision Ranges",
          description: "Topological sorting, two-dot (A..B) and three-dot (A...B) ranges.",
          difficulty: "Intermediate",
          learningObjectives: ["Analyze commit reachability", "Compare two-dot and three-dot log ranges"],
          subtopics: [
            {
              id: "git-st-4-2-1",
              title: "Two-Dot (A..B) vs. Three-Dot (A...B) Revision Ranges",
              description: "Set subtraction vs symmetric difference.",
              difficulty: "Intermediate",
              keyTakeaways: [
                "A..B computes reachability: commits reachable from B that are NOT reachable from A.",
                "A...B computes symmetric difference: commits reachable from A or B, but excluding commits common to both."
              ],
              concepts: ["Reachability Sets", "Two-Dot Range", "Three-Dot Range", "Topological Sort"],
              questions: [
                {
                  id: "git-q-9",
                  statement: "Contrast the behavior of git log A..B versus git log A...B.",
                  type: "Application",
                  difficulty: "Intermediate",
                  explanation: "A..B shows commits reachable from B excluding commits reachable from A (what B adds to A). A...B computes symmetric difference: commits reachable from either branch, excluding common ancestors."
                }
              ]
            }
          ]
        }
      ]
    },
    {
      id: "git-mod-5",
      order: 5,
      title: "Branching, Merging & Graph Topology",
      shortDescription: "References, detached HEAD, fast-forward merges, and Lowest Common Ancestor (LCA) 3-way merges.",
      detailedOverview: "Examine references in .git/refs/heads. Understand the detached HEAD state, analyze fast-forward merges vs 3-way merges, and study how Git computes Lowest Common Ancestor (LCA) merge bases.",
      difficulty: "Intermediate",
      interviewBenchmark: "Explain how Git identifies the merge base (LCA) during a 3-way merge and how criss-cross merges are resolved using virtual merge bases.",
      topics: [
        {
          id: "git-t-5-1",
          title: "References & Detached HEAD State",
          difficulty: "Foundation",
          learningObjectives: ["Inspect reference files in .git/refs", "Understand detached HEAD state"],
          description: "Branch pointer mechanics and HEAD state management.",
          subtopics: [
            {
              id: "git-st-5-1-1",
              title: "Branches as 41-Byte Pointer Files",
              description: "Why branch creation is an instantaneous O(1) file write.",
              difficulty: "Foundation",
              keyTakeaways: [
                "A branch is merely a 41-byte text file in .git/refs/heads/ storing the SHA-1 of its tip commit.",
                "In detached HEAD, HEAD points directly to a commit hash instead of a symbolic branch reference, making new commits vulnerable to abandonment."
              ],
              concepts: ["Symbolic Reference", "Branch File (.git/refs/heads)", "Detached HEAD", "O(1) Branching"],
              questions: [
                {
                  id: "git-q-10",
                  statement: "What is a detached HEAD state in Git, and how do you safeguard commits made while in it?",
                  type: "Interview",
                  difficulty: "Intermediate",
                  explanation: "Detached HEAD means HEAD points directly to a commit SHA rather than a branch reference. Commits made here advance HEAD but belong to no branch. To safeguard them, create a named branch at the current tip before moving HEAD: git switch -c new-branch."
                }
              ]
            }
          ]
        },
        {
          id: "git-t-5-2",
          title: "Merge Mechanics: Fast-Forward vs. 3-Way LCA Merges",
          description: "Pointer advancement vs Lowest Common Ancestor synthesis.",
          difficulty: "Intermediate",
          learningObjectives: ["Contrast fast-forward and 3-way merges", "Compute Lowest Common Ancestor"],
          subtopics: [
            {
              id: "git-st-5-2-1",
              title: "Three-Way Merge Base (Lowest Common Ancestor - LCA)",
              description: "Why a common ancestor is necessary to resolve divergent changes.",
              difficulty: "Intermediate",
              keyTakeaways: [
                "A 2-way comparison cannot determine whether a line was added, removed, or retained.",
                "A 3-way merge compares both branches against their common ancestor (LCA); if only one branch changed a line, that change is cleanly accepted."
              ],
              concepts: ["Lowest Common Ancestor (LCA)", "Fast-Forward Merge", "3-Way Merge Base", "Criss-Cross Merge"],
              questions: [
                {
                  id: "git-q-11",
                  statement: "Explain how a 3-way merge works and why having a common ancestor (LCA) avoids spurious conflicts.",
                  type: "Analytical",
                  difficulty: "Intermediate",
                  explanation: "Comparing two files without an ancestor cannot distinguish which side made the change. By comparing both branches against their Lowest Common Ancestor, Git knows that if Branch A modified line 10 while Branch B kept it identical to the LCA, Branch A's change can be safely accepted without conflict."
                }
              ]
            }
          ]
        }
      ]
    },
    {
      id: "git-mod-6",
      order: 6,
      title: "Rebasing, Cherry-Picking & History Rewriting",
      shortDescription: "Commit replay mechanics, interactive rebase, patch application, and the Golden Rule of Rebasing.",
      detailedOverview: "Deconstruct git rebase. Understand how Git extracts commit deltas, resets HEAD to the upstream base, and replays commits with new parent hashes. Master interactive rebasing (squash, fixup, reword) and cherry-picking.",
      difficulty: "Intermediate",
      interviewBenchmark: "Why does git rebase create brand new commit hashes even if the file contents are completely identical? What is the Golden Rule of Rebasing?",
      topics: [
        {
          id: "git-t-6-1",
          title: "Underlying Rebase Mechanics & The Golden Rule",
          description: "How Git unrolls commits into patches and replays them.",
          difficulty: "Intermediate",
          learningObjectives: ["Trace git rebase internal execution", "Explain the Golden Rule of Rebasing"],
          subtopics: [
            {
              id: "git-st-6-1-1",
              title: "Replaying Commit Deltas on a New Upstream Base",
              description: "Why rebased commits receive new cryptographic SHA hashes.",
              difficulty: "Intermediate",
              keyTakeaways: [
                "Rebase never moves commits; it generates brand new commits with new parent pointers and new timestamps.",
                "Golden Rule of Rebasing: Never rebase commits that exist outside your local repository on public shared branches."
              ],
              concepts: ["Commit Replay", "New Parent Hashes", "Golden Rule of Rebasing", "Force-With-Lease"],
              questions: [
                {
                  id: "git-q-12",
                  statement: "Why do commits created by git rebase receive brand new SHA hashes even if the file modifications are identical?",
                  type: "Conceptual",
                  difficulty: "Intermediate",
                  explanation: "A commit hash is computed over the tree hash, author, timestamp, message, and its parent commit SHA. Rebase reparents the first replayed commit onto the new base, altering its hash. All subsequent commits reference this new parent SHA, cascading new hashes down the entire replayed chain."
                }
              ]
            }
          ]
        },
        {
          id: "git-t-6-2",
          title: "Interactive Rebase & Cherry-Pick",
          description: "Surgical history curation: squash, fixup, edit, and isolated commit cherry-picking.",
          difficulty: "Advanced",
          learningObjectives: ["Curate atomic PR history using rebase -i", "Execute git cherry-pick"],
          subtopics: [
            {
              id: "git-st-6-2-1",
              title: "Interactive Rebase Commands (squash vs. fixup)",
              description: "Combining and refining commit series.",
              difficulty: "Advanced",
              keyTakeaways: [
                "squash and fixup both meld a commit into its predecessor.",
                "squash prompts the user to edit a combined commit message, whereas fixup discards the commit's message immediately."
              ],
              concepts: ["Interactive Rebase Todo List", "Squash vs Fixup", "Cherry-Pick Patch Extraction", "Atomic Commits"],
              questions: [
                {
                  id: "git-q-13",
                  statement: "What is the functional difference between squash and fixup in an interactive rebase todo list?",
                  type: "Application",
                  difficulty: "Intermediate",
                  explanation: "Both commands meld the commit into the previous commit. squash keeps the commit message and opens an editor to combine them, while fixup automatically discards the commit message, keeping only the parent commit message."
                }
              ]
            }
          ]
        }
      ]
    },
    {
      id: "git-mod-7",
      order: 7,
      title: "Conflict Resolution & Merge Drivers",
      shortDescription: "Anatomy of conflicts, index stages (1, 2, 3), diff3 formatting, and git rerere.",
      detailedOverview: "Examine merge conflicts from the index perspective. Inspect stages 1 (base), 2 (ours), and 3 (theirs), decode conflict markers, and configure git rerere (Reuse Recorded Resolution) to automate repetitive conflict handling.",
      difficulty: "Intermediate",
      interviewBenchmark: "Explain how index stages 1, 2, and 3 represent conflicted files during an unfinished merge and how git rerere caches resolutions.",
      topics: [
        {
          id: "git-t-7-1",
          title: "Index Stages (1, 2, 3) & Conflict Markers",
          description: "How Git stores multiple versions of a conflicted file in the index.",
          difficulty: "Intermediate",
          learningObjectives: ["Inspect index stages 1, 2, and 3", "Configure zdiff3 conflict markers"],
          subtopics: [
            {
              id: "git-st-7-1-1",
              title: "Conflict Representation in .git/index",
              description: "Stage 1 (ancestor), Stage 2 (ours/HEAD), Stage 3 (theirs).",
              difficulty: "Intermediate",
              keyTakeaways: [
                "During a conflict, the index records three blob hashes: stage 1 (LCA base), stage 2 (ours), stage 3 (theirs).",
                "Inspect stages using git show :1:file, :2:file, and :3:file."
              ],
              concepts: ["Index Stage 0 (Normal)", "Stage 1 (LCA Base)", "Stage 2 (Ours)", "Stage 3 (Theirs)"],
              questions: [
                {
                  id: "git-q-14",
                  statement: "What are index stages 1, 2, and 3 during a merge conflict, and how can they be viewed?",
                  type: "Interview",
                  difficulty: "Intermediate",
                  explanation: "Stage 1 contains the file version from the common merge base ancestor. Stage 2 contains the current branch (ours/HEAD). Stage 3 contains the incoming branch (theirs). They can be inspected directly via git show :1:path, git show :2:path, and git show :3:path."
                }
              ]
            }
          ]
        },
        {
          id: "git-t-7-2",
          title: "git rerere: Reuse Recorded Resolution",
          description: "Fingerprinting and automating repeated merge conflict resolutions.",
          difficulty: "Advanced",
          learningObjectives: ["Enable and operate git rerere", "Inspect .git/rr-cache"],
          subtopics: [
            {
              id: "git-st-7-2-1",
              title: "The rerere Cache Engine",
              description: "Saving manual conflict resolutions to eliminate duplicate work during rebasing.",
              difficulty: "Advanced",
              keyTakeaways: [
                "git rerere records conflicted hunks and the developer's resolution in .git/rr-cache.",
                "When an identical conflict recurs during a multi-commit rebase, rerere automatically applies the saved fix."
              ],
              concepts: ["Pre-Resolution Fingerprint", "Post-Resolution Patch", ".git/rr-cache", "Rebase Automation"],
              questions: [
                {
                  id: "git-q-15",
                  statement: "How does git rerere operate, and why is it useful during long feature branch rebases?",
                  type: "Application",
                  difficulty: "Advanced",
                  explanation: "git rerere fingerprints conflicted hunks and caches the developer's manual resolution. When the identical conflict arises in subsequent commits during a rebase, rerere automatically applies the recorded resolution, preventing repetitive manual fixes."
                }
              ]
            }
          ]
        }
      ]
    },
    {
      id: "git-mod-8",
      order: 8,
      title: "Recovery Internals & The Reflog",
      shortDescription: "Reference logs (.git/logs), orphaned commit salvage, git reset variants, and git revert.",
      detailedOverview: "Explore Git's disaster recovery systems. Study reference logs in .git/logs, recover deleted branches and discarded commits, understand git reset (--soft, --mixed, --hard) impacts on the three trees, and contrast with non-destructive git revert.",
      difficulty: "Intermediate",
      interviewBenchmark: "Detail the exact state of HEAD, the Index, and the Working Tree after running git reset --soft, --mixed, and --hard. How do you recover a discarded commit using git reflog?",
      topics: [
        {
          id: "git-t-8-1",
          title: "The Reference Log (Reflog) Architecture",
          description: "Structure of .git/logs and rescuing lost commits.",
          difficulty: "Intermediate",
          learningObjectives: ["Navigate git reflog", "Recover deleted branches and orphaned commits"],
          subtopics: [
            {
              id: "git-st-8-1-1",
              title: "Inspecting .git/logs & Salvaging Lost Commits",
              description: "How Git logs every reference movement.",
              difficulty: "Intermediate",
              keyTakeaways: [
                "Git appends an entry to .git/logs every time HEAD or a branch pointer moves.",
                "Unreachable commits remain in the object database for up to 30 days before garbage collection, making accidental loss almost impossible."
              ],
              concepts: ["Reflog Append-Only Log", "HEAD@{n} Syntax", "Orphan Commit Salvage", "git fsck --lost-found"],
              questions: [
                {
                  id: "git-q-16",
                  statement: "A developer accidentally executed git reset --hard HEAD~5 and lost several days of commits. How do they recover?",
                  type: "Interview",
                  difficulty: "Intermediate",
                  explanation: "Run git reflog to view the chronological log of HEAD positions. Find the commit SHA immediately prior to the reset (e.g. HEAD@{1}). Restore the branch pointer and working files using git reset --hard HEAD@{1} or create a new branch from it with git branch recovery HEAD@{1}."
                }
              ]
            }
          ]
        },
        {
          id: "git-t-8-2",
          title: "git reset vs. git revert Mechanics",
          description: "Exact impacts of reset flags on the three trees versus non-destructive revert commits.",
          difficulty: "Intermediate",
          learningObjectives: ["Contrast --soft, --mixed, and --hard reset", "Generate inverse patches with git revert"],
          subtopics: [
            {
              id: "git-st-8-2-1",
              title: "The Three Flags of git reset",
              description: "How --soft, --mixed, and --hard affect HEAD, Index, and Working Tree.",
              difficulty: "Intermediate",
              keyTakeaways: [
                "--soft: moves HEAD only; Index and Working Tree are untouched (changes remain staged).",
                "--mixed (default): moves HEAD and syncs Index; Working Tree untouched (changes become unstaged diffs).",
                "--hard: overwrites HEAD, Index, and Working Tree with target commit snapshot."
              ],
              concepts: ["--soft Reset", "--mixed Reset", "--hard Reset", "Inverse Delta Commits (revert)"],
              questions: [
                {
                  id: "git-q-17",
                  statement: "Detail the state of HEAD, the Index, and the Working Tree after running git reset --soft, --mixed, and --hard.",
                  type: "Interview",
                  difficulty: "Intermediate",
                  explanation: "--soft moves HEAD only; Index and Working Tree are untouched (changes remain staged in index). --mixed (default) moves HEAD and updates Index to target commit; Working Tree is untouched (changes become unstaged). --hard overwrites HEAD, Index, and Working Tree with target commit."
                }
              ]
            }
          ]
        }
      ]
    },
    {
      id: "git-mod-9",
      order: 9,
      title: "Remote Collaboration, Fetching & Tracking",
      shortDescription: "Remote tracking branches, have/want handshakes, fetch vs pull, and push negotiations.",
      detailedOverview: "Understand remote repository synchronization. Examine remote tracking references in .git/refs/remotes/, analyze the smart transport have/want protocol negotiation, and master upstream branch configurations.",
      difficulty: "Intermediate",
      interviewBenchmark: "Explain how Git's Smart HTTP/SSH have/want protocol negotiation determines the minimal set of objects to pack and transfer during git fetch.",
      topics: [
        {
          id: "git-t-9-1",
          title: "Remote References & Tracking Branches",
          description: "Separation between local branches and remote-tracking bookmarks.",
          difficulty: "Intermediate",
          learningObjectives: ["Differentiate local and remote-tracking branches", "Contrast git fetch and git pull"],
          subtopics: [
            {
              id: "git-st-9-1-1",
              title: "Remote-Tracking References vs. Local Branches",
              description: "Why origin/main is a read-only local bookmark.",
              difficulty: "Intermediate",
              keyTakeaways: [
                "origin/main is a local read-only bookmark in .git/refs/remotes/ recording origin's state at the last fetch.",
                "git fetch downloads objects and updates remote bookmarks without touching local branches or working tree files."
              ],
              concepts: ["Remote-Tracking Refs", "Upstream Configuration", "Non-Destructive Fetch", "Pull vs Fetch"],
              questions: [
                {
                  id: "git-q-18",
                  statement: "Why is git fetch completely safe to run at any time while git pull can disrupt ongoing local work?",
                  type: "Conceptual",
                  difficulty: "Foundation",
                  explanation: "git fetch only downloads missing objects into .git/objects and advances remote-tracking references in .git/refs/remotes/. It touches neither working files nor local branches. git pull immediately invokes a merge or rebase after fetching, which can trigger merge conflicts."
                }
              ]
            }
          ]
        },
        {
          id: "git-t-9-2",
          title: "Smart Protocol Transport & Have/Want Handshake",
          description: "How Git negotiates minimal object pack generation over HTTP/SSH.",
          difficulty: "Advanced",
          learningObjectives: ["Trace have/want packet negotiation", "Analyze packfile streaming"],
          subtopics: [
            {
              id: "git-st-9-2-1",
              title: "The Have/Want Protocol Negotiation",
              description: "Determining missing DAG subgraphs.",
              difficulty: "Advanced",
              keyTakeaways: [
                "The client sends 'want' commit hashes and advertises 'have' commit hashes.",
                "The server walks back to find common ancestors and generates a thin pack containing only the delta objects."
              ],
              concepts: ["Want Advertisements", "Have Confirmations", "Thin Packs", "Smart Transport Protocol"],
              questions: [
                {
                  id: "git-q-19",
                  statement: "How does Git's smart transport protocol determine the minimal set of objects to transfer during a push or fetch?",
                  type: "Analytical",
                  difficulty: "Advanced",
                  explanation: "The client and server perform a have/want handshake where the receiver lists wanted commit SHAs and the sender lists available commit SHAs. The server traverses the commit DAG backwards to find a common ancestor and streams a minimal packfile containing only reachable missing objects."
                }
              ]
            }
          ]
        }
      ]
    },
    {
      id: "git-mod-10",
      order: 10,
      title: "Advanced Internals: Packfiles, Plumbing & Garbage Collection",
      shortDescription: "Packfiles (.pack/.idx), sliding-window delta compression, git gc heuristics, and raw plumbing commands.",
      detailedOverview: "Explore Git's low-level storage engine. Study how packfiles and .idx binary search tables compress millions of objects, inspect sliding-window delta compression, understand git gc heuristics, and construct commits entirely using low-level plumbing commands.",
      difficulty: "Advanced",
      interviewBenchmark: "Construct a valid Git commit and update a branch pointer entirely using low-level plumbing commands without git add or git commit.",
      topics: [
        {
          id: "git-t-10-1",
          title: "Packfiles & Sliding-Window Delta Compression",
          description: "How Git compacts loose objects into efficient binary packfiles.",
          difficulty: "Advanced",
          learningObjectives: ["Explain packfile and .idx binary structures", "Analyze reverse delta compression"],
          subtopics: [
            {
              id: "git-st-10-1-1",
              title: "Packfile Binary Architecture & Reverse Deltas",
              description: "Why Git stores newer versions whole and older versions as deltas.",
              difficulty: "Advanced",
              keyTakeaways: [
                "Packfiles concatenate thousands of compressed objects; the companion .idx file provides an O(log N) fan-out table.",
                "Git stores the newest version of a file whole and compresses older versions as backward deltas, optimizing checkout speeds for recent HEAD snapshots."
              ],
              concepts: ["Packfile Format", "Index (.idx) Fan-Out Table", "Sliding Window Deltas", "Reverse Delta Optimization"],
              questions: [
                {
                  id: "git-q-20",
                  statement: "Why do Git packfiles store the newest version of a file whole and compress older versions as deltas?",
                  type: "Analytical",
                  difficulty: "Advanced",
                  explanation: "Modern software development accesses recent HEAD commits the vast majority of the time. Storing the newest version intact allows instant decompression without following delta chains, while archiving older historical versions as compact reverse deltas."
                }
              ]
            }
          ]
        },
        {
          id: "git-t-10-2",
          title: "Plumbing vs. Porcelain & Garbage Collection",
          description: "Constructing commits via low-level plumbing and object reachability traversal.",
          difficulty: "Advanced",
          learningObjectives: ["Build commits using plumbing commands", "Explain git gc reachability sweeps"],
          subtopics: [
            {
              id: "git-st-10-2-1",
              title: "Building Commits Manually via Plumbing",
              description: "hash-object, update-index, write-tree, commit-tree, update-ref.",
              difficulty: "Advanced",
              keyTakeaways: [
                "Git porcelain commands (add, commit) are thin wrappers around primitive plumbing commands.",
                "A complete commit can be authored using: git hash-object -w, git update-index --add, git write-tree, git commit-tree, and git update-ref."
              ],
              concepts: ["hash-object", "write-tree", "commit-tree", "update-ref", "git gc & git prune"],
              questions: [
                {
                  id: "git-q-21",
                  statement: "Demonstrate how to create a valid Git commit entirely using low-level plumbing commands without touching git add or git commit.",
                  type: "Application",
                  difficulty: "Advanced",
                  explanation: "1. Write blob: echo 'data' | git hash-object -w --stdin (returns blob SHA). 2. Stage blob: git update-index --add --cacheinfo 100644 <blob-sha> file.txt. 3. Write tree: git write-tree (returns tree SHA). 4. Create commit: git commit-tree <tree-sha> -m 'Plumbing commit' (returns commit SHA). 5. Move branch: git update-ref refs/heads/main <commit-sha>."
                }
              ]
            }
          ]
        }
      ]
    }
  ]
};
