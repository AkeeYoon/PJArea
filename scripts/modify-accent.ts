import fs from 'fs';

let html = fs.readFileSync('index.html', 'utf-8');

html = html.replace(/accent-cyan-[0-9]+/g, 'accent-primary');

fs.writeFileSync('index.html', html);
console.log('Fixed accent-cyan');
