const fs = require('fs');

const content = fs.readFileSync('docs/curriculum/os-blueprint.md', 'utf8');
const lines = content.split('\n');

const modules = [];
let currentMod = null;
let currentTopic = null;

lines.forEach((rawLine, idx) => {
  const line = rawLine.trim();

  // Matches e.g. "# 2. Module 01 — OS Fundamentals & Kernel Architecture"
  const modMatch = line.match(/^# \d+\.\s+Module (\d+)\s+[—–-]\s*(.+)$/i);
  if (modMatch) {
    currentMod = {
      num: parseInt(modMatch[1], 10),
      id: `os-mod-${parseInt(modMatch[1], 10)}`,
      title: `Module ${modMatch[1]} — ${modMatch[2].trim()}`,
      name: modMatch[2].trim(),
      line: idx + 1,
      topics: []
    };
    modules.push(currentMod);
    currentTopic = null;
    return;
  }

  // Matches e.g. "### Topic 1.1 — Why Do We Need an Operating System?"
  const topicMatch = line.match(/^### Topic (\d+\.\d+)\s+[—–-]\s*(.+)$/i);
  if (topicMatch && currentMod) {
    currentTopic = {
      id: `os-topic-${topicMatch[1].replace('.', '-')}`,
      num: topicMatch[1],
      title: `Topic ${topicMatch[1]} — ${topicMatch[2].trim()}`,
      name: topicMatch[2].trim(),
      line: idx + 1,
      units: []
    };
    currentMod.topics.push(currentTopic);
    return;
  }

  // If inside a topic, capture learning units if present under "Lessons / learning units:"
  if (currentTopic && line.startsWith('- ') && !line.includes('[ ]')) {
    const unitText = line.replace(/^-\s+/, '').trim();
    currentTopic.units.push(unitText);
  }
});

console.log('Total modules parsed:', modules.length);
modules.forEach(m => {
  console.log(`${m.title}: ${m.topics.length} topics`);
});
