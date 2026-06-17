import fs from 'fs';

let html = fs.readFileSync('index.html', 'utf-8');

// I wrapped it in <div class="bg-surface-high border border-outline-variant/15 p-4 mb-4">
// Let's add id="tutTarget_1" to it:
html = html.replace('<div class="bg-surface-high border border-outline-variant/15 p-4 mb-4"><h2 class="text-[10px] text-on-surface/40 uppercase tracking-[0.2em] font-bold mb-4">PHYSICAL WALL SIZE (mm)</h2>', '<div id="tutTarget_1" class="bg-surface-high border border-outline-variant/15 p-4 mb-4 relative z-0"><h2 class="text-[10px] text-on-surface/40 uppercase tracking-[0.2em] font-bold mb-4">PHYSICAL WALL SIZE (mm)</h2>');

fs.writeFileSync('index.html', html);
console.log('Restored tutTarget_1');
