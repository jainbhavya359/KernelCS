import { CurriculumTopic } from "../types";
import { module01Questions } from "./questions";

export const topic1_7: CurriculumTopic = {
  id: "os-topic-1-7",
  title: "Topic 1.7 — System Calls",
  description: "The definitive programmatic interface to the operating system: system calls vs function calls, ABI register conventions, dispatch tables, kernel entry/exit mechanics, and user pointer validation.",
  difficulty: "Foundation",
  estimatedHours: 4,
  learningObjectives: [
    "Deconstruct why user applications require system calls to interact with hardware and kernel services.",
    "Contrast an ordinary user-space function call against a privileged system call boundary crossing across performance and security.",
    "Explain the role of the C standard library (libc) as an ergonomic, POSIX-compliant wrapper around raw architecture traps.",
    "Trace system call argument passing via hardware registers according to the System V AMD64 ABI specification.",
    "Analyze the necessity and internal mechanics of kernel user-pointer validation (copy_from_user / copy_to_user) to prevent TOCTOU attacks."
  ],
  subtopics: [
    {
      id: "os-sub-1-7",
      title: "System Calls",
      description: "Rigorous first-principles exploration of the system call gateway: dispatching, argument marshalling, stack switching, and verification.",
      difficulty: "Foundation",
      keyTakeaways: [
        "A system call is an intentional software trap that transitions the CPU from unprivileged user mode (Ring 3) to privileged supervisor mode (Ring 0).",
        "System calls differ fundamentally from function calls: they switch CPU privilege, change stacks, invalidate caches, and require register validation.",
        "On x86-64, the syscall instruction loads %rip from MSR_LSTAR, saves user %rip in %rcx, and masks flags via MSR_SFMASK.",
        "System call arguments are passed in registers (%rdi, %rsi, %rdx, %r10, %r8, %r9) and the syscall number is passed in %rax.",
        "The kernel must NEVER dereference user pointers directly; it must validate addresses using copy_from_user() to prevent TOCTOU and kernel overwrite exploits."
      ],
      concepts: [
        "System Call Interface",
        "Software Trap (syscall / sysretq)",
        "System Call Dispatch Table (sys_call_table)",
        "System V AMD64 ABI Calling Convention",
        "Kernel Stack Isolation",
        "copy_from_user / copy_to_user"
      ],
      detailedExplanation: `In a modern protected operating system, user-space applications are strictly confined to their private virtual address spaces and forbidden from executing privileged hardware instructions.

Yet applications must perform I/O: they must read files from disks, transmit packets across the network, allocate memory from the OS, and create child processes.

How can an unprivileged program perform these privileged operations without violating the hardware security boundary?

The solution is the **System Call (Syscall)**.

A system call is a controlled, hardware-mediated doorway. It is an intentional software request that switches the CPU from **User Mode (Ring 3)** to **Kernel Mode (Ring 0)** at a strictly pre-registered kernel entry point.

Instead of allowing the application to execute I/O instructions directly, the application sets up its arguments in designated CPU registers, loads a numeric identifier (the **System Call Number**) into the accumulator register (\`%rax\`), and executes a specialized trap instruction (**\`syscall\` on x86-64**, **\`svc\` on ARM**, or **\`ecall\` on RISC-V**).

The CPU hardware immediately switches to supervisor mode, loads the kernel's trusted entry address, switches to a secure per-thread kernel stack, validates the arguments, indexes into the **\`sys_call_table\`**, executes the privileged kernel service routine, and safely drops back to user mode via **\`sysretq\`**.`,
      firstPrinciplesStepByStep: [
        "API Invocation: User application calls a high-level C library function (e.g., read(fd, buf, count)).",
        "Register Marshaling: The libc wrapper moves arguments into hardware registers (%rdi, %rsi, %rdx) and loads the syscall number into %rax.",
        "Hardware Trap: The wrapper issues the syscall instruction, causing the CPU to elevate CPL to 0 and jump to MSR_LSTAR.",
        "Stack & State Save: The kernel entry stub switches from the user stack to the thread's private kernel stack and saves callee registers.",
        "Dispatch & Execution: The kernel validates the syscall number, indexes into sys_call_table, checks user pointers, and executes the driver routine.",
        "Return Transition: The return value is stored in %rax, user registers are restored, and sysretq drops privilege back to Ring 3."
      ],
      architectureDiagram: {
        title: "The System Call Execution Pipeline",
        asciiArt: `USER SPACE (Ring 3)
1. Application Code calls read(fd, buffer, 1024)
         |
         v
2. libc Wrapper:
   mov $0, %rax       ; Syscall #0 for sys_read on x86-64
   mov %rdi, fd       ; Arg 1: File descriptor
   mov %rsi, buffer   ; Arg 2: User memory pointer
   mov %rdx, 1024     ; Arg 3: Byte count
   syscall            ; <--- HARDWARE TRAP!
=================================== PRIVILEGE BOUNDARY (Ring 3 -> Ring 0)
KERNEL SPACE (Ring 0)
3. Hardware elevates to Ring 0, saves %rip into %rcx, jumps to MSR_LSTAR (&entry_SYSCALL_64)
4. Kernel Entry Stub:
   swapgs             ; Switch to per-CPU kernel data
   mov %rsp, user_rsp ; Save untrusted user stack pointer
   mov kernel_rsp, %rsp; Switch to trusted, private KERNEL STACK!
   push %rcx, %r11... ; Save user register context
5. System Call Dispatcher:
   Verify (%rax < MAX_SYSCALL_NUMBER)
   Call sys_call_table[%rax] -> Jumps to ksys_read()
6. Kernel Service:
   Validate 'buffer' via access_ok()
   Read data from Page Cache / Storage Driver into 'buffer' via copy_to_user()
   Return bytes read in %rax
7. Kernel Exit Stub:
   Restore user registers
   sysretq            ; <--- Returns to Ring 3 at user %rcx!
=================================== PRIVILEGE BOUNDARY (Ring 0 -> Ring 3)
USER SPACE (Ring 3)
8. Execution resumes at the instruction immediately following 'syscall'`,
        caption: "Figure 1.19: Complete trace of a system call from user-space libc invocation to kernel execution and return."
      },
      questions: [
        module01Questions["os-q-5"],
        module01Questions["os-q-24"]
      ]
    }
  ],
  lessons: [
    {
      id: "os-les-1-7-1",
      title: "Why applications need system calls.",
      shortDescription: "Explore the necessity of system calls: how unprivileged applications safely request services from an authoritative, privileged operating system kernel.",
      difficulty: "Foundation",
      estimatedMinutes: 20,
      sourceAliases: ["checklist-1.7.1"],
      concepts: [
        "System Call Necessity",
        "Hardware Gateway",
        "Controlled Mediation",
        "Privilege Asymmetry",
        "Safe Resource Allocation"
      ],
      detailedExplanation: `As established in Topic 1.6, modern operating systems run user applications in unprivileged **User Mode (Ring 3)**.

In User Mode:
- Applications cannot execute I/O instructions (\`in\`, \`out\`).
- Applications cannot modify page tables or reload \`CR3\`.
- Applications cannot configure device controllers or DMA channels.
- Applications cannot directly communicate across network wires.

However, a program that cannot perform I/O is practically useless! A program that cannot read files, write to a terminal, open network sockets, or allocate memory can only heat up the room by spinning the CPU ALU on hardcoded register values.

**The System Call is the bridge that resolves this paradox.**

It allows an unprivileged program to say to the kernel:
> *"I do not possess the hardware privilege to write to the NVMe disk controller directly. Therefore, I respectfully request that YOU—the trusted supervisor—write these 500 bytes to the file 'report.txt' on my behalf."*

The kernel acts as a secure, authoritative proxy:
1. It intercepts the request.
2. It verifies the identity and authorization of the caller.
3. It validates that the parameters and memory pointers are safe and legal.
4. It carries out the privileged hardware operation.
5. It returns the result back to the caller.`,
      firstPrinciplesStepByStep: [
        "The Confinement: The CPU prevents user code from accessing hardware.",
        "The Utility Requirement: Meaningful software must interact with the external world.",
        "The Proxy Solution: The operating system kernel acts as a trusted proxy on behalf of applications.",
        "The Gateway Interface: System calls define the precise catalog of operations the proxy is willing to perform.",
        "Safe Execution: Hardware integrity is preserved because only verified, audited kernel code touches physical devices."
      ],
      sections: [
        {
          id: "sec-1-7-1-analogy",
          title: "1. The Passport Office Analogy",
          type: "intuition",
          content: `Consider obtaining a national passport:
You need a passport (an official document stamped with sovereign authority).
- You are not allowed to print your own passport at home on your inkjet printer; that is criminal forgery.
- You are not allowed to walk into the government printing press and operate the official stamping machines yourself.

Instead, you go to a **Passport Office Window** (the System Call):
1. You fill out an application form with specific parameters (your name, birthdate, photo).
2. You hand the form through the window to a government official (the kernel).
3. The official validates your identity, checks government databases, and verifies your eligibility.
4. If valid, the official uses the privileged stamping machines in the back room to create the passport.
5. The official hands the finished passport back to you through the window.

The system call is that government service window.`
        }
      ],
      keyTakeaways: [
        "Applications are restricted to unprivileged User Mode and cannot access hardware directly.",
        "A program without I/O is useless; system calls provide the safe mechanism to perform I/O.",
        "The kernel acts as an authoritative, trusted proxy executing privileged operations on behalf of applications.",
        "System calls enable multi-tenant safety by ensuring all hardware operations pass through kernel security checks."
      ],
      questions: [
        module01Questions["os-q-5"],
        module01Questions["os-q-24"]
      ]
    },

    {
      id: "os-les-1-7-2",
      title: "System call versus ordinary function call.",
      shortDescription: "Contrast an ordinary user-space C function call against a system call: privilege switches, stack changes, calling conventions, and microsecond latency costs.",
      difficulty: "Foundation",
      estimatedMinutes: 25,
      sourceAliases: ["checklist-1.7.2"],
      concepts: [
        "Function Call vs System Call",
        "Stack Switching",
        "Privilege Escalation",
        "Calling Convention ABI",
        "Performance Overhead"
      ],
      detailedExplanation: `To a beginner writing C code, invoking \`strlen()\` and invoking \`read()\` look virtually identical:
\`\`\`c
size_t len = strlen(str); // Ordinary function call
ssize_t n  = read(fd, buf, 1024); // System call
\`\`\`
Both use standard C syntax: function name, parentheses, arguments, and a return value.

However, beneath the surface of the compiler, **an ordinary function call and a system call are completely different universe of computing**.

### 1. Ordinary User-Space Function Call (\`strlen\`):
- **Privilege Level:** Stays entirely within **User Mode (Ring 3)**.
- **Stack:** Operates strictly on the **User Execution Stack**. It pushes arguments, executes a machine \`call\` instruction, pushes the 8-byte return address (\`%rip\`) onto the user stack, and decrements \`%rsp\`.
- **Hardware Interaction:** Zero. The CPU instruction pipeline executes uninterrupted at full silicon speed.
- **Latency Cost:** Takes **1 to 3 nanoseconds** (a handful of CPU clock cycles). Can be inlined entirely by modern optimizing compilers.

### 2. System Call (\`read\`):
- **Privilege Level:** Crosses the **Hardware Privilege Boundary from Ring 3 to Ring 0**.
- **Stack:** The CPU completely **abandons the user stack** and switches to the thread's private, isolated **Kernel Stack** to prevent corruption and stack overflow attacks.
- **Hardware Interaction:** The processor executes a hardware trap instruction (\`syscall\`). The CPU microcode alters status flags, saves the instruction pointer, masks interrupts, and vectors to a pre-registered supervisor handler.
- **Security Validation:** The kernel must rigorously validate all argument registers and verify that user memory pointers do not point into kernel space.
- **Latency Cost:** Takes **50 to 1,500 nanoseconds** (hundreds to thousands of clock cycles). It can never be inlined by a compiler.`,
      firstPrinciplesStepByStep: [
        "Compilation Phase: A function call compiles to a 'call' instruction; a system call compiles to register loading and a 'syscall' trap.",
        "Privilege Check: A function call keeps CPL unchanged; a system call elevates CPL from 3 to 0.",
        "Stack Replacement: A function call reuses the user stack; a system call switches the CPU stack pointer register to the kernel stack.",
        "Execution Context: A function call executes user code; a system call executes privileged kernel subsystem logic.",
        "Return Mechanics: A function call returns via 'ret'; a system call returns via privileged 'sysretq' or 'iretq'."
      ],
      sections: [
        {
          id: "sec-1-7-2-table",
          title: "1. Detailed Comparison Matrix",
          type: "diagram",
          content: `Contrasting the architectural properties of both call mechanisms:`,
          comparisonTable: {
            title: "Ordinary Function Call vs System Call",
            headers: ["Dimension", "Ordinary Function Call (e.g., strlen)", "System Call (e.g., read)"],
            rows: [
              ["Execution Mode", "Stays in User Mode (Ring 3)", "Transitions from Ring 3 to Ring 0 (Kernel)"],
              ["Stack Used", "User Execution Stack", "Switches to Thread's Private Kernel Stack"],
              ["CPU Instruction", "call <address> / ret", "syscall / sysretq (or int 0x80 / iret)"],
              ["Target Address", "Arbitrary user address determined at link time", "Strictly pre-registered kernel entry in MSR_LSTAR"],
              ["Security Checks", "None (trusts caller in same address space)", "Exhaustive argument and pointer validation"],
              ["Hardware Overhead", "~1 to 3 nanoseconds (few CPU cycles)", "~50 to 1,500+ nanoseconds (hundreds of cycles)"],
              ["Compiler Inlining", "Easily inlined by compiler (-O2/-O3)", "Cannot be inlined; must execute hardware trap"]
            ]
          }
        }
      ],
      keyTakeaways: [
        "An ordinary function call stays in User Mode on the user stack, costing ~1 to 3 nanoseconds.",
        "A system call switches privilege rings, switches to the kernel stack, and invokes the kernel, costing hundreds of nanoseconds.",
        "Function calls can be inlined by compilers; system calls must always execute a hardware trap instruction.",
        "The kernel stack switch is mandatory to prevent malicious or corrupted user stacks from crashing the supervisor."
      ],
      questions: []
    },

    {
      id: "os-les-1-7-3",
      title: "Library/API wrapper versus kernel system-call interface.",
      shortDescription: "Explore the C standard library (libc) as the intermediary: why programmers call printf() and malloc() rather than issuing raw syscall assembly instructions.",
      difficulty: "Foundation",
      estimatedMinutes: 20,
      sourceAliases: ["checklist-1.7.3"],
      concepts: [
        "C Standard Library (libc)",
        "System Call Wrapper",
        "POSIX API Standards",
        "Raw Syscall Assembly",
        "Portability Layer"
      ],
      detailedExplanation: `In almost all programming languages (C, C++, Rust, Python, Go, Java), software developers never write raw \`syscall\` assembly instructions directly.

Instead, developers write code against standard Application Programming Interfaces (APIs), such as the **C Standard Library (\`glibc\` on GNU/Linux, \`musl\` on Alpine, \`msvcrt\` on Windows)**.

Why does this library wrapper layer exist?

### 1. The Ergonomic & ABI Problem:
A raw system call in x86-64 assembly requires manual register choreography:
\`\`\`assembly
; Raw system call to write(1, "Hi\\n", 3)
mov $1, %rax        ; Syscall number for sys_write
mov $1, %rdi        ; FD 1 (stdout)
mov $message, %rsi  ; Memory buffer address
mov $3, %rdx        ; Byte count
syscall             ; Execute trap
\`\`\`
If programmers had to write inline assembly every time they printed a string or read a file, software development would be unmaintainable. The C library provides a clean C function signature:
\`\`\`c
ssize_t write(int fd, const void *buf, size_t count);
\`\`\`
The C library wrapper function internally places \`fd\` into \`%rdi\`, \`buf\` into \`%rsi\`, \`count\` into \`%rdx\`, moves \`$1\` into \`%rax\`, and issues the \`syscall\` instruction.

### 2. Error Code Translation (\`errno\`):
When a raw kernel system call fails, the Linux kernel returns a negative error number in the \`%rax\` register (e.g., \`-13\` for \`-EACCES\`, Permission Denied).
The C library wrapper intercepts this negative return value:
- It negates the number back to a positive integer (\`13\`).
- It stores it in the thread-local global variable **\`errno\`**.
- It returns **\`-1\`** to the caller to signal an error in standard POSIX style.

### 3. Buffering and Performance Optimization:
Many standard library functions exist precisely to **avoid making system calls**!
- Making 10,000 system calls to write 1 byte each time (\`write(fd, &c, 1)\`) is agonizingly slow because of system call context-switch overhead.
- The standard I/O library (\`stdio.h\`) provides **\`fwrite()\` and \`fputc()\`**, which buffer bytes in a 4 KB user-space buffer in RAM. Only when the 4 KB buffer is full does \`fwrite()\` issue a single, efficient \`write()\` system call to the kernel!`,
      firstPrinciplesStepByStep: [
        "Application Call: Application invokes a high-level library API (e.g., fopen or printf).",
        "User Buffering: The library buffers data in user-space memory caches to minimize kernel transitions.",
        "Wrapper Invocation: When flush or I/O is required, the library calls its low-level wrapper (e.g., write).",
        "Register Marshaling: The assembly stub moves arguments into architecture-specific ABI registers.",
        "Error Unwrapping: The wrapper inspects the kernel return code, sets errno if negative, and returns to user code."
      ],
      sections: [
        {
          id: "sec-1-7-3-wrapper",
          title: "1. Deconstructing the glibc write() Wrapper Assembly",
          type: "mechanism",
          content: `Here is what the compiled \`write()\` wrapper inside \`libc.so\` looks like in disassembled machine code:
\`\`\`assembly
__write:
    mov    $0x1, %eax         ; Load __NR_write (syscall number 1) into %rax
    syscall                   ; Issue hardware trap to Linux kernel
    cmp    $0xfffffffffffff001, %rax ; Check if return is in error range (-4095 to -1)
    jae    __syscall_error    ; If error, jump to errno handler
    ret                       ; Return bytes written successfully

__syscall_error:
    neg    %rax               ; Convert negative error (e.g., -13) to positive (13)
    mov    %rax, %fs:errno    ; Store 13 into thread-local 'errno' variable
    mov    $0xffffffffffffffff, %rax ; Return -1 to caller
    ret
\`\`\`
Every standard POSIX I/O function in C executes this exact sequence.`
        }
      ],
      keyTakeaways: [
        "Developers interact with C library wrappers (libc) rather than writing raw syscall assembly.",
        "The wrapper marshals C function arguments into specific hardware CPU registers.",
        "The wrapper translates kernel negative return values into the standard POSIX errno variable and returns -1.",
        "High-level library functions (like printf and fwrite) buffer data in user space to avoid excessive system call overhead."
      ],
      questions: []
    },

    {
      id: "os-les-1-7-4",
      title: "System-call number and argument passing.",
      shortDescription: "Study the System V AMD64 ABI calling convention: syscall numbers in %rax, argument registers (%rdi, %rsi, %rdx, %r10, %r8, %r9), and register clobbering.",
      difficulty: "Foundation",
      estimatedMinutes: 20,
      sourceAliases: ["checklist-1.7.4"],
      concepts: [
        "System Call Number",
        "System V AMD64 ABI",
        "Syscall Argument Registers",
        "Register Clobbering (%rcx, %r11)",
        "Maximum Argument Limits"
      ],
      detailedExplanation: `When user space commands the kernel, how does the kernel know *which* of its 400+ system calls the user wants to execute? And where are the parameters stored?

The answer is governed by the **Operating System Application Binary Interface (ABI)**.

On modern 64-bit Linux running on x86-64 hardware, argument passing follows the **System V AMD64 ABI specification**.

### 1. The System Call Number (\`%rax\`):
Every system call in the Linux kernel is assigned a unique, immutable integer index:
- \`0\` = \`sys_read\`
- \`1\` = \`sys_write\`
- \`2\` = \`sys_open\`
- \`3\` = \`sys_close\`
- \`57\` = \`sys_fork\`
- \`59\` = \`sys_execve\`

Before executing the \`syscall\` instruction, the user program **must load the syscall number into the \`%rax\` register**.

### 2. Argument Passing in Hardware Registers:
Unlike legacy 32-bit systems where arguments were pushed onto the stack, modern 64-bit systems pass up to **six arguments strictly in hardware CPU registers**:

| Argument Order | User Function Call Register | Kernel System Call Register |
| :--- | :--- | :--- |
| **System Call #** | N/A | **\`%rax\`** |
| **Argument 1** | \`%rdi\` | **\`%rdi\`** |
| **Argument 2** | \`%rsi\` | **\`%rsi\`** |
| **Argument 3** | \`%rdx\` | **\`%rdx\`** |
| **Argument 4** | \`%rcx\` | **\`%r10\` (Notice the difference!)** |
| **Argument 5** | \`%r8\` | **\`%r8\`** |
| **Argument 6** | \`%r9\` | **\`%r9\`** |
| **Return Value** | \`%rax\` | **\`%rax\`** |

### Why is Argument 4 Passed in \`%r10\` Instead of \`%rcx\`?
Notice that in an ordinary user-space function call, the 4th argument is passed in \`%rcx\`. But in a system call, it **must be moved to \`%r10\`**!
Why?
**Because the x86-64 \`syscall\` hardware instruction itself clobbers \`%rcx\`!**
When the CPU executes \`syscall\`, the processor hardware automatically saves the user's return instruction pointer (\`%rip\`) into \`%rcx\`, and saves the user's \`RFLAGS\` into \`%r11\`. If the 4th argument remained in \`%rcx\`, the hardware would overwrite the argument before the kernel could read it!`,
      firstPrinciplesStepByStep: [
        "Syscall Number Assignment: The kernel defines unchangeable integer IDs in arch/x86/entry/syscalls/syscall_64.tbl.",
        "Register Population: User code loads %rax with the ID, and loads parameters into %rdi, %rsi, %rdx, %r10, %r8, %r9.",
        "Hardware Trap Execution: The 'syscall' instruction saves user %rip into %rcx, user RFLAGS into %r11, and drops into Ring 0.",
        "Table Dispatch: The kernel checks if %rax < NR_syscalls, then calls sys_call_table[%rax](%rdi, %rsi, %rdx, %r10, %r8, %r9).",
        "Return Value Delivery: The kernel places the result in %rax and returns via sysretq."
      ],
      sections: [
        {
          id: "sec-1-7-4-abi",
          title: "1. The 6-Argument Hard Ceiling",
          type: "definition",
          content: `Notice that the System V AMD64 ABI defines exactly 6 argument registers (\`%rdi, %rsi, %rdx, %r10, %r8, %r9\`).
What happens if a complex system call needs 15 parameters (such as configuring a network socket or mounting a complex filesystem)?

The kernel cannot pass 15 arguments in registers, and passing arguments on the user stack is dangerous and slow.
**The Kernel Solution: Struct Pointers.**
The application bundles the 15 parameters into a C \`struct\` in user memory, and passes **a single 64-bit pointer** to that struct as Argument 1 in \`%rdi\`. The kernel then copies the entire struct across the boundary safely using \`copy_from_user()\`.`
        }
      ],
      keyTakeaways: [
        "The system call number is passed in the %rax register.",
        "Arguments 1 through 6 are passed in %rdi, %rsi, %rdx, %r10, %r8, and %r9.",
        "Argument 4 uses %r10 because the hardware 'syscall' instruction overwrites %rcx with the return %rip.",
        "The kernel returns results or negative error codes in the %rax register."
      ],
      questions: []
    },

    {
      id: "os-les-1-7-5",
      title: "Entry into the kernel, service execution and return to user space.",
      shortDescription: "Trace the exact hardware mechanics of entering the kernel via syscall, kernel stack switching (swapgs), sys_call_table indexing, and returning via sysretq.",
      difficulty: "Foundation",
      estimatedMinutes: 25,
      sourceAliases: ["checklist-1.7.5"],
      concepts: [
        "MSR_LSTAR",
        "swapgs Instruction",
        "Kernel Stack Switch",
        "sys_call_table",
        "sysretq Instruction"
      ],
      detailedExplanation: `On modern 64-bit x86 processors, the legacy software interrupt mechanism (\`int 0x80\`) has been completely replaced by the high-speed **\`syscall\` / \`sysretq\` instruction pair**.

Let us trace the exact hardware and software execution flow from the moment \`syscall\` executes in user space to the moment \`sysretq\` returns.

### Step 1: The \`syscall\` Hardware Microcode
When the CPU executes \`syscall\` in Ring 3:
1. The CPU copies the current instruction pointer (\`%rip\`) into **\`%rcx\`** (saving the user return address).
2. The CPU copies the current \`RFLAGS\` into **\`%r11\`**.
3. The CPU masks \`RFLAGS\` using the value stored in the **\`MSR_SFMASK\`** register (automatically disabling interrupts).
4. The CPU loads the target instruction pointer (\`%rip\`) from the **\`MSR_LSTAR\` (Long System Target Address Register)**. The kernel wrote the address of \`entry_SYSCALL_64\` into this MSR during boot!
5. The CPU sets the Current Privilege Level: **\`CPL = 0\` (Kernel Mode)**.
6. The CPU begins executing kernel instructions at \`entry_SYSCALL_64\`.

### Step 2: The Kernel Entry Assembly (\`entry_SYSCALL_64\`)
The CPU is now in Ring 0, but notice a severe problem: **the stack pointer (\`%rsp\`) is still pointing to the untrusted user stack in user memory!**
The kernel cannot execute C code yet. It executes tight assembly:
\`\`\`assembly
entry_SYSCALL_64:
    swapgs                      ; 1. Swap GS register to point to per-CPU kernel data
    movq %rsp, %gs:user_rsp_save; 2. Save untrusted user stack pointer
    movq %gs:cpu_kernel_stack, %rsp ; 3. LOAD TRUSTED KERNEL STACK!

    ; 4. Construct a pt_regs frame on the kernel stack
    pushq %gs:user_rsp_save     ; Save old user %rsp
    pushq %r11                  ; Save old user RFLAGS
    pushq %rcx                  ; Save old user %rip
    pushq %rax                  ; Save syscall number
    pushq %rdi                  ; Save Arg 1
    pushq %rsi                  ; Save Arg 2
    pushq %rdx                  ; Save Arg 3
    pushq %r10                  ; Save Arg 4
    pushq %r8                   ; Save Arg 5
    pushq %r9                   ; Save Arg 6
\`\`\`

### Step 3: Dispatching via \`sys_call_table\`
The kernel now has a secure stack and full register preservation.
1. The kernel checks whether the syscall number in \`%rax\` is within bounds:
   \`\`\`assembly
   cmpq $__NR_syscall_max, %rax
   ja invalid_syscall
   \`\`\`
2. The kernel invokes the C service function by indexing into the master array of function pointers:
   \`\`\`assembly
   call *sys_call_table(, %rax, 8)
   \`\`\`
3. The C implementation (e.g., \`__x64_sys_read\`) executes. It runs filesystem logic, device driver code, and places its return value into **\`%rax\`**.

### Step 4: The \`sysretq\` Return to User Space
1. The kernel pops the saved registers from the kernel stack.
2. It restores the user stack pointer:
   \`\`\`assembly
   movq %gs:user_rsp_save, %rsp
   swapgs                      ; Restore user GS register
   sysretq                     ; DROP PRIVILEGE AND RETURN!
   \`\`\`
3. The hardware \`sysretq\` instruction:
   - Sets \`CPL = 3\` (User Mode).
   - Copies \`%rcx\` back into **\`%rip\`** (resuming user execution).
   - Copies \`%r11\` back into **\`RFLAGS\`**.
4. The user program continues executing with the result sitting in \`%rax\`!`,
      firstPrinciplesStepByStep: [
        "MSR_LSTAR Jump: Hardware executes syscall, saves %rip into %rcx, and jumps to MSR_LSTAR in Ring 0.",
        "swapgs Execution: Kernel swaps GS register to access per-CPU private structures.",
        "Kernel Stack Switch: The kernel saves the user %rsp and loads its dedicated, secure per-thread kernel stack pointer.",
        "pt_regs Construction: All user registers are pushed onto the kernel stack to create a snapshot of user state.",
        "Table Dispatch: The kernel indexes sys_call_table[%rax] and invokes the C service function.",
        "sysretq Exit: User registers are restored, the stack pointer returns to user stack, and sysretq drops privilege to Ring 3."
      ],
      sections: [
        {
          id: "sec-1-7-5-diagram",
          title: "1. The swapgs and Stack Switch Mechanism",
          type: "diagram",
          content: `Visualizing how the kernel safely switches stacks upon syscall entry:`,
          architectureDiagram: {
            title: "Kernel Stack Switch on Syscall Ingress",
            asciiArt: `STEP 1: User executes 'syscall'
   CPU %rsp points to: [ USER STACK (Untrusted!) ]
   CPU %rip jumps to:  MSR_LSTAR (&entry_SYSCALL_64 in Ring 0)

STEP 2: Kernel executes 'swapgs' & stack switch
   %gs:user_rsp_save <--- %rsp (User stack pointer safely stashed)
   %rsp <--- %gs:cpu_kernel_stack (Trusted, pre-allocated KERNEL STACK!)

STEP 3: Kernel pushes pt_regs onto KERNEL STACK
   +------------------------------------+
   | Saved User %rsp                    |
   | Saved User %r11 (RFLAGS)           |
   | Saved User %rcx (User %rip)        |
   | Saved %rdi, %rsi, %rdx, %r10...    |
   +------------------------------------+ <-- Current %rsp in Ring 0`,
            caption: "Figure 1.20: The critical swapgs and stack-switching sequence that guarantees kernel execution safety."
          }
        }
      ],
      keyTakeaways: [
        "The x86-64 syscall instruction vectors to the address stored in MSR_LSTAR without consulting the IDT.",
        "The hardware automatically saves user %rip into %rcx and RFLAGS into %r11.",
        "The kernel immediately executes swapgs and switches from the untrusted user stack to a private kernel stack.",
        "The kernel indexes sys_call_table using the number in %rax, executes the service, and returns via sysretq."
      ],
      questions: []
    },

    {
      id: "os-les-1-7-6",
      title: "Examples: `read`, `write`, `open`, `close`, `fork` and `exec` (platform context must be stated).",
      shortDescription: "Examine the canonical POSIX systems programming primitives: signatures, file descriptor semantics, copy-on-write fork, and execve address space replacement.",
      difficulty: "Foundation",
      estimatedMinutes: 25,
      sourceAliases: ["checklist-1.7.6"],
      concepts: [
        "POSIX System Calls",
        "File Descriptors",
        "read() and write()",
        "open() and close()",
        "fork() vs execve()"
      ],
      detailedExplanation: `In POSIX systems (Linux, macOS, BSD), all systems programming is anchored on a small handful of core system calls.

Understanding their precise signatures, operational semantics, and kernel behaviors is mandatory for systems engineering.

### 1. \`open()\` and \`close()\`
\`\`\`c
int open(const char *pathname, int flags, mode_t mode);
int close(int fd);
\`\`\`
- **Semantics:** \`open()\` traverses the directory tree, locates or creates an inode, checks permissions, and allocates an entry in the process's **File Descriptor Table**.
- Returns a non-negative integer called a **File Descriptor (FD)** (e.g., 3, 4, 5). FDs 0, 1, and 2 are pre-allocated at process launch for \`stdin\`, \`stdout\`, and \`stderr\`.
- \`close()\` decrements the inode's in-memory reference counter (\`i_count\`) and frees the integer descriptor for reuse.

### 2. \`read()\` and \`write()\`
\`\`\`c
ssize_t read(int fd, void *buf, size_t count);
ssize_t write(int fd, const void *buf, size_t count);
\`\`\`
- **Semantics:** Reads/writes up to \`count\` bytes from the open file description's current offset pointer into or from the user memory buffer \`buf\`.
- Both return the **actual number of bytes transferred** (which may be less than \`count\` if reading from a socket or reaching End-Of-File).
- Returns \`0\` on \`read()\` to signal **EOF (End-Of-File)**.
- Returns \`-1\` on error with \`errno\` set.

### 3. \`fork()\`
\`\`\`c
pid_t fork(void);
\`\`\`
- **Semantics:** Clones the calling process to create an exact duplicate child process.
- **The Magic of Fork:** It is called once, but **returns twice**!
  - In the **Parent Process**: \`fork()\` returns the newly created **Child's PID** (a positive integer).
  - In the **Child Process**: \`fork()\` returns **\`0\`**.
  - On failure: Returns \`-1\` to the parent; no child is created.
- Modern kernels use **Copy-On-Write (COW)**: physical memory frames are shared read-only between parent and child until one of them modifies a page.

### 4. \`execve()\`
\`\`\`c
int execve(const char *pathname, char *const argv[], char *const envp[]);
\`\`\`
- **Semantics:** Replaces the current process's entire address space with a new program loaded from an ELF binary on disk.
- If successful, **\`execve()\` NEVER RETURNS!** The calling program code is completely obliterated and replaced by the new binary's \`_start\` routine.
- It only returns \`-1\` if execution fails (e.g., file not found or permission denied).`,
      firstPrinciplesStepByStep: [
        "Resource Open: open() allocates an integer index in the process's file descriptor table pointing to an open file description.",
        "Stream Transfer: read() and write() move bytes across the kernel Page Cache and user memory buffers.",
        "Resource Close: close() removes the descriptor table entry and decrements VFS reference counts.",
        "Process Cloning: fork() creates an identical task_struct with cloned page tables under Copy-On-Write.",
        "Program Replacement: execve() tears down existing virtual address space, loads a new ELF binary, and jumps to its entry point."
      ],
      sections: [
        {
          id: "sec-1-7-6-code",
          title: "1. The Canonical Fork-Exec Pattern in C",
          type: "example",
          content: `The universal pattern used by shells and process managers to spawn programs:`,
          codeSnippet: {
            language: "c",
            code: `#include <stdio.h>
#include <stdlib.h>
#include <unistd.h>
#include <sys/wait.h>

int main() {
    printf("Parent PID: %d\\n", getpid());

    pid_t pid = fork(); // 1. Clone process

    if (pid < 0) {
        perror("fork failed");
        exit(1);
    } else if (pid == 0) {
        // --- CHILD PROCESS ---
        printf("Child PID: %d executing 'ls -l'...\\n", getpid());
        char *args[] = { "ls", "-l", NULL };
        execvp("ls", args); // 2. Replace address space!
        
        // This line is ONLY reached if execvp fails!
        perror("execvp failed");
        exit(1);
    } else {
        // --- PARENT PROCESS ---
        printf("Parent waiting for child PID %d to finish...\\n", pid);
        int status;
        waitpid(pid, &status, 0); // 3. Block until child exits
        if (WIFEXITED(status)) {
            printf("Child exited cleanly with code: %d\\n", WEXITSTATUS(status));
        }
    }
    return 0;
}`,
            explanation: "Demonstration of the fundamental UNIX fork-exec-wait lifecycle in C."
          }
        }
      ],
      keyTakeaways: [
        "open() and close() manage integer file descriptors indexing into the kernel's file table.",
        "read() and write() transfer streams of bytes; read() returns 0 to signal End-Of-File (EOF).",
        "fork() duplicates a process using Copy-On-Write, returning the child PID to the parent and 0 to the child.",
        "execve() replaces the current process address space with a new program; it never returns on success."
      ],
      questions: []
    },

    {
      id: "os-les-1-7-7",
      title: "User-pointer validation and safe data transfer.",
      shortDescription: "Master kernel memory safety: why direct user pointer dereferencing causes catastrophic security vulnerabilities, and how copy_from_user() prevents TOCTOU exploits.",
      difficulty: "Foundation",
      estimatedMinutes: 25,
      sourceAliases: ["checklist-1.7.7"],
      concepts: [
        "User-Pointer Validation",
        "Kernel Address Overwrite",
        "Time-of-Check to Time-of-Use (TOCTOU)",
        "copy_from_user() / copy_to_user()",
        "Supervisor Mode Access Prevention (SMAP)"
      ],
      detailedExplanation: `When an application issues a system call like \`read(fd, buf, 1024)\`, it passes a memory pointer (\`void *buf\`) in the \`%rsi\` register.

When execution enters the kernel in Ring 0, the CPU has supervisor privileges. It can read and write to **any** memory address in the system.

What happens if the kernel naive implementation does this?
\`\`\`c
// NAIVE, VULNERABLE KERNEL CODE:
long sys_read(int fd, char *buf, size_t count) {
    // Directly dereferencing the user pointer!
    for (size_t i = 0; i < count; i++) {
        buf[i] = read_byte_from_disk(fd); // CATASTROPHIC BUG!
    }
}
\`\`\`

If a kernel ever dereferences a user-supplied pointer directly, the entire operating system can be compromised through two classic attack vectors:

### Attack Vector 1: The Kernel Memory Overwrite Attack
A malicious user process calls:
\`\`\`c
// 0xFFFF_FFFF_8100_0000 is the address of the kernel code in supervisor memory!
read(fd, (char *)0xFFFFFFFF81000000, 1024);
\`\`\`
Because the kernel runs in Ring 0, the MMU checks the User/Supervisor bit and says: *"CPU is in Ring 0; write permitted!"*
The kernel happily reads bytes from the file and **overwrites its own internal code segments**, granting the attacker instant, complete root escalation!

### Attack Vector 2: Time-of-Check to Time-of-Use (TOCTOU) Race
Suppose the kernel checks if a pointer is valid, and then uses it:
1. Thread 1 in user space passes pointer \`P\`.
2. The kernel checks: "Is \`P\` in valid user space?" -> Yes.
3. Before the kernel reads \`*P\`, Thread 2 running concurrently on another CPU core unmaps \`P\` or points it to kernel memory!
4. The kernel reads \`*P\` assuming it is still valid, triggering a kernel panic.

### The Solution: \`copy_from_user()\` and \`copy_to_user()\`
In the Linux kernel, developers are strictly forbidden from dereferencing user pointers directly.
All data transfers must go through specialized, assembly-optimized validation routines:
\`\`\`c
unsigned long copy_from_user(void *to_kernel, const void __user *from_user, unsigned long n);
unsigned long copy_to_user(void __user *to_user, const void *from_kernel, unsigned long n);
\`\`\`
These functions perform three critical checks:
1. **Range Validation (\`access_ok\`):** Verifies mathematically that \`from_user + n\` does not cross into the upper-half kernel address territory.
2. **Page Fault Exception Table (\`__ex_table\`):** If the user pointer points to unmapped memory, a normal dereference would trigger a fatal kernel panic. \`copy_from_user\` uses special CPU exception table fixups: if a fault occurs during the copy, the CPU catches it, aborts the copy, and returns \`-EFAULT\` cleanly to user space without crashing the kernel!
3. **Hardware SMAP (Supervisor Mode Access Prevention):** Modern Intel/AMD CPUs enforce **SMAP**. If Ring 0 code attempts to read user-space memory without explicitly issuing the \`stac\` (Set AC flag) instruction, the CPU hardware generates a fault, catching rogue kernel pointer dereferences instantly.`,
      firstPrinciplesStepByStep: [
        "Untrusted Ingress: A user process passes a virtual memory pointer into a system call register.",
        "Range Check: The kernel calls access_ok() to verify the pointer is strictly in the user lower-half address space.",
        "Hardware SMAP Toggle: The kernel executes the stac instruction to temporarily allow supervisor access to user pages.",
        "Fault-Protected Copy: The kernel copies data byte-by-byte using assembly routines registered in the kernel exception table (__ex_table).",
        "Graceful Recovery: If user memory faults, the exception handler catches it and returns -EFAULT without crashing the kernel.",
        "SMAP Lock: The kernel executes clac to re-lock supervisor access before processing the data."
      ],
      sections: [
        {
          id: "sec-1-7-7-exploit",
          title: "1. The Anatomy of a Confused Deputy Kernel Exploit",
          type: "tradeoffs",
          content: `In computer security, this vulnerability is known as the **Confused Deputy Attack**:
- The user process does not have permission to write to kernel memory.
- But the user process tricks a privileged entity (the kernel \`sys_read\` routine) into writing to kernel memory on its behalf!

By enforcing \`copy_from_user()\` and hardware SMAP, the operating system guarantees that privileged supervisor instructions can never be weaponized against the kernel's own memory.`
        }
      ],
      keyTakeaways: [
        "The kernel must NEVER dereference user-supplied memory pointers directly.",
        "Direct dereferencing allows attackers to trick the kernel into overwriting supervisor memory.",
        "copy_from_user() and copy_to_user() perform strict address boundary checks and fault-protected copies.",
        "Hardware SMAP (Supervisor Mode Access Prevention) forces CPU faults if kernel code reads user memory without explicit authorization."
      ],
      questions: []
    }
  ]
};
