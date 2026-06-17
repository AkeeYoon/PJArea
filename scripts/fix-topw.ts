import fs from 'fs';
let html = fs.readFileSync('index.html', 'utf-8');

// I will make any remaining `top-lab-w` text larger by just replacing the tag
html = html.replace(/<text id="top-lab-w"[^>]*>W: --m<\/text>/, '<text id="top-lab-w" x="250" y="520" text-anchor="middle" fill="#fff" font-size="24" font-weight="bold">W: --m</text>');

fs.writeFileSync('index.html', html);
