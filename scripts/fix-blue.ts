import fs from 'fs';

// 1. Fix public/js/mappingEngine.js
let mapping = fs.readFileSync('public/js/mappingEngine.js', 'utf-8');
mapping = mapping.replace(/rgba\(34,\s*211,\s*238/g, 'rgba(0, 255, 200');
// also fix '#22d3ee' if it exists
mapping = mapping.replace(/#22d3ee/gi, '#00ffc8');
fs.writeFileSync('public/js/mappingEngine.js', mapping);

// 2. Fix public/js/opticalEngine.js
let optical = fs.readFileSync('public/js/opticalEngine.js', 'utf-8');
optical = optical.replace(/rgba\(34,\s*211,\s*238/g, 'rgba(0, 255, 200');
optical = optical.replace(/#22d3ee/gi, '#00ffc8');
fs.writeFileSync('public/js/opticalEngine.js', optical);

// 3. Fix main.js mode buttons
let main = fs.readFileSync('public/js/main.js', 'utf-8');
main = main.replace(/border-transparent border-b-2 border-b-primary/g, 'border-b-2 border-b-[var(--color-primary)] border-t-transparent border-x-transparent');
main = main.replace(/border-transparent border-b-2 border-transparent/g, 'border-b-2 border-transparent border-t-transparent border-x-transparent');
fs.writeFileSync('public/js/main.js', main);

// 4. Fix index.html mode buttons and beam colors
let html = fs.readFileSync('index.html', 'utf-8');
html = html.replace(/border-transparent border-b-2 border-b-primary/g, 'border-b-2 border-b-[var(--color-primary)] border-t-transparent border-x-transparent');
html = html.replace(/border-transparent border-b-2 border-transparent/g, 'border-b-2 border-transparent border-t-transparent border-x-transparent');

// The projection area was requested to be made blue: "그러면 색은 파란색으로 잡아줘"
// `rgba(0, 255, 200, 0.08)` -> `rgba(59, 130, 246, 0.15)`
html = html.replace(/rgba\(0, 255, 200, 0\.08\)/g, 'rgba(59, 130, 246, 0.15)');

// Also stop-colors for the beam gradient in svg
// It was <stop offset="0%" stop-color="var(--color-primary)" stop-opacity="0.3" /><stop offset="100%" stop-color="var(--color-primary)" stop-opacity="0" />
html = html.replace(/<stop offset="0%" stop-color="var\(--color-primary\)" stop-opacity="0\.3" \/>/g, '<stop offset="0%" stop-color="#3b82f6" stop-opacity="0.4" />');
html = html.replace(/<stop offset="100%" stop-color="var\(--color-primary\)" stop-opacity="0" \/>/g, '<stop offset="100%" stop-color="#3b82f6" stop-opacity="0" />');

// also there are linear gradients in 3d container background
// <div class="absolute left-1/2 top-1/2 w-[6000px] h-[6000px] border border-primary/30 pointer-events-none" style="transform: translate(-50%, -50%) rotateX(90deg) translateZ(-300px); background-image: linear-gradient(to right, rgba(34, 211, 238, 0.05) 1px, transparent 1px), linear-gradient(to bottom, rgba(34, 211, 238, 0.05) 1px, transparent 1px); background-size: 200px 200px;"></div>
html = html.replace(/rgba\(34, 211, 238/g, 'rgba(0, 255, 200');

fs.writeFileSync('index.html', html);

console.log('Fixed cyan and beams.');
