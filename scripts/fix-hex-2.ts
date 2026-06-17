import fs from 'fs';

let js = fs.readFileSync('public/js/mappingEngine.js', 'utf-8');

js = js.replace(/#0a1018/g, '#0e0e0e'); // surface
js = js.replace(/#050a10/g, '#000000'); // surface-lowest

fs.writeFileSync('public/js/mappingEngine.js', js);
console.log('Fixed mappingEngine backgrounds');

let tut = fs.readFileSync('public/js/tutorialSystem.js', 'utf-8');
tut = tut.replace(/text-cyan-400/g, 'text-primary');
tut = tut.replace(/text-slate-300/g, 'text-on-surface/80');
tut = tut.replace(/bg-black\/20/g, 'bg-surface-lowest');
tut = tut.replace(/border-\[#1f2d40\]/g, 'border-outline-variant/30');
fs.writeFileSync('public/js/tutorialSystem.js', tut);
console.log('Fixed tutorial colors');
