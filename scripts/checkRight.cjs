const fs = require('fs');
const html = fs.readFileSync('index.html', 'utf8');

const rightMatch = html.match(/<aside[\s\S]*?<\/aside>([\s\S]*?)<\/main>/);
const right = rightMatch[1];
const lines = right.split('\n');

let balance = 0;
for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    const open = (line.match(/<div\b/g) || []).length;
    const close = (line.match(/<\/div>/g) || []).length;
    balance += open - close;
    if(open !== close || balance !== 0) {
        console.log("L" + (i+1) + " [" + balance + "]: " + line.trim());
    }
}
console.log('Final balance:', balance);
