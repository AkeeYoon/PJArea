import * as fs from 'fs';

let html = fs.readFileSync('index.html', 'utf8');

html = html.replace(/py-3 text-\[10px\]/g, 'py-2 md:py-3 text-[10px]');
fs.writeFileSync('index.html', html);

console.log("Done");
