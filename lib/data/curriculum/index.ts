import { CurriculumSubject, CurriculumModule, CurriculumQuestion, CurriculumTopic } from './types';
import { osCurriculum } from './osCurriculum';
import { dbmsCurriculum } from './dbmsCurriculum';
import { cnCurriculum } from './cnCurriculum';
import { oopCurriculum } from './oopCurriculum';
import { dsaCurriculum } from './dsaCurriculum';
import { sysdesignCurriculum } from './sysdesignCurriculum';
import { gitCurriculum } from './gitCurriculum';
import { architectureCurriculum } from './architectureCurriculum';
import { LEARNING_PATHWAYS } from './pathways';

export * from './types';
export * from './pathways';
export {
  osCurriculum,
  dbmsCurriculum,
  cnCurriculum,
  oopCurriculum,
  dsaCurriculum,
  sysdesignCurriculum,
  gitCurriculum,
  architectureCurriculum
};

export const CURRICULUM_SUBJECTS: CurriculumSubject[] = [
  osCurriculum,
  dbmsCurriculum,
  cnCurriculum,
  oopCurriculum,
  dsaCurriculum,
  sysdesignCurriculum,
  gitCurriculum,
  architectureCurriculum
];

export const CURRICULUM_SUBJECTS_MAP: Record<string, CurriculumSubject> = {
  os: osCurriculum,
  dbms: dbmsCurriculum,
  cn: cnCurriculum,
  oop: oopCurriculum,
  dsa: dsaCurriculum,
  sysdesign: sysdesignCurriculum,
  git: gitCurriculum,
  architecture: architectureCurriculum
};

export function getCurriculumSubjectById(id: string): CurriculumSubject | undefined {
  return CURRICULUM_SUBJECTS_MAP[id];
}

export function getAllCurriculumModules(): (CurriculumModule & { subjectId: string; subjectName: string })[] {
  return CURRICULUM_SUBJECTS.flatMap((subject) =>
    subject.modules.map((mod) => ({
      ...mod,
      subjectId: subject.id,
      subjectName: subject.name
    }))
  );
}

export function getAllCurriculumQuestions(): {
  subjectId: string;
  subjectName: string;
  moduleId: string;
  moduleName: string;
  topicId: string;
  topicName: string;
  question: CurriculumQuestion;
}[] {
  const result: {
    subjectId: string;
    subjectName: string;
    moduleId: string;
    moduleName: string;
    topicId: string;
    topicName: string;
    question: CurriculumQuestion;
  }[] = [];

  for (const subject of CURRICULUM_SUBJECTS) {
    for (const mod of subject.modules) {
      for (const topic of mod.topics) {
        for (const sub of topic.subtopics) {
          for (const q of sub.questions) {
            result.push({
              subjectId: subject.id,
              subjectName: subject.name,
              moduleId: mod.id,
              moduleName: mod.title,
              topicId: topic.id,
              topicName: topic.title,
              question: q
            });
          }
        }
      }
    }
  }

  return result;
}

export function getQuestionsForSubject(subjectId: string): {
  moduleId: string;
  moduleName: string;
  topicId: string;
  topicName: string;
  question: CurriculumQuestion;
}[] {
  const subject = getCurriculumSubjectById(subjectId);
  if (!subject) return [];

  const result: {
    moduleId: string;
    moduleName: string;
    topicId: string;
    topicName: string;
    question: CurriculumQuestion;
  }[] = [];

  for (const mod of subject.modules) {
    for (const topic of mod.topics) {
      for (const sub of topic.subtopics) {
        for (const q of sub.questions) {
          result.push({
            moduleId: mod.id,
            moduleName: mod.title,
            topicId: topic.id,
            topicName: topic.title,
            question: q
          });
        }
      }
    }
  }

  return result;
}

export function searchCurriculum(query: string): {
  matchingTopics: { subject: CurriculumSubject; module: CurriculumModule; topic: CurriculumTopic }[];
  matchingQuestions: { subject: CurriculumSubject; topic: CurriculumTopic; question: CurriculumQuestion }[];
} {
  const clean = query.trim().toLowerCase();
  if (!clean) return { matchingTopics: [], matchingQuestions: [] };

  const matchingTopics: { subject: CurriculumSubject; module: CurriculumModule; topic: CurriculumTopic }[] = [];
  const matchingQuestions: { subject: CurriculumSubject; topic: CurriculumTopic; question: CurriculumQuestion }[] = [];

  for (const subject of CURRICULUM_SUBJECTS) {
    for (const mod of subject.modules) {
      for (const topic of mod.topics) {
        const topicMatches =
          topic.title.toLowerCase().includes(clean) ||
          topic.description.toLowerCase().includes(clean) ||
          topic.subtopics.some(
            (s) =>
              s.title.toLowerCase().includes(clean) ||
              s.description.toLowerCase().includes(clean) ||
              s.concepts.some((c: string) => c.toLowerCase().includes(clean)) ||
              s.keyTakeaways.some((k: string) => k.toLowerCase().includes(clean))
          );

        if (topicMatches) {
          matchingTopics.push({ subject, module: mod, topic });
        }

        for (const sub of topic.subtopics) {
          for (const q of sub.questions) {
            if (
              q.statement.toLowerCase().includes(clean) ||
              q.explanation.toLowerCase().includes(clean)
            ) {
              matchingQuestions.push({ subject, topic, question: q });
            }
          }
        }
      }
    }
  }

  return { matchingTopics, matchingQuestions };
}
