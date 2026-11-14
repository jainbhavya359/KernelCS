import { LessonInterviewData } from "../types";
import { topic1_1_interview } from "./interviews/topic1_1_interview";
import { topic1_2_interview } from "./interviews/topic1_2_interview";
import { topic1_3_interview } from "./interviews/topic1_3_interview";
import { topic1_4_interview } from "./interviews/topic1_4_interview";
import { topic1_5_interview } from "./interviews/topic1_5_interview";
import { topic1_6_interview } from "./interviews/topic1_6_interview";
import { topic1_7_interview } from "./interviews/topic1_7_interview";
import { topic1_8_interview } from "./interviews/topic1_8_interview";
import { topic1_9_interview } from "./interviews/topic1_9_interview";
import { topic1_10_interview } from "./interviews/topic1_10_interview";

export const allLessonInterviews: Record<string, LessonInterviewData> = {
  ...topic1_1_interview,
  ...topic1_2_interview,
  ...topic1_3_interview,
  ...topic1_4_interview,
  ...topic1_5_interview,
  ...topic1_6_interview,
  ...topic1_7_interview,
  ...topic1_8_interview,
  ...topic1_9_interview,
  ...topic1_10_interview,
};

export function getLessonInterviewData(lessonId: string): LessonInterviewData | null {
  return allLessonInterviews[lessonId] || null;
}
