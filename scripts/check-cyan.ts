import fs from 'fs';

const html = fs.readFileSync('index.html', 'utf-8');
const matches = html.match(/cyan-[a-zA-Z0-9\/]+/g) || [];
const unique = [...new Set(matches)];
console.log(unique);
