import * as fs from 'fs';

let js = fs.readFileSync('public/js/main.js', 'utf8');

js = js.replace(/px-4 py-1.5 rounded-none text-\[10px\]/g, 'px-2 md:px-4 py-1 md:py-1.5 rounded-none text-[9px] md:text-[10px]');

fs.writeFileSync('public/js/main.js', js);

let html = fs.readFileSync('index.html', 'utf8');
html = html.replace(/px-4 py-1.5 rounded-none text-\[10px\]/g, 'px-2 md:px-4 py-1 md:py-1.5 rounded-none text-[9px] md:text-[10px]');
fs.writeFileSync('index.html', html);

console.log("Done");
