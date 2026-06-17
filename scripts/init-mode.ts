import fs from 'fs';

let js = fs.readFileSync('public/js/main.js', 'utf-8');

// Find the end of init function. Let's just put setMode('mapping') before ui binding or at the end of mode event listeners.
js = js.replace(/btnOut\.addEventListener\('click', \(\) => setMode\('output'\)\);/, "btnOut.addEventListener('click', () => setMode('output'));\n    setMode('mapping'); // initialize default mode");

fs.writeFileSync('public/js/main.js', js);
console.log('main.js initialized with mapping mode');
