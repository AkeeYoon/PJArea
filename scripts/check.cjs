const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf8');
console.log('1. body style:', html.includes('style="height: 100dvh;'));
console.log('2. flex-1 min-h-0:', html.includes('flex-1 min-h-0'));
console.log('3. z-[300]:', html.includes('z-[300]'));
console.log('4. OVERSHOOT:', html.includes('OVERSHOOT'));
