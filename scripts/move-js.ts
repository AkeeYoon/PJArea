import fs from 'fs';
import path from 'path';

fs.mkdirSync('public/js', { recursive: true });

const files = fs.readdirSync('src/js');
for(const file of files) {
  fs.renameSync(path.join('src/js', file), path.join('public/js', file));
}

let html = fs.readFileSync('index.html', 'utf-8');
html = html.replace(/\/src\/js\//g, '/js/');
fs.writeFileSync('index.html', html);

console.log('Moved files');
