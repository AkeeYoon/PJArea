import fs from 'fs';

let html = fs.readFileSync('index.html', 'utf-8');

html = html.replace('<div class="p-6 pb-2 " id="tutTarget_1">\n                    <div class="p-6 pb-2  hidden" id="tutTarget_2">', '<div class="p-6 pb-2  hidden" id="tutTarget_2">');

fs.writeFileSync('index.html', html);
console.log('Fixed tutTarget_1');
