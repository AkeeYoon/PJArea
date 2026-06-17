import fs from 'fs';

let js = fs.readFileSync('public/js/main.js', 'utf-8');

js = js.replace(/text-cyan-400/g, 'text-primary');
js = js.replace(/border-cyan-400/g, 'border-primary');
js = js.replace(/bg-cyan-400\/5/g, 'bg-primary/5');
js = js.replace(/bg-cyan-500/g, 'bg-primary');
js = js.replace(/shadow-\[0_0_15px_rgba\(34,211,238,0\.4\)\]/g, 'shadow-none');
js = js.replace(/rounded-md/g, 'rounded-none');

fs.writeFileSync('public/js/main.js', js);
console.log('Fixed cyan in main.js');
