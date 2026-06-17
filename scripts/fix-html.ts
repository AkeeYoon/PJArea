import fs from 'fs';
let html = fs.readFileSync('index.html', 'utf-8');
html = html.replace(/class="hidden\s+class="/g, 'class="hidden ');
fs.writeFileSync('index.html', html);
console.log('Fixed malformed class attribute');
