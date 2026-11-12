import { CurriculumSubject } from "./types";

export const oopCurriculum: CurriculumSubject = {
  id: "oop",
  name: "Object-Oriented Programming & Low-Level Design",
  shortName: "OOP & LLD",
  category: "algorithms",
  description: "Understand object orientation from the machine perspective: memory layouts, virtual method dispatch tables (vtables), composition, and SOLID architectural principles.",
  longDescription: "Look past superficial textbook definitions to see how object polymorphism is actually implemented at runtime and how design patterns structure maintainable, extensible codebases.",
  accentColor: "#EC4899",
  borderColor: "rgba(236, 72, 153, 0.3)",
  badgeBg: "rgba(236, 72, 153, 0.1)",
  iconName: "Boxes",
  coreQuestion: "How does the CPU resolve a polymorphic method call at runtime via a vtable pointer, and why does composition prevent fragile base classes?",
  prerequisites: ["Basic Programming in C++, Java, or Python", "Basic Memory Models (Stack vs Heap)"],
  learningOutcomes: [
    "Diagram object memory layout, struct alignment, and the implicit 8-byte virtual table pointer (*vptr).",
    "Trace dynamic method dispatch at the machine level and analyze the runtime cost of indirect calls and inlining suppression.",
    "Apply the 5 SOLID principles to refactor tightly coupled architectures into extensible systems.",
    "Implement core Creational, Structural, and Behavioral design patterns (Factory, Builder, Adapter, Decorator, Strategy, Observer).",
    "Identify violations of the Liskov Substitution Principle and the Fragile Base Class problem.",
    "Design extensible Low-Level System architectures (e.g. Parking Lot, Elevator System, Notification Service) adhering to clean object-oriented principles."
  ],
  keyMechanisms: [
    "Virtual Method Table (vtable) & *vptr Indirection",
    "Static vs Dynamic Dispatch Resolution",
    "Resource Acquisition Is Initialization (RAII)",
    "Composition over Inheritance ('has-a' vs 'is-a')",
    "Liskov Substitution Behavioral Invariants"
  ],
  modules: [
    {
      id: "oop-mod-1",
      order: 1,
      title: "Programming Paradigms & OOP Foundations",
      shortDescription: "Procedural vs Functional vs Object-Oriented paradigms and core mental models.",
      detailedOverview: "Contrast procedural, functional, and object-oriented paradigms. Understand how grouping state and behavior into objects protects invariants, manages complexity, and creates modular software architectures.",
      difficulty: "Foundation",
      interviewBenchmark: "Explain how procedural programming with structs differs from object-oriented programming with encapsulation and invariant protection.",
      topics: [
        {
          id: "oop-t-1-1",
          title: "Paradigms & The Object Model",
          description: "State and behavior encapsulation vs pure functional transformations.",
          difficulty: "Foundation",
          learningObjectives: ["Contrast OOP with Procedural and Functional paradigms", "Define class invariants"],
          subtopics: [
            {
              id: "oop-st-1-1-1",
              title: "Encapsulation as Invariant Enforcement",
              description: "Why bundling data with validating methods prevents invalid object states.",
              difficulty: "Foundation",
              keyTakeaways: [
                "Encapsulation is not merely making fields private with getters and setters; it is the active defense of business invariants.",
                "An object should never be allowed to transition into an invalid state from external direct field mutation."
              ],
              concepts: ["Encapsulation", "Class Invariant", "Information Hiding", "Access Modifiers"],
              questions: [
                {
                  id: "oop-q-1",
                  statement: "Why is generating automatic public getters and setters for all private fields considered an anti-pattern that violates encapsulation?",
                  type: "Interview",
                  difficulty: "Intermediate",
                  explanation: "Because an open setter allows external code to mutate an object's internal state without validation, turning the class back into an unprotected procedural data struct and destroying invariant protection."
                }
              ]
            }
          ]
        }
      ]
    },
    {
      id: "oop-mod-2",
      order: 2,
      title: "Classes, Objects & Memory Layout",
      shortDescription: "Object instantiation, stack vs heap layout, memory padding, and alignment.",
      detailedOverview: "Investigate what an object actually looks like in computer memory. Study struct padding rules, 64-bit alignment, object instantiation on stack vs heap, and copy vs reference semantics.",
      difficulty: "Foundation",
      interviewBenchmark: "Calculate the exact sizeof() of a C++ class containing different primitive types and explain memory alignment padding.",
      topics: [
        {
          id: "oop-t-2-1",
          title: "Object Memory Layout & Padding",
          description: "Hardware bus alignment, field ordering, and sizeof() calculations.",
          difficulty: "Intermediate",
          learningObjectives: ["Calculate object byte sizes with struct padding", "Contrast stack vs heap allocation"],
          subtopics: [
            {
              id: "oop-st-2-1-1",
              title: "Memory Alignment & Struct Padding Rules",
              description: "Why modern 64-bit CPUs require attributes aligned to multiples of their size.",
              difficulty: "Intermediate",
              keyTakeaways: [
                "CPUs read memory in word-aligned chunks (4 or 8 bytes). Unaligned memory accesses trigger multiple bus cycles or hardware faults.",
                "Compilers insert invisible padding bytes between fields. Ordering fields from largest to smallest minimizes struct padding waste."
              ],
              concepts: ["Memory Alignment", "Struct Padding", "sizeof()", "Cache Line Utilization"],
              questions: [
                {
                  id: "oop-q-2",
                  statement: "In C++ on a 64-bit machine, calculate sizeof(struct A { char c; int i; char d; }) vs sizeof(struct B { int i; char c; char d; }).",
                  type: "Analytical",
                  difficulty: "Intermediate",
                  explanation: "In struct A: char c (1 byte) + 3 pad bytes + int i (4 bytes) + char d (1 byte) + 3 pad bytes = 12 bytes. In struct B: int i (4 bytes) + char c (1 byte) + char d (1 byte) + 2 pad bytes = 8 bytes. Reordering saved 33% memory."
                }
              ]
            }
          ]
        }
      ]
    },
    {
      id: "oop-mod-3",
      order: 3,
      title: "Abstraction & Interface Contracts",
      shortDescription: "Abstract classes vs interfaces, contracts, and loose coupling.",
      detailedOverview: "Study abstraction as a mechanism to manage system complexity. Learn how interfaces establish behavioral contracts, separate 'what' from 'how', and enable modular component substitution without modifying client code.",
      difficulty: "Foundation",
      interviewBenchmark: "Explain the technical differences and architectural use cases between an abstract class and an interface in Java or C++.",
      topics: [
        {
          id: "oop-t-3-1",
          title: "Contracts & Behavioral Abstraction",
          description: "Abstract classes vs interfaces, multiple interface implementation, and contracts.",
          difficulty: "Foundation",
          learningObjectives: ["Contrast abstract class with interface", "Design behavioral contracts"],
          subtopics: [
            {
              id: "oop-st-3-1-1",
              title: "Abstract Classes vs Interfaces",
              description: "Shared state and partial implementation vs pure behavioral contracts.",
              difficulty: "Foundation",
              keyTakeaways: [
                "An interface defines a pure contract ('what' an object can do) with no state. A class can implement multiple interfaces.",
                "An abstract class can provide partial implementation and internal state ('is-a' foundation), but languages like Java restrict classes to single inheritance."
              ],
              concepts: ["Interface", "Abstract Class", "Contract", "Multiple Inheritance of Type"],
              questions: [
                {
                  id: "oop-q-3",
                  statement: "When should an architect choose an interface over an abstract base class?",
                  type: "Interview",
                  difficulty: "Intermediate",
                  explanation: "Choose an interface when defining a capability or role contract that can be shared across completely unrelated class hierarchies (e.g. `Comparable`, `Serializable`). Choose an abstract class when classes share substantial common state and internal private method implementations."
                }
              ]
            }
          ]
        }
      ]
    },
    {
      id: "oop-mod-4",
      order: 4,
      title: "Inheritance & Class Hierarchies",
      shortDescription: "Subtyping, code reuse, multiple inheritance, and the diamond problem.",
      detailedOverview: "Examine class inheritance mechanics. Study base and derived classes, access specifiers (public, protected, private inheritance), multiple inheritance in C++, and virtual inheritance to solve the diamond problem.",
      difficulty: "Intermediate",
      interviewBenchmark: "Explain the Diamond Problem in multiple inheritance and how C++ virtual inheritance resolves ambiguous base class subobjects.",
      topics: [
        {
          id: "oop-t-4-1",
          title: "Inheritance Mechanics & The Diamond Problem",
          description: "Subtyping, constructor chaining, and multiple inheritance ambiguities.",
          difficulty: "Intermediate",
          learningObjectives: ["Analyze the Diamond Problem", "Trace constructor and destructor call order"],
          subtopics: [
            {
              id: "oop-st-4-1-1",
              title: "Multiple Inheritance & The Diamond Problem",
              description: "When class D inherits from B and C, which both inherit from base A.",
              difficulty: "Intermediate",
              keyTakeaways: [
                "In multiple inheritance, if two intermediate classes inherit from the same base class, the bottom derived class contains two duplicated copies of the top base class.",
                "C++ resolves this via `virtual inheritance`, which ensures only a single shared base class instance exists in memory, accessed via pointer offsets."
              ],
              concepts: ["Multiple Inheritance", "Diamond Problem", "Virtual Inheritance", "Constructor Chaining"],
              questions: [
                {
                  id: "oop-q-4",
                  statement: "What ambiguity occurs when class D inherits from B and C, both inheriting from A with field `int x`, and how does C++ resolve it?",
                  type: "Interview",
                  difficulty: "Intermediate",
                  explanation: "A call to `d.x` is ambiguous because D contains two separate subobjects of A (one via B, one via C). Virtual inheritance (`class B : virtual public A`) forces the compiler to share a single common subobject of A in D."
                }
              ]
            }
          ]
        }
      ]
    },
    {
      id: "oop-mod-5",
      order: 5,
      title: "Polymorphism & Virtual Method Tables (vtables)",
      shortDescription: "Compile-time vs runtime polymorphism, vtables, *vptr, and dynamic dispatch cost.",
      detailedOverview: "Deconstruct dynamic polymorphism at the machine level. Understand the virtual method table (vtable), the 8-byte vptr in object memory, dynamic dispatch pointer dereferencing, and why virtual methods inhibit compiler function inlining.",
      difficulty: "Advanced",
      interviewBenchmark: "Walk through what happens in assembly when invoking a virtual function through a pointer and explain why virtual functions prevent compiler inlining.",
      topics: [
        {
          id: "oop-t-5-1",
          title: "Dynamic Dispatch & vtable Architecture",
          description: "Virtual tables, function pointer slots, and devirtualization.",
          difficulty: "Advanced",
          learningObjectives: ["Diagram object layout with vptr", "Calculate virtual dispatch overhead"],
          subtopics: [
            {
              id: "oop-st-5-1-1",
              title: "The Virtual Method Table (vtable) & *vptr Pointer",
              description: "How compiled languages resolve `object->draw()` to derived class code at runtime.",
              difficulty: "Advanced",
              keyTakeaways: [
                "Every class with virtual functions gets a static vtable in read-only data containing function pointers.",
                "Every object instance gets an implicit 8-byte pointer (`*vptr`) at offset 0 pointing to its class's vtable.",
                "Virtual invocation requires double indirection: (1) load vptr, (2) index into vtable, (3) indirect call. This prevents compiler inlining."
              ],
              concepts: ["vtable", "*vptr", "Dynamic Dispatch", "Indirect Call", "Devirtualization", "Inlining Suppression"],
              questions: [
                {
                  id: "oop-q-5",
                  statement: "Why is the prevention of function inlining often a much greater performance cost of virtual methods than the pointer dereference itself?",
                  type: "Interview",
                  difficulty: "Advanced",
                  explanation: "A direct non-virtual function call can be inlined by the compiler, eliminating call instruction overhead, register saving, and enabling cross-function optimizations like constant folding and vectorization. A virtual call's target cannot be determined until runtime, blocking all inlining optimizations."
                }
              ]
            }
          ]
        }
      ]
    },
    {
      id: "oop-mod-6",
      order: 6,
      title: "Object Lifecycle: Constructors, Destructors & RAII",
      shortDescription: "Initialization lists, copy/move constructors, RAII, and virtual destructors.",
      detailedOverview: "Master object creation, destruction, and deterministic resource management. Study initialization lists, deep vs shallow copying, move semantics (rvalue references), RAII, and why base class destructors must be virtual.",
      difficulty: "Intermediate",
      interviewBenchmark: "Explain why deleting a derived class object through a base class pointer causes undefined behavior if the base destructor is not virtual.",
      topics: [
        {
          id: "oop-t-6-1",
          title: "Resource Management & Destructors",
          description: "Resource Acquisition Is Initialization (RAII) and virtual destructor mechanics.",
          difficulty: "Intermediate",
          learningObjectives: ["Apply RAII for leak-free resource management", "Explain virtual destructor necessity"],
          subtopics: [
            {
              id: "oop-st-6-1-1",
              title: "Virtual Destructors & Memory Leaks",
              description: "Ensuring proper cleanup when deleting derived objects via base pointers.",
              difficulty: "Intermediate",
              keyTakeaways: [
                "If a base class destructor is non-virtual, executing `delete base_ptr;` statically invokes only the base destructor, failing to call the derived destructor and leaking derived resources.",
                "Declaring the base destructor `virtual` ensures the destructor call is dispatched via the vtable, running derived cleanup first, then base cleanup."
              ],
              concepts: ["Virtual Destructor", "Memory Leak", "Object Slicing", "RAII", "Move Semantics"],
              questions: [
                {
                  id: "oop-q-6",
                  statement: "What occurs if you delete a derived class object holding a dynamic memory buffer through a base class pointer whose destructor is NOT virtual?",
                  type: "Interview",
                  difficulty: "Intermediate",
                  explanation: "The compiler emits a static call to `Base::~Base()`. The `Derived::~Derived()` destructor never runs. Any memory, file handles, or network sockets owned exclusively by the derived class are permanently leaked."
                }
              ]
            }
          ]
        }
      ]
    },
    {
      id: "oop-mod-7",
      order: 7,
      title: "Memory Management & Object Relationships",
      shortDescription: "Composition, aggregation, association, and why composition beats inheritance.",
      detailedOverview: "Deconstruct object relationship modeling. Differentiate Association ('uses-a'), Aggregation ('has-a' with independent lifecycle), and Composition ('owns-a' with identical lifecycle). Study why modern architecture strictly favors composition over inheritance.",
      difficulty: "Intermediate",
      interviewBenchmark: "Demonstrate the Fragile Base Class problem and explain why composition provides superior architectural flexibility compared to inheritance.",
      topics: [
        {
          id: "oop-t-7-1",
          title: "Composition over Inheritance",
          description: "Loose coupling, dependency injection, and the Fragile Base Class anti-pattern.",
          difficulty: "Intermediate",
          learningObjectives: ["Contrast Composition with Inheritance", "Analyze Fragile Base Class bugs"],
          subtopics: [
            {
              id: "oop-st-7-1-1",
              title: "The Fragile Base Class Problem",
              description: "How modifying a superclass silently breaks subclass invariants across a codebase.",
              difficulty: "Intermediate",
              keyTakeaways: [
                "Inheritance exposes base class implementation details to subclasses (white-box reuse), creating tight architectural coupling.",
                "Composition encapsulates behavior behind interface delegates (black-box reuse), allowing independent testing and dynamic runtime swapping."
              ],
              concepts: ["Composition over Inheritance", "Fragile Base Class", "Loose Coupling", "Aggregation vs Composition"],
              questions: [
                {
                  id: "oop-q-7",
                  statement: "Explain the Fragile Base Class problem with an example where overriding a method breaks subclass counting.",
                  type: "Interview",
                  difficulty: "Intermediate",
                  explanation: "If `InstrumentedHashSet` overrides `add()` and `addAll()` to count elements, and the base class `HashSet.addAll()` internally calls `add()`, calling `addAll([1, 2])` causes the subclass count to increment twice (double counting). Subclasses are dangerously coupled to base class internal method calling conventions."
                }
              ]
            }
          ]
        }
      ]
    },
    {
      id: "oop-mod-8",
      order: 8,
      title: "SOLID Principles in Software Engineering",
      shortDescription: "SRP, OCP, LSP, ISP, and DIP with real-world refactoring scenarios.",
      detailedOverview: "Master the 5 foundational principles of clean object-oriented architecture. Study Single Responsibility, Open-Closed, Liskov Substitution, Interface Segregation, and Dependency Inversion through practical refactoring exercises.",
      difficulty: "Intermediate",
      interviewBenchmark: "Walk through a violation of the Liskov Substitution Principle with a Square/Rectangle model and refactor it using composition.",
      topics: [
        {
          id: "oop-t-8-1",
          title: "SOLID Principles Breakdown",
          description: "Detailed analysis of each of the 5 SOLID design principles.",
          difficulty: "Intermediate",
          learningObjectives: ["Apply each SOLID principle to refactor legacy code", "Detect LSP and DIP violations"],
          subtopics: [
            {
              id: "oop-st-8-1-1",
              title: "Liskov Substitution Principle (LSP)",
              description: "Behavioral subtyping invariants and the Rectangle/Square flaw.",
              difficulty: "Intermediate",
              keyTakeaways: [
                "Subclasses must be substitutable for their base types without altering program correctness or invariant assumptions.",
                "Subtypes cannot strengthen preconditions or weaken postconditions."
              ],
              concepts: ["LSP", "Behavioral Subtyping", "Design by Contract", "Preconditions & Postconditions"],
              questions: [
                {
                  id: "oop-q-8",
                  statement: "Why does `Square extends Rectangle` violate the Liskov Substitution Principle even though a square is mathematically a rectangle?",
                  type: "Interview",
                  difficulty: "Intermediate",
                  explanation: "Because a Rectangle guarantees that setting width does not modify height. If a Square overrides `setWidth(w)` to set both width and height to maintain squareness, a client function testing `r.setWidth(5); r.setHeight(10); assert(r.getArea() == 50);` will fail when passed a Square (area becomes 100), violating the contract."
                }
              ]
            },
            {
              id: "oop-st-8-1-2",
              title: "Dependency Inversion Principle (DIP)",
              description: "High-level modules should depend on abstractions, not on low-level concretions.",
              difficulty: "Intermediate",
              keyTakeaways: [
                "High-level policy modules should not directly instantiate low-level utility classes (e.g. `MySQLConnection`, `SMSSender`).",
                "Both should depend on abstractions (interfaces), with concretions injected via Dependency Injection."
              ],
              concepts: ["DIP", "Inversion of Control (IoC)", "Dependency Injection", "Decoupled Architecture"],
              questions: [
                {
                  id: "oop-q-9",
                  statement: "How does the Dependency Inversion Principle (DIP) enable effortless unit testing with mock objects?",
                  type: "Interview",
                  difficulty: "Intermediate",
                  explanation: "Because the business service depends on an interface (e.g. `PaymentGateway`) rather than a concrete class (`StripeGateway`), unit tests can inject a `MockPaymentGateway` that runs in-memory without making network calls or charging real credit cards."
                }
              ]
            }
          ]
        }
      ]
    },
    {
      id: "oop-mod-9",
      order: 9,
      title: "Design Patterns (GoF): Creational, Structural & Behavioral",
      shortDescription: "Factory, Builder, Singleton, Adapter, Decorator, Strategy, Observer, and Command.",
      detailedOverview: "Master standardized software engineering solutions to recurring architectural problems. Study Creational (Factory, Builder, Singleton), Structural (Adapter, Decorator, Facade), and Behavioral patterns (Strategy, Observer, Command).",
      difficulty: "Intermediate",
      interviewBenchmark: "Design a pluggable multi-channel notification dispatch system (Email, SMS, Push) adhering to the Strategy and Factory patterns.",
      topics: [
        {
          id: "oop-t-9-1",
          title: "Core Design Patterns",
          description: "Real-world implementations of Factory, Strategy, Observer, and Decorator.",
          difficulty: "Intermediate",
          learningObjectives: ["Implement Strategy and Observer patterns", "Explain thread-safe Singleton double-checked locking"],
          subtopics: [
            {
              id: "oop-st-9-1-1",
              title: "Strategy Pattern vs State Pattern",
              description: "Encapsulating interchangeable algorithms and state-dependent behavior.",
              difficulty: "Intermediate",
              keyTakeaways: [
                "The Strategy pattern encapsulates interchangeable algorithms behind a common interface, allowing clients to swap algorithms at runtime.",
                "The State pattern allows an object to alter its behavior when its internal state changes, appearing as if the object changed its class."
              ],
              concepts: ["Strategy Pattern", "State Pattern", "Open-Closed Principle", "Runtime Swapping"],
              questions: [
                {
                  id: "oop-q-10",
                  statement: "How does the Strategy pattern eliminate complex switch-case or nested if-else blocks in payment processing?",
                  type: "Interview",
                  difficulty: "Intermediate",
                  explanation: "Instead of branching on `if (paymentType == CREDIT_CARD) ... else if (paymentType == PAYPAL)`, each payment method implements a `PaymentStrategy` interface. Adding a new payment type (e.g. ApplePay) simply requires creating a new strategy class without modifying existing payment processing code (satisfying OCP)."
                }
              ]
            },
            {
              id: "oop-st-9-1-2",
              title: "Thread-Safe Singleton & Double-Checked Locking",
              description: "Why lazy initialization in multithreaded environments requires volatile memory barriers.",
              difficulty: "Advanced",
              keyTakeaways: [
                "Lazy Singleton initialization can cause race conditions creating duplicate instances.",
                "Double-checked locking minimizes synchronization overhead, but requires the instance variable to be `volatile` to prevent CPU instruction reordering."
              ],
              concepts: ["Singleton", "Double-Checked Locking", "Volatile Keyword", "Instruction Reordering"],
              questions: [
                {
                  id: "oop-q-11",
                  statement: "Why does double-checked locking in Java or C++ fail without the `volatile` keyword on the instance pointer?",
                  type: "Interview",
                  difficulty: "Advanced",
                  explanation: "Because `instance = new Singleton()` involves 3 steps: allocate memory, run constructor, assign pointer. Without volatile memory barriers, the CPU compiler can reorder steps, publishing the non-null pointer BEFORE the constructor finishes. Another thread seeing a non-null pointer reads partially initialized garbage."
                }
              ]
            }
          ]
        }
      ]
    },
    {
      id: "oop-mod-10",
      order: 10,
      title: "Low-Level Design (LLD) Problem Scenarios",
      shortDescription: "Object-oriented design for Parking Lot, Elevator System, and Chess/Tic-Tac-Toe.",
      detailedOverview: "Apply object-oriented principles, design patterns, and SOLID foundations to solve full-scale Low-Level Design (LLD) interview problems. Model entities, design class relationships, and write maintainable, testable code.",
      difficulty: "Advanced",
      interviewBenchmark: "Design the complete class model and interaction logic for a multi-floor Elevator System handling concurrent passenger requests.",
      topics: [
        {
          id: "oop-t-10-1",
          title: "Practical LLD Case Studies",
          description: "End-to-end design of parking lot, elevator, and notification system.",
          difficulty: "Advanced",
          learningObjectives: ["Design class hierarchies for LLD problems", "Apply design patterns to business domain models"],
          subtopics: [
            {
              id: "oop-st-10-1-1",
              title: "Case Study: Multi-Floor Elevator System",
              description: "State pattern for elevator movement and Strategy pattern for scheduling requests.",
              difficulty: "Advanced",
              keyTakeaways: [
                "Elevator state transitions (IDLE, MOVING_UP, MOVING_DOWN, MAINTENANCE) are cleanly modeled via the State pattern.",
                "Request assignment (LOOK, SCAN, FCFS) is encapsulated via the Strategy pattern.",
                "Door operations and safety sensors are isolated behind event-driven Observer listeners."
              ],
              concepts: ["Elevator Controller", "State Pattern", "SCAN Algorithm", "Thread-Safe Request Queues"],
              questions: [
                {
                  id: "oop-q-12",
                  statement: "In designing an Elevator System, how would you decouple the dispatching algorithm from the physical elevator movement?",
                  type: "Application",
                  difficulty: "Advanced",
                  explanation: "Use the Strategy pattern. Define an `ElevatorDispatcherStrategy` interface with method `selectElevator(Request r, List<Elevator> elevators)`. Concrete implementations (NearestCarStrategy, SCANStrategy) evaluate candidate elevators based on current direction and destination, decoupling dispatching logic from elevator hardware motor state."
                }
              ]
            }
          ]
        }
      ]
    }
  ]
};

