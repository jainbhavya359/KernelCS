import { CurriculumModule } from "../types";
import { topic1_1 } from "./topic1_1";
import { topic1_2 } from "./topic1_2";
import { topic1_3 } from "./topic1_3";
import { topic1_4 } from "./topic1_4";
import { topic1_5 } from "./topic1_5";
import { topic1_6 } from "./topic1_6";
import { topic1_7 } from "./topic1_7";
import { topic1_8 } from "./topic1_8";
import { topic1_9 } from "./topic1_9";
import { topic1_10 } from "./topic1_10";

export const osModule01: CurriculumModule = {
  id: "os-mod-1",
  title: "Module 01 — OS Fundamentals & Kernel Architecture",
  shortDescription: "Privilege rings, kernel vs shell, syscalls, traps, monolithic vs microkernels, and the booting pipeline.",
  detailedOverview: "Deconstruct how an operating system bootstraps hardware, manages transitions between unprivileged user code and privileged kernel ring 0, and structures core abstractions through traps and system call dispatchers.",
  difficulty: "Foundation",
  order: 1,
  interviewBenchmark: "Explain the exact CPU execution steps of a read() system call from user-space libc to kernel execution and return.",
  topics: [
    topic1_1,
    topic1_2,
    topic1_3,
    topic1_4,
    topic1_5,
    topic1_6,
    topic1_7,
    topic1_8,
    topic1_9,
    topic1_10
  ]
};
