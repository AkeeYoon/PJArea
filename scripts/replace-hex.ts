import fs from 'fs';
import path from 'path';

function replaceHexInFile(filePath) {
    let content = fs.readFileSync(filePath, 'utf-8');

    content = content.replace(/bg-\[#070b14\]/g, 'bg-surface');
    content = content.replace(/bg-\[#0b1219\]/g, 'bg-surface-lowest');
    content = content.replace(/bg-\[#131f33\]/g, 'bg-surface-container');
    content = content.replace(/bg-\[#152336\]/g, 'bg-surface-high');
    content = content.replace(/bg-\[#2a3b52\]/g, 'bg-surface-highest');
    content = content.replace(/border-\[#1f2d40\]/g, 'border-outline-variant/15');
    content = content.replace(/border-\[#3b516b\]/g, 'border-outline-variant/30');

    // Any other direct hex colors
    content = content.replace(/#22d3ee/g, 'var(--color-primary)');
    content = content.replace(/#152336/g, 'var(--color-surface-high)');
    content = content.replace(/#3b516b/g, 'var(--color-outline-variant)');
    content = content.replace(/#1f2d40/g, 'var(--color-outline-variant)');
    content = content.replace(/#0b1219/g, 'var(--color-surface-lowest)');
    content = content.replace(/#131f33/g, 'var(--color-surface-container)');
    content = content.replace(/#070b14/g, 'var(--color-surface)');

    // Text colors
    content = content.replace(/text-\[#070b14\]/g, 'text-surface-lowest');
    content = content.replace(/text-slate-300/g, 'text-on-surface/80');
    content = content.replace(/text-slate-400/g, 'text-on-surface/60');
    content = content.replace(/text-slate-500/g, 'text-on-surface/40');
    content = content.replace(/text-slate-600/g, 'text-on-surface/20');
    content = content.replace(/text-white/g, 'text-on-surface');
    content = content.replace(/text-black/g, 'text-surface-lowest');

    // Replace gradient (f43f5e etc for estimated brightness bar to something more matching the toxic feel if possible?) 
    // "f43f5e 20%, #eab308 40%, #10b981 80%, #3b82f6 100%"
    // Let's leave that one alone if it's just the brightness scale, or change to a toxic scale
    content = content.replace(/#f43f5e 20%, #eab308 40%, #10b981 80%, #3b82f6 100%/g, 'var(--color-secondary) 0%, var(--color-primary) 100%');
    
    fs.writeFileSync(filePath, content);
}

replaceHexInFile('index.html');
replaceHexInFile('public/js/main.js');
replaceHexInFile('public/js/mappingEngine.js');
replaceHexInFile('public/js/opticalEngine.js');
replaceHexInFile('public/js/models.js');

console.log('Hex replaced across files.');
