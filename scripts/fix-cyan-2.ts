import fs from 'fs';

let html = fs.readFileSync('index.html', 'utf-8');

html = html.replace(/text-cyan-400/g, 'text-primary');

fs.writeFileSync('index.html', html);
console.log('Fixed final text cyan')
