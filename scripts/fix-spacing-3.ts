import * as fs from 'fs';

let html = fs.readFileSync('index.html', 'utf8');

html = html.replace(/mb-3/g, 'mb-2 md:mb-3');
html = html.replace(/mb-2 md:mb-3 md:mb-4/g, 'mb-3 md:mb-4');
html = html.replace(/mb-2/g, 'mb-1.5 md:mb-2');
html = html.replace(/mb-1.5 md:mb-2 md:mb-3/g, 'mb-2 md:mb-3');

// The optical lens shift text might be a bit too big? 
// No, it's text-[9px] or [10px]

fs.writeFileSync('index.html', html);
console.log("Done");
