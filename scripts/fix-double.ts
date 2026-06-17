import * as fs from 'fs';

let html = fs.readFileSync('index.html', 'utf8');

html = html.replace(/mb-3 md:mb-4 md:mb-4 md:mb-6/g, 'mb-4 md:mb-6');
fs.writeFileSync('index.html', html);

console.log("Done");
