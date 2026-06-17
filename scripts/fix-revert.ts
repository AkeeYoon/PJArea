import fs from 'fs';

let html = fs.readFileSync('index.html', 'utf-8');
// 1. Revert 3D beam polygon (from blue/green back to cyan/primary)
html = html.replace(/rgba\(59, 130, 246, 0\.15\)/g, 'rgba(34, 211, 238, 0.08)');
html = html.replace(/rgba\(0, 255, 200, 0\.08\)/g, 'rgba(34, 211, 238, 0.08)');
html = html.replace(/rgba\(0, 255, 200/g, 'rgba(34, 211, 238');

// 2. Revert 2D beams gradient
html = html.replace(/<stop offset="0%" stop-color="#3b82f6" stop-opacity="0\.4" \/>/g, '<stop offset="0%" stop-color="var(--color-primary)" stop-opacity="0.3" />');
html = html.replace(/<stop offset="100%" stop-color="#3b82f6" stop-opacity="0" \/>/g, '<stop offset="100%" stop-color="var(--color-primary)" stop-opacity="0" />');

fs.writeFileSync('index.html', html);

// 3. Fix the mapping engine outline (the "green glowing area" user meant) to blue
let mapping = fs.readFileSync('public/js/mappingEngine.js', 'utf-8');
mapping = mapping.replace(/rgba\(34, 197, 94, 0\.9\)/g, 'rgba(59, 130, 246, 0.9)'); // Change green outline to blue
fs.writeFileSync('public/js/mappingEngine.js', mapping);

console.log('Fixed!');
