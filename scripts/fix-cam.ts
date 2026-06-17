import * as fs from 'fs';

let html = fs.readFileSync('index.html', 'utf8');

html = html.replace(/<div class="space-y-4">/g, '<div class="space-y-2 md:space-y-4">');

fs.writeFileSync('index.html', html);
console.log("Done");
