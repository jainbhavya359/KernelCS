import {
  CURRICULUM_SUBJECTS,
  adaptCurriculumSubject,
  SubjectLegacy,
  SubjectModuleLegacy,
  CurriculumSubject,
  CurriculumModule,
  CurriculumTopic,
  CurriculumSubtopic,
  CurriculumQuestion
} from './curriculum';

export type SubjectModule = SubjectModuleLegacy;
export type Subject = SubjectLegacy;

export type {
  CurriculumSubject,
  CurriculumModule,
  CurriculumTopic,
  CurriculumSubtopic,
  CurriculumQuestion
};

export const SUBJECTS_DATA: Subject[] = CURRICULUM_SUBJECTS.map(adaptCurriculumSubject);
