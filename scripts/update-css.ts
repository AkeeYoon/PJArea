import fs from 'fs';

let css = fs.readFileSync('src/styles/main.css', 'utf-8');
const cyberInputs = `

.input-base {
  background: transparent !important;
  border: 1px solid transparent !important;
  color: var(--color-on-surface) !important;
  font-family: 'JetBrains Mono', monospace !important;
}
.input-base:focus {
  border-bottom: 2px solid var(--color-primary) !important;
}

`;

if(!css.includes('.input-base {')) {
  fs.writeFileSync('src/styles/main.css', css + cyberInputs);
}

let html = fs.readFileSync('index.html', 'utf-8');

// The bottom menu requires padding.
// Also fix bottom-spec-panel on mobile setting it to standard flow instead of absolute!
html = html.replace(
  '<div id="bottom-spec-panel" class="static md:absolute bottom-0 left-0 right-0 h-auto md:h-[160px] bg-surface/95 md:backdrop-blur border-transparent border-b-tertiary border-t-[var(--color-outline-variant)] md:border-t md:border-transparent border-b-tertiary-0 shrink-0 p-4 md:p-6 flex flex-row items-center gap-6 md:gap-8 z-20 shadow-[0_-10px_30px_rgba(0,0,0,0.5)] overflow-x-auto hide-scrollbar pointer-events-auto">',
  '<div id="bottom-spec-panel" class="static md:absolute bottom-[60px] md:bottom-0 left-0 right-0 h-auto md:h-[160px] bg-surface/95 md:backdrop-blur border-transparent border-b-tertiary border-t-[var(--color-outline-variant)] md:border-t md:border-transparent border-b-tertiary-0 shrink-0 p-4 md:p-6 flex flex-col md:flex-row items-center gap-6 md:gap-8 z-20 shadow-[0_-10px_30px_rgba(0,0,0,0.5)] overflow-x-auto hide-scrollbar pointer-events-auto">'
);

fs.writeFileSync('index.html', html);
