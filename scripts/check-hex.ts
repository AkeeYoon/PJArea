import fs from 'fs';

const html = fs.readFileSync('index.html', 'utf-8');
const hexMatches = html.match(/#[a-fA-F0-9]{6}/g) || [];
const uniqueHex = [...new Set(hexMatches)];
console.log('Hex in HTML:', uniqueHex);

const css = fs.readFileSync('src/styles/main.css', 'utf-8');
const cssHexMatches = css.match(/#[a-fA-F0-9]{3,6}/g) || [];
const uniqueCssHex = [...new Set(cssHexMatches)];
console.log('Hex in CSS:', uniqueCssHex);
