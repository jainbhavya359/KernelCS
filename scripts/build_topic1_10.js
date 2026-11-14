const fs = require('fs');
const path = require('path');

const topicInfo = JSON.parse(fs.readFileSync('scripts/data_1_10/topic_info.json', 'utf8'));
const lessons1to5 = JSON.parse(fs.readFileSync('scripts/data_1_10/lessons_1_to_5.json', 'utf8'));
const lessons6to10 = JSON.parse(fs.readFileSync('scripts/data_1_10/lessons_6_to_10.json', 'utf8'));
const lessons11to14 = JSON.parse(fs.readFileSync('scripts/data_1_10/lessons_11_to_14.json', 'utf8'));

const rawLessons = [...lessons1to5, ...lessons6to10, ...lessons11to14];

// Normalize lessons to strictly adhere to types.ts
function normalizeLesson(l) {
  const norm = { ...l };
  
  if (norm.sections) {
    norm.sections = norm.sections.map(sec => {
      const s = { ...sec };
      if (typeof s.architectureDiagram === 'string') {
        s.architectureDiagram = {
          title: s.title || "Architectural Schematic",
          asciiArt: s.architectureDiagram,
          caption: s.title ? `Detailed structural schematic illustrating ${s.title}.` : "Architectural system diagram."
        };
      }
      if (s.comparisonTable && !s.comparisonTable.title) {
        s.comparisonTable = {
          title: s.title || "Architectural Comparison",
          headers: s.comparisonTable.headers,
          rows: s.comparisonTable.rows
        };
      }
      return s;
    });
  }
  
  if (norm.checkpoints) {
    norm.checkpoints = norm.checkpoints.map(cp => {
      let answer = cp.answer;
      if (!answer) {
        if (cp.options && typeof cp.correctOptionIndex === 'number') {
          answer = `${cp.options[cp.correctOptionIndex]}: ${cp.explanation || ''}`;
        } else {
          answer = cp.explanation || 'Verified through core operating system invariants.';
        }
      }
      return {
        question: cp.question,
        answer: answer,
        hint: cp.hint || "Review the first-principles foundation and internal mechanisms above."
      };
    });
  }
  
  return norm;
}

const allLessons = rawLessons.map(normalizeLesson);

function serializeObject(obj, indent = 2) {
  const pad = ' '.repeat(indent);
  const padInner = ' '.repeat(indent + 2);
  
  if (obj === null) return 'null';
  if (typeof obj === 'string') return JSON.stringify(obj);
  if (typeof obj === 'number' || typeof obj === 'boolean') return String(obj);
  
  if (Array.isArray(obj)) {
    if (obj.length === 0) return '[]';
    const isPrimitive = obj.every(x => typeof x === 'string' || typeof x === 'number');
    if (isPrimitive && obj.length <= 4 && JSON.stringify(obj).length < 80) {
      return JSON.stringify(obj);
    }
    const items = obj.map(item => `${padInner}${serializeObject(item, indent + 2)}`).join(',\n');
    return `[\n${items}\n${pad}]`;
  }
  
  if (typeof obj === 'object') {
    const keys = Object.keys(obj);
    if (keys.length === 0) return '{}';
    const lines = [];
    for (const key of keys) {
      if (key === 'questionIds') {
        const qRefs = obj[key].map(qid => `module01Questions[${JSON.stringify(qid)}]`).join(', ');
        lines.push(`${padInner}"questions": [${qRefs}]`);
      } else {
        lines.push(`${padInner}${JSON.stringify(key)}: ${serializeObject(obj[key], indent + 2)}`);
      }
    }
    return `{\n${lines.join(',\n')}\n${pad}}`;
  }
  return String(obj);
}

const subtopicSerialized = serializeObject(topicInfo.subtopic, 4);
const lessonsSerialized = serializeObject(allLessons, 4);

const tsContent = `import { CurriculumTopic } from "../types";
import { module01Questions } from "./questions";

export const topic1_10: CurriculumTopic = {
  "id": ${JSON.stringify(topicInfo.id)},
  "title": ${JSON.stringify(topicInfo.title)},
  "description": ${JSON.stringify(topicInfo.description)},
  "difficulty": ${JSON.stringify(topicInfo.difficulty)},
  "estimatedHours": ${topicInfo.estimatedHours},
  "learningObjectives": ${serializeObject(topicInfo.learningObjectives, 2)},
  "subtopics": [
    ${subtopicSerialized}
  ],
  "lessons": ${lessonsSerialized}
};
`;

const outputPath = 'lib/data/curriculum/osModules/topic1_10.ts';
fs.writeFileSync(outputPath, tsContent, 'utf8');
console.log('Successfully generated ' + outputPath);
console.log('Total lessons written: ' + allLessons.length);
