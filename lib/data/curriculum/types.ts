export type DifficultyLevel = "Foundation" | "Intermediate" | "Advanced";

export type QuestionType = 
  | "Conceptual" 
  | "Application" 
  | "Analytical" 
  | "Interview" 
  | "FollowUp" 
  | "Practical";

export interface CurriculumQuestion {
  id: string;
  statement: string;
  type: QuestionType;
  difficulty: DifficultyLevel;
  hints?: string[];
  explanation: string;
  expectedOutcome?: string;
  codeSnippet?: string;
  relatedConceptIds?: string[];
}

export interface CurriculumSubtopic {
  id: string;
  title: string;
  description: string;
  difficulty: DifficultyLevel;
  keyTakeaways: string[];
  engineeringContext?: string;
  concepts: string[];
  questions: CurriculumQuestion[];
}

export interface CurriculumTopic {
  id: string;
  title: string;
  description: string;
  difficulty: DifficultyLevel;
  estimatedHours?: number;
  prerequisites?: string[];
  learningObjectives: string[];
  subtopics: CurriculumSubtopic[];
}

export interface CurriculumModule {
  id: string;
  title: string;
  shortDescription: string;
  detailedOverview: string;
  difficulty: DifficultyLevel;
  order: number;
  prerequisites?: string[];
  topics: CurriculumTopic[];
  interviewBenchmark?: string;
}

export interface CurriculumSubject {
  id: string;
  name: string;
  shortName: string;
  category: "core-systems" | "algorithms" | "infrastructure" | "architecture-tools";
  description: string;
  longDescription: string;
  accentColor: string;
  borderColor: string;
  badgeBg: string;
  iconName: string;
  coreQuestion: string;
  prerequisites: string[];
  learningOutcomes: string[];
  keyMechanisms: string[];
  modules: CurriculumModule[];
}

export interface PathwayStep {
  stepNumber: number;
  subjectId: string;
  subjectName: string;
  moduleIds: string[];
  moduleTitles: string[];
  focus: string;
  milestoneProject: string;
}

export interface LearningPathway {
  id: string;
  title: string;
  badge: string;
  tagline: string;
  targetAudience: string;
  estimatedWeeks: number;
  steps: PathwayStep[];
}

// Backward Compatibility Interface matching existing components
export interface SubjectModuleLegacy {
  id: string;
  title: string;
  topicsCount: number;
  interactiveLabs: number;
  concepts: string[];
  interviewBenchmark: string;
  topics?: CurriculumTopic[]; // Optional rich link
}

export interface SubjectLegacy {
  id: string;
  name: string;
  shortName: string;
  category: "core-systems" | "algorithms" | "infrastructure" | "architecture-tools";
  description: string;
  longDescription: string;
  accentColor: string;
  borderColor: string;
  badgeBg: string;
  topicsCount: number;
  modulesCount: number;
  labsCount: number;
  interviewQuestionsCount: number;
  coreQuestion: string;
  iconName: string;
  modules: SubjectModuleLegacy[];
  keyMechanisms: string[];
  prerequisites?: string[];
  learningOutcomes?: string[];
  richModules?: CurriculumModule[];
}

/**
 * Adapter converting a rich CurriculumSubject into the Subject structure
 * consumed by existing homepage and modal components.
 */
export function adaptCurriculumSubject(cs: CurriculumSubject): SubjectLegacy {
  let totalTopics = 0;
  let totalQuestions = 0;

  const legacyModules: SubjectModuleLegacy[] = cs.modules.map((m) => {
    totalTopics += m.topics.length;
    const allConcepts: string[] = [];

    m.topics.forEach((t) => {
      t.subtopics.forEach((s) => {
        totalQuestions += s.questions.length;
        s.concepts.forEach((c) => {
          if (!allConcepts.includes(c)) allConcepts.push(c);
        });
      });
    });

    return {
      id: m.id,
      title: m.title,
      topicsCount: m.topics.length,
      interactiveLabs: Math.max(1, Math.floor(m.topics.length / 2)),
      concepts: allConcepts.slice(0, 6),
      interviewBenchmark: m.interviewBenchmark || `Mastering core invariants of ${m.title}`,
      topics: m.topics,
    };
  });

  return {
    id: cs.id,
    name: cs.name,
    shortName: cs.shortName,
    category: cs.category,
    description: cs.description,
    longDescription: cs.longDescription,
    accentColor: cs.accentColor,
    borderColor: cs.borderColor,
    badgeBg: cs.badgeBg,
    topicsCount: totalTopics,
    modulesCount: cs.modules.length,
    labsCount: Math.ceil(totalTopics / 2),
    interviewQuestionsCount: Math.max(totalQuestions, 10),
    coreQuestion: cs.coreQuestion,
    iconName: cs.iconName,
    modules: legacyModules,
    keyMechanisms: cs.keyMechanisms,
    prerequisites: cs.prerequisites,
    learningOutcomes: cs.learningOutcomes,
    richModules: cs.modules,
  };
}

