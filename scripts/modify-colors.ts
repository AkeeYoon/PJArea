import fs from 'fs';

let html = fs.readFileSync('index.html', 'utf-8');

// Replace left-over cyan classes
html = html.replace(/text-cyan-[0-9]+/g, 'text-primary');
html = html.replace(/bg-cyan-[0-9]+\/[0-9]+/g, 'bg-primary/20');
html = html.replace(/border-cyan-[0-9]+\/[0-9]+/g, 'border-primary/30');
html = html.replace(/border-cyan-[0-9]+/g, 'border-primary');
html = html.replace(/bg-cyan-[0-9]+/g, 'bg-primary');
html = html.replace(/shadow-\[0_0_[0-9]+px_rgba\([0-9]+,[0-9]+,[0-9]+,[0-9.]+\)\]/g, 'shadow-none'); // removing old neon shadows

fs.writeFileSync('index.html', html);
console.log('Fixed cyan in HTML');

let css = fs.readFileSync('src/styles/main.css', 'utf-8');
css = css.replace(/--color-primary-dim: #00eab7;/g, '--color-primary-dim: #00cca0;');
css = css.replace(/--color-primary: #a9ffdf;/g, '--color-primary: #00FFC8;');
css = css.replace(/--color-on-primary: #00654d;/g, '--color-on-primary: #000000;');
css = css.replace(/--color-secondary: #c7f300;/g, '--color-secondary: #D1FF00;');
css = css.replace(/--color-tertiary: #81ecff;/g, '--color-tertiary: #00E5FF;');
css = css.replace(/rgba\(34, 211, 238,/g, 'rgba(0, 255, 200,'); // Replace cyan rgba with new primary
css = css.replace(/rgba\(169, 255, 223,/g, 'rgba(0, 255, 200,'); // Replace old primary rgba with new primary
css = css.replace(/#22d3ee/g, 'var(--color-primary)'); // Replace leftover cyan hex
fs.writeFileSync('src/styles/main.css', css);
console.log('Fixed CSS colors');
