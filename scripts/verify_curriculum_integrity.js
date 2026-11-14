const fs = require('fs');
const { osCurriculum } = require('../lib/data/curriculum/osCurriculum');

console.log('--- CURRICULUM INTEGRITY VERIFICATION ---');

// 1. Verify Module Count
console.log('Total modules in OS curriculum:', osCurriculum.modules.length);
if (osCurriculum.modules.length !== 12) {
  throw new Error(`Expected 12 modules, found ${osCurriculum.modules.length}`);
}

const mod1 = osCurriculum.modules[0];
if (mod1.id !== 'os-mod-1') {
  throw new Error(`Module 01 ID mismatch: ${mod1.id}`);
}

console.log(`Module 01: "${mod1.title}"`);
console.log(`Topics count in Module 01: ${mod1.topics.length}`);
if (mod1.topics.length !== 10) {
  throw new Error(`Expected 10 topics in Module 01, found ${mod1.topics.length}`);
}

// 2. Count lessons and questions in Module 01
let totalLessons = 0;
let totalSections = 0;
const lessonIds = new Set();
const questionMap = new Map();

mod1.topics.forEach((topic, tIdx) => {
  console.log(`  Topic 1.${tIdx + 1} (${topic.id}): "${topic.title}" - ${topic.lessons ? topic.lessons.length : 0} lessons`);
  if (!topic.lessons || topic.lessons.length === 0) {
    throw new Error(`Topic ${topic.id} has no lessons!`);
  }
  
  // Check subtopic
  if (!topic.subtopics || topic.subtopics.length === 0) {
    throw new Error(`Topic ${topic.id} has no subtopics!`);
  }
  topic.subtopics.forEach(sub => {
    if (sub.questions) {
      sub.questions.forEach(q => {
        if (!questionMap.has(q.id)) {
          questionMap.set(q.id, q);
        }
      });
    }
  });

  topic.lessons.forEach(lesson => {
    totalLessons++;
    if (lessonIds.has(lesson.id)) {
      throw new Error(`Duplicate lesson ID detected: ${lesson.id}`);
    }
    lessonIds.add(lesson.id);

    if (!lesson.detailedExplanation || lesson.detailedExplanation.length < 100) {
      throw new Error(`Lesson ${lesson.id} lacks detailedExplanation!`);
    }

    if (!lesson.sections || lesson.sections.length === 0) {
      throw new Error(`Lesson ${lesson.id} lacks sections!`);
    }
    totalSections += lesson.sections.length;

    if (lesson.questions) {
      lesson.questions.forEach(q => {
        if (!questionMap.has(q.id)) {
          questionMap.set(q.id, q);
        }
      });
    }
  });
});

console.log(`Total Module 01 Lessons verified: ${totalLessons}`);
if (totalLessons !== 70) {
  throw new Error(`Expected 70 lessons in Module 01, found ${totalLessons}`);
}
console.log(`Total sections across Module 01 lessons: ${totalSections}`);

console.log(`Total unique questions mapped in Module 01: ${questionMap.size}`);
if (questionMap.size !== 29) {
  throw new Error(`Expected 29 unique questions in Module 01, found ${questionMap.size}`);
}

// 3. Verify question answers are detailed
let shortAnswerCount = 0;
for (const [qid, q] of questionMap.entries()) {
  if (!q.explanation || q.explanation.length < 200) {
    console.warn(`Question ${qid} has short explanation (${q.explanation ? q.explanation.length : 0} chars)`);
    shortAnswerCount++;
  }
}
console.log(`Questions with comprehensive textbook answers: ${questionMap.size - shortAnswerCount} / ${questionMap.size}`);

// 4. Verify Modules 02-12 integrity
console.log('\n--- VERIFYING MODULES 02 TO 12 INTEGRITY ---');
for (let i = 1; i < 12; i++) {
  const m = osCurriculum.modules[i];
  console.log(`Module ${i + 1} (${m.id}): "${m.title}" - ${m.topics.length} topics`);
  if (m.id !== `os-mod-${i + 1}`) {
    throw new Error(`Module ${i + 1} ID mismatch: ${m.id}`);
  }
}

console.log('\n>>> ALL CURRICULUM INTEGRITY CHECKS PASSED WITH 100% SUCCESS! <<<');
