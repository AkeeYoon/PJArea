import fs from 'fs';

let html = fs.readFileSync('index.html', 'utf-8');

// Update Top Plane to TOP VIEW
html = html.replace('Top Plane (평면도)', 'TOP VIEW (평면도)');

// The title label themselves were text-[9px], maybe we should make them bigger like text-[12px]
html = html.replace(/<div class="absolute top-3 left-4 text-\[9px\] font-bold text-on-surface\/40 uppercase tracking-\[0.2em\] z-10">SIDE VIEW \(측면도\)<\/div>/g, '<div class="absolute top-4 left-5 text-[14px] font-bold text-on-surface/80 uppercase tracking-widest z-10 drop-shadow-md">SIDE VIEW (측면도)</div>');
html = html.replace(/<div class="absolute top-3 left-4 text-\[9px\] font-bold text-on-surface\/40 uppercase tracking-\[0.2em\] z-10">TOP VIEW \(평면도\)<\/div>/g, '<div class="absolute top-4 left-5 text-[14px] font-bold text-on-surface/80 uppercase tracking-widest z-10 drop-shadow-md">TOP VIEW (평면도)</div>');

// Make the H and W values bigger too. 
// <text id="side-lab-h" x="480" y="300" text-anchor="end" fill="#fff">H: --m</text> -> give it font-size="20"
html = html.replace(/<text id="side-lab-h" x="480" y="300" text-anchor="end" fill="#fff">/g, '<text id="side-lab-h" x="480" y="300" text-anchor="end" fill="#fff" font-size="24" font-weight="bold">');
html = html.replace(/<text id="top-lab-w" x="480" y="300" text-anchor="end" fill="#fff">/g, '<text id="top-lab-w" x="480" y="300" text-anchor="end" fill="#fff" font-size="24" font-weight="bold">');

// Distance can be bigger too
html = html.replace(/font-size="18"/g, 'font-size="24"');

fs.writeFileSync('index.html', html);
console.log('Fixed SVGs');
