import * as fs from 'fs';

let html = fs.readFileSync('index.html', 'utf8');

// decrease padding on the 2D/3D view toggle
html = html.replace(/px-4 py-1.5 rounded-none text-\[10px\]/g, 'px-2 md:px-4 py-1 md:py-1.5 rounded-none text-[9px] md:text-[10px]');
html = html.replace(/px-4 py-1.5 rounded-none text-\[10px\]/g, 'px-2 md:px-4 py-1 md:py-1.5 rounded-none text-[9px] md:text-[10px]');

fs.writeFileSync('index.html', html);
console.log("Done");
