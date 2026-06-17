import fs from 'fs';

// 1. Move "Physical Wall Size"
let html = fs.readFileSync('index.html', 'utf-8');

const wallSizeRegex = /<h2[^>]*>\s*<span[^>]*><\/span>\s*Physical Wall Size\s*<\/h2>[\s\S]*?(?=<div class="p-6 pb-2  hidden" id="tutTarget_2">)/;
const match = html.match(wallSizeRegex);

if (match) {
    let wallSizeBlock = match[0];
    html = html.replace(wallSizeBlock, '');

    // Now insert it into panel-settings, right after:
    // <div id="settings-projector-content" class="flex flex-col gap-4">
    const insertionPoint = '<div id="settings-projector-content" class="flex flex-col gap-4">';
    html = html.replace(insertionPoint, insertionPoint + '\n' + '<div class="bg-surface-high border border-outline-variant/15 p-4 mb-4">' + wallSizeBlock + '</div>');
    
    // Convert text-primary to text-[10px] text-on-surface/40 uppercase tracking-[0.2em] font-bold for the header
    html = html.replace(/<h2[^>]*>\s*<span[^>]*><\/span>\s*Physical Wall Size\s*<\/h2>/, '<h2 class="text-[10px] text-on-surface/40 uppercase tracking-[0.2em] font-bold mb-4">PHYSICAL WALL SIZE (mm)</h2>');
}

fs.writeFileSync('index.html', html);
console.log('Done moving exactly');
