import * as fs from 'fs';

let js = fs.readFileSync('public/js/main.js', 'utf8');

js = js.replace(/py-3/g, 'py-2 md:py-3');
fs.writeFileSync('public/js/main.js', js);

console.log("Done");
