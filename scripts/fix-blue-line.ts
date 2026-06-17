import fs from 'fs';

let html = fs.readFileSync('index.html', 'utf-8');
html = html.replace(/border-b-tertiary border-primary/g, 'border-b-primary');
html = html.replace(/border-b-tertiary border-transparent/g, 'border-transparent');
fs.writeFileSync('index.html', html);

let js = fs.readFileSync('public/js/main.js', 'utf-8');
js = js.replace(/border-b-tertiary border-primary/g, 'border-b-primary');
js = js.replace(/border-b-tertiary border-transparent/g, 'border-transparent');
fs.writeFileSync('public/js/main.js', js);
console.log('Fixed blue line');
