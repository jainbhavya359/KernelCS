const fs = require('fs');

const path = 'lib/data/curriculum/osCurriculum.ts';
const content = fs.readFileSync(path, 'utf8');
const lines = content.split('\n');

// Verify line boundaries
if (!lines[41].includes('{') || !lines[42].includes('"id": "os-mod-1"')) {
  throw new Error('Line 42 does not start os-mod-1: ' + lines[41] + ' ' + lines[42]);
}
if (!lines[2253].includes('},') || !lines[2255].includes('"id": "os-mod-2"')) {
  throw new Error('Line 2254 does not end os-mod-1 or line 2256 does not start os-mod-2');
}

// Build new lines
const newLines = [
  'import { CurriculumSubject } from "./types";',
  'import { osModule01 } from "./osModules/module01";',
  ...lines.slice(2, 41),
  '    osModule01,',
  ...lines.slice(2254)
];

fs.writeFileSync(path, newLines.join('\n'), 'utf8');
console.log('Successfully integrated osModule01 into ' + path);
