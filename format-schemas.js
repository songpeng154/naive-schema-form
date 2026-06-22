import fs from 'fs';
import path from 'path';

function walkSync(dir, callback) {
  fs.readdirSync(dir).forEach(file => {
    let fullPath = path.join(dir, file);
    if (fs.statSync(fullPath).isDirectory()) {
      walkSync(fullPath, callback);
    } else {
      callback(fullPath);
    }
  });
}

function splitInner(inner, baseIndent) {
  let result = '';
  let braceCount = 0;
  let bracketCount = 0;
  let inString = false;
  let stringChar = '';
  
  const propIndent = baseIndent + '  ';
  result += propIndent + 'field: ';
  
  for (let i = 0; i < inner.length; i++) {
    const char = inner[i];
    
    if (!inString && (char === "'" || char === '"' || char === '`')) {
      inString = true;
      stringChar = char;
      result += char;
      continue;
    }
    
    if (inString && char === stringChar && inner[i-1] !== '\\') {
      inString = false;
      result += char;
      continue;
    }
    
    if (!inString) {
      if (char === '{') braceCount++;
      if (char === '}') braceCount--;
      if (char === '[') bracketCount++;
      if (char === ']') bracketCount--;
      
      if (braceCount === 0 && bracketCount === 0 && char === ',' && inner[i+1] === ' ') {
        result += ',\n' + propIndent;
        i++; // skip space
        continue;
      }
    }
    
    result += char;
  }
  return result;
}

const dir = 'docs/demos';
let changedCount = 0;

walkSync(dir, (file) => {
  if (!file.endsWith('.vue')) return;
  
  let content = fs.readFileSync(file, 'utf-8');
  let changed = false;
  
  const lines = content.split('\n');
  const newLines = lines.map(line => {
    const match = line.match(/^(\s*)\{\s*field:\s*(.*?)\s*\},?$/);
    if (match) {
      const indent = match[1];
      const inner = match[2];
      
      const hasComma = line.trim().endsWith(',');
      
      let output = `${indent}{\n${splitInner(inner, indent)}\n${indent}}`;
      if (hasComma) output += ',';
      
      changed = true;
      return output;
    }
    return line;
  });
  
  if (changed) {
    fs.writeFileSync(file, newLines.join('\n'));
    changedCount++;
    console.log(`Formatted: ${file}`);
  }
});

console.log(`\nFinished formatting ${changedCount} files.`);
