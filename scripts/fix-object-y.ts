import * as fs from 'fs';

let html = fs.readFileSync('index.html', 'utf8');

html = html.replace(
    /<div class="relative w-full h-full max-w-\[1200px\] max-h-\[800px\] flex items-center justify-center overflow-visible"/g,
    '<div class="relative w-full h-full max-w-[1200px] max-h-[800px] flex items-center justify-center overflow-visible -translate-y-12 md:-translate-y-24"'
);

fs.writeFileSync('index.html', html);
console.log("Done");
