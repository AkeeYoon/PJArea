import fs from 'fs';
let html = fs.readFileSync('index.html', 'utf-8');
html = html.replace(/<script type="module" src=/g, '<script src=');
fs.writeFileSync('index.html', html);
